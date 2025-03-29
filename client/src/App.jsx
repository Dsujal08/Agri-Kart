import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Sign from './pages/Sign';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import ContactUs from './pages/ContactUs';
import Features from './components/Features';
import EditProfile from './components/EditProfile';

// E-commerce & Product Sections
import ProductDetail from './Seeds/Details';
import Checkout from './Checkout/Checkout';
import { CartProvider } from './Seeds/Cart';

// Seeds Section
import Layout from './Seeds/layout';
import Homeseeds from './Seeds/Homeseeds';
import { SeedsDetails } from './Seeds/Seeds_details';

// Fertilizers Section
import HomeFer from './Fertilizers/HomeFer';

// Insecticides Section
import InsDetails from './Insecticides/InsDetails';
import InsLayout from './Insecticides/Inslayout';
import HomeIns from './Insecticides/HomeIns';

// Schemes Section
import Scheme from './Schemes/Schemes';
import SchemeDetails from './Schemes/SchemeDetails';

// Brands & Products
import Brands from './cards/Brands';
import BrandsPage from './cards/BrandsPage';
import OrganicFruits from './cards/organicfruits';
import FertilizerCalculator from './Calculator/Calculator'

import HomePlant from './Plants/HomePlant'
import Orders from './components/ViewOrder'
const App = () => {
  return (
    <CartProvider>
      <ToastContainer />
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/features" element={<Features />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/fertilizerconverter" element={<FertilizerCalculator />} />

        {/* Product Details */}
        <Route path="/product/:slug" element={<ProductDetail />} />

        {/* Schemes */}
        <Route path="/schemes" element={<Scheme />} />
        <Route path="/scheme/:id" element={<SchemeDetails />} />

        {/* Seeds Section */}
        <Route path="/seeds" element={<Layout />}>
          <Route index element={<Homeseeds />} />
        </Route>
        <Route path="/seedsDetails" element={<SeedsDetails />} />

        {/* Fertilizers Section */}
        <Route path="/fertilizers" element={<Layout />}>
          <Route index element={<HomeFer />} />
        </Route>


        {/* Insecticides Section */}
        <Route path="/insecticides" element={<Layout />}>
          <Route index element={<HomeIns />} />
        </Route>
        <Route path="/insDetails" element={<InsDetails />} />

        {/* Plants Section */}
        <Route path="/plants" element={<Layout />}>
          <Route index element={<HomePlant />} />
        </Route>

        {/* Brands Section */}
        <Route path="/trusted-brands" element={<Brands />} />
        <Route path="/brands" element={<BrandsPage />} />

        {/* Organic Products */}
        <Route path="/organicfruits" element={<OrganicFruits />} />
      </Routes>
    </CartProvider>
  );
  
};

export default App;
