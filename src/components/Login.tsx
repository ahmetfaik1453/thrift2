import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, ArrowRight, Shield } from 'lucide-react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (data: { email: string; fullName: string; isAdmin: boolean; ipAddress: string }) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const navigate = useNavigate();

  // IP adresini al
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setIpAddress(data.ip))
      .catch(error => console.error('Error fetching IP:', error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !fullName) {
      setError('Please fill in all fields');
      return;
    }

    // Admin yoxlaması - bu hissəni production-da backend-də etmək lazımdır
    if (email === 'thriftwire@admin.com' && fullName === 'TW2024@admin') {
      const adminData = {
        email,
        fullName: 'Admin',
        isAdmin: true,
        ipAddress: '127.0.0.1'
      };
      localStorage.setItem('userData', JSON.stringify(adminData));
      onLogin(adminData);
      navigate('/admin');
      return;
    }

    // Normal istifadəçi məlumatlarını saxla
    const userData = {
      email,
      fullName,
      isAdmin: false,
      ipAddress: ipAddress || '127.0.0.1',
      loginTime: new Date().toISOString()
    };
    
    // Local storage-a məlumatları saxla
    localStorage.setItem('usersList', JSON.stringify([
      ...JSON.parse(localStorage.getItem('usersList') || '[]'),
      userData
    ]));

    onLogin(userData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full"
        >
          <div className="text-center mb-8">
            <img 
              src={logo}
              alt="ThriftWire" 
              className="h-16 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome to ThriftWire
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                  placeholder="Enter your email"
                />
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setError('');
                  }}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                  placeholder="Enter your full name"
                />
                <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm bg-red-50 p-3 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center group"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 