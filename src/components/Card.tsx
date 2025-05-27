// components/Card.tsx
import React, { FC } from 'react';
import { Post } from '../types';

interface CardProps extends Post {}

const Card: FC<CardProps> = ({ titulo, conteudo, autor, materia }) => (
  <div className="bg-gray-800 p-6 mb-4 rounded shadow">
<h2 className="text-white text-2xl mb-1">{titulo || 'Sem título'}</h2>
    <p className="text-gray-400 text-sm mb-3">Autor: {autor || 'Desconhecido'}</p>
    <p className="text-gray-400 text-sm mb-3">Matéria: {materia || 'Não especificada'}</p>
    <p className="text-gray-300 text-base">{conteudo || 'Sem conteúdo'}</p>
    <button 
      className="bg-blue-500 text-white px-4 py-2 rounded mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      edit
    </button>
    <button 
      className="bg-red-500 text-white px-4 py-2 rounded mt-4 ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      remove
    </button>
  </div>
);

export default Card;