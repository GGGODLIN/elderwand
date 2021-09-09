export default interface ProjectVM {
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
    owner: Owner;
    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;

    groups: any[];
    users: any[];
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

export interface Owner {
    id: string;
    accountId: string;
    account: Account;
    platformId: number;
    roleId: number;
    statusId: number;
    parentId: string;
}

export interface Account {
    id: string;
    username: string;
}
