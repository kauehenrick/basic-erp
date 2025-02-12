import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, afterEach, expect } from 'vitest';
import UpdatePerson from '.';

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


describe("UpdatePerson", () => {
  const checkDialog = () => {
    render(<UpdatePerson {...mockPerson} />);
    const dialogTrigger = screen.getByTestId("dialog-trigger");

    fireEvent.click(dialogTrigger);
  }

  it('renders the UpdatePerson dialog', () => {
    checkDialog();
    const dialogHeader = screen.getByText("Editar Pessoa");
    expect(dialogHeader).toBeTruthy();
  })

  it('renders default values', () => {
    checkDialog();
    const defaultPerson = screen.getByDisplayValue("Jurídica");
    expect(defaultPerson).toBeTruthy();
  })

  afterEach(() => {
    cleanup();
  });
});
