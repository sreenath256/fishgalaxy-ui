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

// Layout component with header and footer
const Layout = () => {
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

  useEffect(() => {
    // Only show preloader for initial load
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1500); // Adjust initial load time as needed

    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return <Preloader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/welcome" element={<Welcome />} />
        
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;