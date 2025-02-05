import React, { useState, useEffect } from 'react';
import { User, Bell, Send, Moon, Sun, Shield, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import NotificationPanel from './ui/NotificationPanel';
import logo from '../assets/logo wn.png';
import { Link, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  onLogoClick: () => void;
  userFullName: string;
  setStep: (step: 'account' | 'form' | 'summary' | 'success' | 'details') => void;
  isAdmin: boolean;
  onLogout: () => void;
}

export default function Layout({ children, onLogoClick, userFullName, setStep, isAdmin, onLogout }: LayoutProps) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button onClick={onLogoClick} className="flex items-center gap-2">
            <img src={logo} alt="ThriftWire" className="h-12 w-auto" />
            <span className="text-blue-600 dark:text-blue-400 text-xl font-semibold">
              ThriftWire
            </span>
          </button>
          <div className="flex items-center gap-4">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Sun className="w-5 h-5 text-gray-400" />
              )}
            </motion.button>
            <NotificationPanel setStep={setStep} />
            <div className="relative flex items-center gap-2 dropdown">
              <motion.div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <User className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  {userFullName}
                </span>
              </motion.div>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 overflow-hidden"
                  >
                    <motion.button
                      onClick={onLogout}
                      className="flex items-center w-full px-4 py-3 text-left text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors justify-between"
                    >
                      <span className="flex items-center">
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </span>
                      <span className="text-gray-400">→</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {isAdmin && (
              <button 
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700"
              >
                <Shield className="w-5 h-5" />
                <span>Admin Panel</span>
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="py-8">
        {children}
      </main>
    </div>
  );
}
