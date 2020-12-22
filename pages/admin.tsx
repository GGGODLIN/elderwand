import AdminPage from "src/client/containers/admin/AdminPage";
import Layout from "src/client/containers/layout/Layout";
import LayoutSlice, { LayoutPayload } from "src/client/slices/LayoutSlice";
import React, { useEffect } from "react";
import UserSlice from "src/client/slices/UserSlice";
import { AxiosError } from "axios";
import { AxiosUtil } from "src/client/utils/AxiosUtil";
import { InitialPayload, InitSlice } from "src/client/slices/InitSlice";
import { NextPage, NextPageContext } from "next";
import { useDispatch } from "react-redux";

export interface AdminIndexProps {
  title: string;
}

export const AdminIndex: NextPage<AdminIndexProps> = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const page: InitialPayload = {
      name: "admin",
    };
    dispatch(InitSlice.actions.initial(page));

    const layout: LayoutPayload = {
      feature_drawer: { display: true },
      profile_drawer: { display: true },
      goto_top: { display: true },
    };

    dispatch(LayoutSlice.initial(layout));
  }, []);

  useEffect(() => {
    const origin = location.origin;

    const client = AxiosUtil.makeAxiosInstance(dispatch, origin);

    client
      .get("/api/user/me")
      .then((res) => {
        if (res.status == 200) {
          dispatch(UserSlice.initial(res.data));
          return;
        }
      })
      .catch((err: AxiosError) => {
        console.log(err.response.status);
        console.log(err.message);
        document.location.replace("/logout");
      });
  }, []);

  return (
    <React.Fragment>
      <Layout {...props}>
        <AdminPage {...props} />
      </Layout>
    </React.Fragment>
  );
};

AdminIndex.getInitialProps = async (ctx: NextPageContext) => {
  return {
    title: "Admin",
  };
};

export default AdminIndex;
