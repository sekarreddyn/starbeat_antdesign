import React, { Component } from "react";
import { connect } from "react-redux";
import { authActions } from "../actions";

import "antd/dist/antd.css";
import "../index.css";
import { Form, Icon, Input, Button, Row, Col, message, Card } from "antd";

import "../App.css";
import logo from "../assets/logo-sm.png";

class NormalLoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(authActions.login(values));
      }
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.auth.error !== this.props.auth.error) {
      message.error(this.props.auth.error && this.props.auth.error[0]);
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props.auth;

    return (
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ width: "100%", height: "100vh" }}
      >
        <Card>
          <Col span={24} style={{ textAlign: "center" }}>
            <img
              alt="example"
              src={logo}
              style={{
                width: "70px",
                marginBottom: "24px",
                textAlign: "center",
                marginRight: "auto",
                marginLeft: "auto"
              }}
            />
            <Form
              onSubmit={this.handleSubmit}
              className="login-form"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                height: "100%",
                width: 350
              }}
            >
              <Form.Item>
                {getFieldDecorator("username", {
                  rules: [
                    { required: true, message: "Please input your email!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="email"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your password!"
                    },
                    {
                      validator: this.validateToNextPassword
                    }
                  ]
                })(
                  <Input.Password
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Password"
                  />
                )}
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={loading}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Card>
      </Row>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(WrappedNormalLoginForm);
