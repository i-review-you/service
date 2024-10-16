import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { CreateReviewDto } from './dto/CreateReviewDto';

const supabase = createClient(
  'https://algsfyxfsvqgthqbmwzr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsZ3NmeXhmc3ZxZ3RocWJtd3pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYxMTEyODgsImV4cCI6MjA0MTY4NzI4OH0.7Y2QUFRraSGmt3NWbSGSUflMx71kjxWCVo8jA5EWjII',
);

@Injectable()
export class ReviewsService {
  async getReviews(
    user,
    categoryId?: number,
    myReview?: boolean,
    tagName?: string,
  ) {
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
        ),
        tags:review_tags(name, deleted_at),
        links:review_links(name, href, deleted_at)
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

    const { data: reviews, error: reviewsError } = await query;

    if (reviewsError) throw new Error(reviewsError.message);

    if (tagName) {
      const reviewIds = reviews.map((review) => review.id);

      const { data: tagData, error: tagError } = await supabase
        .from('review_tags')
        .select('review_id')
        .eq('name', tagName)
        .is('deleted_at', null);

      if (tagError) throw new Error(tagError.message);

      const filteredReviewIds = tagData.map((item) => item.review_id);

      const filteredReviews = reviews.filter((review) =>
        filteredReviewIds.includes(review.id),
      );

      return filteredReviews.map((review) => {
        return {
          ...review,
          tags: review.tags.filter((tag) => tag.deleted_at === null),
          links: review.links.filter((link) => link.deleted_at === null),
        };
      });
    }

    const { data, error } = await query;

    if (error) throw new Error(error.message);

    return data.map((review) => {
      return {
        ...review,
        tags: review.tags.filter((tag) => tag.deleted_at === null),
        links: review.links.filter((link) => link.deleted_at === null),
      };
    });
  }

  async getReviewDetail(user, reviewId) {
    const { data: reviewData, error } = await supabase
      .from('reviews')
      .select(
        '*, profile(username), review_tags(name), review_links(name, href)',
      )
      .eq('id', reviewId)
      .eq('user_id', user.id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(error.message);

    return {
      ...reviewData,
      username: reviewData?.profile?.username,
      profile: undefined,
    };
  }

  async createReview(user, createReviewDto: CreateReviewDto) {
    const { categoryId, title, content, rating, visibility, tags, links } =
      createReviewDto;

    const { data: reviewData, error: reviewError } = await supabase
      .from('reviews')
      .insert([
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
      ])
      .select('id');

    if (reviewError) throw new Error(reviewError.message);

    const reviewId = reviewData[0].id;

    if (tags && tags.length > 0) {
      const tagData = tags.map((tag) => ({
        review_id: reviewId,
        name: tag,
        created_at: new Date(),
        deleted_at: null,
      }));
      const { error: tagError } = await supabase
        .from('review_tags')
        .insert(tagData);
      if (tagError) throw new Error(tagError.message);
    }

    if (links && links.length > 0) {
      const linkData = links.map((link) => ({
        review_id: reviewId,
        name: link.name,
        href: link.href,
        created_at: new Date(),
        deleted_at: null,
      }));
      const { error: linkError } = await supabase
        .from('review_links')
        .insert(linkData);
      if (linkError) throw new Error(linkError.message);
    }

    return reviewData;
  }

  async updateReview(user, reviewId: number, createReviewDto: CreateReviewDto) {
    const { categoryId, title, content, rating, visibility, tags, links } =
      createReviewDto;

    // 리뷰 기본 정보 업데이트
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
      .is('deleted_at', null);
    if (error) throw new Error(error.message);

    await supabase
      .from('review_tags')
      .update({ deleted_at: new Date() })
      .eq('review_id', reviewId)
      .is('deleted_at', null);

    if (tags && tags.length > 0) {
      const tagData = tags.map((tag) => ({
        review_id: reviewId,
        name: tag,
        created_at: new Date(),
        deleted_at: null,
      }));

      const { error: tagError } = await supabase
        .from('review_tags')
        .insert(tagData);
      if (tagError) throw new Error(tagError.message);
    }

    await supabase
      .from('review_links')
      .update({ deleted_at: new Date() })
      .eq('review_id', reviewId)
      .is('deleted_at', null);

    if (links && links.length > 0) {
      const linkData = links.map((link) => ({
        review_id: reviewId,
        name: link.name,
        href: link.href,
        created_at: new Date(),
        deleted_at: null,
      }));

      const { error: linkError } = await supabase
        .from('review_links')
        .insert(linkData);
      if (linkError) throw new Error(linkError.message);
    }

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
