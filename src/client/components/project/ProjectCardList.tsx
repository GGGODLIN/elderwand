import React from "react";
import { ProjectCard } from "./ProjectCard";
import { ProjectVM } from "../../domain/project/ProjectVM";
import { Grid } from "@material-ui/core";

export interface ProjectCardListProps {
  projects: ProjectVM[];
}

export const ProjectCardList: React.FC<ProjectCardListProps> = (props) => {
  const elements = props.projects.map((project, idx) => {
    return (
      <Grid item={true} xs={3} key={project.id}>
        <ProjectCard key={idx} project={project} />
      </Grid>
    );
  });

  return (
    <Grid
      container={true}
      direction="row"
      justify="space-around"
      alignItems="center"
    >
      {elements}
    </Grid>
  );
};
