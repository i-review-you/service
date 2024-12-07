'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(payload: {
  email: string;
  password: string;
}) {
  const url = new URL('/auth', process.env.API_ORIGIN);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
    }),
  });
  const result = await response.json();
  if (!result.session) {
    return {
      message: '아이디 혹은 비밀번호를 확인해주세요',
    };
  }

  (await cookies()).set('token', result.session.access_token, {
    expires: new Date(result.session.expires_at * 1000),
  });

  (await cookies()).set('rft', result.session.refresh_token);

  redirect('/');
}
