import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ProductCombobox from "../ui/product-select";
import NumberOnlyInput from "../ui/number-input";
import { PiPlusLight } from "react-icons/pi";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { UseFormReturn } from "react-hook-form";

export const invoiceProductFormSchema = z.object({
    id: z.coerce.number(),
    description: z.string(),
    quantity: z.coerce.number(),
    ipiTax: z.coerce.number(),
    icmsTax: z.coerce.number(),
    unitPrice: z.coerce.number(),
    cfop: z.coerce.number(),
    totalPrice: z.coerce.number(),
});

export type InvoiceProductProps = {
    form: UseFormReturn<{
        products: z.infer<typeof invoiceProductFormSchema>[];
    }>;
};

export default function InvoiceProduct() {
    const [products, setProducts] = useState<number[]>([1]);

    const form = useForm<z.infer<typeof invoiceProductFormSchema>>({
        resolver: zodResolver(invoiceProductFormSchema),
        defaultValues: {
            quantity: 1,
        },
    });

    const handleAddProduct = () => {
        setProducts([...products, products.length + 1]);
    };

    return (
        <section className="flex flex-col gap-3 bg-white-300 border rounded-md px-3 py-2">
            <p className="font-medium text-md">Produtos</p>

            <div className="flex max-h-[200px]">
                <ScrollArea className="w-full border rounded-md p-2">
                    {products.map((index) => (
                        <div key={index} className="flex flex-row items-center gap-3 border-b pb-2 [&:not(:first-child)]:pt-1">
                            <p className="mx-1 text-sm mt-6">{index}</p>

                            <div className="flex gap-3 items-center">
                                <ProductCombobox onChange={() => { }} />

                                <NumberOnlyInput form={form} label="Quantidade" name="quantity" />
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </div>

            <div className="flex items-center gap-1 text-blue-500">
                <PiPlusLight size={11} />
                <p className="text-sm cursor-pointer" onClick={handleAddProduct}>
                    Adicionar produto
                </p>
            </div>
        </section>
    );
}
