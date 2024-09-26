export interface reviewDataSnake {
  id: number;
  user_id: string;
  category_id: number;
  title: string;
  content: string;
  rating: number;
  visibility: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface reviewDataCamel {
  id?: number;
  userId?: string;
  categoryId?: number;
  title?: string;
  content?: string;
  rating?: number;
  visibility?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}
