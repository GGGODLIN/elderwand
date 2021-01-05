import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DeviceHubIcon from "@material-ui/icons/DeviceHub";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import PeopleIcon from "@material-ui/icons/People";

export enum FeatureIconEnum {
  Dashboard = "dashboard",
  User = "user",
  Group = "group",
  Project = "project",
  Spatial = "spatial",
  Device = "device",
}

export const FeatureIconMap = {
  dashboard: <DashboardIcon />,
  user: <PeopleIcon />,
  project: <AssignmentIndIcon />,
  group: <GroupWorkIcon />,
  spatial: <HomeWorkIcon />,
  device: <DeviceHubIcon />,
};
