import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import AccountCard from './AccountCard';
import TransferForm from './TransferForm';
import TransferSummary from './TransferSummary';
import TransferProgress from './transfer/TransferProgress';
import TransferSuccess from './transfer/TransferSuccess';
import CountryGrid from './features/CountryGrid';
import TransferStats from './features/TransferStats';
import TransferDetails from './transfer/TransferDetails';
import Loading from './Loading';
import { useNotifications } from '../context/NotificationContext';

const currencies: Record<string, { code: string; rate: number }> = {
  AZ: { code: 'AZN', rate: 1.7 },
  TR: { code: 'TRY', rate: 32.83 },
  US: { code: 'USD', rate: 1 },
  GB: { code: 'GBP', rate: 0.79 },
  CA: { code: 'CAD', rate: 1.35 },
  AU: { code: 'AUD', rate: 1.51 },
  JP: { code: 'JPY', rate: 156.26 },
  CN: { code: 'CNY', rate: 7.24 },
  IN: { code: 'INR', rate: 83.45 },
  BR: { code: 'BRL', rate: 4.97 },
  MX: { code: 'MXN', rate: 16.69 },
  ZA: { code: 'ZAR', rate: 18.92 },
};

function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export default function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState<'account' | 'form' | 'summary' | 'success' | 'details'>('account');
  const [balance, setBalance] = useState(1234.56);
  const [transferData, setTransferData] = useState({
    amount: 0,
    fee: 0,
    exchangeRate: 1,
    recipientGets: 0,
    recipientName: 'XXXXX XXXXX',
    iban: '',
    date: new Date().toLocaleDateString(),
    targetCurrency: 'USD',
  });
  const [userData, setUserData] = useState({
    email: '',
    fullName: ''
  });
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const { addNotification } = useNotifications();

  useEffect(() => {
    const fetchExchangeRates = async () => {
      setTransferData(prev => ({
        ...prev,
        exchangeRate: currencies[prev.targetCurrency]?.rate || 1,
      }));
    };

    fetchExchangeRates();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (isFirstLoad) {
      addNotification({
        type: 'welcome',
        title: 'Welcome to ThriftWire! 👋',
        message: 'Thank you for trying our demo account. ThriftWire is a global money transfer system based on blockchain technology, providing secure and fast international transfers.'
      });
      setIsFirstLoad(false);
    }
  }, [isFirstLoad, addNotification]);

  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      const parsedUserData = JSON.parse(savedUserData);
      setUserData({
        email: parsedUserData.email,
        fullName: parsedUserData.fullName
      });
    }
  }, []);

  const handleFormSubmit = (data: { amount: number; fee: number; country: string; iban: string }) => {
    const { amount, fee, country, iban } = data;
    const totalAmount = amount + fee;

    if (totalAmount > balance) {
      return;
    }

    const currencyData = currencies[country] || { code: 'USD', rate: 1 };
    const exchangeRate = currencyData.rate;
    const recipientGets = amount * exchangeRate;
    const targetCurrency = currencyData.code;

    setBalance(prev => prev - totalAmount);
    setTransferData(prev => ({
      ...prev,
      amount,
      fee,
      exchangeRate,
      recipientGets,
      targetCurrency,
      iban: iban.replace(/\s/g, ''),
    }));

    setStep('summary');
  };

  const handleGoToAccount = () => {
    setStep('account');
  };

  const handleTransferConfirm = () => {
    const transferId = generateId();
    
    addNotification({
      type: 'transfer',
      title: 'Transfer Successful! 🎉',
      message: `You have sent $${transferData.amount.toFixed(2)} to XXXXX XXXXX`,
      data: { id: transferId, amount: transferData.amount, recipient: 'XXXXX XXXXX' }
    });

    setStep('success');
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    window.location.href = '/login';
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout 
      onLogoClick={handleGoToAccount}
      userFullName={userData.fullName}
      setStep={setStep}
      isAdmin={false}
      onLogout={handleLogout}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {step !== 'account' && step !== 'details' && (
          <TransferProgress
            currentStep={
              step === 'form' ? 'details' :
              step === 'summary' ? 'review' :
              step === 'success' ? 'complete' :
              'complete'
            }
          />
        )}

        <div className={`transition-all duration-500 ${
          step !== 'account' ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <AccountCard 
              balance={balance} 
              onTransfer={() => setStep('form')}
              userEmail={userData.email}
            />
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white flex flex-col justify-center transform transition hover:scale-105 duration-300">
              <h2 className="text-2xl font-semibold mb-4">Fast & Secure Transfers</h2>
              <p className="text-blue-100">
                Send money internationally with competitive rates and low fees.
                Your transfers are protected with bank-grade security.
              </p>
            </div>
          </div>

          <TransferStats />
          <CountryGrid />
        </div>

        <div className={`transition-all duration-500 ${
          step !== 'form' ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
        }`}>
          <TransferForm onSubmit={handleFormSubmit} balance={balance} />
        </div>

        <div className={`transition-all duration-500 ${
          step !== 'summary' ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
        }`}>
          <TransferSummary
            {...transferData}
            onConfirm={handleTransferConfirm}
            onBack={() => setStep('form')}
          />
        </div>

        <div className={`transition-all duration-500 ${
          step !== 'success' ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
        }`}>
          <TransferSuccess
            amount={transferData.amount}
            recipientName={transferData.recipientName}
            onNewTransfer={() => setStep('account')}
            onViewDetails={() => setStep('details')}
          />
        </div>

        <div className={`transition-all duration-500 ${
          step !== 'details' ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
        }`}>
          <TransferDetails
            {...transferData}
            onGoBack={() => setStep('account')}
          />
        </div>
      </div>
    </Layout>
  );
} 