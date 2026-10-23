import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { cores, espaco } from '@/theme';

// Meta com ícone, "feito de meta", percentual e barra preenchida
export function BarraProgresso({
  icone,
  titulo,
  feito,
  meta,
  cor,
}: {
  icone: keyof typeof Ionicons.glyphMap;
  titulo: string;
  feito: number;
  meta: number;
  cor: string;
}) {
  const pct = meta > 0 ? Math.min(100, Math.round((feito / meta) * 100)) : 0;
  return (
    <View style={estilos.linha}>
      <View style={[estilos.icone, { backgroundColor: cor + '1F' }]}>
        <Ionicons name={icone} size={18} color={cor} />
      </View>
      <View style={{ flex: 1, gap: 6 }}>
        <View style={estilos.topo}>
          <View>
            <Text style={estilos.titulo}>{titulo}</Text>
            <Text style={estilos.detalhe}>
              {feito} de {meta}
            </Text>
          </View>
          <Text style={estilos.pct}>{pct}%</Text>
        </View>
        <View style={estilos.trilho}>
          <View style={[estilos.preenchido, { width: `${pct}%`, backgroundColor: cor }]} />
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  linha: { flexDirection: 'row', alignItems: 'center', gap: espaco.md, paddingVertical: espaco.sm },
  icone: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  topo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  titulo: { fontSize: 14, fontWeight: '600', color: cores.texto },
  detalhe: { fontSize: 12, color: cores.suave },
  pct: { fontSize: 13, color: cores.suave, fontWeight: '600' },
  trilho: { height: 6, borderRadius: 3, backgroundColor: cores.borda, overflow: 'hidden' },
  preenchido: { height: '100%', borderRadius: 3 },
});
