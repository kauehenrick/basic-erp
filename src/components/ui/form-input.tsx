import { UseFormReturn } from "react-hook-form";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type FormInputProps = {
    form: UseFormReturn<any>;
    type?: string;
    name: string;
    label: string;
    width?: string;
};

export default function FormInput({
    form,
    type = "text",
    name,
    label,
    width = "220"
}: FormInputProps) {

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => {
                return (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Input
                                type={type}
                                {...field}
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