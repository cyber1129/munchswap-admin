import axiosInstance from "./axios.instance";

export type CreateCollectionRequestType = {
  name: string;
  imgUrl: string;
  description: string;
  website?: string;
  twitter?: string;
  discord?: string;
  inscriptionIds: string[] | string;
};

export const createCollection = async (
  reqeust: CreateCollectionRequestType,
) => {
  try {
    const response = await axiosInstance.post(`/collection/create`, reqeust);
    return response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};
