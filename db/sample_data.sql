-- Testing data.
-- Matt Rossouw (omeh-a)
-- 09/22

delete from Machines;
delete from Jobs;


-- SAMPLE DATA
-- Create 5 machines and 4 jobs
insert into Machines (materialLeft, material, ip, name, curr_job) values (10, 1, '000.000.0.0', 'Chimp', 1);
insert into Machines (materialLeft, material, ip, name, curr_job) values (20, 1, '000.000.0.0', 'Gorilla', 2);
insert into Machines (materialLeft, material, ip, name, curr_job) values (30, 1, '192.168.0.52', 'ThornyDevil', 3);
insert into Machines (materialLeft, material, ip, name, curr_job) values (40, 2, '192.168.0.98', 'CR10#1', 4);
insert into Machines (materialLeft, material, ip, name, curr_job) values (50, 3, '000.000.0.0', 'ghost', NULL);

insert into Jobs (name, path, onlineCode, material, machine, state) values ('job 1', 'examplepath', 'E3DP0001', 1, 1, 1);
insert into Jobs (name, path, onlineCode, material, machine, state) values ('job 2', 'examplepath', 'E3DP0002', 1, 2, 2);
insert into Jobs (name, path, onlineCode, material, machine, state) values ('job 3', 'examplepath', 'E3DP0003', 1, 3, 3);
insert into Jobs (name, path, onlineCode, material, machine, state) values ('job 4', 'examplepath', 'E3DP0004', 2, 4, 4);
