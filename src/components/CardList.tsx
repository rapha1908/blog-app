"use client";
import React, { useEffect, useState } from 'react';
import { Post } from '@/types';
import Card from './Card';

interface CardListProps {
  search: string;
}

const CardList: React.FC<CardListProps> = ({ search }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    async function fetchPosts() {
      try {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('token='))
          ?.split('=')[1];

        const response = await fetch('http://localhost:5000/posts', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      }
    }
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    (post.titulo?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
    (post.autor?.nome?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
    (post.materia?.toLowerCase().includes(search.toLowerCase()) ?? false)
  );
  const handleDeletePost = (deletedPostId: string) => {
  setPosts(prevPosts => prevPosts.filter(post => post._id !== deletedPostId));
};

  return (
    <div>
      {filteredPosts.map(post => (
        <Card key={post._id} post={post} onDeletePost={handleDeletePost} />
      ))}
    </div>
  );
};

export default CardList;