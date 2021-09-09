import { Card, CardContent } from '@material-ui/core';
import clsx from 'clsx';
import React, { CSSProperties } from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import DeviceMaintainCardTypes from 'src/client/domain/device/DeviceMaintainItemTypes';
import { DeviceTemplateVM } from 'src/client/domain/device/DeviceVMs';
import DeviceSlice from 'src/client/slices/DeviceSlice';
import AssetsHelper from 'src/client/helper/AssetsHelper';

interface DeviceTemplateCardProps {
    template: DeviceTemplateVM;
}

const DeviceTemplateCard: React.FC<DeviceTemplateCardProps> = (props) => {
    const dispatch = useDispatch();

    if (!props.template) {
        return <React.Fragment />;
    }

    const template = props.template;

    const item = {
        type: DeviceMaintainCardTypes.DeviceTemplateCard,
        payload: template,
    };

    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: item.type,
            item: item,
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }),
        [template]
    );

    const style: CSSProperties = {
        opacity: isDragging ? 0.5 : 1,
    };

    const handleClick = (e) => {
        e.stopPropagation();
    };

    const handleDragStart = () => {
        // console.log('handleDragStart');
        dispatch(DeviceSlice.selectDeviceTemplate(template));
    };

    const classname = clsx('device-template-card', template.type.categoryId);

    const name = template.name;
    const type = `${template.type.categoryId} - ${template.type.name}`;
    const model = `${template.model.name} - ${template.model.brand.name}`;
    const category = template.type.categoryId;
    const brand = template.model.brand.name;
    const protocols = !template.protocols
        ? ['']
        : template.protocols.map((protocol) => protocol.typeId).join(',');

    const image = !template.images ? null : template.images[0];
    const image_path = !image
        ? ''
        : AssetsHelper.generateImagePath(['device', image.path]);
    const icon = template.icon;
    const icon_path = !icon ? '' : AssetsHelper.generateIconPath(icon.path);

    return (
        <Card
            ref={drag}
            id={template.id}
            className={classname}
            style={style}
            variant="outlined"
            onClick={handleClick}
            onDragStart={handleDragStart}
        >
            <div className="card-header">
                {/*<div className="header-name">{name}</div>*/}
                {/* <div className="header-actions">{"actions"}</div> */}
            </div>
            <CardContent>
                <div className={'info'}>
                    <div>{name}</div>
                    <div>{type}</div>
                    <div>{model}</div>
                    <div>{protocols}</div>
                    {/*{image && <div>{`${image.path}`}</div>}*/}
                </div>
                <div className="preview">
                    {image && (
                        <div className="image">
                            {image_path && (
                                <img src={image_path} alt={image.name} />
                            )}
                        </div>
                    )}
                    {!image && (
                        <div className="icon">
                            {icon_path && (
                                <img src={icon_path} alt={icon.name} />
                            )}
                        </div>
                    )}
                </div>
            </CardContent>
            <div className="card-footer">
                {/*<div className="footer-actions">{'actions'}</div>*/}
            </div>
        </Card>
    );
};

export default DeviceTemplateCard;
