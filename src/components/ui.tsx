import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';

export const cores = {
  primaria: '#1F4E79',
  fundo: '#F5F7FA',
  cartao: '#FFFFFF',
  texto: '#1A1A1A',
  suave: '#5F6B7A',
  borda: '#D9DEE5',
  erro: '#B3261E',
};

export function Tela({ children }: { children: ReactNode }) {
  return <ScrollView contentContainerStyle={estilos.tela}>{children}</ScrollView>;
}

export function Titulo({ children }: { children: ReactNode }) {
  return <Text style={estilos.titulo}>{children}</Text>;
}

export function Texto({ children, suave }: { children: ReactNode; suave?: boolean }) {
  return <Text style={[estilos.texto, suave && { color: cores.suave }]}>{children}</Text>;
}

export function Erro({ children }: { children: ReactNode }) {
  return <Text style={[estilos.texto, { color: cores.erro }]}>{children}</Text>;
}

export function Cartao({ children, onPress }: { children: ReactNode; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} disabled={!onPress} style={estilos.cartao}>
      {children}
    </Pressable>
  );
}

export function Botao({
  titulo,
  onPress,
  ocupado,
  secundario,
}: {
  titulo: string;
  onPress: () => void;
  ocupado?: boolean;
  secundario?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={ocupado}
      style={[estilos.botao, secundario && estilos.botaoSecundario]}
    >
      {ocupado ? (
        <ActivityIndicator color={secundario ? cores.primaria : '#fff'} />
      ) : (
        <Text style={[estilos.botaoTexto, secundario && { color: cores.primaria }]}>{titulo}</Text>
      )}
    </Pressable>
  );
}

export function Campo({ rotulo, ...props }: TextInputProps & { rotulo: string }) {
  return (
    <View style={{ gap: 4 }}>
      <Text style={estilos.rotulo}>{rotulo}</Text>
      <TextInput placeholderTextColor={cores.suave} style={estilos.campo} {...props} />
    </View>
  );
}

export function Carregando() {
  return (
    <View style={estilos.centro}>
      <ActivityIndicator color={cores.primaria} size="large" />
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { padding: 16, gap: 12, backgroundColor: cores.fundo, flexGrow: 1 },
  titulo: { fontSize: 22, fontWeight: '700', color: cores.texto },
  texto: { fontSize: 15, color: cores.texto },
  cartao: {
    backgroundColor: cores.cartao,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 16,
    gap: 4,
  },
  botao: {
    backgroundColor: cores.primaria,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  botaoSecundario: { backgroundColor: 'transparent', borderWidth: 1, borderColor: cores.primaria },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: '600' },
  rotulo: { fontSize: 13, color: cores.suave },
  campo: {
    backgroundColor: cores.cartao,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: cores.texto,
  },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: cores.fundo },
});
