import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { cores, raio, sombra } from '@/theme';

// Cartão pequeno com ícone colorido, número em destaque e legenda (Visitas, Estudos, Decisões…)
export function CartaoNumero({
  icone,
  cor,
  valor,
  rotulo,
  detalhe,
}: {
  icone: keyof typeof Ionicons.glyphMap;
  cor: string;
  valor: number | string | undefined;
  rotulo: string;
  detalhe?: string;
}) {
  return (
    <View style={estilos.cartao}>
      <View style={[estilos.icone, { backgroundColor: cor + '1F' }]}>
        <Ionicons name={icone} size={18} color={cor} />
      </View>
      <Text style={estilos.valor}>{valor ?? '–'}</Text>
      <Text style={estilos.rotulo}>{rotulo}</Text>
      {detalhe && <Text style={estilos.detalhe}>{detalhe}</Text>}
    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    flex: 1,
    backgroundColor: cores.cartao,
    borderRadius: raio.md,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    ...sombra,
  },
  icone: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  valor: { fontSize: 22, fontWeight: '700', color: cores.texto },
  rotulo: { fontSize: 12, color: cores.texto, fontWeight: '600' },
  detalhe: { fontSize: 11, color: cores.suave },
});
