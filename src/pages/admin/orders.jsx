import React, { useState } from 'react';
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

const Orders = () => {
  // Sample order data
  const [allOrders, setAllOrders] = useState([
    {
      id: 'ORD-1001',
      retailer: 'Aqua World',
      date: 'Jun 15, 2023',
      items: 5,
      amount: '₹12,450',
      status: 'Delivered',
      payment: 'Paid',
      deliveryDate: 'Jun 18, 2023'
    },
    {
      id: 'ORD-1002',
      retailer: 'Ocean Paradise',
      date: 'Jun 14, 2023',
      items: 3,
      amount: '₹8,750',
      status: 'Shipped',
      payment: 'Paid',
      deliveryDate: 'Expected Jun 20, 2023'
    },
    {
      id: 'ORD-1003',
      retailer: 'Fish Haven',
      date: 'Jun 13, 2023',
      items: 7,
      amount: '₹18,920',
      status: 'Processing',
      payment: 'Pending',
      deliveryDate: '-'
    },
    {
      id: 'ORD-1004',
      retailer: 'Aquarium Dreams',
      date: 'Jun 12, 2023',
      items: 2,
      amount: '₹5,300',
      status: 'Delivered',
      payment: 'Paid',
      deliveryDate: 'Jun 15, 2023'
    },
    {
      id: 'ORD-1005',
      retailer: 'Marine Life',
      date: 'Jun 11, 2023',
      items: 4,
      amount: '₹10,150',
      status: 'Cancelled',
      payment: 'Refunded',
      deliveryDate: '-'
    },
    {
      id: 'ORD-1006',
      retailer: 'Water World',
      date: 'Jun 10, 2023',
      items: 6,
      amount: '₹15,600',
      status: 'Delivered',
      payment: 'Paid',
      deliveryDate: 'Jun 14, 2023'
    },
    {
      id: 'ORD-1007',
      retailer: 'Aqua Zone',
      date: 'Jun 9, 2023',
      items: 1,
      amount: '₹2,800',
      status: 'Shipped',
      payment: 'Paid',
      deliveryDate: 'Expected Jun 13, 2023'
    },
    {
      id: 'ORD-1008',
      retailer: 'Fish Kingdom',
      date: 'Jun 8, 2023',
      items: 8,
      amount: '₹22,400',
      status: 'Processing',
      payment: 'Pending',
      deliveryDate: '-'
    },
    {
      id: 'ORD-1009',
      retailer: 'Coral Reef',
      date: 'Jun 7, 2023',
      items: 3,
      amount: '₹7,950',
      status: 'Delivered',
      payment: 'Paid',
      deliveryDate: 'Jun 10, 2023'
    },
    {
      id: 'ORD-1010',
      retailer: 'Aquatic World',
      date: 'Jun 6, 2023',
      items: 5,
      amount: '₹13,250',
      status: 'Shipped',
      payment: 'Paid',
      deliveryDate: 'Expected Jun 12, 2023'
    },
    {
      id: 'ORD-1011',
      retailer: 'Blue Lagoon',
      date: 'Jun 5, 2023',
      items: 2,
      amount: '₹4,600',
      status: 'Cancelled',
      payment: 'Refunded',
      deliveryDate: '-'
    },
    {
      id: 'ORD-1012',
      retailer: 'Sea Breeze',
      date: 'Jun 4, 2023',
      items: 4,
      amount: '₹9,800',
      status: 'Delivered',
      payment: 'Paid',
      deliveryDate: 'Jun 8, 2023'
    },
    {
      id: 'ORD-1013',
      retailer: 'Oceanic Bliss',
      date: 'Jun 3, 2023',
      items: 6,
      amount: '₹16,200',
      status: 'Processing',
      payment: 'Pending',
      deliveryDate: '-'
    },
    {
      id: 'ORD-1014',
      retailer: 'Neptune Nook',
      date: 'Jun 2, 2023',
      items: 1,
      amount: '₹3,100',
      status: 'Shipped',
      payment: 'Paid',
      deliveryDate: 'Expected Jun 6, 2023'
    },
    {
      id: 'ORD-1015',
      retailer: 'Sea Shore',
      date: 'Jun 1, 2023',
      items: 3,
      amount: '₹7,500',
      status: 'Delivered',
      payment: 'Paid',
      deliveryDate: 'Jun 4, 2023'
    }
  ]);

  // State for filters, search, pagination, and modal
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ordersPerPage = 10;

  // Filter and search logic
  const filteredOrders = allOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.retailer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.amount.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || 
                         order.status.toLowerCase() === statusFilter.toLowerCase();
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

  // Get status icon and color
  const getStatusInfo = (status) => {
    switch(status.toLowerCase()) {
      case 'delivered':
        return { icon: <FiCheckCircle className="h-4 w-4" />, color: 'bg-green-100 text-green-800' };
      case 'shipped':
        return { icon: <FiTruck className="h-4 w-4" />, color: 'bg-blue-100 text-blue-800' };
      case 'processing':
        return { icon: <FiClock className="h-4 w-4" />, color: 'bg-yellow-100 text-yellow-800' };
      case 'cancelled':
        return { icon: <FiXCircle className="h-4 w-4" />, color: 'bg-red-100 text-red-800' };
      default:
        return { icon: null, color: 'bg-gray-100 text-gray-800' };
    }
  };

  // Get payment status color
  const getPaymentStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
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
                    <option value="Delivered">Delivered</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Processing">Processing</option>
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
                    Retailer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentOrders.length > 0 ? (
                  currentOrders.map((order) => {
                    const statusInfo = getStatusInfo(order.status);
                    return (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-indigo-600">{order.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{order.retailer}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{order.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{order.items}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{order.amount}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {statusInfo.icon}
                            <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusInfo.color}`}>
                              {order.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusColor(order.payment)}`}>
                            {order.payment}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            onClick={() => viewOrderDetails(order)}
                            className="text-indigo-600 hover:text-indigo-900 flex items-center ml-auto"
                            title="View details"
                          >
                            <FiEye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
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
                      <FiChevronsLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                    >
                      <span className="sr-only">Previous</span>
                      <FiChevronLeft className="h-5 w-5" />
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
                      <FiChevronRight className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                    >
                      <span className="sr-only">Last</span>
                      <FiChevronsRight className="h-5 w-5" />
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
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
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
                        <FiX className="h-6 w-6" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Retailer:</span>
                          <span className="font-medium">{selectedOrder.retailer}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Order Date:</span>
                          <span className="font-medium">{selectedOrder.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Items:</span>
                          <span className="font-medium">{selectedOrder.items}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Total Amount:</span>
                          <span className="font-medium">{selectedOrder.amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Payment Status:</span>
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusColor(selectedOrder.payment)}`}>
                            {selectedOrder.payment}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Delivery Date:</span>
                          <span className="font-medium">{selectedOrder.deliveryDate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-md font-medium text-gray-900 mb-3">Order Status</h4>
                      <div className="flex items-center">
                        {getStatusInfo(selectedOrder.status).icon}
                        <span className={`ml-2 px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusInfo(selectedOrder.status).color}`}>
                          {selectedOrder.status}
                        </span>
                      </div>
                    </div>
                    
                    {/* Order items table - you can expand this with actual products */}
                    <div className="mt-6">
                      <h4 className="text-md font-medium text-gray-900 mb-3">Order Items</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {/* Sample items - in a real app you would map through actual order items */}
                            <tr>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">Aquarium Filter System</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">1</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">₹4,500</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">₹4,500</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">Fish Food (5kg)</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">2</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">₹1,200</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">₹2,400</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">Water Conditioner</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">3</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">₹350</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">₹1,050</td>
                            </tr>
                          </tbody>
                        </table>
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
  );
};

export default Orders;