import { Redirect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { Botao, Campo, Erro, Tela, cores } from '@/components/ui';
import { useAuth } from '@/lib/auth';
import { marca } from '@/lib/marca';
import { supabase } from '@/lib/supabase';

export default function Login() {
  const { sessao } = useAuth();
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
    <LinearGradient colors={[cores.marinhoClaro, cores.marinho, '#081A30']} style={{ flex: 1 }}>
      <Tela escura>
        <View style={estilos.marca}>
          <Image source={require('../../assets/logo.png')} style={estilos.logo} />
          <Text style={estilos.nome}>
            {marca.nome} <Text style={{ color: cores.dourado }}>{marca.destaque}</Text>
          </Text>
          <Text style={estilos.lema}>{marca.lema}</Text>
          <Text style={estilos.chamada}>{marca.chamada}</Text>
        </View>

        {cadastro && (
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
        <Campo
          escuro
          rotulo="E-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Campo escuro rotulo="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
        {erro && <Erro>{erro}</Erro>}
        {aviso && <Text style={{ color: '#fff' }}>{aviso}</Text>}
        <Botao variante="dourado" titulo={cadastro ? 'Criar conta' : 'Entrar'} onPress={entrar} ocupado={ocupado} />
        <Botao
          variante="claro"
          titulo={cadastro ? 'Já tenho conta' : 'Criar uma conta'}
          onPress={() => setCadastro(!cadastro)}
        />
        <Text style={estilos.rodape}>{marca.rodape}</Text>
      </Tela>
    </LinearGradient>
  );
}

const estilos = StyleSheet.create({
  marca: { alignItems: 'center', marginTop: 56, marginBottom: 24, gap: 6 },
  logo: { width: 120, height: 120 },
  nome: { color: '#fff', fontSize: 36, fontWeight: '700' },
  lema: { color: '#C9D3E0', fontSize: 11, letterSpacing: 1.5 },
  chamada: { color: '#fff', fontSize: 17, textAlign: 'center', marginTop: 20, lineHeight: 24 },
  rodape: { color: '#C9D3E0', textAlign: 'center', fontSize: 13, marginTop: 8 },
});
