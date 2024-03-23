import React from 'react';
import {
  ChatBubbleBottomCenterIcon,
  LightBulbIcon,
  ScaleIcon,
  HandRaisedIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-dark-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-4">
          <div className="flex justify-center items-center">
            <HandRaisedIcon
              className="h-8 w-8 text-brand-500 transform rotate-180 ml-4"
              aria-hidden="true"
            />
            <h2 className="inline text-3xl leading-8 font-extrabold tracking-tight text-neutral-700 dark:text-neutral-200 sm:text-4xl">
              سلامات
            </h2>
            <HandRaisedIcon
              className="h-8 w-8 text-brand-500 mr-4"
              aria-hidden="true"
            />
          </div>
          <p className="mt-4 max-w-2xl text-xl text-neutral-500 dark:text-neutral-400 mx-auto">
            ما لقينا محل نقرأ فيو بالعربي عن المواضيع الي بتهمنا وإلي هي التك،
            التقنيات والتطويرات الي عم تصير.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
            <div className="flex">
              <LightBulbIcon className="flex-shrink-0 h-6 w-6 text-brand-500 animate-bounce" />
              <div className="mr-3">
                <dt className="text-lg leading-6 font-medium text-neutral-700 dark:text-neutral-200">
                  نشر محتوى تعليمي وتجارب شخصية
                </dt>
                <dd className="mt-2 text-base text-neutral-500 dark:text-neutral-400">
                  نسعى لتقديم محتوى يركز على البرمجة، إدارة الوقت، وتحقيق
                  التوازن بين جوانب الحياة المختلفة.
                </dd>
              </div>
            </div>

            <div className="flex">
              <ChatBubbleBottomCenterIcon className="flex-shrink-0 h-6 w-6 text-brand-500 animate-bounce" />
              <div className="mr-3">
                <dt className="text-lg leading-6 font-medium text-neutral-700 dark:text-neutral-200">
                  تسليط الضوء على تجارب محلية
                </dt>
                <dd className="mt-2 text-base text-neutral-500 dark:text-neutral-400">
                  نبرز الإنجازات والتجارب العربية في مجال التكنولوجيا، ونشارك
                  أخبار تكنولوجية بشكل مميز.
                </dd>
              </div>
            </div>

            <div className="flex">
              <ScaleIcon className="flex-shrink-0 h-6 w-6 text-brand-500 animate-bounce" />
              <div className="mr-3">
                <dt className="text-lg leading-6 font-medium text-neutral-700 dark:text-neutral-200">
                  منصة للتعبير والمشاركة
                </dt>
                <dd className="mt-2 text-base text-neutral-500 dark:text-neutral-400">
                  منبر عربي يحترم عقول قرائه ويفتح المجال للمشاركة بالأفكار
                  والتجارب القيمة.
                </dd>
              </div>
            </div>
          </dl>
        </div>

        <HeartIcon className="mx-auto mt-8 h-12 w-12 text-brand-500" />

        <p className="text-center text-lg text-neutral-700 dark:text-neutral-200">
          دمتم سالمين
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
