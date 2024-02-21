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
      'iframe',
    ] as string[],
    ADD_ATTR: [
      'style',
      'href',
      'target',
      'rel',
      'class',
      'spellcheck',
      'src',
      'width',
      'height',
      'allowfullscreen',
      'frameborder',
      'allow',
    ] as string[],
  };
};
