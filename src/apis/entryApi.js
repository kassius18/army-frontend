import axios from "axios";
import { BASE_URL } from "./url";

const url = BASE_URL + "/entries";

const entryApi = {
  async createEntry(entry, firstPartOfPhi, year) {
    return axios
      .post(url, { ...entry, firstPartOfPhi: firstPartOfPhi, year: year })
      .then((response) => {
        return { success: true, entries: [response.data] };
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

  async deleteEntry(entryId) {
    return axios
      .delete(url + `/${entryId}`)
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
              code: 0,
            },
          };
        }
      });
  },

  async updateEntry(entry, entryId) {
    return axios
      .put(url + `/${entryId}`, entry)
      .then((response) => {
        return { success: true, entries: [response.data] };
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
export default entryApi;
