/**
 * Byte size conversion
 *
 * @summary convertFileSizeToUnit
 * @static
 * @since 0.2.0
 * @category Util
 * @param {number} bytes The value to process.
 * @param {boolean} [binary=false] The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * convertFileSizeToUnit(1000);
 * // => 1.0 kB
 *
 */
function convertFileSizeToUnit(bytes, binary = false) {
  const base = binary ? 1024 : 1000;

  if (bytes < base) {
    return `${bytes} B`;
  }

  const prefix = binary ? ['Ki', 'Mi', 'Gi'] : ['k', 'M', 'G'];
  let unit = -1;

  while (Math.abs(bytes) >= base && unit < prefix.length - 1) {
    bytes /= base;
    ++unit;
  }

  return `${bytes.toFixed(1)} ${prefix[unit]}B`;
}

export default convertFileSizeToUnit;
