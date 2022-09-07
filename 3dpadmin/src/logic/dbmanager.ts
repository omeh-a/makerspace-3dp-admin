// Functions for managing the database
// Matt Rossouw (omeh-a)
// 08/22

import { Job } from "../logic/job";
import { Machine } from "../logic/machine";

import sqlite3 from "sqlite3";

const dbPath = "../db/";
let db: sqlite3.Database;

const MachinesTable : string = `
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
`

const JobsTable : string = `
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
`

export async function initDb(): Promise<void> {
    // Open db file, create it if it doesn't exist
    db = new sqlite3.Database(`${dbPath}/3dpadmin.db`, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Connected to the 3dpadmin database.");
        }
    });

    // install schema
    db.run(MachinesTable, (err: any) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Installed Machines table.");
        }
    });

    db.run(JobsTable, (err: any) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Installed Jobs table.");
        }
    });
}

export async function endDb(): Promise<void> {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Closed the 3dpadmin database connection.");
        }
    });
}

/**
 * @brief Return the list of jobs with state Status.Pending. Needs to occur synchronously
 *        to avoid upsetting WebPack.
 * 
 * @returns List of jobs.
 */
export function getQueuedJobs(): Job[] {
    let jobs: Job[] = [];
    db.all("select * from Jobs where state = 0", (err, rows) => {
        if (err) {
            console.error(err.message);
        } else {
            for (let row of rows) {
                jobs.push(new Job(row.name, row.path, row.onlineCode, row.material, row.machine, new Date(), row.state));
            }
        }
    });
    return jobs;
}