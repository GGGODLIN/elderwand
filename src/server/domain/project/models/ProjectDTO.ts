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
    owner: Owner;
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

interface Owner {
    id: string;
    accountId: string;
    account: Account;
    platformId: number;
    roleId: number;
    statusId: number;
    parentId: string;
}

interface Account {
    id: string;
    username: string;
}

// interface ProjectDTO {
//     ID: string;
//     name: string;
//     code: string;
//     typeID: number;
//     type: Type;
//     cloudCodeID: number;
//     cloudCode: CloudCode;
//     statusID: number;
//     status: Status;
//     expireDate: number;
//     ownerID: string;
//     createdBy: string;
//     updatedBy: string;
//     createdAt: number;
//     updatedAt: number;
// }
//
// interface Type {
//     id: number;
//     name: string;
// }
//
// interface CloudCode {
//     id: number;
//     code: string;
//     name: string;
// }
//
// interface Status {
//     id: number;
//     code: string;
//     name: string;
// }

{
}
