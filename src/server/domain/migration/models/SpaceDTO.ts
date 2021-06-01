export default interface SpaceDTO {
    ID: string;
    name: string;
    typeID: number;
    type: Type;
    parentID?: string;
    iconID: string;
    icon: Icon;
    projectID: string;
    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;
}

export interface Type {
    id: number;
    name: string;
}

export interface Icon {
    id: string;
    name: string;
    path: string;
    tags: string[];
}
