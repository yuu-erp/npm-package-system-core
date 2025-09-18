import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'], // file chính
  format: ['esm', 'cjs'], // xuất song song ESM + CJS
  dts: true, // xuất file .d.ts
  sourcemap: true, // hỗ trợ debug
  clean: true, // xoá dist trước khi build
  minify: true, // nén code cho nhỏ
  target: 'es2020', // tương thích rộng rãi
  skipNodeModulesBundle: true, // không bundle node_modules (zod, ...)
  treeshake: true // loại bỏ code thừa
})
