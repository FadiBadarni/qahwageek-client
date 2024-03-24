import React, { Dispatch, useState } from 'react';
import { formatDate } from 'utils/dateFormatUtil';
import { MdAccessTime, MdReply, MdDelete } from 'react-icons/md';
import { Comment } from 'models/comment';
import DOMPurify from 'dompurify';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { deleteComment } from 'store/comment/commentActions';
import {
  displayConfirmation,
  displayError,
  displayToast,
} from 'utils/alertUtils';

interface PostCommentProps {
  comment: Comment;
  setReplyingTo: Dispatch<React.SetStateAction<number | null>>;
}

const PostComment: React.FC<PostCommentProps> = ({
  comment,
  setReplyingTo,
}) => {
  const dispatch = useAppDispatch();
  const currentUser = useSelector((state: RootState) => state.user.data);
  const currentTheme = useSelector((state: RootState) => state.theme.theme);

  const [isExpanded, setIsExpanded] = useState(false);

  const handleDeleteComment = () => {
    displayConfirmation({
      title: 'هل أنت متأكد؟',
      text: 'لا يمكنك التراجع عن هذا الإجراء!',
      icon: 'warning',
      confirmButtonText: 'نعم، احذفه!',
      cancelButtonText: 'إلغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteComment(comment.id))
          .then(() => {
            displayToast('تم حذف التعليق بنجاح', true, currentTheme);
          })
          .catch((error) => {
            displayError({
              title: 'حدث خطأ',
              text: 'لم يتم حذف التعليق. يرجى المحاولة مرة أخرى لاحقًا.',
              icon: 'error',
            });
          });
      }
    });
  };

  const isCurrentUserComment = comment.userId === currentUser?.id;
  const isReply = Boolean(comment.parentCommentId);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const needsTruncation = comment.content.length > 150;
  const displayedContent =
    isExpanded || !needsTruncation
      ? comment.content
      : `${comment.content.substring(0, 150)}...`;

  return (
    <div className={`my-2 ${isReply ? 'mr-6 mt-4' : ''}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <img
            src={comment.profilePicture || 'default-avatar.png'}
            alt={comment.username}
            className={`${
              isReply ? 'w-10 h-10' : 'w-12 h-12'
            } rounded-full border border-gray-300 dark:border-gray-600`}
          />
        </div>
        <div className="mr-4 w-full">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                {comment.username}
              </h3>
              <div className="flex items-center text-xs text-neutral-500 ">
                <MdAccessTime className="mx-2" />
                {formatDate(comment.createdAt)}
              </div>
            </div>
            {currentUser && (
              <div className="flex gap-2">
                {comment.parentCommentId == null && (
                  <button
                    type="button"
                    onClick={() => setReplyingTo(comment.id)}
                    className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 flex items-center"
                  >
                    رد <MdReply className="mr-1" />
                  </button>
                )}
                {isCurrentUserComment && (
                  <button
                    type="button"
                    onClick={handleDeleteComment}
                    className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 flex items-center ml-2"
                  >
                    حذف <MdDelete className="mr-1" />
                  </button>
                )}
              </div>
            )}
          </div>
          <div
            className="mt-2 text-neutral-600 dark:text-neutral-400 text-sm"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(displayedContent),
            }}
          ></div>
          {needsTruncation && (
            <button
              className="text-sm text-blue-500 hover:underline"
              onClick={toggleExpand}
            >
              {isExpanded ? 'أخفي التعليق' : 'أظهر التعليق'}
            </button>
          )}
        </div>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2">
          {comment.replies.map((reply) => (
            <PostComment
              key={reply.id}
              comment={reply}
              setReplyingTo={setReplyingTo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostComment;
