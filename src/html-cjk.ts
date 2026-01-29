import type { RehypeWrapCjkOptions } from 'rehype-wrap-cjk';

import { hash } from 'ohash';
import rehypeParse from 'rehype-parse';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import { rehypeWrapCjk } from 'rehype-wrap-cjk';
import { unified } from 'unified';

// Cache frozen processors by options hash
const processorCache = new Map<string, unknown>();

// Processor with CJK wrapping
function createProcessorWithCjk(wrapCjkOptions: Partial<RehypeWrapCjkOptions>) {
  return unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeWrapCjk, wrapCjkOptions)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .freeze();
}

// Processor without CJK wrapping
function createProcessorWithoutCjk() {
  return unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .freeze();
}

function getProcessor(wrapCjkOptions?: Partial<RehypeWrapCjkOptions>) {
  const cacheKey = wrapCjkOptions ? hash(wrapCjkOptions) : '';

  let processor = processorCache.get(cacheKey);

  if (!processor) {
    processor = wrapCjkOptions
      ? createProcessorWithCjk(wrapCjkOptions)
      : createProcessorWithoutCjk();
    processorCache.set(cacheKey, processor);
  }

  return processor as ReturnType<typeof createProcessorWithoutCjk>;
}

// Pre-defined options for common language codes
const zhOptions: Partial<RehypeWrapCjkOptions> = { langCode: 'zh' };
const jaOptions: Partial<RehypeWrapCjkOptions> = { langCode: 'ja' };
const koOptions: Partial<RehypeWrapCjkOptions> = { langCode: 'ko' };

export function wrapChinese(input: string): string {
  return getProcessor(zhOptions).processSync(input).toString();
}

export function wrapJapanese(input: string): string {
  return getProcessor(jaOptions).processSync(input).toString();
}

export function wrapKorean(input: string): string {
  return getProcessor(koOptions).processSync(input).toString();
}

export function wrapCjk({
  input,
  wrapCjkOptions,
}: {
  input: string;
  wrapCjkOptions?: Partial<RehypeWrapCjkOptions>;
}): string {
  return getProcessor(wrapCjkOptions).processSync(input).toString();
}
