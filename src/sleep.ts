/**
 * 异步等待
 *
 * @summary Async wait
 * @since 0.3.0
 * @category Util
 *
 * @param {number} wait - 等待时间，毫秒（ms）
 * @returns Awaitable promise for waiting X time.
 *
 * @example
 *
 * sleep(200);
 * // => 等待 200ms 后执行后续操作
 */

function sleep(wait: number): Promise<unknown> {
    return new Promise(resolve => setTimeout(resolve, wait));
}

export default sleep;
