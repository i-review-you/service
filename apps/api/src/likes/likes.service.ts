/* eslint-disable @stylistic/brace-style */
import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://algsfyxfsvqgthqbmwzr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsZ3NmeXhmc3ZxZ3RocWJtd3pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYxMTEyODgsImV4cCI6MjA0MTY4NzI4OH0.7Y2QUFRraSGmt3NWbSGSUflMx71kjxWCVo8jA5EWjII',
);

@Injectable()
export class LikesService {
  async toggleLike(user, reviewId) {
    // 기존 좋아요 여부 확인
    const { data: existingLike, error: selectError } = await supabase
      .from('review_like')
      .select('*')
      .eq('user_id', user.id)
      .eq('review_id', reviewId)
      .is('deleted_at', null)
      .maybeSingle();

    if (selectError) {
      throw new Error(selectError.message);
    }

    // 이미 좋아요를 눌렀다면 -> 좋아요 삭제
    if (existingLike) {
      const { error: deleteError } = await supabase
        .from('review_like')
        .update({ deleted_at: new Date() })
        .eq('id', existingLike.id);

      if (deleteError) {
        throw new Error(deleteError.message);
      }
      return false; // 좋아요 false 상태
    } else {
      const { error: insertError } = await supabase.from('review_like').insert({
        user_id: user.id,
        review_id: reviewId,
        created_at: new Date(),
        deleted_at: null,
      });

      if (insertError) {
        throw new Error(insertError.message);
      }
      return true; // 좋아요 true 상태
    }
  }

  async getLikeCount(reviewId: number) {
    const { count, error } = await supabase
      .from('review_like')
      .select('*', { count: 'exact' })
      .eq('review_id', reviewId)
      .is('deleted_at', null);

    if (error) throw new Error(error.message);
    return count;
  }
}
