import { modoDemo, supabase } from './supabase';
import type { Atalho } from './tipos';

// Sistemas oficiais que o pastor usa. Os links vêm da tabela `atalhos`, configurada pela Associação.
const SISTEMAS: Omit<Atalho, 'url'>[] = [
  { codigo: 'acms', nome: 'ACMS', descricao: 'Membros e secretaria' },
  { codigo: '7me', nome: '7me', descricao: 'Dízimos e ofertas' },
  { codigo: 'secretaria', nome: 'Secretaria', descricao: 'Sistema da Secretaria' },
];

// Links de exemplo usados no modo demonstração
const LINKS_DEMO: Record<string, string> = { '7me': 'https://apps.apple.com/app/7me/id1344775660' };

export async function carregarAtalhos(): Promise<Atalho[]> {
  if (modoDemo) return SISTEMAS.map((s) => ({ ...s, url: LINKS_DEMO[s.codigo] ?? null }));
  const { data } = await supabase.from('atalhos').select('codigo, url');
  const links = new Map((data ?? []).map((a) => [a.codigo as string, a.url as string]));
  return SISTEMAS.map((s) => ({ ...s, url: links.get(s.codigo) ?? null }));
}
