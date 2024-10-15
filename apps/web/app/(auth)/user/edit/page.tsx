import { UserCircleIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Button from '../../../../components/ui/Button';
import Input from '../../../../components/ui/Input';
import Link from 'next/link';

export default function Page() {
  // 1. 회원 정보 조회
  // 2. 유저 네임 중복 체크
  // 3. 회원 정보 수정
  return (
    <div>
      <UserCircleIcon className="w-24 relative left-1/2 transform -translate-x-1/2" />
      <form action="">
        <fieldset className="pt-10">
          <label htmlFor="email" className="font-bold">
            이메일
          </label>
          <Input
            id="email"
            name="email"
            readOnly
          />
        </fieldset>
        <fieldset className="pt-10">
          <label htmlFor="username" className="font-bold">
            유저네임
          </label>
          <div className="relative">
            <Input
              id="username"
              name="username"
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 font-bold">
              확인
            </button>
          </div>
        </fieldset>
        <fieldset className="pt-10">
          <label htmlFor="introduction" className="font-bold">
            한 줄 소개
          </label>
          <Input
            id="introduction"
            name="introduction"
          />
        </fieldset>
        <Button label="수정" type="submit" size="large" />
      </form>
      <Link href="/reset" className="flex pt-24">
        비밀번호 초기화
        <ChevronRightIcon className="w-5" />
      </Link>
    </div>
  );
}
