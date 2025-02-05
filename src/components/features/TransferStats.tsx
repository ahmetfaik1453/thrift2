import { TrendingUp, Clock, Shield } from 'lucide-react';
import { FC } from 'react';

const TransferStats: FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto px-4">
      {/* Best Exchange Rates */}
      <div className="bg-white/90 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-800 h-[200px] flex flex-col hover:transform hover:scale-105 transition-all duration-300">
        <div className="w-14 h-14 bg-blue-100 dark:bg-blue-950/50 rounded-full flex items-center justify-center mb-4">
          <TrendingUp className="w-7 h-7 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Best Exchange Rates</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Get competitive rates updated in real-time</p>
      </div>

      {/* Fast Transfers */}
      <div className="bg-white/90 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-800 h-[200px] flex flex-col hover:transform hover:scale-105 transition-all duration-300">
        <div className="w-14 h-14 bg-blue-100 dark:bg-blue-950/50 rounded-full flex items-center justify-center mb-4">
          <Clock className="w-7 h-7 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Fast Transfers</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Most transfers arrive within seconds</p>
      </div>

      {/* Secure & Protected */}
      <div className="bg-white/90 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-800 h-[200px] flex flex-col hover:transform hover:scale-105 transition-all duration-300">
        <div className="w-14 h-14 bg-blue-100 dark:bg-blue-950/50 rounded-full flex items-center justify-center mb-4">
          <Shield className="w-7 h-7 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Secure & Protected</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Bank-grade security for your transfers</p>
      </div>
    </div>
  );
};

export default TransferStats;
