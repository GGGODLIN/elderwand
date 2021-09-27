import { IconButton, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { Pagination } from '@material-ui/lab';
import clsx from 'clsx';
import { produce } from 'immer';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import DeviceHelper from 'src/client/domain/device/DeviceHelper';
import DeviceMaintainAPIs from 'src/client/domain/device/DeviceMaintainAPIs';
import DeviceVM, {
    CommObject,
    ProjectVM,
    Protocol,
    SpaceVM,
    SwitchPanelControlInfo,
} from 'src/client/domain/device/DeviceVMs';
import {
    ButtonAttr,
    ChannelAttr,
    ChannelInfo,
    ExtraAttr,
    Filter,
    GeneralDeviceAttr,
    SensorAttr,
} from 'src/client/domain/device/KnxDataTypes';
import DeviceSlice from 'src/client/slices/DeviceSlice';
import { groupBy } from 'src/client/utils/FunctionUtil';
import StringUtil from 'src/client/utils/StringUtil';

interface KNXSettingForm {
    address: string;
    filters: Filter[];
}

export interface KNXConfigurationProp {
    project: ProjectVM;
    space: SpaceVM;
    device: DeviceVM;
}

const KNXConfiguration: React.FC<KNXConfigurationProp> = (props) => {
    if (!props.project || !props.device) {
        return null;
    }

    const dispatch = useDispatch();

    const project = props.project;
    const space = props.space;
    const device = props.device;

    const helper = new DeviceHelper({ device });
    const { isKNX, protocol } = helper.isKNX();

    if (!isKNX) {
        return null;
    }

    // Physical Address
    const pAddr = !protocol?.commInfo?.pAddr ? '' : protocol.commInfo.pAddr;

    // Filters
    let filters = (
        !protocol?.commInfo?.filters ? [] : protocol.commInfo.filters
    ) as Filter[];

    const isIPR = device.spec?.KNX?.isIPR ? device.spec.KNX.isIPR : false;

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

            const filter = {
                networkName: name,
                in: '',
                out: '',
            } as Filter;

            filters = [...filters, filter];
        }
    }

    const objects = !protocol?.commInfo?.objs
        ? []
        : (protocol.commInfo.objs as CommObject[]);

    // Actuator Channel Setting
    const { isActuator } = helper.isActuator();

    let channels = [];

    if (isActuator) {
        channels = objects
            .filter((obj) => !!obj.ch)
            .map((obj) => {
                const attr = device.attrs.find(
                    (attr: ChannelAttr) => attr.objId == obj.objId
                );

                const attrs = device.attrs.filter(
                    (attr: ChannelAttr) => attr.chId == obj.ch
                );

                const info = !device.channelInfo
                    ? null
                    : device.channelInfo.find(
                          (info: ChannelInfo) => info.channelNo == obj.ch
                      );

                return {
                    ch: obj.ch,
                    info: info,
                    obj: obj,
                    attr: attr,
                    attrs: attrs,
                } as {
                    ch: number;
                    info: ChannelInfo;
                    obj: CommObject;
                    attr: ChannelAttr;
                    attrs: ChannelAttr[];
                };
            });
    }

    // SwitchPanel
    const { isSwitchPanel } = helper.isSwitchPanel();

    const [stateOfSwitchPanel, setSwitchPanelState] = useState({ page: 1 });

    const handleChangePage = (e, value) => {
        if (!!value) {
            setSwitchPanelState({ page: value });
        }
    };

    const page_count = device.spec?.switchPanel?.pageCount || 1;
    const attrs_page_group = groupBy('page')(device.attrs);

    let buttons = [];

    if (isSwitchPanel) {
        const btns = !attrs_page_group[stateOfSwitchPanel.page]
            ? device.attrs.map((attr: ButtonAttr) => attr.btn)
            : (attrs_page_group[stateOfSwitchPanel.page] as ButtonAttr[])
                  .filter((attr) => !!attr.btn)
                  .map((attr) => attr.btn);
        buttons = objects
            .filter((obj: CommObject) => !!btns.includes(obj.btn))
            .filter((obj: CommObject) => !!obj.btn)
            .map((obj) => {
                const attr = device.attrs.find(
                    (attr: ButtonAttr) => attr.objId == obj.objId
                );

                const attrs = device.attrs.filter(
                    (attr: ButtonAttr) => attr.btn == obj.btn
                );

                const info = !device.switchPanelControlInfo
                    ? null
                    : device.switchPanelControlInfo.find(
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
    }

    // Extra Attrs
    let { hasExtraAttrs, extraAttrs } = helper.hasExtraAttrs(protocol);

    let extras = [];

    if (hasExtraAttrs) {
        const objIds = !attrs_page_group[stateOfSwitchPanel.page]
            ? device.attrs.map((attr: ExtraAttr) => attr.objId)
            : (attrs_page_group[stateOfSwitchPanel.page] as ExtraAttr[])
                  .filter((attr) => !!attr.page)
                  .map((attr) => attr.objId);

        extras = extraAttrs.filter((extra) =>
            objIds.includes(extra.attr.objId)
        );
    }

    // Sensor
    const { isSensor } = helper.isSensor();

    let sensors = [];

    if (isSensor) {
        sensors = objects
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
    }

    // Parent ExtraAttrs
    const { hasParentExtraAttrs, parentExtraAttrs } =
        helper.hasParentExtraAttrs(protocol);

    // GeneralDevice
    const { isGeneralDevice } = helper.isGeneralDevice();

    let generals = [];

    if (isGeneralDevice) {
        generals = objects
            .filter((obj) => !obj.ch)
            .map((obj) => {
                const attr = device.attrs.find(
                    (attr: GeneralDeviceAttr) => attr.objId == obj.objId
                );

                return {
                    obj: obj,
                    attr: attr,
                } as {
                    obj: CommObject;
                    attr: GeneralDeviceAttr;
                };
            });
    }

    const {
        register,
        control,
        setValue,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm<KNXSettingForm>({
        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    const [stateOfSetting, setSetting] = useState({
        setting: {
            address: pAddr,
            filters: filters,
        } as KNXSettingForm,
        changed: false,
    });

    const handleChangeSetting = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        const nextState = produce(stateOfSetting, (draft) => {
            draft.setting[name] = value;
            draft.changed = true;
        });

        setSetting(nextState);
    };

    const handleChangeFilter = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (!name) {
            return;
        }

        const idx = name.split('.')[1];
        const field = name.split('.')[2];

        const nextState = produce(stateOfSetting, (draft) => {
            draft.setting.filters[idx][field] = value;
            draft.changed = true;
        });

        setSetting(nextState);
    };

    const handleResetSetting = (e) => {
        setSetting({
            setting: {
                address: pAddr,
                filters: filters,
            },
            changed: false,
        });
        clearErrors();
    };

    const handleSubmitSetting = (e) => {
        let vo = JSON.parse(JSON.stringify(protocol)) as Protocol;

        vo.commInfo.filters = stateOfSetting.setting.filters;
        vo.commInfo.pAddr = stateOfSetting.setting.address;

        let protocols = device.protocols.filter(
            (protocol) => protocol.typeId != 'KNX'
        );

        protocols.push(vo);

        const device_vo = {
            ...device,
            protocols: protocols,
        };

        DeviceMaintainAPIs.editDeviceProtocols(
            dispatch,
            project,
            device_vo,
            (data) => {
                dispatch(
                    DeviceSlice.editDeviceSetting({ ...data, project, space })
                );
                DeviceMaintainAPIs.fetchDeviceTopologyResources(
                    dispatch,
                    project
                );
            }
        );
    };

    useEffect(() => {
        setSetting({
            setting: {
                address: pAddr,
                filters: filters,
            },
            changed: false,
        });
        return () => {
            // effect;
        };
    }, [device]);

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
                                    // value={pAddr}
                                    value={stateOfSetting.setting.address}
                                    onChange={handleChangeSetting}
                                    error={!!errors.address}
                                    helperText={
                                        !errors.address
                                            ? ' '
                                            : errors.address.message
                                    }
                                    disabled={false}
                                    inputProps={{
                                        ...register('address', {
                                            required: {
                                                value: true,
                                                message: 'is required',
                                            },
                                            pattern: {
                                                value: new RegExp(
                                                    /^\d\.\d\.\d$/,
                                                    'gm'
                                                ),
                                                message:
                                                    'pattern rule is \\d.\\d.\\d',
                                            },
                                        }),
                                    }}
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
                            {stateOfSetting.setting.filters.map(
                                (filter, idx) => {
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
                                                    // value={filters[idx].in}
                                                    onChange={
                                                        handleChangeFilter
                                                    }
                                                    error={
                                                        !!errors.filters &&
                                                        !!errors.filters[idx]
                                                            ?.in
                                                    }
                                                    // helperText={
                                                    //     !!errors.filters &&
                                                    //     !errors.filters[idx]?.in
                                                    //         ? ' '
                                                    //         : errors.filters[
                                                    //               idx
                                                    //           ].in.message
                                                    // }
                                                    disabled={false}
                                                    inputProps={{
                                                        ...register(
                                                            // @ts-ignore
                                                            `filters.${idx}.in`,
                                                            {
                                                                pattern: {
                                                                    value: new RegExp(
                                                                        /^\d+$/,
                                                                        'gm'
                                                                    ),
                                                                    message:
                                                                        'pattern rule is \\d',
                                                                },
                                                            }
                                                        ),
                                                    }}
                                                />
                                                <TextField
                                                    variant="outlined"
                                                    size={'small'}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    required={false}
                                                    label="Output"
                                                    // value={filter.out}
                                                    value={
                                                        stateOfSetting.setting
                                                            .filters[idx].out
                                                    }
                                                    onChange={
                                                        handleChangeFilter
                                                    }
                                                    error={
                                                        !!errors.filters &&
                                                        !!errors.filters[idx]
                                                            ?.out
                                                    }
                                                    // helperText={
                                                    //     !!errors.filters &&
                                                    //     !errors.filters[idx]
                                                    //         ?.out
                                                    //         ? ' '
                                                    //         : errors.filters[
                                                    //               idx
                                                    //           ].out.message
                                                    // }
                                                    disabled={false}
                                                    inputProps={{
                                                        ...register(
                                                            // @ts-ignore
                                                            `filters.${idx}.out`,
                                                            {
                                                                pattern: {
                                                                    value: new RegExp(
                                                                        /^\d+$/,
                                                                        'gm'
                                                                    ),
                                                                    message:
                                                                        'pattern rule is \\d',
                                                                },
                                                            }
                                                        ),
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                )}
            </div>
            {/* operation */}
            <div className={'actions'}>
                {stateOfSetting.changed && (
                    <React.Fragment>
                        <Button
                            className={'save'}
                            type={'button'}
                            onClick={handleSubmitSetting}
                        >
                            {'SAVE'}
                        </Button>
                        <Button
                            className={'reset'}
                            type={'reset'}
                            onClick={handleResetSetting}
                        >
                            {'RESET'}
                        </Button>
                    </React.Fragment>
                )}
            </div>
            {/* KNX Channels */}
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
                                <th colSpan={2}>{'Operations'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {channels.map((channel, idx) => {
                                const row_span = channel.attrs.length;

                                const rule = DeviceHelper.parseFlagRule(
                                    channel.attr.flags
                                );

                                const isEven = channel.ch % 2 == 0;
                                const classname = clsx([
                                    isEven ? 'even' : 'odd',
                                ]);

                                const bound = device.leaves.find(
                                    (leaf) => leaf.dvId == channel.info.dvId
                                );

                                return (
                                    <tr key={idx} className={classname}>
                                        {idx % row_span == 0 && (
                                            <td
                                                className={'center'}
                                                rowSpan={row_span}
                                            >
                                                {channel.ch}
                                            </td>
                                        )}
                                        <td className={'center'}>
                                            {/*{channel.info && channel.info.dvId}*/}
                                            {/*{channel.info.dvId}*/}
                                            {bound && bound.name}
                                        </td>
                                        <td className={'center'}>
                                            {channel.attr.funId}
                                        </td>
                                        <td className={'center'}>
                                            {channel.attr.dpt}
                                        </td>
                                        <td className={'center'}>
                                            {channel.attr.suffixes || 'None'}
                                        </td>
                                        <td className={'center'}>
                                            {channel.obj &&
                                                channel.obj.gAddrs[0]}
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
                                            {channel.attr.name}
                                        </td>
                                        <td className={'center'}>
                                            {`${channel.attr.ack4Obj} / ${channel.attr.ackSet}`}
                                        </td>
                                        {/*operations*/}
                                        <td style={{ textAlign: 'center' }}>
                                            <IconButton>
                                                <DeleteIcon />
                                            </IconButton>
                                        </td>
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
                    <React.Fragment>
                        {page_count > 1 && (
                            <div className={'pagination'}>
                                <Pagination
                                    count={page_count}
                                    page={stateOfSwitchPanel.page}
                                    onChange={handleChangePage}
                                    variant="outlined"
                                    color="primary"
                                    showFirstButton={true}
                                    showLastButton={true}
                                />
                            </div>
                        )}

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
                                    const row_span = button?.attrs?.length || 0;

                                    const rule = DeviceHelper.parseFlagRule(
                                        button.attr.flags
                                    );

                                    let isEven = button.btn % 2 == 0;

                                    const classname = clsx([
                                        isEven ? 'even' : 'odd',
                                    ]);

                                    const controlled = device.leaves.find(
                                        (leaf) =>
                                            leaf.dvId ==
                                            button.info.connectionInfo[0].dvId
                                    );

                                    return (
                                        <tr key={idx} className={classname}>
                                            {idx % row_span == 0 && (
                                                <td
                                                    className={'center'}
                                                    rowSpan={row_span}
                                                >
                                                    {button.attr.bIdx ||
                                                        button.attr.btn}
                                                </td>
                                            )}

                                            <td className={'center'}>
                                                {/*toggle (單鍵), Rocker(雙鍵), toggle simulator(類單鍵)*/}
                                                {button.attr.style
                                                    ? 'Toggle'
                                                    : 'Rocker'}
                                            </td>

                                            <td>
                                                <div>{'Short'}</div>
                                                <div>
                                                    {`Long ${
                                                        button.attr.lpress
                                                            ? 'true'
                                                            : 'false'
                                                    }`}
                                                </div>
                                            </td>

                                            {idx % row_span == 0 && (
                                                <td
                                                    className={'center'}
                                                    rowSpan={row_span}
                                                >
                                                    {controlled &&
                                                        controlled.name}
                                                </td>
                                            )}

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
                    </React.Fragment>
                )}

                {/* Extra Attrs Table */}
                {hasExtraAttrs && (
                    <React.Fragment>
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
                                    <th>
                                        <span style={{ paddingRight: '24px' }}>
                                            {'Operations'}
                                        </span>
                                        <IconButton
                                            style={{
                                                padding: '0',
                                            }}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {extras.map((extra, idx) => {
                                    const rule = DeviceHelper.parseFlagRule(
                                        extra.attr.flags
                                    );

                                    const isEven = idx % 2 != 0;

                                    const classname = clsx([
                                        isEven ? 'even' : 'odd',
                                    ]);

                                    return (
                                        <React.Fragment key={idx}>
                                            <tr className={classname}>
                                                <td className={'center'}>
                                                    {extra.attr.funId}
                                                </td>
                                                <td className={'center'}>
                                                    {extra.attr.dpt}
                                                </td>
                                                <td className={'center'}>
                                                    {extra.attr.suffix ||
                                                        'None'}
                                                </td>
                                                <td className={'center'}>
                                                    {extra.obj &&
                                                        extra.obj.gAddrs[0]}
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
                                                    {extra.attr.name}
                                                </td>
                                                {/*operations*/}
                                                <td className={'center'}>
                                                    <IconButton>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </td>
                                            </tr>
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
                    </React.Fragment>
                )}

                {isSensor && !!sensors.length && (
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

                                const isEven = sensor.ch % 2 == 0;
                                const classname = clsx([
                                    isEven ? 'even' : 'odd',
                                ]);

                                return (
                                    <tr key={idx} className={classname}>
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

                {isGeneralDevice && !!generals.length && (
                    <table>
                        <thead>
                            <tr>
                                {GeneralDeviceAttrTitleList.map(
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
                            {generals.map((general, idx) => {
                                // const rowSpan = sensor.attrs.length;

                                const rule = DeviceHelper.parseFlagRule(
                                    general.attr.flags
                                );

                                const isEven = idx % 2 != 0;

                                const classname = clsx([
                                    isEven ? 'even' : 'odd',
                                ]);

                                return (
                                    <tr key={idx} className={classname}>
                                        <td className={'center'}>
                                            {general.attr.objId}
                                        </td>

                                        <td className={'center'}>
                                            {general.attr.funId}
                                        </td>

                                        <td className={'center'}>
                                            {general.attr.dpt}
                                        </td>

                                        <td className={'center'}>
                                            {general.attr.suffixes || 'None'}
                                        </td>

                                        <td className={'center'}>
                                            {general.obj?.gAddrs &&
                                                general.obj.gAddrs[0]}
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
                                            {general.attr.name}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                {GeneralDeviceAttrTitleList.map(
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

                {hasParentExtraAttrs && (
                    <table>
                        <thead>
                            <tr>
                                {ParentExtractAttrTitleList.map(
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
                            {parentExtraAttrs.map((extra, idx) => {
                                const rule = DeviceHelper.parseFlagRule(
                                    extra.attr.flags
                                );

                                const isEven = idx % 2 == 0;

                                const classname = clsx([
                                    isEven ? 'even' : 'odd',
                                ]);

                                return (
                                    <React.Fragment key={idx}>
                                        <tr>
                                            <td className={'center'}>
                                                {extra.attr.funId}
                                            </td>
                                            <td className={'center'}>
                                                {extra.attr.dpt}
                                            </td>
                                            <td className={'center'}>
                                                {extra.attr.suffixes || 'None'}
                                            </td>
                                            <td className={'center'}>
                                                {extra.obj &&
                                                    extra.obj.gAddrs[0]}
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
                                                {extra.attr.name}
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                {ParentExtractAttrTitleList.map(
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
            </div>
        </div>
    );
};

type SettingTitle =
    | 'ID'
    | 'Button ID'
    | 'Button Type'
    | 'Press Mode'
    | 'Controlled Device'
    | 'Channel ID'
    | 'Device ID'
    | 'Device Name'
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
    'Device Name',
    'Function',
    'Data Type',
    'Sub Attribute',
    'Group Address',
    'R',
    'W',
    'T',
    'Object Name',
    'Response',
    // '',
    // 'Operations',
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
    // 'Operations',
];

const ParentExtractAttrTitleList: SettingTitle[] = [
    'Function',
    'Data Type',
    'Sub Attribute',
    'Group Address',
    'R',
    'W',
    'T',
    'Object Name',
];

const GeneralDeviceAttrTitleList: SettingTitle[] = [
    'ID',
    'Function',
    'Data Type',
    'Sub Attribute',
    'Group Address',
    'R',
    'W',
    'T',
    'Object Name',
];

export default KNXConfiguration;
