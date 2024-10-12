/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://algsfyxfsvqgthqbmwzr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsZ3NmeXhmc3ZxZ3RocWJtd3pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYxMTEyODgsImV4cCI6MjA0MTY4NzI4OH0.7Y2QUFRraSGmt3NWbSGSUflMx71kjxWCVo8jA5EWjII');

@Injectable()
export class CategoriesService {
  async getList(user) {
    const { data, error } = await supabase
      .from('categories')
      .select(`
            id,
            name,
            sort_order,
            visibility
            `)
      .eq('user_id', user.id)
      .is('deleted_at', null);

    if (Array.isArray(data) && data.length > 0) {
      return data.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
    }

    return data;
  }

  async create(user, { name, sort_order, visibility = 'private' }) {
    const { data, error } = await supabase
      .from('categories')
      .insert({
        user_id: user.id,
        name,
        sort_order,
        visibility,
      })
      .select(`id,name,sort_order,visibility`);

    return data;
  }

  async update(user, { id, name, sort_order, visibility = 'private' }) {
    const { data, error } = await supabase
      .from('categories')
      .update({
        name,
        sort_order,
        visibility,
      })
      .eq('id', Number(id))
      .eq('user_id', user.id)
      .is('deleted_at', null)
      .select();

    if (data.length > 0) {
      return true;
    }
    return data;
  }

  async delete(user, { id }) {
    console.log('엥? 뭔데');
    const categoryResponse = await supabase
      .from('categories')
      .select('*')
      .eq('id', Number(id))
      .eq('user_id', user.id)
      .is('deleted_at', null);

    if (!(categoryResponse.data?.length > 0)) {
      throw new NotFoundException();
    }

    const { count: reviewsCount } = await supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', Number(id))
      .is('deleted_at', null);

    console.log('gkdlgkdl,', reviewsCount);
    if (reviewsCount > 0) {
      throw new HttpException({
        message: '해당 카테고리에 리뷰가 있으면 삭제할 수 없습니다',
      }, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const { count: categoriesCount } = await supabase
      .from('categories')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .is('deleted_at', null);

    if (categoriesCount <= 1) {
      throw new HttpException({
        message: '최소 하나 이상의 카테고리가 존재해야합니다',
      }, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const { data, error } = await supabase
      .from('categories')
      .update({ deleted_at: new Date() })
      .eq('id', Number(id))
      .eq('user_id', user.id)
      .is('deleted_at', null)
      .select();

    if (data.length > 0) {
      return true;
    }
    return error;
  }
}
