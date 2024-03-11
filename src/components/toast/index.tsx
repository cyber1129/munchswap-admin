import Image from "next/image";
import { FC } from "react";
import { toast } from "sonner";

import Success from "~/assets/img/tick-circle.svg";
import Info from "~/assets/img/Information Circle.svg";
import Error from "~/assets/img/Close Circle.svg";
import Link from "next/link";

type Props = {
  link?: string;
  toastId: string | number;
  toastType: TToastType;
  title: string;
  description?: string;
};

export type TToastType = "success" | "info" | "warn" | "error";

export const customToast = ({
  toastType,
  title,
  description,
  link,
}: {
  toastType: TToastType;
  title: string;
  link?: string;
  description?: string;
}) => {
  toast.custom((t) => (
    <ToastNotification
      link={link}
      toastId={t}
      toastType={toastType}
      title={title}
      description={description}
    />
  ));
};

const ToastNotification: FC<Props> = (props) => {
  let bg = "";

  if (props.toastType === "success") bg = "bg-[#DAFF73]";
  else if (props.toastType === "info") bg = "bg-[#BCE6EC]";
  else if (props.toastType === "error") bg = "bg-[#FF9179]";
  else if (props.toastType === "warn") bg = "bg-[#FF9179]";

  return (
    <div className="flex w-[350px] items-center justify-between rounded-lg border-[1px] border-[#202025] bg-[#FFFFFF] p-4 text-lg shadow-[0px_4px_0px_0px_#343a32]">
      <div className="flex items-center gap-2 text-[#202025]">
        {props.toastType === "success" ? (
          <div className={`rounded-[100%] p-[8px] ${bg}`}>
            <Image src={Success} alt="success" />
          </div>
        ) : props.toastType === "info" ? (
          <div className={`rounded-[100%] p-[8px] ${bg}`}>
            <Image src={Info} alt="info" />
          </div>
        ) : props.toastType === "error" ? (
          <div className={`rounded-[100%] p-[8px] ${bg}`}>
            <Image src={Error} alt="error" />
          </div>
        ) : (
          <div className={`rounded-[100%] p-[8px] ${bg}`}>
            <Image src={Success} alt="deny" />
          </div>
        )}
        <div className="">
          <p className="text-lg">{props.title}</p>
          {props.description && <p className="text-sm">{props.description}</p>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {props.link && (
          <Link
            href={props.link}
            className="whitespace-nowrap text-lg font-bold"
          >
            Open
          </Link>
        )}
        <button
          className="text-3xl"
          onClick={() => toast.dismiss(props.toastId)}
        >
          &times;
        </button>
      </div>
    </div>
  );
};
