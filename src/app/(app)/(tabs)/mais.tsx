import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View } from 'react-native';

import { Botao, Cartao, Tela, Texto, cores } from '@/components/ui';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

export default function Mais() {
  const { perfil, sessao } = useAuth();

  return (
    <Tela>
      <Cartao>
        <Texto>{perfil?.nome || 'Sem nome'}</Texto>
        <Texto suave>{sessao?.user.email}</Texto>
        <Texto suave>{perfil?.papel === 'admin' ? 'Administração da Associação' : 'Pastor distrital'}</Texto>
      </Cartao>
      {perfil?.papel === 'admin' && (
        <Cartao onPress={() => router.push('/pastores')}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Ionicons name="people-outline" size={22} color={cores.dourado} />
            <View style={{ flex: 1 }}>
              <Texto>Pastores</Texto>
              <Texto suave>Definir o distrito de cada pastor</Texto>
            </View>
            <Ionicons name="chevron-forward" size={18} color={cores.suave} />
          </View>
        </Cartao>
      )}
      <Botao variante="contorno" titulo="Sair" onPress={() => supabase.auth.signOut()} />
    </Tela>
  );
}
