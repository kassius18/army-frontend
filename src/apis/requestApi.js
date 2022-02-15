import axios from "axios";

const url = "http://army-backend.com/requests";

const requestApi = {
  async createRequest(request) {
    return axios
      .post(url, request)
      .then((response) => {
        return { success: true, requests: [response.data] };
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

  async deleteRequest(requestId) {
    return axios
      .delete(url + `/${requestId}`)
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

  async updateRequest(request, requestId) {
    return axios
      .put(url + `/${requestId}`, request)
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

  async getRequestById(requestId) {
    return axios
      .get(url + +`/${requestId}`)
      .then((response) => {
        return { success: true, requests: response.data };
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

  async getRequestByPhi(phi) {
    return axios
      .get(url, {
        params: {
          findBy: "phi",
          phi: phi,
        },
      })
      .then((response) => {
        return { success: true, requests: response.data };
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

  async getRequestByPhiYear(year, phi) {
    return axios
      .get(url, {
        params: {
          findBy: "phi-year",
          phi: phi,
          year: year,
        },
      })
      .then((response) => {
        return { success: true, requests: response.data };
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

  async getRequestByDateInterval(getHttpRequestParams) {
    return axios
      .get(url, {
        params: {
          findBy: "date",
          startYear: getHttpRequestParams.startYear,
          startMonth: getHttpRequestParams.startMonth,
          startDay: getHttpRequestParams.startDay,
          endYear: getHttpRequestParams.endYear,
          endMonth: getHttpRequestParams.endMonth,
          endDay: getHttpRequestParams.endDay,
        },
      })
      .then((response) => {
        return { success: true, requests: response.data };
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

  //
};
export default requestApi;
