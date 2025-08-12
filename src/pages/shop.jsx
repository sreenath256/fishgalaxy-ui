import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getUserProducts } from '../redux/actions/user/userProductActions';
import ProductList from '../components/user/shop/ProductList';
import FilterSidebar from '../components/user/shop/FilterSidebar';
import MobileFilterModal from '../components/user/shop/MobileFilterModel';
import SortBar from '../components/user/shop/SortBar';

const Shop = () => {
    const { userProducts, loading, totalAvailableProducts } = useSelector(state => state.userProducts);
    const dispatch = useDispatch();

    // Loading state


    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 2000]);
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const categoryParam = searchParams.get("category");
        const priceRangeParam = searchParams.get("priceRange");
        const searchParam = searchParams.get("search");
        const sortParam = searchParams.get("sort");
        const pageParam = searchParams.get("page");

        setCategory(categoryParam ? categoryParam.split(',') : []);
        setPriceRange(priceRangeParam ? priceRangeParam.split(',').map(Number) : [0, 10000]);
        setSearch(searchParam || '');
        setSort(sortParam || '');
        setPage(parseInt(pageParam || 1));
    }, []);

    useEffect(() => {

        dispatch(getUserProducts(searchParams));
    }, [searchParams, dispatch]);

    const handleClick = (param, value) => {
        const params = new URLSearchParams(window.location.search);

        if (value === '' || (param === 'page' && value === 1)) {
            params.delete(param);
        } else {
            if (param === 'category') {
                let cats = params.get('category')?.split(',') || [];
                cats.includes(value) ? cats = cats.filter(c => c !== value) : cats.push(value);
                cats.length > 0 ? params.set('category', cats.join(',')) : params.delete('category');
                setCategory(cats);
            } else if (param === 'priceRange') {
                if (value === '') {
                    params.delete('priceRange');
                    setPriceRange([0, 2000]);
                } else {
                    params.set(param, value);
                }
            } else {
                params.set(param, value);
            }
        }

        if (['sort', 'priceRange', 'search'].includes(param)) {
            params.delete('page');
            setPage(1);
        }

        setSearchParams(params.toString() ? '?' + params.toString() : '');
    };

    const clearFilters = () => {
        setSearchParams('');
        setCategory([]);
        setPriceRange([0, 2000]);
        setSort('');
        setPage(1);
    };

    return (
        <div className="w-[98%] md:w-11/12 mx-auto py-8 relative">
            {showFilters && <MobileFilterModal
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                category={category}
                setCategory={setCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                handleClick={handleClick}
            />}

            <div className="flex flex-col md:flex-row gap-6">
                <FilterSidebar
                    category={category}
                    priceRange={priceRange}
                    setCategory={setCategory}
                    setPriceRange={setPriceRange}
                    handleClick={handleClick}
                />

                <div className="w-full md:w-3/4">

                    <SortBar
                        sort={sort} // Make sure this is properly passed
                        setSort={(val) => {
                            setSort(val); // Update local state
                            handleClick('sort', val); // Update URL params
                        }}
                        totalCount={totalAvailableProducts}
                        setShowFilters={setShowFilters}
                    />

                    <ProductList
                        products={userProducts}
                        loading={loading}
                        resetFilters={clearFilters}
                    />
                    <div className="mt-6 flex justify-center gap-4">
                        <button
                            onClick={() => {
                                const prevPage = page - 1;
                                if (prevPage >= 1) {
                                    handleClick('page', prevPage);
                                    setPage(prevPage);
                                }
                            }}
                            disabled={page <= 1}
                            className={`px-4 py-2 rounded-md border ${page <= 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-50'
                                }`}
                        >
                            Prev
                        </button>

                        <span className="self-center text-sm text-gray-700">
                            Page {page}
                        </span>

                        <button
                            onClick={() => {
                                const nextPage = page + 1;
                                const maxPage = Math.ceil(totalAvailableProducts / 15);
                                if (nextPage <= maxPage) {
                                    handleClick('page', nextPage);
                                    setPage(nextPage);
                                }
                            }}
                            disabled={userProducts?.length < 15 || page >= Math.ceil(totalAvailableProducts / 15)}
                            className={`px-4 py-2 rounded-md border ${userProducts?.length < 15 || page >= Math.ceil(totalAvailableProducts / 15)
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-white hover:bg-gray-50'
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;