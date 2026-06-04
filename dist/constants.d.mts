import { A as AgrupacionOC, C as CentroNegocio, a as CondicionPago, M as MonedaOC, T as TipoCreacionOC, f as TipoDocumento } from './index-DWOy8HGx.mjs';
export { E as EstadoOC, b as EstadoOCFinanciero, c as EstadoOCOperacional, g as TipoDocumentoExtendido } from './index-DWOy8HGx.mjs';

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

export { AGRUPACION_OPTIONS, AgrupacionOC, CENTRO_NEGOCIO_OPTIONS, CONDICION_PAGO_OPTIONS, CONDICION_PAGO_OPTIONS_TYPED, CentroNegocio, CondicionPago, EMPRESA, ESTADOS_APROBADOS, IMPTO_GASOLINA_POR_LITRO_DEFAULT, IVA_RATE, MONEDA_OPTIONS, MonedaOC, RETENCION_HONORARIOS_RATE, TIPO_CREACION_OPTIONS, TIPO_DOCUMENTO_OPTIONS, TipoCreacionOC, TipoDocumento };
