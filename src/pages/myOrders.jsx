import React, { useState } from 'react';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiXCircle, FiEye, FiSearch, FiFilter } from 'react-icons/fi';
import { MdOutlineLocalShipping, MdOutlinePayment } from 'react-icons/md';
import { BsBoxSeam } from 'react-icons/bs';
import { pr1 } from '../assets';

const MyOrders = () => {
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
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
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
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search orders..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiFilter className="text-gray-400" />
                  </div>
                  <select
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:w-48"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="All">All Statuses</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
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
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
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
                {currentOrders.length > 0 ? (
                  currentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-indigo-600">{order.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{order.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">₹{order.total.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`flex w-fit items-center ${order.statusClass} text-xs px-2.5 py-0.5 rounded-full font-medium`}>
                          {order.icon}
                          <span className="ml-1.5">{order.status}</span>
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
          {filteredOrders.length > ordersPerPage && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex flex-col md:flex-row gap-y-3 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{indexOfFirstOrder + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(indexOfLastOrder, filteredOrders.length)}</span> of{' '}
                    <span className="font-medium">{filteredOrders.length}</span> orders
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                    >
                      <span className="sr-only">First</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M8.707 5.293a1 1 0 010 1.414L5.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                    >
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {/* Page numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === page ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                    >
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                    >
                      <span className="sr-only">Last</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M11.293 14.707a1 1 0 010-1.414L14.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
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
                        Order Details - {selectedOrder.id}
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
                            <span className="font-medium">{selectedOrder.date}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Status:</span>
                            <span className={`${selectedOrder.statusClass} px-2 py-1 rounded-full text-xs font-medium`}>
                              {selectedOrder.status}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Items:</span>
                            <span className="font-medium">{selectedOrder.items.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Total:</span>
                            <span className="font-medium">₹{selectedOrder.total.toFixed(2)}</span>
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
                            <p className="font-medium">{selectedOrder.shippingAddress}</p>
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
                            {selectedOrder.items.map((item, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                      <img className="h-10 w-10 rounded" src={item.image} alt={item.name} />
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-500">₹{item.price.toFixed(2)}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-500">{item.quantity}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    ₹{(item.price * item.quantity).toFixed(2)}
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
                        {/* <div className="flex justify-between">
                          <span className="text-gray-500">Payment Method:</span>
                          <span className="font-medium">{selectedOrder.paymentMethod}</span>
                        </div> */}
                        <div className="flex justify-between">
                          <span className="text-gray-500">Subtotal:</span>
                          <span className="font-medium">₹{selectedOrder.total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Shipping:</span>
                          <span className="font-medium">₹5.99</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-500 font-medium">Total:</span>
                          <span className="font-bold">₹{(selectedOrder.total + 5.99).toFixed(2)}</span>
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