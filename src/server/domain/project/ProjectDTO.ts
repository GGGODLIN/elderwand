
export interface ProjectDTO {
    cloud_code: string;
    cloud_code_id: number;
    cloud_code_name: string;
    code: string;
    created_at: number;
    created_by: string;
    expire_date: number;
    id: string;
    name: string;
    owner: Owner;
    owner_id: string;
    status_code: string;
    status_id: number;
    status_name: string;
    type_id: number;
    type_name: string;
    updated_at: number;
    updated_by: string;
}

export interface Owner {
    account_id: string;
    address: string;
    created_at: number;
    created_by: string;
    display_name: string;
    email: string;
    id: string;
    locked: boolean;
    parent_id: string;
    platform_id: number;
    role_id: number;
    status_id: number;
    tel: string;
    updated_at: number;
    updated_by: string;
}
