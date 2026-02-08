import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { FormationsPage } from './pages/FormationsPage';
import { ProductsPage } from './pages/ProductsPage';
import { LoginPage } from './pages/LoginPage';
import { ClientSpacePage } from './pages/ClientSpacePage';
import { LegalMentions } from './pages/legal/LegalMentions';
import { TermsOfSale } from './pages/legal/TermsOfSale';
import { PrivacyPolicy } from './pages/legal/PrivacyPolicy';

// Admin Pages
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminServicesPage } from './pages/admin/AdminServicesPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminFormationsPage } from './pages/admin/AdminFormationsPage';
import { AdminGalleryPage } from './pages/admin/AdminGalleryPage';
import { AdminMessagesPage } from './pages/admin/AdminMessagesPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { CartSidebar } from './components/CartSidebar';
import { ProtectedRoute } from './components/ProtectedRoute';

const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Navbar />
      <CartSidebar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <CartProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/formations" element={<FormationsPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                
                {/* Legal Routes */}
                <Route path="/mentions-legales" element={<LegalMentions />} />
                <Route path="/cgv" element={<TermsOfSale />} />
                <Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
              </Route>

              {/* Auth Routes */}
              <Route path="/login" element={<LoginPage />} />
              
              <Route element={<ProtectedRoute />}>
                <Route path="/client" element={<ClientSpacePage />} />
              </Route>

              {/* Admin Routes */}
              <Route element={<ProtectedRoute requireAdmin={true} />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="orders" element={<AdminOrdersPage />} />
                  <Route path="services" element={<AdminServicesPage />} />
                  <Route path="products" element={<AdminProductsPage />} />
                  <Route path="formations" element={<AdminFormationsPage />} />
                  <Route path="gallery" element={<AdminGalleryPage />} />
                  <Route path="messages" element={<AdminMessagesPage />} />
                  <Route path="users" element={<AdminUsersPage />} />
                </Route>
              </Route>

              <Route path="*" element={<HomePage />} />
            </Routes>
          </Router>
        </CartProvider>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
