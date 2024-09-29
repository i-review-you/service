'use server';
import { cookies } from "next/headers";
import {redirect} from "next/navigation";

export async function login(prevState: any, formData: FormData) {
  const url = new URL('/auth', process.env.API_ORIGIN);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email: formData.get('email'),
      password: formData.get('password'),
    })
  });
  const result = await response.json();
  if (!result.session) {
    return {
      message: '아이디 혹은 비밀번호를 확인해주세요',
    };
  }
  cookies().set('token', result.session.access_token);

  redirect('/');
}
