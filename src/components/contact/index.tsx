import {
  InboxArrowDownIcon,
  ChatBubbleBottomCenterIcon,
  ChatBubbleBottomCenterTextIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useState } from 'react';
import { sendContactForm } from 'store/user/userActions';

const ContactPage = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(sendContactForm(formData));
  };

  return (
    <section className="bg-white dark:bg-dark-background" dir="rtl">
      <div className="py-8 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-neutral-700 dark:text-neutral-100">
          يلا نحكي!
        </h2>
        <p className="mb-8 font-light text-center text-neutral-500 dark:text-neutral-400 sm:text-xl">
          عندك مشكلة تقنية أو بدك تعطينا رأيك بميزة جديدة؟ أو يمكن بس حابب تسأل
          عن الخطط اللي عنا؟ لا تستحي، ارمي اللي بقلبك.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              إيميلك
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="shadow-sm bg-light-input border border-neutral-300 text-neutral-700 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-2.5 pl-10 pr-10 dark:bg-dark-input dark:border-dark-border dark:placeholder-neutral-400 dark:text-white dark:focus:ring-brand-300 dark:focus:border-brand-300"
                placeholder="someone@example.com"
                required
              />
              <InboxArrowDownIcon className="w-5 h-5 text-brand-500 absolute inset-y-0 right-0 mr-3 my-auto" />
            </div>
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              الموضوع
            </label>
            <div className="relative">
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="shadow-sm bg-light-input border border-neutral-300 text-neutral-700 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-2.5 pl-10 pr-10 dark:bg-dark-input dark:border-dark-border dark:placeholder-neutral-400 dark:text-white dark:focus:ring-brand-300 dark:focus:border-brand-300"
                placeholder="خلينا نعرف كيف نقدر نساعدك"
                required
              />
              <ChatBubbleBottomCenterIcon className="w-5 h-5 text-brand-500 absolute inset-y-0 right-0 mr-3 my-auto" />
            </div>
          </div>
          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-400"
            >
              الرسالة
            </label>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="shadow-sm bg-light-input border border-neutral-300 text-neutral-700 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-2.5 pl-10 pr-10 dark:bg-dark-input dark:border-dark-border dark:placeholder-neutral-400 dark:text-white dark:focus:ring-brand-300 dark:focus:border-brand-300"
                placeholder="رمي اللي بقلبك هون..."
                required
              ></textarea>
              <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-brand-500 absolute inset-y-0 right-0 mr-3 my-auto" />
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="inline-flex items-center justify-center py-3 px-8 text-sm font-medium text-center text-white rounded-lg bg-brand-500 hover:bg-brand-600 focus:ring-4 focus:outline-none focus:ring-brand-300 dark:bg-brand-600 dark:hover:bg-brand-700 dark:focus:ring-brand-800"
            >
              إبعت
              <PaperAirplaneIcon className="w-4 h-4 mr-2 rotate-180" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactPage;
