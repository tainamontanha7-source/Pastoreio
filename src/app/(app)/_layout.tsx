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
        headerTintColor: cores.primaria,
        contentStyle: { backgroundColor: cores.fundo },
        headerBackButtonDisplayMode: 'minimal',
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Início' }} />
      <Stack.Screen name="distritos" options={{ title: 'Distritos' }} />
      <Stack.Screen name="pastores" options={{ title: 'Pastores' }} />
      <Stack.Screen name="igrejas/index" options={{ title: 'Igrejas' }} />
      <Stack.Screen name="igrejas/[id]" options={{ title: 'Igreja' }} />
    </Stack>
  );
}
