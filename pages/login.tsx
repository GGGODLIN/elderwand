import Layout from "src/client/containers/layout/Layout";
import React, { useEffect } from "react";
import { InitialPayload, InitSlice } from "src/client/slices/InitSlice";
import LayoutSlice, { LayoutPayload } from "src/client/slices/LayoutSlice";
import { LoginPage } from "src/client/containers/auth/LoginPage";
import { NextPage, NextPageContext } from "next";
import { useDispatch } from "react-redux";

export interface LoginIndexProps {
  title: string;
}

export const LoginIndex: NextPage<LoginIndexProps> = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const page: InitialPayload = {
      name: "login",
    };
    dispatch(InitSlice.actions.initial(page));

    const layout: LayoutPayload = {
      feature_drawer: { display: false },
    };

    dispatch(LayoutSlice.initial(layout));
  }, []);

  return (
    <React.Fragment>
      <Layout {...props}>
        <LoginPage {...props} />
      </Layout>
    </React.Fragment>
  );
};

LoginIndex.getInitialProps = async (ctx: NextPageContext) => {
  return {
    title: "Login",
  };
};

export default LoginIndex;
