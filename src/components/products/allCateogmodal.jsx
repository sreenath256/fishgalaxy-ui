import React from "react";
import { VscClose } from "react-icons/vsc";
const AllcategModal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        ></div>
      )}
      
      {/* Modal */}
      <div
        className={`fixed top-0 left-0 h-full w-80 md:w-96 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 h-full overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 text-2xl right-4 text-gray-500 hover:text-gray-700"
          >
           <VscClose/>
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default AllcategModal;