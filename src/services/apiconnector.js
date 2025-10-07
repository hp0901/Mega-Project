import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://mega-project-bs9q.onrender.com", // ✅ Backend base URL (no trailing slash)
  withCredentials: true,
});

export const apiConnector = async (method, url, bodyData, headers, params) => {
  try {
    console.log("👉 API CALL:", method, url);
    const response = await axiosInstance({
      method,
      url,
      data: bodyData || {},
      headers: headers || {},
      params: params || {},
    });
    console.log("✅ API RESPONSE:", response);
    return response;
  } catch (error) {
    console.error("❌ API ERROR:", error);
    throw error;
  }
};
