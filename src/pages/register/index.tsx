import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, senha, tipo }),
      });

      if (response.ok) {
        toast.success('Usuário registrado com sucesso!', {
          position: 'bottom-center',
          autoClose: 3000,
        });
        setTimeout(() => router.push('/'), 3000);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Erro ao registrar o usuário', {
          position: 'bottom-center',
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.error('Erro de conexão', {
        position: 'bottom-center',
        autoClose: 5000,
      });
      throw new Error(`Erro ao registrar o usuário: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full p-4 bg-gray-900 text-white">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Registrar</h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input 
            className="w-full h-13 border border-[#5865F2] p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400" 
            type="text" 
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input 
            className="w-full h-13 border border-[#5865F2] p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400" 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            className="w-full h-13 border border-[#5865F2] p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400" 
            type="password" 
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <select 
            className="w-full h-13 border border-[#5865F2] p-3 rounded-lg bg-gray-800 text-white" 
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          >
            <option value="">Selecione o tipo de usuário</option>
            <option value="Administrador">Administrador</option>
            <option value="Professor">Professor</option>
            <option value="Aluno">Aluno</option>
          </select>
          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
            <Link 
              className="w-full sm:w-auto flex-1 border border-[#5865F2] p-3 rounded-lg text-center hover:bg-[#5865F2] transition-colors" 
              href="/">
              Voltar
            </Link>
            <button 
              className="w-full sm:w-auto flex-1 bg-[#5865F2] p-3 rounded-lg disabled:opacity-40 hover:bg-[#4752C4] transition-colors" 
              type="submit"
              disabled={!nome || !senha || !email || !tipo}
            >
              Registrar
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