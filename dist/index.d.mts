import * as react_jsx_runtime from 'react/jsx-runtime';

type TipoDocumento = "factura_electronica" | "boleta_honorarios" | "factura_exenta" | "factura_gasolina";
type EstadoOC = "emitida" | "pendiente_aprobacion_tesoreria" | "aprobada" | "enviada_proveedor" | "en_transito" | "bodega_terralink" | "en_preparacion" | "guia_despacho" | "entregada_proyecto" | "recepcionado_proyecto" | "anulacion_solicitada" | "anulada" | "eliminada";
interface OcParaPdf {
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
    proveedor_nombre: string;
    proyecto_nombre: string;
}
interface OcItemParaPdf {
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
interface ProveedorParaPdf {
    nombre: string;
    rut: string | null;
    direccion: string | null;
    ciudad: string | null;
}
interface OcGasolinaParaPdf extends OcParaPdf {
    tasa_impto_especifico_por_litro: number;
}

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

declare const IVA_RATE = 0.19;
declare const RETENCION_HONORARIOS_RATE = 0.1525;
declare const IMPTO_GASOLINA_POR_LITRO_DEFAULT = 404;
declare const TIPO_DOCUMENTO_OPTIONS: {
    value: TipoDocumento;
    label: string;
}[];
declare const CONDICION_PAGO_OPTIONS: {
    value: string;
    label: string;
}[];
declare const ESTADOS_APROBADOS: string[];
declare const EMPRESA: {
    nombre: string;
    giro: string;
    direccion: string;
    telefono: string;
    email: string;
    rut: string;
};

export { CONDICION_PAGO_OPTIONS, EMPRESA, ESTADOS_APROBADOS, type EstadoOC, GasolinaPdfDocument, type GasolinaPdfDocumentProps, IMPTO_GASOLINA_POR_LITRO_DEFAULT, IVA_RATE, type OcGasolinaParaPdf, type OcItemParaPdf, type OcParaPdf, OcPdfDocument, type OcPdfDocumentProps, type ProveedorParaPdf, RETENCION_HONORARIOS_RATE, TIPO_DOCUMENTO_OPTIONS, type TipoDocumento };
