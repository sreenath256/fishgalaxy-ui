import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  Link,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from "react";
import {
  Header,
  Footer,
  AdminSidebar,
  UserHeader,
  UserFooter,
} from "./components";
import Preloader from "./components/Preloader";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataFirst } from "./redux/actions/userActions";

//  page components
const Welcome = lazy(() => import("./pages/welcome"));
const NotFound = lazy(() => import("./pages/notfound"));


const Home = lazy(() => import("./pages/home"));
const About = lazy(() => import("./pages/about"));
const Shop = lazy(() => import("./pages/shop"));
const Cart = lazy(() => import("./pages/cart"));
const Checkout = lazy(() => import("./pages/checkout"));
const Success = lazy(() => import("./pages/success"));
const Profile = lazy(() => import("./pages/profile"));
const Myorders = lazy(() => import("./pages/myOrders"));
const ProductDetails = lazy(() => import("./pages/productDetails"));

// admin
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Orders = lazy(() => import("./pages/admin/orders"));
const Retailers = lazy(() => import("./pages/admin/retailer"));
const AllProducts = lazy(() => import("./pages/admin/allProducts"));
const AddProducts = lazy(() => import("./pages/admin/addProducts"));
const AllCategory = lazy(() => import("./pages/admin/allCategories"));



// Common layout with header and footer
const CommonLayout = () => {
  // scroll top retoration
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* <UserHeader /> */}
      <main className="pt-16">
        <Outlet />
      </main>
      {/* <UserFooter /> */}
    </div>
  );
};

const AdminLayout = () => {
  // scroll top retoration
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar - fixed width */}
      <div className="md:w-64 fixed h-full bg-gray-800 text-white">
        <AdminSidebar />
      </div>
      {/* Main content with outlet */}
      <main className="flex-1 flex flex-col pt-16 md:pt-5 md:ml-64 p-5">
        <Outlet />
      </main>
    </div>
  );
};

// Retailer layout (could have different header/footer)
const RetailerLayout = () => {
  // scroll top retoration
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
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


  // Protected route component
  const ProtectedRoute = ({ element }) => {
    const { user } = useSelector((state) => state.user);

    return true ? element : <Navigate to="/login" />;
  };


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
        className={`transition-opacity duration-500 ${showContent ? "opacity-100" : "opacity-0"
          }`}
      >
        {showContent && (
          <BrowserRouter>
            {user ? user.role === "user" && <Header /> : <UserHeader />}
            <Routes>
              <Route
                path="/"
                element={
                  true ? (
                    user?.role === "admin" || user?.role === "superAdmin" ? (
                      <Navigate to="/admin/" />
                    ) : (
                      <Home />
                    )
                  ) : (
                    <Welcome />
                  )
                }
              />

              <Route
                path="/"
                element={<ProtectedRoute element={<RetailerLayout />} />}
              >
                <Route path="/" element={<Home />} />

                <Route path="shop" element={<Shop />} />
                <Route path="about" element={<About />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="success" element={<Success />} />
                <Route path="profile" element={<Profile />} />
                <Route path="my-order" element={<Myorders />} />
                <Route path="shop/:id" element={<ProductDetails />} />
              </Route>




              {/* User specific routes */}
              <Route element={<CommonLayout />}>
                <Route path="/welcome" element={<Welcome />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Retailer specific routes */}
              {/* <Route element={<ProtectedRoute allowedRoles={["retailer"]} />}>
                <Route element={<RetailerLayout />}>
                  <Route path="/" element={<Home />} />

                  <Route path="/shop" element={<Shop />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/success" element={<Success />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/my-order" element={<Myorders />} />
                  <Route path="/shop/:id" element={<ProductDetails />} />
                </Route>
              </Route> */}

              {/* Admin specific routes */}
              <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route element={<AdminLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/retailers" element={<Retailers />} />
                  <Route path="/products/all" element={<AllProducts />} />
                  <Route path="/products/add" element={<AddProducts />} />
                  <Route path="/products/categories" element={<AllCategory />} />
                </Route>
              </Route>
            </Routes>
              {user ? user.role === "user" && <UserFooter /> : <UserFooter />}

          </BrowserRouter>
        )}
      </div>
    </>
  );
}

export default App;
