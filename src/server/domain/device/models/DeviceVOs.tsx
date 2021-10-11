export interface PlaceDeviceOptions {
    templateId?: string;
    spaceId?: string;
    dvId?: string;
}

export interface EditDeviceProfileOptions {
    name?: string;
    spaceId?: string;
    parentId?: string;
    iconId?: string;
    heartbeat?: number;
    period?: number;
}

export interface EditDeviceProtocolsOptions {
    protocols: object[]; // TODO
}
