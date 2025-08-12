import React, { useEffect, useState } from 'react';
import {
  FiSearch,
  FiFilter,
  FiEye,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiTruck,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiX,
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../redux/actions/admin/ordersAction';
import Modal from '../../components/admin/Model';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/admin/SearchBar';
import FilterArray from '../../components/admin/FilterArray';
import RangeDatePicker from '../../components/admin/DateRangePicker';
import ClearFilterButton from '../../Components/admin/ClearFilterButton';
import Pagination from '../../components/admin/Pagination';
import StatusComponent from '../../components/admin/StatusComponent';
import date from "date-and-time";
import { getPassedDateOnwardDateForInput, getTodayOnwardDateForInput } from '../../Common/functions';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import UpdateOrder from './UpdateOrder';
import ViewOrder from '../../components/admin/ViewOrder';
import { FaRegEdit } from 'react-icons/fa';

const Orders = () => {

  const dispatch = useDispatch();

  const { orders, loading, error, totalAvailableOrders } = useSelector(
    (state) => state.orders
  );

  const [selectedOrderToUpdate, setSelectedOrderToUpdate] = useState({});
  const [updateModal, setUpdateModal] = useState(false);

  const toggleUpdateModal = (data) => {
    if (data.status === "cancelled") {
      toast.error("Cannot Edit Cancelled Product");
      return;
    }
    if (data.status === "returned") {
      toast.error("Cannot Edit Returned Product");
      return;
    }
    setUpdateModal(!updateModal);
    setSelectedOrderToUpdate(data);
  };

  // Filtering
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
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
    setSearch("");

    setStartingDate("");
    setEndingDate("");
    setSearchParams(params);
  };

  // Filters setting initially
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageNumber = params.get("page");
    setPage(parseInt(pageNumber || 1));
  }, []);


  // Getting all the orders on page load
  useEffect(() => {
    dispatch(getOrders(searchParams));
    const params = new URLSearchParams(window.location.search);
    const pageNumber = params.get("page");
    setPage(parseInt(pageNumber || 1));
  }, [searchParams]);





  // ---------------------------------------------------------------------------




  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);



  // View order details
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    console.log(order)
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      {updateModal && (
        <Modal
          tab={
            <UpdateOrder
              toggleModal={toggleUpdateModal}
              data={selectedOrderToUpdate}
            />
          }
        />
      )}

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <ViewOrder selectedOrder={selectedOrder} closeModal={closeModal} />
      )}
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Header with search and filter */}
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <h1 className="text-xl font-medium text-gray-800">Retailer Orders</h1>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <SearchBar
                      handleClick={handleFilter}
                      search={search}
                      setSearch={setSearch}
                      placeholder="Search Using Order Id..."
                    />
                  </div>

                  <div className="relative">
                    <FilterArray
                      list={[
                        "all",
                        "pending",
                        "processing",
                        "shipped",
                        "delivered",
                        "cancelled",
                        "returned",
                      ]}
                      handleClick={handleFilter}
                    />
                  </div>
                  <div className="relative flex gap-4">
                    <RangeDatePicker
                      handleFilter={handleFilter}
                      startingDate={startingDate}
                      setStartingDate={setStartingDate}
                      endingDate={endingDate}
                      setEndingDate={setEndingDate}
                    />
                    <ClearFilterButton handleClick={removeFilters} />
                  </div>
                </div>
              </div>
            </div>

            {/* Orders Table */}

            {
              loading ?
                <div className="flex items-center justify-center min-h-[50vh] h-full">
                  Loading
                </div>
                : orders && orders.length > 0 ?
                  (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              No:
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Order ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Retailer
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Shop Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>

                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Amount
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

                          {orders.map((order, index) => {
                            const isLast = index === orders.length - 1;
                            const classes = isLast
                              ? "p-4"
                              : "p-4 border-b border-gray-200 ";
                            const adjustedIndex = (page - 1) * 10 + index + 1;
                            console.log(orders)

                            return (
                              <tr key={order._id} className="hover:bg-gray-50" onClick={() => viewOrderDetails(order)}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-indigo-600">{adjustedIndex}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-indigo-600">{order._id}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">{order.user?.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">{order.user?.shopName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-500">
                                    {date.format(new Date(order.createdAt), "MMM DD YYYY")}
                                  </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">₹{order.totalPrice}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">

                                    <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize `}>

                                      <StatusComponent status={order.status} />
                                      {/* {order.status} */}
                                    </span>
                                  </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-4">

                                  <button className='text-indigo-600 hover:text-indigo-900 flex items-center ml-auto' onClick={(e) => {
                                    e.stopPropagation()
                                    toggleUpdateModal({
                                      id: order._id,
                                      orderDate: order.createdAt,
                                      status: order.status,
                                    })
                                  }
                                  }
                                  ><FaRegEdit /> </button>

                                  <button
                                    onClick={(e) => {
                                      viewOrderDetails(order)
                                    }
                                    }
                                    className="text-indigo-600 hover:text-indigo-900 flex items-center ml-auto"
                                    title="View details"
                                  >
                                    <FiEye className="h-4 w-4" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}

                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="absolute top-1/2 left-1/3 lg:left-1/2 lg:right-1/2">
                      <p className="w-44">{error ? error : "No orders are placed yet"}</p>
                    </div>
                  )

            }



            {/* Pagination */}
            <div className="bg-white px-4 py-3 flex items-center justify-center border-t border-gray-200 sm:px-6">

              <Pagination
                handleClick={handleFilter}
                page={page}
                number={10}
                totalNumber={totalAvailableOrders}
              />

            </div>

          </div>
        </div>


      </div >
    </>

  );
};

export default Orders;