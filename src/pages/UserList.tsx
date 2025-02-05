import React, { useState, useEffect } from 'react';
import { Card, Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge } from '@tremor/react';

export default function UserList() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    // Local storage-dan istifadəçi məlumatlarını al
    const usersList = JSON.parse(localStorage.getItem('usersList') || '[]');
    setUsers(usersList);
  }, []);

  return (
    <Card>
      <Title>İstifadəçi Siyahısı</Title>
      <Table className="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Ad</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Giriş Vaxtı</TableHeaderCell>
            <TableHeaderCell>IP Ünvanı</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {new Date(user.loginTime).toLocaleString('az-AZ')}
              </TableCell>
              <TableCell>{user.ipAddress}</TableCell>
            </TableRow>
          ))}
          {users.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                Hələ heç bir istifadəçi qeydiyyatdan keçməyib
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
} 