const BASE_URL =
  process.env.NODE_ENV === "production" &&
  process.env.REACT_APP_ENV === "production"
    ? "http://jkasfajklw.atwebpages.com"
    : "http://army-backend.com";
export { BASE_URL };
