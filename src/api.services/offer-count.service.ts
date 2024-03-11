import axiosInstance from "./axios.instance";

export const getOfferCount = async () => {
  try {
    const response = await axiosInstance.get(`/swap-offer/offer-count`, {});
    return response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};
