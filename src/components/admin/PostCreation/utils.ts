import { NewPost } from 'models/post';
import {
  savePost,
  uploadImageToS3,
  uploadMainImage,
} from 'store/post/postActions';
import { AppDispatch } from 'store/store';

export async function uploadMainImageIfNeeded(
  dispatch: AppDispatch,
  selectedImage: File | null
): Promise<string> {
  if (!selectedImage) return '';

  const filename = `main-image-${Date.now()}.${
    selectedImage.type.split('/')[1]
  }`;
  return await dispatch(
    uploadMainImage({ file: selectedImage, filename })
  ).unwrap();
}

export async function replaceInlineImagesWithS3Urls(
  dispatch: AppDispatch,
  content: string
): Promise<string> {
  const imgTagRegex = /<img ([^>]*src="data:image\/[^;]+;base64,[^"]+"[^>]*)>/g;
  const matches = [...content.matchAll(imgTagRegex)];
  const replacementsPromise = matches.map((match) =>
    uploadAndReplace(dispatch, match)
  );
  const replacements = await Promise.all(replacementsPromise);
  return replacements.reduce((updatedContent, replacement) => {
    return replacement
      ? updatedContent.replace(replacement.old, replacement.new)
      : updatedContent;
  }, content);
}

async function uploadAndReplace(
  dispatch: AppDispatch,
  match: RegExpMatchArray
): Promise<{ old: string; new: string } | null> {
  const [fullMatch, attributesPart] = match;
  const dataURIMatch = attributesPart.match(
    /src="(data:image\/[^;]+;base64,[^"]+)"/
  );
  if (!dataURIMatch) return null;

  const dataURI = dataURIMatch[1];
  const contentType = dataURI.split(';')[0].split(':')[1];
  const fileExtension = contentType.split('/')[1] || 'jpg';
  const filename = `image-${Date.now()}.${fileExtension}`;
  const imageUrl = await dispatch(
    uploadImageToS3({ base64Image: dataURI, filename })
  ).unwrap();
  const newAttributesPart = attributesPart.replace(
    dataURIMatch[0],
    `src="${imageUrl}"`
  );
  return { old: fullMatch, new: `<img ${newAttributesPart} />` };
}

export function createNewPostData(
  title: string,
  content: string,
  mainImageUrl: string,
  categoryIds: number[]
): NewPost {
  return {
    title,
    content,
    mainImageUrl,
    categoryIds,
  };
}

export async function saveNewPost(
  dispatch: AppDispatch,
  newPostData: NewPost
): Promise<void> {
  await dispatch(savePost(newPostData)).unwrap();
}
