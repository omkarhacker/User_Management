import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-6 space-x-2">
      <button
        className={`px-4 py-2 bg-blue-500 text-white rounded ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
        }`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      {[...Array(totalPages).keys()].map((page) => (
        <button
          key={page + 1}
          className={`px-4 py-2 rounded ${
            currentPage === page + 1
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-black hover:bg-gray-300'
          }`}
          onClick={() => onPageChange(page + 1)}
        >
          {page + 1}
        </button>
      ))}
      <button
        className={`px-4 py-2 bg-blue-500 text-white rounded ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
        }`}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
