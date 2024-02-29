import React from 'react';

interface SocialMediaHandle {
  platform: string;
  handle: string;
}

interface SocialMediaSectionProps {
  socialMediaHandles: SocialMediaHandle[];
  handleSocialMediaChange: (
    index: number
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SocialMediaSection: React.FC<SocialMediaSectionProps> = ({
  socialMediaHandles,
  handleSocialMediaChange,
}) => (
  <>
    {socialMediaHandles.map((handle, index) => (
      <div key={index} className="mt-4">
        <label
          htmlFor={`social-${index}`}
          className="block text-sm font-medium"
        >
          {handle.platform}
        </label>
        <input
          type="text"
          name={`social-${index}`}
          id={`social-${index}`}
          className="mt-1 block w-full rounded-lg border border-neutral-400 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm bg-light-input dark:bg-dark-input text-light-text dark:text-dark-text"
          value={handle.handle}
          onChange={handleSocialMediaChange(index)}
        />
      </div>
    ))}
  </>
);

export default SocialMediaSection;
