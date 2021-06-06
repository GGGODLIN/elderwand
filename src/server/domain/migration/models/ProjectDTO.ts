export default interface ProjectDTO {
    id: string;
    name: string;
    code: string;
    typeId: number;
    type: Type;
    cloudCodeId: number;
    cloudCode: CloudCode;
    statusId: number;
    status: Status;
    expireDate: number;
    ownerId: string;
    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;
}

interface Type {
    id: number;
    name: string;
}

interface CloudCode {
    id: number;
    code: string;
    name: string;
}

interface Status {
    id: number;
    code: string;
    name: string;
}
