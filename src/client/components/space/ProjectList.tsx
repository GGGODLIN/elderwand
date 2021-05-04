import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import SpaceSlice from "src/client/slices/SpaceSlice";
import { ProjectVM } from "src/client/domain/project/ProjectVM";
import { TreeItem, TreeView } from "@material-ui/lab";
import { useDispatch } from "react-redux";

interface ProjectListProp {
  projects: ProjectVM[];
}

const ProjectList: React.FC<ProjectListProp> = (props) => {
  const dispatch = useDispatch();
  const items = Array.isArray(props.projects) ? props.projects : [];

  const elements = items.map((item) => {
    const id = item.id;
    const name = `${item.code}-${item.name}`;
    const handleClick = () => {
      console.log(item);
      dispatch(SpaceSlice.selectProject(item));
    };
    return <TreeItem key={id} nodeId={id} label={name} onClick={handleClick} />;
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

export default ProjectList;
