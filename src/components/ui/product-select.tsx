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
import { useProductStore } from "@/stores/ProductStore";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

type ProductComboboxProps = {
    value?: any;
    onChange: (value: any) => void;
};

export default function ProductCombobox({ value, onChange }: ProductComboboxProps) {
    const [open, setOpen] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState(value || null);

    const { products } = useProductStore();

    const handleSelect = (product: any) => {
        setSelectedProduct(product);
        onChange(product);
        setOpen(false);
    };

    return (
        <div className="space-y-2">
            <p className="font-medium text-sm">Produto / Código</p>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[220px] justify-between"
                    >
                        {selectedProduct?.description || "Selecionar..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[220px] p-0">
                    <Command>
                        <CommandInput placeholder="Selecionar produto..." />
                        <CommandList>
                            <CommandEmpty>Nenhum produto encontrado.</CommandEmpty>
                            <CommandGroup>
                                {products.map((product) => (
                                    <CommandItem
                                        key={product.description}
                                        value={product.description}
                                        onSelect={() => handleSelect(product)}
                                    >
                                        {product.description}
                                        {selectedProduct?.description === product.description && (
                                            <Check className="ml-auto h-4 w-4 opacity-50" />
                                        )}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
