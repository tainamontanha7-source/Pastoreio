// Dados fictícios para visualizar e testar a interface enquanto as funções reais não existem
import type { Igreja, Perfil } from '@/lib/tipos';

export const perfilDemo: Perfil = {
  id: 'demo',
  nome: 'Marcos',
  papel: 'pastor',
  associacao_id: 'demo-associacao',
  distrito_id: 'demo-distrito',
};

export const distritoDemo = 'Distrito Central';

export const resumoMes = { visitas: 12, estudos: 5, decisoes: 3 };

export type Compromisso = { hora: string; titulo: string; local: string; cor: string };

export const agendaHoje: Compromisso[] = [
  { hora: '08:00', titulo: 'Reunião de liderança', local: 'Igreja Central', cor: '#D6AE74' },
  { hora: '10:00', titulo: 'Visita pastoral', local: 'Família Santos', cor: '#E7843A' },
  { hora: '15:00', titulo: 'Estudo bíblico', local: 'João 3', cor: '#2F7BD8' },
  { hora: '19:00', titulo: 'Culto de oração', local: 'Igreja Central', cor: '#2E9D6A' },
];

export type Meta = { titulo: string; feito: number; meta: number; cor: string };

export const progresso: Meta[] = [
  { titulo: 'Visitas pastorais', feito: 12, meta: 20, cor: '#2E9D6A' },
  { titulo: 'Estudos bíblicos', feito: 5, meta: 8, cor: '#2F7BD8' },
];

export const igrejasDemo: Igreja[] = [
  { id: 'i1', distrito_id: 'demo-distrito', nome: 'Igreja Central', tipo: 'igreja', endereco: 'Rua das Flores, 120', cidade: 'Campinas', anciao: 'João Silva', telefone: '(19) 99999-0001' },
  { id: 'i2', distrito_id: 'demo-distrito', nome: 'Igreja Jardim Esperança', tipo: 'igreja', endereco: null, cidade: 'Campinas', anciao: 'Paulo Lima', telefone: null },
  { id: 'i3', distrito_id: 'demo-distrito', nome: 'Grupo Vila Nova', tipo: 'grupo', endereco: null, cidade: 'Sumaré', anciao: 'Ana Costa', telefone: null },
];
