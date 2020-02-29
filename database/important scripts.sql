-- change role column to array of strings not only string.
alter table test.users alter column role drop default;
alter table test.users alter column role TYPE character varying[] using (role::character varying[]);