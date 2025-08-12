import React, { useEffect, useState } from 'react';
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
  FiX
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { blockOrUnBlock, getCustomers } from '../../redux/actions/admin/customerAction';
import date from "date-and-time";
import BlockOrUnBlock from '../../components/admin/BlockOrUnBlock';
import Modal from '../../components/admin/Model';
import ConfirmBox from '../../components/admin/ConfrimBox';
import { BiSearch } from 'react-icons/bi';
import { GrClose } from "react-icons/gr";
import FilterArray from '../../components/admin/FilterArray';
import Pagination from '../../components/admin/Pagination';


const Retailer = () => {
  const dispatch = useDispatch();

  const { customers, loading, error, totalAvailableUsers } = useSelector(
    (state) => state.customers
  );

  const [selectedUserToUpdate, setSelectedUserToUpdate] = useState({})
  const [blockUnBlockModal, setBlockUnBlockModal] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

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

    if (type === "search") {
      params.delete("page");
    }
    setSearchParams(params.toString() ? "?" + params.toString() : "");
  };

  // Removing filters
  const removeFilters = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("search");
    params.delete("page");
    params.delete("status");
    setSearch("");
    setStartingDate("");
    setEndingDate("");
    setSearchParams(params);
  };

  useEffect(() => {
    dispatch(getCustomers(searchParams));
    const params = new URLSearchParams(window.location.search);
    const pageNumber = params.get("page");
    setPage(parseInt(pageNumber || 1));
  }, [searchParams]);


  const toggleBlockUnBlockModal = (data) => {
    setBlockUnBlockModal(!blockUnBlockModal);
    setSelectedUserToUpdate(data);
  };

  const handleSave = () => {
    if ((selectedUserToUpdate.id || selectedUserToUpdate.status) === "") {
      return;
    }
    let id = selectedUserToUpdate.id;
    let isActive = !selectedUserToUpdate.status;

    dispatch(blockOrUnBlock({ id, isActive })).then(() => setBlockUnBlockModal(false));
  };

  


  const [selectedRetailer, setSelectedRetailer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  





  // View retailer details
  const viewRetailerDetails = (retailer) => {
    setSelectedRetailer(retailer);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {blockUnBlockModal && (
        <Modal
          tab={
            <ConfirmBox
              isOpen={blockUnBlockModal}
              onClose={() => setBlockUnBlockModal(false)}
              onConfirm={handleSave}
              title={`Are you sure you want to ${selectedUserToUpdate.status ? 'block' : 'unblock'} this user?`}
            />
          }
        />
      )}
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Header with search and filter */}
            <div className="px-6 py-5 border-b border-gray-200 ">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <h1 className="text-xl font-medium text-gray-800">Retailer Users</h1>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative ">
                    <div className="absolute inset-y-0 left-0 top-0 pl-3 flex items-center pointer-events-none">
                      {search ? (
                        <button
                          type="button"
                          onClick={() => {
                            handleFilter("search", "");
                            setSearch("");
                          }}
                        >
                          <GrClose className="text-xl text-gray-400 hover:text-gray-800  cursor-pointer" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            handleFilter("search", search);
                          }}
                        >
                          <BiSearch className="text-xl text-gray-400 hover:text-gray-800" />
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Search retailers..."
                      className="pl-10  pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:w-64"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        handleFilter("search", e.target.value);
                      }}

                    />

                  </div>

                  <div className="flex gap-2">
                    <div className=" inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiFilter className="text-gray-400" />
                    </div>
                    <FilterArray
                      list={["all", "active", "blocked"]}
                      handleClick={handleFilter}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Retailers Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Shop Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mobile
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </th>

                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Join Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customers.length > 0 ? (
                    customers.map((customer, index) => {
                      const isLast = index === customers.length - 1;
                      return (
                        <tr key={customer._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-mainclr">{customer.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-mainclr">{customer.shopName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{customer.mobile}</div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500 truncate w-32 ">{customer.address}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {customer.createdAt
                                ? date.format(new Date(customer.createdAt), "MMM DD YYYY")
                                : "No Data"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${customer.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {customer.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end items-center space-x-3">
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="sr-only peer"
                                  checked={customer.isActive}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleBlockUnBlockModal({
                                      id: customer._id,
                                      status: customer.isActive,
                                      name: customer.name,
                                    });
                                  }} />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                              </label>
                              <button
                                onClick={() => viewRetailerDetails(customer)}
                                className="text-indigo-600 hover:text-indigo-900 flex items-center"
                                title="View details"
                              >
                                <FiEye className="h-4 w-4" />
                              </button>
                              {/* <button 
                            className="text-yellow-600 hover:text-yellow-900 flex items-center"
                            title="Edit"
                          >
                            <FiEdit2 className="h-4 w-4" />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900 flex items-center"
                            title="Delete"
                          >
                            <FiTrash2 className="h-4 w-4" />
                          </button> */}
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                        No retailers found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>


            {/* Pagination */}

            <div className="bg-white px-4 py-3 flex items-center justify-center border-t border-gray-200 sm:px-6">
              <Pagination
                handleClick={handleFilter}
                page={page}
                number={10}
                totalNumber={totalAvailableUsers}
              />
            </div>

          </div>
        </div>

        {/* Retailer Details Modal */}
        {isModalOpen && selectedRetailer && (
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeModal}></div>
              </div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Retailer Details
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

                      <div className="space-y-4">

                        <div className="flex justify-between border-b pb-2">
                          <span className="text-gray-500">Name:</span>
                          <span className="font-medium">{selectedRetailer.name}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-gray-500">Shop Name:</span>
                          <span className="font-medium">{selectedRetailer.shopName}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-gray-500">Mobile:</span>
                          <span className="font-medium">{selectedRetailer.mobile}</span>
                        </div>
                        {
                          selectedRetailer.email && (
                            <div className="flex justify-between border-b pb-2">
                              <span className="text-gray-500">Email:</span>
                              <span className="font-medium">{selectedRetailer.email}</span>
                            </div>
                          )
                        }

                        <div className="flex justify-between border-b pb-2">
                          <span className="text-gray-500">Address:</span>
                          <span className="font-medium">{selectedRetailer.address}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-gray-500">Join Date:</span>
                          <span className="font-medium">  {selectedRetailer.createdAt
                            ? date.format(new Date(selectedRetailer.createdAt), "MMM DD YYYY")
                            : "No Data"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Status:</span>
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${selectedRetailer.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {selectedRetailer.isActive ? 'Active' : 'Inactive'}
                          </span>
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
      </div>
    </>

  );
};

export default Retailer;