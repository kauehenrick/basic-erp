type InvoiceType = {
    id: number
    name: string
};

export const invoiceTypes: InvoiceType[] = [
    { id: 1, name: "Emissão NFe" },
    { id: 2, name: "Acobertamento de cupom" },
    { id: 3, name: "Devolução de compra" },
    { id: 4, name: "Perda/avaria" }
];