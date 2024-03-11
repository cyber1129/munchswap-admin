"use client";

import Link from "next/link";
import { customToast } from "~/components/toast";
import { useUserContext } from "~/context/userContext";
import authService from "~/api.services/auth.service";
import { useEffect, useState } from "react";
import { getUserCount } from "~/api.services/user-info.service";
import { getOfferCount } from "~/api.services/offer-count.service";
import Header from "~/components/header";

type OfferCount = {
  status: string;
  count: number;
};

export default function HomePage() {
  const [userCount, setUserCount] = useState(0);
  const [offerCounts, setOfferCounts] = useState<OfferCount[]>([]);

  const {
    isLogged,
    setWalletType,
    setPaymentAddress,
    setOrdinalAddress,
    setPaymentPublicKey,
    setOrdinalPublicKey,
    setIsLogged,
    handleLogout,
  } = useUserContext();

  const handleConnectWallet = async () => {
    const unisat = (window as any).unisat;
    const addresses = await unisat.requestAccounts();
    const pubkey = await unisat.getPublicKey();
    setWalletType("Unisat");
    setPaymentAddress(addresses[0]);
    setPaymentPublicKey(pubkey);
    setOrdinalAddress(addresses[0]);
    setOrdinalPublicKey(pubkey);

    customToast({
      toastType: "success",
      title: "Unisat Wallet Connected",
    });

    const signMessageRes = await authService.getSignMessage(addresses[0]);
    const { message: signMessageText } = signMessageRes.data;

    const signature = await window.unisat.signMessage(
      signMessageText,
      "bip322-simple",
    );

    const userLoginRes = await authService.userLogin(
      signature,
      "Unisat",
      addresses[0],
      pubkey,
      addresses[0],
      pubkey,
    );
    console.log({ userLoginRes });
    const { accessToken } = userLoginRes?.data;
    localStorage.setItem("jwtToken", accessToken);
    setIsLogged(true);
    customToast({
      toastType: "success",
      title: "Logged In Successfully",
    });
  };

  useEffect(() => {
    void (async () => {
      if (isLogged) {
        const userCount = await getUserCount();
        setUserCount(userCount);
      }
    })();

    void (async () => {
      if (isLogged) {
        const offerCounts = await getOfferCount();
        setOfferCounts(offerCounts as OfferCount[]);
      }
    })();
  }, [isLogged]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <Header />
      <main className="flex h-full flex-col items-center justify-center">
        {isLogged === false ? (
          <button
            className="connect-button-box-shadow font-Poppins relative h-[64px] rounded-xl border-2 border-normal-font-color bg-[#DAFF73] pe-5 ps-14 text-normal-font-color"
            onClick={handleConnectWallet}
          >
            <div className="pointer-events-none absolute inset-y-0 start-0 mt-[-1px] flex items-center ps-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
              >
                <path
                  d="M3.88766 20.2632L4.27953 19.6237L3.88766 20.2632ZM2.23695 18.6125L2.87643 18.2206H2.87643L2.23695 18.6125ZM20.7634 18.6125L20.1239 18.2206L20.7634 18.6125ZM19.1126 20.2632L18.7208 19.6237L19.1126 20.2632ZM19.1126 4.7368L18.7208 5.37628L19.1126 4.7368ZM20.7634 6.38751L20.1239 6.77938L20.7634 6.38751ZM3.88766 4.7368L4.27953 5.37628H4.27953L3.88766 4.7368ZM2.23695 6.38751L2.87643 6.77938H2.87643L2.23695 6.38751ZM17.9769 1.54645L18.5182 1.02728V1.02728L17.9769 1.54645ZM3.34437 1.89079L3.79721 2.48865V2.48865L3.34437 1.89079ZM2.35459 2.92267L2.96991 3.35148L2.35459 2.92267ZM18.5002 4.13032H19.2502L19.2501 4.12662L18.5002 4.13032ZM17.8638 12.6137C18.278 12.6137 18.6138 12.2779 18.6138 11.8637C18.6138 11.4494 18.278 11.1137 17.8638 11.1137V12.6137ZM15.1365 11.1137C14.7223 11.1137 14.3865 11.4494 14.3865 11.8637C14.3865 12.2779 14.7223 12.6137 15.1365 12.6137V11.1137ZM10.0002 4.75H13.0002V3.25H10.0002V4.75ZM13.0002 20.25H10.0002V21.75H13.0002V20.25ZM10.0002 20.25C8.34891 20.25 7.16315 20.2492 6.23824 20.1613C5.32449 20.0744 4.74306 19.9078 4.27953 19.6237L3.49578 20.9027C4.2346 21.3554 5.07271 21.5572 6.09626 21.6545C7.10865 21.7508 8.37796 21.75 10.0002 21.75V20.25ZM0.75015 12.5C0.75015 14.1222 0.749359 15.3915 0.845618 16.4039C0.942937 17.4274 1.14472 18.2655 1.59747 19.0044L2.87643 18.2206C2.59238 17.7571 2.42576 17.1757 2.33888 16.2619C2.25094 15.337 2.25015 14.1512 2.25015 12.5H0.75015ZM4.27953 19.6237C3.70767 19.2733 3.22687 18.7925 2.87643 18.2206L1.59747 19.0044C2.07159 19.7781 2.72209 20.4286 3.49578 20.9027L4.27953 19.6237ZM13.0002 21.75C14.6223 21.75 15.8917 21.7508 16.904 21.6545C17.9276 21.5572 18.7657 21.3554 19.5045 20.9027L18.7208 19.6237C18.2572 19.9078 17.6758 20.0744 16.7621 20.1613C15.8371 20.2492 14.6514 20.25 13.0002 20.25V21.75ZM20.1239 18.2206C19.7734 18.7925 19.2926 19.2733 18.7208 19.6237L19.5045 20.9027C20.2782 20.4286 20.9287 19.7781 21.4028 19.0044L20.1239 18.2206ZM18.7208 5.37628C19.2926 5.72672 19.7734 6.20752 20.1239 6.77938L21.4028 5.99563C20.9287 5.22194 20.2782 4.57144 19.5045 4.09732L18.7208 5.37628ZM10.0002 3.25C8.37796 3.25 7.10865 3.24921 6.09626 3.34547C5.07271 3.44279 4.2346 3.64457 3.49578 4.09732L4.27953 5.37628C4.74306 5.09223 5.32449 4.92561 6.23824 4.83873C7.16315 4.75079 8.34891 4.75 10.0002 4.75V3.25ZM2.25015 12.5C2.25015 10.8488 2.25094 9.663 2.33888 8.73809C2.42576 7.82434 2.59238 7.24291 2.87643 6.77938L1.59747 5.99563C1.14472 6.73445 0.942937 7.57256 0.845618 8.59611C0.749359 9.6085 0.75015 10.8778 0.75015 12.5H2.25015ZM3.49578 4.09732C2.72209 4.57144 2.07159 5.22194 1.59747 5.99563L2.87643 6.77938C3.22687 6.20752 3.70767 5.72672 4.27953 5.37628L3.49578 4.09732ZM9.55322 1.75H14.9219V0.25H9.55322V1.75ZM14.9219 1.75C15.7876 1.75 16.3583 1.75173 16.7815 1.81105C17.1798 1.86687 17.3347 1.96039 17.4357 2.06562L18.5182 1.02728C18.095 0.586062 17.566 0.406351 16.9897 0.325567C16.4382 0.248272 15.7435 0.25 14.9219 0.25V1.75ZM9.55322 0.25C7.89302 0.25 6.58509 0.248882 5.54743 0.366088C4.49381 0.485096 3.62984 0.733701 2.89153 1.29293L3.79721 2.48865C4.23494 2.15709 4.79779 1.9603 5.71579 1.85661C6.64974 1.75112 7.85822 1.75 9.55322 1.75V0.25ZM2.25015 9.39563C2.25015 7.63063 2.2511 6.36468 2.35294 5.38472C2.4535 4.41704 2.64565 3.81679 2.96991 3.35148L1.73928 2.49385C1.2091 3.25462 0.97402 4.14188 0.860973 5.22968C0.749202 6.3052 0.75015 7.6627 0.75015 9.39563H2.25015ZM2.89153 1.29293C2.44821 1.62872 2.0596 2.03422 1.73928 2.49385L2.96991 3.35148C3.20149 3.01918 3.48091 2.72823 3.79721 2.48865L2.89153 1.29293ZM19.2501 4.12662C19.2468 3.44995 19.2324 2.86358 19.1476 2.37747C19.0596 1.87228 18.8855 1.41025 18.5182 1.02728L17.4357 2.06562C17.529 2.16295 17.6132 2.30988 17.6699 2.63506C17.7299 2.97932 17.7468 3.44473 17.7502 4.13403L19.2501 4.12662ZM0.75015 9.39563C0.75015 10.3713 0.72999 11.2642 0.750407 12.0202L2.24986 11.9798C2.2301 11.2482 2.25015 10.424 2.25015 9.39563H0.75015ZM21.0001 13.8409H15.1365V15.3409H21.0001V13.8409ZM11.6592 11.8637C11.6592 13.7841 13.2161 15.3409 15.1365 15.3409V13.8409C14.0445 13.8409 13.1592 12.9557 13.1592 11.8637H11.6592ZM13.1592 11.8637C13.1592 10.7716 14.0445 9.88638 15.1365 9.88638V8.38638C13.2161 8.38638 11.6592 9.94321 11.6592 11.8637H13.1592ZM17.8638 11.1137H15.1365V12.6137H17.8638V11.1137ZM13.0002 4.75C14.3848 4.75 15.4451 4.75032 16.3037 4.8033C17.1614 4.85623 17.7611 4.95942 18.2339 5.13895L18.7664 3.73667C18.0863 3.47839 17.3121 3.36267 16.396 3.30615C15.4808 3.24968 14.3675 3.25 13.0002 3.25V4.75ZM18.2339 5.13895C18.4109 5.20619 18.5712 5.2846 18.7208 5.37628L19.5045 4.09732C19.2711 3.95427 19.0262 3.83534 18.7664 3.73667L18.2339 5.13895ZM17.7502 4.13032V4.43781H19.2502V4.13032H17.7502ZM15.1365 9.88638H21.4446V8.38638H15.1365V9.88638ZM22.2502 12.5C22.2502 11.1255 22.2505 10.0077 22.1931 9.08959L20.696 9.18316C20.7498 10.0439 20.7502 11.108 20.7502 12.5H22.2502ZM22.1931 9.08959C22.1147 7.83476 21.9249 6.84749 21.4028 5.99563L20.1239 6.77938C20.4528 7.3161 20.6225 8.00707 20.696 9.18316L22.1931 9.08959ZM20.7502 12.5C20.7502 13.2875 20.7501 13.9722 20.7401 14.5785L22.2399 14.6034C22.2502 13.9821 22.2502 13.2839 22.2502 12.5H20.7502ZM20.7401 14.5785C20.7075 16.537 20.5636 17.5031 20.1239 18.2206L21.4028 19.0044C22.083 17.8944 22.2079 16.5313 22.2399 14.6034L20.7401 14.5785ZM21.0001 15.3409H21.49V13.8409H21.0001V15.3409Z"
                  fill="#202025"
                />
              </svg>
            </div>
            Connect Wallet
          </button>
        ) : (
          <>
            <div className="flex flex-col gap-4 text-2xl text-gray-300">
              <div className="flex w-full items-end">
                <p className="w-96">Number of Registered Users:</p>
                <p>
                  <span className="text-3xl">{userCount}</span> members
                </p>
              </div>
              <div className="flex w-full flex-col gap-2">
                <p className="text-2xl">Number of status</p>
                {offerCounts.map((offerCount, index) => (
                  <div key={index} className="flex w-full items-end text-lg">
                    <p className="w-96 pl-4 text-lg">{offerCount.status}</p>
                    <p>{offerCount.count}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
