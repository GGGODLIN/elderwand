import React from "react";
import { Box, Typography } from "@material-ui/core";
import { ClientEnvVar } from "src/client/configs/ClientEnvVar";

export interface CopyrightProps {}

export const Copyright: React.FC<CopyrightProps> = (): React.ReactElement => {
  const origin = document.location.origin;
  const port = document.location.port;
  const url = port ? `${origin}:${port}` : origin;

  const domain = ClientEnvVar.DomainName;
  const copyright = `Copyright ©`;
  const year = `${new Date().getFullYear()}`;
  const version = ClientEnvVar.Version;

  return (
    <React.Fragment>
      <Box className={"copyright"}>
        <Typography>
          {copyright}
          <a href={url} target={"_blank"}>
            {domain}
          </a>
          {`${year}.`} {`Ver: ${version}`}
        </Typography>
      </Box>
    </React.Fragment>
  );
};
