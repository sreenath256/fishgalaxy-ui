import React, { useEffect, useState } from 'react';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiXCircle, FiEye, FiSearch, FiFilter } from 'react-icons/fi';
import { MdOutlineLocalShipping, MdOutlinePayment } from 'react-icons/md';
import { BsBoxSeam } from 'react-icons/bs';
import { pr1 } from '../assets';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getOrders } from '../redux/actions/user/userOrderActions';
import date from "date-and-time";
import StatusComponent from '../components/admin/StatusComponent';
import { ClipLoader } from 'react-spinners';
import Skeleton from 'react-loading-skeleton';
import Pagination from '../components/admin/Pagination';


const MyOrders = () => {

  const { userOrders, loading, error, totalAvailableOrders } = useSelector(
    (state) => state.userOrders
  );


  console.log("userOrders", userOrders);
  const dispatch = useDispatch();

  // Pagination
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(1);
  const handleFilter = (type, value) => {
    const params = new URLSearchParams(window.location.search);
    if (value === "") {
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

  useEffect(() => {
    dispatch(getOrders(searchParams));
    const params = new URLSearchParams(window.location.search);
    const pageNum = params.get("page");
    setPage(parseInt(pageNum) || 1);
  }, [searchParams]);


  // Sample order data
  const allOrders = [
    {
      id: '#ORD-78945',
      date: 'Jun 12, 2023',
      items: [
        { name: 'Premium Fish Food', price: 24.99, quantity: 2, image: pr1 },
        { name: 'Aquarium Filter', price: 39.99, quantity: 1, image: pr1 }
      ],
      total: 89.97,
      status: 'Delivered',
      statusClass: 'bg-green-100 text-green-800',
      icon: <FiCheckCircle className="text-green-500" />,
      trackingNumber: 'TRK789456123',
      paymentMethod: 'Credit Card',
      shippingAddress: '123 Main St, New York, NY 10001'
    },
    {
      id: '#ORD-78123',
      date: 'Jun 5, 2023',
      items: [
        { name: 'Fish Tank 20G', price: 89.99, quantity: 1, image: pr1 },
        { name: 'Water Conditioner', price: 12.99, quantity: 1, image: pr1 }
      ],
      total: 102.98,
      status: 'Shipped',
      statusClass: 'bg-blue-100 text-blue-800',
      icon: <FiTruck className="text-blue-500" />,
      trackingNumber: 'TRK781236548',
      paymentMethod: 'PayPal',
      shippingAddress: '456 Oak Ave, Boston, MA 02108'
    },
    // Add 10 more sample orders
    {
      id: '#ORD-77654',
      date: 'May 28, 2023',
      items: [
        { name: 'Aquarium Heater', price: 29.99, quantity: 1, image: pr1 }
      ],
      total: 29.99,
      status: 'Processing',
      statusClass: 'bg-yellow-100 text-yellow-800',
      icon: <FiClock className="text-yellow-500" />,
      trackingNumber: '',
      paymentMethod: 'Credit Card',
      shippingAddress: '789 Pine Rd, Chicago, IL 60601'
    },
    {
      id: '#ORD-76543',
      date: 'May 15, 2023',
      items: [
        { name: 'Fish Tank 50G', price: 199.99, quantity: 1, image: pr1 },
        { name: 'LED Light', price: 49.99, quantity: 1, image: pr1 },
        { name: 'Filter Media', price: 14.99, quantity: 2, image: pr1 }
      ],
      total: 319.96,
      status: 'Cancelled',
      statusClass: 'bg-red-100 text-red-800',
      icon: <FiXCircle className="text-red-500" />,
      trackingNumber: '',
      paymentMethod: 'Credit Card',
      shippingAddress: '321 Elm St, San Francisco, CA 94102'
    },
    {
      id: '#ORD-75432',
      date: 'May 10, 2023',
      items: [
        { name: 'Fish Food Variety Pack', price: 34.99, quantity: 1, image: pr1 }
      ],
      total: 34.99,
      status: 'Delivered',
      statusClass: 'bg-green-100 text-green-800',
      icon: <FiCheckCircle className="text-green-500" />,
      trackingNumber: 'TRK754329876',
      paymentMethod: 'Debit Card',
      shippingAddress: '654 Maple Dr, Austin, TX 78701'
    },
    {
      id: '#ORD-74321',
      date: 'May 5, 2023',
      items: [
        { name: 'Water Test Kit', price: 24.99, quantity: 1, image: pr1 },
        { name: 'Algae Scraper', price: 12.99, quantity: 1, image: pr1 }
      ],
      total: 37.98,
      status: 'Delivered',
      statusClass: 'bg-green-100 text-green-800',
      icon: <FiCheckCircle className="text-green-500" />,
      trackingNumber: 'TRK743215678',
      paymentMethod: 'PayPal',
      shippingAddress: '987 Cedar Ln, Seattle, WA 98101'
    },
    {
      id: '#ORD-73210',
      date: 'Apr 28, 2023',
      items: [
        { name: 'Aquarium Stand', price: 129.99, quantity: 1, image: pr1 }
      ],
      total: 129.99,
      status: 'Shipped',
      statusClass: 'bg-blue-100 text-blue-800',
      icon: <FiTruck className="text-blue-500" />,
      trackingNumber: 'TRK732104567',
      paymentMethod: 'Credit Card',
      shippingAddress: '159 Birch Blvd, Denver, CO 80202'
    },
    {
      id: '#ORD-72109',
      date: 'Apr 20, 2023',
      items: [
        { name: 'Air Pump', price: 19.99, quantity: 1, image: pr1 },
        { name: 'Air Stones', price: 8.99, quantity: 2, image: pr1 }
      ],
      total: 37.97,
      status: 'Processing',
      statusClass: 'bg-yellow-100 text-yellow-800',
      icon: <FiClock className="text-yellow-500" />,
      trackingNumber: '',
      paymentMethod: 'Credit Card',
      shippingAddress: '753 Spruce St, Miami, FL 33101'
    },
    {
      id: '#ORD-71098',
      date: 'Apr 15, 2023',
      items: [
        { name: 'Aquarium Gravel', price: 14.99, quantity: 3, image: pr1 },
        { name: 'Decorations Set', price: 29.99, quantity: 1, image: pr1 }
      ],
      total: 74.96,
      status: 'Cancelled',
      statusClass: 'bg-red-100 text-red-800',
      icon: <FiXCircle className="text-red-500" />,
      trackingNumber: '',
      paymentMethod: 'PayPal',
      shippingAddress: '852 Oak Dr, Atlanta, GA 30301'
    },
    {
      id: '#ORD-70987',
      date: 'Apr 10, 2023',
      items: [
        { name: 'Fish Net', price: 6.99, quantity: 2, image: pr1 },
        { name: 'Water Conditioner', price: 12.99, quantity: 1, image: pr1 }
      ],
      total: 26.97,
      status: 'Delivered',
      statusClass: 'bg-green-100 text-green-800',
      icon: <FiCheckCircle className="text-green-500" />,
      trackingNumber: 'TRK709873214',
      paymentMethod: 'Debit Card',
      shippingAddress: '369 Pineapple Ave, Honolulu, HI 96801'
    },
    {
      id: '#ORD-69876',
      date: 'Apr 5, 2023',
      items: [
        { name: 'Aquarium Background', price: 9.99, quantity: 1, image: pr1 }
      ],
      total: 9.99,
      status: 'Delivered',
      statusClass: 'bg-green-100 text-green-800',
      icon: <FiCheckCircle className="text-green-500" />,
      trackingNumber: 'TRK698765432',
      paymentMethod: 'Credit Card',
      shippingAddress: '147 Palm Blvd, Los Angeles, CA 90001'
    }
  ];

  // State for filters, search, pagination, and modal
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ordersPerPage = 8;

  // Filter and search logic
  const filteredOrders = allOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.date.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // View order details
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header with search and filter */}
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <FiPackage className="text-indigo-600 text-2xl mr-3" />
                <h1 className="text-xl font-medium text-gray-800">My Orders</h1>
              </div>


            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th> */}
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
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
                {
                  loading ? (
                    <tr >
                      <td colSpan={5} className="px-6 py-4">
                        <Skeleton count={10} height={30} />
                      </td>
                    </tr>
                  ) :

                    userOrders.length > 0 ? (
                      userOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-indigo-600">{order._id}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500"> {date.format(new Date(order.createdAt), "MMM DD YYYY")}</div>
                          </td>
                          {/* <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{order.products.length} item{order.products.length !== 1 ? 's' : ''}</div>
                          </td> */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">₹{order.totalPrice.toFixed(2)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`flex w-fit items-center ${order.statusClass} text-xs px-2.5 py-0.5 rounded-full font-medium`}>
                              <StatusComponent status={order.status} />
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => viewOrderDetails(order)}
                              className="text-indigo-600 hover:text-indigo-900 mr-4 flex items-center"
                            >
                              <FiEye className="mr-1" /> View
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                          No orders found matching your criteria
                        </td>
                      </tr>
                    )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}

          <div className="py-5">
            <Pagination
              handleClick={handleFilter}
              number={10}
              page={page}
              totalNumber={totalAvailableOrders}
            />
          </div>

        </div>
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeModal}></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-[95%] md:w-[80%] xl:w-[60%]">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Order Details - {selectedOrder._id}
                      </h3>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={closeModal}
                      >
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Order Summary */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                          <BsBoxSeam className="mr-2 text-indigo-600" /> Order Summary
                        </h4>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Order Date:</span>
                            <span className="font-medium">{date.format(new Date(selectedOrder.createdAt), "MMM DD YYYY")}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Status:</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium`}>
                              <StatusComponent status={selectedOrder.status} />
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Items:</span>
                            <span className="font-medium">{selectedOrder.products.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Total:</span>
                            <span className="font-medium">₹{selectedOrder.totalPrice.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Shipping Information */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                          <MdOutlineLocalShipping className="mr-2 text-indigo-600" /> Shipping Information
                        </h4>
                        <div className="space-y-4">
                          <div>
                            <p className="text-gray-500">Shipping Address:</p>
                            <p className="font-medium">{selectedOrder.address?.name}</p>
                            <p className="font-medium">{selectedOrder.address?.shopName}</p>
                            <p className="font-medium">{selectedOrder.address?.address}</p>
                            <p className="font-medium">{selectedOrder.address?.mobile}</p>
                            <p className="font-medium">{selectedOrder.address?.pincode}</p>
                          </div>
                          {selectedOrder.trackingNumber && (
                            <div>
                              <p className="text-gray-500">Tracking Number:</p>
                              <p className="font-medium">{selectedOrder.trackingNumber}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Quantity
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {selectedOrder.products.map((item, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                      <img className="h-10 w-10 rounded object-cover" src={item.productId?.imageURL} alt={item.name} />
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">{item.productId?.name}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-500">₹{item.offer.toFixed(2)}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-500">{item.quantity}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    ₹{(item.totalPrice).toFixed(2)}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Payment Information */}
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <MdOutlinePayment className="mr-2 text-indigo-600" /> Payment Information
                      </h4>
                      <div className="space-y-4">
                    
                        <div className="flex justify-between">
                          <span className="text-gray-500">Subtotal:</span>
                          <span className="font-medium">₹{selectedOrder.totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Shipping:</span>
                          <span className="font-medium">₹0.00</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-500 font-medium">Total:</span>
                          <span className="font-bold">₹{(selectedOrder.totalPrice + 0).toFixed(2)}</span>
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
                {selectedOrder.status === 'Processing' && (
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-red-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;