import axios, { AxiosError } from "axios";
import apiConfig from "~/configs/api.config";
import axiosInstance from "./axios.instance";
import { customToast } from "~/components/toast";
import { WalletTypes } from "~/propsType";

const authAxiosInstance = axios.create({ baseURL: apiConfig.serverUrl });

const getSignMessage = async (address: string) => {
  return await authAxiosInstance.post("/auth/generate-message", { address });
};

const userLogin = async (
  signature: string,
  walletType: WalletTypes,
  address: string,
  pubkey: string,
  paymentAddress: string,
  paymentPubkey: string,
) => {
  try {
    return await axiosInstance.post("/auth/login", {
      address,
      signature,
      walletType,
      pubkey,
      paymentAddress,
      paymentPubkey,
    });
  } catch (error) {
    if ((error as AxiosError).code === "ERR_BAD_REQUEST")
      customToast({
        toastType: "error",
        title: ((error as AxiosError).response as any).data.message as string,
      });
  }
};

const getUserInfo = async () => {
  try {
    if (localStorage.getItem("token"))
      return await axiosInstance.get("/user/user-info");
    else throw Error("Can not fetch");
  } catch (error) {
    throw ((error as AxiosError).response as any).data.message as string;
  }
};

const exports = {
  getSignMessage,
  userLogin,
  getUserInfo,
};

export default exports;
