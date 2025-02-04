import { columns } from "./columns"
import { DataTable } from "./data-table"
import { usePersonStore } from "@/stores/PersonStore";

export default function PersonDataTable() {
  const { people } = usePersonStore();

  const activePeople = people.filter(person => person.isActive);

  return (
    <div className="container mt-4 mx-auto">
      <DataTable columns={columns} data={activePeople} />
    </div>
  )
}
