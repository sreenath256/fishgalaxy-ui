import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiChevronDown, FiChevronRight, FiMenu, FiX } from "react-icons/fi";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { FaUsers, FaBoxOpen } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { RiAdminFill } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";

const Sidebar = () => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { path: "/dashboard", icon: <BiSolidBarChartAlt2 />, name: "Dashboard" },
    { path: "/retailers", icon: <FaUsers />, name: "Retailers" },
    { path: "/orders", icon: <FaBoxOpen />, name: "Orders" },
    {
      name: "Products",
      icon: <HiOutlineShoppingBag />,
      id: "products",
      submenu: [
        { path: "/products/all", name: "All Products" },
        { path: "/products/add", name: "Add Product" },
        { path: "/products/categories", name: "All Categories" },
      ],
    },
  ];

  const toggleSubmenu = (menuId) => {
    setOpenSubmenu(openSubmenu === menuId ? null : menuId);
  };

  const closeAllMenus = () => {
    setOpenSubmenu(null);
    if (isMobile) {
      setIsMobileSidebarOpen(false);
    }
  };

  const handleSubmenuItemClick = () => {
    // Only close the mobile sidebar but keep the submenu open
    if (isMobile) {
      setIsMobileSidebarOpen(false);
    }
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={toggleMobileSidebar}
          className="fixed z-50 top-4 left-4 p-2 rounded-lg bg-gray-200 text-black shadow-md"
        >
          {isMobileSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative z-40 w-64 min-h-screen bg-gray-100 text-black flex flex-col transition-transform duration-300 ease-in-out ${
          isMobile
            ? isMobileSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 bg-gray-200 text-black text-center">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>

        {/* Sidebar Menu */}
        <ul className="flex-1 flex flex-col gap-2 py-4 overflow-y-auto">
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.path ? (
                // Regular menu item with link
                <li className="px-2">
                  <NavLink
                    to={item.path}
                    onClick={closeAllMenus}
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-gray-200 text-black"
                          : "text-black hover:bg-gray-200"
                      }`
                    }
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              ) : (
                // Menu item with submenu
                <li className="px-2">
                  <button
                    onClick={() => toggleSubmenu(item.id)}
                    className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                      openSubmenu === item.id
                        ? "bg-gray-200 text-black"
                        : "text-black hover:bg-gray-200"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-3 text-lg">{item.icon}</span>
                      <span>{item.name}</span>
                    </div>
                    {openSubmenu === item.id ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}
                  </button>

                  {/* Submenu with smooth transition */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openSubmenu === item.id ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="ml-8 mt-2 space-y-2">
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <NavLink
                            to={subItem.path}
                            onClick={handleSubmenuItemClick} // Changed from closeAllMenus to handleSubmenuItemClick
                            className={({ isActive }) =>
                              `block p-2 pl-4 rounded-lg transition-colors ${
                                isActive
                                  ? "bg-gray-200 text-black"
                                  : "text-black hover:bg-gray-200"
                              }`
                            }
                          >
                            {subItem.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>

        {/* Sidebar Footer */}
        <div className="p-4 bg-gray-200 text-black">
          <div className="flex items-end justify-between">
            <div className="flex items-end gap-2">
              <span className="text-2xl">
                <RiAdminFill />
              </span>
              <div>
                <p className="font-medium text-sm">Admin User</p>
                <p className="text-xs">admin@example.com</p>
              </div>
            </div>
            {/* Logout with tooltip */}
            <div className="relative group">
              <span className="text-2xl hover:bg-gray-300 p-2 rounded-full grid place-items-center cursor-pointer">
                <IoLogOutOutline />
              </span>
              <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-gray-700 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                Logout
                <div className="absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-b-0 border-t-4 border-l-transparent border-r-transparent border-t-gray-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={closeAllMenus}
        />
      )}
    </>
  );
};

export default Sidebar;
