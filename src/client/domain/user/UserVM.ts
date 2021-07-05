export default interface UserVM {
    id: string;
    display_name: string;
    address: string;
    email: string;
    tel: string;
    status_id: number;
    status_code: string;
    status_name: string;
    account_id: string;
    username: string;
    locked: boolean;
    change_password?: any;
    platform_id: number;
    platform_code: string;
    platform_name: string;
    role_id: number;
    role_code: string;
    role_name: string;
    projectId: string;
    parent?: any;
    created_by: string;
    updated_by: string;
    created_at: number;
    updated_at: number;
}

// TODO remove and change to use PaginationVM
// export interface UserPaginationVM {
//     limit: number
//     offset: number
//     total: number
//     users: UserVM[]
// }
