"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { StatusContextProps } from "~/propsType";

export const StatusContext = createContext<StatusContextProps>({
  connectWalletModalOpen: false,
  setConnectWalletModalOpen: () => {},
  dealModalOpen: false,
  setDealModalOpen: () => {},
  successModalOpen: false,
  setSuccessModalOpen: () => {},
  loadingModalOpen: false,
  setLoadingModalOpen: () => {},
});

export const useStatusContext = () => useContext(StatusContext);

export const StatusProvider = ({ ...props }) => {
  const { children } = props;
  const [connectWalletModalOpen, setConnectWalletModalOpen] = useState(false);
  const [dealModalOpen, setDealModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [loadingModalOpen, setLoadingModalOpen] = useState(false);

  return (
    <StatusContext.Provider
      value={{
        connectWalletModalOpen,
        setConnectWalletModalOpen,
        dealModalOpen,
        setDealModalOpen,
        successModalOpen,
        setSuccessModalOpen,
        loadingModalOpen,
        setLoadingModalOpen,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};
