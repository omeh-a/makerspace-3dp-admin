// In-memory representation of a job

import { Machine, Material } from "./machine";

export enum JobStatus {
    Pending,
    Printing,
    Complete,
    Archived,
}

export class Job {
    private name: string;
    private path: string;
    private onlineCode: string;
    private material: Material;
    private machine: Machine;
    private date: Date;
    private state: JobStatus;

    constructor(name: string, path: string, onlineCode : string,
        material: Material, machine: Machine, date: Date, state: JobStatus) {
        this.name = name;
        this.path = path;
        this.onlineCode = onlineCode;
        this.material = material;
        this.machine = machine;
        this.date = date;
        this.state = state;

        return this;
    }

    public getName(): string {
        return this.name;
    }

    public getOnlineCode(): string {
        return this.onlineCode;
    }

    public getDate(): Date {
        return this.date;
    }

    public getMachine(): Machine {
        return this.machine;
    }

    public getPath(): string {
        return this.path;
    }

    public getState(): JobStatus {
        return this.state;
    }
}


export function sampleJobs1(): Job[] {
    let jobs: Job[] = [];
    let sampleMachine: Machine = new Machine()

    jobs.push(new Job("Sample Job 1", "C:\\Users\\User\\Desktop\\SampleJob1.gcode", "E3DP0001", Material.PLA, sampleMachine, new Date(), JobStatus.Pending));
    jobs.push(new Job("Sample Job 2", "C:\\Users\\User\\Desktop\\SampleJob2.gcode", "E3DP0002", Material.PLA, sampleMachine, new Date(), JobStatus.Pending));
    jobs.push(new Job("Sample Job 3", "C:\\Users\\User\\Desktop\\SampleJob3.gcode", "E3DP0003", Material.PLA, sampleMachine, new Date(), JobStatus.Pending));

    return jobs;
}

export function sampleJobs2(): Job[] {
    let jobs: Job[] = [];
    let sampleMachine: Machine = new Machine()

    jobs.push(new Job("Sample Job 4", "C:\\Users\\User\\Desktop\\SampleJob1.gcode", "E3DP1001", Material.PLA, sampleMachine, new Date(), JobStatus.Printing));
    jobs.push(new Job("Sample Job 5", "C:\\Users\\User\\Desktop\\SampleJob2.gcode", "E3DP1002", Material.PLA, sampleMachine, new Date(), JobStatus.Printing));
    jobs.push(new Job("Sample Job 6", "C:\\Users\\User\\Desktop\\SampleJob3.gcode", "E3DP1003", Material.PLA, sampleMachine, new Date(), JobStatus.Printing));

    return jobs;
}

export function sampleJobs3(): Job[] {
    let jobs: Job[] = [];
    let sampleMachine: Machine = new Machine()

    jobs.push(new Job("Sample Job 7", "C:\\Users\\User\\Desktop\\SampleJob1.gcode", "E3DP2001", Material.PLA, sampleMachine, new Date(), JobStatus.Complete));
    jobs.push(new Job("Sample Job 8", "C:\\Users\\User\\Desktop\\SampleJob2.gcode", "E3DP2002", Material.PLA, sampleMachine, new Date(), JobStatus.Complete));
    jobs.push(new Job("Sample Job 9", "C:\\Users\\User\\Desktop\\SampleJob3.gcode", "E3DP2003", Material.PLA, sampleMachine, new Date(), JobStatus.Complete));

    return jobs;
}