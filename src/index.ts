// Componentes PDF
export { OcPdfDocument } from "./pdf/OcPdfDocument";
export type { OcPdfDocumentProps } from "./pdf/OcPdfDocument";

export { GasolinaPdfDocument } from "./pdf/GasolinaPdfDocument";
export type { GasolinaPdfDocumentProps } from "./pdf/GasolinaPdfDocument";

// Tipos
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
  OcParaPdf,
  OcItemParaPdf,
  ProveedorParaPdf,
  OcGasolinaParaPdf,
} from "./types";

// Constantes
export {
  IVA_RATE,
  RETENCION_HONORARIOS_RATE,
  IMPTO_GASOLINA_POR_LITRO_DEFAULT,
  TIPO_DOCUMENTO_OPTIONS,
  CONDICION_PAGO_OPTIONS,
  CONDICION_PAGO_OPTIONS_TYPED,
  CENTRO_NEGOCIO_OPTIONS,
  MONEDA_OPTIONS,
  TIPO_CREACION_OPTIONS,
  AGRUPACION_OPTIONS,
  ESTADOS_APROBADOS,
  EMPRESA,
} from "./constants";
