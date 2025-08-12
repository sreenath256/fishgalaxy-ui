import React from 'react'
import date from 'date-and-time'
import { FiX } from 'react-icons/fi'
import StatusComponent from './StatusComponent'
import { BsBoxSeam } from 'react-icons/bs'
import { MdOutlineLocalShipping, MdOutlinePayment } from 'react-icons/md'
const ViewOrder = ({ selectedOrder, closeModal }) => {
    return (
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
    )
}

export default ViewOrder
