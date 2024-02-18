export interface RecentPost {
  id: number;
  title: string;
  author: string;
  publishedAt: string;
  mainImageUrl?: string;
  readingTime?: number;
}

export interface LightPost {
  id: number;
  title: string;
  writer: string;
  publishedAt: string;
  imageUrl?: string;
}

export interface NewPost {
  title: string;
  content: string;
  mainImageUrl?: string;
  readingTime?: number;
}
