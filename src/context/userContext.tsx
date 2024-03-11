"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { UserSessionProps, WalletTypes } from "~/propsType";
import { useStatusContext } from "./statusContext";
import { useRouter } from "next/router";
import authApiService from "~/api.services/auth.service";

export const UserContext = createContext<UserSessionProps>({
  isLogged: false,
  setIsLogged: () => {},
  walletType: "",
  setWalletType: () => {},
  paymentAddress: "",
  setPaymentAddress: () => {},
  paymentPublicKey: "",
  setPaymentPublicKey: () => {},
  ordinalAddress: "",
  setOrdinalAddress: () => {},
  ordinalPublicKey: "",
  setOrdinalPublicKey: () => {},
  handleLogout: () => {},
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ ...props }) => {
  const { children } = props;

  const { setConnectWalletModalOpen } = useStatusContext();

  const [isLogged, setIsLogged] = useState(false);
  const [walletType, setWalletType] = useState<WalletTypes>("");
  const [paymentAddress, setPaymentAddress] = useState("");
  const [paymentPublicKey, setPaymentPublicKey] = useState("");
  const [ordinalAddress, setOrdinalAddress] = useState("");
  const [ordinalPublicKey, setOrdinalPublicKey] = useState("");

  const handleLogout = () => {
    setIsLogged(false);
    setWalletType("");
    setPaymentAddress("");
    setPaymentPublicKey("");
    setOrdinalAddress("");
    setOrdinalPublicKey("");
    localStorage.removeItem("jwtToken");
  };

  useEffect(() => {
    void getUser();
  }, []);

  const getUser = async () => {
    try {
      const { data } = await authApiService.getUserInfo();
      setWalletType(data.walletType);
      setPaymentAddress(data.paymentAddress);
      setPaymentPublicKey(data.paymentPubkey);
      setOrdinalAddress(data.address);
      setOrdinalPublicKey(data.pubkey);
      setIsLogged(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        isLogged,
        setIsLogged,
        walletType,
        setWalletType,
        paymentAddress,
        setPaymentAddress,
        paymentPublicKey,
        setPaymentPublicKey,
        ordinalAddress,
        setOrdinalAddress,
        ordinalPublicKey,
        setOrdinalPublicKey,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
