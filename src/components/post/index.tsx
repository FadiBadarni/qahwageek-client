import { useAppDispatch } from 'hooks/useAppDispatch';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPostById } from 'store/post/postActions';
import { RootState } from 'store/store';
import DOMPurify from 'dompurify';
import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import { createDOMPurifyConfig } from 'utils/domPurifyConfig';

type Props = {};

const Post = (props: Props) => {
  const dispatch = useAppDispatch();
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

  return (
    <div>
      {post ? (
        <article>
          {post.mainImageUrl && (
            <div
              className="relative w-full max-w-7xl mx-auto h-[25vh] md:h-[35vh] lg:h-[45vh] xl:h-[55vh] mb-4 rounded-md bg-cover bg-center"
              style={{ backgroundImage: `url(${post.mainImageUrl})` }}
            >
              <div className="absolute top-0 left-0 right-0 bottom-0 rounded-md bg-gradient-to-b from-black/30 to-black/90"></div>

              <div className="absolute bottom-14 w-full p-4 md:bottom-20 lg:p-8">
                <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white leading-tight">
                  {post.title}
                </h1>
              </div>
            </div>
          )}

          <div
            className="relative mb-6 p-4 bg-light-layer dark:bg-dark-layer/90 rounded-md 
            -mt-[8vh] sm:-mt-[8vh] md:-mt-[10vh] lg:-mt-[15vh] xl:-mt-[15vh]"
          >
            <div className="flex flex-wrap items-center text-sm justify-between mb-4">
              {/* Author, Date, and Reading Time */}
              <div className="flex flex-wrap items-center flex-grow">
                <span>كتب بواسطة - </span>
                <span className="font-semibold mr-2">{post.author}</span>
                <span className=" md:inline mx-2">|</span>
                <time className="block" dateTime={post.publishedAt}>
                  {formattedDate}
                </time>
                <span className=" md:inline mx-2">|</span>
                <span className="block">{`${post.readingTime} دقائق قراءة`}</span>
              </div>
              {/* Categories */}
              <div className="flex flex-wrap items-center mt-2 md:mt-0">
                {post.categoryNames.map((category, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center justify-center rounded-full px-3 py-1 text-xs md:text-sm font-semibold ml-2 my-1
                              bg-light-background text-brand-500 dark:bg-dark-background dark:text-accent-400"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 p-2  rounded-md">
              <div
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                className="prose dark:prose-dark mx-auto max-w-none"
              ></div>
            </div>
          </div>
        </article>
      ) : (
        <div>Post not found</div>
      )}
    </div>
  );
};

export default Post;
