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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AGRUPACION_OPTIONS: () => AGRUPACION_OPTIONS,
  CENTRO_NEGOCIO_OPTIONS: () => CENTRO_NEGOCIO_OPTIONS,
  CONDICION_PAGO_OPTIONS: () => CONDICION_PAGO_OPTIONS,
  CONDICION_PAGO_OPTIONS_TYPED: () => CONDICION_PAGO_OPTIONS_TYPED,
  EMPRESA: () => EMPRESA,
  ESTADOS_APROBADOS: () => ESTADOS_APROBADOS,
  GasolinaPdfDocument: () => GasolinaPdfDocument,
  IMPTO_GASOLINA_POR_LITRO_DEFAULT: () => IMPTO_GASOLINA_POR_LITRO_DEFAULT,
  IVA_RATE: () => IVA_RATE,
  MONEDA_OPTIONS: () => MONEDA_OPTIONS,
  OcPdfDocument: () => OcPdfDocument,
  RETENCION_HONORARIOS_RATE: () => RETENCION_HONORARIOS_RATE,
  TIPO_CREACION_OPTIONS: () => TIPO_CREACION_OPTIONS,
  TIPO_DOCUMENTO_OPTIONS: () => TIPO_DOCUMENTO_OPTIONS
});
module.exports = __toCommonJS(src_exports);

// src/pdf/OcPdfDocument.tsx
var import_renderer = require("@react-pdf/renderer");

// src/constants/index.ts
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
  { value: "gastos_bancarios", label: "Gasto Bancario", area: "Gastos Op. y Admin" },
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
  { value: "protocolos_conexion", label: "Protocolos de conexi\xF3n", area: "Gastos Op. y Admin" },
  { value: "solicitud_conexion", label: "Solicitud de conexi\xF3n", area: "Gastos Op. y Admin" },
  { value: "internet", label: "Internet", area: "Gastos Op. y Admin" },
  { value: "agua", label: "Agua", area: "Gastos Op. y Admin" },
  { value: "luz", label: "Luz", area: "Gastos Op. y Admin" },
  { value: "telefonia_movil", label: "Telefon\xEDa m\xF3vil", area: "Gastos Op. y Admin" },
  { value: "cafeteria_agua_filtrada", label: "Cafeter\xEDa (agua filtrada)", area: "Gastos Op. y Admin" },
  { value: "articulos_aseo", label: "Art\xEDculos de aseo", area: "Gastos Op. y Admin" },
  { value: "articulos_computacion", label: "Art\xEDculos de computaci\xF3n", area: "Gastos Op. y Admin" },
  { value: "seguridad", label: "Seguridad", area: "Gastos Op. y Admin" },
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

// src/pdf/OcPdfDocument.tsx
var import_jsx_runtime = require("react/jsx-runtime");
import_renderer.Font.register({
  family: "Helvetica",
  fonts: [
    { src: "Helvetica" },
    { src: "Helvetica-Bold", fontWeight: "bold" }
  ]
});
var s = import_renderer.StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 9, padding: 40, color: "#1a1a1a" },
  headerRow: { flexDirection: "row", marginBottom: 16 },
  logo: { width: 110, height: 35, objectFit: "contain" },
  headerCenter: { flex: 1, paddingLeft: 12 },
  empresaNombre: { fontSize: 11, fontWeight: "bold", marginBottom: 2 },
  empresaGiro: { fontSize: 7, color: "#555", marginBottom: 2 },
  empresaInfo: { fontSize: 8, color: "#333", marginBottom: 1 },
  folioBox: { width: 170, borderWidth: 2, borderColor: "#cc0000", borderStyle: "solid", padding: 10, alignItems: "center", justifyContent: "center" },
  folioRut: { fontSize: 11, fontWeight: "bold", color: "#cc0000", marginBottom: 6 },
  folioTitle: { fontSize: 12, fontWeight: "bold", color: "#cc0000", marginBottom: 4 },
  folioNumber: { fontSize: 11, fontWeight: "bold", color: "#cc0000" },
  estadoBadge: { marginTop: 6, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, alignSelf: "center" },
  estadoText: { fontSize: 9, fontWeight: "bold", color: "#ffffff" },
  infoBlock: { borderWidth: 1, borderColor: "#999", borderStyle: "solid", padding: 8, marginBottom: 10, flexDirection: "row" },
  infoLeft: { flex: 1 },
  infoRight: { width: 200 },
  infoRow: { flexDirection: "row", marginBottom: 2 },
  infoLabel: { fontSize: 8, fontWeight: "bold", width: 95, textAlign: "right", paddingRight: 5 },
  infoValue: { fontSize: 8, flex: 1 },
  infoLabelRight: { fontSize: 8, fontWeight: "bold", width: 100, textAlign: "right", paddingRight: 5 },
  table: { borderWidth: 1, borderColor: "#999", borderStyle: "solid", marginBottom: 10 },
  tableHeader: { flexDirection: "row", backgroundColor: "#f5f5f5", borderBottomWidth: 1, borderBottomColor: "#999", borderBottomStyle: "solid", paddingVertical: 5 },
  tableRow: { flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#ddd", borderBottomStyle: "solid", paddingVertical: 4, minHeight: 20 },
  colCodigo: { width: "12%", paddingLeft: 6 },
  colDescripcion: { width: "33%", paddingLeft: 6 },
  colCantidad: { width: "14%", textAlign: "right", paddingRight: 6 },
  colPrecio: { width: "14%", textAlign: "right", paddingRight: 6 },
  colDescuento: { width: "12%", textAlign: "right", paddingRight: 6 },
  colTotal: { width: "15%", textAlign: "right", paddingRight: 6 },
  thText: { fontSize: 8, fontWeight: "bold" },
  tdText: { fontSize: 8 },
  footerRow: { flexDirection: "row", marginBottom: 16 },
  commentBox: { flex: 1, paddingRight: 20 },
  commentLabel: { fontSize: 8, fontWeight: "bold", marginBottom: 3 },
  commentText: { fontSize: 8, color: "#333" },
  totalsBox: { width: 220, borderWidth: 1, borderColor: "#999", borderStyle: "solid", padding: 8 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  totalLabel: { fontSize: 9, fontWeight: "bold", textAlign: "right", width: 120 },
  totalValue: { fontSize: 9, textAlign: "right", width: 80 },
  totalSeparator: { borderTopWidth: 1, borderTopColor: "#999", borderTopStyle: "solid", marginVertical: 4 },
  totalFinal: { fontSize: 10, fontWeight: "bold" },
  signatureBlock: { borderWidth: 1, borderColor: "#999", borderStyle: "solid", padding: 10, marginTop: 20, flexDirection: "row", width: 300, alignSelf: "center" },
  signatureLeft: { flex: 1 },
  signatureRight: { flex: 1 },
  signatureLabel: { fontSize: 8, fontWeight: "bold", marginBottom: 12 }
});
var DECIMALS_BY_MONEDA = {
  clp: 0,
  uf: 2,
  usd: 2,
  eur: 2
};
var SYMBOL_BY_MONEDA = {
  clp: "$",
  uf: "UF",
  usd: "US$",
  eur: "\u20AC"
};
function fmtNum(n, moneda) {
  const decimals = DECIMALS_BY_MONEDA[moneda];
  return new Intl.NumberFormat("es-CL", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(n);
}
function fmt(n, moneda = "clp") {
  return `${SYMBOL_BY_MONEDA[moneda]} ${fmtNum(n, moneda)}`;
}
function zero(moneda = "clp") {
  return fmt(0, moneda);
}
function ceilTotal(n, moneda) {
  return moneda === "clp" ? Math.ceil(n) : n;
}
function fmtFecha(iso) {
  if (!iso) return "--";
  const parts = iso.split("-");
  if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
  return iso;
}
function fmtFolio(oc) {
  if (oc.folio_global != null) return String(oc.folio_global);
  if (oc.folio_proyecto) return oc.folio_proyecto;
  const parts = oc.numero.split("-");
  return parts[parts.length - 1] ?? oc.numero;
}
function fmtCondicionPago(value) {
  if (!value) return "--";
  return CONDICION_PAGO_OPTIONS.find((o) => o.value === value)?.label ?? value;
}
var ESTADOS_PENDIENTES = [
  "borrador",
  "emitida",
  "pendiente_aprobacion",
  "pendiente_segunda_aprobacion",
  "pendiente_aprobacion_tesoreria"
];
var ESTADOS_ANULADOS = ["pendiente_anulacion", "anulacion_solicitada", "anulada"];
var ESTADOS_APROBADOS_FINANCIEROS = [
  "activa",
  "facturada",
  "pagada",
  "excedida",
  "cerrada"
];
function resolverEstadoLabel(estado) {
  if (ESTADOS_PENDIENTES.includes(estado)) return { label: "Pendiente", color: "#d97706" };
  if (ESTADOS_APROBADOS.includes(estado) || ESTADOS_APROBADOS_FINANCIEROS.includes(estado)) {
    return { label: "Aprobada", color: "#16a34a" };
  }
  if (ESTADOS_ANULADOS.includes(estado)) return { label: "Anulada", color: "#dc2626" };
  if (estado === "eliminada") return { label: "Eliminada", color: "#6b7280" };
  return { label: "Rechazada", color: "#dc2626" };
}
function OcPdfDocument({ oc, items, proveedor, logoBase64 }) {
  const lineNeto = (i) => i.precio_total ?? (i.precio_unitario ?? 0) * i.cantidad_pedida;
  const subtotal = items.reduce((sum, i) => sum + lineNeto(i), 0);
  const neto = subtotal;
  const moneda = oc.moneda ?? "clp";
  const tipoDoc = oc.tipo_documento ?? (oc.condicion_pago === "contra_boleta_honorarios" ? "boleta_honorarios" : "factura_electronica");
  const esBoleta = tipoDoc === "boleta_honorarios";
  const esExenta = tipoDoc === "factura_exenta";
  const netoExento = esExenta ? neto : tipoDoc === "factura_electronica" ? items.reduce((sum, i) => sum + (i.afecto_iva === false ? lineNeto(i) : 0), 0) : 0;
  const netoAfecto = neto - netoExento;
  const iva = esBoleta || esExenta ? 0 : Math.round(netoAfecto * IVA_RATE);
  const retencion = esBoleta ? Math.round(neto * RETENCION_HONORARIOS_RATE) : 0;
  const imptoEspecifico = Math.round(oc.impuesto_especifico ?? 0);
  const totalRaw = (esBoleta ? neto - retencion : netoAfecto + netoExento + iva) + imptoEspecifico;
  const total = ceilTotal(totalRaw, moneda);
  const folioNum = fmtFolio(oc);
  const centroNegocioDisplay = oc.centro_negocio_label || oc.proyecto_nombre.toUpperCase() || "GENERAL";
  const { label: estadoLabel, color: estadoColor } = resolverEstadoLabel(oc.estado);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Document, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.Page, { size: "LETTER", style: s.page, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.headerRow, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Image, { style: s.logo, src: logoBase64 }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.headerCenter, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.empresaNombre, children: EMPRESA.nombre }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.empresaGiro, children: EMPRESA.giro }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.empresaInfo, children: EMPRESA.direccion }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.Text, { style: s.empresaInfo, children: [
          "Telefono: ",
          EMPRESA.telefono
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.Text, { style: s.empresaInfo, children: [
          "Email: ",
          EMPRESA.email
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.folioBox, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.Text, { style: s.folioRut, children: [
          "R.U.T: ",
          EMPRESA.rut
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.folioTitle, children: "Orden de Compra" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.Text, { style: s.folioNumber, children: [
          "Folio N. ",
          folioNum
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.View, { style: [s.estadoBadge, { backgroundColor: estadoColor }], children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.Text, { style: s.estadoText, children: [
          "Estado: ",
          estadoLabel
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.infoBlock, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.infoLeft, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.infoRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.infoLabel, children: "Senor(es):" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.infoValue, children: proveedor.nombre })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.infoRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.infoLabel, children: "Direccion:" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.infoValue, children: proveedor.direccion ?? "--" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.infoRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.infoLabel, children: "Ciudad:" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.infoValue, children: proveedor.ciudad ?? "--" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.infoRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.infoLabel, children: "Despacho:" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.infoValue, children: oc.despacho ?? "--" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.infoRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.infoLabel, children: "Condicion de pago:" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.infoValue, children: fmtCondicionPago(oc.condicion_pago) })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.infoRight, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.infoRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.infoLabelRight, children: "R.U.T.:" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.infoValue, children: proveedor.rut ?? "--" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.infoRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.infoLabelRight, children: "Emision:" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.infoValue, children: fmtFecha(oc.fecha_emision) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.infoRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.infoLabelRight, children: "Recepcion:" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.infoValue, children: fmtFecha(oc.fecha_entrega_prom) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.infoRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.infoLabelRight, children: "Tasa:" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.infoValue, children: "1" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.infoRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.infoLabelRight, children: "Centro de negocio:" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.infoValue, children: centroNegocioDisplay })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.table, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.tableHeader, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: [s.thText, s.colCodigo], children: "CODIGO" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: [s.thText, s.colDescripcion], children: "PRODUCTO O SERVICIO" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: [s.thText, s.colCantidad], children: "CANTIDAD" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: [s.thText, s.colPrecio], children: "PRECIO" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: [s.thText, s.colDescuento], children: "REC/DESC." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: [s.thText, s.colTotal], children: "TOTAL" })
      ] }),
      items.map((item) => {
        const lineTotal = item.precio_total ?? (item.precio_unitario ?? 0) * item.cantidad_pedida;
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.tableRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: [s.tdText, s.colCodigo], children: item.catalogo_general_id ?? (item.material_id != null && item.material_id > 0 ? String(item.material_id) : "") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.Text, { style: [s.tdText, s.colDescripcion], children: [
            item.descripcion_snap,
            tipoDoc === "factura_electronica" && item.afecto_iva === false ? " (EXENTO)" : "",
            item.comentario ? `
${item.comentario}` : ""
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.Text, { style: [s.tdText, s.colCantidad], children: [
            item.cantidad_pedida,
            " ",
            item.unidad_snap ?? "UN"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: [s.tdText, s.colPrecio], children: item.precio_unitario != null ? fmt(item.precio_unitario, moneda) : "--" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: [s.tdText, s.colDescuento] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: [s.tdText, s.colTotal], children: lineTotal > 0 ? fmt(lineTotal, moneda) : "--" })
        ] }, item.id);
      })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.footerRow, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.commentBox, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.commentLabel, children: "Comentario:" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.commentText, children: oc.comentario ?? oc.notas ?? "" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.totalsBox, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.totalRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.totalLabel, children: "SubTotal:" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.totalValue, children: fmt(subtotal, moneda) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.totalRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.totalLabel, children: "Desc/Rec:" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.totalValue, children: zero(moneda) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.totalRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.totalLabel, children: "Neto Afecto:" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.totalValue, children: fmt(netoAfecto, moneda) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.totalRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.totalLabel, children: "Exento:" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.totalValue, children: fmt(netoExento, moneda) })
        ] }),
        esBoleta ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.totalRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.totalLabel, children: "IVA RETENIDO (15.25%):" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.totalValue, children: `${SYMBOL_BY_MONEDA[moneda]} -${fmtNum(retencion, moneda)}` })
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.totalRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.totalLabel, children: "IVA (19%):" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.totalValue, children: fmt(iva, moneda) })
        ] }),
        imptoEspecifico > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.totalRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.totalLabel, children: "Impto. especifico (cod. 28):" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.totalValue, children: fmt(imptoEspecifico, moneda) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.View, { style: s.totalSeparator }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.totalRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: [s.totalLabel, s.totalFinal], children: "Total:" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: [s.totalValue, s.totalFinal], children: fmt(total, moneda) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.signatureBlock, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.signatureLeft, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.signatureLabel, children: "Nombre:" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.signatureLabel, children: "R.U.T:" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.signatureLabel, children: "Recinto:" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.signatureRight, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.signatureLabel, children: "Fecha:" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.signatureLabel, children: "Firma:" })
      ] })
    ] })
  ] }) });
}

// src/pdf/GasolinaPdfDocument.tsx
var import_renderer2 = require("@react-pdf/renderer");
var import_jsx_runtime2 = require("react/jsx-runtime");
import_renderer2.Font.register({
  family: "Helvetica",
  fonts: [
    { src: "Helvetica" },
    { src: "Helvetica-Bold", fontWeight: "bold" }
  ]
});
var s2 = import_renderer2.StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 9, padding: 40, color: "#1a1a1a" },
  headerRow: { flexDirection: "row", marginBottom: 16 },
  logo: { width: 110, height: 35, objectFit: "contain" },
  headerCenter: { flex: 1, paddingLeft: 12 },
  empresaNombre: { fontSize: 11, fontWeight: "bold", marginBottom: 2 },
  empresaGiro: { fontSize: 7, color: "#555", marginBottom: 2 },
  empresaInfo: { fontSize: 8, color: "#333", marginBottom: 1 },
  folioBox: { width: 170, borderWidth: 2, borderColor: "#cc0000", borderStyle: "solid", padding: 10, alignItems: "center", justifyContent: "center" },
  folioRut: { fontSize: 11, fontWeight: "bold", color: "#cc0000", marginBottom: 6 },
  folioTitle: { fontSize: 12, fontWeight: "bold", color: "#cc0000", marginBottom: 4 },
  folioNumber: { fontSize: 11, fontWeight: "bold", color: "#cc0000" },
  estadoBadge: { marginTop: 6, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, alignSelf: "center" },
  estadoText: { fontSize: 9, fontWeight: "bold", color: "#ffffff" },
  infoBlock: { borderWidth: 1, borderColor: "#999", borderStyle: "solid", padding: 8, marginBottom: 10, flexDirection: "row" },
  infoLeft: { flex: 1 },
  infoRight: { width: 200 },
  infoRow: { flexDirection: "row", marginBottom: 2 },
  infoLabel: { fontSize: 8, fontWeight: "bold", width: 95, textAlign: "right", paddingRight: 5 },
  infoValue: { fontSize: 8, flex: 1 },
  infoLabelRight: { fontSize: 8, fontWeight: "bold", width: 100, textAlign: "right", paddingRight: 5 },
  table: { borderWidth: 1, borderColor: "#999", borderStyle: "solid", marginBottom: 10 },
  tableHeader: { flexDirection: "row", backgroundColor: "#f5f5f5", borderBottomWidth: 1, borderBottomColor: "#999", borderBottomStyle: "solid", paddingVertical: 5 },
  tableRow: { flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#ddd", borderBottomStyle: "solid", paddingVertical: 4, minHeight: 20 },
  colCodigo: { width: "12%", paddingLeft: 6 },
  colDescripcion: { width: "33%", paddingLeft: 6 },
  colCantidad: { width: "14%", textAlign: "right", paddingRight: 6 },
  colPrecio: { width: "14%", textAlign: "right", paddingRight: 6 },
  colDescuento: { width: "12%", textAlign: "right", paddingRight: 6 },
  colTotal: { width: "15%", textAlign: "right", paddingRight: 6 },
  thText: { fontSize: 8, fontWeight: "bold" },
  tdText: { fontSize: 8 },
  footerRow: { flexDirection: "row", marginBottom: 16 },
  commentBox: { flex: 1, paddingRight: 20 },
  commentLabel: { fontSize: 8, fontWeight: "bold", marginBottom: 3 },
  commentText: { fontSize: 8, color: "#333" },
  totalsBox: { width: 240, borderWidth: 1, borderColor: "#999", borderStyle: "solid", padding: 8 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  totalLabel: { fontSize: 9, fontWeight: "bold", textAlign: "right", width: 140 },
  totalValue: { fontSize: 9, textAlign: "right", width: 80 },
  totalSeparator: { borderTopWidth: 1, borderTopColor: "#999", borderTopStyle: "solid", marginVertical: 4 },
  totalFinal: { fontSize: 10, fontWeight: "bold" },
  imptoNote: { fontSize: 7, color: "#666", marginTop: 6 },
  signatureBlock: { borderWidth: 1, borderColor: "#999", borderStyle: "solid", padding: 10, marginTop: 20, flexDirection: "row", width: 300, alignSelf: "center" },
  signatureLeft: { flex: 1 },
  signatureRight: { flex: 1 },
  signatureLabel: { fontSize: 8, fontWeight: "bold", marginBottom: 12 }
});
function fmt2(n) {
  return `$ ${Math.round(n).toLocaleString("es-CL")}`;
}
function fmtFecha2(iso) {
  if (!iso) return "--";
  const parts = iso.split("-");
  if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
  return iso;
}
function fmtFolio2(oc) {
  if (oc.folio_global != null) return String(oc.folio_global);
  if (oc.folio_proyecto) return oc.folio_proyecto;
  const parts = oc.numero.split("-");
  return parts[parts.length - 1] ?? oc.numero;
}
function fmtCondicionPago2(value) {
  if (!value) return "--";
  return CONDICION_PAGO_OPTIONS.find((o) => o.value === value)?.label ?? value;
}
function resolverEstadoLabel2(estado) {
  if (estado === "emitida") return { label: "Pendiente", color: "#d97706" };
  if (ESTADOS_APROBADOS.includes(estado)) return { label: "Aprobada", color: "#16a34a" };
  if (estado === "eliminada") return { label: "Eliminada", color: "#dc2626" };
  return { label: "Rechazada", color: "#dc2626" };
}
function GasolinaPdfDocument({ oc, items, proveedor, logoBase64 }) {
  const neto = items.reduce(
    (sum, i) => sum + (i.precio_total ?? (i.precio_unitario ?? 0) * i.cantidad_pedida),
    0
  );
  const totalLitros = items.reduce((sum, i) => sum + i.cantidad_pedida, 0);
  const tasaPorLitro = oc.tasa_impto_especifico_por_litro ?? IMPTO_GASOLINA_POR_LITRO_DEFAULT;
  const iva = Math.round(neto * IVA_RATE);
  const imptoEspecifico = Math.round(totalLitros * tasaPorLitro);
  const total = neto + iva + imptoEspecifico;
  const folioNum = fmtFolio2(oc);
  const centroNegocioDisplay = oc.centro_negocio_label || oc.proyecto_nombre.toUpperCase() || "GENERAL";
  const { label: estadoLabel, color: estadoColor } = resolverEstadoLabel2(oc.estado);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Document, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.Page, { size: "LETTER", style: s2.page, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.View, { style: s2.headerRow, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Image, { style: s2.logo, src: logoBase64 }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.View, { style: s2.headerCenter, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.empresaNombre, children: EMPRESA.nombre }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.empresaGiro, children: EMPRESA.giro }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.empresaInfo, children: EMPRESA.direccion }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.Text, { style: s2.empresaInfo, children: [
          "Telefono: ",
          EMPRESA.telefono
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.Text, { style: s2.empresaInfo, children: [
          "Email: ",
          EMPRESA.email
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.View, { style: s2.folioBox, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.Text, { style: s2.folioRut, children: [
          "R.U.T: ",
          EMPRESA.rut
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.folioTitle, children: "Orden de Compra" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.Text, { style: s2.folioNumber, children: [
          "Folio N. ",
          folioNum
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.View, { style: [s2.estadoBadge, { backgroundColor: estadoColor }], children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.Text, { style: s2.estadoText, children: [
          "Estado: ",
          estadoLabel
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.View, { style: s2.infoBlock, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.View, { style: s2.infoLeft, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.View, { style: s2.infoRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.infoLabel, children: "Senor(es):" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.infoValue, children: proveedor.nombre })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.View, { style: s2.infoRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.infoLabel, children: "Direccion:" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.infoValue, children: proveedor.direccion ?? "--" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.View, { style: s2.infoRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.infoLabel, children: "Ciudad:" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.infoValue, children: proveedor.ciudad ?? "--" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.View, { style: s2.infoRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.infoLabel, children: "Despacho:" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.infoValue, children: oc.despacho ?? "--" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.View, { style: s2.infoRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.infoLabel, children: "Condicion de pago:" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.infoValue, children: fmtCondicionPago2(oc.condicion_pago) })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.View, { style: s2.infoRight, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.View, { style: s2.infoRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.infoLabelRight, children: "R.U.T.:" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.infoValue, children: proveedor.rut ?? "--" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.View, { style: s2.infoRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.infoLabelRight, children: "Emision:" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.infoValue, children: fmtFecha2(oc.fecha_emision) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.View, { style: s2.infoRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.infoLabelRight, children: "Recepcion:" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.infoValue, children: fmtFecha2(oc.fecha_entrega_prom) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.View, { style: s2.infoRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.infoLabelRight, children: "Tasa:" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.infoValue, children: "1" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.View, { style: s2.infoRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.infoLabelRight, children: "Centro de negocio:" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.infoValue, children: centroNegocioDisplay })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.View, { style: s2.table, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.View, { style: s2.tableHeader, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: [s2.thText, s2.colCodigo], children: "CODIGO" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: [s2.thText, s2.colDescripcion], children: "PRODUCTO" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: [s2.thText, s2.colCantidad], children: "LITROS" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: [s2.thText, s2.colPrecio], children: "P. NETO/LT" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: [s2.thText, s2.colDescuento], children: "REC/DESC." }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: [s2.thText, s2.colTotal], children: "NETO TOTAL" })
      ] }),
      items.map((item) => {
        const lineTotal = item.precio_total ?? (item.precio_unitario ?? 0) * item.cantidad_pedida;
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.View, { style: s2.tableRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: [s2.tdText, s2.colCodigo], children: item.catalogo_general_id ?? (item.material_id != null && item.material_id > 0 ? String(item.material_id) : "") }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.Text, { style: [s2.tdText, s2.colDescripcion], children: [
            item.descripcion_snap,
            item.comentario ? `
${item.comentario}` : ""
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.Text, { style: [s2.tdText, s2.colCantidad], children: [
            item.cantidad_pedida,
            " L"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: [s2.tdText, s2.colPrecio], children: item.precio_unitario != null ? fmt2(item.precio_unitario) : "--" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: [s2.tdText, s2.colDescuento] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: [s2.tdText, s2.colTotal], children: lineTotal > 0 ? fmt2(lineTotal) : "--" })
        ] }, item.id);
      })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.View, { style: s2.footerRow, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.View, { style: s2.commentBox, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.commentLabel, children: "Comentario:" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.commentText, children: oc.comentario ?? oc.notas ?? "" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.Text, { style: s2.imptoNote, children: [
          "* Impto. Especifico Combustibles (Ley 18.502): $ ",
          Math.round(tasaPorLitro).toLocaleString("es-CL"),
          " / litro",
          "\n",
          "* Total litros: ",
          totalLitros.toLocaleString("es-CL"),
          " L"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.View, { style: s2.totalsBox, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.View, { style: s2.totalRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.totalLabel, children: "Neto:" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.totalValue, children: fmt2(neto) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.View, { style: s2.totalRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.totalLabel, children: "IVA (19%):" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.totalValue, children: fmt2(iva) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.View, { style: s2.totalRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.Text, { style: s2.totalLabel, children: [
            "Impto. Especifico (",
            totalLitros.toLocaleString("es-CL"),
            " L x $ ",
            Math.round(tasaPorLitro).toLocaleString("es-CL"),
            "):"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.totalValue, children: fmt2(imptoEspecifico) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.View, { style: s2.totalSeparator }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.View, { style: s2.totalRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: [s2.totalLabel, s2.totalFinal], children: "Total:" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: [s2.totalValue, s2.totalFinal], children: fmt2(total) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.View, { style: s2.signatureBlock, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.View, { style: s2.signatureLeft, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.signatureLabel, children: "Nombre:" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.signatureLabel, children: "R.U.T:" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.signatureLabel, children: "Recinto:" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_renderer2.View, { style: s2.signatureRight, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.signatureLabel, children: "Fecha:" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_renderer2.Text, { style: s2.signatureLabel, children: "Firma:" })
      ] })
    ] })
  ] }) });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AGRUPACION_OPTIONS,
  CENTRO_NEGOCIO_OPTIONS,
  CONDICION_PAGO_OPTIONS,
  CONDICION_PAGO_OPTIONS_TYPED,
  EMPRESA,
  ESTADOS_APROBADOS,
  GasolinaPdfDocument,
  IMPTO_GASOLINA_POR_LITRO_DEFAULT,
  IVA_RATE,
  MONEDA_OPTIONS,
  OcPdfDocument,
  RETENCION_HONORARIOS_RATE,
  TIPO_CREACION_OPTIONS,
  TIPO_DOCUMENTO_OPTIONS
});
