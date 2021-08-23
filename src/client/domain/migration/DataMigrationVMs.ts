export interface SpaceTemplateVM {
    id: string;
    name: string;
    typeId: number;
    type: object;
    parentId?: string;
    iconId: string;
    icon: object;
    photos: object[];

    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;
}

export {};
