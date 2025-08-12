import React, { useEffect, useState } from "react";
import { VscClose } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { URL } from "../../Common/api";
import axios from "axios";
import { config } from "../../Common/configurations";
const AllcategModal = ({ isOpen, onClose, categories }) => {

  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  const navigate = useNavigate();

  // const fetchData = async () => {
  //   try {
  //     setIsLoading(true);
  //     setError(null);
  //     const { data } = await axios.get(`${URL}/user/categories`, config);
  //     setCategories(data.categories);
  //   } catch (err) {
  //     console.error(err);
  //     setError('Failed to load categories. Please try again later.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/shop?category=${encodeURIComponent(categoryName)}`);
    onClose(); // Close the modal after navigating
  };

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
        className={`fixed top-0 left-0 h-full w-80 md:w-96 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-4 h-full overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 text-2xl right-4 text-gray-500 hover:text-gray-700"
          >
            <VscClose />
          </button>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">All Categories</h2>
            <ul className="space-y-2">
              {categories.map((category, i) => (
                <li
                  key={i}
                  onClick={() => handleCategoryClick(category.name)}
                  className="p-2 hover:bg-gray-100 hover:text-mainclr duration-200 cursor-pointer"
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllcategModal;