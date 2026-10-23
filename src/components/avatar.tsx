import { StyleSheet, Text, View } from 'react-native';

import { cores } from '@/theme';

// Círculo dourado com a inicial do nome; troca por foto quando o perfil tiver uma
export function Avatar({ nome, tamanho = 48 }: { nome: string; tamanho?: number }) {
  const inicial = (nome || '?').trim().charAt(0).toUpperCase();
  return (
    <View style={[estilos.circulo, { width: tamanho, height: tamanho, borderRadius: tamanho / 2 }]}>
      <Text style={[estilos.inicial, { fontSize: tamanho * 0.42 }]}>{inicial}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  circulo: {
    backgroundColor: cores.dourado,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  inicial: { color: cores.marinho, fontWeight: '700' },
});
