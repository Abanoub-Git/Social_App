import axios from "axios";

export const axiosInterceptos = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

axiosInterceptos.interceptors.request.use(
    function(x) { //before send request check if token exist or not so i know i will put it in header in my request or not 
        if(localStorage.getItem('token')) x.headers.token = localStorage.getItem('token')
            return x
    },
    function(error) {
        console.log(error)
    }
)

axiosInterceptos.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);
