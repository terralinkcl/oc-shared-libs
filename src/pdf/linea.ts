import type { OcItemParaPdf } from "../types";

// Neto de una linea para el PDF: bruto (precio_total, o precio x cantidad si
// no viene) menos el descuento de la linea.
export function netoLinea(i: OcItemParaPdf): number {
  const bruto = i.precio_total ?? (i.precio_unitario ?? 0) * i.cantidad_pedida;
  return bruto - (i.descuento ?? 0);
}
