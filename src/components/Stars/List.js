import React from "react";
import { connect } from "react-redux";
import { Table, Button, Avatar, Modal, Tag, Divider } from "antd";
import { starActions } from "../../actions";
import { pagable } from "../../helpers";

const { confirm } = Modal;

class Candidates extends React.Component {
  state = { pagination: {} };
  componentDidMount() {
    this.props.dispatch(
      starActions.getAll(this.getType(), pagable, this.getUrl())
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.star !== this.props.star) {
      const { list } = nextProps.star;
      const { number, totalElements } = list;
      console.log(number, totalElements);
      this.setState({
        pagination: {
          current: number,
          total: totalElements
        }
      });
    }
  }
  getType = () => {
    return this.props.match.params;
  };
  getUrl = () => {
    return this.props.location.pathname;
  };
  handleTableChange = (pagination, filters, sorter) => {
    let pager = pagination;
    delete pager.total;
    delete pager.pageSize;
    pager.pageNo = pagination.current;
    console.log(pager);
    this.props.dispatch(
      starActions.getAll(this.getType(), pager, this.getUrl())
    );
  };
  deleteStar = item => {
    const { dispatch } = this.props;

    confirm({
      title: "Are you sure delete this star?",
      content: "",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",

      onOk() {
        dispatch(starActions.deleteStar(item));
      },
      onCancel() {}
    });
  };

  render() {
    const { list } = this.props.star;
    const { loading, content } = list;
    const { pagination } = this.state;
    const columns = [
      {
        title: "Id",
        dataIndex: "id",
        width: "15%"
      },
      {
        title: "Name",
        sorter: true,
        width: "35%",
        render: (text, record) => (
          <span>
            <Avatar
              shape="square"
              type="primary"
              size="large"
              className="mr-2"
              style={{ backgroundColor: "#1890ff" }}
              src={record.profileUrl}
            />
            {record.firstName} {record.lastName}
          </span>
        )
      },
      {
        title: "Born",
        sorter: true,
        width: "10%",
        render: (text, record) => <span>{record.born}</span>
      },

      {
        title: "Status",

        width: "20%",
        render: (text, record) => (
          <span>
            {record.verified ? (
              <Tag color={"green"}>{"Verified"}</Tag>
            ) : (
              <Tag color={"red"}>{"NotVerified"}</Tag>
            )}

            {record.active ? (
              <Tag color={"green"}>{"Active"}</Tag>
            ) : (
              <Tag color={"red"}>{"InActive"}</Tag>
            )}
          </span>
        )
      },

      {
        title: "Action",
        key: "action",
        width: "20%",
        render: (text, record) => (
          <span>
            <Button
              type="primary"
              icon="eye"
              onClick={() => this.deleteCandidate(record)}
              ghost
            />
            <Divider type="vertical" />
            <Button
              type="primary"
              icon="edit"
              onClick={() => this.deleteCandidate(record)}
              ghost
            />
            <Divider type="vertical" />
            <Button
              type="primary"
              icon="delete"
              onClick={() => this.deleteStar(record)}
              ghost
            />
          </span>
        )
      }
    ];

    return (
      <div>
        <Table
          columns={columns}
          rowKey={content => content.id}
          dataSource={content}
          pagination={pagination}
          loading={loading === null ? false : loading}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  candidates: state.candidate,
  star: state.star.star
});

export default connect(mapStateToProps)(Candidates);
