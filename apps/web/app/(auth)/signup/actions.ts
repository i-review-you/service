'use server';

export async function verifyEmail(prevState, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const url = new URL('/auth/signup', process.env.API_ORIGIN);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const result = await response.json();
  console.log('wefwefew', result);

  return {
    email,
  };
}
