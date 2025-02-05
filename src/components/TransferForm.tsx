import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowRight, AlertCircle } from 'lucide-react';
import CurrencyBadge from './ui/CurrencyBadge';
import { motion } from 'framer-motion';

const countries = [
  { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
];

interface TransferFormProps {
  balance: number;
  onSubmit: (data: { amount: number; fee: number; country: string; iban: string }) => void;
}

interface IBANInputProps {
  value: string;
  onChange: (value: string) => void;
}

const IBANInput = ({ value, onChange }: IBANInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const formatIBAN = useCallback((raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = formatIBAN(e.target.value);
    onChange(newValue);
  }, [formatIBAN, onChange]);

  return (
    <div className="relative font-mono">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all font-mono"
        maxLength={19}
        placeholder="XXXX XXXX XXXX XXXX"
      />
    </div>
  );
};

export default function TransferForm({ balance, onSubmit }: TransferFormProps) {
  const [amount, setAmount] = useState('');
  const [country, setCountry] = useState('');
  const [iban, setIban] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];
    
    const amountNum = Number(amount);
    const fee = amountNum * 0.005;
    const totalAmount = amountNum + fee;

    // Minimum məbləğ yoxlaması
    if (amountNum < 1) {
      newErrors.push('Minimum transfer amount is $1.00 USD');
    }

    // Balans yoxlaması
    if (totalAmount > balance) {
      newErrors.push(`Insufficient funds. Total amount (including fee) is $${totalAmount.toFixed(2)} USD, but your balance is $${balance.toFixed(2)} USD`);
    }

    // Ölkə yoxlaması
    if (!country) {
      newErrors.push('Please select a destination country');
    }

    // IBAN yoxlaması
    if (!iban || iban.replace(/\s/g, '').length !== 16) {
      newErrors.push('Please enter a valid 16-digit IBAN number');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({ 
      amount: amountNum,
      fee,
      country,
      iban
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
      >
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Send Money</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount (USD)
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setErrors([]);
                }}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white pr-20"
                placeholder="Enter amount"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {amount && <CurrencyBadge amount={Number(amount)} />}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Destination Country
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="" className="dark:bg-gray-800">Select country</option>
              {countries.map((c) => (
                <option key={c.code} value={c.code} className="dark:bg-gray-800">
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Recipient's IBAN
            </label>
            <IBANInput 
              value={iban} 
              onChange={(value) => {
                setIban(value);
                setErrors([]);
              }} 
            />
            
            {errors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-2 mt-2"
              >
                {errors.map((error, index) => (
                  <div 
                    key={index}
                    className="flex items-center text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/50 p-3 rounded-lg"
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {error}
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center group"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
