'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Form from '../_form';

export default async function Page({ params: { id } }) {
  const token = cookies().get('token')?.value;
  if (!token) {
    redirect('/login');
  }

  return (
    <Form />
  );
}
