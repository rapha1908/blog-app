import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error('Erro ao fazer login', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce,
        });
        throw new Error(data.message || 'Erro ao fazer login');
      }
      
      // Armazenar token e tipo de usuário nos cookies
      document.cookie = `token=${data.token}; path=/; max-age=3600`; // Set token in cookie
      document.cookie = `userType=${data.usuario.tipo}; path=/; max-age=3600`; // Set user type in cookie
      
      toast.success('Login realizado com sucesso!', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
      
      // Armazenar email no cookie (se ainda necessário)
      document.cookie = `email=${JSON.stringify(email)}; path=/; max-age=3600`;
      
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full p-4 bg-gray-900 text-white">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input 
            className="w-full h-13 border border-[#5865F2] p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400" 
            type="text" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            className="w-full h-13 border border-[#5865F2] p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400" 
            type="password" 
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
            <Link 
              className="w-full sm:w-auto flex-1 border border-[#5865F2] p-3 rounded-lg text-center hover:bg-[#5865F2] transition-colors" 
              href="/">
              Voltar
            </Link>
            <button 
              className="w-full sm:w-auto flex-1 bg-[#5865F2] p-3 rounded-lg disabled:opacity-40 hover:bg-[#4752C4] transition-colors" 
              type="submit"
              disabled={!email || !senha}
            >
              Login
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