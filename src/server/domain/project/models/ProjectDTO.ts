export default interface ProjectDTO {
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
    ID: string;
    accountID: string;
    account: Account;
    platformID: number;
    roleID: number;
    statusID: number;
    parentID: string;
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
