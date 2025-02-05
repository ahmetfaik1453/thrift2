import { TrendingUp, Clock, Shield, Users } from 'lucide-react';

export const TRANSFER_STATS = [
  {
    icon: TrendingUp,
    title: 'Best Exchange Rates',
    description: 'Get competitive rates updated in real-time'
  },
  {
    icon: Clock,
    title: 'Fast Transfers',
    description: 'Most transfers arrive within minutes'
  },
  {
    icon: Shield,
    title: 'Secure & Protected',
    description: 'Bank-grade security for your transfers'
  }
] as const;
