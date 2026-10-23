import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Botao, Campo, Erro, Tela, cores } from '@/components/ui';
import { igrejasDemo } from '@/dados/ficticios';
import { modoDemo, supabase } from '@/lib/supabase';
import type { Igreja } from '@/lib/tipos';

type Formulario = Omit<Igreja, 'id' | 'distrito_id'>;

const VAZIO: Formulario = { nome: '', tipo: 'igreja', endereco: '', cidade: '', anciao: '', telefone: '' };

export default function EditarIgreja() {
  const { id, distrito } = useLocalSearchParams<{ id: string; distrito?: string }>();
  const nova = id === 'nova';
  const [form, setForm] = useState<Formulario>(VAZIO);
  const [erro, setErro] = useState<string | null>(null);
  const [ocupado, setOcupado] = useState(false);

  useEffect(() => {
    if (nova) return;
    if (modoDemo) {
      const igreja = igrejasDemo.find((i) => i.id === id);
      if (igreja) setForm(igreja);
      return;
    }
    supabase
      .from('igrejas')
      .select('nome, tipo, endereco, cidade, anciao, telefone')
      .eq('id', id)
      .single()
      .then(({ data }) => data && setForm(data));
  }, [id, nova]);

  function campo(chave: keyof Formulario) {
    return {
      value: (form[chave] as string | null) ?? '',
      onChangeText: (valor: string) => setForm({ ...form, [chave]: valor }),
    };
  }

  async function salvar() {
    if (!form.nome.trim()) return setErro('Informe o nome da igreja.');
    if (modoDemo) return setErro('Modo demonstração: as alterações não são salvas.');
    setOcupado(true);
    const { error } = nova
      ? await supabase.from('igrejas').insert({ ...form, distrito_id: distrito })
      : await supabase.from('igrejas').update(form).eq('id', id);
    setOcupado(false);
    if (error) return setErro(error.message);
    router.back();
  }

  async function excluir() {
    if (modoDemo) return setErro('Modo demonstração: as alterações não são salvas.');
    setOcupado(true);
    const { error } = await supabase.from('igrejas').delete().eq('id', id);
    setOcupado(false);
    if (error) return setErro(error.message);
    router.back();
  }

  return (
    <Tela>
      <Stack.Screen options={{ title: nova ? 'Nova igreja' : form.nome || 'Igreja' }} />
      <Campo rotulo="Nome" {...campo('nome')} />
      <View style={estilos.tipos}>
        {(['igreja', 'grupo'] as const).map((t) => (
          <Pressable
            key={t}
            onPress={() => setForm({ ...form, tipo: t })}
            style={[estilos.tipo, form.tipo === t && estilos.tipoAtivo]}
          >
            <Text style={{ color: form.tipo === t ? '#fff' : cores.marinho }}>
              {t === 'igreja' ? 'Igreja' : 'Grupo'}
            </Text>
          </Pressable>
        ))}
      </View>
      <Campo rotulo="Endereço" {...campo('endereco')} />
      <Campo rotulo="Cidade" {...campo('cidade')} />
      <Campo rotulo="Primeiro ancião ou dirigente" {...campo('anciao')} />
      <Campo rotulo="Telefone" keyboardType="phone-pad" {...campo('telefone')} />
      {erro && <Erro>{erro}</Erro>}
      <Botao titulo="Salvar" onPress={salvar} ocupado={ocupado} />
      {!nova && <Botao variante="contorno" titulo="Excluir" onPress={excluir} ocupado={ocupado} />}
    </Tela>
  );
}

const estilos = StyleSheet.create({
  tipos: { flexDirection: 'row', gap: 8 },
  tipo: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: cores.marinho,
    borderRadius: 10,
    paddingVertical: 10,
  },
  tipoAtivo: { backgroundColor: cores.marinho },
});
