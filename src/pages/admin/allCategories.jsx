import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiEdit, FiImage, FiUpload, FiX } from 'react-icons/fi';
import p1 from "../../assets/images/pr1.jpg";
import p2 from "../../assets/images/pr2.jpg";
import p3 from "../../assets/images/pr3.jpg";
import p4 from "../../assets/images/pr4.jpg";

const AllCategories = () => {
  // Sample initial categories
  const [categories, setCategories] = useState([
    { id: 1, title: 'Live Plants', image: p1},
    { id: 2, title: 'Aquarium Tanks', image: p2},
    { id: 3, title: 'Aquarium Food', image: p3},
    { id: 4, title: 'Aquarium Filters', image: p4},
    { id: 5, title: 'Live Plants', image: p1},
    { id: 6, title: 'Aquarium Tanks', image: p2},
    { id: 7, title: 'Aquarium Food', image: p3},
    { id: 8, title: 'Aquarium Filters', image: p4},
  ]);

  // Form state for adding new category
  const [newCategory, setNewCategory] = useState({
    title: '',
    image: null,
    previewImage: ''
  });

  const [isEditing, setIsEditing] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCategory(prev => ({
          ...prev,
          image: file,
          previewImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag and drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCategory(prev => ({
          ...prev,
          image: file,
          previewImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new category
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCategory.title.trim()) return;

    if (isEditing !== null) {
      // Update existing category
      const updatedCategories = categories.map(cat => 
        cat.id === isEditing ? { 
          ...cat, 
          title: newCategory.title,
          image: newCategory.previewImage || cat.image
        } : cat
      );
      setCategories(updatedCategories);
    } else {
      // Add new category
      const newCat = {
        id: Date.now(),
        title: newCategory.title,
        image: newCategory.previewImage || 'https://via.placeholder.com/150'
      };
      setCategories([...categories, newCat]);
    }

    // Reset form
    setNewCategory({
      title: '',
      image: null,
      previewImage: ''
    });
    setIsEditing(null);
  };

  // Delete category
  const deleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  // Edit category
  const editCategory = (id) => {
    const categoryToEdit = categories.find(cat => cat.id === id);
    setNewCategory({
      title: categoryToEdit.title,
      image: null,
      previewImage: categoryToEdit.image
    });
    setIsEditing(id);
  };

  // Cancel edit
  const cancelEdit = () => {
    setNewCategory({
      title: '',
      image: null,
      previewImage: ''
    });
    setIsEditing(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl font-medium text-gray-800 mb-5">All Categories</h1>
        
        {/* Current Categories Grid */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Current Categories</h2>
          
          {categories.length === 0 ? (
            <p className="text-gray-500">No categories added yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories.map(category => (
                <div key={category.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className=" bg-gray-100 relative">
                    <img 
                      src={category.image} 
                      alt={category.title} 
                      className="w-full h-full aspect-square object-cover"
                    />
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <button 
                        onClick={() => editCategory(category.id)}
                        className="p-1 bg-white rounded-full shadow hover:bg-gray-100"
                        title="Edit"
                      >
                        <FiEdit className="text-blue-500" />
                      </button>
                      <button 
                        onClick={() => deleteCategory(category.id)}
                        className="p-1 bg-white rounded-full shadow hover:bg-gray-100"
                        title="Delete"
                      >
                        <FiTrash2 className="text-red-500" />
                      </button>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-gray-800 text-sm truncate">{category.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add/Edit Category Form */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {isEditing !== null ? 'Edit Category' : 'Add New Category'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 xl:w-1/2 gap-6">
              {/* Category Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Title</label>
                <input
                  type="text"
                  name="title"
                  value={newCategory.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter category name"
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Image</label>
                
                {newCategory.previewImage ? (
                  <div className="relative">
                    <img 
                      src={newCategory.previewImage} 
                      alt="Preview" 
                      className="h-40 w-full object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={() => setNewCategory(prev => ({ ...prev, image: null, previewImage: '' }))}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-gray-100"
                    >
                      <FiX className="text-red-500" />
                    </button>
                  </div>
                ) : (
                  <div 
                    className={`border-2 border-dashed rounded-md p-4 text-center ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <FiImage className="h-8 w-8 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        {isDragActive ? 'Drop your image here' : 'Drag and drop image here'}
                      </p>
                      <p className="text-xs text-gray-500">Supports JPG, PNG up to 5MB</p>
                      <label className="mt-2 cursor-pointer">
                        <span className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700 inline-flex items-center">
                          <FiUpload className="mr-1" /> Select Image
                        </span>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          required
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-6 flex justify-end space-x-3">
              {isEditing !== null && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 inline-flex items-center"
              >
                <FiPlus className="mr-1" />
                {isEditing !== null ? 'Update Category' : 'Add Category'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AllCategories;