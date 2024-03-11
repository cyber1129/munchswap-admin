import Link from "next/link";

const Header = () => {
  return (
    <div className="flex w-full justify-end gap-x-4 p-10">
      <Link href={"/"}>Info</Link>
      <Link href={"/collection"}>Create Collection</Link>
    </div>
  );
};

export default Header;
