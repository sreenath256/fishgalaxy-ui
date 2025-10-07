import React, { useState, useEffect, useRef } from "react";
import {
  FiPlus,
  FiSave,
  FiX,
  FiUpload,
  FiImage,
  FiTrash2,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../redux/actions/admin/categoriesAction";
import ConfirmBox from "../../components/admin/ConfrimBox";
import CustomSingleFileInput from "../../components/admin/CustomSingleFileInput";
import CustomFileInput from "../../components/admin/CustomFileInput";
import toast from "react-hot-toast";
import { createProduct } from "../../redux/actions/admin/productActions";

const AddProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryRef = useRef(null);
  const statusRef = useRef(null);



  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    // Create proper query string
    const queryString = new URLSearchParams({
      page: 1,
      limit: 1000
    }).toString();

    dispatch(getCategories(queryString));
  }, [dispatch]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [offer, setOffer] = useState("");
  const [category, setCategory] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [moreImageURL, setMoreImageURL] = useState("");
  const [isOfferProduct, setIsOfferProduct] = useState(false);
  const [isLatestProduct, setIsLatestProduct] = useState(false);
  const [status, setStatus] = useState("Stocked");
  const [showConfirm, setShowConfirm] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);


  const handleSingleImageInput = (img) => {
    setImageURL(img);
  };

  const handleMultipleImageInput = (files) => {
    setMoreImageURL(files);
  };

  const handleSave = async () => {
    if (price <= 0) {
      toast.error("Price Should be greater than 0");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("offer", offer);
    formData.append("isOfferProduct", isOfferProduct);
    formData.append("isLatestProduct", isLatestProduct);
    formData.append("status", status.toLowerCase());
    formData.append("imageURL", imageURL);

    for (const file of moreImageURL) {
      formData.append("moreImageURL", file);
    }

    await dispatch(createProduct(formData));
    navigate(-1);
  };

  const toggleConfirm = () => {
    if (!isFormValid()) {
      toast.error("Please fill in all required fields before saving.");
      return;
    }
    setShowConfirm(!showConfirm);
  };

  const isFormValid = () => {
    return (
      name.trim() !== "" &&
      description.trim() !== "" &&
      price > 0 &&
      category &&
      status &&
      imageURL
    );
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (statusRef.current && !statusRef.current.contains(event.target)) {
        setStatusDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {showConfirm && (
        <ConfirmBox
          title="Confirm Save?"
          onClose={toggleConfirm}
          onConfirm={handleSave}
          confirmText={"Save"}
          isOpen={showConfirm}
        />
      )}
      <div className="min-h-screen bg-gray-50">
        <div className="">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h1 className="text-xl font-medium text-gray-800">
                Add New Product
              </h1>
            </div>

            <div className="p-3">
              <div className="grid grid-cols-1 gap-6">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                {/* Price Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      MRP (₹)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sale Price (₹)
                    </label>
                    <input
                      type="number"
                      name="offerPrice"
                      value={offer}
                      onChange={(e) => setOffer(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative" ref={categoryRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categories
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={toggleDropdown}
                        className="w-full bg-gray-100 rounded-md py-2 px-3 text-sm outline-none border border-gray-200 text-left flex justify-between items-center"
                      >
                        {category ? (
                          categories.find(c => c._id === category)?.name || "Choose a category"
                        ) : (
                          "Choose a category"
                        )}
                        <svg
                          className={`h-5 w-5 text-gray-400 transform transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      {dropdownOpen && (
                        <div
                          className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                        >
                          {loading ? (
                            <div className="py-2 text-center text-gray-500">
                              Loading categories...
                            </div>
                          ) : (
                            categories.map((cat) => (
                              <div
                                key={cat._id}
                                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-50 ${category === cat._id ? "bg-indigo-100" : ""}`}
                                onClick={() => {
                                  setCategory(cat._id);
                                  setDropdownOpen(false);
                                }}
                              >
                                <span className="font-normal block truncate">
                                  {cat.name}
                                </span>
                                {category === cat._id && (
                                  <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                                    <svg
                                      className="h-5 w-5"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                )}
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="relative px-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Status
                    </label>
                    <div className="relative" ref={statusRef}>
                      <button
                        type="button"
                        onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                        className="w-full bg-white rounded-md py-2 px-3 text-sm outline-none border border-gray-200 text-left flex justify-between items-center"
                      >
                        {status}
                        <svg
                          className={`h-5 w-5 text-gray-400 transform transition-transform ${statusDropdownOpen ? "rotate-180" : ""}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      {statusDropdownOpen && (
                        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                          {["Stocked", "Out of Stock"].map((option) => (
                            <div
                              key={option}
                              className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-50 ${status === option ? "bg-indigo-100" : ""}`}
                              onClick={() => {
                                setStatus(option);
                                setStatusDropdownOpen(false);
                              }}
                            >
                              <span className="font-normal block truncate">
                                {option}
                              </span>
                              {status === option && (
                                <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                                  <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="block text-sm font-medium text-gray-700 mb-2">Product Tags</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="isOfferProduct"
                          checked={isOfferProduct}
                          onChange={(e) => setIsOfferProduct(e.target.checked)}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <label htmlFor="isOfferProduct" className="text-sm text-gray-700">
                          Offer Product
                        </label>
                      </div>

                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="isLatestProduct"
                          checked={isLatestProduct}
                          onChange={(e) => setIsLatestProduct(e.target.checked)}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <label htmlFor="isLatestProduct" className="text-sm text-gray-700">
                          Latest Product
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Images Section */}
              <div className="pt-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Image
                </label>
                <p className="font-light my-2">Drop Here</p>
                <div className="flex flex-wrap gap-5">
                  <CustomSingleFileInput onChange={handleSingleImageInput} />
                  <div className="admin-div">
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     More images
                    </label>
                    <p className="font-light my-2">Drop Here</p>
                    <CustomFileInput onChange={handleMultipleImageInput} />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={() => navigate(-1)}
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  onClick={toggleConfirm}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FiSave className="inline mr-2" />
                  Save Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProducts;