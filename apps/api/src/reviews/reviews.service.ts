import { randomUUID } from 'node:crypto';
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
        links:review_links(name, href, deleted_at),
        images:review_images(id, url)
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

      const followingIds = followingData.map(follow => follow.following_id);

      if (followingIds.length > 0) {
        const followingReviews = supabase
          .from('reviews')
          .select('*')
          .in('user_id', followingIds)
          .eq('visibility', 'followers')
          .is('deleted_at', null);

        const myReviews = supabase
          .from('reviews')
          .select('*')
          .eq('user_id', user.id)
          .is('deleted_at', null);

        const { data: followingReviewsData, error: followingReviewsError } =
          await followingReviews;
        const { data: myReviewsData, error: myReviewsError } = await myReviews;

        if (followingReviewsError)
          throw new Error(followingReviewsError.message);
        if (myReviewsError) throw new Error(myReviewsError.message);

        const combinedReviews = [...followingReviewsData, ...myReviewsData];

        query = query.or(
          combinedReviews.map((review) => `id.eq.${review.id}`).join(','),
        );
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
        '*, profile(username), review_tags(name), review_links(name, href), images:review_images(object_id, url)',
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
    const { categoryId, title, content, rating, visibility, tags, links, images }
      = createReviewDto;

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

    if (images && images.length > 0) {
      for (const image of images) {
        const { data, error } = await supabase.from('review_images').insert({
          review_id: reviewId,
          object_id: image.object_id,
          sort_order: 0,
          url: image.url,
        });
      }
    }

    return reviewData;
  }

  async updateReview(user, reviewId: number, createReviewDto: CreateReviewDto) {
    const { categoryId, title, content, rating, visibility, tags, links, images }
      = createReviewDto;

    console.log('이미지가 안오나?', images);
    const { data: currentReview } = await supabase
      .from('reviews')
      .select(
        '*, profile(username), review_tags(name), review_links(name, href), images:review_images(id, object_id, url, sort_order)',
      )
      .eq('id', reviewId)
      .eq('user_id', user.id)
      .is('deleted_at', null)
      .single();

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

    if (images && images.length > 0) {
      let sortOrder = 0;
      for (const image of images) {
        const _image = currentReview.images.find(img => img.object_id === image.object_id);
        if (_image) {
          if (_image.sort_order !== sortOrder) {
            const { data, error } = await supabase.from('review_images').update({
              sort_order: sortOrder,
            }).eq('id', _image.id);
          }
        }
        else {
          const { data, error } = await supabase.from('review_images').insert({
            review_id: reviewId,
            object_id: image.object_id,
            sort_order: sortOrder,
            url: image.url,
          });
        }
        sortOrder++;
      }

      // 이미지 삭제
      for (const image of currentReview.images) {
        if (images.some(i => i.object_id === image.object_id)) {
          continue;
        }

        await supabase.from('review_images').delete().eq('id', image.id);
      }
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

  async uploadImage(user, file: Express.Multer.File) {
    const uid = randomUUID();
    const session = await supabase.auth.setSession(user);
    console.log('session', session);
    const { data, error } = await supabase.storage.from('review_images').upload(`${uid}.${file.originalname.split('.').at(-1)}`, file.buffer, {
      contentType: file.mimetype,
    });
    console.log('????', data, error);
    const url = await supabase.storage.from('review_images').getPublicUrl(data.path);
    return {
      id: data.id,
      url,
    };
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
