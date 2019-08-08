import React, { Component } from "react";
import { Layout, Menu, Icon, Dropdown } from "antd";
import { connect } from "react-redux";
import { authActions, dashboardActions } from "../../actions";

const { Header } = Layout;

class Navbar extends Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
    this.props.dispatch(
      dashboardActions.openCloseSidemenu(!this.state.collapsed)
    );
  };

  handleClick = e => {
    this.props.dispatch(authActions.logout());
  };

  menu = (
    <Menu style={{ marginRight: "15px" }} onClick={this.handleClick}>
      <Menu.Item>
        <Icon type="user" />
        Logout
      </Menu.Item>
    </Menu>
  );

  render() {
    return (
      <div>
        <Header style={{ background: "#fff", padding: 0 }}>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "64px" }}
          >
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
            <Dropdown overlay={this.menu} placement="bottomLeft">
              <Icon
                className="trigger"
                style={{ float: "right" }}
                type="user"
              />
            </Dropdown>
          </Menu>
        </Header>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Navbar);
