import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
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
import { productFormSchema, useProductStore } from "@/stores/ProductStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import FormInput from "../ui/form-input";
import MeasureCombobox from "../ui/measure-select";
import NumberOnlyInput from "../ui/number-input";
import ProductTaxCombobox from "../ui/product-tax-select";
import RealInput from "../ui/real-input";

export default function AddProduct() {
    const [open, setOpen] = useState(false);
    const { addProduct } = useProductStore();

    const form = useForm<z.infer<typeof productFormSchema>>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            description: "",
            quantityInStock: 0,
            purchasePrice: 0,
            salePrice: 0,
            measures: "UN",
            NCMcode: "",
            CESTcode: "",
            barcode: "",
            productTax: "CRÉDITO RESTRITO",
        }
    })

    function onSubmit(values: z.infer<typeof productFormSchema>) {
        addProduct(values);
        setOpen(false);
    }

    const hasTaxErrors = Object.keys(form.formState.errors).some(key =>
        ['NCMcode'].includes(key)
    );

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button onClick={() => {
                    form.reset();
                }}>
                    Adicionar
                </Button>
            </DialogTrigger>
            <DialogContent className="w-10/12">
                <DialogHeader>
                    <DialogTitle>Cadastrar Produto</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <section className="flex items-center gap-3 bg-white-300 border rounded-md px-3 py-2">
                            <FormInput form={form} name="description" label="Descrição" />

                            <MeasureCombobox form={form} name="measures" />

                            <RealInput form={form} name={"purchasePrice"} label="Preço compra" width="150" />

                            <RealInput form={form} name={"salePrice"} label="Preço venda" width="150" />
                        </section>

                        <Accordion
                            type="single"
                            collapsible
                            className={
                                `bg-white-300 border rounded-md px-3 py-2 ${hasTaxErrors ? 'border-destructive border' : ''}`
                            }>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="font-medium text-md">Fiscal</AccordionTrigger>
                                <AccordionContent className="mt-3">
                                    <div className="flex gap-3">
                                        <NumberOnlyInput form={form} name="barcode" label="Código de barras" maxLength={14} />

                                        <NumberOnlyInput form={form} name="NCMcode" label="Código NCM" maxLength={8} />

                                        <NumberOnlyInput form={form} name="CESTcode" label="Código CEST" maxLength={7} />

                                        <ProductTaxCombobox form={form} name="productTax" />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <Accordion
                            type="single"
                            collapsible
                            className={
                                `bg-white-300 border rounded-md px-3 py-2`
                            }>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="font-medium text-md">Gestão</AccordionTrigger>
                                <AccordionContent className="mt-3">
                                    <div className="flex gap-3">
                                        <NumberOnlyInput form={form} name="quantityInStock" label="Estoque" />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

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