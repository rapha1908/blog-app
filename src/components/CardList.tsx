import React from 'react';
import { Post } from '@/types';
import Card from './Card';
import { cookies } from 'next/headers';

async function getPosts() {
  const cookieStore = await cookies(); // Torne isso assíncrono
  const token = cookieStore.get('token')?.value;

  try {
    const response = await fetch('http://localhost:5000/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Erro ao buscar posts:', response.statusText);
      return [];
    }
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return [];
  }
}

export default async function CardList() {
  const posts: Post[] = await getPosts();
  console.log('Posts recebidos:', posts);

  return (
    <div className="w-full max-w-4xl">
      {Array.isArray(posts) ? posts.map((post, index) => (
        <Card 
          key={index}
          titulo={post.titulo || ''}
          conteudo={post.conteudo || ''}
          autor={post.autor.nome || ''} // Passamos apenas o nome do autor
          materia={post.materia || ''}
        />
      )) : <p>Nenhum post encontrado</p>}
    </div>
  );
}