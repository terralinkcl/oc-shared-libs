import * as react_jsx_runtime from 'react/jsx-runtime';

type TipoDocumento = "factura_electronica" | "boleta_honorarios" | "factura_exenta" | "factura_gasolina";
type TipoDocumentoExtendido = TipoDocumento | "declaracion_importacion" | "nc_compra" | "nd_compra";
type CentroNegocio = "empresa" | "om" | "proyectos";
type AgrupacionOC = "mano_de_obra" | "suministros" | "servicios" | "equipos_principales" | "tramitaciones" | "adicionales" | "memoria_calculo" | "transporte" | "bodega" | "subcontratos" | "repuestos" | "insumos_limpieza" | "herramientas" | "arriendo_oficina" | "arriendo_vehiculo" | "combustible" | "comunicaciones" | "licencias_software" | "mantenimiento_vehiculos" | "seguros" | "servicios_profesionales" | "suministros_oficina" | "sueldos" | "prevision_salud" | "honorarios" | "depreciacion_equipos" | "depreciacion_vehiculos";
type TipoCreacionOC = "cubicacion" | "template" | "rapida" | "adicional" | "caja_chica" | "legacy";
type MonedaOC = "clp" | "uf" | "usd" | "eur";
type CondicionPago = "contra_factura" | "contra_boleta_honorarios" | "contado" | "credito_7" | "credito_15" | "credito_30" | "credito_60" | "credito_90" | "contra_entrega" | "anticipo_50_factura" | "anticipo_50_entrega";
type EstadoOCOperacional = "emitida" | "pendiente_aprobacion_tesoreria" | "aprobada" | "enviada_proveedor" | "en_transito" | "bodega_terralink" | "en_preparacion" | "guia_despacho" | "entregada_proyecto" | "recepcionado_proyecto" | "pendiente_anulacion" | "anulada" | "eliminada";
type EstadoOCFinanciero = "borrador" | "pendiente_aprobacion" | "aprobada" | "activa" | "facturada" | "cerrada" | "rechazada" | "excedida" | "pendiente_anulacion" | "anulada" | "eliminada";
type EstadoOC = EstadoOCOperacional;
interface OcParaPdf {
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
declare const CENTRO_NEGOCIO_OPTIONS: {
    value: CentroNegocio;
    label: string;
}[];
declare const MONEDA_OPTIONS: {
    value: MonedaOC;
    label: string;
}[];
declare const TIPO_CREACION_OPTIONS: {
    value: TipoCreacionOC;
    label: string;
}[];
declare const AGRUPACION_OPTIONS: {
    value: AgrupacionOC;
    label: string;
    area: string;
}[];
declare const CONDICION_PAGO_OPTIONS_TYPED: {
    value: CondicionPago;
    label: string;
}[];
declare const EMPRESA: {
    nombre: string;
    giro: string;
    direccion: string;
    telefono: string;
    email: string;
    rut: string;
};

export { AGRUPACION_OPTIONS, type AgrupacionOC, CENTRO_NEGOCIO_OPTIONS, CONDICION_PAGO_OPTIONS, CONDICION_PAGO_OPTIONS_TYPED, type CentroNegocio, type CondicionPago, EMPRESA, ESTADOS_APROBADOS, type EstadoOC, type EstadoOCFinanciero, type EstadoOCOperacional, GasolinaPdfDocument, type GasolinaPdfDocumentProps, IMPTO_GASOLINA_POR_LITRO_DEFAULT, IVA_RATE, MONEDA_OPTIONS, type MonedaOC, type OcGasolinaParaPdf, type OcItemParaPdf, type OcParaPdf, OcPdfDocument, type OcPdfDocumentProps, type ProveedorParaPdf, RETENCION_HONORARIOS_RATE, TIPO_CREACION_OPTIONS, TIPO_DOCUMENTO_OPTIONS, type TipoCreacionOC, type TipoDocumento, type TipoDocumentoExtendido };
