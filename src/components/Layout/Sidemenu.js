import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import { connect } from "react-redux";
import logo from "../../assets/logo.png";
import logoSmall from "../../assets/logo-sm.png";

import "antd/dist/antd.css";
import "../../App.css";
const { Sider } = Layout;
const { SubMenu } = Menu;
class Sidemenu extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.collapsed !== nextProps.collapsed) {
      this.setState({
        collapsed: nextProps.collapsed
      });
    }
  }
  render() {
    console.log(this.props.location);
    const { location } = this.props;
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        theme="light"
      >
        <div className="logo">
          <img
            src={this.state.collapsed ? logoSmall : logo}
            alt=""
            style={
              this.state.collapsed
                ? { width: 40, paddingLeft: 5 }
                : { width: 110, paddingLeft: 2 }
            }
          />
        </div>

        <Menu theme="light" selectedKeys={[location.pathname]} mode="inline">
          <Menu.Item key="/">
            <NavLink to="/">
              <Icon type="dashboard" />
              <span>Dashboard</span>
            </NavLink>
          </Menu.Item>

          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>Stars</span>
              </span>
            }
          >
            <Menu.Item key="/web/stars/approved">
              <NavLink to="/web/stars/approved">
                <Icon type="dashboard" />
                <span>Approved</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/web/stars/pending">
              <NavLink to="/web/stars/pending">
                <Icon type="dashboard" />
                <span>Pending</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/web/stars/deleted">
              <NavLink to="/web/stars/deleted">
                <Icon type="dashboard" />
                <span>Deleted</span>
              </NavLink>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}
const mapStateToProps = state => ({
  collapsed: state.dashboard.collapsed
});

export default withRouter(connect(mapStateToProps)(Sidemenu));
