import React, { useEffect } from 'react';
import { ClockIcon, UserIcon, CalendarIcon } from '@heroicons/react/24/outline';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getFeaturedPosts } from 'store/post/postActions';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import { LoadingStatus } from 'store/shared/commonState';
import FeaturedPostSkeleton from './skeletons/FeaturedPostSkeleton';

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getFeaturedPosts());
  }, [dispatch]);

  const { data: posts, status } = useSelector(
    (state: RootState) => state.posts.featuredPosts
  );

  return (
    <div className="space-y-2 p-4">
      <h2 className="text-xl sm:text-xl md:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-white text-right ">
        المقالات المميزة
      </h2>
      {status === LoadingStatus.Loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeaturedPostSkeleton />
          <FeaturedPostSkeleton />
        </div>
      ) : (
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
              className="relative p-4 mx-auto max-w-7xl rounded-lg shadow-md dark:shadow-lg border border-light-border dark:border-dark-border backdrop-blur-sm dark:backdrop-blur-md bg-gradient-to-br from-light-layer to-light-background dark:from-dark-layer dark:to-dark-background transition duration-300 ease-in-out"
              onClick={() => navigate(`/posts/${post.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="relative bg-neutral-300 rounded-lg overflow-hidden transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
                {post.mainImageUrl && (
                  <div className="relative group">
                    <img
                      src={post.mainImageUrl}
                      alt={post.title}
                      className="w-full object-cover h-48 rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-10 dark:bg-neutral-800 dark:bg-opacity-20 backdrop-blur-sm border border-transparent p-2 sm:p-4">
                      <h3 className="text-md sm:text-lg font-semibold leading-5 sm:leading-6 text-white">
                        {post.title}
                      </h3>
                      <div className="flex justify-between items-center mt-2 sm:mt-4">
                        <div className="flex items-center">
                          <UserIcon
                            className="h-4 sm:h-5 w-4 sm:w-5 text-gray-200 ml-1"
                            aria-hidden="true"
                          />
                          <span className="text-xs sm:text-sm text-gray-200">
                            {post.author}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <CalendarIcon
                            className="h-4 sm:h-5 w-4 sm:w-5 text-gray-200 ml-1"
                            aria-hidden="true"
                          />
                          <time
                            dateTime={post.publishedAt}
                            className="text-xs sm:text-sm text-gray-200"
                          >
                            {format(
                              parseISO(post.publishedAt),
                              'dd MMMM - HH:mm',
                              { locale: ar }
                            )}
                          </time>
                        </div>
                        {post.readingTime && (
                          <div className="flex items-center text-gray-200">
                            <ClockIcon
                              className="h-4 sm:h-5 w-4 sm:w-5 ml-1 "
                              aria-hidden="true"
                            />
                            <span className="text-xs sm:text-sm">
                              {post.readingTime} دقائق
                            </span>
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
      )}
    </div>
  );
};

export default FeaturedPosts;
