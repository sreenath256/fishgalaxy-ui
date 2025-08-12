import React, { useEffect, useState } from 'react';
import { URL } from '../../../Common/api';
import { config } from '../../../Common/configurations';
import axios from 'axios';
import Slider from '@mui/material/Slider';
import Skeleton from 'react-loading-skeleton';

const FilterSidebar = ({ category, setCategory, priceRange, setPriceRange, handleClick }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);

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

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handlePriceCommit = (event, newValue) => {
        handleClick('priceRange', newValue.join(','));
    };

    const clearCategoryFilter = () => {
        setCategory([]);
        handleClick('category', '');
    };

    return (
        <div className="hidden md:block w-1/4 bg-white p-4 rounded-lg shadow-sm md:sticky top-[100px] h-[calc(100vh-32px)] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium text-gray-800">Categories</h2>
                {

                    category.length > 0 && (
                        <button
                            onClick={clearCategoryFilter}
                            className="text-sm text-indigo-600 hover:text-indigo-800"
                        >
                            CLEAR
                        </button>
                    )}
            </div>

            <ul className="space-y-2 max-h-[500px] overflow-auto">
                {
                    isLoading ? (
                        Array.from({ length: 7 }).map((_, idx) => (
                            <Skeleton className='' key={idx}  height={40} />
                        ))
                    ) :
                        categories.map(cat => (
                            <li key={cat.name}>
                                <button
                                    onClick={() => handleClick('category', cat.name)}
                                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${category.includes(cat.name)
                                        ? 'bg-indigo-100 text-mainclr'
                                        : 'hover:bg-gray-100'
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            </li>
                        ))}
            </ul>

            <div className="mt-6">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold">Price Range</h3>
                    {priceRange[0] !== 0 || priceRange[1] !== 2000 ? (
                        <button
                            onClick={() => handleClick('priceRange', '')}
                            className="text-sm text-indigo-600 hover:text-indigo-800"
                        >
                            CLEAR
                        </button>
                    ) : null}
                </div>

                <div className="px-2">
                    <Slider
                        value={priceRange}
                        onChange={handlePriceChange}
                        onChangeCommitted={handlePriceCommit}
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
                            <span>₹{priceRange[0]}</span>
                        </div>
                        <span className="text-gray-400">to</span>
                        <div className="flex-1 border rounded-md p-2">
                            <span className="text-xs text-gray-500 block">Max</span>
                            <span>₹{priceRange[1]}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;