import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '@/components/avatar';
import { cores, espaco } from '@/theme';

// Topo azul-marinho do Dashboard: avatar, saudação, subtítulo e sino de notificações
export function CabecalhoSaudacao({
  nome,
  nomeAvatar,
  subtitulo,
  notificacoes = 0,
  onNotificacoes,
}: {
  nome: string;
  nomeAvatar?: string;
  subtitulo: string;
  notificacoes?: number;
  onNotificacoes?: () => void;
}) {
  const topo = useSafeAreaInsets().top;
  return (
    <View style={[estilos.cabecalho, { paddingTop: topo + espaco.lg }]}>
      <Avatar nome={nomeAvatar ?? nome} />
      <View style={{ flex: 1 }}>
        <Text style={estilos.ola}>Olá, {nome}</Text>
        <Text style={estilos.subtitulo}>{subtitulo}</Text>
      </View>
      <Pressable onPress={onNotificacoes} hitSlop={12}>
        <Ionicons name="notifications-outline" size={24} color="#fff" />
        {notificacoes > 0 && <View style={estilos.ponto} />}
      </Pressable>
    </View>
  );
}

const estilos = StyleSheet.create({
  cabecalho: {
    backgroundColor: cores.marinho,
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaco.md,
    paddingHorizontal: espaco.lg,
    paddingBottom: 56,
  },
  ola: { color: '#fff', fontSize: 19, fontWeight: '700' },
  subtitulo: { color: cores.textoSobreEscuro, fontSize: 13 },
  ponto: {
    position: 'absolute',
    top: 1,
    right: 2,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: cores.laranja,
    borderWidth: 1.5,
    borderColor: cores.marinho,
  },
});
