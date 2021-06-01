// noinspection DuplicatedCode

export default interface DeviceTemplateVM {
    ID: string;
    Name: string;
    TypeID: number;
    Type: Type;
    ParentID: any;
    Parent: any;
    IconID: string;
    Icon: Icon;
    Images: any;
    ModelID: string;
    Model: Model;
    SpecID: string;
    Spec: Spec;
    Attrs: string;
    Period: number;
    CreatedBy: string;
    UpdatedBy: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: any;
}

export interface Type {
    ID: number;
    Name: string;
    CreatedBy: string;
    UpdatedBy: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: any;
}

export interface Icon {
    ID: string;
    Name: string;
    Path: string;
    Tags: string[];
    CreatedBy: string;
    UpdatedBy: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: any;
}

export interface Model {
    ID: string;
    Name: string;
    BrandID: string;
    Brand: Brand;
    CreatedBy: string;
    UpdatedBy: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: any;
}

export interface Brand {
    ID: string;
    Code: string;
    Name: string;
    CreatedBy: string;
    UpdatedBy: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: any;
}

export interface Spec {
    ID: string;
    ComPortCount: number;
    NetworkCardCount: number;
    ChannelCount: number;
    ManufacturerCode: number;
    SwitchPanel: string;
}
