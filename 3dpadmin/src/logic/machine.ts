// In-memory representation of a 3D printer
// Matt Rossouw (omeh-a)
// 09/22

import axios from "axios";

export enum Model {
    GENERIC = 0,
    UM3,
    UMS3,
    UMS5,
    CCR10,
    FORM2,
    FORM3A,
    FORM3B
}

export enum Material {
    PLA = 0,
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
    public static fromIP(ip: string): Machine {
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
     public static fromIP(ip: string): Machine {
        console.log("Tried to create Ultimaker machine from IP - Not yet implemented!");
        axios.get("http://" + ip + "/api/v1/system").then((response) => {

        }).catch((error) => { 
            console.log(error);
        }
        return new Ultimaker();
    }

    public getDFID(): string {
        return this.dfid;
    }

}