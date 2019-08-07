import React from "react";
import { Redirect, Route } from "react-router-dom";
import Header from "../components/Layout/Header";
import Sidemenu from "../components/Layout/Sidemenu";
import { Layout } from "antd";

const { Content, Footer } = Layout;
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("user") ? (
        <Layout style={{ minHeight: "100vh" }}>
          <Sidemenu />
          <Layout>
            <Header />
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                minHeight: 280
              }}
            >
              <Component key={props.match.params.type} {...props} />
            </Content>
            <Footer style={{ textAlign: "center" }}>Appandgeek ©2018 </Footer>
          </Layout>
        </Layout>
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              from: props.location
            }
          }}
        />
      )
    }
  />
);
export default PrivateRoute;
