(e, t, n) => {
  "use strict";
  n.d(t, { Ay: () => v, kF: () => p });
  var r = n(82752),
    o = n(48947),
    i = n(39107),
    a = n(41264),
    s = n(36745),
    l = n(81672),
    c = n(98894),
    u = n(8743),
    d = n(98127);
  let m = new r.Q1f().setHex(0xc9e0f7),
    p = new r.Q1f().setHex(0),
    v = function (e) {
      let { gl: t, scene: n, size: v, camera: f } = (0, i.C)(),
        h = (0, o.useRef)(new r.I9Y()),
        [g, x, y] = (0, o.useMemo)(() => {
          let r = new a.s0(t, { multisampling: 0 }),
            o = new a.AH(n, f),
            i = new c.u(),
            s = new u.D(e);
          return (
            r.addPass(o),
            r.addPass(new a.Vu(f, s)),
            r.addPass(new a.Vu(f, new a.eF())),
            r.addPass(new a.Vu(f, i)),
            [r, i, s]
          );
        }, [t, n, f, e]);
      ((0, o.useEffect)(() => void g.setSize(v.width, v.height), [g, v]),
        (0, i.D)(() => {}, 1),
        (0, o.useEffect)(() => {
          let { width: e, height: t } = v,
            n = t / Math.sqrt(e * e + t * t);
          h.current.set((e / t) * n, n);
        }, [v]),
        (0, i.D)((e, n) => {
          let {
            [s.ah.MULTI_THREAT_RESPONSE]: o,
            [s.ah.FLOCK_SCENE]: i,
            [s.ah.REAL_TIME_DETECTION]: a,
          } = s.on.getState();
          if (o.hideRatio > 0.8) return;
          ((y.mixFactor = (0, l.Uj)(i.progress, 0.75, 1, 0, 1)),
            (y.nextSceneProgress = a.progress),
            (x.vignetteAspect = h.current),
            (x.time = e.clock.getElapsedTime()),
            (x.opacity = (0, l.Uj)(o.hideRatio, 0, 0.25, 1, 0)),
            (x.thermalInvert = d.U9.shouldInvert),
            (x.thermalInvertPos = d.U9.pos),
            (x.thermalInvertSize = d.U9.size),
            (x.thermalInvertTargetPos = d.U9.targetPos),
            (t.outputColorSpace = r.Zr2));
          let c = s.on.getState()[s.ah.IGNITION_VERIFIED].progress > 0.99;
          (t.setClearColor(c ? p : m, 1),
            (t.outputColorSpace = r.er$),
            g.render(n));
        }, 100));
    };
};
