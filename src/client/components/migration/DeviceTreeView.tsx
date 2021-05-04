import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { DevicePreviewVM } from "src/client/domain/migration/MigraionPreviewVM";
import { groupBy } from "src/client/utils/FunctionUtil";
import { TreeItem, TreeView } from "@material-ui/lab";

interface DeviceTreeViewProp {
  devices: DevicePreviewVM[];
}

const DeviceTreeView: React.FC<DeviceTreeViewProp> = (props) => {
  const gateway_groups = groupBy("parent_id")(props.devices);

  const elements = Object.keys(gateway_groups)
    .sort()
    .map((key) => {
      const gateway = props.devices.find((device) => {
        return device.id == key ? device : undefined;
      });

      if (!gateway) {
        return;
      }

      const devices = gateway_groups[key];

      const spaces_groups = groupBy("space_id")(devices);

      const spaces_element = Object.keys(spaces_groups)
        // .sort()
        .map((key: string) => {
          const devices = spaces_groups[key];

          const device_element = devices.map((item: DevicePreviewVM) => {
            const name = `${item.name} - ${item.id}`;
            const id = item.id;
            return <TreeItem key={id} nodeId={id} label={name} />;
          });

          const space = devices[0].space;

          if (!space) {
            console.log(devices[0]);
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

      const handleClick = () => {
        console.log(gateway.id);
      };

      const name = `${gateway.space?.name} - ${gateway.name} - ${gateway.id}`;
      const id = gateway.id;

      return (
        <TreeItem key={id} nodeId={id} label={name} onClick={handleClick}>
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
