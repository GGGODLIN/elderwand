export default interface UserDTO {
    id: string;
    displayName: string;
    email: string;
    address: string;
    tel: string;
    accountId: string;
    account: Account;
    platformId: number;
    platform: Platform;
    roleId: number;
    role: Role;
    statusId: number;
    status: Status;
    parentId: string;
    createdBy: string;
    updatedBy: string;
    createdAt: number;
    UpdatedAt: number;
}

interface Account {
    id: string;
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
