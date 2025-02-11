import root from './_internal/root';

/**
 * File to Base64
 *
 * @static
 * @since 0.4.8
 * @category Util
 * @param {File} file The value to process.
 * @returns {string} Returns the number.
 * @example
 *
 * const file = new File();
 * fileToBase64(file);
 * // => "YXNkZnNkZnNkZnNkc2Rmc2RmYWRmc2Rmc2RmZA=="
 *
 */
function fileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    let fileResult;

    if (!root.FileReader) {
      reject(new Error('Environment is not supported'));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      fileResult = reader.result;
      fileResult = fileResult.slice(fileResult.indexOf(',') + 1)
    }
    reader.onerror = (error) => {
      reject(error);
    }
    reader.onloadend = () => {
      resolve(fileResult);
    }
  })
}

export default fileToBase64;
