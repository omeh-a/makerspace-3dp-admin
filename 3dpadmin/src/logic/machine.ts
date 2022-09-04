// In-memory representation of a 3D printer
// Matt Rossouw 2022 (omeh-a)

export enum Model {
    NO_MACHINE = 0,
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
 */
export class Machine {
    private name: string;           // human readable name, given by us
    private dfid: string;           // digital factory id. unique identifier
    private model: Model;           // machine model
    private loadedMat: Material;    // loaded filament
    private materialLeft: Number;   // approximate remaining filament. works same way as formlabs cartridges
    private lastService: Date;      // last full service
    private installationDate: Date; // date first installed
    
    // Constructors

    /**
     * Blank constructor for testing
     */
    constructor() {
        this.name = "Chimpanzee";
        this.dfid = "1234.5667.8901";
        this.model = Model.UM3;
        this.loadedMat = Material.PLA;
        this.materialLeft = 750;
        this.lastService = new Date();
        this.installationDate = new Date();
    }

    /** 
     * @brief ULTIMAKER ONLY: Given IP address, query the machine for its details and create class from that.
     * @param ipUM: IP address of the machine if it is an Ultimaker 2+Connect, 3, S3 or S5
     */
    // public Machine(ipUM: string) {

    // }

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

    public getDFID(): string {
        return this.dfid;
    }

    public getModel(): Model {
        return this.model;
    }

    public getLoadedMaterial(): Material {
        return this.loadedMat;
    }

    public getLastService(): Date {
        return this.lastService;
    }

    public getInstallationDate(): Date {
        return this.installationDate;
    }

}