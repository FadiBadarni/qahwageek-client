import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPostById } from 'store/post/postActions';
import { RootState } from 'store/store';
import DOMPurify from 'dompurify';

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

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const sanitizedContent = post ? DOMPurify.sanitize(post.content) : '';
  return (
    <div>
      {post ? (
        <article className="prose lg:prose-xl mx-auto">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        </article>
      ) : (
        <div>Post not found</div>
      )}
    </div>
  );
};

export default Post;
