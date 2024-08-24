import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosUtils";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-hot-toast";
import { getBlog } from "../../features/apiCall";

const UpdateBlog = ({ setShowUpdateBlog, id }) => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { blog } = useSelector((state) => state.blog);

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

      if (images.length > 0) {
        if (images.length === 1) {
          formData.append("files", images[0]);
        } else {
          images.forEach((image) => {
            formData.append("files", image);
          });
        }
      }

      const { data } = await axiosInstance.put(
        `/api/blog/update-blog/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setLoading(false);
        setShowUpdateBlog(false);
        setGenure("");
        setImages([]);
        setTitle("");
        setDescription("");
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlog(dispatch, setLoading, id);
    if (blog?.title) {
      setTitle(blog?.title);
      setDescription(blog?.description);
      setGenure(blog?.genure);
    }
  }, [id, blog?.title, blog?.description, blog?.genure, dispatch]);

  return (
    <div className="add_blog">
      <div className="new_blog">
        <div className="head">
          <h2>Edit Your Blog</h2>
          <span onClick={() => setShowUpdateBlog(false)}>
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
            type="file"
            accept="image/*"
            multiple
            placeholder="Add More Images"
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
            <button onClick={() => setShowUpdateBlog(false)}>Cancel</button>
            <button disabled={loading} type="submit">
              {loading ? <PulseLoader color="white" size={6} /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
