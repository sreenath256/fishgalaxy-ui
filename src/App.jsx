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
  const location = useLocation();
  const [scrollHistory, setScrollHistory] = useState({});

  useEffect(() => {
    if (scrollHistory[location.key]) {
      window.scrollTo(0, scrollHistory[location.key]);
    } else {
      window.scrollTo(0, 0);
    }

    const saveScrollPosition = () => {
      setScrollHistory((prev) => ({
        ...prev,
        [location.key]: window.scrollY,
      }));
    };

    window.addEventListener("beforeunload", saveScrollPosition);

    return () => {
      saveScrollPosition();
      window.removeEventListener("beforeunload", saveScrollPosition);
    };
  }, [location.key]);

  return (
    <div className="min-h-screen flex flex-col">
      <UserHeader />
      <main className="pt-16">
        <Outlet />
      </main>
      <UserFooter />
    </div>
  );
};

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
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
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};



// Protected route component
const ProtectedRoute = ({ userType, allowedRoles, children }) => {
  const location = useLocation();

  // In a real app, you would check the user's role from auth context
  const currentUserRole = "admin"; // user,retailer,admin

  if (!allowedRoles.includes(currentUserRole)) {
    // Redirect them to the appropriate page based on their role
    let redirectPath = "/welcome";
    if (currentUserRole === "admin") redirectPath = "/dashboard";
    if (currentUserRole === "retailer") redirectPath = "/";

    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};

function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
      setTimeout(() => setShowContent(true), 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader isComplete={!initialLoading} />

      <div
        className={`transition-opacity duration-500 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        {showContent && (
          <BrowserRouter>
            <Routes>
              {/* User specific routes */}
              <Route element={<CommonLayout />}>
                <Route path="/welcome" element={<Welcome />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Retailer specific routes */}
              <Route element={<ProtectedRoute allowedRoles={["retailer"]} />}>
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
              </Route>

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
          </BrowserRouter>
        )}
      </div>
    </>
  );
}

export default App;
