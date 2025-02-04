import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ProductsDataTable from "@/components/ProductsDataTable";
import AddProduct from "@/components/AddProduct";
import { Button } from "@/components/ui/button";

export default function Products() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex flex-col w-full">
        <Header pageName="Produtos" />

        <main className="w-full px-6">
          <div className="mt-4 space-x-2">
            <AddProduct />
            <Button>Exportar</Button>
          </div>

          <ProductsDataTable />
        </main>
      </div>
    </div>
  )
}