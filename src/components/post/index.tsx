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

  const formattedDate = post
    ? format(parseISO(post.publishedAt), 'dd MMMM, yyyy', { locale: ar })
    : '';

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
              className="relative p-4 bg-light-layer dark:bg-dark-layer/90 rounded-md 
            -mt-[8vh] sm:-mt-[8vh] md:-mt-[10vh] lg:-mt-[15vh] xl:-mt-[15vh] mx-auto max-w-7xl px-6 lg:px-8"
            >
              <div className="flex flex-wrap items-center text-sm justify-between mb-4">
                {/* Author, Date, and Reading Time */}
                <div className="flex flex-wrap items-center flex-grow">
                  <span>كتب بواسطة - </span>
                  <Link
                    to={`/user/profile/${post.authorId}`}
                    className="font-semibold mr-2"
                  >
                    {post.author}
                  </Link>

                  <span className=" md:inline mx-2">|</span>
                  <time className="block" dateTime={post.publishedAt}>
                    {formattedDate}
                  </time>
                  <span className=" md:inline mx-2">|</span>
                  <span className="block">{`${post.readingTime} دقائق قراءة`}</span>
                </div>

                {post && (
                  <ShareContainer
                    url={`https://qahwageek.com/posts/${post.id}`}
                    title={post.title}
                  />
                )}
              </div>
              <div className="mt-4 p-2 rounded-md md:px-32 px-0">
                <div
                  dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                  className="prose dark:prose-dark mx-auto max-w-none"
                ></div>
                <div className="mt-8 p-4 bg-light-background dark:bg-dark-background rounded-lg shadow flex flex-wrap items-center">
                  <div className="flex items-center ml-2">
                    <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 ml-2">
                      التصنيفات
                    </h4>
                    <ArrowLeftIcon className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />
                  </div>
                  {post.categoryDetails.map(
                    (category: CategoryDetail, index: number) => (
                      <span
                        key={index}
                        className="inline-flex items-center mr-2 justify-center rounded-md px-2 py-1 text-sm font-medium bg-neutral-400/50 dark:bg-dark-border text-light-text dark:text-dark-text hover:bg-light-primary dark:hover:bg-dark-primary cursor-pointer transition-colors duration-200 ease-in-out"
                        onClick={(e) => handleCategoryClick(e, category.slug)}
                      >
                        {category.name}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </article>
        ) : (
          <div>Post not found</div>
        )}
      </div>
      <div className="mx-auto max-w-7xl px-4 lg:px-8 mt-4 flex flex-wrap">
        <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
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
