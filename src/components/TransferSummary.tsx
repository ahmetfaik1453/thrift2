import React, { useState } from 'react';
import { ArrowRight, DollarSign, Clock, ArrowLeft, Shield } from 'lucide-react';
import CurrencyBadge from './ui/CurrencyBadge';
import AnimatedNumber from './ui/AnimatedNumber';
import { motion } from 'framer-motion';

interface TransferSummaryProps {
  amount: number;
  fee: number;
  exchangeRate: number;
  recipientGets: number;
  onConfirm: () => void;
  onBack: () => void;
  targetCurrency: string;
}

export default function TransferSummary({
  amount,
  fee,
  exchangeRate,
  recipientGets,
  onConfirm,
  onBack,
  targetCurrency
}: TransferSummaryProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    onConfirm();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
      >
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Transfer Summary</h2>
        
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-gray-700"
          >
            <div className="text-gray-600 dark:text-gray-300">You send</div>
            <div className="text-xl font-semibold dark:text-white">
              <AnimatedNumber value={amount} />
              <span className="ml-1">USD</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-lg p-6 space-y-4"
          >
            <div className="flex justify-between items-center">
              <div className="text-gray-600 dark:text-gray-300">Exchange rate</div>
              <div className="font-medium dark:text-white">
                1 USD = <AnimatedNumber value={exchangeRate} /> {targetCurrency}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-gray-600 dark:text-gray-300">Transfer fee (0.5%)</div>
              <div className="font-medium text-blue-600 dark:text-blue-400">
                +${formatCurrency(fee)}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              className="pt-4 border-t border-blue-100"
            >
              <div className="flex items-center text-sm text-blue-700">
                <Shield className="w-4 h-4 mr-2" />
                Protected by bank-level security
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="flex justify-between items-center py-4 border-t border-gray-100"
          >
            <div className="text-gray-600">Recipient gets</div>
            <div className="text-2xl font-bold text-green-600">
              <AnimatedNumber value={recipientGets} />
              <span className="ml-1">{targetCurrency}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="flex items-center text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg"
          >
            <Clock className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
            Estimated arrival: 2 seconds
          </motion.div>

          <div className="flex gap-4">
            <motion.button
              onClick={onBack}
              disabled={isLoading}
              className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 flex items-center justify-center group disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back
            </motion.button>
            <motion.button
              onClick={handleConfirm}
              disabled={isLoading}
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 flex items-center justify-center group disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  Confirm Transfer
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function formatCurrency(value: number): string {
  return value.toFixed(2);
}
