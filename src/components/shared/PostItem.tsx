import React from 'react';
import { ClockIcon, UserIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import { RecentPost } from 'models/post';

interface PostItemProps {
  post: RecentPost;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const navigate = useNavigate();
  const {
    id,
    title,
    author,
    publishedAt,
    mainImageUrl,
    readingTime,
    categoryNames,
  } = post;

  const date = parseISO(publishedAt);

  const formattedDate = format(date, 'dd MMMM - HH:mm', { locale: ar });

  const handleClick = () => {
    navigate(`/posts/${id}`);
  };
  return (
    <div
      className="flex items-center p-4 border-b border-gray-300 last:border-b-0 dark:border-dark-500 bg-gray-100 dark:bg-dark-700 rounded-md cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:bg-gray-200 dark:hover:bg-dark-600"
      onClick={handleClick}
    >
      <div className="flex-grow flex flex-col justify-between h-full">
        {/* Title and category badges container */}
        <div className="flex justify-between items-start">
          <h3 className="text-base sm:text-lg font-semibold dark:text-white">
            {title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {categoryNames.map((category, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-4 h-12">
          <div className="flex flex-col sm:flex-row items-center">
            <UserIcon className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-0 sm:ml-2" />
            <span>{author}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center">
            <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-0 sm:ml-2" />
            <time dateTime={publishedAt}>{formattedDate}</time>
          </div>
          {readingTime && (
            <div className="flex flex-col sm:flex-row items-center">
              <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-0 sm:ml-2" />
              <span>{readingTime} دَ قراءة</span>
            </div>
          )}
        </div>
      </div>
      {mainImageUrl && (
        <img
          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg mr-4 sm:mr-4"
          src={mainImageUrl}
          alt={title}
        />
      )}
    </div>
  );
};

export default PostItem;
