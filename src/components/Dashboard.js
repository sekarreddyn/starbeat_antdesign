import React from "react";
import { connect } from "react-redux";
import { Typography } from "antd";

const { Title } = Typography;
class Dashbpard extends React.Component {
  state = {};

  render() {
    return <Title>Dashboard</Title>;
  }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Dashbpard);
