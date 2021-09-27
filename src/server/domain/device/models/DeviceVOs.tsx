export interface PlaceDeviceOptions {
    templateId?: string;
    spaceId?: string;
    dvId?: string;
}

export interface EditDeviceOptions {
    spaceId?: string;
    parentId?: string;
    // TODO
}

export interface EditDeviceProtocolsOptions {
    protocols: object[]; // TODO
}
