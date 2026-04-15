import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { OcParaPdf, OcItemParaPdf, ProveedorParaPdf } from "../types";
import {
  IVA_RATE,
  RETENCION_HONORARIOS_RATE,
  CONDICION_PAGO_OPTIONS,
  ESTADOS_APROBADOS,
  EMPRESA,
} from "../constants";

Font.register({
  family: "Helvetica",
  fonts: [
    { src: "Helvetica" },
    { src: "Helvetica-Bold", fontWeight: "bold" },
  ],
});

const s = StyleSheet.create({
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
  signatureLabel: { fontSize: 8, fontWeight: "bold", marginBottom: 12 },
});

function fmt(n: number): string {
  return `$ ${Math.round(n).toLocaleString("es-CL")}`;
}

function fmtFecha(iso: string | null | undefined): string {
  if (!iso) return "--";
  const parts = iso.split("-");
  if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
  return iso;
}

function fmtFolio(oc: OcParaPdf): string {
  if (oc.folio_global != null) return String(oc.folio_global);
  if (oc.folio_proyecto) return oc.folio_proyecto;
  const parts = oc.numero.split("-");
  return parts[parts.length - 1] ?? oc.numero;
}

function fmtCondicionPago(value: string | null | undefined): string {
  if (!value) return "--";
  return CONDICION_PAGO_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

function resolverEstadoLabel(estado: string): { label: string; color: string } {
  if (estado === "emitida") return { label: "Pendiente", color: "#d97706" };
  if (ESTADOS_APROBADOS.includes(estado)) return { label: "Aprobada", color: "#16a34a" };
  if (estado === "eliminada") return { label: "Eliminada", color: "#dc2626" };
  return { label: "Rechazada", color: "#dc2626" };
}

export interface OcPdfDocumentProps {
  oc: OcParaPdf;
  items: OcItemParaPdf[];
  proveedor: ProveedorParaPdf;
  logoBase64: string;
}

export function OcPdfDocument({ oc, items, proveedor, logoBase64 }: OcPdfDocumentProps) {
  const subtotal = items.reduce(
    (sum, i) => sum + (i.precio_total ?? (i.precio_unitario ?? 0) * i.cantidad_pedida),
    0
  );
  const neto = subtotal;

  // Fallback para OCs antiguas sin tipo_documento
  const tipoDoc = oc.tipo_documento ?? (oc.condicion_pago === "contra_boleta_honorarios" ? "boleta_honorarios" : "factura_electronica");
  const esBoleta = tipoDoc === "boleta_honorarios";
  const esExenta = tipoDoc === "factura_exenta";
  const iva = (esBoleta || esExenta) ? 0 : Math.round(neto * IVA_RATE);
  const retencion = esBoleta ? Math.round(neto * RETENCION_HONORARIOS_RATE) : 0;
  const total = esBoleta ? neto - retencion : neto + iva;

  const folioNum = fmtFolio(oc);
  const centroNegocioDisplay = oc.centro_negocio_label || oc.proyecto_nombre.toUpperCase() || "GENERAL";
  const { label: estadoLabel, color: estadoColor } = resolverEstadoLabel(oc.estado);

  return (
    <Document>
      <Page size="LETTER" style={s.page}>
        {/* Header */}
        <View style={s.headerRow}>
          <Image style={s.logo} src={logoBase64} />
          <View style={s.headerCenter}>
            <Text style={s.empresaNombre}>{EMPRESA.nombre}</Text>
            <Text style={s.empresaGiro}>{EMPRESA.giro}</Text>
            <Text style={s.empresaInfo}>{EMPRESA.direccion}</Text>
            <Text style={s.empresaInfo}>Telefono: {EMPRESA.telefono}</Text>
            <Text style={s.empresaInfo}>Email: {EMPRESA.email}</Text>
          </View>
          <View style={s.folioBox}>
            <Text style={s.folioRut}>R.U.T: {EMPRESA.rut}</Text>
            <Text style={s.folioTitle}>Orden de Compra</Text>
            <Text style={s.folioNumber}>Folio N. {folioNum}</Text>
            <View style={[s.estadoBadge, { backgroundColor: estadoColor }]}>
              <Text style={s.estadoText}>Estado: {estadoLabel}</Text>
            </View>
          </View>
        </View>

        {/* Info proveedor + OC */}
        <View style={s.infoBlock}>
          <View style={s.infoLeft}>
            <View style={s.infoRow}><Text style={s.infoLabel}>Senor(es):</Text><Text style={s.infoValue}>{proveedor.nombre}</Text></View>
            <View style={s.infoRow}><Text style={s.infoLabel}>Direccion:</Text><Text style={s.infoValue}>{proveedor.direccion ?? "--"}</Text></View>
            <View style={s.infoRow}><Text style={s.infoLabel}>Ciudad:</Text><Text style={s.infoValue}>{proveedor.ciudad ?? "--"}</Text></View>
            <View style={s.infoRow}><Text style={s.infoLabel}>Despacho:</Text><Text style={s.infoValue}>{oc.despacho ?? "--"}</Text></View>
            <View style={s.infoRow}><Text style={s.infoLabel}>Condicion de pago:</Text><Text style={s.infoValue}>{fmtCondicionPago(oc.condicion_pago)}</Text></View>
          </View>
          <View style={s.infoRight}>
            <View style={s.infoRow}><Text style={s.infoLabelRight}>R.U.T.:</Text><Text style={s.infoValue}>{proveedor.rut ?? "--"}</Text></View>
            <View style={s.infoRow}><Text style={s.infoLabelRight}>Emision:</Text><Text style={s.infoValue}>{fmtFecha(oc.fecha_emision)}</Text></View>
            <View style={s.infoRow}><Text style={s.infoLabelRight}>Recepcion:</Text><Text style={s.infoValue}>{fmtFecha(oc.fecha_entrega_prom)}</Text></View>
            <View style={s.infoRow}><Text style={s.infoLabelRight}>Tasa:</Text><Text style={s.infoValue}>1</Text></View>
            <View style={s.infoRow}><Text style={s.infoLabelRight}>Centro de negocio:</Text><Text style={s.infoValue}>{centroNegocioDisplay}</Text></View>
          </View>
        </View>

        {/* Tabla items */}
        <View style={s.table}>
          <View style={s.tableHeader}>
            <Text style={[s.thText, s.colCodigo]}>CODIGO</Text>
            <Text style={[s.thText, s.colDescripcion]}>PRODUCTO O SERVICIO</Text>
            <Text style={[s.thText, s.colCantidad]}>CANTIDAD</Text>
            <Text style={[s.thText, s.colPrecio]}>PRECIO</Text>
            <Text style={[s.thText, s.colDescuento]}>REC/DESC.</Text>
            <Text style={[s.thText, s.colTotal]}>TOTAL</Text>
          </View>
          {items.map((item) => {
            const lineTotal = item.precio_total ?? (item.precio_unitario ?? 0) * item.cantidad_pedida;
            return (
              <View key={item.id} style={s.tableRow}>
                <Text style={[s.tdText, s.colCodigo]}>
                  {item.catalogo_general_id ?? (item.material_id != null && item.material_id > 0 ? String(item.material_id) : "")}
                </Text>
                <Text style={[s.tdText, s.colDescripcion]}>
                  {item.descripcion_snap}{item.comentario ? `\n${item.comentario}` : ""}
                </Text>
                <Text style={[s.tdText, s.colCantidad]}>{item.cantidad_pedida} {item.unidad_snap ?? "UN"}</Text>
                <Text style={[s.tdText, s.colPrecio]}>{item.precio_unitario != null ? fmt(item.precio_unitario) : "--"}</Text>
                <Text style={[s.tdText, s.colDescuento]}></Text>
                <Text style={[s.tdText, s.colTotal]}>{lineTotal > 0 ? fmt(lineTotal) : "--"}</Text>
              </View>
            );
          })}
        </View>

        {/* Footer: Comentario + Totales */}
        <View style={s.footerRow}>
          <View style={s.commentBox}>
            <Text style={s.commentLabel}>Comentario:</Text>
            <Text style={s.commentText}>{oc.comentario ?? oc.notas ?? ""}</Text>
          </View>
          <View style={s.totalsBox}>
            <View style={s.totalRow}><Text style={s.totalLabel}>SubTotal:</Text><Text style={s.totalValue}>{fmt(subtotal)}</Text></View>
            <View style={s.totalRow}><Text style={s.totalLabel}>Desc/Rec:</Text><Text style={s.totalValue}>$ 0</Text></View>
            <View style={s.totalRow}><Text style={s.totalLabel}>Neto:</Text><Text style={s.totalValue}>{esExenta ? "$ 0" : fmt(neto)}</Text></View>
            <View style={s.totalRow}><Text style={s.totalLabel}>Exento:</Text><Text style={s.totalValue}>{esExenta ? fmt(neto) : "$ 0"}</Text></View>
            {esBoleta ? (
              <View style={s.totalRow}><Text style={s.totalLabel}>IVA RETENIDO (15.25%):</Text><Text style={s.totalValue}>$ -{retencion.toLocaleString("es-CL")}</Text></View>
            ) : esExenta ? (
              <View style={s.totalRow}><Text style={s.totalLabel}>IVA:</Text><Text style={s.totalValue}>$ 0</Text></View>
            ) : (
              <View style={s.totalRow}><Text style={s.totalLabel}>IVA (19%):</Text><Text style={s.totalValue}>{fmt(iva)}</Text></View>
            )}
            <View style={s.totalSeparator} />
            <View style={s.totalRow}>
              <Text style={[s.totalLabel, s.totalFinal]}>Total:</Text>
              <Text style={[s.totalValue, s.totalFinal]}>{fmt(total)}</Text>
            </View>
          </View>
        </View>

        {/* Firma */}
        <View style={s.signatureBlock}>
          <View style={s.signatureLeft}>
            <Text style={s.signatureLabel}>Nombre:</Text>
            <Text style={s.signatureLabel}>R.U.T:</Text>
            <Text style={s.signatureLabel}>Recinto:</Text>
          </View>
          <View style={s.signatureRight}>
            <Text style={s.signatureLabel}>Fecha:</Text>
            <Text style={s.signatureLabel}>Firma:</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
