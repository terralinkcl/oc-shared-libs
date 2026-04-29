import {
  CONDICION_PAGO_OPTIONS,
  EMPRESA,
  ESTADOS_APROBADOS,
  IMPTO_GASOLINA_POR_LITRO_DEFAULT,
  IVA_RATE,
  RETENCION_HONORARIOS_RATE
} from "./chunk-UDBOEGAO.mjs";

// src/pdf/OcPdfDocument.tsx
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font
} from "@react-pdf/renderer";
import { jsx, jsxs } from "react/jsx-runtime";
Font.register({
  family: "Helvetica",
  fonts: [
    { src: "Helvetica" },
    { src: "Helvetica-Bold", fontWeight: "bold" }
  ]
});
var s = StyleSheet.create({
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
  const subtotal = items.reduce(
    (sum, i) => sum + (i.precio_total ?? (i.precio_unitario ?? 0) * i.cantidad_pedida),
    0
  );
  const neto = subtotal;
  const moneda = oc.moneda ?? "clp";
  const tipoDoc = oc.tipo_documento ?? (oc.condicion_pago === "contra_boleta_honorarios" ? "boleta_honorarios" : "factura_electronica");
  const esBoleta = tipoDoc === "boleta_honorarios";
  const esExenta = tipoDoc === "factura_exenta";
  const iva = esBoleta || esExenta ? 0 : Math.round(neto * IVA_RATE);
  const retencion = esBoleta ? Math.round(neto * RETENCION_HONORARIOS_RATE) : 0;
  const totalRaw = esBoleta ? neto - retencion : neto + iva;
  const total = ceilTotal(totalRaw, moneda);
  const folioNum = fmtFolio(oc);
  const centroNegocioDisplay = oc.centro_negocio_label || oc.proyecto_nombre.toUpperCase() || "GENERAL";
  const { label: estadoLabel, color: estadoColor } = resolverEstadoLabel(oc.estado);
  return /* @__PURE__ */ jsx(Document, { children: /* @__PURE__ */ jsxs(Page, { size: "LETTER", style: s.page, children: [
    /* @__PURE__ */ jsxs(View, { style: s.headerRow, children: [
      /* @__PURE__ */ jsx(Image, { style: s.logo, src: logoBase64 }),
      /* @__PURE__ */ jsxs(View, { style: s.headerCenter, children: [
        /* @__PURE__ */ jsx(Text, { style: s.empresaNombre, children: EMPRESA.nombre }),
        /* @__PURE__ */ jsx(Text, { style: s.empresaGiro, children: EMPRESA.giro }),
        /* @__PURE__ */ jsx(Text, { style: s.empresaInfo, children: EMPRESA.direccion }),
        /* @__PURE__ */ jsxs(Text, { style: s.empresaInfo, children: [
          "Telefono: ",
          EMPRESA.telefono
        ] }),
        /* @__PURE__ */ jsxs(Text, { style: s.empresaInfo, children: [
          "Email: ",
          EMPRESA.email
        ] })
      ] }),
      /* @__PURE__ */ jsxs(View, { style: s.folioBox, children: [
        /* @__PURE__ */ jsxs(Text, { style: s.folioRut, children: [
          "R.U.T: ",
          EMPRESA.rut
        ] }),
        /* @__PURE__ */ jsx(Text, { style: s.folioTitle, children: "Orden de Compra" }),
        /* @__PURE__ */ jsxs(Text, { style: s.folioNumber, children: [
          "Folio N. ",
          folioNum
        ] }),
        /* @__PURE__ */ jsx(View, { style: [s.estadoBadge, { backgroundColor: estadoColor }], children: /* @__PURE__ */ jsxs(Text, { style: s.estadoText, children: [
          "Estado: ",
          estadoLabel
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(View, { style: s.infoBlock, children: [
      /* @__PURE__ */ jsxs(View, { style: s.infoLeft, children: [
        /* @__PURE__ */ jsxs(View, { style: s.infoRow, children: [
          /* @__PURE__ */ jsx(Text, { style: s.infoLabel, children: "Senor(es):" }),
          /* @__PURE__ */ jsx(Text, { style: s.infoValue, children: proveedor.nombre })
        ] }),
        /* @__PURE__ */ jsxs(View, { style: s.infoRow, children: [
          /* @__PURE__ */ jsx(Text, { style: s.infoLabel, children: "Direccion:" }),
          /* @__PURE__ */ jsx(Text, { style: s.infoValue, children: proveedor.direccion ?? "--" })
        ] }),
        /* @__PURE__ */ jsxs(View, { style: s.infoRow, children: [
          /* @__PURE__ */ jsx(Text, { style: s.infoLabel, children: "Ciudad:" }),
          /* @__PURE__ */ jsx(Text, { style: s.infoValue, children: proveedor.ciudad ?? "--" })
        ] }),
        /* @__PURE__ */ jsxs(View, { style: s.infoRow, children: [
          /* @__PURE__ */ jsx(Text, { style: s.infoLabel, children: "Despacho:" }),
          /* @__PURE__ */ jsx(Text, { style: s.infoValue, children: oc.despacho ?? "--" })
        ] }),
        /* @__PURE__ */ jsxs(View, { style: s.infoRow, children: [
          /* @__PURE__ */ jsx(Text, { style: s.infoLabel, children: "Condicion de pago:" }),
          /* @__PURE__ */ jsx(Text, { style: s.infoValue, children: fmtCondicionPago(oc.condicion_pago) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(View, { style: s.infoRight, children: [
        /* @__PURE__ */ jsxs(View, { style: s.infoRow, children: [
          /* @__PURE__ */ jsx(Text, { style: s.infoLabelRight, children: "R.U.T.:" }),
          /* @__PURE__ */ jsx(Text, { style: s.infoValue, children: proveedor.rut ?? "--" })
        ] }),
        /* @__PURE__ */ jsxs(View, { style: s.infoRow, children: [
          /* @__PURE__ */ jsx(Text, { style: s.infoLabelRight, children: "Emision:" }),
          /* @__PURE__ */ jsx(Text, { style: s.infoValue, children: fmtFecha(oc.fecha_emision) })
        ] }),
        /* @__PURE__ */ jsxs(View, { style: s.infoRow, children: [
          /* @__PURE__ */ jsx(Text, { style: s.infoLabelRight, children: "Recepcion:" }),
          /* @__PURE__ */ jsx(Text, { style: s.infoValue, children: fmtFecha(oc.fecha_entrega_prom) })
        ] }),
        /* @__PURE__ */ jsxs(View, { style: s.infoRow, children: [
          /* @__PURE__ */ jsx(Text, { style: s.infoLabelRight, children: "Tasa:" }),
          /* @__PURE__ */ jsx(Text, { style: s.infoValue, children: "1" })
        ] }),
        /* @__PURE__ */ jsxs(View, { style: s.infoRow, children: [
          /* @__PURE__ */ jsx(Text, { style: s.infoLabelRight, children: "Centro de negocio:" }),
          /* @__PURE__ */ jsx(Text, { style: s.infoValue, children: centroNegocioDisplay })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(View, { style: s.table, children: [
      /* @__PURE__ */ jsxs(View, { style: s.tableHeader, children: [
        /* @__PURE__ */ jsx(Text, { style: [s.thText, s.colCodigo], children: "CODIGO" }),
        /* @__PURE__ */ jsx(Text, { style: [s.thText, s.colDescripcion], children: "PRODUCTO O SERVICIO" }),
        /* @__PURE__ */ jsx(Text, { style: [s.thText, s.colCantidad], children: "CANTIDAD" }),
        /* @__PURE__ */ jsx(Text, { style: [s.thText, s.colPrecio], children: "PRECIO" }),
        /* @__PURE__ */ jsx(Text, { style: [s.thText, s.colDescuento], children: "REC/DESC." }),
        /* @__PURE__ */ jsx(Text, { style: [s.thText, s.colTotal], children: "TOTAL" })
      ] }),
      items.map((item) => {
        const lineTotal = item.precio_total ?? (item.precio_unitario ?? 0) * item.cantidad_pedida;
        return /* @__PURE__ */ jsxs(View, { style: s.tableRow, children: [
          /* @__PURE__ */ jsx(Text, { style: [s.tdText, s.colCodigo], children: item.catalogo_general_id ?? (item.material_id != null && item.material_id > 0 ? String(item.material_id) : "") }),
          /* @__PURE__ */ jsxs(Text, { style: [s.tdText, s.colDescripcion], children: [
            item.descripcion_snap,
            item.comentario ? `
${item.comentario}` : ""
          ] }),
          /* @__PURE__ */ jsxs(Text, { style: [s.tdText, s.colCantidad], children: [
            item.cantidad_pedida,
            " ",
            item.unidad_snap ?? "UN"
          ] }),
          /* @__PURE__ */ jsx(Text, { style: [s.tdText, s.colPrecio], children: item.precio_unitario != null ? fmt(item.precio_unitario, moneda) : "--" }),
          /* @__PURE__ */ jsx(Text, { style: [s.tdText, s.colDescuento] }),
          /* @__PURE__ */ jsx(Text, { style: [s.tdText, s.colTotal], children: lineTotal > 0 ? fmt(lineTotal, moneda) : "--" })
        ] }, item.id);
      })
    ] }),
    /* @__PURE__ */ jsxs(View, { style: s.footerRow, children: [
      /* @__PURE__ */ jsxs(View, { style: s.commentBox, children: [
        /* @__PURE__ */ jsx(Text, { style: s.commentLabel, children: "Comentario:" }),
        /* @__PURE__ */ jsx(Text, { style: s.commentText, children: oc.comentario ?? oc.notas ?? "" })
      ] }),
      /* @__PURE__ */ jsxs(View, { style: s.totalsBox, children: [
        /* @__PURE__ */ jsxs(View, { style: s.totalRow, children: [
          /* @__PURE__ */ jsx(Text, { style: s.totalLabel, children: "SubTotal:" }),
          /* @__PURE__ */ jsx(Text, { style: s.totalValue, children: fmt(subtotal, moneda) })
        ] }),
        /* @__PURE__ */ jsxs(View, { style: s.totalRow, children: [
          /* @__PURE__ */ jsx(Text, { style: s.totalLabel, children: "Desc/Rec:" }),
          /* @__PURE__ */ jsx(Text, { style: s.totalValue, children: zero(moneda) })
        ] }),
        /* @__PURE__ */ jsxs(View, { style: s.totalRow, children: [
          /* @__PURE__ */ jsx(Text, { style: s.totalLabel, children: "Neto:" }),
          /* @__PURE__ */ jsx(Text, { style: s.totalValue, children: esExenta ? zero(moneda) : fmt(neto, moneda) })
        ] }),
        /* @__PURE__ */ jsxs(View, { style: s.totalRow, children: [
          /* @__PURE__ */ jsx(Text, { style: s.totalLabel, children: "Exento:" }),
          /* @__PURE__ */ jsx(Text, { style: s.totalValue, children: esExenta ? fmt(neto, moneda) : zero(moneda) })
        ] }),
        esBoleta ? /* @__PURE__ */ jsxs(View, { style: s.totalRow, children: [
          /* @__PURE__ */ jsx(Text, { style: s.totalLabel, children: "IVA RETENIDO (15.25%):" }),
          /* @__PURE__ */ jsx(Text, { style: s.totalValue, children: `${SYMBOL_BY_MONEDA[moneda]} -${fmtNum(retencion, moneda)}` })
        ] }) : esExenta ? /* @__PURE__ */ jsxs(View, { style: s.totalRow, children: [
          /* @__PURE__ */ jsx(Text, { style: s.totalLabel, children: "IVA:" }),
          /* @__PURE__ */ jsx(Text, { style: s.totalValue, children: zero(moneda) })
        ] }) : /* @__PURE__ */ jsxs(View, { style: s.totalRow, children: [
          /* @__PURE__ */ jsx(Text, { style: s.totalLabel, children: "IVA (19%):" }),
          /* @__PURE__ */ jsx(Text, { style: s.totalValue, children: fmt(iva, moneda) })
        ] }),
        /* @__PURE__ */ jsx(View, { style: s.totalSeparator }),
        /* @__PURE__ */ jsxs(View, { style: s.totalRow, children: [
          /* @__PURE__ */ jsx(Text, { style: [s.totalLabel, s.totalFinal], children: "Total:" }),
          /* @__PURE__ */ jsx(Text, { style: [s.totalValue, s.totalFinal], children: fmt(total, moneda) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(View, { style: s.signatureBlock, children: [
      /* @__PURE__ */ jsxs(View, { style: s.signatureLeft, children: [
        /* @__PURE__ */ jsx(Text, { style: s.signatureLabel, children: "Nombre:" }),
        /* @__PURE__ */ jsx(Text, { style: s.signatureLabel, children: "R.U.T:" }),
        /* @__PURE__ */ jsx(Text, { style: s.signatureLabel, children: "Recinto:" })
      ] }),
      /* @__PURE__ */ jsxs(View, { style: s.signatureRight, children: [
        /* @__PURE__ */ jsx(Text, { style: s.signatureLabel, children: "Fecha:" }),
        /* @__PURE__ */ jsx(Text, { style: s.signatureLabel, children: "Firma:" })
      ] })
    ] })
  ] }) });
}

// src/pdf/GasolinaPdfDocument.tsx
import {
  Document as Document2,
  Page as Page2,
  Text as Text2,
  View as View2,
  Image as Image2,
  StyleSheet as StyleSheet2,
  Font as Font2
} from "@react-pdf/renderer";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
Font2.register({
  family: "Helvetica",
  fonts: [
    { src: "Helvetica" },
    { src: "Helvetica-Bold", fontWeight: "bold" }
  ]
});
var s2 = StyleSheet2.create({
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
  return /* @__PURE__ */ jsx2(Document2, { children: /* @__PURE__ */ jsxs2(Page2, { size: "LETTER", style: s2.page, children: [
    /* @__PURE__ */ jsxs2(View2, { style: s2.headerRow, children: [
      /* @__PURE__ */ jsx2(Image2, { style: s2.logo, src: logoBase64 }),
      /* @__PURE__ */ jsxs2(View2, { style: s2.headerCenter, children: [
        /* @__PURE__ */ jsx2(Text2, { style: s2.empresaNombre, children: EMPRESA.nombre }),
        /* @__PURE__ */ jsx2(Text2, { style: s2.empresaGiro, children: EMPRESA.giro }),
        /* @__PURE__ */ jsx2(Text2, { style: s2.empresaInfo, children: EMPRESA.direccion }),
        /* @__PURE__ */ jsxs2(Text2, { style: s2.empresaInfo, children: [
          "Telefono: ",
          EMPRESA.telefono
        ] }),
        /* @__PURE__ */ jsxs2(Text2, { style: s2.empresaInfo, children: [
          "Email: ",
          EMPRESA.email
        ] })
      ] }),
      /* @__PURE__ */ jsxs2(View2, { style: s2.folioBox, children: [
        /* @__PURE__ */ jsxs2(Text2, { style: s2.folioRut, children: [
          "R.U.T: ",
          EMPRESA.rut
        ] }),
        /* @__PURE__ */ jsx2(Text2, { style: s2.folioTitle, children: "Orden de Compra" }),
        /* @__PURE__ */ jsxs2(Text2, { style: s2.folioNumber, children: [
          "Folio N. ",
          folioNum
        ] }),
        /* @__PURE__ */ jsx2(View2, { style: [s2.estadoBadge, { backgroundColor: estadoColor }], children: /* @__PURE__ */ jsxs2(Text2, { style: s2.estadoText, children: [
          "Estado: ",
          estadoLabel
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2(View2, { style: s2.infoBlock, children: [
      /* @__PURE__ */ jsxs2(View2, { style: s2.infoLeft, children: [
        /* @__PURE__ */ jsxs2(View2, { style: s2.infoRow, children: [
          /* @__PURE__ */ jsx2(Text2, { style: s2.infoLabel, children: "Senor(es):" }),
          /* @__PURE__ */ jsx2(Text2, { style: s2.infoValue, children: proveedor.nombre })
        ] }),
        /* @__PURE__ */ jsxs2(View2, { style: s2.infoRow, children: [
          /* @__PURE__ */ jsx2(Text2, { style: s2.infoLabel, children: "Direccion:" }),
          /* @__PURE__ */ jsx2(Text2, { style: s2.infoValue, children: proveedor.direccion ?? "--" })
        ] }),
        /* @__PURE__ */ jsxs2(View2, { style: s2.infoRow, children: [
          /* @__PURE__ */ jsx2(Text2, { style: s2.infoLabel, children: "Ciudad:" }),
          /* @__PURE__ */ jsx2(Text2, { style: s2.infoValue, children: proveedor.ciudad ?? "--" })
        ] }),
        /* @__PURE__ */ jsxs2(View2, { style: s2.infoRow, children: [
          /* @__PURE__ */ jsx2(Text2, { style: s2.infoLabel, children: "Despacho:" }),
          /* @__PURE__ */ jsx2(Text2, { style: s2.infoValue, children: oc.despacho ?? "--" })
        ] }),
        /* @__PURE__ */ jsxs2(View2, { style: s2.infoRow, children: [
          /* @__PURE__ */ jsx2(Text2, { style: s2.infoLabel, children: "Condicion de pago:" }),
          /* @__PURE__ */ jsx2(Text2, { style: s2.infoValue, children: fmtCondicionPago2(oc.condicion_pago) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs2(View2, { style: s2.infoRight, children: [
        /* @__PURE__ */ jsxs2(View2, { style: s2.infoRow, children: [
          /* @__PURE__ */ jsx2(Text2, { style: s2.infoLabelRight, children: "R.U.T.:" }),
          /* @__PURE__ */ jsx2(Text2, { style: s2.infoValue, children: proveedor.rut ?? "--" })
        ] }),
        /* @__PURE__ */ jsxs2(View2, { style: s2.infoRow, children: [
          /* @__PURE__ */ jsx2(Text2, { style: s2.infoLabelRight, children: "Emision:" }),
          /* @__PURE__ */ jsx2(Text2, { style: s2.infoValue, children: fmtFecha2(oc.fecha_emision) })
        ] }),
        /* @__PURE__ */ jsxs2(View2, { style: s2.infoRow, children: [
          /* @__PURE__ */ jsx2(Text2, { style: s2.infoLabelRight, children: "Recepcion:" }),
          /* @__PURE__ */ jsx2(Text2, { style: s2.infoValue, children: fmtFecha2(oc.fecha_entrega_prom) })
        ] }),
        /* @__PURE__ */ jsxs2(View2, { style: s2.infoRow, children: [
          /* @__PURE__ */ jsx2(Text2, { style: s2.infoLabelRight, children: "Tasa:" }),
          /* @__PURE__ */ jsx2(Text2, { style: s2.infoValue, children: "1" })
        ] }),
        /* @__PURE__ */ jsxs2(View2, { style: s2.infoRow, children: [
          /* @__PURE__ */ jsx2(Text2, { style: s2.infoLabelRight, children: "Centro de negocio:" }),
          /* @__PURE__ */ jsx2(Text2, { style: s2.infoValue, children: centroNegocioDisplay })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2(View2, { style: s2.table, children: [
      /* @__PURE__ */ jsxs2(View2, { style: s2.tableHeader, children: [
        /* @__PURE__ */ jsx2(Text2, { style: [s2.thText, s2.colCodigo], children: "CODIGO" }),
        /* @__PURE__ */ jsx2(Text2, { style: [s2.thText, s2.colDescripcion], children: "PRODUCTO" }),
        /* @__PURE__ */ jsx2(Text2, { style: [s2.thText, s2.colCantidad], children: "LITROS" }),
        /* @__PURE__ */ jsx2(Text2, { style: [s2.thText, s2.colPrecio], children: "P. NETO/LT" }),
        /* @__PURE__ */ jsx2(Text2, { style: [s2.thText, s2.colDescuento], children: "REC/DESC." }),
        /* @__PURE__ */ jsx2(Text2, { style: [s2.thText, s2.colTotal], children: "NETO TOTAL" })
      ] }),
      items.map((item) => {
        const lineTotal = item.precio_total ?? (item.precio_unitario ?? 0) * item.cantidad_pedida;
        return /* @__PURE__ */ jsxs2(View2, { style: s2.tableRow, children: [
          /* @__PURE__ */ jsx2(Text2, { style: [s2.tdText, s2.colCodigo], children: item.catalogo_general_id ?? (item.material_id != null && item.material_id > 0 ? String(item.material_id) : "") }),
          /* @__PURE__ */ jsxs2(Text2, { style: [s2.tdText, s2.colDescripcion], children: [
            item.descripcion_snap,
            item.comentario ? `
${item.comentario}` : ""
          ] }),
          /* @__PURE__ */ jsxs2(Text2, { style: [s2.tdText, s2.colCantidad], children: [
            item.cantidad_pedida,
            " L"
          ] }),
          /* @__PURE__ */ jsx2(Text2, { style: [s2.tdText, s2.colPrecio], children: item.precio_unitario != null ? fmt2(item.precio_unitario) : "--" }),
          /* @__PURE__ */ jsx2(Text2, { style: [s2.tdText, s2.colDescuento] }),
          /* @__PURE__ */ jsx2(Text2, { style: [s2.tdText, s2.colTotal], children: lineTotal > 0 ? fmt2(lineTotal) : "--" })
        ] }, item.id);
      })
    ] }),
    /* @__PURE__ */ jsxs2(View2, { style: s2.footerRow, children: [
      /* @__PURE__ */ jsxs2(View2, { style: s2.commentBox, children: [
        /* @__PURE__ */ jsx2(Text2, { style: s2.commentLabel, children: "Comentario:" }),
        /* @__PURE__ */ jsx2(Text2, { style: s2.commentText, children: oc.comentario ?? oc.notas ?? "" }),
        /* @__PURE__ */ jsxs2(Text2, { style: s2.imptoNote, children: [
          "* Impto. Especifico Combustibles (Ley 18.502): $ ",
          Math.round(tasaPorLitro).toLocaleString("es-CL"),
          " / litro",
          "\n",
          "* Total litros: ",
          totalLitros.toLocaleString("es-CL"),
          " L"
        ] })
      ] }),
      /* @__PURE__ */ jsxs2(View2, { style: s2.totalsBox, children: [
        /* @__PURE__ */ jsxs2(View2, { style: s2.totalRow, children: [
          /* @__PURE__ */ jsx2(Text2, { style: s2.totalLabel, children: "Neto:" }),
          /* @__PURE__ */ jsx2(Text2, { style: s2.totalValue, children: fmt2(neto) })
        ] }),
        /* @__PURE__ */ jsxs2(View2, { style: s2.totalRow, children: [
          /* @__PURE__ */ jsx2(Text2, { style: s2.totalLabel, children: "IVA (19%):" }),
          /* @__PURE__ */ jsx2(Text2, { style: s2.totalValue, children: fmt2(iva) })
        ] }),
        /* @__PURE__ */ jsxs2(View2, { style: s2.totalRow, children: [
          /* @__PURE__ */ jsxs2(Text2, { style: s2.totalLabel, children: [
            "Impto. Especifico (",
            totalLitros.toLocaleString("es-CL"),
            " L x $ ",
            Math.round(tasaPorLitro).toLocaleString("es-CL"),
            "):"
          ] }),
          /* @__PURE__ */ jsx2(Text2, { style: s2.totalValue, children: fmt2(imptoEspecifico) })
        ] }),
        /* @__PURE__ */ jsx2(View2, { style: s2.totalSeparator }),
        /* @__PURE__ */ jsxs2(View2, { style: s2.totalRow, children: [
          /* @__PURE__ */ jsx2(Text2, { style: [s2.totalLabel, s2.totalFinal], children: "Total:" }),
          /* @__PURE__ */ jsx2(Text2, { style: [s2.totalValue, s2.totalFinal], children: fmt2(total) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2(View2, { style: s2.signatureBlock, children: [
      /* @__PURE__ */ jsxs2(View2, { style: s2.signatureLeft, children: [
        /* @__PURE__ */ jsx2(Text2, { style: s2.signatureLabel, children: "Nombre:" }),
        /* @__PURE__ */ jsx2(Text2, { style: s2.signatureLabel, children: "R.U.T:" }),
        /* @__PURE__ */ jsx2(Text2, { style: s2.signatureLabel, children: "Recinto:" })
      ] }),
      /* @__PURE__ */ jsxs2(View2, { style: s2.signatureRight, children: [
        /* @__PURE__ */ jsx2(Text2, { style: s2.signatureLabel, children: "Fecha:" }),
        /* @__PURE__ */ jsx2(Text2, { style: s2.signatureLabel, children: "Firma:" })
      ] })
    ] })
  ] }) });
}

export {
  OcPdfDocument,
  GasolinaPdfDocument
};
