import { useAppDispatch } from 'hooks/useAppDispatch';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPostById } from 'store/post/postActions';
import { RootState } from 'store/store';
import DOMPurify from 'dompurify';
import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';

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

  const createDOMPurifyConfig = () => {
    return {
      ADD_TAGS: ['h3', 'strong', 'u', 'img', 'span', 'a', 'pre', 'ul', 'li'],
      ADD_ATTR: ['style', 'href', 'target', 'rel', 'class', 'spellcheck'],
    };
  };

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
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-black/60 rounded-md"></div>

              <div className="absolute bottom-14 w-full p-4">
                <h1 className="text-4xl font-bold text-white">{post.title}</h1>
              </div>
            </div>
          )}

          <div className="relative -mt-[10vh] mb-6 p-4 bg-white/90 dark:bg-dark-800/90 rounded-md">
            <div className="flex flex-wrap items-center text-sm justify-between mb-4">
              {/* Author, Date, and Reading Time */}
              <div className="flex items-center flex-grow">
                <span>كتب بواسطة - </span>
                <span className="font-semibold mr-2">{post.author}</span>
                <span className="mx-4">|</span>
                <time dateTime={post.publishedAt}>{formattedDate}</time>
                <span className="mx-4">|</span>
                <span>{`${post.readingTime} دقائق قراءة`}</span>
              </div>
              {/* Categories */}
              <div className="flex flex-wrap items-center">
                {post.categoryNames.map((category, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-semibold ml-2 my-1
                      bg-brand-200 text-brand-500 dark:bg-dark-700 dark:text-accent-400"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 p-6 bg-white/90 dark:bg-dark-800/90 rounded-md">
              <div
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                className="prose dark:prose-dark"
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
