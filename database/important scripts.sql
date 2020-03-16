-- change role column to array of strings not only string.
alter table test.users alter column role drop default;
alter table test.users alter column role TYPE character varying[] using (role::character varying[]);


-- alter column to be auto increment with sequence
create sequence test.user_projects_id_seq
   owned by test.user_projects.id;

alter table test.user_projects
   alter column id set default nextval('test.user_projects_id_seq');