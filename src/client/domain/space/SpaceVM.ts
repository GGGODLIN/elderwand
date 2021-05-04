export interface SpaceVM {
    localeCompare: any;
    id: string;
    icon: string;
    name: string;
    parent_id: string;
    leaves?: SpaceVM[];
    checked?: boolean;
}
