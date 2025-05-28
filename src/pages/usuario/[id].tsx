import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

interface Usuario {
  _id: string;
  nome: string;
  email: string;
  tipo: string;
}

export default function EditUsuario() {
  const router = useRouter();
  const { id } = router.query;
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [tipo, setTipo] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchUsuario();
    // eslint-disable-next-line
  }, [id]);

  const fetchUsuario = async () => {
    try {
      const token = Cookies.get("token");
      const res = await fetch(`http://localhost:5000/users/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUsuario(data);
        setNome(data.nome);
        setEmail(data.email);
        setTipo(data.tipo);
      } else {
        toast.error("Erro ao carregar usuário", { position: "bottom-center" });
      }
    } catch {
      toast.error("Erro de conexão", { position: "bottom-center" });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUsuario = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = Cookies.get("token");
    try {
      const res = await fetch(`http://localhost:5000/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ nome, email, tipo }),
      });
      if (res.ok) {
        toast.success("Usuário atualizado com sucesso!", { position: "bottom-center", autoClose: 3000 });
        setTimeout(() => router.push("/administradores"), 3000);
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Erro ao atualizar usuário", { position: "bottom-center" });
      }
    } catch {
      toast.error("Erro de conexão", { position: "bottom-center" });
    }
  };

  if (loading) return <div className="text-white p-8">Carregando...</div>;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full p-4 sm:p-8 bg-gray-900 text-white">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Editar Usuário</h2>
        <form onSubmit={handleUpdateUsuario} className="flex flex-col gap-4">
          <input
            className="w-full border border-[#5865F2] p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400"
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            className="w-full border border-[#5865F2] p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <select
            className="w-full border border-[#5865F2] p-3 rounded-lg bg-gray-800 text-white"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          >
            <option value="">Selecione o tipo</option>
            <option value="Aluno">Aluno</option>
            <option value="Professor">Professor</option>
            <option value="Administrador">Administrador</option>
          </select>
          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 w-full gap-4">
            <Link
              className="w-full sm:w-auto flex-1 border border-[#5865F2] p-3 rounded-lg text-center hover:bg-[#5865F2] transition-colors"
              href="/administradores"
            >
              Voltar
            </Link>
            <button
              className="w-full sm:w-auto flex-1 bg-[#5865F2] p-3 rounded-lg disabled:opacity-40 hover:bg-[#4752C4] transition-colors"
              type="submit"
              disabled={!nome || !email || !tipo}
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
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