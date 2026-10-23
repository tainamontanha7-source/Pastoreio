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

// Identidade visual Pastor One: azul-marinho e dourado
export const cores = {
  marinho: '#0F2A4A',
  marinhoClaro: '#1B3D66',
  dourado: '#D6AE74',
  douradoEscuro: '#B88D4F',
  fundo: '#F4F6FA',
  cartao: '#FFFFFF',
  texto: '#14213D',
  suave: '#6B7687',
  borda: '#E3E7EE',
  erro: '#B3261E',
  verde: '#2E9D6A',
  azul: '#2F7BD8',
  laranja: '#E7843A',
};

export function Tela({ children, escura }: { children: ReactNode; escura?: boolean }) {
  return (
    <ScrollView
      style={{ backgroundColor: escura ? 'transparent' : cores.fundo }}
      contentContainerStyle={estilos.tela}
    >
      {children}
    </ScrollView>
  );
}

export function Titulo({ children }: { children: ReactNode }) {
  return <Text style={estilos.titulo}>{children}</Text>;
}

export function Secao({ children, acao }: { children: ReactNode; acao?: ReactNode }) {
  return (
    <View style={estilos.secao}>
      <Text style={estilos.secaoTexto}>{children}</Text>
      {acao}
    </View>
  );
}

export function Texto({ children, suave }: { children: ReactNode; suave?: boolean }) {
  return <Text style={[estilos.texto, suave && { color: cores.suave, fontSize: 13 }]}>{children}</Text>;
}

export function Erro({ children }: { children: ReactNode }) {
  return <Text style={[estilos.texto, { color: cores.erro }]}>{children}</Text>;
}

export function Cartao({ children, onPress }: { children: ReactNode; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [estilos.cartao, pressed && { opacity: 0.7 }]}
    >
      {children}
    </Pressable>
  );
}

export function Botao({
  titulo,
  onPress,
  ocupado,
  variante = 'primario',
}: {
  titulo: string;
  onPress: () => void;
  ocupado?: boolean;
  variante?: 'primario' | 'dourado' | 'contorno' | 'claro';
}) {
  const fundo = { primario: cores.marinho, dourado: cores.dourado, contorno: 'transparent', claro: 'transparent' }[
    variante
  ];
  const texto = { primario: '#fff', dourado: cores.marinho, contorno: cores.marinho, claro: '#fff' }[variante];
  return (
    <Pressable
      onPress={onPress}
      disabled={ocupado}
      style={({ pressed }) => [
        estilos.botao,
        { backgroundColor: fundo },
        variante === 'contorno' && { borderWidth: 1, borderColor: cores.marinho },
        pressed && { opacity: 0.8 },
      ]}
    >
      {ocupado ? <ActivityIndicator color={texto} /> : <Text style={[estilos.botaoTexto, { color: texto }]}>{titulo}</Text>}
    </Pressable>
  );
}

export function Campo({ rotulo, escuro, ...props }: TextInputProps & { rotulo: string; escuro?: boolean }) {
  return (
    <View style={{ gap: 6 }}>
      <Text style={[estilos.rotulo, escuro && { color: '#C9D3E0' }]}>{rotulo}</Text>
      <TextInput
        placeholderTextColor={escuro ? '#8C9BB0' : cores.suave}
        style={[estilos.campo, escuro && estilos.campoEscuro]}
        {...props}
      />
    </View>
  );
}

export function Carregando() {
  return (
    <View style={estilos.centro}>
      <ActivityIndicator color={cores.dourado} size="large" />
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { padding: 16, gap: 12, flexGrow: 1 },
  titulo: { fontSize: 22, fontWeight: '700', color: cores.texto },
  secao: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  secaoTexto: { fontSize: 17, fontWeight: '700', color: cores.texto },
  texto: { fontSize: 15, color: cores.texto },
  cartao: {
    backgroundColor: cores.cartao,
    borderRadius: 14,
    padding: 16,
    gap: 4,
    shadowColor: '#0F2A4A',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  botao: { borderRadius: 14, paddingVertical: 15, alignItems: 'center' },
  botaoTexto: { fontSize: 16, fontWeight: '700' },
  rotulo: { fontSize: 13, color: cores.suave },
  campo: {
    backgroundColor: cores.cartao,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 12,
    padding: 13,
    fontSize: 16,
    color: cores.texto,
  },
  campoEscuro: { backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.18)', color: '#fff' },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: cores.marinho },
});
