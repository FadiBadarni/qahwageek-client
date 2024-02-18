export const convertBase64ToBlob = (base64DataURI: string): Blob => {
  // Extract MIME type and actual base64 data from the data URI
  const matches = base64DataURI.match(/^data:(.*?);base64,(.*)$/);
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid base64 data URI');
  }

  const contentType = matches[1]; // Extracted MIME type
  const base64 = matches[2]; // Actual base64 data
  const byteCharacters = atob(base64);
  const byteArrays: Uint8Array[] = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};
