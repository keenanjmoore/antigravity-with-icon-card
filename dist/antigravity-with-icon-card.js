const ht = globalThis, Pt = ht.ShadowRoot && (ht.ShadyCSS === void 0 || ht.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Et = Symbol(), zt = /* @__PURE__ */ new WeakMap();
let ni = class {
  constructor(e, i, r) {
    if (this._$cssResult$ = !0, r !== Et) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (Pt && e === void 0) {
      const r = i !== void 0 && i.length === 1;
      r && (e = zt.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && zt.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const si = (t) => new ni(typeof t == "string" ? t : t + "", void 0, Et), li = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((r, o, a) => r + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[a + 1], t[0]);
  return new ni(i, t, Et);
}, wi = (t, e) => {
  if (Pt) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const r = document.createElement("style"), o = ht.litNonce;
    o !== void 0 && r.setAttribute("nonce", o), r.textContent = i.cssText, t.appendChild(r);
  }
}, Ft = Pt ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const r of e.cssRules) i += r.cssText;
  return si(i);
})(t) : t;
const { is: Si, defineProperty: $i, getOwnPropertyDescriptor: ki, getOwnPropertyNames: Ci, getOwnPropertySymbols: Ti, getPrototypeOf: Mi } = Object, gt = globalThis, It = gt.trustedTypes, Ai = It ? It.emptyScript : "", Pi = gt.reactiveElementPolyfillSupport, it = (t, e) => t, pt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Ai : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let i = t;
  switch (e) {
    case Boolean:
      i = t !== null;
      break;
    case Number:
      i = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(t);
      } catch {
        i = null;
      }
  }
  return i;
} }, Nt = (t, e) => !Si(t, e), Ut = { attribute: !0, type: String, converter: pt, reflect: !1, useDefault: !1, hasChanged: Nt };
Symbol.metadata ??= Symbol("metadata"), gt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Ve = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Ut) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const r = Symbol(), o = this.getPropertyDescriptor(e, r, i);
      o !== void 0 && $i(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, i, r) {
    const { get: o, set: a } = ki(this.prototype, e) ?? { get() {
      return this[i];
    }, set(n) {
      this[i] = n;
    } };
    return { get: o, set(n) {
      const d = o?.call(this);
      a?.call(this, n), this.requestUpdate(e, d, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ut;
  }
  static _$Ei() {
    if (this.hasOwnProperty(it("elementProperties"))) return;
    const e = Mi(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(it("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(it("properties"))) {
      const i = this.properties, r = [...Ci(i), ...Ti(i)];
      for (const o of r) this.createProperty(o, i[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [r, o] of i) this.elementProperties.set(r, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, r] of this.elementProperties) {
      const o = this._$Eu(i, r);
      o !== void 0 && this._$Eh.set(o, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const o of r) i.unshift(Ft(o));
    } else e !== void 0 && i.push(Ft(e));
    return i;
  }
  static _$Eu(e, i) {
    const r = i.attribute;
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
    const e = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const r of i.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return wi(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, i, r) {
    this._$AK(e, r);
  }
  _$ET(e, i) {
    const r = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, r);
    if (o !== void 0 && r.reflect === !0) {
      const a = (r.converter?.toAttribute !== void 0 ? r.converter : pt).toAttribute(i, r.type);
      this._$Em = e, a == null ? this.removeAttribute(o) : this.setAttribute(o, a), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const r = this.constructor, o = r._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const a = r.getPropertyOptions(o), n = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : pt;
      this._$Em = o;
      const d = n.fromAttribute(i, a.type);
      this[o] = d ?? this._$Ej?.get(o) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, i, r, o = !1, a) {
    if (e !== void 0) {
      const n = this.constructor;
      if (o === !1 && (a = this[e]), r ??= n.getPropertyOptions(e), !((r.hasChanged ?? Nt)(a, i) || r.useDefault && r.reflect && a === this._$Ej?.get(e) && !this.hasAttribute(n._$Eu(e, r)))) return;
      this.C(e, i, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: r, reflect: o, wrapped: a }, n) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, n ?? i ?? this[e]), a !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (i = void 0), this._$AL.set(e, i)), o === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
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
        for (const [o, a] of this._$Ep) this[o] = a;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [o, a] of r) {
        const { wrapped: n } = a, d = this[o];
        n !== !0 || this._$AL.has(o) || d === void 0 || this.C(o, void 0, a, d);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (r) {
      throw e = !1, this._$EM(), r;
    }
    e && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((i) => i.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
    this._$Eq &&= this._$Eq.forEach((i) => this._$ET(i, this[i])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
Ve.elementStyles = [], Ve.shadowRootOptions = { mode: "open" }, Ve[it("elementProperties")] = /* @__PURE__ */ new Map(), Ve[it("finalized")] = /* @__PURE__ */ new Map(), Pi?.({ ReactiveElement: Ve }), (gt.reactiveElementVersions ??= []).push("2.1.2");
const Lt = globalThis, Gt = (t) => t, _t = Lt.trustedTypes, Vt = _t ? _t.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, ci = "$lit$", ne = `lit$${Math.random().toFixed(9).slice(2)}$`, di = "?" + ne, Ei = `<${di}>`, Se = document, rt = () => Se.createComment(""), ot = (t) => t === null || typeof t != "object" && typeof t != "function", Dt = Array.isArray, Ni = (t) => Dt(t) || typeof t?.[Symbol.iterator] == "function", wt = `[ 	
\f\r]`, Qe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Wt = /-->/g, Yt = />/g, ve = RegExp(`>|${wt}(?:([^\\s"'>=/]+)(${wt}*=${wt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Xt = /'/g, qt = /"/g, ui = /^(?:script|style|textarea|title)$/i, Li = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), k = Li(1), $e = Symbol.for("lit-noChange"), S = Symbol.for("lit-nothing"), Kt = /* @__PURE__ */ new WeakMap(), xe = Se.createTreeWalker(Se, 129);
function hi(t, e) {
  if (!Dt(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Vt !== void 0 ? Vt.createHTML(e) : e;
}
const Di = (t, e) => {
  const i = t.length - 1, r = [];
  let o, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = Qe;
  for (let d = 0; d < i; d++) {
    const u = t[d];
    let m, l, p = -1, _ = 0;
    for (; _ < u.length && (n.lastIndex = _, l = n.exec(u), l !== null); ) _ = n.lastIndex, n === Qe ? l[1] === "!--" ? n = Wt : l[1] !== void 0 ? n = Yt : l[2] !== void 0 ? (ui.test(l[2]) && (o = RegExp("</" + l[2], "g")), n = ve) : l[3] !== void 0 && (n = ve) : n === ve ? l[0] === ">" ? (n = o ?? Qe, p = -1) : l[1] === void 0 ? p = -2 : (p = n.lastIndex - l[2].length, m = l[1], n = l[3] === void 0 ? ve : l[3] === '"' ? qt : Xt) : n === qt || n === Xt ? n = ve : n === Wt || n === Yt ? n = Qe : (n = ve, o = void 0);
    const v = n === ve && t[d + 1].startsWith("/>") ? " " : "";
    a += n === Qe ? u + Ei : p >= 0 ? (r.push(m), u.slice(0, p) + ci + u.slice(p) + ne + v) : u + ne + (p === -2 ? d : v);
  }
  return [hi(t, a + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class at {
  constructor({ strings: e, _$litType$: i }, r) {
    let o;
    this.parts = [];
    let a = 0, n = 0;
    const d = e.length - 1, u = this.parts, [m, l] = Di(e, i);
    if (this.el = at.createElement(m, r), xe.currentNode = this.el.content, i === 2 || i === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (o = xe.nextNode()) !== null && u.length < d; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const p of o.getAttributeNames()) if (p.endsWith(ci)) {
          const _ = l[n++], v = o.getAttribute(p).split(ne), y = /([.?@])?(.*)/.exec(_);
          u.push({ type: 1, index: a, name: y[2], strings: v, ctor: y[1] === "." ? Hi : y[1] === "?" ? Bi : y[1] === "@" ? Oi : mt }), o.removeAttribute(p);
        } else p.startsWith(ne) && (u.push({ type: 6, index: a }), o.removeAttribute(p));
        if (ui.test(o.tagName)) {
          const p = o.textContent.split(ne), _ = p.length - 1;
          if (_ > 0) {
            o.textContent = _t ? _t.emptyScript : "";
            for (let v = 0; v < _; v++) o.append(p[v], rt()), xe.nextNode(), u.push({ type: 2, index: ++a });
            o.append(p[_], rt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === di) u.push({ type: 2, index: a });
      else {
        let p = -1;
        for (; (p = o.data.indexOf(ne, p + 1)) !== -1; ) u.push({ type: 7, index: a }), p += ne.length - 1;
      }
      a++;
    }
  }
  static createElement(e, i) {
    const r = Se.createElement("template");
    return r.innerHTML = e, r;
  }
}
function Xe(t, e, i = t, r) {
  if (e === $e) return e;
  let o = r !== void 0 ? i._$Co?.[r] : i._$Cl;
  const a = ot(e) ? void 0 : e._$litDirective$;
  return o?.constructor !== a && (o?._$AO?.(!1), a === void 0 ? o = void 0 : (o = new a(t), o._$AT(t, i, r)), r !== void 0 ? (i._$Co ??= [])[r] = o : i._$Cl = o), o !== void 0 && (e = Xe(t, o._$AS(t, e.values), o, r)), e;
}
class Ri {
  constructor(e, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: i }, parts: r } = this._$AD, o = (e?.creationScope ?? Se).importNode(i, !0);
    xe.currentNode = o;
    let a = xe.nextNode(), n = 0, d = 0, u = r[0];
    for (; u !== void 0; ) {
      if (n === u.index) {
        let m;
        u.type === 2 ? m = new qe(a, a.nextSibling, this, e) : u.type === 1 ? m = new u.ctor(a, u.name, u.strings, this, e) : u.type === 6 && (m = new zi(a, this, e)), this._$AV.push(m), u = r[++d];
      }
      n !== u?.index && (a = xe.nextNode(), n++);
    }
    return xe.currentNode = Se, o;
  }
  p(e) {
    let i = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, i), i += r.strings.length - 2) : r._$AI(e[i])), i++;
  }
}
class qe {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, r, o) {
    this.type = 2, this._$AH = S, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = r, this.options = o, this._$Cv = o?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && e?.nodeType === 11 && (e = i.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, i = this) {
    e = Xe(this, e, i), ot(e) ? e === S || e == null || e === "" ? (this._$AH !== S && this._$AR(), this._$AH = S) : e !== this._$AH && e !== $e && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ni(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== S && ot(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Se.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: r } = e, o = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = at.createElement(hi(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const a = new Ri(o, this), n = a.u(this.options);
      a.p(i), this.T(n), this._$AH = a;
    }
  }
  _$AC(e) {
    let i = Kt.get(e.strings);
    return i === void 0 && Kt.set(e.strings, i = new at(e)), i;
  }
  k(e) {
    Dt(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let r, o = 0;
    for (const a of e) o === i.length ? i.push(r = new qe(this.O(rt()), this.O(rt()), this, this.options)) : r = i[o], r._$AI(a), o++;
    o < i.length && (this._$AR(r && r._$AB.nextSibling, o), i.length = o);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const r = Gt(e).nextSibling;
      Gt(e).remove(), e = r;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class mt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, r, o, a) {
    this.type = 1, this._$AH = S, this._$AN = void 0, this.element = e, this.name = i, this._$AM = o, this.options = a, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = S;
  }
  _$AI(e, i = this, r, o) {
    const a = this.strings;
    let n = !1;
    if (a === void 0) e = Xe(this, e, i, 0), n = !ot(e) || e !== this._$AH && e !== $e, n && (this._$AH = e);
    else {
      const d = e;
      let u, m;
      for (e = a[0], u = 0; u < a.length - 1; u++) m = Xe(this, d[r + u], i, u), m === $e && (m = this._$AH[u]), n ||= !ot(m) || m !== this._$AH[u], m === S ? e = S : e !== S && (e += (m ?? "") + a[u + 1]), this._$AH[u] = m;
    }
    n && !o && this.j(e);
  }
  j(e) {
    e === S ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Hi extends mt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === S ? void 0 : e;
  }
}
class Bi extends mt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== S);
  }
}
class Oi extends mt {
  constructor(e, i, r, o, a) {
    super(e, i, r, o, a), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = Xe(this, e, i, 0) ?? S) === $e) return;
    const r = this._$AH, o = e === S && r !== S || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, a = e !== S && (r === S || o);
    o && this.element.removeEventListener(this.name, this, r), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
let zi = class {
  constructor(e, i, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Xe(this, e);
  }
};
const Fi = { I: qe }, Ii = Lt.litHtmlPolyfillSupport;
Ii?.(at, qe), (Lt.litHtmlVersions ??= []).push("3.3.3");
const Ui = (t, e, i) => {
  const r = i?.renderBefore ?? e;
  let o = r._$litPart$;
  if (o === void 0) {
    const a = i?.renderBefore ?? null;
    r._$litPart$ = o = new qe(e.insertBefore(rt(), a), a, void 0, i ?? {});
  }
  return o._$AI(t), o;
};
const Rt = globalThis;
let Ye = class extends Ve {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ui(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return $e;
  }
};
Ye._$litElement$ = !0, Ye.finalized = !0, Rt.litElementHydrateSupport?.({ LitElement: Ye });
const Gi = Rt.litElementPolyfillSupport;
Gi?.({ LitElement: Ye });
(Rt.litElementVersions ??= []).push("4.2.2");
const Vi = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
const Wi = { attribute: !0, type: String, converter: pt, reflect: !1, hasChanged: Nt }, Yi = (t = Wi, e, i) => {
  const { kind: r, metadata: o } = i;
  let a = globalThis.litPropertyMetadata.get(o);
  if (a === void 0 && globalThis.litPropertyMetadata.set(o, a = /* @__PURE__ */ new Map()), r === "setter" && ((t = Object.create(t)).wrapped = !0), a.set(i.name, t), r === "accessor") {
    const { name: n } = i;
    return { set(d) {
      const u = e.get.call(this);
      e.set.call(this, d), this.requestUpdate(n, u, t, !0, d);
    }, init(d) {
      return d !== void 0 && this.C(n, void 0, t, d), d;
    } };
  }
  if (r === "setter") {
    const { name: n } = i;
    return function(d) {
      const u = this[n];
      e.call(this, d), this.requestUpdate(n, u, t, !0, d);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function bt(t) {
  return (e, i) => typeof i == "object" ? Yi(t, e, i) : ((r, o, a) => {
    const n = o.hasOwnProperty(a);
    return o.constructor.createProperty(a, r), n ? Object.getOwnPropertyDescriptor(o, a) : void 0;
  })(t, e, i);
}
function vt(t) {
  return bt({ ...t, state: !0, attribute: !1 });
}
function pi(t) {
  return (e, i) => {
    const r = typeof e == "function" ? e : e[i];
    Object.assign(r, t);
  };
}
const Xi = { CHILD: 2 }, qi = (t) => (...e) => ({ _$litDirective$: t, values: e });
let Ki = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, i, r) {
    this._$Ct = e, this._$AM = i, this._$Ci = r;
  }
  _$AS(e, i) {
    return this.update(e, i);
  }
  update(e, i) {
    return this.render(...i);
  }
};
const { I: Ji } = Fi, Jt = (t) => t, Zt = () => document.createComment(""), je = (t, e, i) => {
  const r = t._$AA.parentNode, o = e === void 0 ? t._$AB : e._$AA;
  if (i === void 0) {
    const a = r.insertBefore(Zt(), o), n = r.insertBefore(Zt(), o);
    i = new Ji(a, n, t, t.options);
  } else {
    const a = i._$AB.nextSibling, n = i._$AM, d = n !== t;
    if (d) {
      let u;
      i._$AQ?.(t), i._$AM = t, i._$AP !== void 0 && (u = t._$AU) !== n._$AU && i._$AP(u);
    }
    if (a !== o || d) {
      let u = i._$AA;
      for (; u !== a; ) {
        const m = Jt(u).nextSibling;
        Jt(r).insertBefore(u, o), u = m;
      }
    }
  }
  return i;
}, ye = (t, e, i = t) => (t._$AI(e, i), t), Zi = {}, Qi = (t, e = Zi) => t._$AH = e, ji = (t) => t._$AH, St = (t) => {
  t._$AR(), t._$AA.remove();
};
const Qt = (t, e, i) => {
  const r = /* @__PURE__ */ new Map();
  for (let o = e; o <= i; o++) r.set(t[o], o);
  return r;
}, er = qi(class extends Ki {
  constructor(t) {
    if (super(t), t.type !== Xi.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(t, e, i) {
    let r;
    i === void 0 ? i = e : e !== void 0 && (r = e);
    const o = [], a = [];
    let n = 0;
    for (const d of t) o[n] = r ? r(d, n) : n, a[n] = i(d, n), n++;
    return { values: a, keys: o };
  }
  render(t, e, i) {
    return this.dt(t, e, i).values;
  }
  update(t, [e, i, r]) {
    const o = ji(t), { values: a, keys: n } = this.dt(e, i, r);
    if (!Array.isArray(o)) return this.ut = n, a;
    const d = this.ut ??= [], u = [];
    let m, l, p = 0, _ = o.length - 1, v = 0, y = a.length - 1;
    for (; p <= _ && v <= y; ) if (o[p] === null) p++;
    else if (o[_] === null) _--;
    else if (d[p] === n[v]) u[v] = ye(o[p], a[v]), p++, v++;
    else if (d[_] === n[y]) u[y] = ye(o[_], a[y]), _--, y--;
    else if (d[p] === n[y]) u[y] = ye(o[p], a[y]), je(t, u[y + 1], o[p]), p++, y--;
    else if (d[_] === n[v]) u[v] = ye(o[_], a[v]), je(t, o[p], o[_]), _--, v++;
    else if (m === void 0 && (m = Qt(n, v, y), l = Qt(d, p, _)), m.has(d[p])) if (m.has(d[_])) {
      const w = l.get(n[v]), T = w !== void 0 ? o[w] : null;
      if (T === null) {
        const c = je(t, o[p]);
        ye(c, a[v]), u[v] = c;
      } else u[v] = ye(T, a[v]), je(t, o[p], T), o[w] = null;
      v++;
    } else St(o[_]), _--;
    else St(o[p]), p++;
    for (; v <= y; ) {
      const w = je(t, u[y + 1]);
      ye(w, a[v]), u[v++] = w;
    }
    for (; p <= _; ) {
      const w = o[p++];
      w !== null && St(w);
    }
    return this.ut = n, Qi(t, u), $e;
  }
});
var jt, ei;
(function(t) {
  t.language = "language", t.system = "system", t.comma_decimal = "comma_decimal", t.decimal_comma = "decimal_comma", t.space_comma = "space_comma", t.none = "none";
})(jt || (jt = {})), function(t) {
  t.language = "language", t.system = "system", t.am_pm = "12", t.twenty_four = "24";
}(ei || (ei = {}));
function tr(t) {
  return t.substr(0, t.indexOf("."));
}
var ir = ["closed", "locked", "off"], nt = function(t, e, i, r) {
  r = r || {}, i = i ?? {};
  var o = new Event(e, { bubbles: r.bubbles === void 0 || r.bubbles, cancelable: !!r.cancelable, composed: r.composed === void 0 || r.composed });
  return o.detail = i, t.dispatchEvent(o), o;
}, tt = function(t) {
  nt(window, "haptic", t);
}, rr = function(t, e, i) {
  i === void 0 && (i = !1), i ? history.replaceState(null, "", e) : history.pushState(null, "", e), nt(window, "location-changed", { replace: i });
}, or = function(t, e, i) {
  i === void 0 && (i = !0);
  var r, o = tr(e), a = o === "group" ? "homeassistant" : o;
  switch (o) {
    case "lock":
      r = i ? "unlock" : "lock";
      break;
    case "cover":
      r = i ? "open_cover" : "close_cover";
      break;
    default:
      r = i ? "turn_on" : "turn_off";
  }
  return t.callService(a, r, { entity_id: e });
}, ar = function(t, e) {
  var i = ir.includes(t.states[e].state);
  return or(t, e, i);
}, nr = function(t, e, i, r) {
  if (r || (r = { action: "more-info" }), !r.confirmation || r.confirmation.exemptions && r.confirmation.exemptions.some(function(a) {
    return a.user === e.user.id;
  }) || (tt("warning"), confirm(r.confirmation.text || "Are you sure you want to " + r.action + "?"))) switch (r.action) {
    case "more-info":
      (i.entity || i.camera_image) && nt(t, "hass-more-info", { entityId: i.entity ? i.entity : i.camera_image });
      break;
    case "navigate":
      r.navigation_path && rr(0, r.navigation_path);
      break;
    case "url":
      r.url_path && window.open(r.url_path);
      break;
    case "toggle":
      i.entity && (ar(e, i.entity), tt("success"));
      break;
    case "call-service":
      if (!r.service) return void tt("failure");
      var o = r.service.split(".", 2);
      e.callService(o[0], o[1], r.service_data, r.target), tt("success");
      break;
    case "fire-dom-event":
      nt(t, "ll-custom", r);
  }
}, sr = function(t, e, i, r) {
  var o;
  r === "double_tap" && i.double_tap_action ? o = i.double_tap_action : r === "hold" && i.hold_action ? o = i.hold_action : r === "tap" && i.tap_action && (o = i.tap_action), nr(t, e, i, o);
};
const Tt = {
  primary_info: "name",
  secondary_info: "state",
  show_name: !0,
  show_state: !0,
  haptic_feedback: !0,
  slider_stepped_movement: !0,
  tap_slider_to_toggle: !0,
  show_slider: !0,
  hide_slider_when_off: !1,
  show_slider_percent: !0,
  color_type: "card",
  theme_preset: "glassmorphism",
  glassmorphism_blur: 16,
  glassmorphism_opacity: 0.25,
  fade_transition_enabled: !1,
  fade_trigger: "on_inactive",
  fade_target: "card",
  fade_smooth_retrigger: !0,
  show_decay_slider: !0,
  decay_slider_position: "bottom",
  decay_slider_height: 8,
  fade_stage_1_duration: 60,
  fade_stage_1_pickup: !0,
  fade_stage_1_color: "#ff9800",
  fade_stage_2_duration: 600,
  fade_stage_2_pickup: !0,
  fade_stage_2_color: "#cddc39",
  fade_stage_3_duration: 1800,
  fade_stage_3_pickup: !0,
  fade_stage_3_color: "#4caf50",
  features_position: "bottom",
  features_columns: 4,
  collapsible_sub_buttons: !1,
  auto_collapse: !1,
  collapse_timeout: 5e3,
  // Learned Formatting Defaults
  font_size_primary: 14,
  font_size_secondary: 15,
  font_weight_primary: "800",
  text_transform_primary: "capitalize",
  text_transform_secondary: "capitalize",
  letter_spacing: -0.5,
  line_height: 1.1,
  content_spacing: 6,
  text_spacing: -1,
  features_margin: -3,
  sub_button_spacing: -4,
  sub_button_padding: 6,
  card_padding_vertical: 0,
  card_padding_horizontal: 15,
  card_margin: -1,
  text_offset_x: -28,
  text_offset_y: 2,
  primary_text_start_offset: 8,
  primary_text_end_offset: 250,
  secondary_text_start_offset: 8,
  secondary_text_end_offset: 250,
  active_color: "rgb(214, 0, 0)",
  inactive_color: "rgb(3, 181, 0)"
}, ti = {
  glassmorphism: {
    name: "glassmorphism",
    label: "Frosted Glassmorphism",
    cssClass: "theme-glassmorphism",
    generateStyles: (t) => {
      const e = t.glassmorphism_blur ?? 16, i = t.glassmorphism_opacity ?? 0.25;
      return `
        --theme-backdrop-filter: blur(${e}px);
        --theme-background: rgba(255, 255, 255, ${i});
        --theme-border: 1px solid rgba(255, 255, 255, 0.2);
        --theme-box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
      `;
    }
  },
  neumorphism: {
    name: "neumorphism",
    label: "Soft Neumorphism",
    cssClass: "theme-neumorphism",
    generateStyles: (t) => {
      const e = t.neumorphism_depth ?? 6;
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
    generateStyles: (t) => {
      const e = t.cyberpunk_glow ?? "#00f0ff";
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
}, Bt = class Bt {
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
    const i = [
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
      e.text_color_mode
    ].join("|");
    if (this._computedStylesCache.has(i))
      return this._computedStylesCache.get(i);
    const r = e.card_padding_vertical ?? e.card_padding ?? 0, o = e.card_padding_horizontal ?? e.card_padding ?? 15, a = e.card_padding_top ?? r, n = e.card_padding_bottom ?? r, d = e.card_padding_left ?? o, u = e.card_padding_right ?? o, m = e.card_margin ?? -1, l = e.card_margin_vertical ?? m, p = e.card_margin_horizontal ?? m, _ = e.card_margin_top ?? l, v = e.card_margin_bottom ?? l, y = e.card_margin_left ?? p, w = e.card_margin_right ?? p;
    let T = "";
    (_ !== void 0 || v !== void 0 || y !== void 0 || w !== void 0) && (T = `margin: ${_ ?? 0}px ${w ?? 0}px ${v ?? 0}px ${y ?? 0}px;`);
    const c = e.border_radius ?? 12, f = e.slider_style === "google", $ = e.slider_style === "full", C = f ? 42 : $ ? 40 : 12, g = e.slider_height !== void 0 ? e.slider_height : C, b = f ? 21 : $ ? 0 : g / 2, M = e.slider_border_radius !== void 0 ? e.slider_border_radius : b, s = e.card_border_width ?? (e.card_border_color ? 1 : 0), h = e.card_border_style ?? "solid", x = s > 0 ? `border: ${s}px ${h} ${e.card_border_color || "var(--divider-color, rgba(150, 150, 150, 0.2))"};` : "", E = e.card_width ? `width: ${e.card_width};` : "", N = e.card_max_width ? `max-width: ${e.card_max_width};` : "", q = e.card_height ? `height: ${e.card_height};` : "", Ce = e.card_min_height !== void 0 ? `min-height: ${e.card_min_height}px;` : "", Ke = e.fill_container === !0 ? "height: 100%; width: 100%;" : "", se = e.overflow_hidden !== !1 ? "overflow: hidden;" : "overflow: visible;", Te = e.backdrop_blur !== void 0 ? `backdrop-filter: blur(${e.backdrop_blur}px); -webkit-backdrop-filter: blur(${e.backdrop_blur}px);` : "", Me = e.card_opacity !== void 0 ? `opacity: ${e.card_opacity / 100};` : "", le = e.transition_duration !== void 0 ? `transition: all ${e.transition_duration}ms ease;` : "", Ae = e.card_padding_vertical ?? 0, Je = e.card_padding_horizontal ?? 0, Pe = 0, Ee = 0, Ne = e.sub_button_padding ?? 6, Le = e.sub_button_container_padding ?? 0, F = e.sub_button_alignment ? `--ag-sub-button-alignment: ${e.sub_button_alignment};` : "--ag-sub-button-alignment: flex-end;", ce = e.text_scrolling_speed ? `--ag-scroll-speed: ${e.text_scrolling_speed}s;` : "", de = e.full_slider_opacity !== void 0 ? `--ag-full-slider-opacity: ${e.full_slider_opacity / 100};` : "", K = e.theme_preset || "glassmorphism", ie = ti[K] || ti.glassmorphism, ue = ie.generateStyles(e), De = [
      T,
      `border-radius: ${c}px;`,
      x,
      E,
      N,
      q,
      Ce,
      Ke,
      se,
      Te,
      Me,
      le,
      `--ag-card-padding: ${a}px ${u}px ${n}px ${d}px;`,
      `--ag-text-padding: ${Ae}px ${Je}px;`,
      `--ag-features-padding: ${Pe}px ${Ee}px;`,
      `--ag-sub-button-padding: ${Ne}px;`,
      `--ag-sub-button-container-padding: ${Le}px;`,
      `--ag-content-spacing: ${e.content_spacing ?? 6}px;`,
      `--ag-text-spacing: ${e.text_spacing ?? -1}px;`,
      `--ag-features-margin: ${e.features_margin ?? -3}px;`,
      `--ag-slider-spacing: ${e.slider_spacing ?? 6}px;`,
      `--ag-sub-button-spacing: ${e.sub_button_spacing ?? -4}px;`,
      `--ag-slider-height: ${g}px;`,
      `--ag-slider-radius: ${M}px;`,
      `--ag-text-alignment: ${e.text_alignment ?? "left"};`,
      `--ag-content-alignment: ${e.content_alignment ?? "flex-start"};`,
      F,
      ce,
      de,
      ue
    ].filter(Boolean).join(" ").trim(), Ze = [
      "ha-card",
      ie.cssClass,
      `layout-${e.layout || "default"}`,
      e.card_layout === "large" ? "card-large" : "",
      `slider-style-${e.slider_style ?? "circle"}`,
      e.text_color_mode === "inverse" ? "text-color-mode-inverse" : ""
    ].filter(Boolean).join(" "), re = Number(e.text_offset_x) || -28, Re = Number(e.text_offset_y) || 2, L = `transform: translate(${re}px, ${Re}px);`, O = Number(e.primary_text_start_offset ?? e.primary_text_offset_x) || 8, he = Number(e.primary_text_end_offset) || 250, H = Number(e.primary_text_offset_y) || 0, pe = O !== 0 || H !== 0 ? `transform: translate(${O}px, ${H}px);` : "", oe = O !== 0 || he !== 0 ? `margin-left: ${O}px; margin-right: ${he}px;` : "", J = `${pe} ${oe}`.trim(), Z = Number(e.secondary_text_start_offset ?? e.secondary_text_offset_x) || 8, B = Number(e.secondary_text_end_offset) || 250, _e = Number(e.secondary_text_offset_y) || 0, He = Z !== 0 || _e !== 0 ? `transform: translate(${Z}px, ${_e}px);` : "", Be = Z !== 0 || B !== 0 ? `margin-left: ${Z}px; margin-right: ${B}px;` : "", Oe = `${He} ${Be}`.trim(), ze = Number(e.features_offset_x) || 0, Fe = Number(e.features_offset_y) || 0, Ie = ze !== 0 || Fe !== 0 ? `transform: translate(${ze}px, ${Fe}px);` : "", Q = Number(e.slider_start_offset) || 0, I = Number(e.slider_end_offset) || 0, U = [
      Q ? `margin-left: ${Q}px !important;` : "",
      I ? `margin-right: ${I}px !important;` : ""
    ].filter(Boolean).join(" "), z = Number(e.color_temp_start_offset) || 0, A = Number(e.color_temp_end_offset) || 0, j = [
      z ? `margin-left: ${z}px !important;` : "",
      A ? `margin-right: ${A}px !important;` : ""
    ].filter(Boolean).join(" "), G = Number(e.color_slider_start_offset) || 0, V = Number(e.color_slider_end_offset) || 0, ae = [
      G ? `margin-left: ${G}px !important;` : "",
      V ? `margin-right: ${V}px !important;` : ""
    ].filter(Boolean).join(" "), W = e.text_box_width ? `max-width: ${e.text_box_width}; width: ${e.text_box_width};` : "width: 100%; max-width: 100%;", fe = e.font_family_primary ? `font-family: ${e.font_family_primary};` : "", ge = `font-size: ${e.font_size_primary ?? 14}px;`, me = `font-weight: ${e.font_weight_primary ?? "800"};`, Ue = `text-transform: ${e.text_transform_primary ?? "capitalize"};`, P = `letter-spacing: ${e.letter_spacing ?? -0.5}px;`, be = `line-height: ${e.line_height ?? 1.1};`, st = `${fe} ${ge} ${me} ${Ue} ${P} ${be}`.trim(), mi = e.font_family_secondary ? `font-family: ${e.font_family_secondary};` : "", bi = `font-size: ${e.font_size_secondary ?? 15}px;`, vi = e.font_weight_secondary ? `font-weight: ${e.font_weight_secondary};` : "", yi = `text-transform: ${e.text_transform_secondary ?? "capitalize"};`, xi = `${mi} ${bi} ${vi} ${yi} ${P} ${be}`.trim(), Ot = {
      staticCardStyles: De,
      staticCardClasses: Ze,
      textOffsetStyle: L,
      primaryTextOffsetStyle: J,
      secondaryTextOffsetStyle: Oe,
      featuresOffsetStyle: Ie,
      mainSliderMarginOffsets: U,
      colorTempMarginOffsets: j,
      colorHueMarginOffsets: ae,
      textBoxWidth: W,
      primaryTextStyle: st,
      secondaryTextStyle: xi
    };
    return this._computedStylesCache.set(i, Ot), Ot;
  }
};
Bt._computedStylesCache = /* @__PURE__ */ new Map();
let Mt = Bt;
class lr {
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
      const i = Number((e.usedJSHeapSize / 1048576).toFixed(2));
      i > this._peakMemoryMB && (this._peakMemoryMB = i);
    }
  }
  getMemorySnapshot() {
    this._updatePeakMemory();
    const e = performance?.memory, i = {
      activeCardsCount: this._activeCardInstances.size,
      peakJSHeapSizeMB: this._peakMemoryMB > 0 ? this._peakMemoryMB : void 0,
      timestamp: Date.now()
    };
    return e && (i.usedJSHeapSizeMB = Number((e.usedJSHeapSize / (1024 * 1024)).toFixed(2)), i.totalJSHeapSizeMB = Number((e.totalJSHeapSize / (1024 * 1024)).toFixed(2)), i.jsHeapSizeLimitMB = Number((e.jsHeapSizeLimit / (1024 * 1024)).toFixed(2))), i;
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
const ft = new lr();
class cr {
  constructor() {
    this._battery = null, this._isLowPower = !1, this._listeners = /* @__PURE__ */ new Set(), this._initBattery(), this._initSaveDataListener();
  }
  async _initBattery() {
    if (typeof navigator < "u" && "getBattery" in navigator)
      try {
        this._battery = await navigator.getBattery(), this._updatePowerState(), this._battery.addEventListener("chargingchange", () => {
          this._updatePowerState(), this._notifyListeners();
        }), this._battery.addEventListener("levelchange", () => {
          this._updatePowerState(), this._notifyListeners();
        });
      } catch {
      }
  }
  _initSaveDataListener() {
    if (typeof navigator < "u" && navigator.connection) {
      const e = navigator.connection;
      e.saveData && (this._isLowPower = !0), e.addEventListener?.("change", () => {
        e.saveData && (this._isLowPower = !0, this._notifyListeners());
      });
    }
  }
  _updatePowerState() {
    if (!this._battery) return;
    const e = !this._battery.charging && this._battery.level < 0.2, i = navigator?.connection?.saveData === !0;
    this._isLowPower = e || i;
  }
  addChangeListener(e) {
    return this._listeners.add(e), () => this._listeners.delete(e);
  }
  _notifyListeners() {
    for (const e of this._listeners)
      try {
        e();
      } catch (i) {
        console.error("Error in power listener:", i);
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
}
const we = new cr(), dr = {
  preserveDrawingBuffer: !1,
  powerPreference: "low-power",
  alpha: !0,
  antialias: !1,
  depth: !1,
  stencil: !1
};
function ur(t, e = dr) {
  try {
    const i = t.getContext("webgl2", e) || t.getContext("webgl", e) || t.getContext("experimental-webgl", e);
    return i ? (i.getExtension("ANGLE_instanced_arrays"), i.getExtension("EXT_color_buffer_half_float"), i.getExtension("OES_texture_half_float"), t.addEventListener("webglcontextlost", (r) => {
      r.preventDefault(), console.warn("Antigravity WebGL context lost");
    }, { passive: !1 }), t.addEventListener("webglcontextrestored", () => {
      console.info("Antigravity WebGL context restored");
    }, { passive: !0 }), i) : null;
  } catch (i) {
    return console.warn("WebGL init failed:", i), null;
  }
}
function _i(t) {
  if (t)
    try {
      const e = t.getParameter(t.MAX_VERTEX_ATTRIBS) || 16;
      for (let i = 0; i < e; ++i)
        t.disableVertexAttribArray(i);
      t.bindBuffer(t.ARRAY_BUFFER, null), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, null), t.bindRenderbuffer(t.RENDERBUFFER, null), t.bindFramebuffer(t.FRAMEBUFFER, null);
    } catch (e) {
      console.warn("WebGL cleanup warning:", e);
    }
}
async function fi() {
  const t = performance.now();
  let e = 0, i = 0;
  const r = (y, w) => {
    i++, y ? e++ : console.error(`❌ Assertion failed: ${w}`);
  }, o = ft.getMemorySnapshot();
  r(o.activeCardsCount >= 0, "Memory tracker active card count is non-negative");
  let a = !1;
  if (typeof document < "u") {
    const y = document.createElement("canvas"), w = ur(y);
    w && (a = !0, r(w.getParameter(w.MAX_VERTEX_ATTRIBS) > 0, "WebGL attributes available"), _i(w));
  }
  const n = 1e3;
  let d = 0;
  for (let y = 0; y < n; y++) {
    const w = performance.now();
    d += performance.now() - w;
  }
  const u = Number((d / n).toFixed(4));
  r(u < 0.1, "Benchmark iteration takes under 0.1ms");
  const m = we.isPowerSaveActive(), l = we.getTargetFrameIntervalMs();
  r(l === 16 || l === 33, "Frame target is either 16ms or 33ms");
  const p = performance.now() - t, _ = e === i, v = {
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    environment: typeof navigator < "u" ? navigator.userAgent : "Node/Test",
    renderBenchmarkMs: u,
    memoryUsageMB: o.usedJSHeapSizeMB || 0,
    powerSaveModeActive: m,
    webglSupported: a,
    assertionsPassed: e,
    totalAssertions: i,
    passed: _
  };
  return console.info(
    `%c 🧪 ANTIGRAVITY CI RUNNER %c Passed ${e}/${i} | Benchmark: ${u}ms/op | Duration: ${p.toFixed(2)}ms `,
    "color: white; background: #2e7d32; font-weight: 700; padding: 2px 6px; border-radius: 4px 0 0 4px;",
    "color: #2e7d32; background: #e8f5e9; font-weight: 700; padding: 2px 6px; border-radius: 0 4px 4px 0;"
  ), v;
}
typeof window < "u" && window.__RUN_CI__ && fi();
var hr = Object.defineProperty, Ht = (t, e, i, r) => {
  for (var o = void 0, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (o = n(e, i, o) || o);
  return o && hr(e, i, o), o;
};
const pr = [
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
], _r = [
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
], fr = [
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
], gr = [
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
], mr = [
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
], ii = [
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
function yt(t) {
  return [
    { name: `sub_button_${t}_entity`, selector: { entity: {} } },
    { name: `sub_button_${t}_type`, selector: { select: { options: [
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
    { name: `sub_button_${t}_icon`, selector: { icon: {} } },
    { name: `sub_button_${t}_name`, selector: { text: {} } },
    { name: `sub_button_${t}_show_state`, selector: { boolean: {} } },
    { name: `sub_button_${t}_color`, selector: { color_rgb: {} } },
    { name: `sub_button_${t}_show_background`, selector: { boolean: {} } },
    { name: `sub_button_${t}_tap_action`, selector: { ui_action: {} } },
    { name: `sub_button_${t}_hold_action`, selector: { ui_action: {} } },
    { name: `sub_button_${t}_double_tap_action`, selector: { ui_action: {} } }
  ];
}
const br = yt(1), vr = yt(2), yr = yt(3), xr = yt(4), wr = [
  { name: "tap_action", selector: { ui_action: {} } },
  { name: "hold_action", selector: { ui_action: {} } },
  { name: "double_tap_action", selector: { ui_action: {} } },
  { name: "custom_styles", selector: { text: { multiline: !0 } } }
], ri = {
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
function D(t) {
  if (typeof t != "string" || !t.trim()) return;
  const e = t.trim();
  if (ri[e.toLowerCase()])
    return ri[e.toLowerCase()];
  if (/^#[0-9a-fA-F]{3}$/.test(e))
    return `#${e[1]}${e[1]}${e[2]}${e[2]}${e[3]}${e[3]}`;
  if (/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(e)) {
    const o = e.split(",").map((a) => Math.max(0, Math.min(255, parseInt(a.trim(), 10))));
    return `#${o[0].toString(16).padStart(2, "0")}${o[1].toString(16).padStart(2, "0")}${o[2].toString(16).padStart(2, "0")}`;
  }
  const i = e.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/i);
  if (i) {
    const o = Math.max(0, Math.min(255, parseInt(i[1], 10))), a = Math.max(0, Math.min(255, parseInt(i[2], 10))), n = Math.max(0, Math.min(255, parseInt(i[3], 10)));
    return `#${o.toString(16).padStart(2, "0")}${a.toString(16).padStart(2, "0")}${n.toString(16).padStart(2, "0")}`;
  }
  const r = e.match(/hsla?\s*\(\s*([\d.]+)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?(?:\s*,\s*([\d.]+))?\s*\)/i);
  if (r) {
    const o = parseFloat(r[1]) / 360, a = parseFloat(r[2]) / 100, n = parseFloat(r[3]) / 100, d = (_, v, y) => (y < 0 && (y += 1), y > 1 && (y -= 1), y < 1 / 6 ? _ + (v - _) * 6 * y : y < 1 / 2 ? v : y < 2 / 3 ? _ + (v - _) * (2 / 3 - y) * 6 : _);
    let u, m, l;
    if (a === 0)
      u = m = l = n;
    else {
      const _ = n < 0.5 ? n * (1 + a) : n + a - n * a, v = 2 * n - _;
      u = d(v, _, o + 1 / 3), m = d(v, _, o), l = d(v, _, o - 1 / 3);
    }
    const p = (_) => Math.round(Math.max(0, Math.min(255, _ * 255))).toString(16).padStart(2, "0");
    return `#${p(u)}${p(m)}${p(l)}`;
  }
  return e;
}
function Sr(t) {
  const e = D(t);
  if (!e || !e.startsWith("#") || e.length < 7) return;
  const i = parseInt(e.slice(1, 3), 16), r = parseInt(e.slice(3, 5), 16), o = parseInt(e.slice(5, 7), 16);
  if (!(isNaN(i) || isNaN(r) || isNaN(o)))
    return [i, r, o];
}
const $r = {
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
class xt extends Ye {
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
    const i = { ...e };
    if (i.bg_color) {
      const r = typeof i.bg_color == "string" ? i.bg_color.match(/rgba\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*([\d.]+)\s*\)/i) : null;
      r && i.bg_opacity === void 0 && (i.bg_opacity = Math.round(parseFloat(r[1]) * 100)), i.bg_color = D(i.bg_color);
    }
    i.card_border_color && (i.card_border_color = D(i.card_border_color)), i.icon_color && (i.icon_color = D(i.icon_color)), i.active_color && (i.active_color = D(i.active_color)), i.inactive_color && (i.inactive_color = D(i.inactive_color)), i.badge_color && (i.badge_color = D(i.badge_color)), i.slider_color && (i.slider_color = D(i.slider_color)), i.slider_track_color && (i.slider_track_color = D(i.slider_track_color)), i.text_color_primary && (i.text_color_primary = D(i.text_color_primary)), i.text_color_secondary && (i.text_color_secondary = D(i.text_color_secondary)), i.sub_button_1_color && (i.sub_button_1_color = D(i.sub_button_1_color)), i.sub_button_2_color && (i.sub_button_2_color = D(i.sub_button_2_color)), i.sub_button_3_color && (i.sub_button_3_color = D(i.sub_button_3_color)), i.sub_button_4_color && (i.sub_button_4_color = D(i.sub_button_4_color)), this._config = {
      ...Tt,
      ...i
    };
  }
  _computeLabel(e) {
    return $r[e.name] || e.name;
  }
  _valueChanged(e, i) {
    let r = { ...this._config };
    const o = e.detail.value || {};
    for (const a of i)
      if (a.name)
        if (a.selector?.boolean !== void 0)
          o[a.name] !== void 0 ? r[a.name] = o[a.name] === !0 : delete r[a.name];
        else if (a.selector?.color_rgb !== void 0) {
          const n = o[a.name];
          Array.isArray(n) && n.length === 3 ? r[a.name] = `rgb(${n[0]}, ${n[1]}, ${n[2]})` : n !== void 0 && n !== "" ? r[a.name] = n : delete r[a.name];
        } else
          o[a.name] !== void 0 && o[a.name] !== "" ? r[a.name] = o[a.name] : delete r[a.name];
    nt(this, "config-changed", { config: r });
  }
  _transformConfigForForm() {
    const e = { ...this._config }, i = [
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
    for (const r of i)
      if (e[r]) {
        const o = Sr(e[r]);
        o && (e[r] = o);
      }
    return e;
  }
  _togglePanel(e) {
    this._openPanels = {
      ...this._openPanels,
      [e]: !this._openPanels[e]
    };
  }
  _renderSection(e, i, r, o, a) {
    const n = !!this._openPanels[e];
    return k`
      <div class="custom-panel ${n ? "open" : ""}">
        <div class="panel-header" @click=${() => this._togglePanel(e)}>
          <div class="header-left">
            <span class="header-icon">${i}</span>
            <span class="header-title">${r}</span>
          </div>
          <ha-icon class="chevron-icon ${n ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        ${n ? k`
          <div class="panel-body">
            <ha-form
              .hass=${this.hass}
              .data=${a}
              .schema=${o}
              .computeLabel=${this._computeLabel}
              @value-changed=${(d) => this._valueChanged(d, o)}
            ></ha-form>
          </div>
        ` : S}
      </div>
    `;
  }
  _renderSubButtonPanel(e, i, r, o) {
    const a = `sub${e}`, n = !!this._openPanels[a];
    return k`
      <div class="sub-nested-panel ${n ? "open" : ""}">
        <div class="sub-panel-header" @click=${() => this._togglePanel(a)}>
          <div class="header-left">
            <span class="sub-dot ${i ? "active" : ""}"></span>
            <span class="sub-title">Sub-Button ${e} ${i ? `(${i})` : "• Inactive"}</span>
          </div>
          <ha-icon class="chevron-icon ${n ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        ${n ? k`
          <div class="sub-panel-body">
            <ha-form
              .hass=${this.hass}
              .data=${o}
              .schema=${r}
              .computeLabel=${this._computeLabel}
              @value-changed=${(d) => this._valueChanged(d, r)}
            ></ha-form>
          </div>
        ` : S}
      </div>
    `;
  }
  render() {
    if (!this.hass || !this._config) return k``;
    const e = this._transformConfigForForm(), i = this._config?.sub_button_1_entity || "", r = this._config?.sub_button_2_entity || "", o = this._config?.sub_button_3_entity || "", a = this._config?.sub_button_4_entity || "", n = !!this._openPanels.sub_buttons;
    return k`
      <div class="editor-container">
        <!-- 1. CORE & LAYOUT -->
        ${this._renderSection("core", "📦", "Core & Layout", pr, e)}

        <!-- 2. APPEARANCE & THEMING -->
        ${this._renderSection("appearance", "🎨", "Appearance & Theming", _r, e)}

        <!-- 3. SLIDERS & CONTROLS -->
        ${this._renderSection("controls", "🎛️", "Sliders & Interactive Controls", fr, e)}

        <!-- 4. SPACING, PADDING & SIZING -->
        ${this._renderSection("spacing", "📏", "Spacing, Padding & Sizing", gr, e)}

        <!-- 5. TYPOGRAPHY & LIVE SCROLLING -->
        ${this._renderSection("typography", "✍️", "Typography & Live Scrolling", mr, e)}

        <!-- 6. CONSOLIDATED SUB-BUTTONS (1-4) -->
        <div class="custom-panel ${n ? "open" : ""}">
          <div class="panel-header" @click=${() => this._togglePanel("sub_buttons")}>
            <div class="header-left">
              <span class="header-icon">🔘</span>
              <span class="header-title">Sub-Buttons (1 – 4)</span>
            </div>
            <ha-icon class="chevron-icon ${n ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
          </div>
          ${n ? k`
            <div class="panel-body sub-buttons-master">
              <div class="section-subtitle">Global Sub-Button Layout</div>
              <ha-form
                .hass=${this.hass}
                .data=${e}
                .schema=${ii}
                .computeLabel=${this._computeLabel}
                @value-changed=${(d) => this._valueChanged(d, ii)}
              ></ha-form>
              
              <div class="sub-buttons-nested-list">
                ${this._renderSubButtonPanel(1, i, br, e)}
                ${this._renderSubButtonPanel(2, r, vr, e)}
                ${this._renderSubButtonPanel(3, o, yr, e)}
                ${this._renderSubButtonPanel(4, a, xr, e)}
              </div>
            </div>
          ` : S}
        </div>

        <!-- 7. ACTIONS & CUSTOM STYLESHEET -->
        ${this._renderSection("actions", "⚡", "Actions & Scoped CSS", wr, e)}
      </div>
    `;
  }
  static get styles() {
    return li`
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
Ht([
  bt({ attribute: !1 })
], xt.prototype, "hass");
Ht([
  vt()
], xt.prototype, "_config");
Ht([
  vt()
], xt.prototype, "_openPanels");
customElements.get("antigravity-with-icon-card-editor") || customElements.define("antigravity-with-icon-card-editor", xt);
var kr = Object.defineProperty, Cr = Object.getOwnPropertyDescriptor, ke = (t, e, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Cr(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (o = (r ? n(e, i, o) : n(o)) || o);
  return r && o && kr(e, i, o), o;
};
typeof window < "u" && (window.runAntigravityCI = fi, window.antigravityMemoryReport = () => ft.logStatus(), window.antigravityPowerStatus = () => we.isPowerSaveActive());
const Tr = "145";
console.info(
  `%c 🚀 ANTIGRAVITY-CARD (WITH-ICON) %c v${Tr} `,
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
  type: "antigravity-with-icon-card",
  name: "Antigravity Card (With Icon)",
  preview: !0,
  description: "A custom card merging Bubble Card styling with Mushroom Card controls, full icon customizations, and multi-stage fade transitions."
});
let We = Date.now();
typeof window < "u" && !window.__AG_RESUME_LISTENER_ATTACHED__ && (window.__AG_RESUME_LISTENER_ATTACHED__ = !0, window.addEventListener("focus", () => {
  We = Date.now();
}, { passive: !0 }), document.addEventListener("visibilitychange", () => {
  document.visibilityState === "visible" && (We = Date.now());
}, { passive: !0 }));
const Mr = /* @__PURE__ */ new Set([
  "on",
  "open",
  "opening",
  "active",
  "cleaning",
  "play",
  "playing",
  "cool",
  "heat",
  "fan_only",
  "auto",
  "dry",
  "home",
  "occupied",
  "motion",
  "detected",
  "running",
  "idle",
  "true",
  "1",
  "closing",
  "unlocked",
  "locking",
  "unlocking",
  "armed_home",
  "armed_away",
  "armed_night",
  "armed_vacation",
  "armed_custom_bypass",
  "triggered",
  "pending",
  "arming",
  "returning",
  "above_horizon",
  "electric",
  "gas",
  "heat_pump",
  "present"
]), Ar = /* @__PURE__ */ new Set([
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
]), Pr = /* @__PURE__ */ new Set(["hs", "xy", "rgb", "rgbw", "rgbww"]), Er = /* @__PURE__ */ new Set([
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
]), gi = /^\d+\s*,\s*\d+\s*,\s*\d+$/, Nr = /^\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+$/, lt = /* @__PURE__ */ new Map();
function X(t) {
  (isNaN(t) || !isFinite(t)) && (t = 3e3);
  const e = Math.max(1e3, Math.min(4e4, Math.round(t))), i = lt.get(e);
  if (i) return i;
  const r = e / 100;
  let o, a, n;
  if (r <= 66)
    o = 255;
  else {
    const u = r - 60;
    o = 329.698727446 * Math.pow(u, -0.1332047592), o = Math.max(0, Math.min(255, o));
  }
  if (r <= 66)
    a = r, a = 99.4708025861 * Math.log(a) - 161.1195681661, a = Math.max(0, Math.min(255, a));
  else {
    const u = r - 60;
    a = 288.1221695283 * Math.pow(u, -0.0755148492), a = Math.max(0, Math.min(255, a));
  }
  if (r >= 66)
    n = 255;
  else if (r <= 19)
    n = 0;
  else {
    const u = r - 10;
    n = 138.5177312231 * Math.log(u) - 305.0447927307, n = Math.max(0, Math.min(255, n));
  }
  const d = [Math.round(o), Math.round(a), Math.round(n)];
  return lt.size > 256 && lt.clear(), lt.set(e, d), d;
}
[2e3, 2200, 2500, 2700, 3e3, 3500, 4e3, 4500, 5e3, 5500, 6e3, 6500].forEach((t) => {
  X(t);
});
const ct = /* @__PURE__ */ new Map();
function dt(t) {
  if (!Array.isArray(t) || t.length < 3) return "#ffffff";
  const e = `${t[0]},${t[1]},${t[2]}`, i = ct.get(e);
  if (i) return i;
  const r = "#" + t.slice(0, 3).map((o) => Math.round(Number(o) || 0).toString(16).padStart(2, "0")).join("");
  return ct.size > 512 && ct.clear(), ct.set(e, r), r;
}
function Lr(t, e, i) {
  t /= 255, e /= 255, i /= 255;
  const r = Math.max(t, e, i), o = Math.min(t, e, i);
  let a = 0;
  const n = r - o;
  if (n === 0) return 0;
  switch (r) {
    case t:
      a = (e - i) / n + (e < i ? 6 : 0);
      break;
    case e:
      a = (i - t) / n + 2;
      break;
    case i:
      a = (t - e) / n + 4;
      break;
  }
  return Math.round(a * 60);
}
function $t(t, e) {
  t = t % 360 / 360, e = Math.max(0, Math.min(100, e)) / 100;
  const i = 1, r = Math.floor(t * 6), o = t * 6 - r, a = i * (1 - e), n = i * (1 - o * e), d = i * (1 - (1 - o) * e);
  let u = 0, m = 0, l = 0;
  switch (r % 6) {
    case 0:
      u = i, m = d, l = a;
      break;
    case 1:
      u = n, m = i, l = a;
      break;
    case 2:
      u = a, m = i, l = d;
      break;
    case 3:
      u = a, m = n, l = i;
      break;
    case 4:
      u = d, m = a, l = i;
      break;
    case 5:
      u = i, m = a, l = n;
      break;
  }
  return [Math.round(u * 255), Math.round(m * 255), Math.round(l * 255)];
}
const At = [
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
], Dr = [
  { k: 2200, label: "2200K", rgb: X(2200) },
  { k: 2700, label: "2700K", rgb: X(2700) },
  { k: 3e3, label: "3000K", rgb: X(3e3) },
  { k: 4e3, label: "4000K", rgb: X(4e3) },
  { k: 5e3, label: "5000K", rgb: X(5e3) },
  { k: 6500, label: "6500K", rgb: X(6500) }
], et = /* @__PURE__ */ new Map(), Rr = 200;
function Y(t) {
  if (!t) return null;
  const e = t.trim().toLowerCase();
  if (!e) return null;
  const i = et.get(e);
  if (i !== void 0) return i;
  const r = Hr(e);
  if (et.size >= Rr) {
    const o = et.keys().next().value;
    o && et.delete(o);
  }
  return et.set(e, r), r;
}
function Hr(t) {
  if (t.charCodeAt(0) === 35) {
    const e = t.slice(1);
    if (e.length === 6) {
      const i = parseInt(e, 16);
      if (!isNaN(i))
        return [i >> 16 & 255, i >> 8 & 255, i & 255];
    }
    if (e.length === 3) {
      const i = parseInt(e[0] + e[0], 16), r = parseInt(e[1] + e[1], 16), o = parseInt(e[2] + e[2], 16);
      return [i, r, o];
    }
  }
  if (t.startsWith("rgb")) {
    const e = t.indexOf("("), i = t.lastIndexOf(")");
    if (e !== -1 && i !== -1) {
      const r = t.slice(e + 1, i).split(",").map((o) => parseFloat(o.trim()));
      if (r.length >= 3 && !r.slice(0, 3).some(isNaN))
        return [
          Math.max(0, Math.min(255, Math.round(r[0]))),
          Math.max(0, Math.min(255, Math.round(r[1]))),
          Math.max(0, Math.min(255, Math.round(r[2])))
        ];
    }
  }
  if (t.startsWith("rgb")) {
    const e = t.indexOf("("), i = t.lastIndexOf(")");
    if (e !== -1 && i !== -1) {
      const r = t.slice(e + 1, i).split(",").map((o) => parseFloat(o.trim()));
      if (r.length >= 3 && !r.slice(0, 3).some(isNaN))
        return [
          Math.max(0, Math.min(255, Math.round(r[0]))),
          Math.max(0, Math.min(255, Math.round(r[1]))),
          Math.max(0, Math.min(255, Math.round(r[2])))
        ];
    }
  }
  if (gi.test(t)) {
    const e = t.split(",").map((i) => parseInt(i.trim(), 10));
    if (e.length >= 3 && !e.some(isNaN))
      return [e[0], e[1], e[2]];
  }
  for (let e = 0; e < At.length; e++) {
    const i = At[e];
    if (t === i.label.toLowerCase() || t === i.hex)
      return [i.rgb[0], i.rgb[1], i.rgb[2]];
  }
  return null;
}
function kt(t, e, i) {
  const r = Math.max(0, Math.min(1, i));
  return [
    Math.round(t[0] + (e[0] - t[0]) * r),
    Math.round(t[1] + (e[1] - t[1]) * r),
    Math.round(t[2] + (e[2] - t[2]) * r)
  ];
}
function Ct(t) {
  return `rgb(${t[0]}, ${t[1]}, ${t[2]})`;
}
const ut = Object.freeze({
  enabled: !1,
  activeFade: !1,
  currentColor: "",
  progressPct: 0,
  remainingSeconds: 0,
  currentStage: 0,
  stageLabel: ""
});
function R(t, e = !0) {
  if (!(!e || typeof window > "u"))
    try {
      if (tt(t), typeof window < "u" && window.dispatchEvent(new CustomEvent("haptic", { detail: t, bubbles: !0, composed: !0 })), typeof navigator < "u" && "vibrate" in navigator && typeof navigator.vibrate == "function") {
        let i = 6;
        t === "heavy" ? i = 20 : t === "medium" ? i = 12 : t === "success" ? i = [40, 40, 80] : t === "warning" ? i = [50, 30, 50] : t === "error" && (i = [50, 100, 50]), navigator.vibrate(i);
      }
    } catch {
    }
}
const Ge = /* @__PURE__ */ new Map(), oi = 250, ee = /* @__PURE__ */ new Map(), ai = 128;
function Br(t) {
  if (!t) return "";
  const e = Ge.get(t);
  if (e !== void 0) return e;
  const i = t.trim();
  if (!i)
    return Ge.set(t, ""), "";
  let r = i;
  if (i.startsWith("#") || i.startsWith("rgb") || i.startsWith("hsl") || i.startsWith("var(") ? r = i : gi.test(i) ? r = `rgb(${i})` : Nr.test(i) ? r = `rgba(${i})` : i.toLowerCase() === "state" ? r = "var(--state-icon-color, var(--primary-color))" : Ar.has(i.toLowerCase()) && (r = `var(--${i.toLowerCase()}-color, ${i.toLowerCase()})`), Ge.size >= oi) {
    const o = Math.floor(oi / 4), a = Ge.keys();
    for (let n = 0; n < o; n++) {
      const d = a.next().value;
      d !== void 0 && Ge.delete(d);
    }
  }
  return Ge.set(t, r), r;
}
let te = class extends Ye {
  constructor() {
    super(...arguments), this._previousLiveRgb = null, this._currentLiveRgb = null, this._lastTrackedState = null, this.preview = !1, this._collapsed = !0, this._holdTimer = null, this._held = !1, this._moved = !1, this._tapTimer = null, this._throttleMap = /* @__PURE__ */ new Map(), this._startX = 0, this._startY = 0, this._subHoldTimer = null, this._subHeld = !1, this._subMoved = !1, this._subStartX = 0, this._subStartY = 0, this._subTapTimerMap = /* @__PURE__ */ new Map(), this._monitoredEntities = [], this._powerUnsubscribe = null, this._gl = null, this._staticCardStyles = "", this._staticCardClasses = "", this._textOffsetStyle = "", this._iconOffsetStyle = "", this._featuresOffsetStyle = "", this._mainSliderMarginOffsets = "", this._colorTempMarginOffsets = "", this._colorHueMarginOffsets = "", this._textBoxWidth = "", this._primaryTextStyle = "", this._secondaryTextStyle = "", this._primaryTextOffsetStyle = "", this._secondaryTextOffsetStyle = "", this._iconShapeClass = "", this._iconAnimClass = "", this._iconContainerSize = 36, this._iconSize = 24, this._iconOpacityStyle = "", this._iconRotateStyle = "", this._fadeStaticConfig = null, this._relativeTimer = null, this._cachedSubButtons = null, this._intersectionObserver = null, this._cachedHasCollapsible = !1, this._mountTime = 0, this._pointerDownReceived = !1, this._pointerDownTime = 0, this._canceled = !1, this._activePointerId = null, this._subCanceled = !1, this._subPointerDownTime = 0, this._sliderStateMap = /* @__PURE__ */ new WeakMap(), this._onSliderPointerDown = (t) => {
      const e = t.currentTarget;
      if (!e) return;
      const r = e.closest(".slider-container, .sub-button-slider-container")?.querySelector(".slider-percent-badge, .sub-slider-pct"), o = Number(e.value) || 0, a = e.style.getPropertyValue("--slider-pct") || "", n = r?.textContent || "";
      this._sliderStateMap.set(e, {
        startX: t.clientX,
        startY: t.clientY,
        initialVal: o,
        initialPct: a,
        initialBadge: n,
        isScrolling: !1,
        isSliding: !1
      });
    }, this._onSliderPointerMove = (t) => {
      const e = t.currentTarget;
      if (!e) return;
      const i = this._sliderStateMap.get(e);
      if (!i) return;
      const r = Math.abs(t.clientX - i.startX), o = Math.abs(t.clientY - i.startY);
      !i.isSliding && !i.isScrolling ? o > 6 && o > r ? (i.isScrolling = !0, this._revertSlider(e, i)) : r > 6 && r >= o && (i.isSliding = !0) : i.isScrolling && this._revertSlider(e, i);
    }, this._onSliderPointerCancel = (t) => {
      const e = t.currentTarget;
      if (!e) return;
      const i = this._sliderStateMap.get(e);
      i && (i.isScrolling = !0, this._revertSlider(e, i), this._sliderStateMap.delete(e));
    }, this._onSliderPointerUp = (t) => {
      const e = t.currentTarget;
      if (!e) return;
      const i = this._sliderStateMap.get(e);
      if (i) {
        if (i.isScrolling) {
          this._revertSlider(e, i), this._sliderStateMap.delete(e);
          return;
        }
        if (this.config.tap_slider_to_toggle && !i.isSliding) {
          const r = Math.abs(t.clientX - i.startX), o = Math.abs(t.clientY - i.startY);
          r < 6 && o < 6 && (this._revertSlider(e, i), R("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap"));
        }
      }
    };
  }
  // --- SECTIONS LAYOUT SUPPORT ---
  getGridOptions() {
    const t = this.config?.card_layout === "large";
    return {
      columns: { min: 2, default: 4, max: 6 },
      rows: { min: 1, default: t ? 2 : 1, max: 4 }
    };
  }
  // --- CARD SIZE FOR MASONRY/PANEL VIEWS ---
  getCardSize() {
    return this.config?.card_layout === "large" ? 3 : 2;
  }
  static getStubConfig() {
    return { ...Tt };
  }
  static async getConfigElement() {
    return document.createElement("antigravity-with-icon-card-editor");
  }
  setConfig(t) {
    if (!t)
      throw new Error("Invalid configuration");
    this.config = {
      ...Tt,
      ...t
    }, this._cachedSubButtons = null;
    const e = /* @__PURE__ */ new Set();
    if (this.config.entity && e.add(this.config.entity), this.config.sub_button_1_entity && e.add(this.config.sub_button_1_entity), this.config.sub_button_2_entity && e.add(this.config.sub_button_2_entity), this.config.sub_button_3_entity && e.add(this.config.sub_button_3_entity), this.config.sub_button_4_entity && e.add(this.config.sub_button_4_entity), this.config.tap_action?.target?.entity_id) {
      const i = this.config.tap_action.target.entity_id;
      typeof i == "string" ? e.add(i) : Array.isArray(i) && i.forEach((r) => e.add(r));
    }
    if (this.config.hold_action?.target?.entity_id) {
      const i = this.config.hold_action.target.entity_id;
      typeof i == "string" ? e.add(i) : Array.isArray(i) && i.forEach((r) => e.add(r));
    }
    this._monitoredEntities = Array.from(e), this._computeStaticStylesAndClasses();
  }
  shouldUpdate(t) {
    if (!this.config || !this.hass || t.has("config") || t.has("preview") || t.has("_collapsed")) return !0;
    const e = t.get("hass");
    if (!e || e.themes !== this.hass.themes || e.locale !== this.hass.locale || e.language !== this.hass.language || e.selectedTheme !== this.hass.selectedTheme)
      return !0;
    const i = this._monitoredEntities, r = i.length;
    for (let o = 0; o < r; o++) {
      const a = i[o];
      if (e.states[a] !== this.hass.states[a])
        return !0;
    }
    return !1;
  }
  _computeStaticStylesAndClasses() {
    if (!this.config) return;
    const t = this.config.card_padding_vertical ?? this.config.card_padding ?? 0, e = this.config.card_padding_horizontal ?? this.config.card_padding ?? 15, i = this.config.card_padding_top ?? t, r = this.config.card_padding_bottom ?? t, o = this.config.card_padding_left ?? e, a = this.config.card_padding_right ?? e, n = this.config.card_margin ?? -1, d = this.config.card_margin_vertical ?? n, u = this.config.card_margin_horizontal ?? n, m = this.config.card_margin_top ?? d, l = this.config.card_margin_bottom ?? d, p = this.config.card_margin_left ?? u, _ = this.config.card_margin_right ?? u;
    let v = "";
    (m !== void 0 || l !== void 0 || p !== void 0 || _ !== void 0) && (v = `margin: ${m ?? 0}px ${_ ?? 0}px ${l ?? 0}px ${p ?? 0}px;`);
    const y = this.config.border_radius ?? 12, w = this.config.slider_style === "google", T = this.config.slider_style === "full", c = w ? 42 : T ? 40 : 12, f = this.config.slider_height !== void 0 ? this.config.slider_height : c, $ = w ? 21 : T ? 0 : f / 2, C = this.config.slider_border_radius !== void 0 ? this.config.slider_border_radius : $, g = this.config.card_border_width ?? (this.config.card_border_color ? 1 : 0), b = this.config.card_border_style ?? "solid", M = g > 0 ? `border: ${g}px ${b} ${this._resolveColor(this.config.card_border_color) || "var(--divider-color, rgba(150, 150, 150, 0.2))"};` : "", s = this.config.card_width ? `width: ${this.config.card_width};` : "", h = this.config.card_max_width ? `max-width: ${this.config.card_max_width};` : "", x = this.config.card_height ? `height: ${this.config.card_height};` : "", E = this.config.card_min_height !== void 0 ? `min-height: ${this.config.card_min_height}px;` : "", N = this.config.fill_container === !0 ? "height: 100%; width: 100%;" : "", q = this.config.overflow_hidden !== !1 ? "overflow: hidden;" : "overflow: visible;", Ce = this.config.backdrop_blur !== void 0 ? `backdrop-filter: blur(${this.config.backdrop_blur}px); -webkit-backdrop-filter: blur(${this.config.backdrop_blur}px);` : "", Ke = this.config.card_opacity !== void 0 ? `opacity: ${this.config.card_opacity / 100};` : "", se = this.config.transition_duration !== void 0 ? `transition: all ${this.config.transition_duration}ms ease;` : "", Te = this.config.icon_padding !== void 0 ? `--ag-icon-padding: ${this.config.icon_padding}px;` : "", Me = this.config.text_padding_vertical ?? this.config.text_padding ?? 0, le = this.config.text_padding_horizontal ?? this.config.text_padding ?? 0, Ae = this.config.features_padding_vertical ?? this.config.features_padding ?? 0, Je = this.config.features_padding_horizontal ?? this.config.features_padding ?? 0, Pe = this.config.sub_button_padding ?? 6, Ee = this.config.sub_button_container_padding ?? 0, Ne = this.config.sub_button_alignment ? `--ag-sub-button-alignment: ${this.config.sub_button_alignment};` : "--ag-sub-button-alignment: flex-end;", Le = this.config.text_scrolling_speed ? `--ag-scroll-speed: ${this.config.text_scrolling_speed}s;` : "", F = this.config.full_slider_opacity !== void 0 ? `--ag-full-slider-opacity: ${this.config.full_slider_opacity / 100};` : "";
    this._staticCardStyles = [
      v,
      `border-radius: ${y}px;`,
      M,
      s,
      h,
      x,
      E,
      N,
      q,
      Ce,
      Ke,
      se,
      Te,
      `--ag-card-padding: ${i}px ${a}px ${r}px ${o}px;`,
      `--ag-text-padding: ${Me}px ${le}px;`,
      `--ag-features-padding: ${Ae}px ${Je}px;`,
      `--ag-sub-button-padding: ${Pe}px;`,
      `--ag-sub-button-container-padding: ${Ee}px;`,
      `--ag-content-spacing: ${this.config.content_spacing ?? 6}px;`,
      `--ag-text-spacing: ${this.config.text_spacing ?? -1}px;`,
      `--ag-features-margin: ${this.config.features_margin ?? -3}px;`,
      `--ag-slider-spacing: ${this.config.slider_spacing ?? 6}px;`,
      `--ag-icon-margin: ${this.config.icon_margin ?? 0}px;`,
      `--ag-sub-button-spacing: ${this.config.sub_button_spacing ?? -4}px;`,
      `--ag-slider-height: ${f}px;`,
      `--ag-slider-radius: ${C}px;`,
      `--ag-badge-size: ${this.config.badge_size ?? 16}px;`,
      `--ag-badge-offset: ${this.config.badge_offset ?? -2}px;`,
      `--ag-text-alignment: ${this.config.text_alignment ?? "left"};`,
      `--ag-content-alignment: ${this.config.content_alignment ?? "flex-start"};`,
      Ne,
      Le,
      F
    ].filter(Boolean).join(" "), this._staticCardClasses = [
      `layout-${this.config.layout}`,
      this.config.card_layout === "large" ? "card-large" : "",
      `theme-${this.config.theme_preset ?? "default"}`,
      `hover-${this.config.hover_effect ?? "glow"}`,
      `slider-style-${this.config.slider_style ?? "circle"}`,
      this.config.text_color_mode === "inverse" ? "text-color-mode-inverse" : ""
    ].filter(Boolean).join(" ");
    const ce = this.config.text_offset_x !== void 0 ? Number(this.config.text_offset_x) : -28, de = this.config.text_offset_y !== void 0 ? Number(this.config.text_offset_y) : 2;
    this._textOffsetStyle = ce !== 0 || de !== 0 ? `transform: translate(${ce}px, ${de}px);` : "";
    const K = Number(this.config.primary_text_start_offset ?? this.config.primary_text_offset_x ?? 8), ie = Number(this.config.primary_text_end_offset ?? 250), ue = Number(this.config.primary_text_offset_y) || 0, De = K !== 0 || ue !== 0 ? `transform: translate(${K}px, ${ue}px);` : "", Ze = K !== 0 || ie !== 0 ? `margin-left: ${K}px; margin-right: ${ie}px;` : "";
    this._primaryTextOffsetStyle = `${De} ${Ze}`.trim();
    const re = Number(this.config.secondary_text_start_offset ?? this.config.secondary_text_offset_x ?? 8), Re = Number(this.config.secondary_text_end_offset ?? 250), L = Number(this.config.secondary_text_offset_y) || 0, O = re !== 0 || L !== 0 ? `transform: translate(${re}px, ${L}px);` : "", he = re !== 0 || Re !== 0 ? `margin-left: ${re}px; margin-right: ${Re}px;` : "";
    this._secondaryTextOffsetStyle = `${O} ${he}`.trim();
    const H = Number(this.config.icon_offset_x) || 0, pe = Number(this.config.icon_offset_y) || 0;
    this._iconOffsetStyle = H !== 0 || pe !== 0 ? `transform: translate(${H}px, ${pe}px);` : "";
    const oe = Number(this.config.features_offset_x) || 0, J = Number(this.config.features_offset_y) || 0;
    this._featuresOffsetStyle = oe !== 0 || J !== 0 ? `transform: translate(${oe}px, ${J}px);` : "";
    const Z = Number(this.config.slider_start_offset) || 0, B = Number(this.config.slider_end_offset) || 0;
    this._mainSliderMarginOffsets = [
      Z ? `margin-left: ${Z}px !important;` : "",
      B ? `margin-right: ${B}px !important;` : ""
    ].filter(Boolean).join(" ");
    const _e = Number(this.config.color_temp_start_offset) || 0, He = Number(this.config.color_temp_end_offset) || 0;
    this._colorTempMarginOffsets = [
      _e ? `margin-left: ${_e}px !important;` : "",
      He ? `margin-right: ${He}px !important;` : ""
    ].filter(Boolean).join(" ");
    const Be = Number(this.config.color_slider_start_offset) || 0, Oe = Number(this.config.color_slider_end_offset) || 0;
    this._colorHueMarginOffsets = [
      Be ? `margin-left: ${Be}px !important;` : "",
      Oe ? `margin-right: ${Oe}px !important;` : ""
    ].filter(Boolean).join(" "), this._textBoxWidth = this.config.text_box_width ? `max-width: ${this.config.text_box_width}; width: ${this.config.text_box_width};` : "width: 100%; max-width: 100%;";
    const ze = `text-transform: ${this.config.text_transform_primary ?? "capitalize"};`, Fe = `text-transform: ${this.config.text_transform_secondary ?? "capitalize"};`, Ie = `letter-spacing: ${this.config.letter_spacing ?? -0.5}px;`, Q = `line-height: ${this.config.line_height ?? 1.1};`, I = this.config.font_weight_primary ?? "800";
    this._primaryTextStyle = `font-size: ${this.config.font_size_primary ?? 14}px; font-weight: ${I}; ${ze} ${Ie} ${Q}`, this._secondaryTextStyle = `font-size: ${this.config.font_size_secondary ?? 15}px; ${Fe} ${Ie} ${Q}`, this._iconShapeClass = `icon-shape-${this.config.icon_shape || "circle"}`, this._iconAnimClass = `anim-${this.config.icon_animation || "none"}`, this._iconContainerSize = this.config.icon_container_size ?? (this.config.card_layout === "large" ? 48 : 36), this._iconSize = this.config.icon_size ?? 24, this._iconOpacityStyle = this.config.icon_opacity !== void 0 && this.config.icon_opacity < 100 ? `opacity: ${this.config.icon_opacity / 100};` : "", this._iconRotateStyle = this.config.icon_rotate && this.config.icon_rotate !== 0 ? `transform: rotate(${this.config.icon_rotate}deg);` : "";
    const U = this.config.entity, z = [];
    for (let A = 1; A <= 4; A++) {
      const j = this.config[`sub_button_${A}_entity`], G = this.config[`sub_button_${A}_icon`], V = this.config[`sub_button_${A}_name`], ae = this.config[`sub_button_${A}_tap_action`], W = this.config[`sub_button_${A}_hold_action`], fe = this.config[`sub_button_${A}_double_tap_action`], ge = this.config[`sub_button_${A}_type`], me = this.config[`sub_button_${A}_color`], Ue = this.config[`sub_button_${A}_show_background`], P = this.config[`sub_button_${A}_show_state`];
      if (!!(j || G || V || ge && ge !== "button" || P)) {
        const st = j || U;
        z.push(Object.freeze({
          key: `${st || "sub"}_${A}`,
          entity: st,
          type: ge || "button",
          icon: G,
          color: me,
          bg: Ue,
          name: V,
          showState: P === !0,
          tapAction: ae,
          holdAction: W,
          doubleTapAction: fe
        }));
      }
    }
    if (this._cachedSubButtons = Object.freeze(z), this.config.fade_transition_enabled) {
      const A = Number(this.config.fade_stage_1_duration) || 60, j = Number(this.config.fade_stage_2_duration) || 600, G = Number(this.config.fade_stage_3_duration) || 1800, V = Y(this.config.fade_stage_1_color) || [255, 152, 0], ae = Y(this.config.fade_stage_2_color) || [205, 220, 57], W = Y(this.config.fade_stage_3_color);
      this._fadeStaticConfig = {
        d1: A,
        d2: j,
        d3: G,
        totalDuration: A + j + G,
        c1Rgb: V,
        c2Rgb: ae,
        c3Rgb: W,
        restingResult: Object.freeze({
          enabled: !0,
          activeFade: !1,
          currentColor: W ? Ct(W) : "",
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
    const t = this.hass.states[this.config.entity];
    if (!t) {
      this._cachedHasCollapsible = !1;
      return;
    }
    const i = this.config.entity.split(".")[0] === "light", r = t.state === "on", o = this.config.hide_color_temp_when_off !== !1, a = this.config.hide_color_picker_when_off !== !1, n = this.config.hide_color_slider_when_off !== !1, d = t.attributes?.color_temp_kelvin ?? t.attributes?.color_temp, u = i && this.config.show_color_temp === !0 && (d !== void 0 || t.attributes?.supported_color_modes?.some((T) => ["color_temp"].includes(T))) && (!o || r), m = t.attributes?.supported_color_modes, l = Array.isArray(m) && m.some((T) => ["hs", "xy", "rgb", "rgbw", "rgbww"].includes(T)), p = this.config.color_picker_type !== "wheel", _ = i && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && p) && l && (!n || r), v = i && this.config.show_color_picker === !0 && !p && l && (!a || r), y = u || _ || v, w = this._getSubButtons();
    this._cachedHasCollapsible = y || w.length > 0;
  }
  connectedCallback() {
    super.connectedCallback(), ft.registerCard(this), this._mountTime = Date.now(), this._pointerDownReceived = !1, this._powerUnsubscribe = we.addChangeListener(() => {
      this._updatePowerSaveAttribute();
    }), this._updatePowerSaveAttribute(), this._setupRelativeTimer(), this._setupIntersectionObserver();
  }
  _updatePowerSaveAttribute() {
    we.isPowerSaveActive(this.hass) ? this.setAttribute("power-save", "") : this.removeAttribute("power-save");
  }
  _setupIntersectionObserver() {
    typeof IntersectionObserver > "u" || this._intersectionObserver || (this._intersectionObserver = new IntersectionObserver((t) => {
      for (const e of t)
        e.isIntersecting ? this.removeAttribute("offscreen") : this.setAttribute("offscreen", "");
    }, { rootMargin: "200px 0px", threshold: 0 }), this._intersectionObserver.observe(this));
  }
  _setupRelativeTimer() {
    const t = this.config?.primary_info, e = this.config?.secondary_info, i = this.config?.entity, r = i ? i.split(".")[0] : "", o = (r === "binary_sensor" || r === "timer") && (t === "state" || e === "state"), a = this.config?.fade_transition_enabled === !0, n = i && this.hass ? this.hass.states[i] : null;
    let d = !1;
    if (a && n) {
      const m = this._calculateMultiStageFade(n);
      d = m.enabled && m.activeFade && m.progressPct < 100;
    }
    const u = d || o || t === "last-changed" || t === "last_changed" || t === "last-updated" || t === "last_updated" || t === "last-triggered" || e === "last-changed" || e === "last_changed" || e === "last-updated" || e === "last_updated" || e === "last-triggered";
    if (u && !this._relativeTimer) {
      let m = d ? 1e3 : 5e3;
      const l = n?.attributes?.last_triggered || n?.last_changed || n?.last_updated;
      if (l && !d && !o) {
        const p = this._parseDate(l);
        if (p) {
          const _ = Math.max(0, (Date.now() - p.getTime()) / 1e3 | 0);
          _ > 3600 ? m = 6e4 : _ > 60 && (m = 15e3);
        }
      }
      we.isPowerSaveActive(this.hass) && (m = Math.max(m, 1e4)), this._relativeTimer = setInterval(() => {
        if (!this.hasAttribute("offscreen") && this.style.display !== "none") {
          if (d && !this._isFadeActive()) {
            this._setupRelativeTimer();
            return;
          }
          this.requestUpdate();
        }
      }, m);
    } else !u && this._relativeTimer && (clearInterval(this._relativeTimer), this._relativeTimer = null);
  }
  _isFadeActive() {
    const t = this.config?.entity;
    if (!t || !this.hass) return !1;
    const e = this.hass.states[t];
    if (!e) return !1;
    const i = this._calculateMultiStageFade(e);
    return i.enabled && i.activeFade && i.progressPct < 100;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), ft.unregisterCard(this), this._powerUnsubscribe && (this._powerUnsubscribe(), this._powerUnsubscribe = null), this._gl && (_i(this._gl), this._gl = null), this._throttleMap.clear(), this._subTapTimerMap.forEach((t) => clearTimeout(t)), this._subTapTimerMap.clear(), this._intersectionObserver && (this._intersectionObserver.disconnect(), this._intersectionObserver = null), this._relativeTimer && (clearInterval(this._relativeTimer), this._relativeTimer = null), this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null), this._tapTimer && (clearTimeout(this._tapTimer), this._tapTimer = null), this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
  }
  firstUpdated(t) {
    super.firstUpdated(t);
  }
  updated(t) {
    if (super.updated(t), this._updateVisibility(), t.has("config") || t.has("_collapsed"))
      this._recomputeHasCollapsible(), this._setupRelativeTimer();
    else if (t.has("hass") && this.config?.entity) {
      const e = t.get("hass");
      (!e || e.states[this.config.entity] !== this.hass.states[this.config.entity]) && (this._recomputeHasCollapsible(), this._setupRelativeTimer());
    }
  }
  _toggleDisplay(t) {
    if (this.preview) {
      this.style.display === "none" && this.style.removeProperty("display"), this.hidden = !1;
      return;
    }
    t ? (this.style.setProperty("display", "none", "important"), this.hidden = !0) : (this.style.display === "none" && this.style.removeProperty("display"), this.hidden = !1);
  }
  _updateVisibility() {
    if (!this.config || !this.hass) return;
    const t = this.config.visibility_state;
    if (!t || t === "always") {
      this._toggleDisplay(!1);
      return;
    }
    const e = this.config.entity, i = e ? this.hass.states[e] : void 0;
    if (!i) {
      this._toggleDisplay(!1);
      return;
    }
    const r = i.state === "on" || this._isEntityActive(i);
    let o = !1;
    (t === "on" && !r || t === "off" && r) && (o = !0), this._toggleDisplay(o);
  }
  _isEntityActive(t) {
    return t ? Mr.has(t.state) : !1;
  }
  _calculateMultiStageFade(t, e = "", i = "") {
    if (!this.config?.fade_transition_enabled || !t)
      return ut;
    const r = this._isEntityActive(t), o = this.config.fade_trigger ?? "on_inactive";
    if (!(o === "on_inactive" && !r || o === "on_active" && r || o === "both"))
      return ut;
    const n = r ? this._resolveColor(this.config.inactive_color) || i || "#4caf50" : this._resolveColor(this.config.active_color) || e || "#d60000", d = r ? this._resolveColor(this.config.active_color) || e || "#d60000" : this._resolveColor(this.config.inactive_color) || i || "#03b100", u = Y(n) || [214, 0, 0], m = Y(d) || [3, 177, 0], l = this._fadeStaticConfig, p = l?.d1 ?? (Number(this.config.fade_stage_1_duration) || 60), _ = l?.d2 ?? (Number(this.config.fade_stage_2_duration) || 600), v = l?.d3 ?? (Number(this.config.fade_stage_3_duration) || 1800), y = l?.totalDuration ?? p + _ + v;
    if (y <= 0)
      return ut;
    this._lastTrackedState !== null && this._lastTrackedState !== t.state && this._currentLiveRgb && this.config.fade_smooth_retrigger !== !1 && (this._previousLiveRgb = this._currentLiveRgb), this._lastTrackedState = t.state;
    const w = this.config.fade_stage_1_pickup !== !1 && this._previousLiveRgb && this.config.fade_smooth_retrigger !== !1 ? this._previousLiveRgb : u, T = l?.c1Rgb ?? (Y(this.config.fade_stage_1_color) || [255, 152, 0]), c = this.config.fade_stage_2_pickup !== !1 ? T : u, f = l?.c2Rgb ?? (Y(this.config.fade_stage_2_color) || [205, 220, 57]), $ = this.config.fade_stage_3_pickup !== !1 ? f : T, C = l?.c3Rgb ?? (Y(this.config.fade_stage_3_color) || m), g = this._parseDate(t.last_changed || t.last_updated);
    if (!g)
      return ut;
    const b = Math.max(0, (Date.now() - g.getTime()) / 1e3);
    if (b >= y)
      return this._currentLiveRgb = C, this._previousLiveRgb = null, l?.restingResult ? l.restingResult : {
        enabled: !0,
        activeFade: !1,
        currentColor: Ct(C),
        progressPct: 100,
        remainingSeconds: 0,
        currentStage: 0,
        stageLabel: "Resting"
      };
    let M, s = 1, h = 0;
    const x = Math.max(0, Math.round(y - b));
    b < p && p > 0 ? (s = 1, h = b / p, M = kt(w, T, h)) : b < p + _ && _ > 0 ? (s = 2, h = (b - p) / _, M = kt(c, f, h)) : v > 0 ? (s = 3, h = (b - p - _) / v, M = kt($, C, h)) : (s = 0, M = C), this._currentLiveRgb = M;
    const E = Math.min(100, Math.round(b / y * 100)), N = Ct(M);
    let q = "";
    return x >= 60 ? q = `${Math.ceil(x / 60)}m left` : q = `${x}s left`, {
      enabled: !0,
      activeFade: !0,
      currentColor: N,
      progressPct: E,
      remainingSeconds: x,
      currentStage: s,
      stageLabel: q
    };
  }
  _resolveColor(t) {
    return Br(t);
  }
  // Shared date parser — eliminates duplication between _formatRelativeTime and _formatForDuration
  _parseDate(t) {
    if (!t) return null;
    if (t instanceof Date) return isNaN(t.getTime()) ? null : t;
    if (typeof t == "number") {
      const e = new Date(t > 1e11 ? t : t * 1e3);
      return isNaN(e.getTime()) ? null : e;
    }
    if (typeof t == "string") {
      const e = ee.get(t);
      if (e) return e;
      const i = Date.parse(t);
      if (!isNaN(i)) {
        const d = new Date(i);
        if (ee.size >= ai) {
          const u = ee.keys().next().value;
          u !== void 0 && ee.delete(u);
        }
        return ee.set(t, d), d;
      }
      let r = t.trim();
      r.includes(" ") && !r.includes("T") && (r = r.replace(" ", "T")), r.includes("T") && !r.endsWith("Z") && !/[+-]\d{2}:\d{2}$/.test(r) && !/[+-]\d{4}$/.test(r) && (r += "Z");
      const o = Number(r);
      let a;
      !isNaN(o) && r !== "" && !r.includes("T") ? a = new Date(o > 1e11 ? o : o * 1e3) : a = new Date(r);
      const n = isNaN(a.getTime()) ? null : a;
      if (n) {
        if (ee.size >= ai) {
          const d = ee.keys().next().value;
          d !== void 0 && ee.delete(d);
        }
        ee.set(t, n);
      }
      return n;
    }
    return null;
  }
  _formatTimeAgo(t, e = !1, i) {
    const r = this._parseDate(t);
    if (!r) return "";
    const o = Math.max(0, ((i ?? Date.now()) - r.getTime()) / 1e3 | 0);
    if (o < 5) return e ? "< 5s" : "just now";
    if (o < 60) return e ? `${o}s` : `${o} seconds ago`;
    const a = o / 60 | 0;
    if (a < 60) return e ? `${a}m` : `${a} ${a === 1 ? "minute" : "minutes"} ago`;
    const n = a / 60 | 0;
    if (n < 24) return `${n}h${e ? "" : " ago"}`;
    const d = n / 24 | 0;
    if (d < 7) return `${d}d${e ? "" : " ago"}`;
    const u = d / 7 | 0;
    if (u < 4) return `${u}w${e ? "" : " ago"}`;
    const m = d / 30 | 0;
    return m < 12 ? `${m}mo${e ? "" : " ago"}` : `${d / 365 | 0}y${e ? "" : " ago"}`;
  }
  _formatRelativeTime(t, e) {
    return this._formatTimeAgo(t, !1, e);
  }
  _formatForDuration(t, e) {
    return this._formatTimeAgo(t, !0, e);
  }
  _computeDynamicIcon(t) {
    if (!t) return;
    const e = (t.entity_id || "").split(".")[0], i = t.attributes?.device_class, r = t.state === "on";
    if (e === "lock")
      return t.state === "locked" ? "mdi:lock" : t.state === "jammed" ? "mdi:lock-alert" : t.state === "locking" || t.state === "unlocking" ? "mdi:lock-clock" : "mdi:lock-open-variant";
    if (e === "binary_sensor") {
      if (i === "door") return r ? "mdi:door-open" : "mdi:door-closed";
      if (i === "window") return r ? "mdi:window-open-variant" : "mdi:window-closed-variant";
      if (i === "garage_door") return r ? "mdi:garage-open" : "mdi:garage";
      if (i === "motion") return r ? "mdi:motion-sensor" : "mdi:motion-sensor-off";
      if (i === "occupancy") return r ? "mdi:home-account" : "mdi:home-outline";
      if (i === "presence") return r ? "mdi:account" : "mdi:account-outline";
      if (i === "opening") return r ? "mdi:lock-open" : "mdi:lock";
    }
    if (e === "light")
      return r ? "mdi:lightbulb" : "mdi:lightbulb-outline";
    if (e === "cover") {
      const o = t.state === "open" || t.state === "opening";
      return i === "garage" ? o ? "mdi:garage-open" : "mdi:garage" : i === "blind" || i === "shutter" ? o ? "mdi:window-shutter-open" : "mdi:window-shutter" : i === "curtain" ? o ? "mdi:curtains-open" : "mdi:curtains" : o ? "mdi:window-open" : "mdi:window-closed";
    }
    if (e === "fan")
      return r ? "mdi:fan" : "mdi:fan-off";
    if (e === "climate")
      return t.state === "heat" ? "mdi:fire" : t.state === "cool" ? "mdi:snowflake" : t.state === "dry" ? "mdi:water-percent" : t.state === "fan_only" ? "mdi:fan" : t.state === "auto" || t.state === "heat_cool" ? "mdi:thermostat-auto" : "mdi:thermostat";
    if (e === "media_player")
      return t.state === "playing" ? "mdi:play-circle" : t.state === "paused" ? "mdi:pause-circle" : "mdi:cast";
  }
  _getInfoContent(t, e) {
    if (!e) return "";
    switch ((t || "").toLowerCase().replace(/_/g, "-")) {
      case "name":
        return this.config.name || e.attributes.friendly_name || this.config.entity || "";
      case "state": {
        const r = (e.entity_id || "").split(".")[0];
        if (r === "timer") {
          if (e.state === "paused")
            return `${e.attributes?.remaining || "Paused"} (Paused)`;
          if (e.state === "active" && e.attributes?.finishes_at) {
            const o = Date.parse(e.attributes.finishes_at);
            if (!isNaN(o)) {
              const a = Math.max(0, Math.round((o - Date.now()) / 1e3)), n = Math.floor(a / 60), d = a % 60, u = Math.floor(n / 60), m = (n % 60).toString().padStart(2, "0"), l = d.toString().padStart(2, "0");
              return u > 0 ? `${u}:${m}:${l}` : `${m}:${l}`;
            }
          }
        }
        if (r === "binary_sensor") {
          const o = e.attributes?.device_class;
          return o === "tamper" && e.state === "on" ? "⚠️ Tamper Detected" : o === "problem" && e.state === "on" ? "⚠️ Problem Detected" : o === "smoke" && e.state === "on" ? "🔥 Smoke Detected!" : o === "gas" && e.state === "on" ? "⚠️ Gas Detected!" : o === "moisture" && e.state === "on" ? "💧 Moisture Detected!" : this._formatForDuration(e.last_changed);
        }
        if (r === "vacuum") {
          const o = e.state;
          let a = o;
          o === "cleaning" ? a = "🧹 Cleaning" : o === "docked" ? a = "🏠 Docked" : o === "returning" ? a = "🔄 Returning" : o === "paused" ? a = "⏸️ Paused" : o === "error" && (a = "⚠️ Error");
          const n = e.attributes?.battery_level;
          return n !== void 0 ? `${a} • 🔋${n}%` : a;
        }
        if (r === "weather") {
          const o = e.attributes?.temperature, a = this.hass.config?.unit_system?.temperature || "°F", n = (e.state || "").replace(/-/g, " ");
          return o !== void 0 ? `${o}${a} • ${n}` : n;
        }
        if (r === "climate") {
          const o = e.state || "", a = e.attributes?.current_temperature, n = e.attributes?.temperature ?? e.attributes?.target_temp_high, d = e.attributes?.unit_of_measurement || this.hass.config?.unit_system?.temperature || "°", u = e.attributes?.preset_mode, m = e.attributes?.hvac_action, p = [a !== void 0 && n !== void 0 ? `${a}${d} → ${n}${d}` : n !== void 0 ? `${n}${d}` : "", m, u].filter(Boolean).join(" • ");
          return p ? `${o} (${p})` : o;
        }
        if (r === "fan") {
          const o = e.attributes?.percentage, a = e.attributes?.oscillating ? "∿ Oscillating" : "", n = e.attributes?.direction === "reverse" ? "⟲ Reverse" : "";
          return [o !== void 0 ? `${o}%` : e.state, a, n].filter(Boolean).join(" • ");
        }
        if (r === "alarm_control_panel") {
          const o = e.state;
          if (o === "armed_home") return "🛡️ Armed Home";
          if (o === "armed_away") return "🛡️ Armed Away";
          if (o === "disarmed") return "Disarmed";
          if (o === "triggered") return "⚠️ TRIGGERED";
          if (o === "pending") return "⏳ Arming Pending...";
          if (o === "arming") return "⏳ Arming...";
        }
        if (r === "lock") {
          if (e.state === "locked") return "Locked";
          if (e.state === "unlocked") return "Unlocked";
          if (e.state === "jammed") return "Jammed (Alert!)";
          if (e.state === "locking") return "Locking...";
          if (e.state === "unlocking") return "Unlocking...";
        }
        if (r === "button" || r === "input_button")
          return "Press to run";
        if (r === "light" && e.state === "on") {
          const o = e.attributes?.brightness, a = o !== void 0 ? Math.round(o / 255 * 100) : 100;
          if (e.attributes?.color_temp_kelvin)
            return `${a}% • ${e.attributes.color_temp_kelvin}K`;
        }
        if (e.attributes?.device_class === "timestamp" || e.attributes?.device_class === "date" || typeof e.state == "string" && (e.state.includes("T") || e.state.match(/^\d{4}-\d{2}-\d{2}/)) && !isNaN(Date.parse(e.state))) {
          const o = this._formatRelativeTime(e.state);
          if (o) return o;
        }
        if (e.attributes?.display_precision !== void 0 && !isNaN(Number(e.state))) {
          const o = Number(e.attributes.display_precision), a = Number(e.state).toFixed(o), n = e.attributes?.unit_of_measurement ? ` ${e.attributes.unit_of_measurement}` : "";
          return `${a}${n}`;
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
        const r = e.attributes?.last_triggered || e.last_changed;
        return this._formatForDuration(r);
      }
      case "last-updated":
      case "last-updated-relative":
        return this._formatForDuration(e.last_updated);
      case "last-triggered": {
        const r = e.attributes?.last_triggered || e.last_changed;
        return this._formatForDuration(r);
      }
      case "brightness": {
        const r = e.attributes?.brightness;
        return r !== void 0 ? `${Math.round(r / 255 * 100)}%` : "";
      }
      case "temperature": {
        const r = e.attributes?.temperature ?? e.attributes?.current_temperature, o = e.attributes?.unit_of_measurement || this.hass.config?.unit_system?.temperature || "°C";
        return r !== void 0 ? `${r} ${o}` : "";
      }
      case "humidity": {
        const r = e.attributes?.humidity ?? e.attributes?.current_humidity, o = e.attributes?.unit_of_measurement || "%";
        return r !== void 0 ? `${r}${o.startsWith("%") ? o : ` ${o}`}` : "";
      }
      case "battery": {
        const r = e.attributes?.battery_level ?? e.attributes?.battery ?? (e.attributes?.device_class === "battery" ? e.state : void 0);
        if (r !== void 0) {
          const o = Number(r);
          if (!isNaN(o)) {
            let a = "#4caf50";
            return o <= 20 ? a = "#f44336" : o <= 50 && (a = "#ff9800"), k`<span style="color: ${a}; font-weight: bold;">${o}%</span>`;
          }
          return `${r}%`;
        }
        return "";
      }
      case "none":
      default:
        return "";
    }
  }
  _dispatchAction(t, e, i) {
    const r = i || this.config.entity, o = r ? r.split(".")[0] : "", a = Er.has(o);
    let n = e;
    if (n || (t === "double_tap" ? n = this.config.double_tap_action : t === "hold" ? n = this.config.hold_action || (a ? { action: "more-info" } : { action: "toggle" }) : this.config.tap_action && this.config.tap_action.action && this.config.tap_action.action !== "default" ? a && this.config.tap_action.action === "toggle" ? n = { action: "none" } : n = this.config.tap_action : n = a ? { action: "none" } : { action: "toggle" }), !(!n || n.action === "none")) {
      if (n.action === "more-info") {
        const d = n.entity || r;
        if (d) {
          this.dispatchEvent(new CustomEvent("hass-more-info", {
            detail: { entityId: d },
            bubbles: !0,
            composed: !0
          }));
          return;
        }
      }
      if (n.action === "toggle" && r) {
        if (a)
          return;
        const d = o === "lock" ? this._isEntityActive(this.hass?.states[r]) ? "lock" : "unlock" : "toggle", u = ["lock", "cover"].includes(o) ? o : o === "group" ? "homeassistant" : o;
        this.hass?.callService(u, d, { entity_id: r });
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
        const [d, u] = n.service.split(".", 2);
        this.hass?.callService(d, u, n.data || n.service_data || {}, n.target);
        return;
      }
      a && (!n.action || n.action === "toggle") || sr(this, this.hass, { ...this.config, entity: r }, t);
    }
  }
  _handleTap(t) {
    if (t.stopPropagation(), this._isSubElement(t)) return;
    if (Date.now() - this._mountTime < 1500 || Date.now() - We < 800) {
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
    const i = (this.config.collapse_controls_trigger || "hold") === "double_tap";
    if (!(i || this.config.double_tap_action && this.config.double_tap_action.action !== "none")) {
      R("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap");
      return;
    }
    if (this._tapTimer) {
      clearTimeout(this._tapTimer), this._tapTimer = null, R("medium", this.config.haptic_feedback !== !1), i && this._hasCollapsible() && (this._collapsed = !this._collapsed), this._dispatchAction("double_tap");
      return;
    }
    this._tapTimer = setTimeout(() => {
      this._tapTimer = null, R("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap");
    }, 250);
  }
  _handleKeyDown(t) {
    this._isSubElement(t) || Date.now() - this._mountTime < 1500 || Date.now() - We < 800 || (t.key === "Enter" || t.key === " ") && (t.preventDefault(), R("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap"));
  }
  _handleContextMenu(t) {
    if (t.preventDefault(), t.stopPropagation(), Date.now() - this._mountTime < 1500 || Date.now() - We < 800 || this._held) return;
    R("medium", this.config.haptic_feedback !== !1), (this.config.collapse_controls_trigger || "hold") === "hold" && this._hasCollapsible() ? this._collapsed = !this._collapsed : this.config.hold_action && this.config.hold_action.action !== "none" && this._dispatchAction("hold");
  }
  _handlePointerDown(t) {
    this._isSubElement(t) || Date.now() - this._mountTime < 1500 || Date.now() - We < 800 || this._activePointerId !== null && this._activePointerId !== t.pointerId || (this._activePointerId = t.pointerId, this._pointerDownReceived = !0, this._pointerDownTime = Date.now(), this._held = !1, this._moved = !1, this._canceled = !1, this._startX = t.clientX, this._startY = t.clientY, this._holdTimer = setTimeout(() => {
      if (this._moved || this._canceled) return;
      this._held = !0, this._holdTimer = null, this._tapTimer && (clearTimeout(this._tapTimer), this._tapTimer = null), R("heavy", this.config.haptic_feedback !== !1), (this.config.collapse_controls_trigger || "hold") === "hold" && this._hasCollapsible() ? this._collapsed = !this._collapsed : this.config.hold_action && this.config.hold_action.action !== "none" && this._dispatchAction("hold");
    }, 500));
  }
  _handlePointerMove(t) {
    if (this._isSubElement(t) || this._activePointerId !== null && this._activePointerId !== t.pointerId) return;
    const e = t.clientX - this._startX, i = t.clientY - this._startY, r = Math.hypot(e, i), o = Math.max(1, Date.now() - this._pointerDownTime), a = r / o;
    (r > 8 || a > 0.5) && (this._moved = !0, this._pointerDownReceived = !1, this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null));
  }
  _handlePointerUp(t) {
    this._isSubElement(t) || (this._activePointerId = null, this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null));
  }
  _handlePointerCancel(t) {
    this._isSubElement(t) || (this._activePointerId = null, this._canceled = !0, this._moved = !0, this._pointerDownReceived = !1, this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null));
  }
  _isSubElement(t) {
    const e = t.target;
    return e ? e.tagName === "INPUT" || e.hasAttribute("data-ag-sub") ? !0 : !!e.closest?.("[data-ag-sub], .sub-button, .sub-color-picker, .sub-button-slider-container, .slider-container, .slider-google-wrap, .sub-button-google-slider, .color-picker") : !1;
  }
  _handleSubPointerDown(t, e, i) {
    t.stopPropagation(), this._subHeld = !1, this._subMoved = !1, this._subCanceled = !1, this._subPointerDownTime = Date.now(), this._subStartX = t.clientX, this._subStartY = t.clientY, this._subHoldTimer = setTimeout(() => {
      this._subMoved || this._subCanceled || (this._subHeld = !0, this._subHoldTimer = null, R("heavy", this.config.haptic_feedback !== !1), this._dispatchAction("hold", i || { action: "more-info" }, e));
    }, 500);
  }
  _handleSubPointerMove(t) {
    t.stopPropagation();
    const e = t.clientX - this._subStartX, i = t.clientY - this._subStartY, r = Math.hypot(e, i), o = Math.max(1, Date.now() - this._subPointerDownTime), a = r / o;
    (r > 8 || a > 0.5) && (this._subMoved = !0, this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null));
  }
  _handleSubPointerUp(t) {
    t.stopPropagation(), this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
  }
  _handleSubPointerCancel(t) {
    t.stopPropagation(), this._subCanceled = !0, this._subMoved = !0, this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
  }
  _handleSubTap(t, e, i, r, o) {
    if (t.stopPropagation(), this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null), this._subMoved || this._subCanceled) {
      this._subMoved = !1, this._subCanceled = !1;
      return;
    }
    if (this._subHeld) {
      this._subHeld = !1;
      return;
    }
    if (this._subPointerDownTime && Date.now() - this._subPointerDownTime > 600)
      return;
    const a = r && r.action !== "none", n = e || "sub_default", d = () => {
      R("light", this.config.haptic_feedback !== !1), i && i.action && i.action !== "none" && i.action !== "default" ? this._dispatchAction("tap", i, e) : o ? o() : this._dispatchAction("tap", { action: "toggle" }, e);
    };
    if (!a) {
      d();
      return;
    }
    const u = this._subTapTimerMap.get(n);
    if (u) {
      clearTimeout(u), this._subTapTimerMap.delete(n), R("medium", this.config.haptic_feedback !== !1), this._dispatchAction("double_tap", r, e);
      return;
    }
    const m = setTimeout(() => {
      this._subTapTimerMap.delete(n), d();
    }, 250);
    this._subTapTimerMap.set(n, m);
  }
  _handleSubContextMenu(t, e, i) {
    t.preventDefault(), t.stopPropagation(), !this._subHeld && (R("medium", this.config.haptic_feedback !== !1), this._dispatchAction("hold", i || { action: "more-info" }, e));
  }
  // --- THROTTLED SERVICE CALL HELPER ---
  _throttledCall(t, e, i) {
    const r = i ?? (we.isPowerSaveActive(this.hass) ? 60 : 30), o = this._throttleMap.get(t) ?? 0, a = Date.now();
    if (!(a - o < r)) {
      this._throttleMap.set(t, a);
      try {
        e();
      } finally {
        setTimeout(() => {
          this._throttleMap.get(t) === a && this._throttleMap.delete(t);
        }, r + 50);
      }
    }
  }
  _revertSlider(t, e) {
    t.value = String(e.initialVal), t.style.setProperty("--slider-pct", e.initialPct);
    const r = t.closest(".slider-container, .sub-button-slider-container")?.querySelector(".slider-percent-badge, .sub-slider-pct");
    r && (r.textContent = e.initialBadge);
  }
  _sliderInput(t, e, i, r, o, a, n) {
    t.stopPropagation();
    const d = t.target, u = this._sliderStateMap.get(d);
    if (u?.isScrolling) {
      this._revertSlider(d, u);
      return;
    }
    const m = Number(d.value), l = isNaN(m) ? 0 : m, p = a ? a(l) : l;
    if (u) {
      if (u.rafPending) return;
      u.rafPending = !0;
    }
    requestAnimationFrame(() => {
      if (u && (u.rafPending = !1), u?.isScrolling) {
        this._revertSlider(d, u);
        return;
      }
      d.style.setProperty("--slider-pct", `${p}%`);
      const _ = d.closest(".slider-container, .sub-button-slider-container"), v = _?.querySelector(".slider-percent-badge, .sub-slider-pct");
      if (v && (v.textContent = n ? n(l, p) : `${p}%`), e === "color_hue" && _) {
        _.style.setProperty("--color-hue-val", `hsl(${l}, 100%, 50%)`);
        const y = _.querySelector(".color-chip-badge span");
        y && (y.style.background = `hsl(${l}, 100%, 50%)`);
      }
    }), R("selection", this.config.haptic_feedback !== !1);
  }
  _sliderChange(t, e, i, r) {
    t.stopPropagation();
    const o = t.target, a = this._sliderStateMap.get(o);
    if (a?.isScrolling) {
      this._revertSlider(o, a), a.isScrolling = !1;
      return;
    }
    const n = Number(o.value), d = isNaN(n) ? 0 : n;
    if (!(a && d === a.initialVal)) {
      if (e === "light" && i === "turn_on") {
        const u = Math.round(d / 255 * 100);
        if (d <= 3 || u <= 1) {
          this.hass.callService("light", "turn_off", { entity_id: this.config.entity });
          return;
        }
      }
      if (e === "fan" && i === "set_percentage" && d <= 0) {
        this.hass.callService("fan", "turn_off", { entity_id: this.config.entity });
        return;
      }
      this.hass.callService(e, i, { entity_id: this.config.entity, ...r(d) });
    }
  }
  _getLightLiveColor(t) {
    if (!t || !t.attributes || t.state !== "on") return null;
    const e = t.attributes;
    if (e.color_mode === "color_temp") {
      const r = e.color_temp_kelvin ?? (e.color_temp ? Math.round(1e6 / e.color_temp) : 3e3), [o, a, n] = X(r);
      return `rgb(${o}, ${a}, ${n})`;
    }
    if (Array.isArray(e.rgb_color) && e.rgb_color.length >= 3)
      return `rgb(${e.rgb_color[0]}, ${e.rgb_color[1]}, ${e.rgb_color[2]})`;
    if (Array.isArray(e.hs_color) && e.hs_color.length >= 2) {
      const [r, o, a] = $t(e.hs_color[0], e.hs_color[1]);
      return `rgb(${r}, ${o}, ${a})`;
    }
    if (Array.isArray(e.rgbw_color) && e.rgbw_color.length >= 3)
      return `rgb(${e.rgbw_color[0]}, ${e.rgbw_color[1]}, ${e.rgbw_color[2]})`;
    if (Array.isArray(e.rgbww_color) && e.rgbww_color.length >= 3)
      return `rgb(${e.rgbww_color[0]}, ${e.rgbww_color[1]}, ${e.rgbww_color[2]})`;
    if (e.color_temp_kelvin !== void 0 || e.color_temp !== void 0) {
      const r = e.color_temp_kelvin ?? Math.round(1e6 / e.color_temp), [o, a, n] = X(r);
      return `rgb(${o}, ${a}, ${n})`;
    }
    return t.state === "on" ? "var(--state-light-active-color, rgb(255, 205, 120))" : null;
  }
  _getLiveHex(t) {
    if (!t?.attributes || t.state !== "on") return "#ffffff";
    const e = t.attributes;
    if (Array.isArray(e.rgb_color) && e.rgb_color.length >= 3)
      return dt(e.rgb_color);
    if (Array.isArray(e.hs_color) && e.hs_color.length >= 2)
      return dt($t(e.hs_color[0], e.hs_color[1]));
    if (e.color_temp_kelvin !== void 0 || e.color_temp !== void 0) {
      const o = e.color_temp_kelvin ?? Math.round(1e6 / e.color_temp);
      return dt(X(o));
    }
    const i = this._getLightLiveColor(t);
    if (!i) return "#ffffff";
    const r = Y(i);
    return r ? dt(r) : "#ffffff";
  }
  _getLiveHue(t) {
    if (!t) return 0;
    if (Array.isArray(t.attributes?.hs_color) && t.attributes.hs_color.length >= 1)
      return Math.round(t.attributes.hs_color[0]) % 360;
    if (Array.isArray(t.attributes?.rgb_color) && t.attributes.rgb_color.length >= 3) {
      const [e, i, r] = t.attributes.rgb_color;
      return Lr(e, i, r);
    }
    return 0;
  }
  _handleColorInput(t, e, i, r) {
    t.stopPropagation();
    const o = t.target.value;
    if (!o) return;
    const a = Y(o);
    if (!a) return;
    const n = i || this.config.entity, d = () => {
      this.hass.callService("light", "turn_on", { entity_id: n, rgb_color: a });
    };
    e ? this._throttledCall(r || "color_picker", d) : d();
  }
  // --- RENDER ---
  render() {
    if (!this.config || !this.hass)
      return k``;
    const t = this.config.entity;
    if (!t)
      return k`
        <ha-card class="warning-card">
          <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
          <span>Please configure an entity in the visual editor.</span>
        </ha-card>
      `;
    const e = this.hass.states[t];
    if (!e)
      return k`
        <ha-card class="warning-card">
          <ha-icon icon="mdi:help-circle-outline"></ha-icon>
          <span>Entity not found: <code>${t}</code></span>
        </ha-card>
      `;
    const i = this.config.show_name !== !1 ? this._getInfoContent(this.config.primary_info, e) : "", r = this.config.show_state !== !1 ? this._getInfoContent(this.config.secondary_info, e) : "", o = this._isEntityActive(e), a = t.split(".")[0], n = this.config.icon_type ?? "icon", d = this.config.show_icon !== !1 && n !== "none", u = this._iconShapeClass, m = this._iconAnimClass;
    let l = "var(--primary-color)", p = null;
    a === "climate" ? e.state === "heat" ? l = "var(--state-climate-heat-color, #ff7043)" : e.state === "cool" ? l = "var(--state-climate-cool-color, #42a5f5)" : e.state === "dry" ? l = "var(--state-climate-dry-color, #ab47bc)" : e.state === "fan_only" && (l = "var(--state-climate-fan_only-color, #26a69a)") : a === "light" ? (p = this._getLightLiveColor(e), p && (l = p)) : (a === "binary_sensor" || a === "lock" || a === "switch") && (l = "#d60000");
    const _ = this.config.color_type === "card";
    let v = this._resolveColor(this.config.active_color);
    (!v || this.config.use_light_color) && (a === "light" && p ? v = p : v = l);
    let y = "var(--secondary-background-color, rgba(150, 150, 150, 0.2))";
    a === "light" ? y = "#000000" : (a === "binary_sensor" || a === "lock" || a === "switch") && (y = "#03b500");
    const w = this._resolveColor(this.config.inactive_color) || y, T = _ ? "transparent" : o ? v : w, c = this.config.icon_color ? `color: ${this._resolveColor(this.config.icon_color)};` : _ && o ? "color: #ffffff; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.4));" : "", f = this._iconOpacityStyle, $ = this._iconRotateStyle, C = this.config.show_slider !== !1, g = a === "light", b = a === "cover", M = a === "fan", s = a === "humidifier", h = a === "media_player", x = a === "number" || a === "input_number", E = a === "climate", N = this.config.hide_slider_when_off !== !1, q = this.config.hide_color_temp_when_off !== !1, Ce = this.config.hide_color_picker_when_off !== !1, Ke = this.config.hide_color_slider_when_off !== !1, se = e.attributes?.supported_color_modes;
    let Te = e.attributes?.brightness !== void 0, Me = !1, le = !1;
    if (Array.isArray(se))
      for (let P = 0; P < se.length; P++) {
        const be = se[P];
        be !== "onoff" && (Te = !0), be === "color_temp" && (Me = !0), Pr.has(be) && (le = !0);
      }
    const Ae = g && C && Te && (!N || o), Je = e.attributes?.color_temp_kelvin ?? e.attributes?.color_temp, Pe = g && this.config.show_color_temp === !0 && (Je !== void 0 || Me) && (!q || o), Ee = this.config.color_picker_type !== "wheel", Ne = g && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && Ee) && le && (!Ke || o), Le = g && this.config.show_color_picker === !0 && !Ee && le && (!Ce || o), F = e.state !== "unavailable" && e.state !== "unknown", ce = b && F && C && e.attributes?.current_position !== void 0, de = M && F && o && C && e.attributes?.percentage !== void 0, K = s && F && o && C && (e.attributes?.humidity !== void 0 || e.attributes?.target_humidity !== void 0), ie = h && F && o && C && e.attributes?.volume_level !== void 0, ue = x && F && C, De = E && F && o && C && (e.attributes?.temperature !== void 0 || e.attributes?.target_temp_high !== void 0), Ze = (this.config.bg_opacity ?? 10) / 100, re = this.config.slider_color ? `--slider-color: ${this._resolveColor(this.config.slider_color)};` : _ && o && !this.config.use_light_color ? "--slider-color: rgba(255, 255, 255, 0.95);" : `--slider-color: ${v};`, Re = this.config.slider_track_color ? `--slider-track-color: ${this._resolveColor(this.config.slider_track_color)};` : _ && o ? "--slider-track-color: rgba(0, 0, 0, 0.25);" : "", L = this._calculateMultiStageFade(e, l, w), O = this.config.fade_target ?? "card", he = this._resolveColor(this.config.bg_color);
    let H;
    L.activeFade && (O === "card" || O === "all" || _) ? H = L.currentColor : _ ? a === "light" ? H = o ? p || v : this.config.inactive_color ? w : "#000000" : H = o ? v : w : he ? H = he : a === "light" && !o ? H = "#000000" : H = `rgba(150, 150, 150, ${Ze})`;
    let pe = T;
    L.activeFade && (O === "icon" || O === "all") && (pe = _ ? "transparent" : L.currentColor);
    let oe = this._resolveColor(this.config.active_color) || (a === "light" && p ? p : v) || "var(--primary-color)";
    L.activeFade && (O === "all" || this.config.active_glow === !0) && (oe = L.currentColor);
    let J = "";
    this.config.box_shadow === "soft" && (J = "box-shadow: 0 4px 10px rgba(0,0,0,0.1);"), this.config.box_shadow === "deep" && (J = "box-shadow: 0 10px 20px rgba(0,0,0,0.3);"), (this.config.box_shadow === "glow" || this.config.active_glow === !0) && (J = o || L.activeFade ? `box-shadow: 0 0 22px ${oe}, 0 0 45px rgba(255, 255, 255, 0.18);` : "");
    const Z = this.config.active_glow === !0 || this.config.box_shadow === "glow" ? "card-active-glow" : "", B = e?.attributes?.device_class, _e = a === "binary_sensor" && (B === "motion" || B === "occupancy" || B === "presence"), He = a === "binary_sensor" && (B === "door" || B === "window" || B === "garage_door" || B === "opening"), Be = _e && (o || L.activeFade && L.currentStage === 1) ? "motion-active" : "", Oe = He && o ? "door-open" : "", ze = a === "climate" && e?.attributes?.hvac_action ? `hvac-${e.attributes.hvac_action}` : "", Fe = a === "cover" ? e?.state === "opening" ? "cover-opening" : e?.state === "closing" ? "cover-closing" : "" : "", Ie = `${this._staticCardClasses} ${Z} ${Be} ${Oe} ${ze} ${Fe}`, Q = this._getSubButtons();
    let I = "";
    this.config.text_color_mode === "active_accent" && o ? I += `--primary-text-color: ${v}; ` : this.config.text_color_primary ? I += `--primary-text-color: ${this._resolveColor(this.config.text_color_primary)}; ` : _ && o && (I += "--primary-text-color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.4); "), this.config.text_color_secondary ? I += `--secondary-text-color: ${this._resolveColor(this.config.text_color_secondary)}; ` : _ && o && (I += "--secondary-text-color: rgba(255, 255, 255, 0.9); text-shadow: 0 1px 2px rgba(0,0,0,0.3); ");
    const U = this.config.features_position === "inline", z = this._iconSize, A = this._iconContainerSize, j = this.config.text_scrolling_primary || "none", G = this.config.text_scrolling_secondary || "none", V = k`
      ${Ae ? this._renderLightSlider(e) : S}
      ${ce ? this._renderCoverSlider(e) : S}
      ${de ? this._renderFanSlider(e) : S}
      ${K ? this._renderHumidifierSlider(e) : S}
      ${ie ? this._renderMediaSlider(e) : S}
      ${ue ? this._renderNumberSlider(e) : S}
      ${De ? this._renderClimateSlider(e) : S}
    `, ae = k`
      ${Pe ? this._renderColorTempSlider(e) : S}
      ${Ne ? this._renderColorSlider(e) : S}
      ${Le ? this._renderColorPicker(e) : S}
    `, W = Ae || ce || de || K || ie || ue || De, fe = Pe || Ne || Le, ge = !U && fe || Q.length > 0, me = this.config.decay_slider_position ?? "bottom", Ue = Mt.sanitizeCustomStyles(this.config.custom_styles);
    return k`
      ${Ue ? k`<style>${si(Ue)}</style>` : S}
      <ha-card 
        class="${Ie}" 
        ?active=${o}
        style="${this._staticCardStyles} background: ${H}; ${J} ${re} ${Re} ${I} --ag-glow-color: ${oe}; --ag-active-color: ${v};"
        @click=${this._handleTap}
        @keydown=${this._handleKeyDown}
        @contextmenu=${this._handleContextMenu}
        @pointerdown=${this._handlePointerDown}
        @pointermove=${this._handlePointerMove}
        @pointerup=${this._handlePointerUp}
        @pointercancel=${this._handlePointerCancel}
      >
        <div class="card-content ${U ? "features-inline" : ""}" style="justify-content: var(--ag-content-alignment);">
          ${me === "top" ? this._renderDecaySlider(L) : S}

          <div class="info-container">
            ${d ? k`
              <div class="icon-container ${u} ${m} ${this.config.active_pulse && o ? "pulse" : ""} ${(this.config.active_glow || this.config.box_shadow === "glow") && (o || L.activeFade) ? "glow" : ""}" 
                   style="${this._iconOffsetStyle} ${c} ${f} background-color: ${pe}; width: ${A}px; height: ${A}px; --mdc-icon-size: ${z}px; ${F ? "" : "opacity: 0.5; pointer-events: none;"}" 
                   ?active=${o}>
                ${n === "entity-picture" && e.attributes.entity_picture ? k`<img class="entity-picture ${u}" src="${e.attributes.entity_picture}" style="width: ${z}px; height: ${z}px; ${$}" />` : k`<ha-state-icon
                      .hass=${this.hass}
                      .stateObj=${e}
                      .icon=${this.config.icon || this._computeDynamicIcon(e)}
                      style="--mdc-icon-size: ${z}px; width: ${z}px; height: ${z}px; ${$}"
                    ></ha-state-icon>`}
                ${this.config.badge_icon ? k`
                  <div class="badge" style="background: ${this._resolveColor(this.config.badge_color) || v};">
                    <ha-icon .icon=${this.config.badge_icon}></ha-icon>
                  </div>
                ` : S}
              </div>
            ` : S}
            <div class="info" style="${this._textOffsetStyle} ${this._textBoxWidth} text-align: var(--ag-text-alignment);">
              ${i ? k`
                <div class="text-marquee-container scroll-${j}" style="${this._primaryTextOffsetStyle}">
                  <span class="primary scroll-content" style="${this._primaryTextStyle}">${i}</span>
                </div>` : S}
              ${r ? k`
                <div class="text-marquee-container scroll-${G}" style="${this._secondaryTextOffsetStyle}">
                  <span class="secondary scroll-content" style="${this._secondaryTextStyle}">${r}</span>
                </div>` : S}
            </div>
            ${me === "inline" ? k`<div class="inline-sliders">${this._renderDecaySlider(L)}</div>` : S}
            ${U && W ? k`<div class="inline-sliders" style="${this._mainSliderMarginOffsets}">${V}</div>` : S}
            ${U && fe ? k`<div class="inline-sliders ${this._collapsed ? "collapsed" : ""}">${ae}</div>` : S}
          </div>
          
          ${me === "bottom" ? this._renderDecaySlider(L) : S}
          ${!U && W ? k`<div class="features-container" style="${this._featuresOffsetStyle} ${this._mainSliderMarginOffsets}">${V}</div>` : S}

          ${ge ? k`
            <div class="collapsible-wrapper ${this._collapsed ? "collapsed" : ""}">
              ${!U && fe ? k`<div class="features-container" style="${this._featuresOffsetStyle}">${ae}</div>` : S}

              ${Q.length > 0 ? k`
                <div class="sub-buttons-container">
                  ${er(
      Q,
      (P) => P.key,
      (P) => this._renderSubButton(P.entity || "", P.icon, P.color, P.bg !== !1, P.name, P.tapAction, P.holdAction, P.type, P.doubleTapAction, P.showState)
    )}
                </div>
              ` : S}
            </div>
          ` : S}

        </div>
      </ha-card>
    `;
  }
  // --- DECAY / COOLDOWN SLIDER COMPONENT ---
  _renderDecaySlider(t) {
    if (!this.config.show_decay_slider || !t.enabled || !t.activeFade)
      return S;
    const e = this.config.slider_style === "google", i = this.config.decay_slider_height ?? (e ? 32 : 10), r = this.config.slider_border_radius ?? (e ? 16 : 5), o = Math.max(0, 100 - t.progressPct);
    return k`
      <div class="decay-slider-container" style="--decay-color: ${t.currentColor}; --decay-pct: ${o}%;">
        <div class="decay-slider-track" style="height: ${i}px; border-radius: ${r}px;">
          <div class="decay-slider-fill" style="background: ${t.currentColor}; border-radius: ${r}px;"></div>
          <span class="decay-slider-badge">${t.stageLabel}</span>
        </div>
      </div>
    `;
  }
  // --- GENERIC SLIDER COMPONENT HELPER ---
  _renderGenericSlider(t, e, i, r, o, a, n, d, u, m, l, p, _ = "", v = "", y) {
    const w = this.config.slider_style === "google", T = w && this.config.show_slider_percent !== !1 || this.config.show_slider_percent === !0, c = p ? p(a, n) : `${n}%`, f = y !== void 0 ? y : c, $ = this.config.slider_stepped_movement === !1 ? "any" : o, C = t !== "color_temp" && t !== "color_hue", g = this.config.slider_style === "full", b = C && g ? "main-slider-full" : "";
    let M = "";
    if (C && g) {
      const s = Number(this.config.slider_start_offset) || 0, h = Number(this.config.slider_end_offset) || 0;
      M = `left: ${s}px !important; right: ${h}px !important; width: calc(100% - ${s + h}px) !important;`;
    } else t === "color_temp" ? M = this._colorTempMarginOffsets : t === "color_hue" ? M = this._colorHueMarginOffsets : M = this._mainSliderMarginOffsets;
    return k`
      <div class="slider-container ${_} ${b} ${w ? "slider-google-wrap" : ""}" style="${M} ${v}">
        <input type="range" min=${i} max=${r} step=${$} .value=${a}
               aria-label="${e}"
               style="--slider-pct: ${n}%;"
               @pointerdown=${this._onSliderPointerDown}
               @pointermove=${this._onSliderPointerMove}
               @pointerup=${this._onSliderPointerUp}
               @pointercancel=${this._onSliderPointerCancel}
               @input=${(s) => this._sliderInput(s, t, d, u, m, l, p)}
               @change=${(s) => this._sliderChange(s, d, u, m)} />
        ${T && f ? k`<span class="slider-percent-badge">${f}</span>` : S}
      </div>
    `;
  }
  // --- MULTI-DOMAIN SLIDER RENDERERS ---
  _renderLightSlider(t) {
    const e = this._isEntityActive(t), i = t.attributes.brightness ?? 0, r = Math.max(0, Math.min(100, Math.round(i / 255 * 100))), o = this._getLightLiveColor(t), a = (this.config.use_light_color !== !1 || !this.config.slider_color) && o ? `--slider-color: ${o};` : "";
    return this._renderGenericSlider(
      "brightness",
      "Brightness",
      0,
      255,
      1,
      i,
      r,
      "light",
      "turn_on",
      (n) => ({ brightness: n }),
      (n) => Math.round(n / 255 * 100),
      (n, d) => !e || d <= 0 ? "" : `${d}%`,
      "",
      a
    );
  }
  _renderColorTempSlider(t) {
    const e = this.config.color_temp_type || "gradient", i = t.attributes.color_temp_kelvin !== void 0 || t.attributes.min_color_temp_kelvin !== void 0 || t.attributes.max_color_temp_kelvin !== void 0, r = i ? t.attributes.min_color_temp_kelvin || 2e3 : t.attributes.min_mireds || 153, o = i ? t.attributes.max_color_temp_kelvin || 6500 : t.attributes.max_mireds || 500, a = i ? t.attributes.color_temp_kelvin || 3e3 : t.attributes.color_temp || 300, n = o - r, d = n > 0 ? Math.max(0, Math.min(100, Math.round((a - r) / n * 100))) : 0, u = i ? "color_temp_kelvin" : "color_temp", m = e === "google" || e === "gradient" && this.config.slider_style === "google", l = m ? 42 : e === "thin" ? 6 : 12, p = m ? 21 : e === "thin" ? 3 : 6, _ = this.config.color_temp_height !== void 0 ? this.config.color_temp_height : this.config.slider_height ?? l, v = this.config.color_temp_border_radius !== void 0 ? this.config.color_temp_border_radius : this.config.slider_border_radius ?? p, y = i ? `${a} K` : `${a} mireds`;
    if (e === "presets") {
      const w = Number(this.config.color_temp_start_offset) || 0, T = Number(this.config.color_temp_end_offset) || 0, c = [
        w ? `margin-left: ${w}px;` : "",
        T ? `margin-right: ${T}px;` : ""
      ].filter(Boolean).join(" ");
      return k`
        <div class="presets-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${c}">
          ${Dr.map((f) => {
        const [$, C, g] = f.rgb, b = Math.abs(a - f.k) < 200, M = () => {
          R("light", this.config.haptic_feedback !== !1), this.hass?.callService("light", "turn_on", { entity_id: this.config.entity, [u]: f.k });
        };
        return k`
              <button 
                type="button"
                role="button"
                aria-label="Color temperature preset: ${f.label}"
                tabindex="0"
                class="temp-preset-chip"
                style="flex: 1; min-width: 48px; height: ${_}px; border-radius: ${v}px; border: ${b ? "2px solid #ffffff" : "1px solid rgba(150, 150, 150, 0.3)"}; background: rgba(${$}, ${C}, ${g}, 0.2); color: var(--primary-text-color); font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; box-shadow: ${b ? "0 0 8px rgba(" + $ + "," + C + "," + g + ", 0.8)" : "none"};"
                @keydown=${(s) => {
          (s.key === "Enter" || s.key === " ") && (s.preventDefault(), s.stopPropagation(), M());
        }}
                @click=${(s) => {
          s.stopPropagation(), M();
        }}>
                <span style="width: 8px; height: 8px; border-radius: 50%; background: rgb(${$}, ${C}, ${g}); display: inline-block;"></span>
                ${f.label}
              </button>
            `;
      })}
        </div>
      `;
    }
    return this._renderGenericSlider(
      "color_temp",
      "Color Temperature",
      r,
      o,
      1,
      a,
      d,
      "light",
      "turn_on",
      (w) => ({ [u]: w }),
      (w) => n > 0 ? Math.round((w - r) / n * 100) : 0,
      (w) => i ? `${w} K` : `${w} mireds`,
      `color-temp ${i ? "kelvin" : "mireds"} ${m ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${_}px; --ag-slider-radius: ${v}px;`,
      y
    );
  }
  _renderColorSlider(t) {
    const e = this.config.color_picker_type || "slider";
    if (e === "wheel")
      return this._renderColorPicker(t);
    if (e === "swatches") {
      const p = this._getLiveHex(t).toLowerCase(), _ = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : 32, v = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : 8, y = Number(this.config.color_slider_start_offset) || 0, w = Number(this.config.color_slider_end_offset) || 0, T = [
        y ? `margin-left: ${y}px;` : "",
        w ? `margin-right: ${w}px;` : ""
      ].filter(Boolean).join(" ");
      return k`
        <div class="swatches-palette-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${T}">
          ${At.map((c) => {
        const f = p === c.hex.toLowerCase(), $ = () => {
          R("light", this.config.haptic_feedback !== !1), this.hass?.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: c.rgb });
        };
        return k`
              <button 
                type="button"
                role="button"
                aria-label="Color preset: ${c.label}"
                tabindex="0"
                class="color-swatch-chip"
                title="${c.label}"
                style="flex: 1; min-width: 28px; height: ${_}px; border-radius: ${v}px; background: ${c.hex}; border: ${f ? "2px solid #ffffff" : "1px solid rgba(0,0,0,0.2)"}; cursor: pointer; box-shadow: ${f ? "0 0 10px " + c.hex : "0 1px 3px rgba(0,0,0,0.3)"}; transition: transform 0.15s ease;"
                @keydown=${(C) => {
          (C.key === "Enter" || C.key === " ") && (C.preventDefault(), C.stopPropagation(), $());
        }}
                @click=${(C) => {
          C.stopPropagation(), $();
        }}>
              </button>
            `;
      })}
        </div>
      `;
    }
    const i = this._getLiveHue(t), r = Math.max(0, Math.min(100, Math.round(i / 360 * 100))), o = e === "google" || this.config.slider_style === "google", a = o ? 42 : 12, n = o ? 21 : 6, d = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : this.config.slider_height ?? a, u = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : this.config.slider_border_radius ?? n, m = `hsl(${i}, 100%, 50%)`, l = k`
      <span class="color-chip-badge" style="display: flex; align-items: center; gap: 6px;">
        <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background: ${m}; border: 1.5px solid #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.4);"></span>
        ${i}°
      </span>
    `;
    return this._renderGenericSlider(
      "color_hue",
      "Color Hue",
      0,
      360,
      1,
      i,
      r,
      "light",
      "turn_on",
      (p) => {
        const [_, v, y] = $t(p, 100);
        return { rgb_color: [_, v, y] };
      },
      (p) => Math.round(p / 360 * 100),
      (p) => `${p}°`,
      `color-hue ${o ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${d}px; --ag-slider-radius: ${u}px; --color-hue-val: ${m};`,
      l
    );
  }
  _renderColorPicker(t) {
    const e = this._getLiveHex(t), i = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : this.config.slider_height ?? 36, r = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : this.config.slider_border_radius ?? 8;
    return k`
      <div class="color-picker" title="Adjust Light Color" style="height: ${i}px; border-radius: ${r}px;">
        <input type="color" 
               .value=${e} 
               @input=${(o) => this._handleColorInput(o, !0)}
               @change=${(o) => this._handleColorInput(o, !1)} />
        <span class="color-label">Color (${e})</span>
      </div>
    `;
  }
  _renderCoverSlider(t) {
    const e = t.attributes.current_position ?? (t.state === "open" || t.state === "opening" ? 100 : 0);
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
      (i) => ({ position: i }),
      (i) => i,
      (i, r) => `${r}%`
    );
  }
  _renderFanSlider(t) {
    const e = t.attributes.percentage ?? 0, i = t.attributes.percentage_step ?? 1;
    return this._renderGenericSlider(
      "fan",
      "Fan Speed",
      0,
      100,
      i,
      e,
      e,
      "fan",
      "set_percentage",
      (r) => {
        const o = i > 1 ? Math.round(r / i) * i : r;
        return { percentage: Math.min(100, Math.max(0, o)) };
      },
      (r) => r,
      (r, o) => `${o}%`
    );
  }
  _renderMediaSlider(t) {
    const e = t.attributes.is_volume_muted === !0, i = e ? 0 : Math.round((t.attributes.volume_level ?? 0) * 100), r = e ? "Muted (0%)" : void 0;
    return this._renderGenericSlider(
      "media",
      "Volume",
      0,
      100,
      1,
      i,
      i,
      "media_player",
      "volume_set",
      (o) => ({ volume_level: o / 100 }),
      (o) => o,
      (o, a) => e ? "Muted" : `${a}%`,
      "media",
      "",
      r
    );
  }
  _renderNumberSlider(t) {
    const e = Number(t.attributes.min ?? 0);
    let i = Number(t.attributes.max ?? 100);
    e >= i && (i = e + 100);
    const r = Number(t.attributes.step ?? 1), o = Number(t.state), a = isNaN(o) ? e : o, n = i - e, d = n > 0 ? Math.max(0, Math.min(100, Math.round((a - e) / n * 100))) : 0, u = (this.config.entity || "number").split(".")[0], m = t.attributes.unit_of_measurement ? ` ${t.attributes.unit_of_measurement}` : "", l = r.toString(), p = l.includes(".") ? l.split(".")[1].length : 0;
    return this._renderGenericSlider(
      "number",
      "Value",
      e,
      i,
      r,
      a,
      d,
      u,
      "set_value",
      (_) => ({ value: p > 0 ? Number(_.toFixed(p)) : Math.round(_) }),
      (_) => n > 0 ? Math.round((_ - e) / n * 100) : 0,
      (_) => `${p > 0 ? Number(_).toFixed(p) : Math.round(Number(_))}${m}`
    );
  }
  _renderClimateSlider(t) {
    const e = this.hass.config?.unit_system?.temperature === "°F" || this.hass.config?.unit_system?.temperature === "F", i = e ? "°F" : "°C", r = e ? 60 : 16, o = e ? 85 : 30, a = t.attributes.min_temp ?? r, n = t.attributes.max_temp ?? o, d = t.attributes.target_temp_step ?? t.attributes.target_temperature_step ?? (e ? 1 : 0.5), u = t.attributes.target_temp_low !== void 0 && t.attributes.target_temp_high !== void 0, m = t.attributes.temperature ?? t.attributes.target_temp_low ?? t.attributes.target_temp_high ?? a, l = n - a, p = l > 0 ? Math.max(0, Math.min(100, Math.round((m - a) / l * 100))) : 0;
    return this._renderGenericSlider(
      "climate",
      "Temperature",
      a,
      n,
      d,
      m,
      p,
      "climate",
      "set_temperature",
      (_) => u ? { target_temp_low: _, target_temp_high: Math.min(n, _ + (e ? 4 : 2)) } : { temperature: _ },
      (_) => l > 0 ? Math.round((_ - a) / l * 100) : 0,
      (_) => `${_}${i}`,
      "climate-temp",
      "",
      `${m}${i}`
    );
  }
  _renderHumidifierSlider(t) {
    const e = t.attributes?.min_humidity ?? 0, i = t.attributes?.max_humidity ?? 100, r = t.attributes?.humidity ?? t.attributes?.target_humidity ?? e, o = i - e, a = o > 0 ? Math.max(0, Math.min(100, Math.round((r - e) / o * 100))) : 0;
    return this._renderGenericSlider(
      "humidifier",
      "Humidity",
      e,
      i,
      1,
      r,
      a,
      "humidifier",
      "set_humidity",
      (n) => ({ humidity: n }),
      (n) => o > 0 ? Math.round((n - e) / o * 100) : 0,
      (n, d) => `${d}%`
    );
  }
  // --- EXTRACTED SUB-BUTTON RENDERERS ---
  _renderSubSlider(t, e, i, r, o) {
    const a = e || this.hass.states[this.config.entity || ""], n = t || this.config.entity || "", d = a?.attributes?.volume_level !== void 0 || a?.entity_id?.startsWith("media_player."), u = a?.attributes?.percentage !== void 0 || a?.entity_id?.startsWith("fan."), m = a?.attributes?.current_position !== void 0 || a?.entity_id?.startsWith("cover.");
    let l = 0, p = 0, _ = 255, v = "1", y = "turn_on", w = "light", T = "brightness";
    d ? (l = a?.attributes?.volume_level ?? 0, _ = 1, v = "0.01", y = "set_volume_level", w = "media_player", T = "volume_level") : u ? (l = a?.attributes?.percentage ?? 0, _ = 100, v = "1", y = "set_percentage", w = "fan", T = "percentage") : m ? (l = a?.attributes?.current_position ?? 0, _ = 100, v = "1", y = "set_cover_position", w = "cover", T = "position") : l = a?.attributes?.brightness ?? 0;
    const c = Math.round(_ === 1 ? l * 100 : _ === 100 ? l : l / 255 * 100);
    return i === "slider" ? k`
        <div class="sub-button-slider-container ${o}" style="${r}" title="Level: ${c}%">
          <input type="range" 
                 min="${p}" 
                 max=${_} 
                 step=${v} 
                 .value=${l}
                 @pointerdown=${(f) => f.stopPropagation()}
                 @input=${(f) => {
      f.stopPropagation();
      const $ = parseFloat(f.target.value), C = Math.round(_ === 1 ? $ * 100 : _ === 100 ? $ : $ / 255 * 100), g = f.target.closest(".sub-button-slider-container");
      g && g.setAttribute("title", `Level: ${C}%`), this._throttledCall("sub_slider_" + n, () => {
        this.hass?.callService(w, y, { entity_id: n, [T]: $ });
      });
    }}
                 @change=${(f) => {
      f.stopPropagation();
      const $ = parseFloat(f.target.value);
      this.hass?.callService(w, y, { entity_id: n, [T]: $ });
    }} />
        </div>
      ` : k`
        <div class="sub-button-google-slider ${o}" style="${r} --slider-pct: ${c}%;" title="Level: ${c}%">
          <input type="range" 
                 min="${p}" 
                 max=${_} 
                 step=${v} 
                 .value=${l}
                 style="--slider-pct: ${c}%;"
                 @pointerdown=${(f) => f.stopPropagation()}
                 @input=${(f) => {
      f.stopPropagation();
      const $ = parseFloat(f.target.value), C = Math.round(_ === 1 ? $ * 100 : _ === 100 ? $ : $ / 255 * 100), g = f.target;
      requestAnimationFrame(() => {
        g.style.setProperty("--slider-pct", `${C}%`);
        const b = g.closest(".sub-button-google-slider");
        if (b) {
          b.style.setProperty("--slider-pct", `${C}%`), b.title = `Level: ${C}%`;
          const M = b.querySelector(".sub-slider-pct");
          M && (M.textContent = `${C}%`);
        }
      }), this._throttledCall("sub_slider_" + n, () => {
        this.hass?.callService(w, y, { entity_id: n, [T]: $ });
      });
    }}
                 @change=${(f) => {
      f.stopPropagation();
      const $ = parseFloat(f.target.value);
      this.hass?.callService(w, y, { entity_id: n, [T]: $ });
    }} />
          <span class="sub-slider-pct">${c}%</span>
        </div>
      `;
  }
  _renderSubColorPicker(t, e, i, r, o, a) {
    const n = e || this.hass.states[this.config.entity || ""], d = this._getLiveHex(n);
    return k`
      <div class="sub-button sub-color-picker ${r}" 
           tabindex="0" 
           role="button" 
           title="Select Color (${d})" 
           style="${i} background: ${d} !important; border: 2px solid rgba(255,255,255,0.7); box-shadow: 0 1px 4px rgba(0,0,0,0.3);"
           @keydown=${(u) => {
      (u.key === "Enter" || u.key === " ") && (u.preventDefault(), u.currentTarget.querySelector("input")?.click());
    }}>
        <input type="color" 
               aria-label="Color Picker"
               .value=${d} 
               @input=${(u) => this._handleColorInput(u, !0, t || this.config.entity, "sub_color_picker_" + t)}
               @change=${(u) => this._handleColorInput(u, !1, t || this.config.entity)} />
        ${o ? k`<span class="sub-button-label" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${o}</span>` : S}
        ${a ? k`<span class="sub-button-state" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${a}</span>` : S}
      </div>
    `;
  }
  _renderSubButton(t, e, i, r = !0, o, a, n, d = "button", u, m = !1) {
    const l = t ? this.hass?.states[t] : this.hass?.states[this.config.entity || ""], p = this._isEntityActive(l), _ = i ? `color: ${i};` : "", v = r ? "" : "no-bg", y = i ? this._resolveColor(i) : void 0;
    if (d === "slider" || d === "google_slider") {
      const s = i ? `--primary-color: ${i}; --slider-color: ${i};` : "";
      return this._renderSubSlider(t, l, d, s, v);
    }
    let w;
    m && l && (w = this._getInfoContent("state", l));
    const T = (t || this.config.entity || "").split(".")[0];
    if (d === "color_picker" && (T === "light" || !t && this.config.entity?.startsWith("light.")))
      return this._renderSubColorPicker(t, l, _, v, o, w);
    let c = e, f = "", $ = p, C = "", g = o, b;
    if (a && a.action && a.action !== "none" && a.action !== "default")
      c || (c = l?.attributes?.icon || "mdi:checkbox-blank-circle");
    else
      switch (d) {
        case "play_pause": {
          const s = l?.state === "playing";
          $ = s, c || (c = s ? "mdi:pause" : "mdi:play"), f = s ? "Pause" : "Play", b = () => {
            this.hass?.callService("media_player", "media_play_pause", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "next": {
          c || (c = "mdi:skip-next"), f = "Next Track", b = () => {
            this.hass?.callService("media_player", "media_next_track", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "previous": {
          c || (c = "mdi:skip-previous"), f = "Previous Track", b = () => {
            this.hass?.callService("media_player", "media_previous_track", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "vol_up": {
          c || (c = "mdi:volume-plus"), f = "Volume +5%", g || (g = "+5%"), b = () => {
            this.hass?.callService("media_player", "volume_up", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "vol_down": {
          c || (c = "mdi:volume-minus"), f = "Volume -5%", g || (g = "-5%"), b = () => {
            this.hass?.callService("media_player", "volume_down", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "mute": {
          const s = l?.attributes?.is_volume_muted === !0;
          $ = s, c || (c = s ? "mdi:volume-off" : "mdi:volume-high"), f = s ? "Unmute" : "Mute", b = () => {
            this.hass?.callService("media_player", "volume_mute", { entity_id: t || this.config.entity, is_volume_muted: !s });
          };
          break;
        }
        case "source": {
          const s = l?.attributes?.source || "", h = l?.attributes?.source_list || [], x = h.length > 0 ? h[(h.indexOf(s) + 1) % h.length] || h[0] : s;
          c || (c = "mdi:import"), f = `Source: ${s} -> ${x}`, g || (g = s || "Source"), b = () => {
            x && this.hass?.callService("media_player", "select_source", { entity_id: t || this.config.entity, source: x });
          };
          break;
        }
        case "sound_mode": {
          const s = l?.attributes?.sound_mode || "", h = l?.attributes?.sound_mode_list || [], x = h.length > 0 ? h[(h.indexOf(s) + 1) % h.length] || h[0] : s;
          c || (c = "mdi:surround-sound"), f = `Sound: ${s} -> ${x}`, g || (g = s || "Sound"), b = () => {
            x && this.hass?.callService("media_player", "select_sound_mode", { entity_id: t || this.config.entity, sound_mode: x });
          };
          break;
        }
        case "shuffle": {
          const s = l?.attributes?.shuffle === !0;
          $ = s, c || (c = s ? "mdi:shuffle" : "mdi:shuffle-disabled"), f = s ? "Shuffle: On" : "Shuffle: Off", b = () => {
            this.hass?.callService("media_player", "shuffle_set", { entity_id: t || this.config.entity, shuffle: !s });
          };
          break;
        }
        case "repeat": {
          const s = l?.attributes?.repeat || "off", h = ["off", "all", "one"], x = h[(h.indexOf(s) + 1) % h.length] || "off";
          $ = s !== "off", c || (c = s === "one" ? "mdi:repeat-once" : s === "all" ? "mdi:repeat" : "mdi:repeat-off"), f = `Repeat: ${s} -> ${x}`, g || (g = s), b = () => {
            this.hass?.callService("media_player", "repeat_set", { entity_id: t || this.config.entity, repeat: x });
          };
          break;
        }
        case "chime": {
          c || (c = "mdi:bell-ring-outline"), f = "Play Chime", b = () => {
            this.hass?.callService("chime_tts", "say", { entity_id: t || this.config.entity, message: "ding-dong" }).catch(() => {
              this.hass?.callService("media_player", "media_play", { entity_id: t || this.config.entity });
            });
          };
          break;
        }
        case "tts_announce": {
          c || (c = "mdi:bullhorn-variant-outline"), f = "Voice Announcement", b = () => {
            this.hass?.callService("tts", "speak", { media_player_entity_id: t || this.config.entity, message: "Attention: Test announcement" }).catch(() => {
              this.hass?.callService("tts", "google_translate_say", { entity_id: t || this.config.entity, message: "Attention: Test announcement" });
            });
          };
          break;
        }
        case "media_zone": {
          c || (c = "mdi:speaker-multiple"), f = "Group Speakers / Zone", b = () => {
            this.hass?.callService("media_player", "join", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "media_preset": {
          c || (c = "mdi:radio-tower"), f = "Play Radio Stream / Preset", b = () => {
            this.hass?.callService("media_player", "play_media", {
              entity_id: t || this.config.entity,
              media_content_id: "http://stream.live.vc.bbcmedia.co.uk/bbc_radio_one",
              media_content_type: "music"
            });
          };
          break;
        }
        case "door_hold": {
          c || (c = "mdi:door-open"), f = "Hold Gate / Door Open", b = () => {
            this.hass?.callService("cover", "open_cover", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "aux_heat": {
          const s = l?.attributes?.aux_heat === "on" || l?.attributes?.aux_heat === !0;
          $ = s, c || (c = s ? "mdi:radiator" : "mdi:radiator-disabled"), f = s ? "Disable Aux Heat" : "Enable Aux Heat", b = () => {
            this.hass?.callService("climate", "set_aux_heat", { entity_id: t || this.config.entity, aux_heat: !s });
          };
          break;
        }
        case "cover_preset": {
          c || (c = "mdi:window-shutter"), f = "Go to Shading Position (50%)", b = () => {
            this.hass?.callService("cover", "set_cover_position", { entity_id: t || this.config.entity, position: 50 });
          };
          break;
        }
        case "temp_up": {
          const h = this.hass?.config?.unit_system?.temperature === "°F" || this.hass?.config?.unit_system?.temperature === "F" ? 1 : 0.5, x = Number(l?.attributes?.temperature ?? l?.attributes?.target_temp_high ?? 20), E = Number(l?.attributes?.max_temp ?? 35), N = Math.min(E, x + h);
          c || (c = "mdi:thermometer-chevron-up"), f = `Temperature +${h}°`, g || (g = `+${h}°`), b = () => {
            this.hass?.callService("climate", "set_temperature", { entity_id: t || this.config.entity, temperature: N });
          };
          break;
        }
        case "temp_down": {
          const h = this.hass?.config?.unit_system?.temperature === "°F" || this.hass?.config?.unit_system?.temperature === "F" ? 1 : 0.5, x = Number(l?.attributes?.temperature ?? l?.attributes?.target_temp_low ?? 20), E = Number(l?.attributes?.min_temp ?? 10), N = Math.max(E, x - h);
          c || (c = "mdi:thermometer-chevron-down"), f = `Temperature -${h}°`, g || (g = `-${h}°`), b = () => {
            this.hass?.callService("climate", "set_temperature", { entity_id: t || this.config.entity, temperature: N });
          };
          break;
        }
        case "fan_oscillate": {
          const s = l?.attributes?.oscillating === !0;
          $ = s, c || (c = s ? "mdi:arrow-oscillating" : "mdi:fan-off"), f = s ? "Stop Oscillation" : "Start Oscillation", b = () => {
            this.hass?.callService("fan", "oscillate", { entity_id: t || this.config.entity, oscillating: !s });
          };
          break;
        }
        case "fan_direction": {
          const s = l?.attributes?.direction || "forward", h = s === "forward" ? "reverse" : "forward";
          $ = s === "reverse", c || (c = s === "reverse" ? "mdi:rotate-left" : "mdi:rotate-right"), f = `Direction: ${s} -> ${h}`, g || (g = s), b = () => {
            this.hass?.callService("fan", "set_direction", { entity_id: t || this.config.entity, direction: h });
          };
          break;
        }
        case "humidifier_mode": {
          const s = l?.attributes?.mode || l?.state || "auto", h = l?.attributes?.available_modes || ["auto", "eco", "boost", "sleep"], x = h[(h.indexOf(s) + 1) % h.length] || "auto";
          c || (c = "mdi:water-sync"), f = `Humidifier Mode: ${s} -> ${x}`, g || (g = s), b = () => {
            this.hass?.callService("humidifier", "set_mode", { entity_id: t || this.config.entity, mode: x });
          };
          break;
        }
        case "siren_toggle": {
          const s = l?.state === "on";
          $ = s, c || (c = s ? "mdi:bullhorn" : "mdi:bullhorn-outline"), f = s ? "Turn Off Siren" : "Trigger Siren", b = () => {
            this.hass?.callService("siren", "toggle", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "open_close": {
          const s = l?.state === "open" || l?.state === "on" || l?.attributes?.current_position !== void 0 && l.attributes.current_position > 0;
          $ = s;
          const h = l?.attributes?.device_class;
          c || (h === "garage" || h === "garage_door" ? c = s ? "mdi:garage-open" : "mdi:garage" : h === "blind" || h === "shade" ? c = s ? "mdi:blinds-open" : "mdi:blinds" : h === "curtain" ? c = s ? "mdi:curtains-open" : "mdi:curtains" : h === "damper" ? c = s ? "mdi:circle-slice-8" : "mdi:circle-outline" : c = s ? "mdi:window-shutter-open" : "mdi:window-shutter"), f = s ? "Close" : "Open", b = () => {
            this.hass?.callService("cover", "toggle", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "stop": {
          c || (c = "mdi:stop"), f = "Stop", b = () => {
            this.hass?.callService("cover", "stop_cover", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "open_tilt": {
          c || (c = "mdi:arrow-top-right-bottom-left"), f = "Open Tilt", b = () => {
            this.hass?.callService("cover", "open_cover_tilt", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "close_tilt": {
          c || (c = "mdi:arrow-bottom-left-top-right"), f = "Close Tilt", b = () => {
            this.hass?.callService("cover", "close_cover_tilt", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "stop_tilt": {
          c || (c = "mdi:stop"), f = "Stop Tilt", b = () => {
            this.hass?.callService("cover", "stop_cover_tilt", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "lock_unlock": {
          const s = l?.state === "locked", h = l?.state === "jammed";
          $ = !s, h && (C = "lock-jammed"), c || (c = h ? "mdi:lock-alert" : s ? "mdi:lock" : "mdi:lock-open-variant"), f = h ? "Jammed (Alert!)" : s ? "Unlock" : "Lock", b = () => {
            this.hass?.callService("lock", s ? "unlock" : "lock", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "fan_speed": {
          const s = l?.attributes?.percentage ?? 0;
          c || (c = "mdi:fan"), p && (C = "anim-spin"), f = `Speed: ${s}%`, g || (g = s > 0 ? `${s}%` : "Off"), b = () => {
            let h = 33;
            s >= 90 ? h = 0 : s >= 60 ? h = 100 : s >= 30 && (h = 66), this.hass?.callService("fan", "set_percentage", { entity_id: t || this.config.entity, percentage: h });
          };
          break;
        }
        case "fan_mode": {
          const s = l?.attributes?.fan_mode || "auto", h = l?.attributes?.fan_modes || ["auto", "low", "medium", "high"], x = h[(h.indexOf(s) + 1) % h.length] || "auto";
          c || (c = "mdi:fan"), f = `Fan Mode: ${s} -> ${x}`, g || (g = s), b = () => {
            this.hass?.callService("climate", "set_fan_mode", { entity_id: t || this.config.entity, fan_mode: x });
          };
          break;
        }
        case "swing_mode": {
          const s = l?.attributes?.swing_mode || "off", h = l?.attributes?.swing_modes || ["off", "vertical", "horizontal", "both"], x = h[(h.indexOf(s) + 1) % h.length] || "off";
          c || (c = "mdi:arrow-split-horizontal"), f = `Swing: ${s} -> ${x}`, g || (g = s), b = () => {
            this.hass?.callService("climate", "set_swing_mode", { entity_id: t || this.config.entity, swing_mode: x });
          };
          break;
        }
        case "climate_preset": {
          const s = l?.attributes?.preset_mode || "none", h = l?.attributes?.preset_modes || ["eco", "comfort", "boost", "away", "sleep", "none"], x = h[(h.indexOf(s) + 1) % h.length] || "none";
          c || (s === "eco" ? c = "mdi:leaf" : s === "boost" ? c = "mdi:rocket-launch" : s === "away" ? c = "mdi:home-export-outline" : s === "sleep" ? c = "mdi:bed" : c = "mdi:thermostat"), f = `Preset: ${s} -> ${x}`, g || (g = s), b = () => {
            this.hass?.callService("climate", "set_preset_mode", { entity_id: t || this.config.entity, preset_mode: x });
          };
          break;
        }
        case "clean": {
          const s = l?.state === "cleaning";
          $ = s, c || (c = s ? "mdi:pause" : "mdi:robot-vacuum"), f = s ? "Pause Vacuum" : "Start Vacuum", b = () => {
            this.hass?.callService("vacuum", s ? "pause" : "start", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "dock": {
          c || (c = "mdi:home-import-outline"), f = "Return to Dock", b = () => {
            this.hass?.callService("vacuum", "return_to_base", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "locate": {
          c || (c = "mdi:map-marker-question-outline"), f = "Locate", b = () => {
            this.hass?.callService("vacuum", "locate", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "clean_zone": {
          c || (c = "mdi:map-marker-radius-outline"), f = "Zone / Room Clean", b = () => {
            this.hass?.callService("vacuum", "clean_spot", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "spot_clean": {
          c || (c = "mdi:target-variant"), f = "Spot Clean Mode", b = () => {
            this.hass?.callService("vacuum", "clean_spot", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "alarm_keypad": {
          c || (c = "mdi:dialpad"), f = "Open PIN Keypad", b = () => {
            this._dispatchAction("tap", { action: "more-info" }, t || this.config.entity);
          };
          break;
        }
        case "valve_close": {
          const s = l?.state === "closed" || l?.state === "off";
          $ = !s, c || (c = s ? "mdi:valve-closed" : "mdi:valve-open"), f = s ? "Valve is Closed" : "Emergency Close Valve", b = () => {
            (t || this.config.entity || "").split(".")[0] === "valve" ? this.hass?.callService("valve", "close_valve", { entity_id: t || this.config.entity }) : this.hass?.callService("switch", "turn_off", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "pool_speed": {
          const s = l?.attributes?.percentage ?? 50, h = s > 50 ? 30 : 100;
          c || (c = "mdi:pool"), f = `Pool Speed: ${s}% -> ${h}%`, g || (g = `${s}%`), b = () => {
            this.hass?.callService("fan", "set_percentage", { entity_id: t || this.config.entity, percentage: h });
          };
          break;
        }
        case "vacuum_fan_speed": {
          const s = l?.attributes?.fan_speed || "standard", h = l?.attributes?.fan_speed_list || ["quiet", "standard", "strong", "turbo"], x = h[(h.indexOf(s) + 1) % h.length] || "standard";
          c || (c = "mdi:fan"), f = `Suction: ${s} -> ${x}`, g || (g = s), b = () => {
            this.hass?.callService("vacuum", "set_fan_speed", { entity_id: t || this.config.entity, fan_speed: x });
          };
          break;
        }
        case "counter_inc": {
          c || (c = "mdi:plus-box"), f = "Increment Counter (+1)", g || (g = "+1"), b = () => {
            this.hass?.callService("counter", "increment", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "counter_dec": {
          c || (c = "mdi:minus-box"), f = "Decrement Counter (-1)", g || (g = "-1"), b = () => {
            this.hass?.callService("counter", "decrement", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "hvac_mode": {
          const s = l?.state || "off", h = l?.attributes?.hvac_modes || ["off", "heat", "cool", "auto"], x = h[(h.indexOf(s) + 1) % h.length] || "auto";
          $ = s !== "off", c || (s === "heat" ? c = "mdi:fire" : s === "cool" ? c = "mdi:snowflake" : s === "dry" ? c = "mdi:water-percent" : s === "fan_only" ? c = "mdi:fan" : s === "auto" ? c = "mdi:thermostat-auto" : c = "mdi:power"), f = `Mode: ${s} -> Next: ${x}`, g || (g = s), b = () => {
            this.hass?.callService("climate", "set_hvac_mode", { entity_id: t || this.config.entity, hvac_mode: x });
          };
          break;
        }
        case "light_effect": {
          const s = l?.attributes?.effect_list || [], h = l?.attributes?.effect || "None", x = s.length > 0 ? s[(s.indexOf(h) + 1) % s.length] || s[0] : "None";
          c || (c = "mdi:creation"), $ = h !== "None" && h !== "off" && p, f = `Effect: ${h} -> Next: ${x}`, g || (g = h !== "None" ? h : "Effect"), b = () => {
            s.length > 0 && this.hass?.callService("light", "turn_on", { entity_id: t || this.config.entity, effect: x });
          };
          break;
        }
        case "effect_next": {
          const s = l?.attributes?.effect_list || [], h = l?.attributes?.effect || "None", x = s.length > 0 ? s[(s.indexOf(h) + 1) % s.length] || s[0] : "None";
          c || (c = "mdi:arrow-right-bold-circle-outline"), f = `Next Effect: ${x}`, g || (g = x), b = () => {
            s.length > 0 && this.hass?.callService("light", "turn_on", { entity_id: t || this.config.entity, effect: x });
          };
          break;
        }
        case "effect_prev": {
          const s = l?.attributes?.effect_list || [], h = l?.attributes?.effect || "None", x = s.indexOf(h), E = x <= 0 ? s.length - 1 : x - 1, N = s.length > 0 ? s[E] : "None";
          c || (c = "mdi:arrow-left-bold-circle-outline"), f = `Previous Effect: ${N}`, g || (g = N), b = () => {
            s.length > 0 && this.hass?.callService("light", "turn_on", { entity_id: t || this.config.entity, effect: N });
          };
          break;
        }
        case "white_mode": {
          c || (c = "mdi:white-balance-sunny"), f = "Set Neutral White (4000K)", b = () => {
            this.hass?.callService("light", "turn_on", { entity_id: t || this.config.entity, color_temp: 250 });
          };
          break;
        }
        case "brightness": {
          const s = l?.attributes?.brightness, h = s !== void 0 ? Math.round(s / 255 * 100) : 0;
          c || (c = "mdi:brightness-6"), f = `Brightness: ${h}%`, g || (g = `${h}%`), b = () => {
            let x = 25;
            h >= 85 ? x = 0 : h >= 60 ? x = 100 : h >= 35 ? x = 75 : h >= 10 && (x = 50), x === 0 ? this.hass?.callService("light", "turn_off", { entity_id: t || this.config.entity }) : this.hass?.callService("light", "turn_on", { entity_id: t || this.config.entity, brightness_pct: x });
          };
          break;
        }
        case "garage_toggle": {
          const s = l?.state === "open" || l?.state === "opening";
          $ = s, c || (c = s ? "mdi:garage-open" : "mdi:garage"), f = s ? "Close Garage" : "Open Garage", b = () => {
            this.hass?.callService("cover", "toggle", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "dim_up": {
          const s = (t || this.config.entity || "").split(".")[0];
          if (s === "number" || s === "input_number") {
            const h = Number(l?.state) || 0, x = Number(l?.attributes?.step) || 1, E = Number(l?.attributes?.max) || 100, N = Math.min(E, h + x);
            c || (c = "mdi:plus-circle-outline"), f = `Value +${x}`, g || (g = `+${x}`), b = () => {
              this.hass?.callService(s, "set_value", { entity_id: t || this.config.entity, value: N });
            };
          } else {
            const h = l?.attributes?.brightness ?? 0, x = Math.min(255, h + 26);
            c || (c = "mdi:brightness-5"), f = "Brightness +10%", g || (g = "+10%"), b = () => {
              this.hass?.callService("light", "turn_on", { entity_id: t || this.config.entity, brightness: x });
            };
          }
          break;
        }
        case "dim_down": {
          const s = (t || this.config.entity || "").split(".")[0];
          if (s === "number" || s === "input_number") {
            const h = Number(l?.state) || 0, x = Number(l?.attributes?.step) || 1, E = Number(l?.attributes?.min) || 0, N = Math.max(E, h - x);
            c || (c = "mdi:minus-circle-outline"), f = `Value -${x}`, g || (g = `-${x}`), b = () => {
              this.hass?.callService(s, "set_value", { entity_id: t || this.config.entity, value: N });
            };
          } else {
            const h = l?.attributes?.brightness ?? 0, x = Math.max(1, h - 26);
            c || (c = "mdi:brightness-4"), f = "Brightness -10%", g || (g = "-10%"), b = () => {
              this.hass?.callService("light", "turn_on", { entity_id: t || this.config.entity, brightness: x });
            };
          }
          break;
        }
        case "humidity_up": {
          const s = Number(l?.attributes?.humidity ?? l?.attributes?.target_humidity ?? 50), h = Math.min(100, s + 5);
          c || (c = "mdi:water-plus"), f = `Humidity +5% (${h}%)`, g || (g = "+5%"), b = () => {
            this.hass?.callService("humidifier", "set_humidity", { entity_id: t || this.config.entity, humidity: h });
          };
          break;
        }
        case "humidity_down": {
          const s = Number(l?.attributes?.humidity ?? l?.attributes?.target_humidity ?? 50), h = Math.max(0, s - 5);
          c || (c = "mdi:water-minus"), f = `Humidity -5% (${h}%)`, g || (g = "-5%"), b = () => {
            this.hass?.callService("humidifier", "set_humidity", { entity_id: t || this.config.entity, humidity: h });
          };
          break;
        }
        case "humidity_step_up": {
          const s = Number(l?.attributes?.humidity ?? l?.attributes?.target_humidity ?? 50), h = Math.min(100, s + 1);
          c || (c = "mdi:water-plus"), f = `Humidity +1% (${h}%)`, g || (g = "+1%"), b = () => {
            this.hass?.callService("humidifier", "set_humidity", { entity_id: t || this.config.entity, humidity: h });
          };
          break;
        }
        case "humidity_step_down": {
          const s = Number(l?.attributes?.humidity ?? l?.attributes?.target_humidity ?? 50), h = Math.max(0, s - 1);
          c || (c = "mdi:water-minus"), f = `Humidity -1% (${h}%)`, g || (g = "-1%"), b = () => {
            this.hass?.callService("humidifier", "set_humidity", { entity_id: t || this.config.entity, humidity: h });
          };
          break;
        }
        case "input_select": {
          const s = l?.state || "", h = l?.attributes?.options || [], x = h.length > 0 ? h[(h.indexOf(s) + 1) % h.length] || h[0] : s;
          c || (c = "mdi:form-dropdown"), f = `Option: ${s} -> Next: ${x}`, g || (g = s), b = () => {
            const E = (t || this.config.entity || "").split(".")[0] === "select" ? "select" : "input_select";
            this.hass?.callService(E, "select_next", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "temp_warm": {
          c || (c = "mdi:weather-sunny"), f = "Warm White (2700K)", g || (g = "2700K"), b = () => {
            this.hass?.callService("light", "turn_on", { entity_id: t || this.config.entity, color_temp_kelvin: 2700 });
          };
          break;
        }
        case "temp_cool": {
          c || (c = "mdi:weather-sunset-up"), f = "Cool Daylight (6000K)", g || (g = "6000K"), b = () => {
            this.hass?.callService("light", "turn_on", { entity_id: t || this.config.entity, color_temp_kelvin: 6e3 });
          };
          break;
        }
        case "color_temp": {
          c || (c = "mdi:palette-swatch-outline"), f = "Color Temperature", g || (g = "Temp"), b = () => {
            const s = l?.attributes?.color_temp_kelvin || 3e3;
            let h = 2700;
            s < 3300 ? h = 4e3 : s < 5e3 ? h = 6e3 : h = 2700, this.hass?.callService("light", "turn_on", { entity_id: t || this.config.entity, color_temp_kelvin: h });
          };
          break;
        }
        case "button":
        default: {
          c || (c = l?.attributes?.icon || "mdi:checkbox-blank-circle"), f = o || (l?.attributes?.friendly_name ?? "");
          break;
        }
      }
    const M = (s) => {
      this._handleSubTap(s, t, a, u, b);
    };
    return k`
      <div 
        tabindex="0"
        data-ag-sub
        class="sub-button ${v}" 
        ?active=${$} 
        style="${_} ${$ && y && r ? `background: ${y}; color: #fff;` : ""}"
        title="${f}"
        @click=${M}
        @dblclick=${(s) => s.stopPropagation()}
        @keydown=${(s) => {
      (s.key === "Enter" || s.key === " ") && (s.preventDefault(), s.stopPropagation(), M(s));
    }}
        @pointerdown=${(s) => this._handleSubPointerDown(s, t, n)}
        @pointermove=${this._handleSubPointerMove}
        @pointerup=${this._handleSubPointerUp}
        @pointercancel=${this._handleSubPointerCancel}
        @contextmenu=${(s) => this._handleSubContextMenu(s, t, n)}>
        <ha-icon .icon=${c} class="${C}"></ha-icon>
        ${g ? k`<span class="sub-button-label">${g}</span>` : S}
        ${w ? k`<span class="sub-button-state">${w}</span>` : S}
      </div>
    `;
  }
  // --- STATIC STYLES ---
  static get styles() {
    return li`
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
  }
};
ke([
  bt({ attribute: !1 })
], te.prototype, "hass", 2);
ke([
  bt({ type: Boolean })
], te.prototype, "preview", 2);
ke([
  vt()
], te.prototype, "config", 2);
ke([
  vt()
], te.prototype, "_collapsed", 2);
ke([
  pi({ passive: !0 })
], te.prototype, "_handlePointerMove", 1);
ke([
  pi({ passive: !0 })
], te.prototype, "_handleSubPointerMove", 1);
te = ke([
  Vi("antigravity-with-icon-card")
], te);
customElements.get("antigravity-with-icon-card") || customElements.define("antigravity-with-icon-card", te);
export {
  te as AntigravityWithIconCard,
  Tr as CARD_VERSION
};
