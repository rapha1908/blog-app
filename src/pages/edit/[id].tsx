import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "../../utils/cookies";
import { Post } from "@/types";

export default function EditPost() {
  const router = useRouter();
  const { id } = router.query;
  const [titulo, setTitulo] = useState("");
  const [materia, setMateria] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [token, setToken] = useState<string | undefined>("");

  useEffect(() => {
    const storedToken = getCookie("token");
    setToken(storedToken);

    // Fetch existing post data
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`http://localhost:5000/Posts/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const post: Post = await response.json();
        setTitulo(post.titulo);
        setMateria(post.materia);
        setConteudo(post.conteudo);
      } else {
        toast.error('Erro ao carregar o post', {
          position: 'bottom-center',
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.error('Erro de conexão', {
        position: 'bottom-center',
        autoClose: 5000,
      });
    }
  };

  const handleUpdatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      toast.error('Você precisa estar logado para editar um post', {
        position: 'bottom-center',
        autoClose: 5000,
      });
      setTimeout(() => router.push('/login'), 3000);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/Posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ titulo, conteudo, materia }),
      });

      if (response.ok) {
        toast.success('Post atualizado com sucesso', {
          position: 'bottom-center',
          autoClose: 3000,
        });
        setTimeout(() => router.push('/'), 3000);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Erro ao atualizar post', {
          position: 'bottom-center',
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.error('Erro de conexão', {
        position: 'bottom-center',
        autoClose: 5000,
      });
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-screen p-8 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-6">Editar Post</h2>
      <form onSubmit={handleUpdatePost} className="flex flex-col items-center justify-center w-full max-w-2xl gap-4">
        <input
          className="w-full h-13 border border-[#5865F2] p-4 rounded-lg bg-gray-800 text-white placeholder-gray-400"
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <input
          className="w-full h-13 border border-[#5865F2] p-4 rounded-lg bg-gray-800 text-white placeholder-gray-400"
          type="text"
          placeholder="Matéria"
          value={materia}
          onChange={(e) => setMateria(e.target.value)}
          required
        />
        <textarea
          className="w-full h-64 border border-[#5865F2] p-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 resize-none"
          placeholder="Conteúdo"
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          required
        />
        <div className="flex items-center justify-between mt-4 w-full gap-4">
          <Link
            className="flex-1 border border-[#5865F2] p-3 rounded-lg text-center hover:bg-[#5865F2] transition-colors"
            href="/">
            Voltar
          </Link>
          <button
            className="flex-1 bg-[#5865F2] p-3 rounded-lg disabled:opacity-40 hover:bg-[#4752C4] transition-colors"
            type="submit"
            disabled={!titulo || !conteudo || !materia}
          >
            Salvar Alterações
          </button>
        </div>
      </form>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </main>
  );
}