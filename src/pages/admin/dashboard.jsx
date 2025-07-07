import React from "react";
import { 
  FiUsers, 
  FiShoppingCart, 
  FiPackage, 
  FiDollarSign,
  FiTrendingUp,
  FiActivity,
  FiBarChart2
} from "react-icons/fi";

const Dashboard = () => {
  // Sample data - replace with actual data from your backend
  const stats = {
    totalUsers: 1245,
    activeUsers: 1023,
    newUsers: 42,
    totalOrders: 876,
    pendingOrders: 34,
    completedOrders: 789,
    totalProducts: 156,
    outOfStock: 12,
    revenue: 1256400 // in rupees
  };

  return (
    <div className="">
      <h1 className="text-2xl xl:text-3xl font-semibold text-gray-800 mb-8">Welcome to Fish Galaxy</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Users Card */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-semibold text-gray-800">{stats.totalUsers}</p>
              
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FiUsers className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <p className="text-2xl font-semibold text-gray-800">{stats.totalOrders}</p>
              
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FiShoppingCart className="text-green-600 text-xl" />
            </div>
          </div>
        </div>

        {/* Products Card */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <p className="text-2xl font-semibold text-gray-800">{stats.totalProducts}</p>
             
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <FiPackage className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>

       
      </div>


    </div>
  );
};

export default Dashboard;