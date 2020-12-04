import Copyright from "./Copyright";
import React from "react";
import { Container } from "@material-ui/core";

interface LayoutProps {}

type Props = LayoutProps;

const Layout: React.FC<Props> = (props) => {
  return (
    <React.Fragment>
      <nav className={"header-nav"}>
        <Container maxWidth={"xl"}>
          <a className={"link"} href={"/login"}>
            {"Login"}
          </a>
          <a className={"link"} href={"/logout"}>
            {"Logout"}
          </a>
        </Container>
      </nav>

      <main>{props.children}</main>

      <footer>
        <Container maxWidth={"xl"}>
          <Copyright />
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Layout;
