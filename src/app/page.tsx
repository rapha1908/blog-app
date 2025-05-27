import CardList from "@/components/CardList";
import Header from "@/components/Header";
import { Post } from "@/types";
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

export default async function Home() {
  const posts: Post[] = await getPosts();

  return (
    <main className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header/>
      <CardList items={posts} />
    </main>
  );
}