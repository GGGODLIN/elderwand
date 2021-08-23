export default interface SpaceVM {
    id: string;
    name: string;
    typeId: number;
    type: Type;
    parentId?: string;
    iconId: string;
    icon: Icon;
    projectId: string;
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
