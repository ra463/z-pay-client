import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosUtils";
import { useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddBlog = ({ setShowAddBlog }) => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genure, setGenure] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const list = [
    "Lifestyle",
    "Tech",
    "Travel",
    "Food",
    "Fashion",
    "Science",
    "Health",
    "Entertainment",
    "Sports",
    "Technology",
    "Other",
  ];

  const handleImageChange = (e) => {
    const files = e.target.files;
    let allImages = [];

    for (let i = 0; i < files.length; i++) {
      allImages.push(files[i]);
    }
    setImages(allImages);
  };

  const handleRemoveImg = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("genure", genure);
      images.forEach((image) => {
        formData.append("files", image);
      });

      const { data } = await axiosInstance.post(
        "/api/blog/add-blog",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setLoading(false);
        setShowAddBlog(false);
        setGenure("");
        setImages([]);
        setTitle("");
        setDescription("");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setLoading(false);
    }
  };

  return (
    <div className="add_blog">
      <div className="new_blog">
        <div className="head">
          <h2>Add New Blog</h2>
          <span onClick={() => setShowAddBlog(false)}>
            <MdOutlineClose />
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title of the Blog"
          />
          <select
            required
            value={genure}
            onChange={(e) => setGenure(e.target.value)}
          >
            <option value="">Select Genure</option>
            {list.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
          <textarea
            required
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            cols="30"
            rows="10"
            placeholder="Description"
          />
          <input
            required
            type="file"
            accept="image/*"
            multiple
            placeholder="Images"
            onChange={handleImageChange}
          />
          <div className="images">
            {images &&
              images.map((img, i) => (
                <div key={i} className="img">
                  <img key={i} src={URL.createObjectURL(img)} alt="blog" />
                  <MdOutlineClose onClick={() => handleRemoveImg(i)} />
                </div>
              ))}
          </div>
          <div className="btns">
            <button type="reset" onClick={() => setShowAddBlog(false)}>
              Cancel
            </button>
            <button disabled={loading} type="submit">
              {loading ? <PulseLoader color="white" size={6} /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
