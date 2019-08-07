let config = {};

if (process.env.REACT_APP_API_ENDPOINT) {
  config = {
    apiEndpoint: process.env.REACT_APP_API_ENDPOINT,
    apiUrl: process.env.REACT_APP_API_VERSION
  };
} else {
  config = {
    apiEndpoint: "/",
    apiUrl: "api/"
  };
}

export const appConfig = {
  ...config
};
