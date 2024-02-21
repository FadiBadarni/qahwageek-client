import React from 'react';
import FeaturedPosts from './FeaturedPosts';
import { LatestPosts } from './LatestPosts';
import { UpcomingEvents } from './UpcomingEvents';
import { CodePosts } from './CodePosts';

export const Home: React.FC = () => {
  return (
    <div>
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-center mt-4 mb-4">
        أهلا وسهلا بقهوة چيك!
      </h1>
      <div className="space-y-4">
        <div className="py-3">
          <FeaturedPosts />
        </div>
        <div className="md:flex md:space-x-4">
          <div className="md:w-2/3">
            <LatestPosts />
            <CodePosts />
          </div>
          <div className="md:w-1/3">
            <UpcomingEvents />
          </div>
        </div>
      </div>
    </div>
  );
};
