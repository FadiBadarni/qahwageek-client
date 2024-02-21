import React from 'react';

type Props = {};

const CodePosts = (props: Props) => {
  return (
    <div className="bg-neutral-700 dark:bg-dark-800  py-4 sm:py-6  transition duration-300 ease-in-out">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
          اسبرسو كود
        </h2>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl leading-8 text-neutral-300 dark:text-neutral-200">
          هنا يمكنك العثور على مقالات تساعدك في حل المشاكل البرمجية وتطوير
          مهاراتك في البرمجة. سواء كنت مبتدئًا أو محترفًا، ستجد هنا كل ما تحتاجه
          لتحقيق أقصى استفادة من عملك البرمجي.
        </p>
      </div>
    </div>
  );
};

export default CodePosts;
