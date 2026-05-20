'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  // Access the parameters of the current URL.
  const searchParams = useSearchParams();
  //console.log('searchParams', searchParams);
  // Obtain the current URL's pathname.
  const pathname = usePathname();
  // Enables navigation between routes within client components programmatically.
  // (which also makes for smoother, client-side transitions).
  const router = useRouter();

  // Cause the arrow function, which is passed in as the first parameter,
  // to run _only 300ms after_ the user has stopped typing.
  const handleSearch = useDebouncedCallback((term: string) => {
    // Update the URL without reloading the page,
    // thanks to Next.js's client-side navigation.
    const params = new URLSearchParams(searchParams);

    params.set('page', '1');

    console.log('term', term);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    // Update the URL with the user's search `query`.
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
