import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import Login from './components/Login';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/Dashboard';
import UserList from './pages/UserList';
import TransactionList from './pages/TransactionList';
import Settings from './pages/Settings';
import AppContent from './components/AppContent';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData.email) {
      setIsAuthenticated(true);
      setIsAdmin(userData.isAdmin || false);
    }
  }, []);

  return (
    <Router>
      <ThemeProvider>
        <NotificationProvider>
          <Routes>
            <Route 
              path="/login" 
              element={
                !isAuthenticated ? (
                  <Login onLogin={(data) => {
                    localStorage.setItem('userData', JSON.stringify(data));
                    setIsAuthenticated(true);
                    setIsAdmin(data.isAdmin);
                  }} />
                ) : (
                  <Navigate to={isAdmin ? "/admin" : "/"} />
                )
              } 
            />
            <Route 
              path="/admin/*" 
              element={
                isAuthenticated && isAdmin ? (
                  <AdminLayout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/users" element={<UserList />} />
                      <Route path="/transactions" element={<TransactionList />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </AdminLayout>
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
            <Route 
              path="/*" 
              element={
                isAuthenticated && !isAdmin ? (
                  <AppContent />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
          </Routes>
        </NotificationProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;