// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { customAlphabet } from 'https://esm.sh/nanoid@5';

const supabaseUrl = Deno.env.get('SUPABASE_URL') as string;
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') as string;
Deno.serve(async (req) => {
  const payload = await req.json();
  const supabase = createClient(supabaseUrl, supabaseKey);
  const randomUsername = `user${customAlphabet('1234567890', 12)()}`;
  const { result, error } = await supabase
    .from('profile')
    .insert({
      user_id: payload.record.id,
      username: randomUsername,
      name: randomUsername,
      avatar_url: `https://avatar.iran.liara.run/public/boy?username=${randomUsername}`,
    });

  await supabase
    .from('categories')
    .insert({
      user_id: payload.record.id,
      name: '기본',
      sort_order: 1,
      visibility: 'private',
    });

  if (error) {
    console.log(error);
    throw new Error();
  }

  return new Response(
    JSON.stringify(result),
    { headers: { 'Content-Type': 'application/json' } },
  );
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/after-signup-hook' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
