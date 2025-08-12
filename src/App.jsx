import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from "react";
import {
  Header,
  Footer,
  AdminSidebar,
  UserHeader,
} from "./components";
import Preloader from "./components/Preloader";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataFirst } from "./redux/actions/userActions";
import "react-day-picker/style.css";

// Page components
const Welcome = lazy(() => import("./pages/welcome"));
const NotFound = lazy(() => import("./pages/notfound"));
const LoginSignup = lazy(() => import("./pages/loginSignup"));
const Home = lazy(() => import("./pages/home"));
const About = lazy(() => import("./pages/about"));
const Shop = lazy(() => import("./pages/shop"));
const Cart = lazy(() => import("./pages/cart"));
const Checkout = lazy(() => import("./pages/checkout"));
const Success = lazy(() => import("./pages/success"));
const Profile = lazy(() => import("./pages/profile"));
const Myorders = lazy(() => import("./pages/myOrders"));
const ProductDetails = lazy(() => import("./pages/productDetails"));

// Admin pages
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Orders = lazy(() => import("./pages/admin/orders"));
const Retailers = lazy(() => import("./pages/admin/retailer"));
const AllProducts = lazy(() => import("./pages/admin/allProducts"));
const EditProduct = lazy(() => import("./pages/admin/EditProduct"));
const AddProducts = lazy(() => import("./pages/admin/addProducts"));
const AllCategory = lazy(() => import("./pages/admin/allCategories"));
const AddCategory = lazy(() => import("./pages/admin/createCategories"));
const EditCategory = lazy(() => import("./pages/admin/EditCategory"));

// Layouts
const CommonLayout = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

const AdminLayout = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      <div className="md:w-64 fixed h-full bg-gray-800 text-white">
        <AdminSidebar />
      </div>
      <main className="flex-1 flex flex-col pt-16 md:pt-5 md:ml-64 p-5">
        <Outlet />
      </main>
    </div>
  );
};

const RetailerLayout = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div className="flex flex-col">
      <Header />
      <main className="pt-16 min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// Role-based route protection
const ProtectedRoute = ({ element, allowedRoles }) => {
  const { user } = useSelector((state) => state.user);
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  return element;
};

function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(getUserDataFirst());
    }
  }, [dispatch, user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
      setTimeout(() => setShowContent(true), 300);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Toaster position="top-center" />
      <Preloader isComplete={!initialLoading} />

      <div
        className={`transition-opacity duration-500 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        {showContent && (
          <BrowserRouter>
            {user ? user.role === "user" && <Header /> : <UserHeader />}
            <Routes>
              {/* Landing route */}
              <Route
                path="/"
                element={
                  user ? (
                    user.role === "admin" || user.role === "superAdmin" ? (
                      <Navigate to="/admin" />
                    ) : (
                      <Home />
                    )
                  ) : (
                    <Welcome />
                  )
                }
              />

              {/* User routes */}
              <Route
                element={
                  <ProtectedRoute
                    allowedRoles={["user", "retailer"]}
                    element={<RetailerLayout />}
                  />
                }
              >
                <Route path="shop" element={<Shop />} />
                <Route path="about" element={<About />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="order-confirmation" element={<Success />} />
                <Route path="profile" element={<Profile />} />
                <Route path="my-order" element={<Myorders />} />
                <Route path="shop/:id" element={<ProductDetails />} />
              </Route>

              {/* Auth & public */}
              <Route element={<CommonLayout />}>
                <Route path="/login" element={<LoginSignup />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Admin routes */}
              <Route
                element={
                  <ProtectedRoute
                    allowedRoles={["admin", "superAdmin"]}
                    element={<AdminLayout />}
                  />
                }
              >
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/admin/orders" element={<Orders />} />
                <Route path="/admin/retailers" element={<Retailers />} />
                <Route path="/admin/products" element={<AllProducts />} />
                <Route
                  path="/admin/products/edit/:id"
                  element={<EditProduct />}
                />
                <Route path="/admin/products/add" element={<AddProducts />} />
                <Route
                  path="/admin/products/categories"
                  element={<AllCategory />}
                />
                <Route
                  path="/admin/products/categories/add"
                  element={<AddCategory />}
                />
                <Route
                  path="/admin/products/categories/edit/:id"
                  element={<EditCategory />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        )}
      </div>
    </>
  );
}

export default App;
