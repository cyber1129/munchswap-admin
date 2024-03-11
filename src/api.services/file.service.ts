import axiosInstance from "./axios.instance";

export const uploadFile = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post(`/file/upload`, formData);
    return response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};
