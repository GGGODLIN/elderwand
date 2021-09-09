import AssetsHelper from 'src/client/helper/AssetsHelper';
import {
    DeviceProtocolTypes,
    DeviceTypeCategories,
} from './DeviceMaintainItemTypes';
import DeviceVM, { Protocol } from './DeviceVMs';
import { Channel, ChannelAttr, ExtraAttr } from './KnxDataTypes';

interface DeviceHelperCtor {
    device: DeviceVM;
}

interface Assets {
    id: string;
    name: string;
    path: string;
    tags: string[];
}

class DeviceHelper {
    private readonly device: DeviceVM = null;
    private readonly default_image: Assets = null;

    constructor(ctor: DeviceHelperCtor) {
        if (!ctor.device) {
            return;
        }

        this.device = ctor.device;
        this.default_image = this.generateDefaultImage(ctor.device);
    }

    private generateDefaultImage = (device: DeviceVM): Assets => {
        const name = `${device.model.name}`;
        const path = `https://via.placeholder.com/360x240.png?text=${name}`;

        return {
            id: `default_device_image-${this.device.id}`,
            name: name,
            tags: [],
            path: path,
        };
    };

    getIcon(): Assets | null {
        const device = this.device;

        if (!device.icon) {
            return null;
        }

        const icon = device.icon;
        const path = AssetsHelper.generateIconPath([icon.path]);

        return {
            ...icon,
            path: path,
        };
    }

    getImage(idx: number = 0): Assets | null {
        const images = !this.device.images ? [] : this.device.images;

        const image = !images.length ? this.default_image : images[idx];

        const path = !image.path
            ? this.default_image.path
            : AssetsHelper.generateImagePath(['device', image.path]);

        return {
            ...image,
            path: path,
        };
    }

    getProtocols(): string[] {
        const device = this.device;

        return !device.protocols
            ? []
            : device.protocols.map((protocol) => protocol.typeId);
    }

    isKNX(): { isKNX: boolean; protocol: Protocol } {
        const device: DeviceVM = this.device;

        const protocols = !device || !device.protocols ? [] : device.protocols;

        const KNX = protocols.find(
            (protocol) => protocol.typeId == DeviceProtocolTypes.KNX
        );

        return {
            isKNX: !!KNX,
            protocol: KNX,
        };
    }

    isGateway(): { isGateway: boolean } {
        const device: DeviceVM = this.device;

        const isGateway =
            device.type.categoryId == DeviceTypeCategories.Gateway;

        return {
            isGateway: isGateway,
        };
    }

    isActuator(): { isActuator: boolean } {
        const device: DeviceVM = this.device;

        const isActuator =
            device.type.categoryId == DeviceTypeCategories.Actuator;

        return {
            isActuator: isActuator,
        };
    }

    isSwitchPanel(): { isSwitchPanel: boolean } {
        const device: DeviceVM = this.device;

        const isSwitchPanel =
            device.type.categoryId == DeviceTypeCategories.SwitchPanel;

        return {
            isSwitchPanel: isSwitchPanel,
        };
    }

    isSensor(): { isSensor: boolean } {
        const device: DeviceVM = this.device;

        const isSensor = device.type.categoryId == DeviceTypeCategories.Sensor;

        return {
            isSensor: isSensor,
        };
    }

    hasExtraAttrs(protocol): {
        hasExtraAttrs: boolean;
        extraAttrs: ExtraAttr[];
    } {
        const device = this.device;

        const objects = !protocol?.commInfo?.objs ? [] : protocol.commInfo.objs;

        let extras = objects
            .filter((obj) => !!obj.attrObjId)
            .map((obj) => {
                const attrs = !device.attrs
                    ? []
                    : device.attrs.filter(
                          (attr: ChannelAttr) => attr.objId == obj.attrObjId
                      );

                return {
                    attrs: attrs,
                    objs: [obj],
                } as ExtraAttr;
            });

        let hasExtraAttrs = !!extras.length;

        return { hasExtraAttrs: hasExtraAttrs, extraAttrs: extras };
    }

    static parseFlagRule = (flags: number = 0): FlagRule => {
        // Bit index	KNX Description	Modbus
        // 0 -1	Priority calls for the object, the default is 0	Unused
        // 2	Ojbect in eabled for communication (C), the default is 1 (on)	It is same with KNX. Default is On
        // 3	Ojbect value can be read via bus(R), The read flag is not set by default in most cases.	Function point (Object) value can be read (R)
        // 4	Ojbect value can be written via bus(W) , The write flag is set by default for all switch objects,	Function point (Ojbect) value can be written (W)
        // 5	Ojbect performs value read on Initialization (RI)	Unused
        // 6	object is enabled to Transmit (T), sensor (temperature, humidity… ) value should be set as enable.	Function Point (Ojbect) is enabled to Transmit (T)
        // 7	object accepts values from respnose frames as Updates (U)	Unused
        //  xa = [ U,  T, RI,  W,  R,  C,  P,  P ];
        const str = flags.toString(2).padStart(8, '0');

        const rule = {
            update: parseInt(str.substr(0, 1)),
            transmit: parseInt(str.substr(1, 1)),
            read_init: parseInt(str.substr(2, 1)),
            write: parseInt(str.substr(3, 1)),
            read: parseInt(str.substr(4, 1)),
            communication: parseInt(str.substr(5, 1)),
            priority: parseInt(str.substr(6, 2)),
        };

        return rule;
    };
}

interface FlagRule {
    priority: number;
    communication: number;
    read: number;
    write: number;
    read_init: number;
    transmit: number;
    update: number;
}

export default DeviceHelper;
