import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  Link,
  useLocation
} from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from 'react';
import { Header, Footer } from './components'
import Preloader from './components/Preloader';

// Lazy-loaded page components
const Welcome = lazy(() => import("./pages/welcome"));
const Home = lazy(() => import("./pages/home"));
const Shop = lazy(() => import("./pages/shop"));
const Cart = lazy(() => import("./pages/cart"));
const Checkout = lazy(() => import("./pages/checkout"));
const Success = lazy(() => import("./pages/success"));
const Profile = lazy(() => import("./pages/profile"));
const Myorders = lazy(() => import("./pages/myOrders"));
const ProductDetails = lazy(() => import("./pages/productDetails"));

// Layout component with header and footer
const Layout = () => {
  const location = useLocation();
  const [scrollHistory, setScrollHistory] = useState({});

  useEffect(() => {
    // Restore scroll position when coming back to a page
    if (scrollHistory[location.key]) {
      window.scrollTo(0, scrollHistory[location.key]);
    } else {
      // Scroll to top for new page loads
      window.scrollTo(0, 0);
    }

    // Function to save scroll position before leaving the page
    const saveScrollPosition = () => {
      setScrollHistory(prev => ({
        ...prev,
        [location.key]: window.scrollY
      }));
    };

    // Add event listener for beforeunload
    window.addEventListener('beforeunload', saveScrollPosition);

    return () => {
      // Save scroll position when leaving the page
      saveScrollPosition();
      window.removeEventListener('beforeunload', saveScrollPosition);
    };
  }, [location.key]);
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main content area */}
      <main className="pt-16">
          <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

const NotFound = () => (
  <div className="text-center py-20">
    <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
    <p className="text-xl">Page not found</p>
    <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
      Return to Home
    </Link>
  </div>
);

function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
      // Delay showing content slightly to allow preloader to fade out
      setTimeout(() => setShowContent(true), 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader isComplete={!initialLoading} />
      
      <div className={`transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {showContent && (
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/success" element={<Success />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/my-order" element={<Myorders />} />
                <Route path="/shop/:id" element={<ProductDetails />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        )}
      </div>
    </>
  );
}

export default App;