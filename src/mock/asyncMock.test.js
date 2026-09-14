import { describe, it, expect } from "vitest";
import { getProductById } from "./asyncMock";

describe("Pruebas unitarias sobre getProductById()", () => {
  it("Debe resolver la promesa y retornar el producto correcto cuando el ID existe", async () => {
    const product = await getProductById("polo-01");
    expect(product).toBeDefined();
    expect(product.id).toBe("polo-01");
    expect(product.name).toBe("Polo Piqué Clásico Azul Marino");
  });

  it("Debe rechazar la promesa con un error cuando el ID no existe", async () => {
    await expect(getProductById("id-inexistente")).rejects.toThrow(
      'Producto con identificador "id-inexistente" no encontrado.',
    );
  });
});
