import { M as Mock } from '../../index.d-5a935e77.js';
import { unstable_cache } from 'next/dist/server/web/spec-extension/unstable-cache';
export { unstable_cache } from 'next/dist/server/web/spec-extension/unstable-cache';
import { unstable_noStore } from 'next/dist/server/web/spec-extension/unstable-no-store';
export { unstable_noStore } from 'next/dist/server/web/spec-extension/unstable-no-store';

declare const revalidatePath: Mock<(...args: any[]) => any>;
declare const revalidateTag: Mock<(...args: any[]) => any>;
declare const cacheExports: {
    unstable_cache: typeof unstable_cache;
    revalidateTag: Mock<(...args: any[]) => any>;
    revalidatePath: Mock<(...args: any[]) => any>;
    unstable_noStore: typeof unstable_noStore;
};

export { cacheExports as default, revalidatePath, revalidateTag };
