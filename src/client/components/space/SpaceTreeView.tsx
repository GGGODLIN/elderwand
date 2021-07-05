import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TreeItem, TreeView } from '@material-ui/lab';
import React from 'react';
import { useDispatch } from 'react-redux';
import ProjectVM from 'src/client/domain/project/ProjectVM';
import SpaceVM from 'src/client/domain/space/SpaceVM';
import SpaceSlice from 'src/client/slices/SpaceSlice';

interface SpaceTreeViewProp {
    project: ProjectVM;
    spaces: SpaceVM[];
}

const SpaceTreeView: React.FC<SpaceTreeViewProp> = (props) => {
    const dispatch = useDispatch();

    if (!props.project) {
        return (
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            />
        );
    }

    if (!Array.isArray(props.spaces)) {
        return null;
    }

    const root_spaces = props.spaces.filter((space) => !space.parentId);

    function renderLeaves(target: SpaceVM[], source: SpaceVM[]): JSX.Element[] {
        if (!Array.isArray(target)) {
            return [];
        }

        const elements = target.map((space) => {
            const id = space.id;
            const name = space.name;

            const onLabelClick = () => {
                dispatch(SpaceSlice.selectSpace(space));
            };

            const leaves = props.spaces.filter(
                (node) => node.parentId == space.id
            );

            return (
                <TreeItem
                    key={id}
                    nodeId={id}
                    label={name}
                    onLabelClick={onLabelClick}
                >
                    {renderLeaves(leaves, props.spaces)}
                </TreeItem>
            );
        });

        return elements;
    }

    const elements = root_spaces.map((space) => {
        const id = space.id;
        const name = space.name;

        const onLabelClick = () => {
            dispatch(SpaceSlice.selectSpace(space));
        };

        const leaves = props.spaces.filter((node) => node.parentId == space.id);

        return (
            <TreeItem
                key={id}
                nodeId={id}
                label={name}
                onLabelClick={onLabelClick}
            >
                {renderLeaves(leaves, props.spaces)}
            </TreeItem>
        );
    });

    const name = `${props.project.name} - ${props.project.code}`;
    const id = props.project.id;
    const expanded = [id];

    expanded.push(...root_spaces.map((space) => space.id));

    return (
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            defaultExpanded={expanded}
        >
            <TreeItem key={id} nodeId={id} label={name}>
                {elements}
            </TreeItem>
        </TreeView>
    );
};

export default SpaceTreeView;
