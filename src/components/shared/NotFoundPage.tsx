import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <section className="bg-light-background dark:bg-dark-background">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold text-brand-500 dark:text-brand-300 lg:text-9xl">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-neutral-600 dark:text-neutral-100 md:text-4xl">
            وينها هاي؟
          </p>
          <p className="mb-4 text-lg text-neutral-500 dark:text-neutral-400">
            يمكن غلطان في العنوان، أو يمكن الجني الأزرق أخذها. عادي، بتصير في
            أحسن العائلات.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center text-white bg-brand-500 hover:bg-brand-400 focus:ring-4 focus:outline-none focus:ring-brand-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-brand-900 my-4"
          >
            يلا نرجع منين أجينا
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
