import { cookies } from 'next/headers';
import CardList from './CardList';

async function getPosts() {
  const cookieStore = cookies();
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

export default async function PostsProvider() {
  const posts = await getPosts();
  return <CardList posts={posts} />;
}