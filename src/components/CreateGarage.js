import React from "react";
import { connect } from "react-redux";
import { registrationActions } from "../actions";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  Card,
  Radio,
  message
} from "antd";

const { Option } = Select;

class CreateGarage extends React.Component {
  state = {
    confirmDirty: false,
    ShippingAddress: false,
    autoCompleteResult: [],
    countries: [],
    states: [],
    districts: [],
    upihandles: [],
    payment_type: "upi",
    months: [
      {
        label: "01",
        value: "01"
      },
      {
        label: "02",
        value: "02"
      },
      {
        label: "04",
        value: "04"
      },
      {
        label: "05",
        value: "05"
      },
      {
        label: "06",
        value: "06"
      },
      {
        label: "06",
        value: "06"
      },
      {
        label: "07",
        value: "07"
      },
      {
        label: "08",
        value: "08"
      },
      {
        label: "09",
        value: "09"
      },
      {
        label: "10",
        value: "10"
      },
      {
        label: "11",
        value: "11"
      },
      {
        label: "12",
        value: "12"
      }
    ],
    years: [],
    salutations: [
      {
        label: "Mr",
        value: "Mr"
      },
      {
        label: "Ms",
        value: "Ms"
      },
      {
        label: "Mx",
        value: "Mx"
      },
      {
        label: "Dr",
        value: "Dr"
      },
      {
        label: "Mrs",
        value: "Mrs"
      },
      {
        label: "Madam",
        value: "Madam"
      },
      {
        label: "Miss",
        value: "Miss"
      },
      {
        label: "Master",
        value: "Master"
      },
      {
        label: "Prof",
        value: "Prof"
      }
    ],
    copied: false,
    copiedText: "",
    isShippingAndBillingSame: false,
    isUpi: true
  };

  /** Call get countries,territories,upihandles api's  **/

  componentDidMount() {
    this.props.dispatch(registrationActions.getCountries());
    this.props.dispatch(
      registrationActions.getStates({ label: "India", value: 1 })
    );
    this.props.dispatch(registrationActions.getTerritories());
    this.props.dispatch(registrationActions.getUpiHandles());
    this.props.dispatch(registrationActions.getGarages());
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.registration.error !== this.props.registration.error) {
      message.error(
        this.props.registration.error && this.props.registration.error.errors
      );
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.dispatch(registrationActions.createGarage(values));
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  handleSelectChange = value => {
    this.props.dispatch(registrationActions.getDistricts(value));
  };
  handleStateSelectChange = value => {
    this.props.dispatch(registrationActions.getDistricts(value));
  };
  changeShippingAddress = e => {
    this.setState({
      ShippingAddress: e.target.checked
    });
  };
  OnPaymentTypechange = e => {
    this.setState({
      payment_type: e.target.value
    });
  };

  /**
   * This method used to populate next 21 years list, that which is used in
   * credit card year selection
   *
   */
  populateYears = () => {
    let date = new Date(),
      years = [],
      year = date.getFullYear();
    for (let i = year; i < year + 21; i++) {
      let obj = {};
      obj["label"] = i.toString();
      obj["value"] = i.toString();
      years.push(obj);
    }
    return years;
  };
  compareToFirstPhoneNumber = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value === form.getFieldValue("contact.phone")) {
      callback("Phone and mobile number should be different!");
    } else {
      callback();
    }
  };

  compareToPrimaryEmail = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value === form.getFieldValue("billing.emailId")) {
      callback("Primary  and alternate  email should be different!");
    } else {
      callback();
    }
  };
  compareToPrimaryEmailInShipping = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value === form.getFieldValue("shipping.emailId")) {
      callback("Primary  and alternate  email should be different!");
    } else {
      callback();
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    const {
      states,
      districts,
      upihandles,
      territories
    } = this.props.registration;
    const { salutations, payment_type } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const checkFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 16,
          offset: 4
        },
        sm: {
          span: 16,
          offset: 4
        }
      }
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Card title="Basic Information" type="inner">
          <Form.Item label={"Garage Name"}>
            {getFieldDecorator("customer_name", {
              rules: [
                {
                  required: true,
                  message: "Please input enter garage name!",
                  whitespace: true
                }
              ]
            })(<Input placeholder="Garage name" />)}
          </Form.Item>
          <Form.Item label="Terittory Name">
            {getFieldDecorator("territory_name")(
              <Select
                placeholder="Select terittory name"
                onChange={this.handleSelectChange}
              >
                {territories &&
                  territories.data.map(item => (
                    <Option value={item.value}>{item.label}</Option>
                  ))}
              </Select>
            )}
          </Form.Item>
        </Card>

        <Card
          title="Contact Information"
          extra="Primary Contact"
          type="inner"
          style={{ marginTop: 26 }}
        >
          <Form.Item label="Salutation">
            {getFieldDecorator("contact.salutation")(
              <Select
                placeholder="Select salutation"
                onChange={this.handleSelectChange}
              >
                {salutations &&
                  salutations.map(salutation => (
                    <Option value={salutation.value}>{salutation.label}</Option>
                  ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item label="First Name">
            {getFieldDecorator("contact.first_name", {
              rules: [
                {
                  required: true,
                  message: "Please input enter first name!",
                  whitespace: true
                }
              ]
            })(<Input placeholder="First name" />)}
          </Form.Item>
          <Form.Item label="Last Name">
            {getFieldDecorator("contact.last_name", {
              rules: [
                {
                  required: true,
                  message: "Please input enter last name!",
                  whitespace: true
                }
              ]
            })(<Input placeholder="Last name" />)}
          </Form.Item>
          <Form.Item label="Phone">
            {getFieldDecorator("contact.phone", {
              rules: [
                {
                  required: true,
                  message: "Please input enter phone number!",
                  whitespace: true
                }
              ]
            })(<Input placeholder="Phone" />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Email&nbsp;
                <Tooltip title="All notifications will be sent to this mail">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator("contact.email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid e-mail!"
                },
                {
                  required: true,
                  message: "Please input enter email!",
                  whitespace: true
                }
              ]
            })(<Input placeholder="Email" />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Mobile Number&nbsp;
                <Tooltip title="All notifications will be sent to this mobile">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator("contact.mobile_no", {
              rules: [
                {
                  required: true,
                  message: "Please  enter mobile number!",
                  whitespace: true
                },
                {
                  validator: this.compareToFirstPhoneNumber
                }
              ]
            })(<Input placeholder="Mobile Number" />)}
          </Form.Item>
          <Form.Item label="Alternate Mobile Number">
            {getFieldDecorator("contact.mobile_number_2")(
              <Input placeholder="Alternate Mobile Number" />
            )}
          </Form.Item>
        </Card>
        <Card title="Garage Address" type="inner" style={{ marginTop: 26 }}>
          <Form.Item label="Address Line 1">
            {getFieldDecorator("billing.address_line1", {
              rules: [
                {
                  required: true,
                  message: "Please input enter address Line 1!",
                  whitespace: true
                }
              ]
            })(<Input placeholder="Address Line 1" />)}
          </Form.Item>
          <Form.Item label="Address Line 2">
            {getFieldDecorator("billing.address_line2")(
              <Input placeholder="Address Line 2" />
            )}
          </Form.Item>
          <Form.Item label="State">
            {getFieldDecorator("billing.state", {
              rules: [{ required: true, message: "Please select enter state!" }]
            })(
              <Select
                placeholder="Select state"
                onChange={this.handleStateSelectChange}
                loading={states.loading}
              >
                {states &&
                  states.data.map(state => (
                    <Option value={state.value}>{state.label}</Option>
                  ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="District">
            {getFieldDecorator("billing.district", {
              rules: [
                { required: true, message: "Please select enter district!" }
              ]
            })(
              <Select
                placeholder="Select district"
                onChange={this.handleSelectChange}
                loading={districts.loading}
              >
                {districts &&
                  districts.data.map(district => (
                    <Option value={district.value}>{district.label}</Option>
                  ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="City">
            {getFieldDecorator("billing.city", {
              rules: [
                {
                  required: true,
                  message: "Please input enter city!",
                  whitespace: true
                }
              ]
            })(<Input placeholder="City" />)}
          </Form.Item>
          <Form.Item label="Postal Code">
            {getFieldDecorator("billing.pincode", {
              rules: [
                {
                  required: true,
                  message: "Please input enter postal code!",
                  whitespace: true
                }
              ]
            })(<Input placeholder="Postal Code" />)}
          </Form.Item>
          <Form.Item label="Primary Email">
            {getFieldDecorator("billing.emailId", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid e-mail!"
                },
                {
                  required: true,
                  message: "Please input enter primary email!",
                  whitespace: true
                }
              ]
            })(<Input placeholder="Primary Email" />)}
          </Form.Item>
          <Form.Item label="Alternate Email">
            {getFieldDecorator("billing.email_address_2", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid e-mail!"
                },
                {
                  required: false,
                  validator: this.compareToPrimaryEmail
                }
              ]
            })(<Input placeholder="Alternate Email" />)}
          </Form.Item>
          <Form.Item label="Alternate Mobile">
            {getFieldDecorator("billing.phone2")(
              <Input placeholder="Alternate Mobile" />
            )}
          </Form.Item>
          <Form.Item label="Landline Number">
            {getFieldDecorator("billing.Landline_number_1")(
              <Input placeholder="Landline Number" />
            )}
          </Form.Item>
          <Form.Item label="GST Number">
            {getFieldDecorator("billing.gstin")(
              <Input placeholder="GST Number" />
            )}
          </Form.Item>
          <Form.Item label="Google Plus Code">
            {getFieldDecorator("billing.google_maps_plus_code", {
              rules: [
                {
                  required: true,
                  message: "Please input enter Google Plus Code!",
                  whitespace: true
                }
              ]
            })(<Input placeholder="Google Plus Code" />)}
          </Form.Item>
        </Card>
        <Card title="Shipping Address" type="inner" style={{ marginTop: 26 }}>
          <Form.Item {...checkFormItemLayout}>
            <Checkbox onChange={this.changeShippingAddress}>
              Is shipping address is same as billing
            </Checkbox>
          </Form.Item>

          {!this.state.ShippingAddress && (
            <React.Fragment>
              <Form.Item label="Address Line 1">
                {getFieldDecorator("shipping.address_line1", {
                  rules: [
                    {
                      required: true,
                      message: "Please input enter address Line 1!",
                      whitespace: true
                    }
                  ]
                })(<Input placeholder="Address Line 2" />)}
              </Form.Item>
              <Form.Item label="Address Line 2">
                {getFieldDecorator("shipping.address_line2")(
                  <Input placeholder="Address Line 1" />
                )}
              </Form.Item>
              <Form.Item label="State">
                {getFieldDecorator("shipping.state", {
                  rules: [
                    { required: true, message: "Please select the state!" }
                  ]
                })(
                  <Select
                    placeholder="Select state"
                    onChange={this.handleSelectChange}
                    loading={states.loading}
                  >
                    {states &&
                      states.data.map(country => (
                        <Option value={country.value}>{country.label}</Option>
                      ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="District">
                {getFieldDecorator("shipping.district", {
                  rules: [
                    { required: true, message: "Please select the district!" }
                  ]
                })(
                  <Select
                    placeholder="Select district"
                    onChange={this.handleSelectChange}
                    loading={districts.loading}
                  >
                    {districts &&
                      districts.data.map(district => (
                        <Option value={district.value}>{district.label}</Option>
                      ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="City">
                {getFieldDecorator("shipping.city", {
                  rules: [
                    {
                      required: true,
                      message: "Please  enter the city!",
                      whitespace: true
                    }
                  ]
                })(<Input placeholder="City" />)}
              </Form.Item>
              <Form.Item label="Postal Code">
                {getFieldDecorator("shipping.pincode", {
                  rules: [
                    {
                      required: true,
                      message: "Please  enter postal code!",
                      whitespace: true
                    }
                  ]
                })(<Input placeholder="Postal Code" />)}
              </Form.Item>
              <Form.Item label="Primary Email">
                {getFieldDecorator("shipping.emailId", {
                  rules: [
                    {
                      required: true,
                      message: "Please  enter primary email!",
                      whitespace: true
                    }
                  ]
                })(<Input placeholder="Primary Email" />)}
              </Form.Item>
              <Form.Item label="Alternate Email">
                {getFieldDecorator("shipping.email_address_2", {
                  rules: [
                    {
                      type: "email",
                      message: "The input is not valid e-mail!"
                    },
                    {
                      required: false,
                      validator: this.compareToPrimaryEmailInShipping
                    }
                  ]
                })(<Input placeholder="Alternate Email" />)}
              </Form.Item>
              <Form.Item label="Alternate Mobile">
                {getFieldDecorator("shipping.phone2")(
                  <Input placeholder="Alternate Mobile" />
                )}
              </Form.Item>
              <Form.Item label="Landline Number">
                {getFieldDecorator("shipping.Landline_number_1")(
                  <Input placeholder="Landline Number" />
                )}
              </Form.Item>
            </React.Fragment>
          )}
        </Card>
        <Card
          title="Payment Information"
          type="inner"
          style={{ marginTop: 26 }}
        >
          <Form.Item label="Payment type">
            {getFieldDecorator("payment.type", {
              initialValue: payment_type
            })(
              <Radio.Group onChange={this.OnPaymentTypechange}>
                <Radio value="upi">Upi</Radio>
                <Radio value="prepaidcard"> Prepaid card</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          {payment_type === "upi" && (
            <React.Fragment>
              <Row type="flex" justify="end">
                <Col span={4}>
                  <Form.Item>
                    {getFieldDecorator("payment.upi_id", {
                      rules: [
                        {
                          required: true,
                          message: "Please  enter UPI ID!",
                          whitespace: true
                        }
                      ]
                    })(<Input placeholder="UPI ID" />)}
                  </Form.Item>
                </Col>
                <Col span={1}>@</Col>
                <Col span={15}>
                  <Form.Item>
                    {getFieldDecorator("payment.upi_handle", {
                      rules: [
                        {
                          required: true,
                          message: "Please  select upi handle!",
                          whitespace: true
                        }
                      ]
                    })(
                      <Select
                        placeholder="Select handle "
                        onChange={this.handleSelectChange}
                        loading={upihandles.loading}
                      >
                        {upihandles &&
                          upihandles.data.map(item => (
                            <Option value={item.value}>{item.label}</Option>
                          ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </React.Fragment>
          )}
          {payment_type === "prepaidcard" && (
            <React.Fragment>
              <Form.Item label={"Card number "}>
                {getFieldDecorator("customer_name", {
                  rules: [
                    {
                      required: true,
                      message: "Please enter card number!",
                      whitespace: true
                    }
                  ]
                })(<Input placeholder="Card number" />)}
              </Form.Item>
              <Form.Item label="Month">
                {getFieldDecorator("payment.expiry_date.month", {
                  rules: [
                    {
                      required: true,
                      message: "Please select month!",
                      whitespace: true
                    }
                  ]
                })(
                  <Select
                    placeholder="Select month"
                    onChange={this.handleSelectChange}
                  >
                    {this.state.months &&
                      this.state.months.map(month => (
                        <Option value={month.value}>{month.label}</Option>
                      ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="Year">
                {getFieldDecorator("payment.expiry_date.year", {
                  rules: [
                    {
                      required: true,
                      message: "Please select year!",
                      whitespace: true
                    }
                  ]
                })(
                  <Select
                    placeholder="Select year"
                    onChange={this.handleSelectChange}
                  >
                    {this.populateYears().map(item => (
                      <Option value={item.value}>{item.label}</Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </React.Fragment>
          )}
        </Card>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{ marginTop: 20 }}>
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: "register" })(CreateGarage);

const mapStateToProps = state => ({
  registration: state.registration
});
export default connect(mapStateToProps)(WrappedRegistrationForm);
