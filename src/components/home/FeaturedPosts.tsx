import React from 'react';
import { ClockIcon, UserIcon, CalendarIcon } from '@heroicons/react/24/outline';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { RecentPost } from 'models/post';
import { useNavigate } from 'react-router-dom';

const posts: RecentPost[] = [
  {
    id: 1,
    title: '9 استراتيجيّات البحث عن عمل في زمن التغيرات',
    author: 'فادي بدارنة',
    publishedAt: '2023-01-01',
    mainImageUrl: 'https://via.placeholder.com/150',
    readingTime: 5,
  },
  {
    id: 2,
    title: 'العنوان الثاني',
    author: 'فادي بدارنة',
    publishedAt: '2023-01-02',
    mainImageUrl: 'https://via.placeholder.com/150',
    readingTime: 5,
  },
  {
    id: 3,
    title: 'العنوان الثالث',
    author: 'فادي بدارنة',
    publishedAt: '2023-01-03',
    mainImageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    title: 'العنوان الرابع',
    author: 'فادي بدارنة',
    publishedAt: '2023-01-04',
    mainImageUrl: 'https://via.placeholder.com/150',
  },
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const FeaturedPosts: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-2">
      <h2 className="text-xl sm:text-xl md:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-white text-right">
        المقالات المميزة
      </h2>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        arrows={false}
        autoPlaySpeed={5000}
        swipeable={true}
        draggable={true}
        showDots={false}
        removeArrowOnDeviceType={['tablet', 'mobile', 'desktop']}
        itemClass="carousel-item-padding-40-px"
        className="rounded-lg shadow-lg"
        rtl
      >
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4"
            onClick={() => navigate(`/posts/${post.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <div className="relative bg-white rounded-lg overflow-hidden transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
              {post.mainImageUrl && (
                <div className="relative group">
                  <img
                    src={post.mainImageUrl}
                    alt={post.title}
                    className="w-full object-cover h-48 rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                    <h3 className="text-lg font-semibold leading-6 text-white">
                      {post.title}
                    </h3>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center">
                        <UserIcon
                          className="h-5 w-5 text-gray-200 ml-1"
                          aria-hidden="true"
                        />
                        <span className="text-sm text-gray-200">
                          {post.author}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon
                          className="h-5 w-5 text-gray-200 ml-1"
                          aria-hidden="true"
                        />
                        <time
                          dateTime={post.publishedAt}
                          className="text-sm text-gray-200"
                        >
                          {post.publishedAt}
                        </time>
                      </div>
                      {post.readingTime && (
                        <div className="flex items-center text-gray-200">
                          <ClockIcon
                            className="h-5 w-5 ml-1 "
                            aria-hidden="true"
                          />
                          <span>{post.readingTime} دقائق</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default FeaturedPosts;
