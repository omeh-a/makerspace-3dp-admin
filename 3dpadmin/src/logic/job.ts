// In-memory representation of a job

import { Machine, Material } from "./machine";

export class Job {
    private name: string;
    private path: string;
    private onlineCode: string;
    private material: Material;
    private machine: Machine;
    private date: Date;

    constructor(name: string, path: string, onlineCode : string,
        material: Material, machine: Machine, date: Date) {
        this.name = name;
        this.path = path;
        this.onlineCode = onlineCode;
        this.material = material;
        this.machine = machine;
        this.date = date;

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
}


export function sampleJobs1(): Job[] {
    let jobs: Job[] = [];
    let sampleMachine: Machine = new Machine()

    jobs.push(new Job("Sample Job 1", "C:\\Users\\User\\Desktop\\SampleJob1.gcode", "E3DP0001", Material.PLA, sampleMachine, new Date()));
    jobs.push(new Job("Sample Job 2", "C:\\Users\\User\\Desktop\\SampleJob2.gcode", "E3DP0002", Material.PLA, sampleMachine, new Date()));
    jobs.push(new Job("Sample Job 3", "C:\\Users\\User\\Desktop\\SampleJob3.gcode", "E3DP0003", Material.PLA, sampleMachine, new Date()));

    return jobs;
}

export function sampleJobs2(): Job[] {
    let jobs: Job[] = [];
    let sampleMachine: Machine = new Machine()

    jobs.push(new Job("Sample Job 4", "C:\\Users\\User\\Desktop\\SampleJob1.gcode", "E3DP1001", Material.PLA, sampleMachine, new Date()));
    jobs.push(new Job("Sample Job 5", "C:\\Users\\User\\Desktop\\SampleJob2.gcode", "E3DP1002", Material.PLA, sampleMachine, new Date()));
    jobs.push(new Job("Sample Job 6", "C:\\Users\\User\\Desktop\\SampleJob3.gcode", "E3DP1003", Material.PLA, sampleMachine, new Date()));

    return jobs;
}

export function sampleJobs3(): Job[] {
    let jobs: Job[] = [];
    let sampleMachine: Machine = new Machine()

    jobs.push(new Job("Sample Job 7", "C:\\Users\\User\\Desktop\\SampleJob1.gcode", "E3DP2001", Material.PLA, sampleMachine, new Date()));
    jobs.push(new Job("Sample Job 8", "C:\\Users\\User\\Desktop\\SampleJob2.gcode", "E3DP2002", Material.PLA, sampleMachine, new Date()));
    jobs.push(new Job("Sample Job 9", "C:\\Users\\User\\Desktop\\SampleJob3.gcode", "E3DP2003", Material.PLA, sampleMachine, new Date()));

    return jobs;
}