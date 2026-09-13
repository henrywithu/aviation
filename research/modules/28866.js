(e, t, s) => {
  s.d(t, { Footer: () => j });
  var a = s(22099),
    i = s(97903),
    r = s.n(i),
    l = s(14960),
    n = s(76772),
    o = s(72549),
    d = s(66741);
  let c = (e) => {
      let { ...t } = e;
      return (0, a.jsx)("button", {
        ...t,
        className:
          "text-d-cta cursor-pointer underline decoration-1 underline-offset-2 hover:no-underline",
        children: "Privacy Policy",
      });
    },
    m = () =>
      (0, a.jsxs)(d.Modal, {
        title: "Privacy Policy",
        trigger: (0, a.jsx)(c, {}),
        children: [
          (0, a.jsx)("p", {
            children:
              'This Privacy Policy explains how USAvionix ("Company", "we", or "us") collects, uses, and protects your personal information when you access or use www.usavionix.com (the "Site").',
          }),
          (0, a.jsx)("br", {}),
          (0, a.jsx)("p", {
            children:
              "By using the Site, you agree to the collection and use of information in accordance with this policy. We may collect limited personal data such as your name, email address, IP address, and usage behavior to improve and secure your experience.",
          }),
          (0, a.jsx)("br", {}),
          (0, a.jsx)("p", {
            children:
              "We do not sell your personal information. Any data shared with trusted third-party services (e.g., for analytics or performance monitoring) is solely for the purpose of operating, improving, and protecting the Site.",
          }),
          (0, a.jsx)("br", {}),
          (0, a.jsx)("p", {
            children:
              "USAvionix may update this Privacy Policy from time to time. Continued use of the Site after changes are posted constitutes your acceptance of those changes.",
          }),
        ],
      }),
    u = (e) => {
      let { ...t } = e;
      return (0, a.jsx)("button", {
        ...t,
        className:
          "text-d-cta cursor-pointer underline decoration-1 underline-offset-2 hover:no-underline",
        children: "Terms of Use",
      });
    },
    h = () =>
      (0, a.jsxs)(d.Modal, {
        title: "Terms of Use",
        trigger: (0, a.jsx)(u, {}),
        children: [
          (0, a.jsx)("p", {
            children:
              'The following terms and conditions (the "Agreement") govern all use of the www.usavionix.com website (the "Site"), operated by USAvionix ("Company", "we", or "us"). By accessing or using any part of the Site, you agree to be bound by this Agreement, including any future modifications or updates published here.',
          }),
          (0, a.jsx)("br", {}),
          (0, a.jsx)("p", {
            children:
              "If you do not agree to all the terms and conditions, do not access or use the Site.",
          }),
          (0, a.jsx)("br", {}),
          (0, a.jsx)("p", {
            children:
              "USAvionix reserves the right, at its sole discretion, to update or change these terms at any time. It is your responsibility to review this page periodically. Continued use of the Site following any changes constitutes acceptance of those changes.",
          }),
        ],
      });
  var x = s(52953),
    f = s(25621),
    p = s(891),
    g = s(79803);
  let w = () =>
      (0, a.jsx)(r(), {
        href: n.vo,
        target: "_blank",
        className:
          "text-d-cta cursor-pointer underline decoration-1 underline-offset-2 hover:no-underline",
        children: "Notes",
      }),
    j = (e) => {
      let { simplified: t = !1 } = e,
        s = ["/partners", "/about"].includes((0, l.usePathname)());
      return (0, a.jsxs)("div", {
        id: "footer",
        className: (0, g.A)(
          "relative flex w-full flex-col items-center justify-between px-4 md:px-12",
          !t && "h-[calc(100vh-var(--nav-height))]",
          t && "gap-16 border-t border-white/15 pt-16 lg:gap-32 lg:pt-24",
        ),
        children: [
          !t &&
            (0, a.jsx)(p.default, {
              src: f.xt[95],
              alt: "",
              width: 1920,
              height: 1920,
              className:
                "absolute bottom-0 left-1/2 aspect-square h-full w-auto origin-bottom -translate-x-1/2 object-cover md:h-19/20 lg:hidden",
            }),
          !t &&
            (0, a.jsx)(o.D, { className: "mt-5 w-full md:mt-8 lg:invisible" }),
          (0, a.jsxs)("div", {
            className: (0, g.A)(
              "z-over-scroll-sequence flex w-full flex-col items-center gap-12 pb-8 md:flex-row md:items-end",
              s ? "justify-center md:justify-between" : "justify-between",
            ),
            children: [
              !s &&
                (0, a.jsxs)("div", {
                  className:
                    "flex max-w-94 flex-col items-center gap-5 text-center md:items-start md:text-left",
                  children: [
                    (0, a.jsx)("p", {
                      className: "text-d-h3 text-white",
                      children: "Ready to talk to us?",
                    }),
                    (0, a.jsx)(x.B, {
                      label: "Contact Us",
                      withArrow: !0,
                      className: "w-full md:w-auto",
                    }),
                  ],
                }),
              (0, a.jsxs)("div", {
                className:
                  "flex flex-col items-center gap-6 whitespace-nowrap md:contents",
                children: [
                  (0, a.jsxs)("p", {
                    className:
                      "text-d-cta order-last text-white/20 md:order-none md:hidden lg:block",
                    children: [
                      "\xa9 USAvionix Inc. ",
                      new Date().getFullYear(),
                    ],
                  }),
                  (0, a.jsxs)("div", {
                    className:
                      "flex items-center gap-6 whitespace-nowrap md:gap-6.5",
                    children: [
                      (0, a.jsx)(w, {}),
                      (0, a.jsx)(m, {}),
                      (0, a.jsx)(h, {}),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      });
    };
};
