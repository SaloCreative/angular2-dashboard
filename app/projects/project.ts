export class Project {
    fldProjectID: number;
    fldTitle: string;
    fldClientID : number;
    fldProjectStatusID : number;
    fldDateAdded : number;
}

export class ProjectMeta {
    total : number;
}

export class ProjectStatus {
    fldProjectStatusID : number;
    fldName : string;
    fldLocked: number;
    fldStyle: string;
    fldDescription: string;
    fldDateAdded: number;
    fldDateModified: number;
    fldAddedBy: number;
    fldModifiedBy: number;
}