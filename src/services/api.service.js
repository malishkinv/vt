import axios from "axios";
import router from "@/router";

const ApiService = {
  init(baseURL) {
    axios.defaults.baseURL = baseURL;
  },

  get(resource) {
    return axios.get(resource);
  },

  post(resource, data) {
    return axios.post(resource, data);
  },

  put(resource, data) {
    return axios.put(resource, data);
  },

  delete(resource) {
    return axios.delete(resource);
  },

  mountErrorsInterceptor() {
    axios.interceptors.response.use(res => {
      return res;
    }, error => {

      if ((error.response && error.response.status === 404) || error.code === 404) {
        router.push({ path: "/404" });
      }

      if ((error.response && error.response.status === 500) || error.code === 500) {
        router.push({ path: "/500"});
      }

      return Promise.reject(error);
    });
  }
};

export default ApiService;