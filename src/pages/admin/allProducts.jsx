import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../redux/actions/admin/productActions";
import TableRow from "../../components/admin/TableRow";
import FilterArray from "../../Components/admin/FilterArray";
import Pagination from "../../components/admin/Pagination";
import SearchBar from "../../components/admin/SearchBar";
import RangeDatePicker from "../../components/admin/DateRangePicker";
import ClearFilterButton from "../../Components/admin/ClearFilterButton";
import { getCategories } from "../../redux/actions/admin/categoriesAction";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, loading, error, totalAvailableProducts } = useSelector(
    (state) => state.products
  );


  const { categories } = useSelector(
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

  // Filteration
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilter = (type, value) => {
    const params = new URLSearchParams(window.location.search);
    if (value === "") {
      if (type === "page") {
        setPage(1);
      }
      params.delete(type);
    } else {
      if (type === "page" && value === 1) {
        params.delete(type);
        setPage(1);
      } else {
        params.set(type, value);
        if (type === "page") {
          setPage(value);
        }
      }
    }
    if(type ==="category"){
      params.delete("page")
    }
    setSearchParams(params.toString() ? "?" + params.toString() : "");
  };

  // Removing filters
  const removeFilters = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("search");
    params.delete("page");
    params.delete("status");
    params.delete("startingDate");
    params.delete("endingDate");
    params.delete("category")
    setSearch("");
    setStartingDate("");
    setEndingDate("");
    setSearchParams(params);
    setSelectedCategory("category")
  };

  // Getting products details
  useEffect(() => {
    dispatch(getProducts(searchParams));
    const params = new URLSearchParams(window.location.search);
    const pageNumber = params.get("page");
    setPage(parseInt(pageNumber || 1));
  }, [searchParams]);

  return (
    <>
      <div className="p-5 w-full overflow-y-auto text-sm">
        <SearchBar
          handleClick={handleFilter}
          search={search}
          setSearch={setSearch}
        />
        <div className="flex justify-between items-center font-semibold">
          <div>
            <h1 className="font-bold text-2xl">Products</h1>
          </div>
          <div className="flex gap-3">
            <button
              className="admin-button-fl bg-blue-700 text-white"
              onClick={() => navigate("add")}
            >
              <AiOutlinePlus />
              Add Product
            </button>
          </div>
        </div>
        <div className="lg:flex justify-between items-center font-semibold">
          <FilterArray
            list={[
              "all",
              "out of stock",
              "stocked",
            ]}
            handleClick={handleFilter}
          />
          {/* Add Category Filter Dropdown */}
          <div className="flex gap-5">

            <div>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  handleFilter("category", e.target.value);
                }}
                className="admin-input pr-8" // Make sure this matches your existing input styles
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex my-2 gap-3">


              <ClearFilterButton handleClick={removeFilters} />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg min-h-[50vh]">
          {loading ? (
            <div className="flex items-center justify-center min-h-screen">
              <p>Loading</p>
            </div>
          ) : (
            products && (
              <table className="w-full ">
                <thead className="font-normal ">
                  <tr className="border-b border-gray-200">
                    <th className="admin-table-head w-3/12">Name</th>
                    <th className="admin-table-head w-3/12">Description</th>
                    <th className="admin-table-head w-1/12">Category</th>
                    <th className="admin-table-head w-1/12">Quantity</th>
                    <th className="admin-table-head w-1/12">Price</th>
                    <th className="admin-table-head w-1/12">Status</th>
                    <th className="admin-table-head w-1/12">Added</th>
                    <th className="admin-table-head w-1/12">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products && products.length > 0 ? (
                    products.map((product, index) => (
                      <TableRow
                        index={index}
                        length={products.length}
                        product={product}
                        key={index}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="py-10 text-center text-gray-500">
                        {loading ? (
                          <div className="flex justify-center">
                            <p>Loading products...</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-12 w-12 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <p className="text-lg font-medium">No products found</p>
                            <p className="text-sm">
                              Try adjusting your filters or add a new product
                            </p>
                            <button
                              onClick={() => navigate("add")}
                              className="mt-2 admin-button-fl bg-blue-700 text-white"
                            >
                              <AiOutlinePlus className="mr-1" />
                              Add Product
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )
          )}
          <div className="py-5">
            <Pagination
              handleClick={handleFilter}
              page={page}
              number={10}
              totalNumber={totalAvailableProducts}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
