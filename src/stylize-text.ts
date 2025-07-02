import { retext } from 'retext';
import retextSmartypants from 'retext-smartypants';

import type { Options as RetextSmartypantsOptions } from 'retext-smartypants';

export function stylizeText(input: string, options?: RetextSmartypantsOptions) {
  const output = retext().use(retextSmartypants, options).processSync(input);

  return String(output);
}
