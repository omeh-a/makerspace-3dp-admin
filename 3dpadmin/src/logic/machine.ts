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

export class Machine {
    private name: string;           // human readable name, given by us
    private dfid: string;           // digital factory id. unique identifier
    private model: Model;           // machine model
    private loadedMat: Material;    // loaded filament
    private materialLeft: Number;   // approximate remaining filament. works same way as formlabs cartridges
    private lastService: Date;      // last full service
    private installationDate: Date; // date first installed
    
    public getName(): string {
        return this.name;
    }
}