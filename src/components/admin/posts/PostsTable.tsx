import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Post } from 'models/post';
import { useState } from 'react';

type PostsTableProps = {
  posts: Post[];
  renderActions: (post: Post) => JSX.Element;
};

const PostsTable: React.FC<PostsTableProps> = ({ posts, renderActions }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleIconClick = (post: Post) => {
    setSelectedPost(post);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedPost(null);
  };

  return (
    <>
      <table className="min-w-full divide-y divide-light-border dark:divide-dark-border">
        <thead className="bg-light-layer dark:bg-dark-layer">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-light-text dark:text-dark-text tracking-wider"
            >
              العنوان
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-light-text dark:text-dark-text tracking-wider"
            >
              الكاتب
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-light-text dark:text-dark-text tracking-wider"
            >
              تاريخ النشر
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-light-text dark:text-dark-text tracking-wider"
            >
              الفئات
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-light-text dark:text-dark-text tracking-wider"
            >
              الإجراءات
            </th>
          </tr>
        </thead>
        <tbody className="bg-light-layer dark:bg-dark-layer divide-y divide-light-border dark:divide-dark-border">
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-200 text-right">
                {post.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-200 text-right">
                {post.author}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-200 text-right">
                {format(new Date(post.publishedAt), 'PP، HH:mm', {
                  locale: ar,
                })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-200 text-right">
                {post.categoryDetails.map((detail) => detail.name).join(', ')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-200 text-right">
                {renderActions(post)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PostsTable;
