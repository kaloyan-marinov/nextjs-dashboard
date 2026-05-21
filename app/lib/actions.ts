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

  console.log(rawFormData);
}