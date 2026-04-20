# oc-shared-libs

Libreria compartida de componentes PDF para Ordenes de Compra Terralink.

Usada por **Abastecimiento** y **Tesoreria** para generar PDFs identicos desde ambas plataformas.

---

## Instalacion

```bash
npm install github:OWNER/oc-shared-libs
```

> Reemplazar `OWNER` con el usuario u organizacion de GitHub donde este el repo.

---

## Uso basico

```tsx
import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { OcPdfDocument } from "oc-shared-libs";
import type { OcParaPdf, OcItemParaPdf, ProveedorParaPdf } from "oc-shared-libs";

const oc: OcParaPdf = {
  id: "abc123",
  numero: "OC-2026-001",
  folio_global: 2150,
  folio_proyecto: null,
  estado: "aprobada",
  tipo_documento: "factura_electronica", // "boleta_honorarios" | "factura_exenta"
  condicion_pago: "credito_30",
  fecha_emision: "2026-04-15",
  fecha_entrega_prom: "2026-04-30",
  despacho: "Avda del Parque 4928, Huechuraba",
  centro_negocio_label: "EMPRESA",
  comentario: null,
  notas: null,
  proveedor_nombre: "Proveedor Ejemplo Ltda",
  proyecto_nombre: "General",
};

const items: OcItemParaPdf[] = [
  {
    id: "1",
    material_id: null,
    catalogo_general_id: "G001",
    descripcion_snap: "Cable electrico 10mm2",
    unidad_snap: "M",
    cantidad_pedida: 100,
    precio_unitario: 1200,
    precio_total: 120000,
    comentario: null,
  },
];

const proveedor: ProveedorParaPdf = {
  nombre: "Proveedor Ejemplo Ltda",
  rut: "76.123.456-7",
  direccion: "Calle Ejemplo 123, Santiago",
  ciudad: "Santiago",
};

// logoBase64: imagen del logo como data URI base64
const logoBase64 = "data:image/png;base64,...";

const buffer = await renderToBuffer(
  <OcPdfDocument oc={oc} items={items} proveedor={proveedor} logoBase64={logoBase64} />
);
```

---

## Tipos de documento

| `tipo_documento`      | Componente            | Comportamiento                                    |
|-----------------------|-----------------------|---------------------------------------------------|
| `factura_electronica` | `OcPdfDocument`       | IVA 19% (default)                                 |
| `boleta_honorarios`   | `OcPdfDocument`       | Sin IVA, retencion 15.25%                         |
| `factura_exenta`      | `OcPdfDocument`       | Sin IVA, Neto=$0, Exento=subtotal                 |
| `factura_gasolina`    | `GasolinaPdfDocument` | IVA 19% + Impto. Especifico Ley 18.502 por litro  |

---

## Uso: OC Gasolina

Para facturas de combustible con Impuesto Especifico (Ley 18.502):

```tsx
import { GasolinaPdfDocument, IMPTO_GASOLINA_POR_LITRO_DEFAULT } from "oc-shared-libs";
import type { OcGasolinaParaPdf, OcItemParaPdf, ProveedorParaPdf } from "oc-shared-libs";

const oc: OcGasolinaParaPdf = {
  // ...campos base de OcParaPdf
  tipo_documento: "factura_gasolina",
  // Tasa impuesto especifico en CLP/litro (actualizar mensualmente segun UTM del SII)
  // Formula: UTM_vigente x tasa_UTM_por_m3 / 1000
  // Ejemplo abril 2026: $67.294 x 6.0 / 1000 = $404/litro (G93)
  tasa_impto_especifico_por_litro: IMPTO_GASOLINA_POR_LITRO_DEFAULT, // o valor actualizado
};

const items: OcItemParaPdf[] = [
  {
    id: "1",
    material_id: null,
    catalogo_general_id: "G001",
    descripcion_snap: "Gasolina G93",
    unidad_snap: "L",
    cantidad_pedida: 500,         // litros
    precio_unitario: 850,         // precio neto por litro
    precio_total: 425000,         // neto total (sin IVA ni impto esp)
    comentario: null,
  },
];

// Totales que genera el PDF automaticamente:
// Neto:              $ 425.000
// IVA (19%):         $  80.750
// Impto. Esp. (500L x $404): $ 202.000
// Total:             $ 707.750

const buffer = await renderToBuffer(
  <GasolinaPdfDocument oc={oc} items={items} proveedor={proveedor} logoBase64={logoBase64} />
);
```

### Actualizacion mensual de la tasa de combustible

La tasa del impuesto especifico cambia con la UTM mensual del SII:

```ts
// Calcular tasa actualizada:
const utm = 68000; // UTM del mes (revisar en sii.cl)
const tasaUtmPorM3 = 6.0; // tasa fija G93 (Ley 18.502)
const tasaPorLitro = Math.round((utm * tasaUtmPorM3) / 1000);
```

---

## Estados en el PDF

El badge de estado se genera automaticamente segun el campo `estado`:

| Estado interno                                      | Badge PDF   | Color   |
|-----------------------------------------------------|-------------|---------|
| `emitida`                                           | Pendiente   | Naranja |
| `aprobada`, `enviada_proveedor`, `en_transito`, ... | Aprobada    | Verde   |
| `anulada`, `anulacion_solicitada`                   | Rechazada   | Rojo    |
| `eliminada`                                         | Eliminada   | Rojo    |

---

## Exports disponibles

```ts
// Componentes PDF
import { OcPdfDocument } from "oc-shared-libs";
import { GasolinaPdfDocument } from "oc-shared-libs";

// Tipos
import type { OcParaPdf, OcGasolinaParaPdf, OcItemParaPdf, ProveedorParaPdf, TipoDocumento, EstadoOC } from "oc-shared-libs";

// Constantes
import { TIPO_DOCUMENTO_OPTIONS, CONDICION_PAGO_OPTIONS, IVA_RATE, RETENCION_HONORARIOS_RATE, IMPTO_GASOLINA_POR_LITRO_DEFAULT } from "oc-shared-libs";
```

---

## Desarrollo

```bash
npm install
npm run build       # genera dist/
npm run dev         # watch mode
npm run typecheck   # verifica tipos
```

## Versionado

Seguimos semver:
- **patch** (1.0.x): fixes visuales menores
- **minor** (1.x.0): nuevos tipos de documento o campos opcionales
- **major** (x.0.0): cambios que rompen el contrato de datos
