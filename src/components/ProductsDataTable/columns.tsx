import { ColumnDef } from "@tanstack/react-table";
import type { ProductProps } from "@/stores/ProductStore";
import { realFormatter } from "@/lib/formatter";
import DisableProduct from "../DisableProduct";
import UpdateProduct from "../UpdateProduct";

export const columns: ColumnDef<ProductProps>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <p className="cursor-pointer" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>ID</p>
      )
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <p className="cursor-pointer" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Descrição</p>
      )
    },
  },
  {
    accessorKey: "quantityInStock",
    header: ({ column }) => {
      return (
        <p className="cursor-pointer" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Estoque</p>
      )
    },
  },
  {
    accessorKey: "measures",
    header: ({ column }) => {
      return (
        <p className="cursor-pointer" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>UN</p>
      )
    },
  },
  {
    accessorKey: "salePrice",
    header: ({ column }) => {
      return (
        <p className="cursor-pointer" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>(R$) Venda</p>
      )
    },
    cell: ({ row, cell }) => {
      const salePrice = String(row.getValue("salePrice"));
      const formatted = realFormatter(salePrice);
      return <div className={cell.row.original.salePrice.toString()}>{formatted}</div>
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ((cell) => {
      return (
        <div className="flex space-x-4">
          <UpdateProduct {...cell.row.original} />
          <DisableProduct product={cell.row.original} />
        </div>
      )
    }),
  }
]