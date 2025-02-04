import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
} from "@/components/ui/form";
import { invoiceFormSchema, useInvoiceStore } from "@/stores/InvoiceStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import ClientCombobox from "../ui/client-select";
import InvoiceTypeCombobox from "../ui/invoice-type-select";
import InvoiceProduct from "../InvoiceProduct";

export default function AddInvoice() {
    const [open, setOpen] = useState(false);
    const { addInvoice, currentInvoiceSerial, nextInvoiceNumber } = useInvoiceStore();

    const form = useForm<z.infer<typeof invoiceFormSchema>>({
        resolver: zodResolver(invoiceFormSchema),
        defaultValues: {
            invoiceType: 1,
            client: undefined,
            products: [],
        },
    })

    function onSubmit(values: z.infer<typeof invoiceFormSchema>) {
        addInvoice(values);
        setOpen(false);
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button
                    onClick={() => {
                        form.reset();
                    }}>
                    Nova
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[1100px]">
                <DialogHeader className="flex-row space-y-0">
                    <DialogTitle>Emitir NF-e</DialogTitle>
                    <section className="absolute right-16 top-5 flex gap-5">
                        <div className="flex flex-col">
                            <p className="font-light text-sm">Série</p>
                            <p className="self-end">{currentInvoiceSerial}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="font-light text-sm">Número</p>
                            <p className="self-end">{nextInvoiceNumber}</p>
                        </div>
                    </section>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-3">
                        <section className="flex gap-3 bg-white-300 border rounded-md px-3 py-2">
                            <InvoiceTypeCombobox form={form} name="invoiceType" />

                            <ClientCombobox form={form} name="client" />
                        </section>

                        <InvoiceProduct />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="ghost" type="button">Cancelar</Button>
                            </DialogClose>
                            <Button type="submit">Salvar</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}