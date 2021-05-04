import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DataMigrationSlice from "src/client/slices/DataMigrationSlice";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FetchSlice from "src/client/slices/FetchSlice";
import React, { ChangeEvent } from "react";
import { AxiosUtil } from "src/client/utils/AxiosUtil";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import { groupBy } from "src/client/utils/FunctionUtil";
import { ScrollUtil } from "src/client/utils/ScrollUtil";
import { TreeItem, TreeView } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import {
  DevicePreviewVM,
  ProjectPreviewVM,
  SpacePreviewVM,
} from "src/client/domain/migration/MigraionPreviewVM";

interface ProjectTreeViewProp {
  projects: ProjectPreviewVM[];
}

const ProjectTreeView: React.FC<ProjectTreeViewProp> = (props) => {
  const groups = groupBy("owner")(props.projects);

  const dispatch = useDispatch();

  // TODO Get from self api
  const origin = "http://192.168.128.20:8000";
  const client = AxiosUtil.makeAxiosInstance(dispatch, origin);

  const elements = Object.keys(groups).map((key: string) => {
    const projects: ProjectPreviewVM[] = groups[key];

    const subs = projects.map((project: ProjectPreviewVM) => {
      const handleClick = () => {
        // TODO
        // const code = "MjnQ";
        const code = project.projectCode;

        console.log(code);

        dispatch(DataMigrationSlice.selectProject(code));

        // TODO use session key
        const conn = (document.querySelector(
          "form #conn-string"
        ) as HTMLInputElement)?.value;
        const version = (document.querySelector(
          'select[name="version"]'
        ) as HTMLInputElement)?.value;
        const params = {
          conn,
          version,
        };
        // fetch spaces

        client
          .get<SpacePreviewVM[]>(`/api/migration/projects/${code}/spaces`, {
            params: {
              ...params,
              force: true,
            },
          })
          .then((res) => {
            dispatch(DataMigrationSlice.fetchSpaces([]));
            ScrollUtil.GotoTop("main");
            dispatch(DataMigrationSlice.fetchSpaces(res.data));
          })
          .catch(() => {})
          .finally(() => {
            dispatch(FetchSlice.end());
          });

        // fetch devices
        client
          .get<DevicePreviewVM[]>(`/api/migration/projects/${code}/devices`, {
            params: {
              ...params,
              force: true,
            },
          })
          .then((res) => {
            dispatch(DataMigrationSlice.fetchDevices([]));
            ScrollUtil.GotoTop("main");
            dispatch(DataMigrationSlice.fetchDevices(res.data));
          })
          .catch(() => {})
          .finally(() => {
            dispatch(FetchSlice.end());
          });
      };

      const label = `${project.projectCode} - ${project.displayName}`;
      return (
        <TreeItem
          key={project.projectCode}
          nodeId={project.projectCode}
          label={label}
          onClick={handleClick}
        />
      );
    });

    return (
      <TreeItem key={key} nodeId={key} label={key}>
        {subs}
      </TreeItem>
    );
  });

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      // expanded={expanded}
      // selected={selected}
      // onNodeToggle={handleToggle}
      // onNodeSelect={handleSelect}
    >
      {elements}
    </TreeView>
  );
};

export default ProjectTreeView;
