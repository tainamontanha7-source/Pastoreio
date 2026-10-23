-- Exemplo de dados iniciais. Troque os nomes e os links pelos da sua Associação.
-- Rode no SQL Editor do Supabase depois da migração.

-- O código de convite é o que os pastores digitam no cadastro.
insert into associacoes (id, nome, sigla, codigo_convite)
values ('00000000-0000-0000-0000-000000000001', 'Associação Exemplo', 'AEX', 'AEX2026');

insert into distritos (associacao_id, nome)
values ('00000000-0000-0000-0000-000000000001', 'Distrito Central');

-- Links dos sistemas oficiais. Confirme as URLs corretas com a Associação.
insert into atalhos (associacao_id, codigo, nome, url) values
  ('00000000-0000-0000-0000-000000000001', 'acms', 'ACMS', 'https://exemplo.invalid/acms'),
  ('00000000-0000-0000-0000-000000000001', '7me', '7me', 'https://apps.apple.com/app/7me/id1344775660'),
  ('00000000-0000-0000-0000-000000000001', 'secretaria', 'Secretaria', 'https://exemplo.invalid/secretaria');

-- Para tornar alguém administrador (depois que a pessoa se cadastrar no app):
-- update perfis set papel = 'admin', associacao_id = '00000000-0000-0000-0000-000000000001'
-- where id = (select id from auth.users where email = 'email@exemplo.com');
