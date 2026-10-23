import { router, Stack, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';

import { Botao, Cartao, Tela, Texto } from '@/components/ui';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import type { Igreja } from '@/lib/tipos';

export default function Igrejas() {
  const { perfil } = useAuth();
  // O admin chega aqui vindo da lista de distritos; o pastor vê o próprio distrito
  const params = useLocalSearchParams<{ distrito?: string; nome?: string }>();
  const distritoId = params.distrito ?? perfil?.distrito_id;
  const [igrejas, setIgrejas] = useState<Igreja[]>([]);

  const carregar = useCallback(async () => {
    if (!distritoId) return;
    const { data } = await supabase
      .from('igrejas')
      .select('id, distrito_id, nome, tipo, endereco, cidade, anciao, telefone')
      .eq('distrito_id', distritoId)
      .order('nome');
    setIgrejas(data ?? []);
  }, [distritoId]);

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar]),
  );

  if (!distritoId) return null;

  return (
    <Tela>
      {params.nome && <Stack.Screen options={{ title: params.nome }} />}
      {igrejas.map((i) => (
        <Cartao key={i.id} onPress={() => router.push({ pathname: '/igrejas/[id]', params: { id: i.id } })}>
          <Texto>{i.nome}</Texto>
          <Texto suave>
            {[i.tipo === 'grupo' ? 'Grupo' : 'Igreja', i.cidade, i.anciao && `Ancião: ${i.anciao}`]
              .filter(Boolean)
              .join(' · ')}
          </Texto>
        </Cartao>
      ))}
      {igrejas.length === 0 && <Texto suave>Nenhuma igreja cadastrada neste distrito.</Texto>}
      <Botao
        titulo="Adicionar igreja"
        onPress={() =>
          router.push({ pathname: '/igrejas/[id]', params: { id: 'nova', distrito: distritoId } })
        }
      />
    </Tela>
  );
}
