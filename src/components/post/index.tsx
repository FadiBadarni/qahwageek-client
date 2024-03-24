import { useAppDispatch } from 'hooks/useAppDispatch';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getPostById } from 'store/post/postActions';
import { RootState } from 'store/store';
import DOMPurify from 'dompurify';
import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import { createDOMPurifyConfig } from 'utils/domPurifyConfig';
import ShareContainer from './ShareContainer';
import PostSEO from './PostSEO';
import CommentsSection from './CommentsSection';
import { CategoryDetail } from 'models/post';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import RelatedPosts from './related';

type Props = {};

const Post = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();

  const {
    data: post,
    status,
    error,
  } = useSelector((state: RootState) => state.posts.currentPost);

  useEffect(() => {
    if (postId) {
      dispatch(getPostById(Number(postId)));
    }
  }, [postId, dispatch]);

  const sanitizedContent = post
    ? DOMPurify.sanitize(post.content, createDOMPurifyConfig())
    : '';

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const formattedDate =
    post && post.publishedAt
      ? format(parseISO(post.publishedAt), 'dd MMMM, yyyy', { locale: ar })
      : 'لم يتم النشر بعد';

  const handleCategoryClick = (
    e: React.MouseEvent<HTMLSpanElement, globalThis.MouseEvent>,
    slug: string
  ) => {
    e.stopPropagation();
    navigate(`/category/${slug}`);
  };
  return (
    <>
      <PostSEO
        title={post?.title}
        description={post?.content}
        imageUrl={post?.mainImageUrl}
        url={`https://qahwageek.com/posts/${post?.id}`}
      />
      <div>
        {post ? (
          <article>
            {post.mainImageUrl && (
              <div
                className="relative w-full h-[25vh] md:h-[35vh] lg:h-[45vh] xl:h-[55vh] mb-4 rounded-md bg-cover bg-center"
                style={{ backgroundImage: `url(${post.mainImageUrl})` }}
              >
                <div className="absolute top-0 left-0 right-0 bottom-0 rounded-md bg-gradient-to-b from-white/10 to-white/60 dark:from-black/30 dark:to-black/90"></div>

                <div className="absolute bottom-[5vh] sm:bottom-[5vh] md:bottom-[5vh] lg:bottom-[10vh] xl:bottom-[12vh] w-full p-4 md:p-8">
                  <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-light-text dark:text-dark-text leading-tight">
                      {post.title}
                    </h1>
                  </div>
                </div>
              </div>
            )}
            <div
              className="relative p-4 -mt-[8vh] sm:-mt-[8vh] md:-mt-[10vh] lg:-mt-[15vh] xl:-mt-[15vh] mx-auto max-w-7xl px-6 lg:px-8 rounded-t-md
             bg-gradient-to-br from-transparent to-transparent via-light-layer dark:via-dark-layer/90
             shadow-lg dark:shadow-xl dark:shadow-gray-800/50 border border-transparent dark:border-dark-border
             backdrop-blur-lg dark:backdrop-blur-md
             "
            >
              <div className="flex flex-wrap items-center text-sm justify-between mb-4">
                {/* Author, Date, and Reading Time */}
                <div className="flex flex-wrap items-center flex-grow">
                  <span className="text-xs sm:text-sm">كتب بواسطة - </span>
                  <Link
                    to={`/user/profile/${post.authorId}`}
                    className="font-semibold text-xs sm:text-sm ml-1 mr-1 sm:mr-2 hover:text-brand-500 dark:hover:text-brand-400 transition-colors duration-300"
                  >
                    {post.author}
                  </Link>

                  <span className=" sm:inline mx-1 sm:mx-2">|</span>
                  <time
                    className="text-xs sm:text-sm block ml-1 mr-1"
                    dateTime={post.publishedAt}
                  >
                    {formattedDate}
                  </time>
                  <span className=" sm:inline mx-1 sm:mx-2">|</span>
                  <span className="text-xs sm:text-sm block">{`${post.readingTime} دقائق قراءة`}</span>
                </div>

                {post && (
                  <ShareContainer
                    url={`https://qahwageek.com/posts/${post.id}`}
                    title={post.title}
                  />
                )}
              </div>
              <div className="mt-4 p-2 rounded-t-md md:px-32 px-0">
                <div
                  dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                  className="prose dark:prose-dark mx-auto max-w-none"
                ></div>

                <div className="mt-6 flex justify-center items-center">
                  <div className="h-1 w-20 rounded-full bg-gradient-to-r from-brand-500 to-transparent dark:from-brand-400 dark:to-transparent"></div>
                  <span className="mx-4 text-neutral-600 dark:text-neutral-400">
                    نهاية المقال
                  </span>
                  <div className="h-1 w-20 rounded-full bg-gradient-to-l from-brand-500 to-transparent dark:from-brand-400 dark:to-transparent"></div>
                </div>

                <div className="mt-8 p-4 bg-light-layer/80 dark:bg-dark-layer/80 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-lg shadow-md flex flex-wrap items-center justify-between sm:gap-0 gap-2">
                  <div className="flex items-center">
                    <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                      التصنيفات
                    </h4>
                    <ArrowLeftIcon className="w-5 h-5 text-neutral-800 dark:text-neutral-200 mr-2" />
                    <div className="flex flex-wrap ml-4">
                      {post.categoryDetails.map(
                        (category: CategoryDetail, index: number) => (
                          <span
                            key={index}
                            className="inline-flex items-center justify-center rounded-md px-2 py-1 text-sm font-medium bg-neutral-400/50 dark:bg-dark-border text-light-text dark:text-dark-text hover:bg-light-primary dark:hover:bg-dark-primary cursor-pointer transition-colors duration-200 ease-in-out mr-2 mb-2"
                            onClick={(e) =>
                              handleCategoryClick(e, category.slug)
                            }
                          >
                            {category.name}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                      كتب بواسطة
                    </h4>
                    <ArrowLeftIcon className="w-5 h-5 text-neutral-800 dark:text-neutral-200 mr-2 ml-2" />
                    <div className="flex flex-col items-center cursor-pointer">
                      <a href={`/user/profile/${post.authorId}`}>
                        <img
                          src={
                            post.authorProfilePicture ||
                            '/missing-image-dark.png'
                          }
                          alt={post.author}
                          className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 mb-2"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ) : (
          <div>Post not found</div>
        )}
      </div>
      <div className="mx-auto max-w-7xl sm:px-4 lg:px-8 sm:mt-4 flex flex-wrap">
        <div className="w-full lg:w-1/2 sm:px-4 mb-8 lg:mb-0">
          <CommentsSection postId={Number(postId)} />
        </div>
        <div className="w-full lg:w-1/2 px-4">
          {postId && <RelatedPosts postId={Number(postId)} />}
        </div>
      </div>
    </>
  );
};

export default Post;
