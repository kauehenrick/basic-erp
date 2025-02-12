import { useState } from "react";
import { usePersonStore } from "@/stores/PersonStore";
import type { PersonProps } from "@/stores/PersonStore";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PiTrashLight } from "react-icons/pi";
import { Button } from "../ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

export default function DisablePerson({ person }: { person: PersonProps }) {
  const [open, setOpen] = useState(false);
  const { disablePerson } = usePersonStore();

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
            Esse processo irá desativar essa pessoa! Confirme clicando nos botões abaixo.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild data-testid="close-button">
            <Button variant="ghost">Não</Button>
          </DialogClose>
          <Button onClick={() => {
            disablePerson(person)
            setOpen(false)
          }}>
            Sim
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}