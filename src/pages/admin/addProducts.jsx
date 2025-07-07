import React, { useState, useCallback } from "react";
import {
  FiPlus,
  FiSave,
  FiX,
  FiUpload,
  FiImage,
  FiTrash2,
} from "react-icons/fi";

const AddProducts = () => {
  const allCategories = [
    "New Arrivals",
    "Best Offers",
    "Live Plants",
    "Starters",
    "Aquarium Essentials",
    "Aquarium Food",
    "Aquarium Filters",
    "Aquarium Supplyment",
    "Aquarium Tanks",
    "Aquarium Lights",
    "Aquarium Driftwoods",
    "Aquarium Toys",
  ];

  const [newProduct, setNewProduct] = useState({
    id: Date.now(),
    name: "",
    price: "",
    offerPrice: "",
    stock: "",
    categories: [],
    images: [],
    description: "",
  });

  const [newImageUrl, setNewImageUrl] = useState("");
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "offerPrice" || name === "stock"
          ? Number(value)
          : value,
    }));
  };

  const handleCategoryChange = (category) => {
    setNewProduct((prev) => {
      if (prev.categories.includes(category)) {
        return {
          ...prev,
          categories: prev.categories.filter((c) => c !== category),
        };
      } else {
        return {
          ...prev,
          categories: [...prev.categories, category],
        };
      }
    });
  };

  const addNewImage = () => {
    if (newImageUrl.trim() && !newProduct.images.includes(newImageUrl)) {
      setNewProduct((prev) => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()],
      }));
      setNewImageUrl("");
    }
  };

  const removeImage = (index) => {
    const newImages = [...newProduct.images];
    newImages.splice(index, 1);
    setNewProduct((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const setPrimaryImage = (index) => {
    const newImages = [...newProduct.images];
    const [removed] = newImages.splice(index, 1);
    newImages.unshift(removed);
    setNewProduct((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  // Simulate file upload (in a real app, you would upload to a server)
  const handleFileUpload = (files) => {
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Process each file (in a real app, you would upload to a server)
    Array.from(files).forEach((file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        // In a real app, you would get the URL from your server after upload
        const imageUrl = e.target.result;

        setNewProduct((prev) => ({
          ...prev,
          images: [...prev.images, imageUrl],
        }));

        // Reset progress after a short delay
        setTimeout(() => {
          setUploadProgress(null);
        }, 500);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  }, []);

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files);
      // Reset file input
      e.target.value = null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New product:", newProduct);
    alert("Product added successfully! (Not actually saved in this demo)");
    setNewProduct({
      id: Date.now(),
      name: "",
      price: "",
      offerPrice: "",
      stock: "",
      categories: [],
      images: [],
      description: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h1 className="text-xl font-medium text-gray-800">
              Add New Product
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-5">
            <div className="grid grid-cols-1 gap-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
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
                  value={newProduct.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              {/* Price Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Regular Price (₹)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Offer Price (₹)
                  </label>
                  <input
                    type="number"
                    name="offerPrice"
                    value={newProduct.offerPrice}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    min="0"
                    step="0.01"
                    placeholder="Optional"
                  />
                </div>
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stock"
                  value={newProduct.stock}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                  min="0"
                />
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categories
                </label>
                <div className="flex flex-wrap gap-2">
                  {allCategories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleCategoryChange(category)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        newProduct.categories.includes(category)
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                {newProduct.categories.length > 0 && (
                  <p className="mt-2 text-sm text-gray-500">
                    Selected: {newProduct.categories.join(", ")}
                  </p>
                )}
              </div>
            </div>

            {/* Images Section */}
            <div className="pt-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images
              </label>

              <div className="flex flex-wrap gap-5">
                {/* Main Image Preview (same as before) */}
              {newProduct.images.length > 0 ? (
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Primary Image</p>
                  <div className="h-64 w-64 bg-gray-100 rounded-lg overflow-hidden relative group">
                    <img
                      src={newProduct.images[0]}
                      alt="Primary product"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity">
                      <button
                        type="button"
                        onClick={() => {
                          if (newProduct.images.length > 1) {
                            const newImages = [...newProduct.images];
                            newImages.shift();
                            setNewProduct((prev) => ({
                              ...prev,
                              images: newImages,
                            }));
                          } else {
                            setNewProduct((prev) => ({
                              ...prev,
                              images: [],
                            }));
                          }
                        }}
                        className="p-2 text-white hover:text-red-200"
                        title="Delete image"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-4 h-64 w-64 grid place-items-center p-4 bg-gray-50 rounded-lg text-center">
                  <div>
                    <FiImage className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    No primary image selected
                  </p>
                  </div>
                </div>
              )}

              {/* Additional Images (same as before) */}
              {newProduct.images.length > 1 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">
                    Additional Images
                  </p>
                  <div className="flex gap-2">
                    {newProduct.images.slice(1).map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="h-24 w-24 bg-gray-100 rounded-md overflow-hidden">
                          <img
                            src={image}
                            alt={`Product ${index + 2}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity">
                          <button
                            type="button"
                            onClick={() => setPrimaryImage(index + 1)}
                            className="p-1 text-white hover:text-indigo-200 mr-1"
                            title="Set as primary"
                          >
                            <FiImage className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeImage(index + 1)}
                            className="p-1 text-white hover:text-red-200"
                            title="Remove image"
                          >
                            <FiX className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              </div>

              {/* Add Image Section - Updated with Drag and Drop */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Add Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Paste image URL"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={addNewImage}
                    disabled={!newImageUrl.trim()}
                    className={`px-3 py-2 rounded-md flex items-center ${
                      newImageUrl.trim()
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <FiPlus className="mr-1" /> Add
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-2 bg-white text-sm text-gray-500">
                      or
                    </span>
                  </div>
                </div>

                {/* Drag and Drop Area */}
                <div
                  className={`mt-4 border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    isDragActive
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <FiUpload className="h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      {isDragActive
                        ? "Drop your images here"
                        : "Drag and drop images here"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Supports JPG, PNG up to 5MB
                    </p>

                    {/* Upload Progress Indicator */}
                    {uploadProgress !== null && (
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div
                          className="bg-indigo-600 h-2.5 rounded-full"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    )}

                    <label className="mt-4 cursor-pointer">
                      <span className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Select Files
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/*"
                        onChange={handleFileInputChange}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions (same as before) */}
            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FiSave className="inline mr-2" />
                Save Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
