import React from 'react';
import { FaWhatsapp, FaLinkedin } from 'react-icons/fa';

interface ShareContainerProps {
  url: string;
  title: string;
}

const ShareContainer: React.FC<ShareContainerProps> = ({ url, title }) => {
  const encodeShareMessage = (platform: string) => {
    switch (platform) {
      case 'whatsapp':
        return `https://api.whatsapp.com/send?text=${encodeURIComponent(
          title + ' ' + url
        )}`;
      case 'linkedin':
        return `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          url
        )}&title=${encodeURIComponent(title)}`;
      default:
        return '';
    }
  };

  return (
    <div className="flex justify-center gap-4 p-4">
      <a
        href={encodeShareMessage('whatsapp')}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-600 hover:text-green-700"
        title="مشاركة عبر واتساب"
      >
        <FaWhatsapp className="text-3xl hover:scale-110 transition-transform duration-300" />
      </a>
      <a
        href={encodeShareMessage('linkedin')}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-700"
        title="مشاركة عبر لينكدإن"
      >
        <FaLinkedin className="text-3xl hover:scale-110 transition-transform duration-300" />
      </a>
    </div>
  );
};

export default ShareContainer;
