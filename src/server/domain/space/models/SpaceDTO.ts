export default interface SpaceDTO {
    ID: string;
    name: string;
    typeID: number;
    type: Type;
    projectID: string;
    parentID: string;
    iconID: string;
    icon: Icon;
    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;
}

interface Type {
    id: number;
    name: string;
}

interface Icon {
    id: string;
    name: string;
    path: string;
    tags: string[];
}
