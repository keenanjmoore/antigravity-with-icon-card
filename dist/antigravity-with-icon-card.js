const ot = globalThis, Tt = ot.ShadowRoot && (ot.ShadyCSS === void 0 || ot.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, At = Symbol(), Ht = /* @__PURE__ */ new WeakMap();
let ii = class {
  constructor(e, i, o) {
    if (this._$cssResult$ = !0, o !== At) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (Tt && e === void 0) {
      const o = i !== void 0 && i.length === 1;
      o && (e = Ht.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), o && Ht.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const hi = (t) => new ii(typeof t == "string" ? t : t + "", void 0, At), oi = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((o, r, n) => o + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + t[n + 1], t[0]);
  return new ii(i, t, At);
}, _i = (t, e) => {
  if (Tt) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const o = document.createElement("style"), r = ot.litNonce;
    r !== void 0 && o.setAttribute("nonce", r), o.textContent = i.cssText, t.appendChild(o);
  }
}, Bt = Tt ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const o of e.cssRules) i += o.cssText;
  return hi(i);
})(t) : t;
const { is: pi, defineProperty: fi, getOwnPropertyDescriptor: gi, getOwnPropertyNames: mi, getOwnPropertySymbols: bi, getPrototypeOf: vi } = Object, st = globalThis, zt = st.trustedTypes, yi = zt ? zt.emptyScript : "", xi = st.reactiveElementPolyfillSupport, Le = (t, e) => t, rt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? yi : null;
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
} }, Mt = (t, e) => !pi(t, e), Ot = { attribute: !0, type: String, converter: rt, reflect: !1, useDefault: !1, hasChanged: Mt };
Symbol.metadata ??= Symbol("metadata"), st.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let pe = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Ot) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const o = Symbol(), r = this.getPropertyDescriptor(e, o, i);
      r !== void 0 && fi(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, i, o) {
    const { get: r, set: n } = gi(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? Ot;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Le("elementProperties"))) return;
    const e = vi(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Le("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Le("properties"))) {
      const i = this.properties, o = [...mi(i), ...bi(i)];
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
      for (const r of o) i.unshift(Bt(r));
    } else e !== void 0 && i.push(Bt(e));
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
    return _i(e, this.constructor.elementStyles), e;
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
      const n = (o.converter?.toAttribute !== void 0 ? o.converter : rt).toAttribute(i, o.type);
      this._$Em = e, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const o = this.constructor, r = o._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const n = o.getPropertyOptions(r), a = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : rt;
      this._$Em = r;
      const d = a.fromAttribute(i, n.type);
      this[r] = d ?? this._$Ej?.get(r) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, i, o, r = !1, n) {
    if (e !== void 0) {
      const a = this.constructor;
      if (r === !1 && (n = this[e]), o ??= a.getPropertyOptions(e), !((o.hasChanged ?? Mt)(n, i) || o.useDefault && o.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, o)))) return;
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
pe.elementStyles = [], pe.shadowRootOptions = { mode: "open" }, pe[Le("elementProperties")] = /* @__PURE__ */ new Map(), pe[Le("finalized")] = /* @__PURE__ */ new Map(), xi?.({ ReactiveElement: pe }), (st.reactiveElementVersions ??= []).push("2.1.2");
const Pt = globalThis, Ft = (t) => t, nt = Pt.trustedTypes, It = nt ? nt.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, ri = "$lit$", K = `lit$${Math.random().toFixed(9).slice(2)}$`, ni = "?" + K, wi = `<${ni}>`, ae = document, Ne = () => ae.createComment(""), De = (t) => t === null || typeof t != "object" && typeof t != "function", Et = Array.isArray, Si = (t) => Et(t) || typeof t?.[Symbol.iterator] == "function", yt = `[ 	
\f\r]`, Ae = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ut = /-->/g, Gt = />/g, ie = RegExp(`>|${yt}(?:([^\\s"'>=/]+)(${yt}*=${yt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Vt = /'/g, Wt = /"/g, ai = /^(?:script|style|textarea|title)$/i, $i = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), k = $i(1), se = Symbol.for("lit-noChange"), S = Symbol.for("lit-nothing"), Yt = /* @__PURE__ */ new WeakMap(), re = ae.createTreeWalker(ae, 129);
function si(t, e) {
  if (!Et(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return It !== void 0 ? It.createHTML(e) : e;
}
const ki = (t, e) => {
  const i = t.length - 1, o = [];
  let r, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = Ae;
  for (let d = 0; d < i; d++) {
    const u = t[d];
    let m, l, _ = -1, p = 0;
    for (; p < u.length && (a.lastIndex = p, l = a.exec(u), l !== null); ) p = a.lastIndex, a === Ae ? l[1] === "!--" ? a = Ut : l[1] !== void 0 ? a = Gt : l[2] !== void 0 ? (ai.test(l[2]) && (r = RegExp("</" + l[2], "g")), a = ie) : l[3] !== void 0 && (a = ie) : a === ie ? l[0] === ">" ? (a = r ?? Ae, _ = -1) : l[1] === void 0 ? _ = -2 : (_ = a.lastIndex - l[2].length, m = l[1], a = l[3] === void 0 ? ie : l[3] === '"' ? Wt : Vt) : a === Wt || a === Vt ? a = ie : a === Ut || a === Gt ? a = Ae : (a = ie, r = void 0);
    const v = a === ie && t[d + 1].startsWith("/>") ? " " : "";
    n += a === Ae ? u + wi : _ >= 0 ? (o.push(m), u.slice(0, _) + ri + u.slice(_) + K + v) : u + K + (_ === -2 ? d : v);
  }
  return [si(t, n + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), o];
};
class Re {
  constructor({ strings: e, _$litType$: i }, o) {
    let r;
    this.parts = [];
    let n = 0, a = 0;
    const d = e.length - 1, u = this.parts, [m, l] = ki(e, i);
    if (this.el = Re.createElement(m, o), re.currentNode = this.el.content, i === 2 || i === 3) {
      const _ = this.el.content.firstChild;
      _.replaceWith(..._.childNodes);
    }
    for (; (r = re.nextNode()) !== null && u.length < d; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const _ of r.getAttributeNames()) if (_.endsWith(ri)) {
          const p = l[a++], v = r.getAttribute(_).split(K), y = /([.?@])?(.*)/.exec(p);
          u.push({ type: 1, index: n, name: y[2], strings: v, ctor: y[1] === "." ? Ti : y[1] === "?" ? Ai : y[1] === "@" ? Mi : lt }), r.removeAttribute(_);
        } else _.startsWith(K) && (u.push({ type: 6, index: n }), r.removeAttribute(_));
        if (ai.test(r.tagName)) {
          const _ = r.textContent.split(K), p = _.length - 1;
          if (p > 0) {
            r.textContent = nt ? nt.emptyScript : "";
            for (let v = 0; v < p; v++) r.append(_[v], Ne()), re.nextNode(), u.push({ type: 2, index: ++n });
            r.append(_[p], Ne());
          }
        }
      } else if (r.nodeType === 8) if (r.data === ni) u.push({ type: 2, index: n });
      else {
        let _ = -1;
        for (; (_ = r.data.indexOf(K, _ + 1)) !== -1; ) u.push({ type: 7, index: n }), _ += K.length - 1;
      }
      n++;
    }
  }
  static createElement(e, i) {
    const o = ae.createElement("template");
    return o.innerHTML = e, o;
  }
}
function me(t, e, i = t, o) {
  if (e === se) return e;
  let r = o !== void 0 ? i._$Co?.[o] : i._$Cl;
  const n = De(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(t), r._$AT(t, i, o)), o !== void 0 ? (i._$Co ??= [])[o] = r : i._$Cl = r), r !== void 0 && (e = me(t, r._$AS(t, e.values), r, o)), e;
}
class Ci {
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
    const { el: { content: i }, parts: o } = this._$AD, r = (e?.creationScope ?? ae).importNode(i, !0);
    re.currentNode = r;
    let n = re.nextNode(), a = 0, d = 0, u = o[0];
    for (; u !== void 0; ) {
      if (a === u.index) {
        let m;
        u.type === 2 ? m = new be(n, n.nextSibling, this, e) : u.type === 1 ? m = new u.ctor(n, u.name, u.strings, this, e) : u.type === 6 && (m = new Pi(n, this, e)), this._$AV.push(m), u = o[++d];
      }
      a !== u?.index && (n = re.nextNode(), a++);
    }
    return re.currentNode = ae, r;
  }
  p(e) {
    let i = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(e, o, i), i += o.strings.length - 2) : o._$AI(e[i])), i++;
  }
}
class be {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, o, r) {
    this.type = 2, this._$AH = S, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = o, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    e = me(this, e, i), De(e) ? e === S || e == null || e === "" ? (this._$AH !== S && this._$AR(), this._$AH = S) : e !== this._$AH && e !== se && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Si(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== S && De(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ae.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: o } = e, r = typeof o == "number" ? this._$AC(e) : (o.el === void 0 && (o.el = Re.createElement(si(o.h, o.h[0]), this.options)), o);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const n = new Ci(r, this), a = n.u(this.options);
      n.p(i), this.T(a), this._$AH = n;
    }
  }
  _$AC(e) {
    let i = Yt.get(e.strings);
    return i === void 0 && Yt.set(e.strings, i = new Re(e)), i;
  }
  k(e) {
    Et(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let o, r = 0;
    for (const n of e) r === i.length ? i.push(o = new be(this.O(Ne()), this.O(Ne()), this, this.options)) : o = i[r], o._$AI(n), r++;
    r < i.length && (this._$AR(o && o._$AB.nextSibling, r), i.length = r);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const o = Ft(e).nextSibling;
      Ft(e).remove(), e = o;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class lt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, o, r, n) {
    this.type = 1, this._$AH = S, this._$AN = void 0, this.element = e, this.name = i, this._$AM = r, this.options = n, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = S;
  }
  _$AI(e, i = this, o, r) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) e = me(this, e, i, 0), a = !De(e) || e !== this._$AH && e !== se, a && (this._$AH = e);
    else {
      const d = e;
      let u, m;
      for (e = n[0], u = 0; u < n.length - 1; u++) m = me(this, d[o + u], i, u), m === se && (m = this._$AH[u]), a ||= !De(m) || m !== this._$AH[u], m === S ? e = S : e !== S && (e += (m ?? "") + n[u + 1]), this._$AH[u] = m;
    }
    a && !r && this.j(e);
  }
  j(e) {
    e === S ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ti extends lt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === S ? void 0 : e;
  }
}
class Ai extends lt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== S);
  }
}
class Mi extends lt {
  constructor(e, i, o, r, n) {
    super(e, i, o, r, n), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = me(this, e, i, 0) ?? S) === se) return;
    const o = this._$AH, r = e === S && o !== S || e.capture !== o.capture || e.once !== o.once || e.passive !== o.passive, n = e !== S && (o === S || r);
    r && this.element.removeEventListener(this.name, this, o), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
let Pi = class {
  constructor(e, i, o) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    me(this, e);
  }
};
const Ei = { I: be }, Li = Pt.litHtmlPolyfillSupport;
Li?.(Re, be), (Pt.litHtmlVersions ??= []).push("3.3.3");
const Ni = (t, e, i) => {
  const o = i?.renderBefore ?? e;
  let r = o._$litPart$;
  if (r === void 0) {
    const n = i?.renderBefore ?? null;
    o._$litPart$ = r = new be(e.insertBefore(Ne(), n), n, void 0, i ?? {});
  }
  return r._$AI(t), r;
};
const Lt = globalThis;
let ge = class extends pe {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ni(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return se;
  }
};
ge._$litElement$ = !0, ge.finalized = !0, Lt.litElementHydrateSupport?.({ LitElement: ge });
const Di = Lt.litElementPolyfillSupport;
Di?.({ LitElement: ge });
(Lt.litElementVersions ??= []).push("4.2.2");
const Ri = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
const Hi = { attribute: !0, type: String, converter: rt, reflect: !1, hasChanged: Mt }, Bi = (t = Hi, e, i) => {
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
function ct(t) {
  return (e, i) => typeof i == "object" ? Bi(t, e, i) : ((o, r, n) => {
    const a = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, o), a ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(t, e, i);
}
function dt(t) {
  return ct({ ...t, state: !0, attribute: !1 });
}
function li(t) {
  return (e, i) => {
    const o = typeof e == "function" ? e : e[i];
    Object.assign(o, t);
  };
}
const zi = { CHILD: 2 }, Oi = (t) => (...e) => ({ _$litDirective$: t, values: e });
let Fi = class {
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
const { I: Ii } = Ei, Xt = (t) => t, qt = () => document.createComment(""), Me = (t, e, i) => {
  const o = t._$AA.parentNode, r = e === void 0 ? t._$AB : e._$AA;
  if (i === void 0) {
    const n = o.insertBefore(qt(), r), a = o.insertBefore(qt(), r);
    i = new Ii(n, a, t, t.options);
  } else {
    const n = i._$AB.nextSibling, a = i._$AM, d = a !== t;
    if (d) {
      let u;
      i._$AQ?.(t), i._$AM = t, i._$AP !== void 0 && (u = t._$AU) !== a._$AU && i._$AP(u);
    }
    if (n !== r || d) {
      let u = i._$AA;
      for (; u !== n; ) {
        const m = Xt(u).nextSibling;
        Xt(o).insertBefore(u, r), u = m;
      }
    }
  }
  return i;
}, oe = (t, e, i = t) => (t._$AI(e, i), t), Ui = {}, Gi = (t, e = Ui) => t._$AH = e, Vi = (t) => t._$AH, xt = (t) => {
  t._$AR(), t._$AA.remove();
};
const Kt = (t, e, i) => {
  const o = /* @__PURE__ */ new Map();
  for (let r = e; r <= i; r++) o.set(t[r], r);
  return o;
}, Wi = Oi(class extends Fi {
  constructor(t) {
    if (super(t), t.type !== zi.CHILD) throw Error("repeat() can only be used in text expressions");
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
    const r = Vi(t), { values: n, keys: a } = this.dt(e, i, o);
    if (!Array.isArray(r)) return this.ut = a, n;
    const d = this.ut ??= [], u = [];
    let m, l, _ = 0, p = r.length - 1, v = 0, y = n.length - 1;
    for (; _ <= p && v <= y; ) if (r[_] === null) _++;
    else if (r[p] === null) p--;
    else if (d[_] === a[v]) u[v] = oe(r[_], n[v]), _++, v++;
    else if (d[p] === a[y]) u[y] = oe(r[p], n[y]), p--, y--;
    else if (d[_] === a[y]) u[y] = oe(r[_], n[y]), Me(t, u[y + 1], r[_]), _++, y--;
    else if (d[p] === a[v]) u[v] = oe(r[p], n[v]), Me(t, r[_], r[p]), p--, v++;
    else if (m === void 0 && (m = Kt(a, v, y), l = Kt(d, _, p)), m.has(d[_])) if (m.has(d[p])) {
      const w = l.get(a[v]), T = w !== void 0 ? r[w] : null;
      if (T === null) {
        const c = Me(t, r[_]);
        oe(c, n[v]), u[v] = c;
      } else u[v] = oe(T, n[v]), Me(t, r[_], T), r[w] = null;
      v++;
    } else xt(r[p]), p--;
    else xt(r[_]), _++;
    for (; v <= y; ) {
      const w = Me(t, u[y + 1]);
      oe(w, n[v]), u[v++] = w;
    }
    for (; _ <= p; ) {
      const w = r[_++];
      w !== null && xt(w);
    }
    return this.ut = a, Gi(t, u), se;
  }
});
var Jt, Zt;
(function(t) {
  t.language = "language", t.system = "system", t.comma_decimal = "comma_decimal", t.decimal_comma = "decimal_comma", t.space_comma = "space_comma", t.none = "none";
})(Jt || (Jt = {})), function(t) {
  t.language = "language", t.system = "system", t.am_pm = "12", t.twenty_four = "24";
}(Zt || (Zt = {}));
function Yi(t) {
  return t.substr(0, t.indexOf("."));
}
var Xi = ["closed", "locked", "off"], He = function(t, e, i, o) {
  o = o || {}, i = i ?? {};
  var r = new Event(e, { bubbles: o.bubbles === void 0 || o.bubbles, cancelable: !!o.cancelable, composed: o.composed === void 0 || o.composed });
  return r.detail = i, t.dispatchEvent(r), r;
}, Ee = function(t) {
  He(window, "haptic", t);
}, qi = function(t, e, i) {
  i === void 0 && (i = !1), i ? history.replaceState(null, "", e) : history.pushState(null, "", e), He(window, "location-changed", { replace: i });
}, Ki = function(t, e, i) {
  i === void 0 && (i = !0);
  var o, r = Yi(e), n = r === "group" ? "homeassistant" : r;
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
}, Ji = function(t, e) {
  var i = Xi.includes(t.states[e].state);
  return Ki(t, e, i);
}, Zi = function(t, e, i, o) {
  if (o || (o = { action: "more-info" }), !o.confirmation || o.confirmation.exemptions && o.confirmation.exemptions.some(function(n) {
    return n.user === e.user.id;
  }) || (Ee("warning"), confirm(o.confirmation.text || "Are you sure you want to " + o.action + "?"))) switch (o.action) {
    case "more-info":
      (i.entity || i.camera_image) && He(t, "hass-more-info", { entityId: i.entity ? i.entity : i.camera_image });
      break;
    case "navigate":
      o.navigation_path && qi(0, o.navigation_path);
      break;
    case "url":
      o.url_path && window.open(o.url_path);
      break;
    case "toggle":
      i.entity && (Ji(e, i.entity), Ee("success"));
      break;
    case "call-service":
      if (!o.service) return void Ee("failure");
      var r = o.service.split(".", 2);
      e.callService(r[0], r[1], o.service_data, o.target), Ee("success");
      break;
    case "fire-dom-event":
      He(t, "ll-custom", o);
  }
}, Qi = function(t, e, i, o) {
  var r;
  o === "double_tap" && i.double_tap_action ? r = i.double_tap_action : o === "hold" && i.hold_action ? r = i.hold_action : o === "tap" && i.tap_action && (r = i.tap_action), Zi(t, e, i, r);
};
const kt = {
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
class ji {
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
const at = new ji();
class eo {
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
const ne = new eo(), to = {
  preserveDrawingBuffer: !1,
  powerPreference: "low-power",
  alpha: !0,
  antialias: !1,
  depth: !1,
  stencil: !1
};
function io(t, e = to) {
  try {
    const i = t.getContext("webgl2", e) || t.getContext("webgl", e) || t.getContext("experimental-webgl", e);
    return i ? (i.getExtension("ANGLE_instanced_arrays"), i.getExtension("EXT_color_buffer_half_float"), i.getExtension("OES_texture_half_float"), t.addEventListener("webglcontextlost", (o) => {
      o.preventDefault(), console.warn("Antigravity WebGL context lost");
    }, { passive: !1 }), t.addEventListener("webglcontextrestored", () => {
      console.info("Antigravity WebGL context restored");
    }, { passive: !0 }), i) : null;
  } catch (i) {
    return console.warn("WebGL init failed:", i), null;
  }
}
function ci(t) {
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
async function di() {
  const t = performance.now();
  let e = 0, i = 0;
  const o = (y, w) => {
    i++, y ? e++ : console.error(`❌ Assertion failed: ${w}`);
  }, r = at.getMemorySnapshot();
  o(r.activeCardsCount >= 0, "Memory tracker active card count is non-negative");
  let n = !1;
  if (typeof document < "u") {
    const y = document.createElement("canvas"), w = io(y);
    w && (n = !0, o(w.getParameter(w.MAX_VERTEX_ATTRIBS) > 0, "WebGL attributes available"), ci(w));
  }
  const a = 1e3;
  let d = 0;
  for (let y = 0; y < a; y++) {
    const w = performance.now();
    d += performance.now() - w;
  }
  const u = Number((d / a).toFixed(4));
  o(u < 0.1, "Benchmark iteration takes under 0.1ms");
  const m = ne.isPowerSaveActive(), l = ne.getTargetFrameIntervalMs();
  o(l === 16 || l === 33, "Frame target is either 16ms or 33ms");
  const _ = performance.now() - t, p = e === i, v = {
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    environment: typeof navigator < "u" ? navigator.userAgent : "Node/Test",
    renderBenchmarkMs: u,
    memoryUsageMB: r.usedJSHeapSizeMB || 0,
    powerSaveModeActive: m,
    webglSupported: n,
    assertionsPassed: e,
    totalAssertions: i,
    passed: p
  };
  return console.info(
    `%c 🧪 ANTIGRAVITY CI RUNNER %c Passed ${e}/${i} | Benchmark: ${u}ms/op | Duration: ${_.toFixed(2)}ms `,
    "color: white; background: #2e7d32; font-weight: 700; padding: 2px 6px; border-radius: 4px 0 0 4px;",
    "color: #2e7d32; background: #e8f5e9; font-weight: 700; padding: 2px 6px; border-radius: 0 4px 4px 0;"
  ), v;
}
typeof window < "u" && window.__RUN_CI__ && di();
var oo = Object.defineProperty, Nt = (t, e, i, o) => {
  for (var r = void 0, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = a(e, i, r) || r);
  return r && oo(e, i, r), r;
};
const ro = [
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
], no = [
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
], ao = [
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
], so = [
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
], lo = [
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
], Qt = [
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
function ut(t) {
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
const co = ut(1), uo = ut(2), ho = ut(3), _o = ut(4), po = [
  { name: "tap_action", selector: { ui_action: {} } },
  { name: "hold_action", selector: { ui_action: {} } },
  { name: "double_tap_action", selector: { ui_action: {} } },
  { name: "custom_styles", selector: { text: { multiline: !0 } } }
], jt = {
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
  if (jt[e.toLowerCase()])
    return jt[e.toLowerCase()];
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
    const r = parseFloat(o[1]) / 360, n = parseFloat(o[2]) / 100, a = parseFloat(o[3]) / 100, d = (p, v, y) => (y < 0 && (y += 1), y > 1 && (y -= 1), y < 1 / 6 ? p + (v - p) * 6 * y : y < 1 / 2 ? v : y < 2 / 3 ? p + (v - p) * (2 / 3 - y) * 6 : p);
    let u, m, l;
    if (n === 0)
      u = m = l = a;
    else {
      const p = a < 0.5 ? a * (1 + n) : a + n - a * n, v = 2 * a - p;
      u = d(v, p, r + 1 / 3), m = d(v, p, r), l = d(v, p, r - 1 / 3);
    }
    const _ = (p) => Math.round(Math.max(0, Math.min(255, p * 255))).toString(16).padStart(2, "0");
    return `#${_(u)}${_(m)}${_(l)}`;
  }
  return e;
}
function fo(t) {
  const e = D(t);
  if (!e || !e.startsWith("#") || e.length < 7) return;
  const i = parseInt(e.slice(1, 3), 16), o = parseInt(e.slice(3, 5), 16), r = parseInt(e.slice(5, 7), 16);
  if (!(isNaN(i) || isNaN(o) || isNaN(r)))
    return [i, o, r];
}
const go = {
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
class ht extends ge {
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
      o && i.bg_opacity === void 0 && (i.bg_opacity = Math.round(parseFloat(o[1]) * 100)), i.bg_color = D(i.bg_color);
    }
    i.card_border_color && (i.card_border_color = D(i.card_border_color)), i.icon_color && (i.icon_color = D(i.icon_color)), i.active_color && (i.active_color = D(i.active_color)), i.inactive_color && (i.inactive_color = D(i.inactive_color)), i.badge_color && (i.badge_color = D(i.badge_color)), i.slider_color && (i.slider_color = D(i.slider_color)), i.slider_track_color && (i.slider_track_color = D(i.slider_track_color)), i.text_color_primary && (i.text_color_primary = D(i.text_color_primary)), i.text_color_secondary && (i.text_color_secondary = D(i.text_color_secondary)), i.sub_button_1_color && (i.sub_button_1_color = D(i.sub_button_1_color)), i.sub_button_2_color && (i.sub_button_2_color = D(i.sub_button_2_color)), i.sub_button_3_color && (i.sub_button_3_color = D(i.sub_button_3_color)), i.sub_button_4_color && (i.sub_button_4_color = D(i.sub_button_4_color)), this._config = {
      ...kt,
      ...i
    };
  }
  _computeLabel(e) {
    return go[e.name] || e.name;
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
    He(this, "config-changed", { config: o });
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
        const r = fo(e[o]);
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
    return k`
      <div class="custom-panel ${a ? "open" : ""}">
        <div class="panel-header" @click=${() => this._togglePanel(e)}>
          <div class="header-left">
            <span class="header-icon">${i}</span>
            <span class="header-title">${o}</span>
          </div>
          <ha-icon class="chevron-icon ${a ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        ${a ? k`
          <div class="panel-body">
            <ha-form
              .hass=${this.hass}
              .data=${n}
              .schema=${r}
              .computeLabel=${this._computeLabel}
              @value-changed=${(d) => this._valueChanged(d, r)}
            ></ha-form>
          </div>
        ` : S}
      </div>
    `;
  }
  _renderSubButtonPanel(e, i, o, r) {
    const n = `sub${e}`, a = !!this._openPanels[n];
    return k`
      <div class="sub-nested-panel ${a ? "open" : ""}">
        <div class="sub-panel-header" @click=${() => this._togglePanel(n)}>
          <div class="header-left">
            <span class="sub-dot ${i ? "active" : ""}"></span>
            <span class="sub-title">Sub-Button ${e} ${i ? `(${i})` : "• Inactive"}</span>
          </div>
          <ha-icon class="chevron-icon ${a ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        ${a ? k`
          <div class="sub-panel-body">
            <ha-form
              .hass=${this.hass}
              .data=${r}
              .schema=${o}
              .computeLabel=${this._computeLabel}
              @value-changed=${(d) => this._valueChanged(d, o)}
            ></ha-form>
          </div>
        ` : S}
      </div>
    `;
  }
  render() {
    if (!this.hass || !this._config) return k``;
    const e = this._transformConfigForForm(), i = this._config?.sub_button_1_entity || "", o = this._config?.sub_button_2_entity || "", r = this._config?.sub_button_3_entity || "", n = this._config?.sub_button_4_entity || "", a = !!this._openPanels.sub_buttons;
    return k`
      <div class="editor-container">
        <!-- 1. CORE & LAYOUT -->
        ${this._renderSection("core", "📦", "Core & Layout", ro, e)}

        <!-- 2. APPEARANCE & THEMING -->
        ${this._renderSection("appearance", "🎨", "Appearance & Theming", no, e)}

        <!-- 3. SLIDERS & CONTROLS -->
        ${this._renderSection("controls", "🎛️", "Sliders & Interactive Controls", ao, e)}

        <!-- 4. SPACING, PADDING & SIZING -->
        ${this._renderSection("spacing", "📏", "Spacing, Padding & Sizing", so, e)}

        <!-- 5. TYPOGRAPHY & LIVE SCROLLING -->
        ${this._renderSection("typography", "✍️", "Typography & Live Scrolling", lo, e)}

        <!-- 6. CONSOLIDATED SUB-BUTTONS (1-4) -->
        <div class="custom-panel ${a ? "open" : ""}">
          <div class="panel-header" @click=${() => this._togglePanel("sub_buttons")}>
            <div class="header-left">
              <span class="header-icon">🔘</span>
              <span class="header-title">Sub-Buttons (1 – 4)</span>
            </div>
            <ha-icon class="chevron-icon ${a ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
          </div>
          ${a ? k`
            <div class="panel-body sub-buttons-master">
              <div class="section-subtitle">Global Sub-Button Layout</div>
              <ha-form
                .hass=${this.hass}
                .data=${e}
                .schema=${Qt}
                .computeLabel=${this._computeLabel}
                @value-changed=${(d) => this._valueChanged(d, Qt)}
              ></ha-form>
              
              <div class="sub-buttons-nested-list">
                ${this._renderSubButtonPanel(1, i, co, e)}
                ${this._renderSubButtonPanel(2, o, uo, e)}
                ${this._renderSubButtonPanel(3, r, ho, e)}
                ${this._renderSubButtonPanel(4, n, _o, e)}
              </div>
            </div>
          ` : S}
        </div>

        <!-- 7. ACTIONS & CUSTOM STYLESHEET -->
        ${this._renderSection("actions", "⚡", "Actions & Scoped CSS", po, e)}
      </div>
    `;
  }
  static get styles() {
    return oi`
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
  ct({ attribute: !1 })
], ht.prototype, "hass");
Nt([
  dt()
], ht.prototype, "_config");
Nt([
  dt()
], ht.prototype, "_openPanels");
customElements.get("antigravity-with-icon-card-editor") || customElements.define("antigravity-with-icon-card-editor", ht);
var mo = Object.defineProperty, bo = Object.getOwnPropertyDescriptor, le = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? bo(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (o ? a(e, i, r) : a(r)) || r);
  return o && r && mo(e, i, r), r;
};
typeof window < "u" && (window.runAntigravityCI = di, window.antigravityMemoryReport = () => at.logStatus(), window.antigravityPowerStatus = () => ne.isPowerSaveActive());
const vo = "145";
console.info(
  `%c 🚀 ANTIGRAVITY-CARD (WITH-ICON) %c v${vo} `,
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
let fe = Date.now();
typeof window < "u" && !window.__AG_RESUME_LISTENER_ATTACHED__ && (window.__AG_RESUME_LISTENER_ATTACHED__ = !0, window.addEventListener("focus", () => {
  fe = Date.now();
}, { passive: !0 }), document.addEventListener("visibilitychange", () => {
  document.visibilityState === "visible" && (fe = Date.now());
}, { passive: !0 }));
const yo = /* @__PURE__ */ new Set([
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
]), xo = /* @__PURE__ */ new Set([
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
]), wo = /* @__PURE__ */ new Set(["hs", "xy", "rgb", "rgbw", "rgbww"]), So = /* @__PURE__ */ new Set([
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
]), ui = /^\d+\s*,\s*\d+\s*,\s*\d+$/, $o = /^\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+$/, je = /* @__PURE__ */ new Map();
function z(t) {
  (isNaN(t) || !isFinite(t)) && (t = 3e3);
  const e = Math.max(1e3, Math.min(4e4, Math.round(t))), i = je.get(e);
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
  return je.size > 256 && je.clear(), je.set(e, d), d;
}
[2e3, 2200, 2500, 2700, 3e3, 3500, 4e3, 4500, 5e3, 5500, 6e3, 6500].forEach((t) => {
  z(t);
});
const et = /* @__PURE__ */ new Map();
function tt(t) {
  if (!Array.isArray(t) || t.length < 3) return "#ffffff";
  const e = `${t[0]},${t[1]},${t[2]}`, i = et.get(e);
  if (i) return i;
  const o = "#" + t.slice(0, 3).map((r) => Math.round(Number(r) || 0).toString(16).padStart(2, "0")).join("");
  return et.size > 512 && et.clear(), et.set(e, o), o;
}
function ko(t, e, i) {
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
function wt(t, e) {
  t = t % 360 / 360, e = Math.max(0, Math.min(100, e)) / 100;
  const i = 1, o = Math.floor(t * 6), r = t * 6 - o, n = i * (1 - e), a = i * (1 - r * e), d = i * (1 - (1 - r) * e);
  let u = 0, m = 0, l = 0;
  switch (o % 6) {
    case 0:
      u = i, m = d, l = n;
      break;
    case 1:
      u = a, m = i, l = n;
      break;
    case 2:
      u = n, m = i, l = d;
      break;
    case 3:
      u = n, m = a, l = i;
      break;
    case 4:
      u = d, m = n, l = i;
      break;
    case 5:
      u = i, m = n, l = a;
      break;
  }
  return [Math.round(u * 255), Math.round(m * 255), Math.round(l * 255)];
}
const Ct = [
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
], Co = [
  { k: 2200, label: "2200K", rgb: z(2200) },
  { k: 2700, label: "2700K", rgb: z(2700) },
  { k: 3e3, label: "3000K", rgb: z(3e3) },
  { k: 4e3, label: "4000K", rgb: z(4e3) },
  { k: 5e3, label: "5000K", rgb: z(5e3) },
  { k: 6500, label: "6500K", rgb: z(6500) }
], Pe = /* @__PURE__ */ new Map(), To = 200;
function B(t) {
  if (!t) return null;
  const e = t.trim().toLowerCase();
  if (!e) return null;
  const i = Pe.get(e);
  if (i !== void 0) return i;
  const o = Ao(e);
  if (Pe.size >= To) {
    const r = Pe.keys().next().value;
    r && Pe.delete(r);
  }
  return Pe.set(e, o), o;
}
function Ao(t) {
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
  if (ui.test(t)) {
    const e = t.split(",").map((i) => parseInt(i.trim(), 10));
    if (e.length >= 3 && !e.some(isNaN))
      return [e[0], e[1], e[2]];
  }
  for (let e = 0; e < Ct.length; e++) {
    const i = Ct[e];
    if (t === i.label.toLowerCase() || t === i.hex)
      return [i.rgb[0], i.rgb[1], i.rgb[2]];
  }
  return null;
}
function St(t, e, i) {
  const o = Math.max(0, Math.min(1, i));
  return [
    Math.round(t[0] + (e[0] - t[0]) * o),
    Math.round(t[1] + (e[1] - t[1]) * o),
    Math.round(t[2] + (e[2] - t[2]) * o)
  ];
}
function $t(t) {
  return `rgb(${t[0]}, ${t[1]}, ${t[2]})`;
}
const it = Object.freeze({
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
      if (Ee(t), typeof window < "u" && window.dispatchEvent(new CustomEvent("haptic", { detail: t, bubbles: !0, composed: !0 })), typeof navigator < "u" && "vibrate" in navigator && typeof navigator.vibrate == "function") {
        let i = 6;
        t === "heavy" ? i = 20 : t === "medium" ? i = 12 : t === "success" ? i = [40, 40, 80] : t === "warning" ? i = [50, 30, 50] : t === "error" && (i = [50, 100, 50]), navigator.vibrate(i);
      }
    } catch {
    }
}
const _e = /* @__PURE__ */ new Map(), ei = 250, G = /* @__PURE__ */ new Map(), ti = 128;
function Mo(t) {
  if (!t) return "";
  const e = _e.get(t);
  if (e !== void 0) return e;
  const i = t.trim();
  if (!i)
    return _e.set(t, ""), "";
  let o = i;
  if (i.startsWith("#") || i.startsWith("rgb") || i.startsWith("hsl") || i.startsWith("var(") ? o = i : ui.test(i) ? o = `rgb(${i})` : $o.test(i) ? o = `rgba(${i})` : i.toLowerCase() === "state" ? o = "var(--state-icon-color, var(--primary-color))" : xo.has(i.toLowerCase()) && (o = `var(--${i.toLowerCase()}-color, ${i.toLowerCase()})`), _e.size >= ei) {
    const r = Math.floor(ei / 4), n = _e.keys();
    for (let a = 0; a < r; a++) {
      const d = n.next().value;
      d !== void 0 && _e.delete(d);
    }
  }
  return _e.set(t, o), o;
}
let V = class extends ge {
  constructor() {
    super(...arguments), this._previousLiveRgb = null, this._currentLiveRgb = null, this._lastTrackedState = null, this.preview = !1, this._collapsed = !0, this._holdTimer = null, this._held = !1, this._moved = !1, this._tapTimer = null, this._throttleMap = /* @__PURE__ */ new Map(), this._startX = 0, this._startY = 0, this._subHoldTimer = null, this._subHeld = !1, this._subMoved = !1, this._subStartX = 0, this._subStartY = 0, this._subTapTimerMap = /* @__PURE__ */ new Map(), this._monitoredEntities = [], this._powerUnsubscribe = null, this._gl = null, this._staticCardStyles = "", this._staticCardClasses = "", this._textOffsetStyle = "", this._iconOffsetStyle = "", this._featuresOffsetStyle = "", this._mainSliderMarginOffsets = "", this._colorTempMarginOffsets = "", this._colorHueMarginOffsets = "", this._textBoxWidth = "", this._primaryTextStyle = "", this._secondaryTextStyle = "", this._primaryTextOffsetStyle = "", this._secondaryTextOffsetStyle = "", this._iconShapeClass = "", this._iconAnimClass = "", this._iconContainerSize = 36, this._iconSize = 24, this._iconOpacityStyle = "", this._iconRotateStyle = "", this._fadeStaticConfig = null, this._relativeTimer = null, this._cachedSubButtons = null, this._intersectionObserver = null, this._cachedHasCollapsible = !1, this._mountTime = 0, this._pointerDownReceived = !1, this._pointerDownTime = 0, this._canceled = !1, this._activePointerId = null, this._subCanceled = !1, this._subPointerDownTime = 0, this._sliderStateMap = /* @__PURE__ */ new WeakMap(), this._onSliderPointerDown = (t) => {
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
          o < 6 && r < 6 && (this._revertSlider(e, i), R("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap"));
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
    return { ...kt };
  }
  static async getConfigElement() {
    return document.createElement("antigravity-with-icon-card-editor");
  }
  setConfig(t) {
    if (!t)
      throw new Error("Invalid configuration");
    this.config = {
      ...kt,
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
    const t = this.config.card_padding ?? 12, e = this.config.card_padding_vertical ?? 4, i = this.config.card_padding_horizontal ?? t, o = this.config.card_padding_top ?? e, r = this.config.card_padding_bottom ?? e, n = this.config.card_padding_left ?? i, a = this.config.card_padding_right ?? i, d = this.config.card_margin, u = this.config.card_margin_vertical ?? d, m = this.config.card_margin_horizontal ?? d, l = this.config.card_margin_top ?? u, _ = this.config.card_margin_bottom ?? u, p = this.config.card_margin_left ?? m, v = this.config.card_margin_right ?? m;
    let y = "";
    (l !== void 0 || _ !== void 0 || p !== void 0 || v !== void 0) && (y = `margin: ${l ?? 0}px ${v ?? 0}px ${_ ?? 0}px ${p ?? 0}px;`);
    const w = this.config.border_radius ?? 12, T = this.config.slider_style === "google", c = this.config.slider_style === "full", f = T ? 42 : c ? 40 : 12, $ = this.config.slider_height !== void 0 ? this.config.slider_height : f, C = T ? 21 : c ? 0 : $ / 2, g = this.config.slider_border_radius !== void 0 ? this.config.slider_border_radius : C, b = this.config.card_border_width ?? (this.config.card_border_color ? 1 : 0), A = this.config.card_border_style ?? "solid", s = b > 0 ? `border: ${b}px ${A} ${this._resolveColor(this.config.card_border_color) || "var(--divider-color, rgba(150, 150, 150, 0.2))"};` : "", h = this.config.card_width ? `width: ${this.config.card_width};` : "", x = this.config.card_max_width ? `max-width: ${this.config.card_max_width};` : "", E = this.config.card_height ? `height: ${this.config.card_height};` : "", L = this.config.card_min_height !== void 0 ? `min-height: ${this.config.card_min_height}px;` : "", J = this.config.fill_container === !0 ? "height: 100%; width: 100%;" : "", Be = this.config.overflow_hidden !== !1 ? "overflow: hidden;" : "overflow: visible;", _t = this.config.backdrop_blur !== void 0 ? `backdrop-filter: blur(${this.config.backdrop_blur}px); -webkit-backdrop-filter: blur(${this.config.backdrop_blur}px);` : "", ve = this.config.card_opacity !== void 0 ? `opacity: ${this.config.card_opacity / 100};` : "", ze = this.config.transition_duration !== void 0 ? `transition: all ${this.config.transition_duration}ms ease;` : "", Oe = this.config.icon_padding !== void 0 ? `--ag-icon-padding: ${this.config.icon_padding}px;` : "", ye = this.config.text_padding_vertical ?? this.config.text_padding ?? 0, Fe = this.config.text_padding_horizontal ?? this.config.text_padding ?? 0, pt = this.config.features_padding_vertical ?? this.config.features_padding ?? 0, Ie = this.config.features_padding_horizontal ?? this.config.features_padding ?? 0, Ue = this.config.sub_button_padding ?? 0, Ge = this.config.sub_button_container_padding ?? 0, Ve = this.config.sub_button_alignment ? `--ag-sub-button-alignment: ${this.config.sub_button_alignment};` : "", O = this.config.text_scrolling_speed ? `--ag-scroll-speed: ${this.config.text_scrolling_speed}s;` : "", We = this.config.full_slider_opacity !== void 0 ? `--ag-full-slider-opacity: ${this.config.full_slider_opacity / 100};` : "";
    this._staticCardStyles = [
      y,
      `border-radius: ${w}px;`,
      s,
      h,
      x,
      E,
      L,
      J,
      Be,
      _t,
      ve,
      ze,
      Oe,
      `--ag-card-padding: ${o}px ${a}px ${r}px ${n}px;`,
      `--ag-text-padding: ${ye}px ${Fe}px;`,
      `--ag-features-padding: ${pt}px ${Ie}px;`,
      `--ag-sub-button-padding: ${Ue}px;`,
      `--ag-sub-button-container-padding: ${Ge}px;`,
      `--ag-content-spacing: ${this.config.content_spacing ?? 12}px;`,
      `--ag-text-spacing: ${this.config.text_spacing ?? 2}px;`,
      `--ag-features-margin: ${this.config.features_margin ?? 4}px;`,
      `--ag-slider-spacing: ${this.config.slider_spacing ?? 6}px;`,
      `--ag-icon-margin: ${this.config.icon_margin ?? 0}px;`,
      `--ag-sub-button-spacing: ${this.config.sub_button_spacing ?? 6}px;`,
      `--ag-slider-height: ${$}px;`,
      `--ag-slider-radius: ${g}px;`,
      `--ag-badge-size: ${this.config.badge_size ?? 16}px;`,
      `--ag-badge-offset: ${this.config.badge_offset ?? -2}px;`,
      `--ag-text-alignment: ${this.config.text_alignment ?? "left"};`,
      `--ag-content-alignment: ${this.config.content_alignment ?? "flex-start"};`,
      Ve,
      O,
      We
    ].filter(Boolean).join(" "), this._staticCardClasses = [
      `layout-${this.config.layout}`,
      this.config.card_layout === "large" ? "card-large" : "",
      `theme-${this.config.theme_preset ?? "default"}`,
      `hover-${this.config.hover_effect ?? "glow"}`,
      `slider-style-${this.config.slider_style ?? "circle"}`,
      this.config.text_color_mode === "inverse" ? "text-color-mode-inverse" : ""
    ].filter(Boolean).join(" ");
    const xe = Number(this.config.text_offset_x) || 0, we = Number(this.config.text_offset_y) || 0;
    this._textOffsetStyle = xe !== 0 || we !== 0 ? `transform: translate(${xe}px, ${we}px);` : "";
    const Z = Number(this.config.primary_text_start_offset ?? this.config.primary_text_offset_x) || 0, Se = Number(this.config.primary_text_end_offset) || 0, $e = Number(this.config.primary_text_offset_y) || 0, ft = Z !== 0 || $e !== 0 ? `transform: translate(${Z}px, ${$e}px);` : "", gt = Z !== 0 || Se !== 0 ? `margin-left: ${Z}px; margin-right: ${Se}px;` : "";
    this._primaryTextOffsetStyle = `${ft} ${gt}`.trim();
    const ce = Number(this.config.secondary_text_start_offset ?? this.config.secondary_text_offset_x) || 0, N = Number(this.config.secondary_text_end_offset) || 0, W = Number(this.config.secondary_text_offset_y) || 0, Ye = ce !== 0 || W !== 0 ? `transform: translate(${ce}px, ${W}px);` : "", F = ce !== 0 || N !== 0 ? `margin-left: ${ce}px; margin-right: ${N}px;` : "";
    this._secondaryTextOffsetStyle = `${Ye} ${F}`.trim();
    const ke = Number(this.config.icon_offset_x) || 0, de = Number(this.config.icon_offset_y) || 0;
    this._iconOffsetStyle = ke !== 0 || de !== 0 ? `transform: translate(${ke}px, ${de}px);` : "";
    const Q = Number(this.config.features_offset_x) || 0, Xe = Number(this.config.features_offset_y) || 0;
    this._featuresOffsetStyle = Q !== 0 || Xe !== 0 ? `transform: translate(${Q}px, ${Xe}px);` : "";
    const H = Number(this.config.slider_start_offset) || 0, qe = Number(this.config.slider_end_offset) || 0;
    this._mainSliderMarginOffsets = [
      H ? `margin-left: ${H}px !important;` : "",
      qe ? `margin-right: ${qe}px !important;` : ""
    ].filter(Boolean).join(" ");
    const Ke = Number(this.config.color_temp_start_offset) || 0, Je = Number(this.config.color_temp_end_offset) || 0;
    this._colorTempMarginOffsets = [
      Ke ? `margin-left: ${Ke}px !important;` : "",
      Je ? `margin-right: ${Je}px !important;` : ""
    ].filter(Boolean).join(" ");
    const Ze = Number(this.config.color_slider_start_offset) || 0, Qe = Number(this.config.color_slider_end_offset) || 0;
    this._colorHueMarginOffsets = [
      Ze ? `margin-left: ${Ze}px !important;` : "",
      Qe ? `margin-right: ${Qe}px !important;` : ""
    ].filter(Boolean).join(" "), this._textBoxWidth = this.config.text_box_width ? `max-width: ${this.config.text_box_width}; width: ${this.config.text_box_width};` : "width: 100%; max-width: 100%;";
    const mt = this.config.text_transform_primary && this.config.text_transform_primary !== "none" ? `text-transform: ${this.config.text_transform_primary};` : "", bt = `text-transform: ${this.config.text_transform_secondary ?? "capitalize"};`, ue = this.config.letter_spacing ? `letter-spacing: ${this.config.letter_spacing}px;` : "", I = this.config.line_height ? `line-height: ${this.config.line_height};` : "", Y = this.config.font_weight_primary ?? "800";
    this._primaryTextStyle = `font-size: ${this.config.font_size_primary ?? 14}px; font-weight: ${Y}; ${mt} ${ue} ${I}`, this._secondaryTextStyle = `font-size: ${this.config.font_size_secondary ?? 15}px; ${bt} ${ue} ${I}`, this._iconShapeClass = `icon-shape-${this.config.icon_shape || "circle"}`, this._iconAnimClass = `anim-${this.config.icon_animation || "none"}`, this._iconContainerSize = this.config.icon_container_size ?? (this.config.card_layout === "large" ? 48 : 36), this._iconSize = this.config.icon_size ?? 24, this._iconOpacityStyle = this.config.icon_opacity !== void 0 && this.config.icon_opacity < 100 ? `opacity: ${this.config.icon_opacity / 100};` : "", this._iconRotateStyle = this.config.icon_rotate && this.config.icon_rotate !== 0 ? `transform: rotate(${this.config.icon_rotate}deg);` : "";
    const X = this.config.entity, Ce = [];
    for (let M = 1; M <= 4; M++) {
      const j = this.config[`sub_button_${M}_entity`], q = this.config[`sub_button_${M}_icon`], ee = this.config[`sub_button_${M}_name`], he = this.config[`sub_button_${M}_tap_action`], U = this.config[`sub_button_${M}_hold_action`], vt = this.config[`sub_button_${M}_double_tap_action`], te = this.config[`sub_button_${M}_type`], P = this.config[`sub_button_${M}_color`], Te = this.config[`sub_button_${M}_show_background`], Dt = this.config[`sub_button_${M}_show_state`];
      if (!!(j || q || ee || te && te !== "button" || Dt)) {
        const Rt = j || X;
        Ce.push(Object.freeze({
          key: `${Rt || "sub"}_${M}`,
          entity: Rt,
          type: te || "button",
          icon: q,
          color: P,
          bg: Te,
          name: ee,
          showState: Dt === !0,
          tapAction: he,
          holdAction: U,
          doubleTapAction: vt
        }));
      }
    }
    if (this._cachedSubButtons = Object.freeze(Ce), this.config.fade_transition_enabled) {
      const M = Number(this.config.fade_stage_1_duration) || 60, j = Number(this.config.fade_stage_2_duration) || 600, q = Number(this.config.fade_stage_3_duration) || 1800, ee = B(this.config.fade_stage_1_color) || [255, 152, 0], he = B(this.config.fade_stage_2_color) || [205, 220, 57], U = B(this.config.fade_stage_3_color);
      this._fadeStaticConfig = {
        d1: M,
        d2: j,
        d3: q,
        totalDuration: M + j + q,
        c1Rgb: ee,
        c2Rgb: he,
        c3Rgb: U,
        restingResult: Object.freeze({
          enabled: !0,
          activeFade: !1,
          currentColor: U ? $t(U) : "",
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
    const i = this.config.entity.split(".")[0] === "light", o = t.state === "on", r = this.config.hide_color_temp_when_off !== !1, n = this.config.hide_color_picker_when_off !== !1, a = this.config.hide_color_slider_when_off !== !1, d = t.attributes?.color_temp_kelvin ?? t.attributes?.color_temp, u = i && this.config.show_color_temp === !0 && (d !== void 0 || t.attributes?.supported_color_modes?.some((T) => ["color_temp"].includes(T))) && (!r || o), m = t.attributes?.supported_color_modes, l = Array.isArray(m) && m.some((T) => ["hs", "xy", "rgb", "rgbw", "rgbww"].includes(T)), _ = this.config.color_picker_type !== "wheel", p = i && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && _) && l && (!a || o), v = i && this.config.show_color_picker === !0 && !_ && l && (!n || o), y = u || p || v, w = this._getSubButtons();
    this._cachedHasCollapsible = y || w.length > 0;
  }
  connectedCallback() {
    super.connectedCallback(), at.registerCard(this), this._mountTime = Date.now(), this._pointerDownReceived = !1, this._powerUnsubscribe = ne.addChangeListener(() => {
      this._updatePowerSaveAttribute();
    }), this._updatePowerSaveAttribute(), this._setupRelativeTimer(), this._setupIntersectionObserver();
  }
  _updatePowerSaveAttribute() {
    ne.isPowerSaveActive(this.hass) ? this.setAttribute("power-save", "") : this.removeAttribute("power-save");
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
      const m = this._calculateMultiStageFade(a);
      d = m.enabled && m.activeFade && m.progressPct < 100;
    }
    const u = d || r || t === "last-changed" || t === "last_changed" || t === "last-updated" || t === "last_updated" || t === "last-triggered" || e === "last-changed" || e === "last_changed" || e === "last-updated" || e === "last_updated" || e === "last-triggered";
    if (u && !this._relativeTimer) {
      let m = d ? 1e3 : 5e3;
      const l = a?.attributes?.last_triggered || a?.last_changed || a?.last_updated;
      if (l && !d && !r) {
        const _ = this._parseDate(l);
        if (_) {
          const p = Math.max(0, (Date.now() - _.getTime()) / 1e3 | 0);
          p > 3600 ? m = 6e4 : p > 60 && (m = 15e3);
        }
      }
      ne.isPowerSaveActive(this.hass) && (m = Math.max(m, 1e4)), this._relativeTimer = setInterval(() => {
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
    super.disconnectedCallback(), at.unregisterCard(this), this._powerUnsubscribe && (this._powerUnsubscribe(), this._powerUnsubscribe = null), this._gl && (ci(this._gl), this._gl = null), this._throttleMap.clear(), this._subTapTimerMap.forEach((t) => clearTimeout(t)), this._subTapTimerMap.clear(), this._intersectionObserver && (this._intersectionObserver.disconnect(), this._intersectionObserver = null), this._relativeTimer && (clearInterval(this._relativeTimer), this._relativeTimer = null), this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null), this._tapTimer && (clearTimeout(this._tapTimer), this._tapTimer = null), this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
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
    return t ? yo.has(t.state) : !1;
  }
  _calculateMultiStageFade(t, e = "", i = "") {
    if (!this.config?.fade_transition_enabled || !t)
      return it;
    const o = this._isEntityActive(t), r = this.config.fade_trigger ?? "on_inactive";
    if (!(r === "on_inactive" && !o || r === "on_active" && o || r === "both"))
      return it;
    const a = o ? this._resolveColor(this.config.inactive_color) || i || "#4caf50" : this._resolveColor(this.config.active_color) || e || "#d60000", d = o ? this._resolveColor(this.config.active_color) || e || "#d60000" : this._resolveColor(this.config.inactive_color) || i || "#03b100", u = B(a) || [214, 0, 0], m = B(d) || [3, 177, 0], l = this._fadeStaticConfig, _ = l?.d1 ?? (Number(this.config.fade_stage_1_duration) || 60), p = l?.d2 ?? (Number(this.config.fade_stage_2_duration) || 600), v = l?.d3 ?? (Number(this.config.fade_stage_3_duration) || 1800), y = l?.totalDuration ?? _ + p + v;
    if (y <= 0)
      return it;
    this._lastTrackedState !== null && this._lastTrackedState !== t.state && this._currentLiveRgb && this.config.fade_smooth_retrigger !== !1 && (this._previousLiveRgb = this._currentLiveRgb), this._lastTrackedState = t.state;
    const w = this.config.fade_stage_1_pickup !== !1 && this._previousLiveRgb && this.config.fade_smooth_retrigger !== !1 ? this._previousLiveRgb : u, T = l?.c1Rgb ?? (B(this.config.fade_stage_1_color) || [255, 152, 0]), c = this.config.fade_stage_2_pickup !== !1 ? T : u, f = l?.c2Rgb ?? (B(this.config.fade_stage_2_color) || [205, 220, 57]), $ = this.config.fade_stage_3_pickup !== !1 ? f : T, C = l?.c3Rgb ?? (B(this.config.fade_stage_3_color) || m), g = this._parseDate(t.last_changed || t.last_updated);
    if (!g)
      return it;
    const b = Math.max(0, (Date.now() - g.getTime()) / 1e3);
    if (b >= y)
      return this._currentLiveRgb = C, this._previousLiveRgb = null, l?.restingResult ? l.restingResult : {
        enabled: !0,
        activeFade: !1,
        currentColor: $t(C),
        progressPct: 100,
        remainingSeconds: 0,
        currentStage: 0,
        stageLabel: "Resting"
      };
    let A, s = 1, h = 0;
    const x = Math.max(0, Math.round(y - b));
    b < _ && _ > 0 ? (s = 1, h = b / _, A = St(w, T, h)) : b < _ + p && p > 0 ? (s = 2, h = (b - _) / p, A = St(c, f, h)) : v > 0 ? (s = 3, h = (b - _ - p) / v, A = St($, C, h)) : (s = 0, A = C), this._currentLiveRgb = A;
    const E = Math.min(100, Math.round(b / y * 100)), L = $t(A);
    let J = "";
    return x >= 60 ? J = `${Math.ceil(x / 60)}m left` : J = `${x}s left`, {
      enabled: !0,
      activeFade: !0,
      currentColor: L,
      progressPct: E,
      remainingSeconds: x,
      currentStage: s,
      stageLabel: J
    };
  }
  _resolveColor(t) {
    return Mo(t);
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
      const e = G.get(t);
      if (e) return e;
      const i = Date.parse(t);
      if (!isNaN(i)) {
        const d = new Date(i);
        if (G.size >= ti) {
          const u = G.keys().next().value;
          u !== void 0 && G.delete(u);
        }
        return G.set(t, d), d;
      }
      let o = t.trim();
      o.includes(" ") && !o.includes("T") && (o = o.replace(" ", "T")), o.includes("T") && !o.endsWith("Z") && !/[+-]\d{2}:\d{2}$/.test(o) && !/[+-]\d{4}$/.test(o) && (o += "Z");
      const r = Number(o);
      let n;
      !isNaN(r) && o !== "" && !o.includes("T") ? n = new Date(r > 1e11 ? r : r * 1e3) : n = new Date(o);
      const a = isNaN(n.getTime()) ? null : n;
      if (a) {
        if (G.size >= ti) {
          const d = G.keys().next().value;
          d !== void 0 && G.delete(d);
        }
        G.set(t, a);
      }
      return a;
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
              const n = Math.max(0, Math.round((r - Date.now()) / 1e3)), a = Math.floor(n / 60), d = n % 60, u = Math.floor(a / 60), m = (a % 60).toString().padStart(2, "0"), l = d.toString().padStart(2, "0");
              return u > 0 ? `${u}:${m}:${l}` : `${m}:${l}`;
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
          const r = e.state || "", n = e.attributes?.current_temperature, a = e.attributes?.temperature ?? e.attributes?.target_temp_high, d = e.attributes?.unit_of_measurement || this.hass.config?.unit_system?.temperature || "°", u = e.attributes?.preset_mode, m = e.attributes?.hvac_action, _ = [n !== void 0 && a !== void 0 ? `${n}${d} → ${a}${d}` : a !== void 0 ? `${a}${d}` : "", m, u].filter(Boolean).join(" • ");
          return _ ? `${r} (${_})` : r;
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
            return r <= 20 ? n = "#f44336" : r <= 50 && (n = "#ff9800"), k`<span style="color: ${n}; font-weight: bold;">${r}%</span>`;
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
    const o = i || this.config.entity, r = o ? o.split(".")[0] : "", n = So.has(r);
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
      n && (!a.action || a.action === "toggle") || Qi(this, this.hass, { ...this.config, entity: o }, t);
    }
  }
  _handleTap(t) {
    if (t.stopPropagation(), this._isSubElement(t)) return;
    if (Date.now() - this._mountTime < 1500 || Date.now() - fe < 800) {
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
    this._isSubElement(t) || Date.now() - this._mountTime < 1500 || Date.now() - fe < 800 || (t.key === "Enter" || t.key === " ") && (t.preventDefault(), R("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap"));
  }
  _handleContextMenu(t) {
    if (t.preventDefault(), t.stopPropagation(), Date.now() - this._mountTime < 1500 || Date.now() - fe < 800 || this._held) return;
    R("medium", this.config.haptic_feedback !== !1), (this.config.collapse_controls_trigger || "hold") === "hold" && this._hasCollapsible() ? this._collapsed = !this._collapsed : this.config.hold_action && this.config.hold_action.action !== "none" && this._dispatchAction("hold");
  }
  _handlePointerDown(t) {
    this._isSubElement(t) || Date.now() - this._mountTime < 1500 || Date.now() - fe < 800 || this._activePointerId !== null && this._activePointerId !== t.pointerId || (this._activePointerId = t.pointerId, this._pointerDownReceived = !0, this._pointerDownTime = Date.now(), this._held = !1, this._moved = !1, this._canceled = !1, this._startX = t.clientX, this._startY = t.clientY, this._holdTimer = setTimeout(() => {
      if (this._moved || this._canceled) return;
      this._held = !0, this._holdTimer = null, this._tapTimer && (clearTimeout(this._tapTimer), this._tapTimer = null), R("heavy", this.config.haptic_feedback !== !1), (this.config.collapse_controls_trigger || "hold") === "hold" && this._hasCollapsible() ? this._collapsed = !this._collapsed : this.config.hold_action && this.config.hold_action.action !== "none" && this._dispatchAction("hold");
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
      this._subMoved || this._subCanceled || (this._subHeld = !0, this._subHoldTimer = null, R("heavy", this.config.haptic_feedback !== !1), this._dispatchAction("hold", i || { action: "more-info" }, e));
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
      R("light", this.config.haptic_feedback !== !1), i && i.action && i.action !== "none" && i.action !== "default" ? this._dispatchAction("tap", i, e) : r ? r() : this._dispatchAction("tap", { action: "toggle" }, e);
    };
    if (!n) {
      d();
      return;
    }
    const u = this._subTapTimerMap.get(a);
    if (u) {
      clearTimeout(u), this._subTapTimerMap.delete(a), R("medium", this.config.haptic_feedback !== !1), this._dispatchAction("double_tap", o, e);
      return;
    }
    const m = setTimeout(() => {
      this._subTapTimerMap.delete(a), d();
    }, 250);
    this._subTapTimerMap.set(a, m);
  }
  _handleSubContextMenu(t, e, i) {
    t.preventDefault(), t.stopPropagation(), !this._subHeld && (R("medium", this.config.haptic_feedback !== !1), this._dispatchAction("hold", i || { action: "more-info" }, e));
  }
  // --- THROTTLED SERVICE CALL HELPER ---
  _throttledCall(t, e, i) {
    const o = i ?? (ne.isPowerSaveActive(this.hass) ? 60 : 30), r = this._throttleMap.get(t) ?? 0, n = Date.now();
    if (!(n - r < o)) {
      this._throttleMap.set(t, n);
      try {
        e();
      } finally {
        setTimeout(() => {
          this._throttleMap.get(t) === n && this._throttleMap.delete(t);
        }, o + 50);
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
    const m = Number(d.value), l = isNaN(m) ? 0 : m, _ = n ? n(l) : l;
    if (u) {
      if (u.rafPending) return;
      u.rafPending = !0;
    }
    requestAnimationFrame(() => {
      if (u && (u.rafPending = !1), u?.isScrolling) {
        this._revertSlider(d, u);
        return;
      }
      d.style.setProperty("--slider-pct", `${_}%`);
      const p = d.closest(".slider-container, .sub-button-slider-container"), v = p?.querySelector(".slider-percent-badge, .sub-slider-pct");
      if (v && (v.textContent = a ? a(l, _) : `${_}%`), e === "color_hue" && p) {
        p.style.setProperty("--color-hue-val", `hsl(${l}, 100%, 50%)`);
        const y = p.querySelector(".color-chip-badge span");
        y && (y.style.background = `hsl(${l}, 100%, 50%)`);
      }
    }), R("selection", this.config.haptic_feedback !== !1);
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
      const o = e.color_temp_kelvin ?? (e.color_temp ? Math.round(1e6 / e.color_temp) : 3e3), [r, n, a] = z(o);
      return `rgb(${r}, ${n}, ${a})`;
    }
    if (Array.isArray(e.rgb_color) && e.rgb_color.length >= 3)
      return `rgb(${e.rgb_color[0]}, ${e.rgb_color[1]}, ${e.rgb_color[2]})`;
    if (Array.isArray(e.hs_color) && e.hs_color.length >= 2) {
      const [o, r, n] = wt(e.hs_color[0], e.hs_color[1]);
      return `rgb(${o}, ${r}, ${n})`;
    }
    if (Array.isArray(e.rgbw_color) && e.rgbw_color.length >= 3)
      return `rgb(${e.rgbw_color[0]}, ${e.rgbw_color[1]}, ${e.rgbw_color[2]})`;
    if (Array.isArray(e.rgbww_color) && e.rgbww_color.length >= 3)
      return `rgb(${e.rgbww_color[0]}, ${e.rgbww_color[1]}, ${e.rgbww_color[2]})`;
    if (e.color_temp_kelvin !== void 0 || e.color_temp !== void 0) {
      const o = e.color_temp_kelvin ?? Math.round(1e6 / e.color_temp), [r, n, a] = z(o);
      return `rgb(${r}, ${n}, ${a})`;
    }
    return t.state === "on" ? "var(--state-light-active-color, rgb(255, 205, 120))" : null;
  }
  _getLiveHex(t) {
    if (!t?.attributes || t.state !== "on") return "#ffffff";
    const e = t.attributes;
    if (Array.isArray(e.rgb_color) && e.rgb_color.length >= 3)
      return tt(e.rgb_color);
    if (Array.isArray(e.hs_color) && e.hs_color.length >= 2)
      return tt(wt(e.hs_color[0], e.hs_color[1]));
    if (e.color_temp_kelvin !== void 0 || e.color_temp !== void 0) {
      const r = e.color_temp_kelvin ?? Math.round(1e6 / e.color_temp);
      return tt(z(r));
    }
    const i = this._getLightLiveColor(t);
    if (!i) return "#ffffff";
    const o = B(i);
    return o ? tt(o) : "#ffffff";
  }
  _getLiveHue(t) {
    if (!t) return 0;
    if (Array.isArray(t.attributes?.hs_color) && t.attributes.hs_color.length >= 1)
      return Math.round(t.attributes.hs_color[0]) % 360;
    if (Array.isArray(t.attributes?.rgb_color) && t.attributes.rgb_color.length >= 3) {
      const [e, i, o] = t.attributes.rgb_color;
      return ko(e, i, o);
    }
    return 0;
  }
  _handleColorInput(t, e, i, o) {
    t.stopPropagation();
    const r = t.target.value;
    if (!r) return;
    const n = B(r);
    if (!n) return;
    const a = i || this.config.entity, d = () => {
      this.hass.callService("light", "turn_on", { entity_id: a, rgb_color: n });
    };
    e ? this._throttledCall(o || "color_picker", d) : d();
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
    const i = this.config.show_name !== !1 ? this._getInfoContent(this.config.primary_info, e) : "", o = this.config.show_state !== !1 ? this._getInfoContent(this.config.secondary_info, e) : "", r = this._isEntityActive(e), n = t.split(".")[0], a = this.config.icon_type ?? "icon", d = this.config.show_icon !== !1 && a !== "none", u = this._iconShapeClass, m = this._iconAnimClass;
    let l = "var(--primary-color)", _ = null;
    n === "climate" ? e.state === "heat" ? l = "var(--state-climate-heat-color, #ff7043)" : e.state === "cool" ? l = "var(--state-climate-cool-color, #42a5f5)" : e.state === "dry" ? l = "var(--state-climate-dry-color, #ab47bc)" : e.state === "fan_only" && (l = "var(--state-climate-fan_only-color, #26a69a)") : n === "light" ? (_ = this._getLightLiveColor(e), _ && (l = _)) : (n === "binary_sensor" || n === "lock" || n === "switch") && (l = "#d60000");
    const p = this.config.color_type === "card";
    let v = this._resolveColor(this.config.active_color);
    (!v || this.config.use_light_color) && (n === "light" && _ ? v = _ : v = l);
    let y = "var(--secondary-background-color, rgba(150, 150, 150, 0.2))";
    n === "light" ? y = "#000000" : (n === "binary_sensor" || n === "lock" || n === "switch") && (y = "#03b500");
    const w = this._resolveColor(this.config.inactive_color) || y, T = p ? "transparent" : r ? v : w, c = this.config.icon_color ? `color: ${this._resolveColor(this.config.icon_color)};` : p && r ? "color: #ffffff; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.4));" : "", f = this._iconOpacityStyle, $ = this._iconRotateStyle, C = this.config.show_slider !== !1, g = n === "light", b = n === "cover", A = n === "fan", s = n === "humidifier", h = n === "media_player", x = n === "number" || n === "input_number", E = n === "climate", L = this.config.hide_slider_when_off !== !1, J = this.config.hide_color_temp_when_off !== !1, Be = this.config.hide_color_picker_when_off !== !1, _t = this.config.hide_color_slider_when_off !== !1, ve = e.attributes?.supported_color_modes;
    let ze = e.attributes?.brightness !== void 0, Oe = !1, ye = !1;
    if (Array.isArray(ve))
      for (let P = 0; P < ve.length; P++) {
        const Te = ve[P];
        Te !== "onoff" && (ze = !0), Te === "color_temp" && (Oe = !0), wo.has(Te) && (ye = !0);
      }
    const Fe = g && C && ze && (!L || r), pt = e.attributes?.color_temp_kelvin ?? e.attributes?.color_temp, Ie = g && this.config.show_color_temp === !0 && (pt !== void 0 || Oe) && (!J || r), Ue = this.config.color_picker_type !== "wheel", Ge = g && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && Ue) && ye && (!_t || r), Ve = g && this.config.show_color_picker === !0 && !Ue && ye && (!Be || r), O = e.state !== "unavailable" && e.state !== "unknown", We = b && O && C && e.attributes?.current_position !== void 0, xe = A && O && r && C && e.attributes?.percentage !== void 0, we = s && O && r && C && (e.attributes?.humidity !== void 0 || e.attributes?.target_humidity !== void 0), Z = h && O && r && C && e.attributes?.volume_level !== void 0, Se = x && O && C, $e = E && O && r && C && (e.attributes?.temperature !== void 0 || e.attributes?.target_temp_high !== void 0), ft = (this.config.bg_opacity ?? 10) / 100, gt = this.config.slider_color ? `--slider-color: ${this._resolveColor(this.config.slider_color)};` : p && r && !this.config.use_light_color ? "--slider-color: rgba(255, 255, 255, 0.95);" : `--slider-color: ${v};`, ce = this.config.slider_track_color ? `--slider-track-color: ${this._resolveColor(this.config.slider_track_color)};` : p && r ? "--slider-track-color: rgba(0, 0, 0, 0.25);" : "", N = this._calculateMultiStageFade(e, l, w), W = this.config.fade_target ?? "card", Ye = this._resolveColor(this.config.bg_color);
    let F;
    N.activeFade && (W === "card" || W === "all" || p) ? F = N.currentColor : p ? n === "light" ? F = r ? _ || v : this.config.inactive_color ? w : "#000000" : F = r ? v : w : Ye ? F = Ye : n === "light" && !r ? F = "#000000" : F = `rgba(150, 150, 150, ${ft})`;
    let ke = T;
    N.activeFade && (W === "icon" || W === "all") && (ke = p ? "transparent" : N.currentColor);
    let de = this._resolveColor(this.config.active_color) || (n === "light" && _ ? _ : v) || "var(--primary-color)";
    N.activeFade && (W === "all" || this.config.active_glow === !0) && (de = N.currentColor);
    let Q = "";
    this.config.box_shadow === "soft" && (Q = "box-shadow: 0 4px 10px rgba(0,0,0,0.1);"), this.config.box_shadow === "deep" && (Q = "box-shadow: 0 10px 20px rgba(0,0,0,0.3);"), (this.config.box_shadow === "glow" || this.config.active_glow === !0) && (Q = r || N.activeFade ? `box-shadow: 0 0 22px ${de}, 0 0 45px rgba(255, 255, 255, 0.18);` : "");
    const Xe = this.config.active_glow === !0 || this.config.box_shadow === "glow" ? "card-active-glow" : "", H = e?.attributes?.device_class, qe = n === "binary_sensor" && (H === "motion" || H === "occupancy" || H === "presence"), Ke = n === "binary_sensor" && (H === "door" || H === "window" || H === "garage_door" || H === "opening"), Je = qe && (r || N.activeFade && N.currentStage === 1) ? "motion-active" : "", Ze = Ke && r ? "door-open" : "", Qe = n === "climate" && e?.attributes?.hvac_action ? `hvac-${e.attributes.hvac_action}` : "", mt = n === "cover" ? e?.state === "opening" ? "cover-opening" : e?.state === "closing" ? "cover-closing" : "" : "", bt = `${this._staticCardClasses} ${Xe} ${Je} ${Ze} ${Qe} ${mt}`, ue = this._getSubButtons();
    let I = "";
    this.config.text_color_mode === "active_accent" && r ? I += `--primary-text-color: ${v}; ` : this.config.text_color_primary ? I += `--primary-text-color: ${this._resolveColor(this.config.text_color_primary)}; ` : p && r && (I += "--primary-text-color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.4); "), this.config.text_color_secondary ? I += `--secondary-text-color: ${this._resolveColor(this.config.text_color_secondary)}; ` : p && r && (I += "--secondary-text-color: rgba(255, 255, 255, 0.9); text-shadow: 0 1px 2px rgba(0,0,0,0.3); ");
    const Y = this.config.features_position === "inline", X = this._iconSize, Ce = this._iconContainerSize, M = this.config.text_scrolling_primary || "none", j = this.config.text_scrolling_secondary || "none", q = k`
      ${Fe ? this._renderLightSlider(e) : S}
      ${We ? this._renderCoverSlider(e) : S}
      ${xe ? this._renderFanSlider(e) : S}
      ${we ? this._renderHumidifierSlider(e) : S}
      ${Z ? this._renderMediaSlider(e) : S}
      ${Se ? this._renderNumberSlider(e) : S}
      ${$e ? this._renderClimateSlider(e) : S}
    `, ee = k`
      ${Ie ? this._renderColorTempSlider(e) : S}
      ${Ge ? this._renderColorSlider(e) : S}
      ${Ve ? this._renderColorPicker(e) : S}
    `, he = Fe || We || xe || we || Z || Se || $e, U = Ie || Ge || Ve, vt = !Y && U || ue.length > 0, te = this.config.decay_slider_position ?? "bottom";
    return k`
      ${this.config.custom_styles ? k`<style>${this.config.custom_styles}</style>` : S}
      <ha-card 
        class="${bt}" 
        ?active=${r}
        style="${this._staticCardStyles} background: ${F}; ${Q} ${gt} ${ce} ${I} --ag-glow-color: ${de}; --ag-active-color: ${v};"
        @click=${this._handleTap}
        @keydown=${this._handleKeyDown}
        @contextmenu=${this._handleContextMenu}
        @pointerdown=${this._handlePointerDown}
        @pointermove=${this._handlePointerMove}
        @pointerup=${this._handlePointerUp}
        @pointercancel=${this._handlePointerCancel}
      >
        <div class="card-content ${Y ? "features-inline" : ""}" style="justify-content: var(--ag-content-alignment);">
          ${te === "top" ? this._renderDecaySlider(N) : S}

          <div class="info-container">
            ${d ? k`
              <div class="icon-container ${u} ${m} ${this.config.active_pulse && r ? "pulse" : ""} ${(this.config.active_glow || this.config.box_shadow === "glow") && (r || N.activeFade) ? "glow" : ""}" 
                   style="${this._iconOffsetStyle} ${c} ${f} background-color: ${ke}; width: ${Ce}px; height: ${Ce}px; --mdc-icon-size: ${X}px; ${O ? "" : "opacity: 0.5; pointer-events: none;"}" 
                   ?active=${r}>
                ${a === "entity-picture" && e.attributes.entity_picture ? k`<img class="entity-picture ${u}" src="${e.attributes.entity_picture}" style="width: ${X}px; height: ${X}px; ${$}" />` : k`<ha-state-icon
                      .hass=${this.hass}
                      .stateObj=${e}
                      .icon=${this.config.icon || this._computeDynamicIcon(e)}
                      style="--mdc-icon-size: ${X}px; width: ${X}px; height: ${X}px; ${$}"
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
                <div class="text-marquee-container scroll-${M}" style="${this._primaryTextOffsetStyle}">
                  <span class="primary scroll-content" style="${this._primaryTextStyle}">${i}</span>
                </div>` : S}
              ${o ? k`
                <div class="text-marquee-container scroll-${j}" style="${this._secondaryTextOffsetStyle}">
                  <span class="secondary scroll-content" style="${this._secondaryTextStyle}">${o}</span>
                </div>` : S}
            </div>
            ${te === "inline" ? k`<div class="inline-sliders">${this._renderDecaySlider(N)}</div>` : S}
            ${Y && he ? k`<div class="inline-sliders" style="${this._mainSliderMarginOffsets}">${q}</div>` : S}
            ${Y && U ? k`<div class="inline-sliders ${this._collapsed ? "collapsed" : ""}">${ee}</div>` : S}
          </div>
          
          ${te === "bottom" ? this._renderDecaySlider(N) : S}
          ${!Y && he ? k`<div class="features-container" style="${this._featuresOffsetStyle} ${this._mainSliderMarginOffsets}">${q}</div>` : S}

          ${vt ? k`
            <div class="collapsible-wrapper ${this._collapsed ? "collapsed" : ""}">
              ${!Y && U ? k`<div class="features-container" style="${this._featuresOffsetStyle}">${ee}</div>` : S}

              ${ue.length > 0 ? k`
                <div class="sub-buttons-container">
                  ${Wi(
      ue,
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
    const e = this.config.slider_style === "google", i = this.config.decay_slider_height ?? (e ? 32 : 10), o = this.config.slider_border_radius ?? (e ? 16 : 5), r = Math.max(0, 100 - t.progressPct);
    return k`
      <div class="decay-slider-container" style="--decay-color: ${t.currentColor}; --decay-pct: ${r}%;">
        <div class="decay-slider-track" style="height: ${i}px; border-radius: ${o}px;">
          <div class="decay-slider-fill" style="background: ${t.currentColor}; border-radius: ${o}px;"></div>
          <span class="decay-slider-badge">${t.stageLabel}</span>
        </div>
      </div>
    `;
  }
  // --- GENERIC SLIDER COMPONENT HELPER ---
  _renderGenericSlider(t, e, i, o, r, n, a, d, u, m, l, _, p = "", v = "", y) {
    const w = this.config.slider_style === "google", T = w && this.config.show_slider_percent !== !1 || this.config.show_slider_percent === !0, c = _ ? _(n, a) : `${a}%`, f = y !== void 0 ? y : c, $ = this.config.slider_stepped_movement === !1 ? "any" : r, C = t !== "color_temp" && t !== "color_hue", g = this.config.slider_style === "full", b = C && g ? "main-slider-full" : "";
    let A = "";
    if (C && g) {
      const s = Number(this.config.slider_start_offset) || 0, h = Number(this.config.slider_end_offset) || 0;
      A = `left: ${s}px !important; right: ${h}px !important; width: calc(100% - ${s + h}px) !important;`;
    } else t === "color_temp" ? A = this._colorTempMarginOffsets : t === "color_hue" ? A = this._colorHueMarginOffsets : A = this._mainSliderMarginOffsets;
    return k`
      <div class="slider-container ${p} ${b} ${w ? "slider-google-wrap" : ""}" style="${A} ${v}">
        <input type="range" min=${i} max=${o} step=${$} .value=${n}
               aria-label="${e}"
               style="--slider-pct: ${a}%;"
               @pointerdown=${this._onSliderPointerDown}
               @pointermove=${this._onSliderPointerMove}
               @pointerup=${this._onSliderPointerUp}
               @pointercancel=${this._onSliderPointerCancel}
               @input=${(s) => this._sliderInput(s, t, d, u, m, l, _)}
               @change=${(s) => this._sliderChange(s, d, u, m)} />
        ${T && f ? k`<span class="slider-percent-badge">${f}</span>` : S}
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
    const e = this.config.color_temp_type || "gradient", i = t.attributes.color_temp_kelvin !== void 0 || t.attributes.min_color_temp_kelvin !== void 0 || t.attributes.max_color_temp_kelvin !== void 0, o = i ? t.attributes.min_color_temp_kelvin || 2e3 : t.attributes.min_mireds || 153, r = i ? t.attributes.max_color_temp_kelvin || 6500 : t.attributes.max_mireds || 500, n = i ? t.attributes.color_temp_kelvin || 3e3 : t.attributes.color_temp || 300, a = r - o, d = a > 0 ? Math.max(0, Math.min(100, Math.round((n - o) / a * 100))) : 0, u = i ? "color_temp_kelvin" : "color_temp", m = e === "google" || e === "gradient" && this.config.slider_style === "google", l = m ? 42 : e === "thin" ? 6 : 12, _ = m ? 21 : e === "thin" ? 3 : 6, p = this.config.color_temp_height !== void 0 ? this.config.color_temp_height : this.config.slider_height ?? l, v = this.config.color_temp_border_radius !== void 0 ? this.config.color_temp_border_radius : this.config.slider_border_radius ?? _, y = i ? `${n} K` : `${n} mireds`;
    if (e === "presets") {
      const w = Number(this.config.color_temp_start_offset) || 0, T = Number(this.config.color_temp_end_offset) || 0, c = [
        w ? `margin-left: ${w}px;` : "",
        T ? `margin-right: ${T}px;` : ""
      ].filter(Boolean).join(" ");
      return k`
        <div class="presets-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${c}">
          ${Co.map((f) => {
        const [$, C, g] = f.rgb, b = Math.abs(n - f.k) < 200, A = () => {
          R("light", this.config.haptic_feedback !== !1), this.hass?.callService("light", "turn_on", { entity_id: this.config.entity, [u]: f.k });
        };
        return k`
              <button 
                type="button"
                role="button"
                aria-label="Color temperature preset: ${f.label}"
                tabindex="0"
                class="temp-preset-chip"
                style="flex: 1; min-width: 48px; height: ${p}px; border-radius: ${v}px; border: ${b ? "2px solid #ffffff" : "1px solid rgba(150, 150, 150, 0.3)"}; background: rgba(${$}, ${C}, ${g}, 0.2); color: var(--primary-text-color); font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; box-shadow: ${b ? "0 0 8px rgba(" + $ + "," + C + "," + g + ", 0.8)" : "none"};"
                @keydown=${(s) => {
          (s.key === "Enter" || s.key === " ") && (s.preventDefault(), s.stopPropagation(), A());
        }}
                @click=${(s) => {
          s.stopPropagation(), A();
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
      o,
      r,
      1,
      n,
      d,
      "light",
      "turn_on",
      (w) => ({ [u]: w }),
      (w) => a > 0 ? Math.round((w - o) / a * 100) : 0,
      (w) => i ? `${w} K` : `${w} mireds`,
      `color-temp ${i ? "kelvin" : "mireds"} ${m ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${p}px; --ag-slider-radius: ${v}px;`,
      y
    );
  }
  _renderColorSlider(t) {
    const e = this.config.color_picker_type || "slider";
    if (e === "wheel")
      return this._renderColorPicker(t);
    if (e === "swatches") {
      const _ = this._getLiveHex(t).toLowerCase(), p = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : 32, v = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : 8, y = Number(this.config.color_slider_start_offset) || 0, w = Number(this.config.color_slider_end_offset) || 0, T = [
        y ? `margin-left: ${y}px;` : "",
        w ? `margin-right: ${w}px;` : ""
      ].filter(Boolean).join(" ");
      return k`
        <div class="swatches-palette-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${T}">
          ${Ct.map((c) => {
        const f = _ === c.hex.toLowerCase(), $ = () => {
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
                style="flex: 1; min-width: 28px; height: ${p}px; border-radius: ${v}px; background: ${c.hex}; border: ${f ? "2px solid #ffffff" : "1px solid rgba(0,0,0,0.2)"}; cursor: pointer; box-shadow: ${f ? "0 0 10px " + c.hex : "0 1px 3px rgba(0,0,0,0.3)"}; transition: transform 0.15s ease;"
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
    const i = this._getLiveHue(t), o = Math.max(0, Math.min(100, Math.round(i / 360 * 100))), r = e === "google" || this.config.slider_style === "google", n = r ? 42 : 12, a = r ? 21 : 6, d = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : this.config.slider_height ?? n, u = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : this.config.slider_border_radius ?? a, m = `hsl(${i}, 100%, 50%)`, l = k`
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
      o,
      "light",
      "turn_on",
      (_) => {
        const [p, v, y] = wt(_, 100);
        return { rgb_color: [p, v, y] };
      },
      (_) => Math.round(_ / 360 * 100),
      (_) => `${_}°`,
      `color-hue ${r ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${d}px; --ag-slider-radius: ${u}px; --color-hue-val: ${m};`,
      l
    );
  }
  _renderColorPicker(t) {
    const e = this._getLiveHex(t), i = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : this.config.slider_height ?? 36, o = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : this.config.slider_border_radius ?? 8;
    return k`
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
    const o = Number(t.attributes.step ?? 1), r = Number(t.state), n = isNaN(r) ? e : r, a = i - e, d = a > 0 ? Math.max(0, Math.min(100, Math.round((n - e) / a * 100))) : 0, u = (this.config.entity || "number").split(".")[0], m = t.attributes.unit_of_measurement ? ` ${t.attributes.unit_of_measurement}` : "", l = o.toString(), _ = l.includes(".") ? l.split(".")[1].length : 0;
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
      (p) => ({ value: _ > 0 ? Number(p.toFixed(_)) : Math.round(p) }),
      (p) => a > 0 ? Math.round((p - e) / a * 100) : 0,
      (p) => `${_ > 0 ? Number(p).toFixed(_) : Math.round(Number(p))}${m}`
    );
  }
  _renderClimateSlider(t) {
    const e = this.hass.config?.unit_system?.temperature === "°F" || this.hass.config?.unit_system?.temperature === "F", i = e ? "°F" : "°C", o = e ? 60 : 16, r = e ? 85 : 30, n = t.attributes.min_temp ?? o, a = t.attributes.max_temp ?? r, d = t.attributes.target_temp_step ?? t.attributes.target_temperature_step ?? (e ? 1 : 0.5), u = t.attributes.target_temp_low !== void 0 && t.attributes.target_temp_high !== void 0, m = t.attributes.temperature ?? t.attributes.target_temp_low ?? t.attributes.target_temp_high ?? n, l = a - n, _ = l > 0 ? Math.max(0, Math.min(100, Math.round((m - n) / l * 100))) : 0;
    return this._renderGenericSlider(
      "climate",
      "Temperature",
      n,
      a,
      d,
      m,
      _,
      "climate",
      "set_temperature",
      (p) => u ? { target_temp_low: p, target_temp_high: Math.min(a, p + (e ? 4 : 2)) } : { temperature: p },
      (p) => l > 0 ? Math.round((p - n) / l * 100) : 0,
      (p) => `${p}${i}`,
      "climate-temp",
      "",
      `${m}${i}`
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
    const n = e || this.hass.states[this.config.entity || ""], a = t || this.config.entity || "", d = n?.attributes?.volume_level !== void 0 || n?.entity_id?.startsWith("media_player."), u = n?.attributes?.percentage !== void 0 || n?.entity_id?.startsWith("fan."), m = n?.attributes?.current_position !== void 0 || n?.entity_id?.startsWith("cover.");
    let l = 0, _ = 0, p = 255, v = "1", y = "turn_on", w = "light", T = "brightness";
    d ? (l = n?.attributes?.volume_level ?? 0, p = 1, v = "0.01", y = "set_volume_level", w = "media_player", T = "volume_level") : u ? (l = n?.attributes?.percentage ?? 0, p = 100, v = "1", y = "set_percentage", w = "fan", T = "percentage") : m ? (l = n?.attributes?.current_position ?? 0, p = 100, v = "1", y = "set_cover_position", w = "cover", T = "position") : l = n?.attributes?.brightness ?? 0;
    const c = Math.round(p === 1 ? l * 100 : p === 100 ? l : l / 255 * 100);
    return i === "slider" ? k`
        <div class="sub-button-slider-container ${r}" style="${o}" title="Level: ${c}%">
          <input type="range" 
                 min="${_}" 
                 max=${p} 
                 step=${v} 
                 .value=${l}
                 @pointerdown=${(f) => f.stopPropagation()}
                 @input=${(f) => {
      f.stopPropagation();
      const $ = parseFloat(f.target.value), C = Math.round(p === 1 ? $ * 100 : p === 100 ? $ : $ / 255 * 100), g = f.target.closest(".sub-button-slider-container");
      g && g.setAttribute("title", `Level: ${C}%`), this._throttledCall("sub_slider_" + a, () => {
        this.hass?.callService(w, y, { entity_id: a, [T]: $ });
      });
    }}
                 @change=${(f) => {
      f.stopPropagation();
      const $ = parseFloat(f.target.value);
      this.hass?.callService(w, y, { entity_id: a, [T]: $ });
    }} />
        </div>
      ` : k`
        <div class="sub-button-google-slider ${r}" style="${o} --slider-pct: ${c}%;" title="Level: ${c}%">
          <input type="range" 
                 min="${_}" 
                 max=${p} 
                 step=${v} 
                 .value=${l}
                 style="--slider-pct: ${c}%;"
                 @pointerdown=${(f) => f.stopPropagation()}
                 @input=${(f) => {
      f.stopPropagation();
      const $ = parseFloat(f.target.value), C = Math.round(p === 1 ? $ * 100 : p === 100 ? $ : $ / 255 * 100), g = f.target;
      requestAnimationFrame(() => {
        g.style.setProperty("--slider-pct", `${C}%`);
        const b = g.closest(".sub-button-google-slider");
        if (b) {
          b.style.setProperty("--slider-pct", `${C}%`), b.setAttribute("title", `Level: ${C}%`);
          const A = b.querySelector(".sub-slider-pct");
          A && (A.textContent = `${C}%`);
        }
      }), this._throttledCall("sub_slider_" + a, () => {
        this.hass?.callService(w, y, { entity_id: a, [T]: $ });
      });
    }}
                 @change=${(f) => {
      f.stopPropagation();
      const $ = parseFloat(f.target.value);
      this.hass?.callService(w, y, { entity_id: a, [T]: $ });
    }} />
          <span class="sub-slider-pct">${c}%</span>
        </div>
      `;
  }
  _renderSubColorPicker(t, e, i, o, r, n) {
    const a = e || this.hass.states[this.config.entity || ""], d = this._getLiveHex(a);
    return k`
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
        ${r ? k`<span class="sub-button-label" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${r}</span>` : S}
        ${n ? k`<span class="sub-button-state" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${n}</span>` : S}
      </div>
    `;
  }
  _renderSubButton(t, e, i, o = !0, r, n, a, d = "button", u, m = !1) {
    const l = t ? this.hass?.states[t] : this.hass?.states[this.config.entity || ""], _ = this._isEntityActive(l), p = i ? `color: ${i};` : "", v = o ? "" : "no-bg", y = i ? this._resolveColor(i) : void 0;
    if (d === "slider" || d === "google_slider") {
      const s = i ? `--primary-color: ${i}; --slider-color: ${i};` : "";
      return this._renderSubSlider(t, l, d, s, v);
    }
    let w;
    m && l && (w = this._getInfoContent("state", l));
    const T = (t || this.config.entity || "").split(".")[0];
    if (d === "color_picker" && (T === "light" || !t && this.config.entity?.startsWith("light.")))
      return this._renderSubColorPicker(t, l, p, v, r, w);
    let c = e, f = "", $ = _, C = "", g = r, b;
    if (n && n.action && n.action !== "none" && n.action !== "default")
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
          const h = this.hass?.config?.unit_system?.temperature === "°F" || this.hass?.config?.unit_system?.temperature === "F" ? 1 : 0.5, x = Number(l?.attributes?.temperature ?? l?.attributes?.target_temp_high ?? 20), E = Number(l?.attributes?.max_temp ?? 35), L = Math.min(E, x + h);
          c || (c = "mdi:thermometer-chevron-up"), f = `Temperature +${h}°`, g || (g = `+${h}°`), b = () => {
            this.hass?.callService("climate", "set_temperature", { entity_id: t || this.config.entity, temperature: L });
          };
          break;
        }
        case "temp_down": {
          const h = this.hass?.config?.unit_system?.temperature === "°F" || this.hass?.config?.unit_system?.temperature === "F" ? 1 : 0.5, x = Number(l?.attributes?.temperature ?? l?.attributes?.target_temp_low ?? 20), E = Number(l?.attributes?.min_temp ?? 10), L = Math.max(E, x - h);
          c || (c = "mdi:thermometer-chevron-down"), f = `Temperature -${h}°`, g || (g = `-${h}°`), b = () => {
            this.hass?.callService("climate", "set_temperature", { entity_id: t || this.config.entity, temperature: L });
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
          c || (c = "mdi:fan"), _ && (C = "anim-spin"), f = `Speed: ${s}%`, g || (g = s > 0 ? `${s}%` : "Off"), b = () => {
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
          c || (c = "mdi:creation"), $ = h !== "None" && h !== "off" && _, f = `Effect: ${h} -> Next: ${x}`, g || (g = h !== "None" ? h : "Effect"), b = () => {
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
          const s = l?.attributes?.effect_list || [], h = l?.attributes?.effect || "None", x = s.indexOf(h), E = x <= 0 ? s.length - 1 : x - 1, L = s.length > 0 ? s[E] : "None";
          c || (c = "mdi:arrow-left-bold-circle-outline"), f = `Previous Effect: ${L}`, g || (g = L), b = () => {
            s.length > 0 && this.hass?.callService("light", "turn_on", { entity_id: t || this.config.entity, effect: L });
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
            const h = Number(l?.state) || 0, x = Number(l?.attributes?.step) || 1, E = Number(l?.attributes?.max) || 100, L = Math.min(E, h + x);
            c || (c = "mdi:plus-circle-outline"), f = `Value +${x}`, g || (g = `+${x}`), b = () => {
              this.hass?.callService(s, "set_value", { entity_id: t || this.config.entity, value: L });
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
            const h = Number(l?.state) || 0, x = Number(l?.attributes?.step) || 1, E = Number(l?.attributes?.min) || 0, L = Math.max(E, h - x);
            c || (c = "mdi:minus-circle-outline"), f = `Value -${x}`, g || (g = `-${x}`), b = () => {
              this.hass?.callService(s, "set_value", { entity_id: t || this.config.entity, value: L });
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
          c || (c = l?.attributes?.icon || "mdi:checkbox-blank-circle"), f = r || (l?.attributes?.friendly_name ?? "");
          break;
        }
      }
    const A = (s) => {
      this._handleSubTap(s, t, n, u, b);
    };
    return k`
      <div 
        tabindex="0"
        data-ag-sub
        class="sub-button ${v}" 
        ?active=${$} 
        style="${p} ${$ && y && o ? `background: ${y}; color: #fff;` : ""}"
        title="${f}"
        @click=${A}
        @dblclick=${(s) => s.stopPropagation()}
        @keydown=${(s) => {
      (s.key === "Enter" || s.key === " ") && (s.preventDefault(), s.stopPropagation(), A(s));
    }}
        @pointerdown=${(s) => this._handleSubPointerDown(s, t, a)}
        @pointermove=${this._handleSubPointerMove}
        @pointerup=${this._handleSubPointerUp}
        @pointercancel=${this._handleSubPointerCancel}
        @contextmenu=${(s) => this._handleSubContextMenu(s, t, a)}>
        <ha-icon .icon=${c} class="${C}"></ha-icon>
        ${g ? k`<span class="sub-button-label">${g}</span>` : S}
        ${w ? k`<span class="sub-button-state">${w}</span>` : S}
      </div>
    `;
  }
  // --- STATIC STYLES ---
  static get styles() {
    return oi`
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
le([
  ct({ attribute: !1 })
], V.prototype, "hass", 2);
le([
  ct({ type: Boolean })
], V.prototype, "preview", 2);
le([
  dt()
], V.prototype, "config", 2);
le([
  dt()
], V.prototype, "_collapsed", 2);
le([
  li({ passive: !0 })
], V.prototype, "_handlePointerMove", 1);
le([
  li({ passive: !0 })
], V.prototype, "_handleSubPointerMove", 1);
V = le([
  Ri("antigravity-with-icon-card")
], V);
customElements.get("antigravity-with-icon-card") || customElements.define("antigravity-with-icon-card", V);
export {
  V as AntigravityWithIconCard,
  vo as CARD_VERSION
};
