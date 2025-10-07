import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = async (method, url, bodyData, headers, params) => {
  try {
    console.log("👉 API CALL:", method, url);
    const response = await axiosInstance({
      method: `${method}`,
      url: `${url}`,
      data: bodyData ?   bodyData : null,
      headers: headers ? headers : null,
      params: params ? params : null,
    });
    console.log("✅ API RESPONSE:", response);
    return response;
  } catch (error) {
    console.error("❌ API ERROR:", error);
    throw error;
  }
};
