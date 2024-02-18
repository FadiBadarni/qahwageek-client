export interface RecentPost {
  id: number;
  title: string;
  writer: string;
  publishedAt: string;
  imageUrl?: string;
  readingTime?: number;
}

export interface LightPost {
  id: number;
  title: string;
  writer: string;
  publishedAt: string;
  imageUrl?: string;
}
