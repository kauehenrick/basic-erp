import { invoiceProductFormSchema } from "@/components/InvoiceProduct";
import { toast } from "sonner";
import { z } from "zod";
import { create } from "zustand";
import { personFormSchema } from "./PersonStore";

export const invoiceFormSchema = z.object({
    id: z.coerce.number().optional(),
    isActive: z.boolean().optional(),
    invoiceSerial: z.coerce.number().optional(),
    invoiceNumber: z.coerce.number().optional(),
    invoiceType: z.coerce.number(),
    client: personFormSchema.optional().refine((value) => value !== undefined, {
        message: "O campo cliente é obrigatório.",
    }),
    products: z.array(invoiceProductFormSchema).nonempty({
        message: "O campo produtos deve conter pelo menos um item.",
    }),
});

export type InvoiceProps = z.infer<typeof invoiceFormSchema>;

type InvoiceStoreProps = {
    invoices: InvoiceProps[],
    error: null | string | unknown,
    currentInvoiceSerial: number,
    nextInvoiceNumber: number,
    getInvoices: () => void,
    addInvoice: (invoice: Omit<InvoiceProps, "id" | "isActive">) => void,
};

export const useInvoiceStore = create<InvoiceStoreProps>((set) => ({
    invoices: [],
    error: null,
    currentInvoiceSerial: 1,
    nextInvoiceNumber: 1,
    getInvoices: () => { },
    addInvoice: (invoice) => {
        const newInvoice = { ...invoice, isActive: true };
        try {
            set((state) => ({
                invoices: [...state.invoices,
                {
                    ...newInvoice,
                    id: state.invoices.length + 1,
                    invoiceSerial: state.currentInvoiceSerial,
                    invoiceNumber: state.nextInvoiceNumber,
                }],
                nextInvoiceNumber: state.nextInvoiceNumber + 1
            }))
            toast("Nota fiscal emitida!");
        } catch (error) {
            toast("Erro ao emitir nfe!");
        }
    },
}));