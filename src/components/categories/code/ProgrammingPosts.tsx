import { useEffect } from 'react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getNewestProgrammingPosts } from 'store/post/postActions';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import NewsReport from './NewsReport';

type Props = {};

const ProgrammingPosts = (props: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNewestProgrammingPosts());
  }, [dispatch]);

  const programmingPosts = useSelector(
    (state: RootState) => state.posts.programmingPosts.data
  );
  return (
    <div className="bg-light-100 dark:bg-dark-900 mb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-8 mt-8 lg:mt-10">
          <div className="lg:col-span-5 space-y-10">
            {programmingPosts.map((post) => (
              <article
                key={post.id}
                className="relative flex flex-row gap-8 items-center"
              >
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 lg:w-32 lg:h-32">
                    <img
                      src={post.mainImageUrl}
                      alt={post.title}
                      className="w-full h-full rounded-xl object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-x-4 text-xs">
                    <time
                      dateTime={post.publishedAt}
                      className="text-neutral-400"
                    >
                      {new Date(post.publishedAt).toLocaleDateString('en-US')}
                    </time>
                    <span className="relative z-10 rounded-full bg-neutral-100 dark:bg-neutral-700 px-3 py-1.5 font-medium text-neutral-600 dark:text-neutral-300">
                      {post.categoryNames.join(', ')}
                    </span>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-neutral-700 dark:text-neutral-100 group-hover:text-brand-500 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="hidden sm:block mt-3 text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                      تعلم المزيد حول التقنيات والممارسات الحديثة في مجال
                      البرمجة.
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="lg:col-span-3 ">
            <NewsReport />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgrammingPosts;
