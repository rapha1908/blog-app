export interface Post {
  _id: string;
  titulo: string;
  conteudo: string;
  autor: {
    _id: string;
    nome: string;
    email: string;
    tipo: 'Professor' | 'Administrador' | 'Aluno' ;
  };
  materia: string;
  // ... outros campos
}