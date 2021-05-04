export interface ProjectVM {
    selected?: boolean;
    id: string;
    name: string;
    code: string;
    type_id: number;
    type_name: string;
    cloud_code_id: number;
    cloud_code: string;
    cloud_code_name: string;
    status_id: number;
    status_code: string;
    status_name: string;
    expire_date: number;
    owner_id: string;
    created_by: string;
    updated_by: string;
    created_at: number;
    updated_at: number;
    owner: OwnerVM;
    groups: GroupVM[]
}

export interface GroupVM {
    id: string
    name: string
    type_id: number
    type_name: string
    users: string[]
    devices: string[]
    created_by: string
    updated_by: string
    updated_at: number
    created_at: number
}

export interface UserVM {
    created_by: string
    display_name: string
    id: string
    platform_code: string
    platform_id: number
    platform_name: string
    role_code: string
    role_id: number
    role_name: string
    status_code: string
    status_id: number
    status_name: string
    updated_by: string
}

export interface OwnerVM {
    id: string;
    display_name: string;
    email: string;
    address: string;
    tel: string;
    account_id: string;
    locked: boolean;
    platform_id: number;
    role_id: number;
    status_id: number;
    parent_id: string;
    created_by: string;
    updated_by: string;
    created_at: number;
    updated_at: number;
}
