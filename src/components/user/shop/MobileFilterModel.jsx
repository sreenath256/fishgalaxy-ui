import React, { useEffect, useState, useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { URL } from '../../../Common/api';
import { config } from '../../../Common/configurations';
import axios from 'axios';
import Slider from '@mui/material/Slider';
import Skeleton from 'react-loading-skeleton';

const MobileFilterModal = ({
    showFilters,
    setShowFilters,
    category,
    setCategory,
    priceRange,
    setPriceRange,
    handleClick
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [localPriceRange, setLocalPriceRange] = useState(priceRange);
    const modalRef = useRef();
    const overlayRef = useRef();

    const fetchData = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const { data } = await axios.get(`${URL}/user/categories`, config);
            setCategories(data.categories);
        } catch (err) {
            console.error(err);
            setError('Failed to load categories. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setLocalPriceRange(priceRange);
    }, [priceRange]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };

        if (showFilters) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = ''; // Re-enable scrolling
        };
    }, [showFilters]);

    const handlePriceChange = (event, newValue) => {
        setLocalPriceRange(newValue);
    };

    const closeModal = () => {
        setShowFilters(false);
    };

    const applyFilters = () => {
        setPriceRange(localPriceRange);
        handleClick('priceRange', localPriceRange.join(','));
        closeModal();
    };

    const clearCategoryFilter = () => {
        setCategory([]);
        handleClick('category', '');
    };

    const clearPriceFilter = () => {
        setLocalPriceRange([0, 10000]);
        handleClick('priceRange', '');
    };

    return (
        <>
            {/* Overlay with fade animation */}
            <div 
                ref={overlayRef}
                className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
                    showFilters ? 'opacity-50' : 'opacity-0 pointer-events-none'
                }`}
                onClick={closeModal}
            />
            
            {/* Modal with slide-in animation */}
            <div 
                ref={modalRef}
                className={`fixed top-0 right-0 h-full w-4/5 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-out ${
                    showFilters ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="p-4 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-medium">Filters</h2>
                        <button 
                            onClick={closeModal}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <AiOutlineClose className="text-xl" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {/* Categories Section */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-semibold">Categories</h3>
                                {category.length > 0 && (
                                    <button
                                        onClick={clearCategoryFilter}
                                        className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
                                    >
                                        CLEAR
                                    </button>
                                )}
                            </div>

                            <ul className="space-y-2 max-h-[300px] overflow-auto">
                                {isLoading ? (
                                    Array.from({ length: 5 }).map((_, idx) => (
                                        <Skeleton key={idx} height={40} />
                                    ))
                                ) : (
                                    categories.map(cat => (
                                        <li key={cat.name}>
                                            <button
                                                onClick={() => handleClick('category', cat.name)}
                                                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                                                    category.includes(cat.name)
                                                        ? 'bg-indigo-100 text-mainclr'
                                                        : 'hover:bg-gray-100'
                                                }`}
                                            >
                                                {cat.name}
                                            </button>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>

                        {/* Price Range Section */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-semibold">Price Range</h3>
                                {(localPriceRange[0] !== 0 || localPriceRange[1] !== 10000) && (
                                    <button
                                        onClick={clearPriceFilter}
                                        className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
                                    >
                                        CLEAR
                                    </button>
                                )}
                            </div>

                            <div className="px-2">
                                <Slider
                                    value={localPriceRange}
                                    onChange={handlePriceChange}
                                    min={0}
                                    max={10000}
                                    step={100}
                                    valueLabelDisplay="auto"
                                    valueLabelFormat={(value) => `₹${value}`}
                                    disableSwap
                                    className="mb-4"
                                />

                                <div className="flex justify-between items-center gap-2">
                                    <div className="flex-1 border rounded-md p-2">
                                        <span className="text-xs text-gray-500 block">Min</span>
                                        <span>₹{localPriceRange[0]}</span>
                                    </div>
                                    <span className="text-gray-400">to</span>
                                    <div className="flex-1 border rounded-md p-2">
                                        <span className="text-xs text-gray-500 block">Max</span>
                                        <span>₹{localPriceRange[1]}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Apply Button */}
                    <div className="pt-4 border-t">
                        <button
                            onClick={applyFilters}
                            className="w-full py-3 bg-mainclr text-white rounded-md hover:bg-mainhvr transition-colors"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileFilterModal;