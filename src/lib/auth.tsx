import type { Session } from '@supabase/supabase-js';
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

import { perfilDemo } from '@/dados/ficticios';

import { modoDemo, supabase } from './supabase';
import type { Perfil } from './tipos';

type Auth = {
  carregando: boolean;
  sessao: Session | null;
  perfil: Perfil | null;
  modoDemo: boolean;
  entrarDemo: () => void;
  sair: () => Promise<void>;
  recarregarPerfil: () => Promise<void>;
};

const AuthContext = createContext<Auth | null>(null);

const sessaoDemo = { user: { id: 'demo', email: 'pastor@exemplo.com' } } as Session;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [carregando, setCarregando] = useState(!modoDemo);
  const [sessao, setSessao] = useState<Session | null>(null);
  const [perfil, setPerfil] = useState<Perfil | null>(null);

  const buscarPerfil = useCallback(async (s: Session | null) => {
    if (!s) {
      setPerfil(null);
      return;
    }
    const { data } = await supabase
      .from('perfis')
      .select('id, nome, papel, associacao_id, distrito_id')
      .eq('id', s.user.id)
      .single();
    setPerfil(data);
  }, []);

  useEffect(() => {
    if (modoDemo) return;
    supabase.auth.getSession().then(async ({ data }) => {
      setSessao(data.session);
      await buscarPerfil(data.session);
      setCarregando(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_evento, s) => {
      setSessao(s);
      buscarPerfil(s);
    });
    return () => data.subscription.unsubscribe();
  }, [buscarPerfil]);

  const entrarDemo = useCallback(() => {
    setSessao(sessaoDemo);
    setPerfil(perfilDemo);
  }, []);

  const sair = useCallback(async () => {
    if (modoDemo) {
      setSessao(null);
      setPerfil(null);
    } else {
      await supabase.auth.signOut();
    }
  }, []);

  const recarregarPerfil = useCallback(
    () => (modoDemo ? Promise.resolve() : buscarPerfil(sessao)),
    [buscarPerfil, sessao],
  );

  return (
    <AuthContext.Provider value={{ carregando, sessao, perfil, modoDemo, entrarDemo, sair, recarregarPerfil }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('useAuth precisa estar dentro de AuthProvider');
  return auth;
}
