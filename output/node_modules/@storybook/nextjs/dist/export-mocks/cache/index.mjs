import '../../chunk-42AJV46F.mjs';
import { fn } from '@storybook/test';
import { unstable_cache } from 'next/dist/server/web/spec-extension/unstable-cache';
export { unstable_cache } from 'next/dist/server/web/spec-extension/unstable-cache';
import { unstable_noStore } from 'next/dist/server/web/spec-extension/unstable-no-store';
export { unstable_noStore } from 'next/dist/server/web/spec-extension/unstable-no-store';

var revalidatePath=fn().mockName("next/cache::revalidatePath"),revalidateTag=fn().mockName("next/cache::revalidateTag"),cacheExports={unstable_cache,revalidateTag,revalidatePath,unstable_noStore},cache_default=cacheExports;

export { cache_default as default, revalidatePath, revalidateTag };
