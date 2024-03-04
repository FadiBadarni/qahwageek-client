export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  authorId: number;
  publishedAt: string;
  mainImageUrl?: string;
  readingTime?: number;
  categoryNames: string[];
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
}
export interface LightPost {
  id: number;
  title: string;
  author: string;
  publishedAt: string;
  mainImageUrl?: string;
  readingTime?: number;
  categoryNames: string[];
}

export interface PostSearchResult {
  id: string;
  title: string;
  mainImageUrl: string;
}
