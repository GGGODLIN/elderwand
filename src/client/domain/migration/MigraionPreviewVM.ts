export interface ProjectPreviewVM {
    displayName: string;
    projectCode: string;
    projectName: string;
    cloudCode: number;
    expDate: number;
    owner: string;
    spaces?: SpacePreviewVM[];
    devices?: DevicePreviewVM[];
}

export interface SpacePreviewVM {
    id: string;
    icon: string;
    name: string;
    parentId?: string;
    bgPic?: string;

    leaves?: SpacePreviewVM[];
}

export interface DevicePreviewVM {
    id: string;
    dvId: string;
    name: string;
    deviceType: number;
    icon: string;
    image: string;
    parentId?: string;
    spaceId?: string;
    space?: SpacePreviewVM;
}
