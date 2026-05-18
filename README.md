# Introduction

https://nextjs.org/learn/dashboard-app/getting-started

> Unlike tutorials that have you write code from scratch, much of the code for this course is already written for you. This better reflects real-world development, where you'll likely be working with existing codebases.
>
> Our goal is to help you focus on learning the main features of Next.js, without having to write _all_ the application code.



Install the project's dependencies:
```shell
$ pnpm install
```

Start serving the application on (by using a development web server):
```shell
$ pnpm dev
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
