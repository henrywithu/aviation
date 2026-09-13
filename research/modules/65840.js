(e, t, r) => {
  let n, i;
  r.d(t, { E: () => x });
  var l = r(96997),
    a = r(48947),
    o = r(16509),
    s = r(82752),
    c = r(39107);
  let u = new s.Pq0(),
    d = new s.Pq0(),
    f = new s.Pq0(),
    h = new s.I9Y();
  function p(e, t, r) {
    let n = u.setFromMatrixPosition(e.matrixWorld);
    n.project(t);
    let i = r.width / 2,
      l = r.height / 2;
    return [n.x * i + i, -(n.y * l) + l];
  }
  let m = (e) => (1e-10 > Math.abs(e) ? 0 : e);
  function g(e, t, r = "") {
    let n = "matrix3d(";
    for (let r = 0; 16 !== r; r++)
      n += m(t[r] * e.elements[r]) + (15 !== r ? "," : ")");
    return r + n;
  }
  let v =
      ((n = [1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1]),
      (e) => g(e, n)),
    y =
      ((i = (e) => [
        1 / e,
        1 / e,
        1 / e,
        1,
        -1 / e,
        -1 / e,
        -1 / e,
        -1,
        1 / e,
        1 / e,
        1 / e,
        1,
        1,
        1,
        1,
        1,
      ]),
      (e, t) => g(e, i(t), "translate(-50%,-50%)")),
    x = a.forwardRef(
      (
        {
          children: e,
          eps: t = 0.001,
          style: r,
          className: n,
          prepend: i,
          center: g,
          fullscreen: x,
          portal: b,
          distanceFactor: A,
          sprite: w = !1,
          transform: S = !1,
          occlude: E,
          onOcclude: M,
          castShadow: j,
          receiveShadow: C,
          material: k,
          geometry: L,
          zIndexRange: P = [0x1000037, 0],
          calculatePosition: R = p,
          as: I = "div",
          wrapperClass: z,
          pointerEvents: U = "auto",
          ...O
        },
        B,
      ) => {
        let {
            gl: T,
            camera: W,
            scene: F,
            size: N,
            raycaster: D,
            events: H,
            viewport: Z,
          } = (0, c.C)(),
          [G] = a.useState(() => document.createElement(I)),
          _ = a.useRef(null),
          X = a.useRef(null),
          V = a.useRef(0),
          Y = a.useRef([0, 0]),
          q = a.useRef(null),
          J = a.useRef(null),
          K =
            (null == b ? void 0 : b.current) ||
            H.connected ||
            T.domElement.parentNode,
          Q = a.useRef(null),
          $ = a.useRef(!1),
          ee = a.useMemo(
            () =>
              (E && "blending" !== E) ||
              (Array.isArray(E) &&
                E.length &&
                (function (e) {
                  return e && "object" == typeof e && "current" in e;
                })(E[0])),
            [E],
          );
        (a.useLayoutEffect(() => {
          let e = T.domElement;
          E && "blending" === E
            ? ((e.style.zIndex = `${Math.floor(P[0] / 2)}`),
              (e.style.position = "absolute"),
              (e.style.pointerEvents = "none"))
            : ((e.style.zIndex = null),
              (e.style.position = null),
              (e.style.pointerEvents = null));
        }, [E]),
          a.useLayoutEffect(() => {
            if (X.current) {
              let e = (_.current = o.createRoot(G));
              if ((F.updateMatrixWorld(), S))
                G.style.cssText =
                  "position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";
              else {
                let e = R(X.current, W, N);
                G.style.cssText = `position:absolute;top:0;left:0;transform:translate3d(${e[0]}px,${e[1]}px,0);transform-origin:0 0;`;
              }
              return (
                K && (i ? K.prepend(G) : K.appendChild(G)),
                () => {
                  (K && K.removeChild(G), e.unmount());
                }
              );
            }
          }, [K, S]),
          a.useLayoutEffect(() => {
            z && (G.className = z);
          }, [z]));
        let et = a.useMemo(
            () =>
              S
                ? {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: N.width,
                    height: N.height,
                    transformStyle: "preserve-3d",
                    pointerEvents: "none",
                  }
                : {
                    position: "absolute",
                    transform: g ? "translate3d(-50%,-50%,0)" : "none",
                    ...(x && {
                      top: -N.height / 2,
                      left: -N.width / 2,
                      width: N.width,
                      height: N.height,
                    }),
                    ...r,
                  },
            [r, g, x, N, S],
          ),
          er = a.useMemo(
            () => ({ position: "absolute", pointerEvents: U }),
            [U],
          );
        a.useLayoutEffect(() => {
          var t, i;
          (($.current = !1),
            S
              ? null == (t = _.current) ||
                t.render(
                  a.createElement(
                    "div",
                    { ref: q, style: et },
                    a.createElement(
                      "div",
                      { ref: J, style: er },
                      a.createElement("div", {
                        ref: B,
                        className: n,
                        style: r,
                        children: e,
                      }),
                    ),
                  ),
                )
              : null == (i = _.current) ||
                i.render(
                  a.createElement("div", {
                    ref: B,
                    style: et,
                    className: n,
                    children: e,
                  }),
                ));
        });
        let en = a.useRef(!0);
        (0, c.D)((e) => {
          if (X.current) {
            (W.updateMatrixWorld(), X.current.updateWorldMatrix(!0, !1));
            let e = S ? Y.current : R(X.current, W, N);
            if (
              S ||
              Math.abs(V.current - W.zoom) > t ||
              Math.abs(Y.current[0] - e[0]) > t ||
              Math.abs(Y.current[1] - e[1]) > t
            ) {
              let t = (function (e, t) {
                  let r = u.setFromMatrixPosition(e.matrixWorld),
                    n = d.setFromMatrixPosition(t.matrixWorld),
                    i = r.sub(n),
                    l = t.getWorldDirection(f);
                  return i.angleTo(l) > Math.PI / 2;
                })(X.current, W),
                r = !1;
              ee &&
                (Array.isArray(E)
                  ? (r = E.map((e) => e.current))
                  : "blending" !== E && (r = [F]));
              let n = en.current;
              (r
                ? (en.current =
                    (function (e, t, r, n) {
                      let i = u.setFromMatrixPosition(e.matrixWorld),
                        l = i.clone();
                      (l.project(t), h.set(l.x, l.y), r.setFromCamera(h, t));
                      let a = r.intersectObjects(n, !0);
                      if (a.length) {
                        let e = a[0].distance;
                        return i.distanceTo(r.ray.origin) < e;
                      }
                      return !0;
                    })(X.current, W, D, r) && !t)
                : (en.current = !t),
                n !== en.current &&
                  (M
                    ? M(!en.current)
                    : (G.style.display = en.current ? "block" : "none")));
              let i = Math.floor(P[0] / 2),
                l = E ? (ee ? [P[0], i] : [i - 1, 0]) : P;
              if (
                ((G.style.zIndex = `${(function (e, t, r) {
                  if (t instanceof s.ubm || t instanceof s.qUd) {
                    let n = u.setFromMatrixPosition(e.matrixWorld),
                      i = d.setFromMatrixPosition(t.matrixWorld),
                      l = n.distanceTo(i),
                      a = (r[1] - r[0]) / (t.far - t.near),
                      o = r[1] - a * t.far;
                    return Math.round(a * l + o);
                  }
                })(X.current, W, l)}`),
                S)
              ) {
                let [e, t] = [N.width / 2, N.height / 2],
                  r = W.projectionMatrix.elements[5] * t,
                  {
                    isOrthographicCamera: n,
                    top: i,
                    left: l,
                    bottom: a,
                    right: o,
                  } = W,
                  s = v(W.matrixWorldInverse),
                  c = n
                    ? `scale(${r})translate(${m(-(o + l) / 2)}px,${m((i + a) / 2)}px)`
                    : `translateZ(${r}px)`,
                  u = X.current.matrixWorld;
                (w &&
                  (((u = W.matrixWorldInverse
                    .clone()
                    .transpose()
                    .copyPosition(u)
                    .scale(X.current.scale)).elements[3] =
                    u.elements[7] =
                    u.elements[11] =
                      0),
                  (u.elements[15] = 1)),
                  (G.style.width = N.width + "px"),
                  (G.style.height = N.height + "px"),
                  (G.style.perspective = n ? "" : `${r}px`),
                  q.current &&
                    J.current &&
                    ((q.current.style.transform = `${c}${s}translate(${e}px,${t}px)`),
                    (J.current.style.transform = y(u, 1 / ((A || 10) / 400)))));
              } else {
                let t =
                  void 0 === A
                    ? 1
                    : (function (e, t) {
                        if (t instanceof s.qUd) return t.zoom;
                        if (!(t instanceof s.ubm)) return 1;
                        {
                          let r = u.setFromMatrixPosition(e.matrixWorld),
                            n = d.setFromMatrixPosition(t.matrixWorld);
                          return (
                            1 /
                            (2 *
                              Math.tan((t.fov * Math.PI) / 180 / 2) *
                              r.distanceTo(n))
                          );
                        }
                      })(X.current, W) * A;
                G.style.transform = `translate3d(${e[0]}px,${e[1]}px,0) scale(${t})`;
              }
              ((Y.current = e), (V.current = W.zoom));
            }
          }
          if (!ee && Q.current && !$.current)
            if (S) {
              if (q.current) {
                let e = q.current.children[0];
                if (null != e && e.clientWidth && null != e && e.clientHeight) {
                  let { isOrthographicCamera: t } = W;
                  if (t || L)
                    O.scale &&
                      (Array.isArray(O.scale)
                        ? O.scale instanceof s.Pq0
                          ? Q.current.scale.copy(
                              O.scale.clone().divideScalar(1),
                            )
                          : Q.current.scale.set(
                              1 / O.scale[0],
                              1 / O.scale[1],
                              1 / O.scale[2],
                            )
                        : Q.current.scale.setScalar(1 / O.scale));
                  else {
                    let t = (A || 10) / 400,
                      r = e.clientWidth * t,
                      n = e.clientHeight * t;
                    Q.current.scale.set(r, n, 1);
                  }
                  $.current = !0;
                }
              }
            } else {
              let t = G.children[0];
              if (null != t && t.clientWidth && null != t && t.clientHeight) {
                let e = 1 / Z.factor,
                  r = t.clientWidth * e,
                  n = t.clientHeight * e;
                (Q.current.scale.set(r, n, 1), ($.current = !0));
              }
              Q.current.lookAt(e.camera.position);
            }
        });
        let ei = a.useMemo(
          () => ({
            vertexShader: S
              ? void 0
              : `
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom"
            is false.
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;

            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      `,
            fragmentShader: `
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `,
          }),
          [S],
        );
        return a.createElement(
          "group",
          (0, l.A)({}, O, { ref: X }),
          E &&
            !ee &&
            a.createElement(
              "mesh",
              { castShadow: j, receiveShadow: C, ref: Q },
              L || a.createElement("planeGeometry", null),
              k ||
                a.createElement("shaderMaterial", {
                  side: s.$EB,
                  vertexShader: ei.vertexShader,
                  fragmentShader: ei.fragmentShader,
                }),
            ),
        );
      },
    );
};
