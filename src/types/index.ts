// ── Tipos de documento ────────────────────────────────────────────────────────

export type TipoDocumento =
  | "factura_electronica"
  | "boleta_honorarios"
  | "factura_exenta"
  | "factura_gasolina";

export type EstadoOC =
  | "emitida"
  | "pendiente_aprobacion_tesoreria"
  | "aprobada"
  | "enviada_proveedor"
  | "en_transito"
  | "bodega_terralink"
  | "en_preparacion"
  | "guia_despacho"
  | "entregada_proyecto"
  | "recepcionado_proyecto"
  | "anulacion_solicitada"
  | "anulada"
  | "eliminada";

// ── Orden de Compra ───────────────────────────────────────────────────────────

export interface OcParaPdf {
  id: string;
  numero: string;
  folio_proyecto: string | null;
  folio_global: number | null;
  estado: EstadoOC;
  tipo_documento: TipoDocumento | null;
  condicion_pago: string | null;
  fecha_emision: string | null;
  fecha_entrega_prom: string | null;
  despacho: string | null;
  centro_negocio_label: string | null;
  comentario: string | null;
  notas: string | null;
  // Datos enriquecidos requeridos por el PDF
  proveedor_nombre: string;
  proyecto_nombre: string;
}

// ── Items de OC ───────────────────────────────────────────────────────────────

export interface OcItemParaPdf {
  id: string;
  material_id: number | null;
  catalogo_general_id: string | null;
  descripcion_snap: string;
  unidad_snap: string | null;
  cantidad_pedida: number;
  precio_unitario: number | null;
  precio_total: number | null;
  comentario: string | null;
}

// ── Proveedor ─────────────────────────────────────────────────────────────────

export interface ProveedorParaPdf {
  nombre: string;
  rut: string | null;
  direccion: string | null;
  ciudad: string | null;
}

// ── OC Gasolina ───────────────────────────────────────────────────────────────
// Extiende OcParaPdf con la tasa del impuesto especifico de combustible.
// La tasa es en CLP por litro, calculada mensualmente en base a la UTM vigente.
// Ejemplo: si la UTM es $67.294 y la tasa es 6.0 UTM/m3, la tasa por litro = (67294 * 6) / 1000 = ~$404/litro.

export interface OcGasolinaParaPdf extends OcParaPdf {
  // Tasa del impuesto especifico a los combustibles en CLP por litro (varia por UTM mensual)
  tasa_impto_especifico_por_litro: number;
}
