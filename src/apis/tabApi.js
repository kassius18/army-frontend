import axios from "axios";

const url = "http://army-backend.com/tabs";

const tabApi = {
  // async createRequest(request) {
  //   return axios
  //     .post(url, request)
  //     .then((response) => {
  //       return { success: true, requests: [response.data] };
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         return {
  //           success: false,
  //           error: {
  //             message: error.response.data,
  //             code: error.response.status,
  //           },
  //         };
  //       } else if (error.request) {
  //         return {
  //           success: false,
  //           error: {
  //             message: "server might be down or url not exist",
  //             code: 0,
  //           },
  //         };
  //       }
  //     });
  // },

  // async deleteRequest(requestId) {
  //   return axios
  //     .delete(url + `/${requestId}`)
  //     .then(() => {
  //       return { success: true };
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         return {
  //           success: false,
  //           error: {
  //             message: error.response.data,
  //             code: error.response.status,
  //           },
  //         };
  //       } else if (error.request) {
  //         return {
  //           success: false,
  //           error: {
  //             message: "server might be down or url not exist",
  //             code: 0,
  //           },
  //         };
  //       }
  //     });
  // },

  // async updateRequest(request, requestId) {
  //   return axios
  //     .put(url + `/${requestId}`, request)
  //     .then(() => {
  //       return { success: true };
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         return {
  //           success: false,
  //           error: {
  //             message: error.response.data,
  //             code: error.response.status,
  //           },
  //         };
  //       } else if (error.request) {
  //         return {
  //           success: false,
  //           error: {
  //             message: "server might be down or url not exist",
  //             code: 0,
  //           },
  //         };
  //       }
  //     });
  // },

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
};
export default tabApi;
