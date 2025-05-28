"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Usuario {
  _id: string;
  nome: string;
  email: string;
  tipo: string;
}

export default function AdministradoresPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Verifica se é admin
  useEffect(() => {
    const userType = Cookies.get("userType");
    if (userType !== "Administrador") {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    async function fetchUsuarios() {
      const token = Cookies.get("token");
      const res = await fetch("http://localhost:5000/users/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUsuarios(data);
      }
      setLoading(false);
    }
    fetchUsuarios();
  }, []);

  const handleDelete = async (id: string) => {
    const token = Cookies.get("token");
    if (!window.confirm("Tem certeza que deseja excluir este usuário?")) return;
    const res = await fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      setUsuarios((prev) => prev.filter((u) => u._id !== id));
    }
  };

  // Para editar, você pode redirecionar para uma página de edição ou abrir um modal

  if (loading) return <div>Carregando...</div>;

  return (
    <main className="p-4 sm:p-6 max-w-3xl mx-auto">
  <h1 className="text-2xl font-bold mb-6">Professores e Usuários</h1>
  <div className="overflow-x-auto rounded">
    <table className="w-full bg-gray-800 rounded min-w-[600px]">
      <thead>
        <tr className="text-left text-white text-xs sm:text-base">
          <th className="p-2">Nome</th>
          <th className="p-2">Email</th>
          <th className="p-2">Tipo</th>
          <th className="p-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario) => (
          <tr key={usuario._id} className="border-t border-gray-700 text-white text-xs sm:text-base">
            <td className="p-2">{usuario.nome}</td>
            <td className="p-2">{usuario.email}</td>
            <td className="p-2">{usuario.tipo}</td>
            <td className="p-2 flex flex-col sm:flex-row gap-2">
              <button
                className="bg-yellow-500 px-3 py-1 rounded text-black"
                onClick={() => router.push(`/usuario/${usuario._id}`)}
              >
                Editar
              </button>
              <button
                className="bg-red-600 px-3 py-1 rounded text-white"
                onClick={() => handleDelete(usuario._id)}
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div className="flex justify-end mt-6">
    <Link
      className="w-full sm:w-auto border border-[#5865F2] p-3 rounded-lg text-center hover:bg-[#5865F2] transition-colors"
      href="/"
    >
      Voltar
    </Link>
  </div>
</main>
  );
}