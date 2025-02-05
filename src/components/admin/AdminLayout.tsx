import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Users, Activity, Settings as SettingsIcon, LogOut } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('usersList');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white mr-8">
              Admin Panel
            </h1>
            <div className="flex space-x-4">
              <Link 
                to="/admin" 
                className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Activity className="w-5 h-5 mr-2" />
                Dashboard
              </Link>
              <Link 
                to="/admin/users" 
                className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Users className="w-5 h-5 mr-2" />
                İstifadəçilər
              </Link>
              <Link 
                to="/admin/settings" 
                className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <SettingsIcon className="w-5 h-5 mr-2" />
                Parametrlər
              </Link>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center px-3 py-2 text-red-600 hover:text-red-700"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Çıxış
          </button>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
} 