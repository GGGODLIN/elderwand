import { IconButton, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import clsx from 'clsx';
import React from 'react';
import DeviceHelper from 'src/client/domain/device/DeviceHelper';
import DeviceVM, {
    CommObject,
    SwitchPanelControlInfo,
} from 'src/client/domain/device/DeviceVMs';
import {
    ButtonAttr,
    Channel,
    ChannelAttr,
    ChannelInfo,
    ExtraAttr,
    Filter,
    KNXSettingProp,
    SensorAttr,
} from 'src/client/domain/device/KnxDataTypes';
import StringUtil from 'src/client/utils/StringUtil';

function getChannels(device: DeviceVM) {
    const helper = new DeviceHelper({ device });
    const { isKNX, protocol } = helper.isKNX();

    const infos = !device?.channelInfo ? [] : (device.channelInfo as Channel[]);

    const objects = !protocol?.commInfo?.objs ? [] : protocol.commInfo.objs;

    let channels = infos
        .map((info: ChannelInfo) => {
            const leaf: DeviceVM = !device.leaves
                ? null
                : device.leaves.find((leaf) => leaf.dvId == info.dvId);

            if (!leaf) {
                return null;
            }

            const attrs = !device.attrs
                ? []
                : device.attrs.filter(
                      (attr: ChannelAttr) => attr.chId == info.channelNo
                  );

            const objs = objects.filter((obj) => obj.ch == info.channelNo);

            return {
                channelNo: info.channelNo, //
                dvId: info.dvId,
                device: leaf,
                attrs: attrs,
                objs: objs,
            } as Channel;
        })
        .filter((channel) => !!channel)
        .sort((left, right) => {
            const a = left.channelNo;
            const b = right.channelNo;
            if (!a || a > b) {
                return 1;
            }
            if (!b || a < b) {
                return -1;
            }
            return 0;
        });

    return channels;
}

const KNXConfiguration: React.FC<KNXSettingProp> = (props) => {
    if (!props.device) {
        return null;
    }
    const device = props.device;

    const helper = new DeviceHelper({ device });
    const { isKNX, protocol } = helper.isKNX();

    if (!isKNX) {
        return null;
    }

    // Physical Address
    const pAddr = !protocol?.commInfo?.pAddr ? '' : protocol.commInfo.pAddr;

    // Filters
    const filters = (
        !protocol?.commInfo?.filters ? [] : protocol.commInfo.filters
    ) as Filter[];

    // const isIPR = device.spec.KNX.isIPR; // TODO Fix
    const isIPR = !!filters.length;

    // if (!filters.length) {
    //     filters.push({
    //         networkName: 'TP',
    //         in: '',
    //         out: '',
    //     } as Filter);
    // }

    const cards = !device.networkCards ? [] : device.networkCards;

    for (const card of cards) {
        const item = filters.find((filter) => filter.networkName == card.name);

        if (!item) {
            const name =
                card.name || StringUtil.toUpperCaseFirstLetter(card.network);

            filters.push({
                networkName: name,
                in: '',
                out: '',
            } as Filter);
        }
    }

    // const [channelState, setChannelState] = useState({ channels: [] });

    // Actuator Channel Setting
    const { isActuator } = helper.isActuator();

    let channels = getChannels(device);

    // SwitchPanel
    const { isSwitchPanel } = helper.isSwitchPanel();

    const objects = !protocol?.commInfo?.objs
        ? []
        : (protocol.commInfo.objs as CommObject[]);

    const buttons = objects
        .filter((obj) => !!obj.btn)
        .map((obj) => {
            const attr = device.attrs.find(
                (attr: ButtonAttr) => attr.objId == obj.objId
            );

            const attrs = device.attrs.filter(
                (attr: ButtonAttr) => attr.btn == obj.btn
            );

            const info = device?.switchPanelControlInfo.find(
                (info) => info.button == obj.btn
            );

            return {
                btn: obj.btn,
                info: info,
                obj: obj,
                attr: attr,
                attrs: attrs,
            } as {
                btn: number;
                info: SwitchPanelControlInfo;
                obj: CommObject;
                attr: ButtonAttr;
                attrs: ButtonAttr[];
            };
        });

    // Sensor
    const { isSensor } = helper.isSensor();

    const sensors = objects
        .filter((obj) => !!obj.ch)
        .map((obj) => {
            const attr = device.attrs.find(
                (attr: SensorAttr) => attr.objId == obj.objId
            );

            const attrs = device.attrs.filter(
                (attr: SensorAttr) => attr.chId == obj.ch
            );

            return {
                ch: obj.ch,
                obj: obj,
                attr: attr,
                attrs: attrs,
            } as {
                ch: number;
                obj: CommObject;
                attr: SensorAttr;
                attrs: SensorAttr[];
            };
        });

    // Extra Attrs
    const { hasExtraAttrs, extraAttrs } = helper.hasExtraAttrs(protocol);

    return (
        <div className="KNX-group">
            <div className="KNX-info">
                {/* KNX Physical Address */}
                {pAddr && (
                    <div className="address-info">
                        <div className="address-group">
                            <label className="group-label">
                                {'KNX Physical Address'}
                            </label>
                            <div className={'address'}>
                                <TextField
                                    variant="outlined"
                                    size={'small'}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required={true}
                                    label="Address"
                                    value={pAddr}
                                    // helperText={' '}
                                    disabled={true}
                                />
                            </div>
                        </div>
                    </div>
                )}
                {/* KNX IPR Filters */}
                {isIPR && (
                    <div className="filters-info">
                        <label className="group-label">
                            {'KNX IPR Filters'}
                        </label>
                        <div className={'filters'}>
                            {filters.map((filter, idx) => {
                                return (
                                    <div className="filter-group" key={idx}>
                                        <label>{filter.networkName}</label>
                                        <div className={'filter'}>
                                            <TextField
                                                variant="outlined"
                                                size={'small'}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                required={false}
                                                label={'Input'}
                                                value={filter.in}
                                                // helperText={' '}
                                                disabled={true}
                                            />
                                            <TextField
                                                variant="outlined"
                                                size={'small'}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                required={false}
                                                label="Output"
                                                value={filter.out}
                                                // helperText={' '}
                                                disabled={true}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
                {/* KNX Channels */}
            </div>
            <div className="channels-setting">
                {/* Channel Table */}
                {isActuator && (
                    <table>
                        <thead>
                            <tr>
                                {ActuatorSettingTitleList.map((title, idx) => {
                                    return (
                                        <th key={idx}>
                                            <span>{title}</span>
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {channels.map((channel: Channel) => {
                                return (
                                    <React.Fragment key={`${channel.dvId}`}>
                                        {channel.attrs.map((attr, idx) => {
                                            const obj = channel.objs.find(
                                                (obj) => obj.objId == attr.objId
                                            );

                                            const rule =
                                                DeviceHelper.parseFlagRule(
                                                    attr.flags
                                                );

                                            const row_span =
                                                channel.attrs.length || 0;

                                            const isEven =
                                                channel.channelNo % 2 == 0;

                                            const classname = clsx([
                                                isEven ? 'even' : 'odd',
                                            ]);

                                            return (
                                                // channel id
                                                <tr
                                                    key={`${channel.dvId}-${idx}`}
                                                    className={classname}
                                                >
                                                    {idx % row_span == 0 && (
                                                        <td
                                                            className={'center'}
                                                            rowSpan={row_span}
                                                        >
                                                            {channel.channelNo}
                                                        </td>
                                                    )}

                                                    <td className={'center'}>
                                                        {channel.dvId}
                                                    </td>
                                                    <td className={'center'}>
                                                        {attr.funId}
                                                    </td>
                                                    <td className={'center'}>
                                                        {attr.dpt}
                                                    </td>
                                                    <td className={'center'}>
                                                        {attr.suffixes ||
                                                            'None'}
                                                    </td>
                                                    <td className={'center'}>
                                                        {obj && obj.gAddrs[0]}
                                                    </td>

                                                    <td className={'center'}>
                                                        {rule.read}
                                                    </td>

                                                    <td className={'center'}>
                                                        {rule.update}
                                                    </td>

                                                    <td className={'center'}>
                                                        {rule.transmit}
                                                    </td>

                                                    <td className={'center'}>
                                                        {attr.name}
                                                    </td>

                                                    <td className={'center'}>
                                                        {attr.ack4Obj &&
                                                            `${attr.ack4Obj} / ${attr.ackSet}`}
                                                    </td>
                                                    {/*operations*/}
                                                    {idx % row_span == 0 && (
                                                        <td
                                                            className={'center'}
                                                            rowSpan={row_span}
                                                        >
                                                            <IconButton>
                                                                <AddIcon />
                                                            </IconButton>
                                                        </td>
                                                    )}
                                                </tr>
                                            );
                                        })}
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                {ActuatorSettingTitleList.map((title, idx) => {
                                    return (
                                        <th key={idx}>
                                            <span>{title}</span>
                                        </th>
                                    );
                                })}
                            </tr>
                        </tfoot>
                    </table>
                )}

                {isSwitchPanel && (
                    <table>
                        <thead>
                            <tr>
                                {SwitchPanelSettingTitleList.map(
                                    (title, idx) => {
                                        return (
                                            <th key={idx}>
                                                <span>{title}</span>
                                            </th>
                                        );
                                    }
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {buttons.map((button, idx) => {
                                // const row_span = button.info;

                                const rowSpan = button?.attrs?.length || 0;

                                const rule = DeviceHelper.parseFlagRule(
                                    button.attr.flags
                                );

                                return (
                                    <tr key={idx}>
                                        {idx % rowSpan == 0 && (
                                            <td
                                                className={'center'}
                                                rowSpan={rowSpan}
                                            >
                                                {button.btn}
                                            </td>
                                        )}

                                        <td className={'center'}>
                                            {button.attr.style
                                                ? 'Single'
                                                : 'Couple'}
                                        </td>
                                        <td>
                                            <div>{'Short'}</div>
                                            <div>
                                                {`Long ${
                                                    button.attr.lpress
                                                        ? 'true'
                                                        : ' false'
                                                }`}
                                            </div>
                                        </td>

                                        <td className={'center'}>
                                            {button.info.connectionInfo[0].dvId}
                                        </td>

                                        <td className={'center'}>
                                            {button.attr.funId}
                                        </td>

                                        <td className={'center'}>
                                            {button.attr.dpt}
                                        </td>

                                        <td className={'center'}>
                                            {button.attr.suffix || 'None'}
                                        </td>

                                        <td className={'center'}>
                                            {button.obj?.gAddrs &&
                                                button.obj.gAddrs[0]}
                                        </td>

                                        <td className={'center'}>
                                            {rule.read}
                                        </td>

                                        <td className={'center'}>
                                            {rule.update}
                                        </td>

                                        <td className={'center'}>
                                            {rule.transmit}
                                        </td>

                                        <td className={'center'}>
                                            {button.attr.name}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                {SwitchPanelSettingTitleList.map(
                                    (title, idx) => {
                                        return (
                                            <th key={idx}>
                                                <span>{title}</span>
                                            </th>
                                        );
                                    }
                                )}
                            </tr>
                        </tfoot>
                    </table>
                )}

                {isSensor && (
                    <table>
                        <thead>
                            <tr>
                                {SensorAttrTitleList.map((title, idx) => {
                                    return (
                                        <th key={idx}>
                                            <span>{title}</span>
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {sensors.map((sensor, idx) => {
                                const rowSpan = sensor.attrs.length;

                                const rule = DeviceHelper.parseFlagRule(
                                    sensor.attr.flags
                                );

                                return (
                                    <tr key={idx}>
                                        {idx % rowSpan == 0 && (
                                            <td
                                                className={'center'}
                                                rowSpan={rowSpan}
                                            >
                                                {sensor.ch}
                                            </td>
                                        )}

                                        <td className={'center'}>
                                            {sensor.attr.funId}
                                        </td>

                                        <td className={'center'}>
                                            {sensor.attr.dpt}
                                        </td>

                                        <td className={'center'}>
                                            {sensor.attr.suffixes || 'None'}
                                        </td>

                                        <td className={'center'}>
                                            {sensor.obj?.gAddrs &&
                                                sensor.obj.gAddrs[0]}
                                        </td>

                                        <td className={'center'}>
                                            {rule.read}
                                        </td>

                                        <td className={'center'}>
                                            {rule.update}
                                        </td>

                                        <td className={'center'}>
                                            {rule.transmit}
                                        </td>

                                        <td className={'center'}>
                                            {sensor.attr.name}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                {SensorAttrTitleList.map((title, idx) => {
                                    return (
                                        <th key={idx}>
                                            <span>{title}</span>
                                        </th>
                                    );
                                })}
                            </tr>
                        </tfoot>
                    </table>
                )}

                {/* Extra Attrs Table */}
                {hasExtraAttrs && (
                    <table>
                        <thead>
                            <tr>
                                {ExtractAttrTitleList.map((title, idx) => {
                                    return (
                                        <th key={idx}>
                                            <span>{title}</span>
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {extraAttrs.map((extra: ExtraAttr, extra_idx) => {
                                return (
                                    <React.Fragment key={extra_idx}>
                                        {extra.attrs.map((attr) => {
                                            const obj = extra.objs.find(
                                                (obj) =>
                                                    obj.attrObjId == attr.objId
                                            );

                                            const rule =
                                                DeviceHelper.parseFlagRule(
                                                    attr.flags
                                                );

                                            const row_span =
                                                extra.attrs.length || 0;

                                            const isEven = attr.chId % 2 == 0;

                                            const classname = clsx([
                                                isEven ? 'even' : 'odd',
                                            ]);

                                            return (
                                                <tr
                                                    key={`${attr.objId}`}
                                                    className={classname}
                                                >
                                                    <td className={'center'}>
                                                        {attr.funId}
                                                    </td>
                                                    <td className={'center'}>
                                                        {attr.dpt}
                                                    </td>
                                                    <td className={'center'}>
                                                        {attr.suffixes ||
                                                            'None'}
                                                    </td>
                                                    <td className={'center'}>
                                                        {obj && obj.gAddrs[0]}
                                                    </td>
                                                    <td className={'center'}>
                                                        {rule.read}
                                                    </td>
                                                    <td className={'center'}>
                                                        {rule.write}
                                                    </td>
                                                    <td className={'center'}>
                                                        {rule.transmit}
                                                    </td>
                                                    <td className={'center'}>
                                                        {attr.name}
                                                    </td>

                                                    {/*operations*/}
                                                    {extra_idx % row_span ==
                                                        0 && (
                                                        <td
                                                            className={'center'}
                                                            rowSpan={row_span}
                                                        >
                                                            <IconButton>
                                                                <AddIcon />
                                                            </IconButton>
                                                        </td>
                                                    )}
                                                </tr>
                                            );
                                        })}
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                {ExtractAttrTitleList.map((title, idx) => {
                                    return (
                                        <th key={idx}>
                                            <span>{title}</span>
                                        </th>
                                    );
                                })}
                            </tr>
                        </tfoot>
                    </table>
                )}
            </div>
        </div>
    );
};

type SettingTitle =
    | 'Button ID'
    | 'Button Type'
    | 'Press Mode'
    | 'Controlled Device'
    | 'Channel ID'
    | 'Device ID'
    | 'Function'
    | 'Data Type'
    | 'Sub Attribute'
    | 'Group Address'
    | 'R'
    | 'W'
    | 'T'
    | 'Object Name'
    | 'Response'
    | 'Value Mapping' // (Sender = Receiver)
    | 'Operations';

const ActuatorSettingTitleList: SettingTitle[] = [
    'Channel ID',
    'Device ID',
    'Function',
    'Data Type',
    'Sub Attribute',
    'Group Address',
    'R',
    'W',
    'T',
    'Object Name',
    'Response',
    'Operations',
];

const SwitchPanelSettingTitleList: SettingTitle[] = [
    'Button ID',
    'Button Type',
    'Press Mode',
    'Controlled Device',
    'Function',
    'Data Type',
    'Sub Attribute',
    'Group Address',
    'R',
    'W',
    'T',
    'Object Name',
    // 'Value Mapping',
];

const SensorAttrTitleList: SettingTitle[] = [
    'Channel ID',
    'Function',
    'Data Type',
    'Sub Attribute',
    'Group Address',
    'R',
    'W',
    'T',
    'Object Name',
];

const ExtractAttrTitleList: SettingTitle[] = [
    'Function',
    'Data Type',
    'Sub Attribute',
    'Group Address',
    'R',
    'W',
    'T',
    'Object Name',
    'Operations',
];

export default KNXConfiguration;
