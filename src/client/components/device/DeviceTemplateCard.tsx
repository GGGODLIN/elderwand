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

    const handleClick = (e) => {
        e.stopPropagation();
    };

    const handleDragStart = () => {
        // console.log('handleDragStart');
        dispatch(DeviceSlice.selectDeviceTemplate(template));
    };

    const style: CSSProperties = {
        opacity: isDragging ? 0.5 : 1,
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
    const icon = template.icon;
    const path = !icon ? '' : AssetsHelper.generateIconPath(icon.path);

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
                    {image && <div>{`${image.path}`}</div>}
                </div>
                <div className="icon">
                    {path && <img src={path} alt={icon.name} />}
                </div>
            </CardContent>
            <div className="card-footer">
                {/*<div className="footer-actions">{'actions'}</div>*/}
            </div>
        </Card>
    );
};

export default DeviceTemplateCard;
