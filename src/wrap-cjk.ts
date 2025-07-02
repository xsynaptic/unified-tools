import rehypeParse from 'rehype-parse';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import rehypeWrapCjk from 'rehype-wrap-cjk';
import { unified } from 'unified';

export function wrapCjk(input: string) {
  const output = unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeWrapCjk)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .processSync(input);

  return String(output);
}
