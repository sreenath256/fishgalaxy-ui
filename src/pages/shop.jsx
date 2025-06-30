import React, { useState } from 'react';
import { aquariumProducts, categoryImages } from '../components/Data';
import { FiFilter, FiChevronDown, FiChevronUp, FiStar, FiX } from 'react-icons/fi';
import { IoMdCart } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState([0, 200]);
    const [sortOption, setSortOption] = useState('featured');
    const [showFilters, setShowFilters] = useState(false);

    console.log(aquariumProducts);

    // Get all unique categories
    const categories = ['All', ...Object.keys(categoryImages)];

    // Filter products based on selected category and filters
    const filteredProducts = aquariumProducts.filter(product => {
        const matchesCategory = selectedCategory === 'All' ||
            product.categories.includes(selectedCategory);
        const matchesPrice = product.offerPrice >= priceRange[0] &&
            product.offerPrice <= priceRange[1];

        return matchesCategory && matchesPrice;
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOption === 'price-low') return a.offerPrice - b.offerPrice;
        if (sortOption === 'price-high') return b.offerPrice - a.offerPrice;
        if (sortOption === 'name') return a.name.localeCompare(b.name);
        return a.id - b.id; // default sort
    });

    // Remove duplicate products (fix duplicate IDs in data)
    const uniqueProducts = sortedProducts.filter((product, index, self) =>
        index === self.findIndex(p => p.id === product.id && p.name === product.name)
    );

    return (
        <div className="w-[98%] md:w-11/12 mx-auto py-8 relative">
            {/* Mobile Filter Modal Overlay */}
            {showFilters && (
                <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
                    <div className={`fixed left-0 top-0 h-full w-80 bg-white transform transition-transform duration-300 ease-in-out ${showFilters ? 'translate-x-0' : '-translate-x-full'}`}>
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                            <button
                                onClick={() => setShowFilters(false)}
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                                <FiX size={20} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-4 overflow-y-auto h-[calc(100vh-80px)]">
                            {/* Categories */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-4 text-gray-800">Categories</h3>
                                <ul className="space-y-2">
                                    {categories.map(category => (
                                        <li key={category}>
                                            <button
                                                onClick={() => {
                                                    setSelectedCategory(category);
                                                    setShowFilters(false);
                                                }}
                                                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${selectedCategory === category
                                                    ? 'bg-indigo-100 text-mainclr'
                                                    : 'hover:bg-gray-100'
                                                    }`}
                                            >
                                                {category}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <h3 className="font-semibold mb-3">Price Range</h3>
                                <div className="px-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="200"
                                        step="5"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                        className="w-full mb-2"
                                    />
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>₹{priceRange[0]}</span>
                                        <span>₹{priceRange[1]}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Stock Status */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Stock Status
                                </label>
                                <div className="text-sm text-gray-600">
                                    {uniqueProducts.length} products available
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            )}

            <div className=" flex flex-col md:flex-row gap-6">
                {/* Desktop Sidebar - 1/4 width */}
               <div className="hidden md:block w-1/4 bg-white p-4 rounded-lg shadow-sm md:sticky top-[100px] h-[calc(100vh-32px)] overflow-y-auto">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Categories</h2>
                    <ul className="space-y-2">
                        {categories.map(category => (
                            <li key={category}>
                                <button
                                    onClick={() => setSelectedCategory(category)}
                                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${selectedCategory === category
                                        ? 'bg-indigo-100 text-mainclr'
                                        : 'hover:bg-gray-100'
                                        }`}
                                >
                                    {category}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Desktop Filters */}
                    <div className="mt-6">
                        <h3 className="font-semibold mb-3">Price Range</h3>
                        <div className="px-2">
                            <input
                                type="range"
                                min="0"
                                max="200"
                                step="5"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                className="w-full mb-2"
                            />
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>₹{priceRange[0]}</span>
                                <span>₹{priceRange[1]}</span>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Stock Status
                            </label>
                            <div className="text-sm text-gray-600">
                                {uniqueProducts.length} products available
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="w-full md:w-3/4">
                    <div className='flex items-end md:items-center rounded-lg shadow-sm justify-between gap-1 mb-6'>
                        {/* Mobile Filter Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setShowFilters(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-mainclr text-white"
                            >
                                <FiFilter />
                                <span>Filters</span>
                            </button>
                        </div>

                        {/* Sorting and results count */}
                        <div className="bg-white pb-2  w-full flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
                            <div className='hidden md:block'>
                                <p className="text-gray-600">
                                    Showing <span className="font-medium">{uniqueProducts.length}</span> results
                                    {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="text-gray-600">Sort by:</label>
                                <select
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                    className="border rounded-md px-3 py-1 text-sm"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="name">Name A-Z</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    {uniqueProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                            {uniqueProducts.map((product, index) => (
                                <Link to={`/shop/1`}>
                                <div  key={`${product.id}-${index}`} className="bg-white flex flex-col justify-between rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                                    <div className="aspect-square overflow-hidden relative">
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="w-full h-full object-contain hover:scale-105 transition-transform"
                                        />
                                        {product.offerPrice < product.price && (
                                            <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] px-2 py-1 rounded-full">
                                                {Math.round((1 - product.offerPrice / product.price) * 100)}% OFF
                                            </span>
                                        )}
                                        {product.stock < 10 && product.stock > 0 && (
                                            <span className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] px-2 py-1 rounded-full">
                                                Only {product.stock} left
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-sm font-medium text-gray-800 mb-1">{product.name}</h3>
                                        <p className="text-xs text-gray-600 mb-3">
                                            {product.description.split(' ').slice(0, 5).join(' ') +
                                                (product.description.split(' ').length > 5 ? '...' : '')}
                                        </p>

                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-medium text-mainclr">₹{product.offerPrice}</span>
                                            {product.offerPrice < product.price && (
                                                <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
                                            )}
                                        </div>

                                        {/* Add to Cart Button */}
                                        <button className="mt-4 w-full text-sm bg-mainclr hover:bg-mainhvr00 text-white py-2 px-4 rounded-sm transition-colors flex items-center justify-center gap-2">
                                            <IoMdCart />
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                            <h3 className="text-lg font-medium text-gray-700 mb-2">No products found</h3>
                            <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
                            <button
                                onClick={() => {
                                    setSelectedCategory('All');
                                    setPriceRange([0, 200]);
                                }}
                                className="mt-4 text-mainclr hover:text-mainhvr font-medium"
                            >
                                Reset all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;