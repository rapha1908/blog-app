"use client";
import React, { FC } from 'react';
import { useUserType } from '../hooks/useUserType';
import { Post } from '@/types';

interface CardProps extends Post {}

const Card: FC<CardProps> = ({ titulo, conteudo, autor, materia }) => {
  const userType = useUserType();

  // Função para truncar o texto e adicionar reticências
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  // Truncar o conteúdo para 200 caracteres
  const truncatedContent = truncateText(conteudo, 200);

  return (
    <div className="bg-gray-800 p-6 mb-4 rounded shadow">
      <h2 className="text-white text-2xl mb-1">{titulo || 'Sem título'}</h2>
      <p className="text-gray-400 text-sm mb-3">Autor: {autor.nome || 'Desconhecido'}</p>
      <p className="text-gray-400 text-sm mb-3">Matéria: {materia || 'Não especificada'}</p>
      <p className="text-gray-300 text-base whitespace-pre-wrap">{truncatedContent}</p>
      {(userType === 'Professor' || userType === 'Administrador') && (
        <div className="mt-4">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Editar
          </button>
          <button 
            className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Remover
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;