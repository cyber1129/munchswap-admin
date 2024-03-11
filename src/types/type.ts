export type WalletTypes = "Xverse" | "Unisat" | "Hiro" | "Okx" | "";

export type Context = {
    resolvedUrl: string;
    setHeader: any;
    write: any;
    end: any;
};

export type OkxPsbtInputType = {
    index: number;
    sighashTypes?: number[] | number;
    publicKey?: string;
    address?: string;
    disableTweakSigner?: boolean;
};

declare global {
    interface Window {
        unisat: {
            signPsbt: (psbtHex: string) => Promise<string>;
            getAccounts: () => Promise<[string]>;
            switchNetwork: (network: string) => Promise<void>;
            requestAccounts: () => Promise<string[]>;
            getPublicKey: () => Promise<string>;
            sendBitcoin: (address: string, amount: number) => Promise<string>;
            signMessage: (
                message: string,
                type?: "ecdsa" | "bip322-simple"
            ) => Promise<string>;
        };

        okxwallet: {
            bitcoinTestnet: {
                connect: () => Promise<{ address: string; publicKey: string }>;
                signMessage: (
                    msg: string,
                    type: "ecdsa" | "bip322-simple"
                ) => Promise<string>;
                signPsbt: (
                    psbt: string,
                    options?: {
                        autoFinalized: boolean;
                        toSignInputs?: OkxPsbtInputType[];
                    }
                ) => Promise<string>;
            };
            bitcoin: {
                connect: () => Promise<{ address: string; publicKey: string }>;
                signMessage: (
                    msg: string,
                    type: "ecdsa" | "bip322-simple"
                ) => Promise<string>;
                signPsbt: (
                    psbt: string,
                    options?: {
                        autoFinalized: boolean;
                        toSignInputs?: OkxPsbtInputType[];
                    }
                ) => Promise<string>;
            };
        };
    }
}
