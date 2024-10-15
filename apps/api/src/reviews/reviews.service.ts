import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { CreateReviewDto } from './dto/CreateReviewDto';

const supabase = createClient(
  'https://algsfyxfsvqgthqbmwzr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsZ3NmeXhmc3ZxZ3RocWJtd3pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYxMTEyODgsImV4cCI6MjA0MTY4NzI4OH0.7Y2QUFRraSGmt3NWbSGSUflMx71kjxWCVo8jA5EWjII',
);

@Injectable()
export class ReviewsService {
  async getReviews(user, categoryId?: number, myReview?: boolean) {
    let query = supabase
      .from('reviews')
      .select(
        `
        id,
        title,
        content,
        rating,
        visibility,
        createdAt: created_at,
        updatedAt: updated_at,
        category:category_id (
          id,
          name,
          visibility
        ),
        author:profile (
          avatarUrl:avatar_url,
          name,
          username
        )
      `,
      )
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (!myReview) {
      const { data: followingData, error: followingError } = await supabase
        .from('follows')
        .select('following_id')
        .eq('user_id', user.id)
        .is('deleted_at', null);

      if (followingError) throw new Error(followingError.message);

      const followingIds = followingData.map((follow) => follow.following_id);

      if (followingIds.length > 0) {
        const userCondition = `user_id.eq.${user.id}`;

        const followingCondition = followingIds
          .map((id) => `user_id.eq.${id}`)
          .map((id) => `visibility.eq.followers`)
          .join(',');

        query = query.or(`${userCondition},${followingCondition}`);
      } else {
        query = query.eq('user_id', user.id);
      }
    } else {
      query = query.eq('user_id', user.id);
    }

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    const { data, error } = await query;

    if (error) throw new Error(error.message);

    return data;
  }

  async getReviewDetail(user, reviewId) {
    const { data, error } = await supabase
      .from('reviews')
      .select('*, profile(username)')
      .eq('id', reviewId)
      .eq('user_id', user.id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(error.message);

    return {
      ...data,
      username: data?.profile?.username,
      profile: undefined,
    };
  }

  async createReview(user, createReviewDto: CreateReviewDto) {
    const { categoryId, title, content, rating, visibility } = createReviewDto;
    const { data, error } = await supabase.from('reviews').insert([
      {
        category_id: categoryId,
        user_id: user.id,
        title,
        content,
        rating,
        visibility,
        created_at: new Date(),
        deleted_at: null,
      },
    ]);

    if (error) throw new Error(error.message);
    return data;
  }

  async updateReview(user, reviewId: number, createReviewDto: CreateReviewDto) {
    const { categoryId, title, content, rating, visibility } = createReviewDto;
    const { data, error } = await supabase
      .from('reviews')
      .update({
        category_id: categoryId,
        title,
        content,
        rating,
        visibility,
        updated_at: new Date(),
      })
      .eq('id', reviewId)
      .eq('user_id', user.id)
      .is('deleted_at', null); // 삭제된 리뷰는 수정할 수 없도록 필터링

    if (error) throw new Error(error.message);
    return data;
  }

  async deleteReview(user, reviewId: number) {
    const { data, error } = await supabase
      .from('reviews')
      .update({ deleted_at: new Date() })
      .eq('id', reviewId)
      .eq('user_id', user.id);

    if (error) throw new Error(error.message);
    return data;
  }
}
