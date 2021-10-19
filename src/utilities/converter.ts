// eslint-disable-next-line import/prefer-default-export
export function getBase64(file: File): Promise<string> {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise<string>((resolve, reject) => {
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject();
  });
}
