
// convert file size display according to its size
// round it up to the second decimal place
export const convertFileSize = (file: number) => {
  if (file < 1000) return file.toFixed(2) + "byte";
  if (file < 1000000) return (file / 1000).toFixed(2) + "KB";
  if (file < 1000000000) return (file / 1000000).toFixed(2) + "MB";
  if (file < 1000000000000) return (file / 1000000000).toFixed(2) + "GB";           
}; 