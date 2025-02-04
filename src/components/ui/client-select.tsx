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
import { usePersonStore } from "@/stores/PersonStore";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { UseFormReturn } from "react-hook-form";

type StateComboboxProps = {
    form: UseFormReturn<any>;
    name: string;
};

export default function ClientCombobox(props: StateComboboxProps) {
    const [open, setOpen] = React.useState(false);

    const { people } = usePersonStore();

    return (
        <FormField
            control={props.form.control}
            name={props.name}
            render={({ field }) => {
                const selectedOption = field.value;

                return (
                    <FormItem>
                        <p className="font-medium text-sm">Cliente</p>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-[220px] justify-between"
                                >
                                    {selectedOption?.name || "Selecionar..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[220px] p-0">
                                <Command>
                                    <CommandInput placeholder="Selecionar cliente..." />
                                    <CommandList>
                                        <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
                                        <CommandGroup>
                                            {people.map((person) => (
                                                <CommandItem
                                                    key={person.name}
                                                    value={person.name}
                                                    onSelect={() => {
                                                        field.onChange(person);
                                                        setOpen(false);
                                                    }}
                                                >
                                                    {person.name}
                                                    {person.name === field.value && (
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
