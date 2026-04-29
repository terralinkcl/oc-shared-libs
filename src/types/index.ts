// ── Tipos de documento ────────────────────────────────────────────────────────

export type TipoDocumento =
  | "factura_electronica"
  | "boleta_honorarios"
  | "factura_exenta"
  | "factura_gasolina";

// Extras especificos de Tesoreria (no emitibles desde Abast)
export type TipoDocumentoExtendido =
  | TipoDocumento
  | "declaracion_importacion"
  | "nc_compra"
  | "nd_compra";

// ── Centro de negocio ─────────────────────────────────────────────────────────

export type CentroNegocio = "empresa" | "om" | "proyectos";

// ── Agrupacion EERR ───────────────────────────────────────────────────────────

export type AgrupacionOC =
  // Costo Proyecto
  | "mano_de_obra" | "suministros" | "servicios" | "equipos_principales"
  | "tramitaciones" | "adicionales" | "memoria_calculo" | "transporte" | "bodega"
  // Costo O&M
  | "subcontratos" | "repuestos" | "insumos_limpieza" | "herramientas"
  // Gastos Op. y Admin
  | "arriendo_oficina" | "arriendo_vehiculo" | "combustible" | "comunicaciones"
  | "licencias_software" | "mantenimiento_vehiculos" | "seguros"
  | "servicios_profesionales" | "suministros_oficina"
  // Remuneraciones
  | "sueldos" | "prevision_salud" | "honorarios"
  // Depreciacion
  | "depreciacion_equipos" | "depreciacion_vehiculos";

// ── Tipo de creacion ──────────────────────────────────────────────────────────

export type TipoCreacionOC =
  | "cubicacion" | "template" | "rapida" | "adicional" | "caja_chica" | "legacy";

// ── Moneda ────────────────────────────────────────────────────────────────────

export type MonedaOC = "clp" | "uf" | "usd" | "eur";

// Moneda por defecto al crear OCs nuevas. CLP es la moneda contable de Terralink.
export const MONEDA_DEFAULT: MonedaOC = "clp";

// ── Condicion de pago ─────────────────────────────────────────────────────────

export type CondicionPago =
  | "contra_factura" | "contra_boleta_honorarios" | "contado"
  | "credito_7" | "credito_15" | "credito_30" | "credito_60" | "credito_90"
  | "contra_entrega" | "anticipo_50_factura" | "anticipo_50_entrega";

// ── Estados de OC ─────────────────────────────────────────────────────────────

// Estados operacionales/logisticos (usados en Abastecimiento)
export type EstadoOCOperacional =
  | "emitida"
  | "pendiente_segunda_aprobacion"
  | "pendiente_aprobacion_tesoreria"
  | "aprobada"
  | "rechazada"
  | "enviada_proveedor"
  | "en_transito"
  | "bodega_terralink"
  | "en_preparacion"
  | "guia_despacho"
  | "entregada_proyecto"
  | "recepcionado_proyecto"
  | "pendiente_anulacion"
  | "anulada"
  | "eliminada";

// Estados financieros (usados en Tesoreria)
export type EstadoOCFinanciero =
  | "borrador"
  | "pendiente_aprobacion"
  | "aprobada"
  | "activa"
  | "facturada"
  | "cerrada"
  | "rechazada"
  | "excedida"
  | "pendiente_anulacion"
  | "anulada"
  | "eliminada";

// Alias por retrocompatibilidad con codigo existente
export type EstadoOC = EstadoOCOperacional;

// ── Orden de Compra ───────────────────────────────────────────────────────────

export interface OcParaPdf {
  id: string;
  numero: string;
  folio_proyecto: string | null;
  folio_global: number | null;
  estado: EstadoOC;
  tipo_documento: TipoDocumento | null;
  moneda?: MonedaOC | null;
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
