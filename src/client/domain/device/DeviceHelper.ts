import AssetsHelper from 'src/client/helper/AssetsHelper';
import {
    DeviceProtocolTypes,
    DeviceTypeCategories,
} from './DeviceMaintainItemTypes';
import DeviceVM, { CommObject, Protocol } from './DeviceVM';
import { ChannelAttr, ExtraAttr } from './KnxDataTypes';

interface Assets {
    id: string;
    name: string;
    path: string;
    tags: string[];
}

export interface FlagRule {
    priority: number;
    communication: number;
    read: number;
    write: number;
    read_init: number;
    transmit: number;
    update: number;
}

interface DeviceHelperCtor {
    device: DeviceVM;
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

    isGeneralDevice(): { isGeneralDevice: boolean } {
        const device: DeviceVM = this.device;

        // SensorAndGeneralDevice
        const isGeneralDevice =
            device.type.categoryId == DeviceTypeCategories.Sensor;

        return {
            isGeneralDevice: isGeneralDevice,
        };
    }

    hasExtraAttrs(protocol): {
        hasExtraAttrs: boolean;
        extraAttrs: { attr: ExtraAttr; obj: CommObject }[];
    } {
        const device = this.device;

        const objects = !protocol?.commInfo?.objs
            ? []
            : protocol.commInfo.objs.filter((obj) => !!obj?.objId);

        let extras = device.attrs
            .filter(
                (attr: ExtraAttr) => !attr.chId && !attr.btn && !!attr.objId
            )
            .map((attr: ExtraAttr) => {
                const obj = objects.find((obj) => obj.objId == attr.objId);
                return {
                    attr: attr,
                    obj: obj,
                };
            });

        let hasExtraAttrs = !!extras.length;

        return { hasExtraAttrs: hasExtraAttrs, extraAttrs: extras };
    }

    hasParentExtraAttrs(protocol: Protocol): {
        hasParentExtraAttrs: boolean;
        parentExtraAttrs: { attr: ChannelAttr; obj: CommObject }[];
    } {
        if (!this.device.parent) {
            return {
                hasParentExtraAttrs: false,
                parentExtraAttrs: [],
            };
        }

        const parent_protocol = this.device.parent?.protocols.find(
            (pp) => pp.typeId == protocol.typeId
        );

        if (!parent_protocol) {
            return {
                hasParentExtraAttrs: false,
                parentExtraAttrs: [],
            };
        }

        const attrs = !this.device.parent.attrs
            ? []
            : this.device.parent?.attrs
                  .filter((attr: ChannelAttr) => !attr.chId)
                  .map((attr: ChannelAttr) => {
                      const obj = parent_protocol.commInfo.objs.find(
                          (obj) => obj.objId == attr.objId
                      );
                      return {
                          attr: attr,
                          obj: obj,
                      };
                  });

        return {
            hasParentExtraAttrs: !!attrs && !!attrs.length,
            parentExtraAttrs: attrs,
        };
    }

    static toFlagNumber = (flag: FlagRule): number => {
        const f = flag;
        const priority = f.priority.toString(2).padStart(2, '0');

        //  xa = [ U,  T, RI,  W,  R,  C,  P,  P ];
        const xa = [
            f.update,
            f.transmit,
            f.read_init,
            f.write,
            f.read,
            f.communication,
            parseInt(priority[0], 2),
            parseInt(priority[1], 2),
        ];

        const value = parseInt(xa.join('').padStart(8, '0'), 2);

        return value;
    };

    static parseFlagRule = (flags: number = 0): FlagRule => {
        // Bit index	KNX Description	Modbus
        // 0 -1	Priority calls for the object, the default is 0	Unused
        // 2	object in enabled for communication (C), the default is 1 (on)	It is same with KNX. Default is On
        // 3	object value can be read via bus(R), The read flag is not set by default in most cases.	Function point (Object) value can be read (R)
        // 4	object value can be written via bus(W) , The write flag is set by default for all switch objects,	Function point (Ojbect) value can be written (W)
        // 5	object performs value read on Initialization (RI)	Unused
        // 6	object is enabled to Transmit (T), sensor (temperature, humidity… ) value should be set as enable.	Function Point (Ojbect) is enabled to Transmit (T)
        // 7	object accepts values from respon se frames as Updates (U)	Unused
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

    static changeFlagRule = (
        flags: number = 0,
        field: AttrFlag,
        value: 0 | 1 | number = 0
    ): number => {
        const f = DeviceHelper.parseFlagRule(flags);

        if (undefined == f[field]) {
            return flags;
        }

        f[field] = value;

        const priority = f.priority.toString(2).padStart(2, '0');

        //  xa = [ U,  T, RI,  W,  R,  C,  P,  P ];
        const xa = [
            f.update,
            f.transmit,
            f.read_init,
            f.write,
            f.read,
            f.communication,
            parseInt(priority[0], 2),
            parseInt(priority[1], 2),
        ];

        const result = parseInt(xa.join('').padStart(8, '0'), 2);

        return result;
    };

    static changeFlagRules = (
        flags: number = 0,
        fields: { name: AttrFlag; value: 0 | 1 }[]
    ): number => {
        const f = DeviceHelper.parseFlagRule(flags);

        for (const field of fields) {
            if (undefined != f[field.name]) {
                f[field.name] = field.value;
            }
        }

        const priority = f.priority.toString(2).padStart(2, '0');

        //  xa = [ U,  T, RI,  W,  R,  C,  P,  P ];
        const xa = [
            f.update,
            f.transmit,
            f.read_init,
            f.write,
            f.read,
            f.communication,
            parseInt(priority[0], 2),
            parseInt(priority[1], 2),
        ];

        const result = parseInt(xa.join('').padStart(8, '0'), 2);

        return result;
    };
}

type AttrFlag = 'read' | 'write' | 'transmit';

export default DeviceHelper;
