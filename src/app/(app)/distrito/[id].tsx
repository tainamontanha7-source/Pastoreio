import { Stack, useLocalSearchParams } from 'expo-router';

import { ListaIgrejas } from '@/components/listas';
import { Tela } from '@/components/ui';

export default function Distrito() {
  const { id, nome } = useLocalSearchParams<{ id: string; nome?: string }>();

  return (
    <Tela>
      {nome && <Stack.Screen options={{ title: nome }} />}
      <ListaIgrejas distritoId={id} />
    </Tela>
  );
}
