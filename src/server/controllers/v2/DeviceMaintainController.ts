import { IRouterContext } from 'koa-router';
import ServerEnvVar from '../../config/ServerEnvVar';
import DeviceDTO, {
    ChannelInfo,
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
            platformId: Platform.ElderWand,
        };

        const params = {
            id: '',
            ...ctx.params,
        };

        const query = {
            projectId: '',
            ...ctx.query,
        };

        // target device
        const device = await DeviceDataRepositoryHelper.getDevice(
            ctor,
            params.id,
            query.projectId
        );

        // project
        const project = await DeviceDataRepositoryHelper.getProject(
            ctor,
            query.projectId
        );

        // spaces
        const spaces = await DeviceDataRepositoryHelper.getSpaces(
            ctor,
            device.spaceId,
            query.projectId
        );

        // devices
        const devices = await DeviceDataRepositoryHelper.getDevices(
            ctor,
            device,
            query.projectId
        );

        const filter_spaces_with_device = filterSpaceWithDevices(
            spaces,
            devices
        );

        const vm: DeviceDataV2RepositoryVM = {
            rt: ['bh.r.zoneExchange'],
            project: project.code,
            spaces: convertToSpaceVMs(filter_spaces_with_device),
            gw: convertToGatewayVM(device),
            hubs: filterHubs(devices),
            devices: filterEndpointDevices(devices),
            cloud: project.cloudCodeId,
            license: project.expireDate,
            server: 'beta', // TODO
        };

        ctx.status = 200;
        ctx.body = vm;

        return;
    };
}

function filterSpaceWithDevices(spaces, devices) {
    const spaces_map = {};

    for (const space of spaces) {
        spaces_map[space.id] = space;
    }

    const filter = [];

    for (const device of devices) {
        if (filter.includes(device.spaceId)) {
            continue;
        }

        filter.push(device.spaceId);

        if (
            !spaces_map[device.spaceId] ||
            !spaces_map[device.spaceId].parentId
        ) {
            continue;
        }
        filter.push(spaces_map[device.spaceId].parentId);
    }

    const filter_spaces_with_device = spaces.filter((space) => {
        if (filter.includes(space.id || space.projectId)) {
            return space;
        }
    });
    return filter_spaces_with_device;
}

function filterEndpointDevices(dtos: DeviceDTO[]): DeviceVM[] {
    const exclude = ['GW', 'A'];

    const endpoints = dtos.filter((device) => {
        if (exclude.includes(device.type.category.id)) {
            return;
        }
        return device;
    });

    return endpoints.map((dto) => {
        return convertToDeviceVM(dto);
    });
}

function filterHubs(dtos: DeviceDTO[]): DeviceVM[] {
    const include = ['A'];

    const hubs = dtos.filter((device) => {
        if (include.includes(device.type.category.id)) {
            return device;
        }
    });

    return hubs.map((dto) => {
        return convertToDeviceVM(dto);
    });
}

function convertToGatewayVM(dto: DeviceDTO): DeviceVM {
    return convertToDeviceVM(dto);
}

function convertToDeviceVM(dto: DeviceDTO): DeviceVM {
    let comm_info = {};

    for (const protocol of dto.protocols) {
        if (!protocol.commInfo) {
            comm_info = {
                protocol4GW: protocol.typeId,
                [protocol.typeId]: protocol.commInfo,
            };
            break;
        }
    }
    return {
        id: dto.id,
        name: dto.name,
        dvId: dto.dvId,

        deviceType: dto.typeId,
        spaceId: dto.spaceId,
        parentId: dto.parentId,

        hwInfo: {
            brand: dto.model.brand.name,
            model: dto.model.name,
        } as HwInfo,
        iconId: dto.iconId,

        protocolInfo: dto.protocols.map((protocol) => {
            return {
                protocol: protocol.typeId,
            };
        }),

        commInfo: comm_info,

        spec: {
            comPortCnt: dto.spec.comPortCount,
            manufacturerCode: dto.spec.manufacturerCode,
            // isIPR: false, // TODO KNX
        } as Spec,

        chInfo: dto.channelInfo?.map((info) => {
            return {
                ch: info.channelNo,
                conDev: info.dvId,
            } as ChInfo;
        }),
        switchBindCh: dto.switchPanelControlInfo?.map((info) => {
            return {
                btn: info.button,
                lpress: info.lPress,
                ctrlInfo: info.connectionInfo?.map((conn) => {
                    return {
                        objId: conn.objectId,
                        dvId: conn.dvId,
                    } as CtrlInfo;
                }),
            } as SwitchBindCh;
        }),

        attrs: dto.attrs,
        heartbeat: dto.heartbeat,
        period: dto.period,
        sendTelRules: dto.sendTelRules,

        networkCards: dto.networkCards?.map((card) => {
            return {
                id: card.id,
                enable: card.enable,
                ip: card.ip,
                mac: card.mac,
                name: card.name,
                network: card.network,
            } as NetworkCard;
        }),
        // status: 0,
    };
}

function convertToNetworkCards(dtos: NetworkCardDTO[]): NetworkCard[] {
    if (!dtos) {
        return [];
    }

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
    if (!dtos) {
        return [];
    }

    return dtos.map((dto) => {
        return convertToSpaceVM(dto);
    });
}

function convertToSpaceVM(dto: SpaceDTO): SpaceVM {
    return {
        id: dto.id,
        name: dto.name,
        iconId: dto.iconId,
        parentId: dto.parentId,
    } as SpaceVM;
}

interface DeviceDataV2RepositoryVM {
    rt: string[];
    project: string;
    spaces: SpaceVM[];
    gw: DeviceVM;
    hubs: DeviceVM[];
    devices: DeviceVM[];
    cloud: number;
    license: number;
    server: string;
}

interface SpaceVM {
    id: string;
    name: string;
    // iconId: string;
    parentId?: string;
}

interface DeviceVM {
    id: string;
    dvId: string;
    name: string;
    deviceType: number;
    spaceId: string;
    parentId: string;
    iconId: string;

    hwInfo: HwInfo;

    protocolInfo: ProtocolInfo[];
    commInfo: object;

    spec: Spec;

    chInfo: ChInfo[];
    switchBindCh?: SwitchBindCh[];

    attrs: object[];
    heartbeat?: number;
    period?: number;
    sendTelRules: number[];

    networkCards: NetworkCard[];
    // status: number;
}

// interface HubVM {
//     id: string;
//     dvId: string;
//     spaceId: string;
//     parentId: string;
//     attrs: Attr[];
//     commInfo: CommInfo;
//     deviceType: number;
//     heartbeat?: number;
//     period?: number;
//     hwInfo: HwInfo;
//     iconId: string;
//     spec: Spec;
//     name: string;
//     chInfo: ChInfo[];
//     sendTelRules: number[];
//     status: number;
//     slaveDevices?: string[];
// }
//
// interface GatewayVM {
//     dvId: string;
//     spaceId: string;
//     name: string;
//     deviceType: number;
//     hwInfo: HwInfo;
//     iconId: string;
//     spec: Spec;
//     networkCards: NetworkCard[];
//     protocolInfo: ProtocolInfo[];
//     commInfo: CommInfo;
//     // isBindedWithUser: boolean;
//     // isBindedWithIoTCloud: boolean;
//     swInfo: object[];
//     sendTelRules: number[];
//     // status: number;
// }

// interface SwInfo {
//     name: string;
//     version: string;
// }

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
    EEPCode: number;

    RS485?: Rs485;
    switch?: Switch;
}

interface NetworkCard {
    id: string;
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
