import React, { useState, useCallback } from "react";
import {
  FiSearch,
  FiFilter,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiPlus,
  FiX,
  FiSave,
  FiUpload,
  FiImage,
} from "react-icons/fi";
import { aquariumProducts } from "../../components/Data"; // Adjust the import path

const AllProducts = () => {
  // State for filters, search, pagination, and modals
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const productsPerPage = 6;

  // Get all unique categories for filter dropdown
  const allCategories = [
    "All",
    ...new Set(aquariumProducts.flatMap((product) => product.categories)),
  ];

  // Filter and search logic - fixed to properly search all fields
  const filteredProducts = aquariumProducts.filter((product) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.categories.some((cat) =>
        cat.toLowerCase().includes(searchLower)
      ) ||
      product.price.toString().includes(searchTerm) ||
      (product.offerPrice &&
        product.offerPrice.toString().includes(searchTerm));

    const matchesCategory =
      categoryFilter === "All" || product.categories.includes(categoryFilter);

    const matchesStock =
      stockFilter === "All" ||
      (stockFilter === "In Stock" && product.stock > 10) ||
      (stockFilter === "Low Stock" &&
        product.stock > 0 &&
        product.stock <= 10) ||
      (stockFilter === "Out of Stock" && product.stock === 0);

    return matchesSearch && matchesCategory && matchesStock;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // View product details
  const viewProductDetails = (product) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };

  // Edit product
  const editProduct = (product) => {
    setEditedProduct({ ...product });
    setNewImageUrl("");
    setIsEditModalOpen(true);
  };

  // Handle edit input changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "offerPrice" || name === "stock"
          ? Number(value)
          : value,
    }));
  };

  // Add new image URL
  const addNewImage = () => {
    if (newImageUrl.trim() && !editedProduct.images.includes(newImageUrl)) {
      setEditedProduct((prev) => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()],
      }));
      setNewImageUrl("");
    }
  };

  // Remove image
  const removeImage = (index) => {
    const newImages = [...editedProduct.images];
    newImages.splice(index, 1);
    setEditedProduct((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  // Set as primary image
  const setPrimaryImage = (index) => {
    const newImages = [...editedProduct.images];
    const [removed] = newImages.splice(index, 1);
    newImages.unshift(removed);
    setEditedProduct((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  // Handle file drop
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target.result;
          setEditedProduct(prev => ({
            ...prev,
            images: [...prev.images, imageUrl]
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  // Save edited product
  const saveEditedProduct = () => {
    // In a real app, you would update the database here
    console.log("Product updated:", editedProduct);
    setIsEditModalOpen(false);
    // For demo purposes, we'll just show an alert
    alert("Product updated successfully!");
  };

  // Delete product with confirmation
  const deleteProduct = (product) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${product.name}"? This action cannot be undone.`
      )
    ) {
      // In a real app, you would delete from the database here
      console.log("Product deleted:", product);
      // For demo purposes, we'll just show an alert
      alert(
        "Product deleted successfully! (Not actually deleted in this demo)"
      );
    }
  };

  // Close modal
  const closeModal = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
  };

  // Get stock status color and text
  const getStockStatus = (stock) => {
    if (stock > 10)
      return { text: "In Stock", color: "bg-green-100 text-green-800" };
    if (stock > 0)
      return { text: "Low Stock", color: "bg-yellow-100 text-yellow-800" };
    return { text: "Out of Stock", color: "bg-red-100 text-red-800" };
  };

  // Format price with Indian Rupee symbol
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header with search and filter */}
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <h1 className="text-xl font-medium text-gray-800">
                  Aquarium Products
                </h1>
                <span className="ml-2 px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                  {filteredProducts.length} products
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:w-64"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1); // Reset to first page when searching
                    }}
                  />
                </div>

                <div className="flex gap-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiFilter className="text-gray-400" />
                    </div>
                    <select
                      className="pl-10 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:w-48"
                      value={categoryFilter}
                      onChange={(e) => {
                        setCategoryFilter(e.target.value);
                        setCurrentPage(1); // Reset to first page when filtering
                      }}
                    >
                      {allCategories.map((category) => (
                        <option key={category} value={category}>
                          {category === "All" ? "All Categories" : category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiFilter className="text-gray-400" />
                    </div>
                    <select
                      className="pl-10 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:w-36"
                      value={stockFilter}
                      onChange={(e) => {
                        setStockFilter(e.target.value);
                        setCurrentPage(1); // Reset to first page when filtering
                      }}
                    >
                      <option value="All">All Stock</option>
                      <option value="In Stock">In Stock</option>
                      <option value="Low Stock">Low Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Categories
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Offer Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Stock
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentProducts.length > 0 ? (
                  currentProducts.map((product) => {
                    const stockStatus = getStockStatus(product.stock);
                    return (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-md object-cover"
                                src={product.images[0]}
                                alt={product.name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {product.name}
                              </div>
                              <div className="text-sm text-gray-500 line-clamp-1">
                                {product.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {product.categories.map((category, i) => (
                              <span
                                key={i}
                                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                              >
                                {category}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`text-sm ${
                              product.offerPrice
                                ? "text-gray-500 line-through"
                                : "text-gray-900 font-medium"
                            }`}
                          >
                            {formatPrice(product.price)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {product.offerPrice ? (
                            <div className="text-sm font-medium text-green-600">
                              {formatPrice(product.offerPrice)}
                            </div>
                          ) : (
                            <div className="text-sm text-gray-400">-</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${stockStatus.color}`}
                            >
                              {stockStatus.text} ({product.stock})
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => viewProductDetails(product)}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="View details"
                            >
                              <FiEye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => editProduct(product)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Edit"
                            >
                              <FiEdit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteProduct(product)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <FiTrash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No products found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredProducts.length > productsPerPage && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex flex-col md:flex-row gap-y-3 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {indexOfFirstProduct + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastProduct, filteredProducts.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {filteredProducts.length}
                    </span>{" "}
                    products
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400"
                          : "bg-white text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span className="sr-only">First</span>
                      <FiChevronsLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400"
                          : "bg-white text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span className="sr-only">Previous</span>
                      <FiChevronLeft className="h-5 w-5" />
                    </button>

                    {/* Page numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === page
                              ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}

                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400"
                          : "bg-white text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span className="sr-only">Next</span>
                      <FiChevronRight className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400"
                          : "bg-white text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span className="sr-only">Last</span>
                      <FiChevronsRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Details Modal */}
      {isViewModalOpen && selectedProduct && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div
                className="absolute inset-0 bg-gray-500 opacity-75"
                onClick={closeModal}
              ></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {selectedProduct.name}
                      </h3>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={closeModal}
                      >
                        <span className="sr-only">Close</span>
                        <FiX className="h-6 w-6" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <div className="h-64 w-full bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={selectedProduct.images[0]}
                            alt={selectedProduct.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        {selectedProduct.images.length > 1 && (
                          <div className="mt-4 grid grid-cols-3 gap-2">
                            {selectedProduct.images
                              .slice(1)
                              .map((image, index) => (
                                <div
                                  key={index}
                                  className="h-20 bg-gray-100 rounded-md overflow-hidden"
                                >
                                  <img
                                    src={image}
                                    alt={`${selectedProduct.name} ${index + 2}`}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              ))}
                          </div>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Description
                          </h4>
                          <p className="mt-1 text-sm text-gray-900">
                            {selectedProduct.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">
                              Regular Price
                            </h4>
                            <p className="mt-1 text-lg font-medium text-gray-900">
                              {formatPrice(selectedProduct.price)}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">
                              Offer Price
                            </h4>
                            <p className="mt-1 text-lg font-medium text-green-600">
                              {selectedProduct.offerPrice
                                ? formatPrice(selectedProduct.offerPrice)
                                : "-"}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Stock Status
                          </h4>
                          <div className="mt-1">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                getStockStatus(selectedProduct.stock).color
                              }`}
                            >
                              {getStockStatus(selectedProduct.stock).text} (
                              {selectedProduct.stock})
                            </span>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Categories
                          </h4>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {selectedProduct.categories.map((category, i) => (
                              <span
                                key={i}
                                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                              >
                                {category}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {isEditModalOpen && editedProduct && (
  <div className="fixed z-50 inset-0 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div
        className="fixed inset-0 transition-opacity"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-gray-500 opacity-75"
          onClick={closeModal}
        ></div>
      </div>

      <span
        className="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
      >
        &#8203;
      </span>

      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Edit Product: {editedProduct.name}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500"
                  onClick={closeModal}
                >
                  <span className="sr-only">Close</span>
                  <FiX className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="h-64 w-full bg-gray-100 rounded-lg overflow-hidden mb-4 relative group">
                    <img
                      src={editedProduct.images[0] || `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUA6k0PCjXsBjVV0-FdQkZotIJ8UBYEDfhXw&s`}
                      alt={editedProduct.name}
                      className="h-full w-full object-cover"
                    />
                    {editedProduct.images.length > 1 && (
                      <div className="absolute top-2 left-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Primary
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity">
                      <button
                        onClick={() => {
                          if (editedProduct.images.length > 1) {
                            const newImages = [...editedProduct.images];
                            newImages.shift();
                            setEditedProduct((prev) => ({
                              ...prev,
                              images: newImages,
                            }));
                          } else {
                            setEditedProduct((prev) => ({
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

                  {/* Additional Images */}
                  {editedProduct.images.length > 1 ? (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Additional Images
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        {editedProduct.images
                          .slice(1)
                          .map((image, index) => (
                            <div key={index} className="relative group">
                              <div className="h-20 bg-gray-100 rounded-md overflow-hidden">
                                <img
                                  src={image}
                                  alt={`${editedProduct.name} ${index + 2}`}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity">
                                <button
                                  onClick={() => setPrimaryImage(index + 1)}
                                  className="p-1 text-white hover:text-indigo-200 mr-1"
                                  title="Set as primary"
                                >
                                  <FiImage className="h-4 w-4" />
                                </button>
                                <button
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
                  ) : (
                    editedProduct.images.length === 0 && (
                      <div className="mb-4 p-4 bg-gray-50 rounded-lg text-center">
                        <FiImage className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">
                          No images added
                        </p>
                      </div>
                    )
                  )}

                  {/* Image Upload Section */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Add New Images
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <button
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
                    
                    {/* Drop Area */}
                    <div 
                      className={`mt-2 p-4 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
                        isDragOver 
                          ? "border-indigo-500 bg-indigo-50" 
                          : "border-gray-300 hover:border-indigo-400"
                      }`}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => document.getElementById('fileInput').click()}
                    >
                      <FiUpload className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Drag & drop images here, or click to browse
                      </p>
                      <p className="text-xs text-gray-500">
                        Supports JPG, PNG up to 5MB (multiple selection allowed)
                      </p>
                    </div>
                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      multiple
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files) {
                          Array.from(files).forEach(file => {
                            if (file.type.startsWith('image/')) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const imageUrl = event.target.result;
                                setEditedProduct(prev => ({
                                  ...prev,
                                  images: [...prev.images, imageUrl]
                                }));
                              };
                              reader.readAsDataURL(file);
                            }
                          });
                        }
                        e.target.value = '';
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editedProduct.name}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={editedProduct.description}
                      onChange={handleEditChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Regular Price (₹)
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={editedProduct.price}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Offer Price (₹)
                      </label>
                      <input
                        type="number"
                        name="offerPrice"
                        value={editedProduct.offerPrice || ""}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Leave empty for no offer"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={editedProduct.stock}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Categories
                    </label>
                    <div className="relative">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {editedProduct.categories.map(
                          (category, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                            >
                              {category}
                              <button
                                type="button"
                                className="ml-1.5 inline-flex text-indigo-400 hover:text-indigo-600 focus:outline-none"
                                onClick={() => {
                                  const newCategories = [
                                    ...editedProduct.categories,
                                  ];
                                  newCategories.splice(index, 1);
                                  setEditedProduct((prev) => ({
                                    ...prev,
                                    categories: newCategories,
                                  }));
                                }}
                              >
                                <FiX className="h-3 w-3" />
                              </button>
                            </span>
                          )
                        )}
                      </div>

                      <div className="mt-2">
                        <p className="text-xs text-gray-500 mb-1">
                          Available categories:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {Array.from(
                            new Set(
                              aquariumProducts.flatMap(
                                (product) => product.categories
                              )
                            )
                          ).map((category) => (
                            <button
                              key={category}
                              type="button"
                              className={`text-xs px-2 py-1 rounded-full border ${
                                editedProduct.categories.includes(
                                  category
                                )
                                  ? "bg-indigo-100 text-indigo-800 border-indigo-200"
                                  : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                              }`}
                              onClick={() => {
                                if (
                                  editedProduct.categories.includes(
                                    category
                                  )
                                ) {
                                  setEditedProduct((prev) => ({
                                    ...prev,
                                    categories: prev.categories.filter(
                                      (c) => c !== category
                                    ),
                                  }));
                                } else {
                                  setEditedProduct((prev) => ({
                                    ...prev,
                                    categories: [
                                      ...prev.categories,
                                      category,
                                    ],
                                  }));
                                }
                              }}
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={saveEditedProduct}
          >
            <FiSave className="mr-2 h-5 w-5" />
            Save Changes
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default AllProducts;