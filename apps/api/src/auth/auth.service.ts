import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://algsfyxfsvqgthqbmwzr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsZ3NmeXhmc3ZxZ3RocWJtd3pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYxMTEyODgsImV4cCI6MjA0MTY4NzI4OH0.7Y2QUFRraSGmt3NWbSGSUflMx71kjxWCVo8jA5EWjII');

@Injectable()
export class AuthService {
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return data;
  }

  async signup(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'https://example.com/welcome',
      },
    });
    console.log('왜,', error);
    return data;
  }

  async confirm(token: string) {
    const { data, error } = await supabase.auth.verifyOtp({ token_hash: token, type: 'email' });
    console.log('결과는?', data, error);
    return data;
  }

  async getUser(jwt) {
    const { data, error } = await supabase.auth.getUser(jwt);

    if (error) {
      throw new UnauthorizedException();
    }
    return data;
  }
}
