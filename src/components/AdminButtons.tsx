"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookie } from '../utils/cookies';
import { useUserType } from '../hooks/useUserType';

interface AdminButtonsProps {
  postId: string;
  onDeleteSuccess: () => void;
}

const AdminButtons: React.FC<AdminButtonsProps> = ({ postId, onDeleteSuccess }) => {
  const [canEditDelete, setCanEditDelete] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const userType = useUserType();

  useEffect(() => {
    setIsClient(true);
    setCanEditDelete(userType === 'Administrador' || userType === 'Professor');
  }, [userType]);

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este post?')) {
      try {
        const token = getCookie('token');
        const response = await fetch(`http://localhost:5000/Posts/${postId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          toast.success('Post excluído com sucesso', {
            position: 'bottom-center',
            autoClose: 3000,
          });
          onDeleteSuccess(); // Chama a função de callback
          router.push('/');
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || 'Erro ao excluir post', {
            position: 'bottom-center',
            autoClose: 5000,
          });
        }
      } catch (error) {
        toast.error('Erro de conexão', {
          position: 'bottom-center',
          autoClose: 5000,
        });
        console.error('Erro ao excluir o post:', error);
      }
    }
  };

  if (!isClient || !canEditDelete) return null;

  return (
    <div className="mt-4 flex justify-end space-x-2">
      <Link 
        href={`/edit/${postId}`}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Editar
      </Link>
      <button 
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Excluir
      </button>
    </div>
  );
};

export default AdminButtons;