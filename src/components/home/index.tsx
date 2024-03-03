import React from 'react';
import FeaturedPosts from './FeaturedPosts';
import { LatestPosts } from './LatestPosts';
import { UpcomingEvents } from './UpcomingEvents';
import { HomeCodePosts } from './HomeCodePosts';
import { Helmet } from 'react-helmet-async';

export const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <Helmet>
        <title>قهوة چيك - الرئيسية</title>
        <meta
          name="description"
          content="استكشف مقالات تقنية وبرمجية باللغة العربية. تابع أحدث التطورات في عالم التكنولوجيا مع قهوة چيك."
        />
        <meta property="og:title" content="قهوة چيك - الرئيسية" />
        <meta
          property="og:description"
          content="موقعك المفضل لاستكشاف آخر الأخبار والمقالات حول التكنولوجيا، البرمجة، وأكثر من ذلك بكثير."
        />
        <meta property="og:image" content="URL_TO_A_HOME_PAGE_IMAGE" />
        <meta property="og:url" content="https://qahwageek.com" />
        <link rel="canonical" href="https://qahwageek.com" />
      </Helmet>
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-center mt-4 mb-4">
        أهلا وسهلا بقهوة چيك!
      </h1>
      <div className="">
        <div className="py-3">
          <FeaturedPosts />
        </div>
        <div className="md:flex md:space-x-4">
          <div className="md:w-2/3">
            <LatestPosts />
            <HomeCodePosts />
          </div>
          <div className="md:w-1/3">
            <UpcomingEvents />
          </div>
        </div>
      </div>
    </div>
  );
};
