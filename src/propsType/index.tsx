export type WalletTypes = "Xverse" | "Unisat" | "Hiro" | "Okx" | "";

export type StatusContextProps = {
  connectWalletModalOpen: boolean;
  setConnectWalletModalOpen: (open: boolean) => void;
  dealModalOpen: boolean;
  setDealModalOpen: (open: boolean) => void;
  successModalOpen: boolean;
  setSuccessModalOpen: (open: boolean) => void;
  loadingModalOpen: boolean;
  setLoadingModalOpen: (open: boolean) => void;
};

export type UserSessionProps = {
  walletType: WalletTypes;
  setWalletType: (c: WalletTypes) => void;
  paymentAddress: string;
  setPaymentAddress: (c: string) => void;
  paymentPublicKey: string;
  setPaymentPublicKey: (c: string) => void;
  ordinalAddress: string;
  setOrdinalAddress: (c: string) => void;
  ordinalPublicKey: string;
  setOrdinalPublicKey: (c: string) => void;
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  handleLogout: () => void;
};
