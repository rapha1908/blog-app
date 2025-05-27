import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Post } from '@/types';
import Link from 'next/link';

const PostDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    async function fetchPost() {
      if (!id) return;

      try {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('token='))
          ?.split('=')[1];

        const response = await fetch(`http://localhost:5000/posts/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error('Erro ao buscar post:', error);
        setPost(null);
      }
    }

    fetchPost();
  }, [id]);

  if (!post) return <div>Carregando...</div>;

  return (
    <main className="p-4 bg-gray-800 m-7 rounded shadow-lg text-white">
      <h1 className="text-2xl font-bold mb-4">{post.titulo}</h1>
      <p className="mb-2"><strong>Autor:</strong> {post.autor ? post.autor.nome : 'Desconhecido'}</p>
      <p className="mb-4"><strong>Matéria:</strong> {post.materia}</p>
      <div>
        <strong>Conteúdo:</strong>
        <p className="mt-2 whitespace-pre-wrap">{post.conteudo}</p>
      </div>
      <div className='flex items-center justify-between mt-4'>
          <Link 
            className="flex-1 border border-[#5865F2] p-3 rounded-lg text-center hover:bg-[#5865F2] transition-colors" 
            href="/">
            Voltar
          </Link>
      </div>
    </main>
  );
};

export default PostDetailPage;