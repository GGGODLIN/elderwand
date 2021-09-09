import {
    Checkbox,
    FormControlLabel,
    Switch,
    TextField,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import clsx from 'clsx';
import React from 'react';
import { useDispatch } from 'react-redux';
import DeviceHelper from 'src/client/domain/device/DeviceHelper';
import DeviceVM, {
    DeviceSpec,
    NetworkCard,
    ProjectVM,
    SoftwareInfo,
} from 'src/client/domain/device/DeviceVMs';
import DeviceSlice from 'src/client/slices/DeviceSlice';
import TimeUtil from 'src/client/utils/TimeUtil';
import KNXConfiguration from './KNX/KNXConfiguration';

interface NetworkCardsProps {
    cards: NetworkCard[];
}

const NetworkCards: React.FC<NetworkCardsProps> = (props) => {
    if (!props.cards) {
        return <React.Fragment />;
    }

    return (
        <div className={'network-cards'}>
            {props.cards.map((card) => {
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
                            disabled={!!primary}
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
        return null;
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
                    <div className={'name'}>{'KNX'}</div>
                    <div className={'value'}>
                        {props.spec.KNX ? 'true' : 'false'}
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
                    <div className={'name'}>{'EEPCode'}</div>
                    <div className={'value'}>
                        {props.spec.EEPCode ? 'true' : 'false'}
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

interface EditDeviceDialogProps {
    open: boolean;
    project: ProjectVM;
    device: DeviceVM;
}

interface EditDeviceSettingForm {
    name: string;
}

const EditDeviceSettingDialog: React.FC<EditDeviceDialogProps> = (props) => {
    const dispatch = useDispatch();

    if (!props.open || !props.device) {
        return null;
    }

    const open = props.open;
    const device = props.device;
    const project = props.project;
    // TODO get project from device vm after imp get the device data include project.

    const handleTest = () => {
        // console.log(JSON.stringify(device.protocols, null, 2));
        // console.log(JSON.stringify(device.attrs, null, 2));
    };

    const handleClose = () => {
        dispatch(DeviceSlice.closeEditDeviceSettingDialog());
    };

    const handleSave = () => {
        dispatch(DeviceSlice.closeEditDeviceSettingDialog());
    };

    const helper = new DeviceHelper({ device: device });
    const image = helper.getImage();
    const icon = helper.getIcon();

    const { isGateway } = helper.isGateway();
    const { isKNX } = helper.isKNX();

    const routine = true;
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
                    {profile && (
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
                                            required={true}
                                            label="Name"
                                            value={device.name}
                                            helperText={' '}
                                            disabled={false}
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

                                        <TextField
                                            variant="outlined"
                                            size={'small'}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            label="Icon"
                                            value={device.icon.name}
                                            helperText={' '}
                                            disabled={true}
                                        />
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
                                                    value={
                                                        device.type.category
                                                            .name
                                                    }
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
                                                    value={
                                                        device.model.brand.name
                                                    }
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
                                                        !device.heartbeat
                                                            ? 0
                                                            : device.heartbeat
                                                    }
                                                    helperText={`( 0~65535 )`}
                                                    disabled={!device.heartbeat}
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
                                                        !device.period
                                                            ? 0
                                                            : device.period
                                                    }
                                                    helperText={`( 0~65535 )`}
                                                    disabled={!device.period}
                                                />
                                            )}
                                        </React.Fragment>
                                    </div>
                                </form>
                                {/* network info */}
                                <form onSubmit={(e) => e.preventDefault()}>
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
                                                            checked={
                                                                !!device.imei
                                                            }
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
                                                <NetworkCards
                                                    cards={device.networkCards}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>
                            <div className="preview">
                                <div className="image">
                                    {image && (
                                        <img
                                            src={image.path}
                                            alt={image.name}
                                        />
                                    )}
                                </div>
                                <div className="icon">
                                    {icon && (
                                        <img src={icon.path} alt={icon.name} />
                                    )}
                                </div>
                            </div>
                        </div>
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
                        <KNXConfiguration device={device} />
                    </div>
                </DialogContent>
                <DialogActions>
                    {/*<Button*/}
                    {/*    className={'save'}*/}
                    {/*    onClick={handleSave}*/}
                    {/*    style={{ color: 'blue' }}*/}
                    {/*>*/}
                    {/*    {'Save'}*/}
                    {/*</Button>*/}
                    {/*<Button className={'test'} onClick={handleTest}>*/}
                    {/*    {'Test'}*/}
                    {/*</Button>*/}
                    <Button className={'cancel'} onClick={handleClose}>
                        {'Cancel'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditDeviceSettingDialog;
