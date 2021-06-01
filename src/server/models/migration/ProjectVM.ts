export default interface ProjectVM {
    ID: string;
    name: string;
    code: string;
    typeID: number;
    type: Type;
    cloudCodeID: number;
    cloudCode: CloudCode;
    statusID: number;
    status: Status;
    expireDate: number;
    ownerID: string;
    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;
}

export interface Type {
    id: number;
    name: string;
}

export interface CloudCode {
    id: number;
    code: string;
    name: string;
}

export interface Status {
    id: number;
    code: string;
    name: string;
}
