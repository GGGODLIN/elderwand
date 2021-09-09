import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TreeItem, TreeView } from '@material-ui/lab';
import React from 'react';
import { useDispatch } from 'react-redux';
import DeviceMaintainAPIs from 'src/client/domain/device/DeviceMaintainAPIs';
import { ProjectVM } from 'src/client/domain/device/ProjectVM';
import DeviceSlice from 'src/client/slices/DeviceSlice';

interface ProjectTreeViewProps {
    projects: ProjectVM[];
    onClickCallback?: Function;
    onDoubleClickCallback?: Function;
}

const ProjectTreeView = (props: ProjectTreeViewProps) => {
    const dispatch = useDispatch();

    const projects = Array.isArray(props.projects) ? props.projects : [];

    const elements = projects.map((project: ProjectVM) => {
        const id = project.id;
        const name = `${project.code}-${project.name}`;

        const handleClick = (e) => {
            e.preventDefault();
        };

        const handleDoubleClick = (e) => {
            e.preventDefault();
            dispatch(DeviceSlice.clearProjectSelected());
            dispatch(DeviceSlice.selectProject(project));
            DeviceMaintainAPIs.fetchDeviceTopologyResources(
                dispatch,
                project,
                props.onDoubleClickCallback
            );
        };

        const handleLabelClick = (e) => {
            e.preventDefault();
        };

        return (
            <TreeItem
                key={id}
                nodeId={id}
                label={name}
                onLabelClick={handleLabelClick}
                onClick={handleClick}
                onDoubleClick={handleDoubleClick}
            />
        );
    });

    return (
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {elements}
        </TreeView>
    );
};

export default ProjectTreeView;
