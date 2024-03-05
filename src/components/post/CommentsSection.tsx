import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { getCommentsByPostId } from 'store/comment/commentActions';
import DOMPurify from 'dompurify';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { LoadingStatus } from 'store/shared/commonState';
import { formatDate } from 'utils/dateFormatUtil';

interface CommentsSectionProps {
  postId: number;
}

const CommentsSection: FC<CommentsSectionProps> = ({ postId }) => {
  const dispatch = useAppDispatch();
  const { data: comments, status } = useSelector(
    (state: RootState) =>
      state.postComments.commentsByPostId[postId] || {
        data: [],
        status: 'idle',
      }
  );

  useEffect(() => {
    if (postId) {
      dispatch(getCommentsByPostId(postId));
    }
  }, [postId, dispatch]);

  return (
    <div className="mt-4 bg-light-layer dark:bg-dark-layer p-4 rounded-md shadow mx-auto max-w-7xl mb-8">
      <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4 text-right">
        التعليقات
      </h2>
      {status === LoadingStatus.Loading && (
        <div className="text-center">جار التحميل...</div>
      )}
      {status === LoadingStatus.Succeeded && comments.length > 0 ? (
        comments.map((comment, index) => (
          <div
            key={comment.id}
            className={`py-4 px-8 my-2 rounded-lg mx-8 ${
              index % 2 === 0 ? 'bg-gray-50 dark:bg-dark-input' : ''
            }`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <img
                  src={comment.profilePicture || 'default-avatar.png'}
                  alt={comment.username}
                  className="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-600"
                />
              </div>
              <div className="mr-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {comment.username}
                  </h3>
                  <span className="text-xs text-neutral-500">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <div
                  className="mt-2 text-neutral-600 dark:text-neutral-400 text-sm"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(comment.content),
                  }}
                />
              </div>
            </div>
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
