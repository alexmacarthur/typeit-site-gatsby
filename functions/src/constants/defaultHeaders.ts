import isProduction from "../util/isProduction";

const headers = {
  "Access-Control-Allow-Origin": isProduction() ? "https://typeitjs.com" : "*",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default headers;
