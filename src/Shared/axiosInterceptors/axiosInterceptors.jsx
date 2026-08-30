import axios from "axios";

export const axiosInterceptos = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

function handle401Error(error) {
  if (error.response?.status === 401) {
    const requestUrl = error.config?.url || "";
    const isAuthRequest = requestUrl.includes("users/signin") || requestUrl.includes("users/signup");

    if (!isAuthRequest) {
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("auth:unauthorized"));
      if (window.location.pathname !== "/login" && window.location.pathname !== "/register") {
        window.location.href = "/login";
      }
    }
  }
  return Promise.reject(error);
}

axiosInterceptos.interceptors.request.use(
    function(x) { //before send request check if token exist or not so i know i will put it in header in my request or not 
        if(localStorage.getItem('token')) x.headers.token = localStorage.getItem('token')
        return x
    },
    function(error) {
        console.log(error);
        return Promise.reject(error);
    }
)

axiosInterceptos.interceptors.response.use(
  function (response) {
    return response;
  },
  handle401Error
);

// Configure global default axios instance as well
axios.interceptors.request.use(
    function(config) {
        if(localStorage.getItem('token') && !config.headers.token) {
            config.headers.token = localStorage.getItem('token');
        }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  handle401Error
);

