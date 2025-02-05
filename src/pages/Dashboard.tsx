import React, { useState, useEffect } from 'react';
import { Card, Title, Text, BarChart, DonutChart, Flex, Metric } from '@tremor/react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalTransactions: 0
  });

  useEffect(() => {
    // Local storage-dan istifadəçi məlumatlarını al
    const usersList = JSON.parse(localStorage.getItem('usersList') || '[]');
    
    // Statistikaları hesabla
    setStats({
      totalUsers: usersList.length,
      activeUsers: usersList.filter((user: any) => {
        const loginTime = new Date(user.loginTime);
        const now = new Date();
        const diffHours = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);
        return diffHours < 24; // Son 24 saat ərzində giriş edənlər
      }).length,
      totalTransactions: 88000 // Bu hissəni real məlumatlarla əvəz edə bilərsiniz
    });
  }, []);

  const chartdata = [
    { date: "Jan", "Active Users": 2890, "New Users": 2338 },
    { date: "Feb", "Active Users": 2756, "New Users": 2103 },
    { date: "Mar", "Active Users": 3322, "New Users": 2194 },
    { date: "Apr", "Active Users": 3470, "New Users": 2108 },
    { date: "May", "Active Users": 3475, "New Users": 1812 },
  ];

  const countries = [
    { name: "USA", amount: 34500 },
    { name: "UK", amount: 23000 },
    { name: "Germany", amount: 18500 },
    { name: "Japan", amount: 12000 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <Title>Ümumi İstifadəçilər</Title>
          <Metric>{stats.totalUsers.toLocaleString()}</Metric>
        </Card>
        <Card>
          <Title>Aktiv İstifadəçilər</Title>
          <Metric>{stats.activeUsers.toLocaleString()}</Metric>
        </Card>
        <Card>
          <Title>Ümumi Əməliyyatlar</Title>
          <Metric>${stats.totalTransactions.toLocaleString()}</Metric>
        </Card>
      </div>

      <Card>
        <Title>İstifadəçi Aktivliyi</Title>
        <BarChart 
          data={chartdata} 
          categories={["Active Users", "New Users"]}
          index="date"
          colors={["blue", "teal"]}
          yAxisWidth={48}
        />
      </Card>

      <Card>
        <Title>Ölkələr üzrə Əməliyyatlar</Title>
        <DonutChart 
          data={countries}
          category="amount"
          index="name"
          colors={["blue", "cyan", "indigo", "violet"]}
        />
      </Card>
    </div>
  );
} 