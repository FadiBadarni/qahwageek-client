import React, { useState } from 'react';
import { LightPost, CategoryDetail } from 'models/post';
import { format, parseISO } from 'date-fns';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { determineTextDirection } from 'utils/textDirection';
import { CalendarIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import { ar } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

interface PostCardProps {
  post: LightPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const currentTheme = useSelector((state: RootState) => state.theme.theme);
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState(
    post.mainImageUrl || '/missing-image-dark.png'
  );

  const handleImageError = () => {
    if (currentTheme === 'light') setImageUrl('/missing-image-light.png');
    else setImageUrl('/missing-image-dark.png');
  };

  const handlePostClick = () => {
    navigate(`/posts/${post.id}`);
  };

  const handleCategoryClick = (slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/category/${slug}`);
  };

  return (
    <article
      onClick={handlePostClick}
      className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white dark:bg-dark-layer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
    >
      <div className="flex-shrink-0">
        <img
          className="h-32 sm:h-40 w-full object-cover"
          src={imageUrl}
          alt={post.title}
          onError={handleImageError}
        />
      </div>
      <div className="flex-1 p-3 flex flex-col justify-between">
        <div>
          <h3
            className={`text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 ${
              determineTextDirection(post.title) === 'rtl'
                ? 'text-right'
                : 'text-left'
            }`}
            dir={determineTextDirection(post.title)}
          >
            {post.title}
          </h3>

          <div className="flex justify-around items-center text-neutral-500 dark:text-neutral-400 sm:text-xs mt-2 sm:h-12 h-8">
            <div className="flex flex-row sm:flex-col items-center justify-center">
              <UserIcon className="h-5 w-5 mb-1 sm:ml-0 ml-2" />
              <span className="text-center">{post.author}</span>
            </div>
            <div className="flex flex-row sm:flex-col items-center">
              <CalendarIcon className="h-5 w-5 mb-1 sm:ml-0 ml-2" />
              <time dateTime={post.publishedAt}>
                {format(parseISO(post.publishedAt), 'dd MMMM, yyyy', {
                  locale: ar,
                })}
              </time>
            </div>
            {post.readingTime && (
              <div className="flex flex-row sm:flex-col items-center">
                <ClockIcon className="h-5 w-5 mb-1 sm:ml-0 ml-2" />
                <span>{post.readingTime} دَ قراءة </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-start items-start sm:mt-4 mt-2">
          <div className="flex flex-wrap gap-2 w-full">
            {post.categoryDetails.map((category: CategoryDetail) => (
              <span
                key={category.id}
                onClick={(e) => handleCategoryClick(category.slug, e)}
                className="inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium bg-neutral-400/50 dark:bg-dark-border text-light-text dark:text-dark-text hover:bg-light-primary dark:hover:bg-dark-primary cursor-pointer transition-colors duration-200 ease-in-out"
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
