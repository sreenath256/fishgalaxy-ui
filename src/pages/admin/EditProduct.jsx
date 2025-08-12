import React, { useEffect, useState } from "react";
import { AiOutlineSave, AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import CustomFileInput from "../../Components/admin/CustomFileInput";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../redux/actions/admin/productActions";
import CustomSingleFileInput from "../../Components/admin/CustomSingleFileInput";
import ConfirmModal from "../../components/admin/ConfrimBox";
import axios from "axios";
import { getCategories } from "../../redux/actions/admin/categoriesAction";
import { URL } from "@common/api";
import toast from "react-hot-toast";

const EditProduct = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const navigate = useNavigate();

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

  const [statusList, setStatusList] = useState([
    "stocked",
    "out of stock",
  ]);

  const [duplicateFetchData, setDuplicateFetchData] = useState({});
  const [fetchedData, setFetchedData] = useState({
    name: "",
    description: "",
    category: "",
    imageURL: "",
    status: "",
    price: "",
    moreImageURL: [],
    offer: "",
    isOfferProduct: false,  // Add this
    isLatestProduct: false  // Add this
  });

  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  // Changing Data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFetchedData({
      ...fetchedData,
      [name]: value,
    });
  };




  // Fetching The product details initially
  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const { data } = await axios.get(`${URL}/admin/product/${id}`, {
          withCredentials: true,
        });

        setFetchedData({ ...data.product });

        setDuplicateFetchData({ ...data.product });
      } catch (error) {
        console.log(error);
      }
    };
    getProductDetails();
  }, []);

  // Functions for thumbnail uploads
  const [newThumb, setNewThumb] = useState("");
  const handleSingleImageInput = (img) => {
    setNewThumb(img);
  };

  // Functions for product images uploads
  const [newMoreImage, setNewMoreImage] = useState([]);
  const handleMultipleImageInput = (files) => {
    setNewMoreImage(files);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      // Add changed fields to formData
      for (const key in fetchedData) {
        if (duplicateFetchData[key] !== fetchedData[key]) {
          if (key === "moreImageURL" && Array.isArray(fetchedData[key])) {
            fetchedData[key].forEach((item, index) => {
              formData.append(`${key}[${index}]`, item);
            });
          } else {
            formData.append(key, fetchedData[key]);
          }
        }
      }

      // Add new images
      if (newMoreImage.length > 0) {
        for (const file of newMoreImage) {
          formData.append("moreImageURL", file);
        }
      }

      // Add new thumbnail if changed
      if (newThumb) {
        formData.append("imageURL", newThumb);
      }

      // Dispatch the update action and wait for the result
      const resultAction = await dispatch(updateProduct({ id: id, formData: formData }));

      // Check if the update was successful
      if (updateProduct.fulfilled.match(resultAction)) {
        toast.success("Product updated successfully!");
        navigate(-1);
      } else {
        throw new Error(resultAction.error.message || "Failed to update product");
      }

    } catch (error) {
      toast.error(error.message);
      // Optionally: set some error state to show in the UI
    }
  };




  const [showConfirm, setShowConfirm] = useState(false);

  const toggleConfirm = () => {
    if (fetchedData.offer && fetchedData.offer < 1) {
      toast.error("Offer can't go below 1");
      return;
    }

    setShowConfirm(!showConfirm);
  };

  // deleting one image from the product images
  const deleteOneProductImage = (index) => {
    const updatedImages = [...fetchedData.moreImageURL];
    updatedImages.splice(index, 1);

    setFetchedData((prevData) => ({
      ...prevData,
      ["moreImageURL"]: updatedImages,
    }));
  };

  return (
    <>
      {/* Modal */}
      {showConfirm && (
        <ConfirmModal
          isOpen={showConfirm}
          title="Confirm Save?"
          onClose={toggleConfirm}
          onConfirm={handleSave}
          confirmText="Update"
        />
      )}
      {/* Product add page */}
      <div className="p-5 w-full overflow-y-scroll text-sm">
        {/* Top Bar */}
        <div className="flex justify-between items-center font-semibold">
          <div>
            <h1 className="font-bold text-2xl">Edit Products</h1>
            {/* Bread Crumbs */}

          </div>
          <div className="flex gap-3">
            <button
              className="admin-button-fl bg-gray-200 text-blue-700"
              onClick={() => navigate(-1)}
            >
              <AiOutlineClose />
              Cancel
            </button>
            <button
              className="admin-button-fl bg-blue-700 text-white"
              onClick={toggleConfirm}
            >
              <AiOutlineSave />
              Update
            </button>
          </div>
        </div>
        {/* Product Section */}
        <div className="lg:flex ">
          {/* Product Information */}
          <div className="lg:w-4/6 lg:mr-5">
            <div className="admin-div lg:flex gap-5">
              <div className="lg:w-1/3 mb-3 lg:mb-0">
                <h1 className="font-bold mb-3">Product Thumbnail</h1>
                {fetchedData.imageURL ? (
                  <div className="bg-gray-100 py-5 rounded-lg text-center border-dashed border-2">
                    <div className="h-56">
                      <img
                        src={`${fetchedData.imageURL}`}
                        alt="im"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <button
                      className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded"
                      onClick={() =>
                        setFetchedData({
                          ...fetchedData,
                          ["imageURL"]: "",
                        })
                      }
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <CustomSingleFileInput onChange={handleSingleImageInput} />
                )}
              </div>
              <div className="lg:w-2/3">
                <h1 className="font-bold">Product Information</h1>
                <p className="admin-label">Title</p>
                <input
                  type="text"
                  placeholder="Type product name here"
                  className="admin-input"
                  name="name"
                  value={fetchedData.name || ""}
                  onChange={handleInputChange}
                />
                <p className="admin-label">Description</p>
                <textarea
                  name="description"
                  id="description"
                  className="admin-input h-36"
                  placeholder="Type product description here..."
                  value={fetchedData.description || ""}
                  onChange={handleInputChange}
                ></textarea>

              </div>
            </div>
            {/* Image Uploading */}
            {/* Image Uploading */}
            <div className="admin-div">
              <h1 className="font-bold">Product Images</h1>
              {fetchedData.moreImageURL && fetchedData.moreImageURL.length > 0 && (
                <div className="bg-gray-100 py-5 rounded-lg text-center border-dashed border-2 mb-4">
                  <div className="flex flex-wrap gap-3 justify-center">
                    {fetchedData.moreImageURL.map((img, index) => (
                      <div
                        className="bg-white p-2 rounded-lg shadow-lg mb-2 w-28 h-28 relative"
                        key={index}
                      >
                        <img
                          src={`${img}`}
                          alt="img"
                          className="h-full w-full object-contain"
                        />
                        <button
                          onClick={() => deleteOneProductImage(index)}
                          className="absolute -top-2 -right-2 text-xl p-2 bg-blue-100 hover:bg-blue-200 rounded-full"
                        >
                          <AiOutlineDelete />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded"
                    onClick={() =>
                      setFetchedData({
                        ...fetchedData,
                        ["moreImageURL"]: [],
                      })
                    }
                  >
                    Delete All
                  </button>
                </div>
              )}

              {/* Always show the file input */}
              <div className="mt-4">
                <p className="admin-label my-2">Add More Images</p>
                <CustomFileInput
                  onChange={handleMultipleImageInput}
                  multiple={true}
                />
                {newMoreImage.length > 0 && (
                  <p className="text-green-600 text-sm mt-2">
                    {newMoreImage.length} new image(s) selected
                  </p>
                )}
              </div>
            </div>

          </div>
          {/* Pricing */}
          <div className="lg:w-2/6">
            <div className="admin-div">
              <h1 className="font-bold">Product Pricing</h1>
              <p className="admin-label">Amount</p>
              <input
                type="number"
                name="price"
                placeholder="Type product name here"
                className="admin-input"
                value={fetchedData.price || ""}
                onChange={handleInputChange}
              />

              <p className="admin-label">Offer</p>
              <input
                type="number"
                name="offer"
                placeholder="Type product offer here"
                className="admin-input"
                value={fetchedData.offer || ""}
                min={1}
                max={99}
                onChange={handleInputChange}
              />
            </div>
            {/* Product Tags Section */}
            <div className="admin-div mt-5">
              <h1 className="font-bold mb-3">Product Tags</h1>

              {/* Offer Product Checkbox */}
              <div className="flex items-center mb-3">
                <input
                  type="checkbox"
                  id="isOfferProduct"
                  name="isOfferProduct"
                  checked={fetchedData.isOfferProduct || false}
                  onChange={(e) => setFetchedData({
                    ...fetchedData,
                    isOfferProduct: e.target.checked
                  })}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="isOfferProduct" className="admin-label ml-2 mb-0">
                  Offer Product
                </label>
              </div>

              {/* Latest Product Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isLatestProduct"
                  name="isLatestProduct"
                  checked={fetchedData.isLatestProduct || false}
                  onChange={(e) => setFetchedData({
                    ...fetchedData,
                    isLatestProduct: e.target.checked
                  })}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="isLatestProduct" className="admin-label ml-2 mb-0">
                  Latest Product
                </label>
              </div>
            </div>
            <div className="admin-div">
              <h1 className="font-bold">Category</h1>
              <div className="relative">
                <p className="admin-label">Product Category</p>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                    className="w-full bg-gray-100 rounded-md py-2 px-3 text-sm outline-none border border-gray-200 text-left flex justify-between items-center"
                  >
                    {fetchedData.category ? (
                      categories.find(c => c._id === fetchedData.category)?.name || "Select category"
                    ) : (
                      "Select category"
                    )}
                    <svg
                      className={`h-5 w-5 text-gray-400 transform transition-transform ${categoryDropdownOpen ? "rotate-180" : ""}`}
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
                  {categoryDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {categories.map((cat) => (
                        <div
                          key={cat._id}
                          className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-50 ${fetchedData.category === cat._id ? "bg-indigo-100" : ""}`}
                          onClick={() => {
                            setFetchedData({
                              ...fetchedData,
                              category: cat._id
                            });
                            setCategoryDropdownOpen(false);
                          }}
                        >
                          <span className="font-normal block truncate">
                            {cat.name}
                          </span>
                          {fetchedData.category === cat._id && (
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
            </div>

            <div className="admin-div">
              <h1 className="font-bold">Product Status</h1>
              <div className="relative">
                <p className="admin-label">Status</p>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                    className="w-full bg-gray-100 rounded-md py-2 px-3 text-sm outline-none border border-gray-200 text-left flex justify-between items-center capitalize"
                  >
                    {fetchedData.status || "Select status"}
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
                      {statusList.map((option) => (
                        <div
                          key={option}
                          className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-50 ${fetchedData.status === option ? "bg-indigo-100" : ""}`}
                          onClick={() => {
                            setFetchedData({
                              ...fetchedData,
                              status: option
                            });
                            setStatusDropdownOpen(false);
                          }}
                        >
                          <span className="font-normal block truncate capitalize">
                            {option}
                          </span>
                          {fetchedData.status === option && (
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
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default EditProduct;
