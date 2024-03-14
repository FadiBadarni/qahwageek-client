export const translateRole = (role: string): string => {
  const roleTranslations: Record<string, string> = {
    ROLE_USER: 'مستخدم',
    ROLE_ADMIN: 'مدير',
    ROLE_WRITER: 'كاتب',
    ROLE_MEETUP_MANAGER: 'مدير اللقاءات',
  };

  return roleTranslations[role] || role;
};
