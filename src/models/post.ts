export interface RecentPost {
  id: number;
  title: string;
  author: string;
  publishedAt: string;
  mainImageUrl?: string;
  readingTime?: number;
  categories: Category[];
}
export interface NewPost {
  title: string;
  content: string;
  mainImageUrl?: string;
  readingTime?: number;
  categoryIds: number[];
}

export interface Category {
  id: number;
  name: string;
}
export interface LightPost {
  id: number;
  title: string;
  writer: string;
  publishedAt: string;
  imageUrl?: string;
}
