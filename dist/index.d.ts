import * as react_jsx_runtime from 'react/jsx-runtime';

type TipoDocumento = "factura_electronica" | "boleta_honorarios" | "factura_exenta";
type EstadoOC = "emitida" | "aprobada" | "enviada_proveedor" | "en_transito" | "bodega_terralink" | "en_preparacion" | "guia_despacho" | "entregada_proyecto" | "recepcionado_proyecto" | "anulacion_solicitada" | "anulada" | "eliminada";
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

interface OcPdfDocumentProps {
    oc: OcParaPdf;
    items: OcItemParaPdf[];
    proveedor: ProveedorParaPdf;
    logoBase64: string;
}
declare function OcPdfDocument({ oc, items, proveedor, logoBase64 }: OcPdfDocumentProps): react_jsx_runtime.JSX.Element;

declare const IVA_RATE = 0.19;
declare const RETENCION_HONORARIOS_RATE = 0.1525;
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

export { CONDICION_PAGO_OPTIONS, EMPRESA, ESTADOS_APROBADOS, type EstadoOC, IVA_RATE, type OcItemParaPdf, type OcParaPdf, OcPdfDocument, type OcPdfDocumentProps, type ProveedorParaPdf, RETENCION_HONORARIOS_RATE, TIPO_DOCUMENTO_OPTIONS, type TipoDocumento };
