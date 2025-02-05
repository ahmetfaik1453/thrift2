import React from 'react';

interface CountryCardProps {
  country: string;
  flag: string;
  rate: string;
  image: string;
}

export default function CountryCard({ country, flag, rate, image }: CountryCardProps) {
  const getCurrencyPair = (countryName: string) => {
    switch (countryName) {
      case 'Azerbaijan': return `1 AZN = ${rate} USD`;
      case 'Turkey': return `1 AZN = ${rate} TRY`;
      case 'United States': return `1 USD = ${rate} TRY`;
      case 'United Kingdom': return `1 USD = ${rate} GBP`;
      case 'Poland': return `1 AZN = ${rate} PLN`;
      case 'Europe': return `1 AZN = ${rate} Euro`;
      case 'Japan': return `1 AZN = ${rate} JPY`;
      case 'China': return `1 TRY = ${rate} CNY`;
      default: return 'Exchange rate not available';
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02]">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20 z-10 dark:from-black/90 dark:via-black/60 dark:to-black/30" />
      <img 
        src={image} 
        alt={country}
        className="w-full h-48 object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">{flag}</span>
          <h3 className="font-semibold text-white">{country}</h3>
        </div>
        <p className="text-sm text-gray-200 dark:text-gray-300">
          {getCurrencyPair(country)}
        </p>
      </div>
    </div>
  );
}
