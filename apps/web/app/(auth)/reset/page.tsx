import SelectEmailAddress from "../../../components/reset/SelectEmailAddress";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

function EmailForm() {
  return (
    <>
      <h2 className="font-bold text-xl">비밀번호 초기화</h2>
      <form action="" className="pt-10">
        <label htmlFor="email" className="font-bold">
          이메일
        </label>
        <div className="flex items-center justify-between">
          <div className="w-1/2">
            <Input id="email" name="email" placeholder="이메일" />
          </div>
          <span className="px-2">@</span>
          <div className="flex-grow">
            <SelectEmailAddress />
          </div>
        </div>
        <Button label="이메일 인증" type="submit" />
      </form>
      <form action="">
        <div className="relative">
          <Input
            name="emailVerification"
            placeholder="이메일로 받은 인증코드를 입력해주세요."
          />
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 font-bold">
            확인
          </button>
        </div>
      </form>
    </>
  );
}

function PasswordForm() {
  return (
    <form action="" className="pt-10">
      <label htmlFor="password" className="font-bold">
        비밀번호
      </label>
      <p className="text-sm">
        영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
      </p>
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="비밀번호"
      />
      <Input name="passwordCheck" type="password" placeholder="비밀번호 확인" />
      <Button label="초기화" type="submit" size="large" />
    </form>
  );
}

export default function Page() {
  // 1. 이메일 인증 코드 요청
  // 2. 인증코드 확인
  // 3. 비밀번호 폼 노출
  return (
    <div className="py-24">
      <EmailForm />
      <PasswordForm />
    </div>
  );
}
