import Layout from "src/client/containers/layout/Layout";
import React from "react";
import { NextPage } from "next";
import { PageInitialUtil } from "src/client/utils/PageInitialUtil";
import { SpacePage } from "src/client/containers/space/SpacePage";
import { useDispatch } from "react-redux";

interface SpaceIndexProps {
  title: string;
}

export const SpaceIndex: NextPage<SpaceIndexProps> = (props) => {
  const dispatch = useDispatch();

  PageInitialUtil.initPageInfo(dispatch);
  PageInitialUtil.initPageLayoutWithUser(dispatch);
  PageInitialUtil.initUserInfo(dispatch);

  return (
    <React.Fragment>
      <Layout {...props}>
        <SpacePage {...props} />
      </Layout>
    </React.Fragment>
  );
};

SpaceIndex.getInitialProps = async () => {
  return {
    title: "Space",
  };
};

export default SpaceIndex;
