import AdminPage from "src/client/containers/admin/AdminPage";
import Layout from "src/client/containers/layout/Layout";
import React from "react";
import { NextPage } from "next";
import { PageInitialUtil } from "src/client/utils/PageInitialUtil";
import { useDispatch } from "react-redux";

export interface AdminIndexProps {
  title: string;
}

export const AdminIndex: NextPage<AdminIndexProps> = (props) => {
  const dispatch = useDispatch();

  PageInitialUtil.initPageInfo(dispatch);
  PageInitialUtil.initPageLayoutWithUser(dispatch);
  PageInitialUtil.initUserInfo(dispatch);

  return (
    <React.Fragment>
      <Layout {...props}>
        <AdminPage {...props} />
      </Layout>
    </React.Fragment>
  );
};

AdminIndex.getInitialProps = async () => {
  return {
    title: "Admin",
  };
};

export default AdminIndex;
