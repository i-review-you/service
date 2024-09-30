"use client";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FloatingButton() {
  const pathname = usePathname();

  if (pathname.includes("write")) return;

  return (
    <Link
      href={"/write"}
      className="fixed bottom-28 right-8 md:right-[18%] bg-[#FBAB4C] rounded-full p-2"
    >
      <PlusIcon className="size-10 text-white" />
    </Link>
  );
}
