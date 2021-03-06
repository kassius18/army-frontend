import axios from "axios";
import { BASE_URL } from "./url";

const url = BASE_URL + "/parts";

const partApi = {
  async createPart(part, entryId) {
    return axios
      .post(url, { ...part, entryId: entryId })
      .then((response) => {
        return { success: true, parts: [response.data] };
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

  async deletePart(partId) {
    return axios
      .delete(url + `/${partId}`)
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

  async updatePart(part, partId) {
    return axios
      .put(url + `/${partId}`, part)
      .then((response) => {
        return { success: true, parts: [response.data] };
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
export default partApi;
