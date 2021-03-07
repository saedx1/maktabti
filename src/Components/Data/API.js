import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
export function getFilterData() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}get_filter_data`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
