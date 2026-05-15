// src/declarations.d.ts  (ou src/global.d.ts)
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}