import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Cartao, Erro, Tela, Texto, cores } from '@/components/ui';
import { supabase } from '@/lib/supabase';
import type { Distrito, Perfil } from '@/lib/tipos';

// Admin da Associação define o distrito de cada pastor cadastrado com o código de convite
export default function Pastores() {
  const [pastores, setPastores] = useState<Perfil[]>([]);
  const [distritos, setDistritos] = useState<Distrito[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    const [p, d] = await Promise.all([
      supabase
        .from('perfis')
        .select('id, nome, papel, associacao_id, distrito_id')
        .eq('papel', 'pastor')
        .order('nome'),
      supabase.from('distritos').select('id, associacao_id, nome').order('nome'),
    ]);
    setPastores(p.data ?? []);
    setDistritos(d.data ?? []);
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar]),
  );

  async function definirDistrito(pastor: Perfil, distritoId: string) {
    const { error } = await supabase.from('perfis').update({ distrito_id: distritoId }).eq('id', pastor.id);
    if (error) return setErro(error.message);
    setErro(null);
    carregar();
  }

  return (
    <Tela>
      {erro && <Erro>{erro}</Erro>}
      {pastores.length === 0 && <Texto suave>Nenhum pastor cadastrado ainda.</Texto>}
      {pastores.map((p) => (
        <Cartao key={p.id}>
          <Texto>{p.nome || 'Sem nome'}</Texto>
          {!p.distrito_id && <Texto suave>Aguardando distrito</Texto>}
          <View style={estilos.opcoes}>
            {distritos.map((d) => {
              const ativo = d.id === p.distrito_id;
              return (
                <Pressable
                  key={d.id}
                  onPress={() => definirDistrito(p, d.id)}
                  style={[estilos.opcao, ativo && estilos.opcaoAtiva]}
                >
                  <Text style={{ color: ativo ? '#fff' : cores.primaria }}>{d.nome}</Text>
                </Pressable>
              );
            })}
          </View>
        </Cartao>
      ))}
    </Tela>
  );
}

const estilos = StyleSheet.create({
  opcoes: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  opcao: {
    borderWidth: 1,
    borderColor: cores.primaria,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  opcaoAtiva: { backgroundColor: cores.primaria },
});
