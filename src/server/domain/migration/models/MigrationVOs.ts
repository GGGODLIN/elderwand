export interface ListSourceVO {
    dbname: string;
    conn: string;
    version: number;
}

export interface ListSourceProjectsVO extends ListSourceVO {}

export interface GetSourceProjectVO extends ListSourceVO {
    code: string;
}

export interface ListSourceSpacesVO extends ListSourceVO {}

export interface ListSourceDevicesVO extends ListSourceVO {}

export interface ListSourceDeviceTemplatesVO extends ListSourceVO {}

export interface ImportVO extends ListSourceVO {
    code: string; // new project code
}

export interface ImportProjectVO extends ImportVO {}

export interface ImportSpacesVO extends ImportVO {}

export interface ImportSpaceTemplatesVO extends ListSourceVO {}

export interface ImportDevicesVO extends ImportVO {}

export interface ImportDeviceTemplatesVO extends ListSourceVO {}

export {};
