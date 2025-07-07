import React, { useState } from 'react';
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

const Retailer = () => {
  // Sample retailer data
  const [allRetailers, setAllRetailers] = useState([
    {
      id: 1,
      name: 'Aqua World',
      mobile: '+91 98765 43210',
      location: 'Mumbai, Maharashtra',
      active: true,
      joinDate: 'Jun 12, 2023'
    },
    {
      id: 2,
      name: 'Ocean Paradise',
      mobile: '+91 87654 32109',
      location: 'Delhi, NCR',
      active: false,
      joinDate: 'May 28, 2023'
    },
    {
      id: 3,
      name: 'Fish Haven',
      mobile: '+91 76543 21098',
      location: 'Bangalore, Karnataka',
      active: true,
      joinDate: 'May 15, 2023'
    },
    {
      id: 4,
      name: 'Aquarium Dreams',
      mobile: '+91 65432 10987',
      location: 'Hyderabad, Telangana',
      active: true,
      joinDate: 'Apr 28, 2023'
    },
    {
      id: 5,
      name: 'Marine Life',
      mobile: '+91 54321 09876',
      location: 'Chennai, Tamil Nadu',
      active: false,
      joinDate: 'Apr 15, 2023'
    },
    {
      id: 6,
      name: 'Water World',
      mobile: '+91 43210 98765',
      location: 'Pune, Maharashtra',
      active: true,
      joinDate: 'Mar 30, 2023'
    },
    {
      id: 7,
      name: 'Aqua Zone',
      mobile: '+91 32109 87654',
      location: 'Kolkata, West Bengal',
      active: true,
      joinDate: 'Mar 15, 2023'
    },
    {
      id: 8,
      name: 'Fish Kingdom',
      mobile: '+91 21098 76543',
      location: 'Ahmedabad, Gujarat',
      active: false,
      joinDate: 'Feb 28, 2023'
    },
    {
      id: 9,
      name: 'Coral Reef',
      mobile: '+91 10987 65432',
      location: 'Jaipur, Rajasthan',
      active: true,
      joinDate: 'Feb 15, 2023'
    },
    {
      id: 10,
      name: 'Aquatic World',
      mobile: '+91 98765 12340',
      location: 'Lucknow, Uttar Pradesh',
      active: true,
      joinDate: 'Jan 30, 2023'
    },
    {
      id: 11,
      name: 'Blue Lagoon',
      mobile: '+91 99887 77665',
      location: 'Bhopal, Madhya Pradesh',
      active: false,
      joinDate: 'Jan 15, 2023'
    },
    {
      id: 12,
      name: 'Sea Breeze',
      mobile: '+91 88776 66554',
      location: 'Surat, Gujarat',
      active: true,
      joinDate: 'Dec 30, 2022'
    },
    {
      id: 13,
      name: 'Oceanic Bliss',
      mobile: '+91 77665 55443',
      location: 'Nagpur, Maharashtra',
      active: true,
      joinDate: 'Dec 15, 2022'
    },
    {
      id: 14,
      name: 'Neptune Nook',
      mobile: '+91 66554 44332',
      location: 'Indore, Madhya Pradesh',
      active: false,
      joinDate: 'Nov 30, 2022'
    },
    {
      id: 15,
      name: 'Sea Shore',
      mobile: '+91 55443 33221',
      location: 'Vadodara, Gujarat',
      active: true,
      joinDate: 'Nov 15, 2022'
    },
    {
      id: 16,
      name: 'Marine Magic',
      mobile: '+91 44332 22110',
      location: 'Coimbatore, Tamil Nadu',
      active: true,
      joinDate: 'Oct 30, 2022'
    },
    {
      id: 17,
      name: 'Aquatic Emporium',
      mobile: '+91 33221 11009',
      location: 'Thiruvananthapuram, Kerala',
      active: false,
      joinDate: 'Oct 15, 2022'
    },
    {
      id: 18,
      name: 'Fishy Delights',
      mobile: '+91 22110 00998',
      location: 'Ranchi, Jharkhand',
      active: true,
      joinDate: 'Sep 30, 2022'
    },
    {
      id: 19,
      name: 'Oceanic Vibes',
      mobile: '+91 11009 99887',
      location: 'Patna, Bihar',
      active: true,
      joinDate: 'Sep 15, 2022'
    },
    {
      id: 20,
      name: 'Aqua Culture',
      mobile: '+91 00998 88776',
      location: 'Raipur, Chhattisgarh',
      active: false,
      joinDate: 'Aug 30, 2022'
    }
  ]);



  // State for filters, search, pagination, and modal
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRetailer, setSelectedRetailer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const retailersPerPage = 10;

  // Filter and search logic
  const filteredRetailers = allRetailers.filter(retailer => {
    const matchesSearch = retailer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         retailer.mobile.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         retailer.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || 
                         (statusFilter === 'Active' && retailer.active) || 
                         (statusFilter === 'Inactive' && !retailer.active);
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastRetailer = currentPage * retailersPerPage;
  const indexOfFirstRetailer = indexOfLastRetailer - retailersPerPage;
  const currentRetailers = filteredRetailers.slice(indexOfFirstRetailer, indexOfLastRetailer);
  const totalPages = Math.ceil(filteredRetailers.length / retailersPerPage);

  // Toggle active status
  const toggleActiveStatus = (retailerId) => {
    setAllRetailers(prevRetailers => 
      prevRetailers.map(retailer => 
        retailer.id === retailerId ? { ...retailer, active: !retailer.active } : retailer
      )
    );
  };

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
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search retailers..."
                    className="pl-10  pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:w-64"
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
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
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
                    Mobile
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
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
                {currentRetailers.length > 0 ? (
                  currentRetailers.map((retailer) => (
                    <tr key={retailer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-mainclr">{retailer.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{retailer.mobile}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">{retailer.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{retailer.joinDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${retailer.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {retailer.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end items-center space-x-3">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer" 
                              checked={retailer.active}
                              onChange={() => toggleActiveStatus(retailer.id)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                          </label>
                          <button 
                            onClick={() => viewRetailerDetails(retailer)}
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
                  ))
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
          {filteredRetailers.length > retailersPerPage && (
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
                    Showing <span className="font-medium">{indexOfFirstRetailer + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(indexOfLastRetailer, filteredRetailers.length)}</span> of{' '}
                    <span className="font-medium">{filteredRetailers.length}</span> retailers
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
                        <span className="text-gray-500">Mobile:</span>
                        <span className="font-medium">{selectedRetailer.mobile}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-500">Location:</span>
                        <span className="font-medium">{selectedRetailer.location}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-500">Join Date:</span>
                        <span className="font-medium">{selectedRetailer.joinDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Status:</span>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${selectedRetailer.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {selectedRetailer.active ? 'Active' : 'Inactive'}
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
  );
};

export default Retailer;