import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useSidebarStore } from "@/stores/SidebarStore";
import { PiBarcodeLight, PiCirclesThreePlusLight, PiGearLight, PiHouseLight, PiInvoiceLight, PiNewspaperClippingLight, PiUserLight } from "react-icons/pi";
import logo from "../../assets/logo.webp";
import MenuOption from "../ui/menu-option";

export default function Sidebar() {
    const { selectedOption } = useSidebarStore();

    const registerOptions = [
        { title: "Produtos", url: "/products", icon: PiBarcodeLight, value: "products" },
        { title: "Pessoas", url: "/people", icon: PiUserLight, value: "people" },
    ];

    const invoiceOptions = [
        { title: "Emitir NF-e", url: "/invoice", icon: PiNewspaperClippingLight, value: "sendInvoice" },
    ]

    const isRegisterSelected = registerOptions.some(option => option.title === selectedOption);
    const isInvoiceSelected = invoiceOptions.some(option => option.title === selectedOption);

    return (
        <aside className="flex flex-col justify-between border-e h-dvh w-64">
            <div className="flex flex-col gap-7">
                <img className="self-center w-4/6 mt-5" src={logo} alt="Logo da Revenda" />

                <section>
                    <MenuOption title="Tela inicial" url="/" icon={PiHouseLight} value="home" />

                    <Accordion type="single" collapsible defaultValue={isRegisterSelected ? "item-1" : ""}>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="pb-1 px-4 py-2 hover:bg-muted/50 hover:ps-5 hover:text-blue-500 duration-500">
                                <div className="flex items-center space-x-2">
                                    <PiCirclesThreePlusLight size={'17px'} />
                                    <p>Cadastros</p>
                                </div>
                            </AccordionTrigger>
                            {registerOptions.map(option => (
                                <AccordionContent className="p-0" key={option.value}>
                                    <MenuOption title={option.title} url={option.url} icon={option.icon} value={option.value} extraClassName="ps-8 hover:ps-9" />
                                </AccordionContent>
                            ))}
                        </AccordionItem>
                    </Accordion>

                    <Accordion type="single" collapsible defaultValue={isInvoiceSelected ? "item-1" : ""}>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="pb-1 px-4 py-2 hover:bg-muted/50 hover:ps-5 hover:text-blue-500 duration-500">
                                <div className="flex items-center space-x-2">
                                    <PiInvoiceLight size={'17px'} />
                                    <p>Nota fiscal</p>
                                </div>
                            </AccordionTrigger>
                            {invoiceOptions.map(option => (
                                <AccordionContent className="p-0" key={option.value}>
                                    <MenuOption title={option.title} url={option.url} icon={option.icon} value={option.value} extraClassName="ps-8 hover:ps-9" />
                                </AccordionContent>
                            ))}
                        </AccordionItem>
                    </Accordion>

                    <MenuOption title="Configurações" url="" icon={PiGearLight} value="settings" />
                </section>
            </div>

            <div className="flex flex-col items-center mb-2 text-xs">
                <p>tenant</p>
                <p>versão: 0.0.1</p>
            </div>
        </aside>
    );
}