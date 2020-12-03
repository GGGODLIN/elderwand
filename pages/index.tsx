import * as React from "react";
import { HomePage } from "src/client/containers/home/HomePage";
import { NextPage, NextPageContext } from "next";

export interface IndexPageProps {
  title: string;
}

export const IndexPage: NextPage<IndexPageProps> = (props) => {
  return (
    <React.Fragment>
      <HomePage {...props} />
    </React.Fragment>
  );
};

IndexPage.getInitialProps = async (ctx: NextPageContext) => {
  return {
    title: "Home",
  };
};

export default IndexPage;
