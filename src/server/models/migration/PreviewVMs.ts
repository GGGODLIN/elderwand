// noinspection DuplicatedCode

export interface ProjectPreviewVM {
    displayName: string;
    projectCode: string;
    projectName: string;
    cloudCode: number;
    expDate: number;
    owner: string;
}

export interface SpacePreviewVM {
    id: string;
    icon: string;
    name: string;
    parentId?: string;
    bgPic?: string;
}

export interface DevicePreviewVM {
    id: string;
    dvId: string;
    name: string;
    icon: string;
    image: string;
    deviceType: number;
    parentId: string;
    spaceId: string;
}

export interface DeviceTemplatePreviewVM {
    docTag: string;
    name: string;
    icon: string;
    image: string;
    deviceType: number;
    hwInfo: HwInfo;
    attrs?: object[];
    protocolInfo: ProtocolInfo[];
    switch?: Switch;
    commInfo?: CommInfo;
    rs485?: Rs485;
    period?: number;
    knx?: Knx;
    comPorts?: ComPorts;
    networkCardCount?: number;
}

interface HwInfo {
    brand: string;
    class: string;
    model: string;
}

interface ProtocolInfo {
    protocol: string;
    protocolType?: string;
}

interface Switch {
    btnCnt: number;
    hasLPress?: boolean;
    layout: string;
    modifyStyle?: boolean;
    pageCount: number;
    modifySytle?: boolean;
    isVRB?: boolean;
    keyValues?: number[];
    VRBCnt?: number;
    vrtRockButtons?: VrtRockButton[];
}

interface VrtRockButton {
    off: number;
    on: number;
}

interface CommInfo {
    KNX?: Knx;
    protocol4GW: string;
}

interface Knx {
    pAddr: string;
    isIPR?: boolean;
    chCnt?: number;
    maxCh?: number;
}

interface Rs485 {
    chCnt?: number;
    maxCh?: number;
    mdbConf: MdbConf;
    multiTopo?: boolean;
    phyConf: PhyConf;
}

interface MdbConf {
    RTU: boolean;
    broadcast?: boolean;
    master: boolean;
    std: boolean;
}

interface PhyConf {
    bRate: number;
    dBit: number;
    ptyBit: number;
    sBit: number;
}

interface ComPorts {
    portCnt: number;
}
