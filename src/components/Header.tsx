'use client'

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Header: React.FC<{ search: string, setSearch: (value: string) => void }> = ({ search, setSearch }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <header className="flex items-center justify-between bg-gray-900 p-4 w-full">
      <h1 className="text-white font-bold text-xl">Escola XPTO</h1>
      <SearchBar value={search} onChange={e => setSearch(e.target.value)} />
      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      ) : (
        <Link 
          className="bg-blue-600 text-white px-4 py-2 rounded"
          href="/login"
        >
          Login
        </Link>
      )}
    </header>
  );
};

export default Header;