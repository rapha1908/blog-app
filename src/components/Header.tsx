'use client'

import Link from 'next/link';
import React from 'react';
import SearchBar from './SearchBar';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useUserType } from '@/hooks/useUserType';

const Header: React.FC<{ search: string, setSearch: (value: string) => void }> = ({ search, setSearch }) => {
  const router = useRouter();
  const userType = useUserType();
  const isLoggedIn = !!Cookies.get('token');

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('userType');
    router.push('/');
    window.location.reload();
  };

  return (
    <header className="flex items-center justify-between bg-gray-900 p-4 w-full">
      <h1 className="text-white font-bold text-xl">Escola XPTO</h1>
      <SearchBar value={search} onChange={e => setSearch(e.target.value)} />
      {isLoggedIn ? (
        <>
          {userType === "Administrador" && (
            <Link
              className="bg-green-600 text-white px-4 py-2 rounded mr-2"
              href="/administradores"
            >
              Professores
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <Link 
            className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto text-center"
            href="/login"
          >
            Login
          </Link>
          <Link 
            className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto text-center"
            href="/register"
          >
            Registrar
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;