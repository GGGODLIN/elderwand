import { Breadcrumbs, Link } from '@material-ui/core';
import React from 'react';
import SpaceVM from 'src/client/domain/space/SpaceVM';
import ProjectVM from 'src/client/domain/project/ProjectVM';

interface SpaceBreadcrumbsProp {
    project: ProjectVM;
    space: SpaceVM;
    spaces: SpaceVM[];
    onClick?: Function;
}

const SpaceBreadcrumbs: React.FC<SpaceBreadcrumbsProp> = (props) => {
    const classname = 'space-breadcrumbs';

    if (!props.project) {
        return <Breadcrumbs aria-label="breadcrumb" className={classname} />;
    }

    const element = ((project) => {
        return <Link key={project.id}>{project.name}</Link>;
    })(props.project);

    if (!props.space) {
        return (
            <Breadcrumbs aria-label="breadcrumb" className={classname}>
                {element}
            </Breadcrumbs>
        );
    }

    const target = props.space;
    const links = [] as SpaceVM[];

    links.push(target);

    let temp: SpaceVM = target;

    while (temp != null) {
        const parent = props.spaces.find((item) => item.id == temp.parentId);
        temp = parent;

        if (!parent) {
            break;
        }
        links.unshift(parent);
    }

    const elements = links.map((item: SpaceVM) => {
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
            {element}
            {elements}
        </Breadcrumbs>
    );
};

export default SpaceBreadcrumbs;
