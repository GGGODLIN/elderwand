import { IRouterContext } from 'koa-router';
import { ServerEnvVar } from '../../config/ServerEnvVar';
import DeviceDTO, {
    NetworkCardDTO,
} from '../../domain/device/models/DeviceDTO';
import { Platform } from '../../domain/shared/enums/Enums';
import SpaceDTO from '../../domain/space/models/SpaceDTO';
import DeviceDataRepositoryHelper, {
    ApiRepositoryCtor,
} from '../../helpers/DeviceDataRepositoryHelper';

export default class DeviceMaintainControllerVersion2 {
    static getRepository = async (ctx: IRouterContext) => {
        const ctor: ApiRepositoryCtor = {
            host: ServerEnvVar.SkymapApiHost,
            platformID: Platform.ElderWand,
        };

        const params = {
            id: '',
            ...ctx.params,
        };

        const query = {
            projectID: '',
            ...ctx.query,
        };

        // target device
        const device = await DeviceDataRepositoryHelper.getDevice(
            ctor,
            params.id,
            query.projectID
        );

        // project
        const project = await DeviceDataRepositoryHelper.getProject(
            ctor,
            query.projectID
        );

        // spaces
        const spaces = await DeviceDataRepositoryHelper.getSpaces(
            ctor,
            device.spaceID,
            query.projectID
        );

        // devices
        const devices = await DeviceDataRepositoryHelper.getDevices(
            ctor,
            device,
            query.projectID
        );

        // const info = DataAccessHelper.getServiceInfo(ctx);

        const vm: DeviceDataV2RepositoryVM = {
            rt: ['bh.r.zoneExchange'],
            project: project.code,
            spaces: convertToSpaceVMs(spaces),
            gw: convertToGatewayVM(device),
            hubs: filterHubs(devices),
            devices: filterEndpointDevices(devices),
            cloud: project.cloudCodeID,
            license: project.expireDate,
            server: 'beta', // TODO
        };

        ctx.status = 200;
        ctx.body = vm;

        return;
    };
}

function filterEndpointDevices(dtos: DeviceDTO[]): DeviceVM[] {
    const exclude = ['GW', 'A'];

    const endpoints = dtos.filter((device) => {
        if (exclude.includes(device.type.category.ID)) {
            return;
        }
        return device;
    });

    return endpoints.map((dto) => {
        return {
            id: dto.ID,
            dvId: dto.dvID,
            name: dto.name,
            spaceId: dto.spaceID,
            parentId: dto.parentID,
            deviceType: dto.typeID,
            attrs: dto.attrs,
            spec: {
                comPortCnt: dto.spec.comPortCount,
                manufacturerCode: dto.spec.manufacturerCode,
                //TODO
                isIPR: false,
            },
            heartbeat: dto.heartbeat,
            period: dto.period,
            hwInfo: {
                model: dto.model.name,
                brand: dto.model.brand.name,
            },
            iconId: dto.icon.ID,
            // chInfo: ChInfo[]; // TODO
            // sendTelRules: number[];  // TODO
            // status: number; // TODO
            // commInfo: CommInfo; // TODO
            // slaveDevices?: string[]; // TODO
            // switchBindCh?: SwitchBindCh[]; // TODO
        } as DeviceVM;
    });
}

function filterHubs(dtos: DeviceDTO[]): HubVM[] {
    const include = ['A'];

    const hubs = dtos.filter((device) => {
        if (include.includes(device.type.category.ID)) {
            return device;
        }
    });

    return hubs.map((hub) => {
        return {
            id: hub.ID,
            dvId: hub.dvID,
            name: hub.name,
            spaceId: hub.spaceID,
            parentId: hub.parentID,
            deviceType: hub.typeID,
            attrs: hub.attrs,
            spec: {
                comPortCnt: hub.spec.comPortCount,
                manufacturerCode: hub.spec.manufacturerCode,
                //TODO
                isIPR: false,
            },
            heartbeat: hub.heartbeat,
            period: hub.period,
            hwInfo: {
                model: hub.model.name,
                brand: hub.model.brand.name,
            },
            iconId: hub.icon.ID,
            // chInfo: ChInfo[]; // TODO
            // sendTelRules: number[];  // TODO
            // status: number; // TODO
            // commInfo: CommInfo; // TODO
            // slaveDevices?: string[]; // TODO
        } as HubVM;
    });
}

function convertToGatewayVM(dto: DeviceDTO): GatewayVM {
    return {
        id: dto.ID,
        dvId: dto.dvID,
        spaceId: dto.spaceID,
        name: dto.name,
        deviceType: dto.typeID,
        hwInfo: {
            brand: dto.model.brand.name,
            model: dto.model.name,
        } as HwInfo,
        iconId: dto.iconID,
        spec: {
            comPortCnt: dto.spec.comPortCount,
            isIPR: false, // TODO
            manufacturerCode: dto.spec.manufacturerCode,
        } as Spec,
        networkCards: convertToNetworkCards(dto.networkCards),
        commInfo: null,
        isBindedWithUser: false,
        isBindedWithIoTCloud: false,
        swInfo: dto.softwareInfo as any,
        status: 0,
    } as GatewayVM;
}

function convertToNetworkCards(dtos: NetworkCardDTO[]): NetworkCard[] {
    return dtos.map((dto) => {
        return convertToNetworkCard(dto);
    });
}

function convertToNetworkCard(dto: NetworkCardDTO): NetworkCard {
    return {
        enable: dto.enable,
        ip: dto.ip,
        mac: dto.mac,
        name: dto.name,
        network: dto.network,
    } as NetworkCard;
}

function convertToSpaceVMs(dtos: SpaceDTO[]): SpaceVM[] {
    return dtos.map((dto) => {
        return convertToSpaceVM(dto);
    });
}

function convertToSpaceVM(dto: SpaceDTO): SpaceVM {
    return {
        id: dto.ID,
        name: dto.name,
        iconId: dto.iconID,
        parentId: dto.parentID,
    } as SpaceVM;
}

interface DeviceDataV2RepositoryVM {
    rt: string[];
    project: string;
    spaces: SpaceVM[];
    gw: GatewayVM;
    hubs: HubVM[];
    devices: DeviceVM[];
    cloud: number;
    license: number;
    server: string;
}

interface SpaceVM {
    id: string;
    name: string;
    iconId: string;
    parentId?: string;
}

interface DeviceVM {
    id: string;
    dvId: string;
    spaceId: string;
    iconId: string;
    parentId: string;
    attrs: object[];
    commInfo: CommInfo;
    deviceType: number;
    heartbeat?: number;
    hwInfo: HwInfo;
    name: string;
    spec: Spec;
    sendTelRules: number[];
    status: number;
    switchBindCh?: SwitchBindCh[];
    period?: number;
}

interface HubVM {
    id: string;
    dvId: string;
    spaceId: string;
    parentId: string;
    attrs: Attr[];
    commInfo: CommInfo;
    deviceType: number;
    heartbeat?: number;
    period?: number;
    hwInfo: HwInfo;
    iconId: string;
    spec: Spec;
    name: string;
    chInfo: ChInfo[];
    sendTelRules: number[];
    status: number;
    slaveDevices?: string[];
}

interface GatewayVM {
    dvId: string;
    spaceId: string;
    name: string;
    deviceType: number;
    hwInfo: HwInfo;
    iconId: string;
    spec: Spec;
    networkCards: NetworkCard[];
    commInfo: CommInfo;
    isBindedWithUser: boolean;
    isBindedWithIoTCloud: boolean;
    // swInfo: SwInfo[];
    swInfo: object;
    status: number;
}

interface CommInfo {
    protocol4GW: string;
    KNX?: Knx;
    MdB?: MdB;
}

interface Knx {
    UDPs: Udp[];
    filters: Filter[];
    pAddr: string;
}

interface HwInfo {
    brand: string;
    model: string;
}

interface Spec {
    comPortCnt: number;
    isIPR: boolean;
    manufacturerCode: number;
    protocolInfo: ProtocolInfo[];
    RS485?: Rs485;
    switch?: Switch;
}

interface NetworkCard {
    enable: boolean;
    ip: string;
    mac: string;
    name: string;
    network: string;
}

interface Udp {
    enableIpTunneling: boolean;
    ip: string;
    name: string;
    obtainIpType: number;
    port: number;
    type: string;
}

interface Filter {
    in: string;
    networkName: string;
    out: string;
}

interface MdB {
    addr: number;
    com: number;
}

interface ProtocolInfo {
    protocol: string;
    protocolType?: string;
}

interface Rs485 {
    chCnt: number;
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

interface ChInfo {
    ch: number;
    conDev: string;
}

interface Switch {
    btnCnt: number;
    hasLPress: boolean;
    layout: string;
    modifyStyle: boolean;
    pageCount: number;
}

interface SwitchBindCh {
    btn: number;
    ctrlInfo: CtrlInfo[];
    lpress: boolean;
}

interface CtrlInfo {
    objId: number;
    dvId: string;
}

// interface Knx2 {
//     objs: Obj[];
//     pAddr: string;
// }

// interface Obj {
//     ch?: number;
//     gAddrs: string[];
//     objId: number;
// }
