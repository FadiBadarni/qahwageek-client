import React from 'react';

interface BioSectionProps {
  bio: string;
  handleBioChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const BioSection: React.FC<BioSectionProps> = ({ bio, handleBioChange }) => (
  <>
    <label htmlFor="bio" className="block text-sm font-medium">
      السيرة الذاتية
    </label>
    <textarea
      id="bio"
      rows={3}
      className="mt-1 block w-full rounded-lg border border-neutral-400 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm bg-light-input dark:bg-dark-input text-light-text dark:text-dark-text"
      value={bio}
      onChange={handleBioChange}
    ></textarea>
  </>
);

export default BioSection;
