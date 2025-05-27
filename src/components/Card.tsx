"use client";
import React, { FC } from 'react';
import { useUserType } from '../hooks/useUserType';

interface CardProps {
  titulo: string;
  conteudo: string;
  autor: {
    nome: string;
    tipo?: string;
  };
  materia: string;
}

const Card: FC<CardProps> = ({ titulo, conteudo, autor, materia }) => {
  const userType = useUserType();

  return (
    <div className="bg-gray-800 p-6 mb-4 rounded shadow">
      <h2 className="text-white text-2xl mb-1">{titulo || 'Sem título'}</h2>
      <p className="text-gray-400 text-sm mb-3">Autor: {autor.nome || 'Desconhecido'}</p>
      <p className="text-gray-400 text-sm mb-3">Matéria: {materia || 'Não especificada'}</p>
      <p className="text-gray-300 text-base">{conteudo || 'Sem conteúdo'}</p>
      {(userType === 'Professor' || userType === 'Administrador') && (
        <>
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
        </>
      )}
    </div>
  );
};

export default Card;