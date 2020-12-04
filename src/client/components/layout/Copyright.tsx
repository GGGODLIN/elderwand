import React from "react";
import { Box, Link, Typography } from "@material-ui/core";
import { EnvVar } from "../../configs/EnvVar";

export interface CopyrightProps {}

const Copyright: React.FC<CopyrightProps> = (props): React.ReactElement => {
  const domain = EnvVar.DomainName;
  const copyright = `Copyright © `;
  const url = `${document.location.origin}`;
  const year = `${new Date().getFullYear()}.`;

  return (
    <React.Fragment>
      <Box className={"copyright"}>
        <Typography>
          {copyright}
          <Link href={url} target={"_blank"}>
            {domain}
          </Link>{" "}
          {year}
        </Typography>
      </Box>
    </React.Fragment>
  );
};

export default Copyright;
