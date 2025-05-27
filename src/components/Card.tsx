import React, { FC } from 'react';
import { Post } from '../types';
import Link from 'next/link';
import AdminButtons from './AdminButtons';

interface CardProps {
  post: Post;
  onDeletePost: (id: string) => void;
}

const Card: FC<CardProps> = ({ post, onDeletePost }) => {
  // Função para truncar o texto e adicionar reticências
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className="bg-gray-800 p-6 mb-4 rounded shadow">
      <h2 className="text-white text-2xl mb-1">
        <Link href={`/post/${post._id}`}>{post.titulo}</Link>
      </h2>
      <p className="text-gray-400 text-sm mb-1">por {post.autor.nome}</p>
      <p className="text-gray-400 text-sm mt-1 mb-3 ">Matéria: {post.materia}</p>
      <p className="text-gray-300 text-base">{truncateText(post.conteudo, 100)}</p>
      
      <AdminButtons 
        postId={post._id} 
        onDeleteSuccess={() => onDeletePost(post._id)}
      />
    </div>
  );
};

export default Card;