import { M as Mock$1 } from '../../index.d-5a935e77.js';
import { Mock } from '@storybook/test';
import * as actual from 'next/dist/client/components/navigation';
export * from 'next/dist/client/components/navigation';

/**
 * Creates a next/navigation router API mock. Used internally.
 *
 * @ignore
 * @internal
 */
declare const createNavigation: (overrides: any) => {
    push: Mock;
    replace: Mock;
    forward: Mock;
    back: Mock;
    prefetch: Mock;
    refresh: Mock;
};
declare const getRouter: () => {
    push: Mock;
    replace: Mock;
    forward: Mock;
    back: Mock;
    prefetch: Mock;
    refresh: Mock;
};

declare const redirect: Mock$1<(url: string, type?: actual.RedirectType) => never>;
declare const permanentRedirect: Mock$1<(url: string, type?: actual.RedirectType) => never>;
declare const useSearchParams: Mock$1<typeof actual.useSearchParams>;
declare const usePathname: Mock$1<typeof actual.usePathname>;
declare const useSelectedLayoutSegment: Mock$1<typeof actual.useSelectedLayoutSegment>;
declare const useSelectedLayoutSegments: Mock$1<typeof actual.useSelectedLayoutSegments>;
declare const useRouter: Mock$1<typeof actual.useRouter>;
declare const useServerInsertedHTML: Mock$1<typeof actual.useServerInsertedHTML>;
declare const notFound: Mock$1<typeof actual.notFound>;
interface Params {
    [key: string]: string | string[];
}
declare const useParams: Mock$1<() => Params>;

export { createNavigation, getRouter, notFound, permanentRedirect, redirect, useParams, usePathname, useRouter, useSearchParams, useSelectedLayoutSegment, useSelectedLayoutSegments, useServerInsertedHTML };
