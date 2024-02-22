import React from 'react';

type Props = {};

const NewsReport = (props: Props) => {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg">
      <h2 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">
        معلومات عامة
      </h2>
      <p className="mt-2 text-neutral-500 dark:text-neutral-400">
        قسم لعرض معلومات وأخبار عامة أو معلومات تهم القارئ.
      </p>
    </div>
  );
};

export default NewsReport;
