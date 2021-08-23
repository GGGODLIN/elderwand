import { Card, CardContent } from '@material-ui/core';
import clsx from 'clsx';
import React, { CSSProperties } from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import DeviceMaintainCardTypes from 'src/client/domain/device/DeviceMaintainItemTypes';
import { SpaceTemplateVM } from 'src/client/domain/device/DeviceVMs';
import AssetsHelper from 'src/client/helper/AssetsHelper';
import DeviceSlice from 'src/client/slices/DeviceSlice';

interface SpaceTemplateCardProps {
    template: SpaceTemplateVM;
}

const SpaceTemplateCard: React.FC<SpaceTemplateCardProps> = (props) => {
    const dispatch = useDispatch();

    if (!props.template) {
        return <React.Fragment />;
    }

    const template = props.template;

    const item = {
        type: DeviceMaintainCardTypes.SpaceTemplateCard,
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
        dispatch(DeviceSlice.selectSpaceTemplate(template));
    };

    const style: CSSProperties = {
        opacity: isDragging ? 0.5 : 1,
    };

    const classname = clsx('space-template-card');
    const name = template.name;
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
                <div className="header-name">{name}</div>
                {/* <div className="header-actions">{"actions"}</div> */}
            </div>
            <CardContent>
                <div className={'info'}>
                    {/*<div className={'name'}>{name}</div>*/}
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

export default SpaceTemplateCard;
