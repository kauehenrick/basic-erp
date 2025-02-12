import { useReducer, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { cnpjFormatter } from "@/lib/formatter";
import { getCNPJ } from "@/api/services/CNPJService";
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
import { PiMagnifyingGlass } from "react-icons/pi";

type TextInputProps = {
    form: UseFormReturn<any>;
    name: string;
};

export default function CNPJInput(props: TextInputProps) {
    const watchedValue = props.form.watch(props.name) || "";

    const [value, setValue] = useReducer((_: any, next: string) => {
        return cnpjFormatter(next);
    }, watchedValue);

    useEffect(() => {
        setValue(watchedValue);
    }, [watchedValue]);

    function handleChange(realChangeFn: Function, formattedValue: string) {
        const digits = formattedValue.replace(/\D/g, "");
        realChangeFn(digits);
    }

    const CNPJSearch = async (cnpj: string) => {
        const cleanedCNPJ = cnpj.replace(/[^a-zA-Z0-9\s]/g, "");

        try {
            const response = await getCNPJ(cleanedCNPJ);
            if (response) {
                props.form.setValue("name", response.nome_fantasia ?? "");
                props.form.setValue("phoneNumber", response.ddd_telefone_1 ?? "");
                props.form.setValue("number", response.numero ?? "");
                props.form.setValue("email", response.email ?? "");
                props.form.setValue("companyName", response.razao_social ?? "");
                props.form.setValue("postalCode", response.cep ?? "");
                props.form.setValue("state", response.uf ?? "");
                props.form.setValue("city", response.municipio ?? "");
                props.form.setValue("neighborhood", response.bairro ?? "");
                props.form.setValue("street", response.logradouro ?? "");
                props.form.setValue("addressComplement", response.complemento ?? "");
            }
        } catch (error) {
            toast("Erro ao buscar dados relacionados ao CNPJ!");
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
                        <FormLabel className="flex items-center justify-between mt-1 mb-3">
                            <p>CNPJ</p>
                            <div className="flex items-center gap-2 text-blue-500 cursor-pointer" onClick={() => CNPJSearch(value)}>
                                <p className="text-xs">Buscar dados</p>
                                <PiMagnifyingGlass />
                            </div>
                        </FormLabel>
                        <FormControl>
                            <Input
                                placeholder=""
                                type="text"
                                maxLength={18}
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
