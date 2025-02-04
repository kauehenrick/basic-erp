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
import { measures } from "@/lib/measures";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { UseFormReturn } from "react-hook-form";

type MeasureComboboxProps = {
    form: UseFormReturn<any>;
    name: string;
};

export default function MeasureCombobox(props: MeasureComboboxProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <FormField
            control={props.form.control}
            name={props.name}
            render={({ field }) => {
                const selectedOption = measures.find((measure) => measure.abbreviation === field.value);

                return (
                    <FormItem>
                        <p className="font-medium text-sm">Unidade</p>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-[150px] justify-between"
                                >
                                    {selectedOption ? selectedOption.abbreviation : "Pesquisar..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Pesquisar unidade..." />
                                    <CommandList>
                                        <CommandEmpty>Nenhuma unidade encontrada.</CommandEmpty>
                                        <CommandGroup>
                                            {measures.map((measure) => (
                                                <CommandItem
                                                    key={measure.abbreviation}
                                                    value={`${measure.name} ${measure.abbreviation}`}
                                                    onSelect={() => {
                                                        field.onChange(measure.abbreviation);
                                                        setOpen(false);
                                                    }}
                                                >
                                                    {measure.name} ({measure.abbreviation})
                                                    {measure.abbreviation === field.value && (
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