import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { BarraProgresso } from '@/components/barra-progresso';
import { CabecalhoSaudacao } from '@/components/cabecalho-saudacao';
import { CartaoNumero } from '@/components/cartao-numero';
import { CartaoVersiculo } from '@/components/cartao-versiculo';
import { ItemAgenda } from '@/components/item-agenda';
import { Cartao, Secao, Texto } from '@/components/ui';
import { agendaHoje, distritoDemo, progresso, resumoMes } from '@/dados/ficticios';
import { carregarAtalhos } from '@/lib/atalhos';
import { useAuth } from '@/lib/auth';
import { marca } from '@/lib/marca';
import { supabase } from '@/lib/supabase';
import type { Atalho } from '@/lib/tipos';
import { cores, espaco } from '@/theme';

// Dashboard. Visitas, estudos, decisões, agenda e metas ainda usam dados fictícios (src/dados/ficticios.ts)
export default function Inicio() {
  const { perfil, modoDemo } = useAuth();
  const [atalhos, setAtalhos] = useState<Atalho[]>([]);
  const [nomeDistrito, setNomeDistrito] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      carregarAtalhos().then(setAtalhos);
      if (modoDemo) return setNomeDistrito(distritoDemo);
      if (!perfil?.distrito_id) return;
      supabase
        .from('distritos')
        .select('nome')
        .eq('id', perfil.distrito_id)
        .single()
        .then(({ data }) => setNomeDistrito(data?.nome ?? null));
    }, [modoDemo, perfil?.distrito_id]),
  );

  if (!perfil) return null;

  const admin = perfil.papel === 'admin';
  const aguardando = !perfil.associacao_id || (!admin && !perfil.distrito_id);
  const nome = perfil.nome ? `${admin ? '' : 'Pr. '}${perfil.nome}` : 'pastor';

  return (
    <ScrollView style={{ backgroundColor: cores.fundo }} contentContainerStyle={{ paddingBottom: espaco.xl }}>
      <CabecalhoSaudacao
        nome={nome}
        nomeAvatar={perfil.nome}
        subtitulo={admin ? 'Administração da Associação' : (nomeDistrito ?? 'Pastor distrital')}
        notificacoes={modoDemo ? 2 : 0}
      />

      <View style={estilos.corpo}>
        <CartaoVersiculo texto={marca.versiculo.texto} referencia={marca.versiculo.referencia} />

        {aguardando ? (
          <Cartao>
            <Texto>Seu cadastro está aguardando a Associação definir o seu distrito.</Texto>
          </Cartao>
        ) : (
          <>
            <View style={estilos.numeros}>
              <CartaoNumero icone="calendar" cor={cores.verde} valor={resumoMes.visitas} rotulo="Visitas" detalhe="este mês" />
              <CartaoNumero icone="book" cor={cores.azul} valor={resumoMes.estudos} rotulo="Estudos" detalhe="bíblicos" />
              <CartaoNumero icone="heart" cor={cores.laranja} valor={resumoMes.decisoes} rotulo="Decisões" detalhe="este mês" />
            </View>

            <Secao
              acao={
                <Text style={estilos.link} onPress={() => router.push('/agenda')}>
                  Ver agenda ›
                </Text>
              }
            >
              Hoje
            </Secao>
            <Cartao>
              {agendaHoje.map((c, i) => (
                <ItemAgenda key={c.hora} {...c} ultimo={i === agendaHoje.length - 1} />
              ))}
            </Cartao>

            <Secao>Meu progresso</Secao>
            <Cartao>
              {progresso.map((m, i) => (
                <BarraProgresso key={m.titulo} icone={i === 0 ? 'people' : 'book'} {...m} />
              ))}
            </Cartao>

            <Secao>Sistemas da Igreja</Secao>
            {atalhos.map((a) => (
              <Cartao key={a.codigo} onPress={a.url ? () => WebBrowser.openBrowserAsync(a.url!) : undefined}>
                <View style={estilos.linha}>
                  <View style={estilos.atalhoIcone}>
                    <Text style={estilos.atalhoSigla}>{a.nome.slice(0, 2).toUpperCase()}</Text>
                  </View>
                  <View style={{ flex: 1, gap: 2 }}>
                    <Texto>{a.nome}</Texto>
                    <Texto suave>{a.url ? a.descricao : 'Link ainda não configurado pela Associação'}</Texto>
                  </View>
                  {a.url && <Ionicons name="open-outline" size={18} color={cores.suave} />}
                </View>
              </Cartao>
            ))}
          </>
        )}
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  corpo: { padding: espaco.lg, gap: espaco.md, marginTop: -44 },
  numeros: { flexDirection: 'row', gap: 10 },
  link: { color: cores.azul, fontSize: 14, fontWeight: '600' },
  linha: { flexDirection: 'row', alignItems: 'center', gap: espaco.md },
  atalhoIcone: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: cores.marinho,
    alignItems: 'center',
    justifyContent: 'center',
  },
  atalhoSigla: { color: cores.dourado, fontWeight: '700' },
});
