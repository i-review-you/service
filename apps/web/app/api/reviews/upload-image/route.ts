import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const token = cookies().get('token')?.value;
  const url = new URL('/reviews/upload', process.env.API_ORIGIN);
  const body = await req.formData();

  const file = body.get('file') as File;
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      refresh_token: cookies().get('rft')?.value,
    },
    body: formData,
  });
  const result = await response.json();

  return Response.json({
    id: result.id,
    url: result.url.data.publicUrl,
  });
}
