// In-memory representation of a job

import { Machine } from "../machine/machine";

export class Job {
    private name: string;
    private path: string;
    private onlineCode: string;
    private material: string;
    private machine: Machine;

    public Job(name: string, path: string, ) : Job {
        this.name = name;
        this.path = path;
        return this;
    }

}