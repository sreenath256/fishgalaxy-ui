import React from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import toast from "react-hot-toast";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

const Pagination = ({ handleClick, page, number, totalNumber }) => {
    let paginationNum = Math.ceil(totalNumber / number);
    const maxVisibleButtons = 5; // Number of pages to be shown in the pagination

    const renderPaginationNumber = () => {
        const paginationButtons = [];

        if (paginationNum > maxVisibleButtons) {
            const leftBoundary = Math.max(page - Math.floor(maxVisibleButtons / 2), 1);
            const rightBoundary = Math.min(
                leftBoundary + maxVisibleButtons - 1,
                paginationNum
            );

            if (leftBoundary > 1) {
                paginationButtons.push(
                    <span key="ellipsis-left" className="px-2 text-gray-500">...</span>
                );
            }

            const additionalPagesNeeded =
                maxVisibleButtons - (rightBoundary - leftBoundary + 1);

            const startPage = Math.max(leftBoundary - additionalPagesNeeded, 1);

            for (let i = startPage; i <= rightBoundary; i++) {
                paginationButtons.push(
                    <button
                        key={i}
                        onClick={() => handleClick("page", i)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === i
                            ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                            }`}
                    >
                        {i}
                    </button>
                );
            }

            if (rightBoundary < paginationNum) {
                paginationButtons.push(
                    <span key="ellipsis-right" className="px-2 text-gray-500">...</span>
                );
            }
        } else {
            for (let i = 1; i <= paginationNum; i++) {
                paginationButtons.push(
                    <button
                        key={i}
                        onClick={() => handleClick("page", i)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === i
                            ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                            }`}
                    >
                        {i}
                    </button>
                );
            }
        }

        return paginationButtons;
    };


    return (
        <div className="flex  justify-center">
            {paginationNum > maxVisibleButtons && (
                <p
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${page === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                    onClick={() => {
                        if (page > 1) {
                            handleClick("page", 1);
                        } else {
                            toast.error("Already on the first page");
                        }
                    }}
                >
                    <FiChevronsLeft />
                </p>
            )}

            {paginationNum > 1 && (
                <p
                    className={`relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium ${page === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                    onClick={() => {
                        if (page > 1) {
                            handleClick("page", page - 1);
                        } else {
                            toast.error("Can't go below one");
                        }
                    }}
                >
                    <span className="sr-only">Previous</span>
                    <FiChevronLeft className="h-5 w-5" />
                </p>
            )}
            {paginationNum > 1 && renderPaginationNumber()}
            {paginationNum > 1 && (
                <p
                    className={`relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium ${page === paginationNum ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                    onClick={() => {
                        if (page < paginationNum) {
                            handleClick("page", page + 1);
                        } else {
                            toast.error("Page End");
                        }
                    }}
                >
                    <FiChevronRight />
                </p>
            )}

            {paginationNum > maxVisibleButtons && (
                <p
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${page === paginationNum ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                    onClick={() => {
                        if (page < paginationNum) {
                            handleClick("page", paginationNum);
                        } else {
                            toast.error("Already on the last page");
                        }
                    }}
                >
                    <FiChevronsRight />
                </p>
            )}
        </div>
    );
};

export default Pagination;
