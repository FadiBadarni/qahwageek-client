import React, { Dispatch } from 'react';
import { formatDate } from 'utils/dateFormatUtil';
import { MdAccessTime, MdReply } from 'react-icons/md';
import { Comment } from 'models/comment';
import DOMPurify from 'dompurify';

interface PostCommentProps {
  comment: Comment;
  marginRight?: number;
  setReplyingTo: Dispatch<React.SetStateAction<number | null>>;
}

const PostComment: React.FC<PostCommentProps> = ({
  comment,
  marginRight = 0,
  setReplyingTo,
}) => {
  return (
    <div style={{ marginRight: `${marginRight}px` }} className="my-2">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <img
            src={comment.profilePicture || 'default-avatar.png'}
            alt={comment.username}
            className="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-600"
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
            {comment.parentCommentId == null && (
              <button
                type="button"
                onClick={() => setReplyingTo(comment.id)}
                className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 flex items-center"
              >
                رد <MdReply className="mr-1" />
              </button>
            )}
          </div>
          <div
            className="mt-2 text-neutral-600 dark:text-neutral-400 text-sm"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(comment.content),
            }}
          />
        </div>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2">
          {comment.replies.map((reply) => (
            <PostComment
              key={reply.id}
              comment={reply}
              marginRight={marginRight + 20}
              setReplyingTo={setReplyingTo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostComment;
