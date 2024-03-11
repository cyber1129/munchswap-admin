"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  CreateCollectionRequestType,
  createCollection,
} from "~/api.services/collection.service";
import { uploadFile } from "~/api.services/file.service";
import Header from "~/components/header";
import { customToast } from "~/components/toast";
import { useUserContext } from "~/context/userContext";

export default function Page() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);

  const { isLogged } = useUserContext();

  useEffect(() => {
    if (isLogged === false) {
      router.push("/");
    }
  }, [isLogged]);

  const [collection, setCollection] = useState<CreateCollectionRequestType>({
    name: "",
    description: "",
    imgUrl: "",
    inscriptionIds: [],
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] !== undefined) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    if (file) formData.append("file", file);
    else
      return customToast({
        toastType: "warn",
        title: "Please select collection image",
      });

    const { imageUrl } = await uploadFile(formData);

    let inscriptionIds: string[] = [];

    console.log("collection.inscriptionIds", collection.inscriptionIds);
    try {
      inscriptionIds = JSON.parse(collection.inscriptionIds as string);
    } catch (error) {
      console.error(error);
      return customToast({
        toastType: "error",
        title: "Invalid inscription ids",
      });
    }

    try {
      await createCollection({
        ...collection,
        website: collection.website === "" ? undefined : collection.website,
        twitter: collection.website === "" ? undefined : collection.twitter,
        discord: collection.website === "" ? undefined : collection.discord,
        inscriptionIds,
        imgUrl: imageUrl,
      });

      customToast({
        toastType: "success",
        title: "Successfully created a collection",
      });
    } catch (error) {
      console.error(error);
      customToast({ toastType: "warn", title: "Error happened" });
    }
  };

  const onChanged = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.target.name === "name")
      setCollection({ ...collection, name: e.target.value });
    else if (e.target.name === "description")
      setCollection({ ...collection, description: e.target.value });
    else if (e.target.name === "website")
      setCollection({ ...collection, website: e.target.value });
    else if (e.target.name === "discord")
      setCollection({ ...collection, discord: e.target.value });
    else if (e.target.name === "twitter")
      setCollection({ ...collection, twitter: e.target.value });
    else if (e.target.name === "inscriptionIds")
      setCollection({ ...collection, inscriptionIds: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <Header />
      <main className="flex h-full flex-col items-center justify-center">
        <form className="flex flex-col gap-y-2" onSubmit={onSubmit}>
          <div className="flex items-end">
            <p className="w-44">Name</p>
            <input
              name="name"
              type="text"
              className="w-[700px] rounded-md border-2 bg-transparent bg-opacity-35 px-2 py-1 outline-none"
              onChange={onChanged}
            />
          </div>
          <div className="flex items-end">
            <p className="w-44">Image</p>
            <input
              type="file"
              className="w-[700px] rounded-md border-2 bg-transparent bg-opacity-35 px-2 py-1 outline-none"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex items-end">
            <p className="w-44">Description</p>
            <textarea
              name="description"
              onChange={onChanged}
              className="w-[700px] resize-none rounded-md border-2 bg-transparent bg-opacity-35 px-2 py-1 outline-none"
            />
          </div>
          <div className="flex items-end">
            <p className="w-44">Website</p>
            <input
              type="url"
              required={false}
              onChange={onChanged}
              name="website"
              className="w-[700px] rounded-md border-2 bg-transparent bg-opacity-35 px-2 py-1 outline-none"
            />
          </div>
          <div className="flex items-end">
            <p className="w-44">Discord</p>
            <input
              type="url"
              required={false}
              onChange={onChanged}
              name="discord"
              className="w-[700px] rounded-md border-2 bg-transparent bg-opacity-35 px-2 py-1 outline-none"
            />
          </div>
          <div className="flex items-end">
            <p className="w-44">Twitter</p>
            <input
              type="url"
              required={false}
              name="twitter"
              onChange={onChanged}
              className="w-[700px] rounded-md border-2 bg-transparent bg-opacity-35 px-2 py-1 outline-none"
            />
          </div>
          <div className="flex items-end">
            <p className="w-44">Inscription ids</p>
            <textarea
              name="inscriptionIds"
              className="h-96 w-[700px] resize-none rounded-md border-2 bg-transparent bg-opacity-35 px-2 py-1 outline-none"
              onChange={onChanged}
            />
          </div>
          <div className="flex w-full justify-end">
            <button
              type="submit"
              className="connect-button-box-shadow font-Poppins relative rounded-xl border-2 border-normal-font-color bg-[#DAFF73] px-4 py-2 text-normal-font-color"
            >
              Submit
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
