import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useSidebarStore } from "@/stores/SidebarStore";
import { useEffect } from "react";

export default function Home() {
    const { setSelectedOption } = useSidebarStore();

    useEffect(() => {
        setSelectedOption("Tela inicial")
    }, [])

    return (
        <div className="flex">
            <Sidebar />

            <main className="flex flex-col w-full items-start">
                <Header pageName="Tela inicial" />
            </main>
        </div>
    );
}