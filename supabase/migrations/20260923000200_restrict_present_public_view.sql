create or replace view public.public_presents as
select id, day_number, title, is_active
from public.presents;

revoke all on public.public_presents from anon, authenticated;
grant select on public.public_presents to anon, authenticated;