import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import type { ProductProps } from "@/stores/ProductStore";
import { useProductStore } from "@/stores/ProductStore";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { PiTrashLight } from "react-icons/pi";
import { Button } from "../ui/button";

export default function DisableProduct({ product }: { product: ProductProps }) {
    const [open, setOpen] = useState(false);
    const { disableProduct } = useProductStore();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <span className="hover:text-red-600 duration-300 cursor-pointer" data-testid="dialog-trigger">
                    <PiTrashLight size="20px" />
                </span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Você tem certeza?</DialogTitle>
                    <DialogDescription>
                        Esse processo irá desativar esse produto! Confirme clicando nos botões abaixo.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild data-testid="close-button">
                        <Button variant="ghost">Não</Button>
                    </DialogClose>
                    <Button onClick={() => {
                        disableProduct(product)
                        setOpen(false)
                    }}>
                        Sim
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}