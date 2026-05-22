/*
mark all the exported functions within the file as Server Actions.
These server functions can then be imported and used in Client and Server components.

Any functions included in this file that are not used
will be automatically removed from the final application bundle.

You can also write Server Actions directly inside Server Components
by adding `"use server"` inside the action.
But ... We recommend having a separate file for your actions.
*/
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import postgres from 'postgres';

const POSTGRES_URL = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

const sql = postgres(POSTGRES_URL);

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit(
    {
        id: true,
        date: true,
    }
)

export async function createInvoice(formData: FormData) {
  /*
  Tip:
  If you're working with forms that have many fields,
  you may want to consider using the [`entries()`](
    https://developer.mozilla.org/en-US/docs/Web/API/FormData/entries
  ) method with JavaScript's [`Object.fromEntries()`](
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
  ).
  */
  const rawFormData = {
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  };

  console.log('rawFormData', rawFormData);
  // The next statement will print `string`.
  // This is because `input` elements with `type="number"` actually return a string, not a number!
  console.log('typeof rawFormData.amount', typeof rawFormData.amount);

  const {
    customerId,
    amount,
    status,
  } = CreateInvoice.parse({
    customerId: rawFormData.customerId,
    amount: rawFormData.amount,
    status: rawFormData.status,
  });
  // The next statement will print `number`.
  console.log('typeof amount', typeof amount);

  // It's usually good practice to store monetary values in cents in your database
  // to eliminate JavaScript floating-point errors and ensure greater accuracy.
  const amountInCents = amount * 100;
  
  const date = new Date();
  const dateStr = date.toISOString().split('T')[0];

  // Right now, we're not handling any errors.
  // We will address that soon.
  await sql`
    INSERT INTO invoices (
      customer_id,
      amount,
      status,
      date
    )
    VALUES (
      ${customerId},
      ${amountInCents},
      ${status},
      ${dateStr}
    )
  `;

  // Clear the specified route segment from the cache of Next.js's client-side router (= from the user's browser),
  // which will trigger a new request to the server (for fresh data).
  revalidatePath('/dashboard/invoices');
}