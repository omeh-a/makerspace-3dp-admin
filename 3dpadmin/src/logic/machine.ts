// In-memory representation of a 3D printer
// Matt Rossouw (omeh-a)
// 09/22

import axios from "axios";

// MUST UPDATE THIS IN SQL SCHEMA IF YOU ADD A NEW MODEL!
export enum Model {
    GENERIC = 1,    // Enums start at 1 to match SQLite
    UM3,
    UMS3,
    UMS5,
    CCR10,
    FORM2,
    FORM3,
    FORM3L
}

// MUST UPDATE THIS IN SQL SCHEMA IF YOU ADD A NEW MATERIAL!
export enum Material {
    PLA = 1,        // Enums start at 1 to match SQLite
    PLA_WHT,
    PLA_BLK,
    PLA_GRY,
    PLA_COLOURED,
    PETG,
    PP,
    PVA,
    TOUGH_PLA,
    ESUN_ELASTIC,
}

export const IP_NOT_NETWORKED = "000.000.0.0";

/**
 * This class represents a machine for internal use and acts as a mirror for
 * database information. Information can be retrieved freely, but setting a field
 * will actually operate directly on the database and flush what is in memory, before
 * resetting them. 
 * 
 * This class is the generic version targeting Octoprint machines! Use the Ultimaker class for Ultimaker machines.
 */
export class Machine {
    private name: string;           // human readable name, given by us
    private model: Model;           // machine model
    private loadedMat: Material;    // loaded filament
    private materialLeft: Number;   // approximate remaining filament. works same way as formlabs cartridges
    private ip: string;             // ip address of the machine
    
    constructor(name: string = "Chimpanzee", model: Model = Model.GENERIC
                , loadedMat: Material = Material.PLA, materialLeft: Number = 100, ip: string = "") {
        this.name = name;
        this.model = model;
        this.loadedMat = loadedMat;
        this.materialLeft = materialLeft;
        this.ip = ip;
    }

    /** 
     * @brief Given IP address, query the machine for its details and create class from that.
     * @param ip: IP address of Octoprint host
     */
    public static async fromIP(ip: string): Promise<Machine> {
        console.log("Tried to create generic machine from IP - Not yet implemented!");
        return new Machine();
    }

    // Methods
    
    /**
     * @brief Refresh this machine from the database
     */
    public flush(): void {
        return
    }


    // Getters
    public getName(): string {
        return this.name;
    }

    public getModel(): Model {
        return this.model;
    }

    public getLoadedMaterial(): Material {
        return this.loadedMat;
    }

    public getIp(): string {
        return this.ip;
    }

    /**
     * @brief Get a string describing the network status of this machine
     * @returns string
     */
    public getIpString(): string {
        if (this.ip == IP_NOT_NETWORKED) return "Not networked.";
        return `IPv4: ${this.ip}`;
    }

    /**
     * @brief Return human-readable model name.
     * @returns string
     */
    public getModelString() : string {
        switch(this.model) {
            case Model.GENERIC:
                return "Generic";
            case Model.UM3:
                return "Ultimaker 3";
            case Model.UMS3:
                return "Ultimaker S3";
            case Model.UMS5:
                return "Ultimaker S5";
            case Model.CCR10:
                return "Creality CR-10";
            case Model.FORM2:
                return "Formlabs Form 2";
            case Model.FORM3:
                return "Formlabs Form 3";
            case Model.FORM3L:
                return "Formlabs Form 3L";
        }
        return "UNKNOWN";
    }

    // public getLastService(): Date {
    //     return this.lastService;
    // }
    // public getInstallationDate(): Date {

    //     return this.installationDate;
    // }

}


/**
 * Ultimaker extended class. Transparently adds in functionality for Ultimaker API.
 */
export class Ultimaker extends Machine {
    
    private dfid: string;           // digital factory id. unique identifier

    constructor(name: string = "Ultimaker", dfid: string = "123.456.789", model: Model = Model.UM3
                , loadedMat: Material = Material.PLA, materialLeft: Number = 100, ip: string = "") {
        super(name, model, loadedMat, materialLeft, ip);
        this.dfid = dfid;
    }

    /** 
     * @brief ULTIMAKER: Given IP address, query the machine for its details and create class from that.
     * @param ip: IP address of Ultimaker machine
     */
     public static async fromIP(ip: string): Promise<Machine> {
        console.log("Tried to create Ultimaker machine from IP - Not yet implemented!");
        
        // await response from axios
        let response = await axios.get("http://" + ip + "/api/v1/system");
        
        let name: string = response.data.name;
        let dfid: string = response.data.guid;
        let model: Model;
        switch (response.data.variant) { 
            case "Ultimaker 3":
                model = Model.UM3;
                break;
            case "Ultimaker S3":
                model = Model.UMS3;
                break;
            case "Ultimaker S5":
                model = Model.UMS5;
                break;
            default:
                model = Model.GENERIC;
                console.error("WARNING: Unknown Ultimaker model detected! Defaulting to generic.");
        }

        return new Ultimaker();
        
    }

    public getDFID(): string {
        return this.dfid;
    }

}


/**
 * @brief List of sample machines for UI testing. Does not invoke any network features.
 * @returns List of machines.
 */
export function sampleMachines1(): Machine[] {
    let machines: Machine[] = [];
    machines.push(new Machine("Gibbon", Model.GENERIC, Material.PLA, 750, IP_NOT_NETWORKED));
    machines.push(new Machine("Gorilla", Model.CCR10, Material.ESUN_ELASTIC, 500, IP_NOT_NETWORKED));
    machines.push(new Ultimaker("Chimpanzee", "123.456.789", Model.UMS3, Material.PETG, 159, IP_NOT_NETWORKED))
    machines.push(new Ultimaker("Orangutan", "987.654.321", Model.UM3, Material.PP, 100, IP_NOT_NETWORKED))
    return machines;
}