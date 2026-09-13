(e, n, t) => {
  t.d(n, { U: () => o });
  var l = t(81672),
    r = t(43972),
    c = t(48947);
  let o = () => {
    let e = (0, r.xP)(),
      n = (0, c.useRef)(null),
      t = (0, c.useRef)(null),
      o = (0, c.useRef)(0),
      i = (0, c.useRef)(0),
      a = (0, c.useRef)(0),
      v = (0, c.useRef)(0);
    return (
      (0, c.useEffect)(() => {
        let e = () => {
          ((n.current = document.getElementById("footer")),
            (t.current = document.getElementById("our-team")));
        };
        return (
          e(),
          window.addEventListener("resize", e),
          () => window.removeEventListener("resize", e)
        );
      }, []),
      (0, c.useEffect)(() => {
        if (!e) return;
        let r = () => {
          var r, c, s, u, m, h;
          ((a.current =
            null != (s = null == (r = n.current) ? void 0 : r.offsetHeight)
              ? s
              : 1),
            (v.current =
              null != (u = null == (c = t.current) ? void 0 : c.offsetHeight)
                ? u
                : 1),
            (i.current = a.current + v.current + 220));
          let d =
            (null != (m = null == e ? void 0 : e.limit) ? m : 0) - i.current;
          o.current = (0, l.qE)(
            ((null != (h = null == e ? void 0 : e.scroll) ? h : 0) - d) /
              i.current,
            0,
            1,
          );
        };
        return (
          r(),
          e.on("scroll", r),
          window.addEventListener("resize", r),
          () => {
            (e.off("scroll", r), window.removeEventListener("resize", r));
          }
        );
      }, [e]),
      {
        progressRef: o,
        totalHeightRef: i,
        ourTeamHeightRef: v,
        footerHeightRef: a,
      }
    );
  };
};
