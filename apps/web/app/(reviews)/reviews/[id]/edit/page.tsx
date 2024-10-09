'use server';
import { cookies } from 'next/headers';
import Form from '../../_form';

export default async function Page({ params: { id } }) {
  const token = cookies().get('token')?.value;
  const url = new URL(`/reviews/${id}`, process.env.API_ORIGIN);
  const response = await fetch(url,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  const review = await response.json();

  return (
    <Form review={review} />
  );
}
