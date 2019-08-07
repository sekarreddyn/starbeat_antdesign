import React from "react";
import { connect } from "react-redux";
import { Table, Button, Avatar, Modal, Tag, Divider } from "antd";
import { templateActions } from "../../actions";
import { pagable } from "../../helpers";

const { confirm } = Modal;

class Candidates extends React.Component {
  state = { pagination: {}, loading: null };
  componentDidMount() {
    this.setState({ loading: true });
    this.props.dispatch(
      templateActions.getAll(this.getType(), pagable, this.getUrl())
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.templates !== this.props.templates) {
      const { number, totalElements } = nextProps.templates;
      this.setState({ loading: false });
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
    this.setState({ loading: true });
    this.props.dispatch(
      templateActions.getAll(this.getType(), pager, this.getUrl())
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
        dispatch(templateActions.deleteStar(item));
      },
      onCancel() {}
    });
  };

  render() {
    const { content } = this.props.templates;
    const { loading } = this.state;
    const { pagination } = this.state;
    const columns = [
      {
        title: "Id",
        dataIndex: "id",
        width: "15%"
      },
      {
        title: "Title",
        sorter: true,
        width: "30%",
        render: (text, record) => <span>{record.title}</span>
      },
      {
        title: "Release Date",
        sorter: true,
        width: "15%",
        render: (text, record) => <span>{record.releaseDate}</span>
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
  templates: state.template.templates
});

export default connect(mapStateToProps)(Candidates);
