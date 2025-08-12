import React, { useState, useEffect, useRef } from "react";
import { CgMenuRight } from "react-icons/cg";
import { VscClose } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { MdAccountCircle, MdLogout, MdManageAccounts, MdShoppingBag } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
import AllcategModal from "../components/products/allCateogmodal";
import CartModal from "./products/CartModal";
import { pr1 } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";
import axios from 'axios';
import { URL } from "../Common/api";
import { config } from "../Common/configurations";


const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [error, setError] = useState(null);

  const { cart, loading } = useSelector(
    (state) => state.cart
  );

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const openModal = () => {
    setIsModalOpen(true);
    if (categories.length === 0 && !loadingCategories) {
      fetchCategories();
    }
  };
  const closeModal = () => setIsModalOpen(false);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuRef = useRef(null);
  const profileRef = useRef(null);

  // Menu items array
  const menuItems = [
    { name: "Home", path: "/", active: true },
    { name: "Shop", path: "/shop", active: false },
    { name: "About", path: "/about", active: false },
  ];

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      setError(null);
      const { data } = await axios.get(`${URL}/user/categories`, config);
      console.log(data)
      setCategories(data.categories || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load categories. Please try again.');
    } finally {
      setLoadingCategories(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        const menuButton = document.querySelector(".mobile-menu-button");
        if (menuButton && !menuButton.contains(event.target)) {
          setIsMobileMenuOpen(false);
        }
      }

      if (
        isProfileOpen &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        const profileButton = document.querySelector(".profile-button");
        if (profileButton && !profileButton.contains(event.target)) {
          setIsProfileOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen, isProfileOpen]);

  const handleLogout = () => {
    toggleMobileMenu();
    dispatch(logout());
    navigate("/");
  };

  const noUser = () => (
    <svg
      className="h-8 w-8 text-mainclr"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
        fill="currentColor"
      />
      <path
        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
        fill="white"
      />
    </svg>
  )

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <svg
                className="h-8 w-8 text-mainclr"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                  fill="currentColor"
                />
                <path
                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                  fill="white"
                />
              </svg>
              <span className="ml-2 text-xl font-medium text-gray-900">
                Fish Galaxy
              </span>
            </Link>
          </div>

          {/* Navigation (hidden on mobile) */}
          <nav className="hidden lg:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`${item.active ? "text-gray-900" : "text-gray-500"
                  } hover:text-mainclr px-3 py-2 text-sm font-medium`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Login button and mobile menu button */}
          <div className="flex items-center gap-5">
            <button
              onClick={openModal}
              className="hidden lg:block w-full px-2 md:px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-mainclr hover:bg-mainhvr focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainclr"
            >
              <p className="capitalize">view all categories</p>
            </button>

            {/* Profile button and dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={toggleProfile}
                className="profile-button flex items-center border border-transparent text-sm font-medium rounded-full text-mainclr focus:outline-none ring-2 focus:ring-offset-2 focus:ring-mainclr"
              >

                {
                  user.profileImgURL ?
                    <img
                      className="w-12 aspect-square rounded-full object-cover"
                      src={user?.profileImgURL}
                      alt="User"
                    />
                    : <MdAccountCircle className="text-3xl" />
                }
              </button>

              {/* Profile dropdown */}
              {isProfileOpen && (
                <div className="absolute -left-10 md:left-auto md:right-0 mt-5 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <div className="flex items-center overflow-hidden">

                      {
                        user?.profileImgURL ?
                          <img
                            className="h-8 w-8 rounded-full object-cover"
                            src={user?.profileImgURL}
                            alt="User"
                          />
                          : <MdAccountCircle className="text-3xl text-mainclr" />
                    }
                      <div className="ml-2">
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        {
                          user?.email &&
                          <p className="text-xs text-gray-500 ">{user?.email}</p>
                        }
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <MdManageAccounts className="mr-2" />
                    Manage Profile
                  </Link>
                  <Link
                    to="/my-order"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <MdShoppingBag className="mr-2" />
                    My Orders
                  </Link>
                  <button
                    className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    <MdLogout className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Cart button */}
            <div
              onClick={openCart}
              className="relative cursor-pointer flex items-center font-medium rounded-md text-mainclr"
            >
              <IoMdCart className="mr-2 text-2xl" />
              {cart && cart.length !== 0 && (
                <span className="absolute bg-red-500 w-4 h-4 rounded-full text-[10px] grid place-items-center  -right-1 -top-2 text-white">
                  {cart.length !== 0 && cart.length}
                </span>
              )}
            </div>




            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="mobile-menu-button lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-mainclr"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <VscClose className="block h-6 w-6" />
              ) : (
                <CgMenuRight className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with animation */}
      <div
        ref={menuRef}
        className={`lg:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen
          ? "max-h-96 opacity-100"
          : "max-h-0 opacity-0 overflow-hidden"
          }`}
      >
        <div className="pt-2 pb-3 space-y-1 px-4 bg-white shadow-md">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`block pl-3 pr-4 py-2 text-base font-medium ${item.active ? "text-gray-900" : "text-gray-500"
                } hover:bg-gray-50 hover:text-mainclr rounded-md transition-colors duration-200`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={openModal}
            className="w-full px-2 md:px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-mainclr hover:bg-mainhvr focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainclr"
          >
            <p className="uppercase">view all categories</p>
          </button>
        </div>
      </div>

      {/* All Categories Modal */}
      <AllcategModal
        isOpen={isModalOpen}
        onClose={closeModal}
        categories={categories}
        loading={loadingCategories}
        error={error}
      />

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={closeCart} />
    </header>
  );
};

export default Header;