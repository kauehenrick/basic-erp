import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useReducer } from "react";
import { UseFormReturn } from "react-hook-form";
import { realFormatter } from "@/lib/formatter";

type RealInputProps = {
    form: UseFormReturn<any>;
    name: string;
    label?: string;
    maxLength?: number;
    width?: string;
};

export default function RealInput({
    form,
    name,
    label = "Valor",
    maxLength,
    width = '220'
}: RealInputProps) {
    const watchedValue = form.watch(name) || "";

    const [value, setValue] = useReducer((_: any, next: string) => {
        return realFormatter(next);
    }, watchedValue);

    useEffect(() => {
        setValue(watchedValue);
    }, [watchedValue]);

    function handleChange(realChangeFn: Function, formattedValue: string) {
        const numericValue = formattedValue.replace(/\D/g, "");
        realChangeFn(numericValue);
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
                                maxLength={maxLength}
                                {...field}
                                value={value}
                                onChange={(ev) => {
                                    const newValue = ev.target.value;
                                    setValue(newValue);
                                    handleChange(_change, newValue);
                                }}
                                className={`w-[${width}px]`}
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