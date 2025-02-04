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
import { estados } from "@/lib/brazilStates";
import {
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

type StateComboboxProps = {
    form: UseFormReturn<any>;
    name: string;
};

export default function StateCombobox(props: StateComboboxProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <FormField
            control={props.form.control}
            name={props.name}
            render={({ field }) => {
                const selectedOption = estados.find((estado) => estado.sigla === field.value);

                return (
                    <FormItem>
                        <p className="font-medium text-sm">Estado</p>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-[150px] justify-between"
                                >
                                    {selectedOption ? selectedOption.sigla : "Pesquisar..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Pesquisar estado..." />
                                    <CommandList>
                                        <CommandEmpty>Nenhum estado encontrado.</CommandEmpty>
                                        <CommandGroup>
                                            {estados.map((estado) => (
                                                <CommandItem
                                                    key={estado.sigla}
                                                    value={estado.nome}
                                                    onSelect={() => {
                                                        field.onChange(estado.sigla);
                                                        setOpen(false);
                                                    }}
                                                >
                                                    {estado.nome}
                                                    {estado.sigla === field.value && (
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
