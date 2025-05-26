import Link from "next/link";
import React from "react";
import { useState } from "react";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <main className="flex flex-col items-center justify-center h-screen w-screen flex-1 gap-7">
      <h2>Login</h2>
      <form className="flex flex-col items-center justify-center gap-4 w-[80vw] ">
        <input 
          className="w-[40%] h-13 border border-[#5865F2] p-4 rounded-4xl" 
          type="text" 
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          />
        <input 
          className="w-[40%] h-13 border border-[#5865F2] p-4 rounded-4xl" 
          type="password" 
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
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
            disabled={!username || !password}
            >
              Login
          </button>
        </div>
        
      </form>  
    </main>
    
  );
}