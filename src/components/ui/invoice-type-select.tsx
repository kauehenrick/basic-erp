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
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { invoiceTypes } from "@/lib/invoiceTypes";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { UseFormReturn } from "react-hook-form";

type InvoiceComboboxProps = {
    form: UseFormReturn<any>;
    name: string;
};

export default function InvoiceTypeCombobox(props: InvoiceComboboxProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <FormField
            control={props.form.control}
            name={props.name}
            render={({ field }) => {
                const selectedOption = invoiceTypes.find((invoiceType) => invoiceType.id === field.value);

                return (
                    <FormItem>
                        <p className="font-medium text-sm">Operação fiscal</p>
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
                            <PopoverContent className="w-[220px] p-0">
                                <Command>
                                    <CommandInput placeholder="Selecionar operação..." />
                                    <CommandList>
                                        <CommandEmpty>Nenhuma operação encontrada.</CommandEmpty>
                                        <CommandGroup>
                                            {invoiceTypes.map((invoiceType) => (
                                                <CommandItem
                                                    key={invoiceType.id}
                                                    value={invoiceType.name}
                                                    onSelect={() => {
                                                        field.onChange(invoiceType.id);
                                                        setOpen(false);
                                                    }}
                                                >
                                                    {invoiceType.name}
                                                    {invoiceType.id === field.value && (
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
