import { useReducer, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { numberOnlyFormatter } from "@/lib/formatter";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type NumberOnlyInputProps = {
    form: UseFormReturn<any>;
    name: string;
    label: string;
    width?: string;
    maxLength?: number;
};

export default function NumberOnlyInput({
    form,
    name,
    label,
    width = "220",
    maxLength,
}: NumberOnlyInputProps) {
    const watchedValue = form.watch(name) || "";

    const [value, setValue] = useReducer((_: any, next: string) => {
        return numberOnlyFormatter(next);
    }, watchedValue);

    useEffect(() => {
        setValue(watchedValue);
    }, [watchedValue]);

    function handleChange(realChangeFn: Function, formattedValue: string) {
        const digits = formattedValue.replace(/\D/g, "");
        realChangeFn(digits);
    }

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => {
                const _change = field.onChange;

                return (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                {...field}
                                value={value}
                                onChange={(ev) => {
                                    const newValue = ev.target.value;
                                    setValue(newValue);
                                    handleChange(_change, newValue);
                                }}
                                className={`w-[${width}px]`}
                                maxLength={maxLength}
                            />
                        </FormControl>
                        <FormDescription className="hidden" />
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
}