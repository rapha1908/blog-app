"use client";
import React from 'react';
import Link from 'next/link';

const AddButton: React.FC = () => {
 

  return (
    <Link href={"/create/"}
      className="bg-blue-600 text-white px-6 py-4 rounded rounded-4xl fixed bottom-8 right-8 shadow-lg hover:bg-blue-700 transition-colors text-2xl"
    >
      +
    </Link>
  );
};

export default AddButton;