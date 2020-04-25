import axios from "axios";

export default class Client {
  constructor(baseUrl) {
    this.base_url = baseUrl;
  }

  async makeRequest(method, uri) {
    return new Promise((resolve) => {
      axios[method.toLowerCase()](this.base_url + uri)
        .then((response) => {
          if (response.status == 200) {
            return resolve(response.data);
          }
          resolve(undefined);
        })
        .catch((error) => {
          resolve(undefined);
        });
    });
  }
}
