export default interface UserDTO {
    ID: string;
    displayName: string;
    email: string;
    address: string;
    tel: string;
    accountID: string;
    account: Account;
    platformID: number;
    platform: Platform;
    roleID: number;
    role: Role;
    statusID: number;
    status: Status;
    parentID: string;
    createdBy: string;
    updatedBy: string;
    createdAt: number;
    UpdatedAt: number;
}

interface Account {
    ID: string;
    username: string;
}

interface Platform {
    id: number;
    code: string;
    name: string;
}

interface Role {
    id: number;
    code: string;
    name: string;
}

interface Status {
    id: number;
    code: string;
    name: string;
}
