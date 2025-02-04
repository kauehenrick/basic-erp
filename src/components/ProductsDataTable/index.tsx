import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useProductStore } from "@/stores/ProductStore";

export default function ProductsDataTable() {
  const { products } = useProductStore();

  const activeProduct = products.filter(product => product.isActive);

  return (
    <div className="container mt-4 mx-auto">
      <DataTable columns={columns} data={activeProduct} />
    </div>
  )
}