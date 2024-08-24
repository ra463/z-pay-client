import React, { useState, useEffect } from "react";

const CustomPagination = ({ pages, pageHandler, curPage }) => {
  const [left, setLeft] = useState();
  const [right, setRight] = useState();

  const getPageArray = () => {
    const arr = [...Array(pages).keys()].slice(left + 1, right);
    return arr;
  };

  useEffect(() => {
    if (pages <= 5) {
      setLeft(-1);
      setRight(pages);
    } else {
      if (curPage <= 3) {
        setLeft(1);
        setRight(5);
      } else if (curPage >= pages - 2) {
        setLeft(pages - 4);
        setRight(pages);
      } else {
        setLeft(curPage - 2);
        setRight(curPage + 2);
      }
    }
  }, [curPage, pages]);

  return (
    <div className="paination">
      <button disabled={curPage === 1} onClick={() => pageHandler(curPage - 1)}>
        Previous
      </button>
      {getPageArray().map((num) => (
        <button
          key={num}
          className={curPage === num + 1 ? "active" : ""}
          onClick={() => pageHandler(num + 1)}
        >
          {num + 1}
        </button>
      ))}
      <button
        disabled={curPage === pages}
        onClick={() => pageHandler(curPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default CustomPagination;
