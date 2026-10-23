import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AppState, Platform } from 'react-native';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const chave = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Sem o .env configurado, o app abre em modo demonstração, com dados fictícios
export const modoDemo = !url || !chave;

export const supabase = createClient(url || 'https://demo.invalid', chave || 'demo', {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: !modoDemo,
    persistSession: !modoDemo,
    detectSessionInUrl: false,
  },
});

// Renova o token só com o app em primeiro plano, como recomenda o Supabase para React Native
if (Platform.OS !== 'web' && !modoDemo) {
  AppState.addEventListener('change', (estado) => {
    if (estado === 'active') supabase.auth.startAutoRefresh();
    else supabase.auth.stopAutoRefresh();
  });
}
