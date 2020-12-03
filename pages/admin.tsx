import * as React from "react";
import { AdminPage } from "src/client/containers/admin/AdminPage";
import { NextPage, NextPageContext } from "next";

export interface IndexPageProps {
  title: string;
}

export const IndexPage: NextPage<IndexPageProps> = (props) => {
  return (
    <React.Fragment>
      <AdminPage {...props} />
    </React.Fragment>
  );
};

IndexPage.getInitialProps = async (ctx: NextPageContext) => {
  return {
    title: "Home",
  };
};

export default IndexPage;
