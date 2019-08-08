import React from "react";
import { connect } from "react-redux";
import { dashboardActions } from "../actions";
import { Typography, Card, Icon, Layout, Row, Col } from "antd";
import "./numberCard.css";
const { Title } = Typography;
const { Content } = Layout;
const gridStyle = {
  width: "33.33%",
  textAlign: "center"
};

const gridStyle1 = {
  width: "25%",
  textAlign: "center"
};
const gridStyle2 = {
  width: "50%",
  textAlign: "center"
};
class Dashbpard extends React.Component {
  state = {};
  componentDidMount() {
    this.props.dispatch(dashboardActions.starsCount());
    this.props.dispatch(dashboardActions.templatesCount());
    this.props.dispatch(dashboardActions.getStarCategories());
    this.props.dispatch(dashboardActions.getMovieCategories());
  }
  render() {
    const {
      movieCategories,
      starCategories,
      starsCount,
      templatesCount
    } = this.props.dashboard;

    return (
      <div>
        <Card className="mb-4" title={"Stars"} loading={starsCount.loading}>
          <Card.Grid style={gridStyle}>
            <Icon
              className={"iconWarp mb-3"}
              style={{ fontSize: 40 }}
              theme="twoTone"
              type={"check-circle"}
            />
            <div className={"content"}>
              <h2 className={"title"}>{starsCount.APPROVED}</h2>
              <p className={"number"}>Approved</p>
            </div>
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <Icon
              className={"iconWarp mb-3"}
              style={{ fontSize: 40 }}
              theme="twoTone"
              type={"exclamation-circle"}
            />
            <div className={"content"}>
              <h2 className={"title"}>{starsCount.PENDING}</h2>
              <p className={"number"}>Pending</p>
            </div>
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            {" "}
            <Icon
              className={"iconWarp mb-3"}
              style={{ fontSize: 40 }}
              theme="twoTone"
              type={"delete"}
              size="large"
            />
            <div className={"content"}>
              <h2 className={"title"}>{starsCount.DELETED}</h2>
              <p className={"number"}>Deleted</p>
            </div>
          </Card.Grid>
        </Card>
        <Card
          className="mb-4"
          title={"Movies"}
          loading={templatesCount.loading}
        >
          <Card.Grid style={gridStyle1}>
            {" "}
            <Icon
              className={"mb-3"}
              style={{ fontSize: 40 }}
              theme="twoTone"
              type={"check-circle"}
            />
            <div className={"content"}>
              <h2 className={"title"}>{templatesCount.APPROVED}</h2>
              <p className="blue-grey mb-0">Approved</p>
            </div>
          </Card.Grid>
          <Card.Grid style={gridStyle1}>
            {" "}
            <Icon
              className={"mb-3"}
              style={{ fontSize: 40 }}
              theme="twoTone"
              type={"exclamation-circle"}
            />
            <div className={"content"}>
              <h2 className={"title"}>{templatesCount.PENDING}</h2>
              <p className="blue-grey mb-0">Pending</p>
            </div>
          </Card.Grid>
          <Card.Grid style={gridStyle1}>
            {" "}
            <Icon
              className={"mb-3"}
              style={{ fontSize: 40 }}
              theme="twoTone"
              type={"flag"}
            />
            <div className={"content"}>
              <h2 className={"title"}>{templatesCount.NEW}</h2>
              <p className="blue-grey mb-0">New</p>
            </div>
          </Card.Grid>
          <Card.Grid style={gridStyle1}>
            {" "}
            <Icon
              className={"mb-3"}
              style={{ fontSize: 40 }}
              theme="twoTone"
              type={"delete"}
            />
            <div className={"content"}>
              <h2 className={"title"}>{templatesCount.PENDING}</h2>
              <p className="blue-grey mb-0">Pending</p>
            </div>
          </Card.Grid>
        </Card>
        <Card
          className="mb-4"
          title={"Categories"}
          loading={starCategories.loading}
        >
          <Card.Grid style={gridStyle2}>
            {" "}
            <Icon
              className={"mb-3"}
              style={{ fontSize: 40 }}
              theme="twoTone"
              type={"star"}
            />
            <div className={"content"}>
              <h2 className={"title"}>{starCategories.count}</h2>
              <p className="blue-grey mb-0">STAR</p>
            </div>
          </Card.Grid>
          <Card.Grid style={gridStyle2}>
            {" "}
            <Icon
              className={"mb-3"}
              style={{ fontSize: 40 }}
              theme="twoTone"
              type={"play-square"}
            />
            <div className={"content"}>
              <h2 className={"title"}>{movieCategories.count}</h2>
              <p className="blue-grey mb-0">MOVIE</p>
            </div>
          </Card.Grid>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({ dashboard: state.dashboard });

export default connect(mapStateToProps)(Dashbpard);
