import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  Link
} from "react-router-dom";
import { lazy, Suspense } from 'react';
import {Header,Footer} from './components'

const Welcome = lazy(() => import("./pages/welcome"));

// Layout component with header and footer
const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header/>

      {/* Main content area - Outlet will be replaced by the matched route */}
      <main className="pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer/>
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
  return (
    <BrowserRouter>
      <Routes>
        {/* Wrap all routes with the Layout component */}
        <Route element={<Layout />}>
          <Route path="/" element={<Welcome />} />ß
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<p>not found</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;