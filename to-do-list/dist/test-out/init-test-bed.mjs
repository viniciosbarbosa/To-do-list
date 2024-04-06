import {
  APP_ID,
  BrowserDomAdapter,
  BrowserModule,
  COMPILER_OPTIONS,
  Compiler,
  CompilerFactory,
  DOCUMENT,
  EventEmitter,
  FactoryTarget,
  INTERNAL_BROWSER_PLATFORM_PROVIDERS,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  LocationStrategy,
  MissingTranslationStrategy,
  NgModule,
  Optional,
  PLATFORM_BROWSER_ID,
  PLATFORM_ID,
  PLATFORM_INITIALIZER,
  PlatformLocation,
  Subject,
  TestComponentRenderer,
  Version,
  ViewEncapsulation$1,
  core_exports,
  createPlatformFactory,
  getDOM,
  getTestBed,
  platformCore,
  provideZoneChangeDetection,
  ɵɵngDeclareClassMetadata,
  ɵɵngDeclareFactory,
  ɵɵngDeclareInjectable,
  ɵɵngDeclareInjector,
  ɵɵngDeclareNgModule
} from "./chunk-KDBGPKYR.mjs";
import {
  CompilerConfig,
  ResourceLoader,
  __spreadProps,
  __spreadValues
} from "./chunk-SO6IKGEA.mjs";

// node_modules/@angular/platform-browser-dynamic/fesm2022/platform-browser-dynamic.mjs
var COMPILER_PROVIDERS = [{ provide: Compiler, useFactory: () => new Compiler() }];
var JitCompilerFactory = class {
  /** @internal */
  constructor(defaultOptions) {
    const compilerOptions = {
      useJit: true,
      defaultEncapsulation: ViewEncapsulation$1.Emulated,
      missingTranslation: MissingTranslationStrategy.Warning
    };
    this._defaultOptions = [compilerOptions, ...defaultOptions];
  }
  createCompiler(options = []) {
    const opts = _mergeOptions(this._defaultOptions.concat(options));
    const injector = Injector.create({
      providers: [
        COMPILER_PROVIDERS,
        {
          provide: CompilerConfig,
          useFactory: () => {
            return new CompilerConfig({
              // let explicit values from the compiler options overwrite options
              // from the app providers
              useJit: opts.useJit,
              // let explicit values from the compiler options overwrite options
              // from the app providers
              defaultEncapsulation: opts.defaultEncapsulation,
              missingTranslation: opts.missingTranslation,
              preserveWhitespaces: opts.preserveWhitespaces
            });
          },
          deps: []
        },
        opts.providers
      ]
    });
    return injector.get(Compiler);
  }
};
function _mergeOptions(optionsArr) {
  return {
    useJit: _lastDefined(optionsArr.map((options) => options.useJit)),
    defaultEncapsulation: _lastDefined(optionsArr.map((options) => options.defaultEncapsulation)),
    providers: _mergeArrays(optionsArr.map((options) => options.providers)),
    missingTranslation: _lastDefined(optionsArr.map((options) => options.missingTranslation)),
    preserveWhitespaces: _lastDefined(optionsArr.map((options) => options.preserveWhitespaces))
  };
}
function _lastDefined(args) {
  for (let i = args.length - 1; i >= 0; i--) {
    if (args[i] !== void 0) {
      return args[i];
    }
  }
  return void 0;
}
function _mergeArrays(parts) {
  const result = [];
  parts.forEach((part) => part && result.push(...part));
  return result;
}
var platformCoreDynamic = createPlatformFactory(platformCore, "coreDynamic", [
  { provide: COMPILER_OPTIONS, useValue: {}, multi: true },
  { provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS] }
]);
var _ResourceLoaderImpl = class _ResourceLoaderImpl extends ResourceLoader {
  get(url) {
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "text";
    xhr.onload = function() {
      const response = xhr.response;
      let status = xhr.status;
      if (status === 0) {
        status = response ? 200 : 0;
      }
      if (200 <= status && status <= 300) {
        resolve(response);
      } else {
        reject(`Failed to load ${url}`);
      }
    };
    xhr.onerror = function() {
      reject(`Failed to load ${url}`);
    };
    xhr.send();
    return promise;
  }
};
_ResourceLoaderImpl.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: core_exports, type: _ResourceLoaderImpl, deps: null, target: FactoryTarget.Injectable });
_ResourceLoaderImpl.\u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: core_exports, type: _ResourceLoaderImpl });
var ResourceLoaderImpl = _ResourceLoaderImpl;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: core_exports, type: ResourceLoaderImpl, decorators: [{
  type: Injectable
}] });
var INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS = [
  INTERNAL_BROWSER_PLATFORM_PROVIDERS,
  {
    provide: COMPILER_OPTIONS,
    useValue: { providers: [{ provide: ResourceLoader, useClass: ResourceLoaderImpl, deps: [] }] },
    multi: true
  },
  { provide: PLATFORM_ID, useValue: PLATFORM_BROWSER_ID }
];
var VERSION = new Version("16.2.12");
var platformBrowserDynamic = createPlatformFactory(platformCoreDynamic, "browserDynamic", INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS);

// node_modules/@angular/common/fesm2022/testing.mjs
function normalizeQueryParams(params) {
  return params && params[0] !== "?" ? "?" + params : params;
}
var _SpyLocation = class _SpyLocation {
  constructor() {
    this.urlChanges = [];
    this._history = [new LocationState("", "", null)];
    this._historyIndex = 0;
    this._subject = new EventEmitter();
    this._basePath = "";
    this._locationStrategy = null;
    this._urlChangeListeners = [];
    this._urlChangeSubscription = null;
  }
  /** @nodoc */
  ngOnDestroy() {
    this._urlChangeSubscription?.unsubscribe();
    this._urlChangeListeners = [];
  }
  setInitialPath(url) {
    this._history[this._historyIndex].path = url;
  }
  setBaseHref(url) {
    this._basePath = url;
  }
  path() {
    return this._history[this._historyIndex].path;
  }
  getState() {
    return this._history[this._historyIndex].state;
  }
  isCurrentPathEqualTo(path, query = "") {
    const givenPath = path.endsWith("/") ? path.substring(0, path.length - 1) : path;
    const currPath = this.path().endsWith("/") ? this.path().substring(0, this.path().length - 1) : this.path();
    return currPath == givenPath + (query.length > 0 ? "?" + query : "");
  }
  simulateUrlPop(pathname) {
    this._subject.emit({ "url": pathname, "pop": true, "type": "popstate" });
  }
  simulateHashChange(pathname) {
    const path = this.prepareExternalUrl(pathname);
    this.pushHistory(path, "", null);
    this.urlChanges.push("hash: " + pathname);
    this._subject.emit({ "url": pathname, "pop": true, "type": "popstate" });
    this._subject.emit({ "url": pathname, "pop": true, "type": "hashchange" });
  }
  prepareExternalUrl(url) {
    if (url.length > 0 && !url.startsWith("/")) {
      url = "/" + url;
    }
    return this._basePath + url;
  }
  go(path, query = "", state = null) {
    path = this.prepareExternalUrl(path);
    this.pushHistory(path, query, state);
    const locationState = this._history[this._historyIndex - 1];
    if (locationState.path == path && locationState.query == query) {
      return;
    }
    const url = path + (query.length > 0 ? "?" + query : "");
    this.urlChanges.push(url);
    this._notifyUrlChangeListeners(path + normalizeQueryParams(query), state);
  }
  replaceState(path, query = "", state = null) {
    path = this.prepareExternalUrl(path);
    const history = this._history[this._historyIndex];
    history.state = state;
    if (history.path == path && history.query == query) {
      return;
    }
    history.path = path;
    history.query = query;
    const url = path + (query.length > 0 ? "?" + query : "");
    this.urlChanges.push("replace: " + url);
    this._notifyUrlChangeListeners(path + normalizeQueryParams(query), state);
  }
  forward() {
    if (this._historyIndex < this._history.length - 1) {
      this._historyIndex++;
      this._subject.emit({ "url": this.path(), "state": this.getState(), "pop": true, "type": "popstate" });
    }
  }
  back() {
    if (this._historyIndex > 0) {
      this._historyIndex--;
      this._subject.emit({ "url": this.path(), "state": this.getState(), "pop": true, "type": "popstate" });
    }
  }
  historyGo(relativePosition = 0) {
    const nextPageIndex = this._historyIndex + relativePosition;
    if (nextPageIndex >= 0 && nextPageIndex < this._history.length) {
      this._historyIndex = nextPageIndex;
      this._subject.emit({ "url": this.path(), "state": this.getState(), "pop": true, "type": "popstate" });
    }
  }
  onUrlChange(fn) {
    this._urlChangeListeners.push(fn);
    if (!this._urlChangeSubscription) {
      this._urlChangeSubscription = this.subscribe((v) => {
        this._notifyUrlChangeListeners(v.url, v.state);
      });
    }
    return () => {
      const fnIndex = this._urlChangeListeners.indexOf(fn);
      this._urlChangeListeners.splice(fnIndex, 1);
      if (this._urlChangeListeners.length === 0) {
        this._urlChangeSubscription?.unsubscribe();
        this._urlChangeSubscription = null;
      }
    };
  }
  /** @internal */
  _notifyUrlChangeListeners(url = "", state) {
    this._urlChangeListeners.forEach((fn) => fn(url, state));
  }
  subscribe(onNext, onThrow, onReturn) {
    return this._subject.subscribe({ next: onNext, error: onThrow, complete: onReturn });
  }
  normalize(url) {
    return null;
  }
  pushHistory(path, query, state) {
    if (this._historyIndex > 0) {
      this._history.splice(this._historyIndex + 1);
    }
    this._history.push(new LocationState(path, query, state));
    this._historyIndex = this._history.length - 1;
  }
};
_SpyLocation.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: core_exports, type: _SpyLocation, deps: [], target: FactoryTarget.Injectable });
_SpyLocation.\u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: core_exports, type: _SpyLocation });
var SpyLocation = _SpyLocation;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: core_exports, type: SpyLocation, decorators: [{
  type: Injectable
}] });
var LocationState = class {
  constructor(path, query, state) {
    this.path = path;
    this.query = query;
    this.state = state;
  }
};
var _MockLocationStrategy = class _MockLocationStrategy extends LocationStrategy {
  constructor() {
    super();
    this.internalBaseHref = "/";
    this.internalPath = "/";
    this.internalTitle = "";
    this.urlChanges = [];
    this._subject = new EventEmitter();
    this.stateChanges = [];
  }
  simulatePopState(url) {
    this.internalPath = url;
    this._subject.emit(new _MockPopStateEvent(this.path()));
  }
  path(includeHash = false) {
    return this.internalPath;
  }
  prepareExternalUrl(internal) {
    if (internal.startsWith("/") && this.internalBaseHref.endsWith("/")) {
      return this.internalBaseHref + internal.substring(1);
    }
    return this.internalBaseHref + internal;
  }
  pushState(ctx, title, path, query) {
    this.stateChanges.push(ctx);
    this.internalTitle = title;
    const url = path + (query.length > 0 ? "?" + query : "");
    this.internalPath = url;
    const externalUrl = this.prepareExternalUrl(url);
    this.urlChanges.push(externalUrl);
  }
  replaceState(ctx, title, path, query) {
    this.stateChanges[(this.stateChanges.length || 1) - 1] = ctx;
    this.internalTitle = title;
    const url = path + (query.length > 0 ? "?" + query : "");
    this.internalPath = url;
    const externalUrl = this.prepareExternalUrl(url);
    this.urlChanges.push("replace: " + externalUrl);
  }
  onPopState(fn) {
    this._subject.subscribe({ next: fn });
  }
  getBaseHref() {
    return this.internalBaseHref;
  }
  back() {
    if (this.urlChanges.length > 0) {
      this.urlChanges.pop();
      this.stateChanges.pop();
      const nextUrl = this.urlChanges.length > 0 ? this.urlChanges[this.urlChanges.length - 1] : "";
      this.simulatePopState(nextUrl);
    }
  }
  forward() {
    throw "not implemented";
  }
  getState() {
    return this.stateChanges[(this.stateChanges.length || 1) - 1];
  }
};
_MockLocationStrategy.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: core_exports, type: _MockLocationStrategy, deps: [], target: FactoryTarget.Injectable });
_MockLocationStrategy.\u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: core_exports, type: _MockLocationStrategy });
var MockLocationStrategy = _MockLocationStrategy;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: core_exports, type: MockLocationStrategy, decorators: [{
  type: Injectable
}], ctorParameters: function() {
  return [];
} });
var _MockPopStateEvent = class {
  constructor(newUrl) {
    this.newUrl = newUrl;
    this.pop = true;
    this.type = "popstate";
  }
};
var urlParse = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
function parseUrl(urlStr, baseHref) {
  const verifyProtocol = /^((http[s]?|ftp):\/\/)/;
  let serverBase;
  if (!verifyProtocol.test(urlStr)) {
    serverBase = "http://empty.com/";
  }
  let parsedUrl;
  try {
    parsedUrl = new URL(urlStr, serverBase);
  } catch (e) {
    const result = urlParse.exec(serverBase || "" + urlStr);
    if (!result) {
      throw new Error(`Invalid URL: ${urlStr} with base: ${baseHref}`);
    }
    const hostSplit = result[4].split(":");
    parsedUrl = {
      protocol: result[1],
      hostname: hostSplit[0],
      port: hostSplit[1] || "",
      pathname: result[5],
      search: result[6],
      hash: result[8]
    };
  }
  if (parsedUrl.pathname && parsedUrl.pathname.indexOf(baseHref) === 0) {
    parsedUrl.pathname = parsedUrl.pathname.substring(baseHref.length);
  }
  return {
    hostname: !serverBase && parsedUrl.hostname || "",
    protocol: !serverBase && parsedUrl.protocol || "",
    port: !serverBase && parsedUrl.port || "",
    pathname: parsedUrl.pathname || "/",
    search: parsedUrl.search || "",
    hash: parsedUrl.hash || ""
  };
}
var MOCK_PLATFORM_LOCATION_CONFIG = new InjectionToken("MOCK_PLATFORM_LOCATION_CONFIG");
var _MockPlatformLocation = class _MockPlatformLocation {
  constructor(config) {
    this.baseHref = "";
    this.hashUpdate = new Subject();
    this.popStateSubject = new Subject();
    this.urlChangeIndex = 0;
    this.urlChanges = [{ hostname: "", protocol: "", port: "", pathname: "/", search: "", hash: "", state: null }];
    if (config) {
      this.baseHref = config.appBaseHref || "";
      const parsedChanges = this.parseChanges(null, config.startUrl || "http://_empty_/", this.baseHref);
      this.urlChanges[0] = __spreadValues({}, parsedChanges);
    }
  }
  get hostname() {
    return this.urlChanges[this.urlChangeIndex].hostname;
  }
  get protocol() {
    return this.urlChanges[this.urlChangeIndex].protocol;
  }
  get port() {
    return this.urlChanges[this.urlChangeIndex].port;
  }
  get pathname() {
    return this.urlChanges[this.urlChangeIndex].pathname;
  }
  get search() {
    return this.urlChanges[this.urlChangeIndex].search;
  }
  get hash() {
    return this.urlChanges[this.urlChangeIndex].hash;
  }
  get state() {
    return this.urlChanges[this.urlChangeIndex].state;
  }
  getBaseHrefFromDOM() {
    return this.baseHref;
  }
  onPopState(fn) {
    const subscription = this.popStateSubject.subscribe(fn);
    return () => subscription.unsubscribe();
  }
  onHashChange(fn) {
    const subscription = this.hashUpdate.subscribe(fn);
    return () => subscription.unsubscribe();
  }
  get href() {
    let url = `${this.protocol}//${this.hostname}${this.port ? ":" + this.port : ""}`;
    url += `${this.pathname === "/" ? "" : this.pathname}${this.search}${this.hash}`;
    return url;
  }
  get url() {
    return `${this.pathname}${this.search}${this.hash}`;
  }
  parseChanges(state, url, baseHref = "") {
    state = JSON.parse(JSON.stringify(state));
    return __spreadProps(__spreadValues({}, parseUrl(url, baseHref)), { state });
  }
  replaceState(state, title, newUrl) {
    const { pathname, search, state: parsedState, hash } = this.parseChanges(state, newUrl);
    this.urlChanges[this.urlChangeIndex] = __spreadProps(__spreadValues({}, this.urlChanges[this.urlChangeIndex]), { pathname, search, hash, state: parsedState });
  }
  pushState(state, title, newUrl) {
    const { pathname, search, state: parsedState, hash } = this.parseChanges(state, newUrl);
    if (this.urlChangeIndex > 0) {
      this.urlChanges.splice(this.urlChangeIndex + 1);
    }
    this.urlChanges.push(__spreadProps(__spreadValues({}, this.urlChanges[this.urlChangeIndex]), { pathname, search, hash, state: parsedState }));
    this.urlChangeIndex = this.urlChanges.length - 1;
  }
  forward() {
    const oldUrl = this.url;
    const oldHash = this.hash;
    if (this.urlChangeIndex < this.urlChanges.length) {
      this.urlChangeIndex++;
    }
    this.emitEvents(oldHash, oldUrl);
  }
  back() {
    const oldUrl = this.url;
    const oldHash = this.hash;
    if (this.urlChangeIndex > 0) {
      this.urlChangeIndex--;
    }
    this.emitEvents(oldHash, oldUrl);
  }
  historyGo(relativePosition = 0) {
    const oldUrl = this.url;
    const oldHash = this.hash;
    const nextPageIndex = this.urlChangeIndex + relativePosition;
    if (nextPageIndex >= 0 && nextPageIndex < this.urlChanges.length) {
      this.urlChangeIndex = nextPageIndex;
    }
    this.emitEvents(oldHash, oldUrl);
  }
  getState() {
    return this.state;
  }
  /**
   * Browsers are inconsistent in when they fire events and perform the state updates
   * The most easiest thing to do in our mock is synchronous and that happens to match
   * Firefox and Chrome, at least somewhat closely
   *
   * https://github.com/WICG/navigation-api#watching-for-navigations
   * https://docs.google.com/document/d/1Pdve-DJ1JCGilj9Yqf5HxRJyBKSel5owgOvUJqTauwU/edit#heading=h.3ye4v71wsz94
   * popstate is always sent before hashchange:
   * https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event#when_popstate_is_sent
   */
  emitEvents(oldHash, oldUrl) {
    this.popStateSubject.next({ type: "popstate", state: this.getState(), oldUrl, newUrl: this.url });
    if (oldHash !== this.hash) {
      this.hashUpdate.next({ type: "hashchange", state: null, oldUrl, newUrl: this.url });
    }
  }
};
_MockPlatformLocation.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: core_exports, type: _MockPlatformLocation, deps: [{ token: MOCK_PLATFORM_LOCATION_CONFIG, optional: true }], target: FactoryTarget.Injectable });
_MockPlatformLocation.\u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: core_exports, type: _MockPlatformLocation });
var MockPlatformLocation = _MockPlatformLocation;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: core_exports, type: MockPlatformLocation, decorators: [{
  type: Injectable
}], ctorParameters: function() {
  return [{ type: void 0, decorators: [{
    type: Inject,
    args: [MOCK_PLATFORM_LOCATION_CONFIG]
  }, {
    type: Optional
  }] }];
} });

// node_modules/@angular/platform-browser/fesm2022/testing.mjs
function initBrowserTests() {
  BrowserDomAdapter.makeCurrent();
}
var _TEST_BROWSER_PLATFORM_PROVIDERS = [{ provide: PLATFORM_INITIALIZER, useValue: initBrowserTests, multi: true }];
var platformBrowserTesting = createPlatformFactory(platformCore, "browserTesting", _TEST_BROWSER_PLATFORM_PROVIDERS);
var _BrowserTestingModule = class _BrowserTestingModule {
};
_BrowserTestingModule.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: core_exports, type: _BrowserTestingModule, deps: [], target: FactoryTarget.NgModule });
_BrowserTestingModule.\u0275mod = \u0275\u0275ngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: core_exports, type: _BrowserTestingModule, exports: [BrowserModule] });
_BrowserTestingModule.\u0275inj = \u0275\u0275ngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: core_exports, type: _BrowserTestingModule, providers: [
  { provide: APP_ID, useValue: "a" },
  provideZoneChangeDetection(),
  { provide: PlatformLocation, useClass: MockPlatformLocation }
], imports: [BrowserModule] });
var BrowserTestingModule = _BrowserTestingModule;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: core_exports, type: BrowserTestingModule, decorators: [{
  type: NgModule,
  args: [{
    exports: [BrowserModule],
    providers: [
      { provide: APP_ID, useValue: "a" },
      provideZoneChangeDetection(),
      { provide: PlatformLocation, useClass: MockPlatformLocation }
    ]
  }]
}] });

// node_modules/@angular/platform-browser-dynamic/fesm2022/testing.mjs
var _DOMTestComponentRenderer = class _DOMTestComponentRenderer extends TestComponentRenderer {
  constructor(_doc) {
    super();
    this._doc = _doc;
  }
  insertRootElement(rootElId) {
    this.removeAllRootElements();
    const rootElement = getDOM().getDefaultDocument().createElement("div");
    rootElement.setAttribute("id", rootElId);
    this._doc.body.appendChild(rootElement);
  }
  removeAllRootElements() {
    const oldRoots = this._doc.querySelectorAll("[id^=root]");
    for (let i = 0; i < oldRoots.length; i++) {
      getDOM().remove(oldRoots[i]);
    }
  }
};
_DOMTestComponentRenderer.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: core_exports, type: _DOMTestComponentRenderer, deps: [{ token: DOCUMENT }], target: FactoryTarget.Injectable });
_DOMTestComponentRenderer.\u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: core_exports, type: _DOMTestComponentRenderer });
var DOMTestComponentRenderer = _DOMTestComponentRenderer;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: core_exports, type: DOMTestComponentRenderer, decorators: [{
  type: Injectable
}], ctorParameters: function() {
  return [{ type: void 0, decorators: [{
    type: Inject,
    args: [DOCUMENT]
  }] }];
} });
var platformCoreDynamicTesting = createPlatformFactory(platformCoreDynamic, "coreDynamicTesting", []);
var platformBrowserDynamicTesting = createPlatformFactory(platformCoreDynamicTesting, "browserDynamicTesting", INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS);
var _BrowserDynamicTestingModule = class _BrowserDynamicTestingModule {
};
_BrowserDynamicTestingModule.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: core_exports, type: _BrowserDynamicTestingModule, deps: [], target: FactoryTarget.NgModule });
_BrowserDynamicTestingModule.\u0275mod = \u0275\u0275ngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: core_exports, type: _BrowserDynamicTestingModule, exports: [BrowserTestingModule] });
_BrowserDynamicTestingModule.\u0275inj = \u0275\u0275ngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: core_exports, type: _BrowserDynamicTestingModule, providers: [
  { provide: TestComponentRenderer, useClass: DOMTestComponentRenderer }
], imports: [BrowserTestingModule] });
var BrowserDynamicTestingModule = _BrowserDynamicTestingModule;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: core_exports, type: BrowserDynamicTestingModule, decorators: [{
  type: NgModule,
  args: [{
    exports: [BrowserTestingModule],
    providers: [
      { provide: TestComponentRenderer, useClass: DOMTestComponentRenderer }
    ]
  }]
}] });

// node_modules/@angular-devkit/build-angular/src/builders/jest/init-test-bed.mjs
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true
});
/*! Bundled license information:

@angular/platform-browser-dynamic/fesm2022/platform-browser-dynamic.mjs:
  (**
   * @license Angular v16.2.12
   * (c) 2010-2022 Google LLC. https://angular.io/
   * License: MIT
   *)

@angular/common/fesm2022/testing.mjs:
  (**
   * @license Angular v16.2.12
   * (c) 2010-2022 Google LLC. https://angular.io/
   * License: MIT
   *)

@angular/platform-browser/fesm2022/testing.mjs:
  (**
   * @license Angular v16.2.12
   * (c) 2010-2022 Google LLC. https://angular.io/
   * License: MIT
   *)

@angular/platform-browser-dynamic/fesm2022/testing.mjs:
  (**
   * @license Angular v16.2.12
   * (c) 2010-2022 Google LLC. https://angular.io/
   * License: MIT
   *)

@angular-devkit/build-angular/src/builders/jest/init-test-bed.mjs:
  (**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   *)
*/
//# sourceMappingURL=init-test-bed.mjs.map
