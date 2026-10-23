// Identidade visual Pastor One: azul-marinho e dourado, minimalista
export const cores = {
  marinho: '#0F2A4A',
  marinhoClaro: '#1B3D66',
  marinhoProfundo: '#081A30',
  dourado: '#D6AE74',
  douradoClaro: '#F1E2C8',
  douradoEscuro: '#B88D4F',
  fundo: '#F4F6FA',
  cartao: '#FFFFFF',
  texto: '#14213D',
  suave: '#6B7687',
  borda: '#E3E7EE',
  textoSobreEscuro: '#C9D3E0',
  erro: '#B3261E',
  verde: '#2E9D6A',
  azul: '#2F7BD8',
  laranja: '#E7843A',
};

export const espaco = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };

export const raio = { sm: 10, md: 14, lg: 18, pilula: 999 };

export const fonte = {
  titulo: { fontSize: 22, fontWeight: '700' as const },
  subtitulo: { fontSize: 17, fontWeight: '700' as const },
  corpo: { fontSize: 15 },
  pequeno: { fontSize: 13 },
  mini: { fontSize: 11 },
};

export const sombra = {
  shadowColor: cores.marinho,
  shadowOpacity: 0.07,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 3 },
  elevation: 2,
};
