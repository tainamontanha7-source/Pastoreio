import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { cores } from '@/components/ui';

// Tela provisória das funções que entram nas próximas etapas
export function EmBreve({
  icone,
  titulo,
  descricao,
}: {
  icone: keyof typeof Ionicons.glyphMap;
  titulo: string;
  descricao: string;
}) {
  return (
    <View style={estilos.centro}>
      <View style={estilos.circulo}>
        <Ionicons name={icone} size={36} color={cores.dourado} />
      </View>
      <Text style={estilos.titulo}>{titulo}</Text>
      <Text style={estilos.descricao}>{descricao}</Text>
      <Text style={estilos.selo}>EM BREVE</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 10 },
  circulo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: cores.marinho,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: { fontSize: 20, fontWeight: '700', color: cores.texto },
  descricao: { fontSize: 15, color: cores.suave, textAlign: 'center' },
  selo: { color: cores.douradoEscuro, fontWeight: '700', letterSpacing: 1.5, fontSize: 12 },
});
