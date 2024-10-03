'use server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import Form from './_categories';

export default async function Page() {
  const token = cookies().get('token')?.value;

  const url = new URL('/categories', process.env.API_ORIGIN);
  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    redirect('/login');
  }
  const categories = await response.json();

  return (
    <Form categories={categories} />
  );
}
