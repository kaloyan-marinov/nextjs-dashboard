import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';

/*
Your search functionality will span the client and the server.
When a user searches for an invoice on the client,
  the URL params will be updated,
  data will be fetched on the server,
  and the table will re-render on the server with the new data.
*/
/*
Page components [accept a prop called searchParams](
  https://nextjs.org/docs/app/api-reference/file-conventions/page
)
*/
export default async function Page(props: {
  searchParams?: Promise<{ query?: string; page?: string; }>
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  
  // You don't want to fetch data on the client
  // as this would expose your database secrets (remember, you're not using an API layer).
  // Instead, you can fetch the data on the server, and pass it to the component as a prop.
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
