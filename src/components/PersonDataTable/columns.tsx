import { ColumnDef } from "@tanstack/react-table";
import type { PersonProps } from "@/stores/PersonStore";
import { cellphoneFormatter, cnpjFormatter, cpfFormatter } from "@/lib/formatter";
import DisableButton from "../DisablePerson";
import UpdatePerson from "../UpdatePerson";

export const columns: ColumnDef<PersonProps>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <p className="cursor-pointer" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>ID</p>
      )
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <p className="cursor-pointer" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Nome</p>
      )
    },
  },
  {
    accessorKey: "personRegisterNumber",
    header: ({ column }) => {
      return (
        <p className="cursor-pointer" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>CNPJ/CPF</p>
      )
    },
    cell: ({ row, cell }) => {
      const personRegisterNumber = String(row.getValue("personRegisterNumber"));
      const personRegisterNumberLength = personRegisterNumber.length;
      const formatted = personRegisterNumberLength <= 11 ? cpfFormatter(personRegisterNumber) : cnpjFormatter(personRegisterNumber);
      return <div className={cell.row.original.personRegisterNumber}>{formatted}</div>
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <p className="cursor-pointer" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Email</p>
      )
    },
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => {
      return (
        <p className="cursor-pointer" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Telefone</p>
      )
    },
    cell: ({ row, cell }) => {
      const phoneNumber = String(row.getValue("phoneNumber"));
      const formatted = cellphoneFormatter(phoneNumber);
      return <div className={cell.row.original.personRegisterNumber}>{formatted}</div>
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ((cell) => {
      return (
        <div className="flex space-x-4">
          <UpdatePerson {...cell.row.original} />
          <DisableButton person={cell.row.original} />
        </div>
      )
    }),
  }
]
