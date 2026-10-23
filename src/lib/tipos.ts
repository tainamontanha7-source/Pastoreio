export type Papel = 'pastor' | 'admin';

export type Perfil = {
  id: string;
  nome: string;
  papel: Papel;
  associacao_id: string | null;
  distrito_id: string | null;
};

export type Distrito = {
  id: string;
  associacao_id: string;
  nome: string;
};

export type Igreja = {
  id: string;
  distrito_id: string;
  nome: string;
  tipo: 'igreja' | 'grupo';
  endereco: string | null;
  cidade: string | null;
  anciao: string | null;
  telefone: string | null;
};

export type Atalho = {
  codigo: string;
  nome: string;
  descricao: string;
  url: string | null;
};
