const nt = globalThis, kt = nt.ShadowRoot && (nt.ShadyCSS === void 0 || nt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Tt = Symbol(), It = /* @__PURE__ */ new WeakMap();
let nr = class {
  constructor(e, t, r) {
    if (this._$cssResult$ = !0, r !== Tt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (kt && e === void 0) {
      const r = t !== void 0 && t.length === 1;
      r && (e = It.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && It.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const sr = (c) => new nr(typeof c == "string" ? c : c + "", void 0, Tt), lr = (c, ...e) => {
  const t = c.length === 1 ? c[0] : e.reduce((r, i, o) => r + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + c[o + 1], c[0]);
  return new nr(t, c, Tt);
}, wr = (c, e) => {
  if (kt) c.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const r = document.createElement("style"), i = nt.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, c.appendChild(r);
  }
}, zt = kt ? (c) => c : (c) => c instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const r of e.cssRules) t += r.cssText;
  return sr(t);
})(c) : c;
const { is: Sr, defineProperty: $r, getOwnPropertyDescriptor: Cr, getOwnPropertyNames: kr, getOwnPropertySymbols: Tr, getPrototypeOf: Mr } = Object, dt = globalThis, Ot = dt.trustedTypes, Ar = Ot ? Ot.emptyScript : "", Pr = dt.reactiveElementPolyfillSupport, Qe = (c, e) => c, st = { toAttribute(c, e) {
  switch (e) {
    case Boolean:
      c = c ? Ar : null;
      break;
    case Object:
    case Array:
      c = c == null ? c : JSON.stringify(c);
  }
  return c;
}, fromAttribute(c, e) {
  let t = c;
  switch (e) {
    case Boolean:
      t = c !== null;
      break;
    case Number:
      t = c === null ? null : Number(c);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(c);
      } catch {
        t = null;
      }
  }
  return t;
} }, Mt = (c, e) => !Sr(c, e), Ft = { attribute: !0, type: String, converter: st, reflect: !1, useDefault: !1, hasChanged: Mt };
Symbol.metadata ??= Symbol("metadata"), dt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Ie = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Ft) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(e, r, t);
      i !== void 0 && $r(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, r) {
    const { get: i, set: o } = Cr(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: i, set(a) {
      const n = i?.call(this);
      o?.call(this, a), this.requestUpdate(e, n, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ft;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Qe("elementProperties"))) return;
    const e = Mr(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Qe("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Qe("properties"))) {
      const t = this.properties, r = [...kr(t), ...Tr(t)];
      for (const i of r) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [r, i] of t) this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, r] of this.elementProperties) {
      const i = this._$Eu(t, r);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const i of r) t.unshift(zt(i));
    } else e !== void 0 && t.push(zt(e));
    return t;
  }
  static _$Eu(e, t) {
    const r = t.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const r of t.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return wr(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, r) {
    this._$AK(e, r);
  }
  _$ET(e, t) {
    const r = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, r);
    if (i !== void 0 && r.reflect === !0) {
      const o = (r.converter?.toAttribute !== void 0 ? r.converter : st).toAttribute(t, r.type);
      this._$Em = e, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const o = r.getPropertyOptions(i), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : st;
      this._$Em = i;
      const n = a.fromAttribute(t, o.type);
      this[i] = n ?? this._$Ej?.get(i) ?? n, this._$Em = null;
    }
  }
  requestUpdate(e, t, r, i = !1, o) {
    if (e !== void 0) {
      const a = this.constructor;
      if (i === !1 && (o = this[e]), r ??= a.getPropertyOptions(e), !((r.hasChanged ?? Mt)(o, t) || r.useDefault && r.reflect && o === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, r)))) return;
      this.C(e, t, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: r, reflect: i, wrapped: o }, a) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), o !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [i, o] of this._$Ep) this[i] = o;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [i, o] of r) {
        const { wrapped: a } = o, n = this[i];
        a !== !0 || this._$AL.has(i) || n === void 0 || this.C(i, void 0, o, n);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (r) {
      throw e = !1, this._$EM(), r;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((t) => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
Ie.elementStyles = [], Ie.shadowRootOptions = { mode: "open" }, Ie[Qe("elementProperties")] = /* @__PURE__ */ new Map(), Ie[Qe("finalized")] = /* @__PURE__ */ new Map(), Pr?.({ ReactiveElement: Ie }), (dt.reactiveElementVersions ??= []).push("2.1.2");
const At = globalThis, Ut = (c) => c, lt = At.trustedTypes, Gt = lt ? lt.createPolicy("lit-html", { createHTML: (c) => c }) : void 0, cr = "$lit$", ne = `lit$${Math.random().toFixed(9).slice(2)}$`, dr = "?" + ne, Er = `<${dr}>`, ge = document, je = () => ge.createComment(""), et = (c) => c === null || typeof c != "object" && typeof c != "function", Pt = Array.isArray, Nr = (c) => Pt(c) || typeof c?.[Symbol.iterator] == "function", vt = `[ 	
\f\r]`, qe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Vt = /-->/g, Wt = />/g, _e = RegExp(`>|${vt}(?:([^\\s"'>=/]+)(${vt}*=${vt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Yt = /'/g, Xt = /"/g, ur = /^(?:script|style|textarea|title)$/i, Lr = (c) => (e, ...t) => ({ _$litType$: c, strings: e, values: t }), S = Lr(1), be = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), Kt = /* @__PURE__ */ new WeakMap(), fe = ge.createTreeWalker(ge, 129);
function pr(c, e) {
  if (!Pt(c) || !c.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Gt !== void 0 ? Gt.createHTML(e) : e;
}
const Dr = (c, e) => {
  const t = c.length - 1, r = [];
  let i, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = qe;
  for (let n = 0; n < t; n++) {
    const d = c[n];
    let f, u, s = -1, _ = 0;
    for (; _ < d.length && (a.lastIndex = _, u = a.exec(d), u !== null); ) _ = a.lastIndex, a === qe ? u[1] === "!--" ? a = Vt : u[1] !== void 0 ? a = Wt : u[2] !== void 0 ? (ur.test(u[2]) && (i = RegExp("</" + u[2], "g")), a = _e) : u[3] !== void 0 && (a = _e) : a === _e ? u[0] === ">" ? (a = i ?? qe, s = -1) : u[1] === void 0 ? s = -2 : (s = a.lastIndex - u[2].length, f = u[1], a = u[3] === void 0 ? _e : u[3] === '"' ? Xt : Yt) : a === Xt || a === Yt ? a = _e : a === Vt || a === Wt ? a = qe : (a = _e, i = void 0);
    const p = a === _e && c[n + 1].startsWith("/>") ? " " : "";
    o += a === qe ? d + Er : s >= 0 ? (r.push(f), d.slice(0, s) + cr + d.slice(s) + ne + p) : d + ne + (s === -2 ? n : p);
  }
  return [pr(c, o + (c[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class tt {
  constructor({ strings: e, _$litType$: t }, r) {
    let i;
    this.parts = [];
    let o = 0, a = 0;
    const n = e.length - 1, d = this.parts, [f, u] = Dr(e, t);
    if (this.el = tt.createElement(f, r), fe.currentNode = this.el.content, t === 2 || t === 3) {
      const s = this.el.content.firstChild;
      s.replaceWith(...s.childNodes);
    }
    for (; (i = fe.nextNode()) !== null && d.length < n; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const s of i.getAttributeNames()) if (s.endsWith(cr)) {
          const _ = u[a++], p = i.getAttribute(s).split(ne), v = /([.?@])?(.*)/.exec(_);
          d.push({ type: 1, index: o, name: v[2], strings: p, ctor: v[1] === "." ? Hr : v[1] === "?" ? Br : v[1] === "@" ? Ir : ut }), i.removeAttribute(s);
        } else s.startsWith(ne) && (d.push({ type: 6, index: o }), i.removeAttribute(s));
        if (ur.test(i.tagName)) {
          const s = i.textContent.split(ne), _ = s.length - 1;
          if (_ > 0) {
            i.textContent = lt ? lt.emptyScript : "";
            for (let p = 0; p < _; p++) i.append(s[p], je()), fe.nextNode(), d.push({ type: 2, index: ++o });
            i.append(s[_], je());
          }
        }
      } else if (i.nodeType === 8) if (i.data === dr) d.push({ type: 2, index: o });
      else {
        let s = -1;
        for (; (s = i.data.indexOf(ne, s + 1)) !== -1; ) d.push({ type: 7, index: o }), s += ne.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const r = ge.createElement("template");
    return r.innerHTML = e, r;
  }
}
function Fe(c, e, t = c, r) {
  if (e === be) return e;
  let i = r !== void 0 ? t._$Co?.[r] : t._$Cl;
  const o = et(e) ? void 0 : e._$litDirective$;
  return i?.constructor !== o && (i?._$AO?.(!1), o === void 0 ? i = void 0 : (i = new o(c), i._$AT(c, t, r)), r !== void 0 ? (t._$Co ??= [])[r] = i : t._$Cl = i), i !== void 0 && (e = Fe(c, i._$AS(c, e.values), i, r)), e;
}
class Rr {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: r } = this._$AD, i = (e?.creationScope ?? ge).importNode(t, !0);
    fe.currentNode = i;
    let o = fe.nextNode(), a = 0, n = 0, d = r[0];
    for (; d !== void 0; ) {
      if (a === d.index) {
        let f;
        d.type === 2 ? f = new Ue(o, o.nextSibling, this, e) : d.type === 1 ? f = new d.ctor(o, d.name, d.strings, this, e) : d.type === 6 && (f = new zr(o, this, e)), this._$AV.push(f), d = r[++n];
      }
      a !== d?.index && (o = fe.nextNode(), a++);
    }
    return fe.currentNode = ge, i;
  }
  p(e) {
    let t = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, t), t += r.strings.length - 2) : r._$AI(e[t])), t++;
  }
}
class Ue {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, r, i) {
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = r, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = Fe(this, e, t), et(e) ? e === w || e == null || e === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : e !== this._$AH && e !== be && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Nr(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== w && et(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ge.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = tt.createElement(pr(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === i) this._$AH.p(t);
    else {
      const o = new Rr(i, this), a = o.u(this.options);
      o.p(t), this.T(a), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = Kt.get(e.strings);
    return t === void 0 && Kt.set(e.strings, t = new tt(e)), t;
  }
  k(e) {
    Pt(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let r, i = 0;
    for (const o of e) i === t.length ? t.push(r = new Ue(this.O(je()), this.O(je()), this, this.options)) : r = t[i], r._$AI(o), i++;
    i < t.length && (this._$AR(r && r._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const r = Ut(e).nextSibling;
      Ut(e).remove(), e = r;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class ut {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, r, i, o) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = o, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = w;
  }
  _$AI(e, t = this, r, i) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) e = Fe(this, e, t, 0), a = !et(e) || e !== this._$AH && e !== be, a && (this._$AH = e);
    else {
      const n = e;
      let d, f;
      for (e = o[0], d = 0; d < o.length - 1; d++) f = Fe(this, n[r + d], t, d), f === be && (f = this._$AH[d]), a ||= !et(f) || f !== this._$AH[d], f === w ? e = w : e !== w && (e += (f ?? "") + o[d + 1]), this._$AH[d] = f;
    }
    a && !i && this.j(e);
  }
  j(e) {
    e === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Hr extends ut {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === w ? void 0 : e;
  }
}
class Br extends ut {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== w);
  }
}
class Ir extends ut {
  constructor(e, t, r, i, o) {
    super(e, t, r, i, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = Fe(this, e, t, 0) ?? w) === be) return;
    const r = this._$AH, i = e === w && r !== w || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, o = e !== w && (r === w || i);
    i && this.element.removeEventListener(this.name, this, r), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
let zr = class {
  constructor(e, t, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Fe(this, e);
  }
};
const Or = { I: Ue }, Fr = At.litHtmlPolyfillSupport;
Fr?.(tt, Ue), (At.litHtmlVersions ??= []).push("3.3.3");
const Ur = (c, e, t) => {
  const r = t?.renderBefore ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const o = t?.renderBefore ?? null;
    r._$litPart$ = i = new Ue(e.insertBefore(je(), o), o, void 0, t ?? {});
  }
  return i._$AI(c), i;
};
const Et = globalThis;
let Oe = class extends Ie {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ur(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return be;
  }
};
Oe._$litElement$ = !0, Oe.finalized = !0, Et.litElementHydrateSupport?.({ LitElement: Oe });
const Gr = Et.litElementPolyfillSupport;
Gr?.({ LitElement: Oe });
(Et.litElementVersions ??= []).push("4.2.2");
const Vr = { attribute: !0, type: String, converter: st, reflect: !1, hasChanged: Mt }, Wr = (c = Vr, e, t) => {
  const { kind: r, metadata: i } = t;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), r === "setter" && ((c = Object.create(c)).wrapped = !0), o.set(t.name, c), r === "accessor") {
    const { name: a } = t;
    return { set(n) {
      const d = e.get.call(this);
      e.set.call(this, n), this.requestUpdate(a, d, c, !0, n);
    }, init(n) {
      return n !== void 0 && this.C(a, void 0, c, n), n;
    } };
  }
  if (r === "setter") {
    const { name: a } = t;
    return function(n) {
      const d = this[a];
      e.call(this, n), this.requestUpdate(a, d, c, !0, n);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function pt(c) {
  return (e, t) => typeof t == "object" ? Wr(c, e, t) : ((r, i, o) => {
    const a = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, r), a ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(c, e, t);
}
function _t(c) {
  return pt({ ...c, state: !0, attribute: !1 });
}
function _r(c) {
  return (e, t) => {
    const r = typeof e == "function" ? e : e[t];
    Object.assign(r, c);
  };
}
const Yr = { CHILD: 2 }, Xr = (c) => (...e) => ({ _$litDirective$: c, values: e });
let Kr = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, r) {
    this._$Ct = e, this._$AM = t, this._$Ci = r;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
};
const { I: qr } = Or, qt = (c) => c, Jt = () => document.createComment(""), Je = (c, e, t) => {
  const r = c._$AA.parentNode, i = e === void 0 ? c._$AB : e._$AA;
  if (t === void 0) {
    const o = r.insertBefore(Jt(), i), a = r.insertBefore(Jt(), i);
    t = new qr(o, a, c, c.options);
  } else {
    const o = t._$AB.nextSibling, a = t._$AM, n = a !== c;
    if (n) {
      let d;
      t._$AQ?.(c), t._$AM = c, t._$AP !== void 0 && (d = c._$AU) !== a._$AU && t._$AP(d);
    }
    if (o !== i || n) {
      let d = t._$AA;
      for (; d !== o; ) {
        const f = qt(d).nextSibling;
        qt(r).insertBefore(d, i), d = f;
      }
    }
  }
  return t;
}, he = (c, e, t = c) => (c._$AI(e, t), c), Jr = {}, Zr = (c, e = Jr) => c._$AH = e, Qr = (c) => c._$AH, yt = (c) => {
  c._$AR(), c._$AA.remove();
};
const Zt = (c, e, t) => {
  const r = /* @__PURE__ */ new Map();
  for (let i = e; i <= t; i++) r.set(c[i], i);
  return r;
}, jr = Xr(class extends Kr {
  constructor(c) {
    if (super(c), c.type !== Yr.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(c, e, t) {
    let r;
    t === void 0 ? t = e : e !== void 0 && (r = e);
    const i = [], o = [];
    let a = 0;
    for (const n of c) i[a] = r ? r(n, a) : a, o[a] = t(n, a), a++;
    return { values: o, keys: i };
  }
  render(c, e, t) {
    return this.dt(c, e, t).values;
  }
  update(c, [e, t, r]) {
    const i = Qr(c), { values: o, keys: a } = this.dt(e, t, r);
    if (!Array.isArray(i)) return this.ut = a, o;
    const n = this.ut ??= [], d = [];
    let f, u, s = 0, _ = i.length - 1, p = 0, v = o.length - 1;
    for (; s <= _ && p <= v; ) if (i[s] === null) s++;
    else if (i[_] === null) _--;
    else if (n[s] === a[p]) d[p] = he(i[s], o[p]), s++, p++;
    else if (n[_] === a[v]) d[v] = he(i[_], o[v]), _--, v--;
    else if (n[s] === a[v]) d[v] = he(i[s], o[v]), Je(c, d[v + 1], i[s]), s++, v--;
    else if (n[_] === a[p]) d[p] = he(i[_], o[p]), Je(c, i[s], i[_]), _--, p++;
    else if (f === void 0 && (f = Zt(a, p, v), u = Zt(n, s, _)), f.has(n[s])) if (f.has(n[_])) {
      const m = u.get(a[p]), b = m !== void 0 ? i[m] : null;
      if (b === null) {
        const l = Je(c, i[s]);
        he(l, o[p]), d[p] = l;
      } else d[p] = he(b, o[p]), Je(c, i[s], b), i[m] = null;
      p++;
    } else yt(i[_]), _--;
    else yt(i[s]), s++;
    for (; p <= v; ) {
      const m = Je(c, d[v + 1]);
      he(m, o[p]), d[p++] = m;
    }
    for (; s <= _; ) {
      const m = i[s++];
      m !== null && yt(m);
    }
    return this.ut = a, Zr(c, d), be;
  }
});
var Qt, jt;
(function(c) {
  c.language = "language", c.system = "system", c.comma_decimal = "comma_decimal", c.decimal_comma = "decimal_comma", c.space_comma = "space_comma", c.none = "none";
})(Qt || (Qt = {})), function(c) {
  c.language = "language", c.system = "system", c.am_pm = "12", c.twenty_four = "24";
}(jt || (jt = {}));
function ei(c) {
  return c.substr(0, c.indexOf("."));
}
var ti = ["closed", "locked", "off"], rt = function(c, e, t, r) {
  r = r || {}, t = t ?? {};
  var i = new Event(e, { bubbles: r.bubbles === void 0 || r.bubbles, cancelable: !!r.cancelable, composed: r.composed === void 0 || r.composed });
  return i.detail = t, c.dispatchEvent(i), i;
}, Ze = function(c) {
  rt(window, "haptic", c);
}, ri = function(c, e, t) {
  t === void 0 && (t = !1), t ? history.replaceState(null, "", e) : history.pushState(null, "", e), rt(window, "location-changed", { replace: t });
}, ii = function(c, e, t) {
  t === void 0 && (t = !0);
  var r, i = ei(e), o = i === "group" ? "homeassistant" : i;
  switch (i) {
    case "lock":
      r = t ? "unlock" : "lock";
      break;
    case "cover":
      r = t ? "open_cover" : "close_cover";
      break;
    default:
      r = t ? "turn_on" : "turn_off";
  }
  return c.callService(o, r, { entity_id: e });
}, oi = function(c, e) {
  var t = ti.includes(c.states[e].state);
  return ii(c, e, t);
}, ai = function(c, e, t, r) {
  if (r || (r = { action: "more-info" }), !r.confirmation || r.confirmation.exemptions && r.confirmation.exemptions.some(function(o) {
    return o.user === e.user.id;
  }) || (Ze("warning"), confirm(r.confirmation.text || "Are you sure you want to " + r.action + "?"))) switch (r.action) {
    case "more-info":
      (t.entity || t.camera_image) && rt(c, "hass-more-info", { entityId: t.entity ? t.entity : t.camera_image });
      break;
    case "navigate":
      r.navigation_path && ri(0, r.navigation_path);
      break;
    case "url":
      r.url_path && window.open(r.url_path);
      break;
    case "toggle":
      t.entity && (oi(e, t.entity), Ze("success"));
      break;
    case "call-service":
      if (!r.service) return void Ze("failure");
      var i = r.service.split(".", 2);
      e.callService(i[0], i[1], r.service_data, r.target), Ze("success");
      break;
    case "fire-dom-event":
      rt(c, "ll-custom", r);
  }
}, ni = function(c, e, t, r) {
  var i;
  r === "double_tap" && t.double_tap_action ? i = t.double_tap_action : r === "hold" && t.hold_action ? i = t.hold_action : r === "tap" && t.tap_action && (i = t.tap_action), ai(c, e, t, i);
};
const St = {
  // Multi-Stage Fade & Decay defaults
  fade_transition_enabled: !1,
  fade_trigger: "on_inactive",
  fade_target: "card",
  fade_smooth_retrigger: !0,
  show_decay_slider: !1,
  decay_slider_height: 10,
  decay_slider_position: "bottom",
  fade_stage_1_duration: 60,
  fade_stage_1_pickup: !0,
  fade_stage_1_color: "#ff9800",
  fade_stage_2_duration: 600,
  fade_stage_2_pickup: !0,
  fade_stage_2_color: "#cddc39",
  fade_stage_3_duration: 1800,
  fade_stage_3_pickup: !0,
  fade_stage_3_color: "#4caf50",
  entity: "",
  name: "",
  // Visual appearance defaults
  bg_color: "",
  bg_opacity: 10,
  border_radius: 12,
  card_border_width: 0,
  card_border_style: "none",
  card_border_color: "",
  card_opacity: 100,
  card_padding: 12,
  card_padding_vertical: 0,
  card_padding_horizontal: 15,
  card_margin: -1,
  card_width: "",
  card_max_width: "",
  card_height: "",
  card_min_height: 0,
  text_box_width: "",
  aspect_ratio: "",
  // Hover and interaction
  hover_effect: "glow",
  active_glow: !1,
  // Theme and presets
  theme_preset: "default",
  color_type: "card",
  active_color: "",
  inactive_color: "",
  // Slider styling & layer isolation
  use_light_color: !1,
  haptic_feedback: !0,
  haptic_type: "light",
  slider_stepped_movement: !1,
  tap_slider_to_toggle: !1,
  slider_style: "circle",
  full_slider_opacity: 100,
  show_slider_percent: !1,
  slider_color: "",
  slider_track_color: "",
  slider_height: 11,
  slider_border_radius: 5,
  slider_start_offset: 0,
  slider_end_offset: 0,
  slider_spacing: 8,
  show_slider: !1,
  hide_slider_when_off: !0,
  // Light color and temperature sliders
  show_color_temp: !0,
  hide_color_temp_when_off: !0,
  color_temp_type: "gradient",
  color_temp_height: 12,
  color_temp_border_radius: 5,
  color_temp_start_offset: 0,
  color_temp_end_offset: 0,
  show_color_picker: !1,
  hide_color_picker_when_off: !0,
  show_color_slider: !0,
  hide_color_slider_when_off: !0,
  color_slider_height: 12,
  color_slider_border_radius: 6,
  color_slider_start_offset: 0,
  color_slider_end_offset: 0,
  color_picker_type: "slider",
  // Controls position and secondary collapse trigger
  features_position: "bottom",
  collapse_controls_trigger: "none",
  text_color_mode: "selected",
  // Text and visibility options
  show_name: !0,
  show_state: !0,
  fill_container: !1,
  overflow_hidden: !1,
  visibility_state: "always",
  layout: "horizontal",
  card_layout: "normal",
  primary_info: "name",
  secondary_info: "last-updated",
  font_size_primary: 14,
  font_size_secondary: 15,
  font_weight_primary: "800",
  text_color_primary: "rgb(255, 255, 255)",
  text_color_secondary: "rgb(255, 255, 255)",
  text_scrolling_primary: "none",
  text_scrolling_secondary: "none",
  text_scrolling_speed: 10,
  text_transform_primary: "capitalize",
  text_transform_secondary: "capitalize",
  letter_spacing: -0.5,
  line_height: 1.1,
  // Spacing defaults
  content_spacing: 6,
  text_spacing: -1,
  features_margin: -3,
  sub_button_spacing: -4,
  sub_button_padding: 6,
  sub_button_alignment: "flex-end",
  text_offset_x: -28,
  text_offset_y: 2,
  primary_text_offset_x: 0,
  primary_text_offset_y: 0,
  primary_text_start_offset: 8,
  primary_text_end_offset: 250,
  secondary_text_offset_x: 0,
  secondary_text_offset_y: 0,
  secondary_text_start_offset: 8,
  secondary_text_end_offset: 250,
  features_offset_x: 0,
  features_offset_y: 0,
  // Box shadow and blur
  box_shadow: "none",
  backdrop_blur: 0,
  transition_duration: 1e4,
  // Actions
  tap_action: { action: "toggle" },
  hold_action: { action: "more-info" }
}, er = {
  default: {
    name: "default",
    label: "Default (Card Colors)",
    cssClass: "theme-default",
    generateStyles: () => ""
  },
  glassmorphism: {
    name: "glassmorphism",
    label: "Frosted Glassmorphism",
    cssClass: "theme-glassmorphism",
    generateStyles: (c) => {
      const e = c.glassmorphism_blur ?? 16, t = c.glassmorphism_opacity ?? 0.25;
      return `
        --theme-backdrop-filter: blur(${e}px);
        --theme-background: rgba(255, 255, 255, ${t});
        --theme-border: 1px solid rgba(255, 255, 255, 0.2);
        --theme-box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
      `;
    }
  },
  neumorphism: {
    name: "neumorphism",
    label: "Soft Neumorphism",
    cssClass: "theme-neumorphism",
    generateStyles: (c) => {
      const e = c.neumorphism_depth ?? 6;
      return `
        --theme-background: var(--card-background-color, #e0e5ec);
        --theme-box-shadow: ${e}px ${e}px ${e * 2}px rgba(163, 177, 198, 0.6),
                            -${e}px -${e}px ${e * 2}px rgba(255, 255, 255, 0.8);
        --theme-border: none;
      `;
    }
  },
  cyberpunk: {
    name: "cyberpunk",
    label: "Cyberpunk Neon",
    cssClass: "theme-cyberpunk",
    generateStyles: (c) => {
      const e = c.cyberpunk_glow ?? "#00f0ff";
      return `
        --theme-background: #0d0f18;
        --theme-border: 2px solid ${e};
        --theme-box-shadow: 0 0 15px ${e}44, inset 0 0 10px ${e}22;
        --primary-text-color: #00f0ff;
        --secondary-text-color: #ff003c;
      `;
    }
  },
  aurora: {
    name: "aurora",
    label: "Nordic Aurora",
    cssClass: "theme-aurora",
    generateStyles: () => `
      --theme-background: linear-gradient(135deg, rgba(32, 78, 95, 0.8), rgba(67, 154, 134, 0.7), rgba(164, 219, 178, 0.6));
      --theme-backdrop-filter: blur(20px);
      --theme-border: 1px solid rgba(255, 255, 255, 0.3);
      --primary-text-color: #ffffff;
      --secondary-text-color: rgba(255, 255, 255, 0.85);
    `
  },
  oled: {
    name: "oled",
    label: "OLED Pitch Black",
    cssClass: "theme-oled",
    generateStyles: () => `
      --theme-background: #000000;
      --theme-border: 1px solid #1f1f1f;
      --theme-box-shadow: none;
      --primary-text-color: #ffffff;
      --secondary-text-color: #888888;
    `
  },
  sunset: {
    name: "sunset",
    label: "Sunset Gradient",
    cssClass: "theme-sunset",
    generateStyles: () => `
      --theme-background: linear-gradient(135deg, #ff512f, #dd2476);
      --theme-border: none;
      --theme-box-shadow: 0 10px 20px rgba(221, 36, 118, 0.3);
      --primary-text-color: #ffffff;
      --secondary-text-color: rgba(255, 255, 255, 0.9);
    `
  },
  flat: {
    name: "flat",
    label: "Minimal Flat",
    cssClass: "theme-flat",
    generateStyles: () => `
      --theme-background: var(--card-background-color, #242424);
      --theme-border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.08));
      --theme-box-shadow: none;
    `
  },
  material_you: {
    name: "material_you",
    label: "Material You Pill",
    cssClass: "theme-material-you",
    generateStyles: () => `
      --theme-background: var(--primary-color-light, rgba(98, 0, 234, 0.12));
      --theme-border: none;
      --theme-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      --ha-card-border-radius: 28px;
    `
  },
  retro_synth: {
    name: "retro_synth",
    label: "80s Synthwave",
    cssClass: "theme-retro-synth",
    generateStyles: () => `
      --theme-background: linear-gradient(180deg, #2b1055, #7597de);
      --theme-border: 2px solid #ff007f;
      --theme-box-shadow: 0 0 20px rgba(255, 0, 127, 0.4);
      --primary-text-color: #ffe6ff;
      --secondary-text-color: #00ffff;
    `
  },
  minimal: {
    name: "minimal",
    label: "Minimalist Clean",
    cssClass: "theme-minimal",
    generateStyles: () => `
      --theme-background: transparent;
      --theme-border: none;
      --theme-box-shadow: none;
    `
  },
  custom: {
    name: "custom",
    label: "Custom Styling",
    cssClass: "theme-custom",
    generateStyles: () => ""
  }
}, Lt = class Lt {
  /**
   * Sanitize custom styles string to reject tag breakouts and script tags.
   */
  static sanitizeCustomStyles(e) {
    return !e || typeof e != "string" ? "" : /<\/?(script|style|iframe|object|embed)/i.test(e) ? (console.warn("[Antigravity] custom_styles contains invalid HTML tags. Ignored for security."), "") : e;
  }
  /**
   * Precompute static style strings on configuration changes with memoization.
   */
  static computeStaticStyles(e) {
    if (!e)
      return {
        staticCardStyles: "",
        staticCardClasses: "ha-card",
        textOffsetStyle: "",
        primaryTextOffsetStyle: "",
        secondaryTextOffsetStyle: "",
        featuresOffsetStyle: "",
        mainSliderMarginOffsets: "",
        colorTempMarginOffsets: "",
        colorHueMarginOffsets: "",
        textBoxWidth: "width: 100%; max-width: 100%;",
        primaryTextStyle: "",
        secondaryTextStyle: ""
      };
    const t = [
      e.theme_preset,
      e.card_padding,
      e.card_padding_vertical,
      e.card_padding_horizontal,
      e.card_margin,
      e.border_radius,
      e.slider_style,
      e.slider_height,
      e.slider_border_radius,
      e.content_spacing,
      e.text_spacing,
      e.features_margin,
      e.sub_button_spacing,
      e.sub_button_padding,
      e.text_offset_x,
      e.text_offset_y,
      e.primary_text_start_offset,
      e.primary_text_end_offset,
      e.secondary_text_start_offset,
      e.secondary_text_end_offset,
      e.font_size_primary,
      e.font_size_secondary,
      e.font_weight_primary,
      e.letter_spacing,
      e.line_height,
      e.layout,
      e.card_layout,
      e.full_slider_opacity,
      e.text_color_mode,
      e.hover_effect
    ].join("|");
    if (this._computedStylesCache.has(t))
      return this._computedStylesCache.get(t);
    const r = e.card_padding_vertical ?? e.card_padding ?? 0, i = e.card_padding_horizontal ?? e.card_padding ?? 15, o = e.card_padding_top ?? r, a = e.card_padding_bottom ?? r, n = e.card_padding_left ?? i, d = e.card_padding_right ?? i, f = e.card_margin ?? -1, u = e.card_margin_vertical ?? f, s = e.card_margin_horizontal ?? f, _ = e.card_margin_top ?? u, p = e.card_margin_bottom ?? u, v = e.card_margin_left ?? s, m = e.card_margin_right ?? s;
    let b = "";
    (_ !== void 0 || p !== void 0 || v !== void 0 || m !== void 0) && (b = `margin: ${_ ?? 0}px ${m ?? 0}px ${p ?? 0}px ${v ?? 0}px;`);
    const l = e.border_radius ?? 12, h = e.slider_style === "google", g = e.slider_style === "full", y = h ? 42 : g ? 40 : 12, $ = e.slider_height !== void 0 ? e.slider_height : y, x = h ? 21 : g ? 0 : $ / 2, k = e.slider_border_radius !== void 0 ? e.slider_border_radius : x, T = e.card_border_width ?? (e.card_border_color ? 1 : 0), M = e.card_border_style ?? "solid", C = T > 0 ? `border: ${T}px ${M} ${e.card_border_color || "var(--divider-color, rgba(150, 150, 150, 0.2))"};` : "", N = e.card_width ? `width: ${e.card_width};` : "", P = e.card_max_width ? `max-width: ${e.card_max_width};` : "", O = e.card_height ? `height: ${e.card_height};` : "", K = e.card_min_height !== void 0 ? `min-height: ${e.card_min_height}px;` : "", le = e.fill_container === !0 ? "height: 100%; width: 100%;" : "", ve = e.overflow_hidden !== !1 ? "overflow: hidden;" : "overflow: visible;", ye = e.backdrop_blur !== void 0 ? `backdrop-filter: blur(${e.backdrop_blur}px); -webkit-backdrop-filter: blur(${e.backdrop_blur}px);` : "", xe = e.card_opacity !== void 0 ? `opacity: ${e.card_opacity / 100};` : "", W = e.transition_duration !== void 0 ? `transition: all ${e.transition_duration}ms ease;` : "", we = e.card_padding_vertical ?? 0, Se = e.card_padding_horizontal ?? 0, $e = 0, Ce = 0, ke = e.sub_button_padding ?? 6, Te = e.sub_button_container_padding ?? 0, Ve = e.sub_button_alignment ? `--ag-sub-button-alignment: ${e.sub_button_alignment};` : "--ag-sub-button-alignment: flex-end;", Me = e.text_scrolling_speed ? `--ag-scroll-speed: ${e.text_scrolling_speed}s;` : "", Ae = e.full_slider_opacity !== void 0 ? `--ag-full-slider-opacity: ${e.full_slider_opacity / 100};` : "", L = e.theme_preset || "default", q = er[L] || er.default, ce = q.generateStyles(e), F = [
      b,
      `border-radius: ${l}px;`,
      C,
      N,
      P,
      O,
      K,
      le,
      ve,
      ye,
      xe,
      W,
      `--ag-card-padding: ${o}px ${d}px ${a}px ${n}px;`,
      `--ag-text-padding: ${we}px ${Se}px;`,
      `--ag-features-padding: ${$e}px ${Ce}px;`,
      `--ag-sub-button-padding: ${ke}px;`,
      `--ag-sub-button-container-padding: ${Te}px;`,
      `--ag-content-spacing: ${e.content_spacing ?? 6}px;`,
      `--ag-text-spacing: ${e.text_spacing ?? -1}px;`,
      `--ag-features-margin: ${e.features_margin ?? -3}px;`,
      `--ag-slider-spacing: ${e.slider_spacing ?? 6}px;`,
      `--ag-sub-button-spacing: ${e.sub_button_spacing ?? -4}px;`,
      `--ag-slider-height: ${$}px;`,
      `--ag-slider-radius: ${k}px;`,
      `--ag-text-alignment: ${e.text_alignment ?? "left"};`,
      `--ag-content-alignment: ${e.content_alignment ?? "flex-start"};`,
      Ve,
      Me,
      Ae,
      ce
    ].filter(Boolean).join(" ").trim(), de = [
      "ha-card",
      q.cssClass,
      `layout-${e.layout || "default"}`,
      e.card_layout === "large" ? "card-large" : "",
      `hover-${e.hover_effect ?? "glow"}`,
      `slider-style-${e.slider_style ?? "circle"}`,
      e.text_color_mode === "inverse" ? "text-color-mode-inverse" : ""
    ].filter(Boolean).join(" "), U = Number(e.text_offset_x) || -28, Pe = Number(e.text_offset_y) || 2, B = `transform: translate(${U}px, ${Pe}px);`, te = Number(e.primary_text_start_offset ?? e.primary_text_offset_x) || 8, Ee = Number(e.primary_text_end_offset) || 250, ue = Number(e.primary_text_offset_y) || 0, Ne = te !== 0 || ue !== 0 ? `transform: translate(${te}px, ${ue}px);` : "", Le = te !== 0 || Ee !== 0 ? `margin-left: ${te}px; margin-right: ${Ee}px;` : "", De = `${Ne} ${Le}`.trim(), J = Number(e.secondary_text_start_offset ?? e.secondary_text_offset_x) || 8, Z = Number(e.secondary_text_end_offset) || 250, I = Number(e.secondary_text_offset_y) || 0, G = J !== 0 || I !== 0 ? `transform: translate(${J}px, ${I}px);` : "", We = J !== 0 || Z !== 0 ? `margin-left: ${J}px; margin-right: ${Z}px;` : "", Ye = `${G} ${We}`.trim(), re = Number(e.features_offset_x) || 0, ie = Number(e.features_offset_y) || 0, Re = re !== 0 || ie !== 0 ? `transform: translate(${re}px, ${ie}px);` : "", oe = Number(e.slider_start_offset) || 0, pe = Number(e.slider_end_offset) || 0, E = [
      oe ? `margin-left: ${oe}px !important;` : "",
      pe ? `margin-right: ${pe}px !important;` : ""
    ].filter(Boolean).join(" "), V = Number(e.color_temp_start_offset) || 0, A = Number(e.color_temp_end_offset) || 0, Y = [
      V ? `margin-left: ${V}px !important;` : "",
      A ? `margin-right: ${A}px !important;` : ""
    ].filter(Boolean).join(" "), He = Number(e.color_slider_start_offset) || 0, ae = Number(e.color_slider_end_offset) || 0, mt = [
      He ? `margin-left: ${He}px !important;` : "",
      ae ? `margin-right: ${ae}px !important;` : ""
    ].filter(Boolean).join(" "), Xe = e.text_box_width ? `max-width: ${e.text_box_width}; width: ${e.text_box_width};` : "width: 100%; max-width: 100%;", gt = e.font_family_primary ? `font-family: ${e.font_family_primary};` : "", bt = `font-size: ${e.font_size_primary ?? 14}px;`, it = `font-weight: ${e.font_weight_primary ?? "800"};`, Rt = `text-transform: ${e.text_transform_primary ?? "capitalize"};`, Ke = `letter-spacing: ${e.letter_spacing ?? -0.5}px;`, Ht = `line-height: ${e.line_height ?? 1.1};`, mr = `${gt} ${bt} ${it} ${Rt} ${Ke} ${Ht}`.trim(), gr = e.font_family_secondary ? `font-family: ${e.font_family_secondary};` : "", br = `font-size: ${e.font_size_secondary ?? 15}px;`, vr = e.font_weight_secondary ? `font-weight: ${e.font_weight_secondary};` : "", yr = `text-transform: ${e.text_transform_secondary ?? "capitalize"};`, xr = `${gr} ${br} ${vr} ${yr} ${Ke} ${Ht}`.trim(), Bt = {
      staticCardStyles: F,
      staticCardClasses: de,
      textOffsetStyle: B,
      primaryTextOffsetStyle: De,
      secondaryTextOffsetStyle: Ye,
      featuresOffsetStyle: Re,
      mainSliderMarginOffsets: E,
      colorTempMarginOffsets: Y,
      colorHueMarginOffsets: mt,
      textBoxWidth: Xe,
      primaryTextStyle: mr,
      secondaryTextStyle: xr
    };
    return this._computedStylesCache.set(t, Bt), Bt;
  }
};
Lt._computedStylesCache = /* @__PURE__ */ new Map();
let $t = Lt;
class si {
  constructor() {
    this._activeCardInstances = /* @__PURE__ */ new Set(), this._peakMemoryMB = 0, this._isLogging = !1;
  }
  registerCard(e) {
    this._activeCardInstances.add(e), this._updatePeakMemory();
  }
  unregisterCard(e) {
    this._activeCardInstances.delete(e);
  }
  getActiveCardCount() {
    return this._activeCardInstances.size;
  }
  _updatePeakMemory() {
    const e = performance?.memory;
    if (e?.usedJSHeapSize) {
      const t = Number((e.usedJSHeapSize / 1048576).toFixed(2));
      t > this._peakMemoryMB && (this._peakMemoryMB = t);
    }
  }
  getMemorySnapshot() {
    this._updatePeakMemory();
    const e = performance?.memory, t = {
      activeCardsCount: this._activeCardInstances.size,
      peakJSHeapSizeMB: this._peakMemoryMB > 0 ? this._peakMemoryMB : void 0,
      timestamp: Date.now()
    };
    return e && (t.usedJSHeapSizeMB = Number((e.usedJSHeapSize / (1024 * 1024)).toFixed(2)), t.totalJSHeapSizeMB = Number((e.totalJSHeapSize / (1024 * 1024)).toFixed(2)), t.jsHeapSizeLimitMB = Number((e.jsHeapSizeLimit / (1024 * 1024)).toFixed(2))), t;
  }
  enableDebugLogging(e = !0) {
    this._isLogging = e;
  }
  logStatus() {
    if (!this._isLogging) return;
    const e = this.getMemorySnapshot();
    e.usedJSHeapSizeMB !== void 0 && console.info(
      `%c 🧠 ANTIGRAVITY MEMORY %c ${e.usedJSHeapSizeMB}MB / ${e.totalJSHeapSizeMB}MB (Peak: ${e.peakJSHeapSizeMB ?? e.usedJSHeapSizeMB}MB, Active Cards: ${e.activeCardsCount}) `,
      "color: white; background: #00897b; font-weight: 700; padding: 2px 6px; border-radius: 4px 0 0 4px;",
      "color: #00897b; background: #e0f2f1; font-weight: 700; padding: 2px 6px; border-radius: 0 4px 4px 0;"
    );
  }
}
const ct = new si();
class li {
  constructor() {
    this._battery = null, this._isLowPower = !1, this._listeners = /* @__PURE__ */ new Set(), this._onChargingChange = null, this._onLevelChange = null, this._onConnectionChange = null, this._initBattery(), this._initSaveDataListener();
  }
  async _initBattery() {
    if (typeof navigator < "u" && "getBattery" in navigator)
      try {
        this._battery = await navigator.getBattery(), this._updatePowerState(), this._onChargingChange = () => {
          this._updatePowerState(), this._notifyListeners();
        }, this._onLevelChange = () => {
          this._updatePowerState(), this._notifyListeners();
        }, this._battery.addEventListener("chargingchange", this._onChargingChange), this._battery.addEventListener("levelchange", this._onLevelChange);
      } catch {
      }
  }
  _initSaveDataListener() {
    if (typeof navigator < "u" && navigator.connection) {
      const e = navigator.connection;
      e.saveData && (this._isLowPower = !0), this._onConnectionChange = () => {
        e.saveData && (this._isLowPower = !0, this._notifyListeners());
      }, e.addEventListener?.("change", this._onConnectionChange);
    }
  }
  _updatePowerState() {
    if (!this._battery) return;
    const e = !this._battery.charging && this._battery.level < 0.2, t = navigator?.connection?.saveData === !0;
    this._isLowPower = e || t;
  }
  addChangeListener(e) {
    return this._listeners.add(e), () => this._listeners.delete(e);
  }
  get listenerCount() {
    return this._listeners.size;
  }
  _notifyListeners() {
    for (const e of this._listeners)
      try {
        e();
      } catch (t) {
        console.error("Error in power listener:", t);
      }
    typeof window < "u" && window.dispatchEvent(new CustomEvent("antigravity-power-change", {
      detail: { isLowPower: this._isLowPower }
    }));
  }
  /**
   * Determine if power save mode should be active.
   * Considers hardware battery level, saveData headers, and HA helper state.
   */
  isPowerSaveActive(e) {
    return e?.states?.["input_boolean.antigravity_power_save"]?.state === "on" ? !0 : this._isLowPower;
  }
  /**
   * Get recommended animation throttle limit in ms.
   * Returns 16ms (~60fps) in normal mode, or 33ms (~30fps) in power-save mode.
   */
  getTargetFrameIntervalMs(e) {
    return this.isPowerSaveActive(e) ? 33 : 16;
  }
  /**
   * For testing or manual override
   */
  setMockLowPower(e) {
    this._isLowPower = e, this._notifyListeners();
  }
  /**
   * Cleanup global listeners upon teardown
   */
  destroy() {
    this._battery && (this._onChargingChange && this._battery.removeEventListener("chargingchange", this._onChargingChange), this._onLevelChange && this._battery.removeEventListener("levelchange", this._onLevelChange)), typeof navigator < "u" && navigator.connection && this._onConnectionChange && navigator.connection.removeEventListener?.("change", this._onConnectionChange), this._listeners.clear();
  }
}
const me = new li(), ci = {
  preserveDrawingBuffer: !1,
  powerPreference: "low-power",
  alpha: !0,
  antialias: !1,
  depth: !1,
  stencil: !1
};
function di(c, e = ci) {
  try {
    const t = c.getContext("webgl2", e) || c.getContext("webgl", e) || c.getContext("experimental-webgl", e);
    return t ? (t.getExtension("ANGLE_instanced_arrays"), t.getExtension("EXT_color_buffer_half_float"), t.getExtension("OES_texture_half_float"), c.addEventListener("webglcontextlost", (r) => {
      r.preventDefault(), console.warn("Antigravity WebGL context lost");
    }, { passive: !1 }), c.addEventListener("webglcontextrestored", () => {
      console.info("Antigravity WebGL context restored");
    }, { passive: !0 }), t) : null;
  } catch (t) {
    return console.warn("WebGL init failed:", t), null;
  }
}
function hr(c) {
  if (c)
    try {
      const e = c.getParameter(c.MAX_VERTEX_ATTRIBS) || 16;
      for (let t = 0; t < e; ++t)
        c.disableVertexAttribArray(t);
      c.bindBuffer(c.ARRAY_BUFFER, null), c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, null), c.bindRenderbuffer(c.RENDERBUFFER, null), c.bindFramebuffer(c.FRAMEBUFFER, null);
    } catch (e) {
      console.warn("WebGL cleanup warning:", e);
    }
}
async function fr() {
  const c = performance.now();
  let e = 0, t = 0;
  const r = (v, m) => {
    t++, v ? e++ : console.error(`❌ Assertion failed: ${m}`);
  }, i = ct.getMemorySnapshot();
  r(i.activeCardsCount >= 0, "Memory tracker active card count is non-negative");
  let o = !1;
  if (typeof document < "u") {
    const v = document.createElement("canvas"), m = di(v);
    m && (o = !0, r(m.getParameter(m.MAX_VERTEX_ATTRIBS) > 0, "WebGL attributes available"), hr(m));
  }
  const a = 1e3;
  let n = 0;
  for (let v = 0; v < a; v++) {
    const m = performance.now();
    n += performance.now() - m;
  }
  const d = Number((n / a).toFixed(4));
  r(d < 0.1, "Benchmark iteration takes under 0.1ms");
  const f = me.isPowerSaveActive(), u = me.getTargetFrameIntervalMs();
  r(u === 16 || u === 33, "Frame target is either 16ms or 33ms");
  const s = performance.now() - c, _ = e === t, p = {
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    environment: typeof navigator < "u" ? navigator.userAgent : "Node/Test",
    renderBenchmarkMs: d,
    memoryUsageMB: i.usedJSHeapSizeMB || 0,
    powerSaveModeActive: f,
    webglSupported: o,
    assertionsPassed: e,
    totalAssertions: t,
    passed: _
  };
  return console.info(
    `%c 🧪 ANTIGRAVITY CI RUNNER %c Passed ${e}/${t} | Benchmark: ${d}ms/op | Duration: ${s.toFixed(2)}ms `,
    "color: white; background: #2e7d32; font-weight: 700; padding: 2px 6px; border-radius: 4px 0 0 4px;",
    "color: #2e7d32; background: #e8f5e9; font-weight: 700; padding: 2px 6px; border-radius: 0 4px 4px 0;"
  ), p;
}
typeof window < "u" && window.__RUN_CI__ && fr();
const ui = lr`
  :host {
    will-change: transform, opacity;
    backface-visibility: hidden;
  }
  :host([hidden]),
  :host([offscreen]) *,
  :host([offscreen]) .anim-spin,
  :host([offscreen]) .anim-bounce,
  :host([offscreen]) .pulse,
  :host([offscreen]) .scroll-content {
    animation-play-state: paused !important;
  }
  :host([power-save]) {
    --ag-transition-speed: 0.1s;
  }
  :host([power-save]) .pulse,
  :host([power-save]) .anim-spin,
  :host([power-save]) .anim-bounce {
    animation: none !important;
  }
  :host([power-save]) .theme-glassmorphism,
  :host([power-save]) .theme-aurora {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    background: var(--card-background-color, rgba(30, 30, 30, 0.9)) !important;
  }
  :host([hidden]) {
    display: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  :host {
    display: block;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }
  :host([hidden]) {
    display: none !important;
  }
  input[type="range"] {
    touch-action: pan-y;
    -webkit-appearance: none;
    appearance: none;
  }
  ha-card {
    cursor: pointer;
    box-sizing: border-box;
    overflow: hidden;
    contain: layout paint style;
    content-visibility: auto;
    contain-intrinsic-size: 64px;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    --ha-card-border-width: 0;
    position: relative;
    outline: none;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
  }
  ha-card:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
  .sub-button {
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
  }
  .sub-button ha-icon,
  .sub-button ha-svg-icon {
    pointer-events: none;
  }
  .sub-button:hover {
    will-change: transform, background, color;
  }
  .sub-button:active {
    transform: scale(0.93) translate3d(0, 0, 0) !important;
    will-change: transform, background, color;
  }
  .color-temp-chips,
  .color-swatch-chips,
  .sub-buttons-container {
    scrollbar-width: none;
    -ms-overflow-style: none;
    contain: layout style;
  }
  .color-temp-chips::-webkit-scrollbar,
  .color-swatch-chips::-webkit-scrollbar,
  .sub-buttons-container::-webkit-scrollbar {
    display: none;
  }
  .active-border-gradient {
    border: 2px solid transparent !important;
    background-image: linear-gradient(var(--card-background-color, #1e1e1e), var(--card-background-color, #1e1e1e)), linear-gradient(135deg, #6200ea, #00e5ff, #76ff03) !important;
    background-origin: border-box !important;
    background-clip: padding-box, border-box !important;
  }
  .glass-specular-edge {
    box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.28), 0 8px 32px 0 rgba(0, 0, 0, 0.3) !important;
  }
  .card-chip .card-content {
    min-height: 32px !important;
    padding: 4px 8px !important;
  }
  .color-swatch-chip[active] {
    outline: 2px solid #ffffff;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.85);
  }
  .alarm-pending {
    animation: ag-alarm-pulse 1.5s infinite alternate;
  }
  @keyframes ag-alarm-pulse {
    from { box-shadow: 0 0 4px #ff9800; }
    to { box-shadow: 0 0 16px #ff9800, inset 0 0 8px rgba(255, 152, 0, 0.3); }
  }
  .warning-card {
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--warning-color, #ff9800);
    background: rgba(255, 152, 0, 0.08);
    border: 1px solid rgba(255, 152, 0, 0.2);
    border-radius: 12px;
    font-size: 13px;
    font-weight: 500;
  }
  .warning-card code {
    background: rgba(0, 0, 0, 0.2);
    padding: 2px 6px;
    border-radius: 4px;
  }
  .card-content {
    display: flex;
    flex-direction: column;
    gap: var(--ag-features-margin, 12px);
    width: 100%;
    box-sizing: border-box;
  }
  .card-content.features-inline .info-container { flex-wrap: wrap; }

  /* --- THEME PRESETS --- */
  .theme-glassmorphism {
    background: rgba(255, 255, 255, 0.08) !important;
    backdrop-filter: blur(16px) saturate(180%) !important;
    -webkit-backdrop-filter: blur(16px) saturate(180%) !important;
    border: 1px solid rgba(255, 255, 255, 0.15) !important;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.25) !important;
  }
  .theme-neumorphism {
    background: var(--card-background-color, #1e1e1e) !important;
    box-shadow: 6px 6px 14px rgba(0,0,0,0.4), -6px -6px 14px rgba(255,255,255,0.05) !important;
    border: none !important;
  }
  .theme-cyberpunk {
    background: rgba(10, 10, 20, 0.95) !important;
    border: 1px solid #00ffcc !important;
    box-shadow: 0 0 15px rgba(0, 255, 204, 0.35), inset 0 0 15px rgba(255, 0, 128, 0.2) !important;
  }
  .theme-minimal_flat {
    background: var(--card-background-color, rgba(150, 150, 150, 0.05)) !important;
    border: none !important;
    box-shadow: none !important;
  }
  .theme-sunset_gradient {
    background: linear-gradient(135deg, rgba(255, 94, 98, 0.85), rgba(255, 153, 102, 0.85)) !important;
    color: white !important;
  }
  .theme-oled_black {
    background: #000000 !important;
    border: 1px solid #222222 !important;
    box-shadow: none !important;
  }
  .theme-aurora {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(99, 102, 241, 0.3), rgba(236, 72, 153, 0.25)) !important;
    backdrop-filter: blur(20px) saturate(190%) !important;
    -webkit-backdrop-filter: blur(20px) saturate(190%) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3) !important;
  }
  .theme-material_you {
    background: var(--ha-card-background, var(--card-background-color, rgba(150, 150, 150, 0.08))) !important;
    border: 1px solid var(--divider-color, rgba(150, 150, 150, 0.25)) !important;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08) !important;
  }
  .theme-retro_synth {
    background: linear-gradient(135deg, #18002e 0%, #0d001a 100%) !important;
    border: 1px solid #ff007f !important;
    box-shadow: 0 0 15px rgba(255, 0, 127, 0.35), inset 0 0 15px rgba(0, 255, 255, 0.15) !important;
  }

  /* --- HOVER EFFECTS --- */
  .hover-lift:hover {
    will-change: transform, box-shadow;
    transform: translateY(-3px) translateZ(0);
    box-shadow: 0 8px 20px rgba(0,0,0,0.25);
  }
  .hover-glow:hover {
    box-shadow: 0 0 24px var(--ag-glow-color, var(--ag-active-color, var(--primary-color))) !important;
  }
  ha-card[active].card-active-glow {
    box-shadow: 0 0 22px var(--ag-glow-color, var(--ag-active-color, var(--primary-color))), 0 0 45px rgba(255, 255, 255, 0.18) !important;
  }
  .hover-scale:hover {
    will-change: transform;
    transform: scale(1.02) translateZ(0);
  }

  /* --- CARD LAYOUT: LARGE --- */
  .card-large .card-content {
    min-height: 64px;
    justify-content: center;
  }
  .card-large .info-container {
    gap: 16px !important;
  }

  /* --- CONTENT LAYOUT --- */
  .layout-default .info-container, .layout-horizontal .info-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--ag-content-spacing, 12px);
    width: 100%;
    box-sizing: border-box;
    min-width: 0;
  }
  .layout-default .info, .layout-horizontal .info { align-items: flex-start; }
  .layout-vertical .info-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--ag-content-spacing, 8px);
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    min-width: 0;
  }
  .layout-vertical .info { align-items: center; }

  /* --- COLLAPSIBLE CONTROLS ACCORDION --- */
  .collapsible-wrapper {
    display: grid;
    grid-template-rows: 1fr;
    gap: var(--ag-features-margin, 4px);
    opacity: 1;
    overflow: hidden;
    transform: translateZ(0);
    transition: grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease, margin 0.35s ease;
  }
  .collapsible-wrapper.collapsed {
    grid-template-rows: 0fr !important;
    opacity: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    pointer-events: none !important;
  }
  .collapsible-wrapper > div {
    overflow: hidden;
    min-height: 0;
  }
  .inline-sliders.collapsed {
    display: none !important;
  }

  /* --- INVERSE TEXT COLOR MODE --- */
  .text-color-mode-inverse .primary,
  .text-color-mode-inverse .secondary {
    mix-blend-mode: difference !important;
    color: #ffffff !important;
  }

  /* --- INLINE FEATURES POSITION --- */
  .features-container {
    display: flex;
    flex-direction: column;
    gap: var(--ag-slider-spacing, 4px);
    width: 100%;
    padding: var(--ag-features-padding, 0px);
  }
  .inline-sliders {
    flex: 1;
    min-width: 80px;
    display: flex;
    flex-direction: column;
    gap: var(--ag-slider-spacing, 4px);
  }

  .door-open {
    border-color: rgba(255, 152, 0, 0.5) !important;
  }

  /* --- TEXT & MARQUEE SCROLLING --- */
  .info {
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;
    width: 100%;
    min-width: 0;
    justify-content: center;
    overflow: hidden;
    gap: var(--ag-text-spacing, 0px);
    padding: var(--ag-text-padding, 0px);
    box-sizing: border-box;
  }
  .text-marquee-container {
    display: flex;
    overflow: hidden;
    width: 100%;
    max-width: 100%;
    position: relative;
    white-space: nowrap;
  }
  .primary {
    color: var(--primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    font-size: clamp(12px, 2.8vw, var(--ag-primary-font-size, 14px));
    pointer-events: none;
  }
  .secondary {
    font-weight: 500;
    opacity: 0.7;
    color: var(--secondary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    font-size: clamp(11px, 2.5vw, var(--ag-secondary-font-size, 15px));
    pointer-events: none;
  }
  .hvac-heating {
    box-shadow: 0 0 16px rgba(255, 112, 67, 0.45) !important;
  }
  .hvac-cooling {
    box-shadow: 0 0 16px rgba(41, 182, 246, 0.45) !important;
  }
  .hvac-drying {
    box-shadow: 0 0 16px rgba(171, 71, 188, 0.45) !important;
  }
  .cover-opening ha-icon {
    animation: ag-bounce-up 1s infinite alternate ease-in-out;
  }
  .cover-closing ha-icon {
    animation: ag-bounce-down 1s infinite alternate ease-in-out;
  }
  @keyframes ag-bounce-up {
    from { transform: translateY(0); }
    to { transform: translateY(-3px); }
  }
  @keyframes ag-bounce-down {
    from { transform: translateY(0); }
    to { transform: translateY(3px); }
  }

  /* Bounce / Ping-Pong Marquee Animation */
  .text-marquee-container.scroll-marquee .scroll-content {
    overflow: visible;
    text-overflow: clip;
    width: auto;
    display: inline-block;
    will-change: transform;
    animation: text-marquee-bounce var(--ag-marquee-speed, 10s) ease-in-out infinite alternate;
  }

  /* Continuous Ticker Loop Animation */
  .text-marquee-container.scroll-continuous .scroll-content {
    overflow: visible;
    text-overflow: clip;
    width: auto;
    display: inline-block;
    will-change: transform;
    animation: text-marquee-continuous var(--ag-marquee-speed, 10s) linear infinite;
  }

  /* Scroll on Hover Animation */
  .text-marquee-container.scroll-hover:hover .scroll-content,
  ha-card:hover .text-marquee-container.scroll-hover .scroll-content {
    overflow: visible;
    text-overflow: clip;
    width: auto;
    display: inline-block;
    will-change: transform;
    animation: text-marquee-bounce var(--ag-marquee-speed, 6s) ease-in-out infinite alternate;
  }

  @keyframes text-marquee-bounce {
    0%, 20% {
      transform: translateX(0%);
    }
    80%, 100% {
      transform: translateX(-40%);
    }
  }

  @keyframes text-marquee-continuous {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  /* --- DECAY / COOLDOWN SLIDER --- */
  .decay-slider-container {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    margin: 2px 0;
  }
  .decay-slider-track {
    width: 100%;
    background: var(--slider-track-color, rgba(150, 150, 150, 0.2));
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  .decay-slider-fill {
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    transition: width 1s linear, background-color 1s ease-out;
  }
  .decay-slider-badge {
    position: relative;
    z-index: 2;
    margin-left: auto;
    margin-right: 8px;
    font-size: 11px;
    font-weight: 700;
    color: var(--primary-text-color, #ffffff);
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    pointer-events: none;
  }

  /* --- FULL CARD SLIDER --- */
  .slider-style-full {
    position: relative;
    overflow: hidden !important;
  }
  .slider-style-full .card-content {
    position: relative;
    z-index: 2;
    pointer-events: none;
  }
  .slider-style-full .collapsible-wrapper {
    position: relative !important;
    z-index: 2 !important;
    pointer-events: auto !important;
  }
  .slider-style-full .info {
    position: relative !important;
    z-index: 2 !important;
    pointer-events: none !important;
  }
  .slider-style-full .info .primary,
  .slider-style-full .info .secondary {
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
  }
  .slider-style-full .main-slider-full {
    position: absolute !important;
    top: 0 !important;
    left: 0;
    right: 0;
    width: 100%;
    height: 100% !important;
    padding: 0 !important;
    z-index: 1 !important;
    pointer-events: auto !important;
    border-radius: var(--ag-slider-radius, var(--ha-card-border-radius, 12px)) !important;
    overflow: hidden !important;
    opacity: var(--ag-full-slider-opacity, 1) !important;
  }
  .slider-style-full .main-slider-full input[type=range] {
    height: 100% !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    cursor: grab !important;
    border-radius: var(--ag-slider-radius, var(--ha-card-border-radius, 12px)) !important;
    overflow: hidden !important;
  }
  .slider-style-full .main-slider-full input[type=range]::-webkit-slider-runnable-track {
    height: 100% !important;
    border-radius: var(--ag-slider-radius, var(--ha-card-border-radius, 12px)) !important;
    border: none !important;
    background: linear-gradient(
      to right,
      var(--slider-color, var(--primary-color)) 0%,
      var(--slider-color, var(--primary-color)) var(--slider-pct, 100%),
      var(--slider-track-color, transparent) var(--slider-pct, 100%),
      var(--slider-track-color, transparent) 100%
    ) !important;
  }
  .slider-style-full .main-slider-full input[type=range]::-moz-range-track {
    height: 100% !important;
    border-radius: var(--ag-slider-radius, var(--ha-card-border-radius, 12px)) !important;
    border: none !important;
    background: linear-gradient(
      to right,
      var(--slider-color, var(--primary-color)) 0%,
      var(--slider-color, var(--primary-color)) var(--slider-pct, 100%),
      var(--slider-track-color, transparent) var(--slider-pct, 100%),
      var(--slider-track-color, transparent) 100%
    ) !important;
  }
  .slider-style-full .main-slider-full input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0 !important;
    height: 0 !important;
    background: transparent !important;
    border: none !important;
  }
  .slider-style-full .main-slider-full input[type=range]::-moz-range-thumb {
    width: 0 !important;
    height: 0 !important;
    background: transparent !important;
    border: none !important;
  }
  .slider-style-full .card-content > .features-container {
    height: 0 !important;
    margin: 0 !important;
    gap: 0 !important;
    padding: 0 !important;
  }
  .slider-style-full .info-container > .inline-sliders {
    height: 0 !important;
    margin: 0 !important;
    gap: 0 !important;
    padding: 0 !important;
  }

  /* --- CAPSULE SLIDERS (BUBBLE & MUSHROOM SIGNATURE) --- */
  .slider-container { padding: 0 2px; }
  .slider-container input[type=range] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%; margin: 0; cursor: grab;
    background: transparent;
    height: calc(var(--ag-slider-height, 12px) + 12px);
    touch-action: pan-y;
  }
  .slider-container input[type=range]::-webkit-slider-runnable-track {
    background: linear-gradient(
      to right,
      var(--slider-color, var(--primary-color)) 0%,
      var(--slider-color, var(--primary-color)) var(--slider-pct, 100%),
      var(--slider-track-color, var(--divider-color, rgba(150, 150, 150, 0.2))) var(--slider-pct, 100%),
      var(--slider-track-color, var(--divider-color, rgba(150, 150, 150, 0.2))) 100%
    );
    height: var(--ag-slider-height, 12px);
    border-radius: var(--ag-slider-radius, 6px);
    transition: background 0.05s ease;
  }
  /* --- SLIDER STYLE 1: CIRCLE KNOB (DEFAULT) --- */
  .slider-style-circle .slider-container input[type=range]::-webkit-slider-thumb,
  .slider-container input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 22px; height: 22px;
    border-radius: 50%;
    background: var(--slider-color, var(--primary-color));
    border: 2px solid var(--card-background-color, #fff);
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    margin-top: calc((var(--ag-slider-height, 12px) - 22px) / 2);
    cursor: grab;
    transition: transform 0.15s ease;
  }
  .slider-style-circle .slider-container input[type=range]::-webkit-slider-thumb:hover,
  .slider-container input[type=range]::-webkit-slider-thumb:hover {
    transform: scale(1.15);
  }
  .slider-style-circle .slider-container input[type=range]:active::-webkit-slider-thumb,
  .slider-container input[type=range]:active::-webkit-slider-thumb {
    cursor: grabbing;
    transform: scale(1.25);
  }
  /* Firefox */
  .slider-container input[type=range]::-moz-range-track {
    background: linear-gradient(
      to right,
      var(--slider-color, var(--primary-color)) 0%,
      var(--slider-color, var(--primary-color)) var(--slider-pct, 100%),
      var(--slider-track-color, var(--divider-color, rgba(150, 150, 150, 0.2))) var(--slider-pct, 100%),
      var(--slider-track-color, var(--divider-color, rgba(150, 150, 150, 0.2))) 100%
    );
    height: var(--ag-slider-height, 12px); border-radius: var(--ag-slider-radius, 6px); border: none;
  }
  .slider-container input[type=range]::-moz-range-thumb {
    width: 18px; height: 18px;
    border-radius: 50%;
    background: var(--slider-color, var(--primary-color));
    border: 2px solid var(--card-background-color, #fff);
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    cursor: grab;
  }
  .slider-container.color-temp.kelvin input[type=range]::-webkit-slider-runnable-track { background: linear-gradient(90deg, #ff9b2b 0%, #ffffff 50%, #b5d5ff 100%); }
  .slider-container.color-temp.kelvin input[type=range]::-moz-range-track { background: linear-gradient(90deg, #ff9b2b 0%, #ffffff 50%, #b5d5ff 100%); }
  .slider-container.color-temp.mireds input[type=range]::-webkit-slider-runnable-track { background: linear-gradient(90deg, #b5d5ff 0%, #ffffff 50%, #ff9b2b 100%); }
  .slider-container.color-temp.mireds input[type=range]::-moz-range-track { background: linear-gradient(90deg, #b5d5ff 0%, #ffffff 50%, #ff9b2b 100%); }
  .slider-container.climate-temp input[type=range]::-webkit-slider-runnable-track { background: linear-gradient(90deg, #42a5f5 0%, #ffca28 50%, #ff7043 100%) !important; }
  .slider-container.climate-temp input[type=range]::-moz-range-track { background: linear-gradient(90deg, #42a5f5 0%, #ffca28 50%, #ff7043 100%) !important; }

  /* --- COLOR HUE SPECTRUM SLIDER --- */
  .slider-container.color-hue input[type=range]::-webkit-slider-runnable-track {
    background: linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%) !important;
  }
  .slider-container.color-hue input[type=range]::-moz-range-track {
    background: linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%) !important;
  }
  .slider-container.color-hue input[type=range]::-webkit-slider-thumb {
    background: var(--color-hue-val, #ffffff);
    border: 2px solid #ffffff;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.45);
  }
  .slider-container.color-hue input[type=range]::-moz-range-thumb {
    background: var(--color-hue-val, #ffffff);
    border: 2px solid #ffffff;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.45);
  }
  .slider-container.color-hue.slider-google-wrap input[type=range]::-webkit-slider-thumb,
  .slider-container.color-hue.slider-google-wrap input[type=range]::-moz-range-thumb {
    background: #ffffff;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
  }

  /* --- SLIDER STYLE 2: FILLED HUE CAPSULE (FLUID PILL / NO KNOB) --- */
  .slider-style-filled .slider-container input[type=range]::-webkit-slider-runnable-track {
    height: var(--ag-slider-height, 18px);
    border-radius: var(--ag-slider-radius, 9px);
    overflow: hidden;
  }
  .slider-style-filled .slider-container input[type=range]::-webkit-slider-thumb {
    width: 0px; height: var(--ag-slider-height, 18px);
    opacity: 0;
    cursor: grab;
  }
  .slider-style-filled .slider-container input[type=range]::-moz-range-track {
    height: var(--ag-slider-height, 18px);
    border-radius: var(--ag-slider-radius, 9px);
    overflow: hidden;
  }
  .slider-style-filled .slider-container input[type=range]::-moz-range-thumb {
    width: 0px; height: var(--ag-slider-height, 18px);
    opacity: 0;
    cursor: grab;
  }

  /* --- SLIDER STYLE 3: THIN MINIMALIST LINE --- */
  .slider-style-thin .slider-container input[type=range]::-webkit-slider-runnable-track {
    height: 4px;
    border-radius: 2px;
  }
  .slider-style-thin .slider-container input[type=range]::-webkit-slider-thumb {
    width: 14px; height: 14px;
    border-radius: 50%;
    margin-top: calc((4px - 14px) / 2);
  }
  .slider-style-thin .slider-container input[type=range]::-moz-range-track {
    height: 4px; border-radius: 2px;
  }
  .slider-style-thin .slider-container input[type=range]::-moz-range-thumb {
    width: 12px; height: 12px;
  }

  /* --- SLIDER STYLE 4: NEON GLOW LASER LINE --- */
  .slider-style-glow .slider-container input[type=range]::-webkit-slider-runnable-track {
    height: var(--ag-slider-height, 8px);
    border-radius: var(--ag-slider-radius, 4px);
    box-shadow: 0 0 12px var(--slider-color, var(--primary-color));
  }
  .slider-style-glow .slider-container input[type=range]::-webkit-slider-thumb {
    width: 18px; height: 18px;
    background: #ffffff;
    border: 2px solid var(--slider-color, var(--primary-color));
    box-shadow: 0 0 12px var(--slider-color, var(--primary-color));
    margin-top: calc((var(--ag-slider-height, 8px) - 18px) / 2);
  }

  /* --- SLIDER STYLE 5: SEGMENTED STEPPED BAR --- */
  .slider-style-segmented .slider-container input[type=range]::-webkit-slider-runnable-track {
    height: var(--ag-slider-height, 14px);
    border-radius: var(--ag-slider-radius, 4px);
    background-image: repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.3) 8px, rgba(0,0,0,0.3) 10px),
      linear-gradient(
        to right,
        var(--slider-color, var(--primary-color)) 0%,
        var(--slider-color, var(--primary-color)) var(--slider-pct, 100%),
        var(--slider-track-color, var(--divider-color, rgba(150, 150, 150, 0.2))) var(--slider-pct, 100%),
        var(--slider-track-color, var(--divider-color, rgba(150, 150, 150, 0.2))) 100%
      );
  }

  /* --- COLOR PICKER --- */
  .color-picker { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: bold; color: var(--secondary-text-color); padding: 0 4px; }
  .color-picker input[type="color"] { border: none; width: 32px; height: 32px; border-radius: 50%; overflow: hidden; cursor: pointer; padding: 0; background: transparent; }
  .color-picker input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; }
  .color-picker input[type="color"]::-webkit-color-swatch { border: none; border-radius: 50%; }

  /* --- SUB-BUTTONS (1-4) --- */
  .sub-buttons-container { display: flex; gap: var(--ag-sub-button-spacing, 8px); padding-top: var(--ag-sub-btn-container-padding, 8px); border-top: 1px solid var(--divider-color, rgba(150, 150, 150, 0.2)); justify-content: var(--ag-sub-btn-align, flex-end); align-items: center; flex-wrap: wrap; }
  .sub-button { display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 36px; height: auto; padding: var(--ag-sub-button-padding, 6px); border-radius: 50%; background: var(--secondary-background-color, rgba(150,150,150,0.2)); transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; gap: 2px; outline: none; }
  .sub-button:hover { filter: brightness(1.15); transform: scale(1.08); }
  .sub-button:active { transform: scale(0.95); }
  .sub-button:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 1px; }
  .sub-button.no-bg { background: transparent !important; }
  .sub-button[active] { background: var(--primary-color); color: var(--text-primary-color); }
  .sub-button.no-bg[active] { background: transparent !important; color: var(--primary-color) !important; }
  .sub-button.missing { background: var(--error-color, red); color: var(--text-primary-color, white); font-weight: bold; }
  .sub-button-label { font-size: 9px; font-weight: 500; opacity: 0.8; white-space: nowrap; max-width: 48px; overflow: hidden; text-overflow: ellipsis; }
  .sub-button-state { font-size: 8.5px; font-weight: 700; opacity: 0.85; letter-spacing: 0.2px; white-space: nowrap; max-width: 54px; overflow: hidden; text-overflow: ellipsis; }

  .sub-color-picker {
    position: relative;
    overflow: hidden;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .sub-color-picker input[type="color"] {
    position: absolute;
    width: 140%;
    height: 140%;
    top: -20%;
    left: -20%;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    padding: 0;
    background: transparent;
  }
  .sub-color-picker input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; }
  .sub-color-picker input[type="color"]::-webkit-color-swatch { border: 2px solid rgba(255,255,255,0.4); border-radius: 50%; }

  .sub-button-slider-container {
    min-width: 70px;
    max-width: 110px;
    height: 24px;
    display: flex;
    align-items: center;
  }
  .sub-button-slider-container input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 16px;
    border-radius: 8px;
    background: transparent;
    cursor: grab;
  }
  .sub-button-slider-container input[type="range"]::-webkit-slider-runnable-track {
    height: 14px;
    border-radius: 7px;
    background: linear-gradient(
      to right,
      var(--slider-color, var(--primary-color)) 0%,
      var(--slider-color, var(--primary-color)) var(--slider-pct, 100%),
      var(--slider-track-color, var(--divider-color, rgba(150, 150, 150, 0.2))) var(--slider-pct, 100%),
      var(--slider-track-color, var(--divider-color, rgba(150, 150, 150, 0.2))) 100%
    );
  }
  .sub-button-slider-container input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0px;
    height: 14px;
    opacity: 0;
  }
  /* --- SLIDER STYLE 6: GOOGLE HOME / MATERIAL 3 PILL --- */
  .slider-style-google .slider-container,
  .slider-container.slider-google-wrap {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--ag-slider-height, 42px);
    border-radius: var(--ag-slider-radius, 21px);
    background: var(--slider-track-color, rgba(140, 140, 140, 0.16));
    overflow: hidden;
    box-sizing: border-box;
    transition: height 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .slider-style-google .slider-container:focus-within,
  .slider-style-google .slider-container:hover,
  .slider-container.slider-google-wrap:focus-within,
  .slider-container.slider-google-wrap:hover {
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12), 0 2px 8px rgba(0, 0, 0, 0.18);
  }
  .slider-style-google .slider-container input[type=range],
  .slider-container.slider-google-wrap input[type=range] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background: transparent;
    -webkit-appearance: none;
    appearance: none;
    cursor: grab;
    z-index: 2;
  }
  .slider-style-google .slider-container input[type=range]::-webkit-slider-runnable-track,
  .slider-container.slider-google-wrap input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      to right,
      var(--slider-color, var(--primary-color)) 0%,
      var(--slider-color, var(--primary-color)) var(--slider-pct, 100%),
      transparent var(--slider-pct, 100%),
      transparent 100%
    );
    transition: background 0.05s ease;
  }
  .slider-style-google .slider-container input[type=range]::-webkit-slider-thumb,
  .slider-container.slider-google-wrap input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 4px;
    height: 24px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
    margin-top: calc((var(--ag-slider-height, 42px) - 24px) / 2);
    cursor: grab;
    transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), background 0.15s ease;
  }
  .slider-style-google .slider-container input[type=range]:active::-webkit-slider-thumb,
  .slider-container.slider-google-wrap input[type=range]:active::-webkit-slider-thumb {
    cursor: grabbing;
    transform: scaleY(1.25);
    background: #ffffff;
  }
  /* Firefox */
  .slider-style-google .slider-container input[type=range]::-moz-range-track,
  .slider-container.slider-google-wrap input[type=range]::-moz-range-track {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      to right,
      var(--slider-color, var(--primary-color)) 0%,
      var(--slider-color, var(--primary-color)) var(--slider-pct, 100%),
      transparent var(--slider-pct, 100%),
      transparent 100%
    );
    border: none;
  }
  .slider-style-google .slider-container input[type=range]::-moz-range-thumb,
  .slider-container.slider-google-wrap input[type=range]::-moz-range-thumb {
    width: 4px;
    height: 24px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
    border: none;
    cursor: grab;
  }
  /* Live Percentage / Value Badge Inside Google Slider */
  .slider-percent-badge {
    position: absolute;
    right: 14px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.3px;
    color: var(--primary-text-color, #ffffff);
    pointer-events: none;
    z-index: 3;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    user-select: none;
    transition: opacity 0.2s ease;
  }

  .sub-button-google-slider {
    position: relative;
    min-width: 85px;
    max-width: 120px;
    height: 28px;
    border-radius: 14px;
    background: var(--slider-track-color, rgba(140, 140, 140, 0.18));
    overflow: hidden;
    display: flex;
    align-items: center;
    box-sizing: border-box;
  }
  .sub-button-google-slider input[type="range"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: grab;
    z-index: 2;
  }
  .sub-button-google-slider input[type="range"]::-webkit-slider-runnable-track {
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      to right,
      var(--slider-color, var(--primary-color)) 0%,
      var(--slider-color, var(--primary-color)) var(--slider-pct, 100%),
      transparent var(--slider-pct, 100%),
      transparent 100%
    );
  }
  .sub-button-google-slider input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 3px;
    height: 16px;
    border-radius: 1.5px;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    margin-top: calc((28px - 16px) / 2);
  }
  .sub-button-google-slider .sub-slider-pct {
    position: absolute;
    right: 8px;
    font-size: 10px;
    font-weight: 700;
    color: var(--primary-text-color, #ffffff);
    pointer-events: none;
    z-index: 3;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  }

  /* --- DECAY / COOLDOWN SLIDER --- */
  .decay-slider-container {
    width: 100%;
    margin-bottom: 2px;
  }
  .decay-slider-track {
    width: 100%;
    position: relative;
    background: rgba(140, 140, 140, 0.15);
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  .decay-slider-fill {
    height: 100%;
    width: var(--decay-pct, 0%);
    transition: width 0.3s linear;
  }
  .decay-slider-badge {
    position: absolute;
    right: 8px;
    font-size: 10px;
    font-weight: 700;
    color: #ffffff;
    text-shadow: 0 1px 2px rgba(0,0,0,0.6);
    pointer-events: none;
  }

  /* --- COLOR TEMP & SWATCH CHIP PRESS ANIMATIONS --- */
  .color-temp-chips, .color-swatch-chips {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .temp-chip, .color-swatch-chip {
    cursor: pointer;
    outline: none;
    transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), filter 0.15s ease;
  }
  .temp-chip {
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
    font-weight: 600;
  }
  .temp-chip:hover, .color-swatch-chip:hover {
    filter: brightness(1.2);
  }
  .temp-chip:active, .color-swatch-chip:active {
    transform: scale(0.9) translate3d(0, 0, 0) !important;
  }
  .color-swatch-chip {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1.5px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  }

  /* --- LOCK JAMMED SHAKE ANIMATION --- */
  .lock-jammed {
    animation: ag-shake 0.5s ease-in-out infinite;
  }
  @keyframes ag-shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-3px); }
    40%, 80% { transform: translateX(3px); }
  }
`;
class pi {
  /**
   * Resolves display properties and default service execution for a sub-button action type.
   */
  static resolve(e, t, r, i, o, a, n, d, f) {
    if (f && f.action && f.action !== "none" && f.action !== "default")
      return {
        icon: o || i?.attributes?.icon || "mdi:checkbox-blank-circle",
        title: a || (i?.attributes?.friendly_name ?? ""),
        label: a,
        isActive: n ?? !1,
        animClass: "",
        defaultAction: void 0
      };
    const u = t || r || "";
    let s = o, _ = "", p = n ?? !1, v = "", m = a, b;
    switch (e) {
      case "play_pause": {
        const l = i?.state === "playing";
        p = l, s || (s = l ? "mdi:pause" : "mdi:play"), _ = l ? "Pause" : "Play", b = (h) => {
          h?.callService("media_player", "media_play_pause", { entity_id: u });
        };
        break;
      }
      case "next": {
        s || (s = "mdi:skip-next"), _ = "Next Track", b = (l) => {
          l?.callService("media_player", "media_next_track", { entity_id: u });
        };
        break;
      }
      case "previous": {
        s || (s = "mdi:skip-previous"), _ = "Previous Track", b = (l) => {
          l?.callService("media_player", "media_previous_track", { entity_id: u });
        };
        break;
      }
      case "vol_up": {
        s || (s = "mdi:volume-plus"), _ = "Volume +5%", m || (m = "+5%"), b = (l) => {
          l?.callService("media_player", "volume_up", { entity_id: u });
        };
        break;
      }
      case "vol_down": {
        s || (s = "mdi:volume-minus"), _ = "Volume -5%", m || (m = "-5%"), b = (l) => {
          l?.callService("media_player", "volume_down", { entity_id: u });
        };
        break;
      }
      case "mute": {
        const l = i?.attributes?.is_volume_muted === !0;
        p = l, s || (s = l ? "mdi:volume-off" : "mdi:volume-high"), _ = l ? "Unmute" : "Mute", b = (h) => {
          h?.callService("media_player", "volume_mute", { entity_id: u, is_volume_muted: !l });
        };
        break;
      }
      case "source": {
        const l = i?.attributes?.source || "", h = i?.attributes?.source_list || [], g = h.length > 0 ? h[(h.indexOf(l) + 1) % h.length] || h[0] : l;
        s || (s = "mdi:import"), _ = `Source: ${l} -> ${g}`, m || (m = l || "Source"), b = (y) => {
          g && y?.callService("media_player", "select_source", { entity_id: u, source: g });
        };
        break;
      }
      case "sound_mode": {
        const l = i?.attributes?.sound_mode || "", h = i?.attributes?.sound_mode_list || [], g = h.length > 0 ? h[(h.indexOf(l) + 1) % h.length] || h[0] : l;
        s || (s = "mdi:surround-sound"), _ = `Sound: ${l} -> ${g}`, m || (m = l || "Sound"), b = (y) => {
          g && y?.callService("media_player", "select_sound_mode", { entity_id: u, sound_mode: g });
        };
        break;
      }
      case "shuffle": {
        const l = i?.attributes?.shuffle === !0;
        p = l, s || (s = l ? "mdi:shuffle" : "mdi:shuffle-disabled"), _ = l ? "Shuffle: On" : "Shuffle: Off", b = (h) => {
          h?.callService("media_player", "shuffle_set", { entity_id: u, shuffle: !l });
        };
        break;
      }
      case "repeat": {
        const l = i?.attributes?.repeat || "off", h = ["off", "all", "one"], g = h[(h.indexOf(l) + 1) % h.length] || "off";
        p = l !== "off", s || (s = l === "one" ? "mdi:repeat-once" : l === "all" ? "mdi:repeat" : "mdi:repeat-off"), _ = `Repeat: ${l} -> ${g}`, m || (m = l), b = (y) => {
          y?.callService("media_player", "repeat_set", { entity_id: u, repeat: g });
        };
        break;
      }
      case "chime": {
        s || (s = "mdi:bell-ring-outline"), _ = "Play Chime", b = (l) => {
          l?.callService("chime_tts", "say", { entity_id: u, message: "ding-dong" }).catch(() => {
            l?.callService("media_player", "media_play", { entity_id: u });
          });
        };
        break;
      }
      case "tts_announce": {
        s || (s = "mdi:bullhorn-variant-outline"), _ = "Voice Announcement", b = (l) => {
          l?.callService("tts", "speak", { media_player_entity_id: u, message: "Attention: Test announcement" }).catch(() => {
            l?.callService("tts", "google_translate_say", { entity_id: u, message: "Attention: Test announcement" });
          });
        };
        break;
      }
      case "media_zone": {
        s || (s = "mdi:speaker-multiple"), _ = "Group Speakers / Zone", b = (l) => {
          l?.callService("media_player", "join", { entity_id: u });
        };
        break;
      }
      case "media_preset": {
        s || (s = "mdi:radio-tower"), _ = "Play Radio Stream / Preset", b = (l) => {
          l?.callService("media_player", "play_media", {
            entity_id: u,
            media_content_id: "http://stream.live.vc.bbcmedia.co.uk/bbc_radio_one",
            media_content_type: "music"
          });
        };
        break;
      }
      case "door_hold": {
        s || (s = "mdi:door-open"), _ = "Hold Gate / Door Open", b = (l) => {
          l?.callService("cover", "open_cover", { entity_id: u });
        };
        break;
      }
      case "aux_heat": {
        const l = i?.attributes?.aux_heat === "on" || i?.attributes?.aux_heat === !0;
        p = l, s || (s = l ? "mdi:radiator" : "mdi:radiator-disabled"), _ = l ? "Disable Aux Heat" : "Enable Aux Heat", b = (h) => {
          h?.callService("climate", "set_aux_heat", { entity_id: u, aux_heat: !l });
        };
        break;
      }
      case "cover_preset": {
        s || (s = "mdi:window-shutter"), _ = "Go to Shading Position (50%)", b = (l) => {
          l?.callService("cover", "set_cover_position", { entity_id: u, position: 50 });
        };
        break;
      }
      case "temp_up": {
        const h = d === "°F" || d === "F" ? 1 : 0.5, g = Number(i?.attributes?.temperature ?? i?.attributes?.target_temp_high ?? 20), y = Number(i?.attributes?.max_temp ?? 35), $ = Math.min(y, g + h);
        s || (s = "mdi:thermometer-chevron-up"), _ = `Temperature +${h}°`, m || (m = `+${h}°`), b = (x) => {
          x?.callService("climate", "set_temperature", { entity_id: u, temperature: $ });
        };
        break;
      }
      case "temp_down": {
        const h = d === "°F" || d === "F" ? 1 : 0.5, g = Number(i?.attributes?.temperature ?? i?.attributes?.target_temp_low ?? 20), y = Number(i?.attributes?.min_temp ?? 10), $ = Math.max(y, g - h);
        s || (s = "mdi:thermometer-chevron-down"), _ = `Temperature -${h}°`, m || (m = `-${h}°`), b = (x) => {
          x?.callService("climate", "set_temperature", { entity_id: u, temperature: $ });
        };
        break;
      }
      case "fan_oscillate": {
        const l = i?.attributes?.oscillating === !0;
        p = l, s || (s = l ? "mdi:arrow-oscillating" : "mdi:fan-off"), _ = l ? "Stop Oscillation" : "Start Oscillation", b = (h) => {
          h?.callService("fan", "oscillate", { entity_id: u, oscillating: !l });
        };
        break;
      }
      case "fan_direction": {
        const l = i?.attributes?.direction || "forward", h = l === "forward" ? "reverse" : "forward";
        p = l === "reverse", s || (s = l === "reverse" ? "mdi:rotate-left" : "mdi:rotate-right"), _ = `Direction: ${l} -> ${h}`, m || (m = l), b = (g) => {
          g?.callService("fan", "set_direction", { entity_id: u, direction: h });
        };
        break;
      }
      case "humidifier_mode": {
        const l = i?.attributes?.mode || i?.state || "auto", h = i?.attributes?.available_modes || ["auto", "eco", "boost", "sleep"], g = h[(h.indexOf(l) + 1) % h.length] || "auto";
        s || (s = "mdi:water-sync"), _ = `Humidifier Mode: ${l} -> ${g}`, m || (m = l), b = (y) => {
          y?.callService("humidifier", "set_mode", { entity_id: u, mode: g });
        };
        break;
      }
      case "siren_toggle": {
        const l = i?.state === "on";
        p = l, s || (s = l ? "mdi:bullhorn" : "mdi:bullhorn-outline"), _ = l ? "Turn Off Siren" : "Trigger Siren", b = (h) => {
          h?.callService("siren", "toggle", { entity_id: u });
        };
        break;
      }
      case "open_close": {
        const l = i?.state === "open" || i?.state === "on" || i?.attributes?.current_position !== void 0 && i.attributes.current_position > 0;
        p = l;
        const h = i?.attributes?.device_class;
        s || (h === "garage" || h === "garage_door" ? s = l ? "mdi:garage-open" : "mdi:garage" : h === "blind" || h === "shade" ? s = l ? "mdi:blinds-open" : "mdi:blinds" : h === "curtain" ? s = l ? "mdi:curtains-open" : "mdi:curtains" : h === "damper" ? s = l ? "mdi:circle-slice-8" : "mdi:circle-outline" : s = l ? "mdi:window-shutter-open" : "mdi:window-shutter"), _ = l ? "Close" : "Open", b = (g) => {
          g?.callService("cover", "toggle", { entity_id: u });
        };
        break;
      }
      case "stop": {
        s || (s = "mdi:stop"), _ = "Stop", b = (l) => {
          l?.callService("cover", "stop_cover", { entity_id: u });
        };
        break;
      }
      case "open_tilt": {
        s || (s = "mdi:arrow-top-right-bottom-left"), _ = "Open Tilt", b = (l) => {
          l?.callService("cover", "open_cover_tilt", { entity_id: u });
        };
        break;
      }
      case "close_tilt": {
        s || (s = "mdi:arrow-bottom-left-top-right"), _ = "Close Tilt", b = (l) => {
          l?.callService("cover", "close_cover_tilt", { entity_id: u });
        };
        break;
      }
      case "stop_tilt": {
        s || (s = "mdi:stop"), _ = "Stop Tilt", b = (l) => {
          l?.callService("cover", "stop_cover_tilt", { entity_id: u });
        };
        break;
      }
      case "lock_unlock": {
        const l = i?.state === "locked", h = i?.state === "jammed";
        p = !l, h && (v = "lock-jammed"), s || (s = h ? "mdi:lock-alert" : l ? "mdi:lock" : "mdi:lock-open-variant"), _ = h ? "Jammed (Alert!)" : l ? "Unlock" : "Lock", b = (g) => {
          g?.callService("lock", l ? "unlock" : "lock", { entity_id: u });
        };
        break;
      }
      case "fan_speed": {
        const l = i?.attributes?.percentage ?? 0;
        s || (s = "mdi:fan"), n && (v = "anim-spin"), _ = `Speed: ${l}%`, m || (m = l > 0 ? `${l}%` : "Off"), b = (h) => {
          let g = 33;
          l >= 90 ? g = 0 : l >= 60 ? g = 100 : l >= 30 && (g = 66), h?.callService("fan", "set_percentage", { entity_id: u, percentage: g });
        };
        break;
      }
      case "fan_mode": {
        const l = i?.attributes?.fan_mode || "auto", h = i?.attributes?.fan_modes || ["auto", "low", "medium", "high"], g = h[(h.indexOf(l) + 1) % h.length] || "auto";
        s || (s = "mdi:fan"), _ = `Fan Mode: ${l} -> ${g}`, m || (m = l), b = (y) => {
          y?.callService("climate", "set_fan_mode", { entity_id: u, fan_mode: g });
        };
        break;
      }
      case "swing_mode": {
        const l = i?.attributes?.swing_mode || "off", h = i?.attributes?.swing_modes || ["off", "vertical", "horizontal", "both"], g = h[(h.indexOf(l) + 1) % h.length] || "off";
        s || (s = "mdi:arrow-split-horizontal"), _ = `Swing: ${l} -> ${g}`, m || (m = l), b = (y) => {
          y?.callService("climate", "set_swing_mode", { entity_id: u, swing_mode: g });
        };
        break;
      }
      case "climate_preset": {
        const l = i?.attributes?.preset_mode || "none", h = i?.attributes?.preset_modes || ["eco", "comfort", "boost", "away", "sleep", "none"], g = h[(h.indexOf(l) + 1) % h.length] || "none";
        s || (l === "eco" ? s = "mdi:leaf" : l === "boost" ? s = "mdi:rocket-launch" : l === "away" ? s = "mdi:home-export-outline" : l === "sleep" ? s = "mdi:bed" : s = "mdi:thermostat"), _ = `Preset: ${l} -> ${g}`, m || (m = l), b = (y) => {
          y?.callService("climate", "set_preset_mode", { entity_id: u, preset_mode: g });
        };
        break;
      }
      case "clean": {
        const l = i?.state === "cleaning";
        p = l, s || (s = l ? "mdi:pause" : "mdi:robot-vacuum"), _ = l ? "Pause Vacuum" : "Start Vacuum", b = (h) => {
          h?.callService("vacuum", l ? "pause" : "start", { entity_id: u });
        };
        break;
      }
      case "dock": {
        s || (s = "mdi:home-import-outline"), _ = "Return to Dock", b = (l) => {
          l?.callService("vacuum", "return_to_base", { entity_id: u });
        };
        break;
      }
      case "locate": {
        s || (s = "mdi:map-marker-question-outline"), _ = "Locate", b = (l) => {
          l?.callService("vacuum", "locate", { entity_id: u });
        };
        break;
      }
      case "clean_zone":
      case "spot_clean": {
        s || (s = e === "clean_zone" ? "mdi:map-marker-radius-outline" : "mdi:target-variant"), _ = e === "clean_zone" ? "Zone / Room Clean" : "Spot Clean Mode", b = (l) => {
          l?.callService("vacuum", "clean_spot", { entity_id: u });
        };
        break;
      }
      case "alarm_keypad": {
        s || (s = "mdi:dialpad"), _ = "Open PIN Keypad";
        break;
      }
      case "valve_close": {
        const l = i?.state === "closed" || i?.state === "off";
        p = !l, s || (s = l ? "mdi:valve-closed" : "mdi:valve-open"), _ = l ? "Valve is Closed" : "Emergency Close Valve", b = (h) => {
          u.split(".")[0] === "valve" ? h?.callService("valve", "close_valve", { entity_id: u }) : h?.callService("switch", "turn_off", { entity_id: u });
        };
        break;
      }
      case "pool_speed": {
        const l = i?.attributes?.percentage ?? 50, h = l > 50 ? 30 : 100;
        s || (s = "mdi:pool"), _ = `Pool Speed: ${l}% -> ${h}%`, m || (m = `${l}%`), b = (g) => {
          g?.callService("fan", "set_percentage", { entity_id: u, percentage: h });
        };
        break;
      }
      case "vacuum_fan_speed": {
        const l = i?.attributes?.fan_speed || "standard", h = i?.attributes?.fan_speed_list || ["quiet", "standard", "strong", "turbo"], g = h[(h.indexOf(l) + 1) % h.length] || "standard";
        s || (s = "mdi:fan"), _ = `Suction: ${l} -> ${g}`, m || (m = l), b = (y) => {
          y?.callService("vacuum", "set_fan_speed", { entity_id: u, fan_speed: g });
        };
        break;
      }
      case "counter_inc": {
        s || (s = "mdi:plus-box"), _ = "Increment Counter (+1)", m || (m = "+1"), b = (l) => {
          l?.callService("counter", "increment", { entity_id: u });
        };
        break;
      }
      case "counter_dec": {
        s || (s = "mdi:minus-box"), _ = "Decrement Counter (-1)", m || (m = "-1"), b = (l) => {
          l?.callService("counter", "decrement", { entity_id: u });
        };
        break;
      }
      case "hvac_mode": {
        const l = i?.state || "off", h = i?.attributes?.hvac_modes || ["off", "heat", "cool", "auto"], g = h[(h.indexOf(l) + 1) % h.length] || "auto";
        p = l !== "off", s || (l === "heat" ? s = "mdi:fire" : l === "cool" ? s = "mdi:snowflake" : l === "dry" ? s = "mdi:water-percent" : l === "fan_only" ? s = "mdi:fan" : l === "auto" ? s = "mdi:thermostat-auto" : s = "mdi:power"), _ = `Mode: ${l} -> Next: ${g}`, m || (m = l), b = (y) => {
          y?.callService("climate", "set_hvac_mode", { entity_id: u, hvac_mode: g });
        };
        break;
      }
      case "light_effect":
      case "effect_next": {
        const l = i?.attributes?.effect_list || [], h = i?.attributes?.effect || "None", g = l.length > 0 ? l[(l.indexOf(h) + 1) % l.length] || l[0] : "None";
        s || (s = e === "light_effect" ? "mdi:creation" : "mdi:arrow-right-bold-circle-outline"), p = h !== "None" && h !== "off" && (n ?? !1), _ = e === "light_effect" ? `Effect: ${h} -> Next: ${g}` : `Next Effect: ${g}`, m || (m = h !== "None" ? h : "Effect"), b = (y) => {
          l.length > 0 && y?.callService("light", "turn_on", { entity_id: u, effect: g });
        };
        break;
      }
      case "effect_prev": {
        const l = i?.attributes?.effect_list || [], h = i?.attributes?.effect || "None", g = l.indexOf(h), y = g <= 0 ? l.length - 1 : g - 1, $ = l.length > 0 ? l[y] : "None";
        s || (s = "mdi:arrow-left-bold-circle-outline"), _ = `Previous Effect: ${$}`, m || (m = $), b = (x) => {
          l.length > 0 && x?.callService("light", "turn_on", { entity_id: u, effect: $ });
        };
        break;
      }
      case "white_mode": {
        s || (s = "mdi:white-balance-sunny"), _ = "Set Neutral White (4000K)", b = (l) => {
          l?.callService("light", "turn_on", { entity_id: u, color_temp: 250 });
        };
        break;
      }
      case "brightness": {
        const l = i?.attributes?.brightness, h = l !== void 0 ? Math.round(l / 255 * 100) : 0;
        s || (s = "mdi:brightness-6"), _ = `Brightness: ${h}%`, m || (m = `${h}%`), b = (g) => {
          let y = 25;
          h >= 85 ? y = 0 : h >= 60 ? y = 100 : h >= 35 ? y = 75 : h >= 10 && (y = 50), y === 0 ? g?.callService("light", "turn_off", { entity_id: u }) : g?.callService("light", "turn_on", { entity_id: u, brightness_pct: y });
        };
        break;
      }
      case "garage_toggle": {
        const l = i?.state === "open" || i?.state === "opening";
        p = l, s || (s = l ? "mdi:garage-open" : "mdi:garage"), _ = l ? "Close Garage" : "Open Garage", b = (h) => {
          h?.callService("cover", "toggle", { entity_id: u });
        };
        break;
      }
      case "dim_up": {
        const l = u.split(".")[0];
        if (l === "number" || l === "input_number") {
          const h = Number(i?.state) || 0, g = Number(i?.attributes?.step) || 1, y = Number(i?.attributes?.max) || 100, $ = Math.min(y, h + g);
          s || (s = "mdi:plus-circle-outline"), _ = `Value +${g}`, m || (m = `+${g}`), b = (x) => {
            x?.callService(l, "set_value", { entity_id: u, value: $ });
          };
        } else {
          const h = i?.attributes?.brightness ?? 0, g = Math.min(255, h + 26);
          s || (s = "mdi:brightness-5"), _ = "Brightness +10%", m || (m = "+10%"), b = (y) => {
            y?.callService("light", "turn_on", { entity_id: u, brightness: g });
          };
        }
        break;
      }
      case "dim_down": {
        const l = u.split(".")[0];
        if (l === "number" || l === "input_number") {
          const h = Number(i?.state) || 0, g = Number(i?.attributes?.step) || 1, y = Number(i?.attributes?.min) || 0, $ = Math.max(y, h - g);
          s || (s = "mdi:minus-circle-outline"), _ = `Value -${g}`, m || (m = `-${g}`), b = (x) => {
            x?.callService(l, "set_value", { entity_id: u, value: $ });
          };
        } else {
          const h = i?.attributes?.brightness ?? 0, g = Math.max(1, h - 26);
          s || (s = "mdi:brightness-4"), _ = "Brightness -10%", m || (m = "-10%"), b = (y) => {
            y?.callService("light", "turn_on", { entity_id: u, brightness: g });
          };
        }
        break;
      }
      case "humidity_up": {
        const l = Number(i?.attributes?.humidity ?? i?.attributes?.target_humidity ?? 50), h = Math.min(100, l + 5);
        s || (s = "mdi:water-plus"), _ = `Humidity +5% (${h}%)`, m || (m = "+5%"), b = (g) => {
          g?.callService("humidifier", "set_humidity", { entity_id: u, humidity: h });
        };
        break;
      }
      case "humidity_down": {
        const l = Number(i?.attributes?.humidity ?? i?.attributes?.target_humidity ?? 50), h = Math.max(0, l - 5);
        s || (s = "mdi:water-minus"), _ = `Humidity -5% (${h}%)`, m || (m = "-5%"), b = (g) => {
          g?.callService("humidifier", "set_humidity", { entity_id: u, humidity: h });
        };
        break;
      }
      case "humidity_step_up": {
        const l = Number(i?.attributes?.humidity ?? i?.attributes?.target_humidity ?? 50), h = Math.min(100, l + 1);
        s || (s = "mdi:water-plus"), _ = `Humidity +1% (${h}%)`, m || (m = "+1%"), b = (g) => {
          g?.callService("humidifier", "set_humidity", { entity_id: u, humidity: h });
        };
        break;
      }
      case "humidity_step_down": {
        const l = Number(i?.attributes?.humidity ?? i?.attributes?.target_humidity ?? 50), h = Math.max(0, l - 1);
        s || (s = "mdi:water-minus"), _ = `Humidity -1% (${h}%)`, m || (m = "-1%"), b = (g) => {
          g?.callService("humidifier", "set_humidity", { entity_id: u, humidity: h });
        };
        break;
      }
      case "input_select": {
        const l = i?.state || "", h = i?.attributes?.options || [], g = h.length > 0 ? h[(h.indexOf(l) + 1) % h.length] || h[0] : l;
        s || (s = "mdi:form-dropdown"), _ = `Option: ${l} -> Next: ${g}`, m || (m = l), b = (y) => {
          const $ = u.split(".")[0] === "select" ? "select" : "input_select";
          y?.callService($, "select_next", { entity_id: u });
        };
        break;
      }
      case "temp_warm": {
        s || (s = "mdi:weather-sunny"), _ = "Warm White (2700K)", m || (m = "2700K"), b = (l) => {
          l?.callService("light", "turn_on", { entity_id: u, color_temp_kelvin: 2700 });
        };
        break;
      }
      case "temp_cool": {
        s || (s = "mdi:weather-sunset-up"), _ = "Cool Daylight (6000K)", m || (m = "6000K"), b = (l) => {
          l?.callService("light", "turn_on", { entity_id: u, color_temp_kelvin: 6e3 });
        };
        break;
      }
      case "color_temp": {
        s || (s = "mdi:palette-swatch-outline"), _ = "Color Temperature", m || (m = "Temp"), b = (l) => {
          const h = i?.attributes?.color_temp_kelvin || 3e3;
          let g = 2700;
          h < 3300 ? g = 4e3 : h < 5e3 ? g = 6e3 : g = 2700, l?.callService("light", "turn_on", { entity_id: u, color_temp_kelvin: g });
        };
        break;
      }
      case "button":
      default: {
        s || (s = i?.attributes?.icon || "mdi:checkbox-blank-circle"), _ = a || (i?.attributes?.friendly_name ?? "");
        break;
      }
    }
    return {
      icon: s,
      title: _,
      label: m,
      isActive: p,
      animClass: v,
      defaultAction: b
    };
  }
}
const Q = /* @__PURE__ */ new Map(), tr = 200;
class rr {
  /**
   * Parse date strings, numbers, or Date instances safely with LRU caching.
   */
  static parseDate(e) {
    if (!e) return null;
    if (e instanceof Date) return isNaN(e.getTime()) ? null : e;
    if (typeof e == "number") {
      const t = new Date(e > 1e11 ? e : e * 1e3);
      return isNaN(t.getTime()) ? null : t;
    }
    if (typeof e == "string") {
      const t = Q.get(e);
      if (t) return t;
      const r = Date.parse(e);
      if (!isNaN(r)) {
        const d = new Date(r);
        if (Q.size >= tr) {
          const f = Q.keys().next().value;
          f !== void 0 && Q.delete(f);
        }
        return Q.set(e, d), d;
      }
      let i = e.trim();
      i.includes(" ") && !i.includes("T") && (i = i.replace(" ", "T")), i.includes("T") && !i.endsWith("Z") && !/[+-]\d{2}:\d{2}$/.test(i) && !/[+-]\d{4}$/.test(i) && (i += "Z");
      const o = Number(i);
      let a;
      !isNaN(o) && i !== "" && !i.includes("T") ? a = new Date(o > 1e11 ? o : o * 1e3) : a = new Date(i);
      const n = isNaN(a.getTime()) ? null : a;
      if (n) {
        if (Q.size >= tr) {
          const d = Q.keys().next().value;
          d !== void 0 && Q.delete(d);
        }
        Q.set(e, n);
      }
      return n;
    }
    return null;
  }
  /**
   * Format a past timestamp to relative time string (compact or human-friendly).
   */
  static formatTimeAgo(e, t = !1, r) {
    const i = this.parseDate(e);
    if (!i) return "";
    const o = Math.max(0, ((r ?? Date.now()) - i.getTime()) / 1e3 | 0);
    if (o < 5) return t ? "< 5s" : "just now";
    if (o < 60) return t ? `${o}s` : `${o} seconds ago`;
    const a = o / 60 | 0;
    if (a < 60) return t ? `${a}m` : `${a} ${a === 1 ? "minute" : "minutes"} ago`;
    const n = a / 60 | 0;
    if (n < 24) return `${n}h${t ? "" : " ago"}`;
    const d = n / 24 | 0;
    if (d < 7) return `${d}d${t ? "" : " ago"}`;
    const f = d / 7 | 0;
    if (f < 4) return `${f}w${t ? "" : " ago"}`;
    const u = d / 30 | 0;
    return u < 12 ? `${u}mo${t ? "" : " ago"}` : `${d / 365 | 0}y${t ? "" : " ago"}`;
  }
  static formatRelativeTime(e, t) {
    return this.formatTimeAgo(e, !1, t);
  }
  static formatForDuration(e, t) {
    return this.formatTimeAgo(e, !0, t);
  }
  /**
   * Compute primary/secondary content string or TemplateResult for a given info type and stateObj.
   */
  static getInfoContent(e, t, r, i) {
    if (!t) return "";
    switch ((e || "").toLowerCase().replace(/_/g, "-")) {
      case "name":
        return r?.name || t.attributes?.friendly_name || r?.entity || "";
      case "state": {
        const a = (t.entity_id || "").split(".")[0];
        if (a === "timer") {
          if (t.state === "paused")
            return `${t.attributes?.remaining || "Paused"} (Paused)`;
          if (t.state === "active" && t.attributes?.finishes_at) {
            const n = Date.parse(t.attributes.finishes_at);
            if (!isNaN(n)) {
              const d = Math.max(0, Math.round((n - Date.now()) / 1e3)), f = Math.floor(d / 60), u = d % 60, s = Math.floor(f / 60), _ = (f % 60).toString().padStart(2, "0"), p = u.toString().padStart(2, "0");
              return s > 0 ? `${s}:${_}:${p}` : `${_}:${p}`;
            }
          }
        }
        if (a === "binary_sensor") {
          const n = t.attributes?.device_class;
          return n === "tamper" && t.state === "on" ? "⚠️ Tamper Detected" : n === "problem" && t.state === "on" ? "⚠️ Problem Detected" : n === "smoke" && t.state === "on" ? "🔥 Smoke Detected!" : n === "gas" && t.state === "on" ? "⚠️ Gas Detected!" : n === "moisture" && t.state === "on" ? "💧 Moisture Detected!" : this.formatForDuration(t.last_changed);
        }
        if (a === "vacuum") {
          const n = t.state;
          let d = n;
          n === "cleaning" ? d = "🧹 Cleaning" : n === "docked" ? d = "🏠 Docked" : n === "returning" ? d = "🔄 Returning" : n === "paused" ? d = "⏸️ Paused" : n === "error" && (d = "⚠️ Error");
          const f = t.attributes?.battery_level;
          return f !== void 0 ? `${d} • 🔋${f}%` : d;
        }
        if (a === "weather") {
          const n = t.attributes?.temperature, d = i?.config?.unit_system?.temperature || "°F", f = (t.state || "").replace(/-/g, " ");
          return n !== void 0 ? `${n}${d} • ${f}` : f;
        }
        if (a === "climate") {
          const n = t.state || "", d = t.attributes?.current_temperature, f = t.attributes?.temperature ?? t.attributes?.target_temp_high, u = t.attributes?.unit_of_measurement || i?.config?.unit_system?.temperature || "°", s = t.attributes?.preset_mode, _ = t.attributes?.hvac_action, v = [d !== void 0 && f !== void 0 ? `${d}${u} → ${f}${u}` : f !== void 0 ? `${f}${u}` : "", _, s].filter(Boolean).join(" • ");
          return v ? `${n} (${v})` : n;
        }
        if (a === "fan") {
          const n = t.attributes?.percentage, d = t.attributes?.oscillating ? "∿ Oscillating" : "", f = t.attributes?.direction === "reverse" ? "⟲ Reverse" : "";
          return [n !== void 0 ? `${n}%` : t.state, d, f].filter(Boolean).join(" • ");
        }
        if (a === "alarm_control_panel") {
          const n = t.state;
          if (n === "armed_home") return "🛡️ Armed Home";
          if (n === "armed_away") return "🛡️ Armed Away";
          if (n === "disarmed") return "Disarmed";
          if (n === "triggered") return "⚠️ TRIGGERED";
          if (n === "pending") return "⏳ Arming Pending...";
          if (n === "arming") return "⏳ Arming...";
        }
        if (a === "lock") {
          if (t.state === "locked") return "Locked";
          if (t.state === "unlocked") return "Unlocked";
          if (t.state === "jammed") return "Jammed (Alert!)";
          if (t.state === "locking") return "Locking...";
          if (t.state === "unlocking") return "Unlocking...";
        }
        if (a === "button" || a === "input_button")
          return "Press to run";
        if (a === "light" && t.state === "on") {
          const n = t.attributes?.brightness, d = n !== void 0 ? Math.round(n / 255 * 100) : 100;
          if (t.attributes?.color_temp_kelvin)
            return `${d}% • ${t.attributes.color_temp_kelvin}K`;
        }
        if (t.attributes?.device_class === "timestamp" || t.attributes?.device_class === "date" || typeof t.state == "string" && (t.state.includes("T") || t.state.match(/^\d{4}-\d{2}-\d{2}/)) && !isNaN(Date.parse(t.state))) {
          const n = this.formatRelativeTime(t.state);
          if (n) return n;
        }
        if (t.attributes?.display_precision !== void 0 && !isNaN(Number(t.state))) {
          const n = Number(t.attributes.display_precision), d = Number(t.state).toFixed(n), f = t.attributes?.unit_of_measurement ? ` ${t.attributes.unit_of_measurement}` : "";
          return `${d}${f}`;
        }
        if (typeof i?.formatEntityState == "function")
          try {
            return i.formatEntityState(t);
          } catch {
          }
        return `${t.state} ${t.attributes?.unit_of_measurement || ""}`.trim();
      }
      case "last-changed":
      case "last-changed-relative":
      case "relative-time": {
        const a = t.attributes?.last_triggered || t.last_changed;
        return this.formatForDuration(a);
      }
      case "last-updated":
      case "last-updated-relative":
        return this.formatForDuration(t.last_updated);
      case "last-triggered": {
        const a = t.attributes?.last_triggered || t.last_changed;
        return this.formatForDuration(a);
      }
      case "brightness": {
        const a = t.attributes?.brightness;
        return a !== void 0 ? `${Math.round(a / 255 * 100)}%` : "";
      }
      case "temperature": {
        const a = t.attributes?.temperature ?? t.attributes?.current_temperature, n = t.attributes?.unit_of_measurement || i?.config?.unit_system?.temperature || "°C";
        return a !== void 0 ? `${a} ${n}` : "";
      }
      case "humidity": {
        const a = t.attributes?.humidity ?? t.attributes?.current_humidity, n = t.attributes?.unit_of_measurement || "%";
        return a !== void 0 ? `${a}${n.startsWith("%") ? n : ` ${n}`}` : "";
      }
      case "battery": {
        const a = t.attributes?.battery_level ?? t.attributes?.battery ?? (t.attributes?.device_class === "battery" ? t.state : void 0);
        if (a !== void 0) {
          const n = Number(a);
          if (!isNaN(n)) {
            let d = "#4caf50";
            return n <= 20 ? d = "#f44336" : n <= 50 && (d = "#ff9800"), S`<span style="color: ${d}; font-weight: bold;">${n}%</span>`;
          }
          return `${a}%`;
        }
        return "";
      }
      case "none":
      default:
        return "";
    }
  }
}
const _i = 256, hi = Object.freeze(
  /* @__PURE__ */ new Set([
    "on",
    "open",
    "opening",
    "closing",
    "unlocked",
    "unlocking",
    "locking",
    "playing",
    "buffering",
    "active",
    "running",
    "cool",
    "heat",
    "auto",
    "heat_cool",
    "fan_only",
    "dry",
    "home",
    "occupied",
    "motion",
    "cleaning",
    "returning"
  ])
);
Object.freeze(
  /* @__PURE__ */ new Set([
    "binary_sensor",
    "sensor",
    "weather",
    "sun",
    "device_tracker",
    "person",
    "zone",
    "camera",
    "image"
  ])
);
Object.freeze(
  /* @__PURE__ */ new Set(["hs", "xy", "rgb", "rgbw", "rgbww", "color_temp"])
);
Object.freeze(
  /* @__PURE__ */ new Set([
    "primary",
    "accent",
    "red",
    "pink",
    "purple",
    "deep-purple",
    "indigo",
    "blue",
    "light-blue",
    "cyan",
    "teal",
    "green",
    "light-green",
    "lime",
    "yellow",
    "amber",
    "orange",
    "deep-orange",
    "brown",
    "grey",
    "blue-grey",
    "black",
    "white",
    "disabled"
  ])
);
const fi = /rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)/i, mi = /^\[\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\]$/;
class gi {
  constructor() {
    this._cache = /* @__PURE__ */ new Map(), this._cacheAccessTimes = /* @__PURE__ */ new Map();
  }
  /**
   * Parse any CSS color string into an [r, g, b] integer tuple.
   * Uses a true LRU cache with access timestamp tracking.
   */
  parseColorToRgb(e) {
    if (!e || typeof e != "string") return null;
    const t = e.trim();
    if (!t) return null;
    if (this._cache.has(t))
      return this._cacheAccessTimes.set(t, Date.now()), this._cache.get(t);
    let r = null;
    if (t.charCodeAt(0) === 35) {
      const o = t.substring(1), a = o.length;
      if (a === 3 || a === 4) {
        const n = parseInt(o[0] + o[0], 16), d = parseInt(o[1] + o[1], 16), f = parseInt(o[2] + o[2], 16);
        !isNaN(n) && !isNaN(d) && !isNaN(f) && (r = [n, d, f]);
      } else if (a >= 6) {
        const n = parseInt(o.substring(0, 2), 16), d = parseInt(o.substring(2, 4), 16), f = parseInt(o.substring(4, 6), 16);
        !isNaN(n) && !isNaN(d) && !isNaN(f) && (r = [n, d, f]);
      }
    } else if (t.startsWith("rgb")) {
      const o = t.match(fi);
      if (o) {
        const a = parseInt(o[1], 10), n = parseInt(o[2], 10), d = parseInt(o[3], 10);
        !isNaN(a) && !isNaN(n) && !isNaN(d) && (r = [
          Math.max(0, Math.min(255, a)),
          Math.max(0, Math.min(255, n)),
          Math.max(0, Math.min(255, d))
        ]);
      }
    } else if (t.charCodeAt(0) === 91 && t.charCodeAt(t.length - 1) === 93) {
      const o = t.match(mi);
      o && (r = [
        Math.max(0, Math.min(255, parseInt(o[1], 10))),
        Math.max(0, Math.min(255, parseInt(o[2], 10))),
        Math.max(0, Math.min(255, parseInt(o[3], 10)))
      ]);
    }
    if (this._cache.size >= _i) {
      let o = null, a = 1 / 0;
      for (const [n, d] of this._cacheAccessTimes)
        d < a && (a = d, o = n);
      o !== null && (this._cache.delete(o), this._cacheAccessTimes.delete(o));
    }
    const i = Date.now();
    return this._cache.set(t, r), this._cacheAccessTimes.set(t, i), r;
  }
  /**
   * Convert an [r, g, b] tuple to a 6-character hex string (#rrggbb).
   */
  rgbToHex(e) {
    if (!e || isNaN(e[0]) || isNaN(e[1]) || isNaN(e[2])) return "#000000";
    const t = Math.max(0, Math.min(255, e[0] | 0)).toString(16).padStart(2, "0"), r = Math.max(0, Math.min(255, e[1] | 0)).toString(16).padStart(2, "0"), i = Math.max(0, Math.min(255, e[2] | 0)).toString(16).padStart(2, "0");
    return `#${t}${r}${i}`;
  }
  /**
   * Extract Hue angle (0-360) from an RGB tuple with strict NaN and bounds guards.
   */
  rgbToHue(e, t, r) {
    if (isNaN(e) || isNaN(t) || isNaN(r)) return 0;
    e = Math.max(0, Math.min(255, e)) / 255, t = Math.max(0, Math.min(255, t)) / 255, r = Math.max(0, Math.min(255, r)) / 255;
    const i = Math.max(e, t, r), o = Math.min(e, t, r), a = i - o;
    let n = 0;
    return a === 0 ? 0 : (i === e ? n = (t - r) / a + (t < r ? 6 : 0) : i === t ? n = (r - e) / a + 2 : i === r && (n = (e - t) / a + 4), Math.round(n / 6 * 360) % 360);
  }
  /**
   * Convert HSV values (h: 0-360, s: 0-1, v: 0-1) to an RGB tuple.
   */
  hsvToRgb(e, t, r) {
    e = isNaN(e) ? 0 : Math.max(0, Math.min(360, e)), t = isNaN(t) ? 0 : Math.max(0, Math.min(1, t)), r = isNaN(r) ? 0 : Math.max(0, Math.min(1, r));
    const i = r * t, o = i * (1 - Math.abs(e / 60 % 2 - 1)), a = r - i;
    let n = 0, d = 0, f = 0;
    return e >= 0 && e < 60 ? (n = i, d = o) : e >= 60 && e < 120 ? (n = o, d = i) : e >= 120 && e < 180 ? (d = i, f = o) : e >= 180 && e < 240 ? (d = o, f = i) : e >= 240 && e < 300 ? (n = o, f = i) : e >= 300 && e <= 360 && (n = i, f = o), [
      Math.round((n + a) * 255),
      Math.round((d + a) * 255),
      Math.round((f + a) * 255)
    ];
  }
  /**
   * Convert Kelvin temperature to an approximation RGB tuple.
   */
  kelvinToRgb(e) {
    if (isNaN(e)) return [255, 255, 255];
    const t = Math.max(1e3, Math.min(4e4, e)) / 100;
    let r = 0, i = 0, o = 0;
    return t <= 66 ? r = 255 : r = Math.min(255, Math.max(0, 329.698727446 * Math.pow(t - 60, -0.1332047592))), t <= 66 ? i = Math.min(255, Math.max(0, 99.4708025861 * Math.log(t) - 161.1195681661)) : i = Math.min(255, Math.max(0, 288.1221695283 * Math.pow(t - 60, -0.0755148492))), t >= 66 ? o = 255 : t <= 19 ? o = 0 : o = Math.min(255, Math.max(0, 138.5177312231 * Math.log(t - 10) - 305.0447927307)), [Math.round(r), Math.round(i), Math.round(o)];
  }
  /**
   * Linear interpolation between two RGB tuples.
   */
  lerpRgb(e, t, r) {
    if (!e || !t) return [0, 0, 0];
    const i = isNaN(r) ? 0 : Math.max(0, Math.min(1, r));
    return [
      Math.round(e[0] + (t[0] - e[0]) * i),
      Math.round(e[1] + (t[1] - e[1]) * i),
      Math.round(e[2] + (t[2] - e[2]) * i)
    ];
  }
  /**
   * Convert HS values (h: 0-360, s: 0-100) to an RGB tuple.
   */
  hsToRgb(e, t) {
    e = (e % 360 + 360) % 360 / 360, t = Math.max(0, Math.min(100, t)) / 100;
    const r = 1, i = Math.floor(e * 6), o = e * 6 - i, a = r * (1 - t), n = r * (1 - o * t), d = r * (1 - (1 - o) * t);
    let f = 0, u = 0, s = 0;
    switch (i % 6) {
      case 0:
        f = r, u = d, s = a;
        break;
      case 1:
        f = n, u = r, s = a;
        break;
      case 2:
        f = a, u = r, s = d;
        break;
      case 3:
        f = a, u = n, s = r;
        break;
      case 4:
        f = d, u = a, s = r;
        break;
      case 5:
        f = r, u = a, s = n;
        break;
    }
    return [Math.round(f * 255), Math.round(u * 255), Math.round(s * 255)];
  }
}
const R = new gi(), X = R.parseColorToRgb.bind(R), ot = R.rgbToHex.bind(R), bi = R.rgbToHue.bind(R);
R.hsvToRgb.bind(R);
const Ct = R.hsToRgb.bind(R), j = R.kelvinToRgb.bind(R), xt = R.lerpRgb.bind(R), vi = [
  { hex: "#f44336", label: "Red", rgb: [244, 67, 54] },
  { hex: "#ff9800", label: "Orange", rgb: [255, 152, 0] },
  { hex: "#ffeb3b", label: "Yellow", rgb: [255, 235, 59] },
  { hex: "#4caf50", label: "Green", rgb: [76, 175, 80] },
  { hex: "#00bcd4", label: "Cyan", rgb: [0, 188, 212] },
  { hex: "#2196f3", label: "Blue", rgb: [33, 150, 243] },
  { hex: "#9c27b0", label: "Purple", rgb: [156, 39, 176] },
  { hex: "#e91e63", label: "Pink", rgb: [233, 30, 99] },
  { hex: "#ffffff", label: "White", rgb: [255, 255, 255] },
  { hex: "#ffe0b2", label: "Warm", rgb: [255, 224, 178] }
], yi = [
  { k: 2200, label: "2200K", rgb: j(2200) },
  { k: 2700, label: "2700K", rgb: j(2700) },
  { k: 3e3, label: "3000K", rgb: j(3e3) },
  { k: 4e3, label: "4000K", rgb: j(4e3) },
  { k: 5e3, label: "5000K", rgb: j(5e3) },
  { k: 6500, label: "6500K", rgb: j(6500) }
], xi = /* @__PURE__ */ new Set(["hs", "xy", "rgb", "rgbw", "rgbww"]), Dt = class Dt {
  /**
   * Determine whether an entity is currently in an active state.
   */
  static isEntityActive(e) {
    return e ? hi.has(e.state) : !1;
  }
  /**
   * Extract clean domain from entity ID.
   */
  static getDomain(e) {
    return !e || typeof e != "string" ? "" : e.split(".")[0] || "";
  }
  /**
   * Clean redundant domain words from friendly names (e.g. "Living Room Motion" -> "Living Room").
   */
  static getCleanName(e, t, r) {
    if (r && r.trim())
      return r.trim();
    const i = t?.attributes?.friendly_name;
    if (!i)
      return e ? e.split(".")[1]?.replace(/_/g, " ") || e : "";
    if (this._nameCache.has(i))
      return this._nameCache.get(i);
    let o = i.replace(/\b(Motion Sensor|Motion Detector|Motion|Opening|Contact Sensor|Contact|Door Sensor|Door Lock|Lock|Smart Plug Dimmer|Smart Plug|Dimmer|Light Switch|Switch)\b/gi, "").replace(/\s+/g, " ").trim();
    return o || (o = i), this._nameCache.set(i, o), o;
  }
  /**
   * Resolve live light color from state attributes (prioritizing RGB / HS over color temp).
   */
  static getLightLiveColor(e) {
    if (!e || !e.attributes || e.state !== void 0 && e.state !== "on") return null;
    const t = e.attributes;
    if (t.color_mode === "color_temp") {
      const i = t.color_temp_kelvin ?? (t.color_temp ? Math.round(1e6 / t.color_temp) : 3e3), [o, a, n] = j(i);
      return `rgb(${o}, ${a}, ${n})`;
    }
    if (Array.isArray(t.rgb_color) && t.rgb_color.length >= 3)
      return `rgb(${t.rgb_color[0]}, ${t.rgb_color[1]}, ${t.rgb_color[2]})`;
    if (Array.isArray(t.hs_color) && t.hs_color.length >= 2) {
      const [i, o, a] = Ct(t.hs_color[0], t.hs_color[1]);
      return `rgb(${i}, ${o}, ${a})`;
    }
    if (Array.isArray(t.rgbw_color) && t.rgbw_color.length >= 3)
      return `rgb(${t.rgbw_color[0]}, ${t.rgbw_color[1]}, ${t.rgbw_color[2]})`;
    if (Array.isArray(t.rgbww_color) && t.rgbww_color.length >= 3)
      return `rgb(${t.rgbww_color[0]}, ${t.rgbww_color[1]}, ${t.rgbww_color[2]})`;
    if (t.color_temp_kelvin !== void 0 || t.color_temp !== void 0) {
      const i = t.color_temp_kelvin ?? Math.round(1e6 / t.color_temp), [o, a, n] = j(i);
      return `rgb(${o}, ${a}, ${n})`;
    }
    return e.state === "on" ? "var(--state-light-active-color, rgb(255, 205, 120))" : null;
  }
  /**
   * Alias for getLightLiveColor
   */
  static getLiveLightColor(e) {
    return this.getLightLiveColor(e);
  }
  /**
   * Get hex color code for the live state.
   */
  static getLiveHex(e) {
    if (!e?.attributes || e.state !== "on") return "#ffffff";
    const t = e.attributes;
    if (Array.isArray(t.rgb_color) && t.rgb_color.length >= 3)
      return ot(t.rgb_color);
    if (Array.isArray(t.hs_color) && t.hs_color.length >= 2)
      return ot(Ct(t.hs_color[0], t.hs_color[1]));
    if (t.color_temp_kelvin !== void 0 || t.color_temp !== void 0) {
      const o = t.color_temp_kelvin ?? Math.round(1e6 / t.color_temp);
      return ot(j(o));
    }
    const r = this.getLightLiveColor(e);
    if (!r) return "#ffffff";
    const i = X(r);
    return i ? ot(i) : "#ffffff";
  }
  /**
   * Get live hue (0-360) for color wheel or hue slider.
   */
  static getLiveHue(e) {
    if (!e) return 0;
    if (Array.isArray(e.attributes?.hs_color) && e.attributes.hs_color.length >= 1)
      return Math.round(e.attributes.hs_color[0]) % 360;
    if (Array.isArray(e.attributes?.rgb_color) && e.attributes.rgb_color.length >= 3) {
      const [t, r, i] = e.attributes.rgb_color;
      return bi(t, r, i);
    }
    return 0;
  }
  /**
   * Detect supported color and brightness modes for light entities.
   */
  static detectLightFeatures(e) {
    const t = e?.attributes?.supported_color_modes;
    let r = e?.attributes?.brightness !== void 0, i = !1, o = !1;
    if (Array.isArray(t))
      for (let a = 0; a < t.length; a++) {
        const n = t[a];
        n !== "onoff" && (r = !0), n === "color_temp" && (i = !0), xi.has(n) && (o = !0);
      }
    return { supportsBrightness: r, supportsColorTemp: i, supportsColor: o };
  }
  /**
   * Determine the default active color for an entity based on its domain and state.
   */
  static getDefaultActiveColor(e, t, r = null) {
    if (e === "climate") {
      if (t?.state === "heat") return "var(--state-climate-heat-color, #ff7043)";
      if (t?.state === "cool") return "var(--state-climate-cool-color, #42a5f5)";
      if (t?.state === "dry") return "var(--state-climate-dry-color, #ab47bc)";
      if (t?.state === "fan_only") return "var(--state-climate-fan_only-color, #26a69a)";
    } else if (e === "light") {
      if (r) return r;
    } else if (e === "binary_sensor" || e === "lock" || e === "switch")
      return "#d60000";
    return "var(--primary-color)";
  }
  /**
   * Determine the default inactive color for an entity based on its domain.
   */
  static getDefaultInactiveColor(e) {
    return e === "light" ? "#000000" : e === "binary_sensor" || e === "lock" || e === "switch" ? "#03b500" : "var(--secondary-background-color, rgba(150, 150, 150, 0.2))";
  }
};
Dt._nameCache = /* @__PURE__ */ new Map();
let ee = Dt;
class z {
  /**
   * Render a generic slider container with support for Google, Full, and Compact themes.
   */
  static renderGenericSlider(e, t, r, i, o, a, n, d, f, u, s, _, p, v, m = "", b = "", l, h = "") {
    const g = e.slider_style === "google", y = g && e.show_slider_percent !== !1 || e.show_slider_percent === !0, $ = v ? v(n, d) : `${d}%`, x = l !== void 0 ? l : $, k = e.slider_stepped_movement === !1 ? "any" : a, T = t !== "color_temp" && t !== "color_hue", M = e.slider_style === "full", C = T && M ? "main-slider-full" : "";
    let N = h;
    if (T && M) {
      const P = Number(e.slider_start_offset) || 0, O = Number(e.slider_end_offset) || 0;
      N = `left: ${P}px !important; right: ${O}px !important; width: calc(100% - ${P + O}px) !important;`;
    }
    return S`
      <div class="slider-container ${m} ${C} ${g ? "slider-google-wrap" : ""}" style="${N} ${b}">
        <input type="range" min=${i} max=${o} step=${k} .value=${n}
               aria-label="${r}"
               style="--slider-pct: ${d}%;"
               @pointerdown=${_.onPointerDown}
               @pointermove=${_.onPointerMove}
               @pointerup=${_.onPointerUp}
               @pointercancel=${_.onPointerCancel}
               @input=${(P) => _.onSliderInput(P, t, f, u, s, p, v)}
               @change=${(P) => _.onSliderChange(P, f, u, s)} />
        ${y && x ? S`<span class="slider-percent-badge">${x}</span>` : w}
      </div>
    `;
  }
  /**
   * Render decay / cooldown progress bar slider.
   */
  static renderDecaySlider(e, t = "") {
    return !e.enabled || !e.activeFade ? S`` : S`
      <div class="slider-container decay-slider-container" style="${t}">
        <div class="decay-slider-track" style="--decay-pct: ${e.progressPct}%; --decay-color: ${e.currentColor};">
          <div class="decay-slider-fill"></div>
        </div>
        <span class="decay-slider-badge">${e.stageLabel}</span>
      </div>
    `;
  }
  /**
   * Render light brightness slider.
   */
  static renderLightSlider(e, t, r, i = "") {
    const o = ee.isEntityActive(t), a = t.attributes.brightness ?? 0, n = Math.max(0, Math.min(100, Math.round(a / 255 * 100))), d = ee.getLightLiveColor(t), f = (e.use_light_color !== !1 || !e.slider_color) && d ? `--slider-color: ${d};` : "";
    return this.renderGenericSlider(
      e,
      "brightness",
      "Brightness",
      0,
      255,
      1,
      a,
      n,
      "light",
      "turn_on",
      (u) => ({ brightness: u }),
      r,
      (u) => Math.round(u / 255 * 100),
      (u, s) => !o || s <= 0 ? "" : `${s}%`,
      "",
      f,
      void 0,
      i
    );
  }
  /**
   * Render color temperature slider or chip presets.
   */
  static renderColorTempSlider(e, t, r, i = "") {
    const o = e.color_temp_type || "gradient", a = t.attributes.color_temp_kelvin !== void 0 || t.attributes.min_color_temp_kelvin !== void 0 || t.attributes.max_color_temp_kelvin !== void 0, n = a ? t.attributes.min_color_temp_kelvin || 2e3 : t.attributes.min_mireds || 153, d = a ? t.attributes.max_color_temp_kelvin || 6500 : t.attributes.max_mireds || 500, f = a ? t.attributes.color_temp_kelvin || 3e3 : t.attributes.color_temp || 300, u = d - n, s = u > 0 ? Math.max(0, Math.min(100, Math.round((f - n) / u * 100))) : 0, _ = a ? "color_temp_kelvin" : "color_temp", p = o === "google" || o === "gradient" && e.slider_style === "google", v = p ? 42 : o === "thin" ? 6 : 12, m = p ? 21 : o === "thin" ? 3 : 6, b = e.color_temp_height !== void 0 ? e.color_temp_height : e.slider_height ?? v, l = e.color_temp_border_radius !== void 0 ? e.color_temp_border_radius : e.slider_border_radius ?? m, h = a ? `${f} K` : `${f} mireds`;
    if (o === "presets") {
      const g = Number(e.color_temp_start_offset) || 0, y = Number(e.color_temp_end_offset) || 0, $ = [
        g ? `margin-left: ${g}px;` : "",
        y ? `margin-right: ${y}px;` : ""
      ].filter(Boolean).join(" ");
      return S`
        <div class="presets-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${$}">
          ${yi.map((x) => {
        const [k, T, M] = x.rgb, C = Math.abs(f - x.k) < 200, N = () => {
          r.forwardHaptic && r.forwardHaptic("light"), r.callService("light", "turn_on", { entity_id: e.entity, [_]: x.k });
        };
        return S`
              <button 
                type="button"
                role="button"
                aria-label="Color temperature preset: ${x.label}"
                tabindex="0"
                class="temp-preset-chip"
                style="flex: 1; min-width: 48px; height: ${b}px; border-radius: ${l}px; border: ${C ? "2px solid #ffffff" : "1px solid rgba(150, 150, 150, 0.3)"}; background: rgba(${k}, ${T}, ${M}, 0.2); color: var(--primary-text-color); font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; box-shadow: ${C ? "0 0 8px rgba(" + k + "," + T + "," + M + ", 0.8)" : "none"};"
                @keydown=${(P) => {
          (P.key === "Enter" || P.key === " ") && (P.preventDefault(), P.stopPropagation(), N());
        }}
                @click=${(P) => {
          P.stopPropagation(), N();
        }}>
                <span style="width: 8px; height: 8px; border-radius: 50%; background: rgb(${k}, ${T}, ${M}); display: inline-block;"></span>
                ${x.label}
              </button>
            `;
      })}
        </div>
      `;
    }
    return this.renderGenericSlider(
      e,
      "color_temp",
      "Color Temperature",
      n,
      d,
      1,
      f,
      s,
      "light",
      "turn_on",
      (g) => ({ [_]: g }),
      r,
      (g) => u > 0 ? Math.round((g - n) / u * 100) : 0,
      (g) => a ? `${g} K` : `${g} mireds`,
      `color-temp ${a ? "kelvin" : "mireds"} ${p ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${b}px; --ag-slider-radius: ${l}px;`,
      h,
      i
    );
  }
  /**
   * Render color hue slider, preset palette swatches, or wheel picker.
   */
  static renderColorSlider(e, t, r, i = "") {
    const o = e.color_picker_type || "slider";
    if (o === "wheel")
      return this.renderColorPicker(e, t, r);
    if (o === "swatches") {
      const p = ee.getLiveHex(t).toLowerCase(), v = e.color_slider_height !== void 0 ? e.color_slider_height : 32, m = e.color_slider_border_radius !== void 0 ? e.color_slider_border_radius : 8, b = Number(e.color_slider_start_offset) || 0, l = Number(e.color_slider_end_offset) || 0, h = [
        b ? `margin-left: ${b}px;` : "",
        l ? `margin-right: ${l}px;` : ""
      ].filter(Boolean).join(" ");
      return S`
        <div class="swatches-palette-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${h}">
          ${vi.map((g) => {
        const y = p === g.hex.toLowerCase(), $ = () => {
          r.forwardHaptic && r.forwardHaptic("light"), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: g.rgb });
        };
        return S`
              <button 
                type="button"
                role="button"
                aria-label="Color preset: ${g.label}"
                tabindex="0"
                class="color-swatch-chip"
                title="${g.label}"
                style="flex: 1; min-width: 28px; height: ${v}px; border-radius: ${m}px; background: ${g.hex}; border: ${y ? "2px solid #ffffff" : "1px solid rgba(0,0,0,0.2)"}; cursor: pointer; box-shadow: ${y ? "0 0 10px " + g.hex : "0 1px 3px rgba(0,0,0,0.3)"}; transition: transform 0.15s ease;"
                @keydown=${(x) => {
          (x.key === "Enter" || x.key === " ") && (x.preventDefault(), x.stopPropagation(), $());
        }}
                @click=${(x) => {
          x.stopPropagation(), $();
        }}>
              </button>
            `;
      })}
        </div>
      `;
    }
    const a = e.slider_style === "google", n = e.color_slider_height !== void 0 ? e.color_slider_height : e.slider_height ?? (a ? 42 : 36), d = e.color_slider_border_radius !== void 0 ? e.color_slider_border_radius : e.slider_border_radius ?? (a ? 21 : 8), f = ee.getLiveHue(t), u = `hsl(${f}, 100%, 50%)`, s = Math.round(f / 360 * 100);
    let _;
    return e.color_swatch_presets !== !1 && (_ = S`
        <div class="color-swatch-chips">
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Red Color" style="background: #f44336;" @click=${(p) => {
      p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [244, 67, 54] });
    }} @keydown=${(p) => {
      (p.key === "Enter" || p.key === " ") && (p.preventDefault(), p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [244, 67, 54] }));
    }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Orange Color" style="background: #ff9800;" @click=${(p) => {
      p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [255, 152, 0] });
    }} @keydown=${(p) => {
      (p.key === "Enter" || p.key === " ") && (p.preventDefault(), p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [255, 152, 0] }));
    }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Yellow Color" style="background: #ffeb3b;" @click=${(p) => {
      p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [255, 235, 59] });
    }} @keydown=${(p) => {
      (p.key === "Enter" || p.key === " ") && (p.preventDefault(), p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [255, 235, 59] }));
    }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Green Color" style="background: #4caf50;" @click=${(p) => {
      p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [76, 175, 80] });
    }} @keydown=${(p) => {
      (p.key === "Enter" || p.key === " ") && (p.preventDefault(), p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [76, 175, 80] }));
    }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Cyan Color" style="background: #00bcd4;" @click=${(p) => {
      p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [0, 188, 212] });
    }} @keydown=${(p) => {
      (p.key === "Enter" || p.key === " ") && (p.preventDefault(), p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [0, 188, 212] }));
    }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Blue Color" style="background: #2196f3;" @click=${(p) => {
      p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [33, 150, 243] });
    }} @keydown=${(p) => {
      (p.key === "Enter" || p.key === " ") && (p.preventDefault(), p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [33, 150, 243] }));
    }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Purple Color" style="background: #9c27b0;" @click=${(p) => {
      p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [156, 39, 176] });
    }} @keydown=${(p) => {
      (p.key === "Enter" || p.key === " ") && (p.preventDefault(), p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [156, 39, 176] }));
    }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Pink Color" style="background: #e91e63;" @click=${(p) => {
      p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [233, 30, 99] });
    }} @keydown=${(p) => {
      (p.key === "Enter" || p.key === " ") && (p.preventDefault(), p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [233, 30, 99] }));
    }}></span>
        </div>
      `), this.renderGenericSlider(
      e,
      "color_hue",
      "Light Color Hue",
      0,
      360,
      1,
      f,
      s,
      "light",
      "turn_on",
      (p) => {
        const [v, m, b] = Ct(p, 100);
        return { rgb_color: [v, m, b] };
      },
      r,
      (p) => Math.round(p / 360 * 100),
      (p) => `${p}°`,
      `color-hue ${a ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${n}px; --ag-slider-radius: ${d}px; --color-hue-val: ${u};`,
      _,
      i
    );
  }
  /**
   * Render HTML color picker.
   */
  static renderColorPicker(e, t, r) {
    const i = ee.getLiveHex(t), o = e.color_slider_height !== void 0 ? e.color_slider_height : e.slider_height ?? 36, a = e.color_slider_border_radius !== void 0 ? e.color_slider_border_radius : e.slider_border_radius ?? 8;
    return S`
      <div class="color-picker" title="Adjust Light Color" style="height: ${o}px; border-radius: ${a}px;">
        <input type="color" 
               .value=${i} 
               @input=${(n) => r.onColorInput(n, !0)}
               @change=${(n) => r.onColorInput(n, !1)} />
        <span class="color-label">Color (${i})</span>
      </div>
    `;
  }
  /**
   * Render cover position slider.
   */
  static renderCoverSlider(e, t, r, i = "") {
    const o = t.attributes.current_position ?? (t.state === "open" || t.state === "opening" ? 100 : 0);
    return this.renderGenericSlider(
      e,
      "cover",
      "Cover Position",
      0,
      100,
      1,
      o,
      o,
      "cover",
      "set_cover_position",
      (a) => ({ position: a }),
      r,
      (a) => a,
      (a, n) => `${n}%`,
      "",
      "",
      void 0,
      i
    );
  }
  /**
   * Render fan speed percentage slider.
   */
  static renderFanSlider(e, t, r, i = "") {
    const o = t.attributes.percentage ?? 0, a = t.attributes.percentage_step ?? 1;
    return this.renderGenericSlider(
      e,
      "fan",
      "Fan Speed",
      0,
      100,
      a,
      o,
      o,
      "fan",
      "set_percentage",
      (n) => {
        const d = a > 1 ? Math.round(n / a) * a : n;
        return { percentage: Math.min(100, Math.max(0, d)) };
      },
      r,
      (n) => n,
      (n, d) => `${d}%`,
      "",
      "",
      void 0,
      i
    );
  }
  /**
   * Render media volume slider.
   */
  static renderMediaSlider(e, t, r, i = "") {
    const o = t.attributes.is_volume_muted === !0, a = o ? 0 : Math.round((t.attributes.volume_level ?? 0) * 100), n = o ? "Muted (0%)" : void 0;
    return this.renderGenericSlider(
      e,
      "media",
      "Volume",
      0,
      100,
      1,
      a,
      a,
      "media_player",
      "volume_set",
      (d) => ({ volume_level: d / 100 }),
      r,
      (d) => d,
      (d, f) => o ? "Muted" : `${f}%`,
      "media",
      "",
      n,
      i
    );
  }
  /**
   * Render number domain slider.
   */
  static renderNumberSlider(e, t, r, i = "") {
    const o = Number(t.attributes.min ?? 0);
    let a = Number(t.attributes.max ?? 100);
    o >= a && (a = o + 100);
    const n = Number(t.attributes.step ?? 1), d = Number(t.state), f = isNaN(d) ? o : d, u = a - o, s = u > 0 ? Math.max(0, Math.min(100, Math.round((f - o) / u * 100))) : 0, _ = (e.entity || "number").split(".")[0], p = t.attributes.unit_of_measurement ? ` ${t.attributes.unit_of_measurement}` : "", v = n.toString(), m = v.includes(".") ? v.split(".")[1].length : 0;
    return this.renderGenericSlider(
      e,
      "number",
      "Value",
      o,
      a,
      n,
      f,
      s,
      _,
      "set_value",
      (b) => ({ value: m > 0 ? Number(b.toFixed(m)) : Math.round(b) }),
      r,
      (b) => u > 0 ? Math.round((b - o) / u * 100) : 0,
      (b) => `${m > 0 ? Number(b).toFixed(m) : Math.round(Number(b))}${p}`,
      "",
      "",
      void 0,
      i
    );
  }
  /**
   * Render climate temperature slider.
   */
  static renderClimateSlider(e, t, r, i, o = "") {
    const a = r?.config?.unit_system?.temperature === "°F" || r?.config?.unit_system?.temperature === "F", n = a ? "°F" : "°C", d = a ? 60 : 16, f = a ? 85 : 30, u = t.attributes.min_temp ?? d, s = t.attributes.max_temp ?? f, _ = t.attributes.target_temp_step ?? t.attributes.target_temperature_step ?? (a ? 1 : 0.5), p = t.attributes.target_temp_low !== void 0 && t.attributes.target_temp_high !== void 0, v = t.attributes.temperature ?? t.attributes.target_temp_low ?? t.attributes.target_temp_high ?? u, m = s - u, b = m > 0 ? Math.max(0, Math.min(100, Math.round((v - u) / m * 100))) : 0;
    return this.renderGenericSlider(
      e,
      "climate",
      "Temperature",
      u,
      s,
      _,
      v,
      b,
      "climate",
      "set_temperature",
      (l) => p ? { target_temp_low: l, target_temp_high: Math.min(s, l + (a ? 4 : 2)) } : { temperature: l },
      i,
      (l) => m > 0 ? Math.round((l - u) / m * 100) : 0,
      (l) => `${l}${n}`,
      "climate-temp",
      "",
      `${v}${n}`,
      o
    );
  }
  /**
   * Render humidifier slider.
   */
  static renderHumidifierSlider(e, t, r, i = "") {
    const o = t.attributes?.min_humidity ?? 0, a = t.attributes?.max_humidity ?? 100, n = t.attributes?.humidity ?? t.attributes?.target_humidity ?? o, d = a - o, f = d > 0 ? Math.max(0, Math.min(100, Math.round((n - o) / d * 100))) : 0;
    return this.renderGenericSlider(
      e,
      "humidifier",
      "Humidity",
      o,
      a,
      1,
      n,
      f,
      "humidifier",
      "set_humidity",
      (u) => ({ humidity: u }),
      r,
      (u) => d > 0 ? Math.round((u - o) / d * 100) : 0,
      (u, s) => `${s}%`,
      "",
      "",
      void 0,
      i
    );
  }
  /**
   * Render compact sub-slider inside sub-button row.
   */
  static renderSubSlider(e, t, r, i, o, a, n, d) {
    const f = i || t.states[e.entity || ""], u = r || e.entity || "", s = f?.attributes?.volume_level !== void 0 || f?.entity_id?.startsWith("media_player."), _ = f?.attributes?.percentage !== void 0 || f?.entity_id?.startsWith("fan."), p = f?.attributes?.current_position !== void 0 || f?.entity_id?.startsWith("cover.");
    let v = 0, m = 0, b = 255, l = "1", h = "turn_on", g = "light", y = "brightness";
    s ? (v = f?.attributes?.volume_level ?? 0, b = 1, l = "0.01", h = "set_volume_level", g = "media_player", y = "volume_level") : _ ? (v = f?.attributes?.percentage ?? 0, b = 100, l = "1", h = "set_percentage", g = "fan", y = "percentage") : p ? (v = f?.attributes?.current_position ?? 0, b = 100, l = "1", h = "set_cover_position", g = "cover", y = "position") : v = f?.attributes?.brightness ?? 0;
    const $ = Math.round(b === 1 ? v * 100 : b === 100 ? v : v / 255 * 100);
    return o === "slider" ? S`
        <div class="sub-button-slider-container ${n}" style="${a}" title="Level: ${$}%">
          <input type="range" 
                 min="${m}" 
                 max=${b} 
                 step=${l} 
                 .value=${v}
                 @pointerdown=${(x) => x.stopPropagation()}
                 @input=${(x) => {
      x.stopPropagation();
      const k = parseFloat(x.target.value), T = Math.round(b === 1 ? k * 100 : b === 100 ? k : k / 255 * 100), M = x.target.closest(".sub-button-slider-container");
      M && M.style.setProperty("--sub-slider-pct", `${T}%`), d(`sub_${u}`, () => {
        t.callService(g, h, { entity_id: u, [y]: k });
      }, 50);
    }}
                 @change=${(x) => {
      x.stopPropagation();
      const k = parseFloat(x.target.value);
      t.callService(g, h, { entity_id: u, [y]: k });
    }}
                 style="--sub-slider-pct: ${$}%;" />
        </div>
      ` : S`
      <div class="sub-button-group-updown" style="${a}">
        <button type="button" class="sub-button ${n}" title="Decrease Level"
                @click=${(x) => {
      x.stopPropagation();
      const T = Math.max(m, v - (b === 1 ? 0.05 : b === 100 ? 5 : 25));
      t.callService(g, h, { entity_id: u, [y]: T });
    }}>
          <ha-icon icon="mdi:chevron-down"></ha-icon>
        </button>
        <span class="sub-button-updown-val">${$}%</span>
        <button type="button" class="sub-button ${n}" title="Increase Level"
                @click=${(x) => {
      x.stopPropagation();
      const T = Math.min(b, v + (b === 1 ? 0.05 : b === 100 ? 5 : 25));
      t.callService(g, h, { entity_id: u, [y]: T });
    }}>
          <ha-icon icon="mdi:chevron-up"></ha-icon>
        </button>
      </div>
    `;
  }
  /**
   * Render sub color picker.
   */
  static renderSubColorPicker(e, t, r, i, o, a, n, d) {
    const f = r || e.states[t || ""], u = t || f?.entity_id, s = ee.getLiveHex(f);
    return S`
      <div class="sub-button sub-button-color-picker ${o}" style="${i}" title="Color (${s})">
        <input type="color" 
               .value=${s} 
               @click=${(_) => _.stopPropagation()}
               @input=${(_) => a.onColorInput(_, !0, u, `sub_color_${u}`)}
               @change=${(_) => a.onColorInput(_, !1, u, `sub_color_${u}`)} />
        <ha-icon icon="mdi:palette" style="color: ${s};"></ha-icon>
        ${n ? S`<span class="sub-button-label" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${n}</span>` : w}
        ${d ? S`<span class="sub-button-state" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${d}</span>` : w}
      </div>
    `;
  }
}
var wi = Object.defineProperty, Nt = (c, e, t, r) => {
  for (var i = void 0, o = c.length - 1, a; o >= 0; o--)
    (a = c[o]) && (i = a(e, t, i) || i);
  return i && wi(e, t, i), i;
};
const Si = [
  { name: "entity", selector: { entity: {} } },
  { name: "name", selector: { text: {} } },
  { name: "visibility_state", selector: { select: { options: [
    { value: "always", label: "Always Visible (Default)" },
    { value: "on", label: "Show ONLY When ON (Hide When OFF)" },
    { value: "off", label: "Show ONLY When OFF (Hide When ON)" }
  ] } } },
  { name: "layout", selector: { select: { options: [
    { value: "default", label: "Default (Horizontal Row)" },
    { value: "horizontal", label: "Horizontal Compact" },
    { value: "vertical", label: "Vertical Centered" }
  ] } } },
  { name: "card_layout", selector: { select: { options: [
    { value: "normal", label: "Normal" },
    { value: "large", label: "Large (Bubble Style)" }
  ] } } },
  { name: "primary_info", selector: { select: { options: [
    { value: "name", label: "Name (Default)" },
    { value: "state", label: "State" },
    { value: "last-changed", label: "Last Changed (Relative: e.g. 5 min ago)" },
    { value: "last-updated", label: "Last Updated (Relative: e.g. 5 min ago)" },
    { value: "last-triggered", label: "Last Triggered (Automations/Scripts)" },
    { value: "brightness", label: "Brightness % (Lights)" },
    { value: "temperature", label: "Temperature (Climate/Sensors)" },
    { value: "humidity", label: "Humidity % (Sensors)" },
    { value: "battery", label: "Battery Level %" },
    { value: "none", label: "None" }
  ] } } },
  { name: "secondary_info", selector: { select: { options: [
    { value: "state", label: "State (Default)" },
    { value: "name", label: "Name" },
    { value: "last-changed", label: "Last Changed (Relative: e.g. 5 min ago)" },
    { value: "last-updated", label: "Last Updated (Relative: e.g. 5 min ago)" },
    { value: "last-triggered", label: "Last Triggered (Automations/Scripts)" },
    { value: "brightness", label: "Brightness % (Lights)" },
    { value: "temperature", label: "Temperature (Climate/Sensors)" },
    { value: "humidity", label: "Humidity % (Sensors)" },
    { value: "battery", label: "Battery Level %" },
    { value: "none", label: "None" }
  ] } } },
  { name: "aspect_ratio", selector: { text: { suffix: "e.g. 1/1, 2/1" } } },
  { name: "show_icon", selector: { boolean: {} } },
  { name: "show_name", selector: { boolean: {} } },
  { name: "show_state", selector: { boolean: {} } },
  { name: "fill_container", selector: { boolean: {} } },
  { name: "overflow_hidden", selector: { boolean: {} } },
  { name: "badge_icon", selector: { icon: {} } },
  { name: "badge_color", selector: { color_rgb: {} } },
  { name: "badge_size", selector: { number: { min: 8, max: 64, mode: "slider" } } },
  { name: "badge_offset", selector: { number: { min: -30, max: 50, mode: "slider" } } }
], $i = [
  { name: "theme_preset", selector: { select: { options: [
    { value: "default", label: "Default (Card Colors)" },
    { value: "glassmorphism", label: "Frosted Glass (Glassmorphism)" },
    { value: "neumorphism", label: "Soft Neumorphism Extrusion" },
    { value: "cyberpunk", label: "Cyberpunk Neon Glow" },
    { value: "minimal_flat", label: "Clean Minimal Flat" },
    { value: "sunset_gradient", label: "Warm Sunset Gradient" },
    { value: "oled_black", label: "OLED Pitch Black" },
    { value: "aurora", label: "Nordic Aurora Ambient Flow" },
    { value: "material_you", label: "Material You Adaptive Pill" },
    { value: "retro_synth", label: "80s Synthwave / Neon Grid Glow" }
  ] } } },
  { name: "hover_effect", selector: { select: { options: [
    { value: "none", label: "None" },
    { value: "lift", label: "Elevate & Lift (TranslateY)" },
    { value: "glow", label: "Glow Border" },
    { value: "scale", label: "Smooth Micro-Scale (1.02x)" }
  ] } } },
  { name: "color_type", selector: { select: { options: [
    { value: "icon", label: "Icon Only (Default)" },
    { value: "card", label: "Flood Entire Card Background" }
  ] } } },
  { name: "bg_color", selector: { color_rgb: {} } },
  { name: "bg_opacity", selector: { number: { min: 0, max: 100, mode: "slider" } } },
  { name: "active_color", selector: { color_rgb: {} } },
  { name: "inactive_color", selector: { color_rgb: {} } },
  { name: "text_color_primary", selector: { color_rgb: {} } },
  { name: "text_color_secondary", selector: { color_rgb: {} } },
  { name: "card_border_width", selector: { number: { min: 0, max: 20, mode: "slider" } } },
  { name: "card_border_color", selector: { color_rgb: {} } },
  { name: "card_border_style", selector: { select: { options: [
    { value: "none", label: "None" },
    { value: "solid", label: "Solid" },
    { value: "dashed", label: "Dashed" },
    { value: "dotted", label: "Dotted" }
  ] } } },
  { name: "border_radius", selector: { number: { min: 0, max: 100, mode: "slider" } } },
  { name: "box_shadow", selector: { select: { options: [
    { value: "none", label: "None" },
    { value: "soft", label: "Soft Drop" },
    { value: "deep", label: "Deep Shadow" },
    { value: "glow", label: "Neon Glow" }
  ] } } },
  { name: "backdrop_blur", selector: { number: { min: 0, max: 50, mode: "slider" } } },
  { name: "card_opacity", selector: { number: { min: 0, max: 100, mode: "slider" } } },
  { name: "transition_duration", selector: { number: { min: 0, max: 3e3, mode: "slider", step: 50 } } },
  { name: "active_glow", selector: { boolean: {} } },
  { name: "active_pulse", selector: { boolean: {} } },
  // Icon styling
  { name: "icon", selector: { icon: {} } },
  { name: "icon_size", selector: { number: { min: 12, max: 96, mode: "slider", step: 2 } } },
  { name: "icon_container_size", selector: { number: { min: 16, max: 128, mode: "slider", step: 2 } } },
  { name: "icon_color", selector: { color_rgb: {} } },
  { name: "icon_type", selector: { select: { options: [
    { value: "icon", label: "Icon" },
    { value: "entity-picture", label: "Entity Picture" },
    { value: "none", label: "None" }
  ] } } },
  { name: "icon_shape", selector: { select: { options: [
    { value: "circle", label: "Circle (Default)" },
    { value: "rounded", label: "Rounded Square" },
    { value: "square", label: "Square" },
    { value: "none", label: "Transparent / No Background" }
  ] } } },
  { name: "icon_animation", selector: { select: { options: [
    { value: "none", label: "None" },
    { value: "spin", label: "Spin (Fans & Rotations)" },
    { value: "pulse", label: "Pulse" },
    { value: "bounce", label: "Bounce" }
  ] } } },
  { name: "icon_opacity", selector: { number: { min: 0, max: 100, mode: "slider" } } },
  { name: "icon_rotate", selector: { number: { min: 0, max: 360, mode: "slider", step: 5 } } },
  // Multi-Stage Fade Transitions & Decay Sliders (Integrated into Appearance)
  { name: "fade_transition_enabled", selector: { boolean: {} } },
  { name: "fade_trigger", selector: { select: { options: [
    { value: "on_inactive", label: "On Inactive (Cooldown / Motion Cleared)" },
    { value: "on_active", label: "On Active (Warmup / Motion Active)" },
    { value: "both", label: "Both Active and Inactive" }
  ] } } },
  { name: "fade_target", selector: { select: { options: [
    { value: "card", label: "Card Background" },
    { value: "icon", label: "Icon Container" },
    { value: "slider", label: "Decay Slider Only" },
    { value: "all", label: "All Elements (Card, Icon & Slider)" }
  ] } } },
  { name: "fade_smooth_retrigger", selector: { boolean: {} } },
  { name: "show_decay_slider", selector: { boolean: {} } },
  { name: "decay_slider_height", selector: { number: { min: 4, max: 48, mode: "slider", step: 1 } } },
  { name: "decay_slider_position", selector: { select: { options: [
    { value: "bottom", label: "Bottom (Below Text/Features)" },
    { value: "top", label: "Top (Above Text)" },
    { value: "inline", label: "Inline (Inside Header)" }
  ] } } },
  { name: "fade_stage_1_duration", selector: { number: { min: 0, max: 1800, mode: "slider", unit_of_measurement: "sec", step: 5 } } },
  { name: "fade_stage_1_pickup", selector: { boolean: {} } },
  { name: "fade_stage_1_color", selector: { color_rgb: {} } },
  { name: "fade_stage_2_duration", selector: { number: { min: 0, max: 3600, mode: "slider", unit_of_measurement: "sec", step: 10 } } },
  { name: "fade_stage_2_pickup", selector: { boolean: {} } },
  { name: "fade_stage_2_color", selector: { color_rgb: {} } },
  { name: "fade_stage_3_duration", selector: { number: { min: 0, max: 7200, mode: "slider", unit_of_measurement: "sec", step: 30 } } },
  { name: "fade_stage_3_pickup", selector: { boolean: {} } },
  { name: "fade_stage_3_color", selector: { color_rgb: {} } }
], Ci = [
  { name: "use_light_color", label: "Dynamic Light Color Accent (Mushroom/Bubble Style)", selector: { boolean: {} } },
  { name: "haptic_feedback", label: "Haptic Feedback Vibrations (Mobile / Companion App)", selector: { boolean: {} } },
  { name: "haptic_type", label: "Haptic Vibration Intensity / Pattern", selector: { select: { options: [
    { value: "light", label: "Light Tap (Default)" },
    { value: "selection", label: "Selection Tick" },
    { value: "medium", label: "Medium Pulse" },
    { value: "heavy", label: "Heavy Thud" },
    { value: "success", label: "Success Pattern" },
    { value: "warning", label: "Warning Pattern" },
    { value: "error", label: "Error Pattern" }
  ] } } },
  { name: "slider_stepped_movement", label: "Stepped Slider Movement (Discrete Values vs Smooth)", selector: { boolean: {} } },
  { name: "tap_slider_to_toggle", label: "Tap Slider Body to Toggle Entity (Slider-Button Card Style)", selector: { boolean: {} } },
  { name: "show_slider", selector: { boolean: {} } },
  { name: "hide_slider_when_off", selector: { boolean: {} } },
  { name: "slider_style", selector: { select: { options: [
    { value: "circle", label: "Circle Knob (Line with Round Thumb - Default)" },
    { value: "google", label: "Google Home / Material 3 Pill Slider" },
    { value: "filled", label: "Hue-Style Filled Capsule (Fluid Pill / No Knob)" },
    { value: "thin", label: "Thin Minimalist Line (Compact Knob)" },
    { value: "glow", label: "Neon Glow Laser Line" },
    { value: "segmented", label: "Segmented Stepped Bar" },
    { value: "full", label: "Full Card Slider (slider-button-card style)" }
  ] } } },
  { name: "full_slider_opacity", selector: { number: { min: 5, max: 100, mode: "slider" } } },
  { name: "show_slider_percent", selector: { boolean: {} } },
  { name: "slider_color", selector: { color_rgb: {} } },
  { name: "slider_track_color", selector: { color_rgb: {} } },
  { name: "slider_height", selector: { number: { min: 2, max: 80, mode: "slider" } } },
  { name: "slider_border_radius", selector: { number: { min: 0, max: 40, mode: "slider" } } },
  { name: "slider_start_offset", selector: { number: { min: -100, max: 100, mode: "slider" } } },
  { name: "slider_end_offset", selector: { number: { min: -100, max: 100, mode: "slider" } } },
  { name: "show_color_temp", selector: { boolean: {} } },
  { name: "hide_color_temp_when_off", selector: { boolean: {} } },
  { name: "color_temp_type", selector: { select: { options: [
    { value: "gradient", label: "Kelvin Gradient Slider (Default)" },
    { value: "google", label: "Google Home Pill Temperature Slider" },
    { value: "presets", label: "Preset Temperature Quick Buttons (2200K - 6500K)" },
    { value: "thin", label: "Thin Minimalist Line Slider" }
  ] } } },
  { name: "color_temp_height", selector: { number: { min: 2, max: 80, mode: "slider" } } },
  { name: "color_temp_border_radius", selector: { number: { min: 0, max: 40, mode: "slider" } } },
  { name: "color_temp_start_offset", selector: { number: { min: -100, max: 100, mode: "slider" } } },
  { name: "color_temp_end_offset", selector: { number: { min: -100, max: 100, mode: "slider" } } },
  { name: "show_color_slider", selector: { boolean: {} } },
  { name: "hide_color_slider_when_off", selector: { boolean: {} } },
  { name: "color_slider_height", selector: { number: { min: 2, max: 80, mode: "slider" } } },
  { name: "color_slider_border_radius", selector: { number: { min: 0, max: 40, mode: "slider" } } },
  { name: "color_slider_start_offset", selector: { number: { min: -100, max: 100, mode: "slider" } } },
  { name: "color_slider_end_offset", selector: { number: { min: -100, max: 100, mode: "slider" } } },
  { name: "color_picker_type", selector: { select: { options: [
    { value: "slider", label: "Hue Spectrum 360° Rainbow Slider (Default)" },
    { value: "google", label: "Google Home Material 3 Rainbow Pill Slider" },
    { value: "wheel", label: "Interactive Color Wheel" },
    { value: "swatches", label: "Quick Color Swatches (Palette Buttons)" }
  ] } } },
  { name: "features_position", selector: { select: { options: [
    { value: "bottom", label: "Bottom Stack (Under Info)" },
    { value: "inline", label: "Inline (Right of Info - Bubble Card Style)" }
  ] } } },
  { name: "collapse_controls_trigger", selector: { select: { options: [
    { value: "none", label: "Always Expanded (Disabled)" },
    { value: "hold", label: "Long Press / Hold Card (Recommended)" },
    { value: "double_tap", label: "Double Tap Card" }
  ] } } }
], ki = [
  { name: "card_padding", label: "Card Base Padding (All Sides px)", selector: { number: { min: 0, max: 64, mode: "slider" } } },
  { name: "card_padding_vertical", label: "Card Vertical Padding (Top/Bottom px)", selector: { number: { min: 0, max: 64, mode: "slider" } } },
  { name: "card_padding_horizontal", label: "Card Horizontal Padding (Left/Right px)", selector: { number: { min: 0, max: 64, mode: "slider" } } },
  { name: "card_padding_top", label: "Card Padding Top (px)", selector: { number: { min: 0, max: 64, mode: "slider" } } },
  { name: "card_padding_bottom", label: "Card Padding Bottom (px)", selector: { number: { min: 0, max: 64, mode: "slider" } } },
  { name: "card_padding_left", label: "Card Padding Left (px)", selector: { number: { min: 0, max: 64, mode: "slider" } } },
  { name: "card_padding_right", label: "Card Padding Right (px)", selector: { number: { min: 0, max: 64, mode: "slider" } } },
  { name: "card_margin", label: "Card Base Margin (All Sides px)", selector: { number: { min: -30, max: 64, mode: "slider" } } },
  { name: "card_margin_vertical", label: "Card Vertical Margin (Top/Bottom px)", selector: { number: { min: -30, max: 64, mode: "slider" } } },
  { name: "card_margin_horizontal", label: "Card Horizontal Margin (Left/Right px)", selector: { number: { min: -30, max: 64, mode: "slider" } } },
  { name: "card_margin_top", label: "Card Margin Top (px)", selector: { number: { min: -30, max: 64, mode: "slider" } } },
  { name: "card_margin_bottom", label: "Card Margin Bottom (px)", selector: { number: { min: -30, max: 64, mode: "slider" } } },
  { name: "card_margin_left", label: "Card Margin Left (px)", selector: { number: { min: -30, max: 64, mode: "slider" } } },
  { name: "card_margin_right", label: "Card Margin Right (px)", selector: { number: { min: -30, max: 64, mode: "slider" } } },
  { name: "content_spacing", label: "Content Gap (Icon, Text, Features px)", selector: { number: { min: -20, max: 80, mode: "slider" } } },
  { name: "text_spacing", label: "Text Gap (Primary & Secondary px)", selector: { number: { min: -20, max: 48, mode: "slider" } } },
  { name: "features_margin", label: "Controls Top Margin (px)", selector: { number: { min: -30, max: 80, mode: "slider" } } },
  { name: "slider_spacing", label: "Gap Between Multiple Sliders (px)", selector: { number: { min: -10, max: 48, mode: "slider" } } },
  { name: "icon_margin", label: "Icon Margin (px)", selector: { number: { min: -30, max: 80, mode: "slider" } } },
  // Component Inner Paddings
  { name: "icon_padding", label: "Icon Inner Padding (px)", selector: { number: { min: 0, max: 48, mode: "slider" } } },
  { name: "text_padding", label: "Text Block Base Padding (px)", selector: { number: { min: 0, max: 48, mode: "slider" } } },
  { name: "text_padding_vertical", label: "Text Vertical Padding (px)", selector: { number: { min: 0, max: 48, mode: "slider" } } },
  { name: "text_padding_horizontal", label: "Text Horizontal Padding (px)", selector: { number: { min: 0, max: 48, mode: "slider" } } },
  { name: "features_padding", label: "Controls Container Padding (px)", selector: { number: { min: 0, max: 48, mode: "slider" } } },
  { name: "features_padding_vertical", label: "Controls Vertical Padding (px)", selector: { number: { min: 0, max: 48, mode: "slider" } } },
  { name: "features_padding_horizontal", label: "Controls Horizontal Padding (px)", selector: { number: { min: 0, max: 48, mode: "slider" } } },
  // Sizing & Positioning
  { name: "card_width", selector: { text: { suffix: "e.g. 100%, 300px, auto" } } },
  { name: "card_max_width", selector: { text: { suffix: "e.g. 400px, 100%" } } },
  { name: "card_height", selector: { text: { suffix: "e.g. auto, 120px, 100%" } } },
  { name: "card_min_height", selector: { number: { min: 0, max: 500, mode: "slider", step: 10 } } },
  { name: "text_box_width", selector: { text: { suffix: "e.g. 100%, 180px, auto" } } },
  { name: "text_alignment", selector: { select: { options: [
    { value: "left", label: "Left" },
    { value: "center", label: "Center" },
    { value: "right", label: "Right" },
    { value: "justify", label: "Justify" }
  ] } } },
  { name: "content_alignment", selector: { select: { options: [
    { value: "flex-start", label: "Start (Top/Left)" },
    { value: "center", label: "Center" },
    { value: "flex-end", label: "End (Bottom/Right)" },
    { value: "space-between", label: "Space Between" },
    { value: "space-around", label: "Space Around" }
  ] } } },
  { name: "text_offset_x", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "text_offset_y", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "primary_text_start_offset", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "primary_text_end_offset", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "primary_text_offset_y", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "secondary_text_start_offset", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "secondary_text_end_offset", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "secondary_text_offset_y", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "icon_offset_x", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "icon_offset_y", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "features_offset_x", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "features_offset_y", selector: { number: { min: -150, max: 250, mode: "slider" } } }
], Ti = [
  { name: "text_color_mode", selector: { select: { options: [
    { value: "selected", label: "Fixed Selected Color (Default)" },
    { value: "inverse", label: "Inverse Dynamic Text (Blend Mode Difference)" },
    { value: "active_accent", label: "Adaptive Active Accent (Dynamic Color when On)" }
  ] } } },
  { name: "font_size_primary", selector: { number: { min: 10, max: 36, mode: "slider" } } },
  { name: "font_size_secondary", selector: { number: { min: 10, max: 24, mode: "slider" } } },
  { name: "font_weight_primary", selector: { select: { options: [
    { value: "normal", label: "Normal (400)" },
    { value: "500", label: "Medium (500)" },
    { value: "bold", label: "Bold (700)" },
    { value: "800", label: "Heavy (800)" }
  ] } } },
  { name: "text_color_primary", selector: { color_rgb: {} } },
  { name: "text_color_secondary", selector: { color_rgb: {} } },
  { name: "primary_text_start_offset", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "primary_text_end_offset", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "primary_text_offset_y", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "secondary_text_start_offset", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "secondary_text_end_offset", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "secondary_text_offset_y", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "text_scrolling_primary", selector: { select: { options: [
    { value: "none", label: "None (Standard Truncate with Ellipsis)" },
    { value: "marquee", label: "Marquee (Smooth Bounce / Ping-Pong)" },
    { value: "continuous", label: "Continuous Ticker Loop" },
    { value: "hover", label: "Scroll on Hover Only" }
  ] } } },
  { name: "text_scrolling_secondary", selector: { select: { options: [
    { value: "none", label: "None (Standard Truncate with Ellipsis)" },
    { value: "marquee", label: "Marquee (Smooth Bounce / Ping-Pong)" },
    { value: "continuous", label: "Continuous Ticker Loop" },
    { value: "hover", label: "Scroll on Hover Only" }
  ] } } },
  { name: "text_scrolling_speed", selector: { number: { min: 4, max: 30, mode: "slider", step: 1 } } },
  { name: "text_transform_primary", selector: { select: { options: [
    { value: "none", label: "None" },
    { value: "uppercase", label: "UPPERCASE" },
    { value: "capitalize", label: "Capitalize" },
    { value: "lowercase", label: "lowercase" }
  ] } } },
  { name: "text_transform_secondary", selector: { select: { options: [
    { value: "none", label: "None" },
    { value: "uppercase", label: "UPPERCASE" },
    { value: "capitalize", label: "Capitalize (Default)" },
    { value: "lowercase", label: "lowercase" }
  ] } } }
], ir = [
  { name: "sub_button_alignment", selector: { select: { options: [
    { value: "flex-end", label: "Right Aligned (Default)" },
    { value: "flex-start", label: "Left Aligned" },
    { value: "center", label: "Centered" },
    { value: "space-between", label: "Space Between (Spread Evenly)" },
    { value: "space-around", label: "Space Around" }
  ] } } },
  { name: "sub_button_spacing", label: "Gap Between Sub-Buttons (px)", selector: { number: { min: -10, max: 64, mode: "slider" } } },
  { name: "sub_button_padding", label: "Sub-Button Internal Padding (px)", selector: { number: { min: 0, max: 48, mode: "slider" } } },
  { name: "sub_button_container_padding", label: "Container Top Padding (px)", selector: { number: { min: 0, max: 48, mode: "slider" } } }
];
function ht(c) {
  return [
    { name: `sub_button_${c}_entity`, selector: { entity: {} } },
    { name: `sub_button_${c}_type`, selector: { select: { options: [
      { value: "button", label: "Standard Action Button (Default)" },
      { value: "play_pause", label: "Media: Play/Pause Dynamic Toggle" },
      { value: "next", label: "Media: Next Track" },
      { value: "previous", label: "Media: Previous Track" },
      { value: "vol_up", label: "Media: Volume Up (+5%)" },
      { value: "vol_down", label: "Media: Volume Down (-5%)" },
      { value: "mute", label: "Media: Mute / Unmute Toggle" },
      { value: "source", label: "Media: Cycle Input Source" },
      { value: "sound_mode", label: "Media: Cycle Sound DSP Mode" },
      { value: "shuffle", label: "Media: Toggle Shuffle Mode" },
      { value: "repeat", label: "Media: Cycle Repeat Mode" },
      { value: "chime", label: "Audio: Play Chime / Doorbell Sound" },
      { value: "open_close", label: "Cover: Open/Close Dynamic Toggle" },
      { value: "stop", label: "Cover: Stop Position" },
      { value: "open_tilt", label: "Cover: Open Tilt Position" },
      { value: "close_tilt", label: "Cover: Close Tilt Position" },
      { value: "stop_tilt", label: "Cover: Stop Tilt Position" },
      { value: "cover_preset", label: "Cover: Go to Favorite Preset (50%)" },
      { value: "lock_unlock", label: "Lock: Lock/Unlock Dynamic Toggle" },
      { value: "garage_toggle", label: "Cover: Garage Door Smart Toggle" },
      { value: "fan_speed", label: "Fan: Cycle Speed Preset" },
      { value: "fan_mode", label: "Climate: Cycle Fan Speed Mode" },
      { value: "fan_oscillate", label: "Fan: Toggle Oscillation" },
      { value: "fan_direction", label: "Fan: Toggle Direction (Forward/Reverse)" },
      { value: "swing_mode", label: "Climate: Cycle Vane Swing Mode" },
      { value: "climate_preset", label: "Climate: Cycle Preset (Eco/Comfort/Boost)" },
      { value: "temp_up", label: "Climate: Temperature Step Up (+0.5°C / +1°F)" },
      { value: "temp_down", label: "Climate: Temperature Step Down (-0.5°C / -1°F)" },
      { value: "clean", label: "Vacuum: Start Cleaning" },
      { value: "dock", label: "Vacuum: Return to Base / Dock" },
      { value: "locate", label: "Vacuum: Play Sound / Locate" },
      { value: "vacuum_fan_speed", label: "Vacuum: Cycle Suction Power" },
      { value: "siren_toggle", label: "Siren: Toggle Emergency Siren/Strobe" },
      { value: "hvac_mode", label: "Climate: Cycle Operating Mode" },
      { value: "light_effect", label: "Light: Cycle Color Animation Effect" },
      { value: "dim_up", label: "Light/Number: Step Up (+10% / +Step)" },
      { value: "dim_down", label: "Light/Number: Step Down (-10% / -Step)" },
      { value: "humidity_up", label: "Humidifier: Step Target Up (+5%)" },
      { value: "humidity_down", label: "Humidifier: Step Target Down (-5%)" },
      { value: "humidifier_mode", label: "Humidifier: Cycle Operating Mode" },
      { value: "counter_inc", label: "Counter: Increment (+1)" },
      { value: "counter_dec", label: "Counter: Decrement (-1)" },
      { value: "input_select", label: "Input Select: Cycle Next Option" },
      { value: "temp_warm", label: "Light: Shift Temperature Warmer (+200K)" },
      { value: "temp_cool", label: "Light: Shift Temperature Cooler (-200K)" },
      { value: "slider", label: "Inline Control: Mini Horizontal Slider" },
      { value: "google_slider", label: "Inline Control: Google Home Pill Slider" },
      { value: "color_temp", label: "Inline Control: Mini Color Temp Slider" },
      { value: "color_picker", label: "Inline Control: Mini RGB Hue Slider" },
      { value: "brightness", label: "Inline Control: Direct Brightness Slider" }
    ] } } },
    { name: `sub_button_${c}_icon`, selector: { icon: {} } },
    { name: `sub_button_${c}_name`, selector: { text: {} } },
    { name: `sub_button_${c}_show_state`, selector: { boolean: {} } },
    { name: `sub_button_${c}_color`, selector: { color_rgb: {} } },
    { name: `sub_button_${c}_show_background`, selector: { boolean: {} } },
    { name: `sub_button_${c}_tap_action`, selector: { ui_action: {} } },
    { name: `sub_button_${c}_hold_action`, selector: { ui_action: {} } },
    { name: `sub_button_${c}_double_tap_action`, selector: { ui_action: {} } }
  ];
}
const Mi = ht(1), Ai = ht(2), Pi = ht(3), Ei = ht(4), Ni = [
  { name: "tap_action", selector: { ui_action: {} } },
  { name: "hold_action", selector: { ui_action: {} } },
  { name: "double_tap_action", selector: { ui_action: {} } },
  { name: "custom_styles", selector: { text: { multiline: !0 } } }
], or = {
  red: "#ff0000",
  green: "#008000",
  blue: "#0000ff",
  white: "#ffffff",
  black: "#000000",
  orange: "#ffa500",
  yellow: "#ffff00",
  purple: "#800080",
  pink: "#ffc0cb",
  cyan: "#00ffff",
  gray: "#808080",
  grey: "#808080",
  teal: "#008080",
  gold: "#ffd700",
  lime: "#00ff00"
};
function D(c) {
  if (typeof c != "string" || !c.trim()) return;
  const e = c.trim();
  if (or[e.toLowerCase()])
    return or[e.toLowerCase()];
  if (/^#[0-9a-fA-F]{3}$/.test(e))
    return `#${e[1]}${e[1]}${e[2]}${e[2]}${e[3]}${e[3]}`;
  if (/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(e)) {
    const i = e.split(",").map((o) => Math.max(0, Math.min(255, parseInt(o.trim(), 10))));
    return `#${i[0].toString(16).padStart(2, "0")}${i[1].toString(16).padStart(2, "0")}${i[2].toString(16).padStart(2, "0")}`;
  }
  const t = e.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/i);
  if (t) {
    const i = Math.max(0, Math.min(255, parseInt(t[1], 10))), o = Math.max(0, Math.min(255, parseInt(t[2], 10))), a = Math.max(0, Math.min(255, parseInt(t[3], 10)));
    return `#${i.toString(16).padStart(2, "0")}${o.toString(16).padStart(2, "0")}${a.toString(16).padStart(2, "0")}`;
  }
  const r = e.match(/hsla?\s*\(\s*([\d.]+)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?(?:\s*,\s*([\d.]+))?\s*\)/i);
  if (r) {
    const i = parseFloat(r[1]) / 360, o = parseFloat(r[2]) / 100, a = parseFloat(r[3]) / 100, n = (_, p, v) => (v < 0 && (v += 1), v > 1 && (v -= 1), v < 1 / 6 ? _ + (p - _) * 6 * v : v < 1 / 2 ? p : v < 2 / 3 ? _ + (p - _) * (2 / 3 - v) * 6 : _);
    let d, f, u;
    if (o === 0)
      d = f = u = a;
    else {
      const _ = a < 0.5 ? a * (1 + o) : a + o - a * o, p = 2 * a - _;
      d = n(p, _, i + 1 / 3), f = n(p, _, i), u = n(p, _, i - 1 / 3);
    }
    const s = (_) => Math.round(Math.max(0, Math.min(255, _ * 255))).toString(16).padStart(2, "0");
    return `#${s(d)}${s(f)}${s(u)}`;
  }
  return e;
}
function Li(c) {
  const e = D(c);
  if (!e || !e.startsWith("#") || e.length < 7) return;
  const t = parseInt(e.slice(1, 3), 16), r = parseInt(e.slice(3, 5), 16), i = parseInt(e.slice(5, 7), 16);
  if (!(isNaN(t) || isNaN(r) || isNaN(i)))
    return [t, r, i];
}
const Di = {
  entity: "Entity",
  name: "Name (Optional Override)",
  icon: "Icon Override",
  icon_color: "Icon Color",
  icon_type: "Icon Type",
  icon_shape: "Icon Background Shape",
  icon_animation: "Icon Dynamic Animation",
  icon_opacity: "Icon Opacity %",
  icon_rotate: "Icon Rotation (degrees)",
  badge_icon: "Status Badge Icon (Mushroom)",
  badge_color: "Status Badge Color",
  badge_size: "Badge Size (px)",
  badge_offset: "Badge Offset from Corner (px)",
  theme_preset: "Visual Design Theme Preset",
  hover_effect: "Card Hover / Interaction Effect",
  color_type: "Color Application Target",
  layout: "Content Flow Layout",
  card_layout: "Card Sizing",
  primary_info: "Primary Text Display",
  secondary_info: "Secondary Text Display",
  features_position: "Slider / Controls Position",
  aspect_ratio: "Card Aspect Ratio",
  show_icon: "Show Icon Area",
  show_name: "Show Primary Name",
  show_state: "Show Secondary State",
  visibility_state: "Conditional Visibility / Display Filter",
  fill_container: "Fill Container Height (100%)",
  overflow_hidden: "Clip Overflow Content",
  show_slider: "Interactive Slider",
  hide_slider_when_off: "Hide Main Slider When Off",
  slider_style: "Slider Visual Style",
  full_slider_opacity: "Full Card Slider Background Opacity %",
  show_slider_percent: "Show Live Percentage Badge on Slider",
  slider_height: "Slider Track Height (px)",
  slider_border_radius: "Slider Track Roundness (px)",
  slider_start_offset: "Main Slider Start Position (Left Offset px)",
  slider_end_offset: "Main Slider End Position (Right Offset px)",
  show_color_temp: "Expanding Color Temp Slider (Lights)",
  hide_color_temp_when_off: "Hide Color Temp Slider When Off",
  color_temp_height: "Color Temp Slider Height (px)",
  color_temp_border_radius: "Color Temp Slider Corner Radius (px)",
  color_temp_start_offset: "Color Temp Start Position (Left Offset px)",
  color_temp_end_offset: "Color Temp End Position (Right Offset px)",
  show_color_slider: "Expanding Color Hue Slider (Lights)",
  hide_color_slider_when_off: "Hide Color Hue Slider When Off",
  color_slider_height: "Color Hue Slider Height (px)",
  color_slider_border_radius: "Color Hue Slider Corner Radius (px)",
  color_slider_start_offset: "Color Hue Start Position (Left Offset px)",
  color_slider_end_offset: "Color Hue End Position (Right Offset px)",
  font_size_primary: "Primary Font Size (px)",
  font_size_secondary: "Secondary Font Size (px)",
  font_weight_primary: "Primary Text Weight",
  text_color_primary: "Primary Text Color",
  text_color_secondary: "Secondary Text Color",
  text_scrolling_primary: "Primary Text Scrolling Effect",
  text_scrolling_secondary: "Secondary Text Scrolling Effect",
  text_scrolling_speed: "Text Scrolling Speed (seconds)",
  text_transform_primary: "Primary Text Case",
  text_transform_secondary: "Secondary Text Case",
  letter_spacing: "Letter Spacing (px)",
  line_height: "Line Height",
  icon_size: "Icon Size (px)",
  card_padding: "Card Inner Base Padding (px)",
  card_padding_vertical: "Vertical Padding (Top/Bottom px)",
  card_padding_horizontal: "Horizontal Padding (Left/Right px)",
  card_padding_top: "Top Padding (px)",
  card_padding_bottom: "Bottom Padding (px)",
  card_padding_left: "Left Padding (px)",
  card_padding_right: "Right Padding (px)",
  card_margin: "Card Outer Margin (px)",
  card_margin_vertical: "Card Vertical Margin / Separator (px)",
  card_margin_horizontal: "Card Horizontal Margin / Separator (px)",
  card_margin_top: "Card Margin Top (px)",
  card_margin_bottom: "Card Margin Bottom (px)",
  card_margin_left: "Card Margin Left (px)",
  card_margin_right: "Card Margin Right (px)",
  icon_padding: "Icon Inner Padding (px)",
  text_padding: "Text Base Padding (px)",
  text_padding_vertical: "Text Vertical Padding (px)",
  text_padding_horizontal: "Text Horizontal Padding (px)",
  features_padding: "Controls Container Padding (px)",
  features_padding_vertical: "Controls Vertical Padding (px)",
  features_padding_horizontal: "Controls Horizontal Padding (px)",
  sub_button_container_padding: "Sub-Buttons Container Padding (px)",
  content_spacing: "Content Gap (Icon, Text, Features px)",
  text_spacing: "Text Gap (Primary & Secondary px)",
  features_margin: "Features Margin Top (px)",
  slider_spacing: "Gap Between Multiple Sliders (px)",
  icon_margin: "Icon Margin (px)",
  sub_button_spacing: "Sub-Buttons Gap (px)",
  sub_button_padding: "Sub-Buttons Padding (px)",
  sub_button_alignment: "Sub-Buttons Alignment & Distribution",
  card_width: "Card Width (e.g. 100%, 300px)",
  card_max_width: "Card Max Width (e.g. 400px, 100%)",
  card_height: "Card Fixed Height (e.g. auto, 120px)",
  card_min_height: "Card Minimum Height (px)",
  text_box_width: "Text Box / Info Area Width (e.g. 100%, 180px, auto)",
  icon_container_size: "Icon Box / Container Size (px)",
  text_alignment: "Text Alignment",
  content_alignment: "Content Box Alignment",
  text_offset_x: "Text Offset X (px)",
  text_offset_y: "Text Offset Y (px)",
  primary_text_start_offset: "Primary Text Start Position (Left Offset px)",
  primary_text_end_offset: "Primary Text End Position (Right Margin px)",
  primary_text_offset_x: "Primary Text Horizontal Offset X (px)",
  primary_text_offset_y: "Primary Text Vertical Offset Y (px)",
  secondary_text_start_offset: "Secondary Text Start Position (Left Offset px)",
  secondary_text_end_offset: "Secondary Text End Position (Right Margin px)",
  secondary_text_offset_x: "Secondary Text Horizontal Offset X (px)",
  secondary_text_offset_y: "Secondary Text Vertical Offset Y (px)",
  icon_offset_x: "Icon Offset X (px)",
  icon_offset_y: "Icon Offset Y (px)",
  features_offset_x: "Controls Offset X (px)",
  features_offset_y: "Controls Offset Y (px)",
  fade_transition_enabled: "Enable Multi-Stage Fade & Decay",
  fade_trigger: "Fade Trigger Mode",
  fade_target: "Fade Color Application Target",
  fade_smooth_retrigger: "Smooth Re-trigger (Pick up current live color if state changes mid-fade)",
  show_decay_slider: "Show Live Cooldown / Decay Progress Bar",
  decay_slider_height: "Decay Slider Height (px)",
  decay_slider_position: "Decay Slider Position",
  fade_stage_1_duration: "Stage 1 Duration (e.g. 60s for 1 min quick fade)",
  fade_stage_1_pickup: "Stage 1: Pick up from active/live state color",
  fade_stage_1_color: "Stage 1 Target Color (e.g. Amber / Orange)",
  fade_stage_2_duration: "Stage 2 Duration (e.g. 600s for 10 min mid fade)",
  fade_stage_2_pickup: "Stage 2: Pick up where Stage 1 left off",
  fade_stage_2_color: "Stage 2 Target Color (e.g. Yellow / Lime)",
  fade_stage_3_duration: "Stage 3 Duration (e.g. 1800s for 30 min final fade)",
  fade_stage_3_pickup: "Stage 3: Pick up where Stage 2 left off",
  fade_stage_3_color: "Stage 3 Final Color (e.g. Resting Green)",
  bg_color: "Card Background Color",
  bg_opacity: "Background Opacity %",
  border_radius: "Border Radius (px)",
  card_border_width: "Border Width (px)",
  card_border_color: "Border Color",
  card_border_style: "Border Style",
  active_color: "Active State Color",
  inactive_color: "Inactive State Color",
  box_shadow: "Box Shadow Preset",
  backdrop_blur: "Backdrop Blur (Frosted Glass px)",
  card_opacity: "Card Opacity %",
  transition_duration: "Transition Speed (ms)",
  active_glow: "Glow Card Outer Border When Active",
  active_pulse: "Pulse Icon When Active",
  tap_action: "Card Tap Action",
  hold_action: "Card Hold Action",
  double_tap_action: "Card Double Tap Action",
  sub_button_1_entity: "Entity",
  sub_button_1_type: "Control Type",
  sub_button_1_icon: "Icon Override",
  sub_button_1_name: "Label Text",
  sub_button_1_show_state: "Show Live State Text / Chip",
  sub_button_1_color: "Color",
  sub_button_1_show_background: "Show Background",
  sub_button_1_tap_action: "Tap Action",
  sub_button_1_hold_action: "Hold Action",
  sub_button_1_double_tap_action: "Double Tap Action",
  sub_button_2_entity: "Entity",
  sub_button_2_type: "Control Type",
  sub_button_2_icon: "Icon Override",
  sub_button_2_name: "Label Text",
  sub_button_2_show_state: "Show Live State Text / Chip",
  sub_button_2_color: "Color",
  sub_button_2_show_background: "Show Background",
  sub_button_2_tap_action: "Tap Action",
  sub_button_2_hold_action: "Hold Action",
  sub_button_2_double_tap_action: "Double Tap Action",
  sub_button_3_entity: "Entity",
  sub_button_3_type: "Control Type",
  sub_button_3_icon: "Icon Override",
  sub_button_3_name: "Label Text",
  sub_button_3_show_state: "Show Live State Text / Chip",
  sub_button_3_color: "Color",
  sub_button_3_show_background: "Show Background",
  sub_button_3_tap_action: "Tap Action",
  sub_button_3_hold_action: "Hold Action",
  sub_button_3_double_tap_action: "Double Tap Action",
  sub_button_4_entity: "Entity",
  sub_button_4_type: "Control Type",
  sub_button_4_icon: "Icon Override",
  sub_button_4_name: "Label Text",
  sub_button_4_show_state: "Show Live State Text / Chip",
  sub_button_4_color: "Color",
  sub_button_4_show_background: "Show Background",
  sub_button_4_tap_action: "Tap Action",
  sub_button_4_hold_action: "Hold Action",
  sub_button_4_double_tap_action: "Double Tap Action",
  custom_styles: "Custom Raw CSS / Scoped Stylesheet"
};
class ft extends Oe {
  constructor() {
    super(...arguments), this._openPanels = {
      core: !0,
      appearance: !1,
      controls: !0,
      spacing: !1,
      typography: !1,
      sub_buttons: !1,
      actions: !1,
      sub1: !1,
      sub2: !1,
      sub3: !1,
      sub4: !1
    };
  }
  setConfig(e) {
    const t = { ...e };
    if (t.bg_color) {
      const r = typeof t.bg_color == "string" ? t.bg_color.match(/rgba\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*([\d.]+)\s*\)/i) : null;
      r && t.bg_opacity === void 0 && (t.bg_opacity = Math.round(parseFloat(r[1]) * 100)), t.bg_color = D(t.bg_color);
    }
    t.card_border_color && (t.card_border_color = D(t.card_border_color)), t.icon_color && (t.icon_color = D(t.icon_color)), t.active_color && (t.active_color = D(t.active_color)), t.inactive_color && (t.inactive_color = D(t.inactive_color)), t.badge_color && (t.badge_color = D(t.badge_color)), t.slider_color && (t.slider_color = D(t.slider_color)), t.slider_track_color && (t.slider_track_color = D(t.slider_track_color)), t.text_color_primary && (t.text_color_primary = D(t.text_color_primary)), t.text_color_secondary && (t.text_color_secondary = D(t.text_color_secondary)), t.sub_button_1_color && (t.sub_button_1_color = D(t.sub_button_1_color)), t.sub_button_2_color && (t.sub_button_2_color = D(t.sub_button_2_color)), t.sub_button_3_color && (t.sub_button_3_color = D(t.sub_button_3_color)), t.sub_button_4_color && (t.sub_button_4_color = D(t.sub_button_4_color)), this._config = {
      ...St,
      ...t
    };
  }
  _computeLabel(e) {
    return Di[e.name] || e.name;
  }
  _valueChanged(e, t) {
    let r = { ...this._config };
    const i = e.detail.value || {};
    for (const o of t)
      if (o.name)
        if (o.selector?.boolean !== void 0)
          i[o.name] !== void 0 ? r[o.name] = i[o.name] === !0 : delete r[o.name];
        else if (o.selector?.color_rgb !== void 0) {
          const a = i[o.name];
          Array.isArray(a) && a.length === 3 ? r[o.name] = `rgb(${a[0]}, ${a[1]}, ${a[2]})` : a !== void 0 && a !== "" ? r[o.name] = a : delete r[o.name];
        } else
          i[o.name] !== void 0 && i[o.name] !== "" ? r[o.name] = i[o.name] : delete r[o.name];
    rt(this, "config-changed", { config: r });
  }
  _transformConfigForForm() {
    const e = { ...this._config }, t = [
      "icon_color",
      "badge_color",
      "bg_color",
      "card_border_color",
      "active_color",
      "inactive_color",
      "text_color_primary",
      "text_color_secondary",
      "slider_color",
      "slider_track_color",
      "sub_button_1_color",
      "sub_button_2_color",
      "sub_button_3_color",
      "sub_button_4_color"
    ];
    for (const r of t)
      if (e[r]) {
        const i = Li(e[r]);
        i && (e[r] = i);
      }
    return e;
  }
  _togglePanel(e) {
    this._openPanels = {
      ...this._openPanels,
      [e]: !this._openPanels[e]
    };
  }
  _renderSection(e, t, r, i, o) {
    const a = !!this._openPanels[e];
    return S`
      <div class="custom-panel ${a ? "open" : ""}">
        <div class="panel-header" @click=${() => this._togglePanel(e)}>
          <div class="header-left">
            <span class="header-icon">${t}</span>
            <span class="header-title">${r}</span>
          </div>
          <ha-icon class="chevron-icon ${a ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        ${a ? S`
          <div class="panel-body">
            <ha-form
              .hass=${this.hass}
              .data=${o}
              .schema=${i}
              .computeLabel=${this._computeLabel}
              @value-changed=${(n) => this._valueChanged(n, i)}
            ></ha-form>
          </div>
        ` : w}
      </div>
    `;
  }
  _renderSubButtonPanel(e, t, r, i) {
    const o = `sub${e}`, a = !!this._openPanels[o];
    return S`
      <div class="sub-nested-panel ${a ? "open" : ""}">
        <div class="sub-panel-header" @click=${() => this._togglePanel(o)}>
          <div class="header-left">
            <span class="sub-dot ${t ? "active" : ""}"></span>
            <span class="sub-title">Sub-Button ${e} ${t ? `(${t})` : "• Inactive"}</span>
          </div>
          <ha-icon class="chevron-icon ${a ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        ${a ? S`
          <div class="sub-panel-body">
            <ha-form
              .hass=${this.hass}
              .data=${i}
              .schema=${r}
              .computeLabel=${this._computeLabel}
              @value-changed=${(n) => this._valueChanged(n, r)}
            ></ha-form>
          </div>
        ` : w}
      </div>
    `;
  }
  render() {
    if (!this.hass || !this._config) return S``;
    const e = this._transformConfigForForm(), t = this._config?.sub_button_1_entity || "", r = this._config?.sub_button_2_entity || "", i = this._config?.sub_button_3_entity || "", o = this._config?.sub_button_4_entity || "", a = !!this._openPanels.sub_buttons;
    return S`
      <div class="editor-container">
        <!-- 1. CORE & LAYOUT -->
        ${this._renderSection("core", "📦", "Core & Layout", Si, e)}

        <!-- 2. APPEARANCE & THEMING -->
        ${this._renderSection("appearance", "🎨", "Appearance & Theming", $i, e)}

        <!-- 3. SLIDERS & CONTROLS -->
        ${this._renderSection("controls", "🎛️", "Sliders & Interactive Controls", Ci, e)}

        <!-- 4. SPACING, PADDING & SIZING -->
        ${this._renderSection("spacing", "📏", "Spacing, Padding & Sizing", ki, e)}

        <!-- 5. TYPOGRAPHY & LIVE SCROLLING -->
        ${this._renderSection("typography", "✍️", "Typography & Live Scrolling", Ti, e)}

        <!-- 6. CONSOLIDATED SUB-BUTTONS (1-4) -->
        <div class="custom-panel ${a ? "open" : ""}">
          <div class="panel-header" @click=${() => this._togglePanel("sub_buttons")}>
            <div class="header-left">
              <span class="header-icon">🔘</span>
              <span class="header-title">Sub-Buttons (1 – 4)</span>
            </div>
            <ha-icon class="chevron-icon ${a ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
          </div>
          ${a ? S`
            <div class="panel-body sub-buttons-master">
              <div class="section-subtitle">Global Sub-Button Layout</div>
              <ha-form
                .hass=${this.hass}
                .data=${e}
                .schema=${ir}
                .computeLabel=${this._computeLabel}
                @value-changed=${(n) => this._valueChanged(n, ir)}
              ></ha-form>
              
              <div class="sub-buttons-nested-list">
                ${this._renderSubButtonPanel(1, t, Mi, e)}
                ${this._renderSubButtonPanel(2, r, Ai, e)}
                ${this._renderSubButtonPanel(3, i, Pi, e)}
                ${this._renderSubButtonPanel(4, o, Ei, e)}
              </div>
            </div>
          ` : w}
        </div>

        <!-- 7. ACTIONS & CUSTOM STYLESHEET -->
        ${this._renderSection("actions", "⚡", "Actions & Scoped CSS", Ni, e)}
      </div>
    `;
  }
  static get styles() {
    return lr`
      .editor-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 20px;
      }
      .custom-panel {
        border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
        border-radius: 10px;
        background: var(--card-background-color, rgba(125, 125, 125, 0.05));
        overflow: hidden;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }
      .custom-panel.open {
        border-color: var(--primary-color, #03a9f4);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }
      .panel-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        cursor: pointer;
        user-select: none;
        background: transparent;
        transition: background-color 0.15s ease;
      }
      .panel-header:hover {
        background: rgba(255, 255, 255, 0.04);
      }
      .header-left {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .header-icon {
        font-size: 18px;
        line-height: 1;
      }
      .header-title {
        font-size: 14px;
        font-weight: 600;
        color: var(--primary-text-color, #ffffff);
      }
      .chevron-icon {
        color: var(--secondary-text-color, #9e9e9e);
        transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s ease;
      }
      .chevron-icon.rotated {
        transform: rotate(180deg);
        color: var(--primary-color, #03a9f4);
      }
      .panel-body {
        padding: 14px 16px 18px;
        border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.08));
        animation: fadeIn 0.2s ease;
      }
      .section-subtitle {
        font-size: 12px;
        font-weight: 600;
        color: var(--secondary-text-color, #9e9e9e);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 10px;
      }
      .sub-buttons-nested-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 16px;
      }
      .sub-nested-panel {
        border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.08));
        border-radius: 8px;
        background: rgba(125, 125, 125, 0.04);
        overflow: hidden;
      }
      .sub-nested-panel.open {
        border-color: rgba(3, 169, 244, 0.4);
      }
      .sub-panel-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        cursor: pointer;
        user-select: none;
      }
      .sub-panel-header:hover {
        background: rgba(255, 255, 255, 0.03);
      }
      .sub-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--secondary-text-color, #757575);
      }
      .sub-dot.active {
        background: #4caf50;
        box-shadow: 0 0 6px #4caf50;
      }
      .sub-title {
        font-size: 13px;
        font-weight: 500;
        color: var(--primary-text-color, #ffffff);
      }
      .sub-panel-body {
        padding: 12px 14px 14px;
        border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.06));
        background: rgba(0, 0, 0, 0.1);
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
  }
}
Nt([
  pt({ attribute: !1 })
], ft.prototype, "hass");
Nt([
  _t()
], ft.prototype, "_config");
Nt([
  _t()
], ft.prototype, "_openPanels");
customElements.get("antigravity-with-icon-card-editor") || customElements.define("antigravity-with-icon-card-editor", ft);
var Ri = Object.defineProperty, Hi = Object.getOwnPropertyDescriptor, Ge = (c, e, t, r) => {
  for (var i = r > 1 ? void 0 : r ? Hi(e, t) : e, o = c.length - 1, a; o >= 0; o--)
    (a = c[o]) && (i = (r ? a(e, t, i) : a(i)) || i);
  return r && i && Ri(e, t, i), i;
};
typeof window < "u" && (window.runAntigravityCI = fr, window.antigravityMemoryReport = () => ct.logStatus(), window.antigravityPowerStatus = () => me.isPowerSaveActive());
const Bi = "145";
console.info(
  `%c 🚀 ANTIGRAVITY-CARD (NO-ICON) %c v${Bi} `,
  "color: white; background: #6200ea; font-weight: 700; padding: 2px 6px; border-radius: 4px 0 0 4px;",
  "color: #6200ea; background: #ede7f6; font-weight: 700; padding: 2px 6px; border-radius: 0 4px 4px 0;"
);
if (typeof CSS < "u" && "registerProperty" in CSS)
  try {
    CSS.registerProperty({
      name: "--slider-pct",
      syntax: "<percentage>",
      inherits: !0,
      initialValue: "0%"
    }), CSS.registerProperty({
      name: "--decay-pct",
      syntax: "<percentage>",
      inherits: !0,
      initialValue: "100%"
    }), CSS.registerProperty({
      name: "--glow-intensity",
      syntax: "<number>",
      inherits: !0,
      initialValue: "1"
    });
  } catch {
  }
window.customCards = window.customCards || [];
window.customCards.push({
  type: "antigravity-no-icon-card",
  name: "Antigravity No Icon Card",
  preview: !0,
  description: "An ultra-streamlined, high-performance custom card merging Bubble Card styling with Mushroom Card controls, multi-stage transitions, and zero icon overhead."
});
window.customCards.push({
  type: "antigravity-with-icon-card",
  name: "Antigravity Card (With Icon)",
  preview: !0,
  description: "Default Antigravity Card (With Icon) (No Icon)"
});
let ze = Date.now();
typeof window < "u" && !window.__AG_RESUME_LISTENER_ATTACHED__ && (window.__AG_RESUME_LISTENER_ATTACHED__ = !0, window.addEventListener("focus", () => {
  ze = Date.now();
}, { passive: !0 }), document.addEventListener("visibilitychange", () => {
  document.visibilityState === "visible" && (ze = Date.now());
}, { passive: !0 }));
const Ii = /* @__PURE__ */ new Set([
  "on",
  "home",
  "playing",
  "paused",
  "buffering",
  "open",
  "opening",
  "closing",
  "unlocked",
  "locking",
  "unlocking",
  "heat",
  "cool",
  "heat_cool",
  "auto",
  "fan_only",
  "dry",
  "armed_home",
  "armed_away",
  "armed_night",
  "armed_vacation",
  "armed_custom_bypass",
  "triggered",
  "pending",
  "arming",
  "cleaning",
  "returning",
  "above_horizon",
  "active",
  "electric",
  "gas",
  "heat_pump",
  "running",
  "detected",
  "motion",
  "occupied",
  "present"
]), zi = /* @__PURE__ */ new Set([
  "primary",
  "accent",
  "red",
  "pink",
  "purple",
  "deep-purple",
  "indigo",
  "blue",
  "light-blue",
  "cyan",
  "teal",
  "green",
  "light-green",
  "lime",
  "yellow",
  "amber",
  "orange",
  "deep-orange",
  "brown",
  "grey",
  "blue-grey",
  "black",
  "white",
  "disabled"
]), Oi = /* @__PURE__ */ new Set(["hs", "xy", "rgb", "rgbw", "rgbww"]), Fi = /* @__PURE__ */ new Set([
  "binary_sensor",
  "sensor",
  "camera",
  "weather",
  "sun",
  "zone",
  "person",
  "device_tracker",
  "update",
  "image",
  "calendar",
  "event",
  "counter"
]), Ui = /^\d+\s*,\s*\d+\s*,\s*\d+$/, Gi = /^\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+$/;
function wt(c) {
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}
const at = Object.freeze({
  enabled: !1,
  activeFade: !1,
  currentColor: "",
  progressPct: 0,
  remainingSeconds: 0,
  currentStage: 0,
  stageLabel: ""
});
function H(c, e = !0) {
  if (!(!e || typeof window > "u"))
    try {
      if (Ze(c), typeof window < "u" && window.dispatchEvent(new CustomEvent("haptic", { detail: c, bubbles: !0, composed: !0 })), typeof navigator < "u" && "vibrate" in navigator && typeof navigator.vibrate == "function") {
        let t = 6;
        c === "heavy" ? t = 20 : c === "medium" ? t = 12 : c === "success" ? t = [40, 40, 80] : c === "warning" ? t = [50, 30, 50] : c === "error" && (t = [50, 100, 50]), navigator.vibrate(t);
      }
    } catch {
    }
}
const Be = /* @__PURE__ */ new Map(), ar = 250;
function Vi(c) {
  if (!c) return "";
  const e = Be.get(c);
  if (e !== void 0) return e;
  const t = c.trim();
  if (!t)
    return Be.set(c, ""), "";
  let r = t;
  if (t.startsWith("#") || t.startsWith("rgb") || t.startsWith("hsl") || t.startsWith("var(") ? r = t : Ui.test(t) ? r = `rgb(${t})` : Gi.test(t) ? r = `rgba(${t})` : t.toLowerCase() === "state" ? r = "var(--state-icon-color, var(--primary-color))" : zi.has(t.toLowerCase()) && (r = `var(--${t.toLowerCase()}-color, ${t.toLowerCase()})`), Be.size >= ar) {
    const i = Math.floor(ar / 4), o = Be.keys();
    for (let a = 0; a < i; a++) {
      const n = o.next().value;
      n !== void 0 && Be.delete(n);
    }
  }
  return Be.set(c, r), r;
}
class se extends Oe {
  constructor() {
    super(...arguments), this._previousLiveRgb = null, this._currentLiveRgb = null, this._lastTrackedState = null, this.preview = !1, this._collapsed = !0, this._holdTimer = null, this._held = !1, this._moved = !1, this._tapTimer = null, this._throttleMap = /* @__PURE__ */ new Map(), this._startX = 0, this._startY = 0, this._subHoldTimer = null, this._subHeld = !1, this._subMoved = !1, this._subStartX = 0, this._subStartY = 0, this._subTapTimerMap = /* @__PURE__ */ new Map(), this._monitoredEntities = [], this._powerUnsubscribe = null, this._gl = null, this._staticCardStyles = "", this._staticCardClasses = "", this._textOffsetStyle = "", this._featuresOffsetStyle = "", this._mainSliderMarginOffsets = "", this._colorTempMarginOffsets = "", this._colorHueMarginOffsets = "", this._textBoxWidth = "", this._primaryTextStyle = "", this._secondaryTextStyle = "", this._primaryTextOffsetStyle = "", this._secondaryTextOffsetStyle = "", this._fadeStaticConfig = null, this._relativeTimer = null, this._cachedSubButtons = null, this._intersectionObserver = null, this._cachedHasCollapsible = !1, this._mountTime = 0, this._pointerDownReceived = !1, this._pointerDownTime = 0, this._canceled = !1, this._activePointerId = null, this._subCanceled = !1, this._subPointerDownTime = 0, this._sliderStateMap = /* @__PURE__ */ new WeakMap(), this._onSliderPointerDown = (e) => {
      const t = e.currentTarget;
      if (!t) return;
      const i = t.closest(".slider-container, .sub-button-slider-container")?.querySelector(".slider-percent-badge, .sub-slider-pct"), o = Number(t.value) || 0, a = t.style.getPropertyValue("--slider-pct") || "", n = i?.textContent || "";
      this._sliderStateMap.set(t, {
        startX: e.clientX,
        startY: e.clientY,
        initialVal: o,
        initialPct: a,
        initialBadge: n,
        isScrolling: !1,
        isSliding: !1
      });
    }, this._onSliderPointerMove = (e) => {
      const t = e.currentTarget;
      if (!t) return;
      const r = this._sliderStateMap.get(t);
      if (!r) return;
      const i = Math.abs(e.clientX - r.startX), o = Math.abs(e.clientY - r.startY);
      !r.isSliding && !r.isScrolling ? o > 6 && o > i ? (r.isScrolling = !0, this._revertSlider(t, r)) : i > 6 && i >= o && (r.isSliding = !0) : r.isScrolling && this._revertSlider(t, r);
    }, this._onSliderPointerCancel = (e) => {
      const t = e.currentTarget;
      if (!t) return;
      const r = this._sliderStateMap.get(t);
      r && (r.isScrolling = !0, this._revertSlider(t, r), this._sliderStateMap.delete(t));
    }, this._onSliderPointerUp = (e) => {
      const t = e.currentTarget;
      if (!t) return;
      const r = this._sliderStateMap.get(t);
      if (r) {
        if (r.isScrolling) {
          this._revertSlider(t, r), this._sliderStateMap.delete(t);
          return;
        }
        if (this.config.tap_slider_to_toggle && !r.isSliding) {
          const i = Math.abs(e.clientX - r.startX), o = Math.abs(e.clientY - r.startY);
          i < 6 && o < 6 && (this._revertSlider(t, r), H("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap"));
        }
      }
    };
  }
  // --- SECTIONS LAYOUT SUPPORT ---
  getGridOptions() {
    const e = this.config?.card_layout === "large";
    return {
      columns: { min: 2, default: 4, max: 6 },
      rows: { min: 1, default: e ? 2 : 1, max: 4 }
    };
  }
  // --- CARD SIZE FOR MASONRY/PANEL VIEWS ---
  getCardSize() {
    return this.config?.card_layout === "large" ? 3 : 2;
  }
  static getStubConfig() {
    return { ...St };
  }
  static async getConfigElement() {
    return document.createElement("antigravity-with-icon-card-editor");
  }
  setConfig(e) {
    if (!e)
      throw new Error("Invalid configuration");
    this.config = {
      ...St,
      ...e
    }, this._cachedSubButtons = null;
    const t = /* @__PURE__ */ new Set();
    if (this.config.entity && t.add(this.config.entity), this.config.sub_button_1_entity && t.add(this.config.sub_button_1_entity), this.config.sub_button_2_entity && t.add(this.config.sub_button_2_entity), this.config.sub_button_3_entity && t.add(this.config.sub_button_3_entity), this.config.sub_button_4_entity && t.add(this.config.sub_button_4_entity), this.config.tap_action?.target?.entity_id) {
      const r = this.config.tap_action.target.entity_id;
      typeof r == "string" ? t.add(r) : Array.isArray(r) && r.forEach((i) => t.add(i));
    }
    if (this.config.hold_action?.target?.entity_id) {
      const r = this.config.hold_action.target.entity_id;
      typeof r == "string" ? t.add(r) : Array.isArray(r) && r.forEach((i) => t.add(i));
    }
    this._monitoredEntities = Array.from(t), this._computeStaticStylesAndClasses();
  }
  shouldUpdate(e) {
    if (!this.config || !this.hass || e.has("config") || e.has("preview") || e.has("_collapsed")) return !0;
    const t = e.get("hass");
    if (!t || t.themes !== this.hass.themes || t.locale !== this.hass.locale || t.language !== this.hass.language || t.selectedTheme !== this.hass.selectedTheme)
      return !0;
    const r = this._monitoredEntities, i = r.length;
    for (let o = 0; o < i; o++) {
      const a = r[o];
      if (t.states[a] !== this.hass.states[a])
        return !0;
    }
    return !1;
  }
  _computeStaticStylesAndClasses() {
    if (!this.config) return;
    const e = this.config.card_padding_vertical ?? this.config.card_padding ?? 0, t = this.config.card_padding_horizontal ?? this.config.card_padding ?? 15, r = this.config.card_padding_top ?? e, i = this.config.card_padding_bottom ?? e, o = this.config.card_padding_left ?? t, a = this.config.card_padding_right ?? t, n = this.config.card_margin ?? -1, d = this.config.card_margin_vertical ?? n, f = this.config.card_margin_horizontal ?? n, u = this.config.card_margin_top ?? d, s = this.config.card_margin_bottom ?? d, _ = this.config.card_margin_left ?? f, p = this.config.card_margin_right ?? f;
    let v = "";
    (u !== void 0 || s !== void 0 || _ !== void 0 || p !== void 0) && (v = `margin: ${u ?? 0}px ${p ?? 0}px ${s ?? 0}px ${_ ?? 0}px;`);
    const m = this.config.border_radius ?? 12, b = this.config.slider_style === "google", l = this.config.slider_style === "full", h = b ? 42 : l ? 40 : 12, g = this.config.slider_height !== void 0 ? this.config.slider_height : h, y = b ? 21 : l ? 0 : g / 2, $ = this.config.slider_border_radius !== void 0 ? this.config.slider_border_radius : y, x = this.config.card_border_width ?? (this.config.card_border_color ? 1 : 0), k = this.config.card_border_style ?? "solid", T = x > 0 ? `border: ${x}px ${k} ${this._resolveColor(this.config.card_border_color) || "var(--divider-color, rgba(150, 150, 150, 0.2))"};` : "", M = this.config.card_width ? `width: ${this.config.card_width};` : "", C = this.config.card_max_width ? `max-width: ${this.config.card_max_width};` : "", N = this.config.card_height ? `height: ${this.config.card_height};` : "", P = this.config.card_min_height !== void 0 ? `min-height: ${this.config.card_min_height}px;` : "", O = this.config.fill_container === !0 ? "height: 100%; width: 100%;" : "", K = this.config.overflow_hidden !== !1 ? "overflow: hidden;" : "overflow: visible;", le = this.config.backdrop_blur !== void 0 ? `backdrop-filter: blur(${this.config.backdrop_blur}px); -webkit-backdrop-filter: blur(${this.config.backdrop_blur}px);` : "", ve = this.config.card_opacity !== void 0 ? `opacity: ${this.config.card_opacity / 100};` : "", ye = this.config.transition_duration !== void 0 ? `transition: all ${this.config.transition_duration}ms ease;` : "", xe = this.config.text_padding_vertical ?? this.config.text_padding ?? 0, W = this.config.text_padding_horizontal ?? this.config.text_padding ?? 0, we = this.config.features_padding_vertical ?? this.config.features_padding ?? 0, Se = this.config.features_padding_horizontal ?? this.config.features_padding ?? 0, $e = this.config.sub_button_padding ?? 6, Ce = this.config.sub_button_container_padding ?? 0, ke = this.config.sub_button_alignment ? `--ag-sub-button-alignment: ${this.config.sub_button_alignment};` : "--ag-sub-button-alignment: flex-end;", Te = this.config.text_scrolling_speed ? `--ag-scroll-speed: ${this.config.text_scrolling_speed}s;` : "", Ve = this.config.full_slider_opacity !== void 0 ? `--ag-full-slider-opacity: ${this.config.full_slider_opacity / 100};` : "";
    this._staticCardStyles = [
      v,
      `border-radius: ${m}px;`,
      T,
      M,
      C,
      N,
      P,
      O,
      K,
      le,
      ve,
      ye,
      `--ag-card-padding: ${r}px ${a}px ${i}px ${o}px;`,
      `--ag-text-padding: ${xe}px ${W}px;`,
      `--ag-features-padding: ${we}px ${Se}px;`,
      `--ag-sub-button-padding: ${$e}px;`,
      `--ag-sub-button-container-padding: ${Ce}px;`,
      `--ag-content-spacing: ${this.config.content_spacing ?? 6}px;`,
      `--ag-text-spacing: ${this.config.text_spacing ?? -1}px;`,
      `--ag-features-margin: ${this.config.features_margin ?? -3}px;`,
      `--ag-slider-spacing: ${this.config.slider_spacing ?? 6}px;`,
      `--ag-sub-button-spacing: ${this.config.sub_button_spacing ?? -4}px;`,
      `--ag-slider-height: ${g}px;`,
      `--ag-slider-radius: ${$}px;`,
      `--ag-text-alignment: ${this.config.text_alignment ?? "left"};`,
      `--ag-content-alignment: ${this.config.content_alignment ?? "flex-start"};`,
      ke,
      Te,
      Ve
    ].filter(Boolean).join(" "), this._staticCardClasses = [
      `layout-${this.config.layout}`,
      this.config.card_layout === "large" ? "card-large" : "",
      `theme-${this.config.theme_preset ?? "default"}`,
      `hover-${this.config.hover_effect ?? "glow"}`,
      `slider-style-${this.config.slider_style ?? "circle"}`,
      this.config.text_color_mode === "inverse" ? "text-color-mode-inverse" : ""
    ].filter(Boolean).join(" ");
    const Me = this.config.text_offset_x !== void 0 ? Number(this.config.text_offset_x) : -28, Ae = this.config.text_offset_y !== void 0 ? Number(this.config.text_offset_y) : 2;
    this._textOffsetStyle = Me !== 0 || Ae !== 0 ? `transform: translate(${Me}px, ${Ae}px);` : "";
    const L = Number(this.config.primary_text_start_offset ?? this.config.primary_text_offset_x ?? 8), q = Number(this.config.primary_text_end_offset ?? 250), ce = Number(this.config.primary_text_offset_y) || 0, F = L !== 0 || ce !== 0 ? `transform: translate(${L}px, ${ce}px);` : "", de = L !== 0 || q !== 0 ? `margin-left: ${L}px; margin-right: ${q}px;` : "";
    this._primaryTextOffsetStyle = `${F} ${de}`.trim();
    const U = Number(this.config.secondary_text_start_offset ?? this.config.secondary_text_offset_x ?? 8), Pe = Number(this.config.secondary_text_end_offset ?? 250), B = Number(this.config.secondary_text_offset_y) || 0, te = U !== 0 || B !== 0 ? `transform: translate(${U}px, ${B}px);` : "", Ee = U !== 0 || Pe !== 0 ? `margin-left: ${U}px; margin-right: ${Pe}px;` : "";
    this._secondaryTextOffsetStyle = `${te} ${Ee}`.trim();
    const ue = Number(this.config.features_offset_x) || 0, Ne = Number(this.config.features_offset_y) || 0;
    this._featuresOffsetStyle = ue !== 0 || Ne !== 0 ? `transform: translate(${ue}px, ${Ne}px);` : "";
    const Le = Number(this.config.slider_start_offset) || 0, De = Number(this.config.slider_end_offset) || 0;
    this._mainSliderMarginOffsets = [
      Le ? `margin-left: ${Le}px !important;` : "",
      De ? `margin-right: ${De}px !important;` : ""
    ].filter(Boolean).join(" ");
    const J = Number(this.config.color_temp_start_offset) || 0, Z = Number(this.config.color_temp_end_offset) || 0;
    this._colorTempMarginOffsets = [
      J ? `margin-left: ${J}px !important;` : "",
      Z ? `margin-right: ${Z}px !important;` : ""
    ].filter(Boolean).join(" ");
    const I = Number(this.config.color_slider_start_offset) || 0, G = Number(this.config.color_slider_end_offset) || 0;
    this._colorHueMarginOffsets = [
      I ? `margin-left: ${I}px !important;` : "",
      G ? `margin-right: ${G}px !important;` : ""
    ].filter(Boolean).join(" "), this._textBoxWidth = this.config.text_box_width ? `max-width: ${this.config.text_box_width}; width: ${this.config.text_box_width};` : "width: 100%; max-width: 100%;";
    const We = `text-transform: ${this.config.text_transform_primary ?? "capitalize"};`, Ye = `text-transform: ${this.config.text_transform_secondary ?? "capitalize"};`, re = `letter-spacing: ${this.config.letter_spacing ?? -0.5}px;`, ie = `line-height: ${this.config.line_height ?? 1.1};`, Re = this.config.font_weight_primary ?? "800";
    this._primaryTextStyle = `font-size: ${this.config.font_size_primary ?? 14}px; font-weight: ${Re}; ${We} ${re} ${ie}`, this._secondaryTextStyle = `font-size: ${this.config.font_size_secondary ?? 15}px; ${Ye} ${re} ${ie}`;
    const oe = this.config.entity, pe = [];
    for (let E = 1; E <= 4; E++) {
      const V = this.config[`sub_button_${E}_entity`], A = this.config[`sub_button_${E}_icon`], Y = this.config[`sub_button_${E}_name`], He = this.config[`sub_button_${E}_tap_action`], ae = this.config[`sub_button_${E}_hold_action`], mt = this.config[`sub_button_${E}_double_tap_action`], Xe = this.config[`sub_button_${E}_type`], gt = this.config[`sub_button_${E}_color`], bt = this.config[`sub_button_${E}_show_background`], it = this.config[`sub_button_${E}_show_state`];
      if (!!(V || A || Y || Xe && Xe !== "button" || it)) {
        const Ke = V || oe;
        pe.push(Object.freeze({
          key: `${Ke || "sub"}_${E}`,
          entity: Ke,
          type: Xe || "button",
          icon: A,
          color: gt,
          bg: bt,
          name: Y,
          showState: it === !0,
          tapAction: He,
          holdAction: ae,
          doubleTapAction: mt
        }));
      }
    }
    if (this._cachedSubButtons = Object.freeze(pe), this.config.fade_transition_enabled) {
      const E = Number(this.config.fade_stage_1_duration) || 60, V = Number(this.config.fade_stage_2_duration) || 600, A = Number(this.config.fade_stage_3_duration) || 1800, Y = X(this.config.fade_stage_1_color) || [255, 152, 0], He = X(this.config.fade_stage_2_color) || [205, 220, 57], ae = X(this.config.fade_stage_3_color);
      this._fadeStaticConfig = {
        d1: E,
        d2: V,
        d3: A,
        totalDuration: E + V + A,
        c1Rgb: Y,
        c2Rgb: He,
        c3Rgb: ae,
        restingResult: Object.freeze({
          enabled: !0,
          activeFade: !1,
          currentColor: ae ? wt(ae) : "",
          progressPct: 100,
          remainingSeconds: 0,
          currentStage: 0,
          stageLabel: "Resting"
        })
      };
    } else
      this._fadeStaticConfig = null;
  }
  _getSubButtons() {
    return this._cachedSubButtons || [];
  }
  _hasCollapsible() {
    return this._cachedHasCollapsible;
  }
  _recomputeHasCollapsible() {
    if (!this.hass || !this.config || !this.config.entity) {
      this._cachedHasCollapsible = !1;
      return;
    }
    const e = this.hass.states[this.config.entity];
    if (!e) {
      this._cachedHasCollapsible = !1;
      return;
    }
    const r = this.config.entity.split(".")[0] === "light", i = e.state === "on", o = this.config.hide_color_temp_when_off !== !1, a = this.config.hide_color_picker_when_off !== !1, n = this.config.hide_color_slider_when_off !== !1, d = e.attributes?.color_temp_kelvin ?? e.attributes?.color_temp, f = r && this.config.show_color_temp === !0 && (d !== void 0 || e.attributes?.supported_color_modes?.some((l) => ["color_temp"].includes(l))) && (!o || i), u = e.attributes?.supported_color_modes, s = Array.isArray(u) && u.some((l) => ["hs", "xy", "rgb", "rgbw", "rgbww"].includes(l)), _ = this.config.color_picker_type !== "wheel", p = r && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && _) && s && (!n || i), v = r && this.config.show_color_picker === !0 && !_ && s && (!a || i), m = f || p || v, b = this._getSubButtons();
    this._cachedHasCollapsible = m || b.length > 0;
  }
  connectedCallback() {
    super.connectedCallback(), ct.registerCard(this), this._mountTime = Date.now(), this._pointerDownReceived = !1, this._powerUnsubscribe = me.addChangeListener(() => {
      this._updatePowerSaveAttribute();
    }), this._updatePowerSaveAttribute(), this._setupRelativeTimer(), this._setupIntersectionObserver();
  }
  _updatePowerSaveAttribute() {
    me.isPowerSaveActive(this.hass) ? this.setAttribute("power-save", "") : this.removeAttribute("power-save");
  }
  _setupIntersectionObserver() {
    typeof IntersectionObserver > "u" || this._intersectionObserver || (this._intersectionObserver = new IntersectionObserver((e) => {
      for (const t of e)
        t.isIntersecting ? this.removeAttribute("offscreen") : this.setAttribute("offscreen", "");
    }, { rootMargin: "200px 0px", threshold: 0 }), this._intersectionObserver.observe(this));
  }
  _setupRelativeTimer() {
    const e = this.config?.primary_info, t = this.config?.secondary_info, r = this.config?.entity, i = r ? r.split(".")[0] : "", o = (i === "binary_sensor" || i === "timer") && (e === "state" || t === "state"), a = this.config?.fade_transition_enabled === !0, n = r && this.hass ? this.hass.states[r] : null;
    let d = !1;
    if (a && n) {
      const u = this._calculateMultiStageFade(n);
      d = u.enabled && u.activeFade && u.progressPct < 100;
    }
    const f = d || o || e === "last-changed" || e === "last_changed" || e === "last-updated" || e === "last_updated" || e === "last-triggered" || t === "last-changed" || t === "last_changed" || t === "last-updated" || t === "last_updated" || t === "last-triggered";
    if (f && !this._relativeTimer) {
      let u = d ? 1e3 : 5e3;
      const s = n?.attributes?.last_triggered || n?.last_changed || n?.last_updated;
      if (s && !d && !o) {
        const _ = this._parseDate(s);
        if (_) {
          const p = Math.max(0, (Date.now() - _.getTime()) / 1e3 | 0);
          p > 3600 ? u = 6e4 : p > 60 && (u = 15e3);
        }
      }
      me.isPowerSaveActive(this.hass) && (u = Math.max(u, 1e4)), this._relativeTimer = setInterval(() => {
        if (!this.hasAttribute("offscreen") && this.style.display !== "none") {
          if (d && !this._isFadeActive()) {
            this._setupRelativeTimer();
            return;
          }
          this.requestUpdate();
        }
      }, u);
    } else !f && this._relativeTimer && (clearInterval(this._relativeTimer), this._relativeTimer = null);
  }
  _isFadeActive() {
    const e = this.config?.entity;
    if (!e || !this.hass) return !1;
    const t = this.hass.states[e];
    if (!t) return !1;
    const r = this._calculateMultiStageFade(t);
    return r.enabled && r.activeFade && r.progressPct < 100;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), ct.unregisterCard(this), this._powerUnsubscribe && (this._powerUnsubscribe(), this._powerUnsubscribe = null), this._gl && (hr(this._gl), this._gl = null), this._throttleMap.clear(), this._subTapTimerMap.forEach((e) => clearTimeout(e)), this._subTapTimerMap.clear(), this._intersectionObserver && (this._intersectionObserver.disconnect(), this._intersectionObserver = null), this._relativeTimer && (clearInterval(this._relativeTimer), this._relativeTimer = null), this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null), this._tapTimer && (clearTimeout(this._tapTimer), this._tapTimer = null), this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
  }
  firstUpdated(e) {
    super.firstUpdated(e);
  }
  updated(e) {
    if (super.updated(e), this._updateVisibility(), e.has("config") || e.has("_collapsed"))
      this._recomputeHasCollapsible(), this._setupRelativeTimer();
    else if (e.has("hass") && this.config?.entity) {
      const t = e.get("hass");
      (!t || t.states[this.config.entity] !== this.hass.states[this.config.entity]) && (this._recomputeHasCollapsible(), this._setupRelativeTimer());
    }
  }
  _toggleDisplay(e) {
    if (this.preview) {
      this.style.display === "none" && this.style.removeProperty("display"), this.hidden = !1;
      return;
    }
    e ? (this.style.setProperty("display", "none", "important"), this.hidden = !0) : (this.style.display === "none" && this.style.removeProperty("display"), this.hidden = !1);
  }
  _updateVisibility() {
    if (!this.config || !this.hass) return;
    const e = this.config.visibility_state;
    if (!e || e === "always") {
      this._toggleDisplay(!1);
      return;
    }
    const t = this.config.entity, r = t ? this.hass.states[t] : void 0;
    if (!r) {
      this._toggleDisplay(!1);
      return;
    }
    const i = r.state === "on" || this._isEntityActive(r);
    let o = !1;
    (e === "on" && !i || e === "off" && i) && (o = !0), this._toggleDisplay(o);
  }
  _isEntityActive(e) {
    return e ? Ii.has(e.state) : !1;
  }
  _calculateMultiStageFade(e, t = "", r = "") {
    if (!this.config?.fade_transition_enabled || !e)
      return at;
    const i = this._isEntityActive(e), o = this.config.fade_trigger ?? "on_inactive";
    if (!(o === "on_inactive" && !i || o === "on_active" && i || o === "both"))
      return at;
    const n = i ? this._resolveColor(this.config.inactive_color) || r || "#4caf50" : this._resolveColor(this.config.active_color) || t || "#d60000", d = i ? this._resolveColor(this.config.active_color) || t || "#d60000" : this._resolveColor(this.config.inactive_color) || r || "#03b100", f = X(n) || [214, 0, 0], u = X(d) || [3, 177, 0], s = this._fadeStaticConfig, _ = s?.d1 ?? (Number(this.config.fade_stage_1_duration) || 60), p = s?.d2 ?? (Number(this.config.fade_stage_2_duration) || 600), v = s?.d3 ?? (Number(this.config.fade_stage_3_duration) || 1800), m = s?.totalDuration ?? _ + p + v;
    if (m <= 0)
      return at;
    this._lastTrackedState !== null && this._lastTrackedState !== e.state && this._currentLiveRgb && this.config.fade_smooth_retrigger !== !1 && (this._previousLiveRgb = this._currentLiveRgb), this._lastTrackedState = e.state;
    const b = this.config.fade_stage_1_pickup !== !1 && this._previousLiveRgb && this.config.fade_smooth_retrigger !== !1 ? this._previousLiveRgb : f, l = s?.c1Rgb ?? (X(this.config.fade_stage_1_color) || [255, 152, 0]), h = this.config.fade_stage_2_pickup !== !1 ? l : f, g = s?.c2Rgb ?? (X(this.config.fade_stage_2_color) || [205, 220, 57]), y = this.config.fade_stage_3_pickup !== !1 ? g : l, $ = s?.c3Rgb ?? (X(this.config.fade_stage_3_color) || u), x = this._parseDate(e.attributes?.last_triggered || e.last_changed || e.last_updated);
    if (!x)
      return at;
    const k = Math.max(0, (Date.now() - x.getTime()) / 1e3);
    if (k >= m)
      return this._currentLiveRgb = $, this._previousLiveRgb = null, s?.restingResult ? s.restingResult : {
        enabled: !0,
        activeFade: !1,
        currentColor: wt($),
        progressPct: 100,
        remainingSeconds: 0,
        currentStage: 0,
        stageLabel: "Resting"
      };
    let T, M = 1, C = 0;
    const N = Math.max(0, Math.round(m - k));
    k < _ && _ > 0 ? (M = 1, C = k / _, T = xt(b, l, C)) : k < _ + p && p > 0 ? (M = 2, C = (k - _) / p, T = xt(h, g, C)) : v > 0 ? (M = 3, C = (k - _ - p) / v, T = xt(y, $, C)) : (M = 0, T = $), this._currentLiveRgb = T;
    const P = Math.min(100, Math.round(k / m * 100)), O = wt(T);
    let K = "";
    return N >= 60 ? K = `${Math.ceil(N / 60)}m left` : K = `${N}s left`, {
      enabled: !0,
      activeFade: !0,
      currentColor: O,
      progressPct: P,
      remainingSeconds: N,
      currentStage: M,
      stageLabel: K
    };
  }
  _resolveColor(e) {
    return Vi(e);
  }
  _parseDate(e) {
    return rr.parseDate(e);
  }
  _getInfoContent(e, t) {
    return rr.getInfoContent(e, t, this.config, this.hass);
  }
  _dispatchAction(e, t, r) {
    const i = r || this.config.entity, o = i ? i.split(".")[0] : "", a = Fi.has(o);
    let n = t;
    if (n || (e === "double_tap" ? n = this.config.double_tap_action : e === "hold" ? n = this.config.hold_action || (a ? { action: "more-info" } : { action: "toggle" }) : this.config.tap_action && this.config.tap_action.action && this.config.tap_action.action !== "default" ? a && this.config.tap_action.action === "toggle" ? n = { action: "none" } : n = this.config.tap_action : n = a ? { action: "none" } : { action: "toggle" }), !(!n || n.action === "none")) {
      if (n.action === "more-info") {
        const d = n.entity || i;
        if (d) {
          this.dispatchEvent(new CustomEvent("hass-more-info", {
            detail: { entityId: d },
            bubbles: !0,
            composed: !0
          }));
          return;
        }
      }
      if (n.action === "toggle" && i) {
        if (a)
          return;
        const d = o === "lock" ? this._isEntityActive(this.hass?.states[i]) ? "lock" : "unlock" : "toggle", f = ["lock", "cover"].includes(o) ? o : o === "group" ? "homeassistant" : o;
        this.hass?.callService(f, d, { entity_id: i });
        return;
      }
      if (n.action === "navigate" && n.navigation_path) {
        history.pushState(null, "", n.navigation_path), window.dispatchEvent(new CustomEvent("location-changed", {
          detail: { replace: !1 },
          bubbles: !0,
          composed: !0
        }));
        return;
      }
      if (n.action === "url" && n.url_path) {
        window.open(n.url_path, "_blank");
        return;
      }
      if (n.action === "call-service" && n.service) {
        const [d, f] = n.service.split(".", 2);
        this.hass?.callService(d, f, n.data || n.service_data || {}, n.target);
        return;
      }
      a && (!n.action || n.action === "toggle") || ni(this, this.hass, { ...this.config, entity: i }, e);
    }
  }
  _handleTap(e) {
    if (e.stopPropagation(), this._isSubElement(e)) return;
    if (Date.now() - this._mountTime < 1500 || Date.now() - ze < 800) {
      this._pointerDownReceived = !1;
      return;
    }
    if (!this._pointerDownReceived)
      return;
    if (this._pointerDownReceived = !1, this._moved || this._canceled) {
      this._moved = !1, this._canceled = !1;
      return;
    }
    if (this._held) {
      this._held = !1;
      return;
    }
    if (this._pointerDownTime && Date.now() - this._pointerDownTime > 600)
      return;
    const r = (this.config.collapse_controls_trigger || "hold") === "double_tap";
    if (!(r || this.config.double_tap_action && this.config.double_tap_action.action !== "none")) {
      H("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap");
      return;
    }
    if (this._tapTimer) {
      clearTimeout(this._tapTimer), this._tapTimer = null, H("medium", this.config.haptic_feedback !== !1), r && this._hasCollapsible() && (this._collapsed = !this._collapsed), this._dispatchAction("double_tap");
      return;
    }
    this._tapTimer = setTimeout(() => {
      this._tapTimer = null, H("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap");
    }, 250);
  }
  _handleKeyDown(e) {
    this._isSubElement(e) || Date.now() - this._mountTime < 1500 || Date.now() - ze < 800 || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), H("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap"));
  }
  _handleContextMenu(e) {
    if (e.preventDefault(), e.stopPropagation(), Date.now() - this._mountTime < 1500 || Date.now() - ze < 800 || this._held) return;
    H("medium", this.config.haptic_feedback !== !1), (this.config.collapse_controls_trigger || "hold") === "hold" && this._hasCollapsible() ? this._collapsed = !this._collapsed : this.config.hold_action && this.config.hold_action.action !== "none" && this._dispatchAction("hold");
  }
  _handlePointerDown(e) {
    this._isSubElement(e) || Date.now() - this._mountTime < 1500 || Date.now() - ze < 800 || this._activePointerId !== null && this._activePointerId !== e.pointerId || (this._activePointerId = e.pointerId, this._pointerDownReceived = !0, this._pointerDownTime = Date.now(), this._held = !1, this._moved = !1, this._canceled = !1, this._startX = e.clientX, this._startY = e.clientY, this._holdTimer = setTimeout(() => {
      if (this._moved || this._canceled) return;
      this._held = !0, this._holdTimer = null, this._tapTimer && (clearTimeout(this._tapTimer), this._tapTimer = null), H("heavy", this.config.haptic_feedback !== !1), (this.config.collapse_controls_trigger || "hold") === "hold" && this._hasCollapsible() ? this._collapsed = !this._collapsed : this.config.hold_action && this.config.hold_action.action !== "none" && this._dispatchAction("hold");
    }, 500));
  }
  _handlePointerMove(e) {
    if (this._isSubElement(e) || this._activePointerId !== null && this._activePointerId !== e.pointerId) return;
    const t = e.clientX - this._startX, r = e.clientY - this._startY, i = Math.hypot(t, r), o = Math.max(1, Date.now() - this._pointerDownTime), a = i / o;
    (i > 8 || a > 0.5) && (this._moved = !0, this._pointerDownReceived = !1, this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null));
  }
  _handlePointerUp(e) {
    this._isSubElement(e) || (this._activePointerId = null, this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null));
  }
  _handlePointerCancel(e) {
    this._isSubElement(e) || (this._activePointerId = null, this._canceled = !0, this._moved = !0, this._pointerDownReceived = !1, this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null));
  }
  _isSubElement(e) {
    const t = e.target;
    return t ? t.tagName === "INPUT" || t.hasAttribute("data-ag-sub") ? !0 : !!t.closest?.("[data-ag-sub], .sub-button, .sub-color-picker, .sub-button-slider-container, .slider-container, .slider-google-wrap, .sub-button-google-slider, .color-picker") : !1;
  }
  _handleSubPointerDown(e, t, r) {
    e.stopPropagation(), this._subHeld = !1, this._subMoved = !1, this._subCanceled = !1, this._subPointerDownTime = Date.now(), this._subStartX = e.clientX, this._subStartY = e.clientY, this._subHoldTimer = setTimeout(() => {
      this._subMoved || this._subCanceled || (this._subHeld = !0, this._subHoldTimer = null, H("heavy", this.config.haptic_feedback !== !1), this._dispatchAction("hold", r || { action: "more-info" }, t));
    }, 500);
  }
  _handleSubPointerMove(e) {
    e.stopPropagation();
    const t = e.clientX - this._subStartX, r = e.clientY - this._subStartY, i = Math.hypot(t, r), o = Math.max(1, Date.now() - this._subPointerDownTime), a = i / o;
    (i > 8 || a > 0.5) && (this._subMoved = !0, this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null));
  }
  _handleSubPointerUp(e) {
    e.stopPropagation(), this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
  }
  _handleSubPointerCancel(e) {
    e.stopPropagation(), this._subCanceled = !0, this._subMoved = !0, this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
  }
  _handleSubTap(e, t, r, i, o) {
    if (e.stopPropagation(), this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null), this._subMoved || this._subCanceled) {
      this._subMoved = !1, this._subCanceled = !1;
      return;
    }
    if (this._subHeld) {
      this._subHeld = !1;
      return;
    }
    if (this._subPointerDownTime && Date.now() - this._subPointerDownTime > 600)
      return;
    const a = i && i.action !== "none", n = t || "sub_default", d = () => {
      H("light", this.config.haptic_feedback !== !1), r && r.action && r.action !== "none" && r.action !== "default" ? this._dispatchAction("tap", r, t) : o ? o() : this._dispatchAction("tap", { action: "toggle" }, t);
    };
    if (!a) {
      d();
      return;
    }
    const f = this._subTapTimerMap.get(n);
    if (f) {
      clearTimeout(f), this._subTapTimerMap.delete(n), H("medium", this.config.haptic_feedback !== !1), this._dispatchAction("double_tap", i, t);
      return;
    }
    const u = setTimeout(() => {
      this._subTapTimerMap.delete(n), d();
    }, 250);
    this._subTapTimerMap.set(n, u);
  }
  _handleSubContextMenu(e, t, r) {
    e.preventDefault(), e.stopPropagation(), !this._subHeld && (H("medium", this.config.haptic_feedback !== !1), this._dispatchAction("hold", r || { action: "more-info" }, t));
  }
  // --- THROTTLED SERVICE CALL HELPER ---
  _throttledCall(e, t, r) {
    const i = r ?? (me.isPowerSaveActive(this.hass) ? 60 : 30), o = this._throttleMap.get(e) ?? 0, a = Date.now();
    if (!(a - o < i)) {
      this._throttleMap.set(e, a);
      try {
        t();
      } finally {
        setTimeout(() => {
          this._throttleMap.get(e) === a && this._throttleMap.delete(e);
        }, i + 50);
      }
    }
  }
  _revertSlider(e, t) {
    e.value = String(t.initialVal), e.style.setProperty("--slider-pct", t.initialPct);
    const i = e.closest(".slider-container, .sub-button-slider-container")?.querySelector(".slider-percent-badge, .sub-slider-pct");
    i && (i.textContent = t.initialBadge);
  }
  _sliderInput(e, t, r, i, o, a, n) {
    e.stopPropagation();
    const d = e.target, f = this._sliderStateMap.get(d);
    if (f?.isScrolling) {
      this._revertSlider(d, f);
      return;
    }
    const u = Number(d.value), s = isNaN(u) ? 0 : u, _ = a ? a(s) : s;
    if (f) {
      if (f.rafPending) return;
      f.rafPending = !0;
    }
    requestAnimationFrame(() => {
      if (f && (f.rafPending = !1), f?.isScrolling) {
        this._revertSlider(d, f);
        return;
      }
      d.style.setProperty("--slider-pct", `${_}%`);
      const p = d.closest(".slider-container, .sub-button-slider-container"), v = p?.querySelector(".slider-percent-badge, .sub-slider-pct");
      if (v && (v.textContent = n ? n(s, _) : `${_}%`), t === "color_hue" && p) {
        p.style.setProperty("--color-hue-val", `hsl(${s}, 100%, 50%)`);
        const m = p.querySelector(".color-chip-badge span");
        m && (m.style.background = `hsl(${s}, 100%, 50%)`);
      }
    }), H("selection", this.config.haptic_feedback !== !1);
  }
  _sliderChange(e, t, r, i) {
    e.stopPropagation();
    const o = e.target, a = this._sliderStateMap.get(o);
    if (a?.isScrolling) {
      this._revertSlider(o, a), a.isScrolling = !1;
      return;
    }
    const n = Number(o.value), d = isNaN(n) ? 0 : n;
    if (!(a && d === a.initialVal)) {
      if (t === "light" && r === "turn_on") {
        const f = Math.round(d / 255 * 100);
        if (d <= 3 || f <= 1) {
          this.hass.callService("light", "turn_off", { entity_id: this.config.entity });
          return;
        }
      }
      if (t === "fan" && r === "set_percentage" && d <= 0) {
        this.hass.callService("fan", "turn_off", { entity_id: this.config.entity });
        return;
      }
      this.hass.callService(t, r, { entity_id: this.config.entity, ...i(d) });
    }
  }
  _getLightLiveColor(e) {
    return ee.getLightLiveColor(e);
  }
  _handleColorInput(e, t, r, i) {
    e.stopPropagation();
    const o = e.target.value;
    if (!o) return;
    const a = X(o);
    if (!a) return;
    const n = r || this.config.entity, d = () => {
      this.hass.callService("light", "turn_on", { entity_id: n, rgb_color: a });
    };
    t ? this._throttledCall(i || "color_picker", d) : d();
  }
  // --- RENDER ---
  render() {
    if (!this.config || !this.hass)
      return S``;
    const e = this.config.entity;
    if (!e)
      return S`
        <ha-card class="warning-card">
          <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
          <span>Please configure an entity in the visual editor.</span>
        </ha-card>
      `;
    const t = this.hass.states[e];
    if (!t)
      return S`
        <ha-card class="warning-card">
          <ha-icon icon="mdi:help-circle-outline"></ha-icon>
          <span>Entity not found: <code>${e}</code></span>
        </ha-card>
      `;
    const r = this.config.show_name !== !1 ? this._getInfoContent(this.config.primary_info, t) : "", i = this.config.show_state !== !1 ? this._getInfoContent(this.config.secondary_info, t) : "", o = this._isEntityActive(t), a = e.split(".")[0];
    let n = "var(--primary-color)", d = null;
    a === "climate" ? t.state === "heat" ? n = "var(--state-climate-heat-color, #ff7043)" : t.state === "cool" ? n = "var(--state-climate-cool-color, #42a5f5)" : t.state === "dry" ? n = "var(--state-climate-dry-color, #ab47bc)" : t.state === "fan_only" && (n = "var(--state-climate-fan_only-color, #26a69a)") : a === "light" ? (d = this._getLightLiveColor(t), d && (n = d)) : (a === "binary_sensor" || a === "lock" || a === "switch") && (n = "#d60000");
    const f = this.config.color_type === "card";
    let u = this._resolveColor(this.config.active_color);
    (!u || this.config.use_light_color) && (a === "light" && d ? u = d : u = n);
    let s = "var(--secondary-background-color, rgba(150, 150, 150, 0.2))";
    a === "light" ? s = "#000000" : (a === "binary_sensor" || a === "lock" || a === "switch") && (s = "#03b500");
    const _ = this._resolveColor(this.config.inactive_color) || s, p = this.config.show_slider !== !1, v = a === "light", m = a === "cover", b = a === "fan", l = a === "humidifier", h = a === "media_player", g = a === "number" || a === "input_number", y = a === "climate", $ = this.config.hide_slider_when_off !== !1, x = this.config.hide_color_temp_when_off !== !1, k = this.config.hide_color_picker_when_off !== !1, T = this.config.hide_color_slider_when_off !== !1, M = t.attributes?.supported_color_modes;
    let C = t.attributes?.brightness !== void 0, N = !1, P = !1;
    if (Array.isArray(M))
      for (let A = 0; A < M.length; A++) {
        const Y = M[A];
        Y !== "onoff" && (C = !0), Y === "color_temp" && (N = !0), Oi.has(Y) && (P = !0);
      }
    const O = v && p && C && (!$ || o), K = t.attributes?.color_temp_kelvin ?? t.attributes?.color_temp, le = v && p && this.config.show_color_temp === !0 && (K !== void 0 || N) && (!x || o), ve = this.config.color_picker_type !== "wheel", ye = v && p && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && ve) && P && (!T || o), xe = v && p && this.config.show_color_picker === !0 && !ve && P && (!k || o), W = t.state !== "unavailable" && t.state !== "unknown", we = m && W && p && t.attributes?.current_position !== void 0, Se = b && W && o && p && t.attributes?.percentage !== void 0, $e = l && W && o && p && (t.attributes?.humidity !== void 0 || t.attributes?.target_humidity !== void 0), Ce = h && W && o && p && t.attributes?.volume_level !== void 0, ke = g && W && p, Te = y && W && o && p && (t.attributes?.temperature !== void 0 || t.attributes?.target_temp_high !== void 0), Ve = (this.config.bg_opacity ?? 10) / 100, Me = this.config.slider_color ? `--slider-color: ${this._resolveColor(this.config.slider_color)};` : f && o && !this.config.use_light_color ? "--slider-color: rgba(255, 255, 255, 0.95);" : `--slider-color: ${u};`, Ae = this.config.slider_track_color ? `--slider-track-color: ${this._resolveColor(this.config.slider_track_color)};` : f && o ? "--slider-track-color: rgba(0, 0, 0, 0.25);" : "", L = this._calculateMultiStageFade(t, n, _), q = this.config.fade_target ?? "card", ce = this._resolveColor(this.config.bg_color);
    let F;
    L.activeFade && (q === "card" || q === "all" || f) ? F = L.currentColor : f ? a === "light" ? F = o ? d || u : this.config.inactive_color ? _ : "#000000" : F = o ? u : _ : ce ? F = ce : a === "light" && !o ? F = "#000000" : F = `rgba(150, 150, 150, ${Ve})`;
    let de = this._resolveColor(this.config.active_color) || (a === "light" && d ? d : u) || "var(--primary-color)";
    L.activeFade && (q === "all" || this.config.active_glow === !0) && (de = L.currentColor);
    let U = "";
    this.config.box_shadow === "soft" && (U = "box-shadow: 0 4px 10px rgba(0,0,0,0.1);"), this.config.box_shadow === "deep" && (U = "box-shadow: 0 10px 20px rgba(0,0,0,0.3);"), (this.config.box_shadow === "glow" || this.config.active_glow === !0) && (U = o || L.activeFade ? `box-shadow: 0 0 22px ${de}, 0 0 45px rgba(255, 255, 255, 0.18);` : "");
    const Pe = this.config.active_glow === !0 || this.config.box_shadow === "glow" ? "card-active-glow" : "", B = t?.attributes?.device_class, te = a === "binary_sensor" && (B === "motion" || B === "occupancy" || B === "presence"), Ee = a === "binary_sensor" && (B === "door" || B === "window" || B === "garage_door" || B === "opening"), ue = te && (o || L.activeFade && L.currentStage === 1) ? "motion-active" : "", Ne = Ee && o ? "door-open" : "", Le = a === "climate" && t?.attributes?.hvac_action ? `hvac-${t.attributes.hvac_action}` : "", De = a === "cover" ? t?.state === "opening" ? "cover-opening" : t?.state === "closing" ? "cover-closing" : "" : "", J = `${this._staticCardClasses} ${Pe} ${ue} ${Ne} ${Le} ${De}`, Z = this._getSubButtons();
    let I = "";
    this.config.text_color_mode === "active_accent" && o ? I += `--primary-text-color: ${u}; ` : this.config.text_color_primary ? I += `--primary-text-color: ${this._resolveColor(this.config.text_color_primary)}; ` : f && o && (I += "--primary-text-color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.4); "), this.config.text_color_secondary ? I += `--secondary-text-color: ${this._resolveColor(this.config.text_color_secondary)}; ` : f && o && (I += "--secondary-text-color: rgba(255, 255, 255, 0.9); text-shadow: 0 1px 2px rgba(0,0,0,0.3); ");
    const G = this.config.features_position === "inline", We = this.config.text_scrolling_primary || "none", Ye = this.config.text_scrolling_secondary || "none", re = S`
      ${O ? this._renderLightSlider(t) : w}
      ${we ? this._renderCoverSlider(t) : w}
      ${Se ? this._renderFanSlider(t) : w}
      ${$e ? this._renderHumidifierSlider(t) : w}
      ${Ce ? this._renderMediaSlider(t) : w}
      ${ke ? this._renderNumberSlider(t) : w}
      ${Te ? this._renderClimateSlider(t) : w}
    `, ie = S`
      ${le ? this._renderColorTempSlider(t) : w}
      ${ye ? this._renderColorSlider(t) : w}
      ${xe ? this._renderColorPicker(t) : w}
    `, Re = O || we || Se || $e || Ce || ke || Te, oe = le || ye || xe, pe = !G && oe || Z.length > 0, E = this.config.decay_slider_position ?? "bottom", V = $t.sanitizeCustomStyles(this.config.custom_styles);
    return S`
      ${V ? S`<style>${sr(V)}</style>` : w}
      <ha-card 
        class="${J}" 
        ?active=${o}
        style="${this._staticCardStyles} background: ${F}; ${U} ${Me} ${Ae} ${I} --ag-glow-color: ${de}; --ag-active-color: ${u};"
        @click=${this._handleTap}
        @keydown=${this._handleKeyDown}
        @contextmenu=${this._handleContextMenu}
        @pointerdown=${this._handlePointerDown}
        @pointermove=${this._handlePointerMove}
        @pointerup=${this._handlePointerUp}
        @pointercancel=${this._handlePointerCancel}
      >
        <div class="card-content ${G ? "features-inline" : ""}" style="justify-content: var(--ag-content-alignment);">
          ${E === "top" ? this._renderDecaySlider(L) : w}

          <div class="info-container">
            <div class="info" style="${this._textOffsetStyle} ${this._textBoxWidth} text-align: var(--ag-text-alignment);">
              ${r ? S`
                <div class="text-marquee-container scroll-${We}" style="${this._primaryTextOffsetStyle}">
                  <span class="primary scroll-content" style="${this._primaryTextStyle}">${r}</span>
                </div>` : w}
              ${i ? S`
                <div class="text-marquee-container scroll-${Ye}" style="${this._secondaryTextOffsetStyle}">
                  <span class="secondary scroll-content" style="${this._secondaryTextStyle}">${i}</span>
                </div>` : w}
            </div>
            ${E === "inline" ? S`<div class="inline-sliders">${this._renderDecaySlider(L)}</div>` : w}
            ${G && Re ? S`<div class="inline-sliders" style="${this._mainSliderMarginOffsets}">${re}</div>` : w}
            ${G && oe ? S`<div class="inline-sliders ${this._collapsed ? "collapsed" : ""}">${ie}</div>` : w}
          </div>
          
          ${E === "bottom" ? this._renderDecaySlider(L) : w}
          ${!G && Re ? S`<div class="features-container" style="${this._featuresOffsetStyle} ${this._mainSliderMarginOffsets}">${re}</div>` : w}

          ${pe ? S`
            <div class="collapsible-wrapper ${this._collapsed ? "collapsed" : ""}">
              ${!G && oe ? S`<div class="features-container" style="${this._featuresOffsetStyle}">${ie}</div>` : w}

              ${Z.length > 0 ? S`
                <div class="sub-buttons-container">
                  ${jr(
      Z,
      (A) => A.key,
      (A) => this._renderSubButton(A.entity || "", A.icon, A.color, A.bg !== !1, A.name, A.tapAction, A.holdAction, A.type, A.doubleTapAction, A.showState)
    )}
                </div>
              ` : w}
            </div>
          ` : w}

        </div>
      </ha-card>
    `;
  }
  _getSliderCallbacks() {
    return {
      onPointerDown: this._onSliderPointerDown,
      onPointerMove: this._onSliderPointerMove,
      onPointerUp: this._onSliderPointerUp,
      onPointerCancel: this._onSliderPointerCancel,
      onSliderInput: (e, t, r, i, o, a, n) => this._sliderInput(e, t, r, i, o, a, n),
      onSliderChange: (e, t, r, i) => this._sliderChange(e, t, r, i),
      onColorInput: (e, t, r, i) => this._handleColorInput(e, t, r, i),
      callService: (e, t, r) => this.hass.callService(e, t, r),
      forwardHaptic: (e) => H(e, this.config.haptic_feedback !== !1)
    };
  }
  // --- DECAY / COOLDOWN SLIDER COMPONENT ---
  _renderDecaySlider(e) {
    if (!this.config.show_decay_slider || !e.enabled || !e.activeFade)
      return w;
    const t = this.config.slider_style === "google", r = this.config.decay_slider_height ?? (t ? 32 : 10), i = this.config.slider_border_radius ?? (t ? 16 : 5), o = Math.max(0, 100 - e.progressPct);
    return S`
      <div class="decay-slider-container" style="--decay-color: ${e.currentColor};">
        <div class="decay-slider-track" style="height: ${r}px; border-radius: ${i}px;">
          <div class="decay-slider-fill" style="width: ${o}%; background: ${e.currentColor}; border-radius: ${i}px;"></div>
          <span class="decay-slider-badge">${e.stageLabel}</span>
        </div>
      </div>
    `;
  }
  // --- MULTI-DOMAIN SLIDER RENDERERS ---
  _renderLightSlider(e) {
    return z.renderLightSlider(this.config, e, this._getSliderCallbacks(), this._mainSliderMarginOffsets);
  }
  _renderColorTempSlider(e) {
    return z.renderColorTempSlider(this.config, e, this._getSliderCallbacks(), this._colorTempMarginOffsets);
  }
  _renderColorSlider(e) {
    return z.renderColorSlider(this.config, e, this._getSliderCallbacks(), this._colorHueMarginOffsets);
  }
  _renderColorPicker(e) {
    return z.renderColorPicker(this.config, e, this._getSliderCallbacks());
  }
  _renderCoverSlider(e) {
    return z.renderCoverSlider(this.config, e, this._getSliderCallbacks(), this._mainSliderMarginOffsets);
  }
  _renderFanSlider(e) {
    return z.renderFanSlider(this.config, e, this._getSliderCallbacks(), this._mainSliderMarginOffsets);
  }
  _renderMediaSlider(e) {
    return z.renderMediaSlider(this.config, e, this._getSliderCallbacks(), this._mainSliderMarginOffsets);
  }
  _renderNumberSlider(e) {
    return z.renderNumberSlider(this.config, e, this._getSliderCallbacks(), this._mainSliderMarginOffsets);
  }
  _renderClimateSlider(e) {
    return z.renderClimateSlider(this.config, e, this.hass, this._getSliderCallbacks(), this._mainSliderMarginOffsets);
  }
  _renderHumidifierSlider(e) {
    return z.renderHumidifierSlider(this.config, e, this._getSliderCallbacks(), this._mainSliderMarginOffsets);
  }
  // --- EXTRACTED SUB-BUTTON RENDERERS ---
  _renderSubSlider(e, t, r, i, o) {
    return z.renderSubSlider(
      this.config,
      this.hass,
      e,
      t,
      r,
      i,
      o,
      this._throttledCall.bind(this)
    );
  }
  _renderSubColorPicker(e, t, r, i, o, a) {
    return z.renderSubColorPicker(
      this.hass,
      e,
      t,
      r,
      i,
      this._getSliderCallbacks(),
      o,
      a
    );
  }
  _renderSubButton(e, t, r, i = !0, o, a, n, d = "button", f, u = !1) {
    const s = e ? this.hass?.states[e] : this.hass?.states[this.config.entity || ""], _ = this._isEntityActive(s), p = r ? `color: ${r};` : "", v = i ? "" : "no-bg", m = r ? this._resolveColor(r) : void 0;
    if (d === "slider" || d === "google_slider") {
      const C = r ? `--primary-color: ${r}; --slider-color: ${r};` : "";
      return this._renderSubSlider(e, s, d, C, v);
    }
    let b;
    u && s && (b = this._getInfoContent("state", s));
    const l = (e || this.config.entity || "").split(".")[0];
    if (d === "color_picker" && (l === "light" || !e && this.config.entity?.startsWith("light.")))
      return this._renderSubColorPicker(e, s, p, v, o, b);
    const h = pi.resolve(
      d,
      e,
      this.config.entity,
      s,
      t,
      o,
      _,
      this.hass?.config?.unit_system?.temperature,
      a
    ), g = h.icon, y = h.title, $ = h.label, x = h.isActive, k = h.animClass;
    let T;
    h.defaultAction && (T = () => h.defaultAction(this.hass, this.config.entity));
    const M = (C) => {
      this._handleSubTap(C, e, a, f, T);
    };
    return S`
      <div 
        tabindex="0"
        data-ag-sub
        class="sub-button ${v}" 
        ?active=${x} 
        style="${p} ${x && m && i ? `background: ${m}; color: #fff;` : ""}"
        title="${y}"
        @click=${M}
        @dblclick=${(C) => C.stopPropagation()}
        @keydown=${(C) => {
      (C.key === "Enter" || C.key === " ") && (C.preventDefault(), C.stopPropagation(), M(C));
    }}
        @pointerdown=${(C) => this._handleSubPointerDown(C, e, n)}
        @pointermove=${this._handleSubPointerMove}
        @pointerup=${this._handleSubPointerUp}
        @pointercancel=${this._handleSubPointerCancel}
        @contextmenu=${(C) => this._handleSubContextMenu(C, e, n)}>
        <ha-icon .icon=${g} class="${k}"></ha-icon>
        ${$ ? S`<span class="sub-button-label">${$}</span>` : w}
        ${b ? S`<span class="sub-button-state">${b}</span>` : w}
      </div>
    `;
  }
  // --- STATIC STYLES ---
  static get styles() {
    return ui;
  }
}
Ge([
  pt({ attribute: !1 })
], se.prototype, "hass", 2);
Ge([
  pt({ type: Boolean })
], se.prototype, "preview", 2);
Ge([
  _t()
], se.prototype, "config", 2);
Ge([
  _t()
], se.prototype, "_collapsed", 2);
Ge([
  _r({ passive: !0 })
], se.prototype, "_handlePointerMove", 1);
Ge([
  _r({ passive: !0 })
], se.prototype, "_handleSubPointerMove", 1);
customElements.get("antigravity-no-icon-card") || customElements.define("antigravity-no-icon-card", se);
customElements.get("antigravity-with-icon-card") || customElements.define("antigravity-with-icon-card", se);
export {
  se as AntigravityWithIconCard,
  Bi as CARD_VERSION
};
