import AccountTreeIcon from "@material-ui/icons/AccountTree";
import AppsIcon from "@material-ui/icons/Apps";
import AssignmentIcon from "@material-ui/icons/Assignment";
import dynamic from "next/dynamic";
import FetchSlice from "src/client/slices/FetchSlice";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ProjectList from "src/client/components/space/ProjectList";
import React, { ChangeEvent, Dispatch, useEffect, useState } from "react";
import ShareIcon from "@material-ui/icons/Share";
import SpaceBreadcrumbs from "src/client/components/space/SpaceBreadcrumbs";
import SpaceCardStyleList from "src/client/components/space/SpaceCardList";
import SpaceListTable from "src/client/components/space/SpaceListTable";
import SpaceSlice from "src/client/slices/SpaceSlice";
import SpaceTreeView from "src/client/components/space/SpaceTreeView";
import ThreeDRotationIcon from "@material-ui/icons/ThreeDRotation";
import { AxiosUtil } from "src/client/utils/AxiosUtil";
import { Card, CardContent, Tab, Tabs } from "@material-ui/core";
import { PaginationVM } from "src/client/models/PaginationVM";
import { ProjectVM } from "src/client/domain/project/ProjectVM";
import { RootState } from "src/client/reducer";
import { ScrollUtil } from "src/client/utils/ScrollUtil";
import { SpaceVM } from "src/client/domain/space/SpaceVM";
import { TabPanel } from "src/client/components/TabPanel";
import { useDispatch, useSelector } from "react-redux";

const Space2DTopologyGraphWithNoSSR = dynamic(
  () => import("src/client/components/space/Space2DTopologyGraph"),
  { ssr: false }
);
const Space3DTopologyGraphWithNoSSR = dynamic(
  () => import("src/client/components/space/Space3DTopologyGraph"),
  { ssr: false }
);

interface Space2DTopologyProp {
  spaces: SpaceVM[];
}

const Space2DTopology: React.FC<Space2DTopologyProp> = (props) => {
  return (
    <React.Fragment>
      <Space2DTopologyGraphWithNoSSR spaces={props.spaces} />
    </React.Fragment>
  );
};

interface Space3DTopologyProp {
  spaces: SpaceVM[];
}

const Space3DTopology: React.FC<Space3DTopologyProp> = (props) => {
  return (
    <React.Fragment>
      <Space3DTopologyGraphWithNoSSR spaces={props.spaces} />
    </React.Fragment>
  );
};

export interface SpacePageProps {
  title: string;
}

const fetchProjects = (dispatch: Dispatch<any>): void => {
  // TODO const origin = AxiosUtil.getOriginWithPort();
  const origin = "http://192.168.128.20:8000";
  const client = AxiosUtil.makeAxiosInstance(dispatch, origin);
  // TODO const url = "/api/projects";
  const url = "/api/projects";

  client
    .get<PaginationVM<ProjectVM>>(url, { params: {} })
    .then((res) => {
      ScrollUtil.GotoTop("main");
      dispatch(SpaceSlice.fetchProjects(res.data));
    })
    .catch(() => {})
    .finally(() => {
      dispatch(FetchSlice.end());
    });
};

const fetchSpaces = (dispatch: Dispatch<any>, project: ProjectVM): void => {
  const origin = "http://192.168.128.20:8000";
  const client = AxiosUtil.makeAxiosInstance(dispatch, origin);
  const url = "/api/spaces";
  const params = {
    project_id: project.id,
  };

  client
    .get<PaginationVM<SpaceVM>>(url, { params: params })
    .then((res) => {
      console.log(res.data);
      dispatch(SpaceSlice.fetchSpaces(res.data));
      ScrollUtil.GotoTop("main");
    })
    .catch(() => {})
    .finally(() => {
      dispatch(FetchSlice.end());
    });

  // TODO remove
  // const spaces = require("src/test/fixture/spaces.json");
  // const pvm = { results: spaces } as PaginationVM<SpaceVM>;

  // dispatch(SpaceSlice.fetchSpaces(pvm));
};

export const SpacePage: React.FC<SpacePageProps> = () => {
  const dispatch = useDispatch();
  const name = "space";
  const classname = `${name} page`;

  /* Toolbox Panel */
  const [toolbox_tab_index, setToolboxTabIndex] = useState(2);
  const toolbox_tab_name = "tool-box";

  const handleToolboxTabChange = (e: ChangeEvent, value: number) => {
    setToolboxTabIndex(value);
  };

  /* Space List View Tab Panel */
  const [space_list_tab_index, setSpaceListTabIndex] = useState(0);
  const space_list_tab_name = "space-list";

  const handleSpaceListTabChange = (e: ChangeEvent, value: number) => {
    setSpaceListTabIndex(value);
  };

  const { projects, project_selected, spaces, space_selected } = useSelector(
    (state: RootState) => {
      return {
        projects: state.space.projects,
        project_selected: state.space.project_selected,
        spaces: state.space.spaces || [],
        space_selected: state.space.space_selected,
      };
    }
  );

  useEffect(() => {
    const root = spaces.find((item) => item.parent_id == "");
    dispatch(SpaceSlice.selectSpace(root));
  }, [spaces]);

  useEffect(() => {
    ScrollUtil.GotoTop(".list-content");
  }, [space_selected]);

  const handleSelectSpaceCard = () => {};

  const handleSelectSpace = (item: SpaceVM) => {
    dispatch(SpaceSlice.selectSpace(item));
  };

  const handleSelectSmallSpaceCard = (item: SpaceVM) => {
    console.log("handleSelectSmallSpaceCard");
    dispatch(SpaceSlice.selectSpace(item));
  };

  useEffect(() => {
    fetchProjects(dispatch);
  }, []);

  useEffect(() => {
    if (project_selected != null) {
      fetchSpaces(dispatch, project_selected);
    }
  }, [project_selected]);

  return (
    <React.Fragment>
      <div className={classname}>
        {/* <div className="name">{"Space Page"}</div> */}
        <div className="space-page-top">
          {/* Breadcrumbs */}
          <SpaceBreadcrumbs
            space={space_selected}
            spaces={spaces}
            onClick={handleSelectSpace}
          />

          {/* Space View Tabs */}
          <Tabs
            className={"space-list-tabs"}
            value={space_list_tab_index}
            onChange={handleSpaceListTabChange}
          >
            <Tab icon={<AppsIcon />} aria-label="grid" />
            <Tab icon={<ListAltIcon />} aria-label="table" />
            <Tab icon={<ShareIcon />} aria-label="2d-topology" />
            <Tab icon={<ThreeDRotationIcon />} aria-label="3d-topology" />
          </Tabs>
        </div>
        {/* Tool Box */}

        <div className="space-page-left">{/* Tool Box */}</div>
        <Card className={"space-maintain-card"}>
          <CardContent className={"content"}>
            {/* Toolbox tabs */}
            <div className={"toolbox"}>
              <div className={"toolbox-tabs"}>
                <Tabs
                  value={toolbox_tab_index}
                  onChange={handleToolboxTabChange}
                >
                  <Tab icon={<AppsIcon />} aria-label="space-cards" />
                  <Tab
                    icon={<AccountTreeIcon />}
                    aria-label="space-tree-view"
                  />
                  <Tab icon={<AssignmentIcon />} aria-label="projects" />
                </Tabs>
              </div>
              <div className="toolbox-panels">
                <TabPanel
                  name={toolbox_tab_name}
                  value={toolbox_tab_index}
                  index={0}
                >
                  {"Space Card Item list"}
                </TabPanel>
                <TabPanel
                  name={toolbox_tab_name}
                  value={toolbox_tab_index}
                  index={1}
                >
                  {/* Spaces tree view */}
                  <SpaceTreeView spaces={spaces} />
                </TabPanel>
                <TabPanel
                  name={toolbox_tab_name}
                  value={toolbox_tab_index}
                  index={2}
                >
                  {/* Space Card Item list */}
                  <ProjectList projects={projects} />
                </TabPanel>
              </div>
            </div>

            {/* Space view panels*/}
            <div className="list-content">
              {/* Space card style view in panel */}
              <TabPanel
                name={space_list_tab_name}
                value={space_list_tab_index}
                index={0}
              >
                {/* // TODO Rename */}
                <SpaceCardStyleList
                  space={space_selected}
                  spaces={spaces}
                  onSelectCard={handleSelectSpaceCard}
                  onSelectSmallCard={handleSelectSmallSpaceCard}
                />
              </TabPanel>
              {/* Space table style view in panel */}
              <TabPanel
                name={space_list_tab_name}
                value={space_list_tab_index}
                index={1}
              >
                <SpaceListTable spaces={spaces} selected={[]} />
              </TabPanel>
              {/* Space Topology Style view in panel */}
              <TabPanel
                name={space_list_tab_name}
                value={space_list_tab_index}
                index={2}
              >
                <Space2DTopology spaces={spaces} />
              </TabPanel>
              <TabPanel
                name={space_list_tab_name}
                value={space_list_tab_index}
                index={3}
              >
                <Space3DTopology spaces={spaces} />
              </TabPanel>
            </div>
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default SpacePage;
