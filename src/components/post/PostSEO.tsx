import React from 'react';
import { Helmet } from 'react-helmet';

interface PostSEOProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  url?: string;
}

const PostSEO: React.FC<PostSEOProps> = ({
  title = 'قهوة چيك - مقال غير موجود',
  description = 'استكشف مقالات تقنية وبرمجية باللغة العربية. تابع أحدث التطورات في عالم التكنولوجيا وشارك تجاربك وأفكارك مع مجتمع قهوة چيك.',
  imageUrl = 'URL_TO_A_DEFAULT_IMAGE',
  url = 'https://qahwageek.netlify.app',
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={imageUrl} />
    <meta property="og:type" content="article" />
    <meta property="og:url" content={url} />
    <link rel="canonical" href={url} />
  </Helmet>
);

export default PostSEO;
