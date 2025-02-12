import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import DisablePerson from '.';

const mockPerson = {
  id: 1,
  "isActive": true,
  name: "John Doe",
  personRegisterNumber: "12345678901",
  personType: "juridica",
  phoneNumber: "123456789",
  email: "johndoe@example.com",
  stateRegistration: "12345678",
  address: "123 Main St",
  addressComplement: "Apt 4B",
  number: "456",
  neighborhood: "Downtown",
  state: "BA",
  city: "Los Angeles",
  postalCode: "90001"
};


describe("DisablePerson", () => {
  const checkDialog = () => {
    render(<DisablePerson person={mockPerson} />);
    const dialogTrigger = screen.getByTestId("dialog-trigger");

    fireEvent.click(dialogTrigger);
  }

  it('renders the DisablePerson dialog', () => {
    checkDialog();
    const dialogHeader = screen.getByText("Você tem certeza?");
    expect(dialogHeader).toBeTruthy();
  })

  it("close the dialog when the confirmation is negative", () => {
    checkDialog();
    const dialogCloseButton = screen.getByTestId("close-button");
    fireEvent.click(dialogCloseButton);
    const dialogTrigger = screen.getByTestId("dialog-trigger");
    expect(dialogTrigger).toBeTruthy();
  })

  afterEach(() => {
    cleanup();
  });
});
