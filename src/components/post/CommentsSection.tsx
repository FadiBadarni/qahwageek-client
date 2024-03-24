import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import {
  createComment,
  getCommentsByPostId,
} from 'store/comment/commentActions';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { LoadingStatus } from 'store/shared/commonState';
import { MdSend } from 'react-icons/md';
import ReplyInput from './ReplyInput';
import PostComment from './PostComment';
import { Link } from 'react-router-dom';
import { selectCommentsByPostId } from 'store/comment/commentSelectors';

interface CommentsSectionProps {
  postId: number;
}

const CommentsSection: FC<CommentsSectionProps> = ({ postId }) => {
  const dispatch = useAppDispatch();
  const currentUser = useSelector((state: RootState) => state.user.data);

  const [commentText, setCommentText] = useState('');
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const { data: comments, status } = useSelector((state: RootState) =>
    selectCommentsByPostId(state, postId)
  );

  useEffect(() => {
    if (postId) {
      dispatch(getCommentsByPostId(postId));
    }
  }, [postId, dispatch]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      dispatch(createComment({ postId, content: commentText }));
      setCommentText('');
    }
  };

  return (
    <div className="bg-light-layer dark:bg-dark-layer p-4 rounded-b-md mx-auto max-w-7xl mb-4">
      {currentUser ? (
        <>
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4 text-right">
            أضف تعليقاً
          </h2>
          <form className="mb-4" onSubmit={handleCommentSubmit}>
            <div className="flex flex-col bg-light-input dark:bg-dark-input rounded-md border border-gray-300 dark:border-gray-700 overflow-hidden">
              <textarea
                className="w-full p-2 text-sm text-neutral-800 dark:text-neutral-200 rounded-t-md border-none bg-light-input dark:bg-dark-input focus:outline-none focus:ring focus:border-blue-300"
                placeholder="كتابة تعليق..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onFocus={() => setShowSubmitButton(true)}
                onBlur={() => setShowSubmitButton(commentText.trim() !== '')}
                maxLength={500}
              />
              <div
                className={`transition-all duration-500 ease-in-out ${
                  showSubmitButton
                    ? 'max-h-16 opacity-100'
                    : 'max-h-0 opacity-0 overflow-hidden'
                }`}
              >
                <div className="flex justify-end px-2 py-1 mt-1">
                  <button
                    type="submit"
                    className="bg-brand-500 hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline flex items-center justify-center text-xs"
                  >
                    إرسال <MdSend className="mr-1 h-4 w-4 rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </>
      ) : (
        <blockquote className="text-center my-4 p-4 bg-light-input dark:bg-dark-input border-l-4 border-brand-500 rounded-md">
          <p className="text-neutral-600 dark:text-neutral-400">
            بدك تحكي رأيك وتعلق؟ يلا{' '}
            <Link to="/register" className="text-brand-500 hover:underline">
              سجل عنا
            </Link>{' '}
            وخلينا نشوف شو عندك، ما تستحي!
          </p>
        </blockquote>
      )}

      <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4 text-right">
        التعليقات
      </h2>
      {status === LoadingStatus.Loading && (
        <div className="text-center">جار التحميل...</div>
      )}
      {status === LoadingStatus.Succeeded && comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment.id}
            className={`py-4 px-4 my-2 rounded-lg sm:mx-4 bg-gray-50 dark:bg-dark-input`}
          >
            <PostComment comment={comment} setReplyingTo={setReplyingTo} />
            {replyingTo === comment.id && (
              <ReplyInput
                postId={postId}
                commentId={comment.id}
                setReplyingTo={setReplyingTo}
              />
            )}
          </div>
        ))
      ) : (
        <div className="text-neutral-600 dark:text-neutral-400 text-center">
          لا توجد تعليقات.
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
