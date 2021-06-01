import clsx from "clsx";
import DataMigrationSlice from "src/client/slices/DataMigrationSlice";
import DeviceTreeView from "src/client/components/migration/DeviceTreeView";
import FetchSlice from "src/client/slices/FetchSlice";
import ProjectTreeView from "src/client/components/migration/ProjectTreeView";
import React, { ChangeEvent, useState } from "react";
import SpacePreviewTreeView from "src/client/components/migration/SpacePreviewTreeView";
import VersionSelector from "src/client/components/migration/VersionSelector";
import { AxiosUtil } from "src/client/utils/AxiosUtil";
import { ClientEnvVar, DevEnvVar } from "src/client/configs/ClientEnvVar";
import { ImportProjectFAB } from "src/client/components/migration/ImportProjectFAB";
import { ProjectPreviewVM } from "src/client/domain/migration/MigraionPreviewVM";
import { RootState } from "src/client/reducer";
import { ScrollUtil } from "src/client/utils/ScrollUtil";
import { TabPanel } from "src/client/components/TabPanel";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardContent,
  Tab,
  Tabs,
  TextField,
} from "@material-ui/core";

export interface DataMigrationPageProps {
  title: string;
}

// TODO rewrite use store
const getConnectionParams = () => {
  const conn = (document.querySelector("form #conn-string") as HTMLInputElement)
    ?.value;
  const version = (document.querySelector(
    'select[name="version"]'
  ) as HTMLInputElement)?.value;
  const dbname = (document.querySelector("form #dbname") as HTMLInputElement)
    ?.value;
  const params = {
    conn,
    dbname,
    version,
  };

  return params;
};

export const DataMigrationPage: React.FC<DataMigrationPageProps> = () => {
  const name = "migration";
  const classname = `${name} page`;
  const dispatch = useDispatch();

  /* Tab Panel */
  const [tab_index, setTabIndex] = useState(1);

  const handleChange = (e: ChangeEvent, value: number) => {
    setTabIndex(value);
  };

  /* Migration action */
  const [isImport, setMigrationAction] = useState(true);

  const handleImportClick = () => {
    setMigrationAction(true);
    console.log("todo clear panel");
  };

  const handleExportClick = () => {
    setMigrationAction(false);
    console.log("todo clear panel");
  };

  // TODO use origin
  // const origin = AxiosUtil.getOriginWithPort();
  const origin = `http://${DevEnvVar.SkymapApiHost}`;
  const client = AxiosUtil.makeAxiosInstance(dispatch, origin);

  // TODO from  useForm
  const handleConnectClick = () => {
    // TODO use new connect session
    const params = getConnectionParams();

    client
      .get<ProjectPreviewVM[]>("/api/migration/projects", { params: params })
      .then((res) => {
        ScrollUtil.GotoTop("main");
        dispatch(DataMigrationSlice.fetchProjects(res.data));
      })
      .catch(() => {})
      .finally(() => {
        dispatch(FetchSlice.end());
      });
  };

  const handleClearClick = () => {
    dispatch(DataMigrationSlice.clear());
  };

  const handleDisconnectClick = () => {
    console.log("disconnect");
  };

  let conn = "";

  if (ClientEnvVar.IsDev) {
    conn = DevEnvVar.MigrationSourceMongoUri;
  }

  const { projects, spaces, devices } = useSelector((store: RootState) => {
    return {
      projects: store.migration.projects,
      spaces: store.migration.spaces,
      devices: store.migration.devices,
    };
  });

  /* Action Buttons */
  const { goto_top, projects_selected } = useSelector((state: RootState) => {
    return {
      goto_top: state.layout.goto_top,
      projects_selected: state.migration.project_selected,
    };
  });

  const actions = clsx(["fab-actions", goto_top.show ? "with-goto-top" : ""]);

  const import_project_disable = projects_selected == "";

  return (
    <React.Fragment>
      <div className={classname}>
        {/* <div className="name">{"DataMigration Page"}</div> */}
        <Tabs
          className={`${name}-tabs`}
          value={tab_index}
          onChange={handleChange}
        >
          <Tab aria-label="account" label={"Account"} />
          <Tab aria-label="project" label={"Project"} />
        </Tabs>

        <Card className={`${name}-card`}>
          <CardContent>
            <div className={"connect-info"}>
              <Button className={"export-btn"} onClick={handleExportClick}>
                {"Export"}
              </Button>
              <Button className={"import-btn"} onClick={handleImportClick}>
                {"Import"}
              </Button>

              {/* Connection String */}
              {isImport && (
                <form noValidate autoComplete="off">
                  <TextField
                    id="conn-string"
                    label="connect string"
                    variant="outlined"
                    type="text"
                    // value={conn}
                    defaultValue={conn}
                    size="small"
                  />
                  <TextField
                    id="dbname"
                    label="DB Name"
                    variant="outlined"
                    type="text"
                    // value={"sake"}
                    defaultValue={"sake"}
                    size="small"
                  />
                  {/* Version Selector */}
                  <VersionSelector />
                  {/* Connect Buttons */}
                  <Button
                    className={"connect-btn"}
                    onClick={handleConnectClick}
                  >
                    {"Connect"}
                  </Button>
                  <Button
                    className={"disconnect-btn"}
                    onClick={handleDisconnectClick}
                  >
                    {"Disconnect"}
                  </Button>
                </form>
              )}
              {/* <Button className={"refresh-btn"} onClick={handleRefreshClick}>
                {"Refresh"}
              </Button> */}
              <Button className={"clear-btn"} onClick={handleClearClick}>
                {"Clear"}
              </Button>
            </div>
            {/* Account Migration Panel */}
            <TabPanel name={name} value={tab_index} index={0}>
              <div>{"Account"}</div>
            </TabPanel>
            {/* Project Migration Panel */}
            <TabPanel
              className="data-info"
              name={name}
              value={tab_index}
              index={1}
            >
              <div className="project-list">
                <div className="list-header">{"Project List"}</div>
                <ProjectTreeView projects={projects} />
              </div>
              <div className="space-list">
                <div className="list-header">{"Space List"}</div>
                <SpacePreviewTreeView spaces={spaces} />
              </div>
              <div className="device-list">
                <div className="list-header">{"Device List"}</div>
                <DeviceTreeView devices={devices} />
              </div>
            </TabPanel>
          </CardContent>
        </Card>

        {/* Import Model Action Buttons */}
        {isImport && (
          <div className={actions}>
            <ImportProjectFAB display={true} disable={import_project_disable} />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default DataMigrationPage;
