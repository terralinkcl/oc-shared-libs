import type {
  TipoDocumento,
  CentroNegocio,
  AgrupacionOC,
  TipoCreacionOC,
  MonedaOC,
  CondicionPago,
} from "../types";

// Re-export de tipos canonicos para que los consumidores puedan importar
// constantes y tipos en el mismo statement desde "oc-shared-libs/constants",
// sin tener que jalar el barrel principal (que incluye @react-pdf/renderer).
export type {
  TipoDocumento,
  TipoDocumentoExtendido,
  CentroNegocio,
  AgrupacionOC,
  TipoCreacionOC,
  MonedaOC,
  CondicionPago,
  EstadoOCOperacional,
  EstadoOCFinanciero,
  EstadoOC,
} from "../types";

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

export const CENTRO_NEGOCIO_OPTIONS: { value: CentroNegocio; label: string }[] = [
  { value: "empresa", label: "Empresa" },
  { value: "om", label: "O&M" },
  { value: "proyectos", label: "Proyectos" },
];

export const MONEDA_OPTIONS: { value: MonedaOC; label: string }[] = [
  { value: "clp", label: "Pesos (CLP)" },
  { value: "uf", label: "UF" },
  { value: "usd", label: "Dolares (USD)" },
  { value: "eur", label: "Euros (EUR)" },
];

export const TIPO_CREACION_OPTIONS: { value: TipoCreacionOC; label: string }[] = [
  { value: "cubicacion", label: "Desde Cubicacion" },
  { value: "rapida", label: "OC Rapida" },
  { value: "adicional", label: "Adicional" },
  { value: "template", label: "Desde Template" },
  { value: "caja_chica", label: "Caja Chica" },
  { value: "legacy", label: "Legado" },
];

export const AGRUPACION_OPTIONS: { value: AgrupacionOC; label: string; area: string }[] = [
  // Costo Proyecto
  { value: "equipos_principales",    label: "Equipos principales",     area: "Costo Proyecto" },
  { value: "mano_de_obra",           label: "Mano de obra",            area: "Costo Proyecto" },
  { value: "suministros",            label: "Suministros",             area: "Costo Proyecto" },
  { value: "servicios",              label: "Servicios",               area: "Costo Proyecto" },
  { value: "tramitaciones",          label: "Tramitaciones",           area: "Costo Proyecto" },
  { value: "adicionales",            label: "Adicionales",             area: "Costo Proyecto" },
  { value: "memoria_calculo",        label: "Memoria de calculo",      area: "Costo Proyecto" },
  { value: "transporte",             label: "Transporte",              area: "Costo Proyecto" },
  { value: "bodega",                 label: "Bodega",                  area: "Costo Proyecto" },
  // Costo O&M
  { value: "subcontratos",           label: "Subcontratos",            area: "Costo O&M" },
  { value: "repuestos",              label: "Repuestos",               area: "Costo O&M" },
  { value: "insumos_limpieza",       label: "Insumos limpieza",        area: "Costo O&M" },
  { value: "herramientas",           label: "Herramientas",            area: "Costo O&M" },
  // Gastos Op. y Admin
  { value: "arriendo_oficina",       label: "Arriendo oficina",        area: "Gastos Op. y Admin" },
  { value: "arriendo_vehiculo",      label: "Arriendo vehiculo",       area: "Gastos Op. y Admin" },
  { value: "combustible",            label: "Combustible",             area: "Gastos Op. y Admin" },
  { value: "comunicaciones",         label: "Comunicaciones",          area: "Gastos Op. y Admin" },
  { value: "gastos_bancarios",       label: "Gasto Bancario",          area: "Gastos Op. y Admin" },
  { value: "gastos_basicos",         label: "Gastos basicos",          area: "Gastos Op. y Admin" },
  { value: "licencias_software",     label: "Licencias software",      area: "Gastos Op. y Admin" },
  { value: "mantenimiento_vehiculos",label: "Mantenimiento vehiculos", area: "Gastos Op. y Admin" },
  { value: "pago_autopistas",        label: "Pago de autopistas",      area: "Gastos Op. y Admin" },
  { value: "remarcacion",            label: "Remarcación",             area: "Gastos Op. y Admin" },
  { value: "salida_negocios",        label: "Salida de Negocios",      area: "Gastos Op. y Admin" },
  { value: "seguros",                label: "Seguros",                 area: "Gastos Op. y Admin" },
  { value: "servicios_profesionales",label: "Servicios profesionales", area: "Gastos Op. y Admin" },
  { value: "suministros_oficina",    label: "Suministros oficina",     area: "Gastos Op. y Admin" },
  { value: "viaje_visita_tecnica",   label: "Viaje Visita Técnica",    area: "Gastos Op. y Admin" },
  // Remuneraciones
  { value: "sueldos",                label: "Sueldos",                 area: "Remuneraciones" },
  { value: "prevision_salud",        label: "Prevision salud",         area: "Remuneraciones" },
  { value: "honorarios",             label: "Honorarios",              area: "Remuneraciones" },
  // Depreciacion
  { value: "depreciacion_equipos",   label: "Depreciacion equipos",    area: "Depreciacion" },
  { value: "depreciacion_vehiculos", label: "Depreciacion vehiculos",  area: "Depreciacion" },
];

// Sobreescribe CONDICION_PAGO_OPTIONS con tipo canonico
export const CONDICION_PAGO_OPTIONS_TYPED: { value: CondicionPago; label: string }[] = [
  { value: "contado",                    label: "Contado" },
  { value: "contra_factura",             label: "Contra factura" },
  { value: "contra_entrega",             label: "Contra entrega" },
  { value: "credito_7",                  label: "Credito 7 dias" },
  { value: "credito_15",                 label: "Credito 15 dias" },
  { value: "credito_30",                 label: "Credito 30 dias" },
  { value: "credito_60",                 label: "Credito 60 dias" },
  { value: "credito_90",                 label: "Credito 90 dias" },
  { value: "anticipo_50_factura",        label: "Anticipo 50% + factura" },
  { value: "anticipo_50_entrega",        label: "Anticipo 50% + entrega" },
  { value: "contra_boleta_honorarios",   label: "Pago contra boleta de honorarios" },
];

export const EMPRESA = {
  nombre: "TERRALINK SPA",
  giro: "VENTA AL POR MENOR DE APARATOS ELECTRICOS, TEXTILES PARA EL HOGAR Y OT",
  direccion: "AVDA DEL PARQUE 4928 OF 428, HUECHURABA",
  telefono: "952449824",
  email: "felipe.silva@terralink.cl",
  rut: "76.509.816-5",
};
