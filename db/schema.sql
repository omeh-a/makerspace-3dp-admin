-- Schema defining the database structure and including sample data for testing.
-- This file targets SQLITE3.
-- Matt Rossouw (omeh-a)
-- 09/22

-- TABLES

-- Each job references one machine. Only one machine can reserve a job at a time.

-- 3D print requests
create table if not exists Jobs (
    id INTEGER primary key,
    name varchar(255) not null,
    path varchar(255) not null,
    onlineCode varchar(8) unique,
    material int not null,
    machine int,
    state int not null,
    FOREIGN KEY (machine) REFERENCES Machines(id),
);

-- 3D printers
create table if not exists Machines (
    id INTEGER primary key,
    name varchar(255) not null,
    material int,
    -- Material must be positive
    materialLeft int,
    ip varchar(15),
    curr_job int unique,
    FOREIGN KEY (curr_job) REFERENCES Jobs(id)
        on delete set null
);

