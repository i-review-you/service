'use client';
import { useState, useActionState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as OutlineStarIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Input,
  Textarea,
  FixedActionButton,
} from '@i-review-you/react-components';

import Categories from './_form-categories';

import { updateReviewAction } from '../../../action/updateReviewAction';
import { createReviewAction } from './action';

export default function Form({ review }) {
  const [state, formAction, isPending] = useActionState(
    review?.id ? updateReviewAction : createReviewAction,
    {}
  );

  return (
    <form
      action={formAction}
      className="bg-gray-100 h-full flex flex-col justify-between"
    >
      <div className="px-3.5">
        {review?.id && (
          <input type="hidden" name="reviewId" value={review.id} readOnly />
        )}
        <Categories />
        <Input
          name="title"
          placeholder="제목을 입력하세요"
          required={true}
          defaultValue={review?.title}
        />
        <Textarea
          name="content"
          placeholder="리뷰를 작성해주세요"
          defaultValue={review?.content}
        />
        {/* <div> */}
        {/*  <Input type="file" name="imageUpload" placeholder="이미지 업로드" /> */}
        {/* </div> */}
        {/* <Input name="tag" placeholder="태그" /> */}
        {/* <Input name="link" placeholder="링크추가" /> */}
        <WriteVisibility defaultValue={review?.visibility} />
        <WriteRating defaultValue={review?.rating} />
      </div>
      <FixedActionButton type="submit" scheme="primary" disabled={isPending}>
        {review?.id ? '리뷰 수정' : '리뷰 작성'}
      </FixedActionButton>
    </form>
  );
}

type visibilityType = 'private' | 'followers';

function WriteVisibility({ defaultValue }: { defaultValue?: visibilityType }) {
  const [visibility, setVisibility] = useState<visibilityType>(
    defaultValue || 'followers'
  );

  return (
    <div className="flex justify-center gap-2 py-4">
      <input name="visibility" type="text" hidden value={visibility} readOnly />
      <Button
        size="small"
        onClick={() => setVisibility('followers')}
        scheme={`${visibility === 'followers' ? 'active' : 'inactive'}`}
      >
        팔로워 공개
      </Button>
      <Button
        size="small"
        onClick={() => setVisibility('private')}
        scheme={`${visibility === 'private' ? 'active' : 'inactive'}`}
      >
        비공개
      </Button>
    </div>
  );
}

function WriteRating({ defaultValue }: { defaultValue?: number }) {
  const [starRating, setStarRating] = useState<number>(defaultValue || 0);
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
