import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { AdminDashboard, AdminLayout, AdminUsers, AdminStores, AdminAddUser, AdminAddStore } from './pages/admin';
import StoresPage from './pages/StoresPage';
import MyRatingsPage from './pages/MyRatingsPage';
import { AuthProvider, useAuth } from './context/AuthContext';

function PrivateRoute({ children, roles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          } />
          <Route path="/admin/users" element={
            <AdminLayout>
              <AdminUsers />
            </AdminLayout>
          } />
          <Route path="/admin/stores" element={
            <AdminLayout>
              <AdminStores />
            </AdminLayout>
          } />
          <Route path="/admin/add-user" element={
            <AdminLayout>
              <AdminAddUser />
            </AdminLayout>
          } />
          <Route path="/admin/add-store" element={
            <AdminLayout>
              <AdminAddStore />
            </AdminLayout>
          } />
          <Route path="/stores" element={<StoresPage />} />
          <Route path="/my-ratings" element={
            <PrivateRoute roles={["user"]}>
              <MyRatingsPage />
            </PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
} 