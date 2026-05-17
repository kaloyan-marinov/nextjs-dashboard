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
