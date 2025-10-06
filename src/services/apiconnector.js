import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: "https://mega-project-bs9q.onrender.com",  // ✅ your backend base URL
  withCredentials: true,
});

export const apiConnector = (method, url, bodyData, headers, params) => {
   console.log("enter in apiConnector ",method, url, bodyData, headers, params);    
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null,
    });
    
}