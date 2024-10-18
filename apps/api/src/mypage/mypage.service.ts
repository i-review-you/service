/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://algsfyxfsvqgthqbmwzr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsZ3NmeXhmc3ZxZ3RocWJtd3pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYxMTEyODgsImV4cCI6MjA0MTY4NzI4OH0.7Y2QUFRraSGmt3NWbSGSUflMx71kjxWCVo8jA5EWjII');

@Injectable()
export class MyPageService {
  async getProfile(user) {
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

    if (error) {
      throw new HttpException({
        message: error.message,
      }, HttpStatus.BAD_REQUEST, { cause: error });
    }

    return data;
  }

  async getFollowingCount(user) {
    const { count, error } = await supabase
      .from('follows')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .is('deleted_at', null);

    if (error) {
      throw new HttpException({
        message: error.message,
      }, HttpStatus.BAD_REQUEST, { cause: error });
    }

    return count;
  }

  async getFollowerCount(user) {
    const { count, error } = await supabase
      .from('follows')
      .select('*', { count: 'exact', head: true })
      .eq('following_id', user.id)
      .is('deleted_at', null);

    if (error) {
      throw new HttpException({
        message: error.message,
      }, HttpStatus.BAD_REQUEST, { cause: error });
    }

    return count;
  }

  async getReviewCount(user) {
    const { count, error } = await supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .is('deleted_at', null);

    if (error) {
      throw new HttpException({
        message: error.message,
      }, HttpStatus.BAD_REQUEST, { cause: error });
    }

    return count;
  }

  async getFollowing(user) {
    const sqlQuery = `
      SELECT jsonb_agg(row_to_json(t))
      FROM (
        SELECT username, name, biography
        FROM profile
        JOIN follows
        ON profile.user_id = follows.following_id
        WHERE follows.user_id = $1
        AND follows.deleted_at IS NULL
      ) AS t;      
    `;
    const { data, error } = await supabase
      .rpc('execute_sql', { sql: sqlQuery, params: user.id });

    if (error) {
      throw new HttpException({
        message: error,
      }, HttpStatus.BAD_REQUEST, { cause: error });
    }

    return data;
  }

  async getFollower(user) {
    const sqlQuery = `
      SELECT jsonb_agg(row_to_json(t))
      FROM (
        SELECT username, name, biography
        FROM profile
        JOIN follows
        ON profile.user_id = follows.following_id
        WHERE follows.following_id = $1
        AND follows.deleted_at IS NULL
      ) AS t;      
    `;
    const { data, error } = await supabase
      .rpc('execute_sql', { sql: sqlQuery, params: user.id });

    if (error) {
      throw new HttpException({
        message: error.message,
      }, HttpStatus.BAD_REQUEST, { cause: error });
    }

    return data;
  }

  async getReviews(user) {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        
      `)
      .eq('user_id', user.id)
      .is('deleted_at', null);

    if (error) {
      throw new HttpException({
        message: error.message,
      }, HttpStatus.BAD_REQUEST, { cause: error });
    }

    return data;
  }

  async updateProfile(user, { username, name, biography }) {
    const { data, error } = await supabase
      .from('profile')
      .update({
        username,
        name,
        biography,
      })
      .eq('user_id', user.id)
      .select();

    if (error) {
      throw new HttpException({
        message: error.message,
      }, HttpStatus.BAD_REQUEST, { cause: error });
    }

    return data;
  }
}
