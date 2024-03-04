import React from 'react';
import { Category } from 'models/post';

interface SubCategoriesProps {
  subCategories: Category[] | undefined;
}

const SubCategoriesDetails: React.FC<SubCategoriesProps> = ({
  subCategories,
}) => {
  if (!subCategories || subCategories.length === 0) {
    return <p className="text-right">لا توجد تصنيفات فرعية.</p>;
  }
  return (
    <ul className="list-disc pl-8 rtl:pl-0 rtl:pr-8 space-y-2 text-right">
      {subCategories.map((sub) => (
        <li
          key={sub.id}
          className="text-sm text-neutral-600 dark:text-neutral-400"
        >
          {sub.name} - {sub.description}
        </li>
      ))}
    </ul>
  );
};

export default SubCategoriesDetails;
