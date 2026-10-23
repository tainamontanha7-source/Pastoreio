import { Redirect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Paisagem } from '@/components/paisagem';
import { Botao, Campo, Erro } from '@/components/ui';
import { useAuth } from '@/lib/auth';
import { marca } from '@/lib/marca';
import { supabase } from '@/lib/supabase';
import { cores, espaco } from '@/theme';

export default function Login() {
  const { sessao, modoDemo, entrarDemo } = useAuth();
  const topo = useSafeAreaInsets().top;
  const [cadastro, setCadastro] = useState(false);
  const [nome, setNome] = useState('');
  const [codigo, setCodigo] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [ocupado, setOcupado] = useState(false);

  if (sessao) return <Redirect href="/" />;

  async function entrar() {
    if (modoDemo) return entrarDemo();
    setErro(null);
    setAviso(null);
    setOcupado(true);
    if (cadastro) {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: senha,
        options: { data: { nome: nome.trim(), codigo_convite: codigo } },
      });
      if (error) setErro(error.message);
      else if (!data.session) setAviso('Enviamos um e-mail de confirmação. Confirme e depois entre.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: senha });
      if (error) setErro('E-mail ou senha incorretos.');
    }
    setOcupado(false);
  }

  return (
    <ScrollView style={{ backgroundColor: cores.marinhoProfundo }} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[estilos.capa, modoDemo && { flex: 1 }]}>
        <Paisagem estrada />
        <LinearGradient
          colors={['transparent', 'rgba(8,26,48,0.55)', cores.marinhoProfundo]}
          locations={[0.45, 0.75, 1]}
          style={StyleSheet.absoluteFill}
        />
        <View style={[estilos.marca, { paddingTop: topo + 48 }]}>
          <Image source={require('../../assets/logo.png')} style={estilos.logo} />
          <Text style={estilos.nome}>
            {marca.nome} <Text style={{ color: cores.dourado }}>{marca.destaque}</Text>
          </Text>
          <Text style={estilos.lema}>{marca.lema}</Text>
        </View>
        <Text style={estilos.chamada}>{marca.chamada}</Text>
      </View>

      <View style={estilos.formulario}>
        {!modoDemo && cadastro && (
          <>
            <Campo escuro rotulo="Nome" value={nome} onChangeText={setNome} />
            <Campo
              escuro
              rotulo="Código da Associação"
              value={codigo}
              onChangeText={setCodigo}
              autoCapitalize="characters"
              placeholder="Fornecido pela sua Associação"
            />
          </>
        )}
        {!modoDemo && (
          <>
            <Campo
              escuro
              rotulo="E-mail"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Campo escuro rotulo="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
          </>
        )}
        {erro && <Erro>{erro}</Erro>}
        {aviso && <Text style={{ color: '#fff' }}>{aviso}</Text>}
        <Botao variante="dourado" titulo={cadastro ? 'Criar conta' : 'Entrar'} onPress={entrar} ocupado={ocupado} />
        {modoDemo ? (
          <Text style={estilos.demo}>Modo demonstração, com dados fictícios</Text>
        ) : (
          <Botao
            variante="claro"
            titulo={cadastro ? 'Já tenho conta' : 'Criar uma conta'}
            onPress={() => setCadastro(!cadastro)}
          />
        )}
        <Text style={estilos.rodape}>{marca.rodape}</Text>
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  capa: { minHeight: 460, justifyContent: 'space-between' },
  marca: { alignItems: 'center', gap: 6 },
  logo: { width: 96, height: 96 },
  nome: { color: '#fff', fontSize: 34, fontWeight: '700' },
  lema: { color: cores.textoSobreEscuro, fontSize: 10, letterSpacing: 1.5 },
  chamada: {
    color: '#fff',
    fontSize: 22,
    lineHeight: 30,
    paddingHorizontal: espaco.xl,
    paddingBottom: espaco.lg,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowRadius: 8,
  },
  formulario: { paddingHorizontal: espaco.xl, paddingBottom: espaco.xxl, gap: espaco.md },
  demo: { color: cores.textoSobreEscuro, textAlign: 'center', fontSize: 12 },
  rodape: { color: cores.textoSobreEscuro, textAlign: 'center', fontSize: 13, marginTop: espaco.sm },
});
