import rehypeParse from 'rehype-parse';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';

import type { Options as RehypeSanitizeOptions } from 'rehype-sanitize';

export function sanitizeHtml(
  input: string,
  options?: RehypeSanitizeOptions
): string {
  const output = unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeSanitize, options)
    .use(rehypeStringify)
    .processSync(input);

  return String(output);
}

// Handy shortcut for when you just want to strip tags from text
export const stripTags = (
  input: string,
  options?: RehypeSanitizeOptions
): string => sanitizeHtml(input, { ...options, tagNames: [] });
