import React, { useState } from 'react';
import { LightPost, CategoryDetail } from 'models/post';
import { format, parseISO } from 'date-fns';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { determineTextDirection } from 'utils/textDirection';

interface PostCardProps {
  post: LightPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const currentTheme = useSelector((state: RootState) => state.theme.theme);

  const [imageUrl, setImageUrl] = useState(
    post.mainImageUrl || '/missing-image-dark.png'
  );

  const handleImageError = () => {
    if (currentTheme === 'light') setImageUrl('/missing-image-light.png');
    else setImageUrl('/missing-image-dark.png');
  };

  const formattedPublishedDate = format(
    parseISO(post.publishedAt),
    'd MMMM yyyy'
  );

  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white dark:bg-dark-layer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl relative">
      <div className="flex-shrink-0">
        <img
          className="h-40 w-full object-cover"
          src={imageUrl}
          alt={post.title}
          onError={handleImageError}
        />
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3
            className={`text-xl font-semibold text-gray-900 dark:text-white line-clamp-1 overflow-hidden overflow-ellipsis ${
              determineTextDirection(post.title) === 'rtl'
                ? 'text-right'
                : 'text-left'
            }`}
            dir={determineTextDirection(post.title)}
          >
            {post.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            بواسطة {post.author} - {formattedPublishedDate}
          </p>
        </div>
        <div className="mt-2">
          <p className="text-gray-500 text-sm">
            وقت القراءة: {post.readingTime} دقيقة
          </p>
          <div className="flex flex-wrap mt-1">
            {post.categoryDetails.map((category: CategoryDetail) => (
              <span
                key={category.id}
                className="mr-2 text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
