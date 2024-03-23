import {
  AtSymbolIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';

const RegistrationGuidelines: React.FC = () => {
  return (
    <div className="space-y-4 p-4 bg-light-layer dark:bg-dark-layer rounded-lg shadow">
      <h3 className="text-lg font-semibold text-light-text dark:text-dark-text text-center">
        إرشادات التسجيل
      </h3>
      <ul className="list-disc space-y-2 pr-5 text-sm text-neutral-700 dark:text-neutral-200">
        <li className="flex items-start">
          <AtSymbolIcon className="w-5 h-5 ml-2 flex-shrink-0 text-neutral-400" />
          يجب أن يكون اسم المستخدم فريدًا ولا يحتوي على مسافات، أو رموز خاصة مثل
          @$!%*?&.
        </li>
        <li className="flex items-start">
          <EnvelopeIcon className="w-5 h-5 ml-2 flex-shrink-0 text-neutral-400" />
          استخدم بريدًا إلكترونيًا صالحًا لضمان استلام الإشعارات والتحديثات.
        </li>
        <li className="flex items-start">
          <LockClosedIcon className="w-5 h-5 ml-2 flex-shrink-0 text-neutral-400" />
          كلمة المرور يجب أن تكون 6 أحرف على الأقل ويُفضل استخدام تركيبة من
          الأحرف الكبيرة والصغيرة، الأرقام، والرموز لزيادة الأمان.
        </li>
      </ul>
    </div>
  );
};

export default RegistrationGuidelines;
