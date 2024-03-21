import {
  ArrowLeftIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import React from 'react';

const AddEventGuidelines: React.FC = () => {
  return (
    <>
      <div className="flex items-center mb-4">
        <ExclamationCircleIcon className="h-6 w-6 text-brand-500 ml-2" />
        <h3 className="font-semibold text-lg">معلومات هامة</h3>
      </div>
      <div className="space-y-4">
        <div className="flex">
          <ArrowLeftIcon className="h-5 w-5 text-brand-400 ml-2" />
          <p>
            جميع المعلومات التي تقوم بإدخالها ستخضع للمراجعة من قبل مديري
            الأحداث قبل نشرها على الموقع.
          </p>
        </div>
        <div className="flex">
          <ArrowLeftIcon className="h-5 w-5 text-brand-400 ml-2" />
          <p>
            يرجى التأكد من صحة المعلومات المقدمة لتجنب أي تأخير في عملية
            الموافقة على الفعالية.
          </p>
        </div>
      </div>
    </>
  );
};

export default AddEventGuidelines;
