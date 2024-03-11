import axiosInstance from "./axios.instance";

export const getUserCount = async (): Promise<number> => {
  try {
    const response = await axiosInstance.get(`/user/user-count`);
    return response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};
