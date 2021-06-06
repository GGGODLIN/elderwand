export default interface SpaceVM {
    id: string;
    name: string;
    typeId: number;
    type: Type;
    projectId: string;
    parentId?: string;
    iconId: string;
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
