import { Redirect, Stack } from 'expo-router';

import { Carregando, cores } from '@/components/ui';
import { useAuth } from '@/lib/auth';

export default function AppLayout() {
  const { carregando, sessao } = useAuth();

  if (carregando) return <Carregando />;
  if (!sessao) return <Redirect href="/login" />;

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: cores.marinho },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: cores.fundo },
        headerBackButtonDisplayMode: 'minimal',
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="pastores" options={{ title: 'Pastores' }} />
      <Stack.Screen name="distrito/[id]" options={{ title: 'Distrito' }} />
      <Stack.Screen name="igreja/[id]" options={{ title: 'Igreja' }} />
    </Stack>
  );
}
