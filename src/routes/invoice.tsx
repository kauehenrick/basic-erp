import AddInvoice from "@/components/AddInvoice";
import Header from "@/components/Header";
import InvoiceDataTable from "@/components/InvoiceDataTable";
import Sidebar from "@/components/Sidebar";

export default function Invoice() {
    return (
        <div className="flex">
            <Sidebar />

            <div className="flex flex-col w-full">
                <Header pageName="Emitir NF-e" />

                <main className="w-full px-6">
                    <div className="mt-4 space-x-2">
                        <AddInvoice />
                    </div>
                    <InvoiceDataTable />
                </main>
            </div>
        </div>
    );
}