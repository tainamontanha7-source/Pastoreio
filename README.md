# Pastor One

*Liderar · Cuidar · Conectar · Multiplicar*

App para o pastor distrital adventista ter o dia a dia do distrito em um só lugar, e para a Associação acompanhar todos os distritos.

## O que já tem

- Login e cadastro com e-mail e senha. O pastor se cadastra com o **código de convite** da Associação.
- Dois perfis:
  - **Pastor**: vê e edita só as igrejas do próprio distrito.
  - **Admin da Associação**: cadastra distritos, define o distrito de cada pastor e vê todas as igrejas.
- Cadastro de igrejas e grupos (endereço, cidade, primeiro ancião, telefone).
- Telas de Agenda e Indicadores já no menu, marcadas como "em breve".
- Atalhos para os sistemas oficiais (ACMS, 7me, Secretaria). Os links são configurados pela Associação na tabela `atalhos`.

As regras de acesso ficam no próprio banco (Row Level Security), então um pastor não consegue ler dados de outro distrito nem pela API.

## Tecnologias

- [Expo](https://expo.dev) (React Native + TypeScript) com Expo Router
- [Supabase](https://supabase.com) para login e banco de dados

## Como rodar

1. Crie um projeto gratuito no Supabase.
2. No **SQL Editor** do Supabase, rode `supabase/migrations/0001_inicial.sql` e depois `supabase/seed.sql` (troque os dados de exemplo pelos da sua Associação).
3. Copie `.env.example` para `.env` e preencha com a URL e a chave `anon` do projeto (em *Project Settings → API*).
4. Instale e rode:

   ```bash
   npm install
   npx expo start
   ```

5. Abra no celular com o app **Expo Go**, lendo o QR code. Para ver no navegador do computador, aperte `w` no terminal.
6. Cadastre-se no app e, no SQL Editor, torne sua conta admin (o comando está no fim do `seed.sql`).

## Próximos passos

- Agenda pastoral e visitas
- Interessados e batismos
- Relatório mensal do pastor
- Funcionamento offline
