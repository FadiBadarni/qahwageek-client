import { SocialMediaHandle } from 'models/user';
import React from 'react';
import { FaLinkedin, FaLink, FaGithub } from 'react-icons/fa';

interface UserSocialMediaProps {
  socialMediaHandles: SocialMediaHandle[];
}

const getSocialMediaIcon = (platform: string) => {
  const iconSize = 30;
  switch (platform.toLowerCase()) {
    case 'linkedin':
      return (
        <FaLinkedin size={iconSize} className="mb-1" aria-label="LinkedIn" />
      );
    case 'github':
      return <FaGithub size={iconSize} className="mb-1" aria-label="Github" />;
    default:
      return (
        <FaLink
          size={iconSize}
          className="mb-1"
          aria-label={`رابط ${platform}`}
        />
      );
  }
};
const UserSocialMedia: React.FC<UserSocialMediaProps> = ({
  socialMediaHandles,
}) => {
  if (socialMediaHandles.length === 0) {
    return <div>ليس هناك معلومات للتواصل الاجتماعي</div>;
  }

  return (
    <div className="flex flex-wrap justify-center md:justify-center">
      {socialMediaHandles.map((handle) => (
        <a
          key={handle.platform}
          href={handle.handle}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-col items-center bg-neutral-200 dark:bg-dark-layer hover:bg-light-border dark:hover:bg-dark-border rounded-full px-4 py-2 m-2 text-center transition-colors duration-300 ease-in-out"
          aria-label={`حساب ${handle.platform}`}
          style={{ minWidth: '60px' }}
        >
          {getSocialMediaIcon(handle.platform)}
          <span className="text-xs mt-1 text-neutral-600 dark:text-neutral-200">
            {handle.platform}
          </span>
        </a>
      ))}
    </div>
  );
};

export default UserSocialMedia;
