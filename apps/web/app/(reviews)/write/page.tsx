"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";

import { createReviewAction } from "./action";
import { updateReviewAction } from "../../../action/updateReviewAction";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";
import Input from "../../../components/ui/Input";
import Textarea from "../../../components/ui/Textarea";

type visibilityType = "private" | "followers";

function WriteVisibility() {
  const [visibility, setVisibility] = useState<visibilityType>("followers");

  return (
    <div className="flex gap-2 py-4 justify-center">
      <input name="visibility" type="text" hidden value={visibility} readOnly />
      <Button
        label="공개"
        size="small"
        onClick={() => setVisibility("followers")}
        scheme={`${visibility === "followers" ? "active" : "inactive"}`}
      />
      <Button
        label="비공개"
        size="small"
        onClick={() => setVisibility("private")}
        scheme={`${visibility === "private" ? "active" : "inactive"}`}
      />
    </div>
  );
}

function WriteRating() {
  const [starRating, setStarRating] = useState<number>(0);
  const MAX_RATING = 5;

  return (
    <div className="text-center py-4">
      <h3 className="font-bold text-xl pb-2">만족스러우셨나요?</h3>
      <div className="relative inline-block">
        <input name="rating" hidden type="number" value={starRating} readOnly />
        <div className="flex">
          {Array.from({ length: MAX_RATING })
            .fill(0)
            .map((_, index) => (
              <OutlineStarIcon
                onClick={() => setStarRating(index + 1)}
                key={index}
                className="size-8 text-primary"
              />
            ))}
        </div>
        <div className="flex absolute top-0 left-0">
          {Array.from({ length: starRating })
            .fill(0)
            .map((_, index) => (
              <StarIcon
                onClick={() => setStarRating(index + 1)}
                key={index}
                className="size-8 text-primary"
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const [state, formAction, isPending] = useFormState(
    searchParams.id ? updateReviewAction : createReviewAction,
    {}
  );
  const router = useRouter();

  if (state.status) {
    router.push("/reviews");
  }

  return (
    <form action={formAction}>
      <input
        type="text"
        name="reviewId"
        value={searchParams.id}
        hidden
        readOnly
      />
      <Select name="categoryId" options={[{ value: 1, label: "전체" }]} />
      <Input name="title" placeholder="제목을 입력하세요" required={true} />
      <Textarea name="content" placeholder="리뷰를 작성해주세요" />
      <div>
        <Input type="file" name="imageUpload" placeholder="이미지 업로드" />
      </div>
      <Input name="tag" placeholder="태그" />
      <Input name="link" placeholder="링크추가" />
      <WriteVisibility />
      <WriteRating />
      <Button
        type="submit"
        label={searchParams.id ? "리뷰 수정" : "리뷰 작성"}
        size="large"
        scheme="primary"
        disabled={isPending}
      />
    </form>
  );
}
