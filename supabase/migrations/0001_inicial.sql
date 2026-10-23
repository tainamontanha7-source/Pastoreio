-- Pastoreio: esquema inicial
-- Associação > distritos > igrejas. Cada usuário tem um perfil:
--   pastor: vê e edita apenas as igrejas do próprio distrito
--   admin:  vê e edita tudo da própria Associação

create type papel_usuario as enum ('pastor', 'admin');
create type tipo_congregacao as enum ('igreja', 'grupo');

create table associacoes (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  sigla text not null,
  -- Código que o pastor informa no cadastro para entrar na Associação
  codigo_convite text not null unique,
  criado_em timestamptz not null default now()
);

create table distritos (
  id uuid primary key default gen_random_uuid(),
  associacao_id uuid not null references associacoes (id) on delete cascade,
  nome text not null,
  criado_em timestamptz not null default now()
);

create table perfis (
  id uuid primary key references auth.users (id) on delete cascade,
  nome text not null default '',
  papel papel_usuario not null default 'pastor',
  associacao_id uuid references associacoes (id),
  distrito_id uuid references distritos (id),
  criado_em timestamptz not null default now()
);

create table igrejas (
  id uuid primary key default gen_random_uuid(),
  distrito_id uuid not null references distritos (id) on delete cascade,
  nome text not null,
  tipo tipo_congregacao not null default 'igreja',
  endereco text,
  cidade text,
  anciao text,
  telefone text,
  criado_em timestamptz not null default now()
);

-- Links dos sistemas oficiais (ACMS, 7me, Secretaria), configurados pela Associação
create table atalhos (
  id uuid primary key default gen_random_uuid(),
  associacao_id uuid not null references associacoes (id) on delete cascade,
  codigo text not null,
  nome text not null,
  url text not null,
  unique (associacao_id, codigo)
);

-- Cria o perfil automaticamente no cadastro, já ligado à Associação do código de convite.
-- O admin da Associação depois define o distrito.
create function criar_perfil() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into perfis (id, nome, associacao_id)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'nome', ''),
    (select id from associacoes
     where codigo_convite = upper(trim(new.raw_user_meta_data ->> 'codigo_convite')))
  );
  return new;
end;
$$;

create trigger ao_criar_usuario
  after insert on auth.users
  for each row execute function criar_perfil();

-- Funções auxiliares para as regras de acesso (security definer evita recursão no RLS de perfis)
create function meu_papel() returns papel_usuario
language sql stable security definer set search_path = public as $$
  select papel from perfis where id = auth.uid()
$$;

create function minha_associacao() returns uuid
language sql stable security definer set search_path = public as $$
  select associacao_id from perfis where id = auth.uid()
$$;

create function meu_distrito() returns uuid
language sql stable security definer set search_path = public as $$
  select distrito_id from perfis where id = auth.uid()
$$;

create function sou_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce(meu_papel() = 'admin', false)
$$;

-- Distrito visível: o próprio distrito do pastor, ou qualquer distrito da Associação para o admin
create function distrito_visivel(d uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from distritos
    where id = d
      and associacao_id = minha_associacao()
      and (sou_admin() or id = meu_distrito())
  )
$$;

alter table associacoes enable row level security;
alter table distritos enable row level security;
alter table perfis enable row level security;
alter table igrejas enable row level security;
alter table atalhos enable row level security;

create policy "ver a própria associação" on associacoes
  for select using (id = minha_associacao());

create policy "ver distritos visíveis" on distritos
  for select using (distrito_visivel(id));
create policy "admin gerencia distritos" on distritos
  for all using (sou_admin() and associacao_id = minha_associacao())
  with check (sou_admin() and associacao_id = minha_associacao());

create policy "ver o próprio perfil" on perfis
  for select using (id = auth.uid());
create policy "admin vê perfis da associação" on perfis
  for select using (sou_admin() and associacao_id = minha_associacao());
create policy "admin gerencia perfis da associação" on perfis
  for update using (sou_admin() and associacao_id = minha_associacao())
  with check (
    associacao_id = minha_associacao()
    and (distrito_id is null
         or exists (select 1 from distritos where id = distrito_id and associacao_id = minha_associacao()))
  );

create policy "ver igrejas de distritos visíveis" on igrejas
  for select using (distrito_visivel(distrito_id));
create policy "gerenciar igrejas de distritos visíveis" on igrejas
  for all using (distrito_visivel(distrito_id))
  with check (distrito_visivel(distrito_id));

create policy "ver atalhos da associação" on atalhos
  for select using (associacao_id = minha_associacao());
create policy "admin gerencia atalhos" on atalhos
  for all using (sou_admin() and associacao_id = minha_associacao())
  with check (sou_admin() and associacao_id = minha_associacao());
