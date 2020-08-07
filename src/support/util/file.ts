export const dataURLtoFile = (dataUrl: string, fileName: string) => {
  const [first, second] = dataUrl.split(',');
  // @ts-ignore
  const mime = first && first.match(/:(.*?);/)[1];
  const bstr = atob(second);
  let bstrLength = bstr.length;
  const u8arr = new Uint8Array(bstrLength);

  while (bstrLength--) {
    u8arr[bstrLength] = bstr.charCodeAt(bstrLength);
  }

  return new File([u8arr], fileName, { type: mime });
}
