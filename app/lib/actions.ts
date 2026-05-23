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
import { redirect } from 'next/navigation';
import postgres from 'postgres';

const POSTGRES_URL = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

const sql = postgres(POSTGRES_URL);

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  // If the string for `amount` is empty, the type coercion will default to zero.
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit(
  {
    id: true,
    date: true,
  }
);

const UpdateInvoice = FormSchema.omit(
  {
    id: true,
    date: true,
  }
);

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  /*
  `prevState` contains the state passed from the `useActionState` hook.
  [It won't be used] in [the current function], but it's a required prop[/input].
  */

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

  // Validate the types with Zod.
  // The returned object will contain either a `success` or `error` field.
  const validatedFields = CreateInvoice.safeParse(rawFormData);
  /*
  // Tip: submit an empty form and see what the next statement prints.
  console.log('validatedFields', validatedFields);  // validatedFields { success: false, error: [Getter] }
  */

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database.
  console.log('validatedFields', validatedFields);  // TODO: (2026/05/23, 21:07 UTC) record the value & put inside a block comment - just as it is done above
  const { 
    customerId,
    amount,
    status
  } = validatedFields.data;
  /*
  // The next statement will print `number`.
  console.log('typeof amount', typeof amount);

  // It's usually good practice to store monetary values in cents in your database
  // to eliminate JavaScript floating-point errors and ensure greater accuracy.
  */
  const amountInCents = amount * 100;
  
  const date = new Date();
  const dateStr = date.toISOString().split('T')[0];

  // Insert a record into the database.
  try {
    await sql`
      INSERT INTO
        invoices
      (
        customer_id,
        amount,
        status,
        date
      )
      VALUES
      (
        ${customerId},
        ${amountInCents},
        ${status},
        ${dateStr}
      )
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.error('error', error);
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Clear the specified route segment from the cache of Next.js's client-side router (= from the user's browser),
  // which will trigger a new request to the server (for fresh data).
  revalidatePath('/dashboard/invoices');
  
  redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, formData: FormData) {
  const rawFormData = {
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  };

  // Validate the types with Zod.
  const {
    customerId,
    amount,
    status,
  } = UpdateInvoice.parse(rawFormData);

  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE
        invoices
      SET
        customer_id=${customerId},
        amount=${amountInCents},
        status=${status}
      WHERE
        id = ${id}
    `;
  } catch (error) {
    // We'll also log the error to the console for now.
    console.error(error);
    return {
      message: 'Database Error: Failed to Update Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');

  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  await sql`
    DELETE FROM
      invoices
    WHERE
      id = ${id}
    ;
  `;

  revalidatePath('/dashboard/invoices');
}