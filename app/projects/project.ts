export interface Project {
    fldProjectID: number;
    fldTitle: string;
    fldClientID : number;
    fldProjectStatusID : number;
    fldDateAdded : number;
}

export interface ProjectStatus {
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

export class ProjectMeta<T> {
    statuses :  T;
    totals;
    total : number;
}