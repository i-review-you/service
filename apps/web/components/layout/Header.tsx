import LogoSmall from '@/assets/logo-small.svg';

import { UserCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-1/2 transform -translate-x-1/2 max-w-[768px] w-full z-50 flex justify-between bg-white border-b border-gray-200 px-8 pt-16 pb-2">
      <Link href={"/"}>
        <Image
          src={LogoSmall}
          alt="I Review U"
          width={131}
          height={100}
          objectFit="cover"
        />
      </Link>
      <Link href={"/user"}>
        <UserCircleIcon className="size-10" />
      </Link>
    </header>
  );
}
