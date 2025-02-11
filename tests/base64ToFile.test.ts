/**
 * @vitest-environment node
 */
// Imports
import { describe, expect, it } from 'vitest';

// Utils

// Example

/**
 * base64图片转file的方法（base64图片, 设置生成file的文件名）
 * @param {*} base64
 * @param {*} fileName
 * @returns
 */
function base64ToFile(base64, fileName) {
  let data = base64.split(',');
  let type = data[0].match(/:(.*?);/)[1];
  let suffix = type.split('/')[1];
  const bstr = window.atob(data[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  // 利用构造函数创建File文件对象
  const file = new File([u8arr], `${fileName}.${suffix}`, {
    type: type
  });
  return file;
}