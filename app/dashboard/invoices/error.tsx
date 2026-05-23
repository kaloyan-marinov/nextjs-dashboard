/*
In Next.js,
an `error.tsx` file can be used to define a UI boundary for a route segment.
It serves as a catch-all for unexpected errors
and allows you to display a fallback UI to your users.
*/
'use client';

export default function Error() {
  return (
    <div>[error]</div>
  );
}
