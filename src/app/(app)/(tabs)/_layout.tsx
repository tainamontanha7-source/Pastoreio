import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import type { ColorValue } from 'react-native';

import { cores } from '@/components/ui';

type Icone = keyof typeof Ionicons.glyphMap;

function icone(nome: Icone) {
  return ({ color, size }: { color: ColorValue; size: number }) => (
    <Ionicons name={nome} color={color as string} size={size} />
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: cores.marinho },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '700' },
        tabBarActiveTintColor: cores.marinho,
        tabBarInactiveTintColor: cores.suave,
        sceneStyle: { backgroundColor: cores.fundo },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Início', headerShown: false, tabBarIcon: icone('home') }} />
      <Tabs.Screen name="agenda" options={{ title: 'Agenda', tabBarIcon: icone('calendar-outline') }} />
      <Tabs.Screen name="igrejas" options={{ title: 'Igrejas', tabBarIcon: icone('business-outline') }} />
      <Tabs.Screen name="indicadores" options={{ title: 'Indicadores', tabBarIcon: icone('stats-chart-outline') }} />
      <Tabs.Screen name="mais" options={{ title: 'Mais', tabBarIcon: icone('ellipsis-horizontal') }} />
    </Tabs>
  );
}
