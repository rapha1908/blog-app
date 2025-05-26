import React, { FC } from 'react';
import SearchBar from './SearchBar';
import Link from 'next/link';

const Header: FC = () => (
  <header className="flex items-center justify-between bg-gray-900 p-4 w-full">
    <h1 className="text-white font-bold text-xl">Escola XPTO</h1>
    <SearchBar />
    <Link 
      className="bg-blue-600 text-white px-4 py-2 rounded"
      href={"/login"}>
        Login
    </Link>
       <Link 
      className="bg-emerald-600 text-white px-4 py-2 rounded ml-3"
      href={"/register"}>
        Register
    </Link>
  </header>
);

export default Header;