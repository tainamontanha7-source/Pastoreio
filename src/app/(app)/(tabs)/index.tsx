import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Cartao, Secao, Texto, cores } from '@/components/ui';
import { carregarAtalhos } from '@/lib/atalhos';
import { useAuth } from '@/lib/auth';
import { marca } from '@/lib/marca';
import { supabase } from '@/lib/supabase';
import type { Atalho } from '@/lib/tipos';

type Resumo = { igrejas: number; grupos: number; distritos: number; nomeDistrito: string | null };

export default function Inicio() {
  const { perfil } = useAuth();
  const topo = useSafeAreaInsets().top;
  const [atalhos, setAtalhos] = useState<Atalho[]>([]);
  const [resumo, setResumo] = useState<Resumo | null>(null);

  useFocusEffect(
    useCallback(() => {
      carregarAtalhos().then(setAtalhos);
      // O RLS já limita as contagens ao que o usuário pode ver
      Promise.all([
        supabase.from('igrejas').select('id', { count: 'exact', head: true }).eq('tipo', 'igreja'),
        supabase.from('igrejas').select('id', { count: 'exact', head: true }).eq('tipo', 'grupo'),
        supabase.from('distritos').select('id, nome'),
      ]).then(([i, g, d]) => {
        const distritos = d.data ?? [];
        setResumo({
          igrejas: i.count ?? 0,
          grupos: g.count ?? 0,
          distritos: distritos.length,
          nomeDistrito: distritos.find((x) => x.id === perfil?.distrito_id)?.nome ?? null,
        });
      });
    }, [perfil?.distrito_id]),
  );

  if (!perfil) return null;

  const admin = perfil.papel === 'admin';
  const aguardando = !perfil.associacao_id || (!admin && !perfil.distrito_id);
  const inicial = (perfil.nome || '?').trim().charAt(0).toUpperCase();

  return (
    <ScrollView style={{ backgroundColor: cores.fundo }} contentContainerStyle={{ paddingBottom: 24 }}>
      <View style={[estilos.cabecalho, { paddingTop: topo + 16 }]}>
        <View style={estilos.avatar}>
          <Text style={estilos.avatarTexto}>{inicial}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={estilos.ola}>Olá{perfil.nome ? `, ${admin ? '' : 'Pr. '}${perfil.nome}` : ''}</Text>
          <Text style={estilos.subtitulo}>
            {admin ? 'Administração da Associação' : (resumo?.nomeDistrito ?? 'Pastor distrital')}
          </Text>
        </View>
      </View>

      <View style={estilos.corpo}>
        <LinearGradient colors={[cores.marinhoClaro, '#3A5F8F', cores.douradoEscuro]} style={estilos.versiculo}>
          <Text style={estilos.versiculoTexto}>“{marca.versiculo.texto}”</Text>
          <Text style={estilos.versiculoRef}>{marca.versiculo.referencia}</Text>
        </LinearGradient>

        {aguardando ? (
          <Cartao>
            <Texto>Seu cadastro está aguardando a Associação definir o seu distrito.</Texto>
          </Cartao>
        ) : (
          <>
            <View style={estilos.numeros}>
              <Numero icone="business" cor={cores.verde} valor={resumo?.igrejas} rotulo="Igrejas" />
              <Numero icone="people" cor={cores.azul} valor={resumo?.grupos} rotulo="Grupos" />
              {admin && <Numero icone="map" cor={cores.laranja} valor={resumo?.distritos} rotulo="Distritos" />}
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
              <Texto suave>A agenda pastoral chega na próxima etapa do app.</Texto>
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

function Numero({
  icone,
  cor,
  valor,
  rotulo,
}: {
  icone: keyof typeof Ionicons.glyphMap;
  cor: string;
  valor: number | undefined;
  rotulo: string;
}) {
  return (
    <View style={estilos.numero}>
      <View style={[estilos.numeroIcone, { backgroundColor: cor + '22' }]}>
        <Ionicons name={icone} size={18} color={cor} />
      </View>
      <Text style={estilos.numeroValor}>{valor ?? '–'}</Text>
      <Text style={estilos.numeroRotulo}>{rotulo}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  cabecalho: {
    backgroundColor: cores.marinho,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 48,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: cores.dourado,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTexto: { color: cores.marinho, fontSize: 20, fontWeight: '700' },
  ola: { color: '#fff', fontSize: 19, fontWeight: '700' },
  subtitulo: { color: '#C9D3E0', fontSize: 13 },
  corpo: { padding: 16, gap: 12, marginTop: -36 },
  versiculo: { borderRadius: 16, padding: 20, alignItems: 'center', gap: 4 },
  versiculoTexto: { color: '#fff', fontSize: 17, fontStyle: 'italic', textAlign: 'center' },
  versiculoRef: { color: '#F1E2C8', fontSize: 13 },
  numeros: { flexDirection: 'row', gap: 10 },
  numero: {
    flex: 1,
    backgroundColor: cores.cartao,
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    gap: 2,
    elevation: 2,
    shadowColor: '#0F2A4A',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  numeroIcone: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  numeroValor: { fontSize: 22, fontWeight: '700', color: cores.texto },
  numeroRotulo: { fontSize: 12, color: cores.suave },
  link: { color: cores.azul, fontSize: 14, fontWeight: '600' },
  linha: { flexDirection: 'row', alignItems: 'center', gap: 12 },
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
