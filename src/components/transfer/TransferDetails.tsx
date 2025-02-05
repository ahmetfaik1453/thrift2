import React, { useRef } from 'react';
import { CheckCircle, ArrowLeft, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { formatCurrency, formatExchangeRate, formatIBAN } from '../../utils/formatters';

interface TransferDetailsProps {
  amount: number;
  fee: number;
  exchangeRate: number;
  recipientGets: number;
  recipientName: string;
  iban: string;
  date: string;
  onGoBack: () => void;
  targetCurrency: string;
}

export default function TransferDetails({
  amount,
  fee,
  exchangeRate,
  recipientGets,
  recipientName,
  iban,
  date,
  onGoBack,
  targetCurrency
}: TransferDetailsProps) {
  const detailsRef = useRef<HTMLDivElement>(null);
  const formattedIBAN = iban.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  
  const handlePrint = async () => {
    if (!detailsRef.current) return;

    try {
      const dataUrl = await toPng(detailsRef.current);
      const link = document.createElement('a');
      link.download = 'transfer-details.png';
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const details = [
    { label: 'Amount Sent', value: `$${amount.toFixed(2)}` },
    { label: 'Transfer Fee (0.5%)', value: `+$${fee.toFixed(2)}`, color: 'text-blue-600' },
    { label: 'Exchange Rate', value: `1 USD = ${exchangeRate.toFixed(4)} ${targetCurrency}` },
    { label: 'Recipient Gets', value: `${recipientGets.toFixed(2)} ${targetCurrency}`, color: 'text-green-600' },
    { label: 'Recipient Name', value: recipientName },
    { label: 'Recipient IBAN', value: formattedIBAN || 'Invalid IBAN' },
    { label: 'Transfer Date', value: date },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        ref={detailsRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-900/50 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-800"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-500 dark:text-green-400" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
          Transfer Successful! 🎉
        </h2>

        <div className="space-y-4">
          {details.map((detail, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700 last:border-0"
            >
              <div className="text-gray-600 dark:text-gray-400">{detail.label}</div>
              <div className={`${detail.color || 'text-gray-800 dark:text-gray-200'} font-medium`}>
                {detail.value}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-8">
          <motion.button
            onClick={onGoBack}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </motion.button>
          <motion.button
            onClick={handlePrint}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center group"
          >
            <FileText className="w-4 h-4 mr-2" />
            View Details
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
