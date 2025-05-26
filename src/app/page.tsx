import CardList from "@/components/CardList";
import Header from "@/components/Header";
import { Post } from "@/types";

export default function Home() {

  const posts: Post[] = [
    {
      title: 'Palestra de Next.js',
      author: 'Autor X',
      description: 'Lorem ipsum dolor sit amet...'
    },
    {
      title: 'Testando Node.js com Vitest – Hands-On',
      author: 'Autor Y',
      description: 'Lorem ipsum dolor sit amet...'
    },
    {
      title: 'Testando Node.js com Vitest – Hands-On',
      author: 'Autor Y',
      description: 'Lorem ipsum dolor sit amet...'
    },   {
      title: 'Testando Node.js com Vitest – Hands-On',
      author: 'Autor Y',
      description: 'Lorem ipsum dolor sit amet...'
    },
    // ...
  ];

  return (
    <main className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header/>
      <CardList items={posts} />
    </main>
  );
}
