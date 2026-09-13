(e, t, n) => {
  "use strict";
  n.d(t, { $h: () => p, wN: () => m });
  var r = n(22099),
    o = n(82752),
    i = n(88319),
    a = n(54179),
    s = n(19098),
    l = n(12365),
    c = n(22175),
    u = n(48947),
    d = n(39107);
  let m = (e) => {
      let { number: t, renderTarget: n, pbr: o } = e,
        c = (0, u.useRef)(0),
        [m, p] = (0, u.useState)(!0);
      return (
        (0, d.D)(() => {
          (c.current++, c.current > 5 && m && p(!1));
        }),
        (0, r.jsxs)(l.Y, {
          autoRender: m,
          renderTarget: n,
          children: [
            (0, r.jsx)(i.q, {
              makeDefault: !0,
              manual: !0,
              position: [0, 0, 2],
              left: -180,
              right: 180,
              top: -173,
              bottom: 173,
              ref: (e) => (null == e ? void 0 : e.lookAt(0, 0, 0)),
            }),
            (0, r.jsx)("group", {
              position: [o ? -60 : -84, 8, 0],
              children: (0, r.jsx)(a.o, {
                children: (0, r.jsx)("group", {
                  "rotation-z": 1.5 * Math.PI,
                  children: (0, r.jsxs)(s.x, {
                    font: "/assets/3d-fonts/orbitron-bold.json",
                    size: 114,
                    position: [0, 0, 0],
                    children: [
                      "01",
                      t,
                      (0, r.jsx)("meshBasicMaterial", { color: "#c6c6c6" }),
                    ],
                  }),
                }),
              }),
            }),
          ],
        })
      );
    },
    p = () =>
      (0, c.j)(360, 692, {
        type: o.ix0,
        colorSpace: o.Zr2,
        minFilter: o.hxR,
        generateMipmaps: !0,
      });
};
