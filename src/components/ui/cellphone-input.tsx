import { useReducer, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { cellphoneFormatter } from "@/lib/formatter";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type CellphoneInputProps = {
    form: UseFormReturn<any>;
    name: string;
};

export default function CellphoneInput(props: CellphoneInputProps) {
    const watchedValue = props.form.watch(props.name) || "";

    const [value, setValue] = useReducer((_: any, next: string) => {
        return cellphoneFormatter(next);
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
            control={props.form.control}
            name={props.name}
            render={({ field }) => {
                const _change = field.onChange;

                return (
                    <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                maxLength={15}
                                {...field}
                                value={value}
                                onChange={(ev) => {
                                    const newValue = ev.target.value;
                                    setValue(newValue);
                                    handleChange(_change, newValue);
                                }}
                                className="w-[220px]"
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
