export const translateRole = (role: string): string => {
  const roleTranslations: Record<string, string> = {
    ROLE_USER: 'مستخدم',
    ROLE_ADMIN: 'مدير',
    ROLE_WRITER: 'كاتب',
    ROLE_EVENTS_MANAGER: 'مدير اللقاءات',
  };

  return roleTranslations[role] || role;
};

export interface RoleOption {
  value: string;
  label: string;
}

export const roleOptions: RoleOption[] = [
  { value: 'ROLE_USER', label: 'مستخدم' },
  { value: 'ROLE_ADMIN', label: 'مدير' },
  { value: 'ROLE_WRITER', label: 'كاتب' },
  { value: 'ROLE_EVENTS_MANAGER', label: 'مدير اللقاءات' },
];
