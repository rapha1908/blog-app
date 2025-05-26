import Link from "next/link";
import { useState } from "react";

import { useRouter } from "next/router";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register(){
  const router = useRouter();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [tipo, setTipo] = useState("");

const handleLogin = async (e: any) => {
  e.preventDefault();

  const response = await fetch('http://localhost:5000/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nome, email, senha, tipo }),
  });

  if (response.ok) {
    router.push('/');
  } else {
    toast.error('Erro ao registrar o usuário', {
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
  }
};


  return(
       <main className="flex flex-col items-center justify-center h-screen w-screen flex-1 gap-7">
         <h2>Registrar</h2>
            <input 
             className="w-[40%] h-13 border border-[#5865F2] p-4 rounded-4xl" 
             type="text" 
             placeholder="Nome"
             onChange={(e) => setNome(e.target.value)}
             />
           <input 
             className="w-[40%] h-13 border border-[#5865F2] p-4 rounded-4xl" 
             type="text" 
             placeholder="email"
             onChange={(e) => setEmail(e.target.value)}
             />
           <input 
             className="w-[40%] h-13 border border-[#5865F2] p-4 rounded-4xl" 
             type="password" 
             placeholder="senha"
             onChange={(e) => setSenha(e.target.value)}
             />
             <input 
             className="w-[40%] h-13 border border-[#5865F2] p-4 rounded-4xl" 
             type="text" 
             placeholder="Administrador | Professor | Aluno"
             onChange={(e) => setTipo(e.target.value)}
             />
           <div className="flex items-center justify-between mt-2 w-[40%] max-h-12 gap-3">
             <Link 
               className="border border-[#5865F2] p-2 rounded-4xl w-50 text-center" 
               href={"/"}>
                 Voltar
             </Link>
             <button 
               className="bg-[#5865F2] p-2 rounded-4xl w-50 disabled:opacity-40" 
               type="submit"
               disabled={!nome || !senha || !email || !tipo}
               onClick={handleLogin}
               >
                 Registrar
             </button>
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
              theme="colored"
              transition={Bounce}
            />

           
    
       </main>
  )
}