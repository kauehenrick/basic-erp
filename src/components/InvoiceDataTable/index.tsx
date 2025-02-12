import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useInvoiceStore } from "@/stores/InvoiceStore";

export default function InvoiceDataTable() {
  const { invoices } = useInvoiceStore();

  return (
    <div className="container mt-4 mx-auto">
      <DataTable columns={columns} data={invoices} />
    </div>
  )
}
