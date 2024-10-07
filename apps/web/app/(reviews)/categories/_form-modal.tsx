import React from 'react';
import { Button, Dialog } from '@i-review-you/react-components';

import { useActionState } from 'react';
import { updateCategories } from './actions';

export default function FormModal({ selectedCategory, onClose }) {
  const [state, submitAction, isPending] = useActionState(updateCategories, {});

  return (
    <Dialog isOpen setIsOpen={onClose}>
      <h1 className="text-lg font-bold">
        카테고리
        {selectedCategory.id ? '수정' : '추가'}
      </h1>
      <form action={submitAction}>
        <div className="mt-3">
          <input
            name="name"
            className="w-full p-3 border border-gray-100 rounded-[5px]"
            defaultValue={selectedCategory.name}
          />
          <div className="mt-2.5 flex gap-1">
            <label className="flex-1">
              <input
                className="hidden peer"
                type="radio"
                name="visibility"
                value="followers"
                defaultChecked={selectedCategory.visibility === 'followers'}
              />
              <div className="text-center border py-3.5 rounded-[10px] font-bold text-gray-300 border-gray-100 peer-checked:text-[#17B16B] peer-checked:border-[#17B16B]">
                팔로워 공개
              </div>
            </label>
            <label className="flex-1">
              <input
                className="hidden peer"
                type="radio"
                name="visibility"
                value="private"
                defaultChecked={selectedCategory.visibility === 'private'}
              />
              <div className="text-center border py-3.5 rounded-[10px] font-bold text-gray-300 border-gray-100 peer-checked:text-[#17B16B] peer-checked:border-[#17B16B]">
                나만보기
              </div>
            </label>
          </div>
        </div>
        <div className="mt-5 flex justify-end gap-3">
          <Button size="small" onClick={onClose}>
            닫기
          </Button>
          <Button type="submit" size="small">
            저장
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
