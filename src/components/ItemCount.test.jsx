import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ItemCount from "./ItemCount";

describe("Pruebas unitarias sobre el componente ItemCount", () => {
  it("No permite decrementar la cantidad por debajo de cero", () => {
    render(<ItemCount stock={5} initial={0} onAdd={() => {}} />);

    const btnDecrement = screen.getByRole("button", { name: "-" });
    expect(btnDecrement).toBeDisabled();

    fireEvent.click(btnDecrement);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("No permite incrementar la cantidad por encima del stock disponible", () => {
    const stockDisponible = 3;
    render(<ItemCount stock={stockDisponible} initial={3} onAdd={() => {}} />);

    const btnIncrement = screen.getByRole("button", { name: "+" });
    expect(btnIncrement).toBeDisabled();

    fireEvent.click(btnIncrement);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("Llama a onAdd con la cantidad correcta al presionar el botón de agregar", () => {
    const handleAddMock = vi.fn();
    render(<ItemCount stock={10} initial={2} onAdd={handleAddMock} />);

    const btnAdd = screen.getByRole("button", { name: /agregar al carrito/i });
    fireEvent.click(btnAdd);

    expect(handleAddMock).toHaveBeenCalledTimes(1);
    expect(handleAddMock).toHaveBeenCalledWith(2);
  });
});
