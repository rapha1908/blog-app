import React from 'react';
import { Post } from '@/types';
import Card from './Card';
import { cookies } from 'next/headers';

async function getPosts() {
  const cookieStore = await cookies();
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

  return (
    <div className="w-full max-w-4xl">
      {Array.isArray(posts) ? posts.map((post, index) => (
        <Card 
          key={index}
          {...post}
        />
      )) : <p>Nenhum post encontrado</p>}
    </div>
  );
}