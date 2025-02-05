import React from 'react';
import CountryCard from './features/country/CountryCard';
import { POPULAR_EXCHANGES } from '../constants/countries';

export default function ExchangeList() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Popular Exchanges</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {POPULAR_EXCHANGES.map((exchange) => (
          <CountryCard
            key={exchange.country}
            country={exchange.country}
            flag={exchange.flag}
            rate={exchange.rate}
            image={exchange.image}
          />
        ))}
      </div>
    </div>
  );
} 