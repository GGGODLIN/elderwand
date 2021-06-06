import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import SpaceSlice from 'src/client/slices/SpaceSlice';
import { SpaceVM } from 'src/client/domain/space/SpaceVM';
import { TreeItem, TreeView } from '@material-ui/lab';
import { useDispatch } from 'react-redux';

const renderLeaf = (leaves: SpaceVM[]): JSX.Element[] => {
    if (!Array.isArray(leaves)) {
        return [];
    }

    return leaves
        .sort((a, b) => {
            return a.name > b.name ? 1 : -1;
        })
        .map((item) => {
            const id = item.id;
            const name = `${item.name} - ${item.id}`;

            const dispatch = useDispatch();
            const handelClick =
                item.leaves.length > 0
                    ? () => {
                          dispatch(SpaceSlice.selectSpace(item));
                      }
                    : () => {};

            return (
                <TreeItem
                    key={id}
                    nodeId={id}
                    label={name}
                    onClick={handelClick}
                >
                    {renderLeaf(item.leaves)}
                </TreeItem>
            );
        });
};

const setLeaves = (target: SpaceVM, source: SpaceVM[]): void => {
    if (!Array.isArray(source)) {
        return;
    }

    let items = source.filter((item) => item.parent_id == target.id);

    target.leaves = items;

    const l = target.leaves.length;

    for (let i = 0; i < l; i++) {
        setLeaves(target.leaves[i], source);
    }
};

interface SpaceTreeViewProp {
    spaces: SpaceVM[];
}

const SpaceTreeView: React.FC<SpaceTreeViewProp> = (props) => {
    if (!Array.isArray(props.spaces)) {
        return null;
    }

    let root = props.spaces.find((item) => item.parent_id == '');

    if (!root) {
        return null;
    }

    root = { ...root, leaves: [] };
    //   const spaces = props.spaces;
    const spaces = props.spaces.map((space) => {
        return { ...space, leaves: [] };
    });

    setLeaves(root, spaces);

    const elements = renderLeaf(root.leaves);

    const name = `${root.name} - ${root.id}`;
    const id = root.id;
    const expanded = [root.id];
    //   const expanded = [root.id].concat(root.leaves.map((item) => item.id));

    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(SpaceSlice.selectSpace(root));
    };

    return (
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            defaultExpanded={expanded}
        >
            <TreeItem key={id} nodeId={id} label={name} onClick={handleClick}>
                {elements}
            </TreeItem>
        </TreeView>
    );
};

export default SpaceTreeView;
