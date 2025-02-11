/**
 * @vitest-environment node
 */
// Imports
import { describe, expect, it } from 'vitest';

// Utils

// Example
/**
 * buffer 转 ArrayBuffer
 * @param buffer
 */
function bufferToArrayBuffer(buffer: Buffer) {
  const arrayBuffer = new ArrayBuffer(buffer.length);
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < buffer.length; i++) {
    view[i] = buffer[i];
  }
  return arrayBuffer;
}