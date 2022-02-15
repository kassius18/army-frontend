import axios from "axios";

const url = "http://army-backend.com/vehicles";

const vehicleApi = {
  async getAllVehicles() {
    return axios
      .get(url)
      .then((response) => {
        return { success: true, vehicles: response.data };
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

  async createVehicle(vehicle) {
    return axios
      .post(url, vehicle)
      .then((response) => {
        return { success: true, vehicles: [response.data] };
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 409) {
            return {
              success: false,
              error: {
                message: "A vehicle with that Id already exists",
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

  async deleteVehicle(vehicleId) {
    return axios
      .delete(url + `/${vehicleId}`)
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
        } else if (error.response) {
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

  async updateVehicle(vehicle, vehicleId) {
    return axios
      .put(url + `/${vehicleId}`, vehicle)
      .then(() => {
        return { success: true };
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 409) {
            return {
              success: false,
              error: {
                message: "A vehicle with that Id already exists",
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
        } else if (error.response) {
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

export default vehicleApi;
