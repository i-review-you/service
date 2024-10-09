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
  console.log('겨로가', result);
  return (
    <div>
      인증이 완료되었습니다.
    </div>
  );
}
