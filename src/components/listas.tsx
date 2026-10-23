import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { View } from 'react-native';

import { Botao, Campo, Cartao, Erro, Texto, cores } from '@/components/ui';
import { igrejasDemo } from '@/dados/ficticios';
import { useAuth } from '@/lib/auth';
import { modoDemo, supabase } from '@/lib/supabase';
import type { Distrito, Igreja } from '@/lib/tipos';

function Linha({ titulo, detalhe, icone }: { titulo: string; detalhe?: string; icone: keyof typeof Ionicons.glyphMap }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <Ionicons name={icone} size={22} color={cores.dourado} />
      <View style={{ flex: 1, gap: 2 }}>
        <Texto>{titulo}</Texto>
        {detalhe ? <Texto suave>{detalhe}</Texto> : null}
      </View>
      <Ionicons name="chevron-forward" size={18} color={cores.suave} />
    </View>
  );
}

export function ListaIgrejas({ distritoId }: { distritoId: string }) {
  const [igrejas, setIgrejas] = useState<Igreja[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (modoDemo) return setIgrejas(igrejasDemo);
      supabase
        .from('igrejas')
        .select('id, distrito_id, nome, tipo, endereco, cidade, anciao, telefone')
        .eq('distrito_id', distritoId)
        .order('nome')
        .then(({ data }) => setIgrejas(data ?? []));
    }, [distritoId]),
  );

  return (
    <>
      {igrejas.map((i) => (
        <Cartao key={i.id} onPress={() => router.push({ pathname: '/igreja/[id]', params: { id: i.id } })}>
          <Linha
            icone={i.tipo === 'grupo' ? 'people-outline' : 'business-outline'}
            titulo={i.nome}
            detalhe={[i.tipo === 'grupo' ? 'Grupo' : 'Igreja', i.cidade, i.anciao && `Ancião: ${i.anciao}`]
              .filter(Boolean)
              .join(' · ')}
          />
        </Cartao>
      ))}
      {igrejas.length === 0 && <Texto suave>Nenhuma igreja cadastrada neste distrito.</Texto>}
      <Botao
        titulo="Adicionar igreja"
        onPress={() => router.push({ pathname: '/igreja/[id]', params: { id: 'nova', distrito: distritoId } })}
      />
    </>
  );
}

export function ListaDistritos() {
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
    <>
      {distritos.map((d) => (
        <Cartao
          key={d.id}
          onPress={() => router.push({ pathname: '/distrito/[id]', params: { id: d.id, nome: d.nome } })}
        >
          <Linha icone="map-outline" titulo={d.nome} />
        </Cartao>
      ))}
      {distritos.length === 0 && <Texto suave>Nenhum distrito cadastrado ainda.</Texto>}
      <Campo rotulo="Novo distrito" value={novo} onChangeText={setNovo} />
      {erro && <Erro>{erro}</Erro>}
      <Botao titulo="Adicionar distrito" onPress={adicionar} />
    </>
  );
}
