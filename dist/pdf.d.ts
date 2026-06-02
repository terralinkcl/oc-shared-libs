import * as react_jsx_runtime from 'react/jsx-runtime';
import { e as OcParaPdf, d as OcItemParaPdf, P as ProveedorParaPdf, O as OcGasolinaParaPdf } from './index-B8-W5uml.js';

interface OcPdfDocumentProps {
    oc: OcParaPdf;
    items: OcItemParaPdf[];
    proveedor: ProveedorParaPdf;
    logoBase64: string;
}
declare function OcPdfDocument({ oc, items, proveedor, logoBase64 }: OcPdfDocumentProps): react_jsx_runtime.JSX.Element;

interface GasolinaPdfDocumentProps {
    oc: OcGasolinaParaPdf;
    items: OcItemParaPdf[];
    proveedor: ProveedorParaPdf;
    logoBase64: string;
}
declare function GasolinaPdfDocument({ oc, items, proveedor, logoBase64 }: GasolinaPdfDocumentProps): react_jsx_runtime.JSX.Element;

export { GasolinaPdfDocument, type GasolinaPdfDocumentProps, OcGasolinaParaPdf, OcItemParaPdf, OcParaPdf, OcPdfDocument, type OcPdfDocumentProps, ProveedorParaPdf };
