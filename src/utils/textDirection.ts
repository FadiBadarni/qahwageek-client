export function determineTextDirection(
  text: string | undefined
): 'rtl' | 'ltr' {
  if (!text) {
    return 'rtl';
  }
  const rtlChars = /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F]/;
  const direction = rtlChars.test(text.charAt(0)) ? 'rtl' : 'ltr';
  return direction;
}
