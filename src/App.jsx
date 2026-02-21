import Home from './Home.jsx'
import PuppiesListingPage from './components/PuppiesListingPage.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import CollectionPage from './components/CollectionPage'
import ProductDetail from './components/ProductDetail.jsx'; 
import ProductListingPage from './components/ProductListingPage.jsx';
import Checkout from './components/Checkout.jsx';
import Dashboard from './admin/Dashboard';
import UserDashboard from './user/UserDashboard.jsx';
import LoginPage from './components/LoginPage.jsx';
import SignupPage from './components/SignupPage.jsx';
import ProductSelectionPage from './admin/ProductSelectionPage.jsx';
import OrderDetailPage from './user/OrderDetailPage.jsx';
import AdminOrderDetailPage from './admin/AdminOrderDetailPage.jsx';
import PuppyDetail from './components/PuppyDetail.jsx';
import { Route, Routes } from 'react-router-dom';  
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthLayout from './AuthLayout.jsx';
import MainLayout from './MainLayout.jsx';
import SearchResults from './components/SearchResults.jsx';

function App() {
  return (
    <div className="App"> 
      <Routes>
        {/* Public routes with header + footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/puppies" element={<PuppiesListingPage />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/puppyDetail/:id" element={<PuppyDetail />} /> 
          <Route path="/productDetail/:id" element={<ProductDetail />} /> 
          <Route path="/collections/:key" element={<CollectionPage />} />   
          <Route path="/cart" element={<Checkout />} /> 
          <Route path="/orderHistory/:orderId" element={<OrderDetailPage />} />
          <Route path="/select-products" element={<ProductSelectionPage />} /> 
          {/* Dashboards also wrapped in MainLayout so they get header/footer */}
          <Route path="/adminDashboard/*" element={<Dashboard />} />
          <Route path="/userDashboard/*" element={<UserDashboard />} />        
          <Route path="/admin/order/:id" element={<AdminOrderDetailPage />} />  
          <Route path="/search" element={<SearchResults />} />
        </Route>

        {/* Auth pages without header/footer */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
}

export default App;
