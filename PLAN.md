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

| tipo_documento        | IVA     | Logica especial             |
|-----------------------|---------|-----------------------------|
| factura_electronica   | 19%     | Comportamiento estandar     |
| boleta_honorarios     | ninguno | Retencion 15.25%            |
| factura_exenta        | ninguno | Neto=0, Exento=subtotal     |

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
npm install github:OWNER/oc-shared-libs
```

```tsx
import { OcPdfDocument } from "oc-shared-libs";
import { renderToBuffer } from "@react-pdf/renderer";

const buffer = await renderToBuffer(
  <OcPdfDocument oc={oc} items={items} proveedor={proveedor} logoBase64={logo} />
);
```
