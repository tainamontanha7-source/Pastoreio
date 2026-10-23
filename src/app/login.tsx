import { Redirect } from 'expo-router';
import { useState } from 'react';

import { Botao, Campo, Erro, Tela, Texto, Titulo } from '@/components/ui';
import { useAuth } from '@/lib/auth';
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
    <Tela>
      <Titulo>Pastoreio</Titulo>
      <Texto suave>O dia a dia do pastor distrital em um só lugar.</Texto>
      {cadastro && (
        <>
          <Campo rotulo="Nome" value={nome} onChangeText={setNome} />
          <Campo
            rotulo="Código da Associação"
            value={codigo}
            onChangeText={setCodigo}
            autoCapitalize="characters"
            placeholder="Fornecido pela sua Associação"
          />
        </>
      )}
      <Campo
        rotulo="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Campo rotulo="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
      {erro && <Erro>{erro}</Erro>}
      {aviso && <Texto>{aviso}</Texto>}
      <Botao titulo={cadastro ? 'Criar conta' : 'Entrar'} onPress={entrar} ocupado={ocupado} />
      <Botao
        secundario
        titulo={cadastro ? 'Já tenho conta' : 'Criar uma conta'}
        onPress={() => setCadastro(!cadastro)}
      />
    </Tela>
  );
}
