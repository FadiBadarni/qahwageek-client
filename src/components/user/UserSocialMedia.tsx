import { SocialMediaHandle } from 'models/user';
import React from 'react';
import { FaLinkedin, FaTwitter, FaLink } from 'react-icons/fa';

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
    case 'twitter':
      return (
        <FaTwitter size={iconSize} className="mb-1" aria-label="Twitter" />
      );
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
    <div className="mb-4 flex flex-wrap">
      {socialMediaHandles.map((handle) => (
        <a
          key={handle.platform}
          href={handle.handle}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-col items-center bg-neutral-200 dark:bg-dark-layer rounded-full px-4 py-2 ml-2 mb-2 text-center"
          aria-label={`حساب ${handle.platform}`}
        >
          {getSocialMediaIcon(handle.platform)}
          <span className="text-xs">{handle.platform}</span>
        </a>
      ))}
    </div>
  );
};

export default UserSocialMedia;
