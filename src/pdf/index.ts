// Subpath barrel: solo componentes PDF + sus tipos.
// Importa @react-pdf/renderer (~600KB), por eso esta separado del barrel
// principal. Los consumidores que solo necesitan tipos/constantes deben
// importar desde "oc-shared-libs/constants" para evitar jalar react-pdf.

export { OcPdfDocument } from "./OcPdfDocument";
export type { OcPdfDocumentProps } from "./OcPdfDocument";

export { GasolinaPdfDocument } from "./GasolinaPdfDocument";
export type { GasolinaPdfDocumentProps } from "./GasolinaPdfDocument";

// Re-export tipos especificos del PDF (no van en /constants porque
// son del dominio del componente)
export type { OcParaPdf, OcItemParaPdf, ProveedorParaPdf, OcGasolinaParaPdf } from "../types";
