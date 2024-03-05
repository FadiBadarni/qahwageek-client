import { StylesConfig } from 'react-select';

interface OptionType {
  value: string | number;
  label: string;
}

export const getCategorySelectStyles = (
  currentTheme: string
): StylesConfig<OptionType, false> => ({
  control: (provided, state) => ({
    ...provided,
    backgroundColor: currentTheme === 'dark' ? '#111827' : '#F3F4F6',
    borderColor: state.isFocused
      ? currentTheme === 'dark'
        ? '#60A5FA'
        : '#2563EB'
      : 'border-neutral-300',
    borderWidth: '1px',
    boxShadow: state.isFocused
      ? `0 0 0 1px ${currentTheme === 'dark' ? '#60A5FA' : '#2563EB'}`
      : 'none',
    padding: '0.375rem 0.75rem',
    borderRadius: '0.375rem',
    cursor: 'text',
    color: currentTheme === 'dark' ? '#F9FAFB' : '#1F2937',
    '&:hover': {
      borderColor: currentTheme === 'dark' ? '#60A5FA' : '#2563EB',
    },
  }),
  input: (provided) => ({
    ...provided,
    margin: '0px',
    color: currentTheme === 'dark' ? '#F9FAFB' : '#1F2937',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: currentTheme === 'dark' ? '#111827' : '#F9FAFB',
    borderRadius: '0.375rem',
    marginTop: '0.125rem',
    textAlign: 'right',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? currentTheme === 'dark'
        ? '#374151'
        : '#E5E7EB'
      : 'transparent',
    color: currentTheme === 'dark' ? '#F9FAFB' : '#1F2937',
    cursor: 'pointer',
    ':active': {
      backgroundColor: currentTheme === 'dark' ? '#2D3748' : '#D1D5DB',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: currentTheme === 'dark' ? '#F9FAFB' : '#1F2937',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: currentTheme === 'dark' ? '#9CA3AF' : '#6B7280',
    textAlign: 'right',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#6B7280',
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 15,
  }),
});
