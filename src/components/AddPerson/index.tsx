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
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { personFormSchema, usePersonStore } from "@/stores/PersonStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import CellphoneInput from "../ui/cellphone-input";
import CEPInput from "../ui/cep-input";
import CNPJInput from "../ui/cnpj-input";
import CPFInput from "../ui/cpf-input";
import FormInput from "../ui/form-input";
import NumberOnlyInput from "../ui/number-input";
import StateCombobox from "../ui/state-select";

export default function AddPerson() {
    const [open, setOpen] = useState(false);
    const [handlePersonType, setHandlePersonType] = useState("juridica");
    const { addPerson } = usePersonStore();

    const form = useForm<z.infer<typeof personFormSchema>>({
        resolver: zodResolver(personFormSchema),
        defaultValues: {
            name: "",
            personRegisterNumber: "",
            personType: "juridica",
            email: "",
            phoneNumber: "",
            stateRegistration: "",
            companyName: "",
            postalCode: "",
            street: "",
            number: "",
            state: "",
            city: "",
            neighborhood: "",
            addressComplement: ""
        },
    })

    function onSubmit(values: z.infer<typeof personFormSchema>) {
        addPerson(values);
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
                        setHandlePersonType("juridica");
                    }}>
                    Adicionar
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[1100px]">
                <DialogHeader>
                    <DialogTitle>Cadastrar Pessoa</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <section className="flex gap-3 bg-white-300 border rounded-md px-3 py-2">
                            <FormField
                                control={form.control}
                                name="personType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo de pessoa</FormLabel>
                                        <Select
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                setHandlePersonType(value);
                                                form.setValue("personRegisterNumber", "");
                                            }}
                                            defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-[150px]">
                                                    <SelectValue placeholder="Selecione o tipo de pessoa" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="juridica">Jurídica</SelectItem>
                                                <SelectItem value="fisica">Física</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription className="hidden" />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {handlePersonType == "juridica"
                                ? <CNPJInput form={form} name="personRegisterNumber" />
                                : <CPFInput form={form} name="personRegisterNumber" />
                            }

                            <FormInput form={form} name="name" label="Nome" />
                        </section>

                        <Accordion type="single" collapsible className="bg-white-300 border rounded-md px-3 py-2">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="font-medium text-md">Informações Gerais</AccordionTrigger>
                                <AccordionContent className="mt-3">
                                    <div className="flex gap-3">
                                        <FormInput form={form} type="email" name="email" label="Email" />

                                        <CellphoneInput form={form} name="phoneNumber" />

                                        <FormInput form={form} name="stateRegistration" label="Inscrição estadual" />

                                        <FormInput form={form} name="companyName" label="Razão social" />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <Accordion type="single" collapsible className="bg-white-300 border rounded-md px-3 py-2">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="font-medium text-md">Endereço</AccordionTrigger>
                                <AccordionContent className="mt-3 space-y-6">
                                    <div className="flex gap-3">
                                        <CEPInput form={form} name="postalCode" />

                                        <FormInput form={form} name="street" label="Endereço" />

                                        <NumberOnlyInput form={form} name="number" label="Número" width="150" />
                                    </div>

                                    <div className="flex gap-3">
                                        <StateCombobox form={form} name="state" />

                                        <FormInput form={form} name="city" label="Cidade" />

                                        <FormInput form={form} name="neighborhood" label="Bairro" />

                                        <FormInput form={form} name="addressComplement" label="Complemento" />
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
    );
}