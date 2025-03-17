var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { a as getConfig, g as getBrowserState, b as resolve, e as executor, c as getWorkerState, C as CommandsManager } from "./utils-CBFLDkwI.js";
import { globalChannel, client, onCancel, channel } from "@vitest/browser/client";
import { userEvent, page, server } from "@vitest/browser/context";
import { loadDiffConfig, loadSnapshotSerializers, takeCoverageInsideWorker, setupCommonEnv, startCoverageInsideWorker, startTests, collectTests, stopCoverageInsideWorker, SpyModule } from "vitest/browser";
import { expect, chai } from "vitest";
import { getSafeTimers, stringify, format, TraceMap, originalPositionFor } from "vitest/utils";
import { VitestTestRunner, NodeBenchmarkRunner } from "vitest/runners";
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
    promise = Promise.allSettled(
      deps.map((dep) => {
        dep = assetsURL(dep);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
function showPopupWarning(name, value, defaultValue) {
  return (...params) => {
    const formattedParams = params.map((p) => JSON.stringify(p)).join(", ");
    console.warn(`Vitest encountered a \`${name}(${formattedParams})\` call that it cannot handle by default, so it returned \`${value}\`. Read more in https://vitest.dev/guide/browser/#thread-blocking-dialogs.
If needed, mock the \`${name}\` call manually like:

\`\`\`
import { expect, vi } from "vitest"

vi.spyOn(window, "${name}")${defaultValue ? `.mockReturnValue(${JSON.stringify(defaultValue)})` : ""}
${name}(${formattedParams})
expect(${name}).toHaveBeenCalledWith(${formattedParams})
\`\`\``);
    return value;
  };
}
function setupDialogsSpy() {
  globalThis.alert = showPopupWarning("alert", void 0);
  globalThis.confirm = showPopupWarning("confirm", false, true);
  globalThis.prompt = showPopupWarning("prompt", null, "your value");
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var minIndent;
var hasRequiredMinIndent;
function requireMinIndent() {
  if (hasRequiredMinIndent) return minIndent;
  hasRequiredMinIndent = 1;
  minIndent = (string) => {
    const match = string.match(/^[ \t]*(?=\S)/gm);
    if (!match) {
      return 0;
    }
    return match.reduce((r, a) => Math.min(r, a.length), Infinity);
  };
  return minIndent;
}
var stripIndent;
var hasRequiredStripIndent;
function requireStripIndent() {
  if (hasRequiredStripIndent) return stripIndent;
  hasRequiredStripIndent = 1;
  const minIndent2 = requireMinIndent();
  stripIndent = (string) => {
    const indent = minIndent2(string);
    if (indent === 0) {
      return string;
    }
    const regex = new RegExp(`^[ \\t]{${indent}}`, "gm");
    return string.replace(regex, "");
  };
  return stripIndent;
}
var indentString;
var hasRequiredIndentString;
function requireIndentString() {
  if (hasRequiredIndentString) return indentString;
  hasRequiredIndentString = 1;
  indentString = (string, count = 1, options) => {
    options = {
      indent: " ",
      includeEmptyLines: false,
      ...options
    };
    if (typeof string !== "string") {
      throw new TypeError(
        `Expected \`input\` to be a \`string\`, got \`${typeof string}\``
      );
    }
    if (typeof count !== "number") {
      throw new TypeError(
        `Expected \`count\` to be a \`number\`, got \`${typeof count}\``
      );
    }
    if (typeof options.indent !== "string") {
      throw new TypeError(
        `Expected \`options.indent\` to be a \`string\`, got \`${typeof options.indent}\``
      );
    }
    if (count === 0) {
      return string;
    }
    const regex = options.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
    return string.replace(regex, options.indent.repeat(count));
  };
  return indentString;
}
var redent$1;
var hasRequiredRedent;
function requireRedent() {
  if (hasRequiredRedent) return redent$1;
  hasRequiredRedent = 1;
  const stripIndent2 = requireStripIndent();
  const indentString2 = requireIndentString();
  redent$1 = (string, count = 0, options) => indentString2(stripIndent2(string), count, options);
  return redent$1;
}
var redentExports = requireRedent();
const redent = /* @__PURE__ */ getDefaultExportFromCjs(redentExports);
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, "__esModule", { value: true, configurable: true });
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, { get: v, set: s, enumerable: true, configurable: true });
}
var $009ddb00d3ec72b8$exports = {};
$parcel$defineInteropFlag($009ddb00d3ec72b8$exports);
$parcel$export($009ddb00d3ec72b8$exports, "default", () => $009ddb00d3ec72b8$export$2e2bcd8739ae039);
class $009ddb00d3ec72b8$export$2e2bcd8739ae039 extends Error {
  constructor(filename, msg, lineno, column, css) {
    super(filename + ":" + lineno + ":" + column + ": " + msg);
    this.reason = msg;
    this.filename = filename;
    this.line = lineno;
    this.column = column;
    this.source = css;
  }
}
var $0865a9fb4cc365fe$exports = {};
$parcel$defineInteropFlag($0865a9fb4cc365fe$exports);
$parcel$export($0865a9fb4cc365fe$exports, "default", () => $0865a9fb4cc365fe$export$2e2bcd8739ae039);
class $0865a9fb4cc365fe$export$2e2bcd8739ae039 {
  constructor(start, end, source2) {
    this.start = start;
    this.end = end;
    this.source = source2;
  }
}
var $b2e137848b48cf4f$exports = {};
$parcel$export($b2e137848b48cf4f$exports, "CssTypes", () => $b2e137848b48cf4f$export$9be5dd6e61d5d73a);
var $b2e137848b48cf4f$export$9be5dd6e61d5d73a;
(function(CssTypes) {
  CssTypes["stylesheet"] = "stylesheet";
  CssTypes["rule"] = "rule";
  CssTypes["declaration"] = "declaration";
  CssTypes["comment"] = "comment";
  CssTypes["container"] = "container";
  CssTypes["charset"] = "charset";
  CssTypes["document"] = "document";
  CssTypes["customMedia"] = "custom-media";
  CssTypes["fontFace"] = "font-face";
  CssTypes["host"] = "host";
  CssTypes["import"] = "import";
  CssTypes["keyframes"] = "keyframes";
  CssTypes["keyframe"] = "keyframe";
  CssTypes["layer"] = "layer";
  CssTypes["media"] = "media";
  CssTypes["namespace"] = "namespace";
  CssTypes["page"] = "page";
  CssTypes["startingStyle"] = "starting-style";
  CssTypes["supports"] = "supports";
})($b2e137848b48cf4f$export$9be5dd6e61d5d73a || ($b2e137848b48cf4f$export$9be5dd6e61d5d73a = {}));
const $d708735ed1303b43$var$commentre = /\/\*[^]*?(?:\*\/|$)/g;
const $d708735ed1303b43$export$98e6a39c04603d36 = (css, options) => {
  options = options || {};
  let lineno = 1;
  let column = 1;
  function updatePosition(str) {
    const lines = str.match(/\n/g);
    if (lines) lineno += lines.length;
    const i = str.lastIndexOf("\n");
    column = ~i ? str.length - i : column + str.length;
  }
  function position() {
    const start = {
      line: lineno,
      column
    };
    return function(node) {
      node.position = new $0865a9fb4cc365fe$export$2e2bcd8739ae039(start, {
        line: lineno,
        column
      }, (options == null ? void 0 : options.source) || "");
      whitespace();
      return node;
    };
  }
  const errorsList = [];
  function error(msg) {
    const err = new $009ddb00d3ec72b8$export$2e2bcd8739ae039((options == null ? void 0 : options.source) || "", msg, lineno, column, css);
    if (options == null ? void 0 : options.silent) errorsList.push(err);
    else throw err;
  }
  function stylesheet() {
    const rulesList = rules();
    const result = {
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.stylesheet,
      stylesheet: {
        source: options == null ? void 0 : options.source,
        rules: rulesList,
        parsingErrors: errorsList
      }
    };
    return result;
  }
  function open() {
    return match(/^{\s*/);
  }
  function close() {
    return match(/^}/);
  }
  function rules() {
    let node;
    const rules2 = [];
    whitespace();
    comments(rules2);
    while (css.length && css.charAt(0) !== "}" && (node = atrule() || rule())) if (node) {
      rules2.push(node);
      comments(rules2);
    }
    return rules2;
  }
  function match(re) {
    const m = re.exec(css);
    if (!m) return;
    const str = m[0];
    updatePosition(str);
    css = css.slice(str.length);
    return m;
  }
  function whitespace() {
    match(/^\s*/);
  }
  function comments(rules2) {
    let c;
    rules2 = rules2 || [];
    while (c = comment()) if (c) rules2.push(c);
    return rules2;
  }
  function comment() {
    const pos = position();
    if ("/" !== css.charAt(0) || "*" !== css.charAt(1)) return;
    const m = match(/^\/\*[^]*?\*\//);
    if (!m) return error("End of comment missing");
    return pos({
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.comment,
      comment: m[0].slice(2, -2)
    });
  }
  function findClosingParenthese(str, start, depth) {
    let ptr = start + 1;
    let found = false;
    let closeParentheses = str.indexOf(")", ptr);
    while (!found && closeParentheses !== -1) {
      const nextParentheses = str.indexOf("(", ptr);
      if (nextParentheses !== -1 && nextParentheses < closeParentheses) {
        const nextSearch = findClosingParenthese(str, nextParentheses + 1);
        ptr = nextSearch + 1;
        closeParentheses = str.indexOf(")", ptr);
      } else found = true;
    }
    if (found && closeParentheses !== -1) return closeParentheses;
    else return -1;
  }
  function selector() {
    const m = match(/^([^{]+)/);
    if (!m) return;
    let res = $d708735ed1303b43$var$trim(m[0]).replace($d708735ed1303b43$var$commentre, "");
    if (res.indexOf(",") === -1) return [
      res
    ];
    let ptr = 0;
    let startParentheses = res.indexOf("(", ptr);
    while (startParentheses !== -1) {
      const closeParentheses = findClosingParenthese(res, startParentheses);
      if (closeParentheses === -1) break;
      ptr = closeParentheses + 1;
      res = res.substring(0, startParentheses) + res.substring(startParentheses, closeParentheses).replace(/,/g, "‌") + res.substring(closeParentheses);
      startParentheses = res.indexOf("(", ptr);
    }
    res = res.replace(/("|')(?:\\\1|.)*?\1/g, (m2) => m2.replace(/,/g, "‌"));
    return res.split(",").map((s) => {
      return $d708735ed1303b43$var$trim(s.replace(/\u200C/g, ","));
    });
  }
  function declaration() {
    const pos = position();
    const propMatch = match(/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
    if (!propMatch) return;
    const propValue = $d708735ed1303b43$var$trim(propMatch[0]);
    if (!match(/^:\s*/)) return error("property missing ':'");
    const val = match(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/);
    const ret = pos({
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.declaration,
      property: propValue.replace($d708735ed1303b43$var$commentre, ""),
      value: val ? $d708735ed1303b43$var$trim(val[0]).replace($d708735ed1303b43$var$commentre, "") : ""
    });
    match(/^[;\s]*/);
    return ret;
  }
  function declarations() {
    const decls = [];
    if (!open()) return error("missing '{'");
    comments(decls);
    let decl;
    while (decl = declaration()) if (decl) {
      decls.push(decl);
      comments(decls);
    }
    if (!close()) return error("missing '}'");
    return decls;
  }
  function keyframe() {
    let m;
    const vals = [];
    const pos = position();
    while (m = match(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/)) {
      vals.push(m[1]);
      match(/^,\s*/);
    }
    if (!vals.length) return;
    return pos({
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.keyframe,
      values: vals,
      declarations: declarations() || []
    });
  }
  function atkeyframes() {
    const pos = position();
    const m1 = match(/^@([-\w]+)?keyframes\s*/);
    if (!m1) return;
    const vendor = m1[1];
    const m2 = match(/^([-\w]+)\s*/);
    if (!m2) return error("@keyframes missing name");
    const name = m2[1];
    if (!open()) return error("@keyframes missing '{'");
    let frame;
    let frames = comments();
    while (frame = keyframe()) {
      frames.push(frame);
      frames = frames.concat(comments());
    }
    if (!close()) return error("@keyframes missing '}'");
    return pos({
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.keyframes,
      name,
      vendor,
      keyframes: frames
    });
  }
  function atsupports() {
    const pos = position();
    const m = match(/^@supports *([^{]+)/);
    if (!m) return;
    const supports = $d708735ed1303b43$var$trim(m[1]);
    if (!open()) return error("@supports missing '{'");
    const style = comments().concat(rules());
    if (!close()) return error("@supports missing '}'");
    return pos({
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.supports,
      supports,
      rules: style
    });
  }
  function athost() {
    const pos = position();
    const m = match(/^@host\s*/);
    if (!m) return;
    if (!open()) return error("@host missing '{'");
    const style = comments().concat(rules());
    if (!close()) return error("@host missing '}'");
    return pos({
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.host,
      rules: style
    });
  }
  function atcontainer() {
    const pos = position();
    const m = match(/^@container *([^{]+)/);
    if (!m) return;
    const container = $d708735ed1303b43$var$trim(m[1]);
    if (!open()) return error("@container missing '{'");
    const style = comments().concat(rules());
    if (!close()) return error("@container missing '}'");
    return pos({
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.container,
      container,
      rules: style
    });
  }
  function atlayer() {
    const pos = position();
    const m = match(/^@layer *([^{;@]+)/);
    if (!m) return;
    const layer = $d708735ed1303b43$var$trim(m[1]);
    if (!open()) {
      match(/^[;\s]*/);
      return pos({
        type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.layer,
        layer
      });
    }
    const style = comments().concat(rules());
    if (!close()) return error("@layer missing '}'");
    return pos({
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.layer,
      layer,
      rules: style
    });
  }
  function atmedia() {
    const pos = position();
    const m = match(/^@media *([^{]+)/);
    if (!m) return;
    const media = $d708735ed1303b43$var$trim(m[1]);
    if (!open()) return error("@media missing '{'");
    const style = comments().concat(rules());
    if (!close()) return error("@media missing '}'");
    return pos({
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.media,
      media,
      rules: style
    });
  }
  function atcustommedia() {
    const pos = position();
    const m = match(/^@custom-media\s+(--\S+)\s*([^{;\s][^{;]*);/);
    if (!m) return;
    return pos({
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.customMedia,
      name: $d708735ed1303b43$var$trim(m[1]),
      media: $d708735ed1303b43$var$trim(m[2])
    });
  }
  function atpage() {
    const pos = position();
    const m = match(/^@page */);
    if (!m) return;
    const sel = selector() || [];
    if (!open()) return error("@page missing '{'");
    let decls = comments();
    let decl;
    while (decl = declaration()) {
      decls.push(decl);
      decls = decls.concat(comments());
    }
    if (!close()) return error("@page missing '}'");
    return pos({
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.page,
      selectors: sel,
      declarations: decls
    });
  }
  function atdocument() {
    const pos = position();
    const m = match(/^@([-\w]+)?document *([^{]+)/);
    if (!m) return;
    const vendor = $d708735ed1303b43$var$trim(m[1]);
    const doc = $d708735ed1303b43$var$trim(m[2]);
    if (!open()) return error("@document missing '{'");
    const style = comments().concat(rules());
    if (!close()) return error("@document missing '}'");
    return pos({
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.document,
      document: doc,
      vendor,
      rules: style
    });
  }
  function atfontface() {
    const pos = position();
    const m = match(/^@font-face\s*/);
    if (!m) return;
    if (!open()) return error("@font-face missing '{'");
    let decls = comments();
    let decl;
    while (decl = declaration()) {
      decls.push(decl);
      decls = decls.concat(comments());
    }
    if (!close()) return error("@font-face missing '}'");
    return pos({
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.fontFace,
      declarations: decls
    });
  }
  function atstartingstyle() {
    const pos = position();
    const m = match(/^@starting-style\s*/);
    if (!m) return;
    if (!open()) return error("@starting-style missing '{'");
    const style = comments().concat(rules());
    if (!close()) return error("@starting-style missing '}'");
    return pos({
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.startingStyle,
      rules: style
    });
  }
  const atimport = _compileAtrule("import");
  const atcharset = _compileAtrule("charset");
  const atnamespace = _compileAtrule("namespace");
  function _compileAtrule(name) {
    const re = new RegExp("^@" + name + `\\s*((?::?[^;'"]|"(?:\\\\"|[^"])*?"|'(?:\\\\'|[^'])*?')+)(?:;|$)`);
    return function() {
      const pos = position();
      const m = match(re);
      if (!m) return;
      const ret = {
        type: name
      };
      ret[name] = m[1].trim();
      return pos(ret);
    };
  }
  function atrule() {
    if (css[0] !== "@") return;
    return atkeyframes() || atmedia() || atcustommedia() || atsupports() || atimport() || atcharset() || atnamespace() || atdocument() || atpage() || athost() || atfontface() || atcontainer() || atstartingstyle() || atlayer();
  }
  function rule() {
    const pos = position();
    const sel = selector();
    if (!sel) return error("selector missing");
    comments();
    return pos({
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.rule,
      selectors: sel,
      declarations: declarations() || []
    });
  }
  return $d708735ed1303b43$var$addParent(stylesheet());
};
function $d708735ed1303b43$var$trim(str) {
  return str ? str.trim() : "";
}
function $d708735ed1303b43$var$addParent(obj, parent) {
  const isNode = obj && typeof obj.type === "string";
  const childParent = isNode ? obj : parent;
  for (const k in obj) {
    const value = obj[k];
    if (Array.isArray(value)) value.forEach((v) => {
      $d708735ed1303b43$var$addParent(v, childParent);
    });
    else if (value && typeof value === "object") $d708735ed1303b43$var$addParent(value, childParent);
  }
  if (isNode) Object.defineProperty(obj, "parent", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: parent || null
  });
  return obj;
}
var $d708735ed1303b43$export$2e2bcd8739ae039 = $d708735ed1303b43$export$98e6a39c04603d36;
const $149c1bd638913645$export$98e6a39c04603d36 = $d708735ed1303b43$export$2e2bcd8739ae039;
var toStr = Object.prototype.toString;
function isCallable(fn) {
  return typeof fn === "function" || toStr.call(fn) === "[object Function]";
}
function toInteger(value) {
  var number = Number(value);
  if (isNaN(number)) {
    return 0;
  }
  if (number === 0 || !isFinite(number)) {
    return number;
  }
  return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
}
var maxSafeInteger = Math.pow(2, 53) - 1;
function toLength(value) {
  var len = toInteger(value);
  return Math.min(Math.max(len, 0), maxSafeInteger);
}
function arrayFrom(arrayLike, mapFn) {
  var C = Array;
  var items = Object(arrayLike);
  if (arrayLike == null) {
    throw new TypeError("Array.from requires an array-like object - not null or undefined");
  }
  var len = toLength(items.length);
  var A = isCallable(C) ? Object(new C(len)) : new Array(len);
  var k = 0;
  var kValue;
  while (k < len) {
    kValue = items[k];
    {
      A[k] = kValue;
    }
    k += 1;
  }
  A.length = len;
  return A;
}
function _typeof$1(o) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$1(o);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey$1(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _defineProperty$1(obj, key, value) {
  key = _toPropertyKey$1(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$1(arg) {
  var key = _toPrimitive$1(arg, "string");
  return _typeof$1(key) === "symbol" ? key : String(key);
}
function _toPrimitive$1(input, hint) {
  if (_typeof$1(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint);
    if (_typeof$1(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var SetLike = /* @__PURE__ */ function() {
  function SetLike2() {
    var items = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    _classCallCheck(this, SetLike2);
    _defineProperty$1(this, "items", void 0);
    this.items = items;
  }
  _createClass(SetLike2, [{
    key: "add",
    value: function add(value) {
      if (this.has(value) === false) {
        this.items.push(value);
      }
      return this;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.items = [];
    }
  }, {
    key: "delete",
    value: function _delete(value) {
      var previousLength = this.items.length;
      this.items = this.items.filter(function(item) {
        return item !== value;
      });
      return previousLength !== this.items.length;
    }
  }, {
    key: "forEach",
    value: function forEach(callbackfn) {
      var _this = this;
      this.items.forEach(function(item) {
        callbackfn(item, item, _this);
      });
    }
  }, {
    key: "has",
    value: function has(value) {
      return this.items.indexOf(value) !== -1;
    }
  }, {
    key: "size",
    get: function get2() {
      return this.items.length;
    }
  }]);
  return SetLike2;
}();
const SetLike$1 = typeof Set === "undefined" ? Set : SetLike;
function getLocalName(element) {
  var _element$localName;
  return (
    // eslint-disable-next-line no-restricted-properties -- actual guard for environments without localName
    (_element$localName = element.localName) !== null && _element$localName !== void 0 ? _element$localName : (
      // eslint-disable-next-line no-restricted-properties -- required for the fallback
      element.tagName.toLowerCase()
    )
  );
}
var localNameToRoleMappings = {
  article: "article",
  aside: "complementary",
  button: "button",
  datalist: "listbox",
  dd: "definition",
  details: "group",
  dialog: "dialog",
  dt: "term",
  fieldset: "group",
  figure: "figure",
  // WARNING: Only with an accessible name
  form: "form",
  footer: "contentinfo",
  h1: "heading",
  h2: "heading",
  h3: "heading",
  h4: "heading",
  h5: "heading",
  h6: "heading",
  header: "banner",
  hr: "separator",
  html: "document",
  legend: "legend",
  li: "listitem",
  math: "math",
  main: "main",
  menu: "list",
  nav: "navigation",
  ol: "list",
  optgroup: "group",
  // WARNING: Only in certain context
  option: "option",
  output: "status",
  progress: "progressbar",
  // WARNING: Only with an accessible name
  section: "region",
  summary: "button",
  table: "table",
  tbody: "rowgroup",
  textarea: "textbox",
  tfoot: "rowgroup",
  // WARNING: Only in certain context
  td: "cell",
  th: "columnheader",
  thead: "rowgroup",
  tr: "row",
  ul: "list"
};
var prohibitedAttributes = {
  caption: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  code: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  deletion: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  emphasis: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  generic: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby", "aria-roledescription"]),
  insertion: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  none: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  paragraph: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  presentation: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  strong: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  subscript: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  superscript: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"])
};
function hasGlobalAriaAttributes(element, role) {
  return [
    "aria-atomic",
    "aria-busy",
    "aria-controls",
    "aria-current",
    "aria-description",
    "aria-describedby",
    "aria-details",
    // "disabled",
    "aria-dropeffect",
    // "errormessage",
    "aria-flowto",
    "aria-grabbed",
    // "haspopup",
    "aria-hidden",
    // "invalid",
    "aria-keyshortcuts",
    "aria-label",
    "aria-labelledby",
    "aria-live",
    "aria-owns",
    "aria-relevant",
    "aria-roledescription"
  ].some(function(attributeName) {
    var _prohibitedAttributes;
    return element.hasAttribute(attributeName) && !((_prohibitedAttributes = prohibitedAttributes[role]) !== null && _prohibitedAttributes !== void 0 && _prohibitedAttributes.has(attributeName));
  });
}
function ignorePresentationalRole(element, implicitRole) {
  return hasGlobalAriaAttributes(element, implicitRole);
}
function getRole(element) {
  var explicitRole = getExplicitRole(element);
  if (explicitRole === null || presentationRoles.indexOf(explicitRole) !== -1) {
    var implicitRole = getImplicitRole(element);
    if (presentationRoles.indexOf(explicitRole || "") === -1 || ignorePresentationalRole(element, implicitRole || "")) {
      return implicitRole;
    }
  }
  return explicitRole;
}
function getImplicitRole(element) {
  var mappedByTag = localNameToRoleMappings[getLocalName(element)];
  if (mappedByTag !== void 0) {
    return mappedByTag;
  }
  switch (getLocalName(element)) {
    case "a":
    case "area":
    case "link":
      if (element.hasAttribute("href")) {
        return "link";
      }
      break;
    case "img":
      if (element.getAttribute("alt") === "" && !ignorePresentationalRole(element, "img")) {
        return "presentation";
      }
      return "img";
    case "input": {
      var _ref = element, type = _ref.type;
      switch (type) {
        case "button":
        case "image":
        case "reset":
        case "submit":
          return "button";
        case "checkbox":
        case "radio":
          return type;
        case "range":
          return "slider";
        case "email":
        case "tel":
        case "text":
        case "url":
          if (element.hasAttribute("list")) {
            return "combobox";
          }
          return "textbox";
        case "search":
          if (element.hasAttribute("list")) {
            return "combobox";
          }
          return "searchbox";
        case "number":
          return "spinbutton";
        default:
          return null;
      }
    }
    case "select":
      if (element.hasAttribute("multiple") || element.size > 1) {
        return "listbox";
      }
      return "combobox";
  }
  return null;
}
function getExplicitRole(element) {
  var role = element.getAttribute("role");
  if (role !== null) {
    var explicitRole = role.trim().split(" ")[0];
    if (explicitRole.length > 0) {
      return explicitRole;
    }
  }
  return null;
}
var presentationRoles = ["presentation", "none"];
function isElement(node) {
  return node !== null && node.nodeType === node.ELEMENT_NODE;
}
function isHTMLTableCaptionElement(node) {
  return isElement(node) && getLocalName(node) === "caption";
}
function isHTMLInputElement(node) {
  return isElement(node) && getLocalName(node) === "input";
}
function isHTMLOptGroupElement(node) {
  return isElement(node) && getLocalName(node) === "optgroup";
}
function isHTMLSelectElement(node) {
  return isElement(node) && getLocalName(node) === "select";
}
function isHTMLTableElement(node) {
  return isElement(node) && getLocalName(node) === "table";
}
function isHTMLTextAreaElement(node) {
  return isElement(node) && getLocalName(node) === "textarea";
}
function safeWindow(node) {
  var _ref = node.ownerDocument === null ? node : node.ownerDocument, defaultView = _ref.defaultView;
  if (defaultView === null) {
    throw new TypeError("no window available");
  }
  return defaultView;
}
function isHTMLFieldSetElement(node) {
  return isElement(node) && getLocalName(node) === "fieldset";
}
function isHTMLLegendElement(node) {
  return isElement(node) && getLocalName(node) === "legend";
}
function isHTMLSlotElement(node) {
  return isElement(node) && getLocalName(node) === "slot";
}
function isSVGElement(node) {
  return isElement(node) && node.ownerSVGElement !== void 0;
}
function isSVGSVGElement(node) {
  return isElement(node) && getLocalName(node) === "svg";
}
function isSVGTitleElement(node) {
  return isSVGElement(node) && getLocalName(node) === "title";
}
function queryIdRefs(node, attributeName) {
  if (isElement(node) && node.hasAttribute(attributeName)) {
    var ids = node.getAttribute(attributeName).split(" ");
    var root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    return ids.map(function(id) {
      return root.getElementById(id);
    }).filter(
      function(element) {
        return element !== null;
      }
      // TODO: why does this not narrow?
    );
  }
  return [];
}
function hasAnyConcreteRoles(node, roles) {
  if (isElement(node)) {
    return roles.indexOf(getRole(node)) !== -1;
  }
  return false;
}
function asFlatString(s) {
  return s.trim().replace(/\s\s+/g, " ");
}
function isHidden(node, getComputedStyleImplementation) {
  if (!isElement(node)) {
    return false;
  }
  if (node.hasAttribute("hidden") || node.getAttribute("aria-hidden") === "true") {
    return true;
  }
  var style = getComputedStyleImplementation(node);
  return style.getPropertyValue("display") === "none" || style.getPropertyValue("visibility") === "hidden";
}
function isControl(node) {
  return hasAnyConcreteRoles(node, ["button", "combobox", "listbox", "textbox"]) || hasAbstractRole(node, "range");
}
function hasAbstractRole(node, role) {
  if (!isElement(node)) {
    return false;
  }
  switch (role) {
    case "range":
      return hasAnyConcreteRoles(node, ["meter", "progressbar", "scrollbar", "slider", "spinbutton"]);
    default:
      throw new TypeError("No knowledge about abstract role '".concat(role, "'. This is likely a bug :("));
  }
}
function querySelectorAllSubtree(element, selectors) {
  var elements = arrayFrom(element.querySelectorAll(selectors));
  queryIdRefs(element, "aria-owns").forEach(function(root) {
    elements.push.apply(elements, arrayFrom(root.querySelectorAll(selectors)));
  });
  return elements;
}
function querySelectedOptions(listbox) {
  if (isHTMLSelectElement(listbox)) {
    return listbox.selectedOptions || querySelectorAllSubtree(listbox, "[selected]");
  }
  return querySelectorAllSubtree(listbox, '[aria-selected="true"]');
}
function isMarkedPresentational(node) {
  return hasAnyConcreteRoles(node, presentationRoles);
}
function isNativeHostLanguageTextAlternativeElement(node) {
  return isHTMLTableCaptionElement(node);
}
function allowsNameFromContent(node) {
  return hasAnyConcreteRoles(node, ["button", "cell", "checkbox", "columnheader", "gridcell", "heading", "label", "legend", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "row", "rowheader", "switch", "tab", "tooltip", "treeitem"]);
}
function isDescendantOfNativeHostLanguageTextAlternativeElement(node) {
  return false;
}
function getValueOfTextbox(element) {
  if (isHTMLInputElement(element) || isHTMLTextAreaElement(element)) {
    return element.value;
  }
  return element.textContent || "";
}
function getTextualContent(declaration) {
  var content = declaration.getPropertyValue("content");
  if (/^["'].*["']$/.test(content)) {
    return content.slice(1, -1);
  }
  return "";
}
function isLabelableElement(element) {
  var localName = getLocalName(element);
  return localName === "button" || localName === "input" && element.getAttribute("type") !== "hidden" || localName === "meter" || localName === "output" || localName === "progress" || localName === "select" || localName === "textarea";
}
function findLabelableElement(element) {
  if (isLabelableElement(element)) {
    return element;
  }
  var labelableElement = null;
  element.childNodes.forEach(function(childNode) {
    if (labelableElement === null && isElement(childNode)) {
      var descendantLabelableElement = findLabelableElement(childNode);
      if (descendantLabelableElement !== null) {
        labelableElement = descendantLabelableElement;
      }
    }
  });
  return labelableElement;
}
function getControlOfLabel(label) {
  if (label.control !== void 0) {
    return label.control;
  }
  var htmlFor = label.getAttribute("for");
  if (htmlFor !== null) {
    return label.ownerDocument.getElementById(htmlFor);
  }
  return findLabelableElement(label);
}
function getLabels(element) {
  var labelsProperty = element.labels;
  if (labelsProperty === null) {
    return labelsProperty;
  }
  if (labelsProperty !== void 0) {
    return arrayFrom(labelsProperty);
  }
  if (!isLabelableElement(element)) {
    return null;
  }
  var document2 = element.ownerDocument;
  return arrayFrom(document2.querySelectorAll("label")).filter(function(label) {
    return getControlOfLabel(label) === element;
  });
}
function getSlotContents(slot) {
  var assignedNodes = slot.assignedNodes();
  if (assignedNodes.length === 0) {
    return arrayFrom(slot.childNodes);
  }
  return assignedNodes;
}
function computeTextAlternative(root) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var consultedNodes = new SetLike$1();
  var window2 = safeWindow(root);
  var _options$compute = options.compute, compute = _options$compute === void 0 ? "name" : _options$compute, _options$computedStyl = options.computedStyleSupportsPseudoElements, computedStyleSupportsPseudoElements = _options$computedStyl === void 0 ? options.getComputedStyle !== void 0 : _options$computedStyl, _options$getComputedS = options.getComputedStyle, getComputedStyle = _options$getComputedS === void 0 ? window2.getComputedStyle.bind(window2) : _options$getComputedS, _options$hidden = options.hidden, hidden = _options$hidden === void 0 ? false : _options$hidden;
  function computeMiscTextAlternative(node, context) {
    var accumulatedText = "";
    if (isElement(node) && computedStyleSupportsPseudoElements) {
      var pseudoBefore = getComputedStyle(node, "::before");
      var beforeContent = getTextualContent(pseudoBefore);
      accumulatedText = "".concat(beforeContent, " ").concat(accumulatedText);
    }
    var childNodes = isHTMLSlotElement(node) ? getSlotContents(node) : arrayFrom(node.childNodes).concat(queryIdRefs(node, "aria-owns"));
    childNodes.forEach(function(child) {
      var result = computeTextAlternative2(child, {
        isEmbeddedInLabel: context.isEmbeddedInLabel,
        isReferenced: false,
        recursion: true
      });
      var display2 = isElement(child) ? getComputedStyle(child).getPropertyValue("display") : "inline";
      var separator = display2 !== "inline" ? " " : "";
      accumulatedText += "".concat(separator).concat(result).concat(separator);
    });
    if (isElement(node) && computedStyleSupportsPseudoElements) {
      var pseudoAfter = getComputedStyle(node, "::after");
      var afterContent = getTextualContent(pseudoAfter);
      accumulatedText = "".concat(accumulatedText, " ").concat(afterContent);
    }
    return accumulatedText.trim();
  }
  function useAttribute(element, attributeName) {
    var attribute = element.getAttributeNode(attributeName);
    if (attribute !== null && !consultedNodes.has(attribute) && attribute.value.trim() !== "") {
      consultedNodes.add(attribute);
      return attribute.value;
    }
    return null;
  }
  function computeTooltipAttributeValue(node) {
    if (!isElement(node)) {
      return null;
    }
    return useAttribute(node, "title");
  }
  function computeElementTextAlternative(node) {
    if (!isElement(node)) {
      return null;
    }
    if (isHTMLFieldSetElement(node)) {
      consultedNodes.add(node);
      var children = arrayFrom(node.childNodes);
      for (var i = 0; i < children.length; i += 1) {
        var child = children[i];
        if (isHTMLLegendElement(child)) {
          return computeTextAlternative2(child, {
            isEmbeddedInLabel: false,
            isReferenced: false,
            recursion: false
          });
        }
      }
    } else if (isHTMLTableElement(node)) {
      consultedNodes.add(node);
      var _children = arrayFrom(node.childNodes);
      for (var _i = 0; _i < _children.length; _i += 1) {
        var _child = _children[_i];
        if (isHTMLTableCaptionElement(_child)) {
          return computeTextAlternative2(_child, {
            isEmbeddedInLabel: false,
            isReferenced: false,
            recursion: false
          });
        }
      }
    } else if (isSVGSVGElement(node)) {
      consultedNodes.add(node);
      var _children2 = arrayFrom(node.childNodes);
      for (var _i2 = 0; _i2 < _children2.length; _i2 += 1) {
        var _child2 = _children2[_i2];
        if (isSVGTitleElement(_child2)) {
          return _child2.textContent;
        }
      }
      return null;
    } else if (getLocalName(node) === "img" || getLocalName(node) === "area") {
      var nameFromAlt = useAttribute(node, "alt");
      if (nameFromAlt !== null) {
        return nameFromAlt;
      }
    } else if (isHTMLOptGroupElement(node)) {
      var nameFromLabel = useAttribute(node, "label");
      if (nameFromLabel !== null) {
        return nameFromLabel;
      }
    }
    if (isHTMLInputElement(node) && (node.type === "button" || node.type === "submit" || node.type === "reset")) {
      var nameFromValue = useAttribute(node, "value");
      if (nameFromValue !== null) {
        return nameFromValue;
      }
      if (node.type === "submit") {
        return "Submit";
      }
      if (node.type === "reset") {
        return "Reset";
      }
    }
    var labels = getLabels(node);
    if (labels !== null && labels.length !== 0) {
      consultedNodes.add(node);
      return arrayFrom(labels).map(function(element) {
        return computeTextAlternative2(element, {
          isEmbeddedInLabel: true,
          isReferenced: false,
          recursion: true
        });
      }).filter(function(label) {
        return label.length > 0;
      }).join(" ");
    }
    if (isHTMLInputElement(node) && node.type === "image") {
      var _nameFromAlt = useAttribute(node, "alt");
      if (_nameFromAlt !== null) {
        return _nameFromAlt;
      }
      var nameFromTitle = useAttribute(node, "title");
      if (nameFromTitle !== null) {
        return nameFromTitle;
      }
      return "Submit Query";
    }
    if (hasAnyConcreteRoles(node, ["button"])) {
      var nameFromSubTree = computeMiscTextAlternative(node, {
        isEmbeddedInLabel: false
      });
      if (nameFromSubTree !== "") {
        return nameFromSubTree;
      }
    }
    return null;
  }
  function computeTextAlternative2(current, context) {
    if (consultedNodes.has(current)) {
      return "";
    }
    if (!hidden && isHidden(current, getComputedStyle) && !context.isReferenced) {
      consultedNodes.add(current);
      return "";
    }
    var labelAttributeNode = isElement(current) ? current.getAttributeNode("aria-labelledby") : null;
    var labelElements = labelAttributeNode !== null && !consultedNodes.has(labelAttributeNode) ? queryIdRefs(current, "aria-labelledby") : [];
    if (compute === "name" && !context.isReferenced && labelElements.length > 0) {
      consultedNodes.add(labelAttributeNode);
      return labelElements.map(function(element) {
        return computeTextAlternative2(element, {
          isEmbeddedInLabel: context.isEmbeddedInLabel,
          isReferenced: true,
          // this isn't recursion as specified, otherwise we would skip
          // `aria-label` in
          // <input id="myself" aria-label="foo" aria-labelledby="myself"
          recursion: false
        });
      }).join(" ");
    }
    var skipToStep2E = context.recursion && isControl(current) && compute === "name";
    if (!skipToStep2E) {
      var ariaLabel = (isElement(current) && current.getAttribute("aria-label") || "").trim();
      if (ariaLabel !== "" && compute === "name") {
        consultedNodes.add(current);
        return ariaLabel;
      }
      if (!isMarkedPresentational(current)) {
        var elementTextAlternative = computeElementTextAlternative(current);
        if (elementTextAlternative !== null) {
          consultedNodes.add(current);
          return elementTextAlternative;
        }
      }
    }
    if (hasAnyConcreteRoles(current, ["menu"])) {
      consultedNodes.add(current);
      return "";
    }
    if (skipToStep2E || context.isEmbeddedInLabel || context.isReferenced) {
      if (hasAnyConcreteRoles(current, ["combobox", "listbox"])) {
        consultedNodes.add(current);
        var selectedOptions = querySelectedOptions(current);
        if (selectedOptions.length === 0) {
          return isHTMLInputElement(current) ? current.value : "";
        }
        return arrayFrom(selectedOptions).map(function(selectedOption) {
          return computeTextAlternative2(selectedOption, {
            isEmbeddedInLabel: context.isEmbeddedInLabel,
            isReferenced: false,
            recursion: true
          });
        }).join(" ");
      }
      if (hasAbstractRole(current, "range")) {
        consultedNodes.add(current);
        if (current.hasAttribute("aria-valuetext")) {
          return current.getAttribute("aria-valuetext");
        }
        if (current.hasAttribute("aria-valuenow")) {
          return current.getAttribute("aria-valuenow");
        }
        return current.getAttribute("value") || "";
      }
      if (hasAnyConcreteRoles(current, ["textbox"])) {
        consultedNodes.add(current);
        return getValueOfTextbox(current);
      }
    }
    if (allowsNameFromContent(current) || isElement(current) && context.isReferenced || isNativeHostLanguageTextAlternativeElement(current) || isDescendantOfNativeHostLanguageTextAlternativeElement()) {
      var accumulatedText2F = computeMiscTextAlternative(current, {
        isEmbeddedInLabel: context.isEmbeddedInLabel
      });
      if (accumulatedText2F !== "") {
        consultedNodes.add(current);
        return accumulatedText2F;
      }
    }
    if (current.nodeType === current.TEXT_NODE) {
      consultedNodes.add(current);
      return current.textContent || "";
    }
    if (context.recursion) {
      consultedNodes.add(current);
      return computeMiscTextAlternative(current, {
        isEmbeddedInLabel: context.isEmbeddedInLabel
      });
    }
    var tooltipAttributeValue = computeTooltipAttributeValue(current);
    if (tooltipAttributeValue !== null) {
      consultedNodes.add(current);
      return tooltipAttributeValue;
    }
    consultedNodes.add(current);
    return "";
  }
  return asFlatString(computeTextAlternative2(root, {
    isEmbeddedInLabel: false,
    // by spec computeAccessibleDescription starts with the referenced elements as roots
    isReferenced: compute === "description",
    recursion: false
  }));
}
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint);
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function computeAccessibleDescription(root) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var description = queryIdRefs(root, "aria-describedby").map(function(element) {
    return computeTextAlternative(element, _objectSpread(_objectSpread({}, options), {}, {
      compute: "description"
    }));
  }).join(" ");
  if (description === "") {
    var ariaDescription = root.getAttribute("aria-description");
    description = ariaDescription === null ? "" : ariaDescription;
  }
  if (description === "") {
    var title = root.getAttribute("title");
    description = title === null ? "" : title;
  }
  return description;
}
function prohibitsNaming(node) {
  return hasAnyConcreteRoles(node, ["caption", "code", "deletion", "emphasis", "generic", "insertion", "none", "paragraph", "presentation", "strong", "subscript", "superscript"]);
}
function computeAccessibleName(root) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (prohibitsNaming(root)) {
    return "";
  }
  return computeTextAlternative(root, options);
}
var lib = {};
var ariaPropsMap = {};
var iterationDecorator = {};
var iteratorProxy = {};
var hasRequiredIteratorProxy;
function requireIteratorProxy() {
  if (hasRequiredIteratorProxy) return iteratorProxy;
  hasRequiredIteratorProxy = 1;
  Object.defineProperty(iteratorProxy, "__esModule", {
    value: true
  });
  iteratorProxy.default = void 0;
  function iteratorProxy$1() {
    var values = this;
    var index = 0;
    var iter = {
      "@@iterator": function iterator() {
        return iter;
      },
      next: function next() {
        if (index < values.length) {
          var value = values[index];
          index = index + 1;
          return {
            done: false,
            value
          };
        } else {
          return {
            done: true
          };
        }
      }
    };
    return iter;
  }
  var _default = iteratorProxy$1;
  iteratorProxy.default = _default;
  return iteratorProxy;
}
var hasRequiredIterationDecorator;
function requireIterationDecorator() {
  if (hasRequiredIterationDecorator) return iterationDecorator;
  hasRequiredIterationDecorator = 1;
  Object.defineProperty(iterationDecorator, "__esModule", {
    value: true
  });
  iterationDecorator.default = iterationDecorator$1;
  var _iteratorProxy = _interopRequireDefault(requireIteratorProxy());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _typeof2(obj) {
    "@babel/helpers - typeof";
    return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, _typeof2(obj);
  }
  function iterationDecorator$1(collection, entries) {
    if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
      Object.defineProperty(collection, Symbol.iterator, {
        value: _iteratorProxy.default.bind(entries)
      });
    }
    return collection;
  }
  return iterationDecorator;
}
var hasRequiredAriaPropsMap;
function requireAriaPropsMap() {
  if (hasRequiredAriaPropsMap) return ariaPropsMap;
  hasRequiredAriaPropsMap = 1;
  Object.defineProperty(ariaPropsMap, "__esModule", {
    value: true
  });
  ariaPropsMap.default = void 0;
  var _iterationDecorator = _interopRequireDefault(requireIterationDecorator());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike) {
        if (it) o = it;
        var i = 0;
        var F = function F2() {
        };
        return { s: F, n: function n() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        }, e: function e(_e2) {
          throw _e2;
        }, f: F };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return { s: function s() {
      it = it.call(o);
    }, n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    }, e: function e(_e3) {
      didErr = true;
      err = _e3;
    }, f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    } };
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  var properties = [["aria-activedescendant", {
    "type": "id"
  }], ["aria-atomic", {
    "type": "boolean"
  }], ["aria-autocomplete", {
    "type": "token",
    "values": ["inline", "list", "both", "none"]
  }], ["aria-braillelabel", {
    "type": "string"
  }], ["aria-brailleroledescription", {
    "type": "string"
  }], ["aria-busy", {
    "type": "boolean"
  }], ["aria-checked", {
    "type": "tristate"
  }], ["aria-colcount", {
    type: "integer"
  }], ["aria-colindex", {
    type: "integer"
  }], ["aria-colspan", {
    type: "integer"
  }], ["aria-controls", {
    "type": "idlist"
  }], ["aria-current", {
    type: "token",
    values: ["page", "step", "location", "date", "time", true, false]
  }], ["aria-describedby", {
    "type": "idlist"
  }], ["aria-description", {
    "type": "string"
  }], ["aria-details", {
    "type": "id"
  }], ["aria-disabled", {
    "type": "boolean"
  }], ["aria-dropeffect", {
    "type": "tokenlist",
    "values": ["copy", "execute", "link", "move", "none", "popup"]
  }], ["aria-errormessage", {
    "type": "id"
  }], ["aria-expanded", {
    "type": "boolean",
    "allowundefined": true
  }], ["aria-flowto", {
    "type": "idlist"
  }], ["aria-grabbed", {
    "type": "boolean",
    "allowundefined": true
  }], ["aria-haspopup", {
    "type": "token",
    "values": [false, true, "menu", "listbox", "tree", "grid", "dialog"]
  }], ["aria-hidden", {
    "type": "boolean",
    "allowundefined": true
  }], ["aria-invalid", {
    "type": "token",
    "values": ["grammar", false, "spelling", true]
  }], ["aria-keyshortcuts", {
    type: "string"
  }], ["aria-label", {
    "type": "string"
  }], ["aria-labelledby", {
    "type": "idlist"
  }], ["aria-level", {
    "type": "integer"
  }], ["aria-live", {
    "type": "token",
    "values": ["assertive", "off", "polite"]
  }], ["aria-modal", {
    type: "boolean"
  }], ["aria-multiline", {
    "type": "boolean"
  }], ["aria-multiselectable", {
    "type": "boolean"
  }], ["aria-orientation", {
    "type": "token",
    "values": ["vertical", "undefined", "horizontal"]
  }], ["aria-owns", {
    "type": "idlist"
  }], ["aria-placeholder", {
    type: "string"
  }], ["aria-posinset", {
    "type": "integer"
  }], ["aria-pressed", {
    "type": "tristate"
  }], ["aria-readonly", {
    "type": "boolean"
  }], ["aria-relevant", {
    "type": "tokenlist",
    "values": ["additions", "all", "removals", "text"]
  }], ["aria-required", {
    "type": "boolean"
  }], ["aria-roledescription", {
    type: "string"
  }], ["aria-rowcount", {
    type: "integer"
  }], ["aria-rowindex", {
    type: "integer"
  }], ["aria-rowspan", {
    type: "integer"
  }], ["aria-selected", {
    "type": "boolean",
    "allowundefined": true
  }], ["aria-setsize", {
    "type": "integer"
  }], ["aria-sort", {
    "type": "token",
    "values": ["ascending", "descending", "none", "other"]
  }], ["aria-valuemax", {
    "type": "number"
  }], ["aria-valuemin", {
    "type": "number"
  }], ["aria-valuenow", {
    "type": "number"
  }], ["aria-valuetext", {
    "type": "string"
  }]];
  var ariaPropsMap$1 = {
    entries: function entries() {
      return properties;
    },
    forEach: function forEach(fn) {
      var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
      var _iterator = _createForOfIteratorHelper(properties), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var _step$value = _slicedToArray(_step.value, 2), key = _step$value[0], values = _step$value[1];
          fn.call(thisArg, values, key, properties);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },
    get: function get2(key) {
      var item = properties.find(function(tuple) {
        return tuple[0] === key ? true : false;
      });
      return item && item[1];
    },
    has: function has(key) {
      return !!ariaPropsMap$1.get(key);
    },
    keys: function keys() {
      return properties.map(function(_ref) {
        var _ref2 = _slicedToArray(_ref, 1), key = _ref2[0];
        return key;
      });
    },
    values: function values() {
      return properties.map(function(_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2), values2 = _ref4[1];
        return values2;
      });
    }
  };
  var _default = (0, _iterationDecorator.default)(ariaPropsMap$1, ariaPropsMap$1.entries());
  ariaPropsMap.default = _default;
  return ariaPropsMap;
}
var domMap = {};
var hasRequiredDomMap;
function requireDomMap() {
  if (hasRequiredDomMap) return domMap;
  hasRequiredDomMap = 1;
  Object.defineProperty(domMap, "__esModule", {
    value: true
  });
  domMap.default = void 0;
  var _iterationDecorator = _interopRequireDefault(requireIterationDecorator());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike) {
        if (it) o = it;
        var i = 0;
        var F = function F2() {
        };
        return { s: F, n: function n() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        }, e: function e(_e2) {
          throw _e2;
        }, f: F };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return { s: function s() {
      it = it.call(o);
    }, n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    }, e: function e(_e3) {
      didErr = true;
      err = _e3;
    }, f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    } };
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  var dom = [["a", {
    reserved: false
  }], ["abbr", {
    reserved: false
  }], ["acronym", {
    reserved: false
  }], ["address", {
    reserved: false
  }], ["applet", {
    reserved: false
  }], ["area", {
    reserved: false
  }], ["article", {
    reserved: false
  }], ["aside", {
    reserved: false
  }], ["audio", {
    reserved: false
  }], ["b", {
    reserved: false
  }], ["base", {
    reserved: true
  }], ["bdi", {
    reserved: false
  }], ["bdo", {
    reserved: false
  }], ["big", {
    reserved: false
  }], ["blink", {
    reserved: false
  }], ["blockquote", {
    reserved: false
  }], ["body", {
    reserved: false
  }], ["br", {
    reserved: false
  }], ["button", {
    reserved: false
  }], ["canvas", {
    reserved: false
  }], ["caption", {
    reserved: false
  }], ["center", {
    reserved: false
  }], ["cite", {
    reserved: false
  }], ["code", {
    reserved: false
  }], ["col", {
    reserved: true
  }], ["colgroup", {
    reserved: true
  }], ["content", {
    reserved: false
  }], ["data", {
    reserved: false
  }], ["datalist", {
    reserved: false
  }], ["dd", {
    reserved: false
  }], ["del", {
    reserved: false
  }], ["details", {
    reserved: false
  }], ["dfn", {
    reserved: false
  }], ["dialog", {
    reserved: false
  }], ["dir", {
    reserved: false
  }], ["div", {
    reserved: false
  }], ["dl", {
    reserved: false
  }], ["dt", {
    reserved: false
  }], ["em", {
    reserved: false
  }], ["embed", {
    reserved: false
  }], ["fieldset", {
    reserved: false
  }], ["figcaption", {
    reserved: false
  }], ["figure", {
    reserved: false
  }], ["font", {
    reserved: false
  }], ["footer", {
    reserved: false
  }], ["form", {
    reserved: false
  }], ["frame", {
    reserved: false
  }], ["frameset", {
    reserved: false
  }], ["h1", {
    reserved: false
  }], ["h2", {
    reserved: false
  }], ["h3", {
    reserved: false
  }], ["h4", {
    reserved: false
  }], ["h5", {
    reserved: false
  }], ["h6", {
    reserved: false
  }], ["head", {
    reserved: true
  }], ["header", {
    reserved: false
  }], ["hgroup", {
    reserved: false
  }], ["hr", {
    reserved: false
  }], ["html", {
    reserved: true
  }], ["i", {
    reserved: false
  }], ["iframe", {
    reserved: false
  }], ["img", {
    reserved: false
  }], ["input", {
    reserved: false
  }], ["ins", {
    reserved: false
  }], ["kbd", {
    reserved: false
  }], ["keygen", {
    reserved: false
  }], ["label", {
    reserved: false
  }], ["legend", {
    reserved: false
  }], ["li", {
    reserved: false
  }], ["link", {
    reserved: true
  }], ["main", {
    reserved: false
  }], ["map", {
    reserved: false
  }], ["mark", {
    reserved: false
  }], ["marquee", {
    reserved: false
  }], ["menu", {
    reserved: false
  }], ["menuitem", {
    reserved: false
  }], ["meta", {
    reserved: true
  }], ["meter", {
    reserved: false
  }], ["nav", {
    reserved: false
  }], ["noembed", {
    reserved: true
  }], ["noscript", {
    reserved: true
  }], ["object", {
    reserved: false
  }], ["ol", {
    reserved: false
  }], ["optgroup", {
    reserved: false
  }], ["option", {
    reserved: false
  }], ["output", {
    reserved: false
  }], ["p", {
    reserved: false
  }], ["param", {
    reserved: true
  }], ["picture", {
    reserved: true
  }], ["pre", {
    reserved: false
  }], ["progress", {
    reserved: false
  }], ["q", {
    reserved: false
  }], ["rp", {
    reserved: false
  }], ["rt", {
    reserved: false
  }], ["rtc", {
    reserved: false
  }], ["ruby", {
    reserved: false
  }], ["s", {
    reserved: false
  }], ["samp", {
    reserved: false
  }], ["script", {
    reserved: true
  }], ["section", {
    reserved: false
  }], ["select", {
    reserved: false
  }], ["small", {
    reserved: false
  }], ["source", {
    reserved: true
  }], ["spacer", {
    reserved: false
  }], ["span", {
    reserved: false
  }], ["strike", {
    reserved: false
  }], ["strong", {
    reserved: false
  }], ["style", {
    reserved: true
  }], ["sub", {
    reserved: false
  }], ["summary", {
    reserved: false
  }], ["sup", {
    reserved: false
  }], ["table", {
    reserved: false
  }], ["tbody", {
    reserved: false
  }], ["td", {
    reserved: false
  }], ["textarea", {
    reserved: false
  }], ["tfoot", {
    reserved: false
  }], ["th", {
    reserved: false
  }], ["thead", {
    reserved: false
  }], ["time", {
    reserved: false
  }], ["title", {
    reserved: true
  }], ["tr", {
    reserved: false
  }], ["track", {
    reserved: true
  }], ["tt", {
    reserved: false
  }], ["u", {
    reserved: false
  }], ["ul", {
    reserved: false
  }], ["var", {
    reserved: false
  }], ["video", {
    reserved: false
  }], ["wbr", {
    reserved: false
  }], ["xmp", {
    reserved: false
  }]];
  var domMap$1 = {
    entries: function entries() {
      return dom;
    },
    forEach: function forEach(fn) {
      var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
      var _iterator = _createForOfIteratorHelper(dom), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var _step$value = _slicedToArray(_step.value, 2), key = _step$value[0], values = _step$value[1];
          fn.call(thisArg, values, key, dom);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },
    get: function get2(key) {
      var item = dom.find(function(tuple) {
        return tuple[0] === key ? true : false;
      });
      return item && item[1];
    },
    has: function has(key) {
      return !!domMap$1.get(key);
    },
    keys: function keys() {
      return dom.map(function(_ref) {
        var _ref2 = _slicedToArray(_ref, 1), key = _ref2[0];
        return key;
      });
    },
    values: function values() {
      return dom.map(function(_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2), values2 = _ref4[1];
        return values2;
      });
    }
  };
  var _default = (0, _iterationDecorator.default)(domMap$1, domMap$1.entries());
  domMap.default = _default;
  return domMap;
}
var rolesMap = {};
var ariaAbstractRoles = {};
var commandRole = {};
var hasRequiredCommandRole;
function requireCommandRole() {
  if (hasRequiredCommandRole) return commandRole;
  hasRequiredCommandRole = 1;
  Object.defineProperty(commandRole, "__esModule", {
    value: true
  });
  commandRole.default = void 0;
  var commandRole$1 = {
    abstract: true,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget"]]
  };
  var _default = commandRole$1;
  commandRole.default = _default;
  return commandRole;
}
var compositeRole = {};
var hasRequiredCompositeRole;
function requireCompositeRole() {
  if (hasRequiredCompositeRole) return compositeRole;
  hasRequiredCompositeRole = 1;
  Object.defineProperty(compositeRole, "__esModule", {
    value: true
  });
  compositeRole.default = void 0;
  var compositeRole$1 = {
    abstract: true,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-activedescendant": null,
      "aria-disabled": null
    },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget"]]
  };
  var _default = compositeRole$1;
  compositeRole.default = _default;
  return compositeRole;
}
var inputRole = {};
var hasRequiredInputRole;
function requireInputRole() {
  if (hasRequiredInputRole) return inputRole;
  hasRequiredInputRole = 1;
  Object.defineProperty(inputRole, "__esModule", {
    value: true
  });
  inputRole.default = void 0;
  var inputRole$1 = {
    abstract: true,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null
    },
    relatedConcepts: [{
      concept: {
        name: "input"
      },
      module: "XForms"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget"]]
  };
  var _default = inputRole$1;
  inputRole.default = _default;
  return inputRole;
}
var landmarkRole = {};
var hasRequiredLandmarkRole;
function requireLandmarkRole() {
  if (hasRequiredLandmarkRole) return landmarkRole;
  hasRequiredLandmarkRole = 1;
  Object.defineProperty(landmarkRole, "__esModule", {
    value: true
  });
  landmarkRole.default = void 0;
  var landmarkRole$1 = {
    abstract: true,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = landmarkRole$1;
  landmarkRole.default = _default;
  return landmarkRole;
}
var rangeRole = {};
var hasRequiredRangeRole;
function requireRangeRole() {
  if (hasRequiredRangeRole) return rangeRole;
  hasRequiredRangeRole = 1;
  Object.defineProperty(rangeRole, "__esModule", {
    value: true
  });
  rangeRole.default = void 0;
  var rangeRole$1 = {
    abstract: true,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-valuemax": null,
      "aria-valuemin": null,
      "aria-valuenow": null
    },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure"]]
  };
  var _default = rangeRole$1;
  rangeRole.default = _default;
  return rangeRole;
}
var roletypeRole = {};
var hasRequiredRoletypeRole;
function requireRoletypeRole() {
  if (hasRequiredRoletypeRole) return roletypeRole;
  hasRequiredRoletypeRole = 1;
  Object.defineProperty(roletypeRole, "__esModule", {
    value: true
  });
  roletypeRole.default = void 0;
  var roletypeRole$1 = {
    abstract: true,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: [],
    prohibitedProps: [],
    props: {
      "aria-atomic": null,
      "aria-busy": null,
      "aria-controls": null,
      "aria-current": null,
      "aria-describedby": null,
      "aria-details": null,
      "aria-dropeffect": null,
      "aria-flowto": null,
      "aria-grabbed": null,
      "aria-hidden": null,
      "aria-keyshortcuts": null,
      "aria-label": null,
      "aria-labelledby": null,
      "aria-live": null,
      "aria-owns": null,
      "aria-relevant": null,
      "aria-roledescription": null
    },
    relatedConcepts: [{
      concept: {
        name: "role"
      },
      module: "XHTML"
    }, {
      concept: {
        name: "type"
      },
      module: "Dublin Core"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: []
  };
  var _default = roletypeRole$1;
  roletypeRole.default = _default;
  return roletypeRole;
}
var sectionRole = {};
var hasRequiredSectionRole;
function requireSectionRole() {
  if (hasRequiredSectionRole) return sectionRole;
  hasRequiredSectionRole = 1;
  Object.defineProperty(sectionRole, "__esModule", {
    value: true
  });
  sectionRole.default = void 0;
  var sectionRole$1 = {
    abstract: true,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: [],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "frontmatter"
      },
      module: "DTB"
    }, {
      concept: {
        name: "level"
      },
      module: "DTB"
    }, {
      concept: {
        name: "level"
      },
      module: "SMIL"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure"]]
  };
  var _default = sectionRole$1;
  sectionRole.default = _default;
  return sectionRole;
}
var sectionheadRole = {};
var hasRequiredSectionheadRole;
function requireSectionheadRole() {
  if (hasRequiredSectionheadRole) return sectionheadRole;
  hasRequiredSectionheadRole = 1;
  Object.defineProperty(sectionheadRole, "__esModule", {
    value: true
  });
  sectionheadRole.default = void 0;
  var sectionheadRole$1 = {
    abstract: true,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure"]]
  };
  var _default = sectionheadRole$1;
  sectionheadRole.default = _default;
  return sectionheadRole;
}
var selectRole = {};
var hasRequiredSelectRole;
function requireSelectRole() {
  if (hasRequiredSelectRole) return selectRole;
  hasRequiredSelectRole = 1;
  Object.defineProperty(selectRole, "__esModule", {
    value: true
  });
  selectRole.default = void 0;
  var selectRole$1 = {
    abstract: true,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-orientation": null
    },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "composite"], ["roletype", "structure", "section", "group"]]
  };
  var _default = selectRole$1;
  selectRole.default = _default;
  return selectRole;
}
var structureRole = {};
var hasRequiredStructureRole;
function requireStructureRole() {
  if (hasRequiredStructureRole) return structureRole;
  hasRequiredStructureRole = 1;
  Object.defineProperty(structureRole, "__esModule", {
    value: true
  });
  structureRole.default = void 0;
  var structureRole$1 = {
    abstract: true,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: [],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype"]]
  };
  var _default = structureRole$1;
  structureRole.default = _default;
  return structureRole;
}
var widgetRole = {};
var hasRequiredWidgetRole;
function requireWidgetRole() {
  if (hasRequiredWidgetRole) return widgetRole;
  hasRequiredWidgetRole = 1;
  Object.defineProperty(widgetRole, "__esModule", {
    value: true
  });
  widgetRole.default = void 0;
  var widgetRole$1 = {
    abstract: true,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: [],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype"]]
  };
  var _default = widgetRole$1;
  widgetRole.default = _default;
  return widgetRole;
}
var windowRole = {};
var hasRequiredWindowRole;
function requireWindowRole() {
  if (hasRequiredWindowRole) return windowRole;
  hasRequiredWindowRole = 1;
  Object.defineProperty(windowRole, "__esModule", {
    value: true
  });
  windowRole.default = void 0;
  var windowRole$1 = {
    abstract: true,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-modal": null
    },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype"]]
  };
  var _default = windowRole$1;
  windowRole.default = _default;
  return windowRole;
}
var hasRequiredAriaAbstractRoles;
function requireAriaAbstractRoles() {
  if (hasRequiredAriaAbstractRoles) return ariaAbstractRoles;
  hasRequiredAriaAbstractRoles = 1;
  Object.defineProperty(ariaAbstractRoles, "__esModule", {
    value: true
  });
  ariaAbstractRoles.default = void 0;
  var _commandRole = _interopRequireDefault(requireCommandRole());
  var _compositeRole = _interopRequireDefault(requireCompositeRole());
  var _inputRole = _interopRequireDefault(requireInputRole());
  var _landmarkRole = _interopRequireDefault(requireLandmarkRole());
  var _rangeRole = _interopRequireDefault(requireRangeRole());
  var _roletypeRole = _interopRequireDefault(requireRoletypeRole());
  var _sectionRole = _interopRequireDefault(requireSectionRole());
  var _sectionheadRole = _interopRequireDefault(requireSectionheadRole());
  var _selectRole = _interopRequireDefault(requireSelectRole());
  var _structureRole = _interopRequireDefault(requireStructureRole());
  var _widgetRole = _interopRequireDefault(requireWidgetRole());
  var _windowRole = _interopRequireDefault(requireWindowRole());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var ariaAbstractRoles$1 = [["command", _commandRole.default], ["composite", _compositeRole.default], ["input", _inputRole.default], ["landmark", _landmarkRole.default], ["range", _rangeRole.default], ["roletype", _roletypeRole.default], ["section", _sectionRole.default], ["sectionhead", _sectionheadRole.default], ["select", _selectRole.default], ["structure", _structureRole.default], ["widget", _widgetRole.default], ["window", _windowRole.default]];
  var _default = ariaAbstractRoles$1;
  ariaAbstractRoles.default = _default;
  return ariaAbstractRoles;
}
var ariaLiteralRoles = {};
var alertRole = {};
var hasRequiredAlertRole;
function requireAlertRole() {
  if (hasRequiredAlertRole) return alertRole;
  hasRequiredAlertRole = 1;
  Object.defineProperty(alertRole, "__esModule", {
    value: true
  });
  alertRole.default = void 0;
  var alertRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-atomic": "true",
      "aria-live": "assertive"
    },
    relatedConcepts: [{
      concept: {
        name: "alert"
      },
      module: "XForms"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = alertRole$1;
  alertRole.default = _default;
  return alertRole;
}
var alertdialogRole = {};
var hasRequiredAlertdialogRole;
function requireAlertdialogRole() {
  if (hasRequiredAlertdialogRole) return alertdialogRole;
  hasRequiredAlertdialogRole = 1;
  Object.defineProperty(alertdialogRole, "__esModule", {
    value: true
  });
  alertdialogRole.default = void 0;
  var alertdialogRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "alert"
      },
      module: "XForms"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "alert"], ["roletype", "window", "dialog"]]
  };
  var _default = alertdialogRole$1;
  alertdialogRole.default = _default;
  return alertdialogRole;
}
var applicationRole = {};
var hasRequiredApplicationRole;
function requireApplicationRole() {
  if (hasRequiredApplicationRole) return applicationRole;
  hasRequiredApplicationRole = 1;
  Object.defineProperty(applicationRole, "__esModule", {
    value: true
  });
  applicationRole.default = void 0;
  var applicationRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-activedescendant": null,
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "Device Independence Delivery Unit"
      }
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure"]]
  };
  var _default = applicationRole$1;
  applicationRole.default = _default;
  return applicationRole;
}
var articleRole = {};
var hasRequiredArticleRole;
function requireArticleRole() {
  if (hasRequiredArticleRole) return articleRole;
  hasRequiredArticleRole = 1;
  Object.defineProperty(articleRole, "__esModule", {
    value: true
  });
  articleRole.default = void 0;
  var articleRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-posinset": null,
      "aria-setsize": null
    },
    relatedConcepts: [{
      concept: {
        name: "article"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "document"]]
  };
  var _default = articleRole$1;
  articleRole.default = _default;
  return articleRole;
}
var bannerRole = {};
var hasRequiredBannerRole;
function requireBannerRole() {
  if (hasRequiredBannerRole) return bannerRole;
  hasRequiredBannerRole = 1;
  Object.defineProperty(bannerRole, "__esModule", {
    value: true
  });
  bannerRole.default = void 0;
  var bannerRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        constraints: ["scoped to the body element"],
        name: "header"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default = bannerRole$1;
  bannerRole.default = _default;
  return bannerRole;
}
var blockquoteRole = {};
var hasRequiredBlockquoteRole;
function requireBlockquoteRole() {
  if (hasRequiredBlockquoteRole) return blockquoteRole;
  hasRequiredBlockquoteRole = 1;
  Object.defineProperty(blockquoteRole, "__esModule", {
    value: true
  });
  blockquoteRole.default = void 0;
  var blockquoteRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "blockquote"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = blockquoteRole$1;
  blockquoteRole.default = _default;
  return blockquoteRole;
}
var buttonRole = {};
var hasRequiredButtonRole;
function requireButtonRole() {
  if (hasRequiredButtonRole) return buttonRole;
  hasRequiredButtonRole = 1;
  Object.defineProperty(buttonRole, "__esModule", {
    value: true
  });
  buttonRole.default = void 0;
  var buttonRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-pressed": null
    },
    relatedConcepts: [{
      concept: {
        attributes: [{
          name: "type",
          value: "button"
        }],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          name: "type",
          value: "image"
        }],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          name: "type",
          value: "reset"
        }],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          name: "type",
          value: "submit"
        }],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        name: "button"
      },
      module: "HTML"
    }, {
      concept: {
        name: "trigger"
      },
      module: "XForms"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "command"]]
  };
  var _default = buttonRole$1;
  buttonRole.default = _default;
  return buttonRole;
}
var captionRole = {};
var hasRequiredCaptionRole;
function requireCaptionRole() {
  if (hasRequiredCaptionRole) return captionRole;
  hasRequiredCaptionRole = 1;
  Object.defineProperty(captionRole, "__esModule", {
    value: true
  });
  captionRole.default = void 0;
  var captionRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "caption"
      },
      module: "HTML"
    }],
    requireContextRole: ["figure", "grid", "table"],
    requiredContextRole: ["figure", "grid", "table"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = captionRole$1;
  captionRole.default = _default;
  return captionRole;
}
var cellRole = {};
var hasRequiredCellRole;
function requireCellRole() {
  if (hasRequiredCellRole) return cellRole;
  hasRequiredCellRole = 1;
  Object.defineProperty(cellRole, "__esModule", {
    value: true
  });
  cellRole.default = void 0;
  var cellRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-colindex": null,
      "aria-colspan": null,
      "aria-rowindex": null,
      "aria-rowspan": null
    },
    relatedConcepts: [{
      concept: {
        constraints: ["ancestor table element has table role"],
        name: "td"
      },
      module: "HTML"
    }],
    requireContextRole: ["row"],
    requiredContextRole: ["row"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = cellRole$1;
  cellRole.default = _default;
  return cellRole;
}
var checkboxRole = {};
var hasRequiredCheckboxRole;
function requireCheckboxRole() {
  if (hasRequiredCheckboxRole) return checkboxRole;
  hasRequiredCheckboxRole = 1;
  Object.defineProperty(checkboxRole, "__esModule", {
    value: true
  });
  checkboxRole.default = void 0;
  var checkboxRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-checked": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-invalid": null,
      "aria-readonly": null,
      "aria-required": null
    },
    relatedConcepts: [{
      concept: {
        attributes: [{
          name: "type",
          value: "checkbox"
        }],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        name: "option"
      },
      module: "ARIA"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {
      "aria-checked": null
    },
    superClass: [["roletype", "widget", "input"]]
  };
  var _default = checkboxRole$1;
  checkboxRole.default = _default;
  return checkboxRole;
}
var codeRole = {};
var hasRequiredCodeRole;
function requireCodeRole() {
  if (hasRequiredCodeRole) return codeRole;
  hasRequiredCodeRole = 1;
  Object.defineProperty(codeRole, "__esModule", {
    value: true
  });
  codeRole.default = void 0;
  var codeRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "code"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = codeRole$1;
  codeRole.default = _default;
  return codeRole;
}
var columnheaderRole = {};
var hasRequiredColumnheaderRole;
function requireColumnheaderRole() {
  if (hasRequiredColumnheaderRole) return columnheaderRole;
  hasRequiredColumnheaderRole = 1;
  Object.defineProperty(columnheaderRole, "__esModule", {
    value: true
  });
  columnheaderRole.default = void 0;
  var columnheaderRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-sort": null
    },
    relatedConcepts: [{
      concept: {
        name: "th"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          name: "scope",
          value: "col"
        }],
        name: "th"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          name: "scope",
          value: "colgroup"
        }],
        name: "th"
      },
      module: "HTML"
    }],
    requireContextRole: ["row"],
    requiredContextRole: ["row"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "cell"], ["roletype", "structure", "section", "cell", "gridcell"], ["roletype", "widget", "gridcell"], ["roletype", "structure", "sectionhead"]]
  };
  var _default = columnheaderRole$1;
  columnheaderRole.default = _default;
  return columnheaderRole;
}
var comboboxRole = {};
var hasRequiredComboboxRole;
function requireComboboxRole() {
  if (hasRequiredComboboxRole) return comboboxRole;
  hasRequiredComboboxRole = 1;
  Object.defineProperty(comboboxRole, "__esModule", {
    value: true
  });
  comboboxRole.default = void 0;
  var comboboxRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-activedescendant": null,
      "aria-autocomplete": null,
      "aria-errormessage": null,
      "aria-invalid": null,
      "aria-readonly": null,
      "aria-required": null,
      "aria-expanded": "false",
      "aria-haspopup": "listbox"
    },
    relatedConcepts: [{
      concept: {
        attributes: [{
          constraints: ["set"],
          name: "list"
        }, {
          name: "type",
          value: "email"
        }],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["set"],
          name: "list"
        }, {
          name: "type",
          value: "search"
        }],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["set"],
          name: "list"
        }, {
          name: "type",
          value: "tel"
        }],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["set"],
          name: "list"
        }, {
          name: "type",
          value: "text"
        }],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["set"],
          name: "list"
        }, {
          name: "type",
          value: "url"
        }],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["set"],
          name: "list"
        }, {
          name: "type",
          value: "url"
        }],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["undefined"],
          name: "multiple"
        }, {
          constraints: ["undefined"],
          name: "size"
        }],
        constraints: ["the multiple attribute is not set and the size attribute does not have a value greater than 1"],
        name: "select"
      },
      module: "HTML"
    }, {
      concept: {
        name: "select"
      },
      module: "XForms"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {
      "aria-controls": null,
      "aria-expanded": "false"
    },
    superClass: [["roletype", "widget", "input"]]
  };
  var _default = comboboxRole$1;
  comboboxRole.default = _default;
  return comboboxRole;
}
var complementaryRole = {};
var hasRequiredComplementaryRole;
function requireComplementaryRole() {
  if (hasRequiredComplementaryRole) return complementaryRole;
  hasRequiredComplementaryRole = 1;
  Object.defineProperty(complementaryRole, "__esModule", {
    value: true
  });
  complementaryRole.default = void 0;
  var complementaryRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "aside"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["set"],
          name: "aria-label"
        }],
        constraints: ["scoped to a sectioning content element", "scoped to a sectioning root element other than body"],
        name: "aside"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["set"],
          name: "aria-labelledby"
        }],
        constraints: ["scoped to a sectioning content element", "scoped to a sectioning root element other than body"],
        name: "aside"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default = complementaryRole$1;
  complementaryRole.default = _default;
  return complementaryRole;
}
var contentinfoRole = {};
var hasRequiredContentinfoRole;
function requireContentinfoRole() {
  if (hasRequiredContentinfoRole) return contentinfoRole;
  hasRequiredContentinfoRole = 1;
  Object.defineProperty(contentinfoRole, "__esModule", {
    value: true
  });
  contentinfoRole.default = void 0;
  var contentinfoRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        constraints: ["scoped to the body element"],
        name: "footer"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default = contentinfoRole$1;
  contentinfoRole.default = _default;
  return contentinfoRole;
}
var definitionRole = {};
var hasRequiredDefinitionRole;
function requireDefinitionRole() {
  if (hasRequiredDefinitionRole) return definitionRole;
  hasRequiredDefinitionRole = 1;
  Object.defineProperty(definitionRole, "__esModule", {
    value: true
  });
  definitionRole.default = void 0;
  var definitionRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "dd"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = definitionRole$1;
  definitionRole.default = _default;
  return definitionRole;
}
var deletionRole = {};
var hasRequiredDeletionRole;
function requireDeletionRole() {
  if (hasRequiredDeletionRole) return deletionRole;
  hasRequiredDeletionRole = 1;
  Object.defineProperty(deletionRole, "__esModule", {
    value: true
  });
  deletionRole.default = void 0;
  var deletionRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "del"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = deletionRole$1;
  deletionRole.default = _default;
  return deletionRole;
}
var dialogRole = {};
var hasRequiredDialogRole;
function requireDialogRole() {
  if (hasRequiredDialogRole) return dialogRole;
  hasRequiredDialogRole = 1;
  Object.defineProperty(dialogRole, "__esModule", {
    value: true
  });
  dialogRole.default = void 0;
  var dialogRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "dialog"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "window"]]
  };
  var _default = dialogRole$1;
  dialogRole.default = _default;
  return dialogRole;
}
var directoryRole = {};
var hasRequiredDirectoryRole;
function requireDirectoryRole() {
  if (hasRequiredDirectoryRole) return directoryRole;
  hasRequiredDirectoryRole = 1;
  Object.defineProperty(directoryRole, "__esModule", {
    value: true
  });
  directoryRole.default = void 0;
  var directoryRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      module: "DAISY Guide"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "list"]]
  };
  var _default = directoryRole$1;
  directoryRole.default = _default;
  return directoryRole;
}
var documentRole = {};
var hasRequiredDocumentRole;
function requireDocumentRole() {
  if (hasRequiredDocumentRole) return documentRole;
  hasRequiredDocumentRole = 1;
  Object.defineProperty(documentRole, "__esModule", {
    value: true
  });
  documentRole.default = void 0;
  var documentRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "Device Independence Delivery Unit"
      }
    }, {
      concept: {
        name: "html"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure"]]
  };
  var _default = documentRole$1;
  documentRole.default = _default;
  return documentRole;
}
var emphasisRole = {};
var hasRequiredEmphasisRole;
function requireEmphasisRole() {
  if (hasRequiredEmphasisRole) return emphasisRole;
  hasRequiredEmphasisRole = 1;
  Object.defineProperty(emphasisRole, "__esModule", {
    value: true
  });
  emphasisRole.default = void 0;
  var emphasisRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "em"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = emphasisRole$1;
  emphasisRole.default = _default;
  return emphasisRole;
}
var feedRole = {};
var hasRequiredFeedRole;
function requireFeedRole() {
  if (hasRequiredFeedRole) return feedRole;
  hasRequiredFeedRole = 1;
  Object.defineProperty(feedRole, "__esModule", {
    value: true
  });
  feedRole.default = void 0;
  var feedRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["article"]],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "list"]]
  };
  var _default = feedRole$1;
  feedRole.default = _default;
  return feedRole;
}
var figureRole = {};
var hasRequiredFigureRole;
function requireFigureRole() {
  if (hasRequiredFigureRole) return figureRole;
  hasRequiredFigureRole = 1;
  Object.defineProperty(figureRole, "__esModule", {
    value: true
  });
  figureRole.default = void 0;
  var figureRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "figure"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = figureRole$1;
  figureRole.default = _default;
  return figureRole;
}
var formRole = {};
var hasRequiredFormRole;
function requireFormRole() {
  if (hasRequiredFormRole) return formRole;
  hasRequiredFormRole = 1;
  Object.defineProperty(formRole, "__esModule", {
    value: true
  });
  formRole.default = void 0;
  var formRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        attributes: [{
          constraints: ["set"],
          name: "aria-label"
        }],
        name: "form"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["set"],
          name: "aria-labelledby"
        }],
        name: "form"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["set"],
          name: "name"
        }],
        name: "form"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default = formRole$1;
  formRole.default = _default;
  return formRole;
}
var genericRole = {};
var hasRequiredGenericRole;
function requireGenericRole() {
  if (hasRequiredGenericRole) return genericRole;
  hasRequiredGenericRole = 1;
  Object.defineProperty(genericRole, "__esModule", {
    value: true
  });
  genericRole.default = void 0;
  var genericRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "a"
      },
      module: "HTML"
    }, {
      concept: {
        name: "area"
      },
      module: "HTML"
    }, {
      concept: {
        name: "aside"
      },
      module: "HTML"
    }, {
      concept: {
        name: "b"
      },
      module: "HTML"
    }, {
      concept: {
        name: "bdo"
      },
      module: "HTML"
    }, {
      concept: {
        name: "body"
      },
      module: "HTML"
    }, {
      concept: {
        name: "data"
      },
      module: "HTML"
    }, {
      concept: {
        name: "div"
      },
      module: "HTML"
    }, {
      concept: {
        constraints: ["scoped to the main element", "scoped to a sectioning content element", "scoped to a sectioning root element other than body"],
        name: "footer"
      },
      module: "HTML"
    }, {
      concept: {
        constraints: ["scoped to the main element", "scoped to a sectioning content element", "scoped to a sectioning root element other than body"],
        name: "header"
      },
      module: "HTML"
    }, {
      concept: {
        name: "hgroup"
      },
      module: "HTML"
    }, {
      concept: {
        name: "i"
      },
      module: "HTML"
    }, {
      concept: {
        name: "pre"
      },
      module: "HTML"
    }, {
      concept: {
        name: "q"
      },
      module: "HTML"
    }, {
      concept: {
        name: "samp"
      },
      module: "HTML"
    }, {
      concept: {
        name: "section"
      },
      module: "HTML"
    }, {
      concept: {
        name: "small"
      },
      module: "HTML"
    }, {
      concept: {
        name: "span"
      },
      module: "HTML"
    }, {
      concept: {
        name: "u"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure"]]
  };
  var _default = genericRole$1;
  genericRole.default = _default;
  return genericRole;
}
var gridRole = {};
var hasRequiredGridRole;
function requireGridRole() {
  if (hasRequiredGridRole) return gridRole;
  hasRequiredGridRole = 1;
  Object.defineProperty(gridRole, "__esModule", {
    value: true
  });
  gridRole.default = void 0;
  var gridRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-multiselectable": null,
      "aria-readonly": null
    },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["row"], ["row", "rowgroup"]],
    requiredProps: {},
    superClass: [["roletype", "widget", "composite"], ["roletype", "structure", "section", "table"]]
  };
  var _default = gridRole$1;
  gridRole.default = _default;
  return gridRole;
}
var gridcellRole = {};
var hasRequiredGridcellRole;
function requireGridcellRole() {
  if (hasRequiredGridcellRole) return gridcellRole;
  hasRequiredGridcellRole = 1;
  Object.defineProperty(gridcellRole, "__esModule", {
    value: true
  });
  gridcellRole.default = void 0;
  var gridcellRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null,
      "aria-readonly": null,
      "aria-required": null,
      "aria-selected": null
    },
    relatedConcepts: [{
      concept: {
        constraints: ["ancestor table element has grid role", "ancestor table element has treegrid role"],
        name: "td"
      },
      module: "HTML"
    }],
    requireContextRole: ["row"],
    requiredContextRole: ["row"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "cell"], ["roletype", "widget"]]
  };
  var _default = gridcellRole$1;
  gridcellRole.default = _default;
  return gridcellRole;
}
var groupRole = {};
var hasRequiredGroupRole;
function requireGroupRole() {
  if (hasRequiredGroupRole) return groupRole;
  hasRequiredGroupRole = 1;
  Object.defineProperty(groupRole, "__esModule", {
    value: true
  });
  groupRole.default = void 0;
  var groupRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-activedescendant": null,
      "aria-disabled": null
    },
    relatedConcepts: [{
      concept: {
        name: "details"
      },
      module: "HTML"
    }, {
      concept: {
        name: "fieldset"
      },
      module: "HTML"
    }, {
      concept: {
        name: "optgroup"
      },
      module: "HTML"
    }, {
      concept: {
        name: "address"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = groupRole$1;
  groupRole.default = _default;
  return groupRole;
}
var headingRole = {};
var hasRequiredHeadingRole;
function requireHeadingRole() {
  if (hasRequiredHeadingRole) return headingRole;
  hasRequiredHeadingRole = 1;
  Object.defineProperty(headingRole, "__esModule", {
    value: true
  });
  headingRole.default = void 0;
  var headingRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-level": "2"
    },
    relatedConcepts: [{
      concept: {
        name: "h1"
      },
      module: "HTML"
    }, {
      concept: {
        name: "h2"
      },
      module: "HTML"
    }, {
      concept: {
        name: "h3"
      },
      module: "HTML"
    }, {
      concept: {
        name: "h4"
      },
      module: "HTML"
    }, {
      concept: {
        name: "h5"
      },
      module: "HTML"
    }, {
      concept: {
        name: "h6"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {
      "aria-level": "2"
    },
    superClass: [["roletype", "structure", "sectionhead"]]
  };
  var _default = headingRole$1;
  headingRole.default = _default;
  return headingRole;
}
var imgRole = {};
var hasRequiredImgRole;
function requireImgRole() {
  if (hasRequiredImgRole) return imgRole;
  hasRequiredImgRole = 1;
  Object.defineProperty(imgRole, "__esModule", {
    value: true
  });
  imgRole.default = void 0;
  var imgRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        attributes: [{
          constraints: ["set"],
          name: "alt"
        }],
        name: "img"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["undefined"],
          name: "alt"
        }],
        name: "img"
      },
      module: "HTML"
    }, {
      concept: {
        name: "imggroup"
      },
      module: "DTB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = imgRole$1;
  imgRole.default = _default;
  return imgRole;
}
var insertionRole = {};
var hasRequiredInsertionRole;
function requireInsertionRole() {
  if (hasRequiredInsertionRole) return insertionRole;
  hasRequiredInsertionRole = 1;
  Object.defineProperty(insertionRole, "__esModule", {
    value: true
  });
  insertionRole.default = void 0;
  var insertionRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "ins"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = insertionRole$1;
  insertionRole.default = _default;
  return insertionRole;
}
var linkRole = {};
var hasRequiredLinkRole;
function requireLinkRole() {
  if (hasRequiredLinkRole) return linkRole;
  hasRequiredLinkRole = 1;
  Object.defineProperty(linkRole, "__esModule", {
    value: true
  });
  linkRole.default = void 0;
  var linkRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-expanded": null,
      "aria-haspopup": null
    },
    relatedConcepts: [{
      concept: {
        attributes: [{
          constraints: ["set"],
          name: "href"
        }],
        name: "a"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["set"],
          name: "href"
        }],
        name: "area"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "command"]]
  };
  var _default = linkRole$1;
  linkRole.default = _default;
  return linkRole;
}
var listRole = {};
var hasRequiredListRole;
function requireListRole() {
  if (hasRequiredListRole) return listRole;
  hasRequiredListRole = 1;
  Object.defineProperty(listRole, "__esModule", {
    value: true
  });
  listRole.default = void 0;
  var listRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "menu"
      },
      module: "HTML"
    }, {
      concept: {
        name: "ol"
      },
      module: "HTML"
    }, {
      concept: {
        name: "ul"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["listitem"]],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = listRole$1;
  listRole.default = _default;
  return listRole;
}
var listboxRole = {};
var hasRequiredListboxRole;
function requireListboxRole() {
  if (hasRequiredListboxRole) return listboxRole;
  hasRequiredListboxRole = 1;
  Object.defineProperty(listboxRole, "__esModule", {
    value: true
  });
  listboxRole.default = void 0;
  var listboxRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-invalid": null,
      "aria-multiselectable": null,
      "aria-readonly": null,
      "aria-required": null,
      "aria-orientation": "vertical"
    },
    relatedConcepts: [{
      concept: {
        attributes: [{
          constraints: [">1"],
          name: "size"
        }],
        constraints: ["the size attribute value is greater than 1"],
        name: "select"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          name: "multiple"
        }],
        name: "select"
      },
      module: "HTML"
    }, {
      concept: {
        name: "datalist"
      },
      module: "HTML"
    }, {
      concept: {
        name: "list"
      },
      module: "ARIA"
    }, {
      concept: {
        name: "select"
      },
      module: "XForms"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["option", "group"], ["option"]],
    requiredProps: {},
    superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
  };
  var _default = listboxRole$1;
  listboxRole.default = _default;
  return listboxRole;
}
var listitemRole = {};
var hasRequiredListitemRole;
function requireListitemRole() {
  if (hasRequiredListitemRole) return listitemRole;
  hasRequiredListitemRole = 1;
  Object.defineProperty(listitemRole, "__esModule", {
    value: true
  });
  listitemRole.default = void 0;
  var listitemRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-level": null,
      "aria-posinset": null,
      "aria-setsize": null
    },
    relatedConcepts: [{
      concept: {
        constraints: ["direct descendant of ol", "direct descendant of ul", "direct descendant of menu"],
        name: "li"
      },
      module: "HTML"
    }, {
      concept: {
        name: "item"
      },
      module: "XForms"
    }],
    requireContextRole: ["directory", "list"],
    requiredContextRole: ["directory", "list"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = listitemRole$1;
  listitemRole.default = _default;
  return listitemRole;
}
var logRole = {};
var hasRequiredLogRole;
function requireLogRole() {
  if (hasRequiredLogRole) return logRole;
  hasRequiredLogRole = 1;
  Object.defineProperty(logRole, "__esModule", {
    value: true
  });
  logRole.default = void 0;
  var logRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-live": "polite"
    },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = logRole$1;
  logRole.default = _default;
  return logRole;
}
var mainRole = {};
var hasRequiredMainRole;
function requireMainRole() {
  if (hasRequiredMainRole) return mainRole;
  hasRequiredMainRole = 1;
  Object.defineProperty(mainRole, "__esModule", {
    value: true
  });
  mainRole.default = void 0;
  var mainRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "main"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default = mainRole$1;
  mainRole.default = _default;
  return mainRole;
}
var markRole = {};
var hasRequiredMarkRole;
function requireMarkRole() {
  if (hasRequiredMarkRole) return markRole;
  hasRequiredMarkRole = 1;
  Object.defineProperty(markRole, "__esModule", {
    value: true
  });
  markRole.default = void 0;
  var markRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["prohibited"],
    prohibitedProps: [],
    props: {
      "aria-braillelabel": null,
      "aria-brailleroledescription": null,
      "aria-description": null
    },
    relatedConcepts: [{
      concept: {
        name: "mark"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = markRole$1;
  markRole.default = _default;
  return markRole;
}
var marqueeRole = {};
var hasRequiredMarqueeRole;
function requireMarqueeRole() {
  if (hasRequiredMarqueeRole) return marqueeRole;
  hasRequiredMarqueeRole = 1;
  Object.defineProperty(marqueeRole, "__esModule", {
    value: true
  });
  marqueeRole.default = void 0;
  var marqueeRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = marqueeRole$1;
  marqueeRole.default = _default;
  return marqueeRole;
}
var mathRole = {};
var hasRequiredMathRole;
function requireMathRole() {
  if (hasRequiredMathRole) return mathRole;
  hasRequiredMathRole = 1;
  Object.defineProperty(mathRole, "__esModule", {
    value: true
  });
  mathRole.default = void 0;
  var mathRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "math"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = mathRole$1;
  mathRole.default = _default;
  return mathRole;
}
var menuRole = {};
var hasRequiredMenuRole;
function requireMenuRole() {
  if (hasRequiredMenuRole) return menuRole;
  hasRequiredMenuRole = 1;
  Object.defineProperty(menuRole, "__esModule", {
    value: true
  });
  menuRole.default = void 0;
  var menuRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-orientation": "vertical"
    },
    relatedConcepts: [{
      concept: {
        name: "MENU"
      },
      module: "JAPI"
    }, {
      concept: {
        name: "list"
      },
      module: "ARIA"
    }, {
      concept: {
        name: "select"
      },
      module: "XForms"
    }, {
      concept: {
        name: "sidebar"
      },
      module: "DTB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["menuitem", "group"], ["menuitemradio", "group"], ["menuitemcheckbox", "group"], ["menuitem"], ["menuitemcheckbox"], ["menuitemradio"]],
    requiredProps: {},
    superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
  };
  var _default = menuRole$1;
  menuRole.default = _default;
  return menuRole;
}
var menubarRole = {};
var hasRequiredMenubarRole;
function requireMenubarRole() {
  if (hasRequiredMenubarRole) return menubarRole;
  hasRequiredMenubarRole = 1;
  Object.defineProperty(menubarRole, "__esModule", {
    value: true
  });
  menubarRole.default = void 0;
  var menubarRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-orientation": "horizontal"
    },
    relatedConcepts: [{
      concept: {
        name: "toolbar"
      },
      module: "ARIA"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["menuitem", "group"], ["menuitemradio", "group"], ["menuitemcheckbox", "group"], ["menuitem"], ["menuitemcheckbox"], ["menuitemradio"]],
    requiredProps: {},
    superClass: [["roletype", "widget", "composite", "select", "menu"], ["roletype", "structure", "section", "group", "select", "menu"]]
  };
  var _default = menubarRole$1;
  menubarRole.default = _default;
  return menubarRole;
}
var menuitemRole = {};
var hasRequiredMenuitemRole;
function requireMenuitemRole() {
  if (hasRequiredMenuitemRole) return menuitemRole;
  hasRequiredMenuitemRole = 1;
  Object.defineProperty(menuitemRole, "__esModule", {
    value: true
  });
  menuitemRole.default = void 0;
  var menuitemRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-posinset": null,
      "aria-setsize": null
    },
    relatedConcepts: [{
      concept: {
        name: "MENU_ITEM"
      },
      module: "JAPI"
    }, {
      concept: {
        name: "listitem"
      },
      module: "ARIA"
    }, {
      concept: {
        name: "option"
      },
      module: "ARIA"
    }],
    requireContextRole: ["group", "menu", "menubar"],
    requiredContextRole: ["group", "menu", "menubar"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "command"]]
  };
  var _default = menuitemRole$1;
  menuitemRole.default = _default;
  return menuitemRole;
}
var menuitemcheckboxRole = {};
var hasRequiredMenuitemcheckboxRole;
function requireMenuitemcheckboxRole() {
  if (hasRequiredMenuitemcheckboxRole) return menuitemcheckboxRole;
  hasRequiredMenuitemcheckboxRole = 1;
  Object.defineProperty(menuitemcheckboxRole, "__esModule", {
    value: true
  });
  menuitemcheckboxRole.default = void 0;
  var menuitemcheckboxRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "menuitem"
      },
      module: "ARIA"
    }],
    requireContextRole: ["group", "menu", "menubar"],
    requiredContextRole: ["group", "menu", "menubar"],
    requiredOwnedElements: [],
    requiredProps: {
      "aria-checked": null
    },
    superClass: [["roletype", "widget", "input", "checkbox"], ["roletype", "widget", "command", "menuitem"]]
  };
  var _default = menuitemcheckboxRole$1;
  menuitemcheckboxRole.default = _default;
  return menuitemcheckboxRole;
}
var menuitemradioRole = {};
var hasRequiredMenuitemradioRole;
function requireMenuitemradioRole() {
  if (hasRequiredMenuitemradioRole) return menuitemradioRole;
  hasRequiredMenuitemradioRole = 1;
  Object.defineProperty(menuitemradioRole, "__esModule", {
    value: true
  });
  menuitemradioRole.default = void 0;
  var menuitemradioRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "menuitem"
      },
      module: "ARIA"
    }],
    requireContextRole: ["group", "menu", "menubar"],
    requiredContextRole: ["group", "menu", "menubar"],
    requiredOwnedElements: [],
    requiredProps: {
      "aria-checked": null
    },
    superClass: [["roletype", "widget", "input", "checkbox", "menuitemcheckbox"], ["roletype", "widget", "command", "menuitem", "menuitemcheckbox"], ["roletype", "widget", "input", "radio"]]
  };
  var _default = menuitemradioRole$1;
  menuitemradioRole.default = _default;
  return menuitemradioRole;
}
var meterRole = {};
var hasRequiredMeterRole;
function requireMeterRole() {
  if (hasRequiredMeterRole) return meterRole;
  hasRequiredMeterRole = 1;
  Object.defineProperty(meterRole, "__esModule", {
    value: true
  });
  meterRole.default = void 0;
  var meterRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-valuetext": null,
      "aria-valuemax": "100",
      "aria-valuemin": "0"
    },
    relatedConcepts: [{
      concept: {
        name: "meter"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {
      "aria-valuenow": null
    },
    superClass: [["roletype", "structure", "range"]]
  };
  var _default = meterRole$1;
  meterRole.default = _default;
  return meterRole;
}
var navigationRole = {};
var hasRequiredNavigationRole;
function requireNavigationRole() {
  if (hasRequiredNavigationRole) return navigationRole;
  hasRequiredNavigationRole = 1;
  Object.defineProperty(navigationRole, "__esModule", {
    value: true
  });
  navigationRole.default = void 0;
  var navigationRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "nav"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default = navigationRole$1;
  navigationRole.default = _default;
  return navigationRole;
}
var noneRole = {};
var hasRequiredNoneRole;
function requireNoneRole() {
  if (hasRequiredNoneRole) return noneRole;
  hasRequiredNoneRole = 1;
  Object.defineProperty(noneRole, "__esModule", {
    value: true
  });
  noneRole.default = void 0;
  var noneRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: [],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: []
  };
  var _default = noneRole$1;
  noneRole.default = _default;
  return noneRole;
}
var noteRole = {};
var hasRequiredNoteRole;
function requireNoteRole() {
  if (hasRequiredNoteRole) return noteRole;
  hasRequiredNoteRole = 1;
  Object.defineProperty(noteRole, "__esModule", {
    value: true
  });
  noteRole.default = void 0;
  var noteRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = noteRole$1;
  noteRole.default = _default;
  return noteRole;
}
var optionRole = {};
var hasRequiredOptionRole;
function requireOptionRole() {
  if (hasRequiredOptionRole) return optionRole;
  hasRequiredOptionRole = 1;
  Object.defineProperty(optionRole, "__esModule", {
    value: true
  });
  optionRole.default = void 0;
  var optionRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-checked": null,
      "aria-posinset": null,
      "aria-setsize": null,
      "aria-selected": "false"
    },
    relatedConcepts: [{
      concept: {
        name: "item"
      },
      module: "XForms"
    }, {
      concept: {
        name: "listitem"
      },
      module: "ARIA"
    }, {
      concept: {
        name: "option"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {
      "aria-selected": "false"
    },
    superClass: [["roletype", "widget", "input"]]
  };
  var _default = optionRole$1;
  optionRole.default = _default;
  return optionRole;
}
var paragraphRole = {};
var hasRequiredParagraphRole;
function requireParagraphRole() {
  if (hasRequiredParagraphRole) return paragraphRole;
  hasRequiredParagraphRole = 1;
  Object.defineProperty(paragraphRole, "__esModule", {
    value: true
  });
  paragraphRole.default = void 0;
  var paragraphRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "p"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = paragraphRole$1;
  paragraphRole.default = _default;
  return paragraphRole;
}
var presentationRole = {};
var hasRequiredPresentationRole;
function requirePresentationRole() {
  if (hasRequiredPresentationRole) return presentationRole;
  hasRequiredPresentationRole = 1;
  Object.defineProperty(presentationRole, "__esModule", {
    value: true
  });
  presentationRole.default = void 0;
  var presentationRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [{
      concept: {
        attributes: [{
          name: "alt",
          value: ""
        }],
        name: "img"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure"]]
  };
  var _default = presentationRole$1;
  presentationRole.default = _default;
  return presentationRole;
}
var progressbarRole = {};
var hasRequiredProgressbarRole;
function requireProgressbarRole() {
  if (hasRequiredProgressbarRole) return progressbarRole;
  hasRequiredProgressbarRole = 1;
  Object.defineProperty(progressbarRole, "__esModule", {
    value: true
  });
  progressbarRole.default = void 0;
  var progressbarRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-valuetext": null
    },
    relatedConcepts: [{
      concept: {
        name: "progress"
      },
      module: "HTML"
    }, {
      concept: {
        name: "status"
      },
      module: "ARIA"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "range"], ["roletype", "widget"]]
  };
  var _default = progressbarRole$1;
  progressbarRole.default = _default;
  return progressbarRole;
}
var radioRole = {};
var hasRequiredRadioRole;
function requireRadioRole() {
  if (hasRequiredRadioRole) return radioRole;
  hasRequiredRadioRole = 1;
  Object.defineProperty(radioRole, "__esModule", {
    value: true
  });
  radioRole.default = void 0;
  var radioRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-checked": null,
      "aria-posinset": null,
      "aria-setsize": null
    },
    relatedConcepts: [{
      concept: {
        attributes: [{
          name: "type",
          value: "radio"
        }],
        name: "input"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {
      "aria-checked": null
    },
    superClass: [["roletype", "widget", "input"]]
  };
  var _default = radioRole$1;
  radioRole.default = _default;
  return radioRole;
}
var radiogroupRole = {};
var hasRequiredRadiogroupRole;
function requireRadiogroupRole() {
  if (hasRequiredRadiogroupRole) return radiogroupRole;
  hasRequiredRadiogroupRole = 1;
  Object.defineProperty(radiogroupRole, "__esModule", {
    value: true
  });
  radiogroupRole.default = void 0;
  var radiogroupRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-errormessage": null,
      "aria-invalid": null,
      "aria-readonly": null,
      "aria-required": null
    },
    relatedConcepts: [{
      concept: {
        name: "list"
      },
      module: "ARIA"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["radio"]],
    requiredProps: {},
    superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
  };
  var _default = radiogroupRole$1;
  radiogroupRole.default = _default;
  return radiogroupRole;
}
var regionRole = {};
var hasRequiredRegionRole;
function requireRegionRole() {
  if (hasRequiredRegionRole) return regionRole;
  hasRequiredRegionRole = 1;
  Object.defineProperty(regionRole, "__esModule", {
    value: true
  });
  regionRole.default = void 0;
  var regionRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        attributes: [{
          constraints: ["set"],
          name: "aria-label"
        }],
        name: "section"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["set"],
          name: "aria-labelledby"
        }],
        name: "section"
      },
      module: "HTML"
    }, {
      concept: {
        name: "Device Independence Glossart perceivable unit"
      }
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default = regionRole$1;
  regionRole.default = _default;
  return regionRole;
}
var rowRole = {};
var hasRequiredRowRole;
function requireRowRole() {
  if (hasRequiredRowRole) return rowRole;
  hasRequiredRowRole = 1;
  Object.defineProperty(rowRole, "__esModule", {
    value: true
  });
  rowRole.default = void 0;
  var rowRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-colindex": null,
      "aria-expanded": null,
      "aria-level": null,
      "aria-posinset": null,
      "aria-rowindex": null,
      "aria-selected": null,
      "aria-setsize": null
    },
    relatedConcepts: [{
      concept: {
        name: "tr"
      },
      module: "HTML"
    }],
    requireContextRole: ["grid", "rowgroup", "table", "treegrid"],
    requiredContextRole: ["grid", "rowgroup", "table", "treegrid"],
    requiredOwnedElements: [["cell"], ["columnheader"], ["gridcell"], ["rowheader"]],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "group"], ["roletype", "widget"]]
  };
  var _default = rowRole$1;
  rowRole.default = _default;
  return rowRole;
}
var rowgroupRole = {};
var hasRequiredRowgroupRole;
function requireRowgroupRole() {
  if (hasRequiredRowgroupRole) return rowgroupRole;
  hasRequiredRowgroupRole = 1;
  Object.defineProperty(rowgroupRole, "__esModule", {
    value: true
  });
  rowgroupRole.default = void 0;
  var rowgroupRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "tbody"
      },
      module: "HTML"
    }, {
      concept: {
        name: "tfoot"
      },
      module: "HTML"
    }, {
      concept: {
        name: "thead"
      },
      module: "HTML"
    }],
    requireContextRole: ["grid", "table", "treegrid"],
    requiredContextRole: ["grid", "table", "treegrid"],
    requiredOwnedElements: [["row"]],
    requiredProps: {},
    superClass: [["roletype", "structure"]]
  };
  var _default = rowgroupRole$1;
  rowgroupRole.default = _default;
  return rowgroupRole;
}
var rowheaderRole = {};
var hasRequiredRowheaderRole;
function requireRowheaderRole() {
  if (hasRequiredRowheaderRole) return rowheaderRole;
  hasRequiredRowheaderRole = 1;
  Object.defineProperty(rowheaderRole, "__esModule", {
    value: true
  });
  rowheaderRole.default = void 0;
  var rowheaderRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-sort": null
    },
    relatedConcepts: [{
      concept: {
        attributes: [{
          name: "scope",
          value: "row"
        }],
        name: "th"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          name: "scope",
          value: "rowgroup"
        }],
        name: "th"
      },
      module: "HTML"
    }],
    requireContextRole: ["row", "rowgroup"],
    requiredContextRole: ["row", "rowgroup"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "cell"], ["roletype", "structure", "section", "cell", "gridcell"], ["roletype", "widget", "gridcell"], ["roletype", "structure", "sectionhead"]]
  };
  var _default = rowheaderRole$1;
  rowheaderRole.default = _default;
  return rowheaderRole;
}
var scrollbarRole = {};
var hasRequiredScrollbarRole;
function requireScrollbarRole() {
  if (hasRequiredScrollbarRole) return scrollbarRole;
  hasRequiredScrollbarRole = 1;
  Object.defineProperty(scrollbarRole, "__esModule", {
    value: true
  });
  scrollbarRole.default = void 0;
  var scrollbarRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-valuetext": null,
      "aria-orientation": "vertical",
      "aria-valuemax": "100",
      "aria-valuemin": "0"
    },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {
      "aria-controls": null,
      "aria-valuenow": null
    },
    superClass: [["roletype", "structure", "range"], ["roletype", "widget"]]
  };
  var _default = scrollbarRole$1;
  scrollbarRole.default = _default;
  return scrollbarRole;
}
var searchRole = {};
var hasRequiredSearchRole;
function requireSearchRole() {
  if (hasRequiredSearchRole) return searchRole;
  hasRequiredSearchRole = 1;
  Object.defineProperty(searchRole, "__esModule", {
    value: true
  });
  searchRole.default = void 0;
  var searchRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default = searchRole$1;
  searchRole.default = _default;
  return searchRole;
}
var searchboxRole = {};
var hasRequiredSearchboxRole;
function requireSearchboxRole() {
  if (hasRequiredSearchboxRole) return searchboxRole;
  hasRequiredSearchboxRole = 1;
  Object.defineProperty(searchboxRole, "__esModule", {
    value: true
  });
  searchboxRole.default = void 0;
  var searchboxRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        attributes: [{
          constraints: ["undefined"],
          name: "list"
        }, {
          name: "type",
          value: "search"
        }],
        constraints: ["the list attribute is not set"],
        name: "input"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "input", "textbox"]]
  };
  var _default = searchboxRole$1;
  searchboxRole.default = _default;
  return searchboxRole;
}
var separatorRole = {};
var hasRequiredSeparatorRole;
function requireSeparatorRole() {
  if (hasRequiredSeparatorRole) return separatorRole;
  hasRequiredSeparatorRole = 1;
  Object.defineProperty(separatorRole, "__esModule", {
    value: true
  });
  separatorRole.default = void 0;
  var separatorRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-orientation": "horizontal",
      "aria-valuemax": "100",
      "aria-valuemin": "0",
      "aria-valuenow": null,
      "aria-valuetext": null
    },
    relatedConcepts: [{
      concept: {
        name: "hr"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure"]]
  };
  var _default = separatorRole$1;
  separatorRole.default = _default;
  return separatorRole;
}
var sliderRole = {};
var hasRequiredSliderRole;
function requireSliderRole() {
  if (hasRequiredSliderRole) return sliderRole;
  hasRequiredSliderRole = 1;
  Object.defineProperty(sliderRole, "__esModule", {
    value: true
  });
  sliderRole.default = void 0;
  var sliderRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-errormessage": null,
      "aria-haspopup": null,
      "aria-invalid": null,
      "aria-readonly": null,
      "aria-valuetext": null,
      "aria-orientation": "horizontal",
      "aria-valuemax": "100",
      "aria-valuemin": "0"
    },
    relatedConcepts: [{
      concept: {
        attributes: [{
          name: "type",
          value: "range"
        }],
        name: "input"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {
      "aria-valuenow": null
    },
    superClass: [["roletype", "widget", "input"], ["roletype", "structure", "range"]]
  };
  var _default = sliderRole$1;
  sliderRole.default = _default;
  return sliderRole;
}
var spinbuttonRole = {};
var hasRequiredSpinbuttonRole;
function requireSpinbuttonRole() {
  if (hasRequiredSpinbuttonRole) return spinbuttonRole;
  hasRequiredSpinbuttonRole = 1;
  Object.defineProperty(spinbuttonRole, "__esModule", {
    value: true
  });
  spinbuttonRole.default = void 0;
  var spinbuttonRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-errormessage": null,
      "aria-invalid": null,
      "aria-readonly": null,
      "aria-required": null,
      "aria-valuetext": null,
      "aria-valuenow": "0"
    },
    relatedConcepts: [{
      concept: {
        attributes: [{
          name: "type",
          value: "number"
        }],
        name: "input"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "composite"], ["roletype", "widget", "input"], ["roletype", "structure", "range"]]
  };
  var _default = spinbuttonRole$1;
  spinbuttonRole.default = _default;
  return spinbuttonRole;
}
var statusRole = {};
var hasRequiredStatusRole;
function requireStatusRole() {
  if (hasRequiredStatusRole) return statusRole;
  hasRequiredStatusRole = 1;
  Object.defineProperty(statusRole, "__esModule", {
    value: true
  });
  statusRole.default = void 0;
  var statusRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-atomic": "true",
      "aria-live": "polite"
    },
    relatedConcepts: [{
      concept: {
        name: "output"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = statusRole$1;
  statusRole.default = _default;
  return statusRole;
}
var strongRole = {};
var hasRequiredStrongRole;
function requireStrongRole() {
  if (hasRequiredStrongRole) return strongRole;
  hasRequiredStrongRole = 1;
  Object.defineProperty(strongRole, "__esModule", {
    value: true
  });
  strongRole.default = void 0;
  var strongRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "strong"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = strongRole$1;
  strongRole.default = _default;
  return strongRole;
}
var subscriptRole = {};
var hasRequiredSubscriptRole;
function requireSubscriptRole() {
  if (hasRequiredSubscriptRole) return subscriptRole;
  hasRequiredSubscriptRole = 1;
  Object.defineProperty(subscriptRole, "__esModule", {
    value: true
  });
  subscriptRole.default = void 0;
  var subscriptRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "sub"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = subscriptRole$1;
  subscriptRole.default = _default;
  return subscriptRole;
}
var superscriptRole = {};
var hasRequiredSuperscriptRole;
function requireSuperscriptRole() {
  if (hasRequiredSuperscriptRole) return superscriptRole;
  hasRequiredSuperscriptRole = 1;
  Object.defineProperty(superscriptRole, "__esModule", {
    value: true
  });
  superscriptRole.default = void 0;
  var superscriptRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["prohibited"],
    prohibitedProps: ["aria-label", "aria-labelledby"],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "sup"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = superscriptRole$1;
  superscriptRole.default = _default;
  return superscriptRole;
}
var switchRole = {};
var hasRequiredSwitchRole;
function requireSwitchRole() {
  if (hasRequiredSwitchRole) return switchRole;
  hasRequiredSwitchRole = 1;
  Object.defineProperty(switchRole, "__esModule", {
    value: true
  });
  switchRole.default = void 0;
  var switchRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "button"
      },
      module: "ARIA"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {
      "aria-checked": null
    },
    superClass: [["roletype", "widget", "input", "checkbox"]]
  };
  var _default = switchRole$1;
  switchRole.default = _default;
  return switchRole;
}
var tabRole = {};
var hasRequiredTabRole;
function requireTabRole() {
  if (hasRequiredTabRole) return tabRole;
  hasRequiredTabRole = 1;
  Object.defineProperty(tabRole, "__esModule", {
    value: true
  });
  tabRole.default = void 0;
  var tabRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-posinset": null,
      "aria-setsize": null,
      "aria-selected": "false"
    },
    relatedConcepts: [],
    requireContextRole: ["tablist"],
    requiredContextRole: ["tablist"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "sectionhead"], ["roletype", "widget"]]
  };
  var _default = tabRole$1;
  tabRole.default = _default;
  return tabRole;
}
var tableRole = {};
var hasRequiredTableRole;
function requireTableRole() {
  if (hasRequiredTableRole) return tableRole;
  hasRequiredTableRole = 1;
  Object.defineProperty(tableRole, "__esModule", {
    value: true
  });
  tableRole.default = void 0;
  var tableRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-colcount": null,
      "aria-rowcount": null
    },
    relatedConcepts: [{
      concept: {
        name: "table"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["row"], ["row", "rowgroup"]],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = tableRole$1;
  tableRole.default = _default;
  return tableRole;
}
var tablistRole = {};
var hasRequiredTablistRole;
function requireTablistRole() {
  if (hasRequiredTablistRole) return tablistRole;
  hasRequiredTablistRole = 1;
  Object.defineProperty(tablistRole, "__esModule", {
    value: true
  });
  tablistRole.default = void 0;
  var tablistRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-level": null,
      "aria-multiselectable": null,
      "aria-orientation": "horizontal"
    },
    relatedConcepts: [{
      module: "DAISY",
      concept: {
        name: "guide"
      }
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["tab"]],
    requiredProps: {},
    superClass: [["roletype", "widget", "composite"]]
  };
  var _default = tablistRole$1;
  tablistRole.default = _default;
  return tablistRole;
}
var tabpanelRole = {};
var hasRequiredTabpanelRole;
function requireTabpanelRole() {
  if (hasRequiredTabpanelRole) return tabpanelRole;
  hasRequiredTabpanelRole = 1;
  Object.defineProperty(tabpanelRole, "__esModule", {
    value: true
  });
  tabpanelRole.default = void 0;
  var tabpanelRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = tabpanelRole$1;
  tabpanelRole.default = _default;
  return tabpanelRole;
}
var termRole = {};
var hasRequiredTermRole;
function requireTermRole() {
  if (hasRequiredTermRole) return termRole;
  hasRequiredTermRole = 1;
  Object.defineProperty(termRole, "__esModule", {
    value: true
  });
  termRole.default = void 0;
  var termRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "dfn"
      },
      module: "HTML"
    }, {
      concept: {
        name: "dt"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = termRole$1;
  termRole.default = _default;
  return termRole;
}
var textboxRole = {};
var hasRequiredTextboxRole;
function requireTextboxRole() {
  if (hasRequiredTextboxRole) return textboxRole;
  hasRequiredTextboxRole = 1;
  Object.defineProperty(textboxRole, "__esModule", {
    value: true
  });
  textboxRole.default = void 0;
  var textboxRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-activedescendant": null,
      "aria-autocomplete": null,
      "aria-errormessage": null,
      "aria-haspopup": null,
      "aria-invalid": null,
      "aria-multiline": null,
      "aria-placeholder": null,
      "aria-readonly": null,
      "aria-required": null
    },
    relatedConcepts: [{
      concept: {
        attributes: [{
          constraints: ["undefined"],
          name: "type"
        }, {
          constraints: ["undefined"],
          name: "list"
        }],
        constraints: ["the list attribute is not set"],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["undefined"],
          name: "list"
        }, {
          name: "type",
          value: "email"
        }],
        constraints: ["the list attribute is not set"],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["undefined"],
          name: "list"
        }, {
          name: "type",
          value: "tel"
        }],
        constraints: ["the list attribute is not set"],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["undefined"],
          name: "list"
        }, {
          name: "type",
          value: "text"
        }],
        constraints: ["the list attribute is not set"],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        attributes: [{
          constraints: ["undefined"],
          name: "list"
        }, {
          name: "type",
          value: "url"
        }],
        constraints: ["the list attribute is not set"],
        name: "input"
      },
      module: "HTML"
    }, {
      concept: {
        name: "input"
      },
      module: "XForms"
    }, {
      concept: {
        name: "textarea"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "input"]]
  };
  var _default = textboxRole$1;
  textboxRole.default = _default;
  return textboxRole;
}
var timeRole = {};
var hasRequiredTimeRole;
function requireTimeRole() {
  if (hasRequiredTimeRole) return timeRole;
  hasRequiredTimeRole = 1;
  Object.defineProperty(timeRole, "__esModule", {
    value: true
  });
  timeRole.default = void 0;
  var timeRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "time"
      },
      module: "HTML"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = timeRole$1;
  timeRole.default = _default;
  return timeRole;
}
var timerRole = {};
var hasRequiredTimerRole;
function requireTimerRole() {
  if (hasRequiredTimerRole) return timerRole;
  hasRequiredTimerRole = 1;
  Object.defineProperty(timerRole, "__esModule", {
    value: true
  });
  timerRole.default = void 0;
  var timerRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "status"]]
  };
  var _default = timerRole$1;
  timerRole.default = _default;
  return timerRole;
}
var toolbarRole = {};
var hasRequiredToolbarRole;
function requireToolbarRole() {
  if (hasRequiredToolbarRole) return toolbarRole;
  hasRequiredToolbarRole = 1;
  Object.defineProperty(toolbarRole, "__esModule", {
    value: true
  });
  toolbarRole.default = void 0;
  var toolbarRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-orientation": "horizontal"
    },
    relatedConcepts: [{
      concept: {
        name: "menubar"
      },
      module: "ARIA"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "group"]]
  };
  var _default = toolbarRole$1;
  toolbarRole.default = _default;
  return toolbarRole;
}
var tooltipRole = {};
var hasRequiredTooltipRole;
function requireTooltipRole() {
  if (hasRequiredTooltipRole) return tooltipRole;
  hasRequiredTooltipRole = 1;
  Object.defineProperty(tooltipRole, "__esModule", {
    value: true
  });
  tooltipRole.default = void 0;
  var tooltipRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = tooltipRole$1;
  tooltipRole.default = _default;
  return tooltipRole;
}
var treeRole = {};
var hasRequiredTreeRole;
function requireTreeRole() {
  if (hasRequiredTreeRole) return treeRole;
  hasRequiredTreeRole = 1;
  Object.defineProperty(treeRole, "__esModule", {
    value: true
  });
  treeRole.default = void 0;
  var treeRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-errormessage": null,
      "aria-invalid": null,
      "aria-multiselectable": null,
      "aria-required": null,
      "aria-orientation": "vertical"
    },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["treeitem", "group"], ["treeitem"]],
    requiredProps: {},
    superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
  };
  var _default = treeRole$1;
  treeRole.default = _default;
  return treeRole;
}
var treegridRole = {};
var hasRequiredTreegridRole;
function requireTreegridRole() {
  if (hasRequiredTreegridRole) return treegridRole;
  hasRequiredTreegridRole = 1;
  Object.defineProperty(treegridRole, "__esModule", {
    value: true
  });
  treegridRole.default = void 0;
  var treegridRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["row"], ["row", "rowgroup"]],
    requiredProps: {},
    superClass: [["roletype", "widget", "composite", "grid"], ["roletype", "structure", "section", "table", "grid"], ["roletype", "widget", "composite", "select", "tree"], ["roletype", "structure", "section", "group", "select", "tree"]]
  };
  var _default = treegridRole$1;
  treegridRole.default = _default;
  return treegridRole;
}
var treeitemRole = {};
var hasRequiredTreeitemRole;
function requireTreeitemRole() {
  if (hasRequiredTreeitemRole) return treeitemRole;
  hasRequiredTreeitemRole = 1;
  Object.defineProperty(treeitemRole, "__esModule", {
    value: true
  });
  treeitemRole.default = void 0;
  var treeitemRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-expanded": null,
      "aria-haspopup": null
    },
    relatedConcepts: [],
    requireContextRole: ["group", "tree"],
    requiredContextRole: ["group", "tree"],
    requiredOwnedElements: [],
    requiredProps: {
      "aria-selected": null
    },
    superClass: [["roletype", "structure", "section", "listitem"], ["roletype", "widget", "input", "option"]]
  };
  var _default = treeitemRole$1;
  treeitemRole.default = _default;
  return treeitemRole;
}
var hasRequiredAriaLiteralRoles;
function requireAriaLiteralRoles() {
  if (hasRequiredAriaLiteralRoles) return ariaLiteralRoles;
  hasRequiredAriaLiteralRoles = 1;
  Object.defineProperty(ariaLiteralRoles, "__esModule", {
    value: true
  });
  ariaLiteralRoles.default = void 0;
  var _alertRole = _interopRequireDefault(requireAlertRole());
  var _alertdialogRole = _interopRequireDefault(requireAlertdialogRole());
  var _applicationRole = _interopRequireDefault(requireApplicationRole());
  var _articleRole = _interopRequireDefault(requireArticleRole());
  var _bannerRole = _interopRequireDefault(requireBannerRole());
  var _blockquoteRole = _interopRequireDefault(requireBlockquoteRole());
  var _buttonRole = _interopRequireDefault(requireButtonRole());
  var _captionRole = _interopRequireDefault(requireCaptionRole());
  var _cellRole = _interopRequireDefault(requireCellRole());
  var _checkboxRole = _interopRequireDefault(requireCheckboxRole());
  var _codeRole = _interopRequireDefault(requireCodeRole());
  var _columnheaderRole = _interopRequireDefault(requireColumnheaderRole());
  var _comboboxRole = _interopRequireDefault(requireComboboxRole());
  var _complementaryRole = _interopRequireDefault(requireComplementaryRole());
  var _contentinfoRole = _interopRequireDefault(requireContentinfoRole());
  var _definitionRole = _interopRequireDefault(requireDefinitionRole());
  var _deletionRole = _interopRequireDefault(requireDeletionRole());
  var _dialogRole = _interopRequireDefault(requireDialogRole());
  var _directoryRole = _interopRequireDefault(requireDirectoryRole());
  var _documentRole = _interopRequireDefault(requireDocumentRole());
  var _emphasisRole = _interopRequireDefault(requireEmphasisRole());
  var _feedRole = _interopRequireDefault(requireFeedRole());
  var _figureRole = _interopRequireDefault(requireFigureRole());
  var _formRole = _interopRequireDefault(requireFormRole());
  var _genericRole = _interopRequireDefault(requireGenericRole());
  var _gridRole = _interopRequireDefault(requireGridRole());
  var _gridcellRole = _interopRequireDefault(requireGridcellRole());
  var _groupRole = _interopRequireDefault(requireGroupRole());
  var _headingRole = _interopRequireDefault(requireHeadingRole());
  var _imgRole = _interopRequireDefault(requireImgRole());
  var _insertionRole = _interopRequireDefault(requireInsertionRole());
  var _linkRole = _interopRequireDefault(requireLinkRole());
  var _listRole = _interopRequireDefault(requireListRole());
  var _listboxRole = _interopRequireDefault(requireListboxRole());
  var _listitemRole = _interopRequireDefault(requireListitemRole());
  var _logRole = _interopRequireDefault(requireLogRole());
  var _mainRole = _interopRequireDefault(requireMainRole());
  var _markRole = _interopRequireDefault(requireMarkRole());
  var _marqueeRole = _interopRequireDefault(requireMarqueeRole());
  var _mathRole = _interopRequireDefault(requireMathRole());
  var _menuRole = _interopRequireDefault(requireMenuRole());
  var _menubarRole = _interopRequireDefault(requireMenubarRole());
  var _menuitemRole = _interopRequireDefault(requireMenuitemRole());
  var _menuitemcheckboxRole = _interopRequireDefault(requireMenuitemcheckboxRole());
  var _menuitemradioRole = _interopRequireDefault(requireMenuitemradioRole());
  var _meterRole = _interopRequireDefault(requireMeterRole());
  var _navigationRole = _interopRequireDefault(requireNavigationRole());
  var _noneRole = _interopRequireDefault(requireNoneRole());
  var _noteRole = _interopRequireDefault(requireNoteRole());
  var _optionRole = _interopRequireDefault(requireOptionRole());
  var _paragraphRole = _interopRequireDefault(requireParagraphRole());
  var _presentationRole = _interopRequireDefault(requirePresentationRole());
  var _progressbarRole = _interopRequireDefault(requireProgressbarRole());
  var _radioRole = _interopRequireDefault(requireRadioRole());
  var _radiogroupRole = _interopRequireDefault(requireRadiogroupRole());
  var _regionRole = _interopRequireDefault(requireRegionRole());
  var _rowRole = _interopRequireDefault(requireRowRole());
  var _rowgroupRole = _interopRequireDefault(requireRowgroupRole());
  var _rowheaderRole = _interopRequireDefault(requireRowheaderRole());
  var _scrollbarRole = _interopRequireDefault(requireScrollbarRole());
  var _searchRole = _interopRequireDefault(requireSearchRole());
  var _searchboxRole = _interopRequireDefault(requireSearchboxRole());
  var _separatorRole = _interopRequireDefault(requireSeparatorRole());
  var _sliderRole = _interopRequireDefault(requireSliderRole());
  var _spinbuttonRole = _interopRequireDefault(requireSpinbuttonRole());
  var _statusRole = _interopRequireDefault(requireStatusRole());
  var _strongRole = _interopRequireDefault(requireStrongRole());
  var _subscriptRole = _interopRequireDefault(requireSubscriptRole());
  var _superscriptRole = _interopRequireDefault(requireSuperscriptRole());
  var _switchRole = _interopRequireDefault(requireSwitchRole());
  var _tabRole = _interopRequireDefault(requireTabRole());
  var _tableRole = _interopRequireDefault(requireTableRole());
  var _tablistRole = _interopRequireDefault(requireTablistRole());
  var _tabpanelRole = _interopRequireDefault(requireTabpanelRole());
  var _termRole = _interopRequireDefault(requireTermRole());
  var _textboxRole = _interopRequireDefault(requireTextboxRole());
  var _timeRole = _interopRequireDefault(requireTimeRole());
  var _timerRole = _interopRequireDefault(requireTimerRole());
  var _toolbarRole = _interopRequireDefault(requireToolbarRole());
  var _tooltipRole = _interopRequireDefault(requireTooltipRole());
  var _treeRole = _interopRequireDefault(requireTreeRole());
  var _treegridRole = _interopRequireDefault(requireTreegridRole());
  var _treeitemRole = _interopRequireDefault(requireTreeitemRole());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var ariaLiteralRoles$1 = [["alert", _alertRole.default], ["alertdialog", _alertdialogRole.default], ["application", _applicationRole.default], ["article", _articleRole.default], ["banner", _bannerRole.default], ["blockquote", _blockquoteRole.default], ["button", _buttonRole.default], ["caption", _captionRole.default], ["cell", _cellRole.default], ["checkbox", _checkboxRole.default], ["code", _codeRole.default], ["columnheader", _columnheaderRole.default], ["combobox", _comboboxRole.default], ["complementary", _complementaryRole.default], ["contentinfo", _contentinfoRole.default], ["definition", _definitionRole.default], ["deletion", _deletionRole.default], ["dialog", _dialogRole.default], ["directory", _directoryRole.default], ["document", _documentRole.default], ["emphasis", _emphasisRole.default], ["feed", _feedRole.default], ["figure", _figureRole.default], ["form", _formRole.default], ["generic", _genericRole.default], ["grid", _gridRole.default], ["gridcell", _gridcellRole.default], ["group", _groupRole.default], ["heading", _headingRole.default], ["img", _imgRole.default], ["insertion", _insertionRole.default], ["link", _linkRole.default], ["list", _listRole.default], ["listbox", _listboxRole.default], ["listitem", _listitemRole.default], ["log", _logRole.default], ["main", _mainRole.default], ["mark", _markRole.default], ["marquee", _marqueeRole.default], ["math", _mathRole.default], ["menu", _menuRole.default], ["menubar", _menubarRole.default], ["menuitem", _menuitemRole.default], ["menuitemcheckbox", _menuitemcheckboxRole.default], ["menuitemradio", _menuitemradioRole.default], ["meter", _meterRole.default], ["navigation", _navigationRole.default], ["none", _noneRole.default], ["note", _noteRole.default], ["option", _optionRole.default], ["paragraph", _paragraphRole.default], ["presentation", _presentationRole.default], ["progressbar", _progressbarRole.default], ["radio", _radioRole.default], ["radiogroup", _radiogroupRole.default], ["region", _regionRole.default], ["row", _rowRole.default], ["rowgroup", _rowgroupRole.default], ["rowheader", _rowheaderRole.default], ["scrollbar", _scrollbarRole.default], ["search", _searchRole.default], ["searchbox", _searchboxRole.default], ["separator", _separatorRole.default], ["slider", _sliderRole.default], ["spinbutton", _spinbuttonRole.default], ["status", _statusRole.default], ["strong", _strongRole.default], ["subscript", _subscriptRole.default], ["superscript", _superscriptRole.default], ["switch", _switchRole.default], ["tab", _tabRole.default], ["table", _tableRole.default], ["tablist", _tablistRole.default], ["tabpanel", _tabpanelRole.default], ["term", _termRole.default], ["textbox", _textboxRole.default], ["time", _timeRole.default], ["timer", _timerRole.default], ["toolbar", _toolbarRole.default], ["tooltip", _tooltipRole.default], ["tree", _treeRole.default], ["treegrid", _treegridRole.default], ["treeitem", _treeitemRole.default]];
  var _default = ariaLiteralRoles$1;
  ariaLiteralRoles.default = _default;
  return ariaLiteralRoles;
}
var ariaDpubRoles = {};
var docAbstractRole = {};
var hasRequiredDocAbstractRole;
function requireDocAbstractRole() {
  if (hasRequiredDocAbstractRole) return docAbstractRole;
  hasRequiredDocAbstractRole = 1;
  Object.defineProperty(docAbstractRole, "__esModule", {
    value: true
  });
  docAbstractRole.default = void 0;
  var docAbstractRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "abstract [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = docAbstractRole$1;
  docAbstractRole.default = _default;
  return docAbstractRole;
}
var docAcknowledgmentsRole = {};
var hasRequiredDocAcknowledgmentsRole;
function requireDocAcknowledgmentsRole() {
  if (hasRequiredDocAcknowledgmentsRole) return docAcknowledgmentsRole;
  hasRequiredDocAcknowledgmentsRole = 1;
  Object.defineProperty(docAcknowledgmentsRole, "__esModule", {
    value: true
  });
  docAcknowledgmentsRole.default = void 0;
  var docAcknowledgmentsRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "acknowledgments [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default = docAcknowledgmentsRole$1;
  docAcknowledgmentsRole.default = _default;
  return docAcknowledgmentsRole;
}
var docAfterwordRole = {};
var hasRequiredDocAfterwordRole;
function requireDocAfterwordRole() {
  if (hasRequiredDocAfterwordRole) return docAfterwordRole;
  hasRequiredDocAfterwordRole = 1;
  Object.defineProperty(docAfterwordRole, "__esModule", {
    value: true
  });
  docAfterwordRole.default = void 0;
  var docAfterwordRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "afterword [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default = docAfterwordRole$1;
  docAfterwordRole.default = _default;
  return docAfterwordRole;
}
var docAppendixRole = {};
var hasRequiredDocAppendixRole;
function requireDocAppendixRole() {
  if (hasRequiredDocAppendixRole) return docAppendixRole;
  hasRequiredDocAppendixRole = 1;
  Object.defineProperty(docAppendixRole, "__esModule", {
    value: true
  });
  docAppendixRole.default = void 0;
  var docAppendixRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "appendix [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default = docAppendixRole$1;
  docAppendixRole.default = _default;
  return docAppendixRole;
}
var docBacklinkRole = {};
var hasRequiredDocBacklinkRole;
function requireDocBacklinkRole() {
  if (hasRequiredDocBacklinkRole) return docBacklinkRole;
  hasRequiredDocBacklinkRole = 1;
  Object.defineProperty(docBacklinkRole, "__esModule", {
    value: true
  });
  docBacklinkRole.default = void 0;
  var docBacklinkRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-errormessage": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "referrer [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "command", "link"]]
  };
  var _default = docBacklinkRole$1;
  docBacklinkRole.default = _default;
  return docBacklinkRole;
}
var docBiblioentryRole = {};
var hasRequiredDocBiblioentryRole;
function requireDocBiblioentryRole() {
  if (hasRequiredDocBiblioentryRole) return docBiblioentryRole;
  hasRequiredDocBiblioentryRole = 1;
  Object.defineProperty(docBiblioentryRole, "__esModule", {
    value: true
  });
  docBiblioentryRole.default = void 0;
  var docBiblioentryRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "EPUB biblioentry [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: ["doc-bibliography"],
    requiredContextRole: ["doc-bibliography"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "listitem"]]
  };
  var _default = docBiblioentryRole$1;
  docBiblioentryRole.default = _default;
  return docBiblioentryRole;
}
var docBibliographyRole = {};
var hasRequiredDocBibliographyRole;
function requireDocBibliographyRole() {
  if (hasRequiredDocBibliographyRole) return docBibliographyRole;
  hasRequiredDocBibliographyRole = 1;
  Object.defineProperty(docBibliographyRole, "__esModule", {
    value: true
  });
  docBibliographyRole.default = void 0;
  var docBibliographyRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "bibliography [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["doc-biblioentry"]],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default = docBibliographyRole$1;
  docBibliographyRole.default = _default;
  return docBibliographyRole;
}
var docBibliorefRole = {};
var hasRequiredDocBibliorefRole;
function requireDocBibliorefRole() {
  if (hasRequiredDocBibliorefRole) return docBibliorefRole;
  hasRequiredDocBibliorefRole = 1;
  Object.defineProperty(docBibliorefRole, "__esModule", {
    value: true
  });
  docBibliorefRole.default = void 0;
  var docBibliorefRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-errormessage": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "biblioref [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "command", "link"]]
  };
  var _default = docBibliorefRole$1;
  docBibliorefRole.default = _default;
  return docBibliorefRole;
}
var docChapterRole = {};
var hasRequiredDocChapterRole;
function requireDocChapterRole() {
  if (hasRequiredDocChapterRole) return docChapterRole;
  hasRequiredDocChapterRole = 1;
  Object.defineProperty(docChapterRole, "__esModule", {
    value: true
  });
  docChapterRole.default = void 0;
  var docChapterRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "chapter [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default = docChapterRole$1;
  docChapterRole.default = _default;
  return docChapterRole;
}
var docColophonRole = {};
var hasRequiredDocColophonRole;
function requireDocColophonRole() {
  if (hasRequiredDocColophonRole) return docColophonRole;
  hasRequiredDocColophonRole = 1;
  Object.defineProperty(docColophonRole, "__esModule", {
    value: true
  });
  docColophonRole.default = void 0;
  var docColophonRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "colophon [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = docColophonRole$1;
  docColophonRole.default = _default;
  return docColophonRole;
}
var docConclusionRole = {};
var hasRequiredDocConclusionRole;
function requireDocConclusionRole() {
  if (hasRequiredDocConclusionRole) return docConclusionRole;
  hasRequiredDocConclusionRole = 1;
  Object.defineProperty(docConclusionRole, "__esModule", {
    value: true
  });
  docConclusionRole.default = void 0;
  var docConclusionRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "conclusion [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default = docConclusionRole$1;
  docConclusionRole.default = _default;
  return docConclusionRole;
}
var docCoverRole = {};
var hasRequiredDocCoverRole;
function requireDocCoverRole() {
  if (hasRequiredDocCoverRole) return docCoverRole;
  hasRequiredDocCoverRole = 1;
  Object.defineProperty(docCoverRole, "__esModule", {
    value: true
  });
  docCoverRole.default = void 0;
  var docCoverRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "cover [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "img"]]
  };
  var _default = docCoverRole$1;
  docCoverRole.default = _default;
  return docCoverRole;
}
var docCreditRole = {};
var hasRequiredDocCreditRole;
function requireDocCreditRole() {
  if (hasRequiredDocCreditRole) return docCreditRole;
  hasRequiredDocCreditRole = 1;
  Object.defineProperty(docCreditRole, "__esModule", {
    value: true
  });
  docCreditRole.default = void 0;
  var docCreditRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "credit [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = docCreditRole$1;
  docCreditRole.default = _default;
  return docCreditRole;
}
var docCreditsRole = {};
var hasRequiredDocCreditsRole;
function requireDocCreditsRole() {
  if (hasRequiredDocCreditsRole) return docCreditsRole;
  hasRequiredDocCreditsRole = 1;
  Object.defineProperty(docCreditsRole, "__esModule", {
    value: true
  });
  docCreditsRole.default = void 0;
  var docCreditsRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "credits [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default = docCreditsRole$1;
  docCreditsRole.default = _default;
  return docCreditsRole;
}
var docDedicationRole = {};
var hasRequiredDocDedicationRole;
function requireDocDedicationRole() {
  if (hasRequiredDocDedicationRole) return docDedicationRole;
  hasRequiredDocDedicationRole = 1;
  Object.defineProperty(docDedicationRole, "__esModule", {
    value: true
  });
  docDedicationRole.default = void 0;
  var docDedicationRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "dedication [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = docDedicationRole$1;
  docDedicationRole.default = _default;
  return docDedicationRole;
}
var docEndnoteRole = {};
var hasRequiredDocEndnoteRole;
function requireDocEndnoteRole() {
  if (hasRequiredDocEndnoteRole) return docEndnoteRole;
  hasRequiredDocEndnoteRole = 1;
  Object.defineProperty(docEndnoteRole, "__esModule", {
    value: true
  });
  docEndnoteRole.default = void 0;
  var docEndnoteRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "rearnote [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: ["doc-endnotes"],
    requiredContextRole: ["doc-endnotes"],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "listitem"]]
  };
  var _default = docEndnoteRole$1;
  docEndnoteRole.default = _default;
  return docEndnoteRole;
}
var docEndnotesRole = {};
var hasRequiredDocEndnotesRole;
function requireDocEndnotesRole() {
  if (hasRequiredDocEndnotesRole) return docEndnotesRole;
  hasRequiredDocEndnotesRole = 1;
  Object.defineProperty(docEndnotesRole, "__esModule", {
    value: true
  });
  docEndnotesRole.default = void 0;
  var docEndnotesRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "rearnotes [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["doc-endnote"]],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default = docEndnotesRole$1;
  docEndnotesRole.default = _default;
  return docEndnotesRole;
}
var docEpigraphRole = {};
var hasRequiredDocEpigraphRole;
function requireDocEpigraphRole() {
  if (hasRequiredDocEpigraphRole) return docEpigraphRole;
  hasRequiredDocEpigraphRole = 1;
  Object.defineProperty(docEpigraphRole, "__esModule", {
    value: true
  });
  docEpigraphRole.default = void 0;
  var docEpigraphRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "epigraph [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = docEpigraphRole$1;
  docEpigraphRole.default = _default;
  return docEpigraphRole;
}
var docEpilogueRole = {};
var hasRequiredDocEpilogueRole;
function requireDocEpilogueRole() {
  if (hasRequiredDocEpilogueRole) return docEpilogueRole;
  hasRequiredDocEpilogueRole = 1;
  Object.defineProperty(docEpilogueRole, "__esModule", {
    value: true
  });
  docEpilogueRole.default = void 0;
  var docEpilogueRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "epilogue [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default = docEpilogueRole$1;
  docEpilogueRole.default = _default;
  return docEpilogueRole;
}
var docErrataRole = {};
var hasRequiredDocErrataRole;
function requireDocErrataRole() {
  if (hasRequiredDocErrataRole) return docErrataRole;
  hasRequiredDocErrataRole = 1;
  Object.defineProperty(docErrataRole, "__esModule", {
    value: true
  });
  docErrataRole.default = void 0;
  var docErrataRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "errata [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default = docErrataRole$1;
  docErrataRole.default = _default;
  return docErrataRole;
}
var docExampleRole = {};
var hasRequiredDocExampleRole;
function requireDocExampleRole() {
  if (hasRequiredDocExampleRole) return docExampleRole;
  hasRequiredDocExampleRole = 1;
  Object.defineProperty(docExampleRole, "__esModule", {
    value: true
  });
  docExampleRole.default = void 0;
  var docExampleRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = docExampleRole$1;
  docExampleRole.default = _default;
  return docExampleRole;
}
var docFootnoteRole = {};
var hasRequiredDocFootnoteRole;
function requireDocFootnoteRole() {
  if (hasRequiredDocFootnoteRole) return docFootnoteRole;
  hasRequiredDocFootnoteRole = 1;
  Object.defineProperty(docFootnoteRole, "__esModule", {
    value: true
  });
  docFootnoteRole.default = void 0;
  var docFootnoteRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "footnote [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = docFootnoteRole$1;
  docFootnoteRole.default = _default;
  return docFootnoteRole;
}
var docForewordRole = {};
var hasRequiredDocForewordRole;
function requireDocForewordRole() {
  if (hasRequiredDocForewordRole) return docForewordRole;
  hasRequiredDocForewordRole = 1;
  Object.defineProperty(docForewordRole, "__esModule", {
    value: true
  });
  docForewordRole.default = void 0;
  var docForewordRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "foreword [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default = docForewordRole$1;
  docForewordRole.default = _default;
  return docForewordRole;
}
var docGlossaryRole = {};
var hasRequiredDocGlossaryRole;
function requireDocGlossaryRole() {
  if (hasRequiredDocGlossaryRole) return docGlossaryRole;
  hasRequiredDocGlossaryRole = 1;
  Object.defineProperty(docGlossaryRole, "__esModule", {
    value: true
  });
  docGlossaryRole.default = void 0;
  var docGlossaryRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "glossary [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [["definition"], ["term"]],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default = docGlossaryRole$1;
  docGlossaryRole.default = _default;
  return docGlossaryRole;
}
var docGlossrefRole = {};
var hasRequiredDocGlossrefRole;
function requireDocGlossrefRole() {
  if (hasRequiredDocGlossrefRole) return docGlossrefRole;
  hasRequiredDocGlossrefRole = 1;
  Object.defineProperty(docGlossrefRole, "__esModule", {
    value: true
  });
  docGlossrefRole.default = void 0;
  var docGlossrefRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-errormessage": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "glossref [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "command", "link"]]
  };
  var _default = docGlossrefRole$1;
  docGlossrefRole.default = _default;
  return docGlossrefRole;
}
var docIndexRole = {};
var hasRequiredDocIndexRole;
function requireDocIndexRole() {
  if (hasRequiredDocIndexRole) return docIndexRole;
  hasRequiredDocIndexRole = 1;
  Object.defineProperty(docIndexRole, "__esModule", {
    value: true
  });
  docIndexRole.default = void 0;
  var docIndexRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "index [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark", "navigation"]]
  };
  var _default = docIndexRole$1;
  docIndexRole.default = _default;
  return docIndexRole;
}
var docIntroductionRole = {};
var hasRequiredDocIntroductionRole;
function requireDocIntroductionRole() {
  if (hasRequiredDocIntroductionRole) return docIntroductionRole;
  hasRequiredDocIntroductionRole = 1;
  Object.defineProperty(docIntroductionRole, "__esModule", {
    value: true
  });
  docIntroductionRole.default = void 0;
  var docIntroductionRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "introduction [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default = docIntroductionRole$1;
  docIntroductionRole.default = _default;
  return docIntroductionRole;
}
var docNoterefRole = {};
var hasRequiredDocNoterefRole;
function requireDocNoterefRole() {
  if (hasRequiredDocNoterefRole) return docNoterefRole;
  hasRequiredDocNoterefRole = 1;
  Object.defineProperty(docNoterefRole, "__esModule", {
    value: true
  });
  docNoterefRole.default = void 0;
  var docNoterefRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-errormessage": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "noteref [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "widget", "command", "link"]]
  };
  var _default = docNoterefRole$1;
  docNoterefRole.default = _default;
  return docNoterefRole;
}
var docNoticeRole = {};
var hasRequiredDocNoticeRole;
function requireDocNoticeRole() {
  if (hasRequiredDocNoticeRole) return docNoticeRole;
  hasRequiredDocNoticeRole = 1;
  Object.defineProperty(docNoticeRole, "__esModule", {
    value: true
  });
  docNoticeRole.default = void 0;
  var docNoticeRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "notice [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "note"]]
  };
  var _default = docNoticeRole$1;
  docNoticeRole.default = _default;
  return docNoticeRole;
}
var docPagebreakRole = {};
var hasRequiredDocPagebreakRole;
function requireDocPagebreakRole() {
  if (hasRequiredDocPagebreakRole) return docPagebreakRole;
  hasRequiredDocPagebreakRole = 1;
  Object.defineProperty(docPagebreakRole, "__esModule", {
    value: true
  });
  docPagebreakRole.default = void 0;
  var docPagebreakRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "pagebreak [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "separator"]]
  };
  var _default = docPagebreakRole$1;
  docPagebreakRole.default = _default;
  return docPagebreakRole;
}
var docPagelistRole = {};
var hasRequiredDocPagelistRole;
function requireDocPagelistRole() {
  if (hasRequiredDocPagelistRole) return docPagelistRole;
  hasRequiredDocPagelistRole = 1;
  Object.defineProperty(docPagelistRole, "__esModule", {
    value: true
  });
  docPagelistRole.default = void 0;
  var docPagelistRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "page-list [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark", "navigation"]]
  };
  var _default = docPagelistRole$1;
  docPagelistRole.default = _default;
  return docPagelistRole;
}
var docPartRole = {};
var hasRequiredDocPartRole;
function requireDocPartRole() {
  if (hasRequiredDocPartRole) return docPartRole;
  hasRequiredDocPartRole = 1;
  Object.defineProperty(docPartRole, "__esModule", {
    value: true
  });
  docPartRole.default = void 0;
  var docPartRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "part [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default = docPartRole$1;
  docPartRole.default = _default;
  return docPartRole;
}
var docPrefaceRole = {};
var hasRequiredDocPrefaceRole;
function requireDocPrefaceRole() {
  if (hasRequiredDocPrefaceRole) return docPrefaceRole;
  hasRequiredDocPrefaceRole = 1;
  Object.defineProperty(docPrefaceRole, "__esModule", {
    value: true
  });
  docPrefaceRole.default = void 0;
  var docPrefaceRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "preface [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default = docPrefaceRole$1;
  docPrefaceRole.default = _default;
  return docPrefaceRole;
}
var docPrologueRole = {};
var hasRequiredDocPrologueRole;
function requireDocPrologueRole() {
  if (hasRequiredDocPrologueRole) return docPrologueRole;
  hasRequiredDocPrologueRole = 1;
  Object.defineProperty(docPrologueRole, "__esModule", {
    value: true
  });
  docPrologueRole.default = void 0;
  var docPrologueRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "prologue [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark"]]
  };
  var _default = docPrologueRole$1;
  docPrologueRole.default = _default;
  return docPrologueRole;
}
var docPullquoteRole = {};
var hasRequiredDocPullquoteRole;
function requireDocPullquoteRole() {
  if (hasRequiredDocPullquoteRole) return docPullquoteRole;
  hasRequiredDocPullquoteRole = 1;
  Object.defineProperty(docPullquoteRole, "__esModule", {
    value: true
  });
  docPullquoteRole.default = void 0;
  var docPullquoteRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {},
    relatedConcepts: [{
      concept: {
        name: "pullquote [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["none"]]
  };
  var _default = docPullquoteRole$1;
  docPullquoteRole.default = _default;
  return docPullquoteRole;
}
var docQnaRole = {};
var hasRequiredDocQnaRole;
function requireDocQnaRole() {
  if (hasRequiredDocQnaRole) return docQnaRole;
  hasRequiredDocQnaRole = 1;
  Object.defineProperty(docQnaRole, "__esModule", {
    value: true
  });
  docQnaRole.default = void 0;
  var docQnaRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "qna [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section"]]
  };
  var _default = docQnaRole$1;
  docQnaRole.default = _default;
  return docQnaRole;
}
var docSubtitleRole = {};
var hasRequiredDocSubtitleRole;
function requireDocSubtitleRole() {
  if (hasRequiredDocSubtitleRole) return docSubtitleRole;
  hasRequiredDocSubtitleRole = 1;
  Object.defineProperty(docSubtitleRole, "__esModule", {
    value: true
  });
  docSubtitleRole.default = void 0;
  var docSubtitleRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "subtitle [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "sectionhead"]]
  };
  var _default = docSubtitleRole$1;
  docSubtitleRole.default = _default;
  return docSubtitleRole;
}
var docTipRole = {};
var hasRequiredDocTipRole;
function requireDocTipRole() {
  if (hasRequiredDocTipRole) return docTipRole;
  hasRequiredDocTipRole = 1;
  Object.defineProperty(docTipRole, "__esModule", {
    value: true
  });
  docTipRole.default = void 0;
  var docTipRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "help [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "note"]]
  };
  var _default = docTipRole$1;
  docTipRole.default = _default;
  return docTipRole;
}
var docTocRole = {};
var hasRequiredDocTocRole;
function requireDocTocRole() {
  if (hasRequiredDocTocRole) return docTocRole;
  hasRequiredDocTocRole = 1;
  Object.defineProperty(docTocRole, "__esModule", {
    value: true
  });
  docTocRole.default = void 0;
  var docTocRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      concept: {
        name: "toc [EPUB-SSV]"
      },
      module: "EPUB"
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "landmark", "navigation"]]
  };
  var _default = docTocRole$1;
  docTocRole.default = _default;
  return docTocRole;
}
var hasRequiredAriaDpubRoles;
function requireAriaDpubRoles() {
  if (hasRequiredAriaDpubRoles) return ariaDpubRoles;
  hasRequiredAriaDpubRoles = 1;
  Object.defineProperty(ariaDpubRoles, "__esModule", {
    value: true
  });
  ariaDpubRoles.default = void 0;
  var _docAbstractRole = _interopRequireDefault(requireDocAbstractRole());
  var _docAcknowledgmentsRole = _interopRequireDefault(requireDocAcknowledgmentsRole());
  var _docAfterwordRole = _interopRequireDefault(requireDocAfterwordRole());
  var _docAppendixRole = _interopRequireDefault(requireDocAppendixRole());
  var _docBacklinkRole = _interopRequireDefault(requireDocBacklinkRole());
  var _docBiblioentryRole = _interopRequireDefault(requireDocBiblioentryRole());
  var _docBibliographyRole = _interopRequireDefault(requireDocBibliographyRole());
  var _docBibliorefRole = _interopRequireDefault(requireDocBibliorefRole());
  var _docChapterRole = _interopRequireDefault(requireDocChapterRole());
  var _docColophonRole = _interopRequireDefault(requireDocColophonRole());
  var _docConclusionRole = _interopRequireDefault(requireDocConclusionRole());
  var _docCoverRole = _interopRequireDefault(requireDocCoverRole());
  var _docCreditRole = _interopRequireDefault(requireDocCreditRole());
  var _docCreditsRole = _interopRequireDefault(requireDocCreditsRole());
  var _docDedicationRole = _interopRequireDefault(requireDocDedicationRole());
  var _docEndnoteRole = _interopRequireDefault(requireDocEndnoteRole());
  var _docEndnotesRole = _interopRequireDefault(requireDocEndnotesRole());
  var _docEpigraphRole = _interopRequireDefault(requireDocEpigraphRole());
  var _docEpilogueRole = _interopRequireDefault(requireDocEpilogueRole());
  var _docErrataRole = _interopRequireDefault(requireDocErrataRole());
  var _docExampleRole = _interopRequireDefault(requireDocExampleRole());
  var _docFootnoteRole = _interopRequireDefault(requireDocFootnoteRole());
  var _docForewordRole = _interopRequireDefault(requireDocForewordRole());
  var _docGlossaryRole = _interopRequireDefault(requireDocGlossaryRole());
  var _docGlossrefRole = _interopRequireDefault(requireDocGlossrefRole());
  var _docIndexRole = _interopRequireDefault(requireDocIndexRole());
  var _docIntroductionRole = _interopRequireDefault(requireDocIntroductionRole());
  var _docNoterefRole = _interopRequireDefault(requireDocNoterefRole());
  var _docNoticeRole = _interopRequireDefault(requireDocNoticeRole());
  var _docPagebreakRole = _interopRequireDefault(requireDocPagebreakRole());
  var _docPagelistRole = _interopRequireDefault(requireDocPagelistRole());
  var _docPartRole = _interopRequireDefault(requireDocPartRole());
  var _docPrefaceRole = _interopRequireDefault(requireDocPrefaceRole());
  var _docPrologueRole = _interopRequireDefault(requireDocPrologueRole());
  var _docPullquoteRole = _interopRequireDefault(requireDocPullquoteRole());
  var _docQnaRole = _interopRequireDefault(requireDocQnaRole());
  var _docSubtitleRole = _interopRequireDefault(requireDocSubtitleRole());
  var _docTipRole = _interopRequireDefault(requireDocTipRole());
  var _docTocRole = _interopRequireDefault(requireDocTocRole());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var ariaDpubRoles$1 = [["doc-abstract", _docAbstractRole.default], ["doc-acknowledgments", _docAcknowledgmentsRole.default], ["doc-afterword", _docAfterwordRole.default], ["doc-appendix", _docAppendixRole.default], ["doc-backlink", _docBacklinkRole.default], ["doc-biblioentry", _docBiblioentryRole.default], ["doc-bibliography", _docBibliographyRole.default], ["doc-biblioref", _docBibliorefRole.default], ["doc-chapter", _docChapterRole.default], ["doc-colophon", _docColophonRole.default], ["doc-conclusion", _docConclusionRole.default], ["doc-cover", _docCoverRole.default], ["doc-credit", _docCreditRole.default], ["doc-credits", _docCreditsRole.default], ["doc-dedication", _docDedicationRole.default], ["doc-endnote", _docEndnoteRole.default], ["doc-endnotes", _docEndnotesRole.default], ["doc-epigraph", _docEpigraphRole.default], ["doc-epilogue", _docEpilogueRole.default], ["doc-errata", _docErrataRole.default], ["doc-example", _docExampleRole.default], ["doc-footnote", _docFootnoteRole.default], ["doc-foreword", _docForewordRole.default], ["doc-glossary", _docGlossaryRole.default], ["doc-glossref", _docGlossrefRole.default], ["doc-index", _docIndexRole.default], ["doc-introduction", _docIntroductionRole.default], ["doc-noteref", _docNoterefRole.default], ["doc-notice", _docNoticeRole.default], ["doc-pagebreak", _docPagebreakRole.default], ["doc-pagelist", _docPagelistRole.default], ["doc-part", _docPartRole.default], ["doc-preface", _docPrefaceRole.default], ["doc-prologue", _docPrologueRole.default], ["doc-pullquote", _docPullquoteRole.default], ["doc-qna", _docQnaRole.default], ["doc-subtitle", _docSubtitleRole.default], ["doc-tip", _docTipRole.default], ["doc-toc", _docTocRole.default]];
  var _default = ariaDpubRoles$1;
  ariaDpubRoles.default = _default;
  return ariaDpubRoles;
}
var ariaGraphicsRoles = {};
var graphicsDocumentRole = {};
var hasRequiredGraphicsDocumentRole;
function requireGraphicsDocumentRole() {
  if (hasRequiredGraphicsDocumentRole) return graphicsDocumentRole;
  hasRequiredGraphicsDocumentRole = 1;
  Object.defineProperty(graphicsDocumentRole, "__esModule", {
    value: true
  });
  graphicsDocumentRole.default = void 0;
  var graphicsDocumentRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      module: "GRAPHICS",
      concept: {
        name: "graphics-object"
      }
    }, {
      module: "ARIA",
      concept: {
        name: "img"
      }
    }, {
      module: "ARIA",
      concept: {
        name: "article"
      }
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "document"]]
  };
  var _default = graphicsDocumentRole$1;
  graphicsDocumentRole.default = _default;
  return graphicsDocumentRole;
}
var graphicsObjectRole = {};
var hasRequiredGraphicsObjectRole;
function requireGraphicsObjectRole() {
  if (hasRequiredGraphicsObjectRole) return graphicsObjectRole;
  hasRequiredGraphicsObjectRole = 1;
  Object.defineProperty(graphicsObjectRole, "__esModule", {
    value: true
  });
  graphicsObjectRole.default = void 0;
  var graphicsObjectRole$1 = {
    abstract: false,
    accessibleNameRequired: false,
    baseConcepts: [],
    childrenPresentational: false,
    nameFrom: ["author", "contents"],
    prohibitedProps: [],
    props: {
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [{
      module: "GRAPHICS",
      concept: {
        name: "graphics-document"
      }
    }, {
      module: "ARIA",
      concept: {
        name: "group"
      }
    }, {
      module: "ARIA",
      concept: {
        name: "img"
      }
    }, {
      module: "GRAPHICS",
      concept: {
        name: "graphics-symbol"
      }
    }],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "group"]]
  };
  var _default = graphicsObjectRole$1;
  graphicsObjectRole.default = _default;
  return graphicsObjectRole;
}
var graphicsSymbolRole = {};
var hasRequiredGraphicsSymbolRole;
function requireGraphicsSymbolRole() {
  if (hasRequiredGraphicsSymbolRole) return graphicsSymbolRole;
  hasRequiredGraphicsSymbolRole = 1;
  Object.defineProperty(graphicsSymbolRole, "__esModule", {
    value: true
  });
  graphicsSymbolRole.default = void 0;
  var graphicsSymbolRole$1 = {
    abstract: false,
    accessibleNameRequired: true,
    baseConcepts: [],
    childrenPresentational: true,
    nameFrom: ["author"],
    prohibitedProps: [],
    props: {
      "aria-disabled": null,
      "aria-errormessage": null,
      "aria-expanded": null,
      "aria-haspopup": null,
      "aria-invalid": null
    },
    relatedConcepts: [],
    requireContextRole: [],
    requiredContextRole: [],
    requiredOwnedElements: [],
    requiredProps: {},
    superClass: [["roletype", "structure", "section", "img"]]
  };
  var _default = graphicsSymbolRole$1;
  graphicsSymbolRole.default = _default;
  return graphicsSymbolRole;
}
var hasRequiredAriaGraphicsRoles;
function requireAriaGraphicsRoles() {
  if (hasRequiredAriaGraphicsRoles) return ariaGraphicsRoles;
  hasRequiredAriaGraphicsRoles = 1;
  Object.defineProperty(ariaGraphicsRoles, "__esModule", {
    value: true
  });
  ariaGraphicsRoles.default = void 0;
  var _graphicsDocumentRole = _interopRequireDefault(requireGraphicsDocumentRole());
  var _graphicsObjectRole = _interopRequireDefault(requireGraphicsObjectRole());
  var _graphicsSymbolRole = _interopRequireDefault(requireGraphicsSymbolRole());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var ariaGraphicsRoles$1 = [["graphics-document", _graphicsDocumentRole.default], ["graphics-object", _graphicsObjectRole.default], ["graphics-symbol", _graphicsSymbolRole.default]];
  var _default = ariaGraphicsRoles$1;
  ariaGraphicsRoles.default = _default;
  return ariaGraphicsRoles;
}
var hasRequiredRolesMap;
function requireRolesMap() {
  if (hasRequiredRolesMap) return rolesMap;
  hasRequiredRolesMap = 1;
  Object.defineProperty(rolesMap, "__esModule", {
    value: true
  });
  rolesMap.default = void 0;
  var _ariaAbstractRoles = _interopRequireDefault(requireAriaAbstractRoles());
  var _ariaLiteralRoles = _interopRequireDefault(requireAriaLiteralRoles());
  var _ariaDpubRoles = _interopRequireDefault(requireAriaDpubRoles());
  var _ariaGraphicsRoles = _interopRequireDefault(requireAriaGraphicsRoles());
  var _iterationDecorator = _interopRequireDefault(requireIterationDecorator());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _defineProperty2(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike) {
        if (it) o = it;
        var i = 0;
        var F = function F2() {
        };
        return { s: F, n: function n() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        }, e: function e(_e2) {
          throw _e2;
        }, f: F };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return { s: function s() {
      it = it.call(o);
    }, n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    }, e: function e(_e3) {
      didErr = true;
      err = _e3;
    }, f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    } };
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  var roles = [].concat(_ariaAbstractRoles.default, _ariaLiteralRoles.default, _ariaDpubRoles.default, _ariaGraphicsRoles.default);
  roles.forEach(function(_ref) {
    var _ref2 = _slicedToArray(_ref, 2), roleDefinition = _ref2[1];
    var _iterator = _createForOfIteratorHelper(roleDefinition.superClass), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var superClassIter = _step.value;
        var _iterator2 = _createForOfIteratorHelper(superClassIter), _step2;
        try {
          var _loop = function _loop2() {
            var superClassName = _step2.value;
            var superClassRoleTuple = roles.find(function(_ref3) {
              var _ref4 = _slicedToArray(_ref3, 1), name = _ref4[0];
              return name === superClassName;
            });
            if (superClassRoleTuple) {
              var superClassDefinition = superClassRoleTuple[1];
              for (var _i2 = 0, _Object$keys = Object.keys(superClassDefinition.props); _i2 < _Object$keys.length; _i2++) {
                var prop = _Object$keys[_i2];
                if (
                  // $FlowIssue Accessing the hasOwnProperty on the Object prototype is fine.
                  !Object.prototype.hasOwnProperty.call(roleDefinition.props, prop)
                ) {
                  Object.assign(roleDefinition.props, _defineProperty2({}, prop, superClassDefinition.props[prop]));
                }
              }
            }
          };
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
            _loop();
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });
  var rolesMap$1 = {
    entries: function entries() {
      return roles;
    },
    forEach: function forEach(fn) {
      var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
      var _iterator3 = _createForOfIteratorHelper(roles), _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
          var _step3$value = _slicedToArray(_step3.value, 2), key = _step3$value[0], values = _step3$value[1];
          fn.call(thisArg, values, key, roles);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    },
    get: function get2(key) {
      var item = roles.find(function(tuple) {
        return tuple[0] === key ? true : false;
      });
      return item && item[1];
    },
    has: function has(key) {
      return !!rolesMap$1.get(key);
    },
    keys: function keys() {
      return roles.map(function(_ref5) {
        var _ref6 = _slicedToArray(_ref5, 1), key = _ref6[0];
        return key;
      });
    },
    values: function values() {
      return roles.map(function(_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2), values2 = _ref8[1];
        return values2;
      });
    }
  };
  var _default = (0, _iterationDecorator.default)(rolesMap$1, rolesMap$1.entries());
  rolesMap.default = _default;
  return rolesMap;
}
var elementRoleMap = {};
var lite = {};
var hasRequiredLite;
function requireLite() {
  if (hasRequiredLite) return lite;
  hasRequiredLite = 1;
  var has = Object.prototype.hasOwnProperty;
  function dequal(foo, bar) {
    var ctor, len;
    if (foo === bar) return true;
    if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
      if (ctor === Date) return foo.getTime() === bar.getTime();
      if (ctor === RegExp) return foo.toString() === bar.toString();
      if (ctor === Array) {
        if ((len = foo.length) === bar.length) {
          while (len-- && dequal(foo[len], bar[len])) ;
        }
        return len === -1;
      }
      if (!ctor || typeof foo === "object") {
        len = 0;
        for (ctor in foo) {
          if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
          if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;
        }
        return Object.keys(bar).length === len;
      }
    }
    return foo !== foo && bar !== bar;
  }
  lite.dequal = dequal;
  return lite;
}
var hasRequiredElementRoleMap;
function requireElementRoleMap() {
  if (hasRequiredElementRoleMap) return elementRoleMap;
  hasRequiredElementRoleMap = 1;
  Object.defineProperty(elementRoleMap, "__esModule", {
    value: true
  });
  elementRoleMap.default = void 0;
  var _lite = requireLite();
  var _iterationDecorator = _interopRequireDefault(requireIterationDecorator());
  var _rolesMap = _interopRequireDefault(requireRolesMap());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _slicedToArray(arr, i2) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i2) || _unsupportedIterableToArray(arr, i2) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _iterableToArrayLimit(arr, i2) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i2 && _arr.length === i2) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike) {
        if (it) o = it;
        var i2 = 0;
        var F = function F2() {
        };
        return { s: F, n: function n() {
          if (i2 >= o.length) return { done: true };
          return { done: false, value: o[i2++] };
        }, e: function e(_e2) {
          throw _e2;
        }, f: F };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return { s: function s() {
      it = it.call(o);
    }, n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    }, e: function e(_e3) {
      didErr = true;
      err = _e3;
    }, f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    } };
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
      arr2[i2] = arr[i2];
    }
    return arr2;
  }
  var elementRoles = [];
  var keys = _rolesMap.default.keys();
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var role = _rolesMap.default.get(key);
    if (role) {
      var concepts = [].concat(role.baseConcepts, role.relatedConcepts);
      for (var k = 0; k < concepts.length; k++) {
        var relation = concepts[k];
        if (relation.module === "HTML") {
          (function() {
            var concept = relation.concept;
            if (concept) {
              var elementRoleRelation = elementRoles.find(function(relation2) {
                return (0, _lite.dequal)(relation2, concept);
              });
              var roles;
              if (elementRoleRelation) {
                roles = elementRoleRelation[1];
              } else {
                roles = [];
              }
              var isUnique = true;
              for (var _i = 0; _i < roles.length; _i++) {
                if (roles[_i] === key) {
                  isUnique = false;
                  break;
                }
              }
              if (isUnique) {
                roles.push(key);
              }
              elementRoles.push([concept, roles]);
            }
          })();
        }
      }
    }
  }
  var elementRoleMap$1 = {
    entries: function entries() {
      return elementRoles;
    },
    forEach: function forEach(fn) {
      var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
      var _iterator = _createForOfIteratorHelper(elementRoles), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var _step$value = _slicedToArray(_step.value, 2), _key = _step$value[0], values = _step$value[1];
          fn.call(thisArg, values, _key, elementRoles);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },
    get: function get2(key2) {
      var item = elementRoles.find(function(tuple) {
        return key2.name === tuple[0].name && (0, _lite.dequal)(key2.attributes, tuple[0].attributes);
      });
      return item && item[1];
    },
    has: function has(key2) {
      return !!elementRoleMap$1.get(key2);
    },
    keys: function keys2() {
      return elementRoles.map(function(_ref) {
        var _ref2 = _slicedToArray(_ref, 1), key2 = _ref2[0];
        return key2;
      });
    },
    values: function values() {
      return elementRoles.map(function(_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2), values2 = _ref4[1];
        return values2;
      });
    }
  };
  var _default = (0, _iterationDecorator.default)(elementRoleMap$1, elementRoleMap$1.entries());
  elementRoleMap.default = _default;
  return elementRoleMap;
}
var roleElementMap = {};
var hasRequiredRoleElementMap;
function requireRoleElementMap() {
  if (hasRequiredRoleElementMap) return roleElementMap;
  hasRequiredRoleElementMap = 1;
  Object.defineProperty(roleElementMap, "__esModule", {
    value: true
  });
  roleElementMap.default = void 0;
  var _iterationDecorator = _interopRequireDefault(requireIterationDecorator());
  var _rolesMap = _interopRequireDefault(requireRolesMap());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _slicedToArray(arr, i2) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i2) || _unsupportedIterableToArray(arr, i2) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _iterableToArrayLimit(arr, i2) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i2 && _arr.length === i2) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike) {
        if (it) o = it;
        var i2 = 0;
        var F = function F2() {
        };
        return { s: F, n: function n() {
          if (i2 >= o.length) return { done: true };
          return { done: false, value: o[i2++] };
        }, e: function e(_e2) {
          throw _e2;
        }, f: F };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return { s: function s() {
      it = it.call(o);
    }, n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    }, e: function e(_e3) {
      didErr = true;
      err = _e3;
    }, f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    } };
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
      arr2[i2] = arr[i2];
    }
    return arr2;
  }
  var roleElement = [];
  var keys = _rolesMap.default.keys();
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var role = _rolesMap.default.get(key);
    var relationConcepts = [];
    if (role) {
      var concepts = [].concat(role.baseConcepts, role.relatedConcepts);
      for (var k = 0; k < concepts.length; k++) {
        var relation = concepts[k];
        if (relation.module === "HTML") {
          var concept = relation.concept;
          if (concept != null) {
            relationConcepts.push(concept);
          }
        }
      }
      if (relationConcepts.length > 0) {
        roleElement.push([key, relationConcepts]);
      }
    }
  }
  var roleElementMap$1 = {
    entries: function entries() {
      return roleElement;
    },
    forEach: function forEach(fn) {
      var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
      var _iterator = _createForOfIteratorHelper(roleElement), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var _step$value = _slicedToArray(_step.value, 2), _key = _step$value[0], values = _step$value[1];
          fn.call(thisArg, values, _key, roleElement);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },
    get: function get2(key2) {
      var item = roleElement.find(function(tuple) {
        return tuple[0] === key2 ? true : false;
      });
      return item && item[1];
    },
    has: function has(key2) {
      return !!roleElementMap$1.get(key2);
    },
    keys: function keys2() {
      return roleElement.map(function(_ref) {
        var _ref2 = _slicedToArray(_ref, 1), key2 = _ref2[0];
        return key2;
      });
    },
    values: function values() {
      return roleElement.map(function(_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2), values2 = _ref4[1];
        return values2;
      });
    }
  };
  var _default = (0, _iterationDecorator.default)(roleElementMap$1, roleElementMap$1.entries());
  roleElementMap.default = _default;
  return roleElementMap;
}
var hasRequiredLib;
function requireLib() {
  if (hasRequiredLib) return lib;
  hasRequiredLib = 1;
  Object.defineProperty(lib, "__esModule", {
    value: true
  });
  lib.roles = lib.roleElements = lib.elementRoles = lib.dom = lib.aria = void 0;
  var _ariaPropsMap = _interopRequireDefault(requireAriaPropsMap());
  var _domMap = _interopRequireDefault(requireDomMap());
  var _rolesMap = _interopRequireDefault(requireRolesMap());
  var _elementRoleMap = _interopRequireDefault(requireElementRoleMap());
  var _roleElementMap = _interopRequireDefault(requireRoleElementMap());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var aria = _ariaPropsMap.default;
  lib.aria = aria;
  var dom = _domMap.default;
  lib.dom = dom;
  var roles = _rolesMap.default;
  lib.roles = roles;
  var elementRoles = _elementRoleMap.default;
  lib.elementRoles = elementRoles;
  var roleElements = _roleElementMap.default;
  lib.roleElements = roleElements;
  return lib;
}
var libExports = requireLib();
var ansiStyles = { exports: {} };
var colorName;
var hasRequiredColorName;
function requireColorName() {
  if (hasRequiredColorName) return colorName;
  hasRequiredColorName = 1;
  colorName = {
    "aliceblue": [240, 248, 255],
    "antiquewhite": [250, 235, 215],
    "aqua": [0, 255, 255],
    "aquamarine": [127, 255, 212],
    "azure": [240, 255, 255],
    "beige": [245, 245, 220],
    "bisque": [255, 228, 196],
    "black": [0, 0, 0],
    "blanchedalmond": [255, 235, 205],
    "blue": [0, 0, 255],
    "blueviolet": [138, 43, 226],
    "brown": [165, 42, 42],
    "burlywood": [222, 184, 135],
    "cadetblue": [95, 158, 160],
    "chartreuse": [127, 255, 0],
    "chocolate": [210, 105, 30],
    "coral": [255, 127, 80],
    "cornflowerblue": [100, 149, 237],
    "cornsilk": [255, 248, 220],
    "crimson": [220, 20, 60],
    "cyan": [0, 255, 255],
    "darkblue": [0, 0, 139],
    "darkcyan": [0, 139, 139],
    "darkgoldenrod": [184, 134, 11],
    "darkgray": [169, 169, 169],
    "darkgreen": [0, 100, 0],
    "darkgrey": [169, 169, 169],
    "darkkhaki": [189, 183, 107],
    "darkmagenta": [139, 0, 139],
    "darkolivegreen": [85, 107, 47],
    "darkorange": [255, 140, 0],
    "darkorchid": [153, 50, 204],
    "darkred": [139, 0, 0],
    "darksalmon": [233, 150, 122],
    "darkseagreen": [143, 188, 143],
    "darkslateblue": [72, 61, 139],
    "darkslategray": [47, 79, 79],
    "darkslategrey": [47, 79, 79],
    "darkturquoise": [0, 206, 209],
    "darkviolet": [148, 0, 211],
    "deeppink": [255, 20, 147],
    "deepskyblue": [0, 191, 255],
    "dimgray": [105, 105, 105],
    "dimgrey": [105, 105, 105],
    "dodgerblue": [30, 144, 255],
    "firebrick": [178, 34, 34],
    "floralwhite": [255, 250, 240],
    "forestgreen": [34, 139, 34],
    "fuchsia": [255, 0, 255],
    "gainsboro": [220, 220, 220],
    "ghostwhite": [248, 248, 255],
    "gold": [255, 215, 0],
    "goldenrod": [218, 165, 32],
    "gray": [128, 128, 128],
    "green": [0, 128, 0],
    "greenyellow": [173, 255, 47],
    "grey": [128, 128, 128],
    "honeydew": [240, 255, 240],
    "hotpink": [255, 105, 180],
    "indianred": [205, 92, 92],
    "indigo": [75, 0, 130],
    "ivory": [255, 255, 240],
    "khaki": [240, 230, 140],
    "lavender": [230, 230, 250],
    "lavenderblush": [255, 240, 245],
    "lawngreen": [124, 252, 0],
    "lemonchiffon": [255, 250, 205],
    "lightblue": [173, 216, 230],
    "lightcoral": [240, 128, 128],
    "lightcyan": [224, 255, 255],
    "lightgoldenrodyellow": [250, 250, 210],
    "lightgray": [211, 211, 211],
    "lightgreen": [144, 238, 144],
    "lightgrey": [211, 211, 211],
    "lightpink": [255, 182, 193],
    "lightsalmon": [255, 160, 122],
    "lightseagreen": [32, 178, 170],
    "lightskyblue": [135, 206, 250],
    "lightslategray": [119, 136, 153],
    "lightslategrey": [119, 136, 153],
    "lightsteelblue": [176, 196, 222],
    "lightyellow": [255, 255, 224],
    "lime": [0, 255, 0],
    "limegreen": [50, 205, 50],
    "linen": [250, 240, 230],
    "magenta": [255, 0, 255],
    "maroon": [128, 0, 0],
    "mediumaquamarine": [102, 205, 170],
    "mediumblue": [0, 0, 205],
    "mediumorchid": [186, 85, 211],
    "mediumpurple": [147, 112, 219],
    "mediumseagreen": [60, 179, 113],
    "mediumslateblue": [123, 104, 238],
    "mediumspringgreen": [0, 250, 154],
    "mediumturquoise": [72, 209, 204],
    "mediumvioletred": [199, 21, 133],
    "midnightblue": [25, 25, 112],
    "mintcream": [245, 255, 250],
    "mistyrose": [255, 228, 225],
    "moccasin": [255, 228, 181],
    "navajowhite": [255, 222, 173],
    "navy": [0, 0, 128],
    "oldlace": [253, 245, 230],
    "olive": [128, 128, 0],
    "olivedrab": [107, 142, 35],
    "orange": [255, 165, 0],
    "orangered": [255, 69, 0],
    "orchid": [218, 112, 214],
    "palegoldenrod": [238, 232, 170],
    "palegreen": [152, 251, 152],
    "paleturquoise": [175, 238, 238],
    "palevioletred": [219, 112, 147],
    "papayawhip": [255, 239, 213],
    "peachpuff": [255, 218, 185],
    "peru": [205, 133, 63],
    "pink": [255, 192, 203],
    "plum": [221, 160, 221],
    "powderblue": [176, 224, 230],
    "purple": [128, 0, 128],
    "rebeccapurple": [102, 51, 153],
    "red": [255, 0, 0],
    "rosybrown": [188, 143, 143],
    "royalblue": [65, 105, 225],
    "saddlebrown": [139, 69, 19],
    "salmon": [250, 128, 114],
    "sandybrown": [244, 164, 96],
    "seagreen": [46, 139, 87],
    "seashell": [255, 245, 238],
    "sienna": [160, 82, 45],
    "silver": [192, 192, 192],
    "skyblue": [135, 206, 235],
    "slateblue": [106, 90, 205],
    "slategray": [112, 128, 144],
    "slategrey": [112, 128, 144],
    "snow": [255, 250, 250],
    "springgreen": [0, 255, 127],
    "steelblue": [70, 130, 180],
    "tan": [210, 180, 140],
    "teal": [0, 128, 128],
    "thistle": [216, 191, 216],
    "tomato": [255, 99, 71],
    "turquoise": [64, 224, 208],
    "violet": [238, 130, 238],
    "wheat": [245, 222, 179],
    "white": [255, 255, 255],
    "whitesmoke": [245, 245, 245],
    "yellow": [255, 255, 0],
    "yellowgreen": [154, 205, 50]
  };
  return colorName;
}
var conversions;
var hasRequiredConversions;
function requireConversions() {
  if (hasRequiredConversions) return conversions;
  hasRequiredConversions = 1;
  const cssKeywords = requireColorName();
  const reverseKeywords = {};
  for (const key of Object.keys(cssKeywords)) {
    reverseKeywords[cssKeywords[key]] = key;
  }
  const convert = {
    rgb: { channels: 3, labels: "rgb" },
    hsl: { channels: 3, labels: "hsl" },
    hsv: { channels: 3, labels: "hsv" },
    hwb: { channels: 3, labels: "hwb" },
    cmyk: { channels: 4, labels: "cmyk" },
    xyz: { channels: 3, labels: "xyz" },
    lab: { channels: 3, labels: "lab" },
    lch: { channels: 3, labels: "lch" },
    hex: { channels: 1, labels: ["hex"] },
    keyword: { channels: 1, labels: ["keyword"] },
    ansi16: { channels: 1, labels: ["ansi16"] },
    ansi256: { channels: 1, labels: ["ansi256"] },
    hcg: { channels: 3, labels: ["h", "c", "g"] },
    apple: { channels: 3, labels: ["r16", "g16", "b16"] },
    gray: { channels: 1, labels: ["gray"] }
  };
  conversions = convert;
  for (const model of Object.keys(convert)) {
    if (!("channels" in convert[model])) {
      throw new Error("missing channels property: " + model);
    }
    if (!("labels" in convert[model])) {
      throw new Error("missing channel labels property: " + model);
    }
    if (convert[model].labels.length !== convert[model].channels) {
      throw new Error("channel and label counts mismatch: " + model);
    }
    const { channels, labels } = convert[model];
    delete convert[model].channels;
    delete convert[model].labels;
    Object.defineProperty(convert[model], "channels", { value: channels });
    Object.defineProperty(convert[model], "labels", { value: labels });
  }
  convert.rgb.hsl = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const delta = max - min;
    let h;
    let s;
    if (max === min) {
      h = 0;
    } else if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = 2 + (b - r) / delta;
    } else if (b === max) {
      h = 4 + (r - g) / delta;
    }
    h = Math.min(h * 60, 360);
    if (h < 0) {
      h += 360;
    }
    const l = (min + max) / 2;
    if (max === min) {
      s = 0;
    } else if (l <= 0.5) {
      s = delta / (max + min);
    } else {
      s = delta / (2 - max - min);
    }
    return [h, s * 100, l * 100];
  };
  convert.rgb.hsv = function(rgb) {
    let rdif;
    let gdif;
    let bdif;
    let h;
    let s;
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const v = Math.max(r, g, b);
    const diff = v - Math.min(r, g, b);
    const diffc = function(c) {
      return (v - c) / 6 / diff + 1 / 2;
    };
    if (diff === 0) {
      h = 0;
      s = 0;
    } else {
      s = diff / v;
      rdif = diffc(r);
      gdif = diffc(g);
      bdif = diffc(b);
      if (r === v) {
        h = bdif - gdif;
      } else if (g === v) {
        h = 1 / 3 + rdif - bdif;
      } else if (b === v) {
        h = 2 / 3 + gdif - rdif;
      }
      if (h < 0) {
        h += 1;
      } else if (h > 1) {
        h -= 1;
      }
    }
    return [
      h * 360,
      s * 100,
      v * 100
    ];
  };
  convert.rgb.hwb = function(rgb) {
    const r = rgb[0];
    const g = rgb[1];
    let b = rgb[2];
    const h = convert.rgb.hsl(rgb)[0];
    const w = 1 / 255 * Math.min(r, Math.min(g, b));
    b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
    return [h, w * 100, b * 100];
  };
  convert.rgb.cmyk = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const k = Math.min(1 - r, 1 - g, 1 - b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;
    return [c * 100, m * 100, y * 100, k * 100];
  };
  function comparativeDistance(x, y) {
    return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
  }
  convert.rgb.keyword = function(rgb) {
    const reversed = reverseKeywords[rgb];
    if (reversed) {
      return reversed;
    }
    let currentClosestDistance = Infinity;
    let currentClosestKeyword;
    for (const keyword of Object.keys(cssKeywords)) {
      const value = cssKeywords[keyword];
      const distance = comparativeDistance(rgb, value);
      if (distance < currentClosestDistance) {
        currentClosestDistance = distance;
        currentClosestKeyword = keyword;
      }
    }
    return currentClosestKeyword;
  };
  convert.keyword.rgb = function(keyword) {
    return cssKeywords[keyword];
  };
  convert.rgb.xyz = function(rgb) {
    let r = rgb[0] / 255;
    let g = rgb[1] / 255;
    let b = rgb[2] / 255;
    r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
    g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
    b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
    const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
    const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
    const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
    return [x * 100, y * 100, z * 100];
  };
  convert.rgb.lab = function(rgb) {
    const xyz = convert.rgb.xyz(rgb);
    let x = xyz[0];
    let y = xyz[1];
    let z = xyz[2];
    x /= 95.047;
    y /= 100;
    z /= 108.883;
    x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
    y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
    z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
    const l = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);
    return [l, a, b];
  };
  convert.hsl.rgb = function(hsl) {
    const h = hsl[0] / 360;
    const s = hsl[1] / 100;
    const l = hsl[2] / 100;
    let t2;
    let t3;
    let val;
    if (s === 0) {
      val = l * 255;
      return [val, val, val];
    }
    if (l < 0.5) {
      t2 = l * (1 + s);
    } else {
      t2 = l + s - l * s;
    }
    const t1 = 2 * l - t2;
    const rgb = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
      t3 = h + 1 / 3 * -(i - 1);
      if (t3 < 0) {
        t3++;
      }
      if (t3 > 1) {
        t3--;
      }
      if (6 * t3 < 1) {
        val = t1 + (t2 - t1) * 6 * t3;
      } else if (2 * t3 < 1) {
        val = t2;
      } else if (3 * t3 < 2) {
        val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
      } else {
        val = t1;
      }
      rgb[i] = val * 255;
    }
    return rgb;
  };
  convert.hsl.hsv = function(hsl) {
    const h = hsl[0];
    let s = hsl[1] / 100;
    let l = hsl[2] / 100;
    let smin = s;
    const lmin = Math.max(l, 0.01);
    l *= 2;
    s *= l <= 1 ? l : 2 - l;
    smin *= lmin <= 1 ? lmin : 2 - lmin;
    const v = (l + s) / 2;
    const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
    return [h, sv * 100, v * 100];
  };
  convert.hsv.rgb = function(hsv) {
    const h = hsv[0] / 60;
    const s = hsv[1] / 100;
    let v = hsv[2] / 100;
    const hi = Math.floor(h) % 6;
    const f = h - Math.floor(h);
    const p = 255 * v * (1 - s);
    const q = 255 * v * (1 - s * f);
    const t = 255 * v * (1 - s * (1 - f));
    v *= 255;
    switch (hi) {
      case 0:
        return [v, t, p];
      case 1:
        return [q, v, p];
      case 2:
        return [p, v, t];
      case 3:
        return [p, q, v];
      case 4:
        return [t, p, v];
      case 5:
        return [v, p, q];
    }
  };
  convert.hsv.hsl = function(hsv) {
    const h = hsv[0];
    const s = hsv[1] / 100;
    const v = hsv[2] / 100;
    const vmin = Math.max(v, 0.01);
    let sl;
    let l;
    l = (2 - s) * v;
    const lmin = (2 - s) * vmin;
    sl = s * vmin;
    sl /= lmin <= 1 ? lmin : 2 - lmin;
    sl = sl || 0;
    l /= 2;
    return [h, sl * 100, l * 100];
  };
  convert.hwb.rgb = function(hwb) {
    const h = hwb[0] / 360;
    let wh = hwb[1] / 100;
    let bl = hwb[2] / 100;
    const ratio = wh + bl;
    let f;
    if (ratio > 1) {
      wh /= ratio;
      bl /= ratio;
    }
    const i = Math.floor(6 * h);
    const v = 1 - bl;
    f = 6 * h - i;
    if ((i & 1) !== 0) {
      f = 1 - f;
    }
    const n = wh + f * (v - wh);
    let r;
    let g;
    let b;
    switch (i) {
      default:
      case 6:
      case 0:
        r = v;
        g = n;
        b = wh;
        break;
      case 1:
        r = n;
        g = v;
        b = wh;
        break;
      case 2:
        r = wh;
        g = v;
        b = n;
        break;
      case 3:
        r = wh;
        g = n;
        b = v;
        break;
      case 4:
        r = n;
        g = wh;
        b = v;
        break;
      case 5:
        r = v;
        g = wh;
        b = n;
        break;
    }
    return [r * 255, g * 255, b * 255];
  };
  convert.cmyk.rgb = function(cmyk) {
    const c = cmyk[0] / 100;
    const m = cmyk[1] / 100;
    const y = cmyk[2] / 100;
    const k = cmyk[3] / 100;
    const r = 1 - Math.min(1, c * (1 - k) + k);
    const g = 1 - Math.min(1, m * (1 - k) + k);
    const b = 1 - Math.min(1, y * (1 - k) + k);
    return [r * 255, g * 255, b * 255];
  };
  convert.xyz.rgb = function(xyz) {
    const x = xyz[0] / 100;
    const y = xyz[1] / 100;
    const z = xyz[2] / 100;
    let r;
    let g;
    let b;
    r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    b = x * 0.0557 + y * -0.204 + z * 1.057;
    r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92;
    g = g > 31308e-7 ? 1.055 * g ** (1 / 2.4) - 0.055 : g * 12.92;
    b = b > 31308e-7 ? 1.055 * b ** (1 / 2.4) - 0.055 : b * 12.92;
    r = Math.min(Math.max(0, r), 1);
    g = Math.min(Math.max(0, g), 1);
    b = Math.min(Math.max(0, b), 1);
    return [r * 255, g * 255, b * 255];
  };
  convert.xyz.lab = function(xyz) {
    let x = xyz[0];
    let y = xyz[1];
    let z = xyz[2];
    x /= 95.047;
    y /= 100;
    z /= 108.883;
    x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
    y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
    z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
    const l = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);
    return [l, a, b];
  };
  convert.lab.xyz = function(lab) {
    const l = lab[0];
    const a = lab[1];
    const b = lab[2];
    let x;
    let y;
    let z;
    y = (l + 16) / 116;
    x = a / 500 + y;
    z = y - b / 200;
    const y2 = y ** 3;
    const x2 = x ** 3;
    const z2 = z ** 3;
    y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
    x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
    z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
    x *= 95.047;
    y *= 100;
    z *= 108.883;
    return [x, y, z];
  };
  convert.lab.lch = function(lab) {
    const l = lab[0];
    const a = lab[1];
    const b = lab[2];
    let h;
    const hr = Math.atan2(b, a);
    h = hr * 360 / 2 / Math.PI;
    if (h < 0) {
      h += 360;
    }
    const c = Math.sqrt(a * a + b * b);
    return [l, c, h];
  };
  convert.lch.lab = function(lch) {
    const l = lch[0];
    const c = lch[1];
    const h = lch[2];
    const hr = h / 360 * 2 * Math.PI;
    const a = c * Math.cos(hr);
    const b = c * Math.sin(hr);
    return [l, a, b];
  };
  convert.rgb.ansi16 = function(args, saturation = null) {
    const [r, g, b] = args;
    let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation;
    value = Math.round(value / 50);
    if (value === 0) {
      return 30;
    }
    let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
    if (value === 2) {
      ansi += 60;
    }
    return ansi;
  };
  convert.hsv.ansi16 = function(args) {
    return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
  };
  convert.rgb.ansi256 = function(args) {
    const r = args[0];
    const g = args[1];
    const b = args[2];
    if (r === g && g === b) {
      if (r < 8) {
        return 16;
      }
      if (r > 248) {
        return 231;
      }
      return Math.round((r - 8) / 247 * 24) + 232;
    }
    const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
    return ansi;
  };
  convert.ansi16.rgb = function(args) {
    let color = args % 10;
    if (color === 0 || color === 7) {
      if (args > 50) {
        color += 3.5;
      }
      color = color / 10.5 * 255;
      return [color, color, color];
    }
    const mult = (~~(args > 50) + 1) * 0.5;
    const r = (color & 1) * mult * 255;
    const g = (color >> 1 & 1) * mult * 255;
    const b = (color >> 2 & 1) * mult * 255;
    return [r, g, b];
  };
  convert.ansi256.rgb = function(args) {
    if (args >= 232) {
      const c = (args - 232) * 10 + 8;
      return [c, c, c];
    }
    args -= 16;
    let rem;
    const r = Math.floor(args / 36) / 5 * 255;
    const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
    const b = rem % 6 / 5 * 255;
    return [r, g, b];
  };
  convert.rgb.hex = function(args) {
    const integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
    const string = integer.toString(16).toUpperCase();
    return "000000".substring(string.length) + string;
  };
  convert.hex.rgb = function(args) {
    const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
    if (!match) {
      return [0, 0, 0];
    }
    let colorString = match[0];
    if (match[0].length === 3) {
      colorString = colorString.split("").map((char) => {
        return char + char;
      }).join("");
    }
    const integer = parseInt(colorString, 16);
    const r = integer >> 16 & 255;
    const g = integer >> 8 & 255;
    const b = integer & 255;
    return [r, g, b];
  };
  convert.rgb.hcg = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const max = Math.max(Math.max(r, g), b);
    const min = Math.min(Math.min(r, g), b);
    const chroma = max - min;
    let grayscale;
    let hue;
    if (chroma < 1) {
      grayscale = min / (1 - chroma);
    } else {
      grayscale = 0;
    }
    if (chroma <= 0) {
      hue = 0;
    } else if (max === r) {
      hue = (g - b) / chroma % 6;
    } else if (max === g) {
      hue = 2 + (b - r) / chroma;
    } else {
      hue = 4 + (r - g) / chroma;
    }
    hue /= 6;
    hue %= 1;
    return [hue * 360, chroma * 100, grayscale * 100];
  };
  convert.hsl.hcg = function(hsl) {
    const s = hsl[1] / 100;
    const l = hsl[2] / 100;
    const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
    let f = 0;
    if (c < 1) {
      f = (l - 0.5 * c) / (1 - c);
    }
    return [hsl[0], c * 100, f * 100];
  };
  convert.hsv.hcg = function(hsv) {
    const s = hsv[1] / 100;
    const v = hsv[2] / 100;
    const c = s * v;
    let f = 0;
    if (c < 1) {
      f = (v - c) / (1 - c);
    }
    return [hsv[0], c * 100, f * 100];
  };
  convert.hcg.rgb = function(hcg) {
    const h = hcg[0] / 360;
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    if (c === 0) {
      return [g * 255, g * 255, g * 255];
    }
    const pure = [0, 0, 0];
    const hi = h % 1 * 6;
    const v = hi % 1;
    const w = 1 - v;
    let mg = 0;
    switch (Math.floor(hi)) {
      case 0:
        pure[0] = 1;
        pure[1] = v;
        pure[2] = 0;
        break;
      case 1:
        pure[0] = w;
        pure[1] = 1;
        pure[2] = 0;
        break;
      case 2:
        pure[0] = 0;
        pure[1] = 1;
        pure[2] = v;
        break;
      case 3:
        pure[0] = 0;
        pure[1] = w;
        pure[2] = 1;
        break;
      case 4:
        pure[0] = v;
        pure[1] = 0;
        pure[2] = 1;
        break;
      default:
        pure[0] = 1;
        pure[1] = 0;
        pure[2] = w;
    }
    mg = (1 - c) * g;
    return [
      (c * pure[0] + mg) * 255,
      (c * pure[1] + mg) * 255,
      (c * pure[2] + mg) * 255
    ];
  };
  convert.hcg.hsv = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const v = c + g * (1 - c);
    let f = 0;
    if (v > 0) {
      f = c / v;
    }
    return [hcg[0], f * 100, v * 100];
  };
  convert.hcg.hsl = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const l = g * (1 - c) + 0.5 * c;
    let s = 0;
    if (l > 0 && l < 0.5) {
      s = c / (2 * l);
    } else if (l >= 0.5 && l < 1) {
      s = c / (2 * (1 - l));
    }
    return [hcg[0], s * 100, l * 100];
  };
  convert.hcg.hwb = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const v = c + g * (1 - c);
    return [hcg[0], (v - c) * 100, (1 - v) * 100];
  };
  convert.hwb.hcg = function(hwb) {
    const w = hwb[1] / 100;
    const b = hwb[2] / 100;
    const v = 1 - b;
    const c = v - w;
    let g = 0;
    if (c < 1) {
      g = (v - c) / (1 - c);
    }
    return [hwb[0], c * 100, g * 100];
  };
  convert.apple.rgb = function(apple) {
    return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
  };
  convert.rgb.apple = function(rgb) {
    return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
  };
  convert.gray.rgb = function(args) {
    return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
  };
  convert.gray.hsl = function(args) {
    return [0, 0, args[0]];
  };
  convert.gray.hsv = convert.gray.hsl;
  convert.gray.hwb = function(gray) {
    return [0, 100, gray[0]];
  };
  convert.gray.cmyk = function(gray) {
    return [0, 0, 0, gray[0]];
  };
  convert.gray.lab = function(gray) {
    return [gray[0], 0, 0];
  };
  convert.gray.hex = function(gray) {
    const val = Math.round(gray[0] / 100 * 255) & 255;
    const integer = (val << 16) + (val << 8) + val;
    const string = integer.toString(16).toUpperCase();
    return "000000".substring(string.length) + string;
  };
  convert.rgb.gray = function(rgb) {
    const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
    return [val / 255 * 100];
  };
  return conversions;
}
var route;
var hasRequiredRoute;
function requireRoute() {
  if (hasRequiredRoute) return route;
  hasRequiredRoute = 1;
  const conversions2 = requireConversions();
  function buildGraph() {
    const graph = {};
    const models = Object.keys(conversions2);
    for (let len = models.length, i = 0; i < len; i++) {
      graph[models[i]] = {
        // http://jsperf.com/1-vs-infinity
        // micro-opt, but this is simple.
        distance: -1,
        parent: null
      };
    }
    return graph;
  }
  function deriveBFS(fromModel) {
    const graph = buildGraph();
    const queue = [fromModel];
    graph[fromModel].distance = 0;
    while (queue.length) {
      const current = queue.pop();
      const adjacents = Object.keys(conversions2[current]);
      for (let len = adjacents.length, i = 0; i < len; i++) {
        const adjacent = adjacents[i];
        const node = graph[adjacent];
        if (node.distance === -1) {
          node.distance = graph[current].distance + 1;
          node.parent = current;
          queue.unshift(adjacent);
        }
      }
    }
    return graph;
  }
  function link(from, to) {
    return function(args) {
      return to(from(args));
    };
  }
  function wrapConversion(toModel, graph) {
    const path = [graph[toModel].parent, toModel];
    let fn = conversions2[graph[toModel].parent][toModel];
    let cur = graph[toModel].parent;
    while (graph[cur].parent) {
      path.unshift(graph[cur].parent);
      fn = link(conversions2[graph[cur].parent][cur], fn);
      cur = graph[cur].parent;
    }
    fn.conversion = path;
    return fn;
  }
  route = function(fromModel) {
    const graph = deriveBFS(fromModel);
    const conversion = {};
    const models = Object.keys(graph);
    for (let len = models.length, i = 0; i < len; i++) {
      const toModel = models[i];
      const node = graph[toModel];
      if (node.parent === null) {
        continue;
      }
      conversion[toModel] = wrapConversion(toModel, graph);
    }
    return conversion;
  };
  return route;
}
var colorConvert;
var hasRequiredColorConvert;
function requireColorConvert() {
  if (hasRequiredColorConvert) return colorConvert;
  hasRequiredColorConvert = 1;
  const conversions2 = requireConversions();
  const route2 = requireRoute();
  const convert = {};
  const models = Object.keys(conversions2);
  function wrapRaw(fn) {
    const wrappedFn = function(...args) {
      const arg0 = args[0];
      if (arg0 === void 0 || arg0 === null) {
        return arg0;
      }
      if (arg0.length > 1) {
        args = arg0;
      }
      return fn(args);
    };
    if ("conversion" in fn) {
      wrappedFn.conversion = fn.conversion;
    }
    return wrappedFn;
  }
  function wrapRounded(fn) {
    const wrappedFn = function(...args) {
      const arg0 = args[0];
      if (arg0 === void 0 || arg0 === null) {
        return arg0;
      }
      if (arg0.length > 1) {
        args = arg0;
      }
      const result = fn(args);
      if (typeof result === "object") {
        for (let len = result.length, i = 0; i < len; i++) {
          result[i] = Math.round(result[i]);
        }
      }
      return result;
    };
    if ("conversion" in fn) {
      wrappedFn.conversion = fn.conversion;
    }
    return wrappedFn;
  }
  models.forEach((fromModel) => {
    convert[fromModel] = {};
    Object.defineProperty(convert[fromModel], "channels", { value: conversions2[fromModel].channels });
    Object.defineProperty(convert[fromModel], "labels", { value: conversions2[fromModel].labels });
    const routes = route2(fromModel);
    const routeModels = Object.keys(routes);
    routeModels.forEach((toModel) => {
      const fn = routes[toModel];
      convert[fromModel][toModel] = wrapRounded(fn);
      convert[fromModel][toModel].raw = wrapRaw(fn);
    });
  });
  colorConvert = convert;
  return colorConvert;
}
ansiStyles.exports;
var hasRequiredAnsiStyles;
function requireAnsiStyles() {
  if (hasRequiredAnsiStyles) return ansiStyles.exports;
  hasRequiredAnsiStyles = 1;
  (function(module) {
    const wrapAnsi16 = (fn, offset) => (...args) => {
      const code = fn(...args);
      return `\x1B[${code + offset}m`;
    };
    const wrapAnsi256 = (fn, offset) => (...args) => {
      const code = fn(...args);
      return `\x1B[${38 + offset};5;${code}m`;
    };
    const wrapAnsi16m = (fn, offset) => (...args) => {
      const rgb = fn(...args);
      return `\x1B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
    };
    const ansi2ansi = (n) => n;
    const rgb2rgb = (r, g, b) => [r, g, b];
    const setLazyProperty = (object, property, get2) => {
      Object.defineProperty(object, property, {
        get: () => {
          const value = get2();
          Object.defineProperty(object, property, {
            value,
            enumerable: true,
            configurable: true
          });
          return value;
        },
        enumerable: true,
        configurable: true
      });
    };
    let colorConvert2;
    const makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
      if (colorConvert2 === void 0) {
        colorConvert2 = requireColorConvert();
      }
      const offset = isBackground ? 10 : 0;
      const styles = {};
      for (const [sourceSpace, suite] of Object.entries(colorConvert2)) {
        const name = sourceSpace === "ansi16" ? "ansi" : sourceSpace;
        if (sourceSpace === targetSpace) {
          styles[name] = wrap(identity, offset);
        } else if (typeof suite === "object") {
          styles[name] = wrap(suite[targetSpace], offset);
        }
      }
      return styles;
    };
    function assembleStyles() {
      const codes = /* @__PURE__ */ new Map();
      const styles = {
        modifier: {
          reset: [0, 0],
          // 21 isn't widely supported and 22 does the same thing
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
          inverse: [7, 27],
          hidden: [8, 28],
          strikethrough: [9, 29]
        },
        color: {
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],
          // Bright color
          blackBright: [90, 39],
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39]
        },
        bgColor: {
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],
          // Bright color
          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49]
        }
      };
      styles.color.gray = styles.color.blackBright;
      styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
      styles.color.grey = styles.color.blackBright;
      styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
      for (const [groupName, group] of Object.entries(styles)) {
        for (const [styleName, style] of Object.entries(group)) {
          styles[styleName] = {
            open: `\x1B[${style[0]}m`,
            close: `\x1B[${style[1]}m`
          };
          group[styleName] = styles[styleName];
          codes.set(style[0], style[1]);
        }
        Object.defineProperty(styles, groupName, {
          value: group,
          enumerable: false
        });
      }
      Object.defineProperty(styles, "codes", {
        value: codes,
        enumerable: false
      });
      styles.color.close = "\x1B[39m";
      styles.bgColor.close = "\x1B[49m";
      setLazyProperty(styles.color, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, false));
      setLazyProperty(styles.color, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, false));
      setLazyProperty(styles.color, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, false));
      setLazyProperty(styles.bgColor, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, true));
      setLazyProperty(styles.bgColor, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, true));
      setLazyProperty(styles.bgColor, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, true));
      return styles;
    }
    Object.defineProperty(module, "exports", {
      enumerable: true,
      get: assembleStyles
    });
  })(ansiStyles);
  return ansiStyles.exports;
}
var browser;
var hasRequiredBrowser;
function requireBrowser() {
  if (hasRequiredBrowser) return browser;
  hasRequiredBrowser = 1;
  browser = {
    stdout: false,
    stderr: false
  };
  return browser;
}
var util;
var hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil) return util;
  hasRequiredUtil = 1;
  const stringReplaceAll = (string, substring, replacer) => {
    let index = string.indexOf(substring);
    if (index === -1) {
      return string;
    }
    const substringLength = substring.length;
    let endIndex = 0;
    let returnValue = "";
    do {
      returnValue += string.substr(endIndex, index - endIndex) + substring + replacer;
      endIndex = index + substringLength;
      index = string.indexOf(substring, endIndex);
    } while (index !== -1);
    returnValue += string.substr(endIndex);
    return returnValue;
  };
  const stringEncaseCRLFWithFirstIndex = (string, prefix, postfix, index) => {
    let endIndex = 0;
    let returnValue = "";
    do {
      const gotCR = string[index - 1] === "\r";
      returnValue += string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
      endIndex = index + 1;
      index = string.indexOf("\n", endIndex);
    } while (index !== -1);
    returnValue += string.substr(endIndex);
    return returnValue;
  };
  util = {
    stringReplaceAll,
    stringEncaseCRLFWithFirstIndex
  };
  return util;
}
var templates;
var hasRequiredTemplates;
function requireTemplates() {
  if (hasRequiredTemplates) return templates;
  hasRequiredTemplates = 1;
  const TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
  const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
  const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
  const ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.)|([^\\])/gi;
  const ESCAPES = /* @__PURE__ */ new Map([
    ["n", "\n"],
    ["r", "\r"],
    ["t", "	"],
    ["b", "\b"],
    ["f", "\f"],
    ["v", "\v"],
    ["0", "\0"],
    ["\\", "\\"],
    ["e", "\x1B"],
    ["a", "\x07"]
  ]);
  function unescape(c) {
    const u = c[0] === "u";
    const bracket = c[1] === "{";
    if (u && !bracket && c.length === 5 || c[0] === "x" && c.length === 3) {
      return String.fromCharCode(parseInt(c.slice(1), 16));
    }
    if (u && bracket) {
      return String.fromCodePoint(parseInt(c.slice(2, -1), 16));
    }
    return ESCAPES.get(c) || c;
  }
  function parseArguments(name, arguments_) {
    const results = [];
    const chunks = arguments_.trim().split(/\s*,\s*/g);
    let matches2;
    for (const chunk of chunks) {
      const number = Number(chunk);
      if (!Number.isNaN(number)) {
        results.push(number);
      } else if (matches2 = chunk.match(STRING_REGEX)) {
        results.push(matches2[2].replace(ESCAPE_REGEX, (m, escape2, character) => escape2 ? unescape(escape2) : character));
      } else {
        throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
      }
    }
    return results;
  }
  function parseStyle(style) {
    STYLE_REGEX.lastIndex = 0;
    const results = [];
    let matches2;
    while ((matches2 = STYLE_REGEX.exec(style)) !== null) {
      const name = matches2[1];
      if (matches2[2]) {
        const args = parseArguments(name, matches2[2]);
        results.push([name].concat(args));
      } else {
        results.push([name]);
      }
    }
    return results;
  }
  function buildStyle(chalk2, styles) {
    const enabled = {};
    for (const layer of styles) {
      for (const style of layer.styles) {
        enabled[style[0]] = layer.inverse ? null : style.slice(1);
      }
    }
    let current = chalk2;
    for (const [styleName, styles2] of Object.entries(enabled)) {
      if (!Array.isArray(styles2)) {
        continue;
      }
      if (!(styleName in current)) {
        throw new Error(`Unknown Chalk style: ${styleName}`);
      }
      current = styles2.length > 0 ? current[styleName](...styles2) : current[styleName];
    }
    return current;
  }
  templates = (chalk2, temporary) => {
    const styles = [];
    const chunks = [];
    let chunk = [];
    temporary.replace(TEMPLATE_REGEX, (m, escapeCharacter, inverse, style, close, character) => {
      if (escapeCharacter) {
        chunk.push(unescape(escapeCharacter));
      } else if (style) {
        const string = chunk.join("");
        chunk = [];
        chunks.push(styles.length === 0 ? string : buildStyle(chalk2, styles)(string));
        styles.push({ inverse, styles: parseStyle(style) });
      } else if (close) {
        if (styles.length === 0) {
          throw new Error("Found extraneous } in Chalk template literal");
        }
        chunks.push(buildStyle(chalk2, styles)(chunk.join("")));
        chunk = [];
        styles.pop();
      } else {
        chunk.push(character);
      }
    });
    chunks.push(chunk.join(""));
    if (styles.length > 0) {
      const errMsg = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? "" : "s"} (\`}\`)`;
      throw new Error(errMsg);
    }
    return chunks.join("");
  };
  return templates;
}
var source;
var hasRequiredSource;
function requireSource() {
  if (hasRequiredSource) return source;
  hasRequiredSource = 1;
  const ansiStyles2 = requireAnsiStyles();
  const { stdout: stdoutColor, stderr: stderrColor } = requireBrowser();
  const {
    stringReplaceAll,
    stringEncaseCRLFWithFirstIndex
  } = requireUtil();
  const levelMapping = [
    "ansi",
    "ansi",
    "ansi256",
    "ansi16m"
  ];
  const styles = /* @__PURE__ */ Object.create(null);
  const applyOptions = (object, options = {}) => {
    if (options.level > 3 || options.level < 0) {
      throw new Error("The `level` option should be an integer from 0 to 3");
    }
    const colorLevel = stdoutColor ? stdoutColor.level : 0;
    object.level = options.level === void 0 ? colorLevel : options.level;
  };
  class ChalkClass {
    constructor(options) {
      return chalkFactory(options);
    }
  }
  const chalkFactory = (options) => {
    const chalk3 = {};
    applyOptions(chalk3, options);
    chalk3.template = (...arguments_) => chalkTag(chalk3.template, ...arguments_);
    Object.setPrototypeOf(chalk3, Chalk.prototype);
    Object.setPrototypeOf(chalk3.template, chalk3);
    chalk3.template.constructor = () => {
      throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.");
    };
    chalk3.template.Instance = ChalkClass;
    return chalk3.template;
  };
  function Chalk(options) {
    return chalkFactory(options);
  }
  for (const [styleName, style] of Object.entries(ansiStyles2)) {
    styles[styleName] = {
      get() {
        const builder = createBuilder(this, createStyler(style.open, style.close, this._styler), this._isEmpty);
        Object.defineProperty(this, styleName, { value: builder });
        return builder;
      }
    };
  }
  styles.visible = {
    get() {
      const builder = createBuilder(this, this._styler, true);
      Object.defineProperty(this, "visible", { value: builder });
      return builder;
    }
  };
  const usedModels = ["rgb", "hex", "keyword", "hsl", "hsv", "hwb", "ansi", "ansi256"];
  for (const model of usedModels) {
    styles[model] = {
      get() {
        const { level } = this;
        return function(...arguments_) {
          const styler = createStyler(ansiStyles2.color[levelMapping[level]][model](...arguments_), ansiStyles2.color.close, this._styler);
          return createBuilder(this, styler, this._isEmpty);
        };
      }
    };
  }
  for (const model of usedModels) {
    const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
    styles[bgModel] = {
      get() {
        const { level } = this;
        return function(...arguments_) {
          const styler = createStyler(ansiStyles2.bgColor[levelMapping[level]][model](...arguments_), ansiStyles2.bgColor.close, this._styler);
          return createBuilder(this, styler, this._isEmpty);
        };
      }
    };
  }
  const proto = Object.defineProperties(() => {
  }, {
    ...styles,
    level: {
      enumerable: true,
      get() {
        return this._generator.level;
      },
      set(level) {
        this._generator.level = level;
      }
    }
  });
  const createStyler = (open, close, parent) => {
    let openAll;
    let closeAll;
    if (parent === void 0) {
      openAll = open;
      closeAll = close;
    } else {
      openAll = parent.openAll + open;
      closeAll = close + parent.closeAll;
    }
    return {
      open,
      close,
      openAll,
      closeAll,
      parent
    };
  };
  const createBuilder = (self2, _styler, _isEmpty) => {
    const builder = (...arguments_) => {
      return applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
    };
    builder.__proto__ = proto;
    builder._generator = self2;
    builder._styler = _styler;
    builder._isEmpty = _isEmpty;
    return builder;
  };
  const applyStyle = (self2, string) => {
    if (self2.level <= 0 || !string) {
      return self2._isEmpty ? "" : string;
    }
    let styler = self2._styler;
    if (styler === void 0) {
      return string;
    }
    const { openAll, closeAll } = styler;
    if (string.indexOf("\x1B") !== -1) {
      while (styler !== void 0) {
        string = stringReplaceAll(string, styler.close, styler.open);
        styler = styler.parent;
      }
    }
    const lfIndex = string.indexOf("\n");
    if (lfIndex !== -1) {
      string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
    }
    return openAll + string + closeAll;
  };
  let template;
  const chalkTag = (chalk3, ...strings) => {
    const [firstString] = strings;
    if (!Array.isArray(firstString)) {
      return strings.join(" ");
    }
    const arguments_ = strings.slice(1);
    const parts = [firstString.raw[0]];
    for (let i = 1; i < firstString.length; i++) {
      parts.push(
        String(arguments_[i - 1]).replace(/[{}\\]/g, "\\$&"),
        String(firstString.raw[i])
      );
    }
    if (template === void 0) {
      template = requireTemplates();
    }
    return template(chalk3, parts.join(""));
  };
  Object.defineProperties(Chalk.prototype, styles);
  const chalk2 = Chalk();
  chalk2.supportsColor = stdoutColor;
  chalk2.stderr = Chalk({ level: stderrColor ? stderrColor.level : 0 });
  chalk2.stderr.supportsColor = stderrColor;
  chalk2.Level = {
    None: 0,
    Basic: 1,
    Ansi256: 2,
    TrueColor: 3,
    0: "None",
    1: "Basic",
    2: "Ansi256",
    3: "TrueColor"
  };
  source = chalk2;
  return source;
}
var sourceExports = requireSource();
const chalk = /* @__PURE__ */ getDefaultExportFromCjs(sourceExports);
var _listCacheClear;
var hasRequired_listCacheClear;
function require_listCacheClear() {
  if (hasRequired_listCacheClear) return _listCacheClear;
  hasRequired_listCacheClear = 1;
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }
  _listCacheClear = listCacheClear;
  return _listCacheClear;
}
var eq_1;
var hasRequiredEq;
function requireEq() {
  if (hasRequiredEq) return eq_1;
  hasRequiredEq = 1;
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  eq_1 = eq;
  return eq_1;
}
var _assocIndexOf;
var hasRequired_assocIndexOf;
function require_assocIndexOf() {
  if (hasRequired_assocIndexOf) return _assocIndexOf;
  hasRequired_assocIndexOf = 1;
  var eq = requireEq();
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  _assocIndexOf = assocIndexOf;
  return _assocIndexOf;
}
var _listCacheDelete;
var hasRequired_listCacheDelete;
function require_listCacheDelete() {
  if (hasRequired_listCacheDelete) return _listCacheDelete;
  hasRequired_listCacheDelete = 1;
  var assocIndexOf = require_assocIndexOf();
  var arrayProto = Array.prototype;
  var splice = arrayProto.splice;
  function listCacheDelete(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }
  _listCacheDelete = listCacheDelete;
  return _listCacheDelete;
}
var _listCacheGet;
var hasRequired_listCacheGet;
function require_listCacheGet() {
  if (hasRequired_listCacheGet) return _listCacheGet;
  hasRequired_listCacheGet = 1;
  var assocIndexOf = require_assocIndexOf();
  function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  _listCacheGet = listCacheGet;
  return _listCacheGet;
}
var _listCacheHas;
var hasRequired_listCacheHas;
function require_listCacheHas() {
  if (hasRequired_listCacheHas) return _listCacheHas;
  hasRequired_listCacheHas = 1;
  var assocIndexOf = require_assocIndexOf();
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  _listCacheHas = listCacheHas;
  return _listCacheHas;
}
var _listCacheSet;
var hasRequired_listCacheSet;
function require_listCacheSet() {
  if (hasRequired_listCacheSet) return _listCacheSet;
  hasRequired_listCacheSet = 1;
  var assocIndexOf = require_assocIndexOf();
  function listCacheSet(key, value) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  _listCacheSet = listCacheSet;
  return _listCacheSet;
}
var _ListCache;
var hasRequired_ListCache;
function require_ListCache() {
  if (hasRequired_ListCache) return _ListCache;
  hasRequired_ListCache = 1;
  var listCacheClear = require_listCacheClear(), listCacheDelete = require_listCacheDelete(), listCacheGet = require_listCacheGet(), listCacheHas = require_listCacheHas(), listCacheSet = require_listCacheSet();
  function ListCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype["delete"] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;
  _ListCache = ListCache;
  return _ListCache;
}
var _stackClear;
var hasRequired_stackClear;
function require_stackClear() {
  if (hasRequired_stackClear) return _stackClear;
  hasRequired_stackClear = 1;
  var ListCache = require_ListCache();
  function stackClear() {
    this.__data__ = new ListCache();
    this.size = 0;
  }
  _stackClear = stackClear;
  return _stackClear;
}
var _stackDelete;
var hasRequired_stackDelete;
function require_stackDelete() {
  if (hasRequired_stackDelete) return _stackDelete;
  hasRequired_stackDelete = 1;
  function stackDelete(key) {
    var data = this.__data__, result = data["delete"](key);
    this.size = data.size;
    return result;
  }
  _stackDelete = stackDelete;
  return _stackDelete;
}
var _stackGet;
var hasRequired_stackGet;
function require_stackGet() {
  if (hasRequired_stackGet) return _stackGet;
  hasRequired_stackGet = 1;
  function stackGet(key) {
    return this.__data__.get(key);
  }
  _stackGet = stackGet;
  return _stackGet;
}
var _stackHas;
var hasRequired_stackHas;
function require_stackHas() {
  if (hasRequired_stackHas) return _stackHas;
  hasRequired_stackHas = 1;
  function stackHas(key) {
    return this.__data__.has(key);
  }
  _stackHas = stackHas;
  return _stackHas;
}
var _freeGlobal;
var hasRequired_freeGlobal;
function require_freeGlobal() {
  if (hasRequired_freeGlobal) return _freeGlobal;
  hasRequired_freeGlobal = 1;
  var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  _freeGlobal = freeGlobal;
  return _freeGlobal;
}
var _root;
var hasRequired_root;
function require_root() {
  if (hasRequired_root) return _root;
  hasRequired_root = 1;
  var freeGlobal = require_freeGlobal();
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal || freeSelf || Function("return this")();
  _root = root;
  return _root;
}
var _Symbol;
var hasRequired_Symbol;
function require_Symbol() {
  if (hasRequired_Symbol) return _Symbol;
  hasRequired_Symbol = 1;
  var root = require_root();
  var Symbol2 = root.Symbol;
  _Symbol = Symbol2;
  return _Symbol;
}
var _getRawTag;
var hasRequired_getRawTag;
function require_getRawTag() {
  if (hasRequired_getRawTag) return _getRawTag;
  hasRequired_getRawTag = 1;
  var Symbol2 = require_Symbol();
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var nativeObjectToString = objectProto.toString;
  var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
    try {
      value[symToStringTag] = void 0;
      var unmasked = true;
    } catch (e) {
    }
    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }
  _getRawTag = getRawTag;
  return _getRawTag;
}
var _objectToString;
var hasRequired_objectToString;
function require_objectToString() {
  if (hasRequired_objectToString) return _objectToString;
  hasRequired_objectToString = 1;
  var objectProto = Object.prototype;
  var nativeObjectToString = objectProto.toString;
  function objectToString(value) {
    return nativeObjectToString.call(value);
  }
  _objectToString = objectToString;
  return _objectToString;
}
var _baseGetTag;
var hasRequired_baseGetTag;
function require_baseGetTag() {
  if (hasRequired_baseGetTag) return _baseGetTag;
  hasRequired_baseGetTag = 1;
  var Symbol2 = require_Symbol(), getRawTag = require_getRawTag(), objectToString = require_objectToString();
  var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
  var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  }
  _baseGetTag = baseGetTag;
  return _baseGetTag;
}
var isObject_1;
var hasRequiredIsObject;
function requireIsObject() {
  if (hasRequiredIsObject) return isObject_1;
  hasRequiredIsObject = 1;
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  isObject_1 = isObject;
  return isObject_1;
}
var isFunction_1;
var hasRequiredIsFunction;
function requireIsFunction() {
  if (hasRequiredIsFunction) return isFunction_1;
  hasRequiredIsFunction = 1;
  var baseGetTag = require_baseGetTag(), isObject = requireIsObject();
  var asyncTag = "[object AsyncFunction]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    }
    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }
  isFunction_1 = isFunction;
  return isFunction_1;
}
var _coreJsData;
var hasRequired_coreJsData;
function require_coreJsData() {
  if (hasRequired_coreJsData) return _coreJsData;
  hasRequired_coreJsData = 1;
  var root = require_root();
  var coreJsData = root["__core-js_shared__"];
  _coreJsData = coreJsData;
  return _coreJsData;
}
var _isMasked;
var hasRequired_isMasked;
function require_isMasked() {
  if (hasRequired_isMasked) return _isMasked;
  hasRequired_isMasked = 1;
  var coreJsData = require_coreJsData();
  var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  _isMasked = isMasked;
  return _isMasked;
}
var _toSource;
var hasRequired_toSource;
function require_toSource() {
  if (hasRequired_toSource) return _toSource;
  hasRequired_toSource = 1;
  var funcProto = Function.prototype;
  var funcToString = funcProto.toString;
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {
      }
      try {
        return func + "";
      } catch (e) {
      }
    }
    return "";
  }
  _toSource = toSource;
  return _toSource;
}
var _baseIsNative;
var hasRequired_baseIsNative;
function require_baseIsNative() {
  if (hasRequired_baseIsNative) return _baseIsNative;
  hasRequired_baseIsNative = 1;
  var isFunction = requireIsFunction(), isMasked = require_isMasked(), isObject = requireIsObject(), toSource = require_toSource();
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var funcProto = Function.prototype, objectProto = Object.prototype;
  var funcToString = funcProto.toString;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var reIsNative = RegExp(
    "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  _baseIsNative = baseIsNative;
  return _baseIsNative;
}
var _getValue;
var hasRequired_getValue;
function require_getValue() {
  if (hasRequired_getValue) return _getValue;
  hasRequired_getValue = 1;
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  _getValue = getValue;
  return _getValue;
}
var _getNative;
var hasRequired_getNative;
function require_getNative() {
  if (hasRequired_getNative) return _getNative;
  hasRequired_getNative = 1;
  var baseIsNative = require_baseIsNative(), getValue = require_getValue();
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : void 0;
  }
  _getNative = getNative;
  return _getNative;
}
var _Map;
var hasRequired_Map;
function require_Map() {
  if (hasRequired_Map) return _Map;
  hasRequired_Map = 1;
  var getNative = require_getNative(), root = require_root();
  var Map2 = getNative(root, "Map");
  _Map = Map2;
  return _Map;
}
var _nativeCreate;
var hasRequired_nativeCreate;
function require_nativeCreate() {
  if (hasRequired_nativeCreate) return _nativeCreate;
  hasRequired_nativeCreate = 1;
  var getNative = require_getNative();
  var nativeCreate = getNative(Object, "create");
  _nativeCreate = nativeCreate;
  return _nativeCreate;
}
var _hashClear;
var hasRequired_hashClear;
function require_hashClear() {
  if (hasRequired_hashClear) return _hashClear;
  hasRequired_hashClear = 1;
  var nativeCreate = require_nativeCreate();
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
    this.size = 0;
  }
  _hashClear = hashClear;
  return _hashClear;
}
var _hashDelete;
var hasRequired_hashDelete;
function require_hashDelete() {
  if (hasRequired_hashDelete) return _hashDelete;
  hasRequired_hashDelete = 1;
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  _hashDelete = hashDelete;
  return _hashDelete;
}
var _hashGet;
var hasRequired_hashGet;
function require_hashGet() {
  if (hasRequired_hashGet) return _hashGet;
  hasRequired_hashGet = 1;
  var nativeCreate = require_nativeCreate();
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? void 0 : result;
    }
    return hasOwnProperty.call(data, key) ? data[key] : void 0;
  }
  _hashGet = hashGet;
  return _hashGet;
}
var _hashHas;
var hasRequired_hashHas;
function require_hashHas() {
  if (hasRequired_hashHas) return _hashHas;
  hasRequired_hashHas = 1;
  var nativeCreate = require_nativeCreate();
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
  }
  _hashHas = hashHas;
  return _hashHas;
}
var _hashSet;
var hasRequired_hashSet;
function require_hashSet() {
  if (hasRequired_hashSet) return _hashSet;
  hasRequired_hashSet = 1;
  var nativeCreate = require_nativeCreate();
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
    return this;
  }
  _hashSet = hashSet;
  return _hashSet;
}
var _Hash;
var hasRequired_Hash;
function require_Hash() {
  if (hasRequired_Hash) return _Hash;
  hasRequired_Hash = 1;
  var hashClear = require_hashClear(), hashDelete = require_hashDelete(), hashGet = require_hashGet(), hashHas = require_hashHas(), hashSet = require_hashSet();
  function Hash(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  Hash.prototype.clear = hashClear;
  Hash.prototype["delete"] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;
  _Hash = Hash;
  return _Hash;
}
var _mapCacheClear;
var hasRequired_mapCacheClear;
function require_mapCacheClear() {
  if (hasRequired_mapCacheClear) return _mapCacheClear;
  hasRequired_mapCacheClear = 1;
  var Hash = require_Hash(), ListCache = require_ListCache(), Map2 = require_Map();
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      "hash": new Hash(),
      "map": new (Map2 || ListCache)(),
      "string": new Hash()
    };
  }
  _mapCacheClear = mapCacheClear;
  return _mapCacheClear;
}
var _isKeyable;
var hasRequired_isKeyable;
function require_isKeyable() {
  if (hasRequired_isKeyable) return _isKeyable;
  hasRequired_isKeyable = 1;
  function isKeyable(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  _isKeyable = isKeyable;
  return _isKeyable;
}
var _getMapData;
var hasRequired_getMapData;
function require_getMapData() {
  if (hasRequired_getMapData) return _getMapData;
  hasRequired_getMapData = 1;
  var isKeyable = require_isKeyable();
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  _getMapData = getMapData;
  return _getMapData;
}
var _mapCacheDelete;
var hasRequired_mapCacheDelete;
function require_mapCacheDelete() {
  if (hasRequired_mapCacheDelete) return _mapCacheDelete;
  hasRequired_mapCacheDelete = 1;
  var getMapData = require_getMapData();
  function mapCacheDelete(key) {
    var result = getMapData(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  _mapCacheDelete = mapCacheDelete;
  return _mapCacheDelete;
}
var _mapCacheGet;
var hasRequired_mapCacheGet;
function require_mapCacheGet() {
  if (hasRequired_mapCacheGet) return _mapCacheGet;
  hasRequired_mapCacheGet = 1;
  var getMapData = require_getMapData();
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }
  _mapCacheGet = mapCacheGet;
  return _mapCacheGet;
}
var _mapCacheHas;
var hasRequired_mapCacheHas;
function require_mapCacheHas() {
  if (hasRequired_mapCacheHas) return _mapCacheHas;
  hasRequired_mapCacheHas = 1;
  var getMapData = require_getMapData();
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }
  _mapCacheHas = mapCacheHas;
  return _mapCacheHas;
}
var _mapCacheSet;
var hasRequired_mapCacheSet;
function require_mapCacheSet() {
  if (hasRequired_mapCacheSet) return _mapCacheSet;
  hasRequired_mapCacheSet = 1;
  var getMapData = require_getMapData();
  function mapCacheSet(key, value) {
    var data = getMapData(this, key), size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }
  _mapCacheSet = mapCacheSet;
  return _mapCacheSet;
}
var _MapCache;
var hasRequired_MapCache;
function require_MapCache() {
  if (hasRequired_MapCache) return _MapCache;
  hasRequired_MapCache = 1;
  var mapCacheClear = require_mapCacheClear(), mapCacheDelete = require_mapCacheDelete(), mapCacheGet = require_mapCacheGet(), mapCacheHas = require_mapCacheHas(), mapCacheSet = require_mapCacheSet();
  function MapCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype["delete"] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;
  _MapCache = MapCache;
  return _MapCache;
}
var _stackSet;
var hasRequired_stackSet;
function require_stackSet() {
  if (hasRequired_stackSet) return _stackSet;
  hasRequired_stackSet = 1;
  var ListCache = require_ListCache(), Map2 = require_Map(), MapCache = require_MapCache();
  var LARGE_ARRAY_SIZE = 200;
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache) {
      var pairs = data.__data__;
      if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }
  _stackSet = stackSet;
  return _stackSet;
}
var _Stack;
var hasRequired_Stack;
function require_Stack() {
  if (hasRequired_Stack) return _Stack;
  hasRequired_Stack = 1;
  var ListCache = require_ListCache(), stackClear = require_stackClear(), stackDelete = require_stackDelete(), stackGet = require_stackGet(), stackHas = require_stackHas(), stackSet = require_stackSet();
  function Stack(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }
  Stack.prototype.clear = stackClear;
  Stack.prototype["delete"] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;
  _Stack = Stack;
  return _Stack;
}
var _setCacheAdd;
var hasRequired_setCacheAdd;
function require_setCacheAdd() {
  if (hasRequired_setCacheAdd) return _setCacheAdd;
  hasRequired_setCacheAdd = 1;
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED);
    return this;
  }
  _setCacheAdd = setCacheAdd;
  return _setCacheAdd;
}
var _setCacheHas;
var hasRequired_setCacheHas;
function require_setCacheHas() {
  if (hasRequired_setCacheHas) return _setCacheHas;
  hasRequired_setCacheHas = 1;
  function setCacheHas(value) {
    return this.__data__.has(value);
  }
  _setCacheHas = setCacheHas;
  return _setCacheHas;
}
var _SetCache;
var hasRequired_SetCache;
function require_SetCache() {
  if (hasRequired_SetCache) return _SetCache;
  hasRequired_SetCache = 1;
  var MapCache = require_MapCache(), setCacheAdd = require_setCacheAdd(), setCacheHas = require_setCacheHas();
  function SetCache(values) {
    var index = -1, length = values == null ? 0 : values.length;
    this.__data__ = new MapCache();
    while (++index < length) {
      this.add(values[index]);
    }
  }
  SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
  SetCache.prototype.has = setCacheHas;
  _SetCache = SetCache;
  return _SetCache;
}
var _arraySome;
var hasRequired_arraySome;
function require_arraySome() {
  if (hasRequired_arraySome) return _arraySome;
  hasRequired_arraySome = 1;
  function arraySome(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }
  _arraySome = arraySome;
  return _arraySome;
}
var _cacheHas;
var hasRequired_cacheHas;
function require_cacheHas() {
  if (hasRequired_cacheHas) return _cacheHas;
  hasRequired_cacheHas = 1;
  function cacheHas(cache, key) {
    return cache.has(key);
  }
  _cacheHas = cacheHas;
  return _cacheHas;
}
var _equalArrays;
var hasRequired_equalArrays;
function require_equalArrays() {
  if (hasRequired_equalArrays) return _equalArrays;
  hasRequired_equalArrays = 1;
  var SetCache = require_SetCache(), arraySome = require_arraySome(), cacheHas = require_cacheHas();
  var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
  function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    }
    var arrStacked = stack.get(array);
    var othStacked = stack.get(other);
    if (arrStacked && othStacked) {
      return arrStacked == other && othStacked == array;
    }
    var index = -1, result = true, seen2 = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
    stack.set(array, other);
    stack.set(other, array);
    while (++index < arrLength) {
      var arrValue = array[index], othValue = other[index];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
      }
      if (compared !== void 0) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
      if (seen2) {
        if (!arraySome(other, function(othValue2, othIndex) {
          if (!cacheHas(seen2, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
            return seen2.push(othIndex);
          }
        })) {
          result = false;
          break;
        }
      } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
        result = false;
        break;
      }
    }
    stack["delete"](array);
    stack["delete"](other);
    return result;
  }
  _equalArrays = equalArrays;
  return _equalArrays;
}
var _Uint8Array;
var hasRequired_Uint8Array;
function require_Uint8Array() {
  if (hasRequired_Uint8Array) return _Uint8Array;
  hasRequired_Uint8Array = 1;
  var root = require_root();
  var Uint8Array2 = root.Uint8Array;
  _Uint8Array = Uint8Array2;
  return _Uint8Array;
}
var _mapToArray;
var hasRequired_mapToArray;
function require_mapToArray() {
  if (hasRequired_mapToArray) return _mapToArray;
  hasRequired_mapToArray = 1;
  function mapToArray(map) {
    var index = -1, result = Array(map.size);
    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }
  _mapToArray = mapToArray;
  return _mapToArray;
}
var _setToArray;
var hasRequired_setToArray;
function require_setToArray() {
  if (hasRequired_setToArray) return _setToArray;
  hasRequired_setToArray = 1;
  function setToArray(set) {
    var index = -1, result = Array(set.size);
    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }
  _setToArray = setToArray;
  return _setToArray;
}
var _equalByTag;
var hasRequired_equalByTag;
function require_equalByTag() {
  if (hasRequired_equalByTag) return _equalByTag;
  hasRequired_equalByTag = 1;
  var Symbol2 = require_Symbol(), Uint8Array2 = require_Uint8Array(), eq = requireEq(), equalArrays = require_equalArrays(), mapToArray = require_mapToArray(), setToArray = require_setToArray();
  var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
  var boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]";
  var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]";
  var symbolProto = Symbol2 ? Symbol2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
  function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
      case dataViewTag:
        if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
          return false;
        }
        object = object.buffer;
        other = other.buffer;
      case arrayBufferTag:
        if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
          return false;
        }
        return true;
      case boolTag:
      case dateTag:
      case numberTag:
        return eq(+object, +other);
      case errorTag:
        return object.name == other.name && object.message == other.message;
      case regexpTag:
      case stringTag:
        return object == other + "";
      case mapTag:
        var convert = mapToArray;
      case setTag:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
        convert || (convert = setToArray);
        if (object.size != other.size && !isPartial) {
          return false;
        }
        var stacked = stack.get(object);
        if (stacked) {
          return stacked == other;
        }
        bitmask |= COMPARE_UNORDERED_FLAG;
        stack.set(object, other);
        var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
        stack["delete"](object);
        return result;
      case symbolTag:
        if (symbolValueOf) {
          return symbolValueOf.call(object) == symbolValueOf.call(other);
        }
    }
    return false;
  }
  _equalByTag = equalByTag;
  return _equalByTag;
}
var _arrayPush;
var hasRequired_arrayPush;
function require_arrayPush() {
  if (hasRequired_arrayPush) return _arrayPush;
  hasRequired_arrayPush = 1;
  function arrayPush(array, values) {
    var index = -1, length = values.length, offset = array.length;
    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }
  _arrayPush = arrayPush;
  return _arrayPush;
}
var isArray_1;
var hasRequiredIsArray;
function requireIsArray() {
  if (hasRequiredIsArray) return isArray_1;
  hasRequiredIsArray = 1;
  var isArray = Array.isArray;
  isArray_1 = isArray;
  return isArray_1;
}
var _baseGetAllKeys;
var hasRequired_baseGetAllKeys;
function require_baseGetAllKeys() {
  if (hasRequired_baseGetAllKeys) return _baseGetAllKeys;
  hasRequired_baseGetAllKeys = 1;
  var arrayPush = require_arrayPush(), isArray = requireIsArray();
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
  }
  _baseGetAllKeys = baseGetAllKeys;
  return _baseGetAllKeys;
}
var _arrayFilter;
var hasRequired_arrayFilter;
function require_arrayFilter() {
  if (hasRequired_arrayFilter) return _arrayFilter;
  hasRequired_arrayFilter = 1;
  function arrayFilter(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }
  _arrayFilter = arrayFilter;
  return _arrayFilter;
}
var stubArray_1;
var hasRequiredStubArray;
function requireStubArray() {
  if (hasRequiredStubArray) return stubArray_1;
  hasRequiredStubArray = 1;
  function stubArray() {
    return [];
  }
  stubArray_1 = stubArray;
  return stubArray_1;
}
var _getSymbols;
var hasRequired_getSymbols;
function require_getSymbols() {
  if (hasRequired_getSymbols) return _getSymbols;
  hasRequired_getSymbols = 1;
  var arrayFilter = require_arrayFilter(), stubArray = requireStubArray();
  var objectProto = Object.prototype;
  var propertyIsEnumerable = objectProto.propertyIsEnumerable;
  var nativeGetSymbols = Object.getOwnPropertySymbols;
  var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return arrayFilter(nativeGetSymbols(object), function(symbol) {
      return propertyIsEnumerable.call(object, symbol);
    });
  };
  _getSymbols = getSymbols;
  return _getSymbols;
}
var _baseTimes;
var hasRequired_baseTimes;
function require_baseTimes() {
  if (hasRequired_baseTimes) return _baseTimes;
  hasRequired_baseTimes = 1;
  function baseTimes(n, iteratee) {
    var index = -1, result = Array(n);
    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }
  _baseTimes = baseTimes;
  return _baseTimes;
}
var isObjectLike_1;
var hasRequiredIsObjectLike;
function requireIsObjectLike() {
  if (hasRequiredIsObjectLike) return isObjectLike_1;
  hasRequiredIsObjectLike = 1;
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  isObjectLike_1 = isObjectLike;
  return isObjectLike_1;
}
var _baseIsArguments;
var hasRequired_baseIsArguments;
function require_baseIsArguments() {
  if (hasRequired_baseIsArguments) return _baseIsArguments;
  hasRequired_baseIsArguments = 1;
  var baseGetTag = require_baseGetTag(), isObjectLike = requireIsObjectLike();
  var argsTag = "[object Arguments]";
  function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag;
  }
  _baseIsArguments = baseIsArguments;
  return _baseIsArguments;
}
var isArguments_1;
var hasRequiredIsArguments;
function requireIsArguments() {
  if (hasRequiredIsArguments) return isArguments_1;
  hasRequiredIsArguments = 1;
  var baseIsArguments = require_baseIsArguments(), isObjectLike = requireIsObjectLike();
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var propertyIsEnumerable = objectProto.propertyIsEnumerable;
  var isArguments = baseIsArguments(/* @__PURE__ */ function() {
    return arguments;
  }()) ? baseIsArguments : function(value) {
    return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
  };
  isArguments_1 = isArguments;
  return isArguments_1;
}
var isBuffer = { exports: {} };
var stubFalse_1;
var hasRequiredStubFalse;
function requireStubFalse() {
  if (hasRequiredStubFalse) return stubFalse_1;
  hasRequiredStubFalse = 1;
  function stubFalse() {
    return false;
  }
  stubFalse_1 = stubFalse;
  return stubFalse_1;
}
isBuffer.exports;
var hasRequiredIsBuffer;
function requireIsBuffer() {
  if (hasRequiredIsBuffer) return isBuffer.exports;
  hasRequiredIsBuffer = 1;
  (function(module, exports) {
    var root = require_root(), stubFalse = requireStubFalse();
    var freeExports = exports && !exports.nodeType && exports;
    var freeModule = freeExports && true && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer2 = moduleExports ? root.Buffer : void 0;
    var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
    var isBuffer2 = nativeIsBuffer || stubFalse;
    module.exports = isBuffer2;
  })(isBuffer, isBuffer.exports);
  return isBuffer.exports;
}
var _isIndex;
var hasRequired_isIndex;
function require_isIndex() {
  if (hasRequired_isIndex) return _isIndex;
  hasRequired_isIndex = 1;
  var MAX_SAFE_INTEGER = 9007199254740991;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  _isIndex = isIndex;
  return _isIndex;
}
var isLength_1;
var hasRequiredIsLength;
function requireIsLength() {
  if (hasRequiredIsLength) return isLength_1;
  hasRequiredIsLength = 1;
  var MAX_SAFE_INTEGER = 9007199254740991;
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  isLength_1 = isLength;
  return isLength_1;
}
var _baseIsTypedArray;
var hasRequired_baseIsTypedArray;
function require_baseIsTypedArray() {
  if (hasRequired_baseIsTypedArray) return _baseIsTypedArray;
  hasRequired_baseIsTypedArray = 1;
  var baseGetTag = require_baseGetTag(), isLength = requireIsLength(), isObjectLike = requireIsObjectLike();
  var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", weakMapTag = "[object WeakMap]";
  var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
  function baseIsTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  }
  _baseIsTypedArray = baseIsTypedArray;
  return _baseIsTypedArray;
}
var _baseUnary;
var hasRequired_baseUnary;
function require_baseUnary() {
  if (hasRequired_baseUnary) return _baseUnary;
  hasRequired_baseUnary = 1;
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }
  _baseUnary = baseUnary;
  return _baseUnary;
}
var _nodeUtil = { exports: {} };
_nodeUtil.exports;
var hasRequired_nodeUtil;
function require_nodeUtil() {
  if (hasRequired_nodeUtil) return _nodeUtil.exports;
  hasRequired_nodeUtil = 1;
  (function(module, exports) {
    var freeGlobal = require_freeGlobal();
    var freeExports = exports && !exports.nodeType && exports;
    var freeModule = freeExports && true && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    }();
    module.exports = nodeUtil;
  })(_nodeUtil, _nodeUtil.exports);
  return _nodeUtil.exports;
}
var isTypedArray_1;
var hasRequiredIsTypedArray;
function requireIsTypedArray() {
  if (hasRequiredIsTypedArray) return isTypedArray_1;
  hasRequiredIsTypedArray = 1;
  var baseIsTypedArray = require_baseIsTypedArray(), baseUnary = require_baseUnary(), nodeUtil = require_nodeUtil();
  var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
  var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
  isTypedArray_1 = isTypedArray;
  return isTypedArray_1;
}
var _arrayLikeKeys;
var hasRequired_arrayLikeKeys;
function require_arrayLikeKeys() {
  if (hasRequired_arrayLikeKeys) return _arrayLikeKeys;
  hasRequired_arrayLikeKeys = 1;
  var baseTimes = require_baseTimes(), isArguments = requireIsArguments(), isArray = requireIsArray(), isBuffer2 = requireIsBuffer(), isIndex = require_isIndex(), isTypedArray = requireIsTypedArray();
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer2(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
    for (var key in value) {
      if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
      (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
      isIndex(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  _arrayLikeKeys = arrayLikeKeys;
  return _arrayLikeKeys;
}
var _isPrototype;
var hasRequired_isPrototype;
function require_isPrototype() {
  if (hasRequired_isPrototype) return _isPrototype;
  hasRequired_isPrototype = 1;
  var objectProto = Object.prototype;
  function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
    return value === proto;
  }
  _isPrototype = isPrototype;
  return _isPrototype;
}
var _overArg;
var hasRequired_overArg;
function require_overArg() {
  if (hasRequired_overArg) return _overArg;
  hasRequired_overArg = 1;
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  _overArg = overArg;
  return _overArg;
}
var _nativeKeys;
var hasRequired_nativeKeys;
function require_nativeKeys() {
  if (hasRequired_nativeKeys) return _nativeKeys;
  hasRequired_nativeKeys = 1;
  var overArg = require_overArg();
  var nativeKeys = overArg(Object.keys, Object);
  _nativeKeys = nativeKeys;
  return _nativeKeys;
}
var _baseKeys;
var hasRequired_baseKeys;
function require_baseKeys() {
  if (hasRequired_baseKeys) return _baseKeys;
  hasRequired_baseKeys = 1;
  var isPrototype = require_isPrototype(), nativeKeys = require_nativeKeys();
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function baseKeys(object) {
    if (!isPrototype(object)) {
      return nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty.call(object, key) && key != "constructor") {
        result.push(key);
      }
    }
    return result;
  }
  _baseKeys = baseKeys;
  return _baseKeys;
}
var isArrayLike_1;
var hasRequiredIsArrayLike;
function requireIsArrayLike() {
  if (hasRequiredIsArrayLike) return isArrayLike_1;
  hasRequiredIsArrayLike = 1;
  var isFunction = requireIsFunction(), isLength = requireIsLength();
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }
  isArrayLike_1 = isArrayLike;
  return isArrayLike_1;
}
var keys_1;
var hasRequiredKeys;
function requireKeys() {
  if (hasRequiredKeys) return keys_1;
  hasRequiredKeys = 1;
  var arrayLikeKeys = require_arrayLikeKeys(), baseKeys = require_baseKeys(), isArrayLike = requireIsArrayLike();
  function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  }
  keys_1 = keys;
  return keys_1;
}
var _getAllKeys;
var hasRequired_getAllKeys;
function require_getAllKeys() {
  if (hasRequired_getAllKeys) return _getAllKeys;
  hasRequired_getAllKeys = 1;
  var baseGetAllKeys = require_baseGetAllKeys(), getSymbols = require_getSymbols(), keys = requireKeys();
  function getAllKeys(object) {
    return baseGetAllKeys(object, keys, getSymbols);
  }
  _getAllKeys = getAllKeys;
  return _getAllKeys;
}
var _equalObjects;
var hasRequired_equalObjects;
function require_equalObjects() {
  if (hasRequired_equalObjects) return _equalObjects;
  hasRequired_equalObjects = 1;
  var getAllKeys = require_getAllKeys();
  var COMPARE_PARTIAL_FLAG = 1;
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
    if (objLength != othLength && !isPartial) {
      return false;
    }
    var index = objLength;
    while (index--) {
      var key = objProps[index];
      if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
        return false;
      }
    }
    var objStacked = stack.get(object);
    var othStacked = stack.get(other);
    if (objStacked && othStacked) {
      return objStacked == other && othStacked == object;
    }
    var result = true;
    stack.set(object, other);
    stack.set(other, object);
    var skipCtor = isPartial;
    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key], othValue = other[key];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
      }
      if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
        result = false;
        break;
      }
      skipCtor || (skipCtor = key == "constructor");
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor, othCtor = other.constructor;
      if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
        result = false;
      }
    }
    stack["delete"](object);
    stack["delete"](other);
    return result;
  }
  _equalObjects = equalObjects;
  return _equalObjects;
}
var _DataView;
var hasRequired_DataView;
function require_DataView() {
  if (hasRequired_DataView) return _DataView;
  hasRequired_DataView = 1;
  var getNative = require_getNative(), root = require_root();
  var DataView = getNative(root, "DataView");
  _DataView = DataView;
  return _DataView;
}
var _Promise;
var hasRequired_Promise;
function require_Promise() {
  if (hasRequired_Promise) return _Promise;
  hasRequired_Promise = 1;
  var getNative = require_getNative(), root = require_root();
  var Promise2 = getNative(root, "Promise");
  _Promise = Promise2;
  return _Promise;
}
var _Set;
var hasRequired_Set;
function require_Set() {
  if (hasRequired_Set) return _Set;
  hasRequired_Set = 1;
  var getNative = require_getNative(), root = require_root();
  var Set2 = getNative(root, "Set");
  _Set = Set2;
  return _Set;
}
var _WeakMap;
var hasRequired_WeakMap;
function require_WeakMap() {
  if (hasRequired_WeakMap) return _WeakMap;
  hasRequired_WeakMap = 1;
  var getNative = require_getNative(), root = require_root();
  var WeakMap = getNative(root, "WeakMap");
  _WeakMap = WeakMap;
  return _WeakMap;
}
var _getTag;
var hasRequired_getTag;
function require_getTag() {
  if (hasRequired_getTag) return _getTag;
  hasRequired_getTag = 1;
  var DataView = require_DataView(), Map2 = require_Map(), Promise2 = require_Promise(), Set2 = require_Set(), WeakMap = require_WeakMap(), baseGetTag = require_baseGetTag(), toSource = require_toSource();
  var mapTag = "[object Map]", objectTag = "[object Object]", promiseTag = "[object Promise]", setTag = "[object Set]", weakMapTag = "[object WeakMap]";
  var dataViewTag = "[object DataView]";
  var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap);
  var getTag2 = baseGetTag;
  if (DataView && getTag2(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag2(new Map2()) != mapTag || Promise2 && getTag2(Promise2.resolve()) != promiseTag || Set2 && getTag2(new Set2()) != setTag || WeakMap && getTag2(new WeakMap()) != weakMapTag) {
    getTag2 = function(value) {
      var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag;
          case mapCtorString:
            return mapTag;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag;
          case weakMapCtorString:
            return weakMapTag;
        }
      }
      return result;
    };
  }
  _getTag = getTag2;
  return _getTag;
}
var _baseIsEqualDeep;
var hasRequired_baseIsEqualDeep;
function require_baseIsEqualDeep() {
  if (hasRequired_baseIsEqualDeep) return _baseIsEqualDeep;
  hasRequired_baseIsEqualDeep = 1;
  var Stack = require_Stack(), equalArrays = require_equalArrays(), equalByTag = require_equalByTag(), equalObjects = require_equalObjects(), getTag2 = require_getTag(), isArray = requireIsArray(), isBuffer2 = requireIsBuffer(), isTypedArray = requireIsTypedArray();
  var COMPARE_PARTIAL_FLAG = 1;
  var argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]";
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag2(object), othTag = othIsArr ? arrayTag : getTag2(other);
    objTag = objTag == argsTag ? objectTag : objTag;
    othTag = othTag == argsTag ? objectTag : othTag;
    var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
    if (isSameTag && isBuffer2(object)) {
      if (!isBuffer2(other)) {
        return false;
      }
      objIsArr = true;
      objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
      stack || (stack = new Stack());
      return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
      var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
        stack || (stack = new Stack());
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }
    if (!isSameTag) {
      return false;
    }
    stack || (stack = new Stack());
    return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
  }
  _baseIsEqualDeep = baseIsEqualDeep;
  return _baseIsEqualDeep;
}
var _baseIsEqual;
var hasRequired_baseIsEqual;
function require_baseIsEqual() {
  if (hasRequired_baseIsEqual) return _baseIsEqual;
  hasRequired_baseIsEqual = 1;
  var baseIsEqualDeep = require_baseIsEqualDeep(), isObjectLike = requireIsObjectLike();
  function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
      return value !== value && other !== other;
    }
    return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
  }
  _baseIsEqual = baseIsEqual;
  return _baseIsEqual;
}
var isEqualWith_1;
var hasRequiredIsEqualWith;
function requireIsEqualWith() {
  if (hasRequiredIsEqualWith) return isEqualWith_1;
  hasRequiredIsEqualWith = 1;
  var baseIsEqual = require_baseIsEqual();
  function isEqualWith2(value, other, customizer) {
    customizer = typeof customizer == "function" ? customizer : void 0;
    var result = customizer ? customizer(value, other) : void 0;
    return result === void 0 ? baseIsEqual(value, other, void 0, customizer) : !!result;
  }
  isEqualWith_1 = isEqualWith2;
  return isEqualWith_1;
}
var isEqualWithExports = requireIsEqualWith();
const isEqualWith = /* @__PURE__ */ getDefaultExportFromCjs(isEqualWithExports);
var css_escape$1 = { exports: {} };
/*! https://mths.be/cssescape v1.5.1 by @mathias | MIT license */
var css_escape = css_escape$1.exports;
var hasRequiredCss_escape;
function requireCss_escape() {
  if (hasRequiredCss_escape) return css_escape$1.exports;
  hasRequiredCss_escape = 1;
  (function(module, exports) {
    (function(root, factory) {
      {
        module.exports = factory(root);
      }
    })(typeof commonjsGlobal != "undefined" ? commonjsGlobal : css_escape, function(root) {
      if (root.CSS && root.CSS.escape) {
        return root.CSS.escape;
      }
      var cssEscape = function(value) {
        if (arguments.length == 0) {
          throw new TypeError("`CSS.escape` requires an argument.");
        }
        var string = String(value);
        var length = string.length;
        var index = -1;
        var codeUnit;
        var result = "";
        var firstCodeUnit = string.charCodeAt(0);
        while (++index < length) {
          codeUnit = string.charCodeAt(index);
          if (codeUnit == 0) {
            result += "�";
            continue;
          }
          if (
            // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
            // U+007F, […]
            codeUnit >= 1 && codeUnit <= 31 || codeUnit == 127 || // If the character is the first character and is in the range [0-9]
            // (U+0030 to U+0039), […]
            index == 0 && codeUnit >= 48 && codeUnit <= 57 || // If the character is the second character and is in the range [0-9]
            // (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
            index == 1 && codeUnit >= 48 && codeUnit <= 57 && firstCodeUnit == 45
          ) {
            result += "\\" + codeUnit.toString(16) + " ";
            continue;
          }
          if (
            // If the character is the first character and is a `-` (U+002D), and
            // there is no second character, […]
            index == 0 && length == 1 && codeUnit == 45
          ) {
            result += "\\" + string.charAt(index);
            continue;
          }
          if (codeUnit >= 128 || codeUnit == 45 || codeUnit == 95 || codeUnit >= 48 && codeUnit <= 57 || codeUnit >= 65 && codeUnit <= 90 || codeUnit >= 97 && codeUnit <= 122) {
            result += string.charAt(index);
            continue;
          }
          result += "\\" + string.charAt(index);
        }
        return result;
      };
      if (!root.CSS) {
        root.CSS = {};
      }
      root.CSS.escape = cssEscape;
      return cssEscape;
    });
  })(css_escape$1);
  return css_escape$1.exports;
}
var css_escapeExports = requireCss_escape();
const escape = /* @__PURE__ */ getDefaultExportFromCjs(css_escapeExports);
class GenericTypeError extends Error {
  constructor(expectedString, received, matcherFn, context) {
    super();
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, matcherFn);
    }
    let withType = "";
    try {
      withType = context.utils.printWithType(
        "Received",
        received,
        context.utils.printReceived
      );
    } catch (e) {
    }
    this.message = [
      context.utils.matcherHint(
        `${context.isNot ? ".not" : ""}.${matcherFn.name}`,
        "received",
        ""
      ),
      "",
      // eslint-disable-next-line new-cap
      `${context.utils.RECEIVED_COLOR(
        "received"
      )} value must ${expectedString}.`,
      withType
    ].join("\n");
  }
}
class HtmlElementTypeError extends GenericTypeError {
  constructor(...args) {
    super("be an HTMLElement or an SVGElement", ...args);
  }
}
class NodeTypeError extends GenericTypeError {
  constructor(...args) {
    super("be a Node", ...args);
  }
}
function checkHasWindow(htmlElement, ErrorClass, ...args) {
  if (!htmlElement || !htmlElement.ownerDocument || !htmlElement.ownerDocument.defaultView) {
    throw new ErrorClass(htmlElement, ...args);
  }
}
function checkNode(node, ...args) {
  checkHasWindow(node, NodeTypeError, ...args);
  const window2 = node.ownerDocument.defaultView;
  if (!(node instanceof window2.Node)) {
    throw new NodeTypeError(node, ...args);
  }
}
function checkHtmlElement(htmlElement, ...args) {
  checkHasWindow(htmlElement, HtmlElementTypeError, ...args);
  const window2 = htmlElement.ownerDocument.defaultView;
  if (!(htmlElement instanceof window2.HTMLElement) && !(htmlElement instanceof window2.SVGElement)) {
    throw new HtmlElementTypeError(htmlElement, ...args);
  }
}
class InvalidCSSError extends Error {
  constructor(received, matcherFn, context) {
    super();
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, matcherFn);
    }
    this.message = [
      received.message,
      "",
      // eslint-disable-next-line new-cap
      context.utils.RECEIVED_COLOR(`Failing css:`),
      // eslint-disable-next-line new-cap
      context.utils.RECEIVED_COLOR(`${received.css}`)
    ].join("\n");
  }
}
function parseCSS(css, ...args) {
  const ast = $149c1bd638913645$export$98e6a39c04603d36(`selector { ${css} }`, { silent: true }).stylesheet;
  if (ast.parsingErrors && ast.parsingErrors.length > 0) {
    const { reason, line } = ast.parsingErrors[0];
    throw new InvalidCSSError(
      {
        css,
        message: `Syntax error parsing expected css: ${reason} on line: ${line}`
      },
      ...args
    );
  }
  const parsedRules = ast.rules[0].declarations.filter((d) => d.type === "declaration").reduce(
    (obj, { property, value }) => Object.assign(obj, { [property]: value }),
    {}
  );
  return parsedRules;
}
function display(context, value) {
  return typeof value === "string" ? value : context.utils.stringify(value);
}
function getMessage(context, matcher, expectedLabel, expectedValue, receivedLabel, receivedValue) {
  return [
    `${matcher}
`,
    // eslint-disable-next-line new-cap
    `${expectedLabel}:
${context.utils.EXPECTED_COLOR(
      redent(display(context, expectedValue), 2)
    )}`,
    // eslint-disable-next-line new-cap
    `${receivedLabel}:
${context.utils.RECEIVED_COLOR(
      redent(display(context, receivedValue), 2)
    )}`
  ].join("\n");
}
function matches(textToMatch, matcher) {
  if (matcher instanceof RegExp) {
    return matcher.test(textToMatch);
  } else {
    return textToMatch.includes(String(matcher));
  }
}
function deprecate(name, replacementText) {
  console.warn(
    `Warning: ${name} has been deprecated and will be removed in future updates.`,
    replacementText
  );
}
function normalize$1(text) {
  return text.replace(/\s+/g, " ").trim();
}
function getTag(element) {
  return element.tagName && element.tagName.toLowerCase();
}
function getSelectValue({ multiple, options }) {
  const selectedOptions = [...options].filter((option) => option.selected);
  if (multiple) {
    return [...selectedOptions].map((opt) => opt.value);
  }
  if (selectedOptions.length === 0) {
    return void 0;
  }
  return selectedOptions[0].value;
}
function getInputValue(inputElement) {
  switch (inputElement.type) {
    case "number":
      return inputElement.value === "" ? null : Number(inputElement.value);
    case "checkbox":
      return inputElement.checked;
    default:
      return inputElement.value;
  }
}
const rolesSupportingValues = ["meter", "progressbar", "slider", "spinbutton"];
function getAccessibleValue(element) {
  if (!rolesSupportingValues.includes(element.getAttribute("role"))) {
    return void 0;
  }
  return Number(element.getAttribute("aria-valuenow"));
}
function getSingleElementValue(element) {
  if (!element) {
    return void 0;
  }
  switch (element.tagName.toLowerCase()) {
    case "input":
      return getInputValue(element);
    case "select":
      return getSelectValue(element);
    default: {
      return element.value ?? getAccessibleValue(element);
    }
  }
}
function toSentence(array, { wordConnector = ", ", lastWordConnector = " and " } = {}) {
  return [array.slice(0, -1).join(wordConnector), array[array.length - 1]].join(
    array.length > 1 ? lastWordConnector : ""
  );
}
function compareArraysAsSet(arr1, arr2) {
  if (Array.isArray(arr1) && Array.isArray(arr2)) {
    return [...new Set(arr1)].every((v) => new Set(arr2).has(v));
  }
  return void 0;
}
function toBeInTheDOM(element, container) {
  deprecate(
    "toBeInTheDOM",
    "Please use toBeInTheDocument for searching the entire document and toContainElement for searching a specific container."
  );
  if (element) {
    checkHtmlElement(element, toBeInTheDOM, this);
  }
  if (container) {
    checkHtmlElement(container, toBeInTheDOM, this);
  }
  return {
    pass: container ? container.contains(element) : !!element,
    message: () => {
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeInTheDOM`,
          "element",
          ""
        ),
        "",
        "Received:",
        `  ${this.utils.printReceived(
          element ? element.cloneNode(false) : element
        )}`
      ].join("\n");
    }
  };
}
function toBeInTheDocument(element) {
  if (element !== null || !this.isNot) {
    checkHtmlElement(element, toBeInTheDocument, this);
  }
  const pass = element === null ? false : element.ownerDocument === element.getRootNode({ composed: true });
  const errorFound = () => {
    return `expected document not to contain element, found ${this.utils.stringify(
      element.cloneNode(true)
    )} instead`;
  };
  const errorNotFound = () => {
    return `element could not be found in the document`;
  };
  return {
    pass,
    message: () => {
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeInTheDocument`,
          "element",
          ""
        ),
        "",
        // eslint-disable-next-line new-cap
        this.utils.RECEIVED_COLOR(this.isNot ? errorFound() : errorNotFound())
      ].join("\n");
    }
  };
}
function toBeEmpty(element) {
  deprecate(
    "toBeEmpty",
    "Please use instead toBeEmptyDOMElement for finding empty nodes in the DOM."
  );
  checkHtmlElement(element, toBeEmpty, this);
  return {
    pass: element.innerHTML === "",
    message: () => {
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeEmpty`,
          "element",
          ""
        ),
        "",
        "Received:",
        `  ${this.utils.printReceived(element.innerHTML)}`
      ].join("\n");
    }
  };
}
function toBeEmptyDOMElement(element) {
  checkHtmlElement(element, toBeEmptyDOMElement, this);
  return {
    pass: isEmptyElement(element),
    message: () => {
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeEmptyDOMElement`,
          "element",
          ""
        ),
        "",
        "Received:",
        `  ${this.utils.printReceived(element.innerHTML)}`
      ].join("\n");
    }
  };
}
function isEmptyElement(element) {
  const nonCommentChildNodes = [...element.childNodes].filter((node) => node.nodeType !== 8);
  return nonCommentChildNodes.length === 0;
}
function toContainElement(container, element) {
  checkHtmlElement(container, toContainElement, this);
  if (element !== null) {
    checkHtmlElement(element, toContainElement, this);
  }
  return {
    pass: container.contains(element),
    message: () => {
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toContainElement`,
          "element",
          "element"
        ),
        "",
        // eslint-disable-next-line new-cap
        this.utils.RECEIVED_COLOR(`${this.utils.stringify(
          container.cloneNode(false)
        )} ${this.isNot ? "contains:" : "does not contain:"} ${this.utils.stringify(element ? element.cloneNode(false) : element)}
        `)
      ].join("\n");
    }
  };
}
function getNormalizedHtml(container, htmlText) {
  const div = container.ownerDocument.createElement("div");
  div.innerHTML = htmlText;
  return div.innerHTML;
}
function toContainHTML(container, htmlText) {
  checkHtmlElement(container, toContainHTML, this);
  if (typeof htmlText !== "string") {
    throw new Error(`.toContainHTML() expects a string value, got ${htmlText}`);
  }
  return {
    pass: container.outerHTML.includes(getNormalizedHtml(container, htmlText)),
    message: () => {
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toContainHTML`,
          "element",
          ""
        ),
        "Expected:",
        // eslint-disable-next-line new-cap
        `  ${this.utils.EXPECTED_COLOR(htmlText)}`,
        "Received:",
        `  ${this.utils.printReceived(container.cloneNode(true))}`
      ].join("\n");
    }
  };
}
function toHaveTextContent(node, checkWith, options = { normalizeWhitespace: true }) {
  checkNode(node, toHaveTextContent, this);
  const textContent = options.normalizeWhitespace ? normalize$1(node.textContent) : node.textContent.replace(/\u00a0/g, " ");
  const checkingWithEmptyString = textContent !== "" && checkWith === "";
  return {
    pass: !checkingWithEmptyString && matches(textContent, checkWith),
    message: () => {
      const to = this.isNot ? "not to" : "to";
      return getMessage(
        this,
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toHaveTextContent`,
          "element",
          ""
        ),
        checkingWithEmptyString ? `Checking with empty string will always match, use .toBeEmptyDOMElement() instead` : `Expected element ${to} have text content`,
        checkWith,
        "Received",
        textContent
      );
    }
  };
}
function toHaveAccessibleDescription(htmlElement, expectedAccessibleDescription) {
  checkHtmlElement(htmlElement, toHaveAccessibleDescription, this);
  const actualAccessibleDescription = computeAccessibleDescription(htmlElement);
  const missingExpectedValue = arguments.length === 1;
  let pass = false;
  if (missingExpectedValue) {
    pass = actualAccessibleDescription !== "";
  } else {
    pass = expectedAccessibleDescription instanceof RegExp ? expectedAccessibleDescription.test(actualAccessibleDescription) : this.equals(
      actualAccessibleDescription,
      expectedAccessibleDescription
    );
  }
  return {
    pass,
    message: () => {
      const to = this.isNot ? "not to" : "to";
      return getMessage(
        this,
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.${toHaveAccessibleDescription.name}`,
          "element",
          ""
        ),
        `Expected element ${to} have accessible description`,
        expectedAccessibleDescription,
        "Received",
        actualAccessibleDescription
      );
    }
  };
}
const ariaInvalidName = "aria-invalid";
const validStates = ["false"];
function toHaveAccessibleErrorMessage(htmlElement, expectedAccessibleErrorMessage) {
  var _a;
  checkHtmlElement(htmlElement, toHaveAccessibleErrorMessage, this);
  const to = this.isNot ? "not to" : "to";
  const method = this.isNot ? ".not.toHaveAccessibleErrorMessage" : ".toHaveAccessibleErrorMessage";
  const errormessageId = htmlElement.getAttribute("aria-errormessage");
  const errormessageIdInvalid = !!errormessageId && /\s+/.test(errormessageId);
  if (errormessageIdInvalid) {
    return {
      pass: false,
      message: () => {
        return getMessage(
          this,
          this.utils.matcherHint(method, "element"),
          "Expected element's `aria-errormessage` attribute to be empty or a single, valid ID",
          "",
          "Received",
          `aria-errormessage="${errormessageId}"`
        );
      }
    };
  }
  const ariaInvalidVal = htmlElement.getAttribute(ariaInvalidName);
  const fieldValid = !htmlElement.hasAttribute(ariaInvalidName) || validStates.includes(ariaInvalidVal);
  if (fieldValid) {
    return {
      pass: false,
      message: () => {
        return getMessage(
          this,
          this.utils.matcherHint(method, "element"),
          "Expected element to be marked as invalid with attribute",
          `${ariaInvalidName}="${String(true)}"`,
          "Received",
          htmlElement.hasAttribute("aria-invalid") ? `${ariaInvalidName}="${htmlElement.getAttribute(ariaInvalidName)}` : null
        );
      }
    };
  }
  const error = normalize$1(
    ((_a = htmlElement.ownerDocument.getElementById(errormessageId)) == null ? void 0 : _a.textContent) ?? ""
  );
  return {
    pass: expectedAccessibleErrorMessage === void 0 ? Boolean(error) : expectedAccessibleErrorMessage instanceof RegExp ? expectedAccessibleErrorMessage.test(error) : this.equals(error, expectedAccessibleErrorMessage),
    message: () => {
      return getMessage(
        this,
        this.utils.matcherHint(method, "element"),
        `Expected element ${to} have accessible error message`,
        expectedAccessibleErrorMessage ?? "",
        "Received",
        error
      );
    }
  };
}
const elementRoleList = buildElementRoleList(libExports.elementRoles);
function toHaveRole(htmlElement, expectedRole) {
  checkHtmlElement(htmlElement, toHaveRole, this);
  const actualRoles = getExplicitOrImplicitRoles(htmlElement);
  const pass = actualRoles.some((el) => el === expectedRole);
  return {
    pass,
    message: () => {
      const to = this.isNot ? "not to" : "to";
      return getMessage(
        this,
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.${toHaveRole.name}`,
          "element",
          ""
        ),
        `Expected element ${to} have role`,
        expectedRole,
        "Received",
        actualRoles.join(", ")
      );
    }
  };
}
function getExplicitOrImplicitRoles(htmlElement) {
  const hasExplicitRole = htmlElement.hasAttribute("role");
  if (hasExplicitRole) {
    const roleValue = htmlElement.getAttribute("role");
    return roleValue.split(" ").filter(Boolean);
  }
  const implicitRoles = getImplicitAriaRoles(htmlElement);
  return implicitRoles;
}
function getImplicitAriaRoles(currentNode) {
  for (const { match, roles } of elementRoleList) {
    if (match(currentNode)) {
      return [...roles];
    }
  }
  return [];
}
function buildElementRoleList(elementRolesMap) {
  function makeElementSelector({ name, attributes }) {
    return `${name}${attributes.map(({ name: attributeName, value, constraints = [] }) => {
      const shouldNotExist = constraints.indexOf("undefined") !== -1;
      if (shouldNotExist) {
        return `:not([${attributeName}])`;
      } else if (value) {
        return `[${attributeName}="${value}"]`;
      } else {
        return `[${attributeName}]`;
      }
    }).join("")}`;
  }
  function getSelectorSpecificity({ attributes = [] }) {
    return attributes.length;
  }
  function bySelectorSpecificity({ specificity: leftSpecificity }, { specificity: rightSpecificity }) {
    return rightSpecificity - leftSpecificity;
  }
  function match(element) {
    let { attributes = [] } = element;
    const typeTextIndex = attributes.findIndex(
      (attribute) => attribute.value && attribute.name === "type" && attribute.value === "text"
    );
    if (typeTextIndex >= 0) {
      attributes = [
        ...attributes.slice(0, typeTextIndex),
        ...attributes.slice(typeTextIndex + 1)
      ];
    }
    const selector = makeElementSelector({ ...element, attributes });
    return (node) => {
      if (typeTextIndex >= 0 && node.type !== "text") {
        return false;
      }
      return node.matches(selector);
    };
  }
  let result = [];
  for (const [element, roles] of elementRolesMap.entries()) {
    result = [
      ...result,
      {
        match: match(element),
        roles: Array.from(roles),
        specificity: getSelectorSpecificity(element)
      }
    ];
  }
  return result.sort(bySelectorSpecificity);
}
function toHaveAccessibleName(htmlElement, expectedAccessibleName) {
  checkHtmlElement(htmlElement, toHaveAccessibleName, this);
  const actualAccessibleName = computeAccessibleName(htmlElement);
  const missingExpectedValue = arguments.length === 1;
  let pass = false;
  if (missingExpectedValue) {
    pass = actualAccessibleName !== "";
  } else {
    pass = expectedAccessibleName instanceof RegExp ? expectedAccessibleName.test(actualAccessibleName) : this.equals(actualAccessibleName, expectedAccessibleName);
  }
  return {
    pass,
    message: () => {
      const to = this.isNot ? "not to" : "to";
      return getMessage(
        this,
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.${toHaveAccessibleName.name}`,
          "element",
          ""
        ),
        `Expected element ${to} have accessible name`,
        expectedAccessibleName,
        "Received",
        actualAccessibleName
      );
    }
  };
}
function printAttribute(stringify2, name, value) {
  return value === void 0 ? name : `${name}=${stringify2(value)}`;
}
function getAttributeComment(stringify2, name, value) {
  return value === void 0 ? `element.hasAttribute(${stringify2(name)})` : `element.getAttribute(${stringify2(name)}) === ${stringify2(value)}`;
}
function toHaveAttribute(htmlElement, name, expectedValue) {
  checkHtmlElement(htmlElement, toHaveAttribute, this);
  const isExpectedValuePresent = expectedValue !== void 0;
  const hasAttribute = htmlElement.hasAttribute(name);
  const receivedValue = htmlElement.getAttribute(name);
  return {
    pass: isExpectedValuePresent ? hasAttribute && this.equals(receivedValue, expectedValue) : hasAttribute,
    message: () => {
      const to = this.isNot ? "not to" : "to";
      const receivedAttribute = hasAttribute ? printAttribute(this.utils.stringify, name, receivedValue) : null;
      const matcher = this.utils.matcherHint(
        `${this.isNot ? ".not" : ""}.toHaveAttribute`,
        "element",
        this.utils.printExpected(name),
        {
          secondArgument: isExpectedValuePresent ? this.utils.printExpected(expectedValue) : void 0,
          comment: getAttributeComment(
            this.utils.stringify,
            name,
            expectedValue
          )
        }
      );
      return getMessage(
        this,
        matcher,
        `Expected the element ${to} have attribute`,
        printAttribute(this.utils.stringify, name, expectedValue),
        "Received",
        receivedAttribute
      );
    }
  };
}
function getExpectedClassNamesAndOptions(params) {
  const lastParam = params.pop();
  let expectedClassNames, options;
  if (typeof lastParam === "object" && !(lastParam instanceof RegExp)) {
    expectedClassNames = params;
    options = lastParam;
  } else {
    expectedClassNames = params.concat(lastParam);
    options = { exact: false };
  }
  return { expectedClassNames, options };
}
function splitClassNames(str) {
  if (!str) return [];
  return str.split(/\s+/).filter((s) => s.length > 0);
}
function isSubset$1(subset, superset) {
  return subset.every(
    (strOrRegexp) => typeof strOrRegexp === "string" ? superset.includes(strOrRegexp) : superset.some((className) => strOrRegexp.test(className))
  );
}
function toHaveClass(htmlElement, ...params) {
  checkHtmlElement(htmlElement, toHaveClass, this);
  const { expectedClassNames, options } = getExpectedClassNamesAndOptions(params);
  const received = splitClassNames(htmlElement.getAttribute("class"));
  const expected = expectedClassNames.reduce(
    (acc, className) => acc.concat(
      typeof className === "string" || !className ? splitClassNames(className) : className
    ),
    []
  );
  const hasRegExp = expected.some((className) => className instanceof RegExp);
  if (options.exact && hasRegExp) {
    throw new Error("Exact option does not support RegExp expected class names");
  }
  if (options.exact) {
    return {
      pass: isSubset$1(expected, received) && expected.length === received.length,
      message: () => {
        const to = this.isNot ? "not to" : "to";
        return getMessage(
          this,
          this.utils.matcherHint(
            `${this.isNot ? ".not" : ""}.toHaveClass`,
            "element",
            this.utils.printExpected(expected.join(" "))
          ),
          `Expected the element ${to} have EXACTLY defined classes`,
          expected.join(" "),
          "Received",
          received.join(" ")
        );
      }
    };
  }
  return expected.length > 0 ? {
    pass: isSubset$1(expected, received),
    message: () => {
      const to = this.isNot ? "not to" : "to";
      return getMessage(
        this,
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toHaveClass`,
          "element",
          this.utils.printExpected(expected.join(" "))
        ),
        `Expected the element ${to} have class`,
        expected.join(" "),
        "Received",
        received.join(" ")
      );
    }
  } : {
    pass: this.isNot ? received.length > 0 : false,
    message: () => this.isNot ? getMessage(
      this,
      this.utils.matcherHint(".not.toHaveClass", "element", ""),
      "Expected the element to have classes",
      "(none)",
      "Received",
      received.join(" ")
    ) : [
      this.utils.matcherHint(`.toHaveClass`, "element"),
      "At least one expected class must be provided."
    ].join("\n")
  };
}
function getStyleDeclaration(document2, css) {
  const styles = {};
  const copy = document2.createElement("div");
  Object.keys(css).forEach((property) => {
    copy.style[property] = css[property];
    styles[property] = copy.style[property];
  });
  return styles;
}
function isSubset(styles, computedStyle) {
  return !!Object.keys(styles).length && Object.entries(styles).every(([prop, value]) => {
    const isCustomProperty = prop.startsWith("--");
    const spellingVariants = [prop];
    if (!isCustomProperty) spellingVariants.push(prop.toLowerCase());
    return spellingVariants.some(
      (name) => computedStyle[name] === value || computedStyle.getPropertyValue(name) === value
    );
  });
}
function printoutStyles(styles) {
  return Object.keys(styles).sort().map((prop) => `${prop}: ${styles[prop]};`).join("\n");
}
function expectedDiff(diffFn, expected, computedStyles) {
  const received = Array.from(computedStyles).filter((prop) => expected[prop] !== void 0).reduce(
    (obj, prop) => Object.assign(obj, { [prop]: computedStyles.getPropertyValue(prop) }),
    {}
  );
  const diffOutput = diffFn(printoutStyles(expected), printoutStyles(received));
  return diffOutput.replace(`${chalk.red("+ Received")}
`, "");
}
function toHaveStyle(htmlElement, css) {
  checkHtmlElement(htmlElement, toHaveStyle, this);
  const parsedCSS = typeof css === "object" ? css : parseCSS(css, toHaveStyle, this);
  const { getComputedStyle } = htmlElement.ownerDocument.defaultView;
  const expected = getStyleDeclaration(htmlElement.ownerDocument, parsedCSS);
  const received = getComputedStyle(htmlElement);
  return {
    pass: isSubset(expected, received),
    message: () => {
      const matcher = `${this.isNot ? ".not" : ""}.toHaveStyle`;
      return [
        this.utils.matcherHint(matcher, "element", ""),
        expectedDiff(this.utils.diff, expected, received)
      ].join("\n\n");
    }
  };
}
function toHaveFocus(element) {
  checkHtmlElement(element, toHaveFocus, this);
  return {
    pass: element.ownerDocument.activeElement === element,
    message: () => {
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toHaveFocus`,
          "element",
          ""
        ),
        "",
        ...this.isNot ? [
          "Received element is focused:",
          `  ${this.utils.printReceived(element)}`
        ] : [
          "Expected element with focus:",
          `  ${this.utils.printExpected(element)}`,
          "Received element with focus:",
          `  ${this.utils.printReceived(
            element.ownerDocument.activeElement
          )}`
        ]
      ].join("\n");
    }
  };
}
function getMultiElementValue(elements) {
  const types = [...new Set(elements.map((element) => element.type))];
  if (types.length !== 1) {
    throw new Error(
      "Multiple form elements with the same name must be of the same type"
    );
  }
  switch (types[0]) {
    case "radio": {
      const theChosenOne = elements.find((radio) => radio.checked);
      return theChosenOne ? theChosenOne.value : void 0;
    }
    case "checkbox":
      return elements.filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);
    default:
      return elements.map((element) => element.value);
  }
}
function getFormValue(container, name) {
  const elements = [...container.querySelectorAll(`[name="${escape(name)}"]`)];
  if (elements.length === 0) {
    return void 0;
  }
  switch (elements.length) {
    case 1:
      return getSingleElementValue(elements[0]);
    default:
      return getMultiElementValue(elements);
  }
}
function getPureName(name) {
  return /\[\]$/.test(name) ? name.slice(0, -2) : name;
}
function getAllFormValues(container) {
  const names = Array.from(container.elements).map((element) => element.name);
  return names.reduce(
    (obj, name) => ({
      ...obj,
      [getPureName(name)]: getFormValue(container, name)
    }),
    {}
  );
}
function toHaveFormValues(formElement, expectedValues) {
  checkHtmlElement(formElement, toHaveFormValues, this);
  if (!formElement.elements) {
    throw new Error("toHaveFormValues must be called on a form or a fieldset");
  }
  const formValues = getAllFormValues(formElement);
  return {
    pass: Object.entries(expectedValues).every(
      ([name, expectedValue]) => isEqualWith(formValues[name], expectedValue, compareArraysAsSet)
    ),
    message: () => {
      const to = this.isNot ? "not to" : "to";
      const matcher = `${this.isNot ? ".not" : ""}.toHaveFormValues`;
      const commonKeyValues = Object.keys(formValues).filter((key) => expectedValues.hasOwnProperty(key)).reduce((obj, key) => ({ ...obj, [key]: formValues[key] }), {});
      return [
        this.utils.matcherHint(matcher, "element", ""),
        `Expected the element ${to} have form values`,
        this.utils.diff(expectedValues, commonKeyValues)
      ].join("\n\n");
    }
  };
}
function isStyleVisible(element) {
  const { getComputedStyle } = element.ownerDocument.defaultView;
  const { display: display2, visibility, opacity } = getComputedStyle(element);
  return display2 !== "none" && visibility !== "hidden" && visibility !== "collapse" && opacity !== "0" && opacity !== 0;
}
function isAttributeVisible(element, previousElement) {
  let detailsVisibility;
  if (previousElement) {
    detailsVisibility = element.nodeName === "DETAILS" && previousElement.nodeName !== "SUMMARY" ? element.hasAttribute("open") : true;
  } else {
    detailsVisibility = element.nodeName === "DETAILS" ? element.hasAttribute("open") : true;
  }
  return !element.hasAttribute("hidden") && detailsVisibility;
}
function isElementVisible(element, previousElement) {
  return isStyleVisible(element) && isAttributeVisible(element, previousElement) && (!element.parentElement || isElementVisible(element.parentElement, element));
}
function toBeVisible(element) {
  checkHtmlElement(element, toBeVisible, this);
  const isInDocument = element.ownerDocument === element.getRootNode({ composed: true });
  const isVisible = isInDocument && isElementVisible(element);
  return {
    pass: isVisible,
    message: () => {
      const is = isVisible ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeVisible`,
          "element",
          ""
        ),
        "",
        `Received element ${is} visible${isInDocument ? "" : " (element is not in the document)"}:`,
        `  ${this.utils.printReceived(element.cloneNode(false))}`
      ].join("\n");
    }
  };
}
const FORM_TAGS$2 = [
  "fieldset",
  "input",
  "select",
  "optgroup",
  "option",
  "button",
  "textarea"
];
function isFirstLegendChildOfFieldset(element, parent) {
  return getTag(element) === "legend" && getTag(parent) === "fieldset" && element.isSameNode(
    Array.from(parent.children).find((child) => getTag(child) === "legend")
  );
}
function isElementDisabledByParent(element, parent) {
  return isElementDisabled(parent) && !isFirstLegendChildOfFieldset(element, parent);
}
function isCustomElement(tag) {
  return tag.includes("-");
}
function canElementBeDisabled(element) {
  const tag = getTag(element);
  return FORM_TAGS$2.includes(tag) || isCustomElement(tag);
}
function isElementDisabled(element) {
  return canElementBeDisabled(element) && element.hasAttribute("disabled");
}
function isAncestorDisabled(element) {
  const parent = element.parentElement;
  return Boolean(parent) && (isElementDisabledByParent(element, parent) || isAncestorDisabled(parent));
}
function isElementOrAncestorDisabled(element) {
  return canElementBeDisabled(element) && (isElementDisabled(element) || isAncestorDisabled(element));
}
function toBeDisabled(element) {
  checkHtmlElement(element, toBeDisabled, this);
  const isDisabled = isElementOrAncestorDisabled(element);
  return {
    pass: isDisabled,
    message: () => {
      const is = isDisabled ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeDisabled`,
          "element",
          ""
        ),
        "",
        `Received element ${is} disabled:`,
        `  ${this.utils.printReceived(element.cloneNode(false))}`
      ].join("\n");
    }
  };
}
function toBeEnabled(element) {
  checkHtmlElement(element, toBeEnabled, this);
  const isEnabled = !isElementOrAncestorDisabled(element);
  return {
    pass: isEnabled,
    message: () => {
      const is = isEnabled ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeEnabled`,
          "element",
          ""
        ),
        "",
        `Received element ${is} enabled:`,
        `  ${this.utils.printReceived(element.cloneNode(false))}`
      ].join("\n");
    }
  };
}
const FORM_TAGS$1 = ["select", "textarea"];
const ARIA_FORM_TAGS = ["input", "select", "textarea"];
const UNSUPPORTED_INPUT_TYPES = [
  "color",
  "hidden",
  "range",
  "submit",
  "image",
  "reset"
];
const SUPPORTED_ARIA_ROLES = [
  "checkbox",
  "combobox",
  "gridcell",
  "listbox",
  "radiogroup",
  "spinbutton",
  "textbox",
  "tree"
];
function isRequiredOnFormTagsExceptInput(element) {
  return FORM_TAGS$1.includes(getTag(element)) && element.hasAttribute("required");
}
function isRequiredOnSupportedInput(element) {
  return getTag(element) === "input" && element.hasAttribute("required") && (element.hasAttribute("type") && !UNSUPPORTED_INPUT_TYPES.includes(element.getAttribute("type")) || !element.hasAttribute("type"));
}
function isElementRequiredByARIA(element) {
  return element.hasAttribute("aria-required") && element.getAttribute("aria-required") === "true" && (ARIA_FORM_TAGS.includes(getTag(element)) || element.hasAttribute("role") && SUPPORTED_ARIA_ROLES.includes(element.getAttribute("role")));
}
function toBeRequired(element) {
  checkHtmlElement(element, toBeRequired, this);
  const isRequired = isRequiredOnFormTagsExceptInput(element) || isRequiredOnSupportedInput(element) || isElementRequiredByARIA(element);
  return {
    pass: isRequired,
    message: () => {
      const is = isRequired ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeRequired`,
          "element",
          ""
        ),
        "",
        `Received element ${is} required:`,
        `  ${this.utils.printReceived(element.cloneNode(false))}`
      ].join("\n");
    }
  };
}
const FORM_TAGS = ["form", "input", "select", "textarea"];
function isElementHavingAriaInvalid(element) {
  return element.hasAttribute("aria-invalid") && element.getAttribute("aria-invalid") !== "false";
}
function isSupportsValidityMethod(element) {
  return FORM_TAGS.includes(getTag(element));
}
function isElementInvalid(element) {
  const isHaveAriaInvalid = isElementHavingAriaInvalid(element);
  if (isSupportsValidityMethod(element)) {
    return isHaveAriaInvalid || !element.checkValidity();
  } else {
    return isHaveAriaInvalid;
  }
}
function toBeInvalid(element) {
  checkHtmlElement(element, toBeInvalid, this);
  const isInvalid = isElementInvalid(element);
  return {
    pass: isInvalid,
    message: () => {
      const is = isInvalid ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeInvalid`,
          "element",
          ""
        ),
        "",
        `Received element ${is} currently invalid:`,
        `  ${this.utils.printReceived(element.cloneNode(false))}`
      ].join("\n");
    }
  };
}
function toBeValid(element) {
  checkHtmlElement(element, toBeValid, this);
  const isValid = !isElementInvalid(element);
  return {
    pass: isValid,
    message: () => {
      const is = isValid ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeValid`,
          "element",
          ""
        ),
        "",
        `Received element ${is} currently valid:`,
        `  ${this.utils.printReceived(element.cloneNode(false))}`
      ].join("\n");
    }
  };
}
function toHaveValue(htmlElement, expectedValue) {
  checkHtmlElement(htmlElement, toHaveValue, this);
  if (htmlElement.tagName.toLowerCase() === "input" && ["checkbox", "radio"].includes(htmlElement.type)) {
    throw new Error(
      "input with type=checkbox or type=radio cannot be used with .toHaveValue(). Use .toBeChecked() for type=checkbox or .toHaveFormValues() instead"
    );
  }
  const receivedValue = getSingleElementValue(htmlElement);
  const expectsValue = expectedValue !== void 0;
  let expectedTypedValue = expectedValue;
  let receivedTypedValue = receivedValue;
  if (expectedValue == receivedValue && expectedValue !== receivedValue) {
    expectedTypedValue = `${expectedValue} (${typeof expectedValue})`;
    receivedTypedValue = `${receivedValue} (${typeof receivedValue})`;
  }
  return {
    pass: expectsValue ? isEqualWith(receivedValue, expectedValue, compareArraysAsSet) : Boolean(receivedValue),
    message: () => {
      const to = this.isNot ? "not to" : "to";
      const matcher = this.utils.matcherHint(
        `${this.isNot ? ".not" : ""}.toHaveValue`,
        "element",
        expectedValue
      );
      return getMessage(
        this,
        matcher,
        `Expected the element ${to} have value`,
        expectsValue ? expectedTypedValue : "(any)",
        "Received",
        receivedTypedValue
      );
    }
  };
}
function toHaveDisplayValue(htmlElement, expectedValue) {
  checkHtmlElement(htmlElement, toHaveDisplayValue, this);
  const tagName = htmlElement.tagName.toLowerCase();
  if (!["select", "input", "textarea"].includes(tagName)) {
    throw new Error(
      ".toHaveDisplayValue() currently supports only input, textarea or select elements, try with another matcher instead."
    );
  }
  if (tagName === "input" && ["radio", "checkbox"].includes(htmlElement.type)) {
    throw new Error(
      `.toHaveDisplayValue() currently does not support input[type="${htmlElement.type}"], try with another matcher instead.`
    );
  }
  const values = getValues(tagName, htmlElement);
  const expectedValues = getExpectedValues(expectedValue);
  const numberOfMatchesWithValues = expectedValues.filter(
    (expected) => values.some(
      (value) => expected instanceof RegExp ? expected.test(value) : this.equals(value, String(expected))
    )
  ).length;
  const matchedWithAllValues = numberOfMatchesWithValues === values.length;
  const matchedWithAllExpectedValues = numberOfMatchesWithValues === expectedValues.length;
  return {
    pass: matchedWithAllValues && matchedWithAllExpectedValues,
    message: () => getMessage(
      this,
      this.utils.matcherHint(
        `${this.isNot ? ".not" : ""}.toHaveDisplayValue`,
        "element",
        ""
      ),
      `Expected element ${this.isNot ? "not " : ""}to have display value`,
      expectedValue,
      "Received",
      values
    )
  };
}
function getValues(tagName, htmlElement) {
  return tagName === "select" ? Array.from(htmlElement).filter((option) => option.selected).map((option) => option.textContent) : [htmlElement.value];
}
function getExpectedValues(expectedValue) {
  return expectedValue instanceof Array ? expectedValue : [expectedValue];
}
function toBeChecked(element) {
  checkHtmlElement(element, toBeChecked, this);
  const isValidInput = () => {
    return element.tagName.toLowerCase() === "input" && ["checkbox", "radio"].includes(element.type);
  };
  const isValidAriaElement = () => {
    return roleSupportsChecked(element.getAttribute("role")) && ["true", "false"].includes(element.getAttribute("aria-checked"));
  };
  if (!isValidInput() && !isValidAriaElement()) {
    return {
      pass: false,
      message: () => `only inputs with type="checkbox" or type="radio" or elements with ${supportedRolesSentence()} and a valid aria-checked attribute can be used with .toBeChecked(). Use .toHaveValue() instead`
    };
  }
  const isChecked = () => {
    if (isValidInput()) return element.checked;
    return element.getAttribute("aria-checked") === "true";
  };
  return {
    pass: isChecked(),
    message: () => {
      const is = isChecked() ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeChecked`,
          "element",
          ""
        ),
        "",
        `Received element ${is} checked:`,
        `  ${this.utils.printReceived(element.cloneNode(false))}`
      ].join("\n");
    }
  };
}
function supportedRolesSentence() {
  return toSentence(
    supportedRoles().map((role) => `role="${role}"`),
    { lastWordConnector: " or " }
  );
}
function supportedRoles() {
  return libExports.roles.keys().filter(roleSupportsChecked);
}
function roleSupportsChecked(role) {
  var _a;
  return ((_a = libExports.roles.get(role)) == null ? void 0 : _a.props["aria-checked"]) !== void 0;
}
function toBePartiallyChecked(element) {
  checkHtmlElement(element, toBePartiallyChecked, this);
  const isValidInput = () => {
    return element.tagName.toLowerCase() === "input" && element.type === "checkbox";
  };
  const isValidAriaElement = () => {
    return element.getAttribute("role") === "checkbox";
  };
  if (!isValidInput() && !isValidAriaElement()) {
    return {
      pass: false,
      message: () => 'only inputs with type="checkbox" or elements with role="checkbox" and a valid aria-checked attribute can be used with .toBePartiallyChecked(). Use .toHaveValue() instead'
    };
  }
  const isPartiallyChecked = () => {
    const isAriaMixed = element.getAttribute("aria-checked") === "mixed";
    if (isValidInput()) {
      return element.indeterminate || isAriaMixed;
    }
    return isAriaMixed;
  };
  return {
    pass: isPartiallyChecked(),
    message: () => {
      const is = isPartiallyChecked() ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBePartiallyChecked`,
          "element",
          ""
        ),
        "",
        `Received element ${is} partially checked:`,
        `  ${this.utils.printReceived(element.cloneNode(false))}`
      ].join("\n");
    }
  };
}
function toHaveDescription(htmlElement, checkWith) {
  deprecate(
    "toHaveDescription",
    "Please use toHaveAccessibleDescription."
  );
  checkHtmlElement(htmlElement, toHaveDescription, this);
  const expectsDescription = checkWith !== void 0;
  const descriptionIDRaw = htmlElement.getAttribute("aria-describedby") || "";
  const descriptionIDs = descriptionIDRaw.split(/\s+/).filter(Boolean);
  let description = "";
  if (descriptionIDs.length > 0) {
    const document2 = htmlElement.ownerDocument;
    const descriptionEls = descriptionIDs.map((descriptionID) => document2.getElementById(descriptionID)).filter(Boolean);
    description = normalize$1(descriptionEls.map((el) => el.textContent).join(" "));
  }
  return {
    pass: expectsDescription ? checkWith instanceof RegExp ? checkWith.test(description) : this.equals(description, checkWith) : Boolean(description),
    message: () => {
      const to = this.isNot ? "not to" : "to";
      return getMessage(
        this,
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toHaveDescription`,
          "element",
          ""
        ),
        `Expected the element ${to} have description`,
        this.utils.printExpected(checkWith),
        "Received",
        this.utils.printReceived(description)
      );
    }
  };
}
function toHaveErrorMessage(htmlElement, checkWith) {
  deprecate("toHaveErrorMessage", "Please use toHaveAccessibleErrorMessage.");
  checkHtmlElement(htmlElement, toHaveErrorMessage, this);
  if (!htmlElement.hasAttribute("aria-invalid") || htmlElement.getAttribute("aria-invalid") === "false") {
    const not = this.isNot ? ".not" : "";
    return {
      pass: false,
      message: () => {
        return getMessage(
          this,
          this.utils.matcherHint(`${not}.toHaveErrorMessage`, "element", ""),
          `Expected the element to have invalid state indicated by`,
          'aria-invalid="true"',
          "Received",
          htmlElement.hasAttribute("aria-invalid") ? `aria-invalid="${htmlElement.getAttribute("aria-invalid")}"` : this.utils.printReceived("")
        );
      }
    };
  }
  const expectsErrorMessage = checkWith !== void 0;
  const errormessageIDRaw = htmlElement.getAttribute("aria-errormessage") || "";
  const errormessageIDs = errormessageIDRaw.split(/\s+/).filter(Boolean);
  let errormessage = "";
  if (errormessageIDs.length > 0) {
    const document2 = htmlElement.ownerDocument;
    const errormessageEls = errormessageIDs.map((errormessageID) => document2.getElementById(errormessageID)).filter(Boolean);
    errormessage = normalize$1(
      errormessageEls.map((el) => el.textContent).join(" ")
    );
  }
  return {
    pass: expectsErrorMessage ? checkWith instanceof RegExp ? checkWith.test(errormessage) : this.equals(errormessage, checkWith) : Boolean(errormessage),
    message: () => {
      const to = this.isNot ? "not to" : "to";
      return getMessage(
        this,
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toHaveErrorMessage`,
          "element",
          ""
        ),
        `Expected the element ${to} have error message`,
        this.utils.printExpected(checkWith),
        "Received",
        this.utils.printReceived(errormessage)
      );
    }
  };
}
function getSelection(element) {
  const selection = element.ownerDocument.getSelection();
  if (["input", "textarea"].includes(element.tagName.toLowerCase())) {
    if (["radio", "checkbox"].includes(element.type)) return "";
    return element.value.toString().substring(element.selectionStart, element.selectionEnd);
  }
  if (selection.anchorNode === null || selection.focusNode === null) {
    return "";
  }
  const originalRange = selection.getRangeAt(0);
  const temporaryRange = element.ownerDocument.createRange();
  if (selection.containsNode(element, false)) {
    temporaryRange.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(temporaryRange);
  } else if (element.contains(selection.anchorNode) && element.contains(selection.focusNode)) ;
  else {
    const selectionStartsWithinElement = element === originalRange.startContainer || element.contains(originalRange.startContainer);
    const selectionEndsWithinElement = element === originalRange.endContainer || element.contains(originalRange.endContainer);
    selection.removeAllRanges();
    if (selectionStartsWithinElement || selectionEndsWithinElement) {
      temporaryRange.selectNodeContents(element);
      if (selectionStartsWithinElement) {
        temporaryRange.setStart(
          originalRange.startContainer,
          originalRange.startOffset
        );
      }
      if (selectionEndsWithinElement) {
        temporaryRange.setEnd(
          originalRange.endContainer,
          originalRange.endOffset
        );
      }
      selection.addRange(temporaryRange);
    }
  }
  const result = selection.toString();
  selection.removeAllRanges();
  selection.addRange(originalRange);
  return result;
}
function toHaveSelection(htmlElement, expectedSelection) {
  checkHtmlElement(htmlElement, toHaveSelection, this);
  const expectsSelection = expectedSelection !== void 0;
  if (expectsSelection && typeof expectedSelection !== "string") {
    throw new Error(`expected selection must be a string or undefined`);
  }
  const receivedSelection = getSelection(htmlElement);
  return {
    pass: expectsSelection ? isEqualWith(receivedSelection, expectedSelection, compareArraysAsSet) : Boolean(receivedSelection),
    message: () => {
      const to = this.isNot ? "not to" : "to";
      const matcher = this.utils.matcherHint(
        `${this.isNot ? ".not" : ""}.toHaveSelection`,
        "element",
        expectedSelection
      );
      return getMessage(
        this,
        matcher,
        `Expected the element ${to} have selection`,
        expectsSelection ? expectedSelection : "(any)",
        "Received",
        receivedSelection
      );
    }
  };
}
const matchers = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  toBeChecked,
  toBeDisabled,
  toBeEmpty,
  toBeEmptyDOMElement,
  toBeEnabled,
  toBeInTheDOM,
  toBeInTheDocument,
  toBeInvalid,
  toBePartiallyChecked,
  toBeRequired,
  toBeValid,
  toBeVisible,
  toContainElement,
  toContainHTML,
  toHaveAccessibleDescription,
  toHaveAccessibleErrorMessage,
  toHaveAccessibleName,
  toHaveAttribute,
  toHaveClass,
  toHaveDescription,
  toHaveDisplayValue,
  toHaveErrorMessage,
  toHaveFocus,
  toHaveFormValues,
  toHaveRole,
  toHaveSelection,
  toHaveStyle,
  toHaveTextContent,
  toHaveValue
}, Symbol.toStringTag, { value: "Module" }));
async function setupExpectDom() {
  expect.extend(matchers);
  expect.element = (elementOrLocator, options) => {
    if (!(elementOrLocator instanceof Element) && !("element" in elementOrLocator)) {
      throw new Error(`Invalid element or locator: ${elementOrLocator}. Expected an instance of Element or Locator, received ${typeof elementOrLocator}`);
    }
    return expect.poll(function element() {
      if (elementOrLocator instanceof Element || elementOrLocator == null) {
        return elementOrLocator;
      }
      chai.util.flag(this, "_poll.element", true);
      const isNot = chai.util.flag(this, "negate");
      const name = chai.util.flag(this, "_name");
      const isLastPollAttempt = chai.util.flag(this, "_isLastPollAttempt");
      if (isNot && name === "toBeInTheDocument") {
        return elementOrLocator.query();
      }
      if (isLastPollAttempt) {
        return elementOrLocator.element();
      }
      const result = elementOrLocator.query();
      if (!result) {
        throw new Error(`Cannot find element with locator: ${JSON.stringify(elementOrLocator)}`);
      }
      return result;
    }, options);
  };
}
const { get } = Reflect;
function withSafeTimers(getTimers, fn) {
  const { setTimeout, clearTimeout, setImmediate, clearImmediate } = getTimers();
  const currentSetTimeout = globalThis.setTimeout;
  const currentClearTimeout = globalThis.clearTimeout;
  const currentSetImmediate = globalThis.setImmediate;
  const currentClearImmediate = globalThis.clearImmediate;
  try {
    globalThis.setTimeout = setTimeout;
    globalThis.clearTimeout = clearTimeout;
    globalThis.setImmediate = setImmediate;
    globalThis.clearImmediate = clearImmediate;
    const result = fn();
    return result;
  } finally {
    globalThis.setTimeout = currentSetTimeout;
    globalThis.clearTimeout = currentClearTimeout;
    globalThis.setImmediate = currentSetImmediate;
    globalThis.clearImmediate = currentClearImmediate;
  }
}
const promises = /* @__PURE__ */ new Set();
function createSafeRpc(client2) {
  return new Proxy(client2.rpc, {
    get(target, p, handler) {
      if (p === "then") {
        return;
      }
      const sendCall = get(target, p, handler);
      const safeSendCall = (...args) => withSafeTimers(getSafeTimers, async () => {
        const result = sendCall(...args);
        promises.add(result);
        try {
          return await result;
        } finally {
          promises.delete(result);
        }
      });
      safeSendCall.asEvent = sendCall.asEvent;
      return safeSendCall;
    }
  });
}
function rpc$1() {
  return globalThis.__vitest_worker__.rpc;
}
const { Date: Date$1, console: console$1, performance: performance$1 } = globalThis;
function setupConsoleLogSpy() {
  const {
    log,
    info,
    error,
    dir,
    dirxml,
    trace,
    time,
    timeEnd,
    timeLog,
    warn,
    debug: debug2,
    count,
    countReset
  } = console$1;
  console$1.log = stdout(log);
  console$1.debug = stdout(debug2);
  console$1.info = stdout(info);
  console$1.error = stderr(error);
  console$1.warn = stderr(warn);
  console$1.dir = (item, options) => {
    dir(item, options);
    sendLog("stdout", formatInput(item));
  };
  console$1.dirxml = (...args) => {
    dirxml(...args);
    sendLog("stdout", processLog(args));
  };
  console$1.trace = (...args) => {
    var _a;
    trace(...args);
    const content = processLog(args);
    const error2 = new Error("$$Trace");
    const processor = ((_a = globalThis.__vitest_worker__) == null ? void 0 : _a.onFilterStackTrace) || ((s) => s || "");
    const stack = processor(error2.stack || "");
    sendLog("stderr", `${content}
${stack}`, true);
  };
  const timeLabels = {};
  console$1.time = (label = "default") => {
    time(label);
    const now2 = performance$1.now();
    timeLabels[label] = now2;
  };
  console$1.timeLog = (label = "default") => {
    timeLog(label);
    if (!(label in timeLabels)) {
      sendLog("stderr", `Timer "${label}" does not exist`);
    } else {
      sendLog("stdout", `${label}: ${timeLabels[label]} ms`);
    }
  };
  console$1.timeEnd = (label = "default") => {
    timeEnd(label);
    const end = performance$1.now();
    const start = timeLabels[label];
    if (!(label in timeLabels)) {
      sendLog("stderr", `Timer "${label}" does not exist`);
    } else if (typeof start !== "undefined") {
      const duration = end - start;
      sendLog("stdout", `${label}: ${duration} ms`);
    }
  };
  const countLabels = {};
  console$1.count = (label = "default") => {
    count(label);
    const counter = (countLabels[label] ?? 0) + 1;
    countLabels[label] = counter;
    sendLog("stdout", `${label}: ${counter}`);
  };
  console$1.countReset = (label = "default") => {
    countReset(label);
    countLabels[label] = 0;
  };
}
function stdout(base) {
  return (...args) => {
    base(...args);
    if (args[0] === "[WDIO]") {
      if (args[1] === "newShadowRoot" || args[1] === "removeShadowRoot") {
        return;
      }
    }
    sendLog("stdout", processLog(args));
  };
}
function stderr(base) {
  return (...args) => {
    base(...args);
    sendLog("stderr", processLog(args));
  };
}
function formatInput(input) {
  if (typeof input === "object") {
    return stringify(input, void 0, {
      printBasicPrototype: false,
      escapeString: false
    });
  }
  return format(input);
}
function processLog(args) {
  return args.map(formatInput).join(" ");
}
function sendLog(type, content, disableStack) {
  var _a, _b, _c;
  if (content.startsWith("[vite]")) {
    return;
  }
  const unknownTestId = "__vitest__unknown_test__";
  const taskId = ((_b = (_a = globalThis.__vitest_worker__) == null ? void 0 : _a.current) == null ? void 0 : _b.id) ?? unknownTestId;
  const origin = getConfig().printConsoleTrace && !disableStack ? (_c = new Error("STACK_TRACE").stack) == null ? void 0 : _c.split("\n").slice(1).join("\n") : void 0;
  rpc$1().sendLog({
    origin,
    content,
    browser: true,
    time: Date$1.now(),
    taskId,
    type,
    size: content.length
  });
}
class MockerRegistry {
  constructor() {
    __publicField(this, "registry", /* @__PURE__ */ new Map());
  }
  clear() {
    this.registry.clear();
  }
  keys() {
    return this.registry.keys();
  }
  add(mock) {
    this.registry.set(mock.url, mock);
  }
  register(typeOrEvent, raw, url2, factoryOrRedirect) {
    const type = typeof typeOrEvent === "object" ? typeOrEvent.type : typeOrEvent;
    if (typeof typeOrEvent === "object") {
      const event = typeOrEvent;
      if (event instanceof AutomockedModule || event instanceof AutospiedModule || event instanceof ManualMockedModule || event instanceof RedirectedModule) {
        throw new TypeError(
          `[vitest] Cannot register a mock that is already defined. Expected a JSON representation from \`MockedModule.toJSON\`, instead got "${event.type}". Use "registry.add()" to update a mock instead.`
        );
      }
      if (event.type === "automock") {
        const module = AutomockedModule.fromJSON(event);
        this.add(module);
        return module;
      } else if (event.type === "autospy") {
        const module = AutospiedModule.fromJSON(event);
        this.add(module);
        return module;
      } else if (event.type === "redirect") {
        const module = RedirectedModule.fromJSON(event);
        this.add(module);
        return module;
      } else if (event.type === "manual") {
        throw new Error(`Cannot set serialized manual mock. Define a factory function manually with \`ManualMockedModule.fromJSON()\`.`);
      } else {
        throw new Error(`Unknown mock type: ${event.type}`);
      }
    }
    if (typeof raw !== "string") {
      throw new TypeError("[vitest] Mocks require a raw string.");
    }
    if (typeof url2 !== "string") {
      throw new TypeError("[vitest] Mocks require a url string.");
    }
    if (type === "manual") {
      if (typeof factoryOrRedirect !== "function") {
        throw new TypeError("[vitest] Manual mocks require a factory function.");
      }
      const mock = new ManualMockedModule(raw, url2, factoryOrRedirect);
      this.add(mock);
      return mock;
    } else if (type === "automock" || type === "autospy") {
      const mock = type === "automock" ? new AutomockedModule(raw, url2) : new AutospiedModule(raw, url2);
      this.add(mock);
      return mock;
    } else if (type === "redirect") {
      if (typeof factoryOrRedirect !== "string") {
        throw new TypeError("[vitest] Redirect mocks require a redirect string.");
      }
      const mock = new RedirectedModule(raw, url2, factoryOrRedirect);
      this.add(mock);
      return mock;
    } else {
      throw new Error(`[vitest] Unknown mock type: ${type}`);
    }
  }
  delete(id) {
    this.registry.delete(id);
  }
  get(id) {
    return this.registry.get(id);
  }
  has(id) {
    return this.registry.has(id);
  }
}
class AutomockedModule {
  constructor(raw, url2) {
    __publicField(this, "type", "automock");
    this.raw = raw;
    this.url = url2;
  }
  static fromJSON(data) {
    return new AutospiedModule(data.raw, data.url);
  }
  toJSON() {
    return {
      type: this.type,
      url: this.url,
      raw: this.raw
    };
  }
}
class AutospiedModule {
  constructor(raw, url2) {
    __publicField(this, "type", "autospy");
    this.raw = raw;
    this.url = url2;
  }
  static fromJSON(data) {
    return new AutospiedModule(data.raw, data.url);
  }
  toJSON() {
    return {
      type: this.type,
      url: this.url,
      raw: this.raw
    };
  }
}
class RedirectedModule {
  constructor(raw, url2, redirect) {
    __publicField(this, "type", "redirect");
    this.raw = raw;
    this.url = url2;
    this.redirect = redirect;
  }
  static fromJSON(data) {
    return new RedirectedModule(data.raw, data.url, data.redirect);
  }
  toJSON() {
    return {
      type: this.type,
      url: this.url,
      raw: this.raw,
      redirect: this.redirect
    };
  }
}
class ManualMockedModule {
  constructor(raw, url2, factory) {
    __publicField(this, "cache");
    __publicField(this, "type", "manual");
    this.raw = raw;
    this.url = url2;
    this.factory = factory;
  }
  async resolve() {
    if (this.cache) {
      return this.cache;
    }
    let exports;
    try {
      exports = await this.factory();
    } catch (err) {
      const vitestError = new Error(
        '[vitest] There was an error when mocking a module. If you are using "vi.mock" factory, make sure there are no top level variables inside, since this call is hoisted to top of the file. Read more: https://vitest.dev/api/vi.html#vi-mock'
      );
      vitestError.cause = err;
      throw vitestError;
    }
    if (exports === null || typeof exports !== "object" || Array.isArray(exports)) {
      throw new TypeError(
        `[vitest] vi.mock("${this.raw}", factory?: () => unknown) is not returning an object. Did you mean to return an object with a "default" key?`
      );
    }
    return this.cache = exports;
  }
  static fromJSON(data, factory) {
    return new ManualMockedModule(data.raw, data.url, factory);
  }
  toJSON() {
    return {
      type: this.type,
      url: this.url,
      raw: this.raw
    };
  }
}
function mockObject(options, object, mockExports = {}) {
  const finalizers = new Array();
  const refs = new RefTracker();
  const define = (container, key, value) => {
    try {
      container[key] = value;
      return true;
    } catch {
      return false;
    }
  };
  const mockPropertiesOf = (container, newContainer) => {
    const containerType = getType(container);
    const isModule = containerType === "Module" || !!container.__esModule;
    for (const { key: property, descriptor } of getAllMockableProperties(
      container,
      isModule,
      options.globalConstructors
    )) {
      if (!isModule && descriptor.get) {
        try {
          Object.defineProperty(newContainer, property, descriptor);
        } catch {
        }
        continue;
      }
      if (isSpecialProp(property, containerType)) {
        continue;
      }
      const value = container[property];
      const refId = refs.getId(value);
      if (refId !== void 0) {
        finalizers.push(
          () => define(newContainer, property, refs.getMockedValue(refId))
        );
        continue;
      }
      const type = getType(value);
      if (Array.isArray(value)) {
        define(newContainer, property, []);
        continue;
      }
      const isFunction = type.includes("Function") && typeof value === "function";
      if ((!isFunction || value._isMockFunction) && type !== "Object" && type !== "Module") {
        define(newContainer, property, value);
        continue;
      }
      if (!define(newContainer, property, isFunction ? value : {})) {
        continue;
      }
      if (isFunction) {
        let mockFunction2 = function() {
          if (this instanceof newContainer[property]) {
            for (const { key, descriptor: descriptor2 } of getAllMockableProperties(
              this,
              false,
              options.globalConstructors
            )) {
              if (descriptor2.get) {
                continue;
              }
              const value2 = this[key];
              const type2 = getType(value2);
              const isFunction2 = type2.includes("Function") && typeof value2 === "function";
              if (isFunction2) {
                const original = this[key];
                const mock2 = spyOn(this, key).mockImplementation(original);
                const origMockReset = mock2.mockReset;
                mock2.mockRestore = mock2.mockReset = () => {
                  origMockReset.call(mock2);
                  mock2.mockImplementation(original);
                  return mock2;
                };
              }
            }
          }
        };
        if (!options.spyOn) {
          throw new Error(
            "[@vitest/mocker] `spyOn` is not defined. This is a Vitest error. Please open a new issue with reproduction."
          );
        }
        const spyOn = options.spyOn;
        const mock = spyOn(newContainer, property);
        if (options.type === "automock") {
          mock.mockImplementation(mockFunction2);
          const origMockReset = mock.mockReset;
          mock.mockRestore = mock.mockReset = () => {
            origMockReset.call(mock);
            mock.mockImplementation(mockFunction2);
            return mock;
          };
        }
        Object.defineProperty(newContainer[property], "length", { value: 0 });
      }
      refs.track(value, newContainer[property]);
      mockPropertiesOf(value, newContainer[property]);
    }
  };
  const mockedObject = mockExports;
  mockPropertiesOf(object, mockedObject);
  for (const finalizer of finalizers) {
    finalizer();
  }
  return mockedObject;
}
class RefTracker {
  constructor() {
    __publicField(this, "idMap", /* @__PURE__ */ new Map());
    __publicField(this, "mockedValueMap", /* @__PURE__ */ new Map());
  }
  getId(value) {
    return this.idMap.get(value);
  }
  getMockedValue(id) {
    return this.mockedValueMap.get(id);
  }
  track(originalValue, mockedValue) {
    const newId = this.idMap.size;
    this.idMap.set(originalValue, newId);
    this.mockedValueMap.set(newId, mockedValue);
    return newId;
  }
}
function getType(value) {
  return Object.prototype.toString.apply(value).slice(8, -1);
}
function isSpecialProp(prop, parentType) {
  return parentType.includes("Function") && typeof prop === "string" && ["arguments", "callee", "caller", "length", "name"].includes(prop);
}
function getAllMockableProperties(obj, isModule, constructors) {
  const { Map: Map2, Object: Object2, Function: Function2, RegExp: RegExp2, Array: Array2 } = constructors;
  const allProps = new Map2();
  let curr = obj;
  do {
    if (curr === Object2.prototype || curr === Function2.prototype || curr === RegExp2.prototype) {
      break;
    }
    collectOwnProperties(curr, (key) => {
      const descriptor = Object2.getOwnPropertyDescriptor(curr, key);
      if (descriptor) {
        allProps.set(key, { key, descriptor });
      }
    });
  } while (curr = Object2.getPrototypeOf(curr));
  if (isModule && !allProps.has("default") && "default" in obj) {
    const descriptor = Object2.getOwnPropertyDescriptor(obj, "default");
    if (descriptor) {
      allProps.set("default", { key: "default", descriptor });
    }
  }
  return Array2.from(allProps.values());
}
function collectOwnProperties(obj, collector) {
  const collect = typeof collector === "function" ? collector : (key) => collector.add(key);
  Object.getOwnPropertyNames(obj).forEach(collect);
  Object.getOwnPropertySymbols(obj).forEach(collect);
}
const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _UNC_REGEX = /^[/\\]{2}/;
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
const _EXTNAME_RE = /.(\.[^./]+|\.)$/;
const normalize = function(path) {
  if (path.length === 0) {
    return ".";
  }
  path = normalizeWindowsPath(path);
  const isUNCPath = path.match(_UNC_REGEX);
  const isPathAbsolute = isAbsolute(path);
  const trailingSeparator = path[path.length - 1] === "/";
  path = normalizeString(path, !isPathAbsolute);
  if (path.length === 0) {
    if (isPathAbsolute) {
      return "/";
    }
    return trailingSeparator ? "./" : ".";
  }
  if (trailingSeparator) {
    path += "/";
  }
  if (_DRIVE_LETTER_RE.test(path)) {
    path += "/";
  }
  if (isUNCPath) {
    if (!isPathAbsolute) {
      return `//./${path}`;
    }
    return `//${path}`;
  }
  return isPathAbsolute && !isAbsolute(path) ? `/${path}` : path;
};
const join = function(...segments) {
  let path = "";
  for (const seg of segments) {
    if (!seg) {
      continue;
    }
    if (path.length > 0) {
      const pathTrailing = path[path.length - 1] === "/";
      const segLeading = seg[0] === "/";
      const both = pathTrailing && segLeading;
      if (both) {
        path += seg.slice(1);
      } else {
        path += pathTrailing || segLeading ? seg : `/${seg}`;
      }
    } else {
      path += seg;
    }
  }
  return normalize(path);
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ;
      else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const extname = function(p) {
  if (p === "..") return "";
  const match = _EXTNAME_RE.exec(normalizeWindowsPath(p));
  return match && match[1] || "";
};
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const intToChar = new Uint8Array(64);
const charToInt = new Uint8Array(128);
for (let i = 0; i < chars.length; i++) {
  const c = chars.charCodeAt(i);
  intToChar[i] = c;
  charToInt[c] = i;
}
var UrlType;
(function(UrlType2) {
  UrlType2[UrlType2["Empty"] = 1] = "Empty";
  UrlType2[UrlType2["Hash"] = 2] = "Hash";
  UrlType2[UrlType2["Query"] = 3] = "Query";
  UrlType2[UrlType2["RelativePath"] = 4] = "RelativePath";
  UrlType2[UrlType2["AbsolutePath"] = 5] = "AbsolutePath";
  UrlType2[UrlType2["SchemeRelative"] = 6] = "SchemeRelative";
  UrlType2[UrlType2["Absolute"] = 7] = "Absolute";
})(UrlType || (UrlType = {}));
const { now } = Date;
class ModuleMocker {
  constructor(interceptor, rpc2, spyOn, config) {
    __publicField(this, "registry", new MockerRegistry());
    __publicField(this, "queue", /* @__PURE__ */ new Set());
    __publicField(this, "mockedIds", /* @__PURE__ */ new Set());
    this.interceptor = interceptor;
    this.rpc = rpc2;
    this.spyOn = spyOn;
    this.config = config;
  }
  async prepare() {
    if (!this.queue.size) {
      return;
    }
    await Promise.all([...this.queue.values()]);
  }
  async resolveFactoryModule(id) {
    const mock = this.registry.get(id);
    if (!mock || mock.type !== "manual") {
      throw new Error(`Mock ${id} wasn't registered. This is probably a Vitest error. Please, open a new issue with reproduction.`);
    }
    const result = await mock.resolve();
    return result;
  }
  getFactoryModule(id) {
    const mock = this.registry.get(id);
    if (!mock || mock.type !== "manual") {
      throw new Error(`Mock ${id} wasn't registered. This is probably a Vitest error. Please, open a new issue with reproduction.`);
    }
    if (!mock.cache) {
      throw new Error(`Mock ${id} wasn't resolved. This is probably a Vitest error. Please, open a new issue with reproduction.`);
    }
    return mock.cache;
  }
  async invalidate() {
    const ids = Array.from(this.mockedIds);
    if (!ids.length) {
      return;
    }
    await this.rpc.invalidate(ids);
    this.interceptor.invalidate();
    this.registry.clear();
  }
  async importActual(id, importer) {
    const resolved = await this.rpc.resolveId(id, importer);
    if (resolved == null) {
      throw new Error(
        `[vitest] Cannot resolve "${id}" imported from "${importer}"`
      );
    }
    const ext = extname(resolved.id);
    const url2 = new URL(resolved.url, location.href);
    const query = `_vitest_original&ext${ext}`;
    const actualUrl = `${url2.pathname}${url2.search ? `${url2.search}&${query}` : `?${query}`}${url2.hash}`;
    return this.wrapDynamicImport(() => import(
      /* @vite-ignore */
      actualUrl
    )).then((mod) => {
      if (!resolved.optimized || typeof mod.default === "undefined") {
        return mod;
      }
      const m = mod.default;
      return (m == null ? void 0 : m.__esModule) ? m : { ...typeof m === "object" && !Array.isArray(m) || typeof m === "function" ? m : {}, default: m };
    });
  }
  async importMock(rawId, importer) {
    await this.prepare();
    const { resolvedId, resolvedUrl, redirectUrl } = await this.rpc.resolveMock(
      rawId,
      importer,
      { mock: "auto" }
    );
    const mockUrl = this.resolveMockPath(cleanVersion(resolvedUrl));
    let mock = this.registry.get(mockUrl);
    if (!mock) {
      if (redirectUrl) {
        const resolvedRedirect = new URL(this.resolveMockPath(cleanVersion(redirectUrl)), location.href).toString();
        mock = new RedirectedModule(rawId, mockUrl, resolvedRedirect);
      } else {
        mock = new AutomockedModule(rawId, mockUrl);
      }
    }
    if (mock.type === "manual") {
      return await mock.resolve();
    }
    if (mock.type === "automock" || mock.type === "autospy") {
      const url2 = new URL(`/@id/${resolvedId}`, location.href);
      const query = url2.search ? `${url2.search}&t=${now()}` : `?t=${now()}`;
      const moduleObject = await __vitePreload(() => import(
        /* @vite-ignore */
        `${url2.pathname}${query}&mock=${mock.type}${url2.hash}`
      ), true ? [] : void 0);
      return this.mockObject(moduleObject, mock.type);
    }
    return import(
      /* @vite-ignore */
      mock.redirect
    );
  }
  mockObject(object, moduleType = "automock") {
    return mockObject({
      globalConstructors: {
        Object,
        Function,
        Array,
        Map,
        RegExp
      },
      spyOn: this.spyOn,
      type: moduleType
    }, object);
  }
  queueMock(rawId, importer, factoryOrOptions) {
    const promise = this.rpc.resolveMock(rawId, importer, {
      mock: typeof factoryOrOptions === "function" ? "factory" : (factoryOrOptions == null ? void 0 : factoryOrOptions.spy) ? "spy" : "auto"
    }).then(async ({ redirectUrl, resolvedId, resolvedUrl, needsInterop, mockType }) => {
      const mockUrl = this.resolveMockPath(cleanVersion(resolvedUrl));
      this.mockedIds.add(resolvedId);
      const factory = typeof factoryOrOptions === "function" ? async () => {
        const data = await factoryOrOptions();
        return needsInterop ? { default: data } : data;
      } : void 0;
      const mockRedirect = typeof redirectUrl === "string" ? new URL(this.resolveMockPath(cleanVersion(redirectUrl)), location.href).toString() : null;
      let module;
      if (mockType === "manual") {
        module = this.registry.register("manual", rawId, mockUrl, factory);
      } else if (mockType === "autospy") {
        module = this.registry.register("autospy", rawId, mockUrl);
      } else if (mockType === "redirect") {
        module = this.registry.register("redirect", rawId, mockUrl, mockRedirect);
      } else {
        module = this.registry.register("automock", rawId, mockUrl);
      }
      await this.interceptor.register(module);
    }).finally(() => {
      this.queue.delete(promise);
    });
    this.queue.add(promise);
  }
  queueUnmock(id, importer) {
    const promise = this.rpc.resolveId(id, importer).then(async (resolved) => {
      if (!resolved) {
        return;
      }
      const mockUrl = this.resolveMockPath(cleanVersion(resolved.url));
      this.mockedIds.add(resolved.id);
      this.registry.delete(mockUrl);
      await this.interceptor.delete(mockUrl);
    }).finally(() => {
      this.queue.delete(promise);
    });
    this.queue.add(promise);
  }
  // We need to await mock registration before importing the actual module
  // In case there is a mocked module in the import chain
  wrapDynamicImport(moduleFactory) {
    if (typeof moduleFactory === "function") {
      const promise = new Promise((resolve2, reject) => {
        this.prepare().finally(() => {
          moduleFactory().then(resolve2, reject);
        });
      });
      return promise;
    }
    return moduleFactory;
  }
  resolveMockPath(path) {
    const config = this.config;
    const fsRoot = join("/@fs/", config.root);
    if (path.startsWith(config.root)) {
      return path.slice(config.root.length);
    }
    if (path.startsWith(fsRoot)) {
      return path.slice(fsRoot.length);
    }
    return path;
  }
}
const versionRegexp = /(\?|&)v=\w{8}/;
function cleanVersion(url2) {
  return url2.replace(versionRegexp, "");
}
const postfixRE = /[?#].*$/;
function cleanUrl(url2) {
  return url2.replace(postfixRE, "");
}
class ModuleMockerMSWInterceptor {
  constructor(options = {}) {
    __publicField(this, "mocks", new MockerRegistry());
    __publicField(this, "startPromise");
    __publicField(this, "worker");
    this.options = options;
    if (!options.globalThisAccessor) {
      options.globalThisAccessor = '"__vitest_mocker__"';
    }
  }
  async register(module) {
    await this.init();
    this.mocks.add(module);
  }
  async delete(url2) {
    await this.init();
    this.mocks.delete(url2);
  }
  invalidate() {
    this.mocks.clear();
  }
  async resolveManualMock(mock) {
    const exports = Object.keys(await mock.resolve());
    const module = `const module = globalThis[${this.options.globalThisAccessor}].getFactoryModule("${mock.url}");`;
    const keys = exports.map((name) => {
      if (name === "default") {
        return `export default module["default"];`;
      }
      return `export const ${name} = module["${name}"];`;
    }).join("\n");
    const text = `${module}
${keys}`;
    return new Response(text, {
      headers: {
        "Content-Type": "application/javascript"
      }
    });
  }
  async init() {
    if (this.worker) {
      return this.worker;
    }
    if (this.startPromise) {
      return this.startPromise;
    }
    const worker = this.options.mswWorker;
    this.startPromise = Promise.all([
      worker ? {
        setupWorker(handler) {
          worker.use(handler);
          return worker;
        }
      } : __vitePreload(() => import("msw/browser"), true ? [] : void 0),
      __vitePreload(() => import("msw/core/http"), true ? [] : void 0)
    ]).then(([{ setupWorker }, { http }]) => {
      const worker2 = setupWorker(
        http.get(/.+/, async ({ request }) => {
          const path = cleanQuery(request.url.slice(location.origin.length));
          if (!this.mocks.has(path)) {
            return passthrough();
          }
          const mock = this.mocks.get(path);
          switch (mock.type) {
            case "manual":
              return this.resolveManualMock(mock);
            case "automock":
            case "autospy":
              return Response.redirect(injectQuery(path, `mock=${mock.type}`));
            case "redirect":
              return Response.redirect(mock.redirect);
            default:
              throw new Error(`Unknown mock type: ${mock.type}`);
          }
        })
      );
      return worker2.start(this.options.mswOptions).then(() => worker2);
    }).finally(() => {
      this.worker = worker;
      this.startPromise = void 0;
    });
    return await this.startPromise;
  }
}
const trailingSeparatorRE = /[?&]$/;
const timestampRE = /\bt=\d{13}&?\b/;
const versionRE = /\bv=\w{8}&?\b/;
function cleanQuery(url2) {
  return url2.replace(timestampRE, "").replace(versionRE, "").replace(trailingSeparatorRE, "");
}
function passthrough() {
  return new Response(null, {
    status: 302,
    statusText: "Passthrough",
    headers: {
      "x-msw-intention": "passthrough"
    }
  });
}
const replacePercentageRE = /%/g;
function injectQuery(url2, queryToInject) {
  const resolvedUrl = new URL(
    url2.replace(replacePercentageRE, "%25"),
    location.href
  );
  const { search, hash } = resolvedUrl;
  const pathname = cleanUrl(url2);
  return `${pathname}?${queryToInject}${search ? `&${search.slice(1)}` : ""}${hash ?? ""}`;
}
class VitestBrowserClientMocker extends ModuleMocker {
  // default "vi" utility tries to access mock context to avoid circular dependencies
  getMockContext() {
    return { callstack: null };
  }
  wrapDynamicImport(moduleFactory) {
    return getBrowserState().wrapModule(moduleFactory);
  }
}
function createModuleMockerInterceptor() {
  const debug2 = getConfig().env.VITEST_BROWSER_DEBUG;
  return new ModuleMockerMSWInterceptor({
    globalThisAccessor: '"__vitest_mocker__"',
    mswOptions: {
      serviceWorker: {
        url: "/mockServiceWorker.js",
        options: {
          scope: "/"
        }
      },
      onUnhandledRequest: "bypass",
      quiet: !(debug2 && debug2 !== "false")
    }
  });
}
var traceMapping_umd$1 = { exports: {} };
var sourcemapCodec_umd$1 = { exports: {} };
var sourcemapCodec_umd = sourcemapCodec_umd$1.exports;
var hasRequiredSourcemapCodec_umd;
function requireSourcemapCodec_umd() {
  if (hasRequiredSourcemapCodec_umd) return sourcemapCodec_umd$1.exports;
  hasRequiredSourcemapCodec_umd = 1;
  (function(module, exports) {
    (function(global2, factory) {
      factory(exports);
    })(sourcemapCodec_umd, function(exports2) {
      const comma = ",".charCodeAt(0);
      const semicolon = ";".charCodeAt(0);
      const chars2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      const intToChar2 = new Uint8Array(64);
      const charToInt2 = new Uint8Array(128);
      for (let i = 0; i < chars2.length; i++) {
        const c = chars2.charCodeAt(i);
        intToChar2[i] = c;
        charToInt2[c] = i;
      }
      function decodeInteger(reader, relative) {
        let value = 0;
        let shift = 0;
        let integer = 0;
        do {
          const c = reader.next();
          integer = charToInt2[c];
          value |= (integer & 31) << shift;
          shift += 5;
        } while (integer & 32);
        const shouldNegate = value & 1;
        value >>>= 1;
        if (shouldNegate) {
          value = -2147483648 | -value;
        }
        return relative + value;
      }
      function encodeInteger(builder, num, relative) {
        let delta = num - relative;
        delta = delta < 0 ? -delta << 1 | 1 : delta << 1;
        do {
          let clamped = delta & 31;
          delta >>>= 5;
          if (delta > 0)
            clamped |= 32;
          builder.write(intToChar2[clamped]);
        } while (delta > 0);
        return num;
      }
      function hasMoreVlq(reader, max) {
        if (reader.pos >= max)
          return false;
        return reader.peek() !== comma;
      }
      const bufLength = 1024 * 16;
      const td = typeof TextDecoder !== "undefined" ? /* @__PURE__ */ new TextDecoder() : typeof Buffer !== "undefined" ? {
        decode(buf) {
          const out = Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength);
          return out.toString();
        }
      } : {
        decode(buf) {
          let out = "";
          for (let i = 0; i < buf.length; i++) {
            out += String.fromCharCode(buf[i]);
          }
          return out;
        }
      };
      class StringWriter {
        constructor() {
          this.pos = 0;
          this.out = "";
          this.buffer = new Uint8Array(bufLength);
        }
        write(v) {
          const { buffer } = this;
          buffer[this.pos++] = v;
          if (this.pos === bufLength) {
            this.out += td.decode(buffer);
            this.pos = 0;
          }
        }
        flush() {
          const { buffer, out, pos } = this;
          return pos > 0 ? out + td.decode(buffer.subarray(0, pos)) : out;
        }
      }
      class StringReader {
        constructor(buffer) {
          this.pos = 0;
          this.buffer = buffer;
        }
        next() {
          return this.buffer.charCodeAt(this.pos++);
        }
        peek() {
          return this.buffer.charCodeAt(this.pos);
        }
        indexOf(char) {
          const { buffer, pos } = this;
          const idx = buffer.indexOf(char, pos);
          return idx === -1 ? buffer.length : idx;
        }
      }
      const EMPTY = [];
      function decodeOriginalScopes(input) {
        const { length } = input;
        const reader = new StringReader(input);
        const scopes = [];
        const stack = [];
        let line = 0;
        for (; reader.pos < length; reader.pos++) {
          line = decodeInteger(reader, line);
          const column = decodeInteger(reader, 0);
          if (!hasMoreVlq(reader, length)) {
            const last = stack.pop();
            last[2] = line;
            last[3] = column;
            continue;
          }
          const kind = decodeInteger(reader, 0);
          const fields = decodeInteger(reader, 0);
          const hasName = fields & 1;
          const scope = hasName ? [line, column, 0, 0, kind, decodeInteger(reader, 0)] : [line, column, 0, 0, kind];
          let vars = EMPTY;
          if (hasMoreVlq(reader, length)) {
            vars = [];
            do {
              const varsIndex = decodeInteger(reader, 0);
              vars.push(varsIndex);
            } while (hasMoreVlq(reader, length));
          }
          scope.vars = vars;
          scopes.push(scope);
          stack.push(scope);
        }
        return scopes;
      }
      function encodeOriginalScopes(scopes) {
        const writer = new StringWriter();
        for (let i = 0; i < scopes.length; ) {
          i = _encodeOriginalScopes(scopes, i, writer, [0]);
        }
        return writer.flush();
      }
      function _encodeOriginalScopes(scopes, index, writer, state) {
        const scope = scopes[index];
        const { 0: startLine, 1: startColumn, 2: endLine, 3: endColumn, 4: kind, vars } = scope;
        if (index > 0)
          writer.write(comma);
        state[0] = encodeInteger(writer, startLine, state[0]);
        encodeInteger(writer, startColumn, 0);
        encodeInteger(writer, kind, 0);
        const fields = scope.length === 6 ? 1 : 0;
        encodeInteger(writer, fields, 0);
        if (scope.length === 6)
          encodeInteger(writer, scope[5], 0);
        for (const v of vars) {
          encodeInteger(writer, v, 0);
        }
        for (index++; index < scopes.length; ) {
          const next = scopes[index];
          const { 0: l, 1: c } = next;
          if (l > endLine || l === endLine && c >= endColumn) {
            break;
          }
          index = _encodeOriginalScopes(scopes, index, writer, state);
        }
        writer.write(comma);
        state[0] = encodeInteger(writer, endLine, state[0]);
        encodeInteger(writer, endColumn, 0);
        return index;
      }
      function decodeGeneratedRanges(input) {
        const { length } = input;
        const reader = new StringReader(input);
        const ranges = [];
        const stack = [];
        let genLine = 0;
        let definitionSourcesIndex = 0;
        let definitionScopeIndex = 0;
        let callsiteSourcesIndex = 0;
        let callsiteLine = 0;
        let callsiteColumn = 0;
        let bindingLine = 0;
        let bindingColumn = 0;
        do {
          const semi = reader.indexOf(";");
          let genColumn = 0;
          for (; reader.pos < semi; reader.pos++) {
            genColumn = decodeInteger(reader, genColumn);
            if (!hasMoreVlq(reader, semi)) {
              const last = stack.pop();
              last[2] = genLine;
              last[3] = genColumn;
              continue;
            }
            const fields = decodeInteger(reader, 0);
            const hasDefinition = fields & 1;
            const hasCallsite = fields & 2;
            const hasScope = fields & 4;
            let callsite = null;
            let bindings = EMPTY;
            let range;
            if (hasDefinition) {
              const defSourcesIndex = decodeInteger(reader, definitionSourcesIndex);
              definitionScopeIndex = decodeInteger(reader, definitionSourcesIndex === defSourcesIndex ? definitionScopeIndex : 0);
              definitionSourcesIndex = defSourcesIndex;
              range = [genLine, genColumn, 0, 0, defSourcesIndex, definitionScopeIndex];
            } else {
              range = [genLine, genColumn, 0, 0];
            }
            range.isScope = !!hasScope;
            if (hasCallsite) {
              const prevCsi = callsiteSourcesIndex;
              const prevLine = callsiteLine;
              callsiteSourcesIndex = decodeInteger(reader, callsiteSourcesIndex);
              const sameSource = prevCsi === callsiteSourcesIndex;
              callsiteLine = decodeInteger(reader, sameSource ? callsiteLine : 0);
              callsiteColumn = decodeInteger(reader, sameSource && prevLine === callsiteLine ? callsiteColumn : 0);
              callsite = [callsiteSourcesIndex, callsiteLine, callsiteColumn];
            }
            range.callsite = callsite;
            if (hasMoreVlq(reader, semi)) {
              bindings = [];
              do {
                bindingLine = genLine;
                bindingColumn = genColumn;
                const expressionsCount = decodeInteger(reader, 0);
                let expressionRanges;
                if (expressionsCount < -1) {
                  expressionRanges = [[decodeInteger(reader, 0)]];
                  for (let i = -1; i > expressionsCount; i--) {
                    const prevBl = bindingLine;
                    bindingLine = decodeInteger(reader, bindingLine);
                    bindingColumn = decodeInteger(reader, bindingLine === prevBl ? bindingColumn : 0);
                    const expression = decodeInteger(reader, 0);
                    expressionRanges.push([expression, bindingLine, bindingColumn]);
                  }
                } else {
                  expressionRanges = [[expressionsCount]];
                }
                bindings.push(expressionRanges);
              } while (hasMoreVlq(reader, semi));
            }
            range.bindings = bindings;
            ranges.push(range);
            stack.push(range);
          }
          genLine++;
          reader.pos = semi + 1;
        } while (reader.pos < length);
        return ranges;
      }
      function encodeGeneratedRanges(ranges) {
        if (ranges.length === 0)
          return "";
        const writer = new StringWriter();
        for (let i = 0; i < ranges.length; ) {
          i = _encodeGeneratedRanges(ranges, i, writer, [0, 0, 0, 0, 0, 0, 0]);
        }
        return writer.flush();
      }
      function _encodeGeneratedRanges(ranges, index, writer, state) {
        const range = ranges[index];
        const { 0: startLine, 1: startColumn, 2: endLine, 3: endColumn, isScope, callsite, bindings } = range;
        if (state[0] < startLine) {
          catchupLine(writer, state[0], startLine);
          state[0] = startLine;
          state[1] = 0;
        } else if (index > 0) {
          writer.write(comma);
        }
        state[1] = encodeInteger(writer, range[1], state[1]);
        const fields = (range.length === 6 ? 1 : 0) | (callsite ? 2 : 0) | (isScope ? 4 : 0);
        encodeInteger(writer, fields, 0);
        if (range.length === 6) {
          const { 4: sourcesIndex, 5: scopesIndex } = range;
          if (sourcesIndex !== state[2]) {
            state[3] = 0;
          }
          state[2] = encodeInteger(writer, sourcesIndex, state[2]);
          state[3] = encodeInteger(writer, scopesIndex, state[3]);
        }
        if (callsite) {
          const { 0: sourcesIndex, 1: callLine, 2: callColumn } = range.callsite;
          if (sourcesIndex !== state[4]) {
            state[5] = 0;
            state[6] = 0;
          } else if (callLine !== state[5]) {
            state[6] = 0;
          }
          state[4] = encodeInteger(writer, sourcesIndex, state[4]);
          state[5] = encodeInteger(writer, callLine, state[5]);
          state[6] = encodeInteger(writer, callColumn, state[6]);
        }
        if (bindings) {
          for (const binding of bindings) {
            if (binding.length > 1)
              encodeInteger(writer, -binding.length, 0);
            const expression = binding[0][0];
            encodeInteger(writer, expression, 0);
            let bindingStartLine = startLine;
            let bindingStartColumn = startColumn;
            for (let i = 1; i < binding.length; i++) {
              const expRange = binding[i];
              bindingStartLine = encodeInteger(writer, expRange[1], bindingStartLine);
              bindingStartColumn = encodeInteger(writer, expRange[2], bindingStartColumn);
              encodeInteger(writer, expRange[0], 0);
            }
          }
        }
        for (index++; index < ranges.length; ) {
          const next = ranges[index];
          const { 0: l, 1: c } = next;
          if (l > endLine || l === endLine && c >= endColumn) {
            break;
          }
          index = _encodeGeneratedRanges(ranges, index, writer, state);
        }
        if (state[0] < endLine) {
          catchupLine(writer, state[0], endLine);
          state[0] = endLine;
          state[1] = 0;
        } else {
          writer.write(comma);
        }
        state[1] = encodeInteger(writer, endColumn, state[1]);
        return index;
      }
      function catchupLine(writer, lastLine, line) {
        do {
          writer.write(semicolon);
        } while (++lastLine < line);
      }
      function decode(mappings) {
        const { length } = mappings;
        const reader = new StringReader(mappings);
        const decoded = [];
        let genColumn = 0;
        let sourcesIndex = 0;
        let sourceLine = 0;
        let sourceColumn = 0;
        let namesIndex = 0;
        do {
          const semi = reader.indexOf(";");
          const line = [];
          let sorted = true;
          let lastCol = 0;
          genColumn = 0;
          while (reader.pos < semi) {
            let seg;
            genColumn = decodeInteger(reader, genColumn);
            if (genColumn < lastCol)
              sorted = false;
            lastCol = genColumn;
            if (hasMoreVlq(reader, semi)) {
              sourcesIndex = decodeInteger(reader, sourcesIndex);
              sourceLine = decodeInteger(reader, sourceLine);
              sourceColumn = decodeInteger(reader, sourceColumn);
              if (hasMoreVlq(reader, semi)) {
                namesIndex = decodeInteger(reader, namesIndex);
                seg = [genColumn, sourcesIndex, sourceLine, sourceColumn, namesIndex];
              } else {
                seg = [genColumn, sourcesIndex, sourceLine, sourceColumn];
              }
            } else {
              seg = [genColumn];
            }
            line.push(seg);
            reader.pos++;
          }
          if (!sorted)
            sort(line);
          decoded.push(line);
          reader.pos = semi + 1;
        } while (reader.pos <= length);
        return decoded;
      }
      function sort(line) {
        line.sort(sortComparator);
      }
      function sortComparator(a, b) {
        return a[0] - b[0];
      }
      function encode(decoded) {
        const writer = new StringWriter();
        let sourcesIndex = 0;
        let sourceLine = 0;
        let sourceColumn = 0;
        let namesIndex = 0;
        for (let i = 0; i < decoded.length; i++) {
          const line = decoded[i];
          if (i > 0)
            writer.write(semicolon);
          if (line.length === 0)
            continue;
          let genColumn = 0;
          for (let j = 0; j < line.length; j++) {
            const segment = line[j];
            if (j > 0)
              writer.write(comma);
            genColumn = encodeInteger(writer, segment[0], genColumn);
            if (segment.length === 1)
              continue;
            sourcesIndex = encodeInteger(writer, segment[1], sourcesIndex);
            sourceLine = encodeInteger(writer, segment[2], sourceLine);
            sourceColumn = encodeInteger(writer, segment[3], sourceColumn);
            if (segment.length === 4)
              continue;
            namesIndex = encodeInteger(writer, segment[4], namesIndex);
          }
        }
        return writer.flush();
      }
      exports2.decode = decode;
      exports2.decodeGeneratedRanges = decodeGeneratedRanges;
      exports2.decodeOriginalScopes = decodeOriginalScopes;
      exports2.encode = encode;
      exports2.encodeGeneratedRanges = encodeGeneratedRanges;
      exports2.encodeOriginalScopes = encodeOriginalScopes;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  })(sourcemapCodec_umd$1, sourcemapCodec_umd$1.exports);
  return sourcemapCodec_umd$1.exports;
}
var resolveUri_umd$1 = { exports: {} };
var resolveUri_umd = resolveUri_umd$1.exports;
var hasRequiredResolveUri_umd;
function requireResolveUri_umd() {
  if (hasRequiredResolveUri_umd) return resolveUri_umd$1.exports;
  hasRequiredResolveUri_umd = 1;
  (function(module, exports) {
    (function(global2, factory) {
      module.exports = factory();
    })(resolveUri_umd, function() {
      const schemeRegex = /^[\w+.-]+:\/\//;
      const urlRegex = /^([\w+.-]+:)\/\/([^@/#?]*@)?([^:/#?]*)(:\d+)?(\/[^#?]*)?(\?[^#]*)?(#.*)?/;
      const fileRegex = /^file:(?:\/\/((?![a-z]:)[^/#?]*)?)?(\/?[^#?]*)(\?[^#]*)?(#.*)?/i;
      var UrlType2;
      (function(UrlType3) {
        UrlType3[UrlType3["Empty"] = 1] = "Empty";
        UrlType3[UrlType3["Hash"] = 2] = "Hash";
        UrlType3[UrlType3["Query"] = 3] = "Query";
        UrlType3[UrlType3["RelativePath"] = 4] = "RelativePath";
        UrlType3[UrlType3["AbsolutePath"] = 5] = "AbsolutePath";
        UrlType3[UrlType3["SchemeRelative"] = 6] = "SchemeRelative";
        UrlType3[UrlType3["Absolute"] = 7] = "Absolute";
      })(UrlType2 || (UrlType2 = {}));
      function isAbsoluteUrl(input) {
        return schemeRegex.test(input);
      }
      function isSchemeRelativeUrl(input) {
        return input.startsWith("//");
      }
      function isAbsolutePath(input) {
        return input.startsWith("/");
      }
      function isFileUrl(input) {
        return input.startsWith("file:");
      }
      function isRelative(input) {
        return /^[.?#]/.test(input);
      }
      function parseAbsoluteUrl(input) {
        const match = urlRegex.exec(input);
        return makeUrl(match[1], match[2] || "", match[3], match[4] || "", match[5] || "/", match[6] || "", match[7] || "");
      }
      function parseFileUrl(input) {
        const match = fileRegex.exec(input);
        const path = match[2];
        return makeUrl("file:", "", match[1] || "", "", isAbsolutePath(path) ? path : "/" + path, match[3] || "", match[4] || "");
      }
      function makeUrl(scheme, user, host, port, path, query, hash) {
        return {
          scheme,
          user,
          host,
          port,
          path,
          query,
          hash,
          type: UrlType2.Absolute
        };
      }
      function parseUrl(input) {
        if (isSchemeRelativeUrl(input)) {
          const url3 = parseAbsoluteUrl("http:" + input);
          url3.scheme = "";
          url3.type = UrlType2.SchemeRelative;
          return url3;
        }
        if (isAbsolutePath(input)) {
          const url3 = parseAbsoluteUrl("http://foo.com" + input);
          url3.scheme = "";
          url3.host = "";
          url3.type = UrlType2.AbsolutePath;
          return url3;
        }
        if (isFileUrl(input))
          return parseFileUrl(input);
        if (isAbsoluteUrl(input))
          return parseAbsoluteUrl(input);
        const url2 = parseAbsoluteUrl("http://foo.com/" + input);
        url2.scheme = "";
        url2.host = "";
        url2.type = input ? input.startsWith("?") ? UrlType2.Query : input.startsWith("#") ? UrlType2.Hash : UrlType2.RelativePath : UrlType2.Empty;
        return url2;
      }
      function stripPathFilename(path) {
        if (path.endsWith("/.."))
          return path;
        const index = path.lastIndexOf("/");
        return path.slice(0, index + 1);
      }
      function mergePaths(url2, base) {
        normalizePath(base, base.type);
        if (url2.path === "/") {
          url2.path = base.path;
        } else {
          url2.path = stripPathFilename(base.path) + url2.path;
        }
      }
      function normalizePath(url2, type) {
        const rel = type <= UrlType2.RelativePath;
        const pieces = url2.path.split("/");
        let pointer = 1;
        let positive = 0;
        let addTrailingSlash = false;
        for (let i = 1; i < pieces.length; i++) {
          const piece = pieces[i];
          if (!piece) {
            addTrailingSlash = true;
            continue;
          }
          addTrailingSlash = false;
          if (piece === ".")
            continue;
          if (piece === "..") {
            if (positive) {
              addTrailingSlash = true;
              positive--;
              pointer--;
            } else if (rel) {
              pieces[pointer++] = piece;
            }
            continue;
          }
          pieces[pointer++] = piece;
          positive++;
        }
        let path = "";
        for (let i = 1; i < pointer; i++) {
          path += "/" + pieces[i];
        }
        if (!path || addTrailingSlash && !path.endsWith("/..")) {
          path += "/";
        }
        url2.path = path;
      }
      function resolve2(input, base) {
        if (!input && !base)
          return "";
        const url2 = parseUrl(input);
        let inputType = url2.type;
        if (base && inputType !== UrlType2.Absolute) {
          const baseUrl = parseUrl(base);
          const baseType = baseUrl.type;
          switch (inputType) {
            case UrlType2.Empty:
              url2.hash = baseUrl.hash;
            // fall through
            case UrlType2.Hash:
              url2.query = baseUrl.query;
            // fall through
            case UrlType2.Query:
            case UrlType2.RelativePath:
              mergePaths(url2, baseUrl);
            // fall through
            case UrlType2.AbsolutePath:
              url2.user = baseUrl.user;
              url2.host = baseUrl.host;
              url2.port = baseUrl.port;
            // fall through
            case UrlType2.SchemeRelative:
              url2.scheme = baseUrl.scheme;
          }
          if (baseType > inputType)
            inputType = baseType;
        }
        normalizePath(url2, inputType);
        const queryHash = url2.query + url2.hash;
        switch (inputType) {
          // This is impossible, because of the empty checks at the start of the function.
          // case UrlType.Empty:
          case UrlType2.Hash:
          case UrlType2.Query:
            return queryHash;
          case UrlType2.RelativePath: {
            const path = url2.path.slice(1);
            if (!path)
              return queryHash || ".";
            if (isRelative(base || input) && !isRelative(path)) {
              return "./" + path + queryHash;
            }
            return path + queryHash;
          }
          case UrlType2.AbsolutePath:
            return url2.path + queryHash;
          default:
            return url2.scheme + "//" + url2.user + url2.host + url2.port + url2.path + queryHash;
        }
      }
      return resolve2;
    });
  })(resolveUri_umd$1);
  return resolveUri_umd$1.exports;
}
var traceMapping_umd = traceMapping_umd$1.exports;
var hasRequiredTraceMapping_umd;
function requireTraceMapping_umd() {
  if (hasRequiredTraceMapping_umd) return traceMapping_umd$1.exports;
  hasRequiredTraceMapping_umd = 1;
  (function(module, exports) {
    (function(global2, factory) {
      factory(exports, requireSourcemapCodec_umd(), requireResolveUri_umd());
    })(traceMapping_umd, function(exports2, sourcemapCodec, resolveUri) {
      function resolve2(input, base) {
        if (base && !base.endsWith("/"))
          base += "/";
        return resolveUri(input, base);
      }
      function stripFilename(path) {
        if (!path)
          return "";
        const index = path.lastIndexOf("/");
        return path.slice(0, index + 1);
      }
      const COLUMN = 0;
      const SOURCES_INDEX = 1;
      const SOURCE_LINE = 2;
      const SOURCE_COLUMN = 3;
      const NAMES_INDEX = 4;
      const REV_GENERATED_LINE = 1;
      const REV_GENERATED_COLUMN = 2;
      function maybeSort(mappings, owned) {
        const unsortedIndex = nextUnsortedSegmentLine(mappings, 0);
        if (unsortedIndex === mappings.length)
          return mappings;
        if (!owned)
          mappings = mappings.slice();
        for (let i = unsortedIndex; i < mappings.length; i = nextUnsortedSegmentLine(mappings, i + 1)) {
          mappings[i] = sortSegments(mappings[i], owned);
        }
        return mappings;
      }
      function nextUnsortedSegmentLine(mappings, start) {
        for (let i = start; i < mappings.length; i++) {
          if (!isSorted(mappings[i]))
            return i;
        }
        return mappings.length;
      }
      function isSorted(line) {
        for (let j = 1; j < line.length; j++) {
          if (line[j][COLUMN] < line[j - 1][COLUMN]) {
            return false;
          }
        }
        return true;
      }
      function sortSegments(line, owned) {
        if (!owned)
          line = line.slice();
        return line.sort(sortComparator);
      }
      function sortComparator(a, b) {
        return a[COLUMN] - b[COLUMN];
      }
      let found = false;
      function binarySearch(haystack, needle, low, high) {
        while (low <= high) {
          const mid = low + (high - low >> 1);
          const cmp = haystack[mid][COLUMN] - needle;
          if (cmp === 0) {
            found = true;
            return mid;
          }
          if (cmp < 0) {
            low = mid + 1;
          } else {
            high = mid - 1;
          }
        }
        found = false;
        return low - 1;
      }
      function upperBound(haystack, needle, index) {
        for (let i = index + 1; i < haystack.length; index = i++) {
          if (haystack[i][COLUMN] !== needle)
            break;
        }
        return index;
      }
      function lowerBound(haystack, needle, index) {
        for (let i = index - 1; i >= 0; index = i--) {
          if (haystack[i][COLUMN] !== needle)
            break;
        }
        return index;
      }
      function memoizedState() {
        return {
          lastKey: -1,
          lastNeedle: -1,
          lastIndex: -1
        };
      }
      function memoizedBinarySearch(haystack, needle, state, key) {
        const { lastKey, lastNeedle, lastIndex } = state;
        let low = 0;
        let high = haystack.length - 1;
        if (key === lastKey) {
          if (needle === lastNeedle) {
            found = lastIndex !== -1 && haystack[lastIndex][COLUMN] === needle;
            return lastIndex;
          }
          if (needle >= lastNeedle) {
            low = lastIndex === -1 ? 0 : lastIndex;
          } else {
            high = lastIndex;
          }
        }
        state.lastKey = key;
        state.lastNeedle = needle;
        return state.lastIndex = binarySearch(haystack, needle, low, high);
      }
      function buildBySources(decoded, memos) {
        const sources = memos.map(buildNullArray);
        for (let i = 0; i < decoded.length; i++) {
          const line = decoded[i];
          for (let j = 0; j < line.length; j++) {
            const seg = line[j];
            if (seg.length === 1)
              continue;
            const sourceIndex2 = seg[SOURCES_INDEX];
            const sourceLine = seg[SOURCE_LINE];
            const sourceColumn = seg[SOURCE_COLUMN];
            const originalSource = sources[sourceIndex2];
            const originalLine = originalSource[sourceLine] || (originalSource[sourceLine] = []);
            const memo = memos[sourceIndex2];
            let index = upperBound(originalLine, sourceColumn, memoizedBinarySearch(originalLine, sourceColumn, memo, sourceLine));
            memo.lastIndex = ++index;
            insert(originalLine, index, [sourceColumn, i, seg[COLUMN]]);
          }
        }
        return sources;
      }
      function insert(array, index, value) {
        for (let i = array.length; i > index; i--) {
          array[i] = array[i - 1];
        }
        array[index] = value;
      }
      function buildNullArray() {
        return { __proto__: null };
      }
      const AnyMap = function(map, mapUrl) {
        const parsed = parse(map);
        if (!("sections" in parsed)) {
          return new TraceMap2(parsed, mapUrl);
        }
        const mappings = [];
        const sources = [];
        const sourcesContent = [];
        const names = [];
        const ignoreList = [];
        recurse(parsed, mapUrl, mappings, sources, sourcesContent, names, ignoreList, 0, 0, Infinity, Infinity);
        const joined = {
          version: 3,
          file: parsed.file,
          names,
          sources,
          sourcesContent,
          mappings,
          ignoreList
        };
        return presortedDecodedMap(joined);
      };
      function parse(map) {
        return typeof map === "string" ? JSON.parse(map) : map;
      }
      function recurse(input, mapUrl, mappings, sources, sourcesContent, names, ignoreList, lineOffset, columnOffset, stopLine, stopColumn) {
        const { sections } = input;
        for (let i = 0; i < sections.length; i++) {
          const { map, offset } = sections[i];
          let sl = stopLine;
          let sc = stopColumn;
          if (i + 1 < sections.length) {
            const nextOffset = sections[i + 1].offset;
            sl = Math.min(stopLine, lineOffset + nextOffset.line);
            if (sl === stopLine) {
              sc = Math.min(stopColumn, columnOffset + nextOffset.column);
            } else if (sl < stopLine) {
              sc = columnOffset + nextOffset.column;
            }
          }
          addSection(map, mapUrl, mappings, sources, sourcesContent, names, ignoreList, lineOffset + offset.line, columnOffset + offset.column, sl, sc);
        }
      }
      function addSection(input, mapUrl, mappings, sources, sourcesContent, names, ignoreList, lineOffset, columnOffset, stopLine, stopColumn) {
        const parsed = parse(input);
        if ("sections" in parsed)
          return recurse(...arguments);
        const map = new TraceMap2(parsed, mapUrl);
        const sourcesOffset = sources.length;
        const namesOffset = names.length;
        const decoded = decodedMappings(map);
        const { resolvedSources, sourcesContent: contents, ignoreList: ignores } = map;
        append(sources, resolvedSources);
        append(names, map.names);
        if (contents)
          append(sourcesContent, contents);
        else
          for (let i = 0; i < resolvedSources.length; i++)
            sourcesContent.push(null);
        if (ignores)
          for (let i = 0; i < ignores.length; i++)
            ignoreList.push(ignores[i] + sourcesOffset);
        for (let i = 0; i < decoded.length; i++) {
          const lineI = lineOffset + i;
          if (lineI > stopLine)
            return;
          const out = getLine(mappings, lineI);
          const cOffset = i === 0 ? columnOffset : 0;
          const line = decoded[i];
          for (let j = 0; j < line.length; j++) {
            const seg = line[j];
            const column = cOffset + seg[COLUMN];
            if (lineI === stopLine && column >= stopColumn)
              return;
            if (seg.length === 1) {
              out.push([column]);
              continue;
            }
            const sourcesIndex = sourcesOffset + seg[SOURCES_INDEX];
            const sourceLine = seg[SOURCE_LINE];
            const sourceColumn = seg[SOURCE_COLUMN];
            out.push(seg.length === 4 ? [column, sourcesIndex, sourceLine, sourceColumn] : [column, sourcesIndex, sourceLine, sourceColumn, namesOffset + seg[NAMES_INDEX]]);
          }
        }
      }
      function append(arr, other) {
        for (let i = 0; i < other.length; i++)
          arr.push(other[i]);
      }
      function getLine(arr, index) {
        for (let i = arr.length; i <= index; i++)
          arr[i] = [];
        return arr[index];
      }
      const LINE_GTR_ZERO = "`line` must be greater than 0 (lines start at line 1)";
      const COL_GTR_EQ_ZERO = "`column` must be greater than or equal to 0 (columns start at column 0)";
      const LEAST_UPPER_BOUND = -1;
      const GREATEST_LOWER_BOUND = 1;
      class TraceMap2 {
        constructor(map, mapUrl) {
          const isString = typeof map === "string";
          if (!isString && map._decodedMemo)
            return map;
          const parsed = isString ? JSON.parse(map) : map;
          const { version, file, names, sourceRoot, sources, sourcesContent } = parsed;
          this.version = version;
          this.file = file;
          this.names = names || [];
          this.sourceRoot = sourceRoot;
          this.sources = sources;
          this.sourcesContent = sourcesContent;
          this.ignoreList = parsed.ignoreList || parsed.x_google_ignoreList || void 0;
          const from = resolve2(sourceRoot || "", stripFilename(mapUrl));
          this.resolvedSources = sources.map((s) => resolve2(s || "", from));
          const { mappings } = parsed;
          if (typeof mappings === "string") {
            this._encoded = mappings;
            this._decoded = void 0;
          } else {
            this._encoded = void 0;
            this._decoded = maybeSort(mappings, isString);
          }
          this._decodedMemo = memoizedState();
          this._bySources = void 0;
          this._bySourceMemos = void 0;
        }
      }
      function cast(map) {
        return map;
      }
      function encodedMappings(map) {
        var _a;
        var _b;
        return (_a = (_b = cast(map))._encoded) !== null && _a !== void 0 ? _a : _b._encoded = sourcemapCodec.encode(cast(map)._decoded);
      }
      function decodedMappings(map) {
        var _a;
        return (_a = cast(map))._decoded || (_a._decoded = sourcemapCodec.decode(cast(map)._encoded));
      }
      function traceSegment(map, line, column) {
        const decoded = decodedMappings(map);
        if (line >= decoded.length)
          return null;
        const segments = decoded[line];
        const index = traceSegmentInternal(segments, cast(map)._decodedMemo, line, column, GREATEST_LOWER_BOUND);
        return index === -1 ? null : segments[index];
      }
      function originalPositionFor2(map, needle) {
        let { line, column, bias } = needle;
        line--;
        if (line < 0)
          throw new Error(LINE_GTR_ZERO);
        if (column < 0)
          throw new Error(COL_GTR_EQ_ZERO);
        const decoded = decodedMappings(map);
        if (line >= decoded.length)
          return OMapping(null, null, null, null);
        const segments = decoded[line];
        const index = traceSegmentInternal(segments, cast(map)._decodedMemo, line, column, bias || GREATEST_LOWER_BOUND);
        if (index === -1)
          return OMapping(null, null, null, null);
        const segment = segments[index];
        if (segment.length === 1)
          return OMapping(null, null, null, null);
        const { names, resolvedSources } = map;
        return OMapping(resolvedSources[segment[SOURCES_INDEX]], segment[SOURCE_LINE] + 1, segment[SOURCE_COLUMN], segment.length === 5 ? names[segment[NAMES_INDEX]] : null);
      }
      function generatedPositionFor(map, needle) {
        const { source: source2, line, column, bias } = needle;
        return generatedPosition(map, source2, line, column, bias || GREATEST_LOWER_BOUND, false);
      }
      function allGeneratedPositionsFor(map, needle) {
        const { source: source2, line, column, bias } = needle;
        return generatedPosition(map, source2, line, column, bias || LEAST_UPPER_BOUND, true);
      }
      function eachMapping(map, cb) {
        const decoded = decodedMappings(map);
        const { names, resolvedSources } = map;
        for (let i = 0; i < decoded.length; i++) {
          const line = decoded[i];
          for (let j = 0; j < line.length; j++) {
            const seg = line[j];
            const generatedLine = i + 1;
            const generatedColumn = seg[0];
            let source2 = null;
            let originalLine = null;
            let originalColumn = null;
            let name = null;
            if (seg.length !== 1) {
              source2 = resolvedSources[seg[1]];
              originalLine = seg[2] + 1;
              originalColumn = seg[3];
            }
            if (seg.length === 5)
              name = names[seg[4]];
            cb({
              generatedLine,
              generatedColumn,
              source: source2,
              originalLine,
              originalColumn,
              name
            });
          }
        }
      }
      function sourceIndex(map, source2) {
        const { sources, resolvedSources } = map;
        let index = sources.indexOf(source2);
        if (index === -1)
          index = resolvedSources.indexOf(source2);
        return index;
      }
      function sourceContentFor(map, source2) {
        const { sourcesContent } = map;
        if (sourcesContent == null)
          return null;
        const index = sourceIndex(map, source2);
        return index === -1 ? null : sourcesContent[index];
      }
      function isIgnored(map, source2) {
        const { ignoreList } = map;
        if (ignoreList == null)
          return false;
        const index = sourceIndex(map, source2);
        return index === -1 ? false : ignoreList.includes(index);
      }
      function presortedDecodedMap(map, mapUrl) {
        const tracer = new TraceMap2(clone(map, []), mapUrl);
        cast(tracer)._decoded = map.mappings;
        return tracer;
      }
      function decodedMap(map) {
        return clone(map, decodedMappings(map));
      }
      function encodedMap(map) {
        return clone(map, encodedMappings(map));
      }
      function clone(map, mappings) {
        return {
          version: map.version,
          file: map.file,
          names: map.names,
          sourceRoot: map.sourceRoot,
          sources: map.sources,
          sourcesContent: map.sourcesContent,
          mappings,
          ignoreList: map.ignoreList || map.x_google_ignoreList
        };
      }
      function OMapping(source2, line, column, name) {
        return { source: source2, line, column, name };
      }
      function GMapping(line, column) {
        return { line, column };
      }
      function traceSegmentInternal(segments, memo, line, column, bias) {
        let index = memoizedBinarySearch(segments, column, memo, line);
        if (found) {
          index = (bias === LEAST_UPPER_BOUND ? upperBound : lowerBound)(segments, column, index);
        } else if (bias === LEAST_UPPER_BOUND)
          index++;
        if (index === -1 || index === segments.length)
          return -1;
        return index;
      }
      function sliceGeneratedPositions(segments, memo, line, column, bias) {
        let min = traceSegmentInternal(segments, memo, line, column, GREATEST_LOWER_BOUND);
        if (!found && bias === LEAST_UPPER_BOUND)
          min++;
        if (min === -1 || min === segments.length)
          return [];
        const matchedColumn = found ? column : segments[min][COLUMN];
        if (!found)
          min = lowerBound(segments, matchedColumn, min);
        const max = upperBound(segments, matchedColumn, min);
        const result = [];
        for (; min <= max; min++) {
          const segment = segments[min];
          result.push(GMapping(segment[REV_GENERATED_LINE] + 1, segment[REV_GENERATED_COLUMN]));
        }
        return result;
      }
      function generatedPosition(map, source2, line, column, bias, all) {
        var _a;
        line--;
        if (line < 0)
          throw new Error(LINE_GTR_ZERO);
        if (column < 0)
          throw new Error(COL_GTR_EQ_ZERO);
        const { sources, resolvedSources } = map;
        let sourceIndex2 = sources.indexOf(source2);
        if (sourceIndex2 === -1)
          sourceIndex2 = resolvedSources.indexOf(source2);
        if (sourceIndex2 === -1)
          return all ? [] : GMapping(null, null);
        const generated = (_a = cast(map))._bySources || (_a._bySources = buildBySources(decodedMappings(map), cast(map)._bySourceMemos = sources.map(memoizedState)));
        const segments = generated[sourceIndex2][line];
        if (segments == null)
          return all ? [] : GMapping(null, null);
        const memo = cast(map)._bySourceMemos[sourceIndex2];
        if (all)
          return sliceGeneratedPositions(segments, memo, line, column, bias);
        const index = traceSegmentInternal(segments, memo, line, column, bias);
        if (index === -1)
          return GMapping(null, null);
        const segment = segments[index];
        return GMapping(segment[REV_GENERATED_LINE] + 1, segment[REV_GENERATED_COLUMN]);
      }
      exports2.AnyMap = AnyMap;
      exports2.GREATEST_LOWER_BOUND = GREATEST_LOWER_BOUND;
      exports2.LEAST_UPPER_BOUND = LEAST_UPPER_BOUND;
      exports2.TraceMap = TraceMap2;
      exports2.allGeneratedPositionsFor = allGeneratedPositionsFor;
      exports2.decodedMap = decodedMap;
      exports2.decodedMappings = decodedMappings;
      exports2.eachMapping = eachMapping;
      exports2.encodedMap = encodedMap;
      exports2.encodedMappings = encodedMappings;
      exports2.generatedPositionFor = generatedPositionFor;
      exports2.isIgnored = isIgnored;
      exports2.originalPositionFor = originalPositionFor2;
      exports2.presortedDecodedMap = presortedDecodedMap;
      exports2.sourceContentFor = sourceContentFor;
      exports2.traceSegment = traceSegment;
    });
  })(traceMapping_umd$1, traceMapping_umd$1.exports);
  return traceMapping_umd$1.exports;
}
var traceMapping_umdExports = requireTraceMapping_umd();
function notNullish(v) {
  return v != null;
}
const CHROME_IE_STACK_REGEXP = /^\s*at .*(?:\S:\d+|\(native\))/m;
const SAFARI_NATIVE_CODE_REGEXP = /^(?:eval@)?(?:\[native code\])?$/;
const stackIgnorePatterns = [
  "node:internal",
  /\/packages\/\w+\/dist\//,
  /\/@vitest\/\w+\/dist\//,
  "/vitest/dist/",
  "/vitest/src/",
  "/vite-node/dist/",
  "/vite-node/src/",
  "/node_modules/chai/",
  "/node_modules/tinypool/",
  "/node_modules/tinyspy/",
  // browser related deps
  "/deps/chunk-",
  "/deps/@vitest",
  "/deps/loupe",
  "/deps/chai",
  /node:\w+/,
  /__vitest_test__/,
  /__vitest_browser__/,
  /\/deps\/vitest_/
];
function extractLocation(urlLike) {
  if (!urlLike.includes(":")) {
    return [urlLike];
  }
  const regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/;
  const parts = regExp.exec(urlLike.replace(/^\(|\)$/g, ""));
  if (!parts) {
    return [urlLike];
  }
  let url2 = parts[1];
  if (url2.startsWith("async ")) {
    url2 = url2.slice(6);
  }
  if (url2.startsWith("http:") || url2.startsWith("https:")) {
    const urlObj = new URL(url2);
    urlObj.searchParams.delete("import");
    urlObj.searchParams.delete("browserv");
    url2 = urlObj.pathname + urlObj.hash + urlObj.search;
  }
  if (url2.startsWith("/@fs/")) {
    const isWindows = /^\/@fs\/[a-zA-Z]:\//.test(url2);
    url2 = url2.slice(isWindows ? 5 : 4);
  }
  return [url2, parts[2] || void 0, parts[3] || void 0];
}
function parseSingleFFOrSafariStack(raw) {
  let line = raw.trim();
  if (SAFARI_NATIVE_CODE_REGEXP.test(line)) {
    return null;
  }
  if (line.includes(" > eval")) {
    line = line.replace(
      / line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,
      ":$1"
    );
  }
  if (!line.includes("@") && !line.includes(":")) {
    return null;
  }
  const functionNameRegex = /((.*".+"[^@]*)?[^@]*)(@)/;
  const matches2 = line.match(functionNameRegex);
  const functionName = matches2 && matches2[1] ? matches2[1] : void 0;
  const [url2, lineNumber, columnNumber] = extractLocation(
    line.replace(functionNameRegex, "")
  );
  if (!url2 || !lineNumber || !columnNumber) {
    return null;
  }
  return {
    file: url2,
    method: functionName || "",
    line: Number.parseInt(lineNumber),
    column: Number.parseInt(columnNumber)
  };
}
function parseSingleV8Stack(raw) {
  let line = raw.trim();
  if (!CHROME_IE_STACK_REGEXP.test(line)) {
    return null;
  }
  if (line.includes("(eval ")) {
    line = line.replace(/eval code/g, "eval").replace(/(\(eval at [^()]*)|(,.*$)/g, "");
  }
  let sanitizedLine = line.replace(/^\s+/, "").replace(/\(eval code/g, "(").replace(/^.*?\s+/, "");
  const location2 = sanitizedLine.match(/ (\(.+\)$)/);
  sanitizedLine = location2 ? sanitizedLine.replace(location2[0], "") : sanitizedLine;
  const [url2, lineNumber, columnNumber] = extractLocation(
    location2 ? location2[1] : sanitizedLine
  );
  let method = location2 && sanitizedLine || "";
  let file = url2 && ["eval", "<anonymous>"].includes(url2) ? void 0 : url2;
  if (!file || !lineNumber || !columnNumber) {
    return null;
  }
  if (method.startsWith("async ")) {
    method = method.slice(6);
  }
  if (file.startsWith("file://")) {
    file = file.slice(7);
  }
  file = file.startsWith("node:") || file.startsWith("internal:") ? file : resolve(file);
  if (method) {
    method = method.replace(/__vite_ssr_import_\d+__\./g, "");
  }
  return {
    method,
    file,
    line: Number.parseInt(lineNumber),
    column: Number.parseInt(columnNumber)
  };
}
function createStackString(stacks) {
  return stacks.map((stack) => {
    const line = `${stack.file}:${stack.line}:${stack.column}`;
    if (stack.method) {
      return `    at ${stack.method}(${line})`;
    }
    return `    at ${line}`;
  }).join("\n");
}
function parseStacktrace(stack, options = {}) {
  const { ignoreStackEntries = stackIgnorePatterns } = options;
  const stacks = !CHROME_IE_STACK_REGEXP.test(stack) ? parseFFOrSafariStackTrace(stack) : parseV8Stacktrace(stack);
  return stacks.map((stack2) => {
    var _a;
    if (options.getUrlId) {
      stack2.file = options.getUrlId(stack2.file);
    }
    const map = (_a = options.getSourceMap) == null ? void 0 : _a.call(options, stack2.file);
    if (!map || typeof map !== "object" || !map.version) {
      return shouldFilter(ignoreStackEntries, stack2.file) ? null : stack2;
    }
    const traceMap = new traceMapping_umdExports.TraceMap(map);
    const { line, column, source: source2, name } = traceMapping_umdExports.originalPositionFor(traceMap, stack2);
    let file = stack2.file;
    if (source2) {
      const fileUrl = stack2.file.startsWith("file://") ? stack2.file : `file://${stack2.file}`;
      const sourceRootUrl = map.sourceRoot ? new URL(map.sourceRoot, fileUrl) : fileUrl;
      file = new URL(source2, sourceRootUrl).pathname;
    }
    if (shouldFilter(ignoreStackEntries, file)) {
      return null;
    }
    if (line != null && column != null) {
      return {
        line,
        column,
        file,
        method: name || stack2.method
      };
    }
    return stack2;
  }).filter((s) => s != null);
}
function shouldFilter(ignoreStackEntries, file) {
  return ignoreStackEntries.some((p) => file.match(p));
}
function parseFFOrSafariStackTrace(stack) {
  return stack.split("\n").map((line) => parseSingleFFOrSafariStack(line)).filter(notNullish);
}
function parseV8Stacktrace(stack) {
  return stack.split("\n").map((line) => parseSingleV8Stack(line)).filter(notNullish);
}
class VitestBrowserSnapshotEnvironment {
  constructor() {
    __publicField(this, "sourceMaps", /* @__PURE__ */ new Map());
    __publicField(this, "traceMaps", /* @__PURE__ */ new Map());
  }
  addSourceMap(filepath, map) {
    this.sourceMaps.set(filepath, map);
  }
  getVersion() {
    return "1";
  }
  getHeader() {
    return `// Vitest Snapshot v${this.getVersion()}, https://vitest.dev/guide/snapshot.html`;
  }
  readSnapshotFile(filepath) {
    return rpc().readSnapshotFile(filepath);
  }
  saveSnapshotFile(filepath, snapshot) {
    return rpc().saveSnapshotFile(filepath, snapshot);
  }
  resolvePath(filepath) {
    return rpc().resolveSnapshotPath(filepath);
  }
  resolveRawPath(testPath, rawPath) {
    return rpc().resolveSnapshotRawPath(testPath, rawPath);
  }
  removeSnapshotFile(filepath) {
    return rpc().removeSnapshotFile(filepath);
  }
  processStackTrace(stack) {
    const map = this.sourceMaps.get(stack.file);
    if (!map) {
      return stack;
    }
    let traceMap = this.traceMaps.get(stack.file);
    if (!traceMap) {
      traceMap = new TraceMap(map);
      this.traceMaps.set(stack.file, traceMap);
    }
    const { line, column } = originalPositionFor(traceMap, stack);
    if (line != null && column != null) {
      return { ...stack, line, column };
    }
    return stack;
  }
}
function rpc() {
  return globalThis.__vitest_worker__.rpc;
}
const browserHashMap = /* @__PURE__ */ new Map();
function createBrowserRunner(runnerClass, mocker, state, coverageModule) {
  return class BrowserTestRunner extends runnerClass {
    constructor(options) {
      super(options.config);
      __publicField(this, "config");
      __publicField(this, "hashMap", browserHashMap);
      __publicField(this, "sourceMapCache", /* @__PURE__ */ new Map());
      __publicField(this, "onBeforeTryTask", async (...args) => {
        var _a;
        await userEvent.cleanup();
        await ((_a = super.onBeforeTryTask) == null ? void 0 : _a.call(this, ...args));
      });
      __publicField(this, "onAfterRunTask", async (task) => {
        var _a, _b;
        await ((_a = super.onAfterRunTask) == null ? void 0 : _a.call(this, task));
        if (this.config.bail && ((_b = task.result) == null ? void 0 : _b.state) === "fail") {
          const previousFailures = await rpc$1().getCountOfFailedTests();
          const currentFailures = 1 + previousFailures;
          if (currentFailures >= this.config.bail) {
            rpc$1().onCancel("test-failure");
            this.onCancel("test-failure");
          }
        }
      });
      __publicField(this, "onTaskFinished", async (task) => {
        var _a;
        if (this.config.browser.screenshotFailures && document.body.clientHeight > 0 && ((_a = task.result) == null ? void 0 : _a.state) === "fail") {
          const screenshot = await page.screenshot().catch((err) => {
            console.error("[vitest] Failed to take a screenshot", err);
          });
          if (screenshot) {
            task.meta.failScreenshotPath = screenshot;
          }
        }
      });
      __publicField(this, "onCancel", (reason) => {
        var _a;
        (_a = super.onCancel) == null ? void 0 : _a.call(this, reason);
        globalChannel.postMessage({ type: "cancel", reason });
      });
      __publicField(this, "onBeforeRunSuite", async (suite) => {
        var _a;
        await Promise.all([
          (_a = super.onBeforeRunSuite) == null ? void 0 : _a.call(this, suite),
          (async () => {
            if ("filepath" in suite) {
              const map = await rpc$1().getBrowserFileSourceMap(suite.filepath);
              this.sourceMapCache.set(suite.filepath, map);
              const snapshotEnvironment = this.config.snapshotOptions.snapshotEnvironment;
              if (snapshotEnvironment instanceof VitestBrowserSnapshotEnvironment) {
                snapshotEnvironment.addSourceMap(suite.filepath, map);
              }
            }
          })()
        ]);
      });
      __publicField(this, "onAfterRunFiles", async (files) => {
        var _a, _b;
        const [coverage] = await Promise.all([
          (_a = coverageModule == null ? void 0 : coverageModule.takeCoverage) == null ? void 0 : _a.call(coverageModule),
          mocker.invalidate(),
          (_b = super.onAfterRunFiles) == null ? void 0 : _b.call(this, files)
        ]);
        if (coverage) {
          await rpc$1().onAfterSuiteRun({
            coverage,
            testFiles: files.map((file) => file.name),
            transformMode: "browser",
            projectName: this.config.name
          });
        }
      });
      __publicField(this, "onCollectStart", (file) => {
        return rpc$1().onQueued(file);
      });
      __publicField(this, "onCollected", async (files) => {
        files.forEach((file) => {
          file.prepareDuration = state.durations.prepare;
          file.environmentLoad = state.durations.environment;
          state.durations.prepare = 0;
          state.durations.environment = 0;
        });
        if (this.config.includeTaskLocation) {
          try {
            await updateFilesLocations(files, this.sourceMapCache);
          } catch {
          }
        }
        return rpc$1().onCollected(files);
      });
      __publicField(this, "onTaskUpdate", (task, events) => {
        return rpc$1().onTaskUpdate(task, events);
      });
      __publicField(this, "importFile", async (filepath) => {
        let hash = this.hashMap.get(filepath);
        if (!hash) {
          hash = Date.now().toString();
          this.hashMap.set(filepath, hash);
        }
        const prefix = `/${/^\w:/.test(filepath) ? "@fs/" : ""}`;
        const query = `browserv=${hash}`;
        const importpath = `${prefix}${filepath}?${query}`.replace(/\/+/g, "/");
        await import(
          /* @vite-ignore */
          importpath
        );
      });
      this.config = options.config;
    }
  };
}
let cachedRunner = null;
async function initiateRunner(state, mocker, config) {
  if (cachedRunner) {
    return cachedRunner;
  }
  const runnerClass = config.mode === "test" ? VitestTestRunner : NodeBenchmarkRunner;
  const BrowserRunner = createBrowserRunner(runnerClass, mocker, state, {
    takeCoverage: () => takeCoverageInsideWorker(config.coverage, executor)
  });
  if (!config.snapshotOptions.snapshotEnvironment) {
    config.snapshotOptions.snapshotEnvironment = new VitestBrowserSnapshotEnvironment();
  }
  const runner = new BrowserRunner({
    config
  });
  const [diffOptions] = await Promise.all([
    loadDiffConfig(config, executor),
    loadSnapshotSerializers(config, executor)
  ]);
  runner.config.diffOptions = diffOptions;
  cachedRunner = runner;
  getWorkerState().onFilterStackTrace = (stack) => {
    const stacks = parseStacktrace(stack, {
      getSourceMap(file) {
        return runner.sourceMapCache.get(file);
      }
    });
    return createStackString(stacks);
  };
  return runner;
}
async function updateFilesLocations(files, sourceMaps) {
  const promises2 = files.map(async (file) => {
    const result = sourceMaps.get(file.filepath) || await rpc$1().getBrowserFileSourceMap(file.filepath);
    if (!result) {
      return null;
    }
    const traceMap = new TraceMap(result);
    function updateLocation(task) {
      if (task.location) {
        const { line, column } = originalPositionFor(traceMap, task.location);
        if (line != null && column != null) {
          task.location = { line, column: task.each ? column : column + 1 };
        }
      }
      if ("tasks" in task) {
        task.tasks.forEach(updateLocation);
      }
    }
    file.tasks.forEach(updateLocation);
    return null;
  });
  await Promise.all(promises2);
}
const cleanupSymbol = Symbol.for("vitest:component-cleanup");
const url = new URL(location.href);
const reloadStart = url.searchParams.get("__reloadStart");
function debug(...args) {
  const debug2 = getConfig().env.VITEST_BROWSER_DEBUG;
  if (debug2 && debug2 !== "false") {
    client.rpc.debug(...args.map(String));
  }
}
async function prepareTestEnvironment(files) {
  debug("trying to resolve runner", `${reloadStart}`);
  const config = getConfig();
  const rpc2 = createSafeRpc(client);
  const state = getWorkerState();
  state.ctx.files = files;
  state.onCancel = onCancel;
  state.rpc = rpc2;
  getBrowserState().commands = new CommandsManager();
  const interceptor = createModuleMockerInterceptor();
  const mocker = new VitestBrowserClientMocker(
    interceptor,
    rpc2,
    SpyModule.spyOn,
    {
      root: getBrowserState().viteConfig.root
    }
  );
  globalThis.__vitest_mocker__ = mocker;
  setupConsoleLogSpy();
  setupDialogsSpy();
  setupExpectDom();
  const runner = await initiateRunner(state, mocker, config);
  const version = url.searchParams.get("browserv") || "";
  files.forEach((filename) => {
    const currentVersion = browserHashMap.get(filename);
    if (!currentVersion || currentVersion[1] !== version) {
      browserHashMap.set(filename, version);
    }
  });
  onCancel.then((reason) => {
    var _a;
    (_a = runner.onCancel) == null ? void 0 : _a.call(runner, reason);
  });
  return {
    runner,
    config,
    state,
    rpc: rpc2,
    commands: getBrowserState().commands
  };
}
function done(files) {
  channel.postMessage({
    type: "done",
    filenames: files,
    id: getBrowserState().iframeId
  });
}
async function executeTests(method, files) {
  await client.waitForConnection();
  debug("client is connected to ws server");
  let preparedData;
  try {
    preparedData = await prepareTestEnvironment(files);
  } catch (error) {
    debug("runner cannot be loaded because it threw an error", error.stack || error.message);
    await client.rpc.onUnhandledError({
      name: error.name,
      message: error.message,
      stack: String(error.stack)
    }, "Preload Error");
    done(files);
    return;
  }
  if (!preparedData) {
    debug("page is reloading, waiting for the next run");
    return;
  }
  debug("runner resolved successfully");
  const { config, runner, state, commands, rpc: rpc2 } = preparedData;
  state.durations.prepare = performance.now() - state.durations.prepare;
  debug("prepare time", state.durations.prepare, "ms");
  let contextSwitched = false;
  if (server.provider === "webdriverio") {
    let switchPromise = null;
    commands.onCommand(async () => {
      if (switchPromise) {
        await switchPromise;
      }
      if (!contextSwitched) {
        switchPromise = rpc2.wdioSwitchContext("iframe").finally(() => {
          switchPromise = null;
          contextSwitched = true;
        });
        await switchPromise;
      }
    });
  }
  try {
    await Promise.all([
      setupCommonEnv(config),
      startCoverageInsideWorker(config.coverage, executor, { isolate: config.browser.isolate }),
      (async () => {
        const VitestIndex = await __vitePreload(() => import("vitest"), true ? [] : void 0);
        Object.defineProperty(window, "__vitest_index__", {
          value: VitestIndex,
          enumerable: false
        });
      })()
    ]);
    for (const file of files) {
      state.filepath = file;
      if (method === "run") {
        await startTests([file], runner);
      } else {
        await collectTests([file], runner);
      }
    }
  } finally {
    try {
      if (cleanupSymbol in page) {
        page[cleanupSymbol]();
      }
      await userEvent.cleanup();
      if (contextSwitched) {
        await rpc2.wdioSwitchContext("parent");
      }
    } catch (error) {
      await client.rpc.onUnhandledError({
        name: error.name,
        message: error.message,
        stack: String(error.stack)
      }, "Cleanup Error");
    }
    state.environmentTeardownRun = true;
    await stopCoverageInsideWorker(config.coverage, executor, { isolate: config.browser.isolate }).catch((error) => {
      client.rpc.onUnhandledError({
        name: error.name,
        message: error.message,
        stack: String(error.stack)
      }, "Coverage Error").catch(() => {
      });
    });
    debug("finished running tests");
    done(files);
  }
}
window.__vitest_browser_runner__.runTests = (files) => executeTests("run", files);
window.__vitest_browser_runner__.collectTests = (files) => executeTests("collect", files);
