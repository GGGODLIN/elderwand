import React from 'react';
import { Breadcrumbs, Link } from '@material-ui/core';
import { SpaceVM } from 'src/client/domain/space/SpaceVM';

interface SpaceBreadcrumbsProp {
    space: SpaceVM;
    spaces: SpaceVM[];
    onClick?: Function;
}

const SpaceBreadcrumbs: React.FC<SpaceBreadcrumbsProp> = (props) => {
    const classname = 'space-breadcrumbs';

    if (!props.space) {
        return <Breadcrumbs aria-label="breadcrumb" className={classname} />;
    }

    const target = props.space;
    const links = [] as SpaceVM[];

    links.push(target);

    let temp: SpaceVM = target;

    while (temp != null) {
        const parent = props.spaces.find((item) => item.id == temp.parent_id);
        temp = parent;

        if (!parent) {
            break;
        }
        links.push(parent);
    }

    const elements = links.reverse().map((item: SpaceVM) => {
        const handleClick = () => {
            if (!props.onClick) {
                return;
            }
            props.onClick(item);
        };
        return (
            <Link key={item.id} onClick={handleClick}>
                {item.name}
            </Link>
        );
    });

    return (
        <Breadcrumbs aria-label="breadcrumb" className={classname}>
            {elements}
        </Breadcrumbs>
    );
};

export default SpaceBreadcrumbs;
