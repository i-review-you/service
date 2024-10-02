/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
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
      .is('deleted_at', null)
      .order('sort_order', { ascending: true });
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
