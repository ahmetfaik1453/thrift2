import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <img 
            src={logo} 
            alt="ThriftWire" 
            className="h-20 mx-auto"
          />
        </motion.div>

        <div className="mb-8">
          <motion.div 
            className="relative w-16 h-16 mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            {/* Xarici dairə */}
            <div className="w-full h-full border-4 border-blue-500 border-t-transparent rounded-full" />
            {/* Daxili dairə */}
            <div className="absolute inset-0 border-4 border-blue-200 border-b-transparent rounded-full animate-spin" 
              style={{ animationDuration: '1.5s' }}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-xl font-semibold text-gray-700">
            Demo Account
          </h2>
          <p className="text-gray-500 mt-2">
            Preparing your demo environment...
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
} 