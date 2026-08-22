const tt = globalThis, St = tt.ShadowRoot && (tt.ShadyCSS === void 0 || tt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, kt = Symbol(), Nt = /* @__PURE__ */ new WeakMap();
let Qt = class {
  constructor(e, i, o) {
    if (this._$cssResult$ = !0, o !== kt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (St && e === void 0) {
      const o = i !== void 0 && i.length === 1;
      o && (e = Nt.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), o && Nt.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ai = (t) => new Qt(typeof t == "string" ? t : t + "", void 0, kt), jt = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((o, r, n) => o + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + t[n + 1], t[0]);
  return new Qt(i, t, kt);
}, si = (t, e) => {
  if (St) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const o = document.createElement("style"), r = tt.litNonce;
    r !== void 0 && o.setAttribute("nonce", r), o.textContent = i.cssText, t.appendChild(o);
  }
}, Dt = St ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const o of e.cssRules) i += o.cssText;
  return ai(i);
})(t) : t;
const { is: li, defineProperty: ci, getOwnPropertyDescriptor: di, getOwnPropertyNames: ui, getOwnPropertySymbols: hi, getPrototypeOf: _i } = Object, rt = globalThis, Rt = rt.trustedTypes, pi = Rt ? Rt.emptyScript : "", fi = rt.reactiveElementPolyfillSupport, Pe = (t, e) => t, it = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? pi : null;
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
} }, Ct = (t, e) => !li(t, e), Ht = { attribute: !0, type: String, converter: it, reflect: !1, useDefault: !1, hasChanged: Ct };
Symbol.metadata ??= Symbol("metadata"), rt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let de = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Ht) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const o = Symbol(), r = this.getPropertyDescriptor(e, o, i);
      r !== void 0 && ci(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, i, o) {
    const { get: r, set: n } = di(this.prototype, e) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: r, set(a) {
      const d = r?.call(this);
      n?.call(this, a), this.requestUpdate(e, d, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ht;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Pe("elementProperties"))) return;
    const e = _i(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Pe("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Pe("properties"))) {
      const i = this.properties, o = [...ui(i), ...hi(i)];
      for (const r of o) this.createProperty(r, i[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [o, r] of i) this.elementProperties.set(o, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, o] of this.elementProperties) {
      const r = this._$Eu(i, o);
      r !== void 0 && this._$Eh.set(r, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const o = new Set(e.flat(1 / 0).reverse());
      for (const r of o) i.unshift(Dt(r));
    } else e !== void 0 && i.push(Dt(e));
    return i;
  }
  static _$Eu(e, i) {
    const o = i.attribute;
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
    const e = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const o of i.keys()) this.hasOwnProperty(o) && (e.set(o, this[o]), delete this[o]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return si(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, i, o) {
    this._$AK(e, o);
  }
  _$ET(e, i) {
    const o = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, o);
    if (r !== void 0 && o.reflect === !0) {
      const n = (o.converter?.toAttribute !== void 0 ? o.converter : it).toAttribute(i, o.type);
      this._$Em = e, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const o = this.constructor, r = o._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const n = o.getPropertyOptions(r), a = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : it;
      this._$Em = r;
      const d = a.fromAttribute(i, n.type);
      this[r] = d ?? this._$Ej?.get(r) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, i, o, r = !1, n) {
    if (e !== void 0) {
      const a = this.constructor;
      if (r === !1 && (n = this[e]), o ??= a.getPropertyOptions(e), !((o.hasChanged ?? Ct)(n, i) || o.useDefault && o.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, o)))) return;
      this.C(e, i, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: o, reflect: r, wrapped: n }, a) {
    o && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? i ?? this[e]), n !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || o || (i = void 0), this._$AL.set(e, i)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [r, n] of o) {
        const { wrapped: a } = n, d = this[r];
        a !== !0 || this._$AL.has(r) || d === void 0 || this.C(r, void 0, n, d);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), this._$EO?.forEach((o) => o.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (o) {
      throw e = !1, this._$EM(), o;
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
de.elementStyles = [], de.shadowRootOptions = { mode: "open" }, de[Pe("elementProperties")] = /* @__PURE__ */ new Map(), de[Pe("finalized")] = /* @__PURE__ */ new Map(), fi?.({ ReactiveElement: de }), (rt.reactiveElementVersions ??= []).push("2.1.2");
const Tt = globalThis, Bt = (t) => t, ot = Tt.trustedTypes, zt = ot ? ot.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, ei = "$lit$", Y = `lit$${Math.random().toFixed(9).slice(2)}$`, ti = "?" + Y, gi = `<${ti}>`, ie = document, Ee = () => ie.createComment(""), Le = (t) => t === null || typeof t != "object" && typeof t != "function", At = Array.isArray, mi = (t) => At(t) || typeof t?.[Symbol.iterator] == "function", mt = `[ 	
\f\r]`, Ce = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ot = /-->/g, It = />/g, j = RegExp(`>|${mt}(?:([^\\s"'>=/]+)(${mt}*=${mt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ft = /'/g, Ut = /"/g, ii = /^(?:script|style|textarea|title)$/i, bi = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), w = bi(1), oe = Symbol.for("lit-noChange"), x = Symbol.for("lit-nothing"), Gt = /* @__PURE__ */ new WeakMap(), te = ie.createTreeWalker(ie, 129);
function oi(t, e) {
  if (!At(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return zt !== void 0 ? zt.createHTML(e) : e;
}
const vi = (t, e) => {
  const i = t.length - 1, o = [];
  let r, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = Ce;
  for (let d = 0; d < i; d++) {
    const u = t[d];
    let g, c, p = -1, _ = 0;
    for (; _ < u.length && (a.lastIndex = _, c = a.exec(u), c !== null); ) _ = a.lastIndex, a === Ce ? c[1] === "!--" ? a = Ot : c[1] !== void 0 ? a = It : c[2] !== void 0 ? (ii.test(c[2]) && (r = RegExp("</" + c[2], "g")), a = j) : c[3] !== void 0 && (a = j) : a === j ? c[0] === ">" ? (a = r ?? Ce, p = -1) : c[1] === void 0 ? p = -2 : (p = a.lastIndex - c[2].length, g = c[1], a = c[3] === void 0 ? j : c[3] === '"' ? Ut : Ft) : a === Ut || a === Ft ? a = j : a === Ot || a === It ? a = Ce : (a = j, r = void 0);
    const b = a === j && t[d + 1].startsWith("/>") ? " " : "";
    n += a === Ce ? u + gi : p >= 0 ? (o.push(g), u.slice(0, p) + ei + u.slice(p) + Y + b) : u + Y + (p === -2 ? d : b);
  }
  return [oi(t, n + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), o];
};
class Ne {
  constructor({ strings: e, _$litType$: i }, o) {
    let r;
    this.parts = [];
    let n = 0, a = 0;
    const d = e.length - 1, u = this.parts, [g, c] = vi(e, i);
    if (this.el = Ne.createElement(g, o), te.currentNode = this.el.content, i === 2 || i === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (r = te.nextNode()) !== null && u.length < d; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const p of r.getAttributeNames()) if (p.endsWith(ei)) {
          const _ = c[a++], b = r.getAttribute(p).split(Y), s = /([.?@])?(.*)/.exec(_);
          u.push({ type: 1, index: n, name: s[2], strings: b, ctor: s[1] === "." ? xi : s[1] === "?" ? wi : s[1] === "@" ? $i : nt }), r.removeAttribute(p);
        } else p.startsWith(Y) && (u.push({ type: 6, index: n }), r.removeAttribute(p));
        if (ii.test(r.tagName)) {
          const p = r.textContent.split(Y), _ = p.length - 1;
          if (_ > 0) {
            r.textContent = ot ? ot.emptyScript : "";
            for (let b = 0; b < _; b++) r.append(p[b], Ee()), te.nextNode(), u.push({ type: 2, index: ++n });
            r.append(p[_], Ee());
          }
        }
      } else if (r.nodeType === 8) if (r.data === ti) u.push({ type: 2, index: n });
      else {
        let p = -1;
        for (; (p = r.data.indexOf(Y, p + 1)) !== -1; ) u.push({ type: 7, index: n }), p += Y.length - 1;
      }
      n++;
    }
  }
  static createElement(e, i) {
    const o = ie.createElement("template");
    return o.innerHTML = e, o;
  }
}
function _e(t, e, i = t, o) {
  if (e === oe) return e;
  let r = o !== void 0 ? i._$Co?.[o] : i._$Cl;
  const n = Le(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(t), r._$AT(t, i, o)), o !== void 0 ? (i._$Co ??= [])[o] = r : i._$Cl = r), r !== void 0 && (e = _e(t, r._$AS(t, e.values), r, o)), e;
}
class yi {
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
    const { el: { content: i }, parts: o } = this._$AD, r = (e?.creationScope ?? ie).importNode(i, !0);
    te.currentNode = r;
    let n = te.nextNode(), a = 0, d = 0, u = o[0];
    for (; u !== void 0; ) {
      if (a === u.index) {
        let g;
        u.type === 2 ? g = new pe(n, n.nextSibling, this, e) : u.type === 1 ? g = new u.ctor(n, u.name, u.strings, this, e) : u.type === 6 && (g = new Si(n, this, e)), this._$AV.push(g), u = o[++d];
      }
      a !== u?.index && (n = te.nextNode(), a++);
    }
    return te.currentNode = ie, r;
  }
  p(e) {
    let i = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(e, o, i), i += o.strings.length - 2) : o._$AI(e[i])), i++;
  }
}
class pe {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, o, r) {
    this.type = 2, this._$AH = x, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = o, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    e = _e(this, e, i), Le(e) ? e === x || e == null || e === "" ? (this._$AH !== x && this._$AR(), this._$AH = x) : e !== this._$AH && e !== oe && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : mi(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== x && Le(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ie.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: o } = e, r = typeof o == "number" ? this._$AC(e) : (o.el === void 0 && (o.el = Ne.createElement(oi(o.h, o.h[0]), this.options)), o);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const n = new yi(r, this), a = n.u(this.options);
      n.p(i), this.T(a), this._$AH = n;
    }
  }
  _$AC(e) {
    let i = Gt.get(e.strings);
    return i === void 0 && Gt.set(e.strings, i = new Ne(e)), i;
  }
  k(e) {
    At(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let o, r = 0;
    for (const n of e) r === i.length ? i.push(o = new pe(this.O(Ee()), this.O(Ee()), this, this.options)) : o = i[r], o._$AI(n), r++;
    r < i.length && (this._$AR(o && o._$AB.nextSibling, r), i.length = r);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const o = Bt(e).nextSibling;
      Bt(e).remove(), e = o;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class nt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, o, r, n) {
    this.type = 1, this._$AH = x, this._$AN = void 0, this.element = e, this.name = i, this._$AM = r, this.options = n, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = x;
  }
  _$AI(e, i = this, o, r) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) e = _e(this, e, i, 0), a = !Le(e) || e !== this._$AH && e !== oe, a && (this._$AH = e);
    else {
      const d = e;
      let u, g;
      for (e = n[0], u = 0; u < n.length - 1; u++) g = _e(this, d[o + u], i, u), g === oe && (g = this._$AH[u]), a ||= !Le(g) || g !== this._$AH[u], g === x ? e = x : e !== x && (e += (g ?? "") + n[u + 1]), this._$AH[u] = g;
    }
    a && !r && this.j(e);
  }
  j(e) {
    e === x ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class xi extends nt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === x ? void 0 : e;
  }
}
class wi extends nt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== x);
  }
}
class $i extends nt {
  constructor(e, i, o, r, n) {
    super(e, i, o, r, n), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = _e(this, e, i, 0) ?? x) === oe) return;
    const o = this._$AH, r = e === x && o !== x || e.capture !== o.capture || e.once !== o.once || e.passive !== o.passive, n = e !== x && (o === x || r);
    r && this.element.removeEventListener(this.name, this, o), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
let Si = class {
  constructor(e, i, o) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    _e(this, e);
  }
};
const ki = { I: pe }, Ci = Tt.litHtmlPolyfillSupport;
Ci?.(Ne, pe), (Tt.litHtmlVersions ??= []).push("3.3.3");
const Ti = (t, e, i) => {
  const o = i?.renderBefore ?? e;
  let r = o._$litPart$;
  if (r === void 0) {
    const n = i?.renderBefore ?? null;
    o._$litPart$ = r = new pe(e.insertBefore(Ee(), n), n, void 0, i ?? {});
  }
  return r._$AI(t), r;
};
const Mt = globalThis;
let he = class extends de {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ti(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return oe;
  }
};
he._$litElement$ = !0, he.finalized = !0, Mt.litElementHydrateSupport?.({ LitElement: he });
const Ai = Mt.litElementPolyfillSupport;
Ai?.({ LitElement: he });
(Mt.litElementVersions ??= []).push("4.2.2");
const Mi = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
const Pi = { attribute: !0, type: String, converter: it, reflect: !1, hasChanged: Ct }, Ei = (t = Pi, e, i) => {
  const { kind: o, metadata: r } = i;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), o === "setter" && ((t = Object.create(t)).wrapped = !0), n.set(i.name, t), o === "accessor") {
    const { name: a } = i;
    return { set(d) {
      const u = e.get.call(this);
      e.set.call(this, d), this.requestUpdate(a, u, t, !0, d);
    }, init(d) {
      return d !== void 0 && this.C(a, void 0, t, d), d;
    } };
  }
  if (o === "setter") {
    const { name: a } = i;
    return function(d) {
      const u = this[a];
      e.call(this, d), this.requestUpdate(a, u, t, !0, d);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function at(t) {
  return (e, i) => typeof i == "object" ? Ei(t, e, i) : ((o, r, n) => {
    const a = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, o), a ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(t, e, i);
}
function st(t) {
  return at({ ...t, state: !0, attribute: !1 });
}
function ri(t) {
  return (e, i) => {
    const o = typeof e == "function" ? e : e[i];
    Object.assign(o, t);
  };
}
const Li = { CHILD: 2 }, Ni = (t) => (...e) => ({ _$litDirective$: t, values: e });
let Di = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, i, o) {
    this._$Ct = e, this._$AM = i, this._$Ci = o;
  }
  _$AS(e, i) {
    return this.update(e, i);
  }
  update(e, i) {
    return this.render(...i);
  }
};
const { I: Ri } = ki, Vt = (t) => t, Wt = () => document.createComment(""), Te = (t, e, i) => {
  const o = t._$AA.parentNode, r = e === void 0 ? t._$AB : e._$AA;
  if (i === void 0) {
    const n = o.insertBefore(Wt(), r), a = o.insertBefore(Wt(), r);
    i = new Ri(n, a, t, t.options);
  } else {
    const n = i._$AB.nextSibling, a = i._$AM, d = a !== t;
    if (d) {
      let u;
      i._$AQ?.(t), i._$AM = t, i._$AP !== void 0 && (u = t._$AU) !== a._$AU && i._$AP(u);
    }
    if (n !== r || d) {
      let u = i._$AA;
      for (; u !== n; ) {
        const g = Vt(u).nextSibling;
        Vt(o).insertBefore(u, r), u = g;
      }
    }
  }
  return i;
}, ee = (t, e, i = t) => (t._$AI(e, i), t), Hi = {}, Bi = (t, e = Hi) => t._$AH = e, zi = (t) => t._$AH, bt = (t) => {
  t._$AR(), t._$AA.remove();
};
const Yt = (t, e, i) => {
  const o = /* @__PURE__ */ new Map();
  for (let r = e; r <= i; r++) o.set(t[r], r);
  return o;
}, Oi = Ni(class extends Di {
  constructor(t) {
    if (super(t), t.type !== Li.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(t, e, i) {
    let o;
    i === void 0 ? i = e : e !== void 0 && (o = e);
    const r = [], n = [];
    let a = 0;
    for (const d of t) r[a] = o ? o(d, a) : a, n[a] = i(d, a), a++;
    return { values: n, keys: r };
  }
  render(t, e, i) {
    return this.dt(t, e, i).values;
  }
  update(t, [e, i, o]) {
    const r = zi(t), { values: n, keys: a } = this.dt(e, i, o);
    if (!Array.isArray(r)) return this.ut = a, n;
    const d = this.ut ??= [], u = [];
    let g, c, p = 0, _ = r.length - 1, b = 0, s = n.length - 1;
    for (; p <= _ && b <= s; ) if (r[p] === null) p++;
    else if (r[_] === null) _--;
    else if (d[p] === a[b]) u[b] = ee(r[p], n[b]), p++, b++;
    else if (d[_] === a[s]) u[s] = ee(r[_], n[s]), _--, s--;
    else if (d[p] === a[s]) u[s] = ee(r[p], n[s]), Te(t, u[s + 1], r[p]), p++, s--;
    else if (d[_] === a[b]) u[b] = ee(r[_], n[b]), Te(t, r[p], r[_]), _--, b++;
    else if (g === void 0 && (g = Yt(a, b, s), c = Yt(d, p, _)), g.has(d[p])) if (g.has(d[_])) {
      const m = c.get(a[b]), $ = m !== void 0 ? r[m] : null;
      if ($ === null) {
        const k = Te(t, r[p]);
        ee(k, n[b]), u[b] = k;
      } else u[b] = ee($, n[b]), Te(t, r[p], $), r[m] = null;
      b++;
    } else bt(r[_]), _--;
    else bt(r[p]), p++;
    for (; b <= s; ) {
      const m = Te(t, u[s + 1]);
      ee(m, n[b]), u[b++] = m;
    }
    for (; p <= _; ) {
      const m = r[p++];
      m !== null && bt(m);
    }
    return this.ut = a, Bi(t, u), oe;
  }
});
var qt, Xt;
(function(t) {
  t.language = "language", t.system = "system", t.comma_decimal = "comma_decimal", t.decimal_comma = "decimal_comma", t.space_comma = "space_comma", t.none = "none";
})(qt || (qt = {})), function(t) {
  t.language = "language", t.system = "system", t.am_pm = "12", t.twenty_four = "24";
}(Xt || (Xt = {}));
function Ii(t) {
  return t.substr(0, t.indexOf("."));
}
var Fi = ["closed", "locked", "off"], De = function(t, e, i, o) {
  o = o || {}, i = i ?? {};
  var r = new Event(e, { bubbles: o.bubbles === void 0 || o.bubbles, cancelable: !!o.cancelable, composed: o.composed === void 0 || o.composed });
  return r.detail = i, t.dispatchEvent(r), r;
}, Me = function(t) {
  De(window, "haptic", t);
}, Ui = function(t, e, i) {
  i === void 0 && (i = !1), i ? history.replaceState(null, "", e) : history.pushState(null, "", e), De(window, "location-changed", { replace: i });
}, Gi = function(t, e, i) {
  i === void 0 && (i = !0);
  var o, r = Ii(e), n = r === "group" ? "homeassistant" : r;
  switch (r) {
    case "lock":
      o = i ? "unlock" : "lock";
      break;
    case "cover":
      o = i ? "open_cover" : "close_cover";
      break;
    default:
      o = i ? "turn_on" : "turn_off";
  }
  return t.callService(n, o, { entity_id: e });
}, Vi = function(t, e) {
  var i = Fi.includes(t.states[e].state);
  return Gi(t, e, i);
}, Wi = function(t, e, i, o) {
  if (o || (o = { action: "more-info" }), !o.confirmation || o.confirmation.exemptions && o.confirmation.exemptions.some(function(n) {
    return n.user === e.user.id;
  }) || (Me("warning"), confirm(o.confirmation.text || "Are you sure you want to " + o.action + "?"))) switch (o.action) {
    case "more-info":
      (i.entity || i.camera_image) && De(t, "hass-more-info", { entityId: i.entity ? i.entity : i.camera_image });
      break;
    case "navigate":
      o.navigation_path && Ui(0, o.navigation_path);
      break;
    case "url":
      o.url_path && window.open(o.url_path);
      break;
    case "toggle":
      i.entity && (Vi(e, i.entity), Me("success"));
      break;
    case "call-service":
      if (!o.service) return void Me("failure");
      var r = o.service.split(".", 2);
      e.callService(r[0], r[1], o.service_data, o.target), Me("success");
      break;
    case "fire-dom-event":
      De(t, "ll-custom", o);
  }
}, Yi = function(t, e, i, o) {
  var r;
  o === "double_tap" && i.double_tap_action ? r = i.double_tap_action : o === "hold" && i.hold_action ? r = i.hold_action : o === "tap" && i.tap_action && (r = i.tap_action), Wi(t, e, i, r);
};
const wt = {
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
  primary_text_offset_x: 0,
  primary_text_offset_y: 0,
  primary_text_start_offset: 8,
  primary_text_end_offset: 250,
  secondary_text_offset_x: 0,
  secondary_text_offset_y: 0,
  secondary_text_start_offset: 8,
  secondary_text_end_offset: 250,
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
var qi = Object.defineProperty, Pt = (t, e, i, o) => {
  for (var r = void 0, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = a(e, i, r) || r);
  return r && qi(e, i, r), r;
};
const Xi = [
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
], Ki = [
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
], Zi = [
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
], Ji = [
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
], Qi = [
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
], Kt = [
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
function lt(t) {
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
      { value: "open_close", label: "Cover: Open/Close Toggle" },
      { value: "stop", label: "Cover: Stop" },
      { value: "open_tilt", label: "Cover: Open Tilt Position" },
      { value: "close_tilt", label: "Cover: Close Tilt Position" },
      { value: "stop_tilt", label: "Cover: Stop Tilt Position" },
      { value: "garage_toggle", label: "Garage: Toggle Open / Close" },
      { value: "lock_unlock", label: "Lock: Toggle Lock/Unlock" },
      { value: "fan_speed", label: "Fan: Cycle Speed (0-33-66-100%)" },
      { value: "fan_mode", label: "Climate: Cycle Fan Speed Mode" },
      { value: "swing_mode", label: "Climate: Cycle Vane Swing Mode" },
      { value: "climate_preset", label: "Climate: Cycle Preset (Eco/Comfort/Boost)" },
      { value: "clean", label: "Vacuum: Start / Pause Clean" },
      { value: "dock", label: "Vacuum: Return to Base / Dock" },
      { value: "locate", label: "Vacuum: Locate / Beep" },
      { value: "vacuum_fan_speed", label: "Vacuum: Cycle Suction Power" },
      { value: "hvac_mode", label: "Climate: Cycle HVAC Mode" },
      { value: "light_effect", label: "Light: Cycle Dynamic Effects" },
      { value: "dim_up", label: "Light/Number: Step Up (+10% / +Step)" },
      { value: "dim_down", label: "Light/Number: Step Down (-10% / -Step)" },
      { value: "humidity_up", label: "Humidifier: Step Target Up (+5%)" },
      { value: "humidity_down", label: "Humidifier: Step Target Down (-5%)" },
      { value: "counter_inc", label: "Counter: Increment (+1)" },
      { value: "counter_dec", label: "Counter: Decrement (-1)" },
      { value: "input_select", label: "Input Select: Cycle Next Option" },
      { value: "temp_warm", label: "Light: Warm White (2700K)" },
      { value: "temp_cool", label: "Light: Cool Daylight (6000K)" },
      { value: "slider", label: "Mini Interactive Slider" },
      { value: "google_slider", label: "Google-Style Pill Slider" },
      { value: "color_temp", label: "Color Temp Control" },
      { value: "color_picker", label: "RGB Color Picker Swatch" },
      { value: "brightness", label: "Brightness Quick Button" }
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
const ji = lt(1), eo = lt(2), to = lt(3), io = lt(4), oo = [
  { name: "tap_action", selector: { ui_action: {} } },
  { name: "hold_action", selector: { ui_action: {} } },
  { name: "double_tap_action", selector: { ui_action: {} } },
  { name: "custom_styles", selector: { text: { multiline: !0 } } }
], Zt = {
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
function E(t) {
  if (typeof t != "string" || !t.trim()) return;
  const e = t.trim();
  if (Zt[e.toLowerCase()])
    return Zt[e.toLowerCase()];
  if (/^#[0-9a-fA-F]{3}$/.test(e))
    return `#${e[1]}${e[1]}${e[2]}${e[2]}${e[3]}${e[3]}`;
  if (/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(e)) {
    const r = e.split(",").map((n) => Math.max(0, Math.min(255, parseInt(n.trim(), 10))));
    return `#${r[0].toString(16).padStart(2, "0")}${r[1].toString(16).padStart(2, "0")}${r[2].toString(16).padStart(2, "0")}`;
  }
  const i = e.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/i);
  if (i) {
    const r = Math.max(0, Math.min(255, parseInt(i[1], 10))), n = Math.max(0, Math.min(255, parseInt(i[2], 10))), a = Math.max(0, Math.min(255, parseInt(i[3], 10)));
    return `#${r.toString(16).padStart(2, "0")}${n.toString(16).padStart(2, "0")}${a.toString(16).padStart(2, "0")}`;
  }
  const o = e.match(/hsla?\s*\(\s*([\d.]+)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?(?:\s*,\s*([\d.]+))?\s*\)/i);
  if (o) {
    const r = parseFloat(o[1]) / 360, n = parseFloat(o[2]) / 100, a = parseFloat(o[3]) / 100, d = (_, b, s) => (s < 0 && (s += 1), s > 1 && (s -= 1), s < 1 / 6 ? _ + (b - _) * 6 * s : s < 1 / 2 ? b : s < 2 / 3 ? _ + (b - _) * (2 / 3 - s) * 6 : _);
    let u, g, c;
    if (n === 0)
      u = g = c = a;
    else {
      const _ = a < 0.5 ? a * (1 + n) : a + n - a * n, b = 2 * a - _;
      u = d(b, _, r + 1 / 3), g = d(b, _, r), c = d(b, _, r - 1 / 3);
    }
    const p = (_) => Math.round(Math.max(0, Math.min(255, _ * 255))).toString(16).padStart(2, "0");
    return `#${p(u)}${p(g)}${p(c)}`;
  }
  return e;
}
function ro(t) {
  const e = E(t);
  if (!e || !e.startsWith("#") || e.length < 7) return;
  const i = parseInt(e.slice(1, 3), 16), o = parseInt(e.slice(3, 5), 16), r = parseInt(e.slice(5, 7), 16);
  if (!(isNaN(i) || isNaN(o) || isNaN(r)))
    return [i, o, r];
}
const no = {
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
class ct extends he {
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
      const o = typeof i.bg_color == "string" ? i.bg_color.match(/rgba\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*([\d.]+)\s*\)/i) : null;
      o && i.bg_opacity === void 0 && (i.bg_opacity = Math.round(parseFloat(o[1]) * 100)), i.bg_color = E(i.bg_color);
    }
    i.card_border_color && (i.card_border_color = E(i.card_border_color)), i.icon_color && (i.icon_color = E(i.icon_color)), i.active_color && (i.active_color = E(i.active_color)), i.inactive_color && (i.inactive_color = E(i.inactive_color)), i.badge_color && (i.badge_color = E(i.badge_color)), i.slider_color && (i.slider_color = E(i.slider_color)), i.slider_track_color && (i.slider_track_color = E(i.slider_track_color)), i.text_color_primary && (i.text_color_primary = E(i.text_color_primary)), i.text_color_secondary && (i.text_color_secondary = E(i.text_color_secondary)), i.sub_button_1_color && (i.sub_button_1_color = E(i.sub_button_1_color)), i.sub_button_2_color && (i.sub_button_2_color = E(i.sub_button_2_color)), i.sub_button_3_color && (i.sub_button_3_color = E(i.sub_button_3_color)), i.sub_button_4_color && (i.sub_button_4_color = E(i.sub_button_4_color)), this._config = {
      ...wt,
      ...i
    };
  }
  _computeLabel(e) {
    return no[e.name] || e.name;
  }
  _valueChanged(e, i) {
    let o = { ...this._config };
    const r = e.detail.value || {};
    for (const n of i)
      if (n.name)
        if (n.selector?.boolean !== void 0)
          r[n.name] !== void 0 ? o[n.name] = r[n.name] === !0 : delete o[n.name];
        else if (n.selector?.color_rgb !== void 0) {
          const a = r[n.name];
          Array.isArray(a) && a.length === 3 ? o[n.name] = `rgb(${a[0]}, ${a[1]}, ${a[2]})` : a !== void 0 && a !== "" ? o[n.name] = a : delete o[n.name];
        } else
          r[n.name] !== void 0 && r[n.name] !== "" ? o[n.name] = r[n.name] : delete o[n.name];
    De(this, "config-changed", { config: o });
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
    for (const o of i)
      if (e[o]) {
        const r = ro(e[o]);
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
  _renderSection(e, i, o, r, n) {
    const a = !!this._openPanels[e];
    return w`
      <div class="custom-panel ${a ? "open" : ""}">
        <div class="panel-header" @click=${() => this._togglePanel(e)}>
          <div class="header-left">
            <span class="header-icon">${i}</span>
            <span class="header-title">${o}</span>
          </div>
          <ha-icon class="chevron-icon ${a ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        ${a ? w`
          <div class="panel-body">
            <ha-form
              .hass=${this.hass}
              .data=${n}
              .schema=${r}
              .computeLabel=${this._computeLabel}
              @value-changed=${(d) => this._valueChanged(d, r)}
            ></ha-form>
          </div>
        ` : x}
      </div>
    `;
  }
  _renderSubButtonPanel(e, i, o, r) {
    const n = `sub${e}`, a = !!this._openPanels[n];
    return w`
      <div class="sub-nested-panel ${a ? "open" : ""}">
        <div class="sub-panel-header" @click=${() => this._togglePanel(n)}>
          <div class="header-left">
            <span class="sub-dot ${i ? "active" : ""}"></span>
            <span class="sub-title">Sub-Button ${e} ${i ? `(${i})` : "• Inactive"}</span>
          </div>
          <ha-icon class="chevron-icon ${a ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        ${a ? w`
          <div class="sub-panel-body">
            <ha-form
              .hass=${this.hass}
              .data=${r}
              .schema=${o}
              .computeLabel=${this._computeLabel}
              @value-changed=${(d) => this._valueChanged(d, o)}
            ></ha-form>
          </div>
        ` : x}
      </div>
    `;
  }
  render() {
    if (!this.hass || !this._config) return w``;
    const e = this._transformConfigForForm(), i = this._config?.sub_button_1_entity || "", o = this._config?.sub_button_2_entity || "", r = this._config?.sub_button_3_entity || "", n = this._config?.sub_button_4_entity || "", a = !!this._openPanels.sub_buttons;
    return w`
      <div class="editor-container">
        <!-- 1. CORE & LAYOUT -->
        ${this._renderSection("core", "📦", "Core & Layout", Xi, e)}

        <!-- 2. APPEARANCE & THEMING -->
        ${this._renderSection("appearance", "🎨", "Appearance & Theming", Ki, e)}

        <!-- 3. SLIDERS & CONTROLS -->
        ${this._renderSection("controls", "🎛️", "Sliders & Interactive Controls", Zi, e)}

        <!-- 4. SPACING, PADDING & SIZING -->
        ${this._renderSection("spacing", "📏", "Spacing, Padding & Sizing", Ji, e)}

        <!-- 5. TYPOGRAPHY & LIVE SCROLLING -->
        ${this._renderSection("typography", "✍️", "Typography & Live Scrolling", Qi, e)}

        <!-- 6. CONSOLIDATED SUB-BUTTONS (1-4) -->
        <div class="custom-panel ${a ? "open" : ""}">
          <div class="panel-header" @click=${() => this._togglePanel("sub_buttons")}>
            <div class="header-left">
              <span class="header-icon">🔘</span>
              <span class="header-title">Sub-Buttons (1 – 4)</span>
            </div>
            <ha-icon class="chevron-icon ${a ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
          </div>
          ${a ? w`
            <div class="panel-body sub-buttons-master">
              <div class="section-subtitle">Global Sub-Button Layout</div>
              <ha-form
                .hass=${this.hass}
                .data=${e}
                .schema=${Kt}
                .computeLabel=${this._computeLabel}
                @value-changed=${(d) => this._valueChanged(d, Kt)}
              ></ha-form>
              
              <div class="sub-buttons-nested-list">
                ${this._renderSubButtonPanel(1, i, ji, e)}
                ${this._renderSubButtonPanel(2, o, eo, e)}
                ${this._renderSubButtonPanel(3, r, to, e)}
                ${this._renderSubButtonPanel(4, n, io, e)}
              </div>
            </div>
          ` : x}
        </div>

        <!-- 7. ACTIONS & CUSTOM STYLESHEET -->
        ${this._renderSection("actions", "⚡", "Actions & Scoped CSS", oo, e)}
      </div>
    `;
  }
  static get styles() {
    return jt`
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
Pt([
  at({ attribute: !1 })
], ct.prototype, "hass");
Pt([
  st()
], ct.prototype, "_config");
Pt([
  st()
], ct.prototype, "_openPanels");
customElements.get("antigravity-with-icon-card-editor") || customElements.define("antigravity-with-icon-card-editor", ct);
var ao = Object.defineProperty, so = Object.getOwnPropertyDescriptor, re = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? so(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && ao(e, i, r), r;
};
const lo = "130";
console.info(
  `%c 🚀 ANTIGRAVITY-CARD (WITH-ICON) %c v${lo} `,
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
customElements.get("antigravity-with-icon-card") || customElements.define("antigravity-with-icon-card", AntigravityCardWithIcon);
let ue = Date.now();
typeof window < "u" && !window.__AG_RESUME_LISTENER_ATTACHED__ && (window.__AG_RESUME_LISTENER_ATTACHED__ = !0, window.addEventListener("focus", () => {
  ue = Date.now();
}, { passive: !0 }), document.addEventListener("visibilitychange", () => {
  document.visibilityState === "visible" && (ue = Date.now());
}, { passive: !0 }));
const co = /* @__PURE__ */ new Set([
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
]), uo = /* @__PURE__ */ new Set([
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
]), ho = /* @__PURE__ */ new Set(["hs", "xy", "rgb", "rgbw", "rgbww"]), _o = /* @__PURE__ */ new Set([
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
]), ni = /^\d+\s*,\s*\d+\s*,\s*\d+$/, po = /^\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+$/, Je = /* @__PURE__ */ new Map();
function R(t) {
  (isNaN(t) || !isFinite(t)) && (t = 3e3);
  const e = Math.max(1e3, Math.min(4e4, Math.round(t))), i = Je.get(e);
  if (i) return i;
  const o = e / 100;
  let r, n, a;
  if (o <= 66)
    r = 255;
  else {
    const u = o - 60;
    r = 329.698727446 * Math.pow(u, -0.1332047592), r = Math.max(0, Math.min(255, r));
  }
  if (o <= 66)
    n = o, n = 99.4708025861 * Math.log(n) - 161.1195681661, n = Math.max(0, Math.min(255, n));
  else {
    const u = o - 60;
    n = 288.1221695283 * Math.pow(u, -0.0755148492), n = Math.max(0, Math.min(255, n));
  }
  if (o >= 66)
    a = 255;
  else if (o <= 19)
    a = 0;
  else {
    const u = o - 10;
    a = 138.5177312231 * Math.log(u) - 305.0447927307, a = Math.max(0, Math.min(255, a));
  }
  const d = [Math.round(r), Math.round(n), Math.round(a)];
  return Je.size > 256 && Je.clear(), Je.set(e, d), d;
}
[2e3, 2200, 2500, 2700, 3e3, 3500, 4e3, 4500, 5e3, 5500, 6e3, 6500].forEach((t) => {
  R(t);
});
const Qe = /* @__PURE__ */ new Map();
function je(t) {
  if (!Array.isArray(t) || t.length < 3) return "#ffffff";
  const e = `${t[0]},${t[1]},${t[2]}`, i = Qe.get(e);
  if (i) return i;
  const o = "#" + t.slice(0, 3).map((r) => Math.round(Number(r) || 0).toString(16).padStart(2, "0")).join("");
  return Qe.size > 512 && Qe.clear(), Qe.set(e, o), o;
}
function fo(t, e, i) {
  t /= 255, e /= 255, i /= 255;
  const o = Math.max(t, e, i), r = Math.min(t, e, i);
  let n = 0;
  const a = o - r;
  if (a === 0) return 0;
  switch (o) {
    case t:
      n = (e - i) / a + (e < i ? 6 : 0);
      break;
    case e:
      n = (i - t) / a + 2;
      break;
    case i:
      n = (t - e) / a + 4;
      break;
  }
  return Math.round(n * 60);
}
function vt(t, e) {
  t = t % 360 / 360, e = Math.max(0, Math.min(100, e)) / 100;
  const i = 1, o = Math.floor(t * 6), r = t * 6 - o, n = i * (1 - e), a = i * (1 - r * e), d = i * (1 - (1 - r) * e);
  let u = 0, g = 0, c = 0;
  switch (o % 6) {
    case 0:
      u = i, g = d, c = n;
      break;
    case 1:
      u = a, g = i, c = n;
      break;
    case 2:
      u = n, g = i, c = d;
      break;
    case 3:
      u = n, g = a, c = i;
      break;
    case 4:
      u = d, g = n, c = i;
      break;
    case 5:
      u = i, g = n, c = a;
      break;
  }
  return [Math.round(u * 255), Math.round(g * 255), Math.round(c * 255)];
}
const $t = [
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
], go = [
  { k: 2200, label: "2200K", rgb: R(2200) },
  { k: 2700, label: "2700K", rgb: R(2700) },
  { k: 3e3, label: "3000K", rgb: R(3e3) },
  { k: 4e3, label: "4000K", rgb: R(4e3) },
  { k: 5e3, label: "5000K", rgb: R(5e3) },
  { k: 6500, label: "6500K", rgb: R(6500) }
], Ae = /* @__PURE__ */ new Map(), mo = 200;
function D(t) {
  if (!t) return null;
  const e = t.trim().toLowerCase();
  if (!e) return null;
  const i = Ae.get(e);
  if (i !== void 0) return i;
  const o = bo(e);
  if (Ae.size >= mo) {
    const r = Ae.keys().next().value;
    r && Ae.delete(r);
  }
  return Ae.set(e, o), o;
}
function bo(t) {
  if (t.charCodeAt(0) === 35) {
    const e = t.slice(1);
    if (e.length === 6) {
      const i = parseInt(e, 16);
      if (!isNaN(i))
        return [i >> 16 & 255, i >> 8 & 255, i & 255];
    }
    if (e.length === 3) {
      const i = parseInt(e[0] + e[0], 16), o = parseInt(e[1] + e[1], 16), r = parseInt(e[2] + e[2], 16);
      return [i, o, r];
    }
  }
  if (t.startsWith("rgb")) {
    const e = t.indexOf("("), i = t.lastIndexOf(")");
    if (e !== -1 && i !== -1) {
      const o = t.slice(e + 1, i).split(",").map((r) => parseFloat(r.trim()));
      if (o.length >= 3 && !o.slice(0, 3).some(isNaN))
        return [
          Math.max(0, Math.min(255, Math.round(o[0]))),
          Math.max(0, Math.min(255, Math.round(o[1]))),
          Math.max(0, Math.min(255, Math.round(o[2])))
        ];
    }
  }
  if (t.startsWith("rgb")) {
    const e = t.indexOf("("), i = t.lastIndexOf(")");
    if (e !== -1 && i !== -1) {
      const o = t.slice(e + 1, i).split(",").map((r) => parseFloat(r.trim()));
      if (o.length >= 3 && !o.slice(0, 3).some(isNaN))
        return [
          Math.max(0, Math.min(255, Math.round(o[0]))),
          Math.max(0, Math.min(255, Math.round(o[1]))),
          Math.max(0, Math.min(255, Math.round(o[2])))
        ];
    }
  }
  if (ni.test(t)) {
    const e = t.split(",").map((i) => parseInt(i.trim(), 10));
    if (e.length >= 3 && !e.some(isNaN))
      return [e[0], e[1], e[2]];
  }
  for (let e = 0; e < $t.length; e++) {
    const i = $t[e];
    if (t === i.label.toLowerCase() || t === i.hex)
      return [i.rgb[0], i.rgb[1], i.rgb[2]];
  }
  return null;
}
function yt(t, e, i) {
  const o = Math.max(0, Math.min(1, i));
  return [
    Math.round(t[0] + (e[0] - t[0]) * o),
    Math.round(t[1] + (e[1] - t[1]) * o),
    Math.round(t[2] + (e[2] - t[2]) * o)
  ];
}
function xt(t) {
  return `rgb(${t[0]}, ${t[1]}, ${t[2]})`;
}
const et = Object.freeze({
  enabled: !1,
  activeFade: !1,
  currentColor: "",
  progressPct: 0,
  remainingSeconds: 0,
  currentStage: 0,
  stageLabel: ""
});
function L(t, e = !0) {
  if (!(!e || typeof window > "u"))
    try {
      if (Me(t), typeof navigator < "u" && "vibrate" in navigator && typeof navigator.vibrate == "function") {
        let i = 6;
        t === "heavy" ? i = 20 : t === "medium" ? i = 12 : t === "success" ? i = [40, 40, 80] : t === "warning" ? i = [50, 30, 50] : t === "error" && (i = [50, 100, 50]), navigator.vibrate(i);
      }
    } catch {
    }
}
const ce = /* @__PURE__ */ new Map(), Jt = 250;
function vo(t) {
  if (!t) return "";
  const e = ce.get(t);
  if (e !== void 0) return e;
  const i = t.trim();
  if (!i)
    return ce.set(t, ""), "";
  let o = i;
  if (i.startsWith("#") || i.startsWith("rgb") || i.startsWith("hsl") || i.startsWith("var(") ? o = i : ni.test(i) ? o = `rgb(${i})` : po.test(i) ? o = `rgba(${i})` : i.toLowerCase() === "state" ? o = "var(--state-icon-color, var(--primary-color))" : uo.has(i.toLowerCase()) && (o = `var(--${i.toLowerCase()}-color, ${i.toLowerCase()})`), ce.size >= Jt) {
    const r = Math.floor(Jt / 4), n = ce.keys();
    for (let a = 0; a < r; a++) {
      const d = n.next().value;
      d !== void 0 && ce.delete(d);
    }
  }
  return ce.set(t, o), o;
}
let I = class extends he {
  constructor() {
    super(...arguments), this._previousLiveRgb = null, this._currentLiveRgb = null, this._lastTrackedState = null, this.preview = !1, this._collapsed = !0, this._holdTimer = null, this._held = !1, this._moved = !1, this._tapTimer = null, this._throttleMap = /* @__PURE__ */ new Map(), this._startX = 0, this._startY = 0, this._subHoldTimer = null, this._subHeld = !1, this._subMoved = !1, this._subStartX = 0, this._subStartY = 0, this._subTapTimerMap = /* @__PURE__ */ new Map(), this._monitoredEntities = [], this._staticCardStyles = "", this._staticCardClasses = "", this._textOffsetStyle = "", this._iconOffsetStyle = "", this._featuresOffsetStyle = "", this._mainSliderMarginOffsets = "", this._colorTempMarginOffsets = "", this._colorHueMarginOffsets = "", this._textBoxWidth = "", this._primaryTextStyle = "", this._secondaryTextStyle = "", this._primaryTextOffsetStyle = "", this._secondaryTextOffsetStyle = "", this._iconShapeClass = "", this._iconAnimClass = "", this._iconContainerSize = 36, this._iconSize = 24, this._iconOpacityStyle = "", this._iconRotateStyle = "", this._fadeStaticConfig = null, this._relativeTimer = null, this._cachedSubButtons = null, this._intersectionObserver = null, this._cachedHasCollapsible = !1, this._mountTime = 0, this._pointerDownReceived = !1, this._pointerDownTime = 0, this._canceled = !1, this._activePointerId = null, this._subCanceled = !1, this._subPointerDownTime = 0, this._sliderStateMap = /* @__PURE__ */ new WeakMap(), this._onSliderPointerDown = (t) => {
      const e = t.currentTarget;
      if (!e) return;
      const o = e.closest(".slider-container, .sub-button-slider-container")?.querySelector(".slider-percent-badge, .sub-slider-pct"), r = Number(e.value) || 0, n = e.style.getPropertyValue("--slider-pct") || "", a = o?.textContent || "";
      this._sliderStateMap.set(e, {
        startX: t.clientX,
        startY: t.clientY,
        initialVal: r,
        initialPct: n,
        initialBadge: a,
        isScrolling: !1,
        isSliding: !1
      });
    }, this._onSliderPointerMove = (t) => {
      const e = t.currentTarget;
      if (!e) return;
      const i = this._sliderStateMap.get(e);
      if (!i) return;
      const o = Math.abs(t.clientX - i.startX), r = Math.abs(t.clientY - i.startY);
      !i.isSliding && !i.isScrolling ? r > 6 && r > o ? (i.isScrolling = !0, this._revertSlider(e, i)) : o > 6 && o >= r && (i.isSliding = !0) : i.isScrolling && this._revertSlider(e, i);
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
          const o = Math.abs(t.clientX - i.startX), r = Math.abs(t.clientY - i.startY);
          o < 6 && r < 6 && (this._revertSlider(e, i), L("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap"));
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
    return { ...wt };
  }
  static async getConfigElement() {
    return document.createElement("antigravity-with-icon-card-editor");
  }
  setConfig(t) {
    if (!t)
      throw new Error("Invalid configuration");
    this.config = {
      ...wt,
      ...t
    }, this._cachedSubButtons = null;
    const e = /* @__PURE__ */ new Set();
    if (this.config.entity && e.add(this.config.entity), this.config.sub_button_1_entity && e.add(this.config.sub_button_1_entity), this.config.sub_button_2_entity && e.add(this.config.sub_button_2_entity), this.config.sub_button_3_entity && e.add(this.config.sub_button_3_entity), this.config.sub_button_4_entity && e.add(this.config.sub_button_4_entity), this.config.tap_action?.target?.entity_id) {
      const i = this.config.tap_action.target.entity_id;
      typeof i == "string" ? e.add(i) : Array.isArray(i) && i.forEach((o) => e.add(o));
    }
    if (this.config.hold_action?.target?.entity_id) {
      const i = this.config.hold_action.target.entity_id;
      typeof i == "string" ? e.add(i) : Array.isArray(i) && i.forEach((o) => e.add(o));
    }
    this._monitoredEntities = Array.from(e), this._computeStaticStylesAndClasses();
  }
  shouldUpdate(t) {
    if (!this.config || !this.hass || t.has("config") || t.has("preview") || t.has("_collapsed")) return !0;
    const e = t.get("hass");
    if (!e || e.themes !== this.hass.themes || e.locale !== this.hass.locale || e.language !== this.hass.language || e.selectedTheme !== this.hass.selectedTheme)
      return !0;
    const i = this._monitoredEntities, o = i.length;
    for (let r = 0; r < o; r++) {
      const n = i[r];
      if (e.states[n] !== this.hass.states[n])
        return !0;
    }
    return !1;
  }
  _computeStaticStylesAndClasses() {
    if (!this.config) return;
    const t = this.config.card_padding ?? 12, e = this.config.card_padding_vertical ?? 4, i = this.config.card_padding_horizontal ?? t, o = this.config.card_padding_top ?? e, r = this.config.card_padding_bottom ?? e, n = this.config.card_padding_left ?? i, a = this.config.card_padding_right ?? i, d = this.config.card_margin, u = this.config.card_margin_vertical ?? d, g = this.config.card_margin_horizontal ?? d, c = this.config.card_margin_top ?? u, p = this.config.card_margin_bottom ?? u, _ = this.config.card_margin_left ?? g, b = this.config.card_margin_right ?? g;
    let s = "";
    (c !== void 0 || p !== void 0 || _ !== void 0 || b !== void 0) && (s = `margin: ${c ?? 0}px ${b ?? 0}px ${p ?? 0}px ${_ ?? 0}px;`);
    const m = this.config.border_radius ?? 12, $ = this.config.slider_style === "google", k = this.config.slider_style === "full", f = $ ? 42 : k ? 40 : 12, v = this.config.slider_height !== void 0 ? this.config.slider_height : f, S = $ ? 21 : k ? 0 : v / 2, l = this.config.slider_border_radius !== void 0 ? this.config.slider_border_radius : S, h = this.config.card_border_width ?? (this.config.card_border_color ? 1 : 0), y = this.config.card_border_style ?? "solid", C = h > 0 ? `border: ${h}px ${y} ${this._resolveColor(this.config.card_border_color) || "var(--divider-color, rgba(150, 150, 150, 0.2))"};` : "", M = this.config.card_width ? `width: ${this.config.card_width};` : "", F = this.config.card_max_width ? `max-width: ${this.config.card_max_width};` : "", fe = this.config.card_height ? `height: ${this.config.card_height};` : "", ge = this.config.card_min_height !== void 0 ? `min-height: ${this.config.card_min_height}px;` : "", q = this.config.fill_container === !0 ? "height: 100%; width: 100%;" : "", Re = this.config.overflow_hidden !== !1 ? "overflow: hidden;" : "overflow: visible;", dt = this.config.backdrop_blur !== void 0 ? `backdrop-filter: blur(${this.config.backdrop_blur}px); -webkit-backdrop-filter: blur(${this.config.backdrop_blur}px);` : "", me = this.config.card_opacity !== void 0 ? `opacity: ${this.config.card_opacity / 100};` : "", He = this.config.transition_duration !== void 0 ? `transition: all ${this.config.transition_duration}ms ease;` : "", Be = this.config.icon_padding !== void 0 ? `--ag-icon-padding: ${this.config.icon_padding}px;` : "", be = this.config.text_padding_vertical ?? this.config.text_padding ?? 0, ze = this.config.text_padding_horizontal ?? this.config.text_padding ?? 0, ut = this.config.features_padding_vertical ?? this.config.features_padding ?? 0, Oe = this.config.features_padding_horizontal ?? this.config.features_padding ?? 0, Ie = this.config.sub_button_padding ?? 0, Fe = this.config.sub_button_container_padding ?? 0, Ue = this.config.sub_button_alignment ? `--ag-sub-button-alignment: ${this.config.sub_button_alignment};` : "", H = this.config.text_scrolling_speed ? `--ag-scroll-speed: ${this.config.text_scrolling_speed}s;` : "", Ge = this.config.full_slider_opacity !== void 0 ? `--ag-full-slider-opacity: ${this.config.full_slider_opacity / 100};` : "";
    this._staticCardStyles = [
      s,
      `border-radius: ${m}px;`,
      C,
      M,
      F,
      fe,
      ge,
      q,
      Re,
      dt,
      me,
      He,
      Be,
      `--ag-card-padding: ${o}px ${a}px ${r}px ${n}px;`,
      `--ag-text-padding: ${be}px ${ze}px;`,
      `--ag-features-padding: ${ut}px ${Oe}px;`,
      `--ag-sub-button-padding: ${Ie}px;`,
      `--ag-sub-button-container-padding: ${Fe}px;`,
      `--ag-content-spacing: ${this.config.content_spacing ?? 12}px;`,
      `--ag-text-spacing: ${this.config.text_spacing ?? 2}px;`,
      `--ag-features-margin: ${this.config.features_margin ?? 4}px;`,
      `--ag-slider-spacing: ${this.config.slider_spacing ?? 6}px;`,
      `--ag-icon-margin: ${this.config.icon_margin ?? 0}px;`,
      `--ag-sub-button-spacing: ${this.config.sub_button_spacing ?? 6}px;`,
      `--ag-slider-height: ${v}px;`,
      `--ag-slider-radius: ${l}px;`,
      `--ag-badge-size: ${this.config.badge_size ?? 16}px;`,
      `--ag-badge-offset: ${this.config.badge_offset ?? -2}px;`,
      `--ag-text-alignment: ${this.config.text_alignment ?? "left"};`,
      `--ag-content-alignment: ${this.config.content_alignment ?? "flex-start"};`,
      Ue,
      H,
      Ge
    ].filter(Boolean).join(" "), this._staticCardClasses = [
      `layout-${this.config.layout}`,
      this.config.card_layout === "large" ? "card-large" : "",
      `theme-${this.config.theme_preset ?? "default"}`,
      `hover-${this.config.hover_effect ?? "glow"}`,
      `slider-style-${this.config.slider_style ?? "circle"}`,
      this.config.text_color_mode === "inverse" ? "text-color-mode-inverse" : ""
    ].filter(Boolean).join(" ");
    const ve = Number(this.config.text_offset_x) || 0, ye = Number(this.config.text_offset_y) || 0;
    this._textOffsetStyle = ve !== 0 || ye !== 0 ? `transform: translate(${ve}px, ${ye}px);` : "";
    const X = Number(this.config.primary_text_start_offset ?? this.config.primary_text_offset_x) || 0, xe = Number(this.config.primary_text_end_offset) || 0, we = Number(this.config.primary_text_offset_y) || 0, ht = X !== 0 || we !== 0 ? `transform: translate(${X}px, ${we}px);` : "", _t = X !== 0 || xe !== 0 ? `margin-left: ${X}px; margin-right: ${xe}px;` : "";
    this._primaryTextOffsetStyle = `${ht} ${_t}`.trim();
    const ne = Number(this.config.secondary_text_start_offset ?? this.config.secondary_text_offset_x) || 0, P = Number(this.config.secondary_text_end_offset) || 0, U = Number(this.config.secondary_text_offset_y) || 0, Ve = ne !== 0 || U !== 0 ? `transform: translate(${ne}px, ${U}px);` : "", B = ne !== 0 || P !== 0 ? `margin-left: ${ne}px; margin-right: ${P}px;` : "";
    this._secondaryTextOffsetStyle = `${Ve} ${B}`.trim();
    const $e = Number(this.config.icon_offset_x) || 0, ae = Number(this.config.icon_offset_y) || 0;
    this._iconOffsetStyle = $e !== 0 || ae !== 0 ? `transform: translate(${$e}px, ${ae}px);` : "";
    const K = Number(this.config.features_offset_x) || 0, We = Number(this.config.features_offset_y) || 0;
    this._featuresOffsetStyle = K !== 0 || We !== 0 ? `transform: translate(${K}px, ${We}px);` : "";
    const N = Number(this.config.slider_start_offset) || 0, Ye = Number(this.config.slider_end_offset) || 0;
    this._mainSliderMarginOffsets = [
      N ? `margin-left: ${N}px !important;` : "",
      Ye ? `margin-right: ${Ye}px !important;` : ""
    ].filter(Boolean).join(" ");
    const qe = Number(this.config.color_temp_start_offset) || 0, Xe = Number(this.config.color_temp_end_offset) || 0;
    this._colorTempMarginOffsets = [
      qe ? `margin-left: ${qe}px !important;` : "",
      Xe ? `margin-right: ${Xe}px !important;` : ""
    ].filter(Boolean).join(" ");
    const Ke = Number(this.config.color_slider_start_offset) || 0, Ze = Number(this.config.color_slider_end_offset) || 0;
    this._colorHueMarginOffsets = [
      Ke ? `margin-left: ${Ke}px !important;` : "",
      Ze ? `margin-right: ${Ze}px !important;` : ""
    ].filter(Boolean).join(" "), this._textBoxWidth = this.config.text_box_width ? `max-width: ${this.config.text_box_width}; width: ${this.config.text_box_width};` : "width: 100%; max-width: 100%;";
    const pt = this.config.text_transform_primary && this.config.text_transform_primary !== "none" ? `text-transform: ${this.config.text_transform_primary};` : "", ft = `text-transform: ${this.config.text_transform_secondary ?? "capitalize"};`, se = this.config.letter_spacing ? `letter-spacing: ${this.config.letter_spacing}px;` : "", z = this.config.line_height ? `line-height: ${this.config.line_height};` : "", G = this.config.font_weight_primary ?? "800";
    this._primaryTextStyle = `font-size: ${this.config.font_size_primary ?? 14}px; font-weight: ${G}; ${pt} ${se} ${z}`, this._secondaryTextStyle = `font-size: ${this.config.font_size_secondary ?? 15}px; ${ft} ${se} ${z}`, this._iconShapeClass = `icon-shape-${this.config.icon_shape || "circle"}`, this._iconAnimClass = `anim-${this.config.icon_animation || "none"}`, this._iconContainerSize = this.config.icon_container_size ?? (this.config.card_layout === "large" ? 48 : 36), this._iconSize = this.config.icon_size ?? 24, this._iconOpacityStyle = this.config.icon_opacity !== void 0 && this.config.icon_opacity < 100 ? `opacity: ${this.config.icon_opacity / 100};` : "", this._iconRotateStyle = this.config.icon_rotate && this.config.icon_rotate !== 0 ? `transform: rotate(${this.config.icon_rotate}deg);` : "";
    const V = this.config.entity, Se = [];
    for (let T = 1; T <= 4; T++) {
      const Z = this.config[`sub_button_${T}_entity`], W = this.config[`sub_button_${T}_icon`], J = this.config[`sub_button_${T}_name`], le = this.config[`sub_button_${T}_tap_action`], O = this.config[`sub_button_${T}_hold_action`], gt = this.config[`sub_button_${T}_double_tap_action`], Q = this.config[`sub_button_${T}_type`], A = this.config[`sub_button_${T}_color`], ke = this.config[`sub_button_${T}_show_background`], Et = this.config[`sub_button_${T}_show_state`];
      if (!!(Z || W || J || Q && Q !== "button" || Et)) {
        const Lt = Z || V;
        Se.push(Object.freeze({
          key: `${Lt || "sub"}_${T}`,
          entity: Lt,
          type: Q || "button",
          icon: W,
          color: A,
          bg: ke,
          name: J,
          showState: Et === !0,
          tapAction: le,
          holdAction: O,
          doubleTapAction: gt
        }));
      }
    }
    if (this._cachedSubButtons = Object.freeze(Se), this.config.fade_transition_enabled) {
      const T = Number(this.config.fade_stage_1_duration) || 60, Z = Number(this.config.fade_stage_2_duration) || 600, W = Number(this.config.fade_stage_3_duration) || 1800, J = D(this.config.fade_stage_1_color) || [255, 152, 0], le = D(this.config.fade_stage_2_color) || [205, 220, 57], O = D(this.config.fade_stage_3_color);
      this._fadeStaticConfig = {
        d1: T,
        d2: Z,
        d3: W,
        totalDuration: T + Z + W,
        c1Rgb: J,
        c2Rgb: le,
        c3Rgb: O,
        restingResult: Object.freeze({
          enabled: !0,
          activeFade: !1,
          currentColor: O ? xt(O) : "",
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
    const i = this.config.entity.split(".")[0] === "light", o = t.state === "on", r = this.config.hide_color_temp_when_off !== !1, n = this.config.hide_color_picker_when_off !== !1, a = this.config.hide_color_slider_when_off !== !1, d = t.attributes?.color_temp_kelvin ?? t.attributes?.color_temp, u = i && this.config.show_color_temp === !0 && (d !== void 0 || t.attributes?.supported_color_modes?.some(($) => ["color_temp"].includes($))) && (!r || o), g = t.attributes?.supported_color_modes, c = Array.isArray(g) && g.some(($) => ["hs", "xy", "rgb", "rgbw", "rgbww"].includes($)), p = this.config.color_picker_type !== "wheel", _ = i && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && p) && c && (!a || o), b = i && this.config.show_color_picker === !0 && !p && c && (!n || o), s = u || _ || b, m = this._getSubButtons();
    this._cachedHasCollapsible = s || m.length > 0;
  }
  connectedCallback() {
    super.connectedCallback(), this._mountTime = Date.now(), this._pointerDownReceived = !1, this._setupRelativeTimer(), this._setupIntersectionObserver();
  }
  _setupIntersectionObserver() {
    typeof IntersectionObserver > "u" || this._intersectionObserver || (this._intersectionObserver = new IntersectionObserver((t) => {
      for (const e of t)
        e.isIntersecting ? this.removeAttribute("offscreen") : this.setAttribute("offscreen", "");
    }, { rootMargin: "200px 0px", threshold: 0 }), this._intersectionObserver.observe(this));
  }
  _setupRelativeTimer() {
    const t = this.config?.primary_info, e = this.config?.secondary_info, i = this.config?.entity, o = i ? i.split(".")[0] : "", r = (o === "binary_sensor" || o === "timer") && (t === "state" || e === "state"), n = this.config?.fade_transition_enabled === !0, a = i && this.hass ? this.hass.states[i] : null;
    let d = !1;
    if (n && a) {
      const g = this._computeMultiStageFade(a);
      d = g.enabled && g.activeFade && g.progressPct < 100;
    }
    const u = d || r || t === "last-changed" || t === "last_changed" || t === "last-updated" || t === "last_updated" || t === "last-triggered" || e === "last-changed" || e === "last_changed" || e === "last-updated" || e === "last_updated" || e === "last-triggered";
    if (u && !this._relativeTimer) {
      let g = d ? 1e3 : 5e3;
      const c = a?.attributes?.last_triggered || a?.last_changed || a?.last_updated;
      if (c && !d && !r) {
        const p = this._parseDate(c);
        if (p) {
          const _ = Math.max(0, (Date.now() - p.getTime()) / 1e3 | 0);
          _ > 3600 ? g = 6e4 : _ > 60 && (g = 15e3);
        }
      }
      this._relativeTimer = setInterval(() => {
        if (!this.hasAttribute("offscreen") && this.style.display !== "none") {
          if (d && !this._isFadeActive()) {
            this._setupRelativeTimer();
            return;
          }
          this.requestUpdate();
        }
      }, g);
    } else !u && this._relativeTimer && (clearInterval(this._relativeTimer), this._relativeTimer = null);
  }
  _isFadeActive() {
    const t = this.config?.entity;
    if (!t || !this.hass) return !1;
    const e = this.hass.states[t];
    if (!e) return !1;
    const i = this._computeMultiStageFade(e);
    return i.enabled && i.activeFade && i.progressPct < 100;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._throttleMap.clear(), this._subTapTimerMap.forEach((t) => clearTimeout(t)), this._subTapTimerMap.clear(), this._intersectionObserver && (this._intersectionObserver.disconnect(), this._intersectionObserver = null), this._relativeTimer && (clearInterval(this._relativeTimer), this._relativeTimer = null), this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null), this._tapTimer && (clearTimeout(this._tapTimer), this._tapTimer = null), this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
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
    const o = i.state === "on" || this._isEntityActive(i);
    let r = !1;
    (t === "on" && !o || t === "off" && o) && (r = !0), this._toggleDisplay(r);
  }
  _isEntityActive(t) {
    return t ? co.has(t.state) : !1;
  }
  _calculateMultiStageFade(t, e, i) {
    if (!this.config?.fade_transition_enabled || !t)
      return et;
    const o = this._isEntityActive(t), r = this.config.fade_trigger ?? "on_inactive";
    if (!(r === "on_inactive" && !o || r === "on_active" && o || r === "both"))
      return et;
    const a = o ? this._resolveColor(this.config.inactive_color) || i || "#4caf50" : this._resolveColor(this.config.active_color) || e || "#d60000", d = o ? this._resolveColor(this.config.active_color) || e || "#d60000" : this._resolveColor(this.config.inactive_color) || i || "#03b100", u = D(a) || [214, 0, 0], g = D(d) || [3, 177, 0], c = this._fadeStaticConfig, p = c?.d1 ?? (Number(this.config.fade_stage_1_duration) || 60), _ = c?.d2 ?? (Number(this.config.fade_stage_2_duration) || 600), b = c?.d3 ?? (Number(this.config.fade_stage_3_duration) || 1800), s = c?.totalDuration ?? p + _ + b;
    if (s <= 0)
      return et;
    this._lastTrackedState !== null && this._lastTrackedState !== t.state && this._currentLiveRgb && this.config.fade_smooth_retrigger !== !1 && (this._previousLiveRgb = this._currentLiveRgb), this._lastTrackedState = t.state;
    const m = this.config.fade_stage_1_pickup !== !1 && this._previousLiveRgb && this.config.fade_smooth_retrigger !== !1 ? this._previousLiveRgb : u, $ = c?.c1Rgb ?? (D(this.config.fade_stage_1_color) || [255, 152, 0]), k = this.config.fade_stage_2_pickup !== !1 ? $ : u, f = c?.c2Rgb ?? (D(this.config.fade_stage_2_color) || [205, 220, 57]), v = this.config.fade_stage_3_pickup !== !1 ? f : $, S = c?.c3Rgb ?? (D(this.config.fade_stage_3_color) || g), l = this._parseDate(t.last_changed || t.last_updated);
    if (!l)
      return et;
    const h = Math.max(0, (Date.now() - l.getTime()) / 1e3);
    if (h >= s)
      return this._currentLiveRgb = S, this._previousLiveRgb = null, c?.restingResult ? c.restingResult : {
        enabled: !0,
        activeFade: !1,
        currentColor: xt(S),
        progressPct: 100,
        remainingSeconds: 0,
        currentStage: 0,
        stageLabel: "Resting"
      };
    let y, C = 1, M = 0;
    const F = Math.max(0, Math.round(s - h));
    h < p && p > 0 ? (C = 1, M = h / p, y = yt(m, $, M)) : h < p + _ && _ > 0 ? (C = 2, M = (h - p) / _, y = yt(k, f, M)) : b > 0 ? (C = 3, M = (h - p - _) / b, y = yt(v, S, M)) : (C = 0, y = S), this._currentLiveRgb = y;
    const fe = Math.min(100, Math.round(h / s * 100)), ge = xt(y);
    let q = "";
    return F >= 60 ? q = `${Math.ceil(F / 60)}m left` : q = `${F}s left`, {
      enabled: !0,
      activeFade: !0,
      currentColor: ge,
      progressPct: fe,
      remainingSeconds: F,
      currentStage: C,
      stageLabel: q
    };
  }
  _resolveColor(t) {
    return vo(t);
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
      const e = Date.parse(t);
      if (!isNaN(e))
        return new Date(e);
      let i = t.trim();
      i.includes(" ") && !i.includes("T") && (i = i.replace(" ", "T")), i.includes("T") && !i.endsWith("Z") && !/[+-]\d{2}:\d{2}$/.test(i) && !/[+-]\d{4}$/.test(i) && (i += "Z");
      const o = Number(i);
      let r;
      return !isNaN(o) && i !== "" && !i.includes("T") ? r = new Date(o > 1e11 ? o : o * 1e3) : r = new Date(i), isNaN(r.getTime()) ? null : r;
    }
    return null;
  }
  _formatTimeAgo(t, e = !1, i) {
    const o = this._parseDate(t);
    if (!o) return "";
    const r = Math.max(0, ((i ?? Date.now()) - o.getTime()) / 1e3 | 0);
    if (r < 5) return e ? "< 5s" : "just now";
    if (r < 60) return e ? `${r}s` : `${r} seconds ago`;
    const n = r / 60 | 0;
    if (n < 60) return e ? `${n}m` : `${n} ${n === 1 ? "minute" : "minutes"} ago`;
    const a = n / 60 | 0;
    if (a < 24) return `${a}h${e ? "" : " ago"}`;
    const d = a / 24 | 0;
    if (d < 7) return `${d}d${e ? "" : " ago"}`;
    const u = d / 7 | 0;
    if (u < 4) return `${u}w${e ? "" : " ago"}`;
    const g = d / 30 | 0;
    return g < 12 ? `${g}mo${e ? "" : " ago"}` : `${d / 365 | 0}y${e ? "" : " ago"}`;
  }
  _formatRelativeTime(t, e) {
    return this._formatTimeAgo(t, !1, e);
  }
  _formatForDuration(t, e) {
    return this._formatTimeAgo(t, !0, e);
  }
  _computeDynamicIcon(t) {
    if (!t) return;
    const e = (t.entity_id || "").split(".")[0], i = t.attributes?.device_class, o = t.state === "on";
    if (e === "lock")
      return t.state === "locked" ? "mdi:lock" : t.state === "jammed" ? "mdi:lock-alert" : t.state === "locking" || t.state === "unlocking" ? "mdi:lock-clock" : "mdi:lock-open-variant";
    if (e === "binary_sensor") {
      if (i === "door") return o ? "mdi:door-open" : "mdi:door-closed";
      if (i === "window") return o ? "mdi:window-open-variant" : "mdi:window-closed-variant";
      if (i === "garage_door") return o ? "mdi:garage-open" : "mdi:garage";
      if (i === "motion") return o ? "mdi:motion-sensor" : "mdi:motion-sensor-off";
      if (i === "occupancy") return o ? "mdi:home-account" : "mdi:home-outline";
      if (i === "presence") return o ? "mdi:account" : "mdi:account-outline";
      if (i === "opening") return o ? "mdi:lock-open" : "mdi:lock";
    }
    if (e === "light")
      return o ? "mdi:lightbulb" : "mdi:lightbulb-outline";
    if (e === "cover") {
      const r = t.state === "open" || t.state === "opening";
      return i === "garage" ? r ? "mdi:garage-open" : "mdi:garage" : i === "blind" || i === "shutter" ? r ? "mdi:window-shutter-open" : "mdi:window-shutter" : i === "curtain" ? r ? "mdi:curtains-open" : "mdi:curtains" : r ? "mdi:window-open" : "mdi:window-closed";
    }
    if (e === "fan")
      return o ? "mdi:fan" : "mdi:fan-off";
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
        const o = (e.entity_id || "").split(".")[0];
        if (o === "timer") {
          if (e.state === "paused")
            return `${e.attributes?.remaining || "Paused"} (Paused)`;
          if (e.state === "active" && e.attributes?.finishes_at) {
            const r = Date.parse(e.attributes.finishes_at);
            if (!isNaN(r)) {
              const n = Math.max(0, Math.round((r - Date.now()) / 1e3)), a = Math.floor(n / 60), d = n % 60, u = Math.floor(a / 60), g = (a % 60).toString().padStart(2, "0"), c = d.toString().padStart(2, "0");
              return u > 0 ? `${u}:${g}:${c}` : `${g}:${c}`;
            }
          }
        }
        if (o === "binary_sensor") {
          const r = e.attributes?.device_class;
          return r === "tamper" && e.state === "on" ? "⚠️ Tamper Detected" : r === "problem" && e.state === "on" ? "⚠️ Problem Detected" : r === "smoke" && e.state === "on" ? "🔥 Smoke Detected!" : r === "gas" && e.state === "on" ? "⚠️ Gas Detected!" : r === "moisture" && e.state === "on" ? "💧 Moisture Detected!" : this._formatForDuration(e.last_changed);
        }
        if (o === "vacuum") {
          const r = e.state;
          let n = r;
          r === "cleaning" ? n = "🧹 Cleaning" : r === "docked" ? n = "🏠 Docked" : r === "returning" ? n = "🔄 Returning" : r === "paused" ? n = "⏸️ Paused" : r === "error" && (n = "⚠️ Error");
          const a = e.attributes?.battery_level;
          return a !== void 0 ? `${n} • 🔋${a}%` : n;
        }
        if (o === "weather") {
          const r = e.attributes?.temperature, n = this.hass.config?.unit_system?.temperature || "°F", a = (e.state || "").replace(/-/g, " ");
          return r !== void 0 ? `${r}${n} • ${a}` : a;
        }
        if (o === "climate") {
          const r = e.state || "", n = e.attributes?.preset_mode, d = [e.attributes?.hvac_action, n].filter(Boolean).join(" • ");
          return d ? `${r} (${d})` : r;
        }
        if (o === "fan") {
          const r = e.attributes?.percentage, n = e.attributes?.oscillating ? "∿ Oscillating" : "", a = e.attributes?.direction === "reverse" ? "⟲ Reverse" : "";
          return [r !== void 0 ? `${r}%` : e.state, n, a].filter(Boolean).join(" • ");
        }
        if (o === "alarm_control_panel") {
          const r = e.state;
          if (r === "armed_home") return "🛡️ Armed Home";
          if (r === "armed_away") return "🛡️ Armed Away";
          if (r === "disarmed") return "Disarmed";
          if (r === "triggered") return "⚠️ TRIGGERED";
          if (r === "pending") return "⏳ Arming Pending...";
          if (r === "arming") return "⏳ Arming...";
        }
        if (o === "lock") {
          if (e.state === "locked") return "Locked";
          if (e.state === "unlocked") return "Unlocked";
          if (e.state === "jammed") return "Jammed (Alert!)";
          if (e.state === "locking") return "Locking...";
          if (e.state === "unlocking") return "Unlocking...";
        }
        if (o === "button" || o === "input_button")
          return "Press to run";
        if (o === "light" && e.state === "on") {
          const r = e.attributes?.brightness, n = r !== void 0 ? Math.round(r / 255 * 100) : 100;
          if (e.attributes?.color_temp_kelvin)
            return `${n}% • ${e.attributes.color_temp_kelvin}K`;
        }
        if (e.attributes?.device_class === "timestamp" || e.attributes?.device_class === "date" || typeof e.state == "string" && (e.state.includes("T") || e.state.match(/^\d{4}-\d{2}-\d{2}/)) && !isNaN(Date.parse(e.state))) {
          const r = this._formatRelativeTime(e.state);
          if (r) return r;
        }
        if (e.attributes?.display_precision !== void 0 && !isNaN(Number(e.state))) {
          const r = Number(e.attributes.display_precision), n = Number(e.state).toFixed(r), a = e.attributes?.unit_of_measurement ? ` ${e.attributes.unit_of_measurement}` : "";
          return `${n}${a}`;
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
            return r <= 20 ? n = "#f44336" : r <= 50 && (n = "#ff9800"), w`<span style="color: ${n}; font-weight: bold;">${r}%</span>`;
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
  _dispatchAction(t, e, i) {
    const o = i || this.config.entity, r = o ? o.split(".")[0] : "", n = _o.has(r);
    let a = e;
    if (a || (t === "double_tap" ? a = this.config.double_tap_action : t === "hold" ? a = this.config.hold_action || (n ? { action: "more-info" } : { action: "toggle" }) : this.config.tap_action && this.config.tap_action.action && this.config.tap_action.action !== "default" ? n && this.config.tap_action.action === "toggle" ? a = { action: "none" } : a = this.config.tap_action : a = n ? { action: "none" } : { action: "toggle" }), !(!a || a.action === "none")) {
      if (a.action === "more-info") {
        const d = a.entity || o;
        if (d) {
          this.dispatchEvent(new CustomEvent("hass-more-info", {
            detail: { entityId: d },
            bubbles: !0,
            composed: !0
          }));
          return;
        }
      }
      if (a.action === "toggle" && o) {
        if (n)
          return;
        const d = r === "lock" ? this._isEntityActive(this.hass?.states[o]) ? "lock" : "unlock" : "toggle", u = ["lock", "cover"].includes(r) ? r : r === "group" ? "homeassistant" : r;
        this.hass?.callService(u, d, { entity_id: o });
        return;
      }
      if (a.action === "navigate" && a.navigation_path) {
        history.pushState(null, "", a.navigation_path), window.dispatchEvent(new CustomEvent("location-changed", {
          detail: { replace: !1 },
          bubbles: !0,
          composed: !0
        }));
        return;
      }
      if (a.action === "url" && a.url_path) {
        window.open(a.url_path, "_blank");
        return;
      }
      if (a.action === "call-service" && a.service) {
        const [d, u] = a.service.split(".", 2);
        this.hass?.callService(d, u, a.data || a.service_data || {}, a.target);
        return;
      }
      n && (!a.action || a.action === "toggle") || Yi(this, this.hass, { ...this.config, entity: o }, t);
    }
  }
  _handleTap(t) {
    if (t.stopPropagation(), this._isSubElement(t)) return;
    if (Date.now() - this._mountTime < 1500 || Date.now() - ue < 800) {
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
      L("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap");
      return;
    }
    if (this._tapTimer) {
      clearTimeout(this._tapTimer), this._tapTimer = null, L("medium", this.config.haptic_feedback !== !1), i && this._hasCollapsible() && (this._collapsed = !this._collapsed), this._dispatchAction("double_tap");
      return;
    }
    this._tapTimer = setTimeout(() => {
      this._tapTimer = null, L("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap");
    }, 250);
  }
  _handleKeyDown(t) {
    this._isSubElement(t) || Date.now() - this._mountTime < 1500 || Date.now() - ue < 800 || (t.key === "Enter" || t.key === " ") && (t.preventDefault(), L("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap"));
  }
  _handleContextMenu(t) {
    if (t.preventDefault(), t.stopPropagation(), Date.now() - this._mountTime < 1500 || Date.now() - ue < 800 || this._held) return;
    L("medium", this.config.haptic_feedback !== !1), (this.config.collapse_controls_trigger || "hold") === "hold" && this._hasCollapsible() ? this._collapsed = !this._collapsed : this.config.hold_action && this.config.hold_action.action !== "none" && this._dispatchAction("hold");
  }
  _handlePointerDown(t) {
    this._isSubElement(t) || Date.now() - this._mountTime < 1500 || Date.now() - ue < 800 || this._activePointerId !== null && this._activePointerId !== t.pointerId || (this._activePointerId = t.pointerId, this._pointerDownReceived = !0, this._pointerDownTime = Date.now(), this._held = !1, this._moved = !1, this._canceled = !1, this._startX = t.clientX, this._startY = t.clientY, this._holdTimer = setTimeout(() => {
      if (this._moved || this._canceled) return;
      this._held = !0, this._holdTimer = null, this._tapTimer && (clearTimeout(this._tapTimer), this._tapTimer = null), L("heavy", this.config.haptic_feedback !== !1), (this.config.collapse_controls_trigger || "hold") === "hold" && this._hasCollapsible() ? this._collapsed = !this._collapsed : this.config.hold_action && this.config.hold_action.action !== "none" && this._dispatchAction("hold");
    }, 500));
  }
  _handlePointerMove(t) {
    if (this._isSubElement(t) || this._activePointerId !== null && this._activePointerId !== t.pointerId) return;
    const e = t.clientX - this._startX, i = t.clientY - this._startY, o = Math.hypot(e, i), r = Math.max(1, Date.now() - this._pointerDownTime), n = o / r;
    (o > 8 || n > 0.5) && (this._moved = !0, this._pointerDownReceived = !1, this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null));
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
      this._subMoved || this._subCanceled || (this._subHeld = !0, this._subHoldTimer = null, L("heavy", this.config.haptic_feedback !== !1), this._dispatchAction("hold", i || { action: "more-info" }, e));
    }, 500);
  }
  _handleSubPointerMove(t) {
    t.stopPropagation();
    const e = t.clientX - this._subStartX, i = t.clientY - this._subStartY, o = Math.hypot(e, i), r = Math.max(1, Date.now() - this._subPointerDownTime), n = o / r;
    (o > 8 || n > 0.5) && (this._subMoved = !0, this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null));
  }
  _handleSubPointerUp(t) {
    t.stopPropagation(), this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
  }
  _handleSubPointerCancel(t) {
    t.stopPropagation(), this._subCanceled = !0, this._subMoved = !0, this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
  }
  _handleSubTap(t, e, i, o, r) {
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
    const n = o && o.action !== "none", a = e || "sub_default", d = () => {
      L("light", this.config.haptic_feedback !== !1), i && i.action && i.action !== "none" && i.action !== "default" ? this._dispatchAction("tap", i, e) : r ? r() : this._dispatchAction("tap", { action: "toggle" }, e);
    };
    if (!n) {
      d();
      return;
    }
    const u = this._subTapTimerMap.get(a);
    if (u) {
      clearTimeout(u), this._subTapTimerMap.delete(a), L("medium", this.config.haptic_feedback !== !1), this._dispatchAction("double_tap", o, e);
      return;
    }
    const g = setTimeout(() => {
      this._subTapTimerMap.delete(a), d();
    }, 250);
    this._subTapTimerMap.set(a, g);
  }
  _handleSubContextMenu(t, e, i) {
    t.preventDefault(), t.stopPropagation(), !this._subHeld && (L("medium", this.config.haptic_feedback !== !1), this._dispatchAction("hold", i || { action: "more-info" }, e));
  }
  // --- THROTTLED SERVICE CALL HELPER ---
  _throttledCall(t, e, i = 100) {
    const o = this._throttleMap.get(t) ?? 0, r = Date.now();
    if (!(r - o < i)) {
      this._throttleMap.set(t, r);
      try {
        e();
      } finally {
        setTimeout(() => {
          this._throttleMap.get(t) === r && this._throttleMap.delete(t);
        }, i + 50);
      }
    }
  }
  _revertSlider(t, e) {
    t.value = String(e.initialVal), t.style.setProperty("--slider-pct", e.initialPct);
    const o = t.closest(".slider-container, .sub-button-slider-container")?.querySelector(".slider-percent-badge, .sub-slider-pct");
    o && (o.textContent = e.initialBadge);
  }
  _sliderInput(t, e, i, o, r, n, a) {
    t.stopPropagation();
    const d = t.target, u = this._sliderStateMap.get(d);
    if (u?.isScrolling) {
      this._revertSlider(d, u);
      return;
    }
    const g = Number(d.value), c = isNaN(g) ? 0 : g, p = n ? n(c) : c;
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
      const _ = d.closest(".slider-container, .sub-button-slider-container"), b = _?.querySelector(".slider-percent-badge, .sub-slider-pct");
      if (b && (b.textContent = a ? a(c, p) : `${p}%`), e === "color_hue" && _) {
        _.style.setProperty("--color-hue-val", `hsl(${c}, 100%, 50%)`);
        const s = _.querySelector(".color-chip-badge span");
        s && (s.style.background = `hsl(${c}, 100%, 50%)`);
      }
    }), L("selection", this.config.haptic_feedback !== !1);
  }
  _sliderChange(t, e, i, o) {
    t.stopPropagation();
    const r = t.target, n = this._sliderStateMap.get(r);
    if (n?.isScrolling) {
      this._revertSlider(r, n), n.isScrolling = !1;
      return;
    }
    const a = Number(r.value), d = isNaN(a) ? 0 : a;
    if (!(n && d === n.initialVal)) {
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
      this.hass.callService(e, i, { entity_id: this.config.entity, ...o(d) });
    }
  }
  _getLightLiveColor(t) {
    if (!t || !t.attributes || t.state !== "on") return null;
    const e = t.attributes;
    if (e.color_mode === "color_temp") {
      const o = e.color_temp_kelvin ?? (e.color_temp ? Math.round(1e6 / e.color_temp) : 3e3), [r, n, a] = R(o);
      return `rgb(${r}, ${n}, ${a})`;
    }
    if (Array.isArray(e.rgb_color) && e.rgb_color.length >= 3)
      return `rgb(${e.rgb_color[0]}, ${e.rgb_color[1]}, ${e.rgb_color[2]})`;
    if (Array.isArray(e.hs_color) && e.hs_color.length >= 2) {
      const [o, r, n] = vt(e.hs_color[0], e.hs_color[1]);
      return `rgb(${o}, ${r}, ${n})`;
    }
    if (Array.isArray(e.rgbw_color) && e.rgbw_color.length >= 3)
      return `rgb(${e.rgbw_color[0]}, ${e.rgbw_color[1]}, ${e.rgbw_color[2]})`;
    if (Array.isArray(e.rgbww_color) && e.rgbww_color.length >= 3)
      return `rgb(${e.rgbww_color[0]}, ${e.rgbww_color[1]}, ${e.rgbww_color[2]})`;
    if (e.color_temp_kelvin !== void 0 || e.color_temp !== void 0) {
      const o = e.color_temp_kelvin ?? Math.round(1e6 / e.color_temp), [r, n, a] = R(o);
      return `rgb(${r}, ${n}, ${a})`;
    }
    return t.state === "on" ? "var(--state-light-active-color, rgb(255, 205, 120))" : null;
  }
  _getLiveHex(t) {
    if (!t?.attributes || t.state !== "on") return "#ffffff";
    const e = t.attributes;
    if (Array.isArray(e.rgb_color) && e.rgb_color.length >= 3)
      return je(e.rgb_color);
    if (Array.isArray(e.hs_color) && e.hs_color.length >= 2)
      return je(vt(e.hs_color[0], e.hs_color[1]));
    if (e.color_temp_kelvin !== void 0 || e.color_temp !== void 0) {
      const r = e.color_temp_kelvin ?? Math.round(1e6 / e.color_temp);
      return je(R(r));
    }
    const i = this._getLightLiveColor(t);
    if (!i) return "#ffffff";
    const o = D(i);
    return o ? je(o) : "#ffffff";
  }
  _getLiveHue(t) {
    if (!t) return 0;
    if (Array.isArray(t.attributes?.hs_color) && t.attributes.hs_color.length >= 1)
      return Math.round(t.attributes.hs_color[0]) % 360;
    if (Array.isArray(t.attributes?.rgb_color) && t.attributes.rgb_color.length >= 3) {
      const [e, i, o] = t.attributes.rgb_color;
      return fo(e, i, o);
    }
    return 0;
  }
  _handleColorInput(t, e, i, o) {
    t.stopPropagation();
    const r = t.target.value;
    if (!r) return;
    const n = D(r);
    if (!n) return;
    const a = i || this.config.entity, d = () => {
      this.hass.callService("light", "turn_on", { entity_id: a, rgb_color: n });
    };
    e ? this._throttledCall(o || "color_picker", d) : d();
  }
  // --- RENDER ---
  render() {
    if (!this.config || !this.hass)
      return w``;
    const t = this.config.entity;
    if (!t)
      return w`
        <ha-card class="warning-card">
          <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
          <span>Please configure an entity in the visual editor.</span>
        </ha-card>
      `;
    const e = this.hass.states[t];
    if (!e)
      return w`
        <ha-card class="warning-card">
          <ha-icon icon="mdi:help-circle-outline"></ha-icon>
          <span>Entity not found: <code>${t}</code></span>
        </ha-card>
      `;
    const i = this.config.show_name !== !1 ? this._getInfoContent(this.config.primary_info, e) : "", o = this.config.show_state !== !1 ? this._getInfoContent(this.config.secondary_info, e) : "", r = this._isEntityActive(e), n = t.split(".")[0], a = this.config.icon_type ?? "icon", d = this.config.show_icon !== !1 && a !== "none", u = this._iconShapeClass, g = this._iconAnimClass;
    let c = "var(--primary-color)", p = null;
    n === "climate" ? e.state === "heat" ? c = "var(--state-climate-heat-color, #ff7043)" : e.state === "cool" ? c = "var(--state-climate-cool-color, #42a5f5)" : e.state === "dry" ? c = "var(--state-climate-dry-color, #ab47bc)" : e.state === "fan_only" && (c = "var(--state-climate-fan_only-color, #26a69a)") : n === "light" ? (p = this._getLightLiveColor(e), p && (c = p)) : (n === "binary_sensor" || n === "lock" || n === "switch") && (c = "#d60000");
    const _ = this.config.color_type === "card";
    let b = this._resolveColor(this.config.active_color);
    (!b || this.config.use_light_color) && (n === "light" && p ? b = p : b = c);
    let s = "var(--secondary-background-color, rgba(150, 150, 150, 0.2))";
    n === "light" ? s = "#000000" : (n === "binary_sensor" || n === "lock" || n === "switch") && (s = "#03b500");
    const m = this._resolveColor(this.config.inactive_color) || s, $ = _ ? "transparent" : r ? b : m, k = this.config.icon_color ? `color: ${this._resolveColor(this.config.icon_color)};` : _ && r ? "color: #ffffff; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.4));" : "", f = this._iconOpacityStyle, v = this._iconRotateStyle, S = this.config.show_slider !== !1, l = n === "light", h = n === "cover", y = n === "fan", C = n === "humidifier", M = n === "media_player", F = n === "number" || n === "input_number", fe = n === "climate", ge = this.config.hide_slider_when_off !== !1, q = this.config.hide_color_temp_when_off !== !1, Re = this.config.hide_color_picker_when_off !== !1, dt = this.config.hide_color_slider_when_off !== !1, me = e.attributes?.supported_color_modes;
    let He = e.attributes?.brightness !== void 0, Be = !1, be = !1;
    if (Array.isArray(me))
      for (let A = 0; A < me.length; A++) {
        const ke = me[A];
        ke !== "onoff" && (He = !0), ke === "color_temp" && (Be = !0), ho.has(ke) && (be = !0);
      }
    const ze = l && S && He && (!ge || r), ut = e.attributes?.color_temp_kelvin ?? e.attributes?.color_temp, Oe = l && this.config.show_color_temp === !0 && (ut !== void 0 || Be) && (!q || r), Ie = this.config.color_picker_type !== "wheel", Fe = l && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && Ie) && be && (!dt || r), Ue = l && this.config.show_color_picker === !0 && !Ie && be && (!Re || r), H = e.state !== "unavailable" && e.state !== "unknown", Ge = h && H && S && e.attributes?.current_position !== void 0, ve = y && H && r && S && e.attributes?.percentage !== void 0, ye = C && H && r && S && (e.attributes?.humidity !== void 0 || e.attributes?.target_humidity !== void 0), X = M && H && r && S && e.attributes?.volume_level !== void 0, xe = F && H && S, we = fe && H && r && S && (e.attributes?.temperature !== void 0 || e.attributes?.target_temp_high !== void 0), ht = (this.config.bg_opacity ?? 10) / 100, _t = this.config.slider_color ? `--slider-color: ${this._resolveColor(this.config.slider_color)};` : _ && r && !this.config.use_light_color ? "--slider-color: rgba(255, 255, 255, 0.95);" : `--slider-color: ${b};`, ne = this.config.slider_track_color ? `--slider-track-color: ${this._resolveColor(this.config.slider_track_color)};` : _ && r ? "--slider-track-color: rgba(0, 0, 0, 0.25);" : "", P = this._calculateMultiStageFade(e, c, m), U = this.config.fade_target ?? "card", Ve = this._resolveColor(this.config.bg_color);
    let B;
    P.activeFade && (U === "card" || U === "all" || _) ? B = P.currentColor : _ ? n === "light" ? B = r ? p || b : this.config.inactive_color ? m : "#000000" : B = r ? b : m : Ve ? B = Ve : n === "light" && !r ? B = "#000000" : B = `rgba(150, 150, 150, ${ht})`;
    let $e = $;
    P.activeFade && (U === "icon" || U === "all") && ($e = _ ? "transparent" : P.currentColor);
    let ae = this._resolveColor(this.config.active_color) || (n === "light" && p ? p : b) || "var(--primary-color)";
    P.activeFade && (U === "all" || this.config.active_glow === !0) && (ae = P.currentColor);
    let K = "";
    this.config.box_shadow === "soft" && (K = "box-shadow: 0 4px 10px rgba(0,0,0,0.1);"), this.config.box_shadow === "deep" && (K = "box-shadow: 0 10px 20px rgba(0,0,0,0.3);"), (this.config.box_shadow === "glow" || this.config.active_glow === !0) && (K = r || P.activeFade ? `box-shadow: 0 0 22px ${ae}, 0 0 45px rgba(255, 255, 255, 0.18);` : "");
    const We = this.config.active_glow === !0 || this.config.box_shadow === "glow" ? "card-active-glow" : "", N = e?.attributes?.device_class, Ye = n === "binary_sensor" && (N === "motion" || N === "occupancy" || N === "presence"), qe = n === "binary_sensor" && (N === "door" || N === "window" || N === "garage_door" || N === "opening"), Xe = Ye && (r || P.activeFade && P.currentStage === 1) ? "motion-active" : "", Ke = qe && r ? "door-open" : "", Ze = n === "climate" && e?.attributes?.hvac_action ? `hvac-${e.attributes.hvac_action}` : "", pt = n === "cover" ? e?.state === "opening" ? "cover-opening" : e?.state === "closing" ? "cover-closing" : "" : "", ft = `${this._staticCardClasses} ${We} ${Xe} ${Ke} ${Ze} ${pt}`, se = this._getSubButtons();
    this.config.font_weight_primary;
    let z = "";
    this.config.text_color_mode === "active_accent" && r ? z += `--primary-text-color: ${b}; ` : this.config.text_color_primary ? z += `--primary-text-color: ${this._resolveColor(this.config.text_color_primary)}; ` : _ && r && (z += "--primary-text-color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.4); "), this.config.text_color_secondary ? z += `--secondary-text-color: ${this._resolveColor(this.config.text_color_secondary)}; ` : _ && r && (z += "--secondary-text-color: rgba(255, 255, 255, 0.9); text-shadow: 0 1px 2px rgba(0,0,0,0.3); ");
    const G = this.config.features_position === "inline", V = this._iconSize, Se = this._iconContainerSize, T = this.config.text_scrolling_primary || "none", Z = this.config.text_scrolling_secondary || "none", W = w`
      ${ze ? this._renderLightSlider(e) : x}
      ${Ge ? this._renderCoverSlider(e) : x}
      ${ve ? this._renderFanSlider(e) : x}
      ${ye ? this._renderHumidifierSlider(e) : x}
      ${X ? this._renderMediaSlider(e) : x}
      ${xe ? this._renderNumberSlider(e) : x}
      ${we ? this._renderClimateSlider(e) : x}
    `, J = w`
      ${Oe ? this._renderColorTempSlider(e) : x}
      ${Fe ? this._renderColorSlider(e) : x}
      ${Ue ? this._renderColorPicker(e) : x}
    `, le = ze || Ge || ve || ye || X || xe || we, O = Oe || Fe || Ue, gt = !G && O || se.length > 0, Q = this.config.decay_slider_position ?? "bottom";
    return w`
      ${this.config.custom_styles ? w`<style>${this.config.custom_styles}</style>` : x}
      <ha-card 
        class="${ft}" 
        ?active=${r}
        style="${this._staticCardStyles} background: ${B}; ${K} ${_t} ${ne} ${z} --ag-glow-color: ${ae}; --ag-active-color: ${b};"
        @click=${this._handleTap}
        @keydown=${this._handleKeyDown}
        @contextmenu=${this._handleContextMenu}
        @pointerdown=${this._handlePointerDown}
        @pointermove=${this._handlePointerMove}
        @pointerup=${this._handlePointerUp}
        @pointercancel=${this._handlePointerCancel}
      >
        <div class="card-content ${G ? "features-inline" : ""}" style="justify-content: var(--ag-content-alignment);">
          ${Q === "top" ? this._renderDecaySlider(P) : x}

          <div class="info-container">
            ${d ? w`
              <div class="icon-container ${u} ${g} ${this.config.active_pulse && r ? "pulse" : ""} ${(this.config.active_glow || this.config.box_shadow === "glow") && (r || P.activeFade) ? "glow" : ""}" 
                   style="${this._iconOffsetStyle} ${k} ${f} background-color: ${$e}; width: ${Se}px; height: ${Se}px; --mdc-icon-size: ${V}px; ${H ? "" : "opacity: 0.5; pointer-events: none;"}" 
                   ?active=${r}>
                ${a === "entity-picture" && e.attributes.entity_picture ? w`<img class="entity-picture ${u}" src="${e.attributes.entity_picture}" style="width: ${V}px; height: ${V}px; ${v}" />` : w`<ha-state-icon
                      .hass=${this.hass}
                      .stateObj=${e}
                      .icon=${this.config.icon || this._computeDynamicIcon(e)}
                      style="--mdc-icon-size: ${V}px; width: ${V}px; height: ${V}px; ${v}"
                    ></ha-state-icon>`}
                ${this.config.badge_icon ? w`
                  <div class="badge" style="background: ${this._resolveColor(this.config.badge_color) || b};">
                    <ha-icon .icon=${this.config.badge_icon}></ha-icon>
                  </div>
                ` : x}
              </div>
            ` : x}
            <div class="info" style="${this._textOffsetStyle} ${this._textBoxWidth} text-align: var(--ag-text-alignment);">
              ${i ? w`
                <div class="text-marquee-container scroll-${T}" style="${this._primaryTextOffsetStyle}">
                  <span class="primary scroll-content" style="${this._primaryTextStyle}">${i}</span>
                </div>` : x}
              ${o ? w`
                <div class="text-marquee-container scroll-${Z}" style="${this._secondaryTextOffsetStyle}">
                  <span class="secondary scroll-content" style="${this._secondaryTextStyle}">${o}</span>
                </div>` : x}
            </div>
            ${Q === "inline" ? w`<div class="inline-sliders">${this._renderDecaySlider(P)}</div>` : x}
            ${G && le ? w`<div class="inline-sliders" style="${this._mainSliderMarginOffsets}">${W}</div>` : x}
            ${G && O ? w`<div class="inline-sliders ${this._collapsed ? "collapsed" : ""}">${J}</div>` : x}
          </div>
          
          ${Q === "bottom" ? this._renderDecaySlider(P) : x}
          ${!G && le ? w`<div class="features-container" style="${this._featuresOffsetStyle} ${this._mainSliderMarginOffsets}">${W}</div>` : x}

          ${gt ? w`
            <div class="collapsible-wrapper ${this._collapsed ? "collapsed" : ""}">
              ${!G && O ? w`<div class="features-container" style="${this._featuresOffsetStyle}">${J}</div>` : x}

              ${se.length > 0 ? w`
                <div class="sub-buttons-container">
                  ${Oi(
      se,
      (A) => A.key,
      (A) => this._renderSubButton(A.entity || "", A.icon, A.color, A.bg !== !1, A.name, A.tapAction, A.holdAction, A.type, A.doubleTapAction, A.showState)
    )}
                </div>
              ` : x}
            </div>
          ` : x}

        </div>
      </ha-card>
    `;
  }
  // --- DECAY / COOLDOWN SLIDER COMPONENT ---
  _renderDecaySlider(t) {
    if (!this.config.show_decay_slider || !t.enabled || !t.activeFade)
      return x;
    const e = this.config.slider_style === "google", i = this.config.decay_slider_height ?? (e ? 32 : 10), o = this.config.slider_border_radius ?? (e ? 16 : 5), r = Math.max(0, 100 - t.progressPct);
    return w`
      <div class="decay-slider-container" style="--decay-color: ${t.currentColor}; --decay-pct: ${r}%;">
        <div class="decay-slider-track" style="height: ${i}px; border-radius: ${o}px;">
          <div class="decay-slider-fill" style="background: ${t.currentColor}; border-radius: ${o}px;"></div>
          <span class="decay-slider-badge">${t.stageLabel}</span>
        </div>
      </div>
    `;
  }
  // --- GENERIC SLIDER COMPONENT HELPER ---
  _renderGenericSlider(t, e, i, o, r, n, a, d, u, g, c, p, _ = "", b = "", s) {
    const m = this.config.slider_style === "google", $ = m && this.config.show_slider_percent !== !1 || this.config.show_slider_percent === !0, k = p ? p(n, a) : `${a}%`, f = s !== void 0 ? s : k, v = this.config.slider_stepped_movement === !1 ? "any" : r, S = t !== "color_temp" && t !== "color_hue", l = this.config.slider_style === "full", h = S && l ? "main-slider-full" : "";
    let y = "";
    if (S && l) {
      const C = Number(this.config.slider_start_offset) || 0, M = Number(this.config.slider_end_offset) || 0;
      y = `left: ${C}px !important; right: ${M}px !important; width: calc(100% - ${C + M}px) !important;`;
    } else t === "color_temp" ? y = this._colorTempMarginOffsets : t === "color_hue" ? y = this._colorHueMarginOffsets : y = this._mainSliderMarginOffsets;
    return w`
      <div class="slider-container ${_} ${h} ${m ? "slider-google-wrap" : ""}" style="${y} ${b}">
        <input type="range" min=${i} max=${o} step=${v} .value=${n}
               aria-label="${e}"
               style="--slider-pct: ${a}%;"
               @pointerdown=${this._onSliderPointerDown}
               @pointermove=${this._onSliderPointerMove}
               @pointerup=${this._onSliderPointerUp}
               @pointercancel=${this._onSliderPointerCancel}
               @input=${(C) => this._sliderInput(C, t, d, u, g, c, p)}
               @change=${(C) => this._sliderChange(C, d, u, g)} />
        ${$ && f ? w`<span class="slider-percent-badge">${f}</span>` : x}
      </div>
    `;
  }
  // --- MULTI-DOMAIN SLIDER RENDERERS ---
  _renderLightSlider(t) {
    const e = this._isEntityActive(t), i = t.attributes.brightness ?? 0, o = Math.max(0, Math.min(100, Math.round(i / 255 * 100))), r = this._getLightLiveColor(t), n = (this.config.use_light_color !== !1 || !this.config.slider_color) && r ? `--slider-color: ${r};` : "";
    return this._renderGenericSlider(
      "brightness",
      "Brightness",
      0,
      255,
      1,
      i,
      o,
      "light",
      "turn_on",
      (a) => ({ brightness: a }),
      (a) => Math.round(a / 255 * 100),
      (a, d) => !e || d <= 0 ? "" : `${d}%`,
      "",
      n
    );
  }
  _renderColorTempSlider(t) {
    const e = this.config.color_temp_type || "gradient", i = t.attributes.color_temp_kelvin !== void 0 || t.attributes.min_color_temp_kelvin !== void 0 || t.attributes.max_color_temp_kelvin !== void 0, o = i ? t.attributes.min_color_temp_kelvin || 2e3 : t.attributes.min_mireds || 153, r = i ? t.attributes.max_color_temp_kelvin || 6500 : t.attributes.max_mireds || 500, n = i ? t.attributes.color_temp_kelvin || 3e3 : t.attributes.color_temp || 300, a = r - o, d = a > 0 ? Math.max(0, Math.min(100, Math.round((n - o) / a * 100))) : 0, u = i ? "color_temp_kelvin" : "color_temp", g = e === "google" || e === "gradient" && this.config.slider_style === "google", c = g ? 42 : e === "thin" ? 6 : 12, p = g ? 21 : e === "thin" ? 3 : 6, _ = this.config.color_temp_height !== void 0 ? this.config.color_temp_height : this.config.slider_height ?? c, b = this.config.color_temp_border_radius !== void 0 ? this.config.color_temp_border_radius : this.config.slider_border_radius ?? p, s = i ? `${n} K` : `${n} mireds`;
    if (e === "presets") {
      const m = Number(this.config.color_temp_start_offset) || 0, $ = Number(this.config.color_temp_end_offset) || 0, k = [
        m ? `margin-left: ${m}px;` : "",
        $ ? `margin-right: ${$}px;` : ""
      ].filter(Boolean).join(" ");
      return w`
        <div class="presets-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${k}">
          ${go.map((f) => {
        const [v, S, l] = f.rgb, h = Math.abs(n - f.k) < 200, y = () => {
          L("light", this.config.haptic_feedback !== !1), this.hass?.callService("light", "turn_on", { entity_id: this.config.entity, [u]: f.k });
        };
        return w`
              <button 
                type="button"
                role="button"
                aria-label="Color temperature preset: ${f.label}"
                tabindex="0"
                class="temp-preset-chip"
                style="flex: 1; min-width: 48px; height: ${_}px; border-radius: ${b}px; border: ${h ? "2px solid #ffffff" : "1px solid rgba(150, 150, 150, 0.3)"}; background: rgba(${v}, ${S}, ${l}, 0.2); color: var(--primary-text-color); font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; box-shadow: ${h ? "0 0 8px rgba(" + v + "," + S + "," + l + ", 0.8)" : "none"};"
                @keydown=${(C) => {
          (C.key === "Enter" || C.key === " ") && (C.preventDefault(), C.stopPropagation(), y());
        }}
                @click=${(C) => {
          C.stopPropagation(), y();
        }}>
                <span style="width: 8px; height: 8px; border-radius: 50%; background: rgb(${v}, ${S}, ${l}); display: inline-block;"></span>
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
      o,
      r,
      1,
      n,
      d,
      "light",
      "turn_on",
      (m) => ({ [u]: m }),
      (m) => a > 0 ? Math.round((m - o) / a * 100) : 0,
      (m) => i ? `${m} K` : `${m} mireds`,
      `color-temp ${i ? "kelvin" : "mireds"} ${g ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${_}px; --ag-slider-radius: ${b}px;`,
      s
    );
  }
  _renderColorSlider(t) {
    const e = this.config.color_picker_type || "slider";
    if (e === "wheel")
      return this._renderColorPicker(t);
    if (e === "swatches") {
      const p = this._getLiveHex(t).toLowerCase(), _ = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : 32, b = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : 8, s = Number(this.config.color_slider_start_offset) || 0, m = Number(this.config.color_slider_end_offset) || 0, $ = [
        s ? `margin-left: ${s}px;` : "",
        m ? `margin-right: ${m}px;` : ""
      ].filter(Boolean).join(" ");
      return w`
        <div class="swatches-palette-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${$}">
          ${$t.map((k) => {
        const f = p === k.hex.toLowerCase(), v = () => {
          L("light", this.config.haptic_feedback !== !1), this.hass?.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: k.rgb });
        };
        return w`
              <button 
                type="button"
                role="button"
                aria-label="Color preset: ${k.label}"
                tabindex="0"
                class="color-swatch-chip"
                title="${k.label}"
                style="flex: 1; min-width: 28px; height: ${_}px; border-radius: ${b}px; background: ${k.hex}; border: ${f ? "2px solid #ffffff" : "1px solid rgba(0,0,0,0.2)"}; cursor: pointer; box-shadow: ${f ? "0 0 10px " + k.hex : "0 1px 3px rgba(0,0,0,0.3)"}; transition: transform 0.15s ease;"
                @keydown=${(S) => {
          (S.key === "Enter" || S.key === " ") && (S.preventDefault(), S.stopPropagation(), v());
        }}
                @click=${(S) => {
          S.stopPropagation(), v();
        }}>
              </button>
            `;
      })}
        </div>
      `;
    }
    const i = this._getLiveHue(t), o = Math.max(0, Math.min(100, Math.round(i / 360 * 100))), r = e === "google" || this.config.slider_style === "google", n = r ? 42 : 12, a = r ? 21 : 6, d = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : this.config.slider_height ?? n, u = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : this.config.slider_border_radius ?? a, g = `hsl(${i}, 100%, 50%)`, c = w`
      <span class="color-chip-badge" style="display: flex; align-items: center; gap: 6px;">
        <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background: ${g}; border: 1.5px solid #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.4);"></span>
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
      o,
      "light",
      "turn_on",
      (p) => {
        const [_, b, s] = vt(p, 100);
        return { rgb_color: [_, b, s] };
      },
      (p) => Math.round(p / 360 * 100),
      (p) => `${p}°`,
      `color-hue ${r ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${d}px; --ag-slider-radius: ${u}px; --color-hue-val: ${g};`,
      c
    );
  }
  _renderColorPicker(t) {
    const e = this._getLiveHex(t), i = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : this.config.slider_height ?? 36, o = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : this.config.slider_border_radius ?? 8;
    return w`
      <div class="color-picker" title="Adjust Light Color" style="height: ${i}px; border-radius: ${o}px;">
        <input type="color" 
               .value=${e} 
               @input=${(r) => this._handleColorInput(r, !0)}
               @change=${(r) => this._handleColorInput(r, !1)} />
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
      (i, o) => `${o}%`
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
      (o) => {
        const r = i > 1 ? Math.round(o / i) * i : o;
        return { percentage: Math.min(100, Math.max(0, r)) };
      },
      (o) => o,
      (o, r) => `${r}%`
    );
  }
  _renderMediaSlider(t) {
    const e = t.attributes.is_volume_muted === !0, i = e ? 0 : Math.round((t.attributes.volume_level ?? 0) * 100), o = e ? "Muted (0%)" : void 0;
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
      (r) => ({ volume_level: r / 100 }),
      (r) => r,
      (r, n) => e ? "Muted" : `${n}%`,
      "media",
      "",
      o
    );
  }
  _renderNumberSlider(t) {
    const e = Number(t.attributes.min ?? 0);
    let i = Number(t.attributes.max ?? 100);
    e >= i && (i = e + 100);
    const o = Number(t.attributes.step ?? 1), r = Number(t.state), n = isNaN(r) ? e : r, a = i - e, d = a > 0 ? Math.max(0, Math.min(100, Math.round((n - e) / a * 100))) : 0, u = (this.config.entity || "number").split(".")[0], g = t.attributes.unit_of_measurement ? ` ${t.attributes.unit_of_measurement}` : "", c = o.toString(), p = c.includes(".") ? c.split(".")[1].length : 0;
    return this._renderGenericSlider(
      "number",
      "Value",
      e,
      i,
      o,
      n,
      d,
      u,
      "set_value",
      (_) => ({ value: p > 0 ? Number(_.toFixed(p)) : Math.round(_) }),
      (_) => a > 0 ? Math.round((_ - e) / a * 100) : 0,
      (_) => `${p > 0 ? Number(_).toFixed(p) : Math.round(Number(_))}${g}`
    );
  }
  _renderClimateSlider(t) {
    const e = this.hass.config?.unit_system?.temperature === "°F" || this.hass.config?.unit_system?.temperature === "F", i = e ? "°F" : "°C", o = e ? 60 : 16, r = e ? 85 : 30, n = t.attributes.min_temp ?? o, a = t.attributes.max_temp ?? r, d = t.attributes.target_temp_step ?? t.attributes.target_temperature_step ?? (e ? 1 : 0.5), u = t.attributes.target_temp_low !== void 0 && t.attributes.target_temp_high !== void 0, g = t.attributes.temperature ?? t.attributes.target_temp_low ?? t.attributes.target_temp_high ?? n, c = a - n, p = c > 0 ? Math.max(0, Math.min(100, Math.round((g - n) / c * 100))) : 0;
    return this._renderGenericSlider(
      "climate",
      "Temperature",
      n,
      a,
      d,
      g,
      p,
      "climate",
      "set_temperature",
      (_) => u ? { target_temp_low: _, target_temp_high: Math.min(a, _ + (e ? 4 : 2)) } : { temperature: _ },
      (_) => c > 0 ? Math.round((_ - n) / c * 100) : 0,
      (_) => `${_}${i}`,
      "climate-temp",
      "",
      `${g}${i}`
    );
  }
  _renderHumidifierSlider(t) {
    const e = t.attributes?.min_humidity ?? 0, i = t.attributes?.max_humidity ?? 100, o = t.attributes?.humidity ?? t.attributes?.target_humidity ?? e, r = i - e, n = r > 0 ? Math.max(0, Math.min(100, Math.round((o - e) / r * 100))) : 0;
    return this._renderGenericSlider(
      "humidifier",
      "Humidity",
      e,
      i,
      1,
      o,
      n,
      "humidifier",
      "set_humidity",
      (a) => ({ humidity: a }),
      (a) => r > 0 ? Math.round((a - e) / r * 100) : 0,
      (a, d) => `${d}%`
    );
  }
  // --- EXTRACTED SUB-BUTTON RENDERERS ---
  _renderSubSlider(t, e, i, o, r) {
    const n = e || this.hass.states[this.config.entity || ""], a = t || this.config.entity || "", d = n?.attributes?.volume_level !== void 0 || n?.entity_id?.startsWith("media_player."), u = n?.attributes?.percentage !== void 0 || n?.entity_id?.startsWith("fan."), g = n?.attributes?.current_position !== void 0 || n?.entity_id?.startsWith("cover.");
    let c = 0, p = 0, _ = 255, b = "1", s = "turn_on", m = "light", $ = "brightness";
    d ? (c = n?.attributes?.volume_level ?? 0, _ = 1, b = "0.01", s = "set_volume_level", m = "media_player", $ = "volume_level") : u ? (c = n?.attributes?.percentage ?? 0, _ = 100, b = "1", s = "set_percentage", m = "fan", $ = "percentage") : g ? (c = n?.attributes?.current_position ?? 0, _ = 100, b = "1", s = "set_cover_position", m = "cover", $ = "position") : c = n?.attributes?.brightness ?? 0;
    const k = Math.round(_ === 1 ? c * 100 : _ === 100 ? c : c / 255 * 100);
    return i === "slider" ? w`
        <div class="sub-button-slider-container ${r}" style="${o}" title="Level: ${k}%">
          <input type="range" 
                 min="${p}" 
                 max=${_} 
                 step=${b} 
                 .value=${c}
                 @pointerdown=${(f) => f.stopPropagation()}
                 @input=${(f) => {
      f.stopPropagation();
      const v = parseFloat(f.target.value), S = Math.round(_ === 1 ? v * 100 : _ === 100 ? v : v / 255 * 100), l = f.target.closest(".sub-button-slider-container");
      l && l.setAttribute("title", `Level: ${S}%`), this._throttledCall("sub_slider_" + a, () => {
        this.hass?.callService(m, s, { entity_id: a, [$]: v });
      });
    }}
                 @change=${(f) => {
      f.stopPropagation();
      const v = parseFloat(f.target.value);
      this.hass?.callService(m, s, { entity_id: a, [$]: v });
    }} />
        </div>
      ` : w`
        <div class="sub-button-google-slider ${r}" style="${o} --slider-pct: ${k}%;" title="Level: ${k}%">
          <input type="range" 
                 min="${p}" 
                 max=${_} 
                 step=${b} 
                 .value=${c}
                 style="--slider-pct: ${k}%;"
                 @pointerdown=${(f) => f.stopPropagation()}
                 @input=${(f) => {
      f.stopPropagation();
      const v = parseFloat(f.target.value), S = Math.round(_ === 1 ? v * 100 : _ === 100 ? v : v / 255 * 100), l = f.target;
      requestAnimationFrame(() => {
        l.style.setProperty("--slider-pct", `${S}%`);
        const h = l.closest(".sub-button-google-slider");
        if (h) {
          h.style.setProperty("--slider-pct", `${S}%`), h.setAttribute("title", `Level: ${S}%`);
          const y = h.querySelector(".sub-slider-pct");
          y && (y.textContent = `${S}%`);
        }
      }), this._throttledCall("sub_slider_" + a, () => {
        this.hass?.callService(m, s, { entity_id: a, [$]: v });
      });
    }}
                 @change=${(f) => {
      f.stopPropagation();
      const v = parseFloat(f.target.value);
      this.hass?.callService(m, s, { entity_id: a, [$]: v });
    }} />
          <span class="sub-slider-pct">${k}%</span>
        </div>
      `;
  }
  _renderSubColorPicker(t, e, i, o, r, n) {
    const a = e || this.hass.states[this.config.entity || ""], d = this._getLiveHex(a);
    return w`
      <div class="sub-button sub-color-picker ${o}" 
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
        ${r ? w`<span class="sub-button-label" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${r}</span>` : x}
        ${n ? w`<span class="sub-button-state" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${n}</span>` : x}
      </div>
    `;
  }
  _renderSubButton(t, e, i, o = !0, r, n, a, d = "button", u, g = !1) {
    const c = t ? this.hass?.states[t] : this.hass?.states[this.config.entity || ""], p = this._isEntityActive(c);
    if (d === "slider" || d === "google_slider") {
      const l = i ? `--primary-color: ${i}; --slider-color: ${i};` : "", h = o ? "" : "no-bg";
      return this._renderSubSlider(t, c, d, l, h);
    }
    let _;
    g && c && (_ = this._getInfoContent("state", c));
    const b = (t || this.config.entity || "").split(".")[0];
    if (d === "color_picker" && (b === "light" || !t && this.config.entity?.startsWith("light."))) {
      const l = i ? `color: ${i};` : "", h = o ? "" : "no-bg";
      return this._renderSubColorPicker(t, c, l, h, r, _);
    }
    let s = e, m = "", $ = p, k = "", f = r, v;
    if (n && n.action && n.action !== "none" && n.action !== "default")
      s || (s = c?.attributes?.icon || "mdi:checkbox-blank-circle");
    else
      switch (d) {
        case "play_pause": {
          const l = c?.state === "playing";
          $ = l, s || (s = l ? "mdi:pause" : "mdi:play"), m = l ? "Pause" : "Play", v = () => {
            this.hass?.callService("media_player", "media_play_pause", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "next": {
          s || (s = "mdi:skip-next"), m = "Next Track", v = () => {
            this.hass?.callService("media_player", "media_next_track", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "previous": {
          s || (s = "mdi:skip-previous"), m = "Previous Track", v = () => {
            this.hass?.callService("media_player", "media_previous_track", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "vol_up": {
          s || (s = "mdi:volume-plus"), m = "Volume +5%", f || (f = "+5%"), v = () => {
            this.hass?.callService("media_player", "volume_up", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "vol_down": {
          s || (s = "mdi:volume-minus"), m = "Volume -5%", f || (f = "-5%"), v = () => {
            this.hass?.callService("media_player", "volume_down", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "mute": {
          const l = c?.attributes?.is_volume_muted === !0;
          $ = l, s || (s = l ? "mdi:volume-off" : "mdi:volume-high"), m = l ? "Unmute" : "Mute", v = () => {
            this.hass?.callService("media_player", "volume_mute", { entity_id: t || this.config.entity, is_volume_muted: !l });
          };
          break;
        }
        case "source": {
          const l = c?.attributes?.source || "", h = c?.attributes?.source_list || [], y = h.length > 0 ? h[(h.indexOf(l) + 1) % h.length] || h[0] : l;
          s || (s = "mdi:import"), m = `Source: ${l} -> ${y}`, f || (f = l || "Source"), v = () => {
            y && this.hass?.callService("media_player", "select_source", { entity_id: t || this.config.entity, source: y });
          };
          break;
        }
        case "sound_mode": {
          const l = c?.attributes?.sound_mode || "", h = c?.attributes?.sound_mode_list || [], y = h.length > 0 ? h[(h.indexOf(l) + 1) % h.length] || h[0] : l;
          s || (s = "mdi:surround-sound"), m = `Sound: ${l} -> ${y}`, f || (f = l || "Sound"), v = () => {
            y && this.hass?.callService("media_player", "select_sound_mode", { entity_id: t || this.config.entity, sound_mode: y });
          };
          break;
        }
        case "open_close": {
          const l = c?.state === "open" || c?.state === "on" || c?.attributes?.current_position !== void 0 && c.attributes.current_position > 0;
          $ = l;
          const h = c?.attributes?.device_class;
          s || (h === "garage" || h === "garage_door" ? s = l ? "mdi:garage-open" : "mdi:garage" : h === "blind" || h === "shade" ? s = l ? "mdi:blinds-open" : "mdi:blinds" : h === "curtain" ? s = l ? "mdi:curtains-open" : "mdi:curtains" : h === "damper" ? s = l ? "mdi:circle-slice-8" : "mdi:circle-outline" : s = l ? "mdi:window-shutter-open" : "mdi:window-shutter"), m = l ? "Close" : "Open", v = () => {
            this.hass?.callService("cover", "toggle", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "stop": {
          s || (s = "mdi:stop"), m = "Stop", v = () => {
            this.hass?.callService("cover", "stop_cover", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "open_tilt": {
          s || (s = "mdi:arrow-top-right-bottom-left"), m = "Open Tilt", v = () => {
            this.hass?.callService("cover", "open_cover_tilt", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "close_tilt": {
          s || (s = "mdi:arrow-bottom-left-top-right"), m = "Close Tilt", v = () => {
            this.hass?.callService("cover", "close_cover_tilt", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "stop_tilt": {
          s || (s = "mdi:stop"), m = "Stop Tilt", v = () => {
            this.hass?.callService("cover", "stop_cover_tilt", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "lock_unlock": {
          const l = c?.state === "locked", h = c?.state === "jammed";
          $ = !l, h && (k = "lock-jammed"), s || (s = h ? "mdi:lock-alert" : l ? "mdi:lock" : "mdi:lock-open-variant"), m = h ? "Jammed (Alert!)" : l ? "Unlock" : "Lock", v = () => {
            this.hass?.callService("lock", l ? "unlock" : "lock", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "fan_speed": {
          const l = c?.attributes?.percentage ?? 0;
          s || (s = "mdi:fan"), p && (k = "anim-spin"), m = `Speed: ${l}%`, f || (f = l > 0 ? `${l}%` : "Off"), v = () => {
            let h = 33;
            l >= 90 ? h = 0 : l >= 60 ? h = 100 : l >= 30 && (h = 66), this.hass?.callService("fan", "set_percentage", { entity_id: t || this.config.entity, percentage: h });
          };
          break;
        }
        case "fan_mode": {
          const l = c?.attributes?.fan_mode || "auto", h = c?.attributes?.fan_modes || ["auto", "low", "medium", "high"], y = h[(h.indexOf(l) + 1) % h.length] || "auto";
          s || (s = "mdi:fan"), m = `Fan Mode: ${l} -> ${y}`, f || (f = l), v = () => {
            this.hass?.callService("climate", "set_fan_mode", { entity_id: t || this.config.entity, fan_mode: y });
          };
          break;
        }
        case "swing_mode": {
          const l = c?.attributes?.swing_mode || "off", h = c?.attributes?.swing_modes || ["off", "vertical", "horizontal", "both"], y = h[(h.indexOf(l) + 1) % h.length] || "off";
          s || (s = "mdi:arrow-split-horizontal"), m = `Swing: ${l} -> ${y}`, f || (f = l), v = () => {
            this.hass?.callService("climate", "set_swing_mode", { entity_id: t || this.config.entity, swing_mode: y });
          };
          break;
        }
        case "climate_preset": {
          const l = c?.attributes?.preset_mode || "none", h = c?.attributes?.preset_modes || ["eco", "comfort", "boost", "away", "sleep", "none"], y = h[(h.indexOf(l) + 1) % h.length] || "none";
          s || (l === "eco" ? s = "mdi:leaf" : l === "boost" ? s = "mdi:rocket-launch" : l === "away" ? s = "mdi:home-export-outline" : l === "sleep" ? s = "mdi:bed" : s = "mdi:thermostat"), m = `Preset: ${l} -> ${y}`, f || (f = l), v = () => {
            this.hass?.callService("climate", "set_preset_mode", { entity_id: t || this.config.entity, preset_mode: y });
          };
          break;
        }
        case "clean": {
          const l = c?.state === "cleaning";
          $ = l, s || (s = l ? "mdi:pause" : "mdi:robot-vacuum"), m = l ? "Pause Vacuum" : "Start Vacuum", v = () => {
            this.hass?.callService("vacuum", l ? "pause" : "start", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "dock": {
          s || (s = "mdi:home-import-outline"), m = "Return to Dock", v = () => {
            this.hass?.callService("vacuum", "return_to_base", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "locate": {
          s || (s = "mdi:map-marker-question-outline"), m = "Locate", v = () => {
            this.hass?.callService("vacuum", "locate", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "vacuum_fan_speed": {
          const l = c?.attributes?.fan_speed || "standard", h = c?.attributes?.fan_speed_list || ["quiet", "standard", "strong", "turbo"], y = h[(h.indexOf(l) + 1) % h.length] || "standard";
          s || (s = "mdi:fan"), m = `Suction: ${l} -> ${y}`, f || (f = l), v = () => {
            this.hass?.callService("vacuum", "set_fan_speed", { entity_id: t || this.config.entity, fan_speed: y });
          };
          break;
        }
        case "counter_inc": {
          s || (s = "mdi:plus-box"), m = "Increment Counter (+1)", f || (f = "+1"), v = () => {
            this.hass?.callService("counter", "increment", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "counter_dec": {
          s || (s = "mdi:minus-box"), m = "Decrement Counter (-1)", f || (f = "-1"), v = () => {
            this.hass?.callService("counter", "decrement", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "hvac_mode": {
          const l = c?.state || "off", h = c?.attributes?.hvac_modes || ["off", "heat", "cool", "auto"], y = h[(h.indexOf(l) + 1) % h.length] || "auto";
          $ = l !== "off", s || (l === "heat" ? s = "mdi:fire" : l === "cool" ? s = "mdi:snowflake" : l === "dry" ? s = "mdi:water-percent" : l === "fan_only" ? s = "mdi:fan" : l === "auto" ? s = "mdi:thermostat-auto" : s = "mdi:power"), m = `Mode: ${l} -> Next: ${y}`, f || (f = l), v = () => {
            this.hass?.callService("climate", "set_hvac_mode", { entity_id: t || this.config.entity, hvac_mode: y });
          };
          break;
        }
        case "light_effect": {
          const l = c?.attributes?.effect_list || [], h = c?.attributes?.effect || "None", y = l.length > 0 ? l[(l.indexOf(h) + 1) % l.length] || l[0] : "None";
          s || (s = "mdi:creation"), $ = h !== "None" && h !== "off" && p, m = `Effect: ${h} -> Next: ${y}`, f || (f = h !== "None" ? h : "Effect"), v = () => {
            l.length > 0 && this.hass?.callService("light", "turn_on", { entity_id: t || this.config.entity, effect: y });
          };
          break;
        }
        case "brightness": {
          const l = c?.attributes?.brightness, h = l !== void 0 ? Math.round(l / 255 * 100) : 0;
          s || (s = "mdi:brightness-6"), m = `Brightness: ${h}%`, f || (f = `${h}%`), v = () => {
            let y = 25;
            h >= 85 ? y = 0 : h >= 60 ? y = 100 : h >= 35 ? y = 75 : h >= 10 && (y = 50), y === 0 ? this.hass?.callService("light", "turn_off", { entity_id: t || this.config.entity }) : this.hass?.callService("light", "turn_on", { entity_id: t || this.config.entity, brightness_pct: y });
          };
          break;
        }
        case "garage_toggle": {
          const l = c?.state === "open" || c?.state === "opening";
          $ = l, s || (s = l ? "mdi:garage-open" : "mdi:garage"), m = l ? "Close Garage" : "Open Garage", v = () => {
            this.hass?.callService("cover", "toggle", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "dim_up": {
          const l = (t || this.config.entity || "").split(".")[0];
          if (l === "number" || l === "input_number") {
            const h = Number(c?.state) || 0, y = Number(c?.attributes?.step) || 1, C = Number(c?.attributes?.max) || 100, M = Math.min(C, h + y);
            s || (s = "mdi:plus-circle-outline"), m = `Value +${y}`, f || (f = `+${y}`), v = () => {
              this.hass?.callService(l, "set_value", { entity_id: t || this.config.entity, value: M });
            };
          } else {
            const h = c?.attributes?.brightness ?? 0, y = Math.min(255, h + 26);
            s || (s = "mdi:brightness-5"), m = "Brightness +10%", f || (f = "+10%"), v = () => {
              this.hass?.callService("light", "turn_on", { entity_id: t || this.config.entity, brightness: y });
            };
          }
          break;
        }
        case "dim_down": {
          const l = (t || this.config.entity || "").split(".")[0];
          if (l === "number" || l === "input_number") {
            const h = Number(c?.state) || 0, y = Number(c?.attributes?.step) || 1, C = Number(c?.attributes?.min) || 0, M = Math.max(C, h - y);
            s || (s = "mdi:minus-circle-outline"), m = `Value -${y}`, f || (f = `-${y}`), v = () => {
              this.hass?.callService(l, "set_value", { entity_id: t || this.config.entity, value: M });
            };
          } else {
            const h = c?.attributes?.brightness ?? 0, y = Math.max(1, h - 26);
            s || (s = "mdi:brightness-4"), m = "Brightness -10%", f || (f = "-10%"), v = () => {
              this.hass?.callService("light", "turn_on", { entity_id: t || this.config.entity, brightness: y });
            };
          }
          break;
        }
        case "humidity_up": {
          const l = Number(c?.attributes?.humidity ?? c?.attributes?.target_humidity ?? 50), h = Math.min(100, l + 5);
          s || (s = "mdi:water-plus"), m = `Humidity +5% (${h}%)`, f || (f = "+5%"), v = () => {
            this.hass?.callService("humidifier", "set_humidity", { entity_id: t || this.config.entity, humidity: h });
          };
          break;
        }
        case "humidity_down": {
          const l = Number(c?.attributes?.humidity ?? c?.attributes?.target_humidity ?? 50), h = Math.max(0, l - 5);
          s || (s = "mdi:water-minus"), m = `Humidity -5% (${h}%)`, f || (f = "-5%"), v = () => {
            this.hass?.callService("humidifier", "set_humidity", { entity_id: t || this.config.entity, humidity: h });
          };
          break;
        }
        case "input_select": {
          const l = c?.state || "", h = c?.attributes?.options || [], y = h.length > 0 ? h[(h.indexOf(l) + 1) % h.length] || h[0] : l;
          s || (s = "mdi:form-dropdown"), m = `Option: ${l} -> Next: ${y}`, f || (f = l), v = () => {
            const C = (t || this.config.entity || "").split(".")[0] === "select" ? "select" : "input_select";
            this.hass?.callService(C, "select_next", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "temp_warm": {
          s || (s = "mdi:weather-sunny"), m = "Warm White (2700K)", f || (f = "2700K"), v = () => {
            this.hass?.callService("light", "turn_on", { entity_id: t || this.config.entity, color_temp_kelvin: 2700 });
          };
          break;
        }
        case "temp_cool": {
          s || (s = "mdi:weather-sunset-up"), m = "Cool Daylight (6000K)", f || (f = "6000K"), v = () => {
            this.hass?.callService("light", "turn_on", { entity_id: t || this.config.entity, color_temp_kelvin: 6e3 });
          };
          break;
        }
        case "color_temp": {
          s || (s = "mdi:palette-swatch-outline"), m = "Color Temperature", f || (f = "Temp"), v = () => {
            const l = c?.attributes?.color_temp_kelvin || 3e3;
            let h = 2700;
            l < 3300 ? h = 4e3 : l < 5e3 ? h = 6e3 : h = 2700, this.hass?.callService("light", "turn_on", { entity_id: t || this.config.entity, color_temp_kelvin: h });
          };
          break;
        }
        case "button":
        default: {
          s || (s = c?.attributes?.icon || "mdi:checkbox-blank-circle"), m = r || (c?.attributes?.friendly_name ?? "");
          break;
        }
      }
    const S = (l) => {
      this._handleSubTap(l, t, n, u, v);
    };
    return w`
      <div 
        tabindex="0"
        data-ag-sub
        class="sub-button ${bgClass}" 
        ?active=${$} 
        style="${colorStyle} ${$ && dynamicSubColor && o ? `background: ${dynamicSubColor}; color: #fff;` : ""}"
        title="${m}"
        @click=${S}
        @dblclick=${(l) => l.stopPropagation()}
        @keydown=${(l) => {
      (l.key === "Enter" || l.key === " ") && (l.preventDefault(), l.stopPropagation(), S(l));
    }}
        @pointerdown=${(l) => this._handleSubPointerDown(l, t, a)}
        @pointermove=${this._handleSubPointerMove}
        @pointerup=${this._handleSubPointerUp}
        @pointercancel=${this._handleSubPointerCancel}
        @contextmenu=${(l) => this._handleSubContextMenu(l, t, a)}>
        <ha-icon .icon=${s} class="${k}"></ha-icon>
        ${f ? w`<span class="sub-button-label">${f}</span>` : x}
        ${_ ? w`<span class="sub-button-state">${_}</span>` : x}
      </div>
    `;
  }
  // --- STATIC STYLES ---
  static get styles() {
    return jt`
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
      }
      .color-temp-chips::-webkit-scrollbar,
      .color-swatch-chips::-webkit-scrollbar,
      .sub-buttons-container::-webkit-scrollbar {
        display: none;
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
re([
  at({ attribute: !1 })
], I.prototype, "hass", 2);
re([
  at({ type: Boolean })
], I.prototype, "preview", 2);
re([
  st()
], I.prototype, "config", 2);
re([
  st()
], I.prototype, "_collapsed", 2);
re([
  ri({ passive: !0 })
], I.prototype, "_handlePointerMove", 1);
re([
  ri({ passive: !0 })
], I.prototype, "_handleSubPointerMove", 1);
I = re([
  Mi("antigravity-with-icon-card")
], I);
customElements.get("antigravity-with-icon-card") || customElements.define("antigravity-with-icon-card", I);
export {
  I as AntigravityWithIconCard,
  lo as CARD_VERSION
};
