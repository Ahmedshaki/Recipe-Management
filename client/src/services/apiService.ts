import axios from "axios";
import { showSuccessToast,showErrorToast} from "../utils/toast";

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
      showSuccessToast(response.data.message);
      return response.data;
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      showErrorToast(error?.response?.data?.error || "Something went wrong");
    } else {
      showErrorToast("An unexpected error occurred");
    }
    throw error;
  }
};
