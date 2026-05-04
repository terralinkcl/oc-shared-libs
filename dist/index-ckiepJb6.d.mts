type TipoDocumento = "factura_electronica" | "boleta_honorarios" | "factura_exenta" | "factura_gasolina";
type TipoDocumentoExtendido = TipoDocumento | "declaracion_importacion" | "nc_compra" | "nd_compra";
type CentroNegocio = "empresa" | "om" | "proyectos";
type AgrupacionOC = "mano_de_obra" | "suministros" | "servicios" | "equipos_principales" | "tramitaciones" | "adicionales" | "memoria_calculo" | "transporte" | "bodega" | "subcontratos" | "repuestos" | "insumos_limpieza" | "herramientas" | "arriendo_oficina" | "arriendo_vehiculo" | "combustible" | "comunicaciones" | "gastos_basicos" | "licencias_software" | "mantenimiento_vehiculos" | "pago_autopistas" | "seguros" | "servicios_profesionales" | "suministros_oficina" | "sueldos" | "prevision_salud" | "honorarios" | "depreciacion_equipos" | "depreciacion_vehiculos";
type TipoCreacionOC = "cubicacion" | "template" | "rapida" | "adicional" | "caja_chica" | "legacy";
type MonedaOC = "clp" | "uf" | "usd" | "eur";
type CondicionPago = "contra_factura" | "contra_boleta_honorarios" | "contado" | "credito_7" | "credito_15" | "credito_30" | "credito_60" | "credito_90" | "contra_entrega" | "anticipo_50_factura" | "anticipo_50_entrega";
type EstadoOCOperacional = "emitida" | "pendiente_segunda_aprobacion" | "pendiente_aprobacion_tesoreria" | "aprobada" | "rechazada" | "enviada_proveedor" | "en_transito" | "bodega_terralink" | "en_preparacion" | "guia_despacho" | "entregada_proyecto" | "recepcionado_proyecto" | "pendiente_anulacion" | "anulada" | "eliminada";
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

export type { AgrupacionOC as A, CentroNegocio as C, EstadoOC as E, MonedaOC as M, OcGasolinaParaPdf as O, ProveedorParaPdf as P, TipoCreacionOC as T, CondicionPago as a, EstadoOCFinanciero as b, EstadoOCOperacional as c, OcItemParaPdf as d, OcParaPdf as e, TipoDocumento as f, TipoDocumentoExtendido as g };
