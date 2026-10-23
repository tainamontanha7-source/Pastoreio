import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { cores, espaco } from '@/theme';

// Linha de compromisso: hora, barra colorida do tipo, título e local
export function ItemAgenda({
  hora,
  titulo,
  local,
  cor,
  ultimo,
  onPress,
}: {
  hora: string;
  titulo: string;
  local: string;
  cor: string;
  ultimo?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[estilos.linha, !ultimo && estilos.divisor]}>
      <Text style={estilos.hora}>{hora}</Text>
      <View style={[estilos.barra, { backgroundColor: cor }]} />
      <View style={{ flex: 1 }}>
        <Text style={estilos.titulo}>{titulo}</Text>
        <Text style={estilos.local}>{local}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={cores.suave} />
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  linha: { flexDirection: 'row', alignItems: 'center', gap: espaco.md, paddingVertical: espaco.md },
  divisor: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: cores.borda },
  hora: { width: 44, fontSize: 14, fontWeight: '600', color: cores.texto },
  barra: { width: 3, alignSelf: 'stretch', borderRadius: 2 },
  titulo: { fontSize: 15, fontWeight: '600', color: cores.texto },
  local: { fontSize: 13, color: cores.suave },
});
