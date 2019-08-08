import React from "react";
import { connect } from "react-redux";
import { Table, Button, Avatar, Modal, Tag, Divider } from "antd";
import { dashboardActions } from "../../actions";
import { pagable } from "../../helpers";

const { confirm } = Modal;

class Candidates extends React.Component {
  state = { pagination: {}, loading: null };
  componentDidMount() {
    this.props.dispatch(
      dashboardActions.getActivity(this.getType(), pagable, this.getUrl())
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.news !== this.props.news) {
      const { list } = nextProps.news;
      const { number, totalElements } = list;

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

    this.props.dispatch(
      dashboardActions.getActivity(this.getType(), pager, this.getUrl())
    );
  };
  deleteStar = item => {
    const { dispatch } = this.props;

    confirm({
      title: "Are you sure delete this news?",
      content: "",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",

      onOk() {
        dispatch(dashboardActions.deleteStar(item));
      },
      onCancel() {}
    });
  };

  render() {
    const { activities } = this.props.activities;
    const { list, loading } = activities;
    const { content } = list;
    const { pagination } = this.state;
    const columns = [
      {
        title: "Id",
        dataIndex: "resourceId",
        width: "15%"
      },
      {
        title: "Title",
        sorter: true,
        width: "30%",
        render: (text, record) => <span>{record.type}</span>
      },
      {
        title: "Creation date",
        sorter: true,
        width: "15%",
        render: (text, record) => <span>{record.creationDate}</span>
      },
      {
        title: "Action",
        sorter: true,
        width: "15%",
        render: (text, record) => <span>{record.action}</span>
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
  activities: state.dashboard
});

export default connect(mapStateToProps)(Candidates);
