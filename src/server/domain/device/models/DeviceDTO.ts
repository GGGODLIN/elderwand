export default interface DeviceDTO {
    id: string;
    name: string;
    dvId: string;
    typeId: number;
    type: DeviceType;
    modelId: string;
    model: DeviceModel;

    projectId: string;
    spaceId: string;
    parentId?: string;
    parent?: DeviceDTO;

    iconId: string;
    icon: Icon;
    images?: Image[];

    protocols: Protocol[];
    channelInfo?: ChannelInfo[];
    switchPanelControlInfo?: SwitchPanelControlInfo[];

    specId: string;
    spec: DeviceSpec;

    attrs: object[];
    sendTelRules?: number[];
    heartbeat?: number;
    period?: number;
    softwareInfo?: SoftwareInfo[];

    networkCards?: NetworkCard[];
    imei: string;
    publicIP: string;
    traceIP: string;

    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;
    deletedAt?: number;
}

interface DeviceType {
    id: number;
    name: string;
    categoryId: string;
    category: Category;
}

interface Category {
    id: string;
    name: string;
}

interface DeviceModel {
    id: string;
    name: string;
    brandId: string;
    brand: Brand;
}

interface Brand {
    id: string;
    code: string;
    name: string;
}

interface Icon {
    id: string;
    name: string;
    path: string;
    tags: string[];
}

interface Image {
    id: string;
    name: string;
    path: string;
    tags: string[];
}

interface Protocol {
    id: string;
    typeId: string;
    type: ProtocolType;
    commInfo: any;
}

interface ProtocolType {
    id: string;
    name: string;
}

interface DeviceSpec {
    id: string;
    comPortCount?: number;
    networkCardCount?: number;
    channelCount?: number;
    maxChannelCount?: number;
    switchPanel?: SwitchPanel;
    KNX?: KNX;
    RS485?: RS485;
    EnOcean?: EnOcean;
}

interface KNX {
    // chCnt?: number;
    // maxCh?: number;
    isIPR?: boolean;
}

interface RS485 {
    chCnt?: number;
    maxCh?: number;
    mdbConf: MdbConf;
    phyConf: PhyConf;
}

interface MdbConf {
    RTU: boolean;
    master: boolean;
    std: boolean;
}

interface PhyConf {
    bRate: number;
    dBit: number;
    ptyBit: number;
    sBit: number;
}

interface EnOcean {
    EEPCode: string;
}

interface SwitchPanel {
    pageCount: number;
    btnCount: number;
    hasLPress?: boolean;
    layout: string;
    modifyStyle: boolean;
}

interface ChannelInfo {
    channelNo: number;
    dvId: string;
}

interface SwitchPanelControlInfo {
    button: number;
    connectionInfo: ConnectionInfo[];
    lPress?: boolean;
}

interface ConnectionInfo {
    objectId: number;
    dvId: string;
}

interface SoftwareInfo {
    name: string;
    version?: string;
}

interface NetworkCard {
    id: string;
    name: string;
    ip: string;
    mac: string;
    network: string;

    primary: boolean;
    enable: boolean;

    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;
}
