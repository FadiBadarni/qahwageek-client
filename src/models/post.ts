export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  authorId: number;
  publishedAt: string;
  mainImageUrl?: string;
  readingTime?: number;
  categoryDetails: CategoryDetail[];
  status: PostStatus;
  createdAt: string;
}
export interface NewPost {
  title: string;
  content: string;
  mainImageUrl?: string;
  categoryIds: number[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parentId?: number;
  subCategories?: Category[];
  description?: string;
}

export interface LightPost {
  id: number;
  title: string;
  author: string;
  publishedAt: string;
  mainImageUrl?: string;
  readingTime?: number;
  categoryDetails: CategoryDetail[];
}

export interface CategoryDetail {
  name: string;
  slug: string;
}

export interface PostSearchResult {
  id: string;
  title: string;
  mainImageUrl: string;
}

export enum PostStatus {
  Pending = 'PENDING',
  Published = 'PUBLISHED',
  Rejected = 'REJECTED',
}
