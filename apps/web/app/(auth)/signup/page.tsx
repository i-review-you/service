import type { Metadata } from 'next';

import React from 'react';
import Form from './_form';

export const metadata: Metadata = {
  title: '회원가입',
};

export default async function page() {
  return (
    <Form />
  );
}
