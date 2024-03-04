export const getSearchStyles = (currentTheme: string) => ({
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: currentTheme === 'dark' ? '#111827' : '#F3F4F6',
    border: 'none',
    boxShadow: state.isFocused
      ? `0 0 0 1px ${currentTheme === 'dark' ? '#60A5FA' : '#2563EB'}`
      : 'none',
    padding: '0.375rem 1rem',
    borderRadius: '0.375rem',
    cursor: 'text',
  }),
  input: (provided: any) => ({
    ...provided,
    margin: '0px',
    color: currentTheme === 'dark' ? '#F9FAFB' : '#1F2937',
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: currentTheme === 'dark' ? '#111827' : '#F9FAFB',
    borderRadius: '0.375rem',
    marginTop: '0.125rem',
    boxShadow:
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  }),
  menuList: (provided: any) => ({
    ...provided,
    padding: '0',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? currentTheme === 'dark'
        ? '#374151'
        : '#D1D5DB'
      : state.isFocused
      ? currentTheme === 'dark'
        ? '#4B5563'
        : '#E5E7EB'
      : 'transparent',
    color: currentTheme === 'dark' ? '#F9FAFB' : '#1F2937',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    '&:active': {
      backgroundColor: currentTheme === 'dark' ? '#374151' : '#D1D5DB',
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#9CA3AF',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: currentTheme === 'dark' ? '#F9FAFB' : '#1F2937',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: '#6B7280',
    transition: 'all .2s ease',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
  }),
});
