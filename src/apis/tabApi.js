import axios from "axios";
import { BASE_URL } from "./url";

const url = BASE_URL + "/tabs";

const tabApi = {
  async getNonEmptyTabs() {
    return axios
      .get(url, { params: { showNonEmpty: true } })
      .then((response) => {
        return { success: true, parts: response.data };
      })
      .catch((error) => {
        if (error.response) {
          return {
            success: false,
            error: {
              message: error.response.data,
              code: error.response.status,
            },
          };
        } else if (error.request) {
          return {
            success: false,
            error: {
              message: "server might be down or url not exist",
              code: 0,
            },
          };
        }
      });
  },

  async getPartsByTabId(tabId) {
    return axios
      .get(url + `/${tabId}`)
      .then((response) => {
        return { success: true, parts: response.data };
      })
      .catch((error) => {
        if (error.response) {
          return {
            success: false,
            error: {
              message: error.response.data,
              code: error.response.status,
            },
          };
        } else if (error.request) {
          return {
            success: false,
            error: {
              message: "server might be down or url not exist",
              code: 0,
            },
          };
        }
      });
  },

  async getAllTabs() {
    return axios
      .get(url)
      .then((response) => {
        return { success: true, tabs: response.data };
      })
      .catch((error) => {
        if (error.response) {
          return {
            success: false,
            error: {
              message: error.response.data,
              code: error.response.status,
            },
          };
        } else if (error.request) {
          return {
            success: false,
            error: {
              message: "server might be down or url not exist",
              code: 0,
            },
          };
        }
      });
  },

  async createTab(tab) {
    return axios
      .post(url, tab)
      .then((response) => {
        return { success: true, tabs: [response.data] };
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 409) {
            return {
              success: false,
              error: {
                message: "A tab with that Id already exists",
                code: error.response.status,
              },
            };
          }
          return {
            success: false,
            error: {
              message:
                error.response.data || "Something went wrong try again later",
              code: error.response.status,
            },
          };
        } else if (error.request) {
          return {
            success: false,
            error: {
              message: "server might be down or url not exist",
              code: 0,
            },
          };
        }
      });
  },

  async deleteTab(tabId) {
    return axios
      .delete(url + `/${tabId}`)
      .then(() => {
        return { success: true };
      })
      .catch((error) => {
        if (error.response) {
          return {
            success: false,
            error: {
              message: error.response.data,
              code: error.response.status,
            },
          };
        } else if (error.request) {
          return {
            success: false,
            error: {
              message: "server might be down or url not exist",
              code: 0,
            },
          };
        }
      });
  },

  async updateTab(tab, tabId) {
    return axios
      .put(url + `/${tabId}`, tab)
      .then((response) => {
        return { success: true, tabs: [response.data] };
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 409) {
            return {
              success: false,
              error: {
                message: "A tab with that Id already exists",
                code: error.response.status,
              },
            };
          }
          return {
            success: false,
            error: {
              message: error.response.data,
              code: error.response.status,
            },
          };
        } else if (error.request) {
          return {
            success: false,
            error: {
              message: "server might be down or url not exist",
              code: 0,
            },
          };
        }
      });
  },
};
export default tabApi;
