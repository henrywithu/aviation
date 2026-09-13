(e, t, n) => {
  "use strict";
  n.d(t, { u: () => s });
  var r = n(82752),
    o = n(41264),
    i = n(41480),
    a = n(25460);
  class s extends o.Mj {
    uniform(e) {
      let t = this.uniforms.get(e);
      if (!t) throw Error('Uniform "'.concat(e, '" not found'));
      return t;
    }
    set bgColor(e) {
      let t = this.uniform("uBgColor");
      "string" == typeof e ? t.value.set(e) : t.value.copy(e);
    }
    set opacity(e) {
      this.uniform("uOpacity").value = e;
    }
    set vignetteFrom(e) {
      this.uniform("uVignetteFrom").value = e;
    }
    set vignetteTo(e) {
      this.uniform("uVignetteTo").value = e;
    }
    set vignetteAspect(e) {
      this.uniform("uVignetteAspect").value.copy(e);
    }
    set vignetteColor(e) {
      let t = this.uniform("uVignetteColor");
      "string" == typeof e ? t.value.set(e) : t.value.copy(e);
    }
    set saturation(e) {
      this.uniform("uSaturation").value = e;
    }
    set contrast(e) {
      this.uniform("uContrast").value = e;
    }
    set brightness(e) {
      this.uniform("uBrightness").value = e;
    }
    set tintColor(e) {
      let t = this.uniform("uTintColor");
      "string" == typeof e ? t.value.set(e) : t.value.copy(e);
    }
    set tintOpacity(e) {
      this.uniform("uTintOpacity").value = e;
    }
    set gamma(e) {
      this.uniform("uGamma").value = e;
    }
    set sharpenKernelOffset(e) {
      this.uniform("uSharpenKernelOffset").value = e;
    }
    set sharpenOpacity(e) {
      this.uniform("uSharpenOpacity").value = e;
    }
    set grainAmount(e) {
      this.uniform("uGrainAmount").value = e;
    }
    set time(e) {
      this.uniform("uTime").value = e;
    }
    set thermalInvert(e) {
      this.uniform("uThermalInvert").value = e;
    }
    set thermalInvertPos(e) {
      this.uniform("uThermalInvertPos").value.copy(e);
    }
    set thermalInvertSize(e) {
      this.uniform("uThermalInvertSize").value.copy(e);
    }
    set thermalInvertTargetPos(e) {
      this.uniform("uThermalInvertTargetPos").value.copy(e);
    }
    constructor() {
      super("FinalEfx", a.A, {
        blendFunction: o.cf.NORMAL,
        uniforms: new Map([
          ["uBgColor", new r.nc$(i.kF)],
          ["uOpacity", new r.nc$(1)],
          ["uVignetteFrom", new r.nc$(0)],
          ["uVignetteTo", new r.nc$(1)],
          ["uVignetteAspect", new r.nc$(new r.I9Y())],
          ["uVignetteColor", new r.nc$(new r.Q1f("#000"))],
          ["uSaturation", new r.nc$(0.3)],
          ["uContrast", new r.nc$(0.02)],
          ["uBrightness", new r.nc$(0.02)],
          ["uTintColor", new r.nc$(new r.Q1f("#092b3b"))],
          ["uTintOpacity", new r.nc$(0.06)],
          ["uGamma", new r.nc$(1.1)],
          ["uSharpenKernelOffset", new r.nc$(14e-5)],
          ["uSharpenOpacity", new r.nc$(0.3)],
          ["uGrainAmount", new r.nc$(0.25)],
          ["uTime", new r.nc$(0)],
          ["uThermalInvert", new r.nc$(0)],
          ["uThermalInvertPos", new r.nc$(new r.I9Y())],
          ["uThermalInvertSize", new r.nc$(new r.I9Y())],
          ["uThermalInvertTargetPos", new r.nc$(new r.I9Y())],
        ]),
      });
    }
  }
};
