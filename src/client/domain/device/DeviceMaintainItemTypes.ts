import DeviceVM, { DeviceTemplateVM, SpaceVM } from './DeviceVMs';

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

    private static isMovingTheSameDevice(item: DeviceVM, target: DeviceVM) {
        return item.id == target.id;
    }

    private static isSameParentDevice(item: DeviceVM, target: DeviceVM) {
        return item.parentId == target.id;
    }

    private static isLinkableDevice = (
        item: DeviceTemplateVM | DeviceVM,
        target: DeviceVM
    ): boolean => {
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
            payload: DeviceTemplateVM | DeviceVM;
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

        if (
            item.type == DeviceMaintainCardTypes.DeviceCard ||
            item.type == DeviceMaintainCardTypes.DeviceSmallCard
        ) {
            // move device to the other location
            return !DeviceMaintainCardTypeHelper.isMovingTheSameSpace(
                item,
                target
            );
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
                return false;
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

export class DeviceTypeCategoryHelper {
    static canLink = (
        source: DeviceVM | DeviceTemplateVM,
        target: DeviceVM | DeviceTemplateVM
    ): boolean => {
        // TODO protocols
        if (source.id == target.id) {
            return false;
        }

        return;
    };
}

export default DeviceMaintainCardTypes;
