'use server';

export default async function Page({ searchParams }) {
  const token = searchParams['token_hash'];
  const url = new URL('/auth/confirm', process.env.API_ORIGIN);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });
  const result = await response.json();

  return (
    <div>
      인증이 완료되었습니다.
      <a href="/login">로그인하기</a>
    </div>
  );
}
