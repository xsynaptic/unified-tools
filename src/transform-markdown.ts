import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import rehypeWrapCjk from 'rehype-wrap-cjk';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkSmartyPants from 'remark-smartypants';
import { unified } from 'unified';

export function transformMarkdown(input: string): string {
  const output = unified()
    .use(remarkParse)
    .use(remarkSmartyPants)
    .use(remarkRehype)
    .use(rehypeWrapCjk)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .processSync(input);

  return String(output);
}
