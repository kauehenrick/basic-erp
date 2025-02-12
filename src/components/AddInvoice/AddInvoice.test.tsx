import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, afterEach, expect } from "vitest";
import AddInvoice from ".";

describe("AddInvoice Component", () => {
    afterEach(() => {
        cleanup();
    });

    it("renders the AddInvoice component", () => {
        render(<AddInvoice />);
        const addButton = screen.getByRole("button", { name: /nova/i });
        expect(addButton).toBeInTheDocument();
    });

    it("displays dialog content when clicking the button", async () => {
        render(<AddInvoice />);

        const dialogTrigger = screen.getByRole("button", { name: /nova/i });
        fireEvent.click(dialogTrigger);

        const dialogTitle = await screen.findByText(/emitir nf-e/i);
        expect(dialogTitle).toBeInTheDocument();

        const clientInput = screen.getByText(/cliente/i);
        expect(clientInput).toBeInTheDocument();
    });
});