/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://algsfyxfsvqgthqbmwzr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsZ3NmeXhmc3ZxZ3RocWJtd3pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYxMTEyODgsImV4cCI6MjA0MTY4NzI4OH0.7Y2QUFRraSGmt3NWbSGSUflMx71kjxWCVo8jA5EWjII');

@Injectable()
export class UsersService {
  async getUserByUsername(currentUser, username: string) {
    const { data, error } = await supabase
      .from('profile')
      .select(`
        userId:user_id,
        username,
        avatarUrl:avatar_url,
        name,
        biography
      `)

      .eq('username', username)
      .limit(1)
      .single();

    if (error) {
      throw new HttpException({
        message: error.message,
      }, HttpStatus.BAD_REQUEST, { cause: error });
    }

    const { count } = await supabase
      .from('follows')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', currentUser.id)
      .eq('following_id', data.userId)
      .is('deleted_at', null);

    return {
      ...data,
      isFollowing: count > 0,
    };
  }

  async follow(user, username: string) {
    const { data: follower } = await supabase
      .from('profile')
      .select('user_id')
      .eq('username', username)
      .limit(1)
      .single();

    const { count } = await supabase
      .from('follows')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('following_id', follower.user_id)
      .is('deleted_at', null);

    if (count > 0) {
      throw new HttpException({
        message: '이미 팔로잉 중입니다',
      }, HttpStatus.BAD_REQUEST);
    }

    const { data, error } = await supabase
      .from('follows')
      .insert({
        user_id: user.id,
        following_id: follower.user_id,
      })
      .select('id');

    return !!data;
  }

  async unfollow(user, username: string) {
    const { data: follower } = await supabase
      .from('profile')
      .select('user_id')
      .eq('username', username)
      .limit(1)
      .single();

    const { data, error } = await supabase
      .from('follows')
      .update({
        deleted_at: new Date(),
      })
      .eq('user_id', user.id)
      .eq('following_id', follower.user_id)
      .select('id');

    return !!data;
  }

  async me(user) {
    const { data, error } = await supabase
      .from('profile')
      .select(`
              username,
              avatarUrl:avatar_url,
              name,
              biography
            `)
      .eq('user_id', user.id)
      .limit(1)
      .single();

    return data;
  }
}
