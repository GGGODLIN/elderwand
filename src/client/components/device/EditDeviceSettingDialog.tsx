import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import clsx from 'clsx';
import { produce } from 'immer';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import KNXConfiguration from 'src/client/components/device/KNX/KNXConfiguration';
import DeviceHelper from 'src/client/domain/device/DeviceHelper';
import DeviceMaintainAPIs from 'src/client/domain/device/DeviceMaintainAPIs';
import DeviceVM, {
    DeviceSpec,
    NetworkCard,
    ProjectVM,
    SoftwareInfo,
    SpaceVM,
} from 'src/client/domain/device/DeviceVM';
import AssetsHelper from 'src/client/helper/AssetsHelper';
import { RootState } from 'src/client/reducer';
import DeviceSlice from 'src/client/slices/DeviceSlice';
import TimeUtil from 'src/client/utils/TimeUtil';

interface NetworkCardsProps {
    cards: NetworkCard[];
}

const NetworkCards: React.FC<NetworkCardsProps> = (props) => {
    if (!props.cards) {
        return <React.Fragment />;
    }

    return (
        <div className={'network-cards'}>
            {props.cards.map((card, idx) => {
                const primary = card.primary ? 'primary' : '';
                const classname = clsx(['network-card', primary]);

                return (
                    <div key={card.id} className={classname}>
                        <TextField
                            variant="outlined"
                            size={'small'}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label={'Network'}
                            value={
                                card.network +
                                `${!card.name ? '' : ' - ' + card.name}`
                            }
                            // helperText={` `}
                            disabled={true}
                        />
                        <TextField
                            variant="outlined"
                            size={'small'}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label="mac"
                            value={card.mac}
                            // helperText={` `}
                            disabled={true}
                        />
                        <TextField
                            variant="outlined"
                            size={'small'}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label="IP"
                            value={card.ip}
                            // helperText={` `}
                            disabled={true}
                        />
                        <Switch
                            name="enable"
                            checked={card.enable}
                            disabled={!!primary || idx == 0}
                            color={'primary'}
                        />
                    </div>
                );
            })}
        </div>
    );
};

interface ProjectInformationProps {
    project: ProjectVM;
}

const ProjectInformation: React.FC<ProjectInformationProps> = (
    props
): JSX.Element => {
    if (!props.project) {
        return <React.Fragment />;
    }

    const project = props.project;

    return (
        <div className={'project-info'}>
            {/*<div>*/}
            {/*    <div className="name">{'ID'}</div>*/}
            {/*    <div className="value">{project.id}</div>*/}
            {/*</div>*/}
            <div>
                <div className="name">{'Project Name'}</div>
                <div className="value">{project.name}</div>
            </div>
            <div>
                <div className="name">{'Project Code'}</div>
                <div className="value">{project.code}</div>
            </div>
            <div>
                <div className="name">{'Cloud Code'}</div>
                <div className="value">{project.cloudCode.name}</div>
            </div>
            <div>
                <div className="name">{'Project Status'}</div>
                <div className="value">{project.status.name}</div>
            </div>
            <div>
                <div className="name">{'Expire Date'}</div>
                <div className="value">
                    {TimeUtil.new(project.expireDate).format('YYYY-MM-DD')}
                </div>
            </div>
            <div>
                <div className="name">{'Owner'}</div>
                <div className="value">
                    {!project.owner
                        ? 'username'
                        : project.owner.account.username}
                </div>
            </div>
        </div>
    );
};

interface SpaceInformationProps {
    space: SpaceVM;
}

const SpaceInformation: React.FC<SpaceInformationProps> = (
    props
): JSX.Element => {
    if (!props.space) {
        return <React.Fragment />;
    }

    const space = props.space;

    return (
        <div className={'space-info'}>
            <div>
                <div className="name">{'Space ID'}</div>
                <div className="value">{space.id}</div>
            </div>
            <div>
                <div className="name">{'Space Name'}</div>
                <div className="value">{space.name}</div>
            </div>
            {space.icon && (
                <div>
                    <div className="name">{'Icon'}</div>
                    <div className="value">{space.icon.name}</div>
                </div>
            )}
            <div>
                <div className="name">{'Photo Count'}</div>
                <div className="value">{space?.photos?.length || 0}</div>
            </div>

            {/*<div>*/}
            {/*    <div className="name">{'Cloud Code'}</div>*/}
            {/*    <div className="value">{project.cloudCode.name}</div>*/}
            {/*</div>*/}
        </div>
    );
};

interface SoftwareInfoProps {
    info: SoftwareInfo[];
}

const SoftwareInformation: React.FC<SoftwareInfoProps> = (
    props
): JSX.Element => {
    if (!props.info) {
        return <React.Fragment />;
    }

    const elements = props.info.map((item) => {
        return (
            <div key={item.name}>
                <div className={'name'}>{item.name}</div>
                <div className={'version'}>{item.version}</div>
            </div>
        );
    });

    const classname = 'software-info';

    return <div className={classname}>{elements}</div>;
};

interface ParentDeviceInfoProps {
    device: DeviceVM;
}

const ParentDeviceInfo: React.FC<ParentDeviceInfoProps> = (
    props
): JSX.Element => {
    if (!props.device || !props.device.parent) {
        return <React.Fragment />;
    }

    const device = props.device.parent;

    const classname = 'parent-info';

    return (
        <div className={classname}>
            <div>
                <div className={'name'}>{'ID'}</div>
                <div className={'value'}>{device.id}</div>
            </div>
            <div>
                <div className={'name'}>{'Name'}</div>
                <div className={'value'}>{device.name}</div>
            </div>
            <div>
                <div className={'name'}>{'Device ID'}</div>
                <div className={'value'}>{device.dvId}</div>
            </div>

            <div>
                <div className={'name'}>{'Brand'}</div>
                <div className={'value'}>{device.model.brand.name}</div>
            </div>

            <div>
                <div className={'name'}>{'model'}</div>
                <div className={'value'}>{device.model.name}</div>
            </div>

            <div>
                <div className={'name'}>{'Type'}</div>
                <div className={'value'}>{device.type.name}</div>
            </div>

            <div>
                <div className={'name'}>{'Category'}</div>
                <div className={'value'}>{device.type.category.name}</div>
            </div>
        </div>
    );
};

interface SpecificationProps {
    spec: DeviceSpec;
}

const Specification: React.FC<SpecificationProps> = (props): JSX.Element => {
    if (!props.spec) {
        return <React.Fragment />;
    }

    const classname = 'specification';

    return (
        <div className={classname}>
            {
                <div>
                    <div className={'name'}>{'ComPort'}</div>
                    <div className={'value'}>
                        {props.spec.comPortCount || '0'}
                    </div>
                </div>
            }

            {
                <div>
                    <div className={'name'}>{'NetworkCard'}</div>
                    <div className={'value'}>
                        {props.spec.networkCardCount || '0'}
                    </div>
                </div>
            }

            {
                <div>
                    <div className={'name'}>{'Channel'}</div>
                    <div className={'value'}>
                        {props.spec.channelCount || '0'}
                    </div>
                </div>
            }

            {
                <div>
                    <div className={'name'}>{'MaxChannel'}</div>
                    <div className={'value'}>
                        {props.spec.maxChannelCount || '0'}
                    </div>
                </div>
            }

            {
                <div>
                    <div className={'name'}>{'KNX'}</div>
                    <div className={'value'}>
                        {props.spec?.KNX ? 'true' : 'false'}
                    </div>
                </div>
            }

            {
                <div>
                    <div className={'name'}>{'RS485'}</div>
                    <div className={'value'}>
                        {props.spec.RS485 ? 'true' : 'false'}
                    </div>
                </div>
            }

            {
                <div>
                    <div className={'name'}>{'EnOcean'}</div>
                    <div className={'value'}>
                        {props.spec?.EnOcean ? 'true' : 'false'}
                    </div>
                </div>
            }

            {
                <div>
                    <div className={'name'}>{'SwitchPanel'}</div>
                    <div className={'value'}>
                        {!props.spec.switchPanel || !Object.keys({}).length
                            ? 'false'
                            : 'true'}
                    </div>
                </div>
            }
        </div>
    );
};

interface DeviceEditForm {
    name: string;
    iconId: string;
    heartbeat?: number;
    period?: number;
}

interface DeviceProfileProps {
    project: ProjectVM;
    space: SpaceVM;
    device: DeviceVM;
}

const DeviceProfile: React.FC<DeviceProfileProps> = (props) => {
    if (!props.project || !props.device) {
        return <React.Fragment />;
    }

    const dispatch = useDispatch();

    const project = props.project;
    const space = props.space;
    const device = props.device;

    const helper = new DeviceHelper({ device: device });
    const image = helper.getImage();
    const icon = helper.getIcon();

    const { isGateway } = helper.isGateway();
    const { isKNX } = helper.isKNX();

    const routine = true;
    const profile = true;
    const info = true;

    const protocols = helper.getProtocols();

    const { icons } = useSelector((state: RootState) => {
        return {
            icons: state.device.icons,
        };
    });

    const defaultValues = {
        name: device.name,
        iconId: device.iconId,
        heartbeat: device.heartbeat,
        period: device.period,
    };

    const {
        register,
        control,
        setValue,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm<DeviceEditForm>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: defaultValues,
    });

    const [stateOfDeviceProfile, setDeviceProfile] = useState({
        profile: {
            ...defaultValues,
        } as DeviceEditForm,
        changed: false,
    });

    const handleEditProfile = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        const nextState = produce(stateOfDeviceProfile, (draft) => {
            draft.profile[name] = value;
            draft.changed = true;
        });

        setDeviceProfile(nextState);
    };

    const handleResetProfile = (e) => {
        setDeviceProfile({
            profile: {
                ...defaultValues,
            },
            changed: false,
        });

        clearErrors();
    };

    const handleSubmitProfile = (e) => {
        const device_vo = {
            ...device,
            ...stateOfDeviceProfile.profile,
        };

        DeviceMaintainAPIs.editDeviceProfile(
            dispatch,
            project,
            device_vo,
            (data) => {
                console.log('DeviceMaintainAPIs.editDeviceProfile', data)
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
        setDeviceProfile({
            profile: {
                ...defaultValues,
            },
            changed: false,
        });
        return () => {
            // effect;
        };
    }, [device]);

    return (
        <div className="device-profile">
            <div className="info">
                <form onSubmit={(e) => e.preventDefault()}>
                    {/* device name and id */}
                    <div>
                        <TextField
                            variant="outlined"
                            size={'small'}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label="Name"
                            value={stateOfDeviceProfile.profile.name}
                            onChange={handleEditProfile}
                            error={!!errors.name}
                            helperText={
                                !errors.name ? ' ' : errors.name.message
                            }
                            disabled={false}
                            required={true}
                            inputProps={{
                                ...register('name', {
                                    // minLength: {
                                    //     value: 4,
                                    //     message: 'minLength',
                                    // },
                                    maxLength: {
                                        value: 32,
                                        message: 'maxLength',
                                    },
                                    required: {
                                        value: true,
                                        message: 'is required',
                                    },
                                }),
                            }}
                        />

                        <TextField
                            variant="outlined"
                            size={'small'}
                            label="ID"
                            value={device.id}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            helperText={' '}
                            disabled={true}
                            style={{ width: '340px' }}
                        />

                        <FormControl
                            variant={'outlined'}
                            size={'small'}
                            fullWidth={true}
                        >
                            <InputLabel shrink={true} id="icon-selector-label">
                                {'Icon'}
                            </InputLabel>
                            <Select
                                className={'icon-selector'}
                                labelId="icon-selector-label"
                                value={stateOfDeviceProfile.profile.iconId}
                                label="Icon"
                                name={'iconId'}
                                onChange={handleEditProfile}
                            >
                                {icons.map((icon) => {
                                    return (
                                        <MenuItem key={icon.id} value={icon.id}>
                                            <div>
                                                <img
                                                    src={AssetsHelper.generateIconPath(
                                                        icon.path
                                                    )}
                                                    alt={icon.name}
                                                />
                                                <span>{icon.name}</span>
                                            </div>
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                            <FormHelperText>{` `}</FormHelperText>
                        </FormControl>
                    </div>

                    {/* device type amd model */}
                    <div>
                        {device.type && (
                            <React.Fragment>
                                <TextField
                                    variant="outlined"
                                    size={'small'}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="Type"
                                    value={device.type.name}
                                    helperText={' '}
                                    disabled={true}
                                />
                                <TextField
                                    variant="outlined"
                                    size={'small'}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="Category"
                                    value={device.type.category.name}
                                    helperText={' '}
                                    disabled={true}
                                />
                            </React.Fragment>
                        )}
                        {device.model && (
                            <React.Fragment>
                                <TextField
                                    variant="outlined"
                                    size={'small'}
                                    label="Model"
                                    value={device.model.name}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    disabled={true}
                                    helperText={' '}
                                />
                                <TextField
                                    variant="outlined"
                                    size={'small'}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="Brand"
                                    value={device.model.brand.name}
                                    helperText={' '}
                                    disabled={true}
                                />
                            </React.Fragment>
                        )}
                    </div>

                    <div>
                        {/* platform info */}
                        <React.Fragment>
                            <TextField
                                variant="outlined"
                                size={'small'}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                label="Platform"
                                value={project.cloudCode.name}
                                helperText={' '}
                                disabled={true}
                            />
                            <TextField
                                variant="outlined"
                                size={'small'}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                label="Device ID"
                                value={device.dvId}
                                helperText={' '}
                                disabled={true}
                                style={{ width: '240px' }}
                            />
                        </React.Fragment>

                        {/* device routine time */}
                        <React.Fragment>
                            {(routine || device.heartbeat) && (
                                <TextField
                                    variant="outlined"
                                    size={'small'}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="Heartbeat"
                                    value={
                                        !stateOfDeviceProfile.profile.heartbeat
                                            ? 0
                                            : stateOfDeviceProfile.profile
                                                .heartbeat
                                    }
                                    type={'number'}
                                    disabled={!device.heartbeat}
                                    style={{ width: '160px' }}
                                    onChange={handleEditProfile}
                                    inputProps={{
                                        ...register('heartbeat', {
                                            min: {
                                                value: 0,
                                                message: 'min value is 0',
                                            },
                                            max: {
                                                value: 65535,
                                                message: 'max value is 65535',
                                            },
                                        }),
                                    }}
                                    error={!!errors.heartbeat}
                                    helperText={
                                        !errors.heartbeat
                                            ? '( 0~65535 )'
                                            : errors.heartbeat.message
                                    }
                                />
                            )}
                            {(routine || device.period) && (
                                <TextField
                                    variant="outlined"
                                    size={'small'}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="Period"
                                    value={
                                        !stateOfDeviceProfile.profile.period
                                            ? 0
                                            : stateOfDeviceProfile.profile
                                                .period
                                    }
                                    type={'number'}
                                    disabled={!device.period}
                                    style={{
                                        width: '160px',
                                    }}
                                    onChange={handleEditProfile}
                                    inputProps={{
                                        ...register('period', {
                                            min: {
                                                value: 0,
                                                message: 'min value is 0',
                                            },
                                            max: {
                                                value: 65535,
                                                message: 'max value is 65535',
                                            },
                                        }),
                                    }}
                                    error={!!errors.period}
                                    helperText={
                                        !errors.period
                                            ? '( 0~65535 )'
                                            : errors.period.message
                                    }
                                />
                            )}
                        </React.Fragment>
                    </div>
                    {/* Protocols */}
                    <div className={'actions'}>
                        <div>
                            <TextField
                                variant="outlined"
                                size={'small'}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                label="Protocols"
                                value={protocols.join(', ')}
                                helperText={' '}
                                disabled={true}
                                style={{ width: '240px' }}
                            />
                            {device.spec?.EnOcean?.EEPCode && (
                                <TextField
                                    variant="outlined"
                                    size={'small'}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="EEPCode"
                                    value={device.spec?.EnOcean?.EEPCode}
                                    helperText={' '}
                                    disabled={true}
                                    style={{ width: '240px' }}
                                />
                            )}
                        </div>
                        <div>
                            {stateOfDeviceProfile.changed && (
                                <React.Fragment>
                                    <Button
                                        className={'save'}
                                        type={'button'}
                                        onClick={handleSubmitProfile}
                                    >
                                        {'SAVE'}
                                    </Button>
                                    <Button
                                        className={'reset'}
                                        type={'reset'}
                                        onClick={handleResetProfile}
                                    >
                                        {'RESET'}
                                    </Button>
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                </form>
                {/* network info */}
                <form onSubmit={(e) => e.preventDefault()} noValidate>
                    <div className="network-info">
                        {/* connection info */}
                        {device.imei && (
                            <div>
                                <TextField
                                    variant="outlined"
                                    size={'small'}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="Public IP"
                                    value={device.publicIP}
                                    // helperText={` `}
                                    disabled={true}
                                />

                                <TextField
                                    variant="outlined"
                                    size={'small'}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="Trace IP"
                                    value={device.traceIP}
                                    // helperText={` `}
                                    disabled={true}
                                    style={{ width: '390px' }}
                                />
                                <FormControlLabel
                                    className={'is-bound'}
                                    label=""
                                    value={device.imei}
                                    control={
                                        <Checkbox
                                            checked={!!device.imei}
                                            name="is-bound"
                                            style={{
                                                color: 'red',
                                            }}
                                            disabled={true}
                                        />
                                    }
                                />
                            </div>
                        )}

                        {/* cards info */}
                        {device.networkCards && (
                            <div>
                                <NetworkCards cards={device.networkCards} />
                            </div>
                        )}
                    </div>
                </form>
            </div>
            <div className="preview">
                <div className="image">
                    {image && <img src={image.path} alt={image.name} />}
                </div>
                <div className="icon">
                    {icon && <img src={icon.path} alt={icon.name} />}
                </div>
            </div>
        </div>
    );
};

interface EditDeviceDialogProps {
    open: boolean;
    project: ProjectVM;
    space: SpaceVM;
    device: DeviceVM;
}

const EditDeviceSettingDialog: React.FC<EditDeviceDialogProps> = (props) => {
    if (!props.open || !props.project || !props.space || !props.device) {
        return <React.Fragment />;
    }

    const dispatch = useDispatch();

    const open = props.open;
    const project = props.project;
    const space = props.space;
    const device = props.device;

    const handleClose = () => {
        dispatch(DeviceSlice.closeEditDeviceSettingDialog());
    };

    const helper = new DeviceHelper({ device: device });

    const { isGateway } = helper.isGateway();

    const profile = true;
    const info = true;

    return (
        <div>
            <Dialog
                className={'edit-device-setting-dialog'}
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth={'md'}
            >
                <DialogTitle>{'Edit Device Setting'}</DialogTitle>
                <DialogContent>
                    {/* device-profile */}
                    {profile && (
                        <DeviceProfile
                            project={project}
                            space={space}
                            device={device}
                        />
                    )}
                    {info && (
                        <div className="other-info">
                            {/* device-operations */}
                            {isGateway && (
                                <div className="device-operations">
                                    <Button
                                        type={'button'}
                                        style={{
                                            color: 'white',
                                            backgroundColor: 'green',
                                        }}
                                    >
                                        {'Export Config'}
                                    </Button>
                                    <Button
                                        type={'button'}
                                        style={{
                                            color: 'white',
                                            backgroundColor: 'blue',
                                        }}
                                    >
                                        {'Bind Living Code'}
                                    </Button>
                                    <Button
                                        type={'button'}
                                        style={{
                                            color: 'white',
                                            backgroundColor: 'orange',
                                        }}
                                    >
                                        {'Check Living Code'}
                                    </Button>
                                    <Button
                                        type={'button'}
                                        style={{
                                            color: 'white',
                                            backgroundColor: 'red',
                                        }}
                                    >
                                        {'To Factory'}
                                    </Button>
                                </div>
                            )}

                            {/* device detail */}
                            <div className="device-detail">
                                {props.project && (
                                    <ProjectInformation project={project} />
                                )}

                                {props.space && (
                                    <SpaceInformation space={space} />
                                )}

                                {device.softwareInfo && (
                                    <SoftwareInformation
                                        info={device.softwareInfo}
                                    />
                                )}

                                {device.spec && (
                                    <Specification spec={device.spec} />
                                )}

                                {device.parent && (
                                    <ParentDeviceInfo device={device} />
                                )}
                            </div>
                        </div>
                    )}
                    <div className="device-config">
                        <KNXConfiguration
                            project={project}
                            space={space}
                            device={device}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button className={'close'} onClick={handleClose}>
                        {'Close'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditDeviceSettingDialog;
