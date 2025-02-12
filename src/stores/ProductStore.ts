import { toast } from "sonner";
import { z } from "zod";
import { create } from "zustand";

export const productFormSchema = z.object({
    id: z.number().optional(),
    isActive: z.boolean().optional(),
    description: z.string().min(2, { message: "Esse campo deve ser preenchido." }),
    quantityInStock: z.coerce.number().optional(),
    purchasePrice: z.coerce.number().optional(),
    salePrice: z.coerce.number().positive({ message: "O preço de venda deve ser maior que zero." }),
    measures: z.string(),
    NCMcode: z.coerce.string().min(8, { message: "O código NCM deve conter 8 dígitos." }),
    CESTcode: z.coerce.string().optional(),
    barcode: z.string().optional(),
    productTax: z.string(),
});

export type ProductProps = z.infer<typeof productFormSchema>;

type ProductStoreProps = {
    products: ProductProps[],
    error: null | string | unknown,
    getProducts: () => void,
    addProduct: (product: Omit<ProductProps, "id" | "isActive">) => void,
    disableProduct: (product: ProductProps) => void,
    updateProduct: (product: Omit<ProductProps, "isActive">) => void,
};

let nextId = 1;

export const useProductStore = create<ProductStoreProps>((set) => ({
    products: [{
        id: 1,
        isActive: true,
        description: "Produto Padrão",
        quantityInStock: 0,
        purchasePrice: 0.0,
        salePrice: 1.0,
        measures: "UN",
        NCMcode: "12345678",
        CESTcode: "",
        barcode: "",
        productTax: "Isento"
    }],
    error: null,
    getProducts: () => { },
    addProduct: (product) => {
        const newProduct = { ...product, id: nextId, isActive: true };
        nextId++;
        try {
            set((state) => ({
                products: [...state.products, newProduct]
            }))
            toast("Produto cadastrado!");
        } catch (error) {
            toast("Erro ao cadastrar produto!");
        }
    },
    disableProduct: (product) => {
        try {
            set((state) => ({
                products: state.products.map((p) => p.id === product.id ? { ...p, isActive: false } : p)
            }));
            toast("Produto desabilitado!");
        } catch (error) {
            toast("Erro ao desabilitar produto!");
        }
    },
    updateProduct: (product) => {
        try {
            set((state) => ({
                products: state.products.map((p) => p.id === product.id ? { ...p, ...product } : p)
            }));
            toast("Produto editado!");
        } catch (error) {
            toast("Erro ao editar produto!");
        }
    },
}));