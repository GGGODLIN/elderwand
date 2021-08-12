import { Card, CardContent } from '@material-ui/core';
import clsx from 'clsx';
import React, { CSSProperties } from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import DeviceMaintainCardTypes from 'src/client/domain/device/DeviceMaintainItemTypes';
import { DeviceTemplateVM } from 'src/client/domain/device/DeviceVMs';
import DeviceSlice from 'src/client/slices/DeviceSlice';

interface DeviceTemplateCardProps {
    template: DeviceTemplateVM;
}

const DeviceTemplateCard: React.FC<DeviceTemplateCardProps> = (props) => {
    const dispatch = useDispatch();

    const template = props.template;

    const [{ isDragging }, drag] = useDrag(() => ({
        type: DeviceMaintainCardTypes.DeviceTemplateCard,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        item: {
            type: DeviceMaintainCardTypes.DeviceTemplateCard,
            payload: template,
        },
    }));

    const style: CSSProperties = {
        opacity: isDragging ? 0.5 : 1,
    };

    const handleClick = (e) => {
        e.stopPropagation();
    };

    const handleDragStart = () => {
        dispatch(DeviceSlice.selectDeviceTemplate(template));
    };

    const name = template.name;
    const classname = clsx('device-template-card', template.type.categoryId);

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
                <div className="header-name">{name}</div>
                {/* <div className="header-actions">{"actions"}</div> */}
            </div>
            <CardContent>
                <div>{props.template.model.name}</div>
                <div>{`${props.template.type.categoryId} - ${props.template.icon.name}`}</div>
            </CardContent>
            <div className="card-footer">
                {/*<div className="footer-actions">{'actions'}</div>*/}
            </div>
        </Card>
    );
};

export default DeviceTemplateCard;
