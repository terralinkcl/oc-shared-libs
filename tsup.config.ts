import { defineConfig } from "tsup";

// Tres puntos de entrada para soportar subpath imports en consumidores:
// - "oc-shared-libs"           -> barrel completo (retro-compatible).
// - "oc-shared-libs/constants" -> solo tipos y constantes (sin react-pdf).
// - "oc-shared-libs/pdf"       -> solo componentes PDF (incluye react-pdf).
//
// La separacion permite a OCCreateForm.tsx (Teso) y similares importar
// tipos/constantes desde el subpath liviano sin jalar @react-pdf/renderer
// al chunk principal, reduciendo el bundle de Vite ~600KB.
export default defineConfig({
  entry: {
    index: "src/index.ts",
    constants: "src/constants/index.ts",
    pdf: "src/pdf/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  external: ["react", "@react-pdf/renderer"],
});
