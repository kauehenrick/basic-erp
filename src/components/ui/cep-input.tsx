import { useReducer, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { getCEP } from "@/api/services/CEPService";
import { toast } from "sonner";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cepFormatter } from "@/lib/formatter";
import { PiMagnifyingGlass } from "react-icons/pi";

type CEPInputProps = {
    form: UseFormReturn<any>;
    name: string;
};

export default function CEPInput(props: CEPInputProps) {
    const watchedValue = props.form.watch(props.name) || "";

    const [value, setValue] = useReducer((_: any, next: string) => {
        return cepFormatter(next);
    }, watchedValue);

    useEffect(() => {
        setValue(watchedValue);
    }, [watchedValue]);

    function handleChange(realChangeFn: Function, formattedValue: string) {
        const digits = formattedValue.replace(/\D/g, "");
        realChangeFn(digits);
    }

    const CEPSearch = async (cep: string) => {
        const cleanedCEP = cep.replace(/[^a-zA-Z0-9\s]/g, "");
        try {
            const response = await getCEP(cleanedCEP);
            if (response) {
                props.form.setValue("state", response.state ?? "");
                props.form.setValue("city", response.city ?? "");
                props.form.setValue("neighborhood", response.neighborhood ?? "");
                props.form.setValue("street", response.street ?? "");
            }
        } catch (error) {
            toast("Erro ao buscar dados relacionados ao CEP!");
        }
    };

    return (
        <FormField
            control={props.form.control}
            name={props.name}
            render={({ field }) => {
                const _change = field.onChange;

                return (
                    <FormItem>
                        <FormLabel className="flex items-center justify-between mt-1 mb-2">
                            <p>CEP</p>
                            <div
                                className="flex items-center gap-2 text-blue-500 cursor-pointer"
                                onClick={() => CEPSearch(value)}
                            >
                                <p className="text-xs">Buscar dados</p>
                                <PiMagnifyingGlass />
                            </div>
                        </FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                maxLength={9}
                                {...field}
                                value={value}
                                onChange={(ev) => {
                                    const newValue = ev.target.value;
                                    setValue(newValue);
                                    handleChange(_change, newValue);
                                }}
                                className="w-[150px]"
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
