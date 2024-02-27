export const searchStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: 'var(--color-light-input)',
    border: 'none',
    boxShadow: state.isFocused ? '0 0 0 1px var(--color-primary)' : 'none',
    padding: '0.375rem 1rem',
    borderRadius: '0.375rem',
    cursor: 'text',
  }),
  input: (provided: any) => ({
    ...provided,
    margin: '0px',
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: 'var(--color-dropdown-bg)',
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
      ? 'var(--color-selected)'
      : state.isFocused
      ? 'var(--color-focused)'
      : 'var(--color-option-bg)',
    color: state.isSelected
      ? 'var(--color-on-selected)'
      : 'var(--color-on-option)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    '&:active': {
      backgroundColor: 'var(--color-active-option)',
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: 'var(--color-placeholder)',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: 'var(--color-text)',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: 'var(--color-text)',
    transition: 'all .2s ease',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
  }),
};
