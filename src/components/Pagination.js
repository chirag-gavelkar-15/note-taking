const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const nextPage = () => {
      if (currentPage < totalPages) onPageChange(currentPage + 1);
    };
  
    const prevPage = () => {
      if (currentPage > 1) onPageChange(currentPage - 1);
    };
  
    return (
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600 transition duration-300"}`}
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
           onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600 transition duration-300"}`}
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;
  