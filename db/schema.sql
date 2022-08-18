
-- Tables

-- 3D print requests
create table Jobs (
    id serial primary key,
    name varchar(255) not null,
    description text,
    onlineCode varchar(8),
    material int,  -- references TS enum
    machine int references Machines(id),
    queue int not null, -- references TS enum
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
);

-- 3D printers
create job Machines (
    id serial primary key,
    name varchar(255) not null,
    description text not null,
    material int not null default 0,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    curr_job int references Jobs(id) on delete set null,-s
);
