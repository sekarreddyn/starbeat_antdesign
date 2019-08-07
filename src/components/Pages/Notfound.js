import React from "react";

import Content from "../Layouts/Content";

const Notfound = () => {
  return (
    <Content>
      <div className="content-header row">
        <div className="content-header-left col-md-4 col-12 mb-2">
          <h3 className="content-header-title">Page Not found</h3>
        </div>
      </div>
      <div className="content-body">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header" />
              <div className="card-content">
                <div className="card-body text-center">
                  <h1 className="errorTitle text-danger">404.</h1>
                  <br />
                  <h2>The page you are trying to reach doesn't exist.</h2>
                  <p>
                    Go back to the <a href="/">Home Page</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default Notfound;
