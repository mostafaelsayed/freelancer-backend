-- change role column to array of strings not only string.
alter table test.users alter column role drop default;
alter table test.users alter column role TYPE character varying[] using (role::character varying[]);


-- alter column to be auto increment with sequence
create sequence test.user_projects_id_seq
   owned by test.user_projects.id;

alter table test.user_projects
   alter column id set default nextval('test.user_projects_id_seq');
   
   
   
   -- alter constraints
   ALTER table  test.user_projects 
    DROP CONSTRAINT assigned_user_id,
    ADD CONSTRAINT assigned_user_id 
    FOREIGN KEY (assigned_user_id) REFERENCES test.users(id) ON DELETE cascade on update cascade;
	
	ALTER table  test.user_projects 
    DROP CONSTRAINT user_id,
    ADD CONSTRAINT user_id 
    FOREIGN KEY (user_id) REFERENCES test.users(id) ON DELETE cascade on update cascade;
	
	ALTER table  test.user_projects 
    DROP CONSTRAINT project_id,
    ADD CONSTRAINT project_id 
    FOREIGN KEY (project_id) REFERENCES test.projects(id) ON DELETE cascade on update cascade;
	
	
-- check constraint
alter table test.projects add column period character varying [] check (array_length(period, 1) = 3);