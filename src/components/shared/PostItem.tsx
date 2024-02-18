import React from 'react';
import { ClockIcon, UserIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface PostItemProps {
  title: string;
  writer: string;
  publishedAt: string;
  imageUrl: string | undefined;
  readingTime?: number;
}

const PostItem: React.FC<PostItemProps> = ({
  title,
  writer,
  publishedAt,
  imageUrl,
  readingTime,
}) => {
  return (
    <div className="flex items-center p-4 border-b border-gray-300 last:border-b-0 dark:border-dark-500 bg-gray-100 dark:bg-dark-700 rounded-md">
      <div className="flex flex-grow flex-col justify-between h-full">
        <h3 className="text-base sm:text-lg font-semibold dark:text-white">
          {title}
        </h3>

        <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-4 h-12">
          <div className="flex flex-col sm:flex-row items-center">
            <UserIcon className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-0 sm:mr-2" />
            <span>{writer}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center">
            <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-0 sm:mr-2" />
            <time dateTime={publishedAt}>{publishedAt}</time>
          </div>
          {readingTime && (
            <div className="flex flex-col sm:flex-row items-center">
              <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-0 sm:mr-2" />
              <span>{readingTime} دقائق قراءة</span>
            </div>
          )}
        </div>
      </div>
      <img
        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg mr-4 sm:mr-4"
        src={imageUrl}
        alt={title}
      />
    </div>
  );
};

export default PostItem;
