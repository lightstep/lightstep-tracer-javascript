// When lightstep-tracer/browser is imported, typescript does not
// automatically infer that the types should be the same as lightstep-tracer. This
// declaration tells the compiler to look at the same types as index.d.ts.
declare module "lightstep-tracer/browser" {
  import m = require("lightstep-tracer");
  export = m;
}
