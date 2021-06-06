import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TreeItem, TreeView } from '@material-ui/lab';
import React from 'react';
import { SpacePreviewVM } from 'src/client/domain/migration/MigraionPreviewVM';
import { useEffect } from 'react';

interface SpacePreviewTreeViewProp {
    spaces: SpacePreviewVM[];
}

function setChildren(target: SpacePreviewVM, source: SpacePreviewVM[]): void {
    let leaves: SpacePreviewVM[] = source.filter((item) => {
        if (item.parentId == target.id) {
            return item;
        }
    });

    target.leaves = leaves;

    if (target.leaves) {
        const l = target.leaves.length;
        for (let i = 0; i < l; i++) {
            setChildren(target.leaves[i], source);
        }
    }
}

function renderLeaf(leaves: SpacePreviewVM[]): JSX.Element[] {
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
            return (
                <TreeItem key={id} nodeId={id} label={name}>
                    {renderLeaf(item.leaves)}
                </TreeItem>
            );
        });
}

const SpacePreviewTreeView: React.FC<SpacePreviewTreeViewProp> = (props) => {
    if (!Array.isArray(props.spaces)) {
        return null;
    }

    let root = props.spaces.find((value) => {
        if (!value.parentId) {
            return value;
        }
    });

    if (!root) {
        return null;
    }

    root = { ...root, leaves: [] };

    const spaces = props.spaces.map((space) => {
        return { ...space, leaves: [] };
    });

    setChildren(root, spaces);

    const elements = renderLeaf(root.leaves);

    const name = `${root.name} - ${root.id}`;
    const id = root.id;
    const expanded = [root.id];

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

export default SpacePreviewTreeView;
