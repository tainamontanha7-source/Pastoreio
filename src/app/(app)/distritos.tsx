import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

import { Botao, Campo, Cartao, Erro, Tela, Texto } from '@/components/ui';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import type { Distrito } from '@/lib/tipos';

export default function Distritos() {
  const { perfil } = useAuth();
  const [distritos, setDistritos] = useState<Distrito[]>([]);
  const [novo, setNovo] = useState('');
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    const { data } = await supabase.from('distritos').select('id, associacao_id, nome').order('nome');
    setDistritos(data ?? []);
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar]),
  );

  async function adicionar() {
    if (!novo.trim() || !perfil?.associacao_id) return;
    const { error } = await supabase
      .from('distritos')
      .insert({ nome: novo.trim(), associacao_id: perfil.associacao_id });
    if (error) return setErro(error.message);
    setNovo('');
    setErro(null);
    carregar();
  }

  return (
    <Tela>
      {distritos.map((d) => (
        <Cartao
          key={d.id}
          onPress={() => router.push({ pathname: '/igrejas', params: { distrito: d.id, nome: d.nome } })}
        >
          <Texto>{d.nome}</Texto>
        </Cartao>
      ))}
      {distritos.length === 0 && <Texto suave>Nenhum distrito cadastrado ainda.</Texto>}
      <Campo rotulo="Novo distrito" value={novo} onChangeText={setNovo} />
      {erro && <Erro>{erro}</Erro>}
      <Botao titulo="Adicionar distrito" onPress={adicionar} />
    </Tela>
  );
}
