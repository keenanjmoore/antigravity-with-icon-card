const Pe = globalThis, Qe = Pe.ShadowRoot && (Pe.ShadyCSS === void 0 || Pe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Je = Symbol(), dt = /* @__PURE__ */ new WeakMap();
let Nt = class {
  constructor(e, t, o) {
    if (this._$cssResult$ = !0, o !== Je) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Qe && e === void 0) {
      const o = t !== void 0 && t.length === 1;
      o && (e = dt.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), o && dt.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Qt = (i) => new Nt(typeof i == "string" ? i : i + "", void 0, Je), Ht = (i, ...e) => {
  const t = i.length === 1 ? i[0] : e.reduce((o, r, n) => o + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[n + 1], i[0]);
  return new Nt(t, i, Je);
}, Jt = (i, e) => {
  if (Qe) i.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const o = document.createElement("style"), r = Pe.litNonce;
    r !== void 0 && o.setAttribute("nonce", r), o.textContent = t.cssText, i.appendChild(o);
  }
}, ut = Qe ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const o of e.cssRules) t += o.cssText;
  return Qt(t);
})(i) : i;
const { is: jt, defineProperty: ei, getOwnPropertyDescriptor: ti, getOwnPropertyNames: ii, getOwnPropertySymbols: oi, getPrototypeOf: ri } = Object, Ne = globalThis, ht = Ne.trustedTypes, ni = ht ? ht.emptyScript : "", ai = Ne.reactiveElementPolyfillSupport, _e = (i, e) => i, Ee = { toAttribute(i, e) {
  switch (e) {
    case Boolean:
      i = i ? ni : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, e) {
  let t = i;
  switch (e) {
    case Boolean:
      t = i !== null;
      break;
    case Number:
      t = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(i);
      } catch {
        t = null;
      }
  }
  return t;
} }, je = (i, e) => !jt(i, e), _t = { attribute: !0, type: String, converter: Ee, reflect: !1, useDefault: !1, hasChanged: je };
Symbol.metadata ??= Symbol("metadata"), Ne.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let J = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = _t) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const o = Symbol(), r = this.getPropertyDescriptor(e, o, t);
      r !== void 0 && ei(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, o) {
    const { get: r, set: n } = ti(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: r, set(a) {
      const s = r?.call(this);
      n?.call(this, a), this.requestUpdate(e, s, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? _t;
  }
  static _$Ei() {
    if (this.hasOwnProperty(_e("elementProperties"))) return;
    const e = ri(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(_e("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(_e("properties"))) {
      const t = this.properties, o = [...ii(t), ...oi(t)];
      for (const r of o) this.createProperty(r, t[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [o, r] of t) this.elementProperties.set(o, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, o] of this.elementProperties) {
      const r = this._$Eu(t, o);
      r !== void 0 && this._$Eh.set(r, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const o = new Set(e.flat(1 / 0).reverse());
      for (const r of o) t.unshift(ut(r));
    } else e !== void 0 && t.push(ut(e));
    return t;
  }
  static _$Eu(e, t) {
    const o = t.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const o of t.keys()) this.hasOwnProperty(o) && (e.set(o, this[o]), delete this[o]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Jt(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, o) {
    this._$AK(e, o);
  }
  _$ET(e, t) {
    const o = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, o);
    if (r !== void 0 && o.reflect === !0) {
      const n = (o.converter?.toAttribute !== void 0 ? o.converter : Ee).toAttribute(t, o.type);
      this._$Em = e, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const o = this.constructor, r = o._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const n = o.getPropertyOptions(r), a = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : Ee;
      this._$Em = r;
      const s = a.fromAttribute(t, n.type);
      this[r] = s ?? this._$Ej?.get(r) ?? s, this._$Em = null;
    }
  }
  requestUpdate(e, t, o, r = !1, n) {
    if (e !== void 0) {
      const a = this.constructor;
      if (r === !1 && (n = this[e]), o ??= a.getPropertyOptions(e), !((o.hasChanged ?? je)(n, t) || o.useDefault && o.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, o)))) return;
      this.C(e, t, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: o, reflect: r, wrapped: n }, a) {
    o && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), n !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || o || (t = void 0), this._$AL.set(e, t)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [r, n] of o) {
        const { wrapped: a } = n, s = this[r];
        a !== !0 || this._$AL.has(r) || s === void 0 || this.C(r, void 0, n, s);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((o) => o.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (o) {
      throw e = !1, this._$EM(), o;
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
J.elementStyles = [], J.shadowRootOptions = { mode: "open" }, J[_e("elementProperties")] = /* @__PURE__ */ new Map(), J[_e("finalized")] = /* @__PURE__ */ new Map(), ai?.({ ReactiveElement: J }), (Ne.reactiveElementVersions ??= []).push("2.1.2");
const et = globalThis, pt = (i) => i, Le = et.trustedTypes, gt = Le ? Le.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, Bt = "$lit$", z = `lit$${Math.random().toFixed(9).slice(2)}$`, Rt = "?" + z, si = `<${Rt}>`, Y = document, pe = () => Y.createComment(""), ge = (i) => i === null || typeof i != "object" && typeof i != "function", tt = Array.isArray, li = (i) => tt(i) || typeof i?.[Symbol.iterator] == "function", Ye = `[ 	
\f\r]`, ce = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ft = /-->/g, mt = />/g, G = RegExp(`>|${Ye}(?:([^\\s"'>=/]+)(${Ye}*=${Ye}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), bt = /'/g, vt = /"/g, Dt = /^(?:script|style|textarea|title)$/i, ci = (i) => (e, ...t) => ({ _$litType$: i, strings: e, values: t }), $ = ci(1), q = Symbol.for("lit-noChange"), b = Symbol.for("lit-nothing"), yt = /* @__PURE__ */ new WeakMap(), V = Y.createTreeWalker(Y, 129);
function zt(i, e) {
  if (!tt(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return gt !== void 0 ? gt.createHTML(e) : e;
}
const di = (i, e) => {
  const t = i.length - 1, o = [];
  let r, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = ce;
  for (let s = 0; s < t; s++) {
    const l = i[s];
    let _, c, d = -1, u = 0;
    for (; u < l.length && (a.lastIndex = u, c = a.exec(l), c !== null); ) u = a.lastIndex, a === ce ? c[1] === "!--" ? a = ft : c[1] !== void 0 ? a = mt : c[2] !== void 0 ? (Dt.test(c[2]) && (r = RegExp("</" + c[2], "g")), a = G) : c[3] !== void 0 && (a = G) : a === G ? c[0] === ">" ? (a = r ?? ce, d = -1) : c[1] === void 0 ? d = -2 : (d = a.lastIndex - c[2].length, _ = c[1], a = c[3] === void 0 ? G : c[3] === '"' ? vt : bt) : a === vt || a === bt ? a = G : a === ft || a === mt ? a = ce : (a = G, r = void 0);
    const g = a === G && i[s + 1].startsWith("/>") ? " " : "";
    n += a === ce ? l + si : d >= 0 ? (o.push(_), l.slice(0, d) + Bt + l.slice(d) + z + g) : l + z + (d === -2 ? s : g);
  }
  return [zt(i, n + (i[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), o];
};
class fe {
  constructor({ strings: e, _$litType$: t }, o) {
    let r;
    this.parts = [];
    let n = 0, a = 0;
    const s = e.length - 1, l = this.parts, [_, c] = di(e, t);
    if (this.el = fe.createElement(_, o), V.currentNode = this.el.content, t === 2 || t === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = V.nextNode()) !== null && l.length < s; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const d of r.getAttributeNames()) if (d.endsWith(Bt)) {
          const u = c[a++], g = r.getAttribute(d).split(z), f = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: n, name: f[2], strings: g, ctor: f[1] === "." ? hi : f[1] === "?" ? _i : f[1] === "@" ? pi : He }), r.removeAttribute(d);
        } else d.startsWith(z) && (l.push({ type: 6, index: n }), r.removeAttribute(d));
        if (Dt.test(r.tagName)) {
          const d = r.textContent.split(z), u = d.length - 1;
          if (u > 0) {
            r.textContent = Le ? Le.emptyScript : "";
            for (let g = 0; g < u; g++) r.append(d[g], pe()), V.nextNode(), l.push({ type: 2, index: ++n });
            r.append(d[u], pe());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Rt) l.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = r.data.indexOf(z, d + 1)) !== -1; ) l.push({ type: 7, index: n }), d += z.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const o = Y.createElement("template");
    return o.innerHTML = e, o;
  }
}
function ee(i, e, t = i, o) {
  if (e === q) return e;
  let r = o !== void 0 ? t._$Co?.[o] : t._$Cl;
  const n = ge(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(i), r._$AT(i, t, o)), o !== void 0 ? (t._$Co ??= [])[o] = r : t._$Cl = r), r !== void 0 && (e = ee(i, r._$AS(i, e.values), r, o)), e;
}
class ui {
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
    const { el: { content: t }, parts: o } = this._$AD, r = (e?.creationScope ?? Y).importNode(t, !0);
    V.currentNode = r;
    let n = V.nextNode(), a = 0, s = 0, l = o[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let _;
        l.type === 2 ? _ = new te(n, n.nextSibling, this, e) : l.type === 1 ? _ = new l.ctor(n, l.name, l.strings, this, e) : l.type === 6 && (_ = new gi(n, this, e)), this._$AV.push(_), l = o[++s];
      }
      a !== l?.index && (n = V.nextNode(), a++);
    }
    return V.currentNode = Y, r;
  }
  p(e) {
    let t = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(e, o, t), t += o.strings.length - 2) : o._$AI(e[t])), t++;
  }
}
class te {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, o, r) {
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = o, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    e = ee(this, e, t), ge(e) ? e === b || e == null || e === "" ? (this._$AH !== b && this._$AR(), this._$AH = b) : e !== this._$AH && e !== q && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : li(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== b && ge(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Y.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: o } = e, r = typeof o == "number" ? this._$AC(e) : (o.el === void 0 && (o.el = fe.createElement(zt(o.h, o.h[0]), this.options)), o);
    if (this._$AH?._$AD === r) this._$AH.p(t);
    else {
      const n = new ui(r, this), a = n.u(this.options);
      n.p(t), this.T(a), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = yt.get(e.strings);
    return t === void 0 && yt.set(e.strings, t = new fe(e)), t;
  }
  k(e) {
    tt(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let o, r = 0;
    for (const n of e) r === t.length ? t.push(o = new te(this.O(pe()), this.O(pe()), this, this.options)) : o = t[r], o._$AI(n), r++;
    r < t.length && (this._$AR(o && o._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const o = pt(e).nextSibling;
      pt(e).remove(), e = o;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class He {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, o, r, n) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = n, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = b;
  }
  _$AI(e, t = this, o, r) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) e = ee(this, e, t, 0), a = !ge(e) || e !== this._$AH && e !== q, a && (this._$AH = e);
    else {
      const s = e;
      let l, _;
      for (e = n[0], l = 0; l < n.length - 1; l++) _ = ee(this, s[o + l], t, l), _ === q && (_ = this._$AH[l]), a ||= !ge(_) || _ !== this._$AH[l], _ === b ? e = b : e !== b && (e += (_ ?? "") + n[l + 1]), this._$AH[l] = _;
    }
    a && !r && this.j(e);
  }
  j(e) {
    e === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class hi extends He {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === b ? void 0 : e;
  }
}
class _i extends He {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== b);
  }
}
class pi extends He {
  constructor(e, t, o, r, n) {
    super(e, t, o, r, n), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = ee(this, e, t, 0) ?? b) === q) return;
    const o = this._$AH, r = e === b && o !== b || e.capture !== o.capture || e.once !== o.once || e.passive !== o.passive, n = e !== b && (o === b || r);
    r && this.element.removeEventListener(this.name, this, o), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
let gi = class {
  constructor(e, t, o) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ee(this, e);
  }
};
const fi = { I: te }, mi = et.litHtmlPolyfillSupport;
mi?.(fe, te), (et.litHtmlVersions ??= []).push("3.3.3");
const bi = (i, e, t) => {
  const o = t?.renderBefore ?? e;
  let r = o._$litPart$;
  if (r === void 0) {
    const n = t?.renderBefore ?? null;
    o._$litPart$ = r = new te(e.insertBefore(pe(), n), n, void 0, t ?? {});
  }
  return r._$AI(i), r;
};
const it = globalThis;
let j = class extends J {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = bi(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return q;
  }
};
j._$litElement$ = !0, j.finalized = !0, it.litElementHydrateSupport?.({ LitElement: j });
const vi = it.litElementPolyfillSupport;
vi?.({ LitElement: j });
(it.litElementVersions ??= []).push("4.2.2");
const yi = (i) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(i, e);
  }) : customElements.define(i, e);
};
const xi = { attribute: !0, type: String, converter: Ee, reflect: !1, hasChanged: je }, $i = (i = xi, e, t) => {
  const { kind: o, metadata: r } = t;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), o === "setter" && ((i = Object.create(i)).wrapped = !0), n.set(t.name, i), o === "accessor") {
    const { name: a } = t;
    return { set(s) {
      const l = e.get.call(this);
      e.set.call(this, s), this.requestUpdate(a, l, i, !0, s);
    }, init(s) {
      return s !== void 0 && this.C(a, void 0, i, s), s;
    } };
  }
  if (o === "setter") {
    const { name: a } = t;
    return function(s) {
      const l = this[a];
      e.call(this, s), this.requestUpdate(a, l, i, !0, s);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function Be(i) {
  return (e, t) => typeof t == "object" ? $i(i, e, t) : ((o, r, n) => {
    const a = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, o), a ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(i, e, t);
}
function Re(i) {
  return Be({ ...i, state: !0, attribute: !1 });
}
function It(i) {
  return (e, t) => {
    const o = typeof e == "function" ? e : e[t];
    Object.assign(o, i);
  };
}
const wi = { CHILD: 2 }, Si = (i) => (...e) => ({ _$litDirective$: i, values: e });
let ki = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, o) {
    this._$Ct = e, this._$AM = t, this._$Ci = o;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
};
const { I: Ci } = fi, xt = (i) => i, $t = () => document.createComment(""), de = (i, e, t) => {
  const o = i._$AA.parentNode, r = e === void 0 ? i._$AB : e._$AA;
  if (t === void 0) {
    const n = o.insertBefore($t(), r), a = o.insertBefore($t(), r);
    t = new Ci(n, a, i, i.options);
  } else {
    const n = t._$AB.nextSibling, a = t._$AM, s = a !== i;
    if (s) {
      let l;
      t._$AQ?.(i), t._$AM = i, t._$AP !== void 0 && (l = i._$AU) !== a._$AU && t._$AP(l);
    }
    if (n !== r || s) {
      let l = t._$AA;
      for (; l !== n; ) {
        const _ = xt(l).nextSibling;
        xt(o).insertBefore(l, r), l = _;
      }
    }
  }
  return t;
}, W = (i, e, t = i) => (i._$AI(e, t), i), Ti = {}, Ai = (i, e = Ti) => i._$AH = e, Mi = (i) => i._$AH, qe = (i) => {
  i._$AR(), i._$AA.remove();
};
const wt = (i, e, t) => {
  const o = /* @__PURE__ */ new Map();
  for (let r = e; r <= t; r++) o.set(i[r], r);
  return o;
}, Pi = Si(class extends ki {
  constructor(i) {
    if (super(i), i.type !== wi.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(i, e, t) {
    let o;
    t === void 0 ? t = e : e !== void 0 && (o = e);
    const r = [], n = [];
    let a = 0;
    for (const s of i) r[a] = o ? o(s, a) : a, n[a] = t(s, a), a++;
    return { values: n, keys: r };
  }
  render(i, e, t) {
    return this.dt(i, e, t).values;
  }
  update(i, [e, t, o]) {
    const r = Mi(i), { values: n, keys: a } = this.dt(e, t, o);
    if (!Array.isArray(r)) return this.ut = a, n;
    const s = this.ut ??= [], l = [];
    let _, c, d = 0, u = r.length - 1, g = 0, f = n.length - 1;
    for (; d <= u && g <= f; ) if (r[d] === null) d++;
    else if (r[u] === null) u--;
    else if (s[d] === a[g]) l[g] = W(r[d], n[g]), d++, g++;
    else if (s[u] === a[f]) l[f] = W(r[u], n[f]), u--, f--;
    else if (s[d] === a[f]) l[f] = W(r[d], n[f]), de(i, l[f + 1], r[d]), d++, f--;
    else if (s[u] === a[g]) l[g] = W(r[u], n[g]), de(i, r[d], r[u]), u--, g++;
    else if (_ === void 0 && (_ = wt(a, g, f), c = wt(s, d, u)), _.has(s[d])) if (_.has(s[u])) {
      const w = c.get(a[g]), p = w !== void 0 ? r[w] : null;
      if (p === null) {
        const k = de(i, r[d]);
        W(k, n[g]), l[g] = k;
      } else l[g] = W(p, n[g]), de(i, r[d], p), r[w] = null;
      g++;
    } else qe(r[u]), u--;
    else qe(r[d]), d++;
    for (; g <= f; ) {
      const w = de(i, l[f + 1]);
      W(w, n[g]), l[g++] = w;
    }
    for (; d <= u; ) {
      const w = r[d++];
      w !== null && qe(w);
    }
    return this.ut = a, Ai(i, l), q;
  }
});
var St, kt;
(function(i) {
  i.language = "language", i.system = "system", i.comma_decimal = "comma_decimal", i.decimal_comma = "decimal_comma", i.space_comma = "space_comma", i.none = "none";
})(St || (St = {})), function(i) {
  i.language = "language", i.system = "system", i.am_pm = "12", i.twenty_four = "24";
}(kt || (kt = {}));
function Ei(i) {
  return i.substr(0, i.indexOf("."));
}
var Li = ["closed", "locked", "off"], me = function(i, e, t, o) {
  o = o || {}, t = t ?? {};
  var r = new Event(e, { bubbles: o.bubbles === void 0 || o.bubbles, cancelable: !!o.cancelable, composed: o.composed === void 0 || o.composed });
  return r.detail = t, i.dispatchEvent(r), r;
}, he = function(i) {
  me(window, "haptic", i);
}, Ni = function(i, e, t) {
  t === void 0 && (t = !1), t ? history.replaceState(null, "", e) : history.pushState(null, "", e), me(window, "location-changed", { replace: t });
}, Hi = function(i, e, t) {
  t === void 0 && (t = !0);
  var o, r = Ei(e), n = r === "group" ? "homeassistant" : r;
  switch (r) {
    case "lock":
      o = t ? "unlock" : "lock";
      break;
    case "cover":
      o = t ? "open_cover" : "close_cover";
      break;
    default:
      o = t ? "turn_on" : "turn_off";
  }
  return i.callService(n, o, { entity_id: e });
}, Bi = function(i, e) {
  var t = Li.includes(i.states[e].state);
  return Hi(i, e, t);
}, Ri = function(i, e, t, o) {
  if (o || (o = { action: "more-info" }), !o.confirmation || o.confirmation.exemptions && o.confirmation.exemptions.some(function(n) {
    return n.user === e.user.id;
  }) || (he("warning"), confirm(o.confirmation.text || "Are you sure you want to " + o.action + "?"))) switch (o.action) {
    case "more-info":
      (t.entity || t.camera_image) && me(i, "hass-more-info", { entityId: t.entity ? t.entity : t.camera_image });
      break;
    case "navigate":
      o.navigation_path && Ni(0, o.navigation_path);
      break;
    case "url":
      o.url_path && window.open(o.url_path);
      break;
    case "toggle":
      t.entity && (Bi(e, t.entity), he("success"));
      break;
    case "call-service":
      if (!o.service) return void he("failure");
      var r = o.service.split(".", 2);
      e.callService(r[0], r[1], o.service_data, o.target), he("success");
      break;
    case "fire-dom-event":
      me(i, "ll-custom", o);
  }
}, Ct = function(i, e, t, o) {
  var r;
  o === "double_tap" && t.double_tap_action ? r = t.double_tap_action : o === "hold" && t.hold_action ? r = t.hold_action : o === "tap" && t.tap_action && (r = t.tap_action), Ri(i, e, t, r);
};
const Xe = {
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
  icon: "",
  icon_color: "var(--primary-color)",
  icon_type: "icon",
  icon_shape: "circle",
  icon_animation: "none",
  icon_opacity: 100,
  icon_rotate: 0,
  icon_size: 24,
  icon_margin: 0,
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
  icon_container_size: 40,
  aspect_ratio: "",
  // Hover and interaction
  hover_effect: "glow",
  active_pulse: !1,
  active_glow: !1,
  // Theme and presets
  theme_preset: "default",
  color_type: "icon",
  active_color: "",
  inactive_color: "",
  // Slider styling & layer isolation
  use_light_color: !1,
  haptic_feedback: !0,
  haptic_type: "light",
  slider_stepped_movement: !1,
  tap_slider_to_toggle: !1,
  slider_style: "full",
  full_slider_opacity: 100,
  slider_color: "",
  slider_track_color: "",
  slider_height: 40,
  slider_border_radius: 15,
  slider_start_offset: -22,
  slider_end_offset: -16,
  slider_spacing: 2,
  color_temp_height: 37,
  color_temp_border_radius: 20,
  color_temp_start_offset: 0,
  color_temp_end_offset: 0,
  color_temp_type: "thin",
  color_slider_height: 41,
  color_slider_border_radius: 20,
  color_slider_start_offset: 0,
  color_slider_end_offset: 0,
  color_picker_type: "slider",
  features_position: "bottom",
  // Collapsible & Text Color Mode defaults
  collapse_controls_trigger: "hold",
  text_color_mode: "selected",
  // Typography defaults
  font_size_primary: 14,
  font_weight_primary: "800",
  text_transform_primary: "capitalize",
  text_color_primary: "#ffffff",
  font_size_secondary: 15,
  text_transform_secondary: "capitalize",
  text_color_secondary: "#ffffff",
  text_scrolling_primary: "none",
  text_scrolling_secondary: "none",
  text_scrolling_speed: 10,
  text_alignment: "left",
  content_alignment: "flex-start",
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
  icon_offset_x: 0,
  icon_offset_y: 0,
  features_offset_x: 0,
  features_offset_y: 0,
  // Badge defaults
  badge_icon: "",
  badge_color: "",
  badge_size: 16,
  badge_offset: -2,
  // Box shadow and blur
  box_shadow: "none",
  backdrop_blur: 0,
  transition_duration: 300,
  // Action defaults
  tap_action: { action: "toggle" },
  hold_action: { action: "none" },
  double_tap_action: { action: "none" },
  // Feature toggles
  show_icon: !0,
  show_name: !0,
  show_state: !0,
  visibility_state: "always",
  show_slider: !0,
  hide_slider_when_off: !0,
  show_slider_percent: !1,
  show_color_temp: !1,
  hide_color_temp_when_off: !0,
  show_color_picker: !1,
  hide_color_picker_when_off: !0,
  show_color_slider: !1,
  hide_color_slider_when_off: !0,
  fill_container: !0,
  overflow_hidden: !0,
  // Layout defaults
  layout: "default",
  card_layout: "normal",
  primary_info: "name",
  secondary_info: "last-updated",
  // Sub-button defaults
  sub_button_1_entity: "",
  sub_button_1_type: "button",
  sub_button_1_icon: "",
  sub_button_1_color: "",
  sub_button_1_show_background: !0,
  sub_button_1_show_state: !1,
  sub_button_1_name: "",
  sub_button_1_tap_action: { action: "toggle" },
  sub_button_1_hold_action: { action: "none" },
  sub_button_1_double_tap_action: { action: "none" },
  sub_button_2_entity: "",
  sub_button_2_type: "button",
  sub_button_2_icon: "",
  sub_button_2_color: "",
  sub_button_2_show_background: !0,
  sub_button_2_show_state: !1,
  sub_button_2_name: "",
  sub_button_2_tap_action: { action: "toggle" },
  sub_button_2_hold_action: { action: "none" },
  sub_button_2_double_tap_action: { action: "none" },
  sub_button_3_entity: "",
  sub_button_3_type: "button",
  sub_button_3_icon: "",
  sub_button_3_color: "",
  sub_button_3_show_background: !0,
  sub_button_3_show_state: !1,
  sub_button_3_name: "",
  sub_button_3_tap_action: { action: "toggle" },
  sub_button_3_hold_action: { action: "none" },
  sub_button_3_double_tap_action: { action: "none" },
  sub_button_4_entity: "",
  sub_button_4_type: "button",
  sub_button_4_icon: "",
  sub_button_4_color: "",
  sub_button_4_show_background: !0,
  sub_button_4_show_state: !1,
  sub_button_4_name: "",
  sub_button_4_tap_action: { action: "toggle" },
  sub_button_4_hold_action: { action: "none" },
  sub_button_4_double_tap_action: { action: "none" },
  // Miscellaneous
  custom_styles: ""
};
var Di = Object.defineProperty, ot = (i, e, t, o) => {
  for (var r = void 0, n = i.length - 1, a; n >= 0; n--)
    (a = i[n]) && (r = a(e, t, r) || r);
  return r && Di(e, t, r), r;
};
const zi = [
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
], Ii = [
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
], Oi = [
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
], Ui = [
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
  { name: "icon_offset_x", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "icon_offset_y", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "features_offset_x", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "features_offset_y", selector: { number: { min: -150, max: 250, mode: "slider" } } }
], Fi = [
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
], Tt = [
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
function De(i) {
  return [
    { name: `sub_button_${i}_entity`, selector: { entity: {} } },
    { name: `sub_button_${i}_type`, selector: { select: { options: [
      { value: "button", label: "Standard Action Button (Default)" },
      { value: "play_pause", label: "Media: Play/Pause Dynamic Toggle" },
      { value: "next", label: "Media: Next Track" },
      { value: "previous", label: "Media: Previous Track" },
      { value: "open_close", label: "Cover: Open/Close Toggle" },
      { value: "stop", label: "Cover: Stop" },
      { value: "garage_toggle", label: "Garage: Toggle Open / Close" },
      { value: "lock_unlock", label: "Lock: Toggle Lock/Unlock" },
      { value: "fan_speed", label: "Fan: Cycle Speed (0-33-66-100%)" },
      { value: "clean", label: "Vacuum: Start / Pause Clean" },
      { value: "dock", label: "Vacuum: Return to Base / Dock" },
      { value: "locate", label: "Vacuum: Locate / Beep" },
      { value: "hvac_mode", label: "Climate: Cycle HVAC Mode" },
      { value: "light_effect", label: "Light: Cycle Dynamic Effects" },
      { value: "dim_up", label: "Light: Step Brightness Up (+10%)" },
      { value: "dim_down", label: "Light: Step Brightness Down (-10%)" },
      { value: "temp_warm", label: "Light: Warm White (2700K)" },
      { value: "temp_cool", label: "Light: Cool Daylight (6000K)" },
      { value: "slider", label: "Mini Interactive Slider" },
      { value: "google_slider", label: "Google-Style Pill Slider" },
      { value: "color_temp", label: "Color Temp Control" },
      { value: "color_picker", label: "RGB Color Picker Swatch" },
      { value: "brightness", label: "Brightness Quick Button" }
    ] } } },
    { name: `sub_button_${i}_icon`, selector: { icon: {} } },
    { name: `sub_button_${i}_name`, selector: { text: {} } },
    { name: `sub_button_${i}_show_state`, selector: { boolean: {} } },
    { name: `sub_button_${i}_color`, selector: { color_rgb: {} } },
    { name: `sub_button_${i}_show_background`, selector: { boolean: {} } },
    { name: `sub_button_${i}_tap_action`, selector: { ui_action: {} } },
    { name: `sub_button_${i}_hold_action`, selector: { ui_action: {} } },
    { name: `sub_button_${i}_double_tap_action`, selector: { ui_action: {} } }
  ];
}
const Gi = De(1), Wi = De(2), Vi = De(3), Yi = De(4), qi = [
  { name: "tap_action", selector: { ui_action: {} } },
  { name: "hold_action", selector: { ui_action: {} } },
  { name: "double_tap_action", selector: { ui_action: {} } },
  { name: "custom_styles", selector: { text: { multiline: !0 } } }
], At = {
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
function P(i) {
  if (typeof i != "string" || !i.trim()) return;
  const e = i.trim();
  if (At[e.toLowerCase()])
    return At[e.toLowerCase()];
  if (/^#[0-9a-fA-F]{3}$/.test(e))
    return `#${e[1]}${e[1]}${e[2]}${e[2]}${e[3]}${e[3]}`;
  if (/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(e)) {
    const r = e.split(",").map((n) => Math.max(0, Math.min(255, parseInt(n.trim(), 10))));
    return `#${r[0].toString(16).padStart(2, "0")}${r[1].toString(16).padStart(2, "0")}${r[2].toString(16).padStart(2, "0")}`;
  }
  const t = e.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/i);
  if (t) {
    const r = Math.max(0, Math.min(255, parseInt(t[1], 10))), n = Math.max(0, Math.min(255, parseInt(t[2], 10))), a = Math.max(0, Math.min(255, parseInt(t[3], 10)));
    return `#${r.toString(16).padStart(2, "0")}${n.toString(16).padStart(2, "0")}${a.toString(16).padStart(2, "0")}`;
  }
  const o = e.match(/hsla?\s*\(\s*([\d.]+)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?(?:\s*,\s*([\d.]+))?\s*\)/i);
  if (o) {
    const r = parseFloat(o[1]) / 360, n = parseFloat(o[2]) / 100, a = parseFloat(o[3]) / 100, s = (u, g, f) => (f < 0 && (f += 1), f > 1 && (f -= 1), f < 1 / 6 ? u + (g - u) * 6 * f : f < 1 / 2 ? g : f < 2 / 3 ? u + (g - u) * (2 / 3 - f) * 6 : u);
    let l, _, c;
    if (n === 0)
      l = _ = c = a;
    else {
      const u = a < 0.5 ? a * (1 + n) : a + n - a * n, g = 2 * a - u;
      l = s(g, u, r + 1 / 3), _ = s(g, u, r), c = s(g, u, r - 1 / 3);
    }
    const d = (u) => Math.round(Math.max(0, Math.min(255, u * 255))).toString(16).padStart(2, "0");
    return `#${d(l)}${d(_)}${d(c)}`;
  }
  return e;
}
function Ki(i) {
  const e = P(i);
  if (!e || !e.startsWith("#") || e.length < 7) return;
  const t = parseInt(e.slice(1, 3), 16), o = parseInt(e.slice(3, 5), 16), r = parseInt(e.slice(5, 7), 16);
  if (!(isNaN(t) || isNaN(o) || isNaN(r)))
    return [t, o, r];
}
class ze extends j {
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
      const o = typeof t.bg_color == "string" ? t.bg_color.match(/rgba\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*([\d.]+)\s*\)/i) : null;
      o && t.bg_opacity === void 0 && (t.bg_opacity = Math.round(parseFloat(o[1]) * 100)), t.bg_color = P(t.bg_color);
    }
    t.card_border_color && (t.card_border_color = P(t.card_border_color)), t.icon_color && (t.icon_color = P(t.icon_color)), t.active_color && (t.active_color = P(t.active_color)), t.inactive_color && (t.inactive_color = P(t.inactive_color)), t.badge_color && (t.badge_color = P(t.badge_color)), t.slider_color && (t.slider_color = P(t.slider_color)), t.slider_track_color && (t.slider_track_color = P(t.slider_track_color)), t.text_color_primary && (t.text_color_primary = P(t.text_color_primary)), t.text_color_secondary && (t.text_color_secondary = P(t.text_color_secondary)), t.sub_button_1_color && (t.sub_button_1_color = P(t.sub_button_1_color)), t.sub_button_2_color && (t.sub_button_2_color = P(t.sub_button_2_color)), t.sub_button_3_color && (t.sub_button_3_color = P(t.sub_button_3_color)), t.sub_button_4_color && (t.sub_button_4_color = P(t.sub_button_4_color)), this._config = {
      ...Xe,
      ...t
    };
  }
  _computeLabel(e) {
    return {
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
      text_padding: "Text Block Base Padding (px)",
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
      icon_offset_x: "Icon Offset X (px)",
      icon_offset_y: "Icon Offset Y (px)",
      features_offset_x: "Controls Offset X (px)",
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
    }[e.name] || e.name;
  }
  _valueChanged(e, t) {
    let o = { ...this._config };
    const r = e.detail.value || {};
    for (const n of t)
      if (n.name)
        if (n.selector?.boolean !== void 0)
          r[n.name] !== void 0 ? o[n.name] = r[n.name] === !0 : delete o[n.name];
        else if (n.selector?.color_rgb !== void 0) {
          const a = r[n.name];
          Array.isArray(a) && a.length === 3 ? o[n.name] = `rgb(${a[0]}, ${a[1]}, ${a[2]})` : a !== void 0 && a !== "" ? o[n.name] = a : delete o[n.name];
        } else
          r[n.name] !== void 0 && r[n.name] !== "" ? o[n.name] = r[n.name] : delete o[n.name];
    me(this, "config-changed", { config: o });
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
    for (const o of t)
      if (e[o]) {
        const r = Ki(e[o]);
        r && (e[o] = r);
      }
    return e;
  }
  _togglePanel(e) {
    this._openPanels = {
      ...this._openPanels,
      [e]: !this._openPanels[e]
    };
  }
  _renderSection(e, t, o, r, n) {
    const a = !!this._openPanels[e];
    return $`
      <div class="custom-panel ${a ? "open" : ""}">
        <div class="panel-header" @click=${() => this._togglePanel(e)}>
          <div class="header-left">
            <span class="header-icon">${t}</span>
            <span class="header-title">${o}</span>
          </div>
          <ha-icon class="chevron-icon ${a ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        ${a ? $`
          <div class="panel-body">
            <ha-form
              .hass=${this.hass}
              .data=${n}
              .schema=${r}
              .computeLabel=${this._computeLabel}
              @value-changed=${(s) => this._valueChanged(s, r)}
            ></ha-form>
          </div>
        ` : b}
      </div>
    `;
  }
  _renderSubButtonPanel(e, t, o, r) {
    const n = `sub${e}`, a = !!this._openPanels[n];
    return $`
      <div class="sub-nested-panel ${a ? "open" : ""}">
        <div class="sub-panel-header" @click=${() => this._togglePanel(n)}>
          <div class="header-left">
            <span class="sub-dot ${t ? "active" : ""}"></span>
            <span class="sub-title">Sub-Button ${e} ${t ? `(${t})` : "• Inactive"}</span>
          </div>
          <ha-icon class="chevron-icon ${a ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        ${a ? $`
          <div class="sub-panel-body">
            <ha-form
              .hass=${this.hass}
              .data=${r}
              .schema=${o}
              .computeLabel=${this._computeLabel}
              @value-changed=${(s) => this._valueChanged(s, o)}
            ></ha-form>
          </div>
        ` : b}
      </div>
    `;
  }
  render() {
    if (!this.hass || !this._config) return $``;
    const e = this._transformConfigForForm(), t = this._config?.sub_button_1_entity || "", o = this._config?.sub_button_2_entity || "", r = this._config?.sub_button_3_entity || "", n = this._config?.sub_button_4_entity || "", a = !!this._openPanels.sub_buttons;
    return $`
      <div class="editor-container">
        <!-- 1. CORE & LAYOUT -->
        ${this._renderSection("core", "📦", "Core & Layout", zi, e)}

        <!-- 2. APPEARANCE & THEMING -->
        ${this._renderSection("appearance", "🎨", "Appearance & Theming", Ii, e)}

        <!-- 3. SLIDERS & CONTROLS -->
        ${this._renderSection("controls", "🎛️", "Sliders & Interactive Controls", Oi, e)}

        <!-- 4. SPACING, PADDING & SIZING -->
        ${this._renderSection("spacing", "📏", "Spacing, Padding & Sizing", Ui, e)}

        <!-- 5. TYPOGRAPHY & LIVE SCROLLING -->
        ${this._renderSection("typography", "✍️", "Typography & Live Scrolling", Fi, e)}

        <!-- 6. CONSOLIDATED SUB-BUTTONS (1-4) -->
        <div class="custom-panel ${a ? "open" : ""}">
          <div class="panel-header" @click=${() => this._togglePanel("sub_buttons")}>
            <div class="header-left">
              <span class="header-icon">🔘</span>
              <span class="header-title">Sub-Buttons (1 – 4)</span>
            </div>
            <ha-icon class="chevron-icon ${a ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
          </div>
          ${a ? $`
            <div class="panel-body sub-buttons-master">
              <div class="section-subtitle">Global Sub-Button Layout</div>
              <ha-form
                .hass=${this.hass}
                .data=${e}
                .schema=${Tt}
                .computeLabel=${this._computeLabel}
                @value-changed=${(s) => this._valueChanged(s, Tt)}
              ></ha-form>
              
              <div class="sub-buttons-nested-list">
                ${this._renderSubButtonPanel(1, t, Gi, e)}
                ${this._renderSubButtonPanel(2, o, Wi, e)}
                ${this._renderSubButtonPanel(3, r, Vi, e)}
                ${this._renderSubButtonPanel(4, n, Yi, e)}
              </div>
            </div>
          ` : b}
        </div>

        <!-- 7. ACTIONS & CUSTOM STYLESHEET -->
        ${this._renderSection("actions", "⚡", "Actions & Scoped CSS", qi, e)}
      </div>
    `;
  }
  static get styles() {
    return Ht`
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
ot([
  Be({ attribute: !1 })
], ze.prototype, "hass");
ot([
  Re()
], ze.prototype, "_config");
ot([
  Re()
], ze.prototype, "_openPanels");
customElements.get("antigravity-with-icon-card-editor") || customElements.define("antigravity-with-icon-card-editor", ze);
var Xi = Object.defineProperty, Zi = Object.getOwnPropertyDescriptor, K = (i, e, t, o) => {
  for (var r = o > 1 ? void 0 : o ? Zi(e, t) : e, n = i.length - 1, a; n >= 0; n--)
    (a = i[n]) && (r = (o ? a(e, t, r) : a(r)) || r);
  return o && r && Xi(e, t, r), r;
};
const Qi = "110";
console.info(
  `%c 🚀 ANTIGRAVITY-CARD (WITH-ICON) %c v${Qi} `,
  "color: white; background: #6200ea; font-weight: 700; padding: 2px 6px; border-radius: 4px 0 0 4px;",
  "color: #6200ea; background: #ede7f6; font-weight: 700; padding: 2px 6px; border-radius: 0 4px 4px 0;"
);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "antigravity-with-icon-card",
  name: "Antigravity Card (With Icon)",
  preview: !0,
  description: "A custom card merging Bubble Card styling with Mushroom Card controls, full icon customizations, and multi-stage fade transitions."
});
customElements.get("antigravity-with-icon-card");
const Ji = /* @__PURE__ */ new Set([
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
  "heat_pump"
]), ji = /* @__PURE__ */ new Set([
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
]), Ot = /^\d+\s*,\s*\d+\s*,\s*\d+$/, eo = /^\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+$/;
function D(i) {
  const e = Math.max(1e3, Math.min(4e4, i)) / 100;
  let t, o, r;
  if (e <= 66)
    t = 255;
  else {
    const n = e - 60;
    t = 329.698727446 * Math.pow(n, -0.1332047592), t = Math.max(0, Math.min(255, t));
  }
  if (e <= 66)
    o = e, o = 99.4708025861 * Math.log(o) - 161.1195681661, o = Math.max(0, Math.min(255, o));
  else {
    const n = e - 60;
    o = 288.1221695283 * Math.pow(n, -0.0755148492), o = Math.max(0, Math.min(255, o));
  }
  if (e >= 66)
    r = 255;
  else if (e <= 19)
    r = 0;
  else {
    const n = e - 10;
    r = 138.5177312231 * Math.log(n) - 305.0447927307, r = Math.max(0, Math.min(255, r));
  }
  return [Math.round(t), Math.round(o), Math.round(r)];
}
function Mt(i) {
  return !Array.isArray(i) || i.length < 3 ? "#ffffff" : "#" + i.slice(0, 3).map((e) => Math.round(Number(e) || 0).toString(16).padStart(2, "0")).join("");
}
function to(i, e, t) {
  i /= 255, e /= 255, t /= 255;
  const o = Math.max(i, e, t), r = Math.min(i, e, t);
  let n = 0;
  const a = o - r;
  if (a === 0) return 0;
  switch (o) {
    case i:
      n = (e - t) / a + (e < t ? 6 : 0);
      break;
    case e:
      n = (t - i) / a + 2;
      break;
    case t:
      n = (i - e) / a + 4;
      break;
  }
  return Math.round(n * 60);
}
function Pt(i, e) {
  i = i % 360 / 360, e = Math.max(0, Math.min(100, e)) / 100;
  const t = 1, o = Math.floor(i * 6), r = i * 6 - o, n = t * (1 - e), a = t * (1 - r * e), s = t * (1 - (1 - r) * e);
  let l = 0, _ = 0, c = 0;
  switch (o % 6) {
    case 0:
      l = t, _ = s, c = n;
      break;
    case 1:
      l = a, _ = t, c = n;
      break;
    case 2:
      l = n, _ = t, c = s;
      break;
    case 3:
      l = n, _ = a, c = t;
      break;
    case 4:
      l = s, _ = n, c = t;
      break;
    case 5:
      l = t, _ = n, c = a;
      break;
  }
  return [Math.round(l * 255), Math.round(_ * 255), Math.round(c * 255)];
}
const Ze = [
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
], io = [
  { k: 2200, label: "2200K", rgb: D(2200) },
  { k: 2700, label: "2700K", rgb: D(2700) },
  { k: 3e3, label: "3000K", rgb: D(3e3) },
  { k: 4e3, label: "4000K", rgb: D(4e3) },
  { k: 5e3, label: "5000K", rgb: D(5e3) },
  { k: 6500, label: "6500K", rgb: D(6500) }
];
function ue(i) {
  if (!i) return null;
  const e = i.trim().toLowerCase();
  if (!e) return null;
  if (e.startsWith("#")) {
    const t = e.slice(1);
    if (t.length === 3)
      return [
        parseInt(t[0] + t[0], 16),
        parseInt(t[1] + t[1], 16),
        parseInt(t[2] + t[2], 16)
      ];
    if (t.length >= 6)
      return [
        parseInt(t.slice(0, 2), 16),
        parseInt(t.slice(2, 4), 16),
        parseInt(t.slice(4, 6), 16)
      ];
  }
  if (e.startsWith("rgb")) {
    const t = e.indexOf("("), o = e.lastIndexOf(")");
    if (t !== -1 && o !== -1) {
      const r = e.slice(t + 1, o).split(",").map((n) => parseFloat(n.trim()));
      if (r.length >= 3 && !r.slice(0, 3).some(isNaN))
        return [
          Math.max(0, Math.min(255, Math.round(r[0]))),
          Math.max(0, Math.min(255, Math.round(r[1]))),
          Math.max(0, Math.min(255, Math.round(r[2])))
        ];
    }
  }
  if (Ot.test(e)) {
    const t = e.split(",").map((o) => parseInt(o.trim(), 10));
    if (t.length >= 3 && !t.some(isNaN))
      return [t[0], t[1], t[2]];
  }
  for (let t = 0; t < Ze.length; t++) {
    const o = Ze[t];
    if (e === o.label.toLowerCase() || e === o.hex)
      return [o.rgb[0], o.rgb[1], o.rgb[2]];
  }
  return null;
}
function Ke(i, e, t) {
  const o = Math.max(0, Math.min(1, t));
  return [
    Math.round(i[0] + (e[0] - i[0]) * o),
    Math.round(i[1] + (e[1] - i[1]) * o),
    Math.round(i[2] + (e[2] - i[2]) * o)
  ];
}
function Et(i) {
  return `rgb(${i[0]}, ${i[1]}, ${i[2]})`;
}
const Me = Object.freeze({
  enabled: !1,
  activeFade: !1,
  currentColor: "",
  progressPct: 0,
  remainingSeconds: 0,
  currentStage: 0,
  stageLabel: ""
});
function E(i, e = !0) {
  if (e)
    try {
      he(i);
    } catch {
    }
}
const Q = /* @__PURE__ */ new Map(), Lt = 250;
function oo(i) {
  if (!i) return "";
  const e = Q.get(i);
  if (e !== void 0) return e;
  const t = i.trim();
  if (!t)
    return Q.set(i, ""), "";
  let o = t;
  if (t.startsWith("#") || t.startsWith("rgb") || t.startsWith("hsl") || t.startsWith("var(") ? o = t : Ot.test(t) ? o = `rgb(${t})` : eo.test(t) ? o = `rgba(${t})` : t.toLowerCase() === "state" ? o = "var(--state-icon-color, var(--primary-color))" : ji.has(t.toLowerCase()) && (o = `var(--${t.toLowerCase()}-color, ${t.toLowerCase()})`), Q.size >= Lt) {
    const r = Math.floor(Lt / 4), n = Q.keys();
    for (let a = 0; a < r; a++) {
      const s = n.next().value;
      s !== void 0 && Q.delete(s);
    }
  }
  return Q.set(i, o), o;
}
let B = class extends j {
  constructor() {
    super(...arguments), this._previousLiveRgb = null, this._currentLiveRgb = null, this._lastTrackedState = null, this.preview = !1, this._collapsed = !0, this._holdTimer = null, this._held = !1, this._moved = !1, this._tapTimer = null, this._throttleMap = /* @__PURE__ */ new Map(), this._startX = 0, this._startY = 0, this._subHoldTimer = null, this._subHeld = !1, this._subMoved = !1, this._subStartX = 0, this._subStartY = 0, this._subTapTimerMap = /* @__PURE__ */ new Map(), this._monitoredEntities = [], this._staticCardStyles = "", this._staticCardClasses = "", this._textOffsetStyle = "", this._iconOffsetStyle = "", this._featuresOffsetStyle = "", this._mainSliderMarginOffsets = "", this._textBoxWidth = "", this._primaryTextStyle = "", this._secondaryTextStyle = "", this._relativeTimer = null, this._cachedSubButtons = null, this._intersectionObserver = null, this._cachedHasCollapsible = !1, this._canceled = !1, this._subCanceled = !1, this._subPointerDownTime = 0, this._sliderStateMap = /* @__PURE__ */ new WeakMap(), this._onSliderPointerDown = (i) => {
      const e = i.currentTarget;
      if (!e) return;
      const o = e.closest(".slider-container, .sub-button-slider-container")?.querySelector(".slider-percent-badge, .sub-slider-pct"), r = Number(e.value) || 0, n = e.style.getPropertyValue("--slider-pct") || "", a = o?.textContent || "";
      this._sliderStateMap.set(e, {
        startX: i.clientX,
        startY: i.clientY,
        initialVal: r,
        initialPct: n,
        initialBadge: a,
        isScrolling: !1,
        isSliding: !1
      });
    }, this._onSliderPointerMove = (i) => {
      const e = i.currentTarget;
      if (!e) return;
      const t = this._sliderStateMap.get(e);
      if (!t) return;
      const o = Math.abs(i.clientX - t.startX), r = Math.abs(i.clientY - t.startY);
      !t.isSliding && !t.isScrolling ? r > 6 && r > o ? (t.isScrolling = !0, this._revertSlider(e, t)) : o > 6 && o >= r && (t.isSliding = !0) : t.isScrolling && this._revertSlider(e, t);
    }, this._onSliderPointerCancel = (i) => {
      const e = i.currentTarget;
      if (!e) return;
      const t = this._sliderStateMap.get(e);
      t && (t.isScrolling = !0, this._revertSlider(e, t), this._sliderStateMap.delete(e));
    }, this._onSliderPointerUp = (i) => {
      const e = i.currentTarget;
      if (!e) return;
      const t = this._sliderStateMap.get(e);
      if (t) {
        if (t.isScrolling) {
          this._revertSlider(e, t), this._sliderStateMap.delete(e);
          return;
        }
        if (this.config.tap_slider_to_toggle && !t.isSliding) {
          const o = Math.abs(i.clientX - t.startX), r = Math.abs(i.clientY - t.startY);
          o < 6 && r < 6 && (this._revertSlider(e, t), E("light", this.config.haptic_feedback !== !1), Ct(this, this.hass, this.config, "tap"));
        }
      }
    };
  }
  // --- SECTIONS LAYOUT SUPPORT ---
  getGridOptions() {
    const i = this.config?.card_layout === "large";
    return {
      columns: { min: 2, default: 4, max: 6 },
      rows: { min: 1, default: i ? 2 : 1, max: 4 }
    };
  }
  // --- CARD SIZE FOR MASONRY/PANEL VIEWS ---
  getCardSize() {
    return this.config?.card_layout === "large" ? 3 : 2;
  }
  static getStubConfig() {
    return { ...Xe };
  }
  static async getConfigElement() {
    return document.createElement("antigravity-with-icon-card-editor");
  }
  setConfig(i) {
    if (!i)
      throw new Error("Invalid configuration");
    this.config = {
      ...Xe,
      ...i
    }, this._cachedSubButtons = null;
    const e = [];
    this.config.entity && e.push(this.config.entity), this.config.sub_button_1_entity && e.push(this.config.sub_button_1_entity), this.config.sub_button_2_entity && e.push(this.config.sub_button_2_entity), this.config.sub_button_3_entity && e.push(this.config.sub_button_3_entity), this.config.sub_button_4_entity && e.push(this.config.sub_button_4_entity), this._monitoredEntities = e, this._computeStaticStylesAndClasses();
  }
  _computeStaticStylesAndClasses() {
    if (!this.config) return;
    const i = this.config.card_padding ?? 12, e = this.config.card_padding_vertical ?? 4, t = this.config.card_padding_horizontal ?? i, o = this.config.card_padding_top ?? e, r = this.config.card_padding_bottom ?? e, n = this.config.card_padding_left ?? t, a = this.config.card_padding_right ?? t, s = this.config.card_margin, l = this.config.card_margin_vertical ?? s, _ = this.config.card_margin_horizontal ?? s, c = this.config.card_margin_top ?? l, d = this.config.card_margin_bottom ?? l, u = this.config.card_margin_left ?? _, g = this.config.card_margin_right ?? _;
    let f = "";
    (c !== void 0 || d !== void 0 || u !== void 0 || g !== void 0) && (f = `margin: ${c ?? 0}px ${g ?? 0}px ${d ?? 0}px ${u ?? 0}px;`);
    const w = this.config.border_radius ?? 12, p = this.config.slider_style === "google", k = this.config.slider_style === "full", m = p ? 42 : k ? 40 : 12, S = p ? 21 : k ? 15 : 6;
    let v = "";
    this.config.card_width && (v += `width: ${this.config.card_width}; `), this.config.card_max_width && (v += `max-width: ${this.config.card_max_width}; `), this.config.card_height && (v += `height: ${this.config.card_height}; `), this.config.card_min_height !== void 0 && this.config.card_min_height > 0 && (v += `min-height: ${this.config.card_min_height}px; `);
    let x = "";
    this.config.card_border_width && this.config.card_border_width > 0 && this.config.card_border_style && this.config.card_border_style !== "none" && (x = `border: ${this.config.card_border_width}px ${this.config.card_border_style} ${this._resolveColor(this.config.card_border_color) || "var(--divider-color)"};`);
    const C = this.config.backdrop_blur ? `backdrop-filter: blur(${this.config.backdrop_blur}px); -webkit-backdrop-filter: blur(${this.config.backdrop_blur}px);` : "", h = this.config.fill_container ? "height: 100%;" : "", y = this.config.overflow_hidden !== !1 ? "overflow: hidden;" : "overflow: visible;", T = this.config.aspect_ratio ? `aspect-ratio: ${this.config.aspect_ratio};` : "", L = this.config.card_opacity !== void 0 && this.config.card_opacity < 100 ? `opacity: ${this.config.card_opacity / 100};` : "", N = this.config.transition_duration ?? 300, I = N > 0 ? `transition: background ${N}ms ease-out, box-shadow ${N}ms ease-out, border-color ${N}ms ease-out, opacity ${N}ms ease-out;` : "transition: none;", be = `--ag-sub-btn-align: ${this.config.sub_button_alignment ?? "flex-end"};`, Ie = `--ag-full-slider-opacity: ${(this.config.full_slider_opacity ?? 30) / 100};`, ve = `--ag-marquee-speed: ${this.config.text_scrolling_speed ?? 10}s;`, Oe = this.config.icon_padding !== void 0 ? `--ag-icon-padding: ${this.config.icon_padding}px;` : "", ye = this.config.text_padding_vertical ?? this.config.text_padding ?? 0, xe = this.config.text_padding_horizontal ?? this.config.text_padding ?? 0, $e = this.config.text_padding !== void 0 || this.config.text_padding_vertical !== void 0 || this.config.text_padding_horizontal !== void 0 ? `--ag-text-padding: ${ye}px ${xe}px;` : "", we = this.config.features_padding_vertical ?? this.config.features_padding ?? 0, Se = this.config.features_padding_horizontal ?? this.config.features_padding ?? 0, ke = this.config.features_padding !== void 0 || this.config.features_padding_vertical !== void 0 || this.config.features_padding_horizontal !== void 0 ? `--ag-features-padding: ${we}px ${Se}px;` : "", H = this.config.sub_button_container_padding !== void 0 ? `--ag-sub-btn-container-padding: ${this.config.sub_button_container_padding}px;` : "";
    this._staticCardStyles = [
      v,
      `border-radius: ${w}px;`,
      `padding: ${o}px ${a}px ${r}px ${n}px;`,
      x,
      C,
      h,
      y,
      T,
      L,
      I,
      f,
      Oe,
      $e,
      ke,
      H,
      `--ag-slider-height: ${this.config.slider_height ?? m}px;`,
      `--ag-slider-radius: ${this.config.slider_border_radius ?? S}px;`,
      `--ag-content-spacing: ${this.config.content_spacing ?? 12}px;`,
      `--ag-text-spacing: ${this.config.text_spacing ?? 0}px;`,
      `--ag-features-margin: ${this.config.features_margin ?? 4}px;`,
      `--ag-slider-spacing: ${this.config.slider_spacing ?? 4}px;`,
      `--ag-icon-margin: ${this.config.icon_margin ?? 0}px;`,
      `--ag-sub-button-spacing: ${this.config.sub_button_spacing ?? 8}px;`,
      `--ag-sub-button-padding: ${this.config.sub_button_padding ?? 6}px;`,
      `--ag-badge-size: ${this.config.badge_size ?? 16}px;`,
      `--ag-badge-offset: ${this.config.badge_offset ?? -2}px;`,
      `--ag-content-alignment: ${this.config.content_alignment ?? "flex-start"};`,
      `--ag-text-alignment: ${this.config.text_alignment ?? "left"};`,
      be,
      ve,
      Ie
    ].filter(Boolean).join(" "), this._staticCardClasses = [
      `layout-${this.config.layout}`,
      this.config.card_layout === "large" ? "card-large" : "",
      `theme-${this.config.theme_preset ?? "default"}`,
      `hover-${this.config.hover_effect ?? "none"}`,
      `slider-style-${this.config.slider_style ?? "circle"}`,
      this.config.text_color_mode === "inverse" ? "text-color-mode-inverse" : ""
    ].filter(Boolean).join(" ");
    const ie = Number(this.config.text_offset_x) || 0, oe = Number(this.config.text_offset_y) || 0;
    this._textOffsetStyle = ie !== 0 || oe !== 0 ? `transform: translate(${ie}px, ${oe}px);` : "";
    const re = Number(this.config.icon_offset_x) || 0, ne = Number(this.config.icon_offset_y) || 0;
    this._iconOffsetStyle = re !== 0 || ne !== 0 ? `transform: translate(${re}px, ${ne}px);` : "";
    const ae = Number(this.config.features_offset_x) || 0, se = Number(this.config.features_offset_y) || 0;
    this._featuresOffsetStyle = ae !== 0 || se !== 0 ? `transform: translate(${ae}px, ${se}px);` : "";
    const Ce = Number(this.config.slider_start_offset) || 0, Te = Number(this.config.slider_end_offset) || 0;
    this._mainSliderMarginOffsets = [
      Ce ? `margin-left: ${Ce}px !important;` : "",
      Te ? `margin-right: ${Te}px !important;` : ""
    ].filter(Boolean).join(" "), this._textBoxWidth = this.config.text_box_width ? `max-width: ${this.config.text_box_width}; width: ${this.config.text_box_width};` : "width: 100%; max-width: 100%;";
    const Ue = this.config.text_transform_primary && this.config.text_transform_primary !== "none" ? `text-transform: ${this.config.text_transform_primary};` : "", M = `text-transform: ${this.config.text_transform_secondary ?? "capitalize"};`, R = this.config.letter_spacing ? `letter-spacing: ${this.config.letter_spacing}px;` : "", le = this.config.line_height ? `line-height: ${this.config.line_height};` : "", O = this.config.font_weight_primary ?? "bold";
    this._primaryTextStyle = `font-size: ${this.config.font_size_primary ?? 14}px; font-weight: ${O}; ${Ue} ${R} ${le}`, this._secondaryTextStyle = `font-size: ${this.config.font_size_secondary ?? 12}px; ${M} ${R} ${le}`;
  }
  // --- PERFORMANCE: Zero-allocation re-render check ---
  shouldUpdate(i) {
    if (!this.config || !this.hass || i.has("config") || i.has("preview") || i.has("_collapsed")) return !0;
    const e = i.get("hass");
    if (!e || e.themes !== this.hass.themes || e.locale !== this.hass.locale || e.language !== this.hass.language || e.config !== this.hass.config)
      return !0;
    const t = this._monitoredEntities;
    for (let o = 0; o < t.length; o++) {
      const r = t[o];
      if (e.states[r] !== this.hass.states[r])
        return !0;
    }
    return !1;
  }
  _getSubButtons() {
    if (this._cachedSubButtons) return this._cachedSubButtons;
    const i = this.config.entity, e = [];
    for (let t = 1; t <= 4; t++) {
      const o = this.config[`sub_button_${t}_entity`], r = this.config[`sub_button_${t}_icon`], n = this.config[`sub_button_${t}_name`], a = this.config[`sub_button_${t}_tap_action`], s = this.config[`sub_button_${t}_hold_action`], l = this.config[`sub_button_${t}_double_tap_action`], _ = this.config[`sub_button_${t}_type`], c = this.config[`sub_button_${t}_color`], d = this.config[`sub_button_${t}_show_background`], u = this.config[`sub_button_${t}_show_state`];
      if (!!(o || r || n || _ && _ !== "button" || u)) {
        const f = o || i;
        e.push({
          key: `${f || "sub"}_${t}`,
          entity: f,
          type: _ || "button",
          icon: r,
          color: c,
          bg: d,
          name: n,
          showState: u === !0,
          tapAction: a,
          holdAction: s,
          doubleTapAction: l
        });
      }
    }
    return this._cachedSubButtons = e, this._cachedSubButtons;
  }
  _hasCollapsible() {
    return this._cachedHasCollapsible;
  }
  _recomputeHasCollapsible() {
    if (!this.hass || !this.config || !this.config.entity) {
      this._cachedHasCollapsible = !1;
      return;
    }
    const i = this.hass.states[this.config.entity];
    if (!i) {
      this._cachedHasCollapsible = !1;
      return;
    }
    const t = this.config.entity.split(".")[0] === "light", o = i.state === "on", r = this.config.hide_color_temp_when_off !== !1, n = this.config.hide_color_picker_when_off !== !1, a = this.config.hide_color_slider_when_off !== !1, s = i.attributes?.color_temp_kelvin ?? i.attributes?.color_temp, l = t && this.config.show_color_temp === !0 && (s !== void 0 || i.attributes?.supported_color_modes?.some((p) => ["color_temp"].includes(p))) && (!r || o), _ = i.attributes?.supported_color_modes, c = Array.isArray(_) && _.some((p) => ["hs", "xy", "rgb", "rgbw", "rgbww"].includes(p)), d = this.config.color_picker_type !== "wheel", u = t && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && d) && c && (!a || o), g = t && this.config.show_color_picker === !0 && !d && c && (!n || o), f = l || u || g, w = this._getSubButtons();
    this._cachedHasCollapsible = f || w.length > 0;
  }
  connectedCallback() {
    super.connectedCallback(), this._setupRelativeTimer(), this._setupIntersectionObserver();
  }
  _setupIntersectionObserver() {
    typeof IntersectionObserver > "u" || this._intersectionObserver || (this._intersectionObserver = new IntersectionObserver((i) => {
      for (const e of i)
        e.isIntersecting ? this.removeAttribute("offscreen") : this.setAttribute("offscreen", "");
    }, { threshold: 0 }), this._intersectionObserver.observe(this));
  }
  _setupRelativeTimer() {
    const i = this.config?.primary_info, e = this.config?.secondary_info, t = this.config?.entity, o = t ? t.split(".")[0] : "", r = (o === "binary_sensor" || o === "timer") && (i === "state" || e === "state"), n = this.config?.fade_transition_enabled === !0, a = n || r || i === "last-changed" || i === "last_changed" || i === "last-updated" || i === "last_updated" || i === "last-triggered" || e === "last-changed" || e === "last_changed" || e === "last-updated" || e === "last_updated" || e === "last-triggered";
    if (a && !this._relativeTimer) {
      const s = n ? 1e3 : 5e3;
      this._relativeTimer = setInterval(() => {
        !this.hasAttribute("offscreen") && this.style.display !== "none" && this.requestUpdate();
      }, s);
    } else !a && this._relativeTimer && (clearInterval(this._relativeTimer), this._relativeTimer = null);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._throttleMap.clear(), this._subTapTimerMap.forEach((i) => clearTimeout(i)), this._subTapTimerMap.clear(), this._intersectionObserver && (this._intersectionObserver.disconnect(), this._intersectionObserver = null), this._relativeTimer && (clearInterval(this._relativeTimer), this._relativeTimer = null), this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null), this._tapTimer && (clearTimeout(this._tapTimer), this._tapTimer = null), this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
  }
  firstUpdated(i) {
    super.firstUpdated(i);
  }
  updated(i) {
    if (super.updated(i), this._updateVisibility(), i.has("config") || i.has("_collapsed"))
      this._recomputeHasCollapsible(), this._setupRelativeTimer();
    else if (i.has("hass") && this.config?.entity) {
      const e = i.get("hass");
      (!e || e.states[this.config.entity] !== this.hass.states[this.config.entity]) && this._recomputeHasCollapsible();
    }
  }
  _toggleDisplay(i) {
    if (this.preview) {
      this.style.display === "none" && this.style.removeProperty("display"), this.hidden = !1;
      return;
    }
    i ? (this.style.setProperty("display", "none", "important"), this.hidden = !0) : (this.style.display === "none" && this.style.removeProperty("display"), this.hidden = !1);
  }
  _updateVisibility() {
    if (!this.config || !this.hass) return;
    const i = this.config.visibility_state;
    if (!i || i === "always") {
      this._toggleDisplay(!1);
      return;
    }
    const e = this.config.entity, t = e ? this.hass.states[e] : void 0;
    if (!t) {
      this._toggleDisplay(!1);
      return;
    }
    const o = t.state === "on" || this._isEntityActive(t);
    let r = !1;
    (i === "on" && !o || i === "off" && o) && (r = !0), this._toggleDisplay(r);
  }
  _isEntityActive(i) {
    return i ? Ji.has(i.state) : !1;
  }
  _calculateMultiStageFade(i, e, t) {
    if (!this.config?.fade_transition_enabled || !i)
      return Me;
    const o = this._isEntityActive(i), r = this.config.fade_trigger ?? "on_inactive";
    if (!(r === "on_inactive" && !o || r === "on_active" && o || r === "both"))
      return Me;
    const a = o ? this._resolveColor(this.config.inactive_color) || t || "#4caf50" : this._resolveColor(this.config.active_color) || e || "#d60000", s = o ? this._resolveColor(this.config.active_color) || e || "#d60000" : this._resolveColor(this.config.inactive_color) || t || "#03b100", l = ue(a) || [214, 0, 0], _ = ue(s) || [3, 177, 0], c = Number(this.config.fade_stage_1_duration) ?? 60, d = Number(this.config.fade_stage_2_duration) ?? 600, u = Number(this.config.fade_stage_3_duration) ?? 1800;
    this._lastTrackedState !== null && this._lastTrackedState !== i.state && this._currentLiveRgb && this.config.fade_smooth_retrigger !== !1 && (this._previousLiveRgb = this._currentLiveRgb), this._lastTrackedState = i.state;
    const g = this.config.fade_stage_1_pickup !== !1 && this._previousLiveRgb && this.config.fade_smooth_retrigger !== !1 ? this._previousLiveRgb : l, f = ue(this.config.fade_stage_1_color) || [255, 152, 0], w = this.config.fade_stage_2_pickup !== !1 ? f : l, p = ue(this.config.fade_stage_2_color) || [205, 220, 57], k = this.config.fade_stage_3_pickup !== !1 ? p : f, m = ue(this.config.fade_stage_3_color) || _, S = c + d + u;
    if (S <= 0)
      return Me;
    const v = this._parseDate(i.last_changed || i.last_updated);
    if (!v)
      return Me;
    const x = Math.max(0, (Date.now() - v.getTime()) / 1e3);
    if (x >= S)
      return this._currentLiveRgb = m, this._previousLiveRgb = null, {
        enabled: !0,
        activeFade: !1,
        currentColor: Et(m),
        progressPct: 100,
        remainingSeconds: 0,
        currentStage: 0,
        stageLabel: "Resting"
      };
    let C, h = 1, y = 0;
    const T = Math.max(0, Math.round(S - x));
    x < c && c > 0 ? (h = 1, y = x / c, C = Ke(g, f, y)) : x < c + d && d > 0 ? (h = 2, y = (x - c) / d, C = Ke(w, p, y)) : u > 0 ? (h = 3, y = (x - c - d) / u, C = Ke(k, m, y)) : (h = 0, C = m), this._currentLiveRgb = C;
    const L = Math.min(100, Math.round(x / S * 100)), N = Et(C);
    let I = "";
    return T >= 60 ? I = `${Math.ceil(T / 60)}m left` : I = `${T}s left`, {
      enabled: !0,
      activeFade: !0,
      currentColor: N,
      progressPct: L,
      remainingSeconds: T,
      currentStage: h,
      stageLabel: I
    };
  }
  _resolveColor(i) {
    return oo(i);
  }
  // Shared date parser — eliminates duplication between _formatRelativeTime and _formatForDuration
  _parseDate(i) {
    if (!i) return null;
    if (i instanceof Date) return isNaN(i.getTime()) ? null : i;
    if (typeof i == "number") {
      const e = new Date(i > 1e11 ? i : i * 1e3);
      return isNaN(e.getTime()) ? null : e;
    }
    if (typeof i == "string") {
      let e = i.trim();
      e.includes(" ") && !e.includes("T") && (e = e.replace(" ", "T")), e.includes("T") && !e.endsWith("Z") && !/[+-]\d{2}:\d{2}$/.test(e) && !/[+-]\d{4}$/.test(e) && (e += "Z");
      const t = Number(e);
      let o;
      return !isNaN(t) && e !== "" && !e.includes("T") ? o = new Date(t > 1e11 ? t : t * 1e3) : o = new Date(e), isNaN(o.getTime()) ? null : o;
    }
    return null;
  }
  _formatTimeAgo(i, e = !1, t) {
    const o = this._parseDate(i);
    if (!o) return "";
    const r = Math.max(0, Math.round(((t ?? Date.now()) - o.getTime()) / 1e3));
    if (r < 5) return e ? "< 5 sec" : "just now";
    if (r < 60) return e ? `${r} sec` : `${r} seconds ago`;
    const n = Math.round(r / 60);
    if (n < 60) return e ? `${n} ${n === 1 ? "min" : "mins"}` : `${n} ${n === 1 ? "minute" : "minutes"} ago`;
    const a = Math.round(n / 60);
    if (a < 24) return `${a} ${a === 1 ? "hour" : "hours"}${e ? "" : " ago"}`;
    const s = Math.round(a / 24);
    if (s < 7) return `${s} ${s === 1 ? "day" : "days"}${e ? "" : " ago"}`;
    const l = Math.round(s / 7);
    if (l < 4) return `${l} ${l === 1 ? "week" : "weeks"}${e ? "" : " ago"}`;
    const _ = Math.round(s / 30);
    if (_ < 12) return `${_} ${_ === 1 ? "month" : "months"}${e ? "" : " ago"}`;
    const c = Math.round(s / 365);
    return `${c} ${c === 1 ? "year" : "years"}${e ? "" : " ago"}`;
  }
  _formatRelativeTime(i, e) {
    return this._formatTimeAgo(i, !1, e);
  }
  _formatForDuration(i, e) {
    return this._formatTimeAgo(i, !0, e);
  }
  _computeDynamicIcon(i) {
    if (!i) return;
    const e = (i.entity_id || "").split(".")[0], t = i.attributes?.device_class, o = i.state === "on";
    if (e === "lock")
      return i.state === "locked" ? "mdi:lock" : i.state === "jammed" ? "mdi:lock-alert" : i.state === "locking" || i.state === "unlocking" ? "mdi:lock-clock" : "mdi:lock-open-variant";
    if (e === "binary_sensor") {
      if (t === "door") return o ? "mdi:door-open" : "mdi:door-closed";
      if (t === "window") return o ? "mdi:window-open-variant" : "mdi:window-closed-variant";
      if (t === "garage_door") return o ? "mdi:garage-open" : "mdi:garage";
      if (t === "motion") return o ? "mdi:motion-sensor" : "mdi:motion-sensor-off";
      if (t === "occupancy") return o ? "mdi:home-account" : "mdi:home-outline";
      if (t === "presence") return o ? "mdi:account" : "mdi:account-outline";
      if (t === "opening") return o ? "mdi:lock-open" : "mdi:lock";
    }
    if (e === "light")
      return o ? "mdi:lightbulb" : "mdi:lightbulb-outline";
    if (e === "cover") {
      const r = i.state === "open" || i.state === "opening";
      return t === "garage" ? r ? "mdi:garage-open" : "mdi:garage" : t === "blind" || t === "shutter" ? r ? "mdi:window-shutter-open" : "mdi:window-shutter" : t === "curtain" ? r ? "mdi:curtains-open" : "mdi:curtains" : r ? "mdi:window-open" : "mdi:window-closed";
    }
    if (e === "fan")
      return o ? "mdi:fan" : "mdi:fan-off";
    if (e === "climate")
      return i.state === "heat" ? "mdi:fire" : i.state === "cool" ? "mdi:snowflake" : i.state === "dry" ? "mdi:water-percent" : i.state === "fan_only" ? "mdi:fan" : i.state === "auto" || i.state === "heat_cool" ? "mdi:thermostat-auto" : "mdi:thermostat";
    if (e === "media_player")
      return i.state === "playing" ? "mdi:play-circle" : i.state === "paused" ? "mdi:pause-circle" : "mdi:cast";
  }
  _getInfoContent(i, e) {
    if (!e) return "";
    switch ((i || "").toLowerCase().replace(/_/g, "-")) {
      case "name":
        return this.config.name || e.attributes.friendly_name || this.config.entity || "";
      case "state": {
        const o = (e.entity_id || "").split(".")[0];
        if (o === "timer" && e.state === "active" && e.attributes?.finishes_at) {
          const r = Date.parse(e.attributes.finishes_at);
          if (!isNaN(r)) {
            const n = Math.max(0, Math.round((r - Date.now()) / 1e3)), a = Math.floor(n / 60), s = n % 60, l = Math.floor(a / 60), _ = (a % 60).toString().padStart(2, "0"), c = s.toString().padStart(2, "0");
            return l > 0 ? `${l}:${_}:${c}` : `${_}:${c}`;
          }
        }
        if (o === "binary_sensor")
          return this._formatForDuration(e.last_changed);
        if (o === "lock") {
          if (e.state === "locked") return "Locked";
          if (e.state === "unlocked") return "Unlocked";
          if (e.state === "jammed") return "Jammed (Alert!)";
          if (e.state === "locking") return "Locking...";
          if (e.state === "unlocking") return "Unlocking...";
        }
        if (o === "light" && e.state === "on") {
          const r = e.attributes?.brightness, n = r !== void 0 ? Math.round(r / 255 * 100) : 100;
          if (e.attributes?.color_temp_kelvin)
            return `${n}% • ${e.attributes.color_temp_kelvin}K`;
        }
        if (e.attributes?.device_class === "timestamp" || e.attributes?.device_class === "date" || typeof e.state == "string" && (e.state.includes("T") || e.state.match(/^\d{4}-\d{2}-\d{2}/)) && !isNaN(Date.parse(e.state))) {
          const r = this._formatRelativeTime(e.state);
          if (r) return r;
        }
        if (typeof this.hass.formatEntityState == "function")
          try {
            return this.hass.formatEntityState(e);
          } catch {
          }
        return `${e.state} ${e.attributes?.unit_of_measurement || ""}`.trim();
      }
      case "last-changed":
      case "last-changed-relative":
      case "relative-time": {
        const o = e.attributes?.last_triggered || e.last_changed;
        return this._formatForDuration(o);
      }
      case "last-updated":
      case "last-updated-relative":
        return this._formatForDuration(e.last_updated);
      case "last-triggered": {
        const o = e.attributes?.last_triggered || e.last_changed;
        return this._formatForDuration(o);
      }
      case "brightness": {
        const o = e.attributes?.brightness;
        return o !== void 0 ? `${Math.round(o / 255 * 100)}%` : "";
      }
      case "temperature": {
        const o = e.attributes?.temperature ?? e.attributes?.current_temperature, r = e.attributes?.unit_of_measurement || this.hass.config?.unit_system?.temperature || "°C";
        return o !== void 0 ? `${o} ${r}` : "";
      }
      case "humidity": {
        const o = e.attributes?.humidity ?? e.attributes?.current_humidity, r = e.attributes?.unit_of_measurement || "%";
        return o !== void 0 ? `${o}${r.startsWith("%") ? r : ` ${r}`}` : "";
      }
      case "battery": {
        const o = e.attributes?.battery_level ?? e.attributes?.battery ?? (e.attributes?.device_class === "battery" ? e.state : void 0);
        if (o !== void 0) {
          const r = Number(o);
          if (!isNaN(r)) {
            let n = "#4caf50";
            return r <= 20 ? n = "#f44336" : r <= 50 && (n = "#ff9800"), $`<span style="color: ${n}; font-weight: bold;">${r}%</span>`;
          }
          return `${o}%`;
        }
        return "";
      }
      case "none":
      default:
        return "";
    }
  }
  // _pointerDownTime: reserved for future gesture duration checks
  _dispatchAction(i, e, t) {
    const o = t || this.config.entity;
    let r = e;
    if (r || (i === "double_tap" ? r = this.config.double_tap_action : i === "hold" ? r = this.config.hold_action : r = this.config.tap_action || { action: "toggle" }), !(!r || r.action === "none")) {
      if (r.action === "more-info") {
        const n = r.entity || o;
        if (n) {
          this.dispatchEvent(new CustomEvent("hass-more-info", {
            detail: { entityId: n },
            bubbles: !0,
            composed: !0
          }));
          return;
        }
      }
      if (r.action === "toggle" && o) {
        const n = o.split(".")[0], a = n === "lock" ? this._isEntityActive(this.hass?.states[o]) ? "lock" : "unlock" : "toggle", s = ["lock", "cover"].includes(n) ? n : n === "group" ? "homeassistant" : n;
        this.hass?.callService(s, a, { entity_id: o });
        return;
      }
      if (r.action === "navigate" && r.navigation_path) {
        history.pushState(null, "", r.navigation_path), window.dispatchEvent(new CustomEvent("location-changed", {
          detail: { replace: !1 },
          bubbles: !0,
          composed: !0
        }));
        return;
      }
      if (r.action === "url" && r.url_path) {
        window.open(r.url_path, "_blank");
        return;
      }
      if (r.action === "call-service" && r.service) {
        const [n, a] = r.service.split(".", 2);
        this.hass?.callService(n, a, r.data || r.service_data || {}, r.target);
        return;
      }
      Ct(this, this.hass, { ...this.config, entity: o }, i);
    }
  }
  _handleTap(i) {
    if (i.stopPropagation(), this._isSubElement(i)) return;
    if (this._moved || this._canceled) {
      this._moved = !1, this._canceled = !1;
      return;
    }
    if (this._held) {
      this._held = !1;
      return;
    }
    const t = (this.config.collapse_controls_trigger || "hold") === "double_tap";
    if (!(t || this.config.double_tap_action && this.config.double_tap_action.action !== "none")) {
      E("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap");
      return;
    }
    if (this._tapTimer) {
      clearTimeout(this._tapTimer), this._tapTimer = null, E("medium", this.config.haptic_feedback !== !1), t && this._hasCollapsible() && (this._collapsed = !this._collapsed), this._dispatchAction("double_tap");
      return;
    }
    this._tapTimer = setTimeout(() => {
      this._tapTimer = null, E("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap");
    }, 250);
  }
  _handleKeyDown(i) {
    this._isSubElement(i) || (i.key === "Enter" || i.key === " ") && (i.preventDefault(), E("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap"));
  }
  _handleContextMenu(i) {
    if (i.preventDefault(), i.stopPropagation(), this._held) return;
    E("medium", this.config.haptic_feedback !== !1), (this.config.collapse_controls_trigger || "hold") === "hold" && this._hasCollapsible() ? this._collapsed = !this._collapsed : this.config.hold_action && this.config.hold_action.action !== "none" && this._dispatchAction("hold");
  }
  _handlePointerDown(i) {
    this._isSubElement(i) || (this._held = !1, this._moved = !1, this._canceled = !1, this._startX = i.clientX, this._startY = i.clientY, this._holdTimer = setTimeout(() => {
      if (this._moved || this._canceled) return;
      this._held = !0, this._holdTimer = null, this._tapTimer && (clearTimeout(this._tapTimer), this._tapTimer = null), E("heavy", this.config.haptic_feedback !== !1), (this.config.collapse_controls_trigger || "hold") === "hold" && this._hasCollapsible() ? this._collapsed = !this._collapsed : this.config.hold_action && this.config.hold_action.action !== "none" && this._dispatchAction("hold");
    }, 500));
  }
  _handlePointerMove(i) {
    this._isSubElement(i) || Math.hypot(i.clientX - this._startX, i.clientY - this._startY) > 8 && (this._moved = !0, this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null));
  }
  _handlePointerUp(i) {
    this._isSubElement(i) || this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null);
  }
  _handlePointerCancel(i) {
    this._isSubElement(i) || (this._canceled = !0, this._moved = !0, this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null));
  }
  _isSubElement(i) {
    const e = i.target;
    return e ? e.tagName === "INPUT" || e.hasAttribute("data-ag-sub") ? !0 : !!e.closest?.("[data-ag-sub], .sub-button, .sub-color-picker, .sub-button-slider-container, .slider-container, .slider-google-wrap, .sub-button-google-slider, .color-picker") : !1;
  }
  _handleSubPointerDown(i, e, t) {
    i.stopPropagation(), this._subHeld = !1, this._subMoved = !1, this._subCanceled = !1, this._subPointerDownTime = Date.now(), this._subStartX = i.clientX, this._subStartY = i.clientY, this._subHoldTimer = setTimeout(() => {
      this._subMoved || this._subCanceled || (this._subHeld = !0, this._subHoldTimer = null, E("heavy", this.config.haptic_feedback !== !1), this._dispatchAction("hold", t || { action: "more-info" }, e));
    }, 500);
  }
  _handleSubPointerMove(i) {
    i.stopPropagation(), Math.hypot(i.clientX - this._subStartX, i.clientY - this._subStartY) > 8 && (this._subMoved = !0, this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null));
  }
  _handleSubPointerUp(i) {
    i.stopPropagation(), this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
  }
  _handleSubPointerCancel(i) {
    i.stopPropagation(), this._subCanceled = !0, this._subMoved = !0, this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
  }
  _handleSubTap(i, e, t, o, r) {
    if (i.stopPropagation(), this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null), this._subMoved || this._subCanceled) {
      this._subMoved = !1, this._subCanceled = !1;
      return;
    }
    if (this._subHeld) {
      this._subHeld = !1;
      return;
    }
    if (this._subPointerDownTime && Date.now() - this._subPointerDownTime > 600)
      return;
    const n = o && o.action !== "none", a = e || "sub_default", s = () => {
      E("light", this.config.haptic_feedback !== !1), t && t.action && t.action !== "none" && t.action !== "default" ? this._dispatchAction("tap", t, e) : r ? r() : this._dispatchAction("tap", { action: "toggle" }, e);
    };
    if (!n) {
      s();
      return;
    }
    const l = this._subTapTimerMap.get(a);
    if (l) {
      clearTimeout(l), this._subTapTimerMap.delete(a), E("medium", this.config.haptic_feedback !== !1), this._dispatchAction("double_tap", o, e);
      return;
    }
    const _ = setTimeout(() => {
      this._subTapTimerMap.delete(a), s();
    }, 250);
    this._subTapTimerMap.set(a, _);
  }
  _handleSubContextMenu(i, e, t) {
    i.preventDefault(), i.stopPropagation(), !this._subHeld && (E("medium", this.config.haptic_feedback !== !1), this._dispatchAction("hold", t || { action: "more-info" }, e));
  }
  // --- THROTTLED SERVICE CALL HELPER ---
  _throttledCall(i, e) {
    const t = Date.now();
    t - (this._throttleMap.get(i) ?? 0) < 100 || (this._throttleMap.set(i, t), e());
  }
  _revertSlider(i, e) {
    i.value = String(e.initialVal), i.style.setProperty("--slider-pct", e.initialPct);
    const o = i.closest(".slider-container, .sub-button-slider-container")?.querySelector(".slider-percent-badge, .sub-slider-pct");
    o && (o.textContent = e.initialBadge);
  }
  _sliderInput(i, e, t, o, r, n, a) {
    i.stopPropagation();
    const s = i.target, l = this._sliderStateMap.get(s);
    if (l?.isScrolling) {
      this._revertSlider(s, l);
      return;
    }
    const _ = Number(s.value), c = isNaN(_) ? 0 : _, d = n ? n(c) : c;
    requestAnimationFrame(() => {
      if (l?.isScrolling) {
        this._revertSlider(s, l);
        return;
      }
      s.style.setProperty("--slider-pct", `${d}%`);
      const u = s.closest(".slider-container, .sub-button-slider-container"), g = u?.querySelector(".slider-percent-badge, .sub-slider-pct");
      if (g && (g.textContent = a ? a(c, d) : `${d}%`), e === "color_hue" && u) {
        u.style.setProperty("--color-hue-val", `hsl(${c}, 100%, 50%)`);
        const f = u.querySelector(".color-chip-badge span");
        f && (f.style.background = `hsl(${c}, 100%, 50%)`);
      }
    }), E("selection", this.config.haptic_feedback !== !1);
  }
  _sliderChange(i, e, t, o) {
    i.stopPropagation();
    const r = i.target, n = this._sliderStateMap.get(r);
    if (n?.isScrolling) {
      this._revertSlider(r, n), n.isScrolling = !1;
      return;
    }
    const a = Number(r.value), s = isNaN(a) ? 0 : a;
    if (!(n && s === n.initialVal)) {
      if (e === "light" && t === "turn_on") {
        const l = Math.round(s / 255 * 100);
        if (s <= 3 || l <= 1) {
          this.hass.callService("light", "turn_off", { entity_id: this.config.entity });
          return;
        }
      }
      if (e === "fan" && t === "set_percentage" && s <= 0) {
        this.hass.callService("fan", "turn_off", { entity_id: this.config.entity });
        return;
      }
      this.hass.callService(e, t, { entity_id: this.config.entity, ...o(s) });
    }
  }
  _getLightLiveColor(i) {
    if (!i || !i.attributes || i.state !== "on") return null;
    const e = i.attributes;
    if (e.color_mode === "color_temp") {
      const o = e.color_temp_kelvin ?? (e.color_temp ? Math.round(1e6 / e.color_temp) : 3e3), [r, n, a] = D(o);
      return `rgb(${r}, ${n}, ${a})`;
    }
    if (Array.isArray(e.rgb_color) && e.rgb_color.length >= 3)
      return `rgb(${e.rgb_color[0]}, ${e.rgb_color[1]}, ${e.rgb_color[2]})`;
    if (Array.isArray(e.hs_color) && e.hs_color.length >= 2) {
      const [o, r, n] = Pt(e.hs_color[0], e.hs_color[1]);
      return `rgb(${o}, ${r}, ${n})`;
    }
    if (Array.isArray(e.rgbw_color) && e.rgbw_color.length >= 3)
      return `rgb(${e.rgbw_color[0]}, ${e.rgbw_color[1]}, ${e.rgbw_color[2]})`;
    if (Array.isArray(e.rgbww_color) && e.rgbww_color.length >= 3)
      return `rgb(${e.rgbww_color[0]}, ${e.rgbww_color[1]}, ${e.rgbww_color[2]})`;
    if (e.color_temp_kelvin !== void 0 || e.color_temp !== void 0) {
      const o = e.color_temp_kelvin ?? Math.round(1e6 / e.color_temp), [r, n, a] = D(o);
      return `rgb(${r}, ${n}, ${a})`;
    }
    return i.state === "on" ? "var(--state-light-active-color, rgb(255, 205, 120))" : null;
  }
  _getLiveHex(i) {
    const e = this._getLightLiveColor(i);
    if (!e) return "#ffffff";
    const t = e.indexOf("rgb(");
    if (t !== -1) {
      const o = e.indexOf(")", t);
      if (o !== -1) {
        const r = e.slice(t + 4, o).split(",");
        if (r.length >= 3)
          return Mt([parseInt(r[0], 10), parseInt(r[1], 10), parseInt(r[2], 10)]);
      }
    }
    return i?.attributes && Array.isArray(i.attributes.rgb_color) && i.attributes.rgb_color.length >= 3 ? Mt(i.attributes.rgb_color) : "#ffffff";
  }
  _getLiveHue(i) {
    if (!i) return 0;
    if (Array.isArray(i.attributes?.hs_color) && i.attributes.hs_color.length >= 1)
      return Math.round(i.attributes.hs_color[0]) % 360;
    if (Array.isArray(i.attributes?.rgb_color) && i.attributes.rgb_color.length >= 3) {
      const [e, t, o] = i.attributes.rgb_color;
      return to(e, t, o);
    }
    return 0;
  }
  _handleColorInput(i, e, t, o) {
    i.stopPropagation();
    const r = i.target.value;
    if (!r || r.length < 7) return;
    const n = parseInt(r.slice(1, 3), 16), a = parseInt(r.slice(3, 5), 16), s = parseInt(r.slice(5, 7), 16);
    if (isNaN(n) || isNaN(a) || isNaN(s)) return;
    const l = t || this.config.entity, _ = () => {
      this.hass.callService("light", "turn_on", { entity_id: l, rgb_color: [n, a, s] });
    };
    e ? this._throttledCall(o || "color_picker", _) : _();
  }
  // --- RENDER ---
  render() {
    if (!this.config || !this.hass)
      return $``;
    const i = this.config.entity;
    if (!i)
      return $`
        <ha-card class="warning-card">
          <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
          <span>Please configure an entity in the visual editor.</span>
        </ha-card>
      `;
    const e = this.hass.states[i];
    if (!e)
      return $`
        <ha-card class="warning-card">
          <ha-icon icon="mdi:help-circle-outline"></ha-icon>
          <span>Entity not found: <code>${i}</code></span>
        </ha-card>
      `;
    const t = this.config.show_name !== !1 ? this._getInfoContent(this.config.primary_info, e) : "", o = this.config.show_state !== !1 ? this._getInfoContent(this.config.secondary_info, e) : "", r = this._isEntityActive(e), n = i.split(".")[0], a = this.config.icon_type ?? "icon", s = this.config.show_icon !== !1 && a !== "none", l = `shape-${this.config.icon_shape ?? "circle"}`, _ = this.config.icon_animation && this.config.icon_animation !== "none" ? `anim-${this.config.icon_animation}` : "";
    let c = "var(--primary-color)", d = null;
    n === "climate" ? e.state === "heat" ? c = "var(--state-climate-heat-color, #ff7043)" : e.state === "cool" ? c = "var(--state-climate-cool-color, #42a5f5)" : e.state === "dry" ? c = "var(--state-climate-dry-color, #ab47bc)" : e.state === "fan_only" && (c = "var(--state-climate-fan_only-color, #26a69a)") : n === "light" && (d = this._getLightLiveColor(e), d && (c = d));
    const u = this.config.color_type === "card";
    let g = this._resolveColor(this.config.active_color);
    (!g || this.config.use_light_color) && (n === "light" && d && (this.config.use_light_color || !this.config.active_color) ? g = d : g = c);
    const f = this._resolveColor(this.config.inactive_color) || "var(--secondary-background-color, rgba(150, 150, 150, 0.2))", w = u ? "transparent" : r ? g : f, p = this.config.icon_color ? `color: ${this._resolveColor(this.config.icon_color)};` : u && r ? "color: #ffffff; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.4));" : "", k = this.config.icon_opacity !== void 0 && this.config.icon_opacity < 100 ? `opacity: ${this.config.icon_opacity / 100};` : "", m = this.config.icon_rotate && this.config.icon_rotate !== 0 ? `transform: rotate(${this.config.icon_rotate}deg);` : "", S = this.config.show_slider !== !1, v = n === "light", x = n === "cover", C = n === "fan", h = n === "humidifier", y = n === "media_player", T = n === "number" || n === "input_number", L = n === "climate", N = this.config.hide_slider_when_off !== !1, I = this.config.hide_color_temp_when_off !== !1, be = this.config.hide_color_picker_when_off !== !1, Ie = this.config.hide_color_slider_when_off !== !1, rt = e.attributes?.brightness !== void 0 || e.attributes?.supported_color_modes?.some((A) => A !== "onoff"), ve = v && S && rt && (!N || r), Oe = e.attributes?.color_temp_kelvin ?? e.attributes?.color_temp, ye = v && this.config.show_color_temp === !0 && (Oe !== void 0 || e.attributes?.supported_color_modes?.some((A) => ["color_temp"].includes(A))) && (!I || r), xe = e.attributes?.supported_color_modes, $e = Array.isArray(xe) && xe.some((A) => ["hs", "xy", "rgb", "rgbw", "rgbww"].includes(A)), we = this.config.color_picker_type !== "wheel", Se = v && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && we) && $e && (!Ie || r), ke = v && this.config.show_color_picker === !0 && !we && $e && (!be || r), H = e.state !== "unavailable" && e.state !== "unknown", ie = x && H && S && e.attributes?.current_position !== void 0, oe = C && H && r && S && e.attributes?.percentage !== void 0, re = h && H && r && S && (e.attributes?.humidity !== void 0 || e.attributes?.target_humidity !== void 0), ne = y && H && r && S && e.attributes?.volume_level !== void 0, ae = T && H && S, se = L && H && r && S && (e.attributes?.temperature !== void 0 || e.attributes?.target_temp_high !== void 0), Ce = (this.config.bg_opacity ?? 10) / 100, Te = this.config.slider_color ? `--slider-color: ${this._resolveColor(this.config.slider_color)};` : u && r && !this.config.use_light_color ? "--slider-color: rgba(255, 255, 255, 0.95);" : `--slider-color: ${g};`, Ue = this.config.slider_track_color ? `--slider-track-color: ${this._resolveColor(this.config.slider_track_color)};` : u && r ? "--slider-track-color: rgba(0, 0, 0, 0.25);" : "", M = this._calculateMultiStageFade(e, c, f), R = this.config.fade_target ?? "card", le = this._resolveColor(this.config.bg_color);
    let O;
    M.activeFade && (R === "card" || R === "all" || u) ? O = M.currentColor : u ? O = r ? n === "light" && d ? d : g : f : le ? O = le : O = `rgba(150, 150, 150, ${Ce})`;
    let nt = w;
    M.activeFade && (R === "icon" || R === "all") && (nt = u ? "transparent" : M.currentColor);
    let Fe = this._resolveColor(this.config.active_color) || (n === "light" && d ? d : g) || "var(--primary-color)";
    M.activeFade && (R === "all" || this.config.active_glow === !0) && (Fe = M.currentColor);
    let Ae = "";
    this.config.box_shadow === "soft" && (Ae = "box-shadow: 0 4px 10px rgba(0,0,0,0.1);"), this.config.box_shadow === "deep" && (Ae = "box-shadow: 0 10px 20px rgba(0,0,0,0.3);"), (this.config.box_shadow === "glow" || this.config.active_glow === !0) && (Ae = r || M.activeFade ? `box-shadow: 0 0 22px ${Fe}, 0 0 45px rgba(255, 255, 255, 0.18);` : "");
    const Ut = this.config.active_glow === !0 || this.config.box_shadow === "glow" ? "card-active-glow" : "", U = e?.attributes?.device_class, Ft = n === "binary_sensor" && (U === "motion" || U === "occupancy" || U === "presence"), Gt = n === "binary_sensor" && (U === "door" || U === "window" || U === "garage_door" || U === "opening"), Wt = Ft && (r || M.activeFade && M.currentStage === 1) ? "motion-active" : "", Vt = Gt && r ? "door-open" : "", Yt = `${this._staticCardClasses} ${Ut} ${Wt} ${Vt}`, Ge = this._getSubButtons();
    this.config.font_weight_primary;
    let X = "";
    this.config.text_color_mode === "active_accent" && r ? X += `--primary-text-color: ${g}; ` : this.config.text_color_primary ? X += `--primary-text-color: ${this._resolveColor(this.config.text_color_primary)}; ` : u && r && (X += "--primary-text-color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.4); "), this.config.text_color_secondary ? X += `--secondary-text-color: ${this._resolveColor(this.config.text_color_secondary)}; ` : u && r && (X += "--secondary-text-color: rgba(255, 255, 255, 0.9); text-shadow: 0 1px 2px rgba(0,0,0,0.3); ");
    const Z = this.config.features_position === "inline", F = this.config.icon_size ?? 24, qt = this.config.icon_shape === "none", at = this.config.icon_container_size ?? (qt ? F : this.config.icon_size ? this.config.icon_size + 16 : 40), Kt = this.config.text_scrolling_primary || "none", Xt = this.config.text_scrolling_secondary || "none", st = $`
      ${ve ? this._renderLightSlider(e) : b}
      ${ie ? this._renderCoverSlider(e) : b}
      ${oe ? this._renderFanSlider(e) : b}
      ${re ? this._renderHumidifierSlider(e) : b}
      ${ne ? this._renderMediaSlider(e) : b}
      ${ae ? this._renderNumberSlider(e) : b}
      ${se ? this._renderClimateSlider(e) : b}
    `, lt = $`
      ${ye ? this._renderColorTempSlider(e) : b}
      ${Se ? this._renderColorSlider(e) : b}
      ${ke ? this._renderColorPicker(e) : b}
    `, ct = ve || ie || oe || re || ne || ae || se, We = ye || Se || ke, Zt = !Z && We || Ge.length > 0, Ve = this.config.decay_slider_position ?? "bottom";
    return $`
      ${this.config.custom_styles ? $`<style>${this.config.custom_styles}</style>` : b}
      <ha-card 
        tabindex="0"
        class="${Yt}" 
        ?active=${r}
        style="${this._staticCardStyles} background: ${O}; ${Ae} ${Te} ${Ue} ${X} --ag-glow-color: ${Fe}; --ag-active-color: ${g};"
        @click=${this._handleTap}
        @keydown=${this._handleKeyDown}
        @contextmenu=${this._handleContextMenu}
        @pointerdown=${this._handlePointerDown}
        @pointermove=${this._handlePointerMove}
        @pointerup=${this._handlePointerUp}
        @pointercancel=${this._handlePointerCancel}
      >
        <div class="card-content ${Z ? "features-inline" : ""}" style="justify-content: var(--ag-content-alignment);">
          ${Ve === "top" ? this._renderDecaySlider(M) : b}

          <div class="info-container">
            ${s ? $`
              <div class="icon-container ${l} ${_} ${this.config.active_pulse && r ? "pulse" : ""} ${(this.config.active_glow || this.config.box_shadow === "glow") && (r || M.activeFade) ? "glow" : ""}" 
                   style="${this._iconOffsetStyle} ${p} ${k} background-color: ${nt}; width: ${at}px; height: ${at}px; --mdc-icon-size: ${F}px; ${H ? "" : "opacity: 0.5; pointer-events: none;"}" 
                   ?active=${r}>
                ${a === "entity-picture" && e.attributes.entity_picture ? $`<img class="entity-picture ${l}" src="${e.attributes.entity_picture}" style="width: ${F}px; height: ${F}px; ${m}" />` : $`<ha-state-icon
                      .hass=${this.hass}
                      .stateObj=${e}
                      .icon=${this.config.icon || this._computeDynamicIcon(e)}
                      style="--mdc-icon-size: ${F}px; width: ${F}px; height: ${F}px; ${m}"
                    ></ha-state-icon>`}
                ${this.config.badge_icon ? $`
                  <div class="badge" style="background: ${this._resolveColor(this.config.badge_color) || g};">
                    <ha-icon .icon=${this.config.badge_icon}></ha-icon>
                  </div>
                ` : b}
              </div>
            ` : b}
            <div class="info" style="${this._textOffsetStyle} ${this._textBoxWidth} text-align: var(--ag-text-alignment);">
              ${t ? $`
                <div class="text-marquee-container scroll-${Kt}">
                  <span class="primary scroll-content" style="${this._primaryTextStyle}">${t}</span>
                </div>` : b}
              ${o ? $`
                <div class="text-marquee-container scroll-${Xt}">
                  <span class="secondary scroll-content" style="${this._secondaryTextStyle}">${o}</span>
                </div>` : b}
            </div>
            ${Ve === "inline" ? $`<div class="inline-sliders">${this._renderDecaySlider(M)}</div>` : b}
            ${Z && ct ? $`<div class="inline-sliders" style="${this._mainSliderMarginOffsets}">${st}</div>` : b}
            ${Z && We ? $`<div class="inline-sliders ${this._collapsed ? "collapsed" : ""}">${lt}</div>` : b}
          </div>
          
          ${Ve === "bottom" ? this._renderDecaySlider(M) : b}
          ${!Z && ct ? $`<div class="features-container" style="${this._featuresOffsetStyle} ${this._mainSliderMarginOffsets}">${st}</div>` : b}

          ${Zt ? $`
            <div class="collapsible-wrapper ${this._collapsed ? "collapsed" : ""}">
              ${!Z && We ? $`<div class="features-container" style="${this._featuresOffsetStyle}">${lt}</div>` : b}

              ${Ge.length > 0 ? $`
                <div class="sub-buttons-container">
                  ${Pi(
      Ge,
      (A) => A.key,
      (A) => this._renderSubButton(A.entity || "", A.icon, A.color, A.bg !== !1, A.name, A.tapAction, A.holdAction, A.type, A.doubleTapAction, A.showState)
    )}
                </div>
              ` : b}
            </div>
          ` : b}

        </div>
      </ha-card>
    `;
  }
  // --- DECAY / COOLDOWN SLIDER COMPONENT ---
  _renderDecaySlider(i) {
    if (!this.config.show_decay_slider || !i.enabled || !i.activeFade)
      return b;
    const e = this.config.slider_style === "google", t = this.config.decay_slider_height ?? (e ? 32 : 10), o = this.config.slider_border_radius ?? (e ? 16 : 5), r = Math.max(0, 100 - i.progressPct);
    return $`
      <div class="decay-slider-container" style="--decay-color: ${i.currentColor};">
        <div class="decay-slider-track" style="height: ${t}px; border-radius: ${o}px;">
          <div class="decay-slider-fill" style="width: ${r}%; background: ${i.currentColor}; border-radius: ${o}px;"></div>
          <span class="decay-slider-badge">${i.stageLabel}</span>
        </div>
      </div>
    `;
  }
  // --- GENERIC SLIDER COMPONENT HELPER ---
  _renderGenericSlider(i, e, t, o, r, n, a, s, l, _, c, d, u = "", g = "", f) {
    const w = this.config.slider_style === "google", p = w && this.config.show_slider_percent !== !1 || this.config.show_slider_percent === !0, k = d ? d(n, a) : `${a}%`, m = f !== void 0 ? f : k, S = this.config.slider_stepped_movement === !1 ? "any" : r, v = i !== "color_temp" && i !== "color_hue", x = this.config.slider_style === "full", C = v && x ? "main-slider-full" : "";
    let h = 0, y = 0;
    i === "color_temp" ? (h = Number(this.config.color_temp_start_offset) || 0, y = Number(this.config.color_temp_end_offset) || 0) : i === "color_hue" ? (h = Number(this.config.color_slider_start_offset) || 0, y = Number(this.config.color_slider_end_offset) || 0) : (h = Number(this.config.slider_start_offset) || 0, y = Number(this.config.slider_end_offset) || 0);
    let T = "";
    return v && x ? T = `left: ${h}px !important; right: ${y}px !important; width: calc(100% - ${h + y}px) !important;` : T = [
      h ? `margin-left: ${h}px !important;` : "",
      y ? `margin-right: ${y}px !important;` : ""
    ].filter(Boolean).join(" "), $`
      <div class="slider-container ${u} ${C} ${w ? "slider-google-wrap" : ""}" style="${T} ${g}">
        <input type="range" min=${t} max=${o} step=${S} .value=${n}
               aria-label="${e}"
               style="--slider-pct: ${a}%;"
               @pointerdown=${this._onSliderPointerDown}
               @pointermove=${this._onSliderPointerMove}
               @pointerup=${this._onSliderPointerUp}
               @pointercancel=${this._onSliderPointerCancel}
               @input=${(L) => this._sliderInput(L, i, s, l, _, c, d)}
               @change=${(L) => this._sliderChange(L, s, l, _)} />
        ${p && m ? $`<span class="slider-percent-badge">${m}</span>` : b}
      </div>
    `;
  }
  // --- MULTI-DOMAIN SLIDER RENDERERS ---
  _renderLightSlider(i) {
    const e = this._isEntityActive(i), t = i.attributes.brightness ?? 0, o = Math.max(0, Math.min(100, Math.round(t / 255 * 100))), r = this._getLightLiveColor(i), n = (this.config.use_light_color !== !1 || !this.config.slider_color) && r ? `--slider-color: ${r};` : "";
    return this._renderGenericSlider(
      "brightness",
      "Brightness",
      0,
      255,
      1,
      t,
      o,
      "light",
      "turn_on",
      (a) => ({ brightness: a }),
      (a) => Math.round(a / 255 * 100),
      (a, s) => !e || s <= 0 ? "" : `${s}%`,
      "",
      n
    );
  }
  _renderColorTempSlider(i) {
    const e = this.config.color_temp_type || "gradient", t = i.attributes.color_temp_kelvin !== void 0 || i.attributes.min_color_temp_kelvin !== void 0 || i.attributes.max_color_temp_kelvin !== void 0, o = t ? i.attributes.min_color_temp_kelvin || 2e3 : i.attributes.min_mireds || 153, r = t ? i.attributes.max_color_temp_kelvin || 6500 : i.attributes.max_mireds || 500, n = t ? i.attributes.color_temp_kelvin || 3e3 : i.attributes.color_temp || 300, a = r - o, s = a > 0 ? Math.max(0, Math.min(100, Math.round((n - o) / a * 100))) : 0, l = t ? "color_temp_kelvin" : "color_temp", _ = e === "google" || e === "gradient" && this.config.slider_style === "google", c = _ ? 42 : e === "thin" ? 6 : 12, d = _ ? 21 : e === "thin" ? 3 : 6, u = this.config.color_temp_height !== void 0 ? this.config.color_temp_height : this.config.slider_height ?? c, g = this.config.color_temp_border_radius !== void 0 ? this.config.color_temp_border_radius : this.config.slider_border_radius ?? d, f = t ? `${n} K` : `${n} mireds`;
    if (e === "presets") {
      const w = Number(this.config.color_temp_start_offset) || 0, p = Number(this.config.color_temp_end_offset) || 0, k = [
        w ? `margin-left: ${w}px;` : "",
        p ? `margin-right: ${p}px;` : ""
      ].filter(Boolean).join(" ");
      return $`
        <div class="presets-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${k}">
          ${io.map((m) => {
        const [S, v, x] = m.rgb, C = Math.abs(n - m.k) < 200;
        return $`
              <button 
                type="button"
                tabindex="0"
                class="temp-preset-chip"
                style="flex: 1; min-width: 48px; height: ${u}px; border-radius: ${g}px; border: ${C ? "2px solid #ffffff" : "1px solid rgba(150, 150, 150, 0.3)"}; background: rgba(${S}, ${v}, ${x}, 0.2); color: var(--primary-text-color); font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; box-shadow: ${C ? "0 0 8px rgba(" + S + "," + v + "," + x + ", 0.8)" : "none"};"
                @click=${(h) => {
          h.stopPropagation(), E("light", this.config.haptic_feedback !== !1), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, [l]: m.k });
        }}>
                <span style="width: 8px; height: 8px; border-radius: 50%; background: rgb(${S}, ${v}, ${x}); display: inline-block;"></span>
                ${m.label}
              </button>
            `;
      })}
        </div>
      `;
    }
    return this._renderGenericSlider(
      "color_temp",
      "Color Temperature",
      o,
      r,
      1,
      n,
      s,
      "light",
      "turn_on",
      (w) => ({ [l]: w }),
      (w) => a > 0 ? Math.round((w - o) / a * 100) : 0,
      (w) => t ? `${w} K` : `${w} mireds`,
      `color-temp ${t ? "kelvin" : "mireds"} ${_ ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${u}px; --ag-slider-radius: ${g}px;`,
      f
    );
  }
  _renderColorSlider(i) {
    const e = this.config.color_picker_type || "slider";
    if (e === "wheel")
      return this._renderColorPicker(i);
    if (e === "swatches") {
      const d = this._getLiveHex(i).toLowerCase(), u = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : 32, g = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : 8, f = Number(this.config.color_slider_start_offset) || 0, w = Number(this.config.color_slider_end_offset) || 0, p = [
        f ? `margin-left: ${f}px;` : "",
        w ? `margin-right: ${w}px;` : ""
      ].filter(Boolean).join(" ");
      return $`
        <div class="swatches-palette-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${p}">
          ${Ze.map((k) => {
        const m = d === k.hex.toLowerCase();
        return $`
              <button 
                type="button"
                tabindex="0"
                class="color-swatch-chip"
                title="${k.label}"
                style="flex: 1; min-width: 28px; height: ${u}px; border-radius: ${g}px; background: ${k.hex}; border: ${m ? "2px solid #ffffff" : "1px solid rgba(0,0,0,0.2)"}; cursor: pointer; box-shadow: ${m ? "0 0 10px " + k.hex : "0 1px 3px rgba(0,0,0,0.3)"}; transition: transform 0.15s ease;"
                @click=${(S) => {
          S.stopPropagation(), E("light", this.config.haptic_feedback !== !1), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: k.rgb });
        }}>
              </button>
            `;
      })}
        </div>
      `;
    }
    const t = this._getLiveHue(i), o = Math.max(0, Math.min(100, Math.round(t / 360 * 100))), r = e === "google" || this.config.slider_style === "google", n = r ? 42 : 12, a = r ? 21 : 6, s = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : this.config.slider_height ?? n, l = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : this.config.slider_border_radius ?? a, _ = `hsl(${t}, 100%, 50%)`, c = $`
      <span class="color-chip-badge" style="display: flex; align-items: center; gap: 6px;">
        <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background: ${_}; border: 1.5px solid #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.4);"></span>
        ${t}°
      </span>
    `;
    return this._renderGenericSlider(
      "color_hue",
      "Color Hue",
      0,
      360,
      1,
      t,
      o,
      "light",
      "turn_on",
      (d) => {
        const [u, g, f] = Pt(d, 100);
        return { rgb_color: [u, g, f] };
      },
      (d) => Math.round(d / 360 * 100),
      (d) => `${d}°`,
      `color-hue ${r ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${s}px; --ag-slider-radius: ${l}px; --color-hue-val: ${_};`,
      c
    );
  }
  _renderColorPicker(i) {
    const e = this._getLiveHex(i), t = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : this.config.slider_height ?? 36, o = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : this.config.slider_border_radius ?? 8;
    return $`
      <div class="color-picker" title="Adjust Light Color" style="height: ${t}px; border-radius: ${o}px;">
        <input type="color" 
               .value=${e} 
               @input=${(r) => this._handleColorInput(r, !0)}
               @change=${(r) => this._handleColorInput(r, !1)} />
        <span class="color-label">Color (${e})</span>
      </div>
    `;
  }
  _renderCoverSlider(i) {
    const e = i.attributes.current_position ?? (i.state === "open" || i.state === "opening" ? 100 : 0);
    return this._renderGenericSlider(
      "cover",
      "Cover Position",
      0,
      100,
      1,
      e,
      e,
      "cover",
      "set_cover_position",
      (t) => ({ position: t }),
      (t) => t,
      (t, o) => `${o}%`
    );
  }
  _renderFanSlider(i) {
    const e = i.attributes.percentage ?? 0, t = i.attributes.percentage_step ?? 1;
    return this._renderGenericSlider(
      "fan",
      "Fan Speed",
      0,
      100,
      t,
      e,
      e,
      "fan",
      "set_percentage",
      (o) => ({ percentage: o }),
      (o) => o,
      (o, r) => `${r}%`
    );
  }
  _renderMediaSlider(i) {
    const e = Math.round((i.attributes.volume_level ?? 0) * 100);
    return this._renderGenericSlider(
      "media",
      "Volume",
      0,
      100,
      1,
      e,
      e,
      "media_player",
      "volume_set",
      (t) => ({ volume_level: t / 100 }),
      (t) => t,
      (t, o) => `${o}%`
    );
  }
  _renderNumberSlider(i) {
    const e = Number(i.attributes.min ?? 0), t = Number(i.attributes.max ?? 100), o = Number(i.attributes.step ?? 1), r = Number(i.state), n = isNaN(r) ? e : r, a = t - e, s = a > 0 ? Math.max(0, Math.min(100, Math.round((n - e) / a * 100))) : 0, l = (this.config.entity || "number").split(".")[0], _ = i.attributes.unit_of_measurement ? ` ${i.attributes.unit_of_measurement}` : "";
    return this._renderGenericSlider(
      "number",
      "Value",
      e,
      t,
      o,
      n,
      s,
      l,
      "set_value",
      (c) => ({ value: c }),
      (c) => a > 0 ? Math.round((c - e) / a * 100) : 0,
      (c) => `${o < 1 ? Number(c).toFixed(1) : c}${_}`
    );
  }
  _renderClimateSlider(i) {
    const e = this.hass.config?.unit_system?.temperature === "°F" || this.hass.config?.unit_system?.temperature === "F", t = e ? "°F" : "°C", o = e ? 60 : 16, r = e ? 85 : 30, n = i.attributes.min_temp ?? o, a = i.attributes.max_temp ?? r, s = i.attributes.target_temp_step ?? i.attributes.target_temperature_step ?? (e ? 1 : 0.5), l = i.attributes.temperature ?? i.attributes.target_temp_low ?? i.attributes.target_temp_high ?? n, _ = a - n, c = _ > 0 ? Math.max(0, Math.min(100, Math.round((l - n) / _ * 100))) : 0;
    return this._renderGenericSlider(
      "climate",
      "Temperature",
      n,
      a,
      s,
      l,
      c,
      "climate",
      "set_temperature",
      (d) => ({ temperature: d }),
      (d) => _ > 0 ? Math.round((d - n) / _ * 100) : 0,
      (d) => `${d}${t}`,
      "climate-temp",
      "",
      `${l}${t}`
    );
  }
  _renderHumidifierSlider(i) {
    const e = i.attributes?.min_humidity ?? 0, t = i.attributes?.max_humidity ?? 100, o = i.attributes?.humidity ?? i.attributes?.target_humidity ?? e, r = t - e, n = r > 0 ? Math.max(0, Math.min(100, Math.round((o - e) / r * 100))) : 0;
    return this._renderGenericSlider(
      "humidifier",
      "Humidity",
      e,
      t,
      1,
      o,
      n,
      "humidifier",
      "set_humidity",
      (a) => ({ humidity: a }),
      (a) => r > 0 ? Math.round((a - e) / r * 100) : 0,
      (a, s) => `${s}%`
    );
  }
  // --- EXTRACTED SUB-BUTTON RENDERERS ---
  _renderSubSlider(i, e, t, o, r) {
    const n = e || this.hass.states[this.config.entity || ""], a = i || this.config.entity || "", s = n?.attributes?.volume_level !== void 0 || n?.entity_id?.startsWith("media_player."), l = n?.attributes?.percentage !== void 0 || n?.entity_id?.startsWith("fan."), _ = n?.attributes?.current_position !== void 0 || n?.entity_id?.startsWith("cover.");
    let c = 0, d = 0, u = 255, g = "1", f = "turn_on", w = "light", p = "brightness";
    s ? (c = n?.attributes?.volume_level ?? 0, u = 1, g = "0.01", f = "set_volume_level", w = "media_player", p = "volume_level") : l ? (c = n?.attributes?.percentage ?? 0, u = 100, g = "1", f = "set_percentage", w = "fan", p = "percentage") : _ ? (c = n?.attributes?.current_position ?? 0, u = 100, g = "1", f = "set_cover_position", w = "cover", p = "position") : c = n?.attributes?.brightness ?? 0;
    const k = Math.round(u === 1 ? c * 100 : u === 100 ? c : c / 255 * 100);
    return t === "slider" ? $`
        <div class="sub-button-slider-container ${r}" style="${o}" title="Level: ${k}%">
          <input type="range" 
                 min="${d}" 
                 max=${u} 
                 step=${g} 
                 .value=${c}
                 @pointerdown=${(m) => m.stopPropagation()}
                 @input=${(m) => {
      m.stopPropagation();
      const S = parseFloat(m.target.value), v = Math.round(u === 1 ? S * 100 : u === 100 ? S : S / 255 * 100), x = m.target.closest(".sub-button-slider-container");
      x && x.setAttribute("title", `Level: ${v}%`), this._throttledCall("sub_slider_" + a, () => {
        this.hass.callService(w, f, { entity_id: a, [p]: S });
      });
    }}
                 @change=${(m) => {
      m.stopPropagation();
      const S = parseFloat(m.target.value);
      this.hass.callService(w, f, { entity_id: a, [p]: S });
    }} />
        </div>
      ` : $`
        <div class="sub-button-google-slider ${r}" style="${o} --slider-pct: ${k}%;" title="Level: ${k}%">
          <input type="range" 
                 min="${d}" 
                 max=${u} 
                 step=${g} 
                 .value=${c}
                 style="--slider-pct: ${k}%;"
                 @pointerdown=${(m) => m.stopPropagation()}
                 @input=${(m) => {
      m.stopPropagation();
      const S = parseFloat(m.target.value), v = Math.round(u === 1 ? S * 100 : u === 100 ? S : S / 255 * 100), x = m.target;
      x.style.setProperty("--slider-pct", `${v}%`);
      const C = x.closest(".sub-button-google-slider");
      if (C) {
        C.style.setProperty("--slider-pct", `${v}%`), C.setAttribute("title", `Level: ${v}%`);
        const h = C.querySelector(".sub-slider-pct");
        h && (h.textContent = `${v}%`);
      }
      this._throttledCall("sub_slider_" + a, () => {
        this.hass.callService(w, f, { entity_id: a, [p]: S });
      });
    }}
                 @change=${(m) => {
      m.stopPropagation();
      const S = parseFloat(m.target.value);
      this.hass.callService(w, f, { entity_id: a, [p]: S });
    }} />
          <span class="sub-slider-pct">${k}%</span>
        </div>
      `;
  }
  _renderSubColorPicker(i, e, t, o, r, n) {
    const a = e || this.hass.states[this.config.entity || ""], s = this._getLiveHex(a);
    return $`
      <div class="sub-button sub-color-picker ${o}" 
           tabindex="0" 
           role="button" 
           title="Select Color (${s})" 
           style="${t}"
           @keydown=${(l) => {
      (l.key === "Enter" || l.key === " ") && (l.preventDefault(), l.currentTarget.querySelector("input")?.click());
    }}>
        <input type="color" 
               aria-label="Color Picker"
               .value=${s} 
               @input=${(l) => this._handleColorInput(l, !0, i || this.config.entity, "sub_color_picker_" + i)}
               @change=${(l) => this._handleColorInput(l, !1, i || this.config.entity)} />
        ${r ? $`<span class="sub-button-label">${r}</span>` : b}
        ${n ? $`<span class="sub-button-state">${n}</span>` : b}
      </div>
    `;
  }
  _renderSubButton(i, e, t, o = !0, r, n, a, s = "button", l, _ = !1) {
    const c = i ? this.hass.states[i] : void 0;
    if (i && !c)
      return $`
        <div class="sub-button missing" title="Entity not found: ${i}">
          <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        </div>
      `;
    const d = c ? this._isEntityActive(c) : !1;
    let u = this._resolveColor(t);
    !u && d && c?.attributes?.rgb_color && Array.isArray(c.attributes.rgb_color) && (u = `rgb(${c.attributes.rgb_color.join(",")})`);
    const g = u ? `color: ${u};` : "", f = o ? "" : "no-bg", w = _ && c ? this._getInfoContent("state", c) : "";
    if (s === "slider" || s === "google_slider")
      return this._renderSubSlider(i, c, s, g, f);
    if (s === "color_picker")
      return this._renderSubColorPicker(i, c, g, f, r, w);
    let p = e, k = d, m = r || "", S = "", v = r, x;
    if (n && n.action && n.action !== "none" && n.action !== "default")
      p || (p = c?.attributes?.icon || "mdi:checkbox-blank-circle");
    else
      switch (s) {
        case "play_pause": {
          const h = c?.state === "playing";
          k = h, p || (p = h ? "mdi:pause" : "mdi:play"), m = h ? "Pause" : "Play", x = () => {
            this.hass.callService("media_player", "media_play_pause", { entity_id: i || this.config.entity });
          };
          break;
        }
        case "next": {
          p || (p = "mdi:skip-next"), m = "Next Track", x = () => {
            this.hass.callService("media_player", "media_next_track", { entity_id: i || this.config.entity });
          };
          break;
        }
        case "previous": {
          p || (p = "mdi:skip-previous"), m = "Previous Track", x = () => {
            this.hass.callService("media_player", "media_previous_track", { entity_id: i || this.config.entity });
          };
          break;
        }
        case "open_close": {
          const h = c?.state === "open" || c?.state === "on" || c?.attributes?.current_position !== void 0 && c.attributes.current_position > 0;
          k = h, p || (p = h ? "mdi:window-shutter-open" : "mdi:window-shutter"), m = h ? "Close" : "Open", x = () => {
            this.hass.callService("cover", "toggle", { entity_id: i || this.config.entity });
          };
          break;
        }
        case "stop": {
          p || (p = "mdi:stop"), m = "Stop", x = () => {
            this.hass.callService("cover", "stop_cover", { entity_id: i || this.config.entity });
          };
          break;
        }
        case "lock_unlock": {
          const h = c?.state === "locked";
          k = !h, p || (p = h ? "mdi:lock" : "mdi:lock-open-variant"), m = h ? "Unlock" : "Lock", x = () => {
            this.hass.callService("lock", h ? "unlock" : "lock", { entity_id: i || this.config.entity });
          };
          break;
        }
        case "fan_speed": {
          const h = c?.attributes?.percentage ?? 0;
          p || (p = "mdi:fan"), d && (S = "anim-spin"), m = `Speed: ${h}%`, v || (v = h > 0 ? `${h}%` : "Off"), x = () => {
            let y = 33;
            h >= 90 ? y = 0 : h >= 60 ? y = 100 : h >= 30 && (y = 66), this.hass.callService("fan", "set_percentage", { entity_id: i || this.config.entity, percentage: y });
          };
          break;
        }
        case "clean": {
          const h = c?.state === "cleaning";
          k = h, p || (p = h ? "mdi:pause" : "mdi:robot-vacuum"), m = h ? "Pause Vacuum" : "Start Vacuum", x = () => {
            this.hass.callService("vacuum", h ? "pause" : "start", { entity_id: i || this.config.entity });
          };
          break;
        }
        case "dock": {
          p || (p = "mdi:home-import-outline"), m = "Return to Dock", x = () => {
            this.hass.callService("vacuum", "return_to_base", { entity_id: i || this.config.entity });
          };
          break;
        }
        case "locate": {
          p || (p = "mdi:map-marker-question-outline"), m = "Locate", x = () => {
            this.hass.callService("vacuum", "locate", { entity_id: i || this.config.entity });
          };
          break;
        }
        case "hvac_mode": {
          const h = c?.state || "off", y = c?.attributes?.hvac_modes || ["off", "heat", "cool", "auto"], T = y[(y.indexOf(h) + 1) % y.length] || "auto";
          k = h !== "off", p || (h === "heat" ? p = "mdi:fire" : h === "cool" ? p = "mdi:snowflake" : h === "dry" ? p = "mdi:water-percent" : h === "fan_only" ? p = "mdi:fan" : h === "auto" ? p = "mdi:thermostat-auto" : p = "mdi:power"), m = `Mode: ${h} -> Next: ${T}`, v || (v = h), x = () => {
            this.hass.callService("climate", "set_hvac_mode", { entity_id: i || this.config.entity, hvac_mode: T });
          };
          break;
        }
        case "light_effect": {
          const h = c?.attributes?.effect_list || [], y = c?.attributes?.effect || "None", T = h.length > 0 ? h[(h.indexOf(y) + 1) % h.length] || h[0] : "None";
          p || (p = "mdi:creation"), k = y !== "None" && y !== "off" && d, m = `Effect: ${y} -> Next: ${T}`, v || (v = y !== "None" ? y : "Effect"), x = () => {
            h.length > 0 && this.hass.callService("light", "turn_on", { entity_id: i || this.config.entity, effect: T });
          };
          break;
        }
        case "brightness": {
          const h = c?.attributes?.brightness, y = h !== void 0 ? Math.round(h / 255 * 100) : 0;
          p || (p = "mdi:brightness-6"), m = `Brightness: ${y}%`, v || (v = `${y}%`), x = () => {
            let T = 255;
            y >= 85 ? T = 76 : y >= 50 ? T = 255 : T = 178, this.hass.callService("light", "turn_on", { entity_id: i || this.config.entity, brightness: T });
          };
          break;
        }
        case "garage_toggle": {
          const h = c?.state === "open" || c?.state === "opening";
          k = h, p || (p = h ? "mdi:garage-open" : "mdi:garage"), m = h ? "Close Garage" : "Open Garage", x = () => {
            this.hass.callService("cover", "toggle", { entity_id: i || this.config.entity });
          };
          break;
        }
        case "dim_up": {
          const h = c?.attributes?.brightness ?? 0, y = Math.min(255, h + 26);
          p || (p = "mdi:brightness-5"), m = "Brightness +10%", v || (v = "+10%"), x = () => {
            this.hass.callService("light", "turn_on", { entity_id: i || this.config.entity, brightness: y });
          };
          break;
        }
        case "dim_down": {
          const h = c?.attributes?.brightness ?? 0, y = Math.max(1, h - 26);
          p || (p = "mdi:brightness-4"), m = "Brightness -10%", v || (v = "-10%"), x = () => {
            this.hass.callService("light", "turn_on", { entity_id: i || this.config.entity, brightness: y });
          };
          break;
        }
        case "temp_warm": {
          p || (p = "mdi:weather-sunny"), m = "Warm White (2700K)", v || (v = "2700K"), x = () => {
            this.hass.callService("light", "turn_on", { entity_id: i || this.config.entity, color_temp_kelvin: 2700 });
          };
          break;
        }
        case "temp_cool": {
          p || (p = "mdi:weather-sunset-up"), m = "Cool Daylight (6000K)", v || (v = "6000K"), x = () => {
            this.hass.callService("light", "turn_on", { entity_id: i || this.config.entity, color_temp_kelvin: 6e3 });
          };
          break;
        }
        case "color_temp": {
          p || (p = "mdi:palette-swatch-outline"), m = "Color Temperature", v || (v = "Temp"), x = () => {
            const h = c?.attributes?.color_temp_kelvin || 3e3;
            let y = 2700;
            h < 3300 ? y = 4e3 : h < 5e3 ? y = 6e3 : y = 2700, this.hass.callService("light", "turn_on", { entity_id: i || this.config.entity, color_temp_kelvin: y });
          };
          break;
        }
        case "button":
        default: {
          p || (p = c?.attributes?.icon || "mdi:checkbox-blank-circle"), m = r || (c?.attributes?.friendly_name ?? "");
          break;
        }
      }
    const C = (h) => {
      this._handleSubTap(h, i, n, l, x);
    };
    return $`
      <div 
        tabindex="0"
        data-ag-sub
        class="sub-button ${f}" 
        ?active=${k} 
        style="${g} ${k && u && o ? `background: ${u}; color: #fff;` : ""}"
        title="${m}"
        @click=${C}
        @keydown=${(h) => {
      (h.key === "Enter" || h.key === " ") && (h.preventDefault(), h.stopPropagation(), C(h));
    }}
        @pointerdown=${(h) => this._handleSubPointerDown(h, i, a)}
        @pointermove=${this._handleSubPointerMove}
        @pointerup=${this._handleSubPointerUp}
        @pointercancel=${this._handleSubPointerCancel}
        @contextmenu=${(h) => this._handleSubContextMenu(h, i, a)}>
        <ha-icon .icon=${p} class="${S}"></ha-icon>
        ${v ? $`<span class="sub-button-label">${v}</span>` : b}
        ${w ? $`<span class="sub-button-state">${w}</span>` : b}
      </div>
    `;
  }
  // --- STATIC STYLES ---
  static get styles() {
    return Ht`
      :host([hidden]),
      :host([offscreen]) *,
      :host([offscreen]) .anim-spin,
      :host([offscreen]) .anim-bounce,
      :host([offscreen]) .pulse,
      :host([offscreen]) .scroll-content {
        animation-play-state: paused !important;
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
      input[type="range"] {
        touch-action: pan-y;
        -webkit-appearance: none;
        appearance: none;
      }
      ha-card {
        cursor: pointer;
        box-sizing: border-box;
        overflow: hidden;
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        --ha-card-border-width: 0;
        position: relative;
        outline: none;
      }
      ha-card:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }
      .sub-button {
        transform: translateZ(0);
      }
      .sub-button:hover, .sub-button:active {
        will-change: transform, background, color;
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
      .theme-retro_synth .icon-container {
        border: 1px solid #00ffff !important;
        box-shadow: 0 0 10px rgba(0, 255, 255, 0.5) !important;
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
        display: flex;
        flex-direction: column;
        gap: var(--ag-features-margin, 4px);
        max-height: 500px;
        opacity: 1;
        overflow: hidden;
        /* Removed static will-change to avoid permanent compositor layer promotion.
           The browser's transition engine handles this efficiently. */
        transform: translateZ(0);
        transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease, margin 0.35s ease;
      }
      .collapsible-wrapper.collapsed {
        max-height: 0 !important;
        opacity: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        pointer-events: none !important;
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

      /* --- ICON & SHAPES --- */
      .icon-container {
        display: flex; align-items: center; justify-content: center;
        color: var(--primary-text-color);
        transition: transform 0.3s ease, color 0.3s ease, background-color 0.3s ease;
        flex-shrink: 0;
        position: relative;
        margin: var(--ag-icon-margin, 0px);
        padding: var(--ag-icon-padding, 0px);
        transform: translateZ(0);
      }
      .icon-container:hover, .icon-container:active {
        will-change: transform, color, background-color;
      }
      .icon-container[active] { color: var(--text-primary-color); }

      .shape-circle { border-radius: 50%; }
      .shape-rounded { border-radius: 12px; }
      .shape-square { border-radius: 4px; }
      .shape-none { background: transparent !important; box-shadow: none !important; }

      .entity-picture {
        object-fit: cover;
      }

      /* --- ICON ANIMATIONS --- */
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .icon-container.anim-spin[active] ha-state-icon,
      .icon-container.anim-spin[active] img {
        will-change: transform;
        animation: spin 2.5s linear infinite;
      }

      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
      }
      .icon-container.anim-bounce[active] {
        will-change: transform;
        animation: bounce 1.2s ease-in-out infinite;
      }

      @keyframes pulse {
        0%   { transform: scale(1);    box-shadow: 0 0 0 0   currentColor; }
        70%  { transform: scale(1.05); box-shadow: 0 0 0 10px transparent; }
        100% { transform: scale(1);    box-shadow: 0 0 0 0   transparent; }
      }
      .icon-container.pulse[active],
      .icon-container.anim-pulse[active] {
        animation: pulse 2s infinite;
      }

      /* Motion Sensor Radar Ripple Effect */
      @keyframes motion-ripple {
        0% {
          transform: scale(0.95);
          box-shadow: 0 0 0 0 rgba(var(--ag-glow-color, 255, 152, 0), 0.7);
        }
        70% {
          transform: scale(1.1);
          box-shadow: 0 0 0 12px rgba(var(--ag-glow-color, 255, 152, 0), 0);
        }
        100% {
          transform: scale(0.95);
          box-shadow: 0 0 0 0 rgba(var(--ag-glow-color, 255, 152, 0), 0);
        }
      }
      .motion-active .icon-container {
        animation: motion-ripple 1.8s infinite cubic-bezier(0.4, 0, 0.2, 1) !important;
      }
      .door-open {
        border-color: rgba(255, 152, 0, 0.5) !important;
      }

      /* --- STATUS BADGE (MUSHROOM STYLE) --- */
      .badge {
        position: absolute;
        bottom: var(--ag-badge-offset, -2px);
        right: var(--ag-badge-offset, -2px);
        width: var(--ag-badge-size, 16px);
        height: var(--ag-badge-size, 16px);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid var(--card-background-color, #fff);
        color: var(--text-primary-color, #fff);
      }
      .badge ha-icon {
        --mdc-icon-size: calc(var(--ag-badge-size, 16px) * 0.625);
        width: calc(var(--ag-badge-size, 16px) * 0.625);
        height: calc(var(--ag-badge-size, 16px) * 0.625);
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
        pointer-events: none;
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
      .slider-style-full .icon-container,
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
        opacity: var(--ag-full-slider-opacity, 0.3) !important;
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
      /* Removed: .slider-container.color-hue.slider-google-wrap track rules
         are redundant — the parent .slider-container.color-hue selector
         already applies the spectrum gradient to both variants. */
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
    `;
  }
};
K([
  Be({ attribute: !1 })
], B.prototype, "hass", 2);
K([
  Be({ type: Boolean })
], B.prototype, "preview", 2);
K([
  Re()
], B.prototype, "config", 2);
K([
  Re()
], B.prototype, "_collapsed", 2);
K([
  It({ passive: !0 })
], B.prototype, "_handlePointerMove", 1);
K([
  It({ passive: !0 })
], B.prototype, "_handleSubPointerMove", 1);
B = K([
  yi("antigravity-with-icon-card")
], B);
customElements.get("antigravity-with-icon-card") || customElements.define("antigravity-with-icon-card", B);
export {
  B as AntigravityWithIconCard,
  Qi as CARD_VERSION
};
