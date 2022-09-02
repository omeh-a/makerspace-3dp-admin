// In-memory representation of a job

import { Machine } from "./machine";

export class Job {
    private name: string;
    private path: string;
    private onlineCode: string;
    private material: string;
    private machine: Machine;
    private date: Date;

    public Job(name: string, path: string, ) : Job {
        this.name = name;
        this.path = path;
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