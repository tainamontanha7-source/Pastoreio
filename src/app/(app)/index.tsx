import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';

import { Botao, Cartao, Tela, Texto, Titulo } from '@/components/ui';
import { carregarAtalhos } from '@/lib/atalhos';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import type { Atalho } from '@/lib/tipos';

export default function Inicio() {
  const { perfil } = useAuth();
  const [atalhos, setAtalhos] = useState<Atalho[]>([]);

  useEffect(() => {
    carregarAtalhos().then(setAtalhos);
  }, [perfil?.associacao_id]);

  if (!perfil) return null;

  const admin = perfil.papel === 'admin';
  const aguardando = !perfil.associacao_id || (!admin && !perfil.distrito_id);

  return (
    <Tela>
      <Titulo>Olá{perfil.nome ? `, ${perfil.nome}` : ''}</Titulo>

      {aguardando ? (
        <Cartao>
          <Texto>Seu cadastro está aguardando a Associação definir o seu distrito.</Texto>
        </Cartao>
      ) : (
        <>
          <Texto suave>Sistemas da Igreja</Texto>
          {atalhos.map((a) => (
            <Cartao key={a.codigo} onPress={a.url ? () => WebBrowser.openBrowserAsync(a.url!) : undefined}>
              <Texto>{a.nome}</Texto>
              <Texto suave>{a.url ? a.descricao : 'Link ainda não configurado pela Associação'}</Texto>
            </Cartao>
          ))}

          <Texto suave>{admin ? 'Associação' : 'Meu distrito'}</Texto>
          {admin ? (
            <>
              <Botao titulo="Distritos e igrejas" onPress={() => router.push('/distritos')} />
              <Botao titulo="Pastores" onPress={() => router.push('/pastores')} />
            </>
          ) : (
            <Botao titulo="Igrejas do distrito" onPress={() => router.push('/igrejas')} />
          )}
        </>
      )}

      <Botao secundario titulo="Sair" onPress={() => supabase.auth.signOut()} />
    </Tela>
  );
}
