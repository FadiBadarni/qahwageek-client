import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { Dispatch, useState } from 'react';
import { MdSend } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { createComment } from 'store/comment/commentActions';
import { RootState } from 'store/store';

interface ReplyInputProps {
  postId: number;
  commentId: number;
  setReplyingTo: Dispatch<React.SetStateAction<number | null>>;
}

const ReplyInput: React.FC<ReplyInputProps> = ({
  postId,
  commentId,
  setReplyingTo,
}) => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.data);
  const [replyText, setReplyText] = useState('');

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      dispatch(
        createComment({
          postId,
          content: replyText,
          parentCommentId: commentId,
        })
      );
      setReplyText('');
      setReplyingTo(null); // Close the reply input
    }
  };

  return (
    <div className="mt-4 w-full flex pr-6">
      <div className="flex-shrink-0">
        <img
          src={user?.profilePicture || 'default-avatar.png'}
          alt="Replying User"
          className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 ml-3"
        />
      </div>
      <div className="flex-grow">
        <textarea
          className="bg-light-layer dark:bg-dark-layer w-full p-2 text-sm text-neutral-800 dark:text-neutral-200 rounded-md border border-gray-300 dark:border-gray-700 resize-none focus:outline-none focus:ring focus:border-blue-300"
          placeholder="كتابة رد..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          maxLength={500}
        />
        <div className="flex justify-end space-x-2 px-2 py-1 mt-1 space-x-reverse">
          <button
            type="button"
            onClick={() => setReplyingTo(null)}
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 text-black dark:text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline flex items-center justify-center text-xs"
          >
            إلغاء
          </button>
          <button
            type="button"
            onClick={handleReplySubmit}
            className="bg-brand-500 hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline flex items-center justify-center text-xs"
          >
            إرسال <MdSend className="mr-1 h-4 w-4 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyInput;
