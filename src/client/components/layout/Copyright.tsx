import React from "react";
import { Box, Link, Typography } from "@material-ui/core";
import { ClientEnvVar } from "src/client/configs/ClientEnvVar";

export interface CopyrightProps {}

export const Copyright: React.FC<CopyrightProps> = (
  props
): React.ReactElement => {
  const domain = ClientEnvVar.DomainName;
  const copyright = `Copyright ©`;
  const url = `${document.location.origin}`;
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
