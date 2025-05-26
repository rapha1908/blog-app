// components/Card.tsx
import React, { FC } from 'react';
import { Post } from '../types';

interface CardProps extends Post {
  isAuthenticated: boolean;
}

const Card: FC<CardProps> = ({ title, author, description, isAuthenticated }) => (
  <div className="bg-gray-800 p-6 mb-4 rounded shadow">
    <h2 className="text-white text-2xl mb-1">{title}</h2>
    <p className="text-gray-400 text-sm mb-3">por {author}</p>
    <p className="text-gray-300 text-base">{description}</p>
    <button 
      className="bg-blue-500 text-white px-4 py-2 rounded mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={!isAuthenticated}
    >
      edit
    </button>
    <button 
      className="bg-red-500 text-white px-4 py-2 rounded mt-4 ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={!isAuthenticated}
    >
      remove
    </button>
  </div>
);

export default Card;