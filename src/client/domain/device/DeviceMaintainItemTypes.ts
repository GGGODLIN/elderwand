import DeviceVM, {
    DeviceTemplateVM,
    SpaceTemplateVM,
    SpaceVM,
} from './DeviceVM';

const DeviceMaintainCardTypes: {
    // [key: string]: DeviceMaintainCardType;
    SpaceTemplateCard: DeviceMaintainCardType;
    SpaceCard: DeviceMaintainCardType;
    SpaceSmallCard: DeviceMaintainCardType;

    DeviceTemplateCard: DeviceMaintainCardType;
    DeviceCard: DeviceMaintainCardType;
    DeviceSmallCard: DeviceMaintainCardType;
} = {
    SpaceTemplateCard: 'STPLC',
    SpaceCard: 'SC',
    SpaceSmallCard: 'SSC',

    DeviceTemplateCard: 'DTPLC',
    DeviceCard: 'DC',
    DeviceSmallCard: 'DSC',
};

export type DeviceMaintainCardType =
    | 'DTPLC'
    | 'DC'
    | 'DSC'
    | 'STPLC'
    | 'SC'
    | 'SSC';

export class DeviceMaintainCardTypeHelper {
    private static isMovingTheSameSpace(
        item: {
            type: DeviceMaintainCardType;
            payload: DeviceTemplateVM | DeviceVM;
        },
        target: {
            type: DeviceMaintainCardType;
            payload: DeviceVM | SpaceVM;
        }
    ) {
        if (item.type == DeviceMaintainCardTypes.DeviceTemplateCard) {
            // is create action
            return false;
        }

        const space =
            target.type == DeviceMaintainCardTypes.SpaceCard
                ? (target.payload as SpaceVM)
                : null;

        if (!space) {
            return false;
        }

        const device = item.payload as DeviceVM;
        // move to space
        return device.spaceId == space.id;
    }

    private static isMovingTheSameDevice = (
        item: DeviceVM,
        target: DeviceVM
    ): boolean => {
        return item.id == target.id;
    };

    private static isSameParentDevice = (
        item: DeviceVM,
        target: DeviceVM
    ): boolean => {
        return item.parentId == target.id;
    };

    private static isSupportProtocol = (
        item: DeviceTemplateVM | DeviceVM,
        target: DeviceVM
    ): boolean => {
        const src = item.protocols.map((protocol) => protocol.typeId);
        const dest = target.protocols.map((protocol) => protocol.typeId);

        const result = src.filter((value) => {
            return dest.indexOf(value) >= 0;
        });

        return result.length > 0;
    };

    private static isLinkableDevice = (
        item: DeviceTemplateVM | DeviceVM,
        target: DeviceVM
    ): boolean => {
        if (!DeviceMaintainCardTypeHelper.isSupportProtocol(item, target)) {
            return false;
        }

        const src = item.type.categoryId as DeviceTypeCategory;
        const dest = target.type.categoryId;

        if (dest == DeviceTypeCategories.Gateway) {
            return [
                DeviceTypeCategories.Actuator,
                DeviceTypeCategories.SwitchPanel,
                DeviceTypeCategories.Sensor,
                DeviceTypeCategories.SpecialDevice,
                DeviceTypeCategories.ContactBridge,
            ].includes(src);
        }

        if (dest == DeviceTypeCategories.Actuator) {
            return [
                DeviceTypeCategories.SwitchPanel,
                DeviceTypeCategories.Sensor,
            ].includes(src);
        }

        if (dest == DeviceTypeCategories.ContactBridge) {
            return [DeviceTypeCategories.ContactBridge].includes(src);
        }

        return false;
    };

    private static dropToSpaceCard = (
        item: {
            type: DeviceMaintainCardType;
            payload: DeviceTemplateVM | DeviceVM | SpaceTemplateVM;
        },
        target: {
            type: DeviceMaintainCardType;
            payload: DeviceVM | SpaceVM;
        }
    ): boolean => {
        if (item.type == DeviceMaintainCardTypes.DeviceTemplateCard) {
            // place a device to the space
            return true;
        }

        if (item.type == DeviceMaintainCardTypes.SpaceTemplateCard) {
            // add a space to the space ot project
            return true;
        }

        if (
            item.type == DeviceMaintainCardTypes.DeviceCard ||
            item.type == DeviceMaintainCardTypes.DeviceSmallCard
        ) {
            // move device to the other location
            return !DeviceMaintainCardTypeHelper.isMovingTheSameSpace(
                item as {
                    type: DeviceMaintainCardType;
                    payload: DeviceTemplateVM | DeviceVM;
                },
                target
            );
        }

        if (item.type == DeviceMaintainCardTypes.SpaceCard) {
            // change space parent

            if ((item.payload as SpaceVM).id == target.payload.id) {
                return false;
            }

            return (item.payload as SpaceVM).parentId != target.payload.id;
        }

        return false;
    };

    private static dropToDeviceCard = (
        item: {
            type: DeviceMaintainCardType;
            payload: DeviceTemplateVM | DeviceVM;
        },
        target: {
            type: DeviceMaintainCardType;
            payload: DeviceVM | SpaceVM;
        }
    ): boolean => {
        if (item.type == DeviceMaintainCardTypes.DeviceTemplateCard) {
            // place a device to the device
            return [
                DeviceMaintainCardTypes.DeviceCard,
                DeviceMaintainCardTypes.DeviceSmallCard,
            ].includes(target.type)
                ? DeviceMaintainCardTypeHelper.isLinkableDevice(
                      item.payload,
                      target.payload as DeviceVM
                  )
                : false;
        }

        if (
            item.type == DeviceMaintainCardTypes.DeviceCard ||
            item.type == DeviceMaintainCardTypes.DeviceSmallCard
        ) {
            // change device parent
            if (
                DeviceMaintainCardTypeHelper.isMovingTheSameDevice(
                    item.payload as DeviceVM,
                    target.payload as DeviceVM
                )
            ) {
                // is moving the same space
                return false;
            }

            if (
                DeviceMaintainCardTypeHelper.isSameParentDevice(
                    item.payload as DeviceVM,
                    target.payload as DeviceVM
                )
            ) {
                // is same parent device
                return false;
            }

            if (
                !DeviceMaintainCardTypeHelper.isLinkableDevice(
                    item.payload,
                    target.payload as DeviceVM
                )
            ) {
                // is not linkable
                return false;
            }

            // device card can drop
            return true;
        }

        // device card can not drop
        return false;
    };

    static canDrop = (
        item: {
            type: DeviceMaintainCardType;
            payload: DeviceTemplateVM | DeviceVM;
        },
        target: {
            type: DeviceMaintainCardType;
            payload: DeviceVM | SpaceVM;
        }
    ): boolean => {
        switch (target.type) {
            case DeviceMaintainCardTypes.DeviceCard:
                return DeviceMaintainCardTypeHelper.dropToDeviceCard(
                    item,
                    target
                );
            case DeviceMaintainCardTypes.DeviceSmallCard:
                return DeviceMaintainCardTypeHelper.dropToDeviceCard(
                    item,
                    target
                );
            case DeviceMaintainCardTypes.SpaceCard:
                return DeviceMaintainCardTypeHelper.dropToSpaceCard(
                    item,
                    target
                );
            default:
                return false;
        }
    };
}

export const DeviceTypeCategories: {
    // [key:string]:DeviceTypeCategory;
    All: DeviceTypeCategory;
    Gateway: DeviceTypeCategory;
    Actuator: DeviceTypeCategory;
    SwitchPanel: DeviceTypeCategory;
    Sensor: DeviceTypeCategory;
    SpecialDevice: DeviceTypeCategory;
    ContactBridge: DeviceTypeCategory;
} = {
    All: 'All',
    Gateway: 'GW',
    Actuator: 'A',
    SwitchPanel: 'SP',
    Sensor: 'S',
    SpecialDevice: 'SD',
    ContactBridge: 'CPB',
};

export type DeviceTypeCategory = 'All' | 'GW' | 'A' | 'SP' | 'S' | 'SD' | 'CPB';

export const DeviceTypeCategoryTags = [
    DeviceTypeCategories.All,
    DeviceTypeCategories.Gateway,
    DeviceTypeCategories.Actuator,
    DeviceTypeCategories.SwitchPanel,
    DeviceTypeCategories.Sensor,
    DeviceTypeCategories.SpecialDevice,
    DeviceTypeCategories.ContactBridge,
];

// 2G	2G	2G	2G
// BLE	BLE	BLE	BLE
// BT	Bluetooth	蓝牙	藍牙
// BsP	Buspro	Buspro	Buspro
// CP	Contact Point	干接点	乾接點
// EnO	EnOcean	EnOcean	EnOcean
// EtN	Ethernet	乙太网	乙太網
// KNX	KNX	KNX	KNX
// MdB	Modbus	Modbus	Modbus
// NBI	NB-IoT	NB-IoT	NB-IoT
// LoR	LoRa	LoRa	LoRa
// SgF	SigFox	SigFox	SigFox
// WiF	Wifi	Wifi	Wifi
// ZgB	ZigBee	ZigBee	ZigBee

export type DeviceProtocolType =
    | 'All'
    | '2G'
    | 'BLE'
    | 'BT'
    | 'BsP'
    | 'CP'
    | 'EnO'
    | 'EtN'
    | 'KNX'
    | 'MdB'
    | 'NBI'
    | 'LoR'
    | 'SgF'
    | 'WiF'
    | 'ZgB';

export const DeviceProtocolTypes: {
    // [key: string]: DeviceProtocolType;
    All: DeviceProtocolType;
    SecondGeneration: DeviceProtocolType;
    BLE: DeviceProtocolType;
    Bluetooth: DeviceProtocolType;
    Buspro: DeviceProtocolType;
    Contact: DeviceProtocolType;
    EnOcean: DeviceProtocolType;
    Ethernet: DeviceProtocolType;
    KNX: DeviceProtocolType;
    Modbus: DeviceProtocolType;
    NBIoT: DeviceProtocolType;
    LoRa: DeviceProtocolType;
    SigFox: DeviceProtocolType;
    Wifi: DeviceProtocolType;
    ZigBee: DeviceProtocolType;
} = {
    All: 'All',
    SecondGeneration: '2G',
    BLE: 'BLE',
    Bluetooth: 'BT',
    Buspro: 'BsP',
    Contact: 'CP',
    EnOcean: 'EnO',
    Ethernet: 'EtN',
    KNX: 'KNX',
    Modbus: 'MdB',
    NBIoT: 'NBI',
    LoRa: 'LoR',
    SigFox: 'SgF',
    Wifi: 'WiF',
    ZigBee: 'ZgB',
};

export const DeviceProtocolTypeTags: DeviceProtocolType[] = [
    DeviceProtocolTypes.All,
    DeviceProtocolTypes.KNX,
    DeviceProtocolTypes.Modbus,
    DeviceProtocolTypes.EnOcean,
    DeviceProtocolTypes.Ethernet,
    DeviceProtocolTypes.Buspro,
    DeviceProtocolTypes.Wifi,
    DeviceProtocolTypes.Bluetooth,
    DeviceProtocolTypes.SecondGeneration,
    DeviceProtocolTypes.Contact,
];

export default DeviceMaintainCardTypes;
