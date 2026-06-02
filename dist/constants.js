"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/constants/index.ts
var constants_exports = {};
__export(constants_exports, {
  AGRUPACION_OPTIONS: () => AGRUPACION_OPTIONS,
  CENTRO_NEGOCIO_OPTIONS: () => CENTRO_NEGOCIO_OPTIONS,
  CONDICION_PAGO_OPTIONS: () => CONDICION_PAGO_OPTIONS,
  CONDICION_PAGO_OPTIONS_TYPED: () => CONDICION_PAGO_OPTIONS_TYPED,
  EMPRESA: () => EMPRESA,
  ESTADOS_APROBADOS: () => ESTADOS_APROBADOS,
  IMPTO_GASOLINA_POR_LITRO_DEFAULT: () => IMPTO_GASOLINA_POR_LITRO_DEFAULT,
  IVA_RATE: () => IVA_RATE,
  MONEDA_OPTIONS: () => MONEDA_OPTIONS,
  RETENCION_HONORARIOS_RATE: () => RETENCION_HONORARIOS_RATE,
  TIPO_CREACION_OPTIONS: () => TIPO_CREACION_OPTIONS,
  TIPO_DOCUMENTO_OPTIONS: () => TIPO_DOCUMENTO_OPTIONS
});
module.exports = __toCommonJS(constants_exports);
var IVA_RATE = 0.19;
var RETENCION_HONORARIOS_RATE = 0.1525;
var IMPTO_GASOLINA_POR_LITRO_DEFAULT = 404;
var TIPO_DOCUMENTO_OPTIONS = [
  { value: "factura_electronica", label: "Factura Compra Electronica" },
  { value: "boleta_honorarios", label: "Boleta de Honorarios" },
  { value: "factura_exenta", label: "Factura Compra Exenta Electronica" },
  { value: "factura_gasolina", label: "Factura Gasolina (c/ Impto. Especifico)" }
];
var CONDICION_PAGO_OPTIONS = [
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
  { value: "contra_boleta_honorarios", label: "Pago contra boleta de honorarios" }
];
var ESTADOS_APROBADOS = [
  "aprobada",
  "enviada_proveedor",
  "en_transito",
  "bodega_terralink",
  "en_preparacion",
  "guia_despacho",
  "entregada_proyecto",
  "recepcionado_proyecto"
];
var CENTRO_NEGOCIO_OPTIONS = [
  { value: "empresa", label: "Empresa" },
  { value: "om", label: "O&M" },
  { value: "proyectos", label: "Proyectos" }
];
var MONEDA_OPTIONS = [
  { value: "clp", label: "Pesos (CLP)" },
  { value: "uf", label: "UF" },
  { value: "usd", label: "Dolares (USD)" },
  { value: "eur", label: "Euros (EUR)" }
];
var TIPO_CREACION_OPTIONS = [
  { value: "cubicacion", label: "Desde Cubicacion" },
  { value: "rapida", label: "OC Rapida" },
  { value: "adicional", label: "Adicional" },
  { value: "template", label: "Desde Template" },
  { value: "caja_chica", label: "Caja Chica" },
  { value: "legacy", label: "Legado" }
];
var AGRUPACION_OPTIONS = [
  // Costo Proyecto
  { value: "equipos_principales", label: "Equipos principales", area: "Costo Proyecto" },
  { value: "mano_de_obra", label: "Mano de obra", area: "Costo Proyecto" },
  { value: "suministros", label: "Suministros", area: "Costo Proyecto" },
  { value: "servicios", label: "Servicios", area: "Costo Proyecto" },
  { value: "tramitaciones", label: "Tramitaciones", area: "Costo Proyecto" },
  { value: "adicionales", label: "Adicionales", area: "Costo Proyecto" },
  { value: "memoria_calculo", label: "Memoria de calculo", area: "Costo Proyecto" },
  { value: "transporte", label: "Transporte", area: "Costo Proyecto" },
  { value: "bodega", label: "Bodega", area: "Costo Proyecto" },
  // Costo O&M
  { value: "subcontratos", label: "Subcontratos", area: "Costo O&M" },
  { value: "repuestos", label: "Repuestos", area: "Costo O&M" },
  { value: "insumos_limpieza", label: "Insumos limpieza", area: "Costo O&M" },
  { value: "herramientas", label: "Herramientas", area: "Costo O&M" },
  // Gastos Op. y Admin
  { value: "arriendo_oficina", label: "Arriendo oficina", area: "Gastos Op. y Admin" },
  { value: "arriendo_vehiculo", label: "Arriendo vehiculo", area: "Gastos Op. y Admin" },
  { value: "combustible", label: "Combustible", area: "Gastos Op. y Admin" },
  { value: "comunicaciones", label: "Comunicaciones", area: "Gastos Op. y Admin" },
  { value: "gastos_basicos", label: "Gastos basicos", area: "Gastos Op. y Admin" },
  { value: "licencias_software", label: "Licencias software", area: "Gastos Op. y Admin" },
  { value: "mantenimiento_vehiculos", label: "Mantenimiento vehiculos", area: "Gastos Op. y Admin" },
  { value: "pago_autopistas", label: "Pago de autopistas", area: "Gastos Op. y Admin" },
  { value: "remarcacion", label: "Remarcaci\xF3n", area: "Gastos Op. y Admin" },
  { value: "salida_negocios", label: "Salida de Negocios", area: "Gastos Op. y Admin" },
  { value: "seguros", label: "Seguros", area: "Gastos Op. y Admin" },
  { value: "servicios_profesionales", label: "Servicios profesionales", area: "Gastos Op. y Admin" },
  { value: "suministros_oficina", label: "Suministros oficina", area: "Gastos Op. y Admin" },
  { value: "viaje_visita_tecnica", label: "Viaje Visita T\xE9cnica", area: "Gastos Op. y Admin" },
  // Remuneraciones
  { value: "sueldos", label: "Sueldos", area: "Remuneraciones" },
  { value: "prevision_salud", label: "Prevision salud", area: "Remuneraciones" },
  { value: "honorarios", label: "Honorarios", area: "Remuneraciones" },
  // Depreciacion
  { value: "depreciacion_equipos", label: "Depreciacion equipos", area: "Depreciacion" },
  { value: "depreciacion_vehiculos", label: "Depreciacion vehiculos", area: "Depreciacion" }
];
var CONDICION_PAGO_OPTIONS_TYPED = [
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
  { value: "contra_boleta_honorarios", label: "Pago contra boleta de honorarios" }
];
var EMPRESA = {
  nombre: "TERRALINK SPA",
  giro: "VENTA AL POR MENOR DE APARATOS ELECTRICOS, TEXTILES PARA EL HOGAR Y OT",
  direccion: "AVDA DEL PARQUE 4928 OF 428, HUECHURABA",
  telefono: "952449824",
  email: "felipe.silva@terralink.cl",
  rut: "76.509.816-5"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AGRUPACION_OPTIONS,
  CENTRO_NEGOCIO_OPTIONS,
  CONDICION_PAGO_OPTIONS,
  CONDICION_PAGO_OPTIONS_TYPED,
  EMPRESA,
  ESTADOS_APROBADOS,
  IMPTO_GASOLINA_POR_LITRO_DEFAULT,
  IVA_RATE,
  MONEDA_OPTIONS,
  RETENCION_HONORARIOS_RATE,
  TIPO_CREACION_OPTIONS,
  TIPO_DOCUMENTO_OPTIONS
});
