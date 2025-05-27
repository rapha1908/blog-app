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
      document.cookie = `token=${data.token}; path=/; max-age=3600`; // Set token in cookie
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
      document.cookie = `email=${JSON.stringify(email)}; path=/; max-age=3600`;
            
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen w-screen flex-1 gap-7">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col items-center justify-center gap-4 w-[80vw]">
        <input 
          className="w-[40%] h-13 border border-[#5865F2] p-4 rounded-4xl" 
          type="text" 
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          className="w-[40%] h-13 border border-[#5865F2] p-4 rounded-4xl" 
          type="password" 
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <div className="flex items-center justify-between mt-2 w-[40%] max-h-12 gap-3">
          <Link 
            className="border border-[#5865F2] p-2 rounded-4xl w-50 text-center" 
            href="/">
            Voltar
          </Link>
          <button 
            className="bg-[#5865F2] p-2 rounded-4xl w-50 disabled:opacity-40" 
            type="submit"
            disabled={!email || !senha}
          >
            Login
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
        theme="colored"
        transition={Bounce}
      />
    </main>
  );
}