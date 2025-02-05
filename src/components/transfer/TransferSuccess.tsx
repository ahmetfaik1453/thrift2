import React, { useEffect } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import ConfettiEffect from '../ui/ConfettiEffect';
import { formatCurrency } from '../../utils/formatters';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface TransferSuccessProps {
  amount: number;
  onNewTransfer: () => void;
  onViewDetails: () => void;
}

export default function TransferSuccess({ amount, onNewTransfer, onViewDetails }: TransferSuccessProps) {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/90 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-800"
      >
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-500 dark:text-green-400" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Transfer Successful! 🎉
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-8">
          You've sent ${amount.toFixed(2)} to XXXXX XXXXX
        </p>

        <div className="space-y-4">
          <motion.button
            onClick={onNewTransfer}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
          >
            Start New Transfer
          </motion.button>

          <motion.button
            onClick={onViewDetails}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium transition-all duration-200 border border-gray-200 dark:border-gray-700"
          >
            View Details
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
