"use client";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

import Select from "../ui/Select";
import Input from "../ui/Input";

const EMAIL_ADDRESSES = [
  { value: "", label: "선택해주세요" },
  { value: "gmail.com", label: "gmail.com" },
  { value: "naver.com", label: "naver.com" },
  { value: "daum.net", label: "daum.net" },
  { value: "hotmail.com", label: "hotmail.com" },
  { value: "kakao.com", label: "kakao.com" },
  { value: "nate.com", label: "nate.com" },
  { value: "direct_input", label: "직접입력" },
];

export default function SelectEmailAddress() {
  const [isDirectInput, setIsDirectInput] = useState<boolean>(false);

  const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsDirectInput(e.target.value === "direct_input");
  };

  return (
    <>
      {isDirectInput ? (
        <div className="relative">
          <Input name="emailAddress" />
          <XMarkIcon
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 cursor-pointer"
            onClick={() => setIsDirectInput((prev) => !prev)}
          />
        </div>
      ) : (
        <Select
          name="emailAddress"
          options={EMAIL_ADDRESSES}
          onChange={handleDomainChange}
        />
      )}
    </>
  );
}
