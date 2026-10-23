import { StyleSheet, Text, View } from 'react-native';

import { Paisagem } from '@/components/paisagem';
import { cores, raio, sombra } from '@/theme';

export function CartaoVersiculo({ texto, referencia }: { texto: string; referencia: string }) {
  return (
    <View style={estilos.cartao}>
      <Paisagem />
      <View style={estilos.conteudo}>
        <Text style={estilos.texto}>“{texto}”</Text>
        <Text style={estilos.referencia}>{referencia}</Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: { height: 132, borderRadius: raio.lg, overflow: 'hidden', ...sombra },
  conteudo: { flex: 1, alignItems: 'center', paddingTop: 22, gap: 4 },
  texto: {
    color: '#fff',
    fontSize: 17,
    fontStyle: 'italic',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowRadius: 6,
  },
  referencia: { color: cores.douradoClaro, fontSize: 13 },
});
