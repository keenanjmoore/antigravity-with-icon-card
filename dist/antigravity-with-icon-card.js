const dt = globalThis, Tt = dt.ShadowRoot && (dt.ShadyCSS === void 0 || dt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Mt = Symbol(), Ht = /* @__PURE__ */ new WeakMap();
let oi = class {
  constructor(e, t, o) {
    if (this._$cssResult$ = !0, o !== Mt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Tt && e === void 0) {
      const o = t !== void 0 && t.length === 1;
      o && (e = Ht.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), o && Ht.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ai = (i) => new oi(typeof i == "string" ? i : i + "", void 0, Mt), ni = (i, ...e) => {
  const t = i.length === 1 ? i[0] : e.reduce((o, r, a) => o + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[a + 1], i[0]);
  return new oi(t, i, Mt);
}, vi = (i, e) => {
  if (Tt) i.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const o = document.createElement("style"), r = dt.litNonce;
    r !== void 0 && o.setAttribute("nonce", r), o.textContent = t.cssText, i.appendChild(o);
  }
}, Bt = Tt ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const o of e.cssRules) t += o.cssText;
  return ai(t);
})(i) : i;
const { is: yi, defineProperty: xi, getOwnPropertyDescriptor: wi, getOwnPropertyNames: Si, getOwnPropertySymbols: $i, getPrototypeOf: Ci } = Object, _t = globalThis, zt = _t.trustedTypes, ki = zt ? zt.emptyScript : "", Ti = _t.reactiveElementPolyfillSupport, it = (i, e) => i, ut = { toAttribute(i, e) {
  switch (e) {
    case Boolean:
      i = i ? ki : null;
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
} }, At = (i, e) => !yi(i, e), It = { attribute: !0, type: String, converter: ut, reflect: !1, useDefault: !1, hasChanged: At };
Symbol.metadata ??= Symbol("metadata"), _t.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let We = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = It) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const o = Symbol(), r = this.getPropertyDescriptor(e, o, t);
      r !== void 0 && xi(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, o) {
    const { get: r, set: a } = wi(this.prototype, e) ?? { get() {
      return this[t];
    }, set(n) {
      this[t] = n;
    } };
    return { get: r, set(n) {
      const c = r?.call(this);
      a?.call(this, n), this.requestUpdate(e, c, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? It;
  }
  static _$Ei() {
    if (this.hasOwnProperty(it("elementProperties"))) return;
    const e = Ci(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(it("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(it("properties"))) {
      const t = this.properties, o = [...Si(t), ...$i(t)];
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
      for (const r of o) t.unshift(Bt(r));
    } else e !== void 0 && t.push(Bt(e));
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
    return vi(e, this.constructor.elementStyles), e;
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
      const a = (o.converter?.toAttribute !== void 0 ? o.converter : ut).toAttribute(t, o.type);
      this._$Em = e, a == null ? this.removeAttribute(r) : this.setAttribute(r, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const o = this.constructor, r = o._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const a = o.getPropertyOptions(r), n = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : ut;
      this._$Em = r;
      const c = n.fromAttribute(t, a.type);
      this[r] = c ?? this._$Ej?.get(r) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, t, o, r = !1, a) {
    if (e !== void 0) {
      const n = this.constructor;
      if (r === !1 && (a = this[e]), o ??= n.getPropertyOptions(e), !((o.hasChanged ?? At)(a, t) || o.useDefault && o.reflect && a === this._$Ej?.get(e) && !this.hasAttribute(n._$Eu(e, o)))) return;
      this.C(e, t, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: o, reflect: r, wrapped: a }, n) {
    o && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, n ?? t ?? this[e]), a !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || o || (t = void 0), this._$AL.set(e, t)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [r, a] of this._$Ep) this[r] = a;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [r, a] of o) {
        const { wrapped: n } = a, c = this[r];
        n !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, a, c);
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
We.elementStyles = [], We.shadowRootOptions = { mode: "open" }, We[it("elementProperties")] = /* @__PURE__ */ new Map(), We[it("finalized")] = /* @__PURE__ */ new Map(), Ti?.({ ReactiveElement: We }), (_t.reactiveElementVersions ??= []).push("2.1.2");
const Pt = globalThis, Ft = (i) => i, pt = Pt.trustedTypes, Ot = pt ? pt.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, si = "$lit$", ae = `lit$${Math.random().toFixed(9).slice(2)}$`, li = "?" + ae, Mi = `<${li}>`, $e = document, rt = () => $e.createComment(""), ot = (i) => i === null || typeof i != "object" && typeof i != "function", Et = Array.isArray, Ai = (i) => Et(i) || typeof i?.[Symbol.iterator] == "function", yt = `[ 	
\f\r]`, je = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ut = /-->/g, Gt = />/g, ye = RegExp(`>|${yt}(?:([^\\s"'>=/]+)(${yt}*=${yt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Vt = /'/g, Wt = /"/g, ci = /^(?:script|style|textarea|title)$/i, Pi = (i) => (e, ...t) => ({ _$litType$: i, strings: e, values: t }), w = Pi(1), Ce = Symbol.for("lit-noChange"), x = Symbol.for("lit-nothing"), Yt = /* @__PURE__ */ new WeakMap(), we = $e.createTreeWalker($e, 129);
function di(i, e) {
  if (!Et(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ot !== void 0 ? Ot.createHTML(e) : e;
}
const Ei = (i, e) => {
  const t = i.length - 1, o = [];
  let r, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = je;
  for (let c = 0; c < t; c++) {
    const d = i[c];
    let f, u, s = -1, p = 0;
    for (; p < d.length && (n.lastIndex = p, u = n.exec(d), u !== null); ) p = n.lastIndex, n === je ? u[1] === "!--" ? n = Ut : u[1] !== void 0 ? n = Gt : u[2] !== void 0 ? (ci.test(u[2]) && (r = RegExp("</" + u[2], "g")), n = ye) : u[3] !== void 0 && (n = ye) : n === ye ? u[0] === ">" ? (n = r ?? je, s = -1) : u[1] === void 0 ? s = -2 : (s = n.lastIndex - u[2].length, f = u[1], n = u[3] === void 0 ? ye : u[3] === '"' ? Wt : Vt) : n === Wt || n === Vt ? n = ye : n === Ut || n === Gt ? n = je : (n = ye, r = void 0);
    const g = n === ye && i[c + 1].startsWith("/>") ? " " : "";
    a += n === je ? d + Mi : s >= 0 ? (o.push(f), d.slice(0, s) + si + d.slice(s) + ae + g) : d + ae + (s === -2 ? c : g);
  }
  return [di(i, a + (i[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), o];
};
class at {
  constructor({ strings: e, _$litType$: t }, o) {
    let r;
    this.parts = [];
    let a = 0, n = 0;
    const c = e.length - 1, d = this.parts, [f, u] = Ei(e, t);
    if (this.el = at.createElement(f, o), we.currentNode = this.el.content, t === 2 || t === 3) {
      const s = this.el.content.firstChild;
      s.replaceWith(...s.childNodes);
    }
    for (; (r = we.nextNode()) !== null && d.length < c; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const s of r.getAttributeNames()) if (s.endsWith(si)) {
          const p = u[n++], g = r.getAttribute(s).split(ae), y = /([.?@])?(.*)/.exec(p);
          d.push({ type: 1, index: a, name: y[2], strings: g, ctor: y[1] === "." ? Li : y[1] === "?" ? Ri : y[1] === "@" ? Di : ft }), r.removeAttribute(s);
        } else s.startsWith(ae) && (d.push({ type: 6, index: a }), r.removeAttribute(s));
        if (ci.test(r.tagName)) {
          const s = r.textContent.split(ae), p = s.length - 1;
          if (p > 0) {
            r.textContent = pt ? pt.emptyScript : "";
            for (let g = 0; g < p; g++) r.append(s[g], rt()), we.nextNode(), d.push({ type: 2, index: ++a });
            r.append(s[p], rt());
          }
        }
      } else if (r.nodeType === 8) if (r.data === li) d.push({ type: 2, index: a });
      else {
        let s = -1;
        for (; (s = r.data.indexOf(ae, s + 1)) !== -1; ) d.push({ type: 7, index: a }), s += ae.length - 1;
      }
      a++;
    }
  }
  static createElement(e, t) {
    const o = $e.createElement("template");
    return o.innerHTML = e, o;
  }
}
function qe(i, e, t = i, o) {
  if (e === Ce) return e;
  let r = o !== void 0 ? t._$Co?.[o] : t._$Cl;
  const a = ot(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== a && (r?._$AO?.(!1), a === void 0 ? r = void 0 : (r = new a(i), r._$AT(i, t, o)), o !== void 0 ? (t._$Co ??= [])[o] = r : t._$Cl = r), r !== void 0 && (e = qe(i, r._$AS(i, e.values), r, o)), e;
}
class Ni {
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
    const { el: { content: t }, parts: o } = this._$AD, r = (e?.creationScope ?? $e).importNode(t, !0);
    we.currentNode = r;
    let a = we.nextNode(), n = 0, c = 0, d = o[0];
    for (; d !== void 0; ) {
      if (n === d.index) {
        let f;
        d.type === 2 ? f = new Ke(a, a.nextSibling, this, e) : d.type === 1 ? f = new d.ctor(a, d.name, d.strings, this, e) : d.type === 6 && (f = new Hi(a, this, e)), this._$AV.push(f), d = o[++c];
      }
      n !== d?.index && (a = we.nextNode(), n++);
    }
    return we.currentNode = $e, r;
  }
  p(e) {
    let t = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(e, o, t), t += o.strings.length - 2) : o._$AI(e[t])), t++;
  }
}
class Ke {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, o, r) {
    this.type = 2, this._$AH = x, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = o, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    e = qe(this, e, t), ot(e) ? e === x || e == null || e === "" ? (this._$AH !== x && this._$AR(), this._$AH = x) : e !== this._$AH && e !== Ce && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ai(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== x && ot(this._$AH) ? this._$AA.nextSibling.data = e : this.T($e.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: o } = e, r = typeof o == "number" ? this._$AC(e) : (o.el === void 0 && (o.el = at.createElement(di(o.h, o.h[0]), this.options)), o);
    if (this._$AH?._$AD === r) this._$AH.p(t);
    else {
      const a = new Ni(r, this), n = a.u(this.options);
      a.p(t), this.T(n), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = Yt.get(e.strings);
    return t === void 0 && Yt.set(e.strings, t = new at(e)), t;
  }
  k(e) {
    Et(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let o, r = 0;
    for (const a of e) r === t.length ? t.push(o = new Ke(this.O(rt()), this.O(rt()), this, this.options)) : o = t[r], o._$AI(a), r++;
    r < t.length && (this._$AR(o && o._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const o = Ft(e).nextSibling;
      Ft(e).remove(), e = o;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class ft {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, o, r, a) {
    this.type = 1, this._$AH = x, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = a, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = x;
  }
  _$AI(e, t = this, o, r) {
    const a = this.strings;
    let n = !1;
    if (a === void 0) e = qe(this, e, t, 0), n = !ot(e) || e !== this._$AH && e !== Ce, n && (this._$AH = e);
    else {
      const c = e;
      let d, f;
      for (e = a[0], d = 0; d < a.length - 1; d++) f = qe(this, c[o + d], t, d), f === Ce && (f = this._$AH[d]), n ||= !ot(f) || f !== this._$AH[d], f === x ? e = x : e !== x && (e += (f ?? "") + a[d + 1]), this._$AH[d] = f;
    }
    n && !r && this.j(e);
  }
  j(e) {
    e === x ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Li extends ft {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === x ? void 0 : e;
  }
}
class Ri extends ft {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== x);
  }
}
class Di extends ft {
  constructor(e, t, o, r, a) {
    super(e, t, o, r, a), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = qe(this, e, t, 0) ?? x) === Ce) return;
    const o = this._$AH, r = e === x && o !== x || e.capture !== o.capture || e.once !== o.once || e.passive !== o.passive, a = e !== x && (o === x || r);
    r && this.element.removeEventListener(this.name, this, o), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
let Hi = class {
  constructor(e, t, o) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    qe(this, e);
  }
};
const Bi = { I: Ke }, zi = Pt.litHtmlPolyfillSupport;
zi?.(at, Ke), (Pt.litHtmlVersions ??= []).push("3.3.3");
const Ii = (i, e, t) => {
  const o = t?.renderBefore ?? e;
  let r = o._$litPart$;
  if (r === void 0) {
    const a = t?.renderBefore ?? null;
    o._$litPart$ = r = new Ke(e.insertBefore(rt(), a), a, void 0, t ?? {});
  }
  return r._$AI(i), r;
};
const Nt = globalThis;
let Xe = class extends We {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ii(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Ce;
  }
};
Xe._$litElement$ = !0, Xe.finalized = !0, Nt.litElementHydrateSupport?.({ LitElement: Xe });
const Fi = Nt.litElementPolyfillSupport;
Fi?.({ LitElement: Xe });
(Nt.litElementVersions ??= []).push("4.2.2");
const Oi = (i) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(i, e);
  }) : customElements.define(i, e);
};
const Ui = { attribute: !0, type: String, converter: ut, reflect: !1, hasChanged: At }, Gi = (i = Ui, e, t) => {
  const { kind: o, metadata: r } = t;
  let a = globalThis.litPropertyMetadata.get(r);
  if (a === void 0 && globalThis.litPropertyMetadata.set(r, a = /* @__PURE__ */ new Map()), o === "setter" && ((i = Object.create(i)).wrapped = !0), a.set(t.name, i), o === "accessor") {
    const { name: n } = t;
    return { set(c) {
      const d = e.get.call(this);
      e.set.call(this, c), this.requestUpdate(n, d, i, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(n, void 0, i, c), c;
    } };
  }
  if (o === "setter") {
    const { name: n } = t;
    return function(c) {
      const d = this[n];
      e.call(this, c), this.requestUpdate(n, d, i, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function mt(i) {
  return (e, t) => typeof t == "object" ? Gi(i, e, t) : ((o, r, a) => {
    const n = r.hasOwnProperty(a);
    return r.constructor.createProperty(a, o), n ? Object.getOwnPropertyDescriptor(r, a) : void 0;
  })(i, e, t);
}
function gt(i) {
  return mt({ ...i, state: !0, attribute: !1 });
}
function ui(i) {
  return (e, t) => {
    const o = typeof e == "function" ? e : e[t];
    Object.assign(o, i);
  };
}
const Vi = { CHILD: 2 }, Wi = (i) => (...e) => ({ _$litDirective$: i, values: e });
let Yi = class {
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
const { I: Xi } = Bi, Xt = (i) => i, qt = () => document.createComment(""), et = (i, e, t) => {
  const o = i._$AA.parentNode, r = e === void 0 ? i._$AB : e._$AA;
  if (t === void 0) {
    const a = o.insertBefore(qt(), r), n = o.insertBefore(qt(), r);
    t = new Xi(a, n, i, i.options);
  } else {
    const a = t._$AB.nextSibling, n = t._$AM, c = n !== i;
    if (c) {
      let d;
      t._$AQ?.(i), t._$AM = i, t._$AP !== void 0 && (d = i._$AU) !== n._$AU && t._$AP(d);
    }
    if (a !== r || c) {
      let d = t._$AA;
      for (; d !== a; ) {
        const f = Xt(d).nextSibling;
        Xt(o).insertBefore(d, r), d = f;
      }
    }
  }
  return t;
}, xe = (i, e, t = i) => (i._$AI(e, t), i), qi = {}, Ki = (i, e = qi) => i._$AH = e, Ji = (i) => i._$AH, xt = (i) => {
  i._$AR(), i._$AA.remove();
};
const Kt = (i, e, t) => {
  const o = /* @__PURE__ */ new Map();
  for (let r = e; r <= t; r++) o.set(i[r], r);
  return o;
}, Zi = Wi(class extends Yi {
  constructor(i) {
    if (super(i), i.type !== Vi.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(i, e, t) {
    let o;
    t === void 0 ? t = e : e !== void 0 && (o = e);
    const r = [], a = [];
    let n = 0;
    for (const c of i) r[n] = o ? o(c, n) : n, a[n] = t(c, n), n++;
    return { values: a, keys: r };
  }
  render(i, e, t) {
    return this.dt(i, e, t).values;
  }
  update(i, [e, t, o]) {
    const r = Ji(i), { values: a, keys: n } = this.dt(e, t, o);
    if (!Array.isArray(r)) return this.ut = n, a;
    const c = this.ut ??= [], d = [];
    let f, u, s = 0, p = r.length - 1, g = 0, y = a.length - 1;
    for (; s <= p && g <= y; ) if (r[s] === null) s++;
    else if (r[p] === null) p--;
    else if (c[s] === n[g]) d[g] = xe(r[s], a[g]), s++, g++;
    else if (c[p] === n[y]) d[y] = xe(r[p], a[y]), p--, y--;
    else if (c[s] === n[y]) d[y] = xe(r[s], a[y]), et(i, d[y + 1], r[s]), s++, y--;
    else if (c[p] === n[g]) d[g] = xe(r[p], a[g]), et(i, r[s], r[p]), p--, g++;
    else if (f === void 0 && (f = Kt(n, g, y), u = Kt(c, s, p)), f.has(c[s])) if (f.has(c[p])) {
      const _ = u.get(n[g]), b = _ !== void 0 ? r[_] : null;
      if (b === null) {
        const l = et(i, r[s]);
        xe(l, a[g]), d[g] = l;
      } else d[g] = xe(b, a[g]), et(i, r[s], b), r[_] = null;
      g++;
    } else xt(r[p]), p--;
    else xt(r[s]), s++;
    for (; g <= y; ) {
      const _ = et(i, d[y + 1]);
      xe(_, a[g]), d[g++] = _;
    }
    for (; s <= p; ) {
      const _ = r[s++];
      _ !== null && xt(_);
    }
    return this.ut = n, Ki(i, d), Ce;
  }
});
var Jt, Zt;
(function(i) {
  i.language = "language", i.system = "system", i.comma_decimal = "comma_decimal", i.decimal_comma = "decimal_comma", i.space_comma = "space_comma", i.none = "none";
})(Jt || (Jt = {})), function(i) {
  i.language = "language", i.system = "system", i.am_pm = "12", i.twenty_four = "24";
}(Zt || (Zt = {}));
function Qi(i) {
  return i.substr(0, i.indexOf("."));
}
var ji = ["closed", "locked", "off"], nt = function(i, e, t, o) {
  o = o || {}, t = t ?? {};
  var r = new Event(e, { bubbles: o.bubbles === void 0 || o.bubbles, cancelable: !!o.cancelable, composed: o.composed === void 0 || o.composed });
  return r.detail = t, i.dispatchEvent(r), r;
}, tt = function(i) {
  nt(window, "haptic", i);
}, er = function(i, e, t) {
  t === void 0 && (t = !1), t ? history.replaceState(null, "", e) : history.pushState(null, "", e), nt(window, "location-changed", { replace: t });
}, tr = function(i, e, t) {
  t === void 0 && (t = !0);
  var o, r = Qi(e), a = r === "group" ? "homeassistant" : r;
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
  return i.callService(a, o, { entity_id: e });
}, ir = function(i, e) {
  var t = ji.includes(i.states[e].state);
  return tr(i, e, t);
}, rr = function(i, e, t, o) {
  if (o || (o = { action: "more-info" }), !o.confirmation || o.confirmation.exemptions && o.confirmation.exemptions.some(function(a) {
    return a.user === e.user.id;
  }) || (tt("warning"), confirm(o.confirmation.text || "Are you sure you want to " + o.action + "?"))) switch (o.action) {
    case "more-info":
      (t.entity || t.camera_image) && nt(i, "hass-more-info", { entityId: t.entity ? t.entity : t.camera_image });
      break;
    case "navigate":
      o.navigation_path && er(0, o.navigation_path);
      break;
    case "url":
      o.url_path && window.open(o.url_path);
      break;
    case "toggle":
      t.entity && (ir(e, t.entity), tt("success"));
      break;
    case "call-service":
      if (!o.service) return void tt("failure");
      var r = o.service.split(".", 2);
      e.callService(r[0], r[1], o.service_data, o.target), tt("success");
      break;
    case "fire-dom-event":
      nt(i, "ll-custom", o);
  }
}, or = function(i, e, t, o) {
  var r;
  o === "double_tap" && t.double_tap_action ? r = t.double_tap_action : o === "hold" && t.hold_action ? r = t.hold_action : o === "tap" && t.tap_action && (r = t.tap_action), rr(i, e, t, r);
};
const Ct = {
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
}, Qt = {
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
    generateStyles: (i) => {
      const e = i.glassmorphism_blur ?? 16, t = i.glassmorphism_opacity ?? 0.25;
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
    generateStyles: (i) => {
      const e = i.neumorphism_depth ?? 6;
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
    generateStyles: (i) => {
      const e = i.cyberpunk_glow ?? "#00f0ff";
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
}, Rt = class Rt {
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
    const o = e.card_padding_vertical ?? e.card_padding ?? 0, r = e.card_padding_horizontal ?? e.card_padding ?? 15, a = e.card_padding_top ?? o, n = e.card_padding_bottom ?? o, c = e.card_padding_left ?? r, d = e.card_padding_right ?? r, f = e.card_margin ?? -1, u = e.card_margin_vertical ?? f, s = e.card_margin_horizontal ?? f, p = e.card_margin_top ?? u, g = e.card_margin_bottom ?? u, y = e.card_margin_left ?? s, _ = e.card_margin_right ?? s;
    let b = "";
    (p !== void 0 || g !== void 0 || y !== void 0 || _ !== void 0) && (b = `margin: ${p ?? 0}px ${_ ?? 0}px ${g ?? 0}px ${y ?? 0}px;`);
    const l = e.border_radius ?? 12, h = e.slider_style === "google", m = e.slider_style === "full", v = h ? 42 : m ? 40 : 12, S = e.slider_height !== void 0 ? e.slider_height : v, $ = h ? 21 : m ? 0 : S / 2, T = e.slider_border_radius !== void 0 ? e.slider_border_radius : $, k = e.card_border_width ?? (e.card_border_color ? 1 : 0), C = e.card_border_style ?? "solid", F = k > 0 ? `border: ${k}px ${C} ${e.card_border_color || "var(--divider-color, rgba(150, 150, 150, 0.2))"};` : "", ne = e.card_width ? `width: ${e.card_width};` : "", se = e.card_max_width ? `max-width: ${e.card_max_width};` : "", Y = e.card_height ? `height: ${e.card_height};` : "", Te = e.card_min_height !== void 0 ? `min-height: ${e.card_min_height}px;` : "", Je = e.fill_container === !0 ? "height: 100%; width: 100%;" : "", le = e.overflow_hidden !== !1 ? "overflow: hidden;" : "overflow: visible;", Me = e.backdrop_blur !== void 0 ? `backdrop-filter: blur(${e.backdrop_blur}px); -webkit-backdrop-filter: blur(${e.backdrop_blur}px);` : "", Ae = e.card_opacity !== void 0 ? `opacity: ${e.card_opacity / 100};` : "", ce = e.transition_duration !== void 0 ? `transition: all ${e.transition_duration}ms ease;` : "", Pe = e.card_padding_vertical ?? 0, Ze = e.card_padding_horizontal ?? 0, Ee = 0, Ne = 0, Le = e.sub_button_padding ?? 6, Re = e.sub_button_container_padding ?? 0, z = e.sub_button_alignment ? `--ag-sub-button-alignment: ${e.sub_button_alignment};` : "--ag-sub-button-alignment: flex-end;", de = e.text_scrolling_speed ? `--ag-scroll-speed: ${e.text_scrolling_speed}s;` : "", ue = e.full_slider_opacity !== void 0 ? `--ag-full-slider-opacity: ${e.full_slider_opacity / 100};` : "", X = e.theme_preset || "default", te = Qt[X] || Qt.default, pe = te.generateStyles(e), De = [
      b,
      `border-radius: ${l}px;`,
      F,
      ne,
      se,
      Y,
      Te,
      Je,
      le,
      Me,
      Ae,
      ce,
      `--ag-card-padding: ${a}px ${d}px ${n}px ${c}px;`,
      `--ag-text-padding: ${Pe}px ${Ze}px;`,
      `--ag-features-padding: ${Ee}px ${Ne}px;`,
      `--ag-sub-button-padding: ${Le}px;`,
      `--ag-sub-button-container-padding: ${Re}px;`,
      `--ag-content-spacing: ${e.content_spacing ?? 6}px;`,
      `--ag-text-spacing: ${e.text_spacing ?? -1}px;`,
      `--ag-features-margin: ${e.features_margin ?? -3}px;`,
      `--ag-slider-spacing: ${e.slider_spacing ?? 6}px;`,
      `--ag-sub-button-spacing: ${e.sub_button_spacing ?? -4}px;`,
      `--ag-slider-height: ${S}px;`,
      `--ag-slider-radius: ${T}px;`,
      `--ag-text-alignment: ${e.text_alignment ?? "left"};`,
      `--ag-content-alignment: ${e.content_alignment ?? "flex-start"};`,
      z,
      de,
      ue,
      pe
    ].filter(Boolean).join(" ").trim(), Qe = [
      "ha-card",
      te.cssClass,
      `layout-${e.layout || "default"}`,
      e.card_layout === "large" ? "card-large" : "",
      `hover-${e.hover_effect ?? "glow"}`,
      `slider-style-${e.slider_style ?? "circle"}`,
      e.text_color_mode === "inverse" ? "text-color-mode-inverse" : ""
    ].filter(Boolean).join(" "), ie = Number(e.text_offset_x) || -28, He = Number(e.text_offset_y) || 2, P = `transform: translate(${ie}px, ${He}px);`, H = Number(e.primary_text_start_offset ?? e.primary_text_offset_x) || 8, he = Number(e.primary_text_end_offset) || 250, R = Number(e.primary_text_offset_y) || 0, _e = H !== 0 || R !== 0 ? `transform: translate(${H}px, ${R}px);` : "", re = H !== 0 || he !== 0 ? `margin-left: ${H}px; margin-right: ${he}px;` : "", q = `${_e} ${re}`.trim(), K = Number(e.secondary_text_start_offset ?? e.secondary_text_offset_x) || 8, D = Number(e.secondary_text_end_offset) || 250, fe = Number(e.secondary_text_offset_y) || 0, Be = K !== 0 || fe !== 0 ? `transform: translate(${K}px, ${fe}px);` : "", ze = K !== 0 || D !== 0 ? `margin-left: ${K}px; margin-right: ${D}px;` : "", Ie = `${Be} ${ze}`.trim(), Fe = Number(e.features_offset_x) || 0, Oe = Number(e.features_offset_y) || 0, Ue = Fe !== 0 || Oe !== 0 ? `transform: translate(${Fe}px, ${Oe}px);` : "", J = Number(e.slider_start_offset) || 0, I = Number(e.slider_end_offset) || 0, O = [
      J ? `margin-left: ${J}px !important;` : "",
      I ? `margin-right: ${I}px !important;` : ""
    ].filter(Boolean).join(" "), B = Number(e.color_temp_start_offset) || 0, M = Number(e.color_temp_end_offset) || 0, Z = [
      B ? `margin-left: ${B}px !important;` : "",
      M ? `margin-right: ${M}px !important;` : ""
    ].filter(Boolean).join(" "), U = Number(e.color_slider_start_offset) || 0, G = Number(e.color_slider_end_offset) || 0, oe = [
      U ? `margin-left: ${U}px !important;` : "",
      G ? `margin-right: ${G}px !important;` : ""
    ].filter(Boolean).join(" "), V = e.text_box_width ? `max-width: ${e.text_box_width}; width: ${e.text_box_width};` : "width: 100%; max-width: 100%;", me = e.font_family_primary ? `font-family: ${e.font_family_primary};` : "", ge = `font-size: ${e.font_size_primary ?? 14}px;`, be = `font-weight: ${e.font_weight_primary ?? "800"};`, Ge = `text-transform: ${e.text_transform_primary ?? "capitalize"};`, A = `letter-spacing: ${e.letter_spacing ?? -0.5}px;`, ve = `line-height: ${e.line_height ?? 1.1};`, st = `${me} ${ge} ${be} ${Ge} ${A} ${ve}`.trim(), _i = e.font_family_secondary ? `font-family: ${e.font_family_secondary};` : "", fi = `font-size: ${e.font_size_secondary ?? 15}px;`, mi = e.font_weight_secondary ? `font-weight: ${e.font_weight_secondary};` : "", gi = `text-transform: ${e.text_transform_secondary ?? "capitalize"};`, bi = `${_i} ${fi} ${mi} ${gi} ${A} ${ve}`.trim(), Dt = {
      staticCardStyles: De,
      staticCardClasses: Qe,
      textOffsetStyle: P,
      primaryTextOffsetStyle: q,
      secondaryTextOffsetStyle: Ie,
      featuresOffsetStyle: Ue,
      mainSliderMarginOffsets: O,
      colorTempMarginOffsets: Z,
      colorHueMarginOffsets: oe,
      textBoxWidth: V,
      primaryTextStyle: st,
      secondaryTextStyle: bi
    };
    return this._computedStylesCache.set(t, Dt), Dt;
  }
};
Rt._computedStylesCache = /* @__PURE__ */ new Map();
let kt = Rt;
class ar {
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
const ht = new ar();
class nr {
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
const Se = new nr(), sr = {
  preserveDrawingBuffer: !1,
  powerPreference: "low-power",
  alpha: !0,
  antialias: !1,
  depth: !1,
  stencil: !1
};
function lr(i, e = sr) {
  try {
    const t = i.getContext("webgl2", e) || i.getContext("webgl", e) || i.getContext("experimental-webgl", e);
    return t ? (t.getExtension("ANGLE_instanced_arrays"), t.getExtension("EXT_color_buffer_half_float"), t.getExtension("OES_texture_half_float"), i.addEventListener("webglcontextlost", (o) => {
      o.preventDefault(), console.warn("Antigravity WebGL context lost");
    }, { passive: !1 }), i.addEventListener("webglcontextrestored", () => {
      console.info("Antigravity WebGL context restored");
    }, { passive: !0 }), t) : null;
  } catch (t) {
    return console.warn("WebGL init failed:", t), null;
  }
}
function pi(i) {
  if (i)
    try {
      const e = i.getParameter(i.MAX_VERTEX_ATTRIBS) || 16;
      for (let t = 0; t < e; ++t)
        i.disableVertexAttribArray(t);
      i.bindBuffer(i.ARRAY_BUFFER, null), i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, null), i.bindRenderbuffer(i.RENDERBUFFER, null), i.bindFramebuffer(i.FRAMEBUFFER, null);
    } catch (e) {
      console.warn("WebGL cleanup warning:", e);
    }
}
async function hi() {
  const i = performance.now();
  let e = 0, t = 0;
  const o = (y, _) => {
    t++, y ? e++ : console.error(`❌ Assertion failed: ${_}`);
  }, r = ht.getMemorySnapshot();
  o(r.activeCardsCount >= 0, "Memory tracker active card count is non-negative");
  let a = !1;
  if (typeof document < "u") {
    const y = document.createElement("canvas"), _ = lr(y);
    _ && (a = !0, o(_.getParameter(_.MAX_VERTEX_ATTRIBS) > 0, "WebGL attributes available"), pi(_));
  }
  const n = 1e3;
  let c = 0;
  for (let y = 0; y < n; y++) {
    const _ = performance.now();
    c += performance.now() - _;
  }
  const d = Number((c / n).toFixed(4));
  o(d < 0.1, "Benchmark iteration takes under 0.1ms");
  const f = Se.isPowerSaveActive(), u = Se.getTargetFrameIntervalMs();
  o(u === 16 || u === 33, "Frame target is either 16ms or 33ms");
  const s = performance.now() - i, p = e === t, g = {
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    environment: typeof navigator < "u" ? navigator.userAgent : "Node/Test",
    renderBenchmarkMs: d,
    memoryUsageMB: r.usedJSHeapSizeMB || 0,
    powerSaveModeActive: f,
    webglSupported: a,
    assertionsPassed: e,
    totalAssertions: t,
    passed: p
  };
  return console.info(
    `%c 🧪 ANTIGRAVITY CI RUNNER %c Passed ${e}/${t} | Benchmark: ${d}ms/op | Duration: ${s.toFixed(2)}ms `,
    "color: white; background: #2e7d32; font-weight: 700; padding: 2px 6px; border-radius: 4px 0 0 4px;",
    "color: #2e7d32; background: #e8f5e9; font-weight: 700; padding: 2px 6px; border-radius: 0 4px 4px 0;"
  ), g;
}
typeof window < "u" && window.__RUN_CI__ && hi();
const cr = ni`
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
class dr {
  /**
   * Resolves display properties and default service execution for a sub-button action type.
   */
  static resolve(e, t, o, r, a, n, c, d, f) {
    if (f && f.action && f.action !== "none" && f.action !== "default")
      return {
        icon: a || r?.attributes?.icon || "mdi:checkbox-blank-circle",
        title: n || (r?.attributes?.friendly_name ?? ""),
        label: n,
        isActive: c ?? !1,
        animClass: "",
        defaultAction: void 0
      };
    const u = t || o || "";
    let s = a, p = "", g = c ?? !1, y = "", _ = n, b;
    switch (e) {
      case "play_pause": {
        const l = r?.state === "playing";
        g = l, s || (s = l ? "mdi:pause" : "mdi:play"), p = l ? "Pause" : "Play", b = (h) => {
          h?.callService("media_player", "media_play_pause", { entity_id: u });
        };
        break;
      }
      case "next": {
        s || (s = "mdi:skip-next"), p = "Next Track", b = (l) => {
          l?.callService("media_player", "media_next_track", { entity_id: u });
        };
        break;
      }
      case "previous": {
        s || (s = "mdi:skip-previous"), p = "Previous Track", b = (l) => {
          l?.callService("media_player", "media_previous_track", { entity_id: u });
        };
        break;
      }
      case "vol_up": {
        s || (s = "mdi:volume-plus"), p = "Volume +5%", _ || (_ = "+5%"), b = (l) => {
          l?.callService("media_player", "volume_up", { entity_id: u });
        };
        break;
      }
      case "vol_down": {
        s || (s = "mdi:volume-minus"), p = "Volume -5%", _ || (_ = "-5%"), b = (l) => {
          l?.callService("media_player", "volume_down", { entity_id: u });
        };
        break;
      }
      case "mute": {
        const l = r?.attributes?.is_volume_muted === !0;
        g = l, s || (s = l ? "mdi:volume-off" : "mdi:volume-high"), p = l ? "Unmute" : "Mute", b = (h) => {
          h?.callService("media_player", "volume_mute", { entity_id: u, is_volume_muted: !l });
        };
        break;
      }
      case "source": {
        const l = r?.attributes?.source || "", h = r?.attributes?.source_list || [], m = h.length > 0 ? h[(h.indexOf(l) + 1) % h.length] || h[0] : l;
        s || (s = "mdi:import"), p = `Source: ${l} -> ${m}`, _ || (_ = l || "Source"), b = (v) => {
          m && v?.callService("media_player", "select_source", { entity_id: u, source: m });
        };
        break;
      }
      case "sound_mode": {
        const l = r?.attributes?.sound_mode || "", h = r?.attributes?.sound_mode_list || [], m = h.length > 0 ? h[(h.indexOf(l) + 1) % h.length] || h[0] : l;
        s || (s = "mdi:surround-sound"), p = `Sound: ${l} -> ${m}`, _ || (_ = l || "Sound"), b = (v) => {
          m && v?.callService("media_player", "select_sound_mode", { entity_id: u, sound_mode: m });
        };
        break;
      }
      case "shuffle": {
        const l = r?.attributes?.shuffle === !0;
        g = l, s || (s = l ? "mdi:shuffle" : "mdi:shuffle-disabled"), p = l ? "Shuffle: On" : "Shuffle: Off", b = (h) => {
          h?.callService("media_player", "shuffle_set", { entity_id: u, shuffle: !l });
        };
        break;
      }
      case "repeat": {
        const l = r?.attributes?.repeat || "off", h = ["off", "all", "one"], m = h[(h.indexOf(l) + 1) % h.length] || "off";
        g = l !== "off", s || (s = l === "one" ? "mdi:repeat-once" : l === "all" ? "mdi:repeat" : "mdi:repeat-off"), p = `Repeat: ${l} -> ${m}`, _ || (_ = l), b = (v) => {
          v?.callService("media_player", "repeat_set", { entity_id: u, repeat: m });
        };
        break;
      }
      case "chime": {
        s || (s = "mdi:bell-ring-outline"), p = "Play Chime", b = (l) => {
          l?.callService("chime_tts", "say", { entity_id: u, message: "ding-dong" }).catch(() => {
            l?.callService("media_player", "media_play", { entity_id: u });
          });
        };
        break;
      }
      case "tts_announce": {
        s || (s = "mdi:bullhorn-variant-outline"), p = "Voice Announcement", b = (l) => {
          l?.callService("tts", "speak", { media_player_entity_id: u, message: "Attention: Test announcement" }).catch(() => {
            l?.callService("tts", "google_translate_say", { entity_id: u, message: "Attention: Test announcement" });
          });
        };
        break;
      }
      case "media_zone": {
        s || (s = "mdi:speaker-multiple"), p = "Group Speakers / Zone", b = (l) => {
          l?.callService("media_player", "join", { entity_id: u });
        };
        break;
      }
      case "media_preset": {
        s || (s = "mdi:radio-tower"), p = "Play Radio Stream / Preset", b = (l) => {
          l?.callService("media_player", "play_media", {
            entity_id: u,
            media_content_id: "http://stream.live.vc.bbcmedia.co.uk/bbc_radio_one",
            media_content_type: "music"
          });
        };
        break;
      }
      case "door_hold": {
        s || (s = "mdi:door-open"), p = "Hold Gate / Door Open", b = (l) => {
          l?.callService("cover", "open_cover", { entity_id: u });
        };
        break;
      }
      case "aux_heat": {
        const l = r?.attributes?.aux_heat === "on" || r?.attributes?.aux_heat === !0;
        g = l, s || (s = l ? "mdi:radiator" : "mdi:radiator-disabled"), p = l ? "Disable Aux Heat" : "Enable Aux Heat", b = (h) => {
          h?.callService("climate", "set_aux_heat", { entity_id: u, aux_heat: !l });
        };
        break;
      }
      case "cover_preset": {
        s || (s = "mdi:window-shutter"), p = "Go to Shading Position (50%)", b = (l) => {
          l?.callService("cover", "set_cover_position", { entity_id: u, position: 50 });
        };
        break;
      }
      case "temp_up": {
        const h = d === "°F" || d === "F" ? 1 : 0.5, m = Number(r?.attributes?.temperature ?? r?.attributes?.target_temp_high ?? 20), v = Number(r?.attributes?.max_temp ?? 35), S = Math.min(v, m + h);
        s || (s = "mdi:thermometer-chevron-up"), p = `Temperature +${h}°`, _ || (_ = `+${h}°`), b = ($) => {
          $?.callService("climate", "set_temperature", { entity_id: u, temperature: S });
        };
        break;
      }
      case "temp_down": {
        const h = d === "°F" || d === "F" ? 1 : 0.5, m = Number(r?.attributes?.temperature ?? r?.attributes?.target_temp_low ?? 20), v = Number(r?.attributes?.min_temp ?? 10), S = Math.max(v, m - h);
        s || (s = "mdi:thermometer-chevron-down"), p = `Temperature -${h}°`, _ || (_ = `-${h}°`), b = ($) => {
          $?.callService("climate", "set_temperature", { entity_id: u, temperature: S });
        };
        break;
      }
      case "fan_oscillate": {
        const l = r?.attributes?.oscillating === !0;
        g = l, s || (s = l ? "mdi:arrow-oscillating" : "mdi:fan-off"), p = l ? "Stop Oscillation" : "Start Oscillation", b = (h) => {
          h?.callService("fan", "oscillate", { entity_id: u, oscillating: !l });
        };
        break;
      }
      case "fan_direction": {
        const l = r?.attributes?.direction || "forward", h = l === "forward" ? "reverse" : "forward";
        g = l === "reverse", s || (s = l === "reverse" ? "mdi:rotate-left" : "mdi:rotate-right"), p = `Direction: ${l} -> ${h}`, _ || (_ = l), b = (m) => {
          m?.callService("fan", "set_direction", { entity_id: u, direction: h });
        };
        break;
      }
      case "humidifier_mode": {
        const l = r?.attributes?.mode || r?.state || "auto", h = r?.attributes?.available_modes || ["auto", "eco", "boost", "sleep"], m = h[(h.indexOf(l) + 1) % h.length] || "auto";
        s || (s = "mdi:water-sync"), p = `Humidifier Mode: ${l} -> ${m}`, _ || (_ = l), b = (v) => {
          v?.callService("humidifier", "set_mode", { entity_id: u, mode: m });
        };
        break;
      }
      case "siren_toggle": {
        const l = r?.state === "on";
        g = l, s || (s = l ? "mdi:bullhorn" : "mdi:bullhorn-outline"), p = l ? "Turn Off Siren" : "Trigger Siren", b = (h) => {
          h?.callService("siren", "toggle", { entity_id: u });
        };
        break;
      }
      case "open_close": {
        const l = r?.state === "open" || r?.state === "on" || r?.attributes?.current_position !== void 0 && r.attributes.current_position > 0;
        g = l;
        const h = r?.attributes?.device_class;
        s || (h === "garage" || h === "garage_door" ? s = l ? "mdi:garage-open" : "mdi:garage" : h === "blind" || h === "shade" ? s = l ? "mdi:blinds-open" : "mdi:blinds" : h === "curtain" ? s = l ? "mdi:curtains-open" : "mdi:curtains" : h === "damper" ? s = l ? "mdi:circle-slice-8" : "mdi:circle-outline" : s = l ? "mdi:window-shutter-open" : "mdi:window-shutter"), p = l ? "Close" : "Open", b = (m) => {
          m?.callService("cover", "toggle", { entity_id: u });
        };
        break;
      }
      case "stop": {
        s || (s = "mdi:stop"), p = "Stop", b = (l) => {
          l?.callService("cover", "stop_cover", { entity_id: u });
        };
        break;
      }
      case "open_tilt": {
        s || (s = "mdi:arrow-top-right-bottom-left"), p = "Open Tilt", b = (l) => {
          l?.callService("cover", "open_cover_tilt", { entity_id: u });
        };
        break;
      }
      case "close_tilt": {
        s || (s = "mdi:arrow-bottom-left-top-right"), p = "Close Tilt", b = (l) => {
          l?.callService("cover", "close_cover_tilt", { entity_id: u });
        };
        break;
      }
      case "stop_tilt": {
        s || (s = "mdi:stop"), p = "Stop Tilt", b = (l) => {
          l?.callService("cover", "stop_cover_tilt", { entity_id: u });
        };
        break;
      }
      case "lock_unlock": {
        const l = r?.state === "locked", h = r?.state === "jammed";
        g = !l, h && (y = "lock-jammed"), s || (s = h ? "mdi:lock-alert" : l ? "mdi:lock" : "mdi:lock-open-variant"), p = h ? "Jammed (Alert!)" : l ? "Unlock" : "Lock", b = (m) => {
          m?.callService("lock", l ? "unlock" : "lock", { entity_id: u });
        };
        break;
      }
      case "fan_speed": {
        const l = r?.attributes?.percentage ?? 0;
        s || (s = "mdi:fan"), c && (y = "anim-spin"), p = `Speed: ${l}%`, _ || (_ = l > 0 ? `${l}%` : "Off"), b = (h) => {
          let m = 33;
          l >= 90 ? m = 0 : l >= 60 ? m = 100 : l >= 30 && (m = 66), h?.callService("fan", "set_percentage", { entity_id: u, percentage: m });
        };
        break;
      }
      case "fan_mode": {
        const l = r?.attributes?.fan_mode || "auto", h = r?.attributes?.fan_modes || ["auto", "low", "medium", "high"], m = h[(h.indexOf(l) + 1) % h.length] || "auto";
        s || (s = "mdi:fan"), p = `Fan Mode: ${l} -> ${m}`, _ || (_ = l), b = (v) => {
          v?.callService("climate", "set_fan_mode", { entity_id: u, fan_mode: m });
        };
        break;
      }
      case "swing_mode": {
        const l = r?.attributes?.swing_mode || "off", h = r?.attributes?.swing_modes || ["off", "vertical", "horizontal", "both"], m = h[(h.indexOf(l) + 1) % h.length] || "off";
        s || (s = "mdi:arrow-split-horizontal"), p = `Swing: ${l} -> ${m}`, _ || (_ = l), b = (v) => {
          v?.callService("climate", "set_swing_mode", { entity_id: u, swing_mode: m });
        };
        break;
      }
      case "climate_preset": {
        const l = r?.attributes?.preset_mode || "none", h = r?.attributes?.preset_modes || ["eco", "comfort", "boost", "away", "sleep", "none"], m = h[(h.indexOf(l) + 1) % h.length] || "none";
        s || (l === "eco" ? s = "mdi:leaf" : l === "boost" ? s = "mdi:rocket-launch" : l === "away" ? s = "mdi:home-export-outline" : l === "sleep" ? s = "mdi:bed" : s = "mdi:thermostat"), p = `Preset: ${l} -> ${m}`, _ || (_ = l), b = (v) => {
          v?.callService("climate", "set_preset_mode", { entity_id: u, preset_mode: m });
        };
        break;
      }
      case "clean": {
        const l = r?.state === "cleaning";
        g = l, s || (s = l ? "mdi:pause" : "mdi:robot-vacuum"), p = l ? "Pause Vacuum" : "Start Vacuum", b = (h) => {
          h?.callService("vacuum", l ? "pause" : "start", { entity_id: u });
        };
        break;
      }
      case "dock": {
        s || (s = "mdi:home-import-outline"), p = "Return to Dock", b = (l) => {
          l?.callService("vacuum", "return_to_base", { entity_id: u });
        };
        break;
      }
      case "locate": {
        s || (s = "mdi:map-marker-question-outline"), p = "Locate", b = (l) => {
          l?.callService("vacuum", "locate", { entity_id: u });
        };
        break;
      }
      case "clean_zone":
      case "spot_clean": {
        s || (s = e === "clean_zone" ? "mdi:map-marker-radius-outline" : "mdi:target-variant"), p = e === "clean_zone" ? "Zone / Room Clean" : "Spot Clean Mode", b = (l) => {
          l?.callService("vacuum", "clean_spot", { entity_id: u });
        };
        break;
      }
      case "alarm_keypad": {
        s || (s = "mdi:dialpad"), p = "Open PIN Keypad";
        break;
      }
      case "valve_close": {
        const l = r?.state === "closed" || r?.state === "off";
        g = !l, s || (s = l ? "mdi:valve-closed" : "mdi:valve-open"), p = l ? "Valve is Closed" : "Emergency Close Valve", b = (h) => {
          u.split(".")[0] === "valve" ? h?.callService("valve", "close_valve", { entity_id: u }) : h?.callService("switch", "turn_off", { entity_id: u });
        };
        break;
      }
      case "pool_speed": {
        const l = r?.attributes?.percentage ?? 50, h = l > 50 ? 30 : 100;
        s || (s = "mdi:pool"), p = `Pool Speed: ${l}% -> ${h}%`, _ || (_ = `${l}%`), b = (m) => {
          m?.callService("fan", "set_percentage", { entity_id: u, percentage: h });
        };
        break;
      }
      case "vacuum_fan_speed": {
        const l = r?.attributes?.fan_speed || "standard", h = r?.attributes?.fan_speed_list || ["quiet", "standard", "strong", "turbo"], m = h[(h.indexOf(l) + 1) % h.length] || "standard";
        s || (s = "mdi:fan"), p = `Suction: ${l} -> ${m}`, _ || (_ = l), b = (v) => {
          v?.callService("vacuum", "set_fan_speed", { entity_id: u, fan_speed: m });
        };
        break;
      }
      case "counter_inc": {
        s || (s = "mdi:plus-box"), p = "Increment Counter (+1)", _ || (_ = "+1"), b = (l) => {
          l?.callService("counter", "increment", { entity_id: u });
        };
        break;
      }
      case "counter_dec": {
        s || (s = "mdi:minus-box"), p = "Decrement Counter (-1)", _ || (_ = "-1"), b = (l) => {
          l?.callService("counter", "decrement", { entity_id: u });
        };
        break;
      }
      case "hvac_mode": {
        const l = r?.state || "off", h = r?.attributes?.hvac_modes || ["off", "heat", "cool", "auto"], m = h[(h.indexOf(l) + 1) % h.length] || "auto";
        g = l !== "off", s || (l === "heat" ? s = "mdi:fire" : l === "cool" ? s = "mdi:snowflake" : l === "dry" ? s = "mdi:water-percent" : l === "fan_only" ? s = "mdi:fan" : l === "auto" ? s = "mdi:thermostat-auto" : s = "mdi:power"), p = `Mode: ${l} -> Next: ${m}`, _ || (_ = l), b = (v) => {
          v?.callService("climate", "set_hvac_mode", { entity_id: u, hvac_mode: m });
        };
        break;
      }
      case "light_effect":
      case "effect_next": {
        const l = r?.attributes?.effect_list || [], h = r?.attributes?.effect || "None", m = l.length > 0 ? l[(l.indexOf(h) + 1) % l.length] || l[0] : "None";
        s || (s = e === "light_effect" ? "mdi:creation" : "mdi:arrow-right-bold-circle-outline"), g = h !== "None" && h !== "off" && (c ?? !1), p = e === "light_effect" ? `Effect: ${h} -> Next: ${m}` : `Next Effect: ${m}`, _ || (_ = h !== "None" ? h : "Effect"), b = (v) => {
          l.length > 0 && v?.callService("light", "turn_on", { entity_id: u, effect: m });
        };
        break;
      }
      case "effect_prev": {
        const l = r?.attributes?.effect_list || [], h = r?.attributes?.effect || "None", m = l.indexOf(h), v = m <= 0 ? l.length - 1 : m - 1, S = l.length > 0 ? l[v] : "None";
        s || (s = "mdi:arrow-left-bold-circle-outline"), p = `Previous Effect: ${S}`, _ || (_ = S), b = ($) => {
          l.length > 0 && $?.callService("light", "turn_on", { entity_id: u, effect: S });
        };
        break;
      }
      case "white_mode": {
        s || (s = "mdi:white-balance-sunny"), p = "Set Neutral White (4000K)", b = (l) => {
          l?.callService("light", "turn_on", { entity_id: u, color_temp: 250 });
        };
        break;
      }
      case "brightness": {
        const l = r?.attributes?.brightness, h = l !== void 0 ? Math.round(l / 255 * 100) : 0;
        s || (s = "mdi:brightness-6"), p = `Brightness: ${h}%`, _ || (_ = `${h}%`), b = (m) => {
          let v = 25;
          h >= 85 ? v = 0 : h >= 60 ? v = 100 : h >= 35 ? v = 75 : h >= 10 && (v = 50), v === 0 ? m?.callService("light", "turn_off", { entity_id: u }) : m?.callService("light", "turn_on", { entity_id: u, brightness_pct: v });
        };
        break;
      }
      case "garage_toggle": {
        const l = r?.state === "open" || r?.state === "opening";
        g = l, s || (s = l ? "mdi:garage-open" : "mdi:garage"), p = l ? "Close Garage" : "Open Garage", b = (h) => {
          h?.callService("cover", "toggle", { entity_id: u });
        };
        break;
      }
      case "dim_up": {
        const l = u.split(".")[0];
        if (l === "number" || l === "input_number") {
          const h = Number(r?.state) || 0, m = Number(r?.attributes?.step) || 1, v = Number(r?.attributes?.max) || 100, S = Math.min(v, h + m);
          s || (s = "mdi:plus-circle-outline"), p = `Value +${m}`, _ || (_ = `+${m}`), b = ($) => {
            $?.callService(l, "set_value", { entity_id: u, value: S });
          };
        } else {
          const h = r?.attributes?.brightness ?? 0, m = Math.min(255, h + 26);
          s || (s = "mdi:brightness-5"), p = "Brightness +10%", _ || (_ = "+10%"), b = (v) => {
            v?.callService("light", "turn_on", { entity_id: u, brightness: m });
          };
        }
        break;
      }
      case "dim_down": {
        const l = u.split(".")[0];
        if (l === "number" || l === "input_number") {
          const h = Number(r?.state) || 0, m = Number(r?.attributes?.step) || 1, v = Number(r?.attributes?.min) || 0, S = Math.max(v, h - m);
          s || (s = "mdi:minus-circle-outline"), p = `Value -${m}`, _ || (_ = `-${m}`), b = ($) => {
            $?.callService(l, "set_value", { entity_id: u, value: S });
          };
        } else {
          const h = r?.attributes?.brightness ?? 0, m = Math.max(1, h - 26);
          s || (s = "mdi:brightness-4"), p = "Brightness -10%", _ || (_ = "-10%"), b = (v) => {
            v?.callService("light", "turn_on", { entity_id: u, brightness: m });
          };
        }
        break;
      }
      case "humidity_up": {
        const l = Number(r?.attributes?.humidity ?? r?.attributes?.target_humidity ?? 50), h = Math.min(100, l + 5);
        s || (s = "mdi:water-plus"), p = `Humidity +5% (${h}%)`, _ || (_ = "+5%"), b = (m) => {
          m?.callService("humidifier", "set_humidity", { entity_id: u, humidity: h });
        };
        break;
      }
      case "humidity_down": {
        const l = Number(r?.attributes?.humidity ?? r?.attributes?.target_humidity ?? 50), h = Math.max(0, l - 5);
        s || (s = "mdi:water-minus"), p = `Humidity -5% (${h}%)`, _ || (_ = "-5%"), b = (m) => {
          m?.callService("humidifier", "set_humidity", { entity_id: u, humidity: h });
        };
        break;
      }
      case "humidity_step_up": {
        const l = Number(r?.attributes?.humidity ?? r?.attributes?.target_humidity ?? 50), h = Math.min(100, l + 1);
        s || (s = "mdi:water-plus"), p = `Humidity +1% (${h}%)`, _ || (_ = "+1%"), b = (m) => {
          m?.callService("humidifier", "set_humidity", { entity_id: u, humidity: h });
        };
        break;
      }
      case "humidity_step_down": {
        const l = Number(r?.attributes?.humidity ?? r?.attributes?.target_humidity ?? 50), h = Math.max(0, l - 1);
        s || (s = "mdi:water-minus"), p = `Humidity -1% (${h}%)`, _ || (_ = "-1%"), b = (m) => {
          m?.callService("humidifier", "set_humidity", { entity_id: u, humidity: h });
        };
        break;
      }
      case "input_select": {
        const l = r?.state || "", h = r?.attributes?.options || [], m = h.length > 0 ? h[(h.indexOf(l) + 1) % h.length] || h[0] : l;
        s || (s = "mdi:form-dropdown"), p = `Option: ${l} -> Next: ${m}`, _ || (_ = l), b = (v) => {
          const S = u.split(".")[0] === "select" ? "select" : "input_select";
          v?.callService(S, "select_next", { entity_id: u });
        };
        break;
      }
      case "temp_warm": {
        s || (s = "mdi:weather-sunny"), p = "Warm White (2700K)", _ || (_ = "2700K"), b = (l) => {
          l?.callService("light", "turn_on", { entity_id: u, color_temp_kelvin: 2700 });
        };
        break;
      }
      case "temp_cool": {
        s || (s = "mdi:weather-sunset-up"), p = "Cool Daylight (6000K)", _ || (_ = "6000K"), b = (l) => {
          l?.callService("light", "turn_on", { entity_id: u, color_temp_kelvin: 6e3 });
        };
        break;
      }
      case "color_temp": {
        s || (s = "mdi:palette-swatch-outline"), p = "Color Temperature", _ || (_ = "Temp"), b = (l) => {
          const h = r?.attributes?.color_temp_kelvin || 3e3;
          let m = 2700;
          h < 3300 ? m = 4e3 : h < 5e3 ? m = 6e3 : m = 2700, l?.callService("light", "turn_on", { entity_id: u, color_temp_kelvin: m });
        };
        break;
      }
      case "button":
      default: {
        s || (s = r?.attributes?.icon || "mdi:checkbox-blank-circle"), p = n || (r?.attributes?.friendly_name ?? "");
        break;
      }
    }
    return {
      icon: s,
      title: p,
      label: _,
      isActive: g,
      animClass: y,
      defaultAction: b
    };
  }
}
const Q = /* @__PURE__ */ new Map(), jt = 200;
class ei {
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
      const o = Date.parse(e);
      if (!isNaN(o)) {
        const d = new Date(o);
        if (Q.size >= jt) {
          const f = Q.keys().next().value;
          f !== void 0 && Q.delete(f);
        }
        return Q.set(e, d), d;
      }
      let r = e.trim();
      r.includes(" ") && !r.includes("T") && (r = r.replace(" ", "T")), r.includes("T") && !r.endsWith("Z") && !/[+-]\d{2}:\d{2}$/.test(r) && !/[+-]\d{4}$/.test(r) && (r += "Z");
      const a = Number(r);
      let n;
      !isNaN(a) && r !== "" && !r.includes("T") ? n = new Date(a > 1e11 ? a : a * 1e3) : n = new Date(r);
      const c = isNaN(n.getTime()) ? null : n;
      if (c) {
        if (Q.size >= jt) {
          const d = Q.keys().next().value;
          d !== void 0 && Q.delete(d);
        }
        Q.set(e, c);
      }
      return c;
    }
    return null;
  }
  /**
   * Format a past timestamp to relative time string (compact or human-friendly).
   */
  static formatTimeAgo(e, t = !1, o) {
    const r = this.parseDate(e);
    if (!r) return "";
    const a = Math.max(0, ((o ?? Date.now()) - r.getTime()) / 1e3 | 0);
    if (a < 5) return t ? "< 5s" : "just now";
    if (a < 60) return t ? `${a}s` : `${a} seconds ago`;
    const n = a / 60 | 0;
    if (n < 60) return t ? `${n}m` : `${n} ${n === 1 ? "minute" : "minutes"} ago`;
    const c = n / 60 | 0;
    if (c < 24) return `${c}h${t ? "" : " ago"}`;
    const d = c / 24 | 0;
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
  static getInfoContent(e, t, o, r) {
    if (!t) return "";
    switch ((e || "").toLowerCase().replace(/_/g, "-")) {
      case "name":
        return o?.name || t.attributes?.friendly_name || o?.entity || "";
      case "state": {
        const n = (t.entity_id || "").split(".")[0];
        if (n === "timer") {
          if (t.state === "paused")
            return `${t.attributes?.remaining || "Paused"} (Paused)`;
          if (t.state === "active" && t.attributes?.finishes_at) {
            const c = Date.parse(t.attributes.finishes_at);
            if (!isNaN(c)) {
              const d = Math.max(0, Math.round((c - Date.now()) / 1e3)), f = Math.floor(d / 60), u = d % 60, s = Math.floor(f / 60), p = (f % 60).toString().padStart(2, "0"), g = u.toString().padStart(2, "0");
              return s > 0 ? `${s}:${p}:${g}` : `${p}:${g}`;
            }
          }
        }
        if (n === "binary_sensor") {
          const c = t.attributes?.device_class;
          return c === "tamper" && t.state === "on" ? "⚠️ Tamper Detected" : c === "problem" && t.state === "on" ? "⚠️ Problem Detected" : c === "smoke" && t.state === "on" ? "🔥 Smoke Detected!" : c === "gas" && t.state === "on" ? "⚠️ Gas Detected!" : c === "moisture" && t.state === "on" ? "💧 Moisture Detected!" : this.formatForDuration(t.last_changed);
        }
        if (n === "vacuum") {
          const c = t.state;
          let d = c;
          c === "cleaning" ? d = "🧹 Cleaning" : c === "docked" ? d = "🏠 Docked" : c === "returning" ? d = "🔄 Returning" : c === "paused" ? d = "⏸️ Paused" : c === "error" && (d = "⚠️ Error");
          const f = t.attributes?.battery_level;
          return f !== void 0 ? `${d} • 🔋${f}%` : d;
        }
        if (n === "weather") {
          const c = t.attributes?.temperature, d = r?.config?.unit_system?.temperature || "°F", f = (t.state || "").replace(/-/g, " ");
          return c !== void 0 ? `${c}${d} • ${f}` : f;
        }
        if (n === "climate") {
          const c = t.state || "", d = t.attributes?.current_temperature, f = t.attributes?.temperature ?? t.attributes?.target_temp_high, u = t.attributes?.unit_of_measurement || r?.config?.unit_system?.temperature || "°", s = t.attributes?.preset_mode, p = t.attributes?.hvac_action, y = [d !== void 0 && f !== void 0 ? `${d}${u} → ${f}${u}` : f !== void 0 ? `${f}${u}` : "", p, s].filter(Boolean).join(" • ");
          return y ? `${c} (${y})` : c;
        }
        if (n === "fan") {
          const c = t.attributes?.percentage, d = t.attributes?.oscillating ? "∿ Oscillating" : "", f = t.attributes?.direction === "reverse" ? "⟲ Reverse" : "";
          return [c !== void 0 ? `${c}%` : t.state, d, f].filter(Boolean).join(" • ");
        }
        if (n === "alarm_control_panel") {
          const c = t.state;
          if (c === "armed_home") return "🛡️ Armed Home";
          if (c === "armed_away") return "🛡️ Armed Away";
          if (c === "disarmed") return "Disarmed";
          if (c === "triggered") return "⚠️ TRIGGERED";
          if (c === "pending") return "⏳ Arming Pending...";
          if (c === "arming") return "⏳ Arming...";
        }
        if (n === "lock") {
          if (t.state === "locked") return "Locked";
          if (t.state === "unlocked") return "Unlocked";
          if (t.state === "jammed") return "Jammed (Alert!)";
          if (t.state === "locking") return "Locking...";
          if (t.state === "unlocking") return "Unlocking...";
        }
        if (n === "button" || n === "input_button")
          return "Press to run";
        if (n === "light" && t.state === "on") {
          const c = t.attributes?.brightness, d = c !== void 0 ? Math.round(c / 255 * 100) : 100;
          if (t.attributes?.color_temp_kelvin)
            return `${d}% • ${t.attributes.color_temp_kelvin}K`;
        }
        if (t.attributes?.device_class === "timestamp" || t.attributes?.device_class === "date" || typeof t.state == "string" && (t.state.includes("T") || t.state.match(/^\d{4}-\d{2}-\d{2}/)) && !isNaN(Date.parse(t.state))) {
          const c = this.formatRelativeTime(t.state);
          if (c) return c;
        }
        if (t.attributes?.display_precision !== void 0 && !isNaN(Number(t.state))) {
          const c = Number(t.attributes.display_precision), d = Number(t.state).toFixed(c), f = t.attributes?.unit_of_measurement ? ` ${t.attributes.unit_of_measurement}` : "";
          return `${d}${f}`;
        }
        if (typeof r?.formatEntityState == "function")
          try {
            return r.formatEntityState(t);
          } catch {
          }
        return `${t.state} ${t.attributes?.unit_of_measurement || ""}`.trim();
      }
      case "last-changed":
      case "last-changed-relative":
      case "relative-time": {
        const n = t.attributes?.last_triggered || t.last_changed;
        return this.formatForDuration(n);
      }
      case "last-updated":
      case "last-updated-relative":
        return this.formatForDuration(t.last_updated);
      case "last-triggered": {
        const n = t.attributes?.last_triggered || t.last_changed;
        return this.formatForDuration(n);
      }
      case "brightness": {
        const n = t.attributes?.brightness;
        return n !== void 0 ? `${Math.round(n / 255 * 100)}%` : "";
      }
      case "temperature": {
        const n = t.attributes?.temperature ?? t.attributes?.current_temperature, c = t.attributes?.unit_of_measurement || r?.config?.unit_system?.temperature || "°C";
        return n !== void 0 ? `${n} ${c}` : "";
      }
      case "humidity": {
        const n = t.attributes?.humidity ?? t.attributes?.current_humidity, c = t.attributes?.unit_of_measurement || "%";
        return n !== void 0 ? `${n}${c.startsWith("%") ? c : ` ${c}`}` : "";
      }
      case "battery": {
        const n = t.attributes?.battery_level ?? t.attributes?.battery ?? (t.attributes?.device_class === "battery" ? t.state : void 0);
        if (n !== void 0) {
          const c = Number(n);
          if (!isNaN(c)) {
            let d = "#4caf50";
            return c <= 20 ? d = "#f44336" : c <= 50 && (d = "#ff9800"), w`<span style="color: ${d}; font-weight: bold;">${c}%</span>`;
          }
          return `${n}%`;
        }
        return "";
      }
      case "none":
      default:
        return "";
    }
  }
}
const ur = 256;
Object.freeze(
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
const pr = /rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)/i, hr = /^\[\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\]$/;
class _r {
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
    let o = null;
    if (t.charCodeAt(0) === 35) {
      const a = t.substring(1), n = a.length;
      if (n === 3 || n === 4) {
        const c = parseInt(a[0] + a[0], 16), d = parseInt(a[1] + a[1], 16), f = parseInt(a[2] + a[2], 16);
        !isNaN(c) && !isNaN(d) && !isNaN(f) && (o = [c, d, f]);
      } else if (n >= 6) {
        const c = parseInt(a.substring(0, 2), 16), d = parseInt(a.substring(2, 4), 16), f = parseInt(a.substring(4, 6), 16);
        !isNaN(c) && !isNaN(d) && !isNaN(f) && (o = [c, d, f]);
      }
    } else if (t.startsWith("rgb")) {
      const a = t.match(pr);
      if (a) {
        const n = parseInt(a[1], 10), c = parseInt(a[2], 10), d = parseInt(a[3], 10);
        !isNaN(n) && !isNaN(c) && !isNaN(d) && (o = [
          Math.max(0, Math.min(255, n)),
          Math.max(0, Math.min(255, c)),
          Math.max(0, Math.min(255, d))
        ]);
      }
    } else if (t.charCodeAt(0) === 91 && t.charCodeAt(t.length - 1) === 93) {
      const a = t.match(hr);
      a && (o = [
        Math.max(0, Math.min(255, parseInt(a[1], 10))),
        Math.max(0, Math.min(255, parseInt(a[2], 10))),
        Math.max(0, Math.min(255, parseInt(a[3], 10)))
      ]);
    }
    if (this._cache.size >= ur) {
      let a = null, n = 1 / 0;
      for (const [c, d] of this._cacheAccessTimes)
        d < n && (n = d, a = c);
      a !== null && (this._cache.delete(a), this._cacheAccessTimes.delete(a));
    }
    const r = Date.now();
    return this._cache.set(t, o), this._cacheAccessTimes.set(t, r), o;
  }
  /**
   * Convert an [r, g, b] tuple to a 6-character hex string (#rrggbb).
   */
  rgbToHex(e) {
    if (!e || isNaN(e[0]) || isNaN(e[1]) || isNaN(e[2])) return "#000000";
    const t = Math.max(0, Math.min(255, e[0] | 0)).toString(16).padStart(2, "0"), o = Math.max(0, Math.min(255, e[1] | 0)).toString(16).padStart(2, "0"), r = Math.max(0, Math.min(255, e[2] | 0)).toString(16).padStart(2, "0");
    return `#${t}${o}${r}`;
  }
  /**
   * Extract Hue angle (0-360) from an RGB tuple with strict NaN and bounds guards.
   */
  rgbToHue(e, t, o) {
    if (isNaN(e) || isNaN(t) || isNaN(o)) return 0;
    e = Math.max(0, Math.min(255, e)) / 255, t = Math.max(0, Math.min(255, t)) / 255, o = Math.max(0, Math.min(255, o)) / 255;
    const r = Math.max(e, t, o), a = Math.min(e, t, o), n = r - a;
    let c = 0;
    return n === 0 ? 0 : (r === e ? c = (t - o) / n + (t < o ? 6 : 0) : r === t ? c = (o - e) / n + 2 : r === o && (c = (e - t) / n + 4), Math.round(c / 6 * 360) % 360);
  }
  /**
   * Convert HSV values (h: 0-360, s: 0-1, v: 0-1) to an RGB tuple.
   */
  hsvToRgb(e, t, o) {
    e = isNaN(e) ? 0 : Math.max(0, Math.min(360, e)), t = isNaN(t) ? 0 : Math.max(0, Math.min(1, t)), o = isNaN(o) ? 0 : Math.max(0, Math.min(1, o));
    const r = o * t, a = r * (1 - Math.abs(e / 60 % 2 - 1)), n = o - r;
    let c = 0, d = 0, f = 0;
    return e >= 0 && e < 60 ? (c = r, d = a) : e >= 60 && e < 120 ? (c = a, d = r) : e >= 120 && e < 180 ? (d = r, f = a) : e >= 180 && e < 240 ? (d = a, f = r) : e >= 240 && e < 300 ? (c = a, f = r) : e >= 300 && e <= 360 && (c = r, f = a), [
      Math.round((c + n) * 255),
      Math.round((d + n) * 255),
      Math.round((f + n) * 255)
    ];
  }
  /**
   * Convert Kelvin temperature to an approximation RGB tuple.
   */
  kelvinToRgb(e) {
    if (isNaN(e)) return [255, 255, 255];
    const t = Math.max(1e3, Math.min(4e4, e)) / 100;
    let o = 0, r = 0, a = 0;
    return t <= 66 ? o = 255 : o = Math.min(255, Math.max(0, 329.698727446 * Math.pow(t - 60, -0.1332047592))), t <= 66 ? r = Math.min(255, Math.max(0, 99.4708025861 * Math.log(t) - 161.1195681661)) : r = Math.min(255, Math.max(0, 288.1221695283 * Math.pow(t - 60, -0.0755148492))), t >= 66 ? a = 255 : t <= 19 ? a = 0 : a = Math.min(255, Math.max(0, 138.5177312231 * Math.log(t - 10) - 305.0447927307)), [Math.round(o), Math.round(r), Math.round(a)];
  }
  /**
   * Linear interpolation between two RGB tuples.
   */
  lerpRgb(e, t, o) {
    if (!e || !t) return [0, 0, 0];
    const r = isNaN(o) ? 0 : Math.max(0, Math.min(1, o));
    return [
      Math.round(e[0] + (t[0] - e[0]) * r),
      Math.round(e[1] + (t[1] - e[1]) * r),
      Math.round(e[2] + (t[2] - e[2]) * r)
    ];
  }
  /**
   * Convert HS values (h: 0-360, s: 0-100) to an RGB tuple.
   */
  hsToRgb(e, t) {
    e = (e % 360 + 360) % 360 / 360, t = Math.max(0, Math.min(100, t)) / 100;
    const o = 1, r = Math.floor(e * 6), a = e * 6 - r, n = o * (1 - t), c = o * (1 - a * t), d = o * (1 - (1 - a) * t);
    let f = 0, u = 0, s = 0;
    switch (r % 6) {
      case 0:
        f = o, u = d, s = n;
        break;
      case 1:
        f = c, u = o, s = n;
        break;
      case 2:
        f = n, u = o, s = d;
        break;
      case 3:
        f = n, u = c, s = o;
        break;
      case 4:
        f = d, u = n, s = o;
        break;
      case 5:
        f = o, u = n, s = c;
        break;
    }
    return [Math.round(f * 255), Math.round(u * 255), Math.round(s * 255)];
  }
}
const L = new _r(), W = L.parseColorToRgb.bind(L), lt = L.rgbToHex.bind(L), fr = L.rgbToHue.bind(L);
L.hsvToRgb.bind(L);
const wt = L.hsToRgb.bind(L), j = L.kelvinToRgb.bind(L), St = L.lerpRgb.bind(L), mr = [
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
], gr = [
  { k: 2200, label: "2200K", rgb: j(2200) },
  { k: 2700, label: "2700K", rgb: j(2700) },
  { k: 3e3, label: "3000K", rgb: j(3e3) },
  { k: 4e3, label: "4000K", rgb: j(4e3) },
  { k: 5e3, label: "5000K", rgb: j(5e3) },
  { k: 6500, label: "6500K", rgb: j(6500) }
];
var br = Object.defineProperty, Lt = (i, e, t, o) => {
  for (var r = void 0, a = i.length - 1, n; a >= 0; a--)
    (n = i[a]) && (r = n(e, t, r) || r);
  return r && br(e, t, r), r;
};
const vr = [
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
], yr = [
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
], xr = [
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
], wr = [
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
], Sr = [
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
], ti = [
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
function bt(i) {
  return [
    { name: `sub_button_${i}_entity`, selector: { entity: {} } },
    { name: `sub_button_${i}_type`, selector: { select: { options: [
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
const $r = bt(1), Cr = bt(2), kr = bt(3), Tr = bt(4), Mr = [
  { name: "tap_action", selector: { ui_action: {} } },
  { name: "hold_action", selector: { ui_action: {} } },
  { name: "double_tap_action", selector: { ui_action: {} } },
  { name: "custom_styles", selector: { text: { multiline: !0 } } }
], ii = {
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
function E(i) {
  if (typeof i != "string" || !i.trim()) return;
  const e = i.trim();
  if (ii[e.toLowerCase()])
    return ii[e.toLowerCase()];
  if (/^#[0-9a-fA-F]{3}$/.test(e))
    return `#${e[1]}${e[1]}${e[2]}${e[2]}${e[3]}${e[3]}`;
  if (/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(e)) {
    const r = e.split(",").map((a) => Math.max(0, Math.min(255, parseInt(a.trim(), 10))));
    return `#${r[0].toString(16).padStart(2, "0")}${r[1].toString(16).padStart(2, "0")}${r[2].toString(16).padStart(2, "0")}`;
  }
  const t = e.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/i);
  if (t) {
    const r = Math.max(0, Math.min(255, parseInt(t[1], 10))), a = Math.max(0, Math.min(255, parseInt(t[2], 10))), n = Math.max(0, Math.min(255, parseInt(t[3], 10)));
    return `#${r.toString(16).padStart(2, "0")}${a.toString(16).padStart(2, "0")}${n.toString(16).padStart(2, "0")}`;
  }
  const o = e.match(/hsla?\s*\(\s*([\d.]+)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?(?:\s*,\s*([\d.]+))?\s*\)/i);
  if (o) {
    const r = parseFloat(o[1]) / 360, a = parseFloat(o[2]) / 100, n = parseFloat(o[3]) / 100, c = (p, g, y) => (y < 0 && (y += 1), y > 1 && (y -= 1), y < 1 / 6 ? p + (g - p) * 6 * y : y < 1 / 2 ? g : y < 2 / 3 ? p + (g - p) * (2 / 3 - y) * 6 : p);
    let d, f, u;
    if (a === 0)
      d = f = u = n;
    else {
      const p = n < 0.5 ? n * (1 + a) : n + a - n * a, g = 2 * n - p;
      d = c(g, p, r + 1 / 3), f = c(g, p, r), u = c(g, p, r - 1 / 3);
    }
    const s = (p) => Math.round(Math.max(0, Math.min(255, p * 255))).toString(16).padStart(2, "0");
    return `#${s(d)}${s(f)}${s(u)}`;
  }
  return e;
}
function Ar(i) {
  const e = E(i);
  if (!e || !e.startsWith("#") || e.length < 7) return;
  const t = parseInt(e.slice(1, 3), 16), o = parseInt(e.slice(3, 5), 16), r = parseInt(e.slice(5, 7), 16);
  if (!(isNaN(t) || isNaN(o) || isNaN(r)))
    return [t, o, r];
}
const Pr = {
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
class vt extends Xe {
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
      o && t.bg_opacity === void 0 && (t.bg_opacity = Math.round(parseFloat(o[1]) * 100)), t.bg_color = E(t.bg_color);
    }
    t.card_border_color && (t.card_border_color = E(t.card_border_color)), t.icon_color && (t.icon_color = E(t.icon_color)), t.active_color && (t.active_color = E(t.active_color)), t.inactive_color && (t.inactive_color = E(t.inactive_color)), t.badge_color && (t.badge_color = E(t.badge_color)), t.slider_color && (t.slider_color = E(t.slider_color)), t.slider_track_color && (t.slider_track_color = E(t.slider_track_color)), t.text_color_primary && (t.text_color_primary = E(t.text_color_primary)), t.text_color_secondary && (t.text_color_secondary = E(t.text_color_secondary)), t.sub_button_1_color && (t.sub_button_1_color = E(t.sub_button_1_color)), t.sub_button_2_color && (t.sub_button_2_color = E(t.sub_button_2_color)), t.sub_button_3_color && (t.sub_button_3_color = E(t.sub_button_3_color)), t.sub_button_4_color && (t.sub_button_4_color = E(t.sub_button_4_color)), this._config = {
      ...Ct,
      ...t
    };
  }
  _computeLabel(e) {
    return Pr[e.name] || e.name;
  }
  _valueChanged(e, t) {
    let o = { ...this._config };
    const r = e.detail.value || {};
    for (const a of t)
      if (a.name)
        if (a.selector?.boolean !== void 0)
          r[a.name] !== void 0 ? o[a.name] = r[a.name] === !0 : delete o[a.name];
        else if (a.selector?.color_rgb !== void 0) {
          const n = r[a.name];
          Array.isArray(n) && n.length === 3 ? o[a.name] = `rgb(${n[0]}, ${n[1]}, ${n[2]})` : n !== void 0 && n !== "" ? o[a.name] = n : delete o[a.name];
        } else
          r[a.name] !== void 0 && r[a.name] !== "" ? o[a.name] = r[a.name] : delete o[a.name];
    nt(this, "config-changed", { config: o });
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
        const r = Ar(e[o]);
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
  _renderSection(e, t, o, r, a) {
    const n = !!this._openPanels[e];
    return w`
      <div class="custom-panel ${n ? "open" : ""}">
        <div class="panel-header" @click=${() => this._togglePanel(e)}>
          <div class="header-left">
            <span class="header-icon">${t}</span>
            <span class="header-title">${o}</span>
          </div>
          <ha-icon class="chevron-icon ${n ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        ${n ? w`
          <div class="panel-body">
            <ha-form
              .hass=${this.hass}
              .data=${a}
              .schema=${r}
              .computeLabel=${this._computeLabel}
              @value-changed=${(c) => this._valueChanged(c, r)}
            ></ha-form>
          </div>
        ` : x}
      </div>
    `;
  }
  _renderSubButtonPanel(e, t, o, r) {
    const a = `sub${e}`, n = !!this._openPanels[a];
    return w`
      <div class="sub-nested-panel ${n ? "open" : ""}">
        <div class="sub-panel-header" @click=${() => this._togglePanel(a)}>
          <div class="header-left">
            <span class="sub-dot ${t ? "active" : ""}"></span>
            <span class="sub-title">Sub-Button ${e} ${t ? `(${t})` : "• Inactive"}</span>
          </div>
          <ha-icon class="chevron-icon ${n ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        ${n ? w`
          <div class="sub-panel-body">
            <ha-form
              .hass=${this.hass}
              .data=${r}
              .schema=${o}
              .computeLabel=${this._computeLabel}
              @value-changed=${(c) => this._valueChanged(c, o)}
            ></ha-form>
          </div>
        ` : x}
      </div>
    `;
  }
  render() {
    if (!this.hass || !this._config) return w``;
    const e = this._transformConfigForForm(), t = this._config?.sub_button_1_entity || "", o = this._config?.sub_button_2_entity || "", r = this._config?.sub_button_3_entity || "", a = this._config?.sub_button_4_entity || "", n = !!this._openPanels.sub_buttons;
    return w`
      <div class="editor-container">
        <!-- 1. CORE & LAYOUT -->
        ${this._renderSection("core", "📦", "Core & Layout", vr, e)}

        <!-- 2. APPEARANCE & THEMING -->
        ${this._renderSection("appearance", "🎨", "Appearance & Theming", yr, e)}

        <!-- 3. SLIDERS & CONTROLS -->
        ${this._renderSection("controls", "🎛️", "Sliders & Interactive Controls", xr, e)}

        <!-- 4. SPACING, PADDING & SIZING -->
        ${this._renderSection("spacing", "📏", "Spacing, Padding & Sizing", wr, e)}

        <!-- 5. TYPOGRAPHY & LIVE SCROLLING -->
        ${this._renderSection("typography", "✍️", "Typography & Live Scrolling", Sr, e)}

        <!-- 6. CONSOLIDATED SUB-BUTTONS (1-4) -->
        <div class="custom-panel ${n ? "open" : ""}">
          <div class="panel-header" @click=${() => this._togglePanel("sub_buttons")}>
            <div class="header-left">
              <span class="header-icon">🔘</span>
              <span class="header-title">Sub-Buttons (1 – 4)</span>
            </div>
            <ha-icon class="chevron-icon ${n ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
          </div>
          ${n ? w`
            <div class="panel-body sub-buttons-master">
              <div class="section-subtitle">Global Sub-Button Layout</div>
              <ha-form
                .hass=${this.hass}
                .data=${e}
                .schema=${ti}
                .computeLabel=${this._computeLabel}
                @value-changed=${(c) => this._valueChanged(c, ti)}
              ></ha-form>
              
              <div class="sub-buttons-nested-list">
                ${this._renderSubButtonPanel(1, t, $r, e)}
                ${this._renderSubButtonPanel(2, o, Cr, e)}
                ${this._renderSubButtonPanel(3, r, kr, e)}
                ${this._renderSubButtonPanel(4, a, Tr, e)}
              </div>
            </div>
          ` : x}
        </div>

        <!-- 7. ACTIONS & CUSTOM STYLESHEET -->
        ${this._renderSection("actions", "⚡", "Actions & Scoped CSS", Mr, e)}
      </div>
    `;
  }
  static get styles() {
    return ni`
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
Lt([
  mt({ attribute: !1 })
], vt.prototype, "hass");
Lt([
  gt()
], vt.prototype, "_config");
Lt([
  gt()
], vt.prototype, "_openPanels");
customElements.get("antigravity-with-icon-card-editor") || customElements.define("antigravity-with-icon-card-editor", vt);
var Er = Object.defineProperty, Nr = Object.getOwnPropertyDescriptor, ke = (i, e, t, o) => {
  for (var r = o > 1 ? void 0 : o ? Nr(e, t) : e, a = i.length - 1, n; a >= 0; a--)
    (n = i[a]) && (r = (o ? n(e, t, r) : n(r)) || r);
  return o && r && Er(e, t, r), r;
};
typeof window < "u" && (window.runAntigravityCI = hi, window.antigravityMemoryReport = () => ht.logStatus(), window.antigravityPowerStatus = () => Se.isPowerSaveActive());
const Lr = "145";
console.info(
  `%c 🚀 ANTIGRAVITY-CARD (WITH-ICON) %c v${Lr} `,
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
let Ye = Date.now();
typeof window < "u" && !window.__AG_RESUME_LISTENER_ATTACHED__ && (window.__AG_RESUME_LISTENER_ATTACHED__ = !0, window.addEventListener("focus", () => {
  Ye = Date.now();
}, { passive: !0 }), document.addEventListener("visibilitychange", () => {
  document.visibilityState === "visible" && (Ye = Date.now());
}, { passive: !0 }));
const Rr = /* @__PURE__ */ new Set([
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
]), Dr = /* @__PURE__ */ new Set([
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
]), Hr = /* @__PURE__ */ new Set(["hs", "xy", "rgb", "rgbw", "rgbww"]), Br = /* @__PURE__ */ new Set([
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
]), zr = /^\d+\s*,\s*\d+\s*,\s*\d+$/, Ir = /^\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+$/;
function $t(i) {
  return `rgb(${i[0]}, ${i[1]}, ${i[2]})`;
}
const ct = Object.freeze({
  enabled: !1,
  activeFade: !1,
  currentColor: "",
  progressPct: 0,
  remainingSeconds: 0,
  currentStage: 0,
  stageLabel: ""
});
function N(i, e = !0) {
  if (!(!e || typeof window > "u"))
    try {
      if (tt(i), typeof window < "u" && window.dispatchEvent(new CustomEvent("haptic", { detail: i, bubbles: !0, composed: !0 })), typeof navigator < "u" && "vibrate" in navigator && typeof navigator.vibrate == "function") {
        let t = 6;
        i === "heavy" ? t = 20 : i === "medium" ? t = 12 : i === "success" ? t = [40, 40, 80] : i === "warning" ? t = [50, 30, 50] : i === "error" && (t = [50, 100, 50]), navigator.vibrate(t);
      }
    } catch {
    }
}
const Ve = /* @__PURE__ */ new Map(), ri = 250;
function Fr(i) {
  if (!i) return "";
  const e = Ve.get(i);
  if (e !== void 0) return e;
  const t = i.trim();
  if (!t)
    return Ve.set(i, ""), "";
  let o = t;
  if (t.startsWith("#") || t.startsWith("rgb") || t.startsWith("hsl") || t.startsWith("var(") ? o = t : zr.test(t) ? o = `rgb(${t})` : Ir.test(t) ? o = `rgba(${t})` : t.toLowerCase() === "state" ? o = "var(--state-icon-color, var(--primary-color))" : Dr.has(t.toLowerCase()) && (o = `var(--${t.toLowerCase()}-color, ${t.toLowerCase()})`), Ve.size >= ri) {
    const r = Math.floor(ri / 4), a = Ve.keys();
    for (let n = 0; n < r; n++) {
      const c = a.next().value;
      c !== void 0 && Ve.delete(c);
    }
  }
  return Ve.set(i, o), o;
}
let ee = class extends Xe {
  constructor() {
    super(...arguments), this._previousLiveRgb = null, this._currentLiveRgb = null, this._lastTrackedState = null, this.preview = !1, this._collapsed = !0, this._holdTimer = null, this._held = !1, this._moved = !1, this._tapTimer = null, this._throttleMap = /* @__PURE__ */ new Map(), this._startX = 0, this._startY = 0, this._subHoldTimer = null, this._subHeld = !1, this._subMoved = !1, this._subStartX = 0, this._subStartY = 0, this._subTapTimerMap = /* @__PURE__ */ new Map(), this._monitoredEntities = [], this._powerUnsubscribe = null, this._gl = null, this._staticCardStyles = "", this._staticCardClasses = "", this._textOffsetStyle = "", this._iconOffsetStyle = "", this._featuresOffsetStyle = "", this._mainSliderMarginOffsets = "", this._colorTempMarginOffsets = "", this._colorHueMarginOffsets = "", this._textBoxWidth = "", this._primaryTextStyle = "", this._secondaryTextStyle = "", this._primaryTextOffsetStyle = "", this._secondaryTextOffsetStyle = "", this._iconShapeClass = "", this._iconAnimClass = "", this._iconContainerSize = 36, this._iconSize = 24, this._iconOpacityStyle = "", this._iconRotateStyle = "", this._fadeStaticConfig = null, this._relativeTimer = null, this._cachedSubButtons = null, this._intersectionObserver = null, this._cachedHasCollapsible = !1, this._mountTime = 0, this._pointerDownReceived = !1, this._pointerDownTime = 0, this._canceled = !1, this._activePointerId = null, this._subCanceled = !1, this._subPointerDownTime = 0, this._sliderStateMap = /* @__PURE__ */ new WeakMap(), this._onSliderPointerDown = (i) => {
      const e = i.currentTarget;
      if (!e) return;
      const o = e.closest(".slider-container, .sub-button-slider-container")?.querySelector(".slider-percent-badge, .sub-slider-pct"), r = Number(e.value) || 0, a = e.style.getPropertyValue("--slider-pct") || "", n = o?.textContent || "";
      this._sliderStateMap.set(e, {
        startX: i.clientX,
        startY: i.clientY,
        initialVal: r,
        initialPct: a,
        initialBadge: n,
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
          o < 6 && r < 6 && (this._revertSlider(e, t), N("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap"));
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
    return { ...Ct };
  }
  static async getConfigElement() {
    return document.createElement("antigravity-with-icon-card-editor");
  }
  setConfig(i) {
    if (!i)
      throw new Error("Invalid configuration");
    this.config = {
      ...Ct,
      ...i
    }, this._cachedSubButtons = null;
    const e = /* @__PURE__ */ new Set();
    if (this.config.entity && e.add(this.config.entity), this.config.sub_button_1_entity && e.add(this.config.sub_button_1_entity), this.config.sub_button_2_entity && e.add(this.config.sub_button_2_entity), this.config.sub_button_3_entity && e.add(this.config.sub_button_3_entity), this.config.sub_button_4_entity && e.add(this.config.sub_button_4_entity), this.config.tap_action?.target?.entity_id) {
      const t = this.config.tap_action.target.entity_id;
      typeof t == "string" ? e.add(t) : Array.isArray(t) && t.forEach((o) => e.add(o));
    }
    if (this.config.hold_action?.target?.entity_id) {
      const t = this.config.hold_action.target.entity_id;
      typeof t == "string" ? e.add(t) : Array.isArray(t) && t.forEach((o) => e.add(o));
    }
    this._monitoredEntities = Array.from(e), this._computeStaticStylesAndClasses();
  }
  shouldUpdate(i) {
    if (!this.config || !this.hass || i.has("config") || i.has("preview") || i.has("_collapsed")) return !0;
    const e = i.get("hass");
    if (!e || e.themes !== this.hass.themes || e.locale !== this.hass.locale || e.language !== this.hass.language || e.selectedTheme !== this.hass.selectedTheme)
      return !0;
    const t = this._monitoredEntities, o = t.length;
    for (let r = 0; r < o; r++) {
      const a = t[r];
      if (e.states[a] !== this.hass.states[a])
        return !0;
    }
    return !1;
  }
  _computeStaticStylesAndClasses() {
    if (!this.config) return;
    const i = this.config.card_padding_vertical ?? this.config.card_padding ?? 0, e = this.config.card_padding_horizontal ?? this.config.card_padding ?? 15, t = this.config.card_padding_top ?? i, o = this.config.card_padding_bottom ?? i, r = this.config.card_padding_left ?? e, a = this.config.card_padding_right ?? e, n = this.config.card_margin ?? -1, c = this.config.card_margin_vertical ?? n, d = this.config.card_margin_horizontal ?? n, f = this.config.card_margin_top ?? c, u = this.config.card_margin_bottom ?? c, s = this.config.card_margin_left ?? d, p = this.config.card_margin_right ?? d;
    let g = "";
    (f !== void 0 || u !== void 0 || s !== void 0 || p !== void 0) && (g = `margin: ${f ?? 0}px ${p ?? 0}px ${u ?? 0}px ${s ?? 0}px;`);
    const y = this.config.border_radius ?? 12, _ = this.config.slider_style === "google", b = this.config.slider_style === "full", l = _ ? 42 : b ? 40 : 12, h = this.config.slider_height !== void 0 ? this.config.slider_height : l, m = _ ? 21 : b ? 0 : h / 2, v = this.config.slider_border_radius !== void 0 ? this.config.slider_border_radius : m, S = this.config.card_border_width ?? (this.config.card_border_color ? 1 : 0), $ = this.config.card_border_style ?? "solid", T = S > 0 ? `border: ${S}px ${$} ${this._resolveColor(this.config.card_border_color) || "var(--divider-color, rgba(150, 150, 150, 0.2))"};` : "", k = this.config.card_width ? `width: ${this.config.card_width};` : "", C = this.config.card_max_width ? `max-width: ${this.config.card_max_width};` : "", F = this.config.card_height ? `height: ${this.config.card_height};` : "", ne = this.config.card_min_height !== void 0 ? `min-height: ${this.config.card_min_height}px;` : "", se = this.config.fill_container === !0 ? "height: 100%; width: 100%;" : "", Y = this.config.overflow_hidden !== !1 ? "overflow: hidden;" : "overflow: visible;", Te = this.config.backdrop_blur !== void 0 ? `backdrop-filter: blur(${this.config.backdrop_blur}px); -webkit-backdrop-filter: blur(${this.config.backdrop_blur}px);` : "", Je = this.config.card_opacity !== void 0 ? `opacity: ${this.config.card_opacity / 100};` : "", le = this.config.transition_duration !== void 0 ? `transition: all ${this.config.transition_duration}ms ease;` : "", Me = this.config.icon_padding !== void 0 ? `--ag-icon-padding: ${this.config.icon_padding}px;` : "", Ae = this.config.text_padding_vertical ?? this.config.text_padding ?? 0, ce = this.config.text_padding_horizontal ?? this.config.text_padding ?? 0, Pe = this.config.features_padding_vertical ?? this.config.features_padding ?? 0, Ze = this.config.features_padding_horizontal ?? this.config.features_padding ?? 0, Ee = this.config.sub_button_padding ?? 6, Ne = this.config.sub_button_container_padding ?? 0, Le = this.config.sub_button_alignment ? `--ag-sub-button-alignment: ${this.config.sub_button_alignment};` : "--ag-sub-button-alignment: flex-end;", Re = this.config.text_scrolling_speed ? `--ag-scroll-speed: ${this.config.text_scrolling_speed}s;` : "", z = this.config.full_slider_opacity !== void 0 ? `--ag-full-slider-opacity: ${this.config.full_slider_opacity / 100};` : "";
    this._staticCardStyles = [
      g,
      `border-radius: ${y}px;`,
      T,
      k,
      C,
      F,
      ne,
      se,
      Y,
      Te,
      Je,
      le,
      Me,
      `--ag-card-padding: ${t}px ${a}px ${o}px ${r}px;`,
      `--ag-text-padding: ${Ae}px ${ce}px;`,
      `--ag-features-padding: ${Pe}px ${Ze}px;`,
      `--ag-sub-button-padding: ${Ee}px;`,
      `--ag-sub-button-container-padding: ${Ne}px;`,
      `--ag-content-spacing: ${this.config.content_spacing ?? 6}px;`,
      `--ag-text-spacing: ${this.config.text_spacing ?? -1}px;`,
      `--ag-features-margin: ${this.config.features_margin ?? -3}px;`,
      `--ag-slider-spacing: ${this.config.slider_spacing ?? 6}px;`,
      `--ag-icon-margin: ${this.config.icon_margin ?? 0}px;`,
      `--ag-sub-button-spacing: ${this.config.sub_button_spacing ?? -4}px;`,
      `--ag-slider-height: ${h}px;`,
      `--ag-slider-radius: ${v}px;`,
      `--ag-badge-size: ${this.config.badge_size ?? 16}px;`,
      `--ag-badge-offset: ${this.config.badge_offset ?? -2}px;`,
      `--ag-text-alignment: ${this.config.text_alignment ?? "left"};`,
      `--ag-content-alignment: ${this.config.content_alignment ?? "flex-start"};`,
      Le,
      Re,
      z
    ].filter(Boolean).join(" "), this._staticCardClasses = [
      `layout-${this.config.layout}`,
      this.config.card_layout === "large" ? "card-large" : "",
      `theme-${this.config.theme_preset ?? "default"}`,
      `hover-${this.config.hover_effect ?? "glow"}`,
      `slider-style-${this.config.slider_style ?? "circle"}`,
      this.config.text_color_mode === "inverse" ? "text-color-mode-inverse" : ""
    ].filter(Boolean).join(" ");
    const de = this.config.text_offset_x !== void 0 ? Number(this.config.text_offset_x) : -28, ue = this.config.text_offset_y !== void 0 ? Number(this.config.text_offset_y) : 2;
    this._textOffsetStyle = de !== 0 || ue !== 0 ? `transform: translate(${de}px, ${ue}px);` : "";
    const X = Number(this.config.primary_text_start_offset ?? this.config.primary_text_offset_x ?? 8), te = Number(this.config.primary_text_end_offset ?? 250), pe = Number(this.config.primary_text_offset_y) || 0, De = X !== 0 || pe !== 0 ? `transform: translate(${X}px, ${pe}px);` : "", Qe = X !== 0 || te !== 0 ? `margin-left: ${X}px; margin-right: ${te}px;` : "";
    this._primaryTextOffsetStyle = `${De} ${Qe}`.trim();
    const ie = Number(this.config.secondary_text_start_offset ?? this.config.secondary_text_offset_x ?? 8), He = Number(this.config.secondary_text_end_offset ?? 250), P = Number(this.config.secondary_text_offset_y) || 0, H = ie !== 0 || P !== 0 ? `transform: translate(${ie}px, ${P}px);` : "", he = ie !== 0 || He !== 0 ? `margin-left: ${ie}px; margin-right: ${He}px;` : "";
    this._secondaryTextOffsetStyle = `${H} ${he}`.trim();
    const R = Number(this.config.icon_offset_x) || 0, _e = Number(this.config.icon_offset_y) || 0;
    this._iconOffsetStyle = R !== 0 || _e !== 0 ? `transform: translate(${R}px, ${_e}px);` : "";
    const re = Number(this.config.features_offset_x) || 0, q = Number(this.config.features_offset_y) || 0;
    this._featuresOffsetStyle = re !== 0 || q !== 0 ? `transform: translate(${re}px, ${q}px);` : "";
    const K = Number(this.config.slider_start_offset) || 0, D = Number(this.config.slider_end_offset) || 0;
    this._mainSliderMarginOffsets = [
      K ? `margin-left: ${K}px !important;` : "",
      D ? `margin-right: ${D}px !important;` : ""
    ].filter(Boolean).join(" ");
    const fe = Number(this.config.color_temp_start_offset) || 0, Be = Number(this.config.color_temp_end_offset) || 0;
    this._colorTempMarginOffsets = [
      fe ? `margin-left: ${fe}px !important;` : "",
      Be ? `margin-right: ${Be}px !important;` : ""
    ].filter(Boolean).join(" ");
    const ze = Number(this.config.color_slider_start_offset) || 0, Ie = Number(this.config.color_slider_end_offset) || 0;
    this._colorHueMarginOffsets = [
      ze ? `margin-left: ${ze}px !important;` : "",
      Ie ? `margin-right: ${Ie}px !important;` : ""
    ].filter(Boolean).join(" "), this._textBoxWidth = this.config.text_box_width ? `max-width: ${this.config.text_box_width}; width: ${this.config.text_box_width};` : "width: 100%; max-width: 100%;";
    const Fe = `text-transform: ${this.config.text_transform_primary ?? "capitalize"};`, Oe = `text-transform: ${this.config.text_transform_secondary ?? "capitalize"};`, Ue = `letter-spacing: ${this.config.letter_spacing ?? -0.5}px;`, J = `line-height: ${this.config.line_height ?? 1.1};`, I = this.config.font_weight_primary ?? "800";
    this._primaryTextStyle = `font-size: ${this.config.font_size_primary ?? 14}px; font-weight: ${I}; ${Fe} ${Ue} ${J}`, this._secondaryTextStyle = `font-size: ${this.config.font_size_secondary ?? 15}px; ${Oe} ${Ue} ${J}`, this._iconShapeClass = `icon-shape-${this.config.icon_shape || "circle"}`, this._iconAnimClass = `anim-${this.config.icon_animation || "none"}`, this._iconContainerSize = this.config.icon_container_size ?? (this.config.card_layout === "large" ? 48 : 36), this._iconSize = this.config.icon_size ?? 24, this._iconOpacityStyle = this.config.icon_opacity !== void 0 && this.config.icon_opacity < 100 ? `opacity: ${this.config.icon_opacity / 100};` : "", this._iconRotateStyle = this.config.icon_rotate && this.config.icon_rotate !== 0 ? `transform: rotate(${this.config.icon_rotate}deg);` : "";
    const O = this.config.entity, B = [];
    for (let M = 1; M <= 4; M++) {
      const Z = this.config[`sub_button_${M}_entity`], U = this.config[`sub_button_${M}_icon`], G = this.config[`sub_button_${M}_name`], oe = this.config[`sub_button_${M}_tap_action`], V = this.config[`sub_button_${M}_hold_action`], me = this.config[`sub_button_${M}_double_tap_action`], ge = this.config[`sub_button_${M}_type`], be = this.config[`sub_button_${M}_color`], Ge = this.config[`sub_button_${M}_show_background`], A = this.config[`sub_button_${M}_show_state`];
      if (!!(Z || U || G || ge && ge !== "button" || A)) {
        const st = Z || O;
        B.push(Object.freeze({
          key: `${st || "sub"}_${M}`,
          entity: st,
          type: ge || "button",
          icon: U,
          color: be,
          bg: Ge,
          name: G,
          showState: A === !0,
          tapAction: oe,
          holdAction: V,
          doubleTapAction: me
        }));
      }
    }
    if (this._cachedSubButtons = Object.freeze(B), this.config.fade_transition_enabled) {
      const M = Number(this.config.fade_stage_1_duration) || 60, Z = Number(this.config.fade_stage_2_duration) || 600, U = Number(this.config.fade_stage_3_duration) || 1800, G = W(this.config.fade_stage_1_color) || [255, 152, 0], oe = W(this.config.fade_stage_2_color) || [205, 220, 57], V = W(this.config.fade_stage_3_color);
      this._fadeStaticConfig = {
        d1: M,
        d2: Z,
        d3: U,
        totalDuration: M + Z + U,
        c1Rgb: G,
        c2Rgb: oe,
        c3Rgb: V,
        restingResult: Object.freeze({
          enabled: !0,
          activeFade: !1,
          currentColor: V ? $t(V) : "",
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
    const i = this.hass.states[this.config.entity];
    if (!i) {
      this._cachedHasCollapsible = !1;
      return;
    }
    const t = this.config.entity.split(".")[0] === "light", o = i.state === "on", r = this.config.hide_color_temp_when_off !== !1, a = this.config.hide_color_picker_when_off !== !1, n = this.config.hide_color_slider_when_off !== !1, c = i.attributes?.color_temp_kelvin ?? i.attributes?.color_temp, d = t && this.config.show_color_temp === !0 && (c !== void 0 || i.attributes?.supported_color_modes?.some((b) => ["color_temp"].includes(b))) && (!r || o), f = i.attributes?.supported_color_modes, u = Array.isArray(f) && f.some((b) => ["hs", "xy", "rgb", "rgbw", "rgbww"].includes(b)), s = this.config.color_picker_type !== "wheel", p = t && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && s) && u && (!n || o), g = t && this.config.show_color_picker === !0 && !s && u && (!a || o), y = d || p || g, _ = this._getSubButtons();
    this._cachedHasCollapsible = y || _.length > 0;
  }
  connectedCallback() {
    super.connectedCallback(), ht.registerCard(this), this._mountTime = Date.now(), this._pointerDownReceived = !1, this._powerUnsubscribe = Se.addChangeListener(() => {
      this._updatePowerSaveAttribute();
    }), this._updatePowerSaveAttribute(), this._setupRelativeTimer(), this._setupIntersectionObserver();
  }
  _updatePowerSaveAttribute() {
    Se.isPowerSaveActive(this.hass) ? this.setAttribute("power-save", "") : this.removeAttribute("power-save");
  }
  _setupIntersectionObserver() {
    typeof IntersectionObserver > "u" || this._intersectionObserver || (this._intersectionObserver = new IntersectionObserver((i) => {
      for (const e of i)
        e.isIntersecting ? this.removeAttribute("offscreen") : this.setAttribute("offscreen", "");
    }, { rootMargin: "200px 0px", threshold: 0 }), this._intersectionObserver.observe(this));
  }
  _setupRelativeTimer() {
    const i = this.config?.primary_info, e = this.config?.secondary_info, t = this.config?.entity, o = t ? t.split(".")[0] : "", r = (o === "binary_sensor" || o === "timer") && (i === "state" || e === "state"), a = this.config?.fade_transition_enabled === !0, n = t && this.hass ? this.hass.states[t] : null;
    let c = !1;
    if (a && n) {
      const f = this._calculateMultiStageFade(n);
      c = f.enabled && f.activeFade && f.progressPct < 100;
    }
    const d = c || r || i === "last-changed" || i === "last_changed" || i === "last-updated" || i === "last_updated" || i === "last-triggered" || e === "last-changed" || e === "last_changed" || e === "last-updated" || e === "last_updated" || e === "last-triggered";
    if (d && !this._relativeTimer) {
      let f = c ? 1e3 : 5e3;
      const u = n?.attributes?.last_triggered || n?.last_changed || n?.last_updated;
      if (u && !c && !r) {
        const s = this._parseDate(u);
        if (s) {
          const p = Math.max(0, (Date.now() - s.getTime()) / 1e3 | 0);
          p > 3600 ? f = 6e4 : p > 60 && (f = 15e3);
        }
      }
      Se.isPowerSaveActive(this.hass) && (f = Math.max(f, 1e4)), this._relativeTimer = setInterval(() => {
        if (!this.hasAttribute("offscreen") && this.style.display !== "none") {
          if (c && !this._isFadeActive()) {
            this._setupRelativeTimer();
            return;
          }
          this.requestUpdate();
        }
      }, f);
    } else !d && this._relativeTimer && (clearInterval(this._relativeTimer), this._relativeTimer = null);
  }
  _isFadeActive() {
    const i = this.config?.entity;
    if (!i || !this.hass) return !1;
    const e = this.hass.states[i];
    if (!e) return !1;
    const t = this._calculateMultiStageFade(e);
    return t.enabled && t.activeFade && t.progressPct < 100;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), ht.unregisterCard(this), this._powerUnsubscribe && (this._powerUnsubscribe(), this._powerUnsubscribe = null), this._gl && (pi(this._gl), this._gl = null), this._throttleMap.clear(), this._subTapTimerMap.forEach((i) => clearTimeout(i)), this._subTapTimerMap.clear(), this._intersectionObserver && (this._intersectionObserver.disconnect(), this._intersectionObserver = null), this._relativeTimer && (clearInterval(this._relativeTimer), this._relativeTimer = null), this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null), this._tapTimer && (clearTimeout(this._tapTimer), this._tapTimer = null), this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
  }
  firstUpdated(i) {
    super.firstUpdated(i);
  }
  updated(i) {
    if (super.updated(i), this._updateVisibility(), i.has("config") || i.has("_collapsed"))
      this._recomputeHasCollapsible(), this._setupRelativeTimer();
    else if (i.has("hass") && this.config?.entity) {
      const e = i.get("hass");
      (!e || e.states[this.config.entity] !== this.hass.states[this.config.entity]) && (this._recomputeHasCollapsible(), this._setupRelativeTimer());
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
    return i ? Rr.has(i.state) : !1;
  }
  _calculateMultiStageFade(i, e = "", t = "") {
    if (!this.config?.fade_transition_enabled || !i)
      return ct;
    const o = this._isEntityActive(i), r = this.config.fade_trigger ?? "on_inactive";
    if (!(r === "on_inactive" && !o || r === "on_active" && o || r === "both"))
      return ct;
    const n = o ? this._resolveColor(this.config.inactive_color) || t || "#4caf50" : this._resolveColor(this.config.active_color) || e || "#d60000", c = o ? this._resolveColor(this.config.active_color) || e || "#d60000" : this._resolveColor(this.config.inactive_color) || t || "#03b100", d = W(n) || [214, 0, 0], f = W(c) || [3, 177, 0], u = this._fadeStaticConfig, s = u?.d1 ?? (Number(this.config.fade_stage_1_duration) || 60), p = u?.d2 ?? (Number(this.config.fade_stage_2_duration) || 600), g = u?.d3 ?? (Number(this.config.fade_stage_3_duration) || 1800), y = u?.totalDuration ?? s + p + g;
    if (y <= 0)
      return ct;
    this._lastTrackedState !== null && this._lastTrackedState !== i.state && this._currentLiveRgb && this.config.fade_smooth_retrigger !== !1 && (this._previousLiveRgb = this._currentLiveRgb), this._lastTrackedState = i.state;
    const _ = this.config.fade_stage_1_pickup !== !1 && this._previousLiveRgb && this.config.fade_smooth_retrigger !== !1 ? this._previousLiveRgb : d, b = u?.c1Rgb ?? (W(this.config.fade_stage_1_color) || [255, 152, 0]), l = this.config.fade_stage_2_pickup !== !1 ? b : d, h = u?.c2Rgb ?? (W(this.config.fade_stage_2_color) || [205, 220, 57]), m = this.config.fade_stage_3_pickup !== !1 ? h : b, v = u?.c3Rgb ?? (W(this.config.fade_stage_3_color) || f), S = this._parseDate(i.attributes?.last_triggered || i.last_changed || i.last_updated);
    if (!S)
      return ct;
    const $ = Math.max(0, (Date.now() - S.getTime()) / 1e3);
    if ($ >= y)
      return this._currentLiveRgb = v, this._previousLiveRgb = null, u?.restingResult ? u.restingResult : {
        enabled: !0,
        activeFade: !1,
        currentColor: $t(v),
        progressPct: 100,
        remainingSeconds: 0,
        currentStage: 0,
        stageLabel: "Resting"
      };
    let T, k = 1, C = 0;
    const F = Math.max(0, Math.round(y - $));
    $ < s && s > 0 ? (k = 1, C = $ / s, T = St(_, b, C)) : $ < s + p && p > 0 ? (k = 2, C = ($ - s) / p, T = St(l, h, C)) : g > 0 ? (k = 3, C = ($ - s - p) / g, T = St(m, v, C)) : (k = 0, T = v), this._currentLiveRgb = T;
    const ne = Math.min(100, Math.round($ / y * 100)), se = $t(T);
    let Y = "";
    return F >= 60 ? Y = `${Math.ceil(F / 60)}m left` : Y = `${F}s left`, {
      enabled: !0,
      activeFade: !0,
      currentColor: se,
      progressPct: ne,
      remainingSeconds: F,
      currentStage: k,
      stageLabel: Y
    };
  }
  _resolveColor(i) {
    return Fr(i);
  }
  _parseDate(i) {
    return ei.parseDate(i);
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
    return ei.getInfoContent(i, e, this.config, this.hass);
  }
  _dispatchAction(i, e, t) {
    const o = t || this.config.entity, r = o ? o.split(".")[0] : "", a = Br.has(r);
    let n = e;
    if (n || (i === "double_tap" ? n = this.config.double_tap_action : i === "hold" ? n = this.config.hold_action || (a ? { action: "more-info" } : { action: "toggle" }) : this.config.tap_action && this.config.tap_action.action && this.config.tap_action.action !== "default" ? a && this.config.tap_action.action === "toggle" ? n = { action: "none" } : n = this.config.tap_action : n = a ? { action: "none" } : { action: "toggle" }), !(!n || n.action === "none")) {
      if (n.action === "more-info") {
        const c = n.entity || o;
        if (c) {
          this.dispatchEvent(new CustomEvent("hass-more-info", {
            detail: { entityId: c },
            bubbles: !0,
            composed: !0
          }));
          return;
        }
      }
      if (n.action === "toggle" && o) {
        if (a)
          return;
        const c = r === "lock" ? this._isEntityActive(this.hass?.states[o]) ? "lock" : "unlock" : "toggle", d = ["lock", "cover"].includes(r) ? r : r === "group" ? "homeassistant" : r;
        this.hass?.callService(d, c, { entity_id: o });
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
        const [c, d] = n.service.split(".", 2);
        this.hass?.callService(c, d, n.data || n.service_data || {}, n.target);
        return;
      }
      a && (!n.action || n.action === "toggle") || or(this, this.hass, { ...this.config, entity: o }, i);
    }
  }
  _handleTap(i) {
    if (i.stopPropagation(), this._isSubElement(i)) return;
    if (Date.now() - this._mountTime < 1500 || Date.now() - Ye < 800) {
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
    const t = (this.config.collapse_controls_trigger || "hold") === "double_tap";
    if (!(t || this.config.double_tap_action && this.config.double_tap_action.action !== "none")) {
      N("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap");
      return;
    }
    if (this._tapTimer) {
      clearTimeout(this._tapTimer), this._tapTimer = null, N("medium", this.config.haptic_feedback !== !1), t && this._hasCollapsible() && (this._collapsed = !this._collapsed), this._dispatchAction("double_tap");
      return;
    }
    this._tapTimer = setTimeout(() => {
      this._tapTimer = null, N("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap");
    }, 250);
  }
  _handleKeyDown(i) {
    this._isSubElement(i) || Date.now() - this._mountTime < 1500 || Date.now() - Ye < 800 || (i.key === "Enter" || i.key === " ") && (i.preventDefault(), N("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap"));
  }
  _handleContextMenu(i) {
    if (i.preventDefault(), i.stopPropagation(), Date.now() - this._mountTime < 1500 || Date.now() - Ye < 800 || this._held) return;
    N("medium", this.config.haptic_feedback !== !1), (this.config.collapse_controls_trigger || "hold") === "hold" && this._hasCollapsible() ? this._collapsed = !this._collapsed : this.config.hold_action && this.config.hold_action.action !== "none" && this._dispatchAction("hold");
  }
  _handlePointerDown(i) {
    this._isSubElement(i) || Date.now() - this._mountTime < 1500 || Date.now() - Ye < 800 || this._activePointerId !== null && this._activePointerId !== i.pointerId || (this._activePointerId = i.pointerId, this._pointerDownReceived = !0, this._pointerDownTime = Date.now(), this._held = !1, this._moved = !1, this._canceled = !1, this._startX = i.clientX, this._startY = i.clientY, this._holdTimer = setTimeout(() => {
      if (this._moved || this._canceled) return;
      this._held = !0, this._holdTimer = null, this._tapTimer && (clearTimeout(this._tapTimer), this._tapTimer = null), N("heavy", this.config.haptic_feedback !== !1), (this.config.collapse_controls_trigger || "hold") === "hold" && this._hasCollapsible() ? this._collapsed = !this._collapsed : this.config.hold_action && this.config.hold_action.action !== "none" && this._dispatchAction("hold");
    }, 500));
  }
  _handlePointerMove(i) {
    if (this._isSubElement(i) || this._activePointerId !== null && this._activePointerId !== i.pointerId) return;
    const e = i.clientX - this._startX, t = i.clientY - this._startY, o = Math.hypot(e, t), r = Math.max(1, Date.now() - this._pointerDownTime), a = o / r;
    (o > 8 || a > 0.5) && (this._moved = !0, this._pointerDownReceived = !1, this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null));
  }
  _handlePointerUp(i) {
    this._isSubElement(i) || (this._activePointerId = null, this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null));
  }
  _handlePointerCancel(i) {
    this._isSubElement(i) || (this._activePointerId = null, this._canceled = !0, this._moved = !0, this._pointerDownReceived = !1, this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null));
  }
  _isSubElement(i) {
    const e = i.target;
    return e ? e.tagName === "INPUT" || e.hasAttribute("data-ag-sub") ? !0 : !!e.closest?.("[data-ag-sub], .sub-button, .sub-color-picker, .sub-button-slider-container, .slider-container, .slider-google-wrap, .sub-button-google-slider, .color-picker") : !1;
  }
  _handleSubPointerDown(i, e, t) {
    i.stopPropagation(), this._subHeld = !1, this._subMoved = !1, this._subCanceled = !1, this._subPointerDownTime = Date.now(), this._subStartX = i.clientX, this._subStartY = i.clientY, this._subHoldTimer = setTimeout(() => {
      this._subMoved || this._subCanceled || (this._subHeld = !0, this._subHoldTimer = null, N("heavy", this.config.haptic_feedback !== !1), this._dispatchAction("hold", t || { action: "more-info" }, e));
    }, 500);
  }
  _handleSubPointerMove(i) {
    i.stopPropagation();
    const e = i.clientX - this._subStartX, t = i.clientY - this._subStartY, o = Math.hypot(e, t), r = Math.max(1, Date.now() - this._subPointerDownTime), a = o / r;
    (o > 8 || a > 0.5) && (this._subMoved = !0, this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null));
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
    const a = o && o.action !== "none", n = e || "sub_default", c = () => {
      N("light", this.config.haptic_feedback !== !1), t && t.action && t.action !== "none" && t.action !== "default" ? this._dispatchAction("tap", t, e) : r ? r() : this._dispatchAction("tap", { action: "toggle" }, e);
    };
    if (!a) {
      c();
      return;
    }
    const d = this._subTapTimerMap.get(n);
    if (d) {
      clearTimeout(d), this._subTapTimerMap.delete(n), N("medium", this.config.haptic_feedback !== !1), this._dispatchAction("double_tap", o, e);
      return;
    }
    const f = setTimeout(() => {
      this._subTapTimerMap.delete(n), c();
    }, 250);
    this._subTapTimerMap.set(n, f);
  }
  _handleSubContextMenu(i, e, t) {
    i.preventDefault(), i.stopPropagation(), !this._subHeld && (N("medium", this.config.haptic_feedback !== !1), this._dispatchAction("hold", t || { action: "more-info" }, e));
  }
  // --- THROTTLED SERVICE CALL HELPER ---
  _throttledCall(i, e, t) {
    const o = t ?? (Se.isPowerSaveActive(this.hass) ? 60 : 30), r = this._throttleMap.get(i) ?? 0, a = Date.now();
    if (!(a - r < o)) {
      this._throttleMap.set(i, a);
      try {
        e();
      } finally {
        setTimeout(() => {
          this._throttleMap.get(i) === a && this._throttleMap.delete(i);
        }, o + 50);
      }
    }
  }
  _revertSlider(i, e) {
    i.value = String(e.initialVal), i.style.setProperty("--slider-pct", e.initialPct);
    const o = i.closest(".slider-container, .sub-button-slider-container")?.querySelector(".slider-percent-badge, .sub-slider-pct");
    o && (o.textContent = e.initialBadge);
  }
  _sliderInput(i, e, t, o, r, a, n) {
    i.stopPropagation();
    const c = i.target, d = this._sliderStateMap.get(c);
    if (d?.isScrolling) {
      this._revertSlider(c, d);
      return;
    }
    const f = Number(c.value), u = isNaN(f) ? 0 : f, s = a ? a(u) : u;
    if (d) {
      if (d.rafPending) return;
      d.rafPending = !0;
    }
    requestAnimationFrame(() => {
      if (d && (d.rafPending = !1), d?.isScrolling) {
        this._revertSlider(c, d);
        return;
      }
      c.style.setProperty("--slider-pct", `${s}%`);
      const p = c.closest(".slider-container, .sub-button-slider-container"), g = p?.querySelector(".slider-percent-badge, .sub-slider-pct");
      if (g && (g.textContent = n ? n(u, s) : `${s}%`), e === "color_hue" && p) {
        p.style.setProperty("--color-hue-val", `hsl(${u}, 100%, 50%)`);
        const y = p.querySelector(".color-chip-badge span");
        y && (y.style.background = `hsl(${u}, 100%, 50%)`);
      }
    }), N("selection", this.config.haptic_feedback !== !1);
  }
  _sliderChange(i, e, t, o) {
    i.stopPropagation();
    const r = i.target, a = this._sliderStateMap.get(r);
    if (a?.isScrolling) {
      this._revertSlider(r, a), a.isScrolling = !1;
      return;
    }
    const n = Number(r.value), c = isNaN(n) ? 0 : n;
    if (!(a && c === a.initialVal)) {
      if (e === "light" && t === "turn_on") {
        const d = Math.round(c / 255 * 100);
        if (c <= 3 || d <= 1) {
          this.hass.callService("light", "turn_off", { entity_id: this.config.entity });
          return;
        }
      }
      if (e === "fan" && t === "set_percentage" && c <= 0) {
        this.hass.callService("fan", "turn_off", { entity_id: this.config.entity });
        return;
      }
      this.hass.callService(e, t, { entity_id: this.config.entity, ...o(c) });
    }
  }
  _getLightLiveColor(i) {
    if (!i || !i.attributes || i.state !== "on") return null;
    const e = i.attributes;
    if (e.color_mode === "color_temp") {
      const o = e.color_temp_kelvin ?? (e.color_temp ? Math.round(1e6 / e.color_temp) : 3e3), [r, a, n] = j(o);
      return `rgb(${r}, ${a}, ${n})`;
    }
    if (Array.isArray(e.rgb_color) && e.rgb_color.length >= 3)
      return `rgb(${e.rgb_color[0]}, ${e.rgb_color[1]}, ${e.rgb_color[2]})`;
    if (Array.isArray(e.hs_color) && e.hs_color.length >= 2) {
      const [o, r, a] = wt(e.hs_color[0], e.hs_color[1]);
      return `rgb(${o}, ${r}, ${a})`;
    }
    if (Array.isArray(e.rgbw_color) && e.rgbw_color.length >= 3)
      return `rgb(${e.rgbw_color[0]}, ${e.rgbw_color[1]}, ${e.rgbw_color[2]})`;
    if (Array.isArray(e.rgbww_color) && e.rgbww_color.length >= 3)
      return `rgb(${e.rgbww_color[0]}, ${e.rgbww_color[1]}, ${e.rgbww_color[2]})`;
    if (e.color_temp_kelvin !== void 0 || e.color_temp !== void 0) {
      const o = e.color_temp_kelvin ?? Math.round(1e6 / e.color_temp), [r, a, n] = j(o);
      return `rgb(${r}, ${a}, ${n})`;
    }
    return i.state === "on" ? "var(--state-light-active-color, rgb(255, 205, 120))" : null;
  }
  _getLiveHex(i) {
    if (!i?.attributes || i.state !== "on") return "#ffffff";
    const e = i.attributes;
    if (Array.isArray(e.rgb_color) && e.rgb_color.length >= 3)
      return lt(e.rgb_color);
    if (Array.isArray(e.hs_color) && e.hs_color.length >= 2)
      return lt(wt(e.hs_color[0], e.hs_color[1]));
    if (e.color_temp_kelvin !== void 0 || e.color_temp !== void 0) {
      const r = e.color_temp_kelvin ?? Math.round(1e6 / e.color_temp);
      return lt(j(r));
    }
    const t = this._getLightLiveColor(i);
    if (!t) return "#ffffff";
    const o = W(t);
    return o ? lt(o) : "#ffffff";
  }
  _getLiveHue(i) {
    if (!i) return 0;
    if (Array.isArray(i.attributes?.hs_color) && i.attributes.hs_color.length >= 1)
      return Math.round(i.attributes.hs_color[0]) % 360;
    if (Array.isArray(i.attributes?.rgb_color) && i.attributes.rgb_color.length >= 3) {
      const [e, t, o] = i.attributes.rgb_color;
      return fr(e, t, o);
    }
    return 0;
  }
  _handleColorInput(i, e, t, o) {
    i.stopPropagation();
    const r = i.target.value;
    if (!r) return;
    const a = W(r);
    if (!a) return;
    const n = t || this.config.entity, c = () => {
      this.hass.callService("light", "turn_on", { entity_id: n, rgb_color: a });
    };
    e ? this._throttledCall(o || "color_picker", c) : c();
  }
  // --- RENDER ---
  render() {
    if (!this.config || !this.hass)
      return w``;
    const i = this.config.entity;
    if (!i)
      return w`
        <ha-card class="warning-card">
          <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
          <span>Please configure an entity in the visual editor.</span>
        </ha-card>
      `;
    const e = this.hass.states[i];
    if (!e)
      return w`
        <ha-card class="warning-card">
          <ha-icon icon="mdi:help-circle-outline"></ha-icon>
          <span>Entity not found: <code>${i}</code></span>
        </ha-card>
      `;
    const t = this.config.show_name !== !1 ? this._getInfoContent(this.config.primary_info, e) : "", o = this.config.show_state !== !1 ? this._getInfoContent(this.config.secondary_info, e) : "", r = this._isEntityActive(e), a = i.split(".")[0], n = this.config.icon_type ?? "icon", c = this.config.show_icon !== !1 && n !== "none", d = this._iconShapeClass, f = this._iconAnimClass;
    let u = "var(--primary-color)", s = null;
    a === "climate" ? e.state === "heat" ? u = "var(--state-climate-heat-color, #ff7043)" : e.state === "cool" ? u = "var(--state-climate-cool-color, #42a5f5)" : e.state === "dry" ? u = "var(--state-climate-dry-color, #ab47bc)" : e.state === "fan_only" && (u = "var(--state-climate-fan_only-color, #26a69a)") : a === "light" ? (s = this._getLightLiveColor(e), s && (u = s)) : (a === "binary_sensor" || a === "lock" || a === "switch") && (u = "#d60000");
    const p = this.config.color_type === "card";
    let g = this._resolveColor(this.config.active_color);
    (!g || this.config.use_light_color) && (a === "light" && s ? g = s : g = u);
    let y = "var(--secondary-background-color, rgba(150, 150, 150, 0.2))";
    a === "light" ? y = "#000000" : (a === "binary_sensor" || a === "lock" || a === "switch") && (y = "#03b500");
    const _ = this._resolveColor(this.config.inactive_color) || y, b = p ? "transparent" : r ? g : _, l = this.config.icon_color ? `color: ${this._resolveColor(this.config.icon_color)};` : p && r ? "color: #ffffff; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.4));" : "", h = this._iconOpacityStyle, m = this._iconRotateStyle, v = this.config.show_slider !== !1, S = a === "light", $ = a === "cover", T = a === "fan", k = a === "humidifier", C = a === "media_player", F = a === "number" || a === "input_number", ne = a === "climate", se = this.config.hide_slider_when_off !== !1, Y = this.config.hide_color_temp_when_off !== !1, Te = this.config.hide_color_picker_when_off !== !1, Je = this.config.hide_color_slider_when_off !== !1, le = e.attributes?.supported_color_modes;
    let Me = e.attributes?.brightness !== void 0, Ae = !1, ce = !1;
    if (Array.isArray(le))
      for (let A = 0; A < le.length; A++) {
        const ve = le[A];
        ve !== "onoff" && (Me = !0), ve === "color_temp" && (Ae = !0), Hr.has(ve) && (ce = !0);
      }
    const Pe = S && v && Me && (!se || r), Ze = e.attributes?.color_temp_kelvin ?? e.attributes?.color_temp, Ee = S && v && this.config.show_color_temp === !0 && (Ze !== void 0 || Ae) && (!Y || r), Ne = this.config.color_picker_type !== "wheel", Le = S && v && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && Ne) && ce && (!Je || r), Re = S && v && this.config.show_color_picker === !0 && !Ne && ce && (!Te || r), z = e.state !== "unavailable" && e.state !== "unknown", de = $ && z && v && e.attributes?.current_position !== void 0, ue = T && z && r && v && e.attributes?.percentage !== void 0, X = k && z && r && v && (e.attributes?.humidity !== void 0 || e.attributes?.target_humidity !== void 0), te = C && z && r && v && e.attributes?.volume_level !== void 0, pe = F && z && v, De = ne && z && r && v && (e.attributes?.temperature !== void 0 || e.attributes?.target_temp_high !== void 0), Qe = (this.config.bg_opacity ?? 10) / 100, ie = this.config.slider_color ? `--slider-color: ${this._resolveColor(this.config.slider_color)};` : p && r && !this.config.use_light_color ? "--slider-color: rgba(255, 255, 255, 0.95);" : `--slider-color: ${g};`, He = this.config.slider_track_color ? `--slider-track-color: ${this._resolveColor(this.config.slider_track_color)};` : p && r ? "--slider-track-color: rgba(0, 0, 0, 0.25);" : "", P = this._calculateMultiStageFade(e, u, _), H = this.config.fade_target ?? "card", he = this._resolveColor(this.config.bg_color);
    let R;
    P.activeFade && (H === "card" || H === "all" || p) ? R = P.currentColor : p ? a === "light" ? R = r ? s || g : this.config.inactive_color ? _ : "#000000" : R = r ? g : _ : he ? R = he : a === "light" && !r ? R = "#000000" : R = `rgba(150, 150, 150, ${Qe})`;
    let _e = b;
    P.activeFade && (H === "icon" || H === "all") && (_e = p ? "transparent" : P.currentColor);
    let re = this._resolveColor(this.config.active_color) || (a === "light" && s ? s : g) || "var(--primary-color)";
    P.activeFade && (H === "all" || this.config.active_glow === !0) && (re = P.currentColor);
    let q = "";
    this.config.box_shadow === "soft" && (q = "box-shadow: 0 4px 10px rgba(0,0,0,0.1);"), this.config.box_shadow === "deep" && (q = "box-shadow: 0 10px 20px rgba(0,0,0,0.3);"), (this.config.box_shadow === "glow" || this.config.active_glow === !0) && (q = r || P.activeFade ? `box-shadow: 0 0 22px ${re}, 0 0 45px rgba(255, 255, 255, 0.18);` : "");
    const K = this.config.active_glow === !0 || this.config.box_shadow === "glow" ? "card-active-glow" : "", D = e?.attributes?.device_class, fe = a === "binary_sensor" && (D === "motion" || D === "occupancy" || D === "presence"), Be = a === "binary_sensor" && (D === "door" || D === "window" || D === "garage_door" || D === "opening"), ze = fe && (r || P.activeFade && P.currentStage === 1) ? "motion-active" : "", Ie = Be && r ? "door-open" : "", Fe = a === "climate" && e?.attributes?.hvac_action ? `hvac-${e.attributes.hvac_action}` : "", Oe = a === "cover" ? e?.state === "opening" ? "cover-opening" : e?.state === "closing" ? "cover-closing" : "" : "", Ue = `${this._staticCardClasses} ${K} ${ze} ${Ie} ${Fe} ${Oe}`, J = this._getSubButtons();
    let I = "";
    this.config.text_color_mode === "active_accent" && r ? I += `--primary-text-color: ${g}; ` : this.config.text_color_primary ? I += `--primary-text-color: ${this._resolveColor(this.config.text_color_primary)}; ` : p && r && (I += "--primary-text-color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.4); "), this.config.text_color_secondary ? I += `--secondary-text-color: ${this._resolveColor(this.config.text_color_secondary)}; ` : p && r && (I += "--secondary-text-color: rgba(255, 255, 255, 0.9); text-shadow: 0 1px 2px rgba(0,0,0,0.3); ");
    const O = this.config.features_position === "inline", B = this._iconSize, M = this._iconContainerSize, Z = this.config.text_scrolling_primary || "none", U = this.config.text_scrolling_secondary || "none", G = w`
      ${Pe ? this._renderLightSlider(e) : x}
      ${de ? this._renderCoverSlider(e) : x}
      ${ue ? this._renderFanSlider(e) : x}
      ${X ? this._renderHumidifierSlider(e) : x}
      ${te ? this._renderMediaSlider(e) : x}
      ${pe ? this._renderNumberSlider(e) : x}
      ${De ? this._renderClimateSlider(e) : x}
    `, oe = w`
      ${Ee ? this._renderColorTempSlider(e) : x}
      ${Le ? this._renderColorSlider(e) : x}
      ${Re ? this._renderColorPicker(e) : x}
    `, V = Pe || de || ue || X || te || pe || De, me = Ee || Le || Re, ge = !O && me || J.length > 0, be = this.config.decay_slider_position ?? "bottom", Ge = kt.sanitizeCustomStyles(this.config.custom_styles);
    return w`
      ${Ge ? w`<style>${ai(Ge)}</style>` : x}
      <ha-card 
        class="${Ue}" 
        ?active=${r}
        style="${this._staticCardStyles} background: ${R}; ${q} ${ie} ${He} ${I} --ag-glow-color: ${re}; --ag-active-color: ${g};"
        @click=${this._handleTap}
        @keydown=${this._handleKeyDown}
        @contextmenu=${this._handleContextMenu}
        @pointerdown=${this._handlePointerDown}
        @pointermove=${this._handlePointerMove}
        @pointerup=${this._handlePointerUp}
        @pointercancel=${this._handlePointerCancel}
      >
        <div class="card-content ${O ? "features-inline" : ""}" style="justify-content: var(--ag-content-alignment);">
          ${be === "top" ? this._renderDecaySlider(P) : x}

          <div class="info-container">
            ${c ? w`
              <div class="icon-container ${d} ${f} ${this.config.active_pulse && r ? "pulse" : ""} ${(this.config.active_glow || this.config.box_shadow === "glow") && (r || P.activeFade) ? "glow" : ""}" 
                   style="${this._iconOffsetStyle} ${l} ${h} background-color: ${_e}; width: ${M}px; height: ${M}px; --mdc-icon-size: ${B}px; ${z ? "" : "opacity: 0.5; pointer-events: none;"}" 
                   ?active=${r}>
                ${n === "entity-picture" && e.attributes.entity_picture ? w`<img class="entity-picture ${d}" src="${e.attributes.entity_picture}" style="width: ${B}px; height: ${B}px; ${m}" />` : w`<ha-state-icon
                      .hass=${this.hass}
                      .stateObj=${e}
                      .icon=${this.config.icon || this._computeDynamicIcon(e)}
                      style="--mdc-icon-size: ${B}px; width: ${B}px; height: ${B}px; ${m}"
                    ></ha-state-icon>`}
                ${this.config.badge_icon ? w`
                  <div class="badge" style="background: ${this._resolveColor(this.config.badge_color) || g};">
                    <ha-icon .icon=${this.config.badge_icon}></ha-icon>
                  </div>
                ` : x}
              </div>
            ` : x}
            <div class="info" style="${this._textOffsetStyle} ${this._textBoxWidth} text-align: var(--ag-text-alignment);">
              ${t ? w`
                <div class="text-marquee-container scroll-${Z}" style="${this._primaryTextOffsetStyle}">
                  <span class="primary scroll-content" style="${this._primaryTextStyle}">${t}</span>
                </div>` : x}
              ${o ? w`
                <div class="text-marquee-container scroll-${U}" style="${this._secondaryTextOffsetStyle}">
                  <span class="secondary scroll-content" style="${this._secondaryTextStyle}">${o}</span>
                </div>` : x}
            </div>
            ${be === "inline" ? w`<div class="inline-sliders">${this._renderDecaySlider(P)}</div>` : x}
            ${O && V ? w`<div class="inline-sliders" style="${this._mainSliderMarginOffsets}">${G}</div>` : x}
            ${O && me ? w`<div class="inline-sliders ${this._collapsed ? "collapsed" : ""}">${oe}</div>` : x}
          </div>
          
          ${be === "bottom" ? this._renderDecaySlider(P) : x}
          ${!O && V ? w`<div class="features-container" style="${this._featuresOffsetStyle} ${this._mainSliderMarginOffsets}">${G}</div>` : x}

          ${ge ? w`
            <div class="collapsible-wrapper ${this._collapsed ? "collapsed" : ""}">
              ${!O && me ? w`<div class="features-container" style="${this._featuresOffsetStyle}">${oe}</div>` : x}

              ${J.length > 0 ? w`
                <div class="sub-buttons-container">
                  ${Zi(
      J,
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
  _renderDecaySlider(i) {
    if (!this.config.show_decay_slider || !i.enabled || !i.activeFade)
      return x;
    const e = this.config.slider_style === "google", t = this.config.decay_slider_height ?? (e ? 32 : 10), o = this.config.slider_border_radius ?? (e ? 16 : 5), r = Math.max(0, 100 - i.progressPct);
    return w`
      <div class="decay-slider-container" style="--decay-color: ${i.currentColor}; --decay-pct: ${r}%;">
        <div class="decay-slider-track" style="height: ${t}px; border-radius: ${o}px;">
          <div class="decay-slider-fill" style="background: ${i.currentColor}; border-radius: ${o}px;"></div>
          <span class="decay-slider-badge">${i.stageLabel}</span>
        </div>
      </div>
    `;
  }
  // --- GENERIC SLIDER COMPONENT HELPER ---
  _renderGenericSlider(i, e, t, o, r, a, n, c, d, f, u, s, p = "", g = "", y) {
    const _ = this.config.slider_style === "google", b = _ && this.config.show_slider_percent !== !1 || this.config.show_slider_percent === !0, l = s ? s(a, n) : `${n}%`, h = y !== void 0 ? y : l, m = this.config.slider_stepped_movement === !1 ? "any" : r, v = i !== "color_temp" && i !== "color_hue", S = this.config.slider_style === "full", $ = v && S ? "main-slider-full" : "";
    let T = "";
    if (v && S) {
      const k = Number(this.config.slider_start_offset) || 0, C = Number(this.config.slider_end_offset) || 0;
      T = `left: ${k}px !important; right: ${C}px !important; width: calc(100% - ${k + C}px) !important;`;
    } else i === "color_temp" ? T = this._colorTempMarginOffsets : i === "color_hue" ? T = this._colorHueMarginOffsets : T = this._mainSliderMarginOffsets;
    return w`
      <div class="slider-container ${p} ${$} ${_ ? "slider-google-wrap" : ""}" style="${T} ${g}">
        <input type="range" min=${t} max=${o} step=${m} .value=${a}
               aria-label="${e}"
               style="--slider-pct: ${n}%;"
               @pointerdown=${this._onSliderPointerDown}
               @pointermove=${this._onSliderPointerMove}
               @pointerup=${this._onSliderPointerUp}
               @pointercancel=${this._onSliderPointerCancel}
               @input=${(k) => this._sliderInput(k, i, c, d, f, u, s)}
               @change=${(k) => this._sliderChange(k, c, d, f)} />
        ${b && h ? w`<span class="slider-percent-badge">${h}</span>` : x}
      </div>
    `;
  }
  // --- MULTI-DOMAIN SLIDER RENDERERS ---
  _renderLightSlider(i) {
    const e = this._isEntityActive(i), t = i.attributes.brightness ?? 0, o = Math.max(0, Math.min(100, Math.round(t / 255 * 100))), r = this._getLightLiveColor(i), a = (this.config.use_light_color !== !1 || !this.config.slider_color) && r ? `--slider-color: ${r};` : "";
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
      (n) => ({ brightness: n }),
      (n) => Math.round(n / 255 * 100),
      (n, c) => !e || c <= 0 ? "" : `${c}%`,
      "",
      a
    );
  }
  _renderColorTempSlider(i) {
    const e = this.config.color_temp_type || "gradient", t = i.attributes.color_temp_kelvin !== void 0 || i.attributes.min_color_temp_kelvin !== void 0 || i.attributes.max_color_temp_kelvin !== void 0, o = t ? i.attributes.min_color_temp_kelvin || 2e3 : i.attributes.min_mireds || 153, r = t ? i.attributes.max_color_temp_kelvin || 6500 : i.attributes.max_mireds || 500, a = t ? i.attributes.color_temp_kelvin || 3e3 : i.attributes.color_temp || 300, n = r - o, c = n > 0 ? Math.max(0, Math.min(100, Math.round((a - o) / n * 100))) : 0, d = t ? "color_temp_kelvin" : "color_temp", f = e === "google" || e === "gradient" && this.config.slider_style === "google", u = f ? 42 : e === "thin" ? 6 : 12, s = f ? 21 : e === "thin" ? 3 : 6, p = this.config.color_temp_height !== void 0 ? this.config.color_temp_height : this.config.slider_height ?? u, g = this.config.color_temp_border_radius !== void 0 ? this.config.color_temp_border_radius : this.config.slider_border_radius ?? s, y = t ? `${a} K` : `${a} mireds`;
    if (e === "presets") {
      const _ = Number(this.config.color_temp_start_offset) || 0, b = Number(this.config.color_temp_end_offset) || 0, l = [
        _ ? `margin-left: ${_}px;` : "",
        b ? `margin-right: ${b}px;` : ""
      ].filter(Boolean).join(" ");
      return w`
        <div class="presets-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${l}">
          ${gr.map((h) => {
        const [m, v, S] = h.rgb, $ = Math.abs(a - h.k) < 200, T = () => {
          N("light", this.config.haptic_feedback !== !1), this.hass?.callService("light", "turn_on", { entity_id: this.config.entity, [d]: h.k });
        };
        return w`
              <button 
                type="button"
                role="button"
                aria-label="Color temperature preset: ${h.label}"
                tabindex="0"
                class="temp-preset-chip"
                style="flex: 1; min-width: 48px; height: ${p}px; border-radius: ${g}px; border: ${$ ? "2px solid #ffffff" : "1px solid rgba(150, 150, 150, 0.3)"}; background: rgba(${m}, ${v}, ${S}, 0.2); color: var(--primary-text-color); font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; box-shadow: ${$ ? "0 0 8px rgba(" + m + "," + v + "," + S + ", 0.8)" : "none"};"
                @keydown=${(k) => {
          (k.key === "Enter" || k.key === " ") && (k.preventDefault(), k.stopPropagation(), T());
        }}
                @click=${(k) => {
          k.stopPropagation(), T();
        }}>
                <span style="width: 8px; height: 8px; border-radius: 50%; background: rgb(${m}, ${v}, ${S}); display: inline-block;"></span>
                ${h.label}
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
      a,
      c,
      "light",
      "turn_on",
      (_) => ({ [d]: _ }),
      (_) => n > 0 ? Math.round((_ - o) / n * 100) : 0,
      (_) => t ? `${_} K` : `${_} mireds`,
      `color-temp ${t ? "kelvin" : "mireds"} ${f ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${p}px; --ag-slider-radius: ${g}px;`,
      y
    );
  }
  _renderColorSlider(i) {
    const e = this.config.color_picker_type || "slider";
    if (e === "wheel")
      return this._renderColorPicker(i);
    if (e === "swatches") {
      const s = this._getLiveHex(i).toLowerCase(), p = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : 32, g = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : 8, y = Number(this.config.color_slider_start_offset) || 0, _ = Number(this.config.color_slider_end_offset) || 0, b = [
        y ? `margin-left: ${y}px;` : "",
        _ ? `margin-right: ${_}px;` : ""
      ].filter(Boolean).join(" ");
      return w`
        <div class="swatches-palette-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${b}">
          ${mr.map((l) => {
        const h = s === l.hex.toLowerCase(), m = () => {
          N("light", this.config.haptic_feedback !== !1), this.hass?.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: l.rgb });
        };
        return w`
              <button 
                type="button"
                role="button"
                aria-label="Color preset: ${l.label}"
                tabindex="0"
                class="color-swatch-chip"
                title="${l.label}"
                style="flex: 1; min-width: 28px; height: ${p}px; border-radius: ${g}px; background: ${l.hex}; border: ${h ? "2px solid #ffffff" : "1px solid rgba(0,0,0,0.2)"}; cursor: pointer; box-shadow: ${h ? "0 0 10px " + l.hex : "0 1px 3px rgba(0,0,0,0.3)"}; transition: transform 0.15s ease;"
                @keydown=${(v) => {
          (v.key === "Enter" || v.key === " ") && (v.preventDefault(), v.stopPropagation(), m());
        }}
                @click=${(v) => {
          v.stopPropagation(), m();
        }}>
              </button>
            `;
      })}
        </div>
      `;
    }
    const t = this._getLiveHue(i), o = Math.max(0, Math.min(100, Math.round(t / 360 * 100))), r = e === "google" || this.config.slider_style === "google", a = r ? 42 : 12, n = r ? 21 : 6, c = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : this.config.slider_height ?? a, d = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : this.config.slider_border_radius ?? n, f = `hsl(${t}, 100%, 50%)`, u = w`
      <span class="color-chip-badge" style="display: flex; align-items: center; gap: 6px;">
        <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background: ${f}; border: 1.5px solid #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.4);"></span>
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
      (s) => {
        const [p, g, y] = wt(s, 100);
        return { rgb_color: [p, g, y] };
      },
      (s) => Math.round(s / 360 * 100),
      (s) => `${s}°`,
      `color-hue ${r ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${c}px; --ag-slider-radius: ${d}px; --color-hue-val: ${f};`,
      u
    );
  }
  _renderColorPicker(i) {
    const e = this._getLiveHex(i), t = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : this.config.slider_height ?? 36, o = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : this.config.slider_border_radius ?? 8;
    return w`
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
      (o) => {
        const r = t > 1 ? Math.round(o / t) * t : o;
        return { percentage: Math.min(100, Math.max(0, r)) };
      },
      (o) => o,
      (o, r) => `${r}%`
    );
  }
  _renderMediaSlider(i) {
    const e = i.attributes.is_volume_muted === !0, t = e ? 0 : Math.round((i.attributes.volume_level ?? 0) * 100), o = e ? "Muted (0%)" : void 0;
    return this._renderGenericSlider(
      "media",
      "Volume",
      0,
      100,
      1,
      t,
      t,
      "media_player",
      "volume_set",
      (r) => ({ volume_level: r / 100 }),
      (r) => r,
      (r, a) => e ? "Muted" : `${a}%`,
      "media",
      "",
      o
    );
  }
  _renderNumberSlider(i) {
    const e = Number(i.attributes.min ?? 0);
    let t = Number(i.attributes.max ?? 100);
    e >= t && (t = e + 100);
    const o = Number(i.attributes.step ?? 1), r = Number(i.state), a = isNaN(r) ? e : r, n = t - e, c = n > 0 ? Math.max(0, Math.min(100, Math.round((a - e) / n * 100))) : 0, d = (this.config.entity || "number").split(".")[0], f = i.attributes.unit_of_measurement ? ` ${i.attributes.unit_of_measurement}` : "", u = o.toString(), s = u.includes(".") ? u.split(".")[1].length : 0;
    return this._renderGenericSlider(
      "number",
      "Value",
      e,
      t,
      o,
      a,
      c,
      d,
      "set_value",
      (p) => ({ value: s > 0 ? Number(p.toFixed(s)) : Math.round(p) }),
      (p) => n > 0 ? Math.round((p - e) / n * 100) : 0,
      (p) => `${s > 0 ? Number(p).toFixed(s) : Math.round(Number(p))}${f}`
    );
  }
  _renderClimateSlider(i) {
    const e = this.hass.config?.unit_system?.temperature === "°F" || this.hass.config?.unit_system?.temperature === "F", t = e ? "°F" : "°C", o = e ? 60 : 16, r = e ? 85 : 30, a = i.attributes.min_temp ?? o, n = i.attributes.max_temp ?? r, c = i.attributes.target_temp_step ?? i.attributes.target_temperature_step ?? (e ? 1 : 0.5), d = i.attributes.target_temp_low !== void 0 && i.attributes.target_temp_high !== void 0, f = i.attributes.temperature ?? i.attributes.target_temp_low ?? i.attributes.target_temp_high ?? a, u = n - a, s = u > 0 ? Math.max(0, Math.min(100, Math.round((f - a) / u * 100))) : 0;
    return this._renderGenericSlider(
      "climate",
      "Temperature",
      a,
      n,
      c,
      f,
      s,
      "climate",
      "set_temperature",
      (p) => d ? { target_temp_low: p, target_temp_high: Math.min(n, p + (e ? 4 : 2)) } : { temperature: p },
      (p) => u > 0 ? Math.round((p - a) / u * 100) : 0,
      (p) => `${p}${t}`,
      "climate-temp",
      "",
      `${f}${t}`
    );
  }
  _renderHumidifierSlider(i) {
    const e = i.attributes?.min_humidity ?? 0, t = i.attributes?.max_humidity ?? 100, o = i.attributes?.humidity ?? i.attributes?.target_humidity ?? e, r = t - e, a = r > 0 ? Math.max(0, Math.min(100, Math.round((o - e) / r * 100))) : 0;
    return this._renderGenericSlider(
      "humidifier",
      "Humidity",
      e,
      t,
      1,
      o,
      a,
      "humidifier",
      "set_humidity",
      (n) => ({ humidity: n }),
      (n) => r > 0 ? Math.round((n - e) / r * 100) : 0,
      (n, c) => `${c}%`
    );
  }
  // --- EXTRACTED SUB-BUTTON RENDERERS ---
  _renderSubSlider(i, e, t, o, r) {
    const a = e || this.hass.states[this.config.entity || ""], n = i || this.config.entity || "", c = a?.attributes?.volume_level !== void 0 || a?.entity_id?.startsWith("media_player."), d = a?.attributes?.percentage !== void 0 || a?.entity_id?.startsWith("fan."), f = a?.attributes?.current_position !== void 0 || a?.entity_id?.startsWith("cover.");
    let u = 0, s = 0, p = 255, g = "1", y = "turn_on", _ = "light", b = "brightness";
    c ? (u = a?.attributes?.volume_level ?? 0, p = 1, g = "0.01", y = "set_volume_level", _ = "media_player", b = "volume_level") : d ? (u = a?.attributes?.percentage ?? 0, p = 100, g = "1", y = "set_percentage", _ = "fan", b = "percentage") : f ? (u = a?.attributes?.current_position ?? 0, p = 100, g = "1", y = "set_cover_position", _ = "cover", b = "position") : u = a?.attributes?.brightness ?? 0;
    const l = Math.round(p === 1 ? u * 100 : p === 100 ? u : u / 255 * 100);
    return t === "slider" ? w`
        <div class="sub-button-slider-container ${r}" style="${o}" title="Level: ${l}%">
          <input type="range" 
                 min="${s}" 
                 max=${p} 
                 step=${g} 
                 .value=${u}
                 @pointerdown=${(h) => h.stopPropagation()}
                 @input=${(h) => {
      h.stopPropagation();
      const m = parseFloat(h.target.value), v = Math.round(p === 1 ? m * 100 : p === 100 ? m : m / 255 * 100), S = h.target.closest(".sub-button-slider-container");
      S && S.setAttribute("title", `Level: ${v}%`), this._throttledCall("sub_slider_" + n, () => {
        this.hass?.callService(_, y, { entity_id: n, [b]: m });
      });
    }}
                 @change=${(h) => {
      h.stopPropagation();
      const m = parseFloat(h.target.value);
      this.hass?.callService(_, y, { entity_id: n, [b]: m });
    }} />
        </div>
      ` : w`
        <div class="sub-button-google-slider ${r}" style="${o} --slider-pct: ${l}%;" title="Level: ${l}%">
          <input type="range" 
                 min="${s}" 
                 max=${p} 
                 step=${g} 
                 .value=${u}
                 style="--slider-pct: ${l}%;"
                 @pointerdown=${(h) => h.stopPropagation()}
                 @input=${(h) => {
      h.stopPropagation();
      const m = parseFloat(h.target.value), v = Math.round(p === 1 ? m * 100 : p === 100 ? m : m / 255 * 100), S = h.target;
      requestAnimationFrame(() => {
        S.style.setProperty("--slider-pct", `${v}%`);
        const $ = S.closest(".sub-button-google-slider");
        if ($) {
          $.style.setProperty("--slider-pct", `${v}%`), $.title = `Level: ${v}%`;
          const T = $.querySelector(".sub-slider-pct");
          T && (T.textContent = `${v}%`);
        }
      }), this._throttledCall("sub_slider_" + n, () => {
        this.hass?.callService(_, y, { entity_id: n, [b]: m });
      });
    }}
                 @change=${(h) => {
      h.stopPropagation();
      const m = parseFloat(h.target.value);
      this.hass?.callService(_, y, { entity_id: n, [b]: m });
    }} />
          <span class="sub-slider-pct">${l}%</span>
        </div>
      `;
  }
  _renderSubColorPicker(i, e, t, o, r, a) {
    const n = e || this.hass.states[this.config.entity || ""], c = this._getLiveHex(n);
    return w`
      <div class="sub-button sub-color-picker ${o}" 
           tabindex="0" 
           role="button" 
           title="Select Color (${c})" 
           style="${t} background: ${c} !important; border: 2px solid rgba(255,255,255,0.7); box-shadow: 0 1px 4px rgba(0,0,0,0.3);"
           @keydown=${(d) => {
      (d.key === "Enter" || d.key === " ") && (d.preventDefault(), d.currentTarget.querySelector("input")?.click());
    }}>
        <input type="color" 
               aria-label="Color Picker"
               .value=${c} 
               @input=${(d) => this._handleColorInput(d, !0, i || this.config.entity, "sub_color_picker_" + i)}
               @change=${(d) => this._handleColorInput(d, !1, i || this.config.entity)} />
        ${r ? w`<span class="sub-button-label" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${r}</span>` : x}
        ${a ? w`<span class="sub-button-state" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${a}</span>` : x}
      </div>
    `;
  }
  _renderSubButton(i, e, t, o = !0, r, a, n, c = "button", d, f = !1) {
    const u = i ? this.hass?.states[i] : this.hass?.states[this.config.entity || ""], s = this._isEntityActive(u), p = t ? `color: ${t};` : "", g = o ? "" : "no-bg", y = t ? this._resolveColor(t) : void 0;
    if (c === "slider" || c === "google_slider") {
      const C = t ? `--primary-color: ${t}; --slider-color: ${t};` : "";
      return this._renderSubSlider(i, u, c, C, g);
    }
    let _;
    f && u && (_ = this._getInfoContent("state", u));
    const b = (i || this.config.entity || "").split(".")[0];
    if (c === "color_picker" && (b === "light" || !i && this.config.entity?.startsWith("light.")))
      return this._renderSubColorPicker(i, u, p, g, r, _);
    const l = dr.resolve(
      c,
      i,
      this.config.entity,
      u,
      e,
      r,
      s,
      this.hass?.config?.unit_system?.temperature,
      a
    ), h = l.icon, m = l.title, v = l.label, S = l.isActive, $ = l.animClass;
    let T;
    l.defaultAction && (T = () => l.defaultAction(this.hass, this.config.entity));
    const k = (C) => {
      this._handleSubTap(C, i, a, d, T);
    };
    return w`
      <div 
        tabindex="0"
        data-ag-sub
        class="sub-button ${g}" 
        ?active=${S} 
        style="${p} ${S && y && o ? `background: ${y}; color: #fff;` : ""}"
        title="${m}"
        @click=${k}
        @dblclick=${(C) => C.stopPropagation()}
        @keydown=${(C) => {
      (C.key === "Enter" || C.key === " ") && (C.preventDefault(), C.stopPropagation(), k(C));
    }}
        @pointerdown=${(C) => this._handleSubPointerDown(C, i, n)}
        @pointermove=${this._handleSubPointerMove}
        @pointerup=${this._handleSubPointerUp}
        @pointercancel=${this._handleSubPointerCancel}
        @contextmenu=${(C) => this._handleSubContextMenu(C, i, n)}>
        <ha-icon .icon=${h} class="${$}"></ha-icon>
        ${v ? w`<span class="sub-button-label">${v}</span>` : x}
        ${_ ? w`<span class="sub-button-state">${_}</span>` : x}
      </div>
    `;
  }
  // --- STATIC STYLES ---
  static get styles() {
    return cr;
  }
};
ke([
  mt({ attribute: !1 })
], ee.prototype, "hass", 2);
ke([
  mt({ type: Boolean })
], ee.prototype, "preview", 2);
ke([
  gt()
], ee.prototype, "config", 2);
ke([
  gt()
], ee.prototype, "_collapsed", 2);
ke([
  ui({ passive: !0 })
], ee.prototype, "_handlePointerMove", 1);
ke([
  ui({ passive: !0 })
], ee.prototype, "_handleSubPointerMove", 1);
ee = ke([
  Oi("antigravity-with-icon-card")
], ee);
customElements.get("antigravity-with-icon-card") || customElements.define("antigravity-with-icon-card", ee);
export {
  ee as AntigravityWithIconCard,
  Lr as CARD_VERSION
};
