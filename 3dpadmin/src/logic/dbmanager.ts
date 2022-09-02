// Functions for managing the database
// Matt Rossouw (omeh-a)
// 08/22

import { Job } from "../logic/job";
import { Machine } from "../logic/machine";
import sqlite3 from "sqlite3";


const dbPath = "../../../db/3dpadmin.db";
let db: sqlite3.Database;

export async function initDb(dbPath: string) {
    // Open db file
    db = new sqlite3.Database(dbPath);

    // Create tables if they don't exist
    await db.run(`.read "../../../db/schema.sql"`);
}


// export function getJobs(): Promise<Job[]> {
//     return new Promise((resolve, reject) => {
//         db.all("SELECT * FROM jobs", (err, rows) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(rows);
//             }
//         });
//     });
// }