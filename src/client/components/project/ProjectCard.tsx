import ApartmentIcon from "@material-ui/icons/Apartment";
import BusinessIcon from "@material-ui/icons/Business";
import clsx from "clsx";
import ControlCameraIcon from "@material-ui/icons/ControlCamera";
import HomeIcon from "@material-ui/icons/Home";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import React from "react";
import StoreIcon from "@material-ui/icons/Store";
import { ProjectVM } from "../../domain/project/ProjectVM";
import { Card, Grid, IconButton, Typography } from "@material-ui/core";

import BuildIcon from "@material-ui/icons/Build";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SettingsIcon from "@material-ui/icons/Settings";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import PublishIcon from "@material-ui/icons/Publish";

export interface ProjectCardProps {
  project: ProjectVM;
}

const ProjectTypeIconMap = {
  1: <BusinessIcon />,
  2: <ApartmentIcon />,
  3: <HomeIcon />,
  4: <HomeWorkIcon />,
  6: <StoreIcon />,
};

export const ProjectCard: React.FC<ProjectCardProps> = (props) => {
  const classname = clsx(["project-card"]);
  const { project } = props;
  return (
    <Card className={classname} id={project.id}>
      <Grid className={"card-header-actions"} container justify="space-between">
        <Grid item>
          <IconButton
            style={{ visibility: "visible" }}
            onClick={() => {
              console.log("click");
            }}
          >
            {ProjectTypeIconMap[project.type_id]}
          </IconButton>
        </Grid>

        <Grid item>
          <IconButton
            style={{ visibility: "hidden" }}
            onClick={() => {
              console.log("click");
            }}
          >
            <ControlCameraIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Grid
        className={"card-header"}
        container
        justify="center"
        direction="column"
      >
        <Grid item>
          <Typography variant="body1" align="left">
            {project.name}
          </Typography>
        </Grid>
      </Grid>

      <Grid className={"card-content"} container justify="center">
        <Grid item>
          <Typography variant="body2" align="left">
            {`Code: ${project.code}`}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" align="left">
            {`Status: ${project.status_name}`}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" align="left">
            {`Cloud Code: ${project.cloud_code}`}
          </Typography>
        </Grid>
      </Grid>

      <Grid className={"card-actions"} container justify="flex-end">
        <Grid item>
          <IconButton
            onClick={() => {
              console.log("click");
            }}
          >
            <AccountBoxIcon />
          </IconButton>
        </Grid>

        <Grid item>
          <IconButton
            onClick={() => {
              console.log("click");
            }}
          >
            <AttachFileIcon />
          </IconButton>
        </Grid>

        <Grid item>
          <IconButton
            onClick={() => {
              console.log("click");
            }}
          >
            <PublishIcon />
          </IconButton>
        </Grid>

        <Grid item>
          <IconButton
            onClick={() => {
              console.log("click");
            }}
          >
            <VisibilityIcon />
          </IconButton>
        </Grid>

        <Grid item>
          <IconButton
            onClick={() => {
              console.log("click");
            }}
          >
            <SettingsIcon />
          </IconButton>
        </Grid>

        <Grid item>
          <IconButton
            onClick={() => {
              console.log("click");
            }}
          >
            <DeleteForeverIcon />
          </IconButton>
        </Grid>

        <Grid item>
          <IconButton
            onClick={() => {
              console.log("click");
            }}
          >
            <BuildIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  );
};
