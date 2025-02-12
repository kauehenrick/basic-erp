import * as React from "react";
import { UseFormReturn } from "react-hook-form";

import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { productTaxes } from "@/lib/productTax";
import {
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

type ProductTaxComboboxProps = {
    form: UseFormReturn<any>;
    name: string;
};

export default function ProductTaxCombobox(props: ProductTaxComboboxProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <FormField
            control={props.form.control}
            name={props.name}
            render={({ field }) => {
                const selectedOption = productTaxes.find((tax) => tax.name === field.value);

                return (
                    <FormItem>
                        <p className="font-medium text-sm">Perfil Tributário</p>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-[220px] justify-between"
                                >
                                    {selectedOption ? selectedOption.name : "Selecionar..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[250px] p-0">
                                <Command>
                                    <CommandInput placeholder="Pesquisar perfil..." />
                                    <CommandList>
                                        <CommandEmpty>Nenhum perfil encontrado.</CommandEmpty>
                                        <CommandGroup>
                                            {productTaxes.map((tax) => (
                                                <CommandItem
                                                    key={tax.name}
                                                    value={tax.name}
                                                    onSelect={() => {
                                                        field.onChange(tax.name);
                                                        setOpen(false);
                                                    }}
                                                >
                                                    {tax.name}
                                                    {tax.name === field.value && (
                                                        <Check className="ml-auto h-4 w-4 opacity-50" />
                                                    )}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                )
            }}
        />
    )
}
