'use client';
import { useState, useActionState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as OutlineStarIcon } from '@heroicons/react/24/outline';
import Input from '../../../components/ui/Input';
import Textarea from '../../../components/ui/Textarea';
import Button from '../../../components/ui/Button';

import Categories from './_form-categories';

import { updateReviewAction } from '../../../action/updateReviewAction';
import { createReviewAction } from './action';

export default function Form({ review }) {
  const [state, formAction, isPending] = useActionState(
    review?.id ? updateReviewAction : createReviewAction,
    {},
  );

  return (
    <form action={formAction} className="bg-gray-100 h-full flex flex-col justify-between">
      <div className="px-3.5">
        {review?.id && (
          <input
            type="hidden"
            name="reviewId"
            value={review.id}
            readOnly
          />
        )}
        <Categories />
        <Input
            name="title"
            placeholder="제목을 입력하세요"
            required={true}
            defaultValue={review?.title}
        />
        <Textarea name="content" placeholder="리뷰를 작성해주세요" defaultValue={review?.content} />
        {/* <div> */}
        {/*  <Input type="file" name="imageUpload" placeholder="이미지 업로드" /> */}
        {/* </div> */}
        {/* <Input name="tag" placeholder="태그" /> */}
        {/* <Input name="link" placeholder="링크추가" /> */}
        <WriteVisibility />
        <WriteRating />
      </div>
      <button
        type="submit"
        className="pt-4 block w-full text-center text-[20px] font-bold text-white bg-primary disabled:bg-gray-300"
        disabled={isPending}
        style={{
          paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))',
        }}
      >
        {review?.id ? '리뷰 수정' : '리뷰 작성'}
      </button>
    </form>
  );
}

type visibilityType = 'private' | 'followers';

function WriteVisibility() {
  const [visibility, setVisibility] = useState<visibilityType>('followers');

  return (
    <div className="flex justify-center gap-2 py-4">
      <input name="visibility" type="text" hidden value={visibility} readOnly />
      <Button
        label="팔로워 공개"
        size="small"
        onClick={() => setVisibility('followers')}
        scheme={`${visibility === 'followers' ? 'active' : 'inactive'}`}
      />
      <Button
        label="비공개"
        size="small"
        onClick={() => setVisibility('private')}
        scheme={`${visibility === 'private' ? 'active' : 'inactive'}`}
      />
    </div>
  );
}

function WriteRating() {
  const [starRating, setStarRating] = useState<number>(0);
  const MAX_RATING = 5;

  return (
    <div className="py-4 text-center">
      <h3 className="pb-2 text-xl font-bold">만족스러우셨나요?</h3>
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
        <div className="absolute top-0 left-0 flex">
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
