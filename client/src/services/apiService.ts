import axios from "axios";
import { apiBaseUrl } from "../config/apiBaseUrl";
export const handelApiSubmit = async (
  url: string,
  method: "POST" | "GET" | "PUT" | "DELETE",
  data?: object,
  headers?: object,
): Promise<any> => {
  try {
    let urlWithEndPoint = `${apiBaseUrl}${url}`
    const response = await axios({
      url : urlWithEndPoint,
      method,
      data,
      headers,
      withCredentials: true,
    });

    if (response.status === 200) {
      console.log(response);
      return response;
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
  }
};
