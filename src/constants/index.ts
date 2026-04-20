import type { TipoDocumento } from "../types";

export const IVA_RATE = 0.19;
export const RETENCION_HONORARIOS_RATE = 0.1525;

// Impuesto especifico a los combustibles (Ley 18.502)
// Base de calculo: UTM vigente x tasa por m3 / 1000 para obtener CLP/litro.
// Este valor cambia mensualmente segun la UTM publicada por el SII.
// UTM abril 2026: $67.294 | Tasa G93: 6.0 UTM/m3 => $67.294 * 6 / 1000 = ~$404/litro
// Usar este valor como referencia y actualizarlo cada mes, o recibirlo como prop.
export const IMPTO_GASOLINA_POR_LITRO_DEFAULT = 404;

export const TIPO_DOCUMENTO_OPTIONS: { value: TipoDocumento; label: string }[] = [
  { value: "factura_electronica", label: "Factura Compra Electronica" },
  { value: "boleta_honorarios", label: "Boleta de Honorarios" },
  { value: "factura_exenta", label: "Factura Compra Exenta Electronica" },
  { value: "factura_gasolina", label: "Factura Gasolina (c/ Impto. Especifico)" },
];

export const CONDICION_PAGO_OPTIONS: { value: string; label: string }[] = [
  { value: "contado", label: "Contado" },
  { value: "contra_factura", label: "Contra factura" },
  { value: "contra_entrega", label: "Contra entrega" },
  { value: "credito_7", label: "Credito 7 dias" },
  { value: "credito_15", label: "Credito 15 dias" },
  { value: "credito_30", label: "Credito 30 dias" },
  { value: "credito_60", label: "Credito 60 dias" },
  { value: "credito_90", label: "Credito 90 dias" },
  { value: "anticipo_50_factura", label: "Anticipo 50% + factura" },
  { value: "anticipo_50_entrega", label: "Anticipo 50% + entrega" },
  { value: "contra_boleta_honorarios", label: "Pago contra boleta de honorarios" },
];

export const ESTADOS_APROBADOS: string[] = [
  "aprobada",
  "enviada_proveedor",
  "en_transito",
  "bodega_terralink",
  "en_preparacion",
  "guia_despacho",
  "entregada_proyecto",
  "recepcionado_proyecto",
];

export const EMPRESA = {
  nombre: "TERRALINK SPA",
  giro: "VENTA AL POR MENOR DE APARATOS ELECTRICOS, TEXTILES PARA EL HOGAR Y OT",
  direccion: "AVDA DEL PARQUE 4928 OF 428, HUECHURABA",
  telefono: "952449824",
  email: "felipe.silva@terralink.cl",
  rut: "76.509.816-5",
};
