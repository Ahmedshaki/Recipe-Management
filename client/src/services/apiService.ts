import axios from "axios";
export const handelApiSubmit = async (
  url: string,
  method: "POST" | "GET" | "PUT" | "DELETE",
  data?: object,
  headers?: object,
): Promise<any> => {
  try {
    const response = await axios({
      url,
      method,
      data,
      headers,
      withCredentials: true,
    });

    if (response.status === 200) {
      return response;
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
  }
};
