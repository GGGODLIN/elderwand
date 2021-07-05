import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TreeItem, TreeView } from '@material-ui/lab';
import React from 'react';
import {
    DevicePreviewVM,
    SpacePreviewVM,
} from 'src/client/domain/migration/MigraionPreviewVM';
import { groupBy } from 'src/client/utils/FunctionUtil';

interface DeviceTreeViewProp {
    spaces: SpacePreviewVM[];
    devices: DevicePreviewVM[];
}

const DeviceTreeView: React.FC<DeviceTreeViewProp> = (props) => {
    const gateway_groups = groupBy('parentId')(props.devices);

    let spaces_map = {} as { [key: string]: SpacePreviewVM };

    for (const space of props.spaces) {
        spaces_map[space.id] = space;
    }

    const elements = Object.keys(gateway_groups)
        .sort()
        .map((key) => {
            let gateway = props.devices.find((device) => {
                return device.id == key ? device : undefined;
            }) as DevicePreviewVM;

            if (!gateway) {
                return;
            }

            gateway = {
                ...gateway,
                space: spaces_map[gateway.spaceId],
            };

            const devices = gateway_groups[key];

            const spaces_groups = groupBy('spaceId')(devices);

            const spaces_element = Object.keys(spaces_groups)
                // .sort()
                .map((key: string) => {
                    const devices = spaces_groups[key];

                    const device_element = devices.map(
                        (item: DevicePreviewVM) => {
                            const name = `${item.name} - ${item.id}`;
                            const id = item.id;
                            return (
                                <TreeItem key={id} nodeId={id} label={name} />
                            );
                        }
                    );

                    const space = spaces_map[key];

                    if (!space) {
                        return;
                    }

                    const name = `${space.name} - ${space.id}`;
                    const id = key;

                    return (
                        <TreeItem key={id} nodeId={id} label={name}>
                            {device_element}
                        </TreeItem>
                    );
                });

            const id = gateway.id;
            const space_name = gateway.space ? gateway.space.name : 'unknown';
            const name = `${space_name} - ${gateway.name} - ${gateway.id}`;

            return (
                <TreeItem
                    key={id}
                    nodeId={id}
                    label={name}
                    onLabelClick={() => {
                        console.log({ gateway });
                    }}
                >
                    {spaces_element}
                </TreeItem>
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

export default DeviceTreeView;
