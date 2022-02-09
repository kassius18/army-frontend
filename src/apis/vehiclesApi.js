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
};
export default vehicleApi;
