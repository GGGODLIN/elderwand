import {
    Checkbox,
    FormControl,
    FormControlLabel,
    IconButton,
    MenuItem,
    Select,
    Switch,
    TextField,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { Pagination } from '@material-ui/lab';
import clsx from 'clsx';
import i18n from 'i18next';
import { produce } from 'immer';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import DeviceHelper, { FlagRule } from 'src/client/domain/device/DeviceHelper';
import DeviceMaintainAPIs from 'src/client/domain/device/DeviceMaintainAPIs';
import DeviceVM, {
    CommObject,
    ProjectVM,
    Protocol,
    SpaceVM,
    SwitchPanelControlInfo,
} from 'src/client/domain/device/DeviceVM';
import FunctionPointTypeVM, {
    DataPointType,
    Suffix,
} from 'src/client/domain/device/FunctionPointTypeVM';
import {
    ButtonAttr,
    ChannelAttr,
    ChannelInfo,
    ExtraAttr,
    Filter,
    GeneralDeviceAttr,
    SensorAttr,
} from 'src/client/domain/device/KnxDataTypes';
import { RootState } from 'src/client/reducer';
import DeviceSlice from 'src/client/slices/DeviceSlice';
import { groupBy } from 'src/client/utils/FunctionUtil';
import StringUtil from 'src/client/utils/StringUtil';
import kws from 'src/client/configs/Keywords';

interface KNXChannel {
    ch: number;
    info: ChannelInfo;
    obj: CommObject;
    attr: ChannelAttr;
    attrs: ChannelAttr[];
}

interface KNXExtra {
    obj: CommObject;
    attr: ExtraAttr;
    // attrs: ChannelAttr[];
}

interface KNXButton {
    obj: CommObject;
    attr: ButtonAttr;
    attrs: ButtonAttr[];
    info: SwitchPanelControlInfo;
}

interface KNXSettingForm {
    address: string;
    filters: Filter[];
    channels: KNXChannel[];
    extras: KNXExtra[];
    buttons: KNXButton[];
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
    const { t } = useTranslation();

    const status_suffix = t(kws.DeviceMaintainPage.Status);

    const project = props.project;
    const space = props.space;
    const device = props.device;
    console.log('KNX device', device)

    const { leaves, functions } = useSelector((state: RootState) => {
        const leaves = state.device.devices.filter(
            (item) => item.parentId == device.id
        );
        return {
            leaves: leaves,
            functions: state.device.function_point_types,
        };
    });
    console.log('leaves', leaves)

    const switchPanelLeaves = getSwitchPanelLeaves(device)
    //console.log('switchPanelLeaves', switchPanelLeaves)

    const helper = new DeviceHelper({ device });
    const { isKNX, protocol } = helper.isKNX();

    if (!isKNX) {
        return null;
    }

    // Physical Address
    const pAddr = !protocol?.commInfo?.pAddr ? '' : protocol.commInfo.pAddr;

    const newFilters = (networkCardCount) => {
        let newFiltersArr = [{ in: null, networkName: 'TP', out: null }]
        if (networkCardCount >= 1) {
            newFiltersArr.push({ in: null, networkName: 'internet', out: null })
        }
        if (networkCardCount >= 2) {
            newFiltersArr.push({ in: null, networkName: 'intranet', out: null })
        }
        return newFiltersArr
    }
    // Filters
    let filters = (
        !protocol?.commInfo?.filters ? newFilters(device?.spec?.networkCardCount) : protocol.commInfo.filters
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

    let channels = [] as KNXChannel[];

    if (isActuator) {
        //console.log('isActuator device', device)
        let deviceAttrs = [...device.attrs]
        let filteredDeviceAttrs = deviceAttrs.filter((attr: ChannelAttr) => !!attr.chId)
        //filteredDeviceAttrs.sort((a, b) => a.chId - b.chId)
        //console.log('deviceAttrs', filteredDeviceAttrs)
        channels = filteredDeviceAttrs
            .map((attr: ChannelAttr) => {
                const attrs = device.attrs.filter(
                    (item: ChannelAttr) => item.chId == attr.chId
                );

                let obj = objects.find((obj) => obj?.objId == attr?.objId);
                if (!obj) {
                    obj = { ch: attr.chId, gAddrs: null, objId: attr?.objId }
                }

                const info = !device.channelInfo
                    ? ({
                        channelNo: attr?.chId,
                        dvId: '',
                    })
                    : device.channelInfo.find(
                        (info: ChannelInfo) => !!info?.channelNo && info?.channelNo === obj?.ch
                    );

                return {
                    ch: attr.chId,
                    attr: attr,
                    attrs: attrs,
                    obj: obj,
                    info: { ...info },
                } as KNXChannel;
            });
        channels.sort((a, b) => a.ch - b.ch)
        //console.log('isActuator', channels)
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
        getSwitchPanelLeaves(device)
        const attrs = device.attrs.filter(
            (attr: ButtonAttr) => !!attr.btn
        );
        console.log('isSwitchPanel', attrs, attrs_page_group)
        buttons = attrs.map((attr: ButtonAttr) => {
            let obj = objects.find(
                (obj: CommObject) => obj?.objId == attr?.objId
            );

            if (!obj) {
                obj = {
                    btn: attr.btn,
                    objId: attr.objId,
                    gAddrs: [],
                } as CommObject;
            }

            const attrs = device.attrs.filter(
                (item) => (item.btn == attr.btn && item.page == attr.page)
            );

            let info = device.switchPanelControlInfo?.find(
                (info) => info.button == attr.btn
            );

            if (!info) {
                info = {
                    button: attr.btn,
                    lPress: attr.lpress,
                    connectionInfo: [],
                } as SwitchPanelControlInfo;
            }

            return {
                attr: attr,
                attrs: attrs,
                obj: obj,
                info: info,
            } as KNXButton;
        });
        // const attrs = attrs_page_group[stateOfSwitchPanel.page].filter(
        //     (attr: ButtonAttr) => !!attr.btn
        // );
        // console.log('isSwitchPanel', attrs)
        // buttons = attrs.map((attr: ButtonAttr) => {
        //     // const page = stateOfSwitchPanel.page;
        //     let obj = objects.find(
        //         (obj: CommObject) => obj?.objId == attr?.objId
        //     );

        //     if (!obj) {
        //         obj = {
        //             btn: attr.btn,
        //             objId: attr.objId,
        //             gAddrs: [],
        //         } as CommObject;
        //     }

        //     const attrs = attrs_page_group[stateOfSwitchPanel.page].filter(
        //         (item) => item.btn == attr.btn
        //     );

        //     let info = device.switchPanelControlInfo?.find(
        //         (info) => info.button == attr.btn
        //     );

        //     if (!info) {
        //         info = {
        //             button: attr.btn,
        //             lPress: attr.lpress,
        //             connectionInfo: [],
        //         } as SwitchPanelControlInfo;
        //     }

        //     return {
        //         attr: attr,
        //         attrs: attrs,
        //         obj: obj,
        //         info: info,
        //     } as KNXButton;
        // });
    }

    // Extra Attrs
    let { hasExtraAttrs, extraAttrs } = helper.hasExtraAttrs(protocol);

    let extras = [];

    if (hasExtraAttrs || isSwitchPanel) {
        extras = extraAttrs;
    }

    // Sensor
    const { isSensor } = helper.isSensor();

    let sensors = [];

    if (isSensor) {
        console.log('isSensor')
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
    console.log('sensors', sensors, objects)

    // Parent ExtraAttrs
    const { hasParentExtraAttrs, parentExtraAttrs } =
        helper.hasParentExtraAttrs(protocol);

    // GeneralDevice
    const { isGeneralDevice } = helper.isGeneralDevice();

    let generals = [];

    if (isGeneralDevice) {
        //console.log('isGeneralDevice device', device)
        generals = objects
            .filter((obj) => obj.ch)
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
    //console.log('generals', generals, objects)

    const defaultValues = {
        address: pAddr,
        filters: filters,
        channels: channels,
        extras: extras,
        buttons: buttons,
    };

    const {
        register,
        control,
        setValue,
        handleSubmit,
        clearErrors,
        setError,
        formState: { errors },
    } = useForm<KNXSettingForm>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: defaultValues,
    });

    const [stateOfSetting, setSetting] = useState({
        setting: {
            ...defaultValues,
        } as KNXSettingForm,
        changed: false,
    });

    const getCanBeUsedObjectID = (): number => {
        let max = 0;

        for (const origin of stateOfSetting.setting.channels) {
            if (origin.attr.objId > max) {
                max = origin.attr.objId;
            }
        }
        for (const origin of stateOfSetting.setting.extras) {
            if (origin.attr.objId > max) {
                max = origin.attr.objId;
            }
        }
        for (const origin of stateOfSetting.setting.buttons) {
            if (origin.attr.objId > max) {
                max = origin.attr.objId;
            }
        }

        const objId = max + 1;

        return objId;
    };

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

    const handleEditChannel = (e) => {
        //console.log('handleEditChannel', e)
        const name = e.target.name;
        const value = e.target.value;

        if (!name) {
            return;
        }

        const values = name.split('.');
        const type = values[0];

        if (type != 'channels') {
            return;
        }

        const ch = values[1];
        const obj = values[2];
        const field = values[3];

        let nextState;

        switch (field) {
            case 'dvId':
                nextState = produce(stateOfSetting, (draft) => {
                    for (
                        let i = 0;
                        i < stateOfSetting.setting.channels.length;
                        i++
                    ) {
                        if (stateOfSetting.setting.channels[i].ch == ch) {
                            if (!draft.setting.channels[i].info) {
                                draft.setting.channels[i].info = {
                                    channelNo: ch,
                                    dvId: '',
                                }
                            }
                            draft.setting.channels[i].info.channelNo = parseInt(ch, 10)
                            draft.setting.channels[i].info.dvId = value;
                        }
                    }
                    draft.changed = true;
                });
                //console.log('handleEditChannel switch dvId nextState', nextState)
                setSetting(nextState);
                break;
            case 'funId':
                nextState = produce(stateOfSetting, (draft) => {
                    draft.changed = true;

                    for (
                        let i = 0;
                        i < stateOfSetting.setting.channels.length;
                        i++
                    ) {
                        const channel = stateOfSetting.setting.channels[i];

                        if (
                            channel.attr.chId == ch &&
                            channel.attr.objId == obj
                        ) {
                            draft.setting.channels[i].attr.funId = value;
                        }
                    }
                });
                setSetting(nextState);
                break;
            case 'dpt':
                nextState = produce(stateOfSetting, (draft) => {
                    draft.changed = true;

                    for (
                        let i = 0;
                        i < stateOfSetting.setting.channels.length;
                        i++
                    ) {
                        const channel = stateOfSetting.setting.channels[i];

                        if (
                            channel.attr.chId == ch &&
                            channel.attr.objId == obj
                        ) {
                            const func = functions.find(
                                (func) => func.value == channel.attr.funId
                            );

                            if (!func) {
                                return;
                            }

                            const dpt = func.dpts.find(
                                (dpt) => dpt.dpt == value
                            );

                            if (!dpt) {
                                return;
                            }

                            draft.setting.channels[i].attr.dpt = dpt.dpt;
                            draft.setting.channels[i].attr.createdRT =
                                dpt.createdRT;
                            draft.setting.channels[i].attr.valueKey =
                                dpt.valueKey;
                            draft.setting.channels[i].attr.valueType =
                                dpt.valueType;
                        }
                    }
                });
                setSetting(nextState);
                break;
            case 'suffix':
                nextState = produce(stateOfSetting, (draft) => {
                    draft.changed = true;
                    for (
                        let i = 0;
                        i < stateOfSetting.setting.channels.length;
                        i++
                    ) {
                        const channel = stateOfSetting.setting.channels[i];
                        if (
                            channel.attr.chId == ch &&
                            channel.attr.objId == obj
                        ) {
                            draft.setting.channels[i].attr.suffix = value;
                        }
                    }
                });
                setSetting(nextState);
                break;
            case 'gAddrs':
                nextState = produce(stateOfSetting, (draft) => {
                    draft.changed = true;
                    for (
                        let i = 0;
                        i < stateOfSetting.setting.channels.length;
                        i++
                    ) {
                        const channel = stateOfSetting.setting.channels[i];
                        if (
                            channel.attr.chId == ch &&
                            channel.attr.objId == obj
                        ) {
                            const addrs = value.split(',');
                            draft.setting.channels[i].obj.gAddrs = addrs;
                        }
                    }
                });
                setSetting(nextState);
                break;
            case 'name':
                nextState = produce(stateOfSetting, (draft) => {
                    draft.changed = true;
                    for (
                        let i = 0;
                        i < stateOfSetting.setting.channels.length;
                        i++
                    ) {
                        const channel = stateOfSetting.setting.channels[i];
                        if (
                            channel.attr.chId == ch &&
                            channel.attr.objId == obj
                        ) {
                            draft.setting.channels[i].attr.name = value;
                        }
                    }
                });
                setSetting(nextState);
                break;
        }
    };

    const handleEditChannelFlag = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;

        if (!name) {
            return;
        }

        const values = name.split('.');
        const ch = values[1];
        const obj = values[2];
        const field = values[3];

        const nextState = produce(stateOfSetting, (draft) => {
            draft.changed = true;

            for (let i = 0; i < draft.setting.channels.length; i++) {
                const channel = draft.setting.channels[i];
                if (channel.attr.chId == ch && channel.attr.objId == obj) {
                    const origin = draft.setting.channels[i].attr.flags;

                    const flags = DeviceHelper.changeFlagRule(
                        origin,
                        field,
                        checked ? 1 : 0
                    );

                    draft.setting.channels[i].attr.flags = flags;
                }
            }
        });

        setSetting(nextState);
    };

    const handleEditChannelAck4Obj = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;

        if (!name) {
            return;
        }

        const values = name.split('.');
        const cid = parseInt(values[1], 10); // channel ID
        const oid = parseInt(values[2], 10); // obj ID

        const nextState = produce(stateOfSetting, (draft) => {
            let temp;

            for (const origin of stateOfSetting.setting.channels) {
                if (origin.attr.chId == cid && origin.attr.objId == oid) {
                    temp = origin;
                }
            }

            const objId = getCanBeUsedObjectID();
            const flags = DeviceHelper.changeFlagRules(temp.attr.flags, [
                { name: 'read', value: 1 },
                { name: 'write', value: 0 },
                { name: 'transmit', value: 1 },
            ]);

            const obj: CommObject = { ch: cid, objId: objId, gAddrs: [] };
            const attr: ChannelAttr = {
                ...temp.attr,
                objId: objId,
                flags: flags,
                ack4Obj: temp.attr.objId,
                ackSet: true,
                name: !temp.attr.name
                    ? ''
                    : `${temp.attr.name} ${status_suffix}`,
            };

            let attrs = [];

            for (const origin of temp.attrs) {
                attrs.push(origin);

                if (origin.objId == oid) {
                    attrs.push(attr);
                }
            }

            const channel: KNXChannel = {
                ch: temp.ch,
                info: temp.info,
                obj: obj,
                attr: attr,
                attrs: attrs,
            };

            let channels = [];

            for (const origin of stateOfSetting.setting.channels) {
                if (origin.attr.chId != cid) {
                    channels.push(origin);
                    continue;
                }

                const latest = { ...origin, attrs: attrs };

                channels.push(latest);

                if (origin?.attr?.chId == cid && origin?.obj?.objId == oid) {
                    channels.push(channel);
                }
            }

            draft.setting.channels = channels;
            draft.changed = true;
        });

        setSetting(nextState);
    };

    const handleAddChannel = (e, value: string) => {
        const name = value;

        if (!name) {
            return;
        }

        const values = name.split('.');
        const cid = parseInt(values[1], 10); // channel ID
        // const oid = values[2]; // obj ID

        const default_flag: FlagRule = {
            priority: 1,
            communication: 1,
            read: 0,
            write: 0,
            read_init: 1,
            transmit: 0,
            update: 1,
        };

        const nextState = produce(stateOfSetting, (draft) => {
            let max = 0;

            for (const origin of device?.attrs) {
                if (origin?.objId > max) {
                    max = origin?.objId;
                }
            }

            const objId = max + 1;
            const flags = DeviceHelper.toFlagNumber(default_flag);

            const obj: CommObject = { ch: cid, objId: objId, gAddrs: [] };
            const attr: ChannelAttr = {
                chId: cid,
                name: '',
                objId: objId,

                funId: '',
                dpt: '',
                flags: flags,
                suffix: null,

                rt: ['bh.r.attr.actuator'],
                createdRT: '',
                valueKey: '',
                valueType: '',
            };
            const info: ChannelInfo =
                stateOfSetting.setting.channels.find(
                    (channel) => channel?.info?.channelNo == cid
                )?.info ||
                ({
                    channelNo: cid,
                    dvId: '',
                } as ChannelInfo);
            //console.log('handleAddChannel info', info)

            let attrs = stateOfSetting.setting.channels
                .filter((channel) => channel.attr.chId == cid)
                .map((channel) => channel.attr);

            attrs.push(attr);

            const channel: KNXChannel = {
                ch: cid,
                info: info,
                obj: obj,
                attr: attr,
                attrs: attrs,
            };

            const channels = [];

            let idx = stateOfSetting.setting.channels.filter(
                (channel) => channel.attr.chId == cid
            ).length;

            for (const origin of stateOfSetting.setting.channels) {
                if (origin.attr.chId != cid) {
                    channels.push(origin);
                    continue;
                }

                const updated = { ...origin, attrs: attrs };

                channels.push(updated);

                // latest
                idx = idx - 1;
                if (idx == 0) {
                    channels.push(channel);
                }
            }

            draft.setting.channels = channels;
            draft.changed = true;
        });

        setSetting(nextState);
    };

    const handleDeleteChannel = (e, value) => {
        const values = value.split('.');
        const cid = parseInt(values[1], 10); // channel ID
        const oid = parseInt(values[2], 10); // obj ID
        const type = values[3];

        const nextState = produce(stateOfSetting, (draft) => {
            let filtered = stateOfSetting.setting.channels.filter(
                (channel) => channel.attr.chId == cid
            );

            switch (type) {
                case 'response':
                    filtered = filtered.filter(
                        (channel) =>
                            channel.attr.objId != oid &&
                            channel.attr.ack4Obj != oid
                    );
                    break;

                case 'request':
                    filtered = filtered.filter(
                        (channel) => channel.attr.objId != oid
                    );
                    break;
            }

            const attrs = filtered.map((channel) => channel.attr);

            const include = filtered.map((channel) => channel.attr.objId);

            const channels = [];

            for (const origin of stateOfSetting.setting.channels) {
                if (origin.attr.chId != cid) {
                    channels.push(origin);
                    continue;
                }

                if (!include.includes(origin.attr.objId)) {
                    continue;
                }

                const dest = {
                    ...origin,
                    attrs: attrs,
                };

                channels.push(dest);
            }

            draft.changed = true;
            draft.setting.channels = channels;
        });

        setSetting(nextState);
    };

    const handleEditExtraAttr = (e) => {
        const name = e.target.name; // `extras.${page}.${oid}.${field}`
        const value = e.target.value;

        if (!name) {
            return;
        }

        const values = name.split('.');
        const type = values[0];

        if (type != 'extras') {
            return;
        }

        const page = values[1];
        const obj = values[2];
        const field = values[3];

        let nextState;

        switch (field) {
            case 'funId':
                nextState = produce(stateOfSetting, (draft) => {
                    draft.changed = true;
                    for (
                        let i = 0;
                        i < stateOfSetting.setting.extras.length;
                        i++
                    ) {
                        const extras = stateOfSetting.setting.extras[i];

                        if (extras.attr.objId == obj) {
                            draft.setting.extras[i].attr.funId = value;
                        }
                    }
                });
                setSetting(nextState);
                break;
            case 'dpt':
                nextState = produce(stateOfSetting, (draft) => {
                    draft.changed = true;

                    for (
                        let i = 0;
                        i < stateOfSetting.setting.extras.length;
                        i++
                    ) {
                        const extras = stateOfSetting.setting.extras[i];

                        if (extras.attr.objId == obj) {
                            const func = functions.find(
                                (func) => func.value == extras.attr.funId
                            );

                            if (!func) {
                                return;
                            }

                            const dpt = func.dpts.find(
                                (dpt) => dpt.dpt == value
                            );

                            if (!dpt) {
                                return;
                            }

                            draft.setting.extras[i].attr.dpt = dpt.dpt;
                            draft.setting.extras[i].attr.createdRT =
                                dpt.createdRT;
                            draft.setting.extras[i].attr.valueKey =
                                dpt.valueKey;
                            draft.setting.extras[i].attr.valueType =
                                dpt.valueType;
                        }
                    }
                });
                setSetting(nextState);
                break;
            case 'suffix':
                nextState = produce(stateOfSetting, (draft) => {
                    draft.changed = true;
                    for (
                        let i = 0;
                        i < stateOfSetting.setting.extras.length;
                        i++
                    ) {
                        const extras = stateOfSetting.setting.extras[i];
                        if (extras.attr.objId == obj) {
                            draft.setting.extras[i].attr.suffix = value;
                        }
                    }
                });
                setSetting(nextState);
                break;
            case 'gAddrs':
                nextState = produce(stateOfSetting, (draft) => {
                    draft.changed = true;

                    let addrs = [];

                    for (
                        let i = 0;
                        i < stateOfSetting.setting.extras.length;
                        i++
                    ) {
                        const extras = stateOfSetting.setting.extras[i];
                        if (extras.attr.objId == obj) {
                            addrs = value.split(',');
                            draft.setting.extras[i].obj.gAddrs = addrs;
                        }
                    }
                });
                setSetting(nextState);

                break;
            case 'name':
                nextState = produce(stateOfSetting, (draft) => {
                    draft.changed = true;
                    for (
                        let i = 0;
                        i < stateOfSetting.setting.extras.length;
                        i++
                    ) {
                        const extras = stateOfSetting.setting.extras[i];
                        if (extras.attr.objId == obj) {
                            draft.setting.extras[i].attr.name = value;
                        }
                    }
                });
                setSetting(nextState);
                break;
        }
    };

    const handleEditExtraAttrFlag = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;

        if (!name) {
            return;
        }

        const values = name.split('.');
        const page = values[1];
        const obj = values[2];
        const field = values[3];

        const nextState = produce(stateOfSetting, (draft) => {
            draft.changed = true;

            for (let i = 0; i < stateOfSetting.setting.extras.length; i++) {
                const extra = stateOfSetting.setting.extras[i];

                if (extra.attr.objId == obj) {
                    const origin = draft.setting.extras[i].attr.flags;

                    const flags = DeviceHelper.changeFlagRule(
                        origin,
                        field,
                        checked ? 1 : 0
                    );

                    draft.setting.extras[i].attr.flags = flags;
                }
            }
        });

        setSetting(nextState);
    };

    const handleAddExtraAttr = (e, value: string) => {
        //console.log('handleAddExtraAttr', value)
        const values = value.split('.');
        const type = values[0];

        if (type != 'extras') {
            return;
        }

        const page = parseInt(values[1], 10);

        const default_flag: FlagRule = {
            priority: 1,
            communication: 1,
            read: 0,
            write: 0,
            read_init: 1,
            transmit: 0,
            update: 1,
        };

        const nextState = produce(stateOfSetting, (draft) => {
            const objId = getCanBeUsedObjectID();
            const flags = DeviceHelper.toFlagNumber(default_flag);

            const obj: CommObject = { objId: objId, gAddrs: [] };
            let attr: ExtraAttr = {
                // chId: cid,
                name: '',
                objId: objId,

                funId: '',
                dpt: '',
                flags: flags,
                suffix: null,

                rt: ['bh.r.attr.actuator'],
                createdRT: '',
                valueKey: '',
                valueType: '',
                page: page
            };

            // if (!!page) {
            //     attr.page = page;
            // }

            const extra: KNXExtra = {
                obj: obj,
                attr: attr,
            };

            const extras = [];

            for (const origin of stateOfSetting.setting.extras) {
                extras.push({ ...origin });
            }
            //console.log('extra', extra)
            extras.push(extra);

            draft.setting.extras = extras;
            draft.changed = true;
        });

        setSetting(nextState);
    };

    /**
     * @param {value} value is extras.{page}.${oid}.
     */
    const handleDeleteExtraAttr = (e, value: string) => {
        const values = value.split('.');
        const type = values[0];

        if (type != 'extras') {
            return;
        }

        const page = parseInt(values[1], 10);
        const obj = parseInt(values[2], 10);

        const nextState = produce(stateOfSetting, (draft) => {
            let extras = [];

            for (const extra of stateOfSetting.setting.extras) {
                if (extra.attr.objId == obj) {
                    continue;
                }

                extras.push(extra);
            }

            draft.changed = true;
            draft.setting.extras = extras;
        });

        setSetting(nextState);
    };

    const handleEditButton = (e) => {
        const name = e.target.name; // `buttons.${page}.${oid}.${field}`
        const value = e.target.value;

        if (!name) {
            return;
        }

        const values = name.split('.');
        const type = values[0];

        if (type != 'buttons') {
            return;
        }

        const page = values[1];
        const obj = values[2];
        const btn = values[3];
        const field = values[4];
        //console.log('handleEditButton value', JSON.parse(value))

        let nextState;

        switch (field) {
            case 'style':
                nextState = produce(stateOfSetting, (draft) => {
                    draft.changed = true;
                    for (
                        let i = 0;
                        i < stateOfSetting.setting.buttons.length;
                        i++
                    ) {
                        const button = stateOfSetting.setting.buttons[i];

                        if (button.attr.objId == obj) {
                            draft.setting.buttons[i].attr.style = value;
                        }
                    }
                });
                setSetting(nextState);
                break;
            case 'controlled':
                nextState = produce(stateOfSetting, (draft) => {
                    // let parsedValue = JSON.parse(value)
                    console.log('parsedValue', value)
                    draft.changed = true;
                    for (
                        let i = 0;
                        i < stateOfSetting.setting.buttons.length;
                        i++
                    ) {
                        const button = stateOfSetting.setting.buttons[i];

                        if (button.attr.btn == btn && button.attr.page == page) {
                            draft.setting.buttons[i].info.connectionInfo = [{ dvId: value?.split('.')?.[0], objectId: parseInt(value?.split('.')?.[1]) }];
                        }
                    }
                });
                console.log('nextState', nextState, btn)
                setSetting(nextState);
                break;
            case 'funId':
                nextState = produce(stateOfSetting, (draft) => {
                    console.log('funId')
                    draft.changed = true;
                    for (
                        let i = 0;
                        i < stateOfSetting.setting.buttons.length;
                        i++
                    ) {
                        const button = stateOfSetting.setting.buttons[i];

                        if (button.attr.objId == obj) {
                            draft.setting.buttons[i].attr.funId = value;
                        }
                    }
                });
                setSetting(nextState);
                break;
            case 'dpt':
                nextState = produce(stateOfSetting, (draft) => {
                    draft.changed = true;

                    for (
                        let i = 0;
                        i < stateOfSetting.setting.buttons.length;
                        i++
                    ) {
                        const button = stateOfSetting.setting.buttons[i];

                        if (button.attr.objId == obj) {
                            const func = functions.find(
                                (func) => func.value == button.attr.funId
                            );

                            if (!func) {
                                return;
                            }

                            const dpt = func.dpts.find(
                                (dpt) => dpt.dpt == value
                            );

                            if (!dpt) {
                                return;
                            }

                            draft.setting.buttons[i].attr.dpt = dpt.dpt;
                            draft.setting.buttons[i].attr.createdRT =
                                dpt.createdRT;
                            draft.setting.buttons[i].attr.valueKey =
                                dpt.valueKey;
                            draft.setting.buttons[i].attr.valueType =
                                dpt.valueType;
                        }
                    }
                });
                setSetting(nextState);
                break;
            case 'suffix':
                nextState = produce(stateOfSetting, (draft) => {
                    draft.changed = true;
                    for (
                        let i = 0;
                        i < stateOfSetting.setting.buttons.length;
                        i++
                    ) {
                        const button = stateOfSetting.setting.buttons[i];
                        if (button.attr.objId == obj) {
                            draft.setting.buttons[i].attr.suffix = value;
                        }
                    }
                });
                setSetting(nextState);
                break;
            case 'gAddrs':
                nextState = produce(stateOfSetting, (draft) => {
                    draft.changed = true;

                    let addrs = [];

                    for (
                        let i = 0;
                        i < stateOfSetting.setting.buttons.length;
                        i++
                    ) {
                        const button = stateOfSetting.setting.buttons[i];
                        if (button.attr.objId == obj) {
                            addrs = value.split(',');
                            draft.setting.buttons[i].obj.gAddrs = addrs;
                        }
                    }
                });
                setSetting(nextState);

                break;
            case 'name':
                nextState = produce(stateOfSetting, (draft) => {
                    draft.changed = true;
                    for (
                        let i = 0;
                        i < stateOfSetting.setting.buttons.length;
                        i++
                    ) {
                        const button = stateOfSetting.setting.buttons[i];
                        if (button.attr.objId == obj) {
                            draft.setting.buttons[i].attr.name = value;
                        }
                    }
                });
                setSetting(nextState);
                break;
        }
    };

    const handleChangeButtonPressModel = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;

        if (!name) {
            return;
        }

        const values = name.split('.');
        const page = values[1];
        const obj = values[2];
        const btn = values[3];
        const field = values[4];

        if (field != 'lpress') {
            return;
        }

        const nextState = produce(stateOfSetting, (draft) => {
            draft.changed = true;

            for (let i = 0; i < stateOfSetting.setting.buttons.length; i++) {
                const button = stateOfSetting.setting.buttons[i];

                if (button.attr.objId == obj) {
                    draft.setting.buttons[i].attr.lpress = checked;
                }
            }
        });

        setSetting(nextState);
    };

    const handleEditButtonAttrFlag = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;

        if (!name) {
            return;
        }

        const values = name.split('.');
        const page = values[1];
        const obj = values[2];
        const field = values[3];

        const nextState = produce(stateOfSetting, (draft) => {
            draft.changed = true;

            for (let i = 0; i < stateOfSetting.setting.buttons.length; i++) {
                const button = stateOfSetting.setting.buttons[i];

                if (button.attr.objId == obj) {
                    const origin = draft.setting.buttons[i].attr.flags;

                    const flags = DeviceHelper.changeFlagRule(
                        origin,
                        field,
                        checked ? 1 : 0
                    );

                    draft.setting.buttons[i].attr.flags = flags;
                }
            }
        });

        setSetting(nextState);
    };

    const handleResetSetting = (e) => {
        setSetting({
            setting: {
                ...defaultValues,
            },
            changed: false,
        });
        clearErrors();
    };

    const handleSubmitSetting = (e) => {
        let new_protocol = JSON.parse(JSON.stringify(protocol)) as Protocol;
        if (!new_protocol?.commInfo) {
            new_protocol.commInfo = {}
        }
        new_protocol.commInfo.filters = stateOfSetting.setting.filters;
        new_protocol.commInfo.pAddr = stateOfSetting.setting.address;

        const objs = [];
        let channelsArr = [...stateOfSetting.setting.channels]
        let newChannelsArr = channelsArr.map((channel) => channel.obj)
        //console.log('newChannelsArr', newChannelsArr, channelsArr)
        newChannelsArr.sort((a, b) => a.ch - b.ch)
        objs.push(
            ...newChannelsArr
        );
        //console.log('objs', objs, newChannelsArr)
        objs.push(...stateOfSetting.setting.extras.map((extra) => extra.obj));

        objs.push(
            ...stateOfSetting.setting.buttons.map((button) => button.obj)
        );

        new_protocol.commInfo.objs = objs;

        const protocols = device.protocols.filter(
            (protocol) => protocol.typeId != 'KNX'
        );

        protocols.push(new_protocol);

        // channels
        const groups = groupBy('channelNo')(
            stateOfSetting.setting.channels.map((channel) => channel.info)
        );

        const channelInfo = [];

        for (const key of Object.keys(groups)) {
            channelInfo.push(groups[key][0]);
        }
        //console.log('channelInfo', groups, channelInfo)

        // switch panel
        const switchPanelControlInfo = [];

        switchPanelControlInfo.push(
            ...stateOfSetting.setting.buttons.map((button) => button.info).filter((item) => item?.connectionInfo?.length >= 1)
        );
        console.log('switchPanelControlInfo', switchPanelControlInfo)

        // attrs
        const attrs = [];
        attrs.push(
            ...stateOfSetting.setting.channels.map((channel) => channel.attr)
        );
        attrs.push(
            ...stateOfSetting.setting.buttons.map((buttons) => buttons.attr)
        );
        attrs.push(...stateOfSetting.setting.extras.map((extra) => extra.attr));

        // sendTelRules
        const sendTelRules = [];
        sendTelRules.push(
            ...stateOfSetting.setting.channels
                .filter((channel) => {
                    const flags = DeviceHelper.parseFlagRule(
                        channel.attr.flags
                    );

                    if (flags.transmit == 1) {
                        return channel;
                    }

                    return;
                })
                .map((channel) => channel.attr.objId)
        );
        sendTelRules.push(
            ...stateOfSetting.setting.buttons
                .filter((button) => {
                    const flags = DeviceHelper.parseFlagRule(button.attr.flags);

                    if (flags.transmit == 1) {
                        return button;
                    }

                    return;
                })
                .map((button) => button.attr.objId)
        );
        sendTelRules.push(
            ...stateOfSetting.setting.extras
                .filter((extra) => {
                    const flags = DeviceHelper.parseFlagRule(extra.attr.flags);

                    if (flags.transmit == 1) {
                        return extra;
                    }

                    return;
                })
                .map((extra) => extra.attr.objId)
        );

        const new_device = {
            ...device,
            protocols: protocols,
            channelInfo: channelInfo,
            switchPanelControlInfo: switchPanelControlInfo,
            attrs: attrs,
            sendTelRules: sendTelRules,
        } as DeviceVM;


        //loop edit embedded device
        channelInfo?.forEach((channel) => {
            if (channel?.dvId && channel?.dvId !== ' ') {
                let targetLeave = device?.leaves?.find((leave) => leave?.dvId === channel?.dvId)
                if (!!targetLeave) {
                    let tempNewAttrs = attrs?.filter((attr) => attr?.chId === channel?.channelNo)

                    let [newAttrs, oldObjIdToNewObjIdTable] = assignNewObjId(tempNewAttrs)

                    const helper = new DeviceHelper({ device: targetLeave });
                    const { protocol } = helper.isKNX();

                    let new_protocol = JSON.parse(JSON.stringify(protocol)) as Protocol;
                    if (!new_protocol?.commInfo) {
                        new_protocol.commInfo = {}
                    }
                    // new_protocol.commInfo.filters = stateOfSetting.setting.filters;
                    // new_protocol.commInfo.pAddr = stateOfSetting.setting.address;

                    const objs = [];
                    let channelsArr = [...stateOfSetting.setting.channels]
                    let newChannelsArr = channelsArr.map((channel) => channel.obj).filter((obj) => obj?.ch === channel?.channelNo)
                    //console.log('newChannelsArr', newChannelsArr, channelsArr)
                    newChannelsArr.sort((a, b) => a.ch - b.ch)
                    newChannelsArr = newChannelsArr.map((item) => ({ ...item, objId: oldObjIdToNewObjIdTable.find((log) => log?.old === item?.objId)?.new }))
                    objs.push(
                        ...newChannelsArr
                    );
                    //console.log('objs', objs, newChannelsArr)
                    objs.push(...stateOfSetting.setting.extras.map((extra) => extra.obj));

                    objs.push(
                        ...stateOfSetting.setting.buttons.map((button) => button.obj)
                    );

                    new_protocol.commInfo.objs = objs;

                    const protocols = targetLeave.protocols.filter(
                        (protocol) => protocol.typeId != 'KNX'
                    );

                    protocols.push(new_protocol);
                    const newEmbedDevice = {
                        ...targetLeave,
                        attrs: newAttrs,
                        protocols: protocols,
                    } as DeviceVM;
                    DeviceMaintainAPIs.editDeviceProtocols(
                        dispatch,
                        project,
                        newEmbedDevice,
                        (data) => {

                        }
                    );
                }
            }

        })
        //return console.log('new_device', new_device)
        DeviceMaintainAPIs.editDeviceProtocols(
            dispatch,
            project,
            new_device,
            (data) => {
                DeviceMaintainAPIs.fetchDeviceTopologyResources(
                    dispatch,
                    project,
                    () => {
                        dispatch(
                            DeviceSlice.editDeviceSetting({
                                ...data,
                                project,
                                space,
                            })
                        );
                    }
                );
            }
        );
    };

    useEffect(() => {
        setSetting({
            setting: {
                ...defaultValues,
            },
            changed: false,
        });
        return () => {
            // effect;
        };
    }, [device]);

    let previous = 0;
    let channel_start = false;
    let isEven = false;
    console.log('stateOfSetting', stateOfSetting, stateOfSetting.setting.buttons.filter((item) => item?.attr?.page === stateOfSwitchPanel.page))
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
                                                    /^\d+\.\d+\.\d+$/,
                                                    'gm'
                                                ),
                                                message:
                                                    'pattern rule is \\d+.\\d+.\\d+',
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
                        <label className="group-label-second">
                            {'(Blocking message by group address, e.g. 1, 2-4, 5/1, 5/2-5/5, 6/1/1, 6/2/1-6/3/123)'}
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
                                                    label={'In'}
                                                    value={filter.in}
                                                    // value={filters[idx].in}
                                                    onChange={
                                                        handleChangeFilter
                                                    }
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
                                                                        'pattern rule is \\d+',
                                                                },
                                                            }
                                                        ),
                                                    }}
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
                                                />
                                                <TextField
                                                    variant="outlined"
                                                    size={'small'}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    required={false}
                                                    label="Out"
                                                    // value={filter.out}
                                                    value={
                                                        stateOfSetting.setting
                                                            .filters[idx].out
                                                    }
                                                    onChange={
                                                        handleChangeFilter
                                                    }
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
                                                                        'pattern rule is \\d+',
                                                                },
                                                            }
                                                        ),
                                                    }}
                                                // TODO Fix
                                                // error={
                                                //     !!errors?.filters
                                                //         ?.length &&
                                                //     !!errors.filters[idx]
                                                //         ?.out
                                                // }
                                                // helperText={
                                                //     !!errors?.filters
                                                //         ?.length &&
                                                //     !!errors.filters[idx]
                                                //         ?.out
                                                //         ? ' '
                                                //         : errors.filters[
                                                //               idx
                                                //           ].out.message
                                                // }
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
            {/* KNX Channels */}
            <div className="KNX-setting">
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
                            {stateOfSetting.setting.channels.map(
                                (channel, idx) => {
                                    channel_start = false;


                                    if (previous != channel.attr.chId) {
                                        channel_start = true;
                                        previous = channel.attr.chId;
                                        isEven = !isEven;
                                    }

                                    const row_span = channel.attrs.length;

                                    const classname = clsx([
                                        isEven ? 'even' : 'odd',
                                    ]);

                                    const rule = DeviceHelper.parseFlagRule(
                                        channel.attr.flags
                                    );

                                    const bound = leaves.find(
                                        (leaf) => leaf.dvId == channel?.info?.dvId
                                    );

                                    const fpts: FunctionPointTypeVM[] =
                                        functions;

                                    const fpt = functions.find(
                                        (fpt) => fpt.value == channel.attr.funId
                                    );

                                    const dpts: DataPointType[] = !fpt
                                        ? []
                                        : fpt.dpts;

                                    const dpt = dpts.find(
                                        (dpt) => dpt.dpt == channel.attr.dpt
                                    );

                                    const suffixes: Suffix[] = !dpt
                                        ? []
                                        : dpt.suffixes;

                                    const cid = channel.ch;
                                    const oid = channel?.obj?.objId ?? channel?.attr?.objId;
                                    const key = `channels.${cid}.${oid}`;

                                    const ack4Objs = channel.attrs.filter(
                                        (attr) =>
                                            attr.ack4Obj == channel.attr.objId
                                    );

                                    const id = `channels.${cid}.${oid}.${channel.attrs.length}`;

                                    return (
                                        <tr
                                            key={key}
                                            id={id}
                                            className={classname}
                                        >
                                            {channel_start && (
                                                <td
                                                    className={'center'}
                                                    rowSpan={row_span}
                                                >
                                                    {`${channel.attr.chId}`}
                                                </td>
                                            )}

                                            {channel_start && (
                                                <td
                                                    className={'center'}
                                                    rowSpan={row_span}
                                                >
                                                    {/*{bound && bound.name}*/}
                                                    <FormControl
                                                        variant={'outlined'}
                                                        size={'small'}
                                                        fullWidth={true}
                                                    >
                                                        <Select
                                                            className={
                                                                'device-selector'
                                                            }
                                                            value={
                                                                !bound
                                                                    ? ' '
                                                                    : bound.dvId
                                                            }
                                                            name={`${key}.dvId`}
                                                            onChange={
                                                                handleEditChannel
                                                            }
                                                        >
                                                            <MenuItem
                                                                value={' '}
                                                            >
                                                                <div>
                                                                    <span>
                                                                        {
                                                                            'Select...'
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </MenuItem>
                                                            {leaves.map(
                                                                (leaf) => {
                                                                    return (
                                                                        <MenuItem
                                                                            key={
                                                                                leaf.dvId
                                                                            }
                                                                            value={
                                                                                leaf.dvId
                                                                            }
                                                                        >
                                                                            <div>
                                                                                <span>
                                                                                    {
                                                                                        leaf.name
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        </MenuItem>
                                                                    );
                                                                }
                                                            )}
                                                        </Select>
                                                        {/*<FormHelperText>{` `}</FormHelperText>*/}
                                                    </FormControl>
                                                </td>
                                            )}

                                            <td className={'center'}>
                                                {/*{channel.attr.funId}*/}
                                                <FormControl
                                                    variant={'outlined'}
                                                    size={'small'}
                                                    fullWidth={true}
                                                >
                                                    <Select
                                                        className={
                                                            'fpt-selector'
                                                        }
                                                        value={
                                                            channel.attr
                                                                .funId || ' '
                                                        }
                                                        name={`${key}.funId`}
                                                        onChange={
                                                            handleEditChannel
                                                        }
                                                    >
                                                        <MenuItem value={' '}>
                                                            <div>
                                                                <span>
                                                                    {
                                                                        'Select...'
                                                                    }
                                                                </span>
                                                            </div>
                                                        </MenuItem>
                                                        {fpts.map((fpt) => {
                                                            return (
                                                                <MenuItem
                                                                    key={
                                                                        fpt.value
                                                                    }
                                                                    value={
                                                                        fpt.value
                                                                    }
                                                                >
                                                                    <div>
                                                                        <span>
                                                                            {
                                                                                fpt.name
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </MenuItem>
                                                            );
                                                        })}
                                                    </Select>
                                                </FormControl>
                                            </td>
                                            <td className={'center'}>
                                                {/*{channel.attr.dpt}*/}
                                                <FormControl
                                                    variant={'outlined'}
                                                    size={'small'}
                                                    fullWidth={true}
                                                >
                                                    <Select
                                                        className={
                                                            'dpt-selector'
                                                        }
                                                        value={
                                                            channel.attr.dpt ||
                                                            ' '
                                                        }
                                                        name={`${key}.dpt`}
                                                        onChange={
                                                            handleEditChannel
                                                        }
                                                    >
                                                        <MenuItem value={' '}>
                                                            <div>
                                                                <span>
                                                                    {
                                                                        'Select...'
                                                                    }
                                                                </span>
                                                            </div>
                                                        </MenuItem>
                                                        {dpts.map((dpt) => {
                                                            return (
                                                                <MenuItem
                                                                    key={
                                                                        dpt.dpt
                                                                    }
                                                                    value={
                                                                        dpt.dpt
                                                                    }
                                                                >
                                                                    <div>
                                                                        <span>
                                                                            {`${dpt.dpt} ${dpt.name}`}
                                                                        </span>
                                                                    </div>
                                                                </MenuItem>
                                                            );
                                                        })}
                                                    </Select>
                                                </FormControl>
                                            </td>
                                            <td className={'center'}>
                                                {/*{channel.attr.suffix || 'None'}*/}
                                                <FormControl
                                                    variant={'outlined'}
                                                    size={'small'}
                                                    fullWidth={true}
                                                >
                                                    <Select
                                                        className={
                                                            'suffix-selector'
                                                        }
                                                        value={
                                                            channel.attr
                                                                .suffix || ' '
                                                        }
                                                        name={`${key}.suffix`}
                                                        onChange={
                                                            handleEditChannel
                                                        }
                                                    >
                                                        <MenuItem value={' '}>
                                                            <div>
                                                                <span>
                                                                    {'None'}
                                                                </span>
                                                            </div>
                                                        </MenuItem>
                                                        {suffixes.map(
                                                            (suffix) => {
                                                                return (
                                                                    <MenuItem
                                                                        key={
                                                                            suffix.value
                                                                        }
                                                                        value={
                                                                            suffix.value
                                                                        }
                                                                    >
                                                                        <div>
                                                                            <span>
                                                                                {`${suffix.name}`}
                                                                            </span>
                                                                        </div>
                                                                    </MenuItem>
                                                                );
                                                            }
                                                        )}
                                                    </Select>
                                                </FormControl>
                                            </td>
                                            <td className={'center'}>
                                                {/*{channel.obj &&*/}
                                                {/*    channel.obj.gAddrs[0]}*/}
                                                <div className={'address'}>
                                                    <TextField
                                                        // label="Address"
                                                        variant="outlined"
                                                        size={'small'}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        value={channel?.obj?.gAddrs?.join?.(
                                                            ','
                                                        )}
                                                        onChange={
                                                            handleEditChannel
                                                        }
                                                        required={false}
                                                        disabled={false}
                                                        // name={`channels.${cid}.${oid}.gAddrs`}
                                                        inputProps={{
                                                            ...register(
                                                                // @ts-ignore
                                                                `channels.${cid}.${oid}.gAddrs`,
                                                                {}
                                                            ),
                                                        }}
                                                        error={
                                                            errors?.channels
                                                                ?.length &&
                                                            !!errors?.channels[
                                                            cid
                                                            ] &&
                                                            !!errors?.channels[
                                                            cid
                                                            ][oid] &&
                                                            !!errors?.channels[
                                                                cid
                                                            ][oid].gAddrs
                                                        }
                                                        helperText={
                                                            errors?.channels
                                                                ?.length &&
                                                            errors?.channels[
                                                            cid
                                                            ] &&
                                                            errors?.channels[
                                                            cid
                                                            ][oid] &&
                                                            errors?.channels[
                                                                cid
                                                            ][oid].gAddrs
                                                                .message
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td className={'center'}>
                                                {/*{rule.read}*/}
                                                <FormControlLabel
                                                    className={'read'}
                                                    label=""
                                                    control={
                                                        <Checkbox
                                                            checked={
                                                                !!rule.read
                                                            }
                                                            name={`${key}.read`}
                                                            disabled={false}
                                                        />
                                                    }
                                                    onChange={
                                                        handleEditChannelFlag
                                                    }
                                                />
                                            </td>
                                            <td className={'center'}>
                                                {/*{rule.write}*/}
                                                <FormControlLabel
                                                    className={'write'}
                                                    label=""
                                                    control={
                                                        <Checkbox
                                                            checked={
                                                                !!rule.write
                                                            }
                                                            name={`${key}.write`}
                                                            disabled={false}
                                                        />
                                                    }
                                                    onChange={
                                                        handleEditChannelFlag
                                                    }
                                                />
                                            </td>
                                            <td className={'center'}>
                                                {/*{rule.transmit}*/}
                                                <FormControlLabel
                                                    className={'transmit'}
                                                    label=""
                                                    control={
                                                        <Checkbox
                                                            checked={
                                                                !!rule.transmit
                                                            }
                                                            name={`${key}.transmit`}
                                                            disabled={false}
                                                        />
                                                    }
                                                    onChange={
                                                        handleEditChannelFlag
                                                    }
                                                />
                                            </td>
                                            <td className={'center'}>
                                                {/*{channel.attr.name}*/}
                                                <TextField
                                                    variant="outlined"
                                                    size={'small'}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={channel.attr.name}
                                                    onChange={handleEditChannel}
                                                    disabled={false}
                                                    inputProps={{
                                                        ...register(
                                                            // @ts-ignore
                                                            `channels.${cid}.${oid}.name`,
                                                            {}
                                                        ),
                                                    }}
                                                />
                                            </td>
                                            <td className={'center'}>
                                                {/*{`${channel.attr.ack4Obj} / ${channel.attr.ackSet}`}*/}
                                                {!channel.attr.ack4Obj ? (
                                                    <div className={'response'}>
                                                        <div className={'res'}>
                                                            <KeyboardReturnIcon />
                                                        </div>
                                                        <div>
                                                            <FormControlLabel
                                                                label=""
                                                                control={
                                                                    <Checkbox
                                                                        name={`${key}.ack4Obj`}
                                                                        checked={
                                                                            ack4Objs.length >=
                                                                            1
                                                                        }
                                                                        disabled={
                                                                            ack4Objs.length >=
                                                                            1
                                                                        }
                                                                    />
                                                                }
                                                                onChange={
                                                                    handleEditChannelAck4Obj
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className={'response'}>
                                                        <div className={'req'}>
                                                            <KeyboardReturnIcon />
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                            {/*operations*/}
                                            <td style={{ textAlign: 'center' }}>
                                                <IconButton
                                                    onClick={(e) => {
                                                        const type = !channel
                                                            .attr.ack4Obj
                                                            ? 'response'
                                                            : 'request';
                                                        const value = `channels.${cid}.${oid}.${type}`;
                                                        handleDeleteChannel(
                                                            e,
                                                            value
                                                        );
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </td>
                                            {channel_start && (
                                                <td
                                                    className={'center'}
                                                    rowSpan={row_span}
                                                >
                                                    <IconButton
                                                        onClick={(e) => {
                                                            const value = `channels.${cid}`;
                                                            handleAddChannel(
                                                                e,
                                                                value
                                                            );
                                                        }}
                                                    >
                                                        <AddIcon />
                                                    </IconButton>
                                                </td>
                                            )}
                                        </tr>
                                    );
                                }
                            )}
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
                {/* SwitchPanel Table */}
                {isSwitchPanel && (
                    <React.Fragment>
                        <table>
                            <thead>
                                <tr>
                                    <th
                                        colSpan={
                                            SwitchPanelSettingTitleList.length
                                        }
                                        className={'title'}
                                    >
                                        {'Button Attributes'}
                                    </th>
                                </tr>
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
                                {stateOfSetting.setting.buttons.filter((item) => item?.attr?.page === stateOfSwitchPanel.page).map(
                                    (button, idx) => {
                                        //console.log('button', button)
                                        const row_span =
                                            button?.attrs?.length || 0;

                                        const rule = DeviceHelper.parseFlagRule(
                                            button.attr.flags
                                        );

                                        let isEven = button.attr.btn % 2 == 0;

                                        const classname = clsx([
                                            isEven ? 'even' : 'odd',
                                        ]);

                                        // TODO multi selector
                                        const controlled = getControlledAttr(switchPanelLeaves, button.info?.connectionInfo?.[0])
                                        console.log(`controlled-${button.attr.btn}`, controlled, button)

                                        const fpts: FunctionPointTypeVM[] =
                                            functions;

                                        const fpt = functions.find(
                                            (fpt) =>
                                                fpt.value == button.attr.funId
                                        );

                                        const dpts: DataPointType[] = !fpt
                                            ? []
                                            : fpt.dpts;

                                        const dpt = dpts.find(
                                            (dpt) => dpt.dpt == button.attr.dpt
                                        );

                                        const suffixes: Suffix[] = !dpt
                                            ? []
                                            : dpt.suffixes;

                                        const page = button.attr.page || 0;
                                        const oid = button.attr.objId;
                                        const btn = button.attr.btn;
                                        const key = `buttons.${page}.${oid}.${btn}`;

                                        return (
                                            <tr key={idx} className={classname}>
                                                {/* {idx % row_span == 0 && (
                                                    <td
                                                        className={'center'}
                                                        rowSpan={row_span}
                                                    >
                                                        {button.attr.bIdx ||
                                                            button.attr.btn}
                                                    </td>
                                                )} */}

                                                {(button?.attrs?.[0]?.objId === button?.attr?.objId) && (
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
                                                    <FormControl
                                                        variant={'outlined'}
                                                        size={'small'}
                                                        fullWidth={true}
                                                    >
                                                        <Select
                                                            className={
                                                                'btn-type-selector'
                                                            }
                                                            value={
                                                                button.attr
                                                                    .style
                                                            }
                                                            name={`${key}.style`}
                                                            onChange={
                                                                handleEditButton
                                                            }
                                                        >
                                                            <MenuItem
                                                                value={' '}
                                                            >
                                                                <div>
                                                                    <span>
                                                                        {
                                                                            'Select...'
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </MenuItem>
                                                            {ButtonTypes.map(
                                                                (item) => {
                                                                    return (
                                                                        <MenuItem
                                                                            key={
                                                                                item.value
                                                                            }
                                                                            value={
                                                                                item.value
                                                                            }
                                                                        >
                                                                            <div>
                                                                                <span>
                                                                                    {
                                                                                        item.name
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        </MenuItem>
                                                                    );
                                                                }
                                                            )}
                                                        </Select>
                                                    </FormControl>
                                                </td>

                                                <td>
                                                    <div>{'Short'}</div>
                                                    <div>
                                                        {'Long'}
                                                        <Switch
                                                            checked={
                                                                button.attr
                                                                    .lpress
                                                            }
                                                            onChange={
                                                                handleChangeButtonPressModel
                                                            }
                                                            color="primary"
                                                            name={`${key}.lpress`}
                                                            inputProps={{}}
                                                        />
                                                    </div>
                                                </td>

                                                {(button?.attrs?.[0]?.objId === button?.attr?.objId) && (
                                                    <td
                                                        className={'center'}
                                                        rowSpan={row_span}
                                                    >
                                                        {/* <div
                                                            data-dvId={
                                                                controlled.dvId
                                                            }
                                                        >
                                                            {
                                                                controlled.name
                                                            }
                                                        </div> */}
                                                        <FormControl
                                                            variant={'outlined'}
                                                            size={'small'}
                                                            fullWidth={true}
                                                        >
                                                            <Select
                                                                className={
                                                                    'fpt-selector'
                                                                }
                                                                value={
                                                                    !!controlled ? `${controlled?.dvId}.${controlled?.objId}` : ' '
                                                                }
                                                                name={`${key}.controlled`}
                                                                onChange={
                                                                    handleEditButton
                                                                }
                                                            >
                                                                <MenuItem
                                                                    value={' '}
                                                                >
                                                                    <div>
                                                                        <span>
                                                                            {
                                                                                'Select...'
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </MenuItem>
                                                                {getControlledAttrs(switchPanelLeaves, button?.attr?.createdRT).map((leave) => {

                                                                    return (
                                                                        <MenuItem
                                                                            key={
                                                                                leave.dvId
                                                                            }
                                                                            value={
                                                                                `${leave?.dvId}.${leave?.objId}`
                                                                            }
                                                                        >
                                                                            <div>
                                                                                <span>
                                                                                    {
                                                                                        leave?.pickerName
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        </MenuItem>
                                                                    );
                                                                })}
                                                            </Select>
                                                        </FormControl>
                                                    </td>
                                                )}

                                                <td className={'center'}>
                                                    <FormControl
                                                        variant={'outlined'}
                                                        size={'small'}
                                                        fullWidth={true}
                                                    >
                                                        <Select
                                                            className={
                                                                'fpt-selector'
                                                            }
                                                            value={
                                                                button.attr
                                                                    .funId ||
                                                                ' '
                                                            }
                                                            name={`${key}.funId`}
                                                            onChange={
                                                                handleEditButton
                                                            }
                                                        >
                                                            <MenuItem
                                                                value={' '}
                                                            >
                                                                <div>
                                                                    <span>
                                                                        {
                                                                            'Select...'
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </MenuItem>
                                                            {fpts.map((fpt) => {
                                                                return (
                                                                    <MenuItem
                                                                        key={
                                                                            fpt.value
                                                                        }
                                                                        value={
                                                                            fpt.value
                                                                        }
                                                                    >
                                                                        <div>
                                                                            <span>
                                                                                {
                                                                                    fpt.name
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </MenuItem>
                                                                );
                                                            })}
                                                        </Select>
                                                    </FormControl>
                                                </td>

                                                <td className={'center'}>
                                                    {/*{extra.attr.dpt}*/}
                                                    <FormControl
                                                        variant={'outlined'}
                                                        size={'small'}
                                                        fullWidth={true}
                                                    >
                                                        <Select
                                                            className={
                                                                'dpt-selector'
                                                            }
                                                            value={
                                                                button.attr
                                                                    .dpt || ' '
                                                            }
                                                            name={`${key}.dpt`}
                                                            onChange={
                                                                handleEditButton
                                                            }
                                                        >
                                                            <MenuItem
                                                                value={' '}
                                                            >
                                                                <div>
                                                                    <span>
                                                                        {
                                                                            'Select...'
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </MenuItem>
                                                            {dpts.map((dpt) => {
                                                                return (
                                                                    <MenuItem
                                                                        key={
                                                                            dpt.dpt
                                                                        }
                                                                        value={
                                                                            dpt.dpt
                                                                        }
                                                                    >
                                                                        <div>
                                                                            <span>
                                                                                {`${dpt.dpt} ${dpt.name}`}
                                                                            </span>
                                                                        </div>
                                                                    </MenuItem>
                                                                );
                                                            })}
                                                        </Select>
                                                    </FormControl>
                                                </td>

                                                <td className={'center'}>
                                                    <FormControl
                                                        variant={'outlined'}
                                                        size={'small'}
                                                        fullWidth={true}
                                                    >
                                                        <Select
                                                            className={
                                                                'suffix-selector'
                                                            }
                                                            value={
                                                                button.attr
                                                                    .suffix ||
                                                                ' '
                                                            }
                                                            name={`${key}.suffix`}
                                                            onChange={
                                                                handleEditButton
                                                            }
                                                        >
                                                            <MenuItem
                                                                value={' '}
                                                            >
                                                                <div>
                                                                    <span>
                                                                        {'None'}
                                                                    </span>
                                                                </div>
                                                            </MenuItem>
                                                            {suffixes.map(
                                                                (suffix) => {
                                                                    return (
                                                                        <MenuItem
                                                                            key={
                                                                                suffix.value
                                                                            }
                                                                            value={
                                                                                suffix.value
                                                                            }
                                                                        >
                                                                            <div>
                                                                                <span>
                                                                                    {`${suffix.name}`}
                                                                                </span>
                                                                            </div>
                                                                        </MenuItem>
                                                                    );
                                                                }
                                                            )}
                                                        </Select>
                                                    </FormControl>
                                                </td>

                                                <td className={'center'}>
                                                    <div className={'address'}>
                                                        <TextField
                                                            // label="Address"
                                                            variant="outlined"
                                                            size={'small'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            value={button.obj?.gAddrs.join(
                                                                ','
                                                            )}
                                                            onChange={
                                                                handleEditButton
                                                            }
                                                            required={false}
                                                            disabled={false}
                                                            // name={`extras.${page}.${oid}.gAddrs`}
                                                            inputProps={{
                                                                ...register(
                                                                    // @ts-ignore
                                                                    `${key}.gAddrs`,
                                                                    {
                                                                        pattern:
                                                                        {
                                                                            value: new RegExp(
                                                                                /(\d+\/\d+\/\d+,)|(\d+\/\d+\/\d+$)/,
                                                                                'gm'
                                                                            ),
                                                                            message:
                                                                                'rule is \\d+\\/\\d+\\/\\d+',
                                                                        },
                                                                    }
                                                                ),
                                                            }}
                                                            error={
                                                                !!errors.buttons
                                                                    ?.length &&
                                                                !!errors
                                                                    .buttons[
                                                                page
                                                                ] &&
                                                                !!errors
                                                                    .buttons[
                                                                page
                                                                ][oid] &&
                                                                !!errors
                                                                    .buttons[
                                                                    page
                                                                ][oid]?.gAddrs
                                                            }
                                                            helperText={
                                                                !!errors.buttons
                                                                    ?.length &&
                                                                !!errors
                                                                    .buttons[
                                                                page
                                                                ] &&
                                                                !!errors
                                                                    .buttons[
                                                                page
                                                                ][oid] &&
                                                                errors.buttons[
                                                                    page
                                                                ][oid]?.gAddrs
                                                                    ?.message
                                                            }
                                                        />
                                                    </div>
                                                </td>

                                                <td className={'center'}>
                                                    {/*{rule.read}*/}
                                                    <FormControlLabel
                                                        className={'read'}
                                                        label=""
                                                        control={
                                                            <Checkbox
                                                                checked={
                                                                    !!rule.read
                                                                }
                                                                name={`${key}.read`}
                                                                disabled={false}
                                                            />
                                                        }
                                                        onChange={
                                                            handleEditButtonAttrFlag
                                                        }
                                                    />
                                                </td>

                                                <td className={'center'}>
                                                    {/*{rule.write}*/}
                                                    <FormControlLabel
                                                        className={'write'}
                                                        label=""
                                                        control={
                                                            <Checkbox
                                                                checked={
                                                                    !!rule.write
                                                                }
                                                                name={`${key}.write`}
                                                                disabled={false}
                                                            />
                                                        }
                                                        onChange={
                                                            handleEditButtonAttrFlag
                                                        }
                                                    />
                                                </td>

                                                <td className={'center'}>
                                                    {/*{rule.transmit}*/}
                                                    <FormControlLabel
                                                        className={'transmit'}
                                                        label=""
                                                        control={
                                                            <Checkbox
                                                                checked={
                                                                    !!rule.transmit
                                                                }
                                                                name={`${key}.transmit`}
                                                                disabled={false}
                                                            />
                                                        }
                                                        onChange={
                                                            handleEditButtonAttrFlag
                                                        }
                                                    />
                                                </td>

                                                <td className={'center'}>
                                                    {/*{button.attr.name}*/}
                                                    <TextField
                                                        variant="outlined"
                                                        size={'small'}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        value={button.attr.name}
                                                        onChange={
                                                            handleEditButton
                                                        }
                                                        disabled={false}
                                                        inputProps={{
                                                            ...register(
                                                                // @ts-ignore
                                                                `${key}.name`,
                                                                {}
                                                            ),
                                                        }}
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
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
                    </React.Fragment>
                )}
                {/* Extra Attrs Table */}
                {(hasExtraAttrs || isSwitchPanel) && (
                    <React.Fragment>
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan={9} className={'title'}>
                                        {'Extra Attributes'}
                                    </th>
                                </tr>
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
                                            onClick={(e) => {
                                                const idx =
                                                    stateOfSwitchPanel.page;
                                                const page = isSwitchPanel
                                                    ? idx
                                                    : 0;
                                                const value = `extras.${page}`;
                                                handleAddExtraAttr(e, value);
                                            }}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {stateOfSetting.setting.extras
                                    .filter(
                                        (extra) => isSwitchPanel ?
                                            (extra.attr.page ==
                                                stateOfSwitchPanel.page) : true
                                    )
                                    .map((extra: KNXExtra, idx) => {
                                        const rule = DeviceHelper.parseFlagRule(
                                            extra.attr.flags
                                        );

                                        const isEven = idx % 2 == 0;

                                        const classname = clsx([
                                            isEven ? 'even' : 'odd',
                                        ]);

                                        const fpts: FunctionPointTypeVM[] =
                                            functions;

                                        const fpt = functions.find(
                                            (fpt) =>
                                                fpt.value == extra.attr.funId
                                        );

                                        const dpts: DataPointType[] = !fpt
                                            ? []
                                            : fpt.dpts;

                                        const dpt = dpts.find(
                                            (dpt) => dpt.dpt == extra.attr.dpt
                                        );

                                        const suffixes: Suffix[] = !dpt
                                            ? []
                                            : dpt.suffixes;

                                        const page = extra.attr.page || 0;
                                        const oid = extra.attr.objId;
                                        const key = `extras.${page}.${oid}`;

                                        return (
                                            <React.Fragment key={key}>
                                                <tr className={classname}>
                                                    <td className={'center'}>
                                                        {/*{extra.attr.funId}*/}
                                                        <FormControl
                                                            variant={'outlined'}
                                                            size={'small'}
                                                            fullWidth={true}
                                                        >
                                                            <Select
                                                                className={
                                                                    'fpt-selector'
                                                                }
                                                                value={
                                                                    extra.attr
                                                                        .funId ||
                                                                    ' '
                                                                }
                                                                name={`${key}.funId`}
                                                                onChange={
                                                                    handleEditExtraAttr
                                                                }
                                                            >
                                                                <MenuItem
                                                                    value={' '}
                                                                >
                                                                    <div>
                                                                        <span>
                                                                            {
                                                                                'Select...'
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </MenuItem>
                                                                {fpts.map(
                                                                    (fpt) => {
                                                                        return (
                                                                            <MenuItem
                                                                                key={
                                                                                    fpt.value
                                                                                }
                                                                                value={
                                                                                    fpt.value
                                                                                }
                                                                            >
                                                                                <div>
                                                                                    <span>
                                                                                        {
                                                                                            fpt.name
                                                                                        }
                                                                                    </span>
                                                                                </div>
                                                                            </MenuItem>
                                                                        );
                                                                    }
                                                                )}
                                                            </Select>
                                                        </FormControl>
                                                    </td>
                                                    <td className={'center'}>
                                                        {/*{extra.attr.dpt}*/}
                                                        <FormControl
                                                            variant={'outlined'}
                                                            size={'small'}
                                                            fullWidth={true}
                                                        >
                                                            <Select
                                                                className={
                                                                    'dpt-selector'
                                                                }
                                                                value={
                                                                    extra.attr
                                                                        .dpt ||
                                                                    ' '
                                                                }
                                                                name={`${key}.dpt`}
                                                                onChange={
                                                                    handleEditExtraAttr
                                                                }
                                                            >
                                                                <MenuItem
                                                                    value={' '}
                                                                >
                                                                    <div>
                                                                        <span>
                                                                            {
                                                                                'Select...'
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </MenuItem>
                                                                {dpts.map(
                                                                    (dpt) => {
                                                                        return (
                                                                            <MenuItem
                                                                                key={
                                                                                    dpt.dpt
                                                                                }
                                                                                value={
                                                                                    dpt.dpt
                                                                                }
                                                                            >
                                                                                <div>
                                                                                    <span>
                                                                                        {`${dpt.dpt} ${dpt.name}`}
                                                                                    </span>
                                                                                </div>
                                                                            </MenuItem>
                                                                        );
                                                                    }
                                                                )}
                                                            </Select>
                                                        </FormControl>
                                                    </td>
                                                    <td className={'center'}>
                                                        {/*{extra.attr.suffix || 'None'}*/}
                                                        <FormControl
                                                            variant={'outlined'}
                                                            size={'small'}
                                                            fullWidth={true}
                                                        >
                                                            <Select
                                                                className={
                                                                    'suffix-selector'
                                                                }
                                                                value={
                                                                    extra.attr
                                                                        .suffix ||
                                                                    ' '
                                                                }
                                                                name={`${key}.suffix`}
                                                                onChange={
                                                                    handleEditExtraAttr
                                                                }
                                                            >
                                                                <MenuItem
                                                                    value={' '}
                                                                >
                                                                    <div>
                                                                        <span>
                                                                            {
                                                                                'None'
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </MenuItem>
                                                                {suffixes.map(
                                                                    (
                                                                        suffix
                                                                    ) => {
                                                                        return (
                                                                            <MenuItem
                                                                                key={
                                                                                    suffix.value
                                                                                }
                                                                                value={
                                                                                    suffix.value
                                                                                }
                                                                            >
                                                                                <div>
                                                                                    <span>
                                                                                        {`${suffix.name}`}
                                                                                    </span>
                                                                                </div>
                                                                            </MenuItem>
                                                                        );
                                                                    }
                                                                )}
                                                            </Select>
                                                        </FormControl>
                                                    </td>
                                                    <td className={'center'}>
                                                        {/*{extra.obj && extra.obj.gAddrs[0]}*/}
                                                        <div
                                                            className={
                                                                'address'
                                                            }
                                                        >
                                                            <TextField
                                                                // label="Address"
                                                                variant="outlined"
                                                                size={'small'}
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                                value={extra.obj?.gAddrs?.join?.(
                                                                    ','
                                                                )}
                                                                onChange={
                                                                    handleEditExtraAttr
                                                                }
                                                                required={false}
                                                                disabled={false}
                                                                // name={`extras.${page}.${oid}.gAddrs`}
                                                                inputProps={{
                                                                    ...register(
                                                                        // @ts-ignore
                                                                        `${key}.gAddrs`,
                                                                        {
                                                                            pattern:
                                                                            {
                                                                                value: new RegExp(
                                                                                    /(\d+\/\d+\/\d+,)|(\d+\/\d+\/\d+$)/,
                                                                                    'gm'
                                                                                ),
                                                                                message:
                                                                                    'rule is \\d+\\/\\d+\\/\\d+',
                                                                            },
                                                                        }
                                                                    ),
                                                                }}
                                                                error={
                                                                    !!errors
                                                                        .extras
                                                                        ?.length &&
                                                                    !!errors
                                                                        .extras[
                                                                    page
                                                                    ] &&
                                                                    !!errors
                                                                        .extras[
                                                                    page
                                                                    ][oid] &&
                                                                    !!errors
                                                                        .extras[
                                                                        page
                                                                    ][oid]
                                                                        ?.gAddrs
                                                                }
                                                                helperText={
                                                                    !!errors
                                                                        .extras
                                                                        ?.length &&
                                                                    !!errors
                                                                        .extras[
                                                                    page
                                                                    ] &&
                                                                    !!errors
                                                                        .extras[
                                                                    page
                                                                    ][oid] &&
                                                                    errors
                                                                        .extras[
                                                                        page
                                                                    ][oid]
                                                                        ?.gAddrs
                                                                        ?.message
                                                                }
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className={'center'}>
                                                        {/*{rule.read}*/}
                                                        <FormControlLabel
                                                            className={'read'}
                                                            label=""
                                                            control={
                                                                <Checkbox
                                                                    checked={
                                                                        !!rule.read
                                                                    }
                                                                    name={`${key}.read`}
                                                                    disabled={
                                                                        false
                                                                    }
                                                                />
                                                            }
                                                            onChange={
                                                                handleEditExtraAttrFlag
                                                            }
                                                        />
                                                    </td>
                                                    <td className={'center'}>
                                                        {/*{rule.write}*/}
                                                        <FormControlLabel
                                                            className={'write'}
                                                            label=""
                                                            control={
                                                                <Checkbox
                                                                    checked={
                                                                        !!rule.write
                                                                    }
                                                                    name={`${key}.write`}
                                                                    disabled={
                                                                        false
                                                                    }
                                                                />
                                                            }
                                                            onChange={
                                                                handleEditExtraAttrFlag
                                                            }
                                                        />
                                                    </td>
                                                    <td className={'center'}>
                                                        {/*{rule.transmit}*/}
                                                        <FormControlLabel
                                                            className={
                                                                'transmit'
                                                            }
                                                            label=""
                                                            control={
                                                                <Checkbox
                                                                    checked={
                                                                        !!rule.transmit
                                                                    }
                                                                    name={`${key}.transmit`}
                                                                    disabled={
                                                                        false
                                                                    }
                                                                />
                                                            }
                                                            onChange={
                                                                handleEditExtraAttrFlag
                                                            }
                                                        />
                                                    </td>
                                                    <td className={'center'}>
                                                        {/*{extra.attr.name}*/}
                                                        <TextField
                                                            variant="outlined"
                                                            size={'small'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            value={
                                                                extra.attr.name
                                                            }
                                                            onChange={
                                                                handleEditExtraAttr
                                                            }
                                                            disabled={false}
                                                            inputProps={{
                                                                ...register(
                                                                    // @ts-ignore
                                                                    `${key}.name`,
                                                                    {}
                                                                ),
                                                            }}
                                                        />
                                                    </td>
                                                    {/*operations*/}
                                                    <td className={'center'}>
                                                        <IconButton
                                                            onClick={(e) => {
                                                                const value = `${key}`;
                                                                handleDeleteExtraAttr(
                                                                    e,
                                                                    value
                                                                );
                                                            }}
                                                        >
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
                                            {<Checkbox
                                                checked={
                                                    !!rule.read
                                                }
                                                disabled={true}
                                            />}
                                        </td>

                                        <td className={'center'}>
                                            {<Checkbox
                                                checked={
                                                    !!rule.update
                                                }
                                                disabled={true}
                                            />}
                                        </td>

                                        <td className={'center'}>
                                            {<Checkbox
                                                checked={
                                                    !!rule.transmit
                                                }
                                                disabled={true}
                                            />}
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

                {/* {isGeneralDevice && !!generals.length && (
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
                                            {general.attr.suffix || 'None'}
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
                )} */}

                {hasParentExtraAttrs && (
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={8} className={'title'}>
                                    {'Parent Device Extra Attributes'}
                                </th>
                            </tr>
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
                                                {extra.attr.suffix || 'None'}
                                            </td>
                                            <td className={'center'}>
                                                {extra.obj &&
                                                    extra.obj.gAddrs?.[0]}
                                            </td>
                                            <td className={'center'}>
                                                {<Checkbox
                                                    checked={
                                                        !!rule.read
                                                    }
                                                    disabled={true}
                                                />}
                                            </td>
                                            <td className={'center'}>
                                                {<Checkbox
                                                    checked={
                                                        !!rule.write
                                                    }
                                                    disabled={true}
                                                />}
                                            </td>
                                            <td className={'center'}>
                                                {<Checkbox
                                                    checked={
                                                        !!rule.transmit
                                                    }
                                                    disabled={true}
                                                />}
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
        </div>
    );
};

type SettingTitle =
    | 'ID'
    | 'Button ID'
    | 'Button Type'
    | 'Press Mode'
    | 'Controlled Device'
    | 'Controlled'
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
    'Controlled',
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

const ButtonTypes: { value: number; name: string }[] = [
    {
        value: 0,
        name: 'Toggle',
    },
    {
        value: 1,
        name: 'Rocker',
    },
    {
        value: 2,
        name: 'Toggle Simulator',
    },
];

export default KNXConfiguration;

const getSwitchPanelLeaves = (switchPanelData) => {
    const { switchPanelLeaves } = useSelector((state: RootState) => {
        const switchPanelLeaves = state.device.devices.filter(
            (item) => {
                return (!!switchPanelData?.parentId && item.parentId === switchPanelData?.parentId)
            }
        );
        return {
            switchPanelLeaves: switchPanelLeaves,
        };
    });
    let deviceArr = []
    for (let index = 0; index < switchPanelLeaves.length; index++) {
        const leave = switchPanelLeaves[index];
        if (leave?.type?.categoryId === 'A') {
            console.log('deviceArr')
            const { leaves } = useSelector((state: RootState) => {
                const leaves = state.device.devices.filter(
                    (item) => item.parentId == leave.id
                );
                return {
                    leaves: leaves,
                };
            });
            leaves?.forEach((item) => deviceArr.push(item))
        }
        else if (leave?.type?.categoryId === 'SD' || leave?.type?.categoryId === 'CPB') {
            continue
        }
        else {
            deviceArr.push(leave)
        }
    }
    console.log('getSwitchPanelLeaves', deviceArr)
    return deviceArr
}

const getControlledAttrs = (switchPanelLeaves, createdRT) => {
    let controlledAttrs = []
    for (let index = 0; index < switchPanelLeaves.length; index++) {
        const leaveAttrs = switchPanelLeaves[index]?.attrs;
        for (let j = 0; j < leaveAttrs.length; j++) {
            const attr = leaveAttrs[j];
            if (attr?.createdRT?.split?.(':')?.[0] === createdRT?.split?.(':')?.[0] && !attr?.rt?.[0]?.includes("bh.r.attr.button") && !attr?.ack4Obj) {
                let newAttr = { ...attr, pickerName: `${switchPanelLeaves[index]?.name}-${attr?.name}`, dvId: switchPanelLeaves[index]?.dvId }
                controlledAttrs.push(newAttr)
            }

        }
    }
    return controlledAttrs
}

const getControlledAttr = (switchPanelLeaves, info) => {
    let controlledAttr = null
    for (let index = 0; index < switchPanelLeaves.length; index++) {
        const leaveAttrs = switchPanelLeaves[index]?.attrs;
        for (let j = 0; j < leaveAttrs.length; j++) {
            const attr = leaveAttrs[j];
            if (attr?.objId == info?.objectId && switchPanelLeaves[index]?.dvId === info?.dvId && !attr?.ack4Obj) {
                let newAttr = { ...attr, pickerName: `${switchPanelLeaves[index]?.name}-${attr?.name}`, dvId: switchPanelLeaves[index]?.dvId }
                controlledAttr = { ...newAttr }
                break
            }

        }
        if (!!controlledAttr) {
            break
        }
    }
    console.log('controlledAttr', controlledAttr, switchPanelLeaves, info)
    return controlledAttr
}
const assignNewObjId = (attrs) => {
    let objArr = []
    let ack4ObjArr = []
    for (let index = 0; index < attrs.length; index++) {
        const element = attrs[index];
        if (element?.ack4Obj) {
            ack4ObjArr.push(element)
        } else {
            objArr.push(element)
        }
    }
    let concatArr = objArr.concat(ack4ObjArr)
    let assignNewObjIdArr = []
    let oldObjIdToNewObjIdTable = []
    for (let index = 0; index < concatArr.length; index++) {
        const element = concatArr[index];
        if (element?.ack4Obj) {
            for (let j = 0; j < concatArr.length; j++) {
                const elementJ = concatArr[j];
                if (elementJ?.objId === element?.ack4Obj) {
                    assignNewObjIdArr.push({ ...element, ack4Obj: j + 1, objId: index + 1 })
                    oldObjIdToNewObjIdTable.push({ old: element?.objId, new: index + 1 })
                    break
                }
            }
        } else {
            assignNewObjIdArr.push({ ...element, objId: index + 1 })
            oldObjIdToNewObjIdTable.push({ old: element?.objId, new: index + 1 })
        }
    }
    return [assignNewObjIdArr, oldObjIdToNewObjIdTable]
}