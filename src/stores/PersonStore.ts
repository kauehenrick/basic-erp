import { toast } from "sonner";
import { z } from "zod";
import { create } from "zustand";

export const personFormSchema = z.object({
    id: z.coerce.number().optional(),
    isActive: z.boolean().optional(),
    name: z.string().min(2, { message: "Esse campo deve ser preenchido." }),
    personRegisterNumber: z.string().min(11, { message: "Esse campo deve ser preenchido." }),
    personType: z.string(),
    phoneNumber: z.string().optional(),
    email: z.string().optional(),
    stateRegistration: z.string().max(14, { message: "Esse campo deve conter no máximo 14 caracteres." }).optional(),
    companyName: z.string().max(60, { message: "Tamanho máximo de 60 caracteres." }).optional(),
    street: z.string().max(60, { message: "Esse campo deve conter no máximo 60 caracteres." }).optional(),
    addressComplement: z.string().max(30, { message: "Esse campo deve conter no máximo 30 caracteres." }).optional(),
    number: z.string().max(10, { message: "Esse campo deve conter no máximo 10 caracteres." }).optional(),
    neighborhood: z.string().max(60, { message: "Esse campo deve conter no máximo 60 caracteres." }).optional(),
    state: z.string().optional(),
    city: z.string().max(60, { message: "Esse campo deve conter no máximo 60 caracteres." }).optional(),
    postalCode: z.string().optional()
})

export type PersonProps = z.infer<typeof personFormSchema>;

type PersonStoreProps = {
    people: PersonProps[],
    error: null | string | unknown,
    getPeople: () => void,
    addPerson: (person: Omit<PersonProps, "id" | "isActive">) => void,
    disablePerson: (person: PersonProps) => void,
    updatePerson: (person: Omit<PersonProps, "isActive">) => void,
};

let nextId = 1;

export const usePersonStore = create<PersonStoreProps>((set) => ({
    people: [{
        id: 1,
        isActive: true,
        name: "Cliente Padrão",
        personRegisterNumber: "12345678901",
        personType: "fisica",
        phoneNumber: "11999999999",
        email: "cliente.padrao@email.com",
        stateRegistration: "",
        companyName: "",
        street: "Rua Exemplo",
        addressComplement: "",
        number: "123",
        neighborhood: "Bairro Padrão",
        state: "SP",
        city: "São Paulo",
        postalCode: "01001000"
    }],
    error: null,
    getPeople: () => { },
    addPerson: (person) => {
        const newPerson = { ...person, id: nextId, isActive: true };
        nextId++;
        try {
            set((state) => ({
                people: [...state.people, newPerson]
            }));
            toast("Pessoa cadastrada!");
        } catch (error) {
            toast("Erro ao cadastrar pessoa!");
        }
    },
    disablePerson: (person) => {
        try {
            set((state) => ({
                people: state.people.map((p) => p.id === person.id ? { ...p, isActive: false } : p)
            }))
            toast("Pessoa desabilitada!");
        } catch (error) {
            toast("Erro ao desabilitar pessoa!");
        }
    },
    updatePerson: (person) => {
        try {
            set((state) => ({
                people: state.people.map((p) => p.id === person.id ? { ...p, ...person } : p)
            }))
            toast("Pessoa editada!");
        } catch (error) {
            toast("Erro ao editar pessoa!");
        }
    },
}))