export interface ProjectPaginationVM {
    offset: number;
    limit: number;
    total: number;
    projects: ProjectVM[];
}

export interface ProjectVM {
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
