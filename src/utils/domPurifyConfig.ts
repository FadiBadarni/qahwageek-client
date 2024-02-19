export const createDOMPurifyConfig = () => {
  return {
    ADD_TAGS: [
      'h3',
      'strong',
      'u',
      'img',
      'span',
      'a',
      'pre',
      'ul',
      'li',
    ] as string[],
    ADD_ATTR: [
      'style',
      'href',
      'target',
      'rel',
      'class',
      'spellcheck',
    ] as string[],
  };
};
