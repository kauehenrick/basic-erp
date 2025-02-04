import { ColumnDef } from "@tanstack/react-table";
import type { InvoiceProps } from "@/stores/InvoiceStore";
import { invoiceTypes } from "@/lib/invoiceTypes";

export const columns: ColumnDef<InvoiceProps>[] = [
  {
    accessorKey: "invoiceType",
    header: ({ column }) => {
      return (
        <p className="cursor-pointer" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Operação</p>
      )
    },
    cell: ((cell) => {
      return (
        <p>{invoiceTypes.map((invoice) => (
          invoice.id === cell.row.original.invoiceType ? invoice.name : ""
        ))}</p>
      )
    })
  },
  {
    accessorKey: "client",
    header: ({ column }) => {
      return (
        <p className="cursor-pointer" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Cliente</p>
      )
    },
    cell: ((cell) => {
      const client = cell.row.original.client;
      return (
        <p>{client?.name || "Sem cliente"}</p>
      )
    })
  },
]
