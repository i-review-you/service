'use server';
import { cookies } from "next/headers";

export async function login(formData: FormData) {
  const response = await fetch(`http://localhost:3000/auth`, {
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
  cookies().set('token', result.session.access_token);

  // Mutate data
}
