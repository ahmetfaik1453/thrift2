import React from 'react';
import { DollarSign } from 'lucide-react';

interface CurrencyBadgeProps {
  amount: number;
  currency?: string;
}

export default function CurrencyBadge({ amount, currency = 'USD' }: CurrencyBadgeProps) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-600">
      <DollarSign className="w-4 h-4 mr-1" />
      <span className="font-medium">{amount.toFixed(2)} {currency}</span>
    </span>
  );
}
