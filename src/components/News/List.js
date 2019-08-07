import React from "react";
import { connect } from "react-redux";
import { Table, Button, Avatar, Modal, Tag, Divider } from "antd";
import { newsActions } from "../../actions";
import { pagable } from "../../helpers";

const { confirm } = Modal;

class Candidates extends React.Component {
  state = { pagination: {}, loading: null };
  componentDidMount() {
    this.props.dispatch(
      newsActions.getAll(this.getType(), pagable, this.getUrl())
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
      newsActions.getAll(this.getType(), pager, this.getUrl())
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
        dispatch(newsActions.deleteStar(item));
      },
      onCancel() {}
    });
  };

  render() {
    const { list, loading } = this.props.news;
    const { content } = list;

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
        title: "Published date",
        sorter: true,
        width: "15%",
        render: (text, record) => <span>{record.publishedAt}</span>
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
  news: state.news.news
});

export default connect(mapStateToProps)(Candidates);
