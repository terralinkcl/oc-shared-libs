# Plan: oc-shared-libs

**Fecha:** 2026-04-15
**Estado:** En ejecucion

---

## 1. Descripcion del Problema

Abastecimiento y Tesoreria generan PDFs de Ordenes de Compra de forma independiente.
El objetivo es tener un unico template compartido como libreria npm privada para que
ambas apps consuman el mismo componente y el PDF sea identico en ambas plataformas.

## 2. Analisis Build vs Buy

Build: no existe libreria publica que genere PDFs con el formato tributario chileno
especifico de Terralink (IVA, retencion honorarios, exenta).

## 3. Arquitectura

```
repo: oc-shared-libs (npm package privado via GitHub)
├── src/
│   ├── pdf/
│   │   └── OcPdfDocument.tsx    ← componente principal
│   ├── types/
│   │   └── index.ts             ← tipos compartidos (OC, items, proveedor)
│   ├── constants/
│   │   └── index.ts             ← TIPO_DOCUMENTO_OPTIONS, CONDICION_PAGO_OPTIONS
│   └── index.ts                 ← barrel export
├── package.json
├── tsconfig.json
└── PLAN.md

Consumidores:
  Abastecimiento (Next.js) → npm install github:org/oc-shared-libs
  Tesoreria (React)        → npm install github:org/oc-shared-libs
```

## 4. Tipos de documento soportados

| tipo_documento        | IVA     | Logica especial                         |
|-----------------------|---------|-----------------------------------------|
| factura_electronica   | 19%     | Comportamiento estandar                 |
| boleta_honorarios     | ninguno | Retencion 15.25%                        |
| factura_exenta        | ninguno | Neto=0, Exento=subtotal                 |
| factura_gasolina      | 19%     | + Impto. Especifico combustible (L.18502) |

## 5. Tareas Atomicas

- [x] Crear estructura de carpetas del proyecto
- [x] Crear PLAN.md
- [ ] Configurar package.json con dependencias
- [ ] Configurar tsconfig.json
- [ ] Extraer tipos a src/types/index.ts
- [ ] Extraer constantes a src/constants/index.ts
- [ ] Migrar OcPdfDocument a src/pdf/OcPdfDocument.tsx
- [ ] Crear barrel export en src/index.ts
- [ ] Verificar build sin errores TypeScript
- [ ] Documentar uso en README.md

## 6. Dependencias

- @react-pdf/renderer — generacion de PDFs
- react — peer dependency
- typescript — compilacion

## 7. Como instalar en otra app

```bash
npm install github:terralinkcl/oc-shared-libs#<commit-sha>
```

Pinear siempre al SHA del commit (politica supply chain de Terralink, min-release-age=21).

```tsx
import { OcPdfDocument } from "oc-shared-libs";
import { renderToBuffer } from "@react-pdf/renderer";

const buffer = await renderToBuffer(
  <OcPdfDocument oc={oc} items={items} proveedor={proveedor} logoBase64={logo} />
);
```

## 8. Estado de adopcion por consumidor

| Consumidor            | PDFs     | Tipos    | Constantes | Estado de enum backend |
|-----------------------|----------|----------|------------|------------------------|
| app-abastecimiento    | pendiente| si       | si         | N/A (usa Firestore)    |
| app-tesoreria frontend| pendiente| si (branch)| si (branch)| Fase 3 pendiente    |
| app-tesoreria backend | N/A (Python) | pendiente alinear | pendiente alinear | Fase 3 pendiente |

## 9. Fase 3 pendiente — Alinear backend Python de Tesoreria

**Contexto:** el backend Python de Tesoreria (`app-tesoreria/backend`) tiene un enum Postgres
`TipoDocumentoOC` con nombres distintos al vocabulario canonico:

| Canonico (shared-libs) | Backend Teso actual       |
|------------------------|---------------------------|
| factura_electronica    | factura_compra            |
| factura_exenta         | factura_compra_exenta     |
| boleta_honorarios      | boleta_honorarios (OK)    |
| factura_gasolina       | no existe                 |

Mientras no se alinee, Abastecimiento traduce en frontera
(`mapTipoDocumentoATesoreria` en `lib/tesoreria-client.ts`) y el frontend de Teso
no se puede mergear a main (branch `feat/align-shared-libs`).

**Tareas:**

- [ ] Migracion Alembic 036 que agregue `factura_electronica`, `factura_exenta`, `factura_gasolina` al enum
- [ ] Migrar datos existentes: `factura_compra → factura_electronica`, `factura_compra_exenta → factura_exenta`
- [ ] Deprecar (o eliminar en migracion 037) los valores legacy `factura_compra`, `factura_compra_exenta`
- [ ] Actualizar `backend/app/models/orden_compra.py` con los nombres nuevos
- [ ] Actualizar `backend/app/schemas/inter_service.py` y `orden_compra.py`
- [ ] Actualizar tests (`backend/tests/factories.py`, `test_oc_v2.py`, `conftest.py`)
- [ ] Rebuildear componente GasolinaPdf en Teso (cuando soporte factura_gasolina)
- [ ] Eliminar `mapTipoDocumentoATesoreria` en Abast y dejar de traducir
- [ ] Mergear branch `feat/align-shared-libs` de Teso junto con esta migracion
