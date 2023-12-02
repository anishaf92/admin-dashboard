// Pagination.js
import React from "react";

const Pagination = ({ currentPage, totalPages, paginate }) => {
  return (
    <div className="pagination">
      <span className="pagination-text">
        Page {currentPage} of {totalPages}
      </span>
      <button className="first-page" onClick={() => paginate(1)}>&lt;&lt;</button>
      <button className="previous-page" onClick={() => paginate(Math.max(currentPage - 1, 1))}>&lt;</button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          className={currentPage === i + 1 ? "active" : ""}
          onClick={() => paginate(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button className="next-page" onClick={() => paginate(Math.min(currentPage + 1, totalPages))}>&gt;</button>
      <button className="last-page" onClick={() => paginate(totalPages)}>&gt;&gt;</button>
    </div>
  );
};

export default Pagination;
