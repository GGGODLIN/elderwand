export default interface SpaceTemplateDTO {
    id: string;
    name: string;
    typeId: number;
    type: SpaceType;
    parentId?: string;
    iconId: string;
    icon: Icon;
    projectId: string;
    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;
}

interface SpaceType {
    id: number;
    name: string;
}

interface Icon {
    id: string;
    name: string;
    path: string;
    tags: string[];
}
