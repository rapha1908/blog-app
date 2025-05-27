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
    }catch (error) {
      toast.error('Erro de conexão', {
        position: 'bottom-center',
        autoClose: 5000,
      });
      throw new Error(`Erro ao registrar o usuário: ${error instanceof Error ? error.message : String(error)}`);
}
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen w-screen flex-1 gap-7 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold">Registrar</h2>
      <form onSubmit={handleRegister} className="flex flex-col items-center justify-center w-[80vw] gap-4">
        <input 
          className="w-[40%] h-13 border border-[#5865F2] p-4 rounded-4xl bg-gray-800 text-white placeholder-gray-400" 
          type="text" 
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input 
          className="w-[40%] h-13 border border-[#5865F2] p-4 rounded-4xl bg-gray-800 text-white placeholder-gray-400" 
          type="email" 
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          className="w-[40%] h-13 border border-[#5865F2] p-4 rounded-4xl bg-gray-800 text-white placeholder-gray-400" 
          type="password" 
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <select 
          className="w-[40%] h-13 border border-[#5865F2] p-4 rounded-4xl bg-gray-800 text-white" 
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
        >
          <option value="">Selecione o tipo de usuário</option>
          <option value="Administrador">Administrador</option>
          <option value="Professor">Professor</option>
          <option value="Aluno">Aluno</option>
        </select>
        <div className="flex items-center justify-between mt-2 w-[40%] max-h-12 gap-3">
          <Link 
            className="border border-[#5865F2] p-2 rounded-4xl w-50 text-center hover:bg-[#5865F2] transition-colors" 
            href="/">
            Voltar
          </Link>
          <button 
            className="bg-[#5865F2] p-2 rounded-4xl w-50 disabled:opacity-40 hover:bg-[#4752C4] transition-colors" 
            type="submit"
            disabled={!nome || !senha || !email || !tipo}
          >
            Registrar
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