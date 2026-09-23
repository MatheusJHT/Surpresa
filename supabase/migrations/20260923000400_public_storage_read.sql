update storage.buckets
set public = true
where id = 'romantic-site';

drop policy if exists romantic_site_public_read on storage.objects;
create policy romantic_site_public_read on storage.objects
for select to anon, authenticated
using (bucket_id = 'romantic-site');