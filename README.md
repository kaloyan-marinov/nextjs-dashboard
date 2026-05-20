# Introduction

https://nextjs.org/learn/dashboard-app/getting-started

> Unlike tutorials that have you write code from scratch, much of the code for this course is already written for you. This better reflects real-world development, where you'll likely be working with existing codebases.
>
> Our goal is to help you focus on learning the main features of Next.js, without having to write _all_ the application code.



Install the project's dependencies:
```shell
$ pnpm install
```

```shell
$ cp \
  .env.example \
  .env

# Specify values for the environment variables.
```

```shell
$ podman container run \
    --name container-db \
    --volume volume-db:/var/lib/postgresql \
    --env POSTGRES_HOST_AUTH_METHOD=scram-sha-256 \
    --env POSTGRES_INITDB_ARGS=--auth-host=scram-sha-256 \
    --env POSTGRES_USER=$(sed -n 's/^POSTGRES_USER=//p' .env) \
    --env POSTGRES_PASSWORD=$(sed -n 's/^POSTGRES_PASSWORD=//p' .env) \
    --env POSTGRES_DB=$(sed -n 's/^POSTGRES_DB=//p' .env) \
    --publish $(sed -n 's/^POSTGRES_PORT=//p' .env):$(sed -n 's/^POSTGRES_PORT=//p' .env) \
    --detach \
    postgres:18.4
```

```shell
$ podman container logs \
    --follow \
    container-db
```

```shell
$ podman container exec \
    -it \
    container-db \
    /bin/bash

root@<container-ID>:/# cat /var/lib/postgresql/18/docker/pg_hba.conf
# Ensure that every row with `TYPE` different from `local` has a `METHOD` equal to `scram-sha-256`.

# If the following does NOT ask for a password
# or if it accepts an incorrect password,
# troubleshoot how the container was created.
root@<container-ID>:/# psql \
    --host=localhost \
    --user=${POSTGRES_USER} \
    --dbname=${POSTGRES_DB}
Password for user <value-of-POSTGRES_USER>:
psql (18.4 (Debian 18.4-1.pgdg13+1))
Type "help" for help.

db-name=# \pset pager off
Pager usage is off.

db-name=# SELECT extname FROM pg_extension WHERE extname = 'uuid-ossp';
 extname
---------
(0 rows)

db-name=# CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION
db-name=# SELECT extname FROM pg_extension WHERE extname = 'uuid-ossp';
# ...
  extname
-----------
 uuid-ossp
(1 row)
```



Start serving the application from `localhost` (by using a development web server):
```shell
$ pnpm dev
```

Issue a `GET localhost:3000/seed` request.

Issue one more request:
```shell
$ http localhost:3000/query
HTTP/1.1 200 OK
Connection: keep-alive
Date: Mon, 18 May 2026 20:49:00 GMT
Keep-Alive: timeout=5
Transfer-Encoding: chunked
content-type: application/json
vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch

[
    {
        "amount": 666,
        "name": "Evil Rabbit"
    }
]
```



```shell
$ podman volume ls
DRIVER      VOLUME NAME
local       volume-db

$ podman volume rm \
    volume-db
```



# Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.



# Tangentially made remarks, which are actually quite insightful

https://nextjs.org/learn/dashboard-app/getting-started#placeholder-data

When you're building user interfaces, it helps to have some placeholder data. If a database or API is not yet available, you can:

- Use placeholder data in JSON format or as JavaScript objects.

- Use a 3rd party service like [mockAPI](https://mockapi.io/).

---

https://nextjs.org/learn/dashboard-app/getting-started#typescript

we recommend [Prisma](https://www.prisma.io/) or [Drizzle](https://orm.drizzle.team/), which automatically generates types based on your database schema.

---

https://nextjs.org/learn/dashboard-app/optimizing-fonts-images#why-optimize-fonts

Fonts play a significant role in the design of a website, but using custom fonts in your project can affect performance if the font files need to be fetched and loaded.

... With fonts, layout shift happens when the browser initially renders text in a fallback or system font and then swaps it out for a custom font once it has loaded. This swap can cause the text size, spacing, or layout to change, shifting elements around it.

Next.js automatically optimizes fonts in the application when you use the `next/font` module. It downloads font files at build time and hosts them with your other static assets. This means when a user visits your application, there are no additional network requests for fonts which would impact performance.

---

https://nextjs.org/learn/dashboard-app/optimizing-fonts-images#why-optimize-images

Next.js can serve **static assets**, like images, under the top-level `/public` folder. Files inside `/public` can be referenced in your application.

With regular HTML, you would add an image as follows:
```html
<img
  src="/hero.png"
  alt="Screenshots of the dashboard project showing desktop version"
/>
```

However, this means you have to manually:
...

Image Optimization is a large topic in web development that could be considered a specialization in itself. Instead of manually implementing these optimizations, you can use the `next/image` component to automatically optimize your images.

The `<Image>` Component is an extension of the HTML `<img>` tag, and comes with automatic image optimization, such as:
- Preventing layout shift automatically when images are loading.
- Resizing images to avoid shipping large images to devices with a smaller viewport.
- Lazy loading images by default (images load as they enter the viewport).
- Serving images in modern formats, like [WebP](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#webp) and [AVIF](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#avif_image), when the browser supports it.

---

https://nextjs.org/learn/dashboard-app/creating-layouts-and-pages#nested-routing

Next.js uses file-system routing where **folders** are used to create nested routes. Each folder represents a **route segment** that maps to a **URL segment**.

You can create separate UIs for each route using `layout.tsx` and `page.tsx` files.

`page.tsx` is a special Next.js file that exports a React component, and it's required for the route to be accessible.

To create a nested route, you can nest folders inside each other and add `page.tsx` files inside them.

(
https://nextjs.org/learn/dashboard-app/creating-layouts-and-pages#creating-the-dashboard-page

By [requiring] a special name for `page` files, Next.js allows you to colocate UI components, test files, and other related code with your routes. Only the content inside the `page` file will be publicly accessible.
)

---

https://nextjs.org/learn/dashboard-app/creating-layouts-and-pages#creating-the-dashboard-layout

In Next.js, you can use a special `layout.tsx` file to create UI that is shared between multiple pages. [One example of UI that is shared between multiple pages: buttons/links/controls for navigation.]

https://nextjs.org/learn/dashboard-app/creating-layouts-and-pages#creating-the-dashboard-layout

One benefit of using layouts in Next.js is that on navigation, only the page components update while the layout won't re-render. This is called [partial rendering](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#4-partial-rendering) which preserves client-side React state in the layout when transitioning between pages.

`app/layout.tsx` is called a [root layout](https://nextjs.org/docs/app/api-reference/file-conventions/layout#root-layouts) and is required in every Next.js application. Any UI you add to the root layout will be shared across all pages in your application. You can use the root layout to modify your `<html>` and `<body>` tags, and add metadata...

---

https://nextjs.org/docs/app/api-reference/file-conventions/layout#root-layouts

To link between pages, you'd traditionally use the `<a>` HTML element... but ... what happens when you navigate [using `<a>` tags is that] There's a full page refresh on each page navigation!

https://nextjs.org/learn/dashboard-app/navigating-between-pages#the-link-component

In Next.js, you can use the `<Link />` Component to link between pages in your application. `<Link>` allows you to do [client-side navigation](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#how-routing-and-navigation-works) with JavaScript.

> [That makes it possible] to navigate between the pages without seeing a full refresh. Although parts of your application are rendered on the server, there's no full page refresh, making it feel like a native web app.
>
> Why is that?
>
> To improve the navigation experience, Next.js <u>automatically code splits</u> your application by route segments. This is different from a traditional React [SPA](https://nextjs.org/docs/app/building-your-application/upgrading/single-page-applications), where the browser loads all your application code on the initial page load.
>
> Splitting code by routes means that pages become isolated. If a certain page throws an error, the rest of the application will still work. This is also less code for the browser to parse, which makes your application faster.
>
> Furthermore, in production, whenever [`<Link>`](https://nextjs.org/docs/api-reference/next/link) components appear in the browser's viewport, Next.js <u>automatically prefetches</u> the code for the linked route in the background. By the time the user clicks the link, the code for the destination page will already be loaded in the background, and this is what makes the page transition near-instant!

---

https://nextjs.org/learn/dashboard-app/navigating-between-pages#pattern-showing-active-links

A common UI pattern is to show an active link to indicate to the user what page they are currently on. To do this, you need to get the user's current path from the URL. Next.js provides a hook called [`usePathname()`](https://nextjs.org/docs/app/api-reference/functions/use-pathname) that you can use to check the path and implement this pattern.

[Since that is a React hook, any React component that uses it needs to be explicitly marked/declared/implemented as a Client Component.]

---

https://nextjs.org/learn/dashboard-app/fetching-data#choosing-how-to-fetch-data

APIs are an intermediary layer between your application code and database.

When creating your API endpoints, you need to write logic to interact with your database.

Fetching data with Server Components is a relatively new approach and there are a few benefits of using them:

- Server Components support JavaScript Promises, providing a solution for asynchronous tasks like data fetching natively. You can use `async/await` syntax without needing `useEffect`, `useState` or other data fetching libraries.

- Server Components run on the server, so you can keep expensive data fetches and logic on the server, only sending the result to the client.

- Since Server Components run on the server, you can query the database directly without an additional API layer. This saves you from writing and maintaining additional code.

---

https://nextjs.org/learn/dashboard-app/fetching-data#what-are-request-waterfalls

network waterfalls
=
What are request waterfalls?

A "waterfall" refers to a sequence of network requests that depend on the completion of previous requests. In the case of data fetching, each request can only begin once the previous request has returned data.

This pattern is not necessarily bad. There may be cases where you want waterfalls because you want a condition to be satisfied before you make the next request.

---

https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering#what-is-static-rendering

With static rendering, data fetching and rendering happens on the server at build time (when you deploy) or when [revalidating data](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data).

Whenever a user visits your application, the cached result is served. There are a couple of benefits of static rendering:

- Faster Websites

- Reduced Server Load

- SEO

... useful for UI with **no data** or **data that is shared across users**

---

https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering#what-is-dynamic-rendering

With dynamic rendering, content is rendered on the server for each user at **request time** (when the user visits the page). There are a couple of benefits of dynamic rendering:

- Real-Time Data

- User-Specific Content

- Request Time Information

---

https://nextjs.org/learn/dashboard-app/streaming

Streaming is a data transfer technique that allows you to break down a route into smaller "chunks" and progressively stream them from the server to the client as they become ready.

By streaming, you can prevent slow data requests from blocking your whole page. This allows the user to see and interact with parts of the page without waiting for all the data to load ...

Streaming works well with React's component model, as each component can be considered a *chunk*.

There are two ways you implement streaming in Next.js:

1. At the page level, with the `loading.tsx` file (which creates `<Suspense>` for you).
2. At the component level, with `<Suspense>` for more granular control.

---

https://nextjs.org/learn/dashboard-app/streaming#deciding-where-to-place-your-suspense-boundaries

Where you place your Suspense boundaries will depend on a few things:

1. How you want the user to experience the page as it streams.
2. What content you want to prioritize.
3. If the components rely on data fetching.

Don't worry. There isn't a right answer.

- You could stream the **whole page** like we did with `loading.tsx`... but that may lead to a longer loading time if one of the components has a slow data fetch.
- You could stream **every component** individually... but that may lead to UI _popping_ into the screen as it becomes ready.
- You could also create a _staggered_ effect by streaming **page sections**. But you'll need to create wrapper components.

In general, it's good practice to move your data fetches down to the components that need it...

---

https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#why-use-url-search-params

[The pattern of] using URL search params to manage the search state ... may be new [for you] if you're used to doing it with client side state.

There are a couple of benefits of implementing search with URL params:

- **Bookmarkable and shareable URLs**: Since the search parameters are in the URL, users can bookmark the current state of the application, including their search queries and filters, for future reference or sharing.
- **Server-side rendering**: URL parameters can be directly consumed on the server to render the initial state, making it easier to handle server rendering.
- **Analytics and tracking**: Having search queries and filters directly in the URL makes it easier to track user behavior without requiring additional client-side logic.

---

https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#4-updating-the-table

> Example:
> 
> If you search for a term,
> you'll update the URL,
> which will send a new request to the server,
> data will be fetched on the server, and only the invoices that match your query will be returned.

> You might have noticed you used two different ways to extract search params.
>
> - a Client Component [- use] the `useSearchParams()` hook to access the params from the client
>
> - a Server Component that fetches its own data [-] pass the `searchParams` prop from the page to the component
