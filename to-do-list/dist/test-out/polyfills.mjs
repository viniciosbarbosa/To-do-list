import {
  __spreadProps,
  __spreadValues
} from "./chunk-SO6IKGEA.mjs";

// node_modules/zone.js/fesm2015/zone.js
(function(global2) {
  const performance = global2["performance"];
  function mark(name) {
    performance && performance["mark"] && performance["mark"](name);
  }
  function performanceMeasure(name, label) {
    performance && performance["measure"] && performance["measure"](name, label);
  }
  mark("Zone");
  const symbolPrefix = global2["__Zone_symbol_prefix"] || "__zone_symbol__";
  function __symbol__(name) {
    return symbolPrefix + name;
  }
  const checkDuplicate = global2[__symbol__("forceDuplicateZoneCheck")] === true;
  if (global2["Zone"]) {
    if (checkDuplicate || typeof global2["Zone"].__symbol__ !== "function") {
      throw new Error("Zone already loaded.");
    } else {
      return global2["Zone"];
    }
  }
  const _Zone = class _Zone {
    static assertZonePatched() {
      if (global2["Promise"] !== patches["ZoneAwarePromise"]) {
        throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)");
      }
    }
    static get root() {
      let zone = _Zone.current;
      while (zone.parent) {
        zone = zone.parent;
      }
      return zone;
    }
    static get current() {
      return _currentZoneFrame.zone;
    }
    static get currentTask() {
      return _currentTask;
    }
    // tslint:disable-next-line:require-internal-with-underscore
    static __load_patch(name, fn, ignoreDuplicate = false) {
      if (patches.hasOwnProperty(name)) {
        if (!ignoreDuplicate && checkDuplicate) {
          throw Error("Already loaded patch: " + name);
        }
      } else if (!global2["__Zone_disable_" + name]) {
        const perfName = "Zone:" + name;
        mark(perfName);
        patches[name] = fn(global2, _Zone, _api);
        performanceMeasure(perfName, perfName);
      }
    }
    get parent() {
      return this._parent;
    }
    get name() {
      return this._name;
    }
    constructor(parent, zoneSpec) {
      this._parent = parent;
      this._name = zoneSpec ? zoneSpec.name || "unnamed" : "<root>";
      this._properties = zoneSpec && zoneSpec.properties || {};
      this._zoneDelegate = new _ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
    }
    get(key) {
      const zone = this.getZoneWith(key);
      if (zone)
        return zone._properties[key];
    }
    getZoneWith(key) {
      let current = this;
      while (current) {
        if (current._properties.hasOwnProperty(key)) {
          return current;
        }
        current = current._parent;
      }
      return null;
    }
    fork(zoneSpec) {
      if (!zoneSpec)
        throw new Error("ZoneSpec required!");
      return this._zoneDelegate.fork(this, zoneSpec);
    }
    wrap(callback, source) {
      if (typeof callback !== "function") {
        throw new Error("Expecting function got: " + callback);
      }
      const _callback = this._zoneDelegate.intercept(this, callback, source);
      const zone = this;
      return function() {
        return zone.runGuarded(_callback, this, arguments, source);
      };
    }
    run(callback, applyThis, applyArgs, source) {
      _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
      try {
        return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
      } finally {
        _currentZoneFrame = _currentZoneFrame.parent;
      }
    }
    runGuarded(callback, applyThis = null, applyArgs, source) {
      _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
      try {
        try {
          return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
        } catch (error2) {
          if (this._zoneDelegate.handleError(this, error2)) {
            throw error2;
          }
        }
      } finally {
        _currentZoneFrame = _currentZoneFrame.parent;
      }
    }
    runTask(task, applyThis, applyArgs) {
      if (task.zone != this) {
        throw new Error("A task can only be run in the zone of creation! (Creation: " + (task.zone || NO_ZONE).name + "; Execution: " + this.name + ")");
      }
      if (task.state === notScheduled && (task.type === eventTask || task.type === macroTask)) {
        return;
      }
      const reEntryGuard = task.state != running;
      reEntryGuard && task._transitionTo(running, scheduled);
      task.runCount++;
      const previousTask = _currentTask;
      _currentTask = task;
      _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
      try {
        if (task.type == macroTask && task.data && !task.data.isPeriodic) {
          task.cancelFn = void 0;
        }
        try {
          return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);
        } catch (error2) {
          if (this._zoneDelegate.handleError(this, error2)) {
            throw error2;
          }
        }
      } finally {
        if (task.state !== notScheduled && task.state !== unknown) {
          if (task.type == eventTask || task.data && task.data.isPeriodic) {
            reEntryGuard && task._transitionTo(scheduled, running);
          } else {
            task.runCount = 0;
            this._updateTaskCount(task, -1);
            reEntryGuard && task._transitionTo(notScheduled, running, notScheduled);
          }
        }
        _currentZoneFrame = _currentZoneFrame.parent;
        _currentTask = previousTask;
      }
    }
    scheduleTask(task) {
      if (task.zone && task.zone !== this) {
        let newZone = this;
        while (newZone) {
          if (newZone === task.zone) {
            throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${task.zone.name}`);
          }
          newZone = newZone.parent;
        }
      }
      task._transitionTo(scheduling, notScheduled);
      const zoneDelegates = [];
      task._zoneDelegates = zoneDelegates;
      task._zone = this;
      try {
        task = this._zoneDelegate.scheduleTask(this, task);
      } catch (err) {
        task._transitionTo(unknown, scheduling, notScheduled);
        this._zoneDelegate.handleError(this, err);
        throw err;
      }
      if (task._zoneDelegates === zoneDelegates) {
        this._updateTaskCount(task, 1);
      }
      if (task.state == scheduling) {
        task._transitionTo(scheduled, scheduling);
      }
      return task;
    }
    scheduleMicroTask(source, callback, data, customSchedule) {
      return this.scheduleTask(new ZoneTask(microTask, source, callback, data, customSchedule, void 0));
    }
    scheduleMacroTask(source, callback, data, customSchedule, customCancel) {
      return this.scheduleTask(new ZoneTask(macroTask, source, callback, data, customSchedule, customCancel));
    }
    scheduleEventTask(source, callback, data, customSchedule, customCancel) {
      return this.scheduleTask(new ZoneTask(eventTask, source, callback, data, customSchedule, customCancel));
    }
    cancelTask(task) {
      if (task.zone != this)
        throw new Error("A task can only be cancelled in the zone of creation! (Creation: " + (task.zone || NO_ZONE).name + "; Execution: " + this.name + ")");
      if (task.state !== scheduled && task.state !== running) {
        return;
      }
      task._transitionTo(canceling, scheduled, running);
      try {
        this._zoneDelegate.cancelTask(this, task);
      } catch (err) {
        task._transitionTo(unknown, canceling);
        this._zoneDelegate.handleError(this, err);
        throw err;
      }
      this._updateTaskCount(task, -1);
      task._transitionTo(notScheduled, canceling);
      task.runCount = 0;
      return task;
    }
    _updateTaskCount(task, count) {
      const zoneDelegates = task._zoneDelegates;
      if (count == -1) {
        task._zoneDelegates = null;
      }
      for (let i = 0; i < zoneDelegates.length; i++) {
        zoneDelegates[i]._updateTaskCount(task.type, count);
      }
    }
  };
  _Zone.__symbol__ = __symbol__;
  let Zone2 = _Zone;
  const DELEGATE_ZS = {
    name: "",
    onHasTask: (delegate, _, target, hasTaskState) => delegate.hasTask(target, hasTaskState),
    onScheduleTask: (delegate, _, target, task) => delegate.scheduleTask(target, task),
    onInvokeTask: (delegate, _, target, task, applyThis, applyArgs) => delegate.invokeTask(target, task, applyThis, applyArgs),
    onCancelTask: (delegate, _, target, task) => delegate.cancelTask(target, task)
  };
  class _ZoneDelegate {
    constructor(zone, parentDelegate, zoneSpec) {
      this._taskCounts = { "microTask": 0, "macroTask": 0, "eventTask": 0 };
      this.zone = zone;
      this._parentDelegate = parentDelegate;
      this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
      this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
      this._forkCurrZone = zoneSpec && (zoneSpec.onFork ? this.zone : parentDelegate._forkCurrZone);
      this._interceptZS = zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
      this._interceptDlgt = zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
      this._interceptCurrZone = zoneSpec && (zoneSpec.onIntercept ? this.zone : parentDelegate._interceptCurrZone);
      this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
      this._invokeDlgt = zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
      this._invokeCurrZone = zoneSpec && (zoneSpec.onInvoke ? this.zone : parentDelegate._invokeCurrZone);
      this._handleErrorZS = zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
      this._handleErrorDlgt = zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
      this._handleErrorCurrZone = zoneSpec && (zoneSpec.onHandleError ? this.zone : parentDelegate._handleErrorCurrZone);
      this._scheduleTaskZS = zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
      this._scheduleTaskDlgt = zoneSpec && (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
      this._scheduleTaskCurrZone = zoneSpec && (zoneSpec.onScheduleTask ? this.zone : parentDelegate._scheduleTaskCurrZone);
      this._invokeTaskZS = zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
      this._invokeTaskDlgt = zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
      this._invokeTaskCurrZone = zoneSpec && (zoneSpec.onInvokeTask ? this.zone : parentDelegate._invokeTaskCurrZone);
      this._cancelTaskZS = zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
      this._cancelTaskDlgt = zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
      this._cancelTaskCurrZone = zoneSpec && (zoneSpec.onCancelTask ? this.zone : parentDelegate._cancelTaskCurrZone);
      this._hasTaskZS = null;
      this._hasTaskDlgt = null;
      this._hasTaskDlgtOwner = null;
      this._hasTaskCurrZone = null;
      const zoneSpecHasTask = zoneSpec && zoneSpec.onHasTask;
      const parentHasTask = parentDelegate && parentDelegate._hasTaskZS;
      if (zoneSpecHasTask || parentHasTask) {
        this._hasTaskZS = zoneSpecHasTask ? zoneSpec : DELEGATE_ZS;
        this._hasTaskDlgt = parentDelegate;
        this._hasTaskDlgtOwner = this;
        this._hasTaskCurrZone = zone;
        if (!zoneSpec.onScheduleTask) {
          this._scheduleTaskZS = DELEGATE_ZS;
          this._scheduleTaskDlgt = parentDelegate;
          this._scheduleTaskCurrZone = this.zone;
        }
        if (!zoneSpec.onInvokeTask) {
          this._invokeTaskZS = DELEGATE_ZS;
          this._invokeTaskDlgt = parentDelegate;
          this._invokeTaskCurrZone = this.zone;
        }
        if (!zoneSpec.onCancelTask) {
          this._cancelTaskZS = DELEGATE_ZS;
          this._cancelTaskDlgt = parentDelegate;
          this._cancelTaskCurrZone = this.zone;
        }
      }
    }
    fork(targetZone, zoneSpec) {
      return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) : new Zone2(targetZone, zoneSpec);
    }
    intercept(targetZone, callback, source) {
      return this._interceptZS ? this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, targetZone, callback, source) : callback;
    }
    invoke(targetZone, callback, applyThis, applyArgs, source) {
      return this._invokeZS ? this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, targetZone, callback, applyThis, applyArgs, source) : callback.apply(applyThis, applyArgs);
    }
    handleError(targetZone, error2) {
      return this._handleErrorZS ? this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, targetZone, error2) : true;
    }
    scheduleTask(targetZone, task) {
      let returnTask = task;
      if (this._scheduleTaskZS) {
        if (this._hasTaskZS) {
          returnTask._zoneDelegates.push(this._hasTaskDlgtOwner);
        }
        returnTask = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, targetZone, task);
        if (!returnTask)
          returnTask = task;
      } else {
        if (task.scheduleFn) {
          task.scheduleFn(task);
        } else if (task.type == microTask) {
          scheduleMicroTask(task);
        } else {
          throw new Error("Task is missing scheduleFn.");
        }
      }
      return returnTask;
    }
    invokeTask(targetZone, task, applyThis, applyArgs) {
      return this._invokeTaskZS ? this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, targetZone, task, applyThis, applyArgs) : task.callback.apply(applyThis, applyArgs);
    }
    cancelTask(targetZone, task) {
      let value;
      if (this._cancelTaskZS) {
        value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, targetZone, task);
      } else {
        if (!task.cancelFn) {
          throw Error("Task is not cancelable");
        }
        value = task.cancelFn(task);
      }
      return value;
    }
    hasTask(targetZone, isEmpty) {
      try {
        this._hasTaskZS && this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, targetZone, isEmpty);
      } catch (err) {
        this.handleError(targetZone, err);
      }
    }
    // tslint:disable-next-line:require-internal-with-underscore
    _updateTaskCount(type, count) {
      const counts = this._taskCounts;
      const prev = counts[type];
      const next = counts[type] = prev + count;
      if (next < 0) {
        throw new Error("More tasks executed then were scheduled.");
      }
      if (prev == 0 || next == 0) {
        const isEmpty = {
          microTask: counts["microTask"] > 0,
          macroTask: counts["macroTask"] > 0,
          eventTask: counts["eventTask"] > 0,
          change: type
        };
        this.hasTask(this.zone, isEmpty);
      }
    }
  }
  class ZoneTask {
    constructor(type, source, callback, options, scheduleFn, cancelFn) {
      this._zone = null;
      this.runCount = 0;
      this._zoneDelegates = null;
      this._state = "notScheduled";
      this.type = type;
      this.source = source;
      this.data = options;
      this.scheduleFn = scheduleFn;
      this.cancelFn = cancelFn;
      if (!callback) {
        throw new Error("callback is not defined");
      }
      this.callback = callback;
      const self2 = this;
      if (type === eventTask && options && options.useG) {
        this.invoke = ZoneTask.invokeTask;
      } else {
        this.invoke = function() {
          return ZoneTask.invokeTask.call(global2, self2, this, arguments);
        };
      }
    }
    static invokeTask(task, target, args) {
      if (!task) {
        task = this;
      }
      _numberOfNestedTaskFrames++;
      try {
        task.runCount++;
        return task.zone.runTask(task, target, args);
      } finally {
        if (_numberOfNestedTaskFrames == 1) {
          drainMicroTaskQueue();
        }
        _numberOfNestedTaskFrames--;
      }
    }
    get zone() {
      return this._zone;
    }
    get state() {
      return this._state;
    }
    cancelScheduleRequest() {
      this._transitionTo(notScheduled, scheduling);
    }
    // tslint:disable-next-line:require-internal-with-underscore
    _transitionTo(toState, fromState1, fromState2) {
      if (this._state === fromState1 || this._state === fromState2) {
        this._state = toState;
        if (toState == notScheduled) {
          this._zoneDelegates = null;
        }
      } else {
        throw new Error(`${this.type} '${this.source}': can not transition to '${toState}', expecting state '${fromState1}'${fromState2 ? " or '" + fromState2 + "'" : ""}, was '${this._state}'.`);
      }
    }
    toString() {
      if (this.data && typeof this.data.handleId !== "undefined") {
        return this.data.handleId.toString();
      } else {
        return Object.prototype.toString.call(this);
      }
    }
    // add toJSON method to prevent cyclic error when
    // call JSON.stringify(zoneTask)
    toJSON() {
      return {
        type: this.type,
        state: this.state,
        source: this.source,
        zone: this.zone.name,
        runCount: this.runCount
      };
    }
  }
  const symbolSetTimeout = __symbol__("setTimeout");
  const symbolPromise = __symbol__("Promise");
  const symbolThen = __symbol__("then");
  let _microTaskQueue = [];
  let _isDrainingMicrotaskQueue = false;
  let nativeMicroTaskQueuePromise;
  function nativeScheduleMicroTask(func) {
    if (!nativeMicroTaskQueuePromise) {
      if (global2[symbolPromise]) {
        nativeMicroTaskQueuePromise = global2[symbolPromise].resolve(0);
      }
    }
    if (nativeMicroTaskQueuePromise) {
      let nativeThen = nativeMicroTaskQueuePromise[symbolThen];
      if (!nativeThen) {
        nativeThen = nativeMicroTaskQueuePromise["then"];
      }
      nativeThen.call(nativeMicroTaskQueuePromise, func);
    } else {
      global2[symbolSetTimeout](func, 0);
    }
  }
  function scheduleMicroTask(task) {
    if (_numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0) {
      nativeScheduleMicroTask(drainMicroTaskQueue);
    }
    task && _microTaskQueue.push(task);
  }
  function drainMicroTaskQueue() {
    if (!_isDrainingMicrotaskQueue) {
      _isDrainingMicrotaskQueue = true;
      while (_microTaskQueue.length) {
        const queue = _microTaskQueue;
        _microTaskQueue = [];
        for (let i = 0; i < queue.length; i++) {
          const task = queue[i];
          try {
            task.zone.runTask(task, null, null);
          } catch (error2) {
            _api.onUnhandledError(error2);
          }
        }
      }
      _api.microtaskDrainDone();
      _isDrainingMicrotaskQueue = false;
    }
  }
  const NO_ZONE = { name: "NO ZONE" };
  const notScheduled = "notScheduled", scheduling = "scheduling", scheduled = "scheduled", running = "running", canceling = "canceling", unknown = "unknown";
  const microTask = "microTask", macroTask = "macroTask", eventTask = "eventTask";
  const patches = {};
  const _api = {
    symbol: __symbol__,
    currentZoneFrame: () => _currentZoneFrame,
    onUnhandledError: noop,
    microtaskDrainDone: noop,
    scheduleMicroTask,
    showUncaughtError: () => !Zone2[__symbol__("ignoreConsoleErrorUncaughtError")],
    patchEventTarget: () => [],
    patchOnProperties: noop,
    patchMethod: () => noop,
    bindArguments: () => [],
    patchThen: () => noop,
    patchMacroTask: () => noop,
    patchEventPrototype: () => noop,
    isIEOrEdge: () => false,
    getGlobalObjects: () => void 0,
    ObjectDefineProperty: () => noop,
    ObjectGetOwnPropertyDescriptor: () => void 0,
    ObjectCreate: () => void 0,
    ArraySlice: () => [],
    patchClass: () => noop,
    wrapWithCurrentZone: () => noop,
    filterProperties: () => [],
    attachOriginToPatched: () => noop,
    _redefineProperty: () => noop,
    patchCallbacks: () => noop,
    nativeScheduleMicroTask
  };
  let _currentZoneFrame = { parent: null, zone: new Zone2(null, null) };
  let _currentTask = null;
  let _numberOfNestedTaskFrames = 0;
  function noop() {
  }
  performanceMeasure("Zone", "Zone");
  return global2["Zone"] = Zone2;
})(typeof window !== "undefined" && window || typeof self !== "undefined" && self || global);
var ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ObjectDefineProperty = Object.defineProperty;
var ObjectGetPrototypeOf = Object.getPrototypeOf;
var ObjectCreate = Object.create;
var ArraySlice = Array.prototype.slice;
var ADD_EVENT_LISTENER_STR = "addEventListener";
var REMOVE_EVENT_LISTENER_STR = "removeEventListener";
var ZONE_SYMBOL_ADD_EVENT_LISTENER = Zone.__symbol__(ADD_EVENT_LISTENER_STR);
var ZONE_SYMBOL_REMOVE_EVENT_LISTENER = Zone.__symbol__(REMOVE_EVENT_LISTENER_STR);
var TRUE_STR = "true";
var FALSE_STR = "false";
var ZONE_SYMBOL_PREFIX = Zone.__symbol__("");
function wrapWithCurrentZone(callback, source) {
  return Zone.current.wrap(callback, source);
}
function scheduleMacroTaskWithCurrentZone(source, callback, data, customSchedule, customCancel) {
  return Zone.current.scheduleMacroTask(source, callback, data, customSchedule, customCancel);
}
var zoneSymbol = Zone.__symbol__;
var isWindowExists = typeof window !== "undefined";
var internalWindow = isWindowExists ? window : void 0;
var _global = isWindowExists && internalWindow || typeof self === "object" && self || global;
var REMOVE_ATTRIBUTE = "removeAttribute";
function bindArguments(args, source) {
  for (let i = args.length - 1; i >= 0; i--) {
    if (typeof args[i] === "function") {
      args[i] = wrapWithCurrentZone(args[i], source + "_" + i);
    }
  }
  return args;
}
function patchPrototype(prototype, fnNames) {
  const source = prototype.constructor["name"];
  for (let i = 0; i < fnNames.length; i++) {
    const name = fnNames[i];
    const delegate = prototype[name];
    if (delegate) {
      const prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, name);
      if (!isPropertyWritable(prototypeDesc)) {
        continue;
      }
      prototype[name] = ((delegate2) => {
        const patched = function() {
          return delegate2.apply(this, bindArguments(arguments, source + "." + name));
        };
        attachOriginToPatched(patched, delegate2);
        return patched;
      })(delegate);
    }
  }
}
function isPropertyWritable(propertyDesc) {
  if (!propertyDesc) {
    return true;
  }
  if (propertyDesc.writable === false) {
    return false;
  }
  return !(typeof propertyDesc.get === "function" && typeof propertyDesc.set === "undefined");
}
var isWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
var isNode = !("nw" in _global) && typeof _global.process !== "undefined" && {}.toString.call(_global.process) === "[object process]";
var isBrowser = !isNode && !isWebWorker && !!(isWindowExists && internalWindow["HTMLElement"]);
var isMix = typeof _global.process !== "undefined" && {}.toString.call(_global.process) === "[object process]" && !isWebWorker && !!(isWindowExists && internalWindow["HTMLElement"]);
var zoneSymbolEventNames$1 = {};
var wrapFn = function(event) {
  event = event || _global.event;
  if (!event) {
    return;
  }
  let eventNameSymbol = zoneSymbolEventNames$1[event.type];
  if (!eventNameSymbol) {
    eventNameSymbol = zoneSymbolEventNames$1[event.type] = zoneSymbol("ON_PROPERTY" + event.type);
  }
  const target = this || event.target || _global;
  const listener = target[eventNameSymbol];
  let result;
  if (isBrowser && target === internalWindow && event.type === "error") {
    const errorEvent = event;
    result = listener && listener.call(this, errorEvent.message, errorEvent.filename, errorEvent.lineno, errorEvent.colno, errorEvent.error);
    if (result === true) {
      event.preventDefault();
    }
  } else {
    result = listener && listener.apply(this, arguments);
    if (result != void 0 && !result) {
      event.preventDefault();
    }
  }
  return result;
};
function patchProperty(obj, prop, prototype) {
  let desc = ObjectGetOwnPropertyDescriptor(obj, prop);
  if (!desc && prototype) {
    const prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, prop);
    if (prototypeDesc) {
      desc = { enumerable: true, configurable: true };
    }
  }
  if (!desc || !desc.configurable) {
    return;
  }
  const onPropPatchedSymbol = zoneSymbol("on" + prop + "patched");
  if (obj.hasOwnProperty(onPropPatchedSymbol) && obj[onPropPatchedSymbol]) {
    return;
  }
  delete desc.writable;
  delete desc.value;
  const originalDescGet = desc.get;
  const originalDescSet = desc.set;
  const eventName = prop.slice(2);
  let eventNameSymbol = zoneSymbolEventNames$1[eventName];
  if (!eventNameSymbol) {
    eventNameSymbol = zoneSymbolEventNames$1[eventName] = zoneSymbol("ON_PROPERTY" + eventName);
  }
  desc.set = function(newValue) {
    let target = this;
    if (!target && obj === _global) {
      target = _global;
    }
    if (!target) {
      return;
    }
    const previousValue = target[eventNameSymbol];
    if (typeof previousValue === "function") {
      target.removeEventListener(eventName, wrapFn);
    }
    originalDescSet && originalDescSet.call(target, null);
    target[eventNameSymbol] = newValue;
    if (typeof newValue === "function") {
      target.addEventListener(eventName, wrapFn, false);
    }
  };
  desc.get = function() {
    let target = this;
    if (!target && obj === _global) {
      target = _global;
    }
    if (!target) {
      return null;
    }
    const listener = target[eventNameSymbol];
    if (listener) {
      return listener;
    } else if (originalDescGet) {
      let value = originalDescGet.call(this);
      if (value) {
        desc.set.call(this, value);
        if (typeof target[REMOVE_ATTRIBUTE] === "function") {
          target.removeAttribute(prop);
        }
        return value;
      }
    }
    return null;
  };
  ObjectDefineProperty(obj, prop, desc);
  obj[onPropPatchedSymbol] = true;
}
function patchOnProperties(obj, properties, prototype) {
  if (properties) {
    for (let i = 0; i < properties.length; i++) {
      patchProperty(obj, "on" + properties[i], prototype);
    }
  } else {
    const onProperties = [];
    for (const prop in obj) {
      if (prop.slice(0, 2) == "on") {
        onProperties.push(prop);
      }
    }
    for (let j = 0; j < onProperties.length; j++) {
      patchProperty(obj, onProperties[j], prototype);
    }
  }
}
var originalInstanceKey = zoneSymbol("originalInstance");
function patchClass(className) {
  const OriginalClass = _global[className];
  if (!OriginalClass)
    return;
  _global[zoneSymbol(className)] = OriginalClass;
  _global[className] = function() {
    const a = bindArguments(arguments, className);
    switch (a.length) {
      case 0:
        this[originalInstanceKey] = new OriginalClass();
        break;
      case 1:
        this[originalInstanceKey] = new OriginalClass(a[0]);
        break;
      case 2:
        this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
        break;
      case 3:
        this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
        break;
      case 4:
        this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
        break;
      default:
        throw new Error("Arg list too long.");
    }
  };
  attachOriginToPatched(_global[className], OriginalClass);
  const instance = new OriginalClass(function() {
  });
  let prop;
  for (prop in instance) {
    if (className === "XMLHttpRequest" && prop === "responseBlob")
      continue;
    (function(prop2) {
      if (typeof instance[prop2] === "function") {
        _global[className].prototype[prop2] = function() {
          return this[originalInstanceKey][prop2].apply(this[originalInstanceKey], arguments);
        };
      } else {
        ObjectDefineProperty(_global[className].prototype, prop2, {
          set: function(fn) {
            if (typeof fn === "function") {
              this[originalInstanceKey][prop2] = wrapWithCurrentZone(fn, className + "." + prop2);
              attachOriginToPatched(this[originalInstanceKey][prop2], fn);
            } else {
              this[originalInstanceKey][prop2] = fn;
            }
          },
          get: function() {
            return this[originalInstanceKey][prop2];
          }
        });
      }
    })(prop);
  }
  for (prop in OriginalClass) {
    if (prop !== "prototype" && OriginalClass.hasOwnProperty(prop)) {
      _global[className][prop] = OriginalClass[prop];
    }
  }
}
function patchMethod(target, name, patchFn) {
  let proto = target;
  while (proto && !proto.hasOwnProperty(name)) {
    proto = ObjectGetPrototypeOf(proto);
  }
  if (!proto && target[name]) {
    proto = target;
  }
  const delegateName = zoneSymbol(name);
  let delegate = null;
  if (proto && (!(delegate = proto[delegateName]) || !proto.hasOwnProperty(delegateName))) {
    delegate = proto[delegateName] = proto[name];
    const desc = proto && ObjectGetOwnPropertyDescriptor(proto, name);
    if (isPropertyWritable(desc)) {
      const patchDelegate = patchFn(delegate, delegateName, name);
      proto[name] = function() {
        return patchDelegate(this, arguments);
      };
      attachOriginToPatched(proto[name], delegate);
    }
  }
  return delegate;
}
function patchMacroTask(obj, funcName, metaCreator) {
  let setNative = null;
  function scheduleTask(task) {
    const data = task.data;
    data.args[data.cbIdx] = function() {
      task.invoke.apply(this, arguments);
    };
    setNative.apply(data.target, data.args);
    return task;
  }
  setNative = patchMethod(obj, funcName, (delegate) => function(self2, args) {
    const meta = metaCreator(self2, args);
    if (meta.cbIdx >= 0 && typeof args[meta.cbIdx] === "function") {
      return scheduleMacroTaskWithCurrentZone(meta.name, args[meta.cbIdx], meta, scheduleTask);
    } else {
      return delegate.apply(self2, args);
    }
  });
}
function attachOriginToPatched(patched, original) {
  patched[zoneSymbol("OriginalDelegate")] = original;
}
var isDetectedIEOrEdge = false;
var ieOrEdge = false;
function isIE() {
  try {
    const ua = internalWindow.navigator.userAgent;
    if (ua.indexOf("MSIE ") !== -1 || ua.indexOf("Trident/") !== -1) {
      return true;
    }
  } catch (error2) {
  }
  return false;
}
function isIEOrEdge() {
  if (isDetectedIEOrEdge) {
    return ieOrEdge;
  }
  isDetectedIEOrEdge = true;
  try {
    const ua = internalWindow.navigator.userAgent;
    if (ua.indexOf("MSIE ") !== -1 || ua.indexOf("Trident/") !== -1 || ua.indexOf("Edge/") !== -1) {
      ieOrEdge = true;
    }
  } catch (error2) {
  }
  return ieOrEdge;
}
Zone.__load_patch("ZoneAwarePromise", (global2, Zone2, api) => {
  const ObjectGetOwnPropertyDescriptor2 = Object.getOwnPropertyDescriptor;
  const ObjectDefineProperty2 = Object.defineProperty;
  function readableObjectToString(obj) {
    if (obj && obj.toString === Object.prototype.toString) {
      const className = obj.constructor && obj.constructor.name;
      return (className ? className : "") + ": " + JSON.stringify(obj);
    }
    return obj ? obj.toString() : Object.prototype.toString.call(obj);
  }
  const __symbol__ = api.symbol;
  const _uncaughtPromiseErrors = [];
  const isDisableWrappingUncaughtPromiseRejection = global2[__symbol__("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")] === true;
  const symbolPromise = __symbol__("Promise");
  const symbolThen = __symbol__("then");
  const creationTrace2 = "__creationTrace__";
  api.onUnhandledError = (e) => {
    if (api.showUncaughtError()) {
      const rejection = e && e.rejection;
      if (rejection) {
        console.error("Unhandled Promise rejection:", rejection instanceof Error ? rejection.message : rejection, "; Zone:", e.zone.name, "; Task:", e.task && e.task.source, "; Value:", rejection, rejection instanceof Error ? rejection.stack : void 0);
      } else {
        console.error(e);
      }
    }
  };
  api.microtaskDrainDone = () => {
    while (_uncaughtPromiseErrors.length) {
      const uncaughtPromiseError = _uncaughtPromiseErrors.shift();
      try {
        uncaughtPromiseError.zone.runGuarded(() => {
          if (uncaughtPromiseError.throwOriginal) {
            throw uncaughtPromiseError.rejection;
          }
          throw uncaughtPromiseError;
        });
      } catch (error2) {
        handleUnhandledRejection(error2);
      }
    }
  };
  const UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL = __symbol__("unhandledPromiseRejectionHandler");
  function handleUnhandledRejection(e) {
    api.onUnhandledError(e);
    try {
      const handler = Zone2[UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL];
      if (typeof handler === "function") {
        handler.call(this, e);
      }
    } catch (err) {
    }
  }
  function isThenable(value) {
    return value && value.then;
  }
  function forwardResolution(value) {
    return value;
  }
  function forwardRejection(rejection) {
    return ZoneAwarePromise.reject(rejection);
  }
  const symbolState = __symbol__("state");
  const symbolValue = __symbol__("value");
  const symbolFinally = __symbol__("finally");
  const symbolParentPromiseValue = __symbol__("parentPromiseValue");
  const symbolParentPromiseState = __symbol__("parentPromiseState");
  const source = "Promise.then";
  const UNRESOLVED = null;
  const RESOLVED = true;
  const REJECTED = false;
  const REJECTED_NO_CATCH = 0;
  function makeResolver(promise, state) {
    return (v) => {
      try {
        resolvePromise(promise, state, v);
      } catch (err) {
        resolvePromise(promise, false, err);
      }
    };
  }
  const once = function() {
    let wasCalled = false;
    return function wrapper(wrappedFunction) {
      return function() {
        if (wasCalled) {
          return;
        }
        wasCalled = true;
        wrappedFunction.apply(null, arguments);
      };
    };
  };
  const TYPE_ERROR = "Promise resolved with itself";
  const CURRENT_TASK_TRACE_SYMBOL = __symbol__("currentTaskTrace");
  function resolvePromise(promise, state, value) {
    const onceWrapper = once();
    if (promise === value) {
      throw new TypeError(TYPE_ERROR);
    }
    if (promise[symbolState] === UNRESOLVED) {
      let then = null;
      try {
        if (typeof value === "object" || typeof value === "function") {
          then = value && value.then;
        }
      } catch (err) {
        onceWrapper(() => {
          resolvePromise(promise, false, err);
        })();
        return promise;
      }
      if (state !== REJECTED && value instanceof ZoneAwarePromise && value.hasOwnProperty(symbolState) && value.hasOwnProperty(symbolValue) && value[symbolState] !== UNRESOLVED) {
        clearRejectedNoCatch(value);
        resolvePromise(promise, value[symbolState], value[symbolValue]);
      } else if (state !== REJECTED && typeof then === "function") {
        try {
          then.call(value, onceWrapper(makeResolver(promise, state)), onceWrapper(makeResolver(promise, false)));
        } catch (err) {
          onceWrapper(() => {
            resolvePromise(promise, false, err);
          })();
        }
      } else {
        promise[symbolState] = state;
        const queue = promise[symbolValue];
        promise[symbolValue] = value;
        if (promise[symbolFinally] === symbolFinally) {
          if (state === RESOLVED) {
            promise[symbolState] = promise[symbolParentPromiseState];
            promise[symbolValue] = promise[symbolParentPromiseValue];
          }
        }
        if (state === REJECTED && value instanceof Error) {
          const trace = Zone2.currentTask && Zone2.currentTask.data && Zone2.currentTask.data[creationTrace2];
          if (trace) {
            ObjectDefineProperty2(value, CURRENT_TASK_TRACE_SYMBOL, { configurable: true, enumerable: false, writable: true, value: trace });
          }
        }
        for (let i = 0; i < queue.length; ) {
          scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
        }
        if (queue.length == 0 && state == REJECTED) {
          promise[symbolState] = REJECTED_NO_CATCH;
          let uncaughtPromiseError = value;
          try {
            throw new Error("Uncaught (in promise): " + readableObjectToString(value) + (value && value.stack ? "\n" + value.stack : ""));
          } catch (err) {
            uncaughtPromiseError = err;
          }
          if (isDisableWrappingUncaughtPromiseRejection) {
            uncaughtPromiseError.throwOriginal = true;
          }
          uncaughtPromiseError.rejection = value;
          uncaughtPromiseError.promise = promise;
          uncaughtPromiseError.zone = Zone2.current;
          uncaughtPromiseError.task = Zone2.currentTask;
          _uncaughtPromiseErrors.push(uncaughtPromiseError);
          api.scheduleMicroTask();
        }
      }
    }
    return promise;
  }
  const REJECTION_HANDLED_HANDLER = __symbol__("rejectionHandledHandler");
  function clearRejectedNoCatch(promise) {
    if (promise[symbolState] === REJECTED_NO_CATCH) {
      try {
        const handler = Zone2[REJECTION_HANDLED_HANDLER];
        if (handler && typeof handler === "function") {
          handler.call(this, { rejection: promise[symbolValue], promise });
        }
      } catch (err) {
      }
      promise[symbolState] = REJECTED;
      for (let i = 0; i < _uncaughtPromiseErrors.length; i++) {
        if (promise === _uncaughtPromiseErrors[i].promise) {
          _uncaughtPromiseErrors.splice(i, 1);
        }
      }
    }
  }
  function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
    clearRejectedNoCatch(promise);
    const promiseState = promise[symbolState];
    const delegate = promiseState ? typeof onFulfilled === "function" ? onFulfilled : forwardResolution : typeof onRejected === "function" ? onRejected : forwardRejection;
    zone.scheduleMicroTask(source, () => {
      try {
        const parentPromiseValue = promise[symbolValue];
        const isFinallyPromise = !!chainPromise && symbolFinally === chainPromise[symbolFinally];
        if (isFinallyPromise) {
          chainPromise[symbolParentPromiseValue] = parentPromiseValue;
          chainPromise[symbolParentPromiseState] = promiseState;
        }
        const value = zone.run(delegate, void 0, isFinallyPromise && delegate !== forwardRejection && delegate !== forwardResolution ? [] : [parentPromiseValue]);
        resolvePromise(chainPromise, true, value);
      } catch (error2) {
        resolvePromise(chainPromise, false, error2);
      }
    }, chainPromise);
  }
  const ZONE_AWARE_PROMISE_TO_STRING = "function ZoneAwarePromise() { [native code] }";
  const noop = function() {
  };
  const AggregateError = global2.AggregateError;
  class ZoneAwarePromise {
    static toString() {
      return ZONE_AWARE_PROMISE_TO_STRING;
    }
    static resolve(value) {
      return resolvePromise(new this(null), RESOLVED, value);
    }
    static reject(error2) {
      return resolvePromise(new this(null), REJECTED, error2);
    }
    static any(values) {
      if (!values || typeof values[Symbol.iterator] !== "function") {
        return Promise.reject(new AggregateError([], "All promises were rejected"));
      }
      const promises = [];
      let count = 0;
      try {
        for (let v of values) {
          count++;
          promises.push(ZoneAwarePromise.resolve(v));
        }
      } catch (err) {
        return Promise.reject(new AggregateError([], "All promises were rejected"));
      }
      if (count === 0) {
        return Promise.reject(new AggregateError([], "All promises were rejected"));
      }
      let finished = false;
      const errors = [];
      return new ZoneAwarePromise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
          promises[i].then((v) => {
            if (finished) {
              return;
            }
            finished = true;
            resolve(v);
          }, (err) => {
            errors.push(err);
            count--;
            if (count === 0) {
              finished = true;
              reject(new AggregateError(errors, "All promises were rejected"));
            }
          });
        }
      });
    }
    static race(values) {
      let resolve;
      let reject;
      let promise = new this((res, rej) => {
        resolve = res;
        reject = rej;
      });
      function onResolve(value) {
        resolve(value);
      }
      function onReject(error2) {
        reject(error2);
      }
      for (let value of values) {
        if (!isThenable(value)) {
          value = this.resolve(value);
        }
        value.then(onResolve, onReject);
      }
      return promise;
    }
    static all(values) {
      return ZoneAwarePromise.allWithCallback(values);
    }
    static allSettled(values) {
      const P = this && this.prototype instanceof ZoneAwarePromise ? this : ZoneAwarePromise;
      return P.allWithCallback(values, {
        thenCallback: (value) => ({ status: "fulfilled", value }),
        errorCallback: (err) => ({ status: "rejected", reason: err })
      });
    }
    static allWithCallback(values, callback) {
      let resolve;
      let reject;
      let promise = new this((res, rej) => {
        resolve = res;
        reject = rej;
      });
      let unresolvedCount = 2;
      let valueIndex = 0;
      const resolvedValues = [];
      for (let value of values) {
        if (!isThenable(value)) {
          value = this.resolve(value);
        }
        const curValueIndex = valueIndex;
        try {
          value.then((value2) => {
            resolvedValues[curValueIndex] = callback ? callback.thenCallback(value2) : value2;
            unresolvedCount--;
            if (unresolvedCount === 0) {
              resolve(resolvedValues);
            }
          }, (err) => {
            if (!callback) {
              reject(err);
            } else {
              resolvedValues[curValueIndex] = callback.errorCallback(err);
              unresolvedCount--;
              if (unresolvedCount === 0) {
                resolve(resolvedValues);
              }
            }
          });
        } catch (thenErr) {
          reject(thenErr);
        }
        unresolvedCount++;
        valueIndex++;
      }
      unresolvedCount -= 2;
      if (unresolvedCount === 0) {
        resolve(resolvedValues);
      }
      return promise;
    }
    constructor(executor) {
      const promise = this;
      if (!(promise instanceof ZoneAwarePromise)) {
        throw new Error("Must be an instanceof Promise.");
      }
      promise[symbolState] = UNRESOLVED;
      promise[symbolValue] = [];
      try {
        const onceWrapper = once();
        executor && executor(onceWrapper(makeResolver(promise, RESOLVED)), onceWrapper(makeResolver(promise, REJECTED)));
      } catch (error2) {
        resolvePromise(promise, false, error2);
      }
    }
    get [Symbol.toStringTag]() {
      return "Promise";
    }
    get [Symbol.species]() {
      return ZoneAwarePromise;
    }
    then(onFulfilled, onRejected) {
      let C = this.constructor?.[Symbol.species];
      if (!C || typeof C !== "function") {
        C = this.constructor || ZoneAwarePromise;
      }
      const chainPromise = new C(noop);
      const zone = Zone2.current;
      if (this[symbolState] == UNRESOLVED) {
        this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
      } else {
        scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
      }
      return chainPromise;
    }
    catch(onRejected) {
      return this.then(null, onRejected);
    }
    finally(onFinally) {
      let C = this.constructor?.[Symbol.species];
      if (!C || typeof C !== "function") {
        C = ZoneAwarePromise;
      }
      const chainPromise = new C(noop);
      chainPromise[symbolFinally] = symbolFinally;
      const zone = Zone2.current;
      if (this[symbolState] == UNRESOLVED) {
        this[symbolValue].push(zone, chainPromise, onFinally, onFinally);
      } else {
        scheduleResolveOrReject(this, zone, chainPromise, onFinally, onFinally);
      }
      return chainPromise;
    }
  }
  ZoneAwarePromise["resolve"] = ZoneAwarePromise.resolve;
  ZoneAwarePromise["reject"] = ZoneAwarePromise.reject;
  ZoneAwarePromise["race"] = ZoneAwarePromise.race;
  ZoneAwarePromise["all"] = ZoneAwarePromise.all;
  const NativePromise = global2[symbolPromise] = global2["Promise"];
  global2["Promise"] = ZoneAwarePromise;
  const symbolThenPatched = __symbol__("thenPatched");
  function patchThen(Ctor) {
    const proto = Ctor.prototype;
    const prop = ObjectGetOwnPropertyDescriptor2(proto, "then");
    if (prop && (prop.writable === false || !prop.configurable)) {
      return;
    }
    const originalThen = proto.then;
    proto[symbolThen] = originalThen;
    Ctor.prototype.then = function(onResolve, onReject) {
      const wrapped = new ZoneAwarePromise((resolve, reject) => {
        originalThen.call(this, resolve, reject);
      });
      return wrapped.then(onResolve, onReject);
    };
    Ctor[symbolThenPatched] = true;
  }
  api.patchThen = patchThen;
  function zoneify(fn) {
    return function(self2, args) {
      let resultPromise = fn.apply(self2, args);
      if (resultPromise instanceof ZoneAwarePromise) {
        return resultPromise;
      }
      let ctor = resultPromise.constructor;
      if (!ctor[symbolThenPatched]) {
        patchThen(ctor);
      }
      return resultPromise;
    };
  }
  if (NativePromise) {
    patchThen(NativePromise);
    patchMethod(global2, "fetch", (delegate) => zoneify(delegate));
  }
  Promise[Zone2.__symbol__("uncaughtPromiseErrors")] = _uncaughtPromiseErrors;
  return ZoneAwarePromise;
});
Zone.__load_patch("toString", (global2) => {
  const originalFunctionToString = Function.prototype.toString;
  const ORIGINAL_DELEGATE_SYMBOL = zoneSymbol("OriginalDelegate");
  const PROMISE_SYMBOL = zoneSymbol("Promise");
  const ERROR_SYMBOL = zoneSymbol("Error");
  const newFunctionToString = function toString() {
    if (typeof this === "function") {
      const originalDelegate = this[ORIGINAL_DELEGATE_SYMBOL];
      if (originalDelegate) {
        if (typeof originalDelegate === "function") {
          return originalFunctionToString.call(originalDelegate);
        } else {
          return Object.prototype.toString.call(originalDelegate);
        }
      }
      if (this === Promise) {
        const nativePromise = global2[PROMISE_SYMBOL];
        if (nativePromise) {
          return originalFunctionToString.call(nativePromise);
        }
      }
      if (this === Error) {
        const nativeError = global2[ERROR_SYMBOL];
        if (nativeError) {
          return originalFunctionToString.call(nativeError);
        }
      }
    }
    return originalFunctionToString.call(this);
  };
  newFunctionToString[ORIGINAL_DELEGATE_SYMBOL] = originalFunctionToString;
  Function.prototype.toString = newFunctionToString;
  const originalObjectToString = Object.prototype.toString;
  const PROMISE_OBJECT_TO_STRING = "[object Promise]";
  Object.prototype.toString = function() {
    if (typeof Promise === "function" && this instanceof Promise) {
      return PROMISE_OBJECT_TO_STRING;
    }
    return originalObjectToString.call(this);
  };
});
var passiveSupported = false;
if (typeof window !== "undefined") {
  try {
    const options = Object.defineProperty({}, "passive", {
      get: function() {
        passiveSupported = true;
      }
    });
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (err) {
    passiveSupported = false;
  }
}
var OPTIMIZED_ZONE_EVENT_TASK_DATA = {
  useG: true
};
var zoneSymbolEventNames = {};
var globalSources = {};
var EVENT_NAME_SYMBOL_REGX = new RegExp("^" + ZONE_SYMBOL_PREFIX + "(\\w+)(true|false)$");
var IMMEDIATE_PROPAGATION_SYMBOL = zoneSymbol("propagationStopped");
function prepareEventNames(eventName, eventNameToString) {
  const falseEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + FALSE_STR;
  const trueEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + TRUE_STR;
  const symbol = ZONE_SYMBOL_PREFIX + falseEventName;
  const symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
  zoneSymbolEventNames[eventName] = {};
  zoneSymbolEventNames[eventName][FALSE_STR] = symbol;
  zoneSymbolEventNames[eventName][TRUE_STR] = symbolCapture;
}
function patchEventTarget(_global2, api, apis, patchOptions) {
  const ADD_EVENT_LISTENER = patchOptions && patchOptions.add || ADD_EVENT_LISTENER_STR;
  const REMOVE_EVENT_LISTENER = patchOptions && patchOptions.rm || REMOVE_EVENT_LISTENER_STR;
  const LISTENERS_EVENT_LISTENER = patchOptions && patchOptions.listeners || "eventListeners";
  const REMOVE_ALL_LISTENERS_EVENT_LISTENER = patchOptions && patchOptions.rmAll || "removeAllListeners";
  const zoneSymbolAddEventListener = zoneSymbol(ADD_EVENT_LISTENER);
  const ADD_EVENT_LISTENER_SOURCE = "." + ADD_EVENT_LISTENER + ":";
  const PREPEND_EVENT_LISTENER = "prependListener";
  const PREPEND_EVENT_LISTENER_SOURCE = "." + PREPEND_EVENT_LISTENER + ":";
  const invokeTask = function(task, target, event) {
    if (task.isRemoved) {
      return;
    }
    const delegate = task.callback;
    if (typeof delegate === "object" && delegate.handleEvent) {
      task.callback = (event2) => delegate.handleEvent(event2);
      task.originalDelegate = delegate;
    }
    let error2;
    try {
      task.invoke(task, target, [event]);
    } catch (err) {
      error2 = err;
    }
    const options = task.options;
    if (options && typeof options === "object" && options.once) {
      const delegate2 = task.originalDelegate ? task.originalDelegate : task.callback;
      target[REMOVE_EVENT_LISTENER].call(target, event.type, delegate2, options);
    }
    return error2;
  };
  function globalCallback(context, event, isCapture) {
    event = event || _global2.event;
    if (!event) {
      return;
    }
    const target = context || event.target || _global2;
    const tasks = target[zoneSymbolEventNames[event.type][isCapture ? TRUE_STR : FALSE_STR]];
    if (tasks) {
      const errors = [];
      if (tasks.length === 1) {
        const err = invokeTask(tasks[0], target, event);
        err && errors.push(err);
      } else {
        const copyTasks = tasks.slice();
        for (let i = 0; i < copyTasks.length; i++) {
          if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
            break;
          }
          const err = invokeTask(copyTasks[i], target, event);
          err && errors.push(err);
        }
      }
      if (errors.length === 1) {
        throw errors[0];
      } else {
        for (let i = 0; i < errors.length; i++) {
          const err = errors[i];
          api.nativeScheduleMicroTask(() => {
            throw err;
          });
        }
      }
    }
  }
  const globalZoneAwareCallback = function(event) {
    return globalCallback(this, event, false);
  };
  const globalZoneAwareCaptureCallback = function(event) {
    return globalCallback(this, event, true);
  };
  function patchEventTargetMethods(obj, patchOptions2) {
    if (!obj) {
      return false;
    }
    let useGlobalCallback = true;
    if (patchOptions2 && patchOptions2.useG !== void 0) {
      useGlobalCallback = patchOptions2.useG;
    }
    const validateHandler = patchOptions2 && patchOptions2.vh;
    let checkDuplicate = true;
    if (patchOptions2 && patchOptions2.chkDup !== void 0) {
      checkDuplicate = patchOptions2.chkDup;
    }
    let returnTarget = false;
    if (patchOptions2 && patchOptions2.rt !== void 0) {
      returnTarget = patchOptions2.rt;
    }
    let proto = obj;
    while (proto && !proto.hasOwnProperty(ADD_EVENT_LISTENER)) {
      proto = ObjectGetPrototypeOf(proto);
    }
    if (!proto && obj[ADD_EVENT_LISTENER]) {
      proto = obj;
    }
    if (!proto) {
      return false;
    }
    if (proto[zoneSymbolAddEventListener]) {
      return false;
    }
    const eventNameToString = patchOptions2 && patchOptions2.eventNameToString;
    const taskData = {};
    const nativeAddEventListener = proto[zoneSymbolAddEventListener] = proto[ADD_EVENT_LISTENER];
    const nativeRemoveEventListener = proto[zoneSymbol(REMOVE_EVENT_LISTENER)] = proto[REMOVE_EVENT_LISTENER];
    const nativeListeners = proto[zoneSymbol(LISTENERS_EVENT_LISTENER)] = proto[LISTENERS_EVENT_LISTENER];
    const nativeRemoveAllListeners = proto[zoneSymbol(REMOVE_ALL_LISTENERS_EVENT_LISTENER)] = proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER];
    let nativePrependEventListener;
    if (patchOptions2 && patchOptions2.prepend) {
      nativePrependEventListener = proto[zoneSymbol(patchOptions2.prepend)] = proto[patchOptions2.prepend];
    }
    function buildEventListenerOptions(options, passive) {
      if (!passiveSupported && typeof options === "object" && options) {
        return !!options.capture;
      }
      if (!passiveSupported || !passive) {
        return options;
      }
      if (typeof options === "boolean") {
        return { capture: options, passive: true };
      }
      if (!options) {
        return { passive: true };
      }
      if (typeof options === "object" && options.passive !== false) {
        return __spreadProps(__spreadValues({}, options), { passive: true });
      }
      return options;
    }
    const customScheduleGlobal = function(task) {
      if (taskData.isExisting) {
        return;
      }
      return nativeAddEventListener.call(taskData.target, taskData.eventName, taskData.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, taskData.options);
    };
    const customCancelGlobal = function(task) {
      if (!task.isRemoved) {
        const symbolEventNames = zoneSymbolEventNames[task.eventName];
        let symbolEventName;
        if (symbolEventNames) {
          symbolEventName = symbolEventNames[task.capture ? TRUE_STR : FALSE_STR];
        }
        const existingTasks = symbolEventName && task.target[symbolEventName];
        if (existingTasks) {
          for (let i = 0; i < existingTasks.length; i++) {
            const existingTask = existingTasks[i];
            if (existingTask === task) {
              existingTasks.splice(i, 1);
              task.isRemoved = true;
              if (existingTasks.length === 0) {
                task.allRemoved = true;
                task.target[symbolEventName] = null;
              }
              break;
            }
          }
        }
      }
      if (!task.allRemoved) {
        return;
      }
      return nativeRemoveEventListener.call(task.target, task.eventName, task.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, task.options);
    };
    const customScheduleNonGlobal = function(task) {
      return nativeAddEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
    };
    const customSchedulePrepend = function(task) {
      return nativePrependEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
    };
    const customCancelNonGlobal = function(task) {
      return nativeRemoveEventListener.call(task.target, task.eventName, task.invoke, task.options);
    };
    const customSchedule = useGlobalCallback ? customScheduleGlobal : customScheduleNonGlobal;
    const customCancel = useGlobalCallback ? customCancelGlobal : customCancelNonGlobal;
    const compareTaskCallbackVsDelegate = function(task, delegate) {
      const typeOfDelegate = typeof delegate;
      return typeOfDelegate === "function" && task.callback === delegate || typeOfDelegate === "object" && task.originalDelegate === delegate;
    };
    const compare = patchOptions2 && patchOptions2.diff ? patchOptions2.diff : compareTaskCallbackVsDelegate;
    const unpatchedEvents = Zone[zoneSymbol("UNPATCHED_EVENTS")];
    const passiveEvents = _global2[zoneSymbol("PASSIVE_EVENTS")];
    const makeAddListener = function(nativeListener, addSource, customScheduleFn, customCancelFn, returnTarget2 = false, prepend = false) {
      return function() {
        const target = this || _global2;
        let eventName = arguments[0];
        if (patchOptions2 && patchOptions2.transferEventName) {
          eventName = patchOptions2.transferEventName(eventName);
        }
        let delegate = arguments[1];
        if (!delegate) {
          return nativeListener.apply(this, arguments);
        }
        if (isNode && eventName === "uncaughtException") {
          return nativeListener.apply(this, arguments);
        }
        let isHandleEvent = false;
        if (typeof delegate !== "function") {
          if (!delegate.handleEvent) {
            return nativeListener.apply(this, arguments);
          }
          isHandleEvent = true;
        }
        if (validateHandler && !validateHandler(nativeListener, delegate, target, arguments)) {
          return;
        }
        const passive = passiveSupported && !!passiveEvents && passiveEvents.indexOf(eventName) !== -1;
        const options = buildEventListenerOptions(arguments[2], passive);
        if (unpatchedEvents) {
          for (let i = 0; i < unpatchedEvents.length; i++) {
            if (eventName === unpatchedEvents[i]) {
              if (passive) {
                return nativeListener.call(target, eventName, delegate, options);
              } else {
                return nativeListener.apply(this, arguments);
              }
            }
          }
        }
        const capture = !options ? false : typeof options === "boolean" ? true : options.capture;
        const once = options && typeof options === "object" ? options.once : false;
        const zone = Zone.current;
        let symbolEventNames = zoneSymbolEventNames[eventName];
        if (!symbolEventNames) {
          prepareEventNames(eventName, eventNameToString);
          symbolEventNames = zoneSymbolEventNames[eventName];
        }
        const symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
        let existingTasks = target[symbolEventName];
        let isExisting = false;
        if (existingTasks) {
          isExisting = true;
          if (checkDuplicate) {
            for (let i = 0; i < existingTasks.length; i++) {
              if (compare(existingTasks[i], delegate)) {
                return;
              }
            }
          }
        } else {
          existingTasks = target[symbolEventName] = [];
        }
        let source;
        const constructorName = target.constructor["name"];
        const targetSource = globalSources[constructorName];
        if (targetSource) {
          source = targetSource[eventName];
        }
        if (!source) {
          source = constructorName + addSource + (eventNameToString ? eventNameToString(eventName) : eventName);
        }
        taskData.options = options;
        if (once) {
          taskData.options.once = false;
        }
        taskData.target = target;
        taskData.capture = capture;
        taskData.eventName = eventName;
        taskData.isExisting = isExisting;
        const data = useGlobalCallback ? OPTIMIZED_ZONE_EVENT_TASK_DATA : void 0;
        if (data) {
          data.taskData = taskData;
        }
        const task = zone.scheduleEventTask(source, delegate, data, customScheduleFn, customCancelFn);
        taskData.target = null;
        if (data) {
          data.taskData = null;
        }
        if (once) {
          options.once = true;
        }
        if (!(!passiveSupported && typeof task.options === "boolean")) {
          task.options = options;
        }
        task.target = target;
        task.capture = capture;
        task.eventName = eventName;
        if (isHandleEvent) {
          task.originalDelegate = delegate;
        }
        if (!prepend) {
          existingTasks.push(task);
        } else {
          existingTasks.unshift(task);
        }
        if (returnTarget2) {
          return target;
        }
      };
    };
    proto[ADD_EVENT_LISTENER] = makeAddListener(nativeAddEventListener, ADD_EVENT_LISTENER_SOURCE, customSchedule, customCancel, returnTarget);
    if (nativePrependEventListener) {
      proto[PREPEND_EVENT_LISTENER] = makeAddListener(nativePrependEventListener, PREPEND_EVENT_LISTENER_SOURCE, customSchedulePrepend, customCancel, returnTarget, true);
    }
    proto[REMOVE_EVENT_LISTENER] = function() {
      const target = this || _global2;
      let eventName = arguments[0];
      if (patchOptions2 && patchOptions2.transferEventName) {
        eventName = patchOptions2.transferEventName(eventName);
      }
      const options = arguments[2];
      const capture = !options ? false : typeof options === "boolean" ? true : options.capture;
      const delegate = arguments[1];
      if (!delegate) {
        return nativeRemoveEventListener.apply(this, arguments);
      }
      if (validateHandler && !validateHandler(nativeRemoveEventListener, delegate, target, arguments)) {
        return;
      }
      const symbolEventNames = zoneSymbolEventNames[eventName];
      let symbolEventName;
      if (symbolEventNames) {
        symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
      }
      const existingTasks = symbolEventName && target[symbolEventName];
      if (existingTasks) {
        for (let i = 0; i < existingTasks.length; i++) {
          const existingTask = existingTasks[i];
          if (compare(existingTask, delegate)) {
            existingTasks.splice(i, 1);
            existingTask.isRemoved = true;
            if (existingTasks.length === 0) {
              existingTask.allRemoved = true;
              target[symbolEventName] = null;
              if (typeof eventName === "string") {
                const onPropertySymbol = ZONE_SYMBOL_PREFIX + "ON_PROPERTY" + eventName;
                target[onPropertySymbol] = null;
              }
            }
            existingTask.zone.cancelTask(existingTask);
            if (returnTarget) {
              return target;
            }
            return;
          }
        }
      }
      return nativeRemoveEventListener.apply(this, arguments);
    };
    proto[LISTENERS_EVENT_LISTENER] = function() {
      const target = this || _global2;
      let eventName = arguments[0];
      if (patchOptions2 && patchOptions2.transferEventName) {
        eventName = patchOptions2.transferEventName(eventName);
      }
      const listeners = [];
      const tasks = findEventTasks(target, eventNameToString ? eventNameToString(eventName) : eventName);
      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
        listeners.push(delegate);
      }
      return listeners;
    };
    proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER] = function() {
      const target = this || _global2;
      let eventName = arguments[0];
      if (!eventName) {
        const keys = Object.keys(target);
        for (let i = 0; i < keys.length; i++) {
          const prop = keys[i];
          const match = EVENT_NAME_SYMBOL_REGX.exec(prop);
          let evtName = match && match[1];
          if (evtName && evtName !== "removeListener") {
            this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, evtName);
          }
        }
        this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, "removeListener");
      } else {
        if (patchOptions2 && patchOptions2.transferEventName) {
          eventName = patchOptions2.transferEventName(eventName);
        }
        const symbolEventNames = zoneSymbolEventNames[eventName];
        if (symbolEventNames) {
          const symbolEventName = symbolEventNames[FALSE_STR];
          const symbolCaptureEventName = symbolEventNames[TRUE_STR];
          const tasks = target[symbolEventName];
          const captureTasks = target[symbolCaptureEventName];
          if (tasks) {
            const removeTasks = tasks.slice();
            for (let i = 0; i < removeTasks.length; i++) {
              const task = removeTasks[i];
              let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
              this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
            }
          }
          if (captureTasks) {
            const removeTasks = captureTasks.slice();
            for (let i = 0; i < removeTasks.length; i++) {
              const task = removeTasks[i];
              let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
              this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
            }
          }
        }
      }
      if (returnTarget) {
        return this;
      }
    };
    attachOriginToPatched(proto[ADD_EVENT_LISTENER], nativeAddEventListener);
    attachOriginToPatched(proto[REMOVE_EVENT_LISTENER], nativeRemoveEventListener);
    if (nativeRemoveAllListeners) {
      attachOriginToPatched(proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER], nativeRemoveAllListeners);
    }
    if (nativeListeners) {
      attachOriginToPatched(proto[LISTENERS_EVENT_LISTENER], nativeListeners);
    }
    return true;
  }
  let results = [];
  for (let i = 0; i < apis.length; i++) {
    results[i] = patchEventTargetMethods(apis[i], patchOptions);
  }
  return results;
}
function findEventTasks(target, eventName) {
  if (!eventName) {
    const foundTasks = [];
    for (let prop in target) {
      const match = EVENT_NAME_SYMBOL_REGX.exec(prop);
      let evtName = match && match[1];
      if (evtName && (!eventName || evtName === eventName)) {
        const tasks = target[prop];
        if (tasks) {
          for (let i = 0; i < tasks.length; i++) {
            foundTasks.push(tasks[i]);
          }
        }
      }
    }
    return foundTasks;
  }
  let symbolEventName = zoneSymbolEventNames[eventName];
  if (!symbolEventName) {
    prepareEventNames(eventName);
    symbolEventName = zoneSymbolEventNames[eventName];
  }
  const captureFalseTasks = target[symbolEventName[FALSE_STR]];
  const captureTrueTasks = target[symbolEventName[TRUE_STR]];
  if (!captureFalseTasks) {
    return captureTrueTasks ? captureTrueTasks.slice() : [];
  } else {
    return captureTrueTasks ? captureFalseTasks.concat(captureTrueTasks) : captureFalseTasks.slice();
  }
}
function patchEventPrototype(global2, api) {
  const Event = global2["Event"];
  if (Event && Event.prototype) {
    api.patchMethod(Event.prototype, "stopImmediatePropagation", (delegate) => function(self2, args) {
      self2[IMMEDIATE_PROPAGATION_SYMBOL] = true;
      delegate && delegate.apply(self2, args);
    });
  }
}
function patchCallbacks(api, target, targetName, method, callbacks) {
  const symbol = Zone.__symbol__(method);
  if (target[symbol]) {
    return;
  }
  const nativeDelegate = target[symbol] = target[method];
  target[method] = function(name, opts, options) {
    if (opts && opts.prototype) {
      callbacks.forEach(function(callback) {
        const source = `${targetName}.${method}::` + callback;
        const prototype = opts.prototype;
        try {
          if (prototype.hasOwnProperty(callback)) {
            const descriptor = api.ObjectGetOwnPropertyDescriptor(prototype, callback);
            if (descriptor && descriptor.value) {
              descriptor.value = api.wrapWithCurrentZone(descriptor.value, source);
              api._redefineProperty(opts.prototype, callback, descriptor);
            } else if (prototype[callback]) {
              prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source);
            }
          } else if (prototype[callback]) {
            prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source);
          }
        } catch {
        }
      });
    }
    return nativeDelegate.call(target, name, opts, options);
  };
  api.attachOriginToPatched(target[method], nativeDelegate);
}
function filterProperties(target, onProperties, ignoreProperties) {
  if (!ignoreProperties || ignoreProperties.length === 0) {
    return onProperties;
  }
  const tip = ignoreProperties.filter((ip) => ip.target === target);
  if (!tip || tip.length === 0) {
    return onProperties;
  }
  const targetIgnoreProperties = tip[0].ignoreProperties;
  return onProperties.filter((op) => targetIgnoreProperties.indexOf(op) === -1);
}
function patchFilteredProperties(target, onProperties, ignoreProperties, prototype) {
  if (!target) {
    return;
  }
  const filteredProperties = filterProperties(target, onProperties, ignoreProperties);
  patchOnProperties(target, filteredProperties, prototype);
}
function getOnEventNames(target) {
  return Object.getOwnPropertyNames(target).filter((name) => name.startsWith("on") && name.length > 2).map((name) => name.substring(2));
}
function propertyDescriptorPatch(api, _global2) {
  if (isNode && !isMix) {
    return;
  }
  if (Zone[api.symbol("patchEvents")]) {
    return;
  }
  const ignoreProperties = _global2["__Zone_ignore_on_properties"];
  let patchTargets = [];
  if (isBrowser) {
    const internalWindow2 = window;
    patchTargets = patchTargets.concat([
      "Document",
      "SVGElement",
      "Element",
      "HTMLElement",
      "HTMLBodyElement",
      "HTMLMediaElement",
      "HTMLFrameSetElement",
      "HTMLFrameElement",
      "HTMLIFrameElement",
      "HTMLMarqueeElement",
      "Worker"
    ]);
    const ignoreErrorProperties = isIE() ? [{ target: internalWindow2, ignoreProperties: ["error"] }] : [];
    patchFilteredProperties(internalWindow2, getOnEventNames(internalWindow2), ignoreProperties ? ignoreProperties.concat(ignoreErrorProperties) : ignoreProperties, ObjectGetPrototypeOf(internalWindow2));
  }
  patchTargets = patchTargets.concat([
    "XMLHttpRequest",
    "XMLHttpRequestEventTarget",
    "IDBIndex",
    "IDBRequest",
    "IDBOpenDBRequest",
    "IDBDatabase",
    "IDBTransaction",
    "IDBCursor",
    "WebSocket"
  ]);
  for (let i = 0; i < patchTargets.length; i++) {
    const target = _global2[patchTargets[i]];
    target && target.prototype && patchFilteredProperties(target.prototype, getOnEventNames(target.prototype), ignoreProperties);
  }
}
Zone.__load_patch("util", (global2, Zone2, api) => {
  const eventNames = getOnEventNames(global2);
  api.patchOnProperties = patchOnProperties;
  api.patchMethod = patchMethod;
  api.bindArguments = bindArguments;
  api.patchMacroTask = patchMacroTask;
  const SYMBOL_BLACK_LISTED_EVENTS = Zone2.__symbol__("BLACK_LISTED_EVENTS");
  const SYMBOL_UNPATCHED_EVENTS = Zone2.__symbol__("UNPATCHED_EVENTS");
  if (global2[SYMBOL_UNPATCHED_EVENTS]) {
    global2[SYMBOL_BLACK_LISTED_EVENTS] = global2[SYMBOL_UNPATCHED_EVENTS];
  }
  if (global2[SYMBOL_BLACK_LISTED_EVENTS]) {
    Zone2[SYMBOL_BLACK_LISTED_EVENTS] = Zone2[SYMBOL_UNPATCHED_EVENTS] = global2[SYMBOL_BLACK_LISTED_EVENTS];
  }
  api.patchEventPrototype = patchEventPrototype;
  api.patchEventTarget = patchEventTarget;
  api.isIEOrEdge = isIEOrEdge;
  api.ObjectDefineProperty = ObjectDefineProperty;
  api.ObjectGetOwnPropertyDescriptor = ObjectGetOwnPropertyDescriptor;
  api.ObjectCreate = ObjectCreate;
  api.ArraySlice = ArraySlice;
  api.patchClass = patchClass;
  api.wrapWithCurrentZone = wrapWithCurrentZone;
  api.filterProperties = filterProperties;
  api.attachOriginToPatched = attachOriginToPatched;
  api._redefineProperty = Object.defineProperty;
  api.patchCallbacks = patchCallbacks;
  api.getGlobalObjects = () => ({
    globalSources,
    zoneSymbolEventNames,
    eventNames,
    isBrowser,
    isMix,
    isNode,
    TRUE_STR,
    FALSE_STR,
    ZONE_SYMBOL_PREFIX,
    ADD_EVENT_LISTENER_STR,
    REMOVE_EVENT_LISTENER_STR
  });
});
function patchQueueMicrotask(global2, api) {
  api.patchMethod(global2, "queueMicrotask", (delegate) => {
    return function(self2, args) {
      Zone.current.scheduleMicroTask("queueMicrotask", args[0]);
    };
  });
}
var taskSymbol = zoneSymbol("zoneTask");
function patchTimer(window2, setName, cancelName, nameSuffix) {
  let setNative = null;
  let clearNative = null;
  setName += nameSuffix;
  cancelName += nameSuffix;
  const tasksByHandleId = {};
  function scheduleTask(task) {
    const data = task.data;
    data.args[0] = function() {
      return task.invoke.apply(this, arguments);
    };
    data.handleId = setNative.apply(window2, data.args);
    return task;
  }
  function clearTask(task) {
    return clearNative.call(window2, task.data.handleId);
  }
  setNative = patchMethod(window2, setName, (delegate) => function(self2, args) {
    if (typeof args[0] === "function") {
      const options = {
        isPeriodic: nameSuffix === "Interval",
        delay: nameSuffix === "Timeout" || nameSuffix === "Interval" ? args[1] || 0 : void 0,
        args
      };
      const callback = args[0];
      args[0] = function timer() {
        try {
          return callback.apply(this, arguments);
        } finally {
          if (!options.isPeriodic) {
            if (typeof options.handleId === "number") {
              delete tasksByHandleId[options.handleId];
            } else if (options.handleId) {
              options.handleId[taskSymbol] = null;
            }
          }
        }
      };
      const task = scheduleMacroTaskWithCurrentZone(setName, args[0], options, scheduleTask, clearTask);
      if (!task) {
        return task;
      }
      const handle = task.data.handleId;
      if (typeof handle === "number") {
        tasksByHandleId[handle] = task;
      } else if (handle) {
        handle[taskSymbol] = task;
      }
      if (handle && handle.ref && handle.unref && typeof handle.ref === "function" && typeof handle.unref === "function") {
        task.ref = handle.ref.bind(handle);
        task.unref = handle.unref.bind(handle);
      }
      if (typeof handle === "number" || handle) {
        return handle;
      }
      return task;
    } else {
      return delegate.apply(window2, args);
    }
  });
  clearNative = patchMethod(window2, cancelName, (delegate) => function(self2, args) {
    const id = args[0];
    let task;
    if (typeof id === "number") {
      task = tasksByHandleId[id];
    } else {
      task = id && id[taskSymbol];
      if (!task) {
        task = id;
      }
    }
    if (task && typeof task.type === "string") {
      if (task.state !== "notScheduled" && (task.cancelFn && task.data.isPeriodic || task.runCount === 0)) {
        if (typeof id === "number") {
          delete tasksByHandleId[id];
        } else if (id) {
          id[taskSymbol] = null;
        }
        task.zone.cancelTask(task);
      }
    } else {
      delegate.apply(window2, args);
    }
  });
}
function patchCustomElements(_global2, api) {
  const { isBrowser: isBrowser2, isMix: isMix2 } = api.getGlobalObjects();
  if (!isBrowser2 && !isMix2 || !_global2["customElements"] || !("customElements" in _global2)) {
    return;
  }
  const callbacks = ["connectedCallback", "disconnectedCallback", "adoptedCallback", "attributeChangedCallback"];
  api.patchCallbacks(api, _global2.customElements, "customElements", "define", callbacks);
}
function eventTargetPatch(_global2, api) {
  if (Zone[api.symbol("patchEventTarget")]) {
    return;
  }
  const { eventNames, zoneSymbolEventNames: zoneSymbolEventNames2, TRUE_STR: TRUE_STR2, FALSE_STR: FALSE_STR2, ZONE_SYMBOL_PREFIX: ZONE_SYMBOL_PREFIX2 } = api.getGlobalObjects();
  for (let i = 0; i < eventNames.length; i++) {
    const eventName = eventNames[i];
    const falseEventName = eventName + FALSE_STR2;
    const trueEventName = eventName + TRUE_STR2;
    const symbol = ZONE_SYMBOL_PREFIX2 + falseEventName;
    const symbolCapture = ZONE_SYMBOL_PREFIX2 + trueEventName;
    zoneSymbolEventNames2[eventName] = {};
    zoneSymbolEventNames2[eventName][FALSE_STR2] = symbol;
    zoneSymbolEventNames2[eventName][TRUE_STR2] = symbolCapture;
  }
  const EVENT_TARGET = _global2["EventTarget"];
  if (!EVENT_TARGET || !EVENT_TARGET.prototype) {
    return;
  }
  api.patchEventTarget(_global2, api, [EVENT_TARGET && EVENT_TARGET.prototype]);
  return true;
}
function patchEvent(global2, api) {
  api.patchEventPrototype(global2, api);
}
Zone.__load_patch("legacy", (global2) => {
  const legacyPatch = global2[Zone.__symbol__("legacyPatch")];
  if (legacyPatch) {
    legacyPatch();
  }
});
Zone.__load_patch("timers", (global2) => {
  const set = "set";
  const clear = "clear";
  patchTimer(global2, set, clear, "Timeout");
  patchTimer(global2, set, clear, "Interval");
  patchTimer(global2, set, clear, "Immediate");
});
Zone.__load_patch("requestAnimationFrame", (global2) => {
  patchTimer(global2, "request", "cancel", "AnimationFrame");
  patchTimer(global2, "mozRequest", "mozCancel", "AnimationFrame");
  patchTimer(global2, "webkitRequest", "webkitCancel", "AnimationFrame");
});
Zone.__load_patch("blocking", (global2, Zone2) => {
  const blockingMethods = ["alert", "prompt", "confirm"];
  for (let i = 0; i < blockingMethods.length; i++) {
    const name = blockingMethods[i];
    patchMethod(global2, name, (delegate, symbol, name2) => {
      return function(s, args) {
        return Zone2.current.run(delegate, global2, args, name2);
      };
    });
  }
});
Zone.__load_patch("EventTarget", (global2, Zone2, api) => {
  patchEvent(global2, api);
  eventTargetPatch(global2, api);
  const XMLHttpRequestEventTarget = global2["XMLHttpRequestEventTarget"];
  if (XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype) {
    api.patchEventTarget(global2, api, [XMLHttpRequestEventTarget.prototype]);
  }
});
Zone.__load_patch("MutationObserver", (global2, Zone2, api) => {
  patchClass("MutationObserver");
  patchClass("WebKitMutationObserver");
});
Zone.__load_patch("IntersectionObserver", (global2, Zone2, api) => {
  patchClass("IntersectionObserver");
});
Zone.__load_patch("FileReader", (global2, Zone2, api) => {
  patchClass("FileReader");
});
Zone.__load_patch("on_property", (global2, Zone2, api) => {
  propertyDescriptorPatch(api, global2);
});
Zone.__load_patch("customElements", (global2, Zone2, api) => {
  patchCustomElements(global2, api);
});
Zone.__load_patch("XHR", (global2, Zone2) => {
  patchXHR(global2);
  const XHR_TASK = zoneSymbol("xhrTask");
  const XHR_SYNC = zoneSymbol("xhrSync");
  const XHR_LISTENER = zoneSymbol("xhrListener");
  const XHR_SCHEDULED = zoneSymbol("xhrScheduled");
  const XHR_URL = zoneSymbol("xhrURL");
  const XHR_ERROR_BEFORE_SCHEDULED = zoneSymbol("xhrErrorBeforeScheduled");
  function patchXHR(window2) {
    const XMLHttpRequest = window2["XMLHttpRequest"];
    if (!XMLHttpRequest) {
      return;
    }
    const XMLHttpRequestPrototype = XMLHttpRequest.prototype;
    function findPendingTask(target) {
      return target[XHR_TASK];
    }
    let oriAddListener = XMLHttpRequestPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
    let oriRemoveListener = XMLHttpRequestPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
    if (!oriAddListener) {
      const XMLHttpRequestEventTarget = window2["XMLHttpRequestEventTarget"];
      if (XMLHttpRequestEventTarget) {
        const XMLHttpRequestEventTargetPrototype = XMLHttpRequestEventTarget.prototype;
        oriAddListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
        oriRemoveListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
      }
    }
    const READY_STATE_CHANGE = "readystatechange";
    const SCHEDULED = "scheduled";
    function scheduleTask(task) {
      const data = task.data;
      const target = data.target;
      target[XHR_SCHEDULED] = false;
      target[XHR_ERROR_BEFORE_SCHEDULED] = false;
      const listener = target[XHR_LISTENER];
      if (!oriAddListener) {
        oriAddListener = target[ZONE_SYMBOL_ADD_EVENT_LISTENER];
        oriRemoveListener = target[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
      }
      if (listener) {
        oriRemoveListener.call(target, READY_STATE_CHANGE, listener);
      }
      const newListener = target[XHR_LISTENER] = () => {
        if (target.readyState === target.DONE) {
          if (!data.aborted && target[XHR_SCHEDULED] && task.state === SCHEDULED) {
            const loadTasks = target[Zone2.__symbol__("loadfalse")];
            if (target.status !== 0 && loadTasks && loadTasks.length > 0) {
              const oriInvoke = task.invoke;
              task.invoke = function() {
                const loadTasks2 = target[Zone2.__symbol__("loadfalse")];
                for (let i = 0; i < loadTasks2.length; i++) {
                  if (loadTasks2[i] === task) {
                    loadTasks2.splice(i, 1);
                  }
                }
                if (!data.aborted && task.state === SCHEDULED) {
                  oriInvoke.call(task);
                }
              };
              loadTasks.push(task);
            } else {
              task.invoke();
            }
          } else if (!data.aborted && target[XHR_SCHEDULED] === false) {
            target[XHR_ERROR_BEFORE_SCHEDULED] = true;
          }
        }
      };
      oriAddListener.call(target, READY_STATE_CHANGE, newListener);
      const storedTask = target[XHR_TASK];
      if (!storedTask) {
        target[XHR_TASK] = task;
      }
      sendNative.apply(target, data.args);
      target[XHR_SCHEDULED] = true;
      return task;
    }
    function placeholderCallback() {
    }
    function clearTask(task) {
      const data = task.data;
      data.aborted = true;
      return abortNative.apply(data.target, data.args);
    }
    const openNative = patchMethod(XMLHttpRequestPrototype, "open", () => function(self2, args) {
      self2[XHR_SYNC] = args[2] == false;
      self2[XHR_URL] = args[1];
      return openNative.apply(self2, args);
    });
    const XMLHTTPREQUEST_SOURCE = "XMLHttpRequest.send";
    const fetchTaskAborting = zoneSymbol("fetchTaskAborting");
    const fetchTaskScheduling = zoneSymbol("fetchTaskScheduling");
    const sendNative = patchMethod(XMLHttpRequestPrototype, "send", () => function(self2, args) {
      if (Zone2.current[fetchTaskScheduling] === true) {
        return sendNative.apply(self2, args);
      }
      if (self2[XHR_SYNC]) {
        return sendNative.apply(self2, args);
      } else {
        const options = { target: self2, url: self2[XHR_URL], isPeriodic: false, args, aborted: false };
        const task = scheduleMacroTaskWithCurrentZone(XMLHTTPREQUEST_SOURCE, placeholderCallback, options, scheduleTask, clearTask);
        if (self2 && self2[XHR_ERROR_BEFORE_SCHEDULED] === true && !options.aborted && task.state === SCHEDULED) {
          task.invoke();
        }
      }
    });
    const abortNative = patchMethod(XMLHttpRequestPrototype, "abort", () => function(self2, args) {
      const task = findPendingTask(self2);
      if (task && typeof task.type == "string") {
        if (task.cancelFn == null || task.data && task.data.aborted) {
          return;
        }
        task.zone.cancelTask(task);
      } else if (Zone2.current[fetchTaskAborting] === true) {
        return abortNative.apply(self2, args);
      }
    });
  }
});
Zone.__load_patch("geolocation", (global2) => {
  if (global2["navigator"] && global2["navigator"].geolocation) {
    patchPrototype(global2["navigator"].geolocation, ["getCurrentPosition", "watchPosition"]);
  }
});
Zone.__load_patch("PromiseRejectionEvent", (global2, Zone2) => {
  function findPromiseRejectionHandler(evtName) {
    return function(e) {
      const eventTasks = findEventTasks(global2, evtName);
      eventTasks.forEach((eventTask) => {
        const PromiseRejectionEvent = global2["PromiseRejectionEvent"];
        if (PromiseRejectionEvent) {
          const evt = new PromiseRejectionEvent(evtName, { promise: e.promise, reason: e.rejection });
          eventTask.invoke(evt);
        }
      });
    };
  }
  if (global2["PromiseRejectionEvent"]) {
    Zone2[zoneSymbol("unhandledPromiseRejectionHandler")] = findPromiseRejectionHandler("unhandledrejection");
    Zone2[zoneSymbol("rejectionHandledHandler")] = findPromiseRejectionHandler("rejectionhandled");
  }
});
Zone.__load_patch("queueMicrotask", (global2, Zone2, api) => {
  patchQueueMicrotask(global2, api);
});

// node_modules/zone.js/fesm2015/zone-testing.js
var NEWLINE = "\n";
var IGNORE_FRAMES = {};
var creationTrace = "__creationTrace__";
var ERROR_TAG = "STACKTRACE TRACKING";
var SEP_TAG = "__SEP_TAG__";
var sepTemplate = SEP_TAG + "@[native]";
var LongStackTrace = class {
  constructor() {
    this.error = getStacktrace();
    this.timestamp = /* @__PURE__ */ new Date();
  }
};
function getStacktraceWithUncaughtError() {
  return new Error(ERROR_TAG);
}
function getStacktraceWithCaughtError() {
  try {
    throw getStacktraceWithUncaughtError();
  } catch (err) {
    return err;
  }
}
var error = getStacktraceWithUncaughtError();
var caughtError = getStacktraceWithCaughtError();
var getStacktrace = error.stack ? getStacktraceWithUncaughtError : caughtError.stack ? getStacktraceWithCaughtError : getStacktraceWithUncaughtError;
function getFrames(error2) {
  return error2.stack ? error2.stack.split(NEWLINE) : [];
}
function addErrorStack(lines, error2) {
  let trace = getFrames(error2);
  for (let i = 0; i < trace.length; i++) {
    const frame = trace[i];
    if (!IGNORE_FRAMES.hasOwnProperty(frame)) {
      lines.push(trace[i]);
    }
  }
}
function renderLongStackTrace(frames, stack) {
  const longTrace = [stack ? stack.trim() : ""];
  if (frames) {
    let timestamp = (/* @__PURE__ */ new Date()).getTime();
    for (let i = 0; i < frames.length; i++) {
      const traceFrames = frames[i];
      const lastTime = traceFrames.timestamp;
      let separator = `____________________Elapsed ${timestamp - lastTime.getTime()} ms; At: ${lastTime}`;
      separator = separator.replace(/[^\w\d]/g, "_");
      longTrace.push(sepTemplate.replace(SEP_TAG, separator));
      addErrorStack(longTrace, traceFrames.error);
      timestamp = lastTime.getTime();
    }
  }
  return longTrace.join(NEWLINE);
}
function stackTracesEnabled() {
  return Error.stackTraceLimit > 0;
}
Zone["longStackTraceZoneSpec"] = {
  name: "long-stack-trace",
  longStackTraceLimit: 10,
  // add a getLongStackTrace method in spec to
  // handle handled reject promise error.
  getLongStackTrace: function(error2) {
    if (!error2) {
      return void 0;
    }
    const trace = error2[Zone.__symbol__("currentTaskTrace")];
    if (!trace) {
      return error2.stack;
    }
    return renderLongStackTrace(trace, error2.stack);
  },
  onScheduleTask: function(parentZoneDelegate, currentZone, targetZone, task) {
    if (stackTracesEnabled()) {
      const currentTask = Zone.currentTask;
      let trace = currentTask && currentTask.data && currentTask.data[creationTrace] || [];
      trace = [new LongStackTrace()].concat(trace);
      if (trace.length > this.longStackTraceLimit) {
        trace.length = this.longStackTraceLimit;
      }
      if (!task.data)
        task.data = {};
      if (task.type === "eventTask") {
        task.data = __spreadValues({}, task.data);
      }
      task.data[creationTrace] = trace;
    }
    return parentZoneDelegate.scheduleTask(targetZone, task);
  },
  onHandleError: function(parentZoneDelegate, currentZone, targetZone, error2) {
    if (stackTracesEnabled()) {
      const parentTask = Zone.currentTask || error2.task;
      if (error2 instanceof Error && parentTask) {
        const longStack = renderLongStackTrace(parentTask.data && parentTask.data[creationTrace], error2.stack);
        try {
          error2.stack = error2.longStack = longStack;
        } catch (err) {
        }
      }
    }
    return parentZoneDelegate.handleError(targetZone, error2);
  }
};
function captureStackTraces(stackTraces, count) {
  if (count > 0) {
    stackTraces.push(getFrames(new LongStackTrace().error));
    captureStackTraces(stackTraces, count - 1);
  }
}
function computeIgnoreFrames() {
  if (!stackTracesEnabled()) {
    return;
  }
  const frames = [];
  captureStackTraces(frames, 2);
  const frames1 = frames[0];
  const frames2 = frames[1];
  for (let i = 0; i < frames1.length; i++) {
    const frame1 = frames1[i];
    if (frame1.indexOf(ERROR_TAG) == -1) {
      let match = frame1.match(/^\s*at\s+/);
      if (match) {
        sepTemplate = match[0] + SEP_TAG + " (http://localhost)";
        break;
      }
    }
  }
  for (let i = 0; i < frames1.length; i++) {
    const frame1 = frames1[i];
    const frame2 = frames2[i];
    if (frame1 === frame2) {
      IGNORE_FRAMES[frame1] = true;
    } else {
      break;
    }
  }
}
computeIgnoreFrames();
var ProxyZoneSpec = class _ProxyZoneSpec {
  static get() {
    return Zone.current.get("ProxyZoneSpec");
  }
  static isLoaded() {
    return _ProxyZoneSpec.get() instanceof _ProxyZoneSpec;
  }
  static assertPresent() {
    if (!_ProxyZoneSpec.isLoaded()) {
      throw new Error(`Expected to be running in 'ProxyZone', but it was not found.`);
    }
    return _ProxyZoneSpec.get();
  }
  constructor(defaultSpecDelegate = null) {
    this.defaultSpecDelegate = defaultSpecDelegate;
    this.name = "ProxyZone";
    this._delegateSpec = null;
    this.properties = { "ProxyZoneSpec": this };
    this.propertyKeys = null;
    this.lastTaskState = null;
    this.isNeedToTriggerHasTask = false;
    this.tasks = [];
    this.setDelegate(defaultSpecDelegate);
  }
  setDelegate(delegateSpec) {
    const isNewDelegate = this._delegateSpec !== delegateSpec;
    this._delegateSpec = delegateSpec;
    this.propertyKeys && this.propertyKeys.forEach((key) => delete this.properties[key]);
    this.propertyKeys = null;
    if (delegateSpec && delegateSpec.properties) {
      this.propertyKeys = Object.keys(delegateSpec.properties);
      this.propertyKeys.forEach((k) => this.properties[k] = delegateSpec.properties[k]);
    }
    if (isNewDelegate && this.lastTaskState && (this.lastTaskState.macroTask || this.lastTaskState.microTask)) {
      this.isNeedToTriggerHasTask = true;
    }
  }
  getDelegate() {
    return this._delegateSpec;
  }
  resetDelegate() {
    this.getDelegate();
    this.setDelegate(this.defaultSpecDelegate);
  }
  tryTriggerHasTask(parentZoneDelegate, currentZone, targetZone) {
    if (this.isNeedToTriggerHasTask && this.lastTaskState) {
      this.isNeedToTriggerHasTask = false;
      this.onHasTask(parentZoneDelegate, currentZone, targetZone, this.lastTaskState);
    }
  }
  removeFromTasks(task) {
    if (!this.tasks) {
      return;
    }
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i] === task) {
        this.tasks.splice(i, 1);
        return;
      }
    }
  }
  getAndClearPendingTasksInfo() {
    if (this.tasks.length === 0) {
      return "";
    }
    const taskInfo = this.tasks.map((task) => {
      const dataInfo = task.data && Object.keys(task.data).map((key) => {
        return key + ":" + task.data[key];
      }).join(",");
      return `type: ${task.type}, source: ${task.source}, args: {${dataInfo}}`;
    });
    const pendingTasksInfo = "--Pending async tasks are: [" + taskInfo + "]";
    this.tasks = [];
    return pendingTasksInfo;
  }
  onFork(parentZoneDelegate, currentZone, targetZone, zoneSpec) {
    if (this._delegateSpec && this._delegateSpec.onFork) {
      return this._delegateSpec.onFork(parentZoneDelegate, currentZone, targetZone, zoneSpec);
    } else {
      return parentZoneDelegate.fork(targetZone, zoneSpec);
    }
  }
  onIntercept(parentZoneDelegate, currentZone, targetZone, delegate, source) {
    if (this._delegateSpec && this._delegateSpec.onIntercept) {
      return this._delegateSpec.onIntercept(parentZoneDelegate, currentZone, targetZone, delegate, source);
    } else {
      return parentZoneDelegate.intercept(targetZone, delegate, source);
    }
  }
  onInvoke(parentZoneDelegate, currentZone, targetZone, delegate, applyThis, applyArgs, source) {
    this.tryTriggerHasTask(parentZoneDelegate, currentZone, targetZone);
    if (this._delegateSpec && this._delegateSpec.onInvoke) {
      return this._delegateSpec.onInvoke(parentZoneDelegate, currentZone, targetZone, delegate, applyThis, applyArgs, source);
    } else {
      return parentZoneDelegate.invoke(targetZone, delegate, applyThis, applyArgs, source);
    }
  }
  onHandleError(parentZoneDelegate, currentZone, targetZone, error2) {
    if (this._delegateSpec && this._delegateSpec.onHandleError) {
      return this._delegateSpec.onHandleError(parentZoneDelegate, currentZone, targetZone, error2);
    } else {
      return parentZoneDelegate.handleError(targetZone, error2);
    }
  }
  onScheduleTask(parentZoneDelegate, currentZone, targetZone, task) {
    if (task.type !== "eventTask") {
      this.tasks.push(task);
    }
    if (this._delegateSpec && this._delegateSpec.onScheduleTask) {
      return this._delegateSpec.onScheduleTask(parentZoneDelegate, currentZone, targetZone, task);
    } else {
      return parentZoneDelegate.scheduleTask(targetZone, task);
    }
  }
  onInvokeTask(parentZoneDelegate, currentZone, targetZone, task, applyThis, applyArgs) {
    if (task.type !== "eventTask") {
      this.removeFromTasks(task);
    }
    this.tryTriggerHasTask(parentZoneDelegate, currentZone, targetZone);
    if (this._delegateSpec && this._delegateSpec.onInvokeTask) {
      return this._delegateSpec.onInvokeTask(parentZoneDelegate, currentZone, targetZone, task, applyThis, applyArgs);
    } else {
      return parentZoneDelegate.invokeTask(targetZone, task, applyThis, applyArgs);
    }
  }
  onCancelTask(parentZoneDelegate, currentZone, targetZone, task) {
    if (task.type !== "eventTask") {
      this.removeFromTasks(task);
    }
    this.tryTriggerHasTask(parentZoneDelegate, currentZone, targetZone);
    if (this._delegateSpec && this._delegateSpec.onCancelTask) {
      return this._delegateSpec.onCancelTask(parentZoneDelegate, currentZone, targetZone, task);
    } else {
      return parentZoneDelegate.cancelTask(targetZone, task);
    }
  }
  onHasTask(delegate, current, target, hasTaskState) {
    this.lastTaskState = hasTaskState;
    if (this._delegateSpec && this._delegateSpec.onHasTask) {
      this._delegateSpec.onHasTask(delegate, current, target, hasTaskState);
    } else {
      delegate.hasTask(target, hasTaskState);
    }
  }
};
Zone["ProxyZoneSpec"] = ProxyZoneSpec;
var SyncTestZoneSpec = class {
  constructor(namePrefix) {
    this.runZone = Zone.current;
    this.name = "syncTestZone for " + namePrefix;
  }
  onScheduleTask(delegate, current, target, task) {
    switch (task.type) {
      case "microTask":
      case "macroTask":
        throw new Error(`Cannot call ${task.source} from within a sync test (${this.name}).`);
      case "eventTask":
        task = delegate.scheduleTask(target, task);
        break;
    }
    return task;
  }
};
Zone["SyncTestZoneSpec"] = SyncTestZoneSpec;
Zone.__load_patch("jasmine", (global2, Zone2, api) => {
  const __extends = function(d, b) {
    for (const p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  if (!Zone2)
    throw new Error("Missing: zone.js");
  if (typeof jest !== "undefined") {
    return;
  }
  if (typeof jasmine == "undefined" || jasmine["__zone_patch__"]) {
    return;
  }
  jasmine["__zone_patch__"] = true;
  const SyncTestZoneSpec2 = Zone2["SyncTestZoneSpec"];
  const ProxyZoneSpec2 = Zone2["ProxyZoneSpec"];
  if (!SyncTestZoneSpec2)
    throw new Error("Missing: SyncTestZoneSpec");
  if (!ProxyZoneSpec2)
    throw new Error("Missing: ProxyZoneSpec");
  const ambientZone = Zone2.current;
  const symbol = Zone2.__symbol__;
  const disablePatchingJasmineClock = global2[symbol("fakeAsyncDisablePatchingClock")] === true;
  const enableAutoFakeAsyncWhenClockPatched = !disablePatchingJasmineClock && (global2[symbol("fakeAsyncPatchLock")] === true || global2[symbol("fakeAsyncAutoFakeAsyncWhenClockPatched")] === true);
  const ignoreUnhandledRejection = global2[symbol("ignoreUnhandledRejection")] === true;
  if (!ignoreUnhandledRejection) {
    const globalErrors = jasmine.GlobalErrors;
    if (globalErrors && !jasmine[symbol("GlobalErrors")]) {
      jasmine[symbol("GlobalErrors")] = globalErrors;
      jasmine.GlobalErrors = function() {
        const instance = new globalErrors();
        const originalInstall = instance.install;
        if (originalInstall && !instance[symbol("install")]) {
          instance[symbol("install")] = originalInstall;
          instance.install = function() {
            const isNode2 = typeof process !== "undefined" && !!process.on;
            const originalHandlers = isNode2 ? process.listeners("unhandledRejection") : global2.eventListeners("unhandledrejection");
            const result = originalInstall.apply(this, arguments);
            isNode2 ? process.removeAllListeners("unhandledRejection") : global2.removeAllListeners("unhandledrejection");
            if (originalHandlers) {
              originalHandlers.forEach((handler) => {
                if (isNode2) {
                  process.on("unhandledRejection", handler);
                } else {
                  global2.addEventListener("unhandledrejection", handler);
                }
              });
            }
            return result;
          };
        }
        return instance;
      };
    }
  }
  const jasmineEnv = jasmine.getEnv();
  ["describe", "xdescribe", "fdescribe"].forEach((methodName) => {
    let originalJasmineFn = jasmineEnv[methodName];
    jasmineEnv[methodName] = function(description, specDefinitions) {
      return originalJasmineFn.call(this, description, wrapDescribeInZone(description, specDefinitions));
    };
  });
  ["it", "xit", "fit"].forEach((methodName) => {
    let originalJasmineFn = jasmineEnv[methodName];
    jasmineEnv[symbol(methodName)] = originalJasmineFn;
    jasmineEnv[methodName] = function(description, specDefinitions, timeout) {
      arguments[1] = wrapTestInZone(specDefinitions);
      return originalJasmineFn.apply(this, arguments);
    };
  });
  ["beforeEach", "afterEach", "beforeAll", "afterAll"].forEach((methodName) => {
    let originalJasmineFn = jasmineEnv[methodName];
    jasmineEnv[symbol(methodName)] = originalJasmineFn;
    jasmineEnv[methodName] = function(specDefinitions, timeout) {
      arguments[0] = wrapTestInZone(specDefinitions);
      return originalJasmineFn.apply(this, arguments);
    };
  });
  if (!disablePatchingJasmineClock) {
    const originalClockFn = jasmine[symbol("clock")] = jasmine["clock"];
    jasmine["clock"] = function() {
      const clock = originalClockFn.apply(this, arguments);
      if (!clock[symbol("patched")]) {
        clock[symbol("patched")] = symbol("patched");
        const originalTick = clock[symbol("tick")] = clock.tick;
        clock.tick = function() {
          const fakeAsyncZoneSpec = Zone2.current.get("FakeAsyncTestZoneSpec");
          if (fakeAsyncZoneSpec) {
            return fakeAsyncZoneSpec.tick.apply(fakeAsyncZoneSpec, arguments);
          }
          return originalTick.apply(this, arguments);
        };
        const originalMockDate = clock[symbol("mockDate")] = clock.mockDate;
        clock.mockDate = function() {
          const fakeAsyncZoneSpec = Zone2.current.get("FakeAsyncTestZoneSpec");
          if (fakeAsyncZoneSpec) {
            const dateTime = arguments.length > 0 ? arguments[0] : /* @__PURE__ */ new Date();
            return fakeAsyncZoneSpec.setFakeBaseSystemTime.apply(fakeAsyncZoneSpec, dateTime && typeof dateTime.getTime === "function" ? [dateTime.getTime()] : arguments);
          }
          return originalMockDate.apply(this, arguments);
        };
        if (enableAutoFakeAsyncWhenClockPatched) {
          ["install", "uninstall"].forEach((methodName) => {
            const originalClockFn2 = clock[symbol(methodName)] = clock[methodName];
            clock[methodName] = function() {
              const FakeAsyncTestZoneSpec = Zone2["FakeAsyncTestZoneSpec"];
              if (FakeAsyncTestZoneSpec) {
                jasmine[symbol("clockInstalled")] = "install" === methodName;
                return;
              }
              return originalClockFn2.apply(this, arguments);
            };
          });
        }
      }
      return clock;
    };
  }
  if (!jasmine[Zone2.__symbol__("createSpyObj")]) {
    const originalCreateSpyObj = jasmine.createSpyObj;
    jasmine[Zone2.__symbol__("createSpyObj")] = originalCreateSpyObj;
    jasmine.createSpyObj = function() {
      const args = Array.prototype.slice.call(arguments);
      const propertyNames = args.length >= 3 ? args[2] : null;
      let spyObj;
      if (propertyNames) {
        const defineProperty = Object.defineProperty;
        Object.defineProperty = function(obj, p, attributes) {
          return defineProperty.call(this, obj, p, __spreadProps(__spreadValues({}, attributes), { configurable: true, enumerable: true }));
        };
        try {
          spyObj = originalCreateSpyObj.apply(this, args);
        } finally {
          Object.defineProperty = defineProperty;
        }
      } else {
        spyObj = originalCreateSpyObj.apply(this, args);
      }
      return spyObj;
    };
  }
  function wrapDescribeInZone(description, describeBody) {
    return function() {
      const syncZone = ambientZone.fork(new SyncTestZoneSpec2(`jasmine.describe#${description}`));
      return syncZone.run(describeBody, this, arguments);
    };
  }
  function runInTestZone(testBody, applyThis, queueRunner, done) {
    const isClockInstalled = !!jasmine[symbol("clockInstalled")];
    queueRunner.testProxyZoneSpec;
    const testProxyZone = queueRunner.testProxyZone;
    if (isClockInstalled && enableAutoFakeAsyncWhenClockPatched) {
      const fakeAsyncModule = Zone2[Zone2.__symbol__("fakeAsyncTest")];
      if (fakeAsyncModule && typeof fakeAsyncModule.fakeAsync === "function") {
        testBody = fakeAsyncModule.fakeAsync(testBody);
      }
    }
    if (done) {
      return testProxyZone.run(testBody, applyThis, [done]);
    } else {
      return testProxyZone.run(testBody, applyThis);
    }
  }
  function wrapTestInZone(testBody) {
    return testBody && (testBody.length ? function(done) {
      return runInTestZone(testBody, this, this.queueRunner, done);
    } : function() {
      return runInTestZone(testBody, this, this.queueRunner);
    });
  }
  const QueueRunner = jasmine.QueueRunner;
  jasmine.QueueRunner = function(_super) {
    __extends(ZoneQueueRunner, _super);
    function ZoneQueueRunner(attrs) {
      if (attrs.onComplete) {
        attrs.onComplete = ((fn) => () => {
          this.testProxyZone = null;
          this.testProxyZoneSpec = null;
          ambientZone.scheduleMicroTask("jasmine.onComplete", fn);
        })(attrs.onComplete);
      }
      const nativeSetTimeout = global2[Zone2.__symbol__("setTimeout")];
      const nativeClearTimeout = global2[Zone2.__symbol__("clearTimeout")];
      if (nativeSetTimeout) {
        attrs.timeout = {
          setTimeout: nativeSetTimeout ? nativeSetTimeout : global2.setTimeout,
          clearTimeout: nativeClearTimeout ? nativeClearTimeout : global2.clearTimeout
        };
      }
      if (jasmine.UserContext) {
        if (!attrs.userContext) {
          attrs.userContext = new jasmine.UserContext();
        }
        attrs.userContext.queueRunner = this;
      } else {
        if (!attrs.userContext) {
          attrs.userContext = {};
        }
        attrs.userContext.queueRunner = this;
      }
      const onException = attrs.onException;
      attrs.onException = function(error2) {
        if (error2 && error2.message === "Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.") {
          const proxyZoneSpec = this && this.testProxyZoneSpec;
          if (proxyZoneSpec) {
            const pendingTasksInfo = proxyZoneSpec.getAndClearPendingTasksInfo();
            try {
              error2.message += pendingTasksInfo;
            } catch (err) {
            }
          }
        }
        if (onException) {
          onException.call(this, error2);
        }
      };
      _super.call(this, attrs);
    }
    ZoneQueueRunner.prototype.execute = function() {
      let zone = Zone2.current;
      let isChildOfAmbientZone = false;
      while (zone) {
        if (zone === ambientZone) {
          isChildOfAmbientZone = true;
          break;
        }
        zone = zone.parent;
      }
      if (!isChildOfAmbientZone)
        throw new Error("Unexpected Zone: " + Zone2.current.name);
      this.testProxyZoneSpec = new ProxyZoneSpec2();
      this.testProxyZone = ambientZone.fork(this.testProxyZoneSpec);
      if (!Zone2.currentTask) {
        Zone2.current.scheduleMicroTask("jasmine.execute().forceTask", () => QueueRunner.prototype.execute.call(this));
      } else {
        _super.prototype.execute.call(this);
      }
    };
    return ZoneQueueRunner;
  }(QueueRunner);
});
Zone.__load_patch("jest", (context, Zone2, api) => {
  if (typeof jest === "undefined" || jest["__zone_patch__"]) {
    return;
  }
  Zone2[api.symbol("ignoreConsoleErrorUncaughtError")] = true;
  jest["__zone_patch__"] = true;
  const ProxyZoneSpec2 = Zone2["ProxyZoneSpec"];
  const SyncTestZoneSpec2 = Zone2["SyncTestZoneSpec"];
  if (!ProxyZoneSpec2) {
    throw new Error("Missing ProxyZoneSpec");
  }
  const rootZone = Zone2.current;
  const syncZone = rootZone.fork(new SyncTestZoneSpec2("jest.describe"));
  const proxyZoneSpec = new ProxyZoneSpec2();
  const proxyZone = rootZone.fork(proxyZoneSpec);
  function wrapDescribeFactoryInZone(originalJestFn) {
    return function(...tableArgs) {
      const originalDescribeFn = originalJestFn.apply(this, tableArgs);
      return function(...args) {
        args[1] = wrapDescribeInZone(args[1]);
        return originalDescribeFn.apply(this, args);
      };
    };
  }
  function wrapTestFactoryInZone(originalJestFn) {
    return function(...tableArgs) {
      return function(...args) {
        args[1] = wrapTestInZone(args[1]);
        return originalJestFn.apply(this, tableArgs).apply(this, args);
      };
    };
  }
  function wrapDescribeInZone(describeBody) {
    return function(...args) {
      return syncZone.run(describeBody, this, args);
    };
  }
  function wrapTestInZone(testBody, isTestFunc = false) {
    if (typeof testBody !== "function") {
      return testBody;
    }
    const wrappedFunc = function() {
      if (Zone2[api.symbol("useFakeTimersCalled")] === true && testBody && !testBody.isFakeAsync) {
        const fakeAsyncModule = Zone2[Zone2.__symbol__("fakeAsyncTest")];
        if (fakeAsyncModule && typeof fakeAsyncModule.fakeAsync === "function") {
          testBody = fakeAsyncModule.fakeAsync(testBody);
        }
      }
      proxyZoneSpec.isTestFunc = isTestFunc;
      return proxyZone.run(testBody, null, arguments);
    };
    Object.defineProperty(wrappedFunc, "length", { configurable: true, writable: true, enumerable: false });
    wrappedFunc.length = testBody.length;
    return wrappedFunc;
  }
  ["describe", "xdescribe", "fdescribe"].forEach((methodName) => {
    let originalJestFn = context[methodName];
    if (context[Zone2.__symbol__(methodName)]) {
      return;
    }
    context[Zone2.__symbol__(methodName)] = originalJestFn;
    context[methodName] = function(...args) {
      args[1] = wrapDescribeInZone(args[1]);
      return originalJestFn.apply(this, args);
    };
    context[methodName].each = wrapDescribeFactoryInZone(originalJestFn.each);
  });
  context.describe.only = context.fdescribe;
  context.describe.skip = context.xdescribe;
  ["it", "xit", "fit", "test", "xtest"].forEach((methodName) => {
    let originalJestFn = context[methodName];
    if (context[Zone2.__symbol__(methodName)]) {
      return;
    }
    context[Zone2.__symbol__(methodName)] = originalJestFn;
    context[methodName] = function(...args) {
      args[1] = wrapTestInZone(args[1], true);
      return originalJestFn.apply(this, args);
    };
    context[methodName].each = wrapTestFactoryInZone(originalJestFn.each);
    context[methodName].todo = originalJestFn.todo;
  });
  context.it.only = context.fit;
  context.it.skip = context.xit;
  context.test.only = context.fit;
  context.test.skip = context.xit;
  ["beforeEach", "afterEach", "beforeAll", "afterAll"].forEach((methodName) => {
    let originalJestFn = context[methodName];
    if (context[Zone2.__symbol__(methodName)]) {
      return;
    }
    context[Zone2.__symbol__(methodName)] = originalJestFn;
    context[methodName] = function(...args) {
      args[0] = wrapTestInZone(args[0]);
      return originalJestFn.apply(this, args);
    };
  });
  Zone2.patchJestObject = function patchJestObject(Timer, isModern = false) {
    function isPatchingFakeTimer() {
      const fakeAsyncZoneSpec = Zone2.current.get("FakeAsyncTestZoneSpec");
      return !!fakeAsyncZoneSpec;
    }
    function isInTestFunc() {
      const proxyZoneSpec2 = Zone2.current.get("ProxyZoneSpec");
      return proxyZoneSpec2 && proxyZoneSpec2.isTestFunc;
    }
    if (Timer[api.symbol("fakeTimers")]) {
      return;
    }
    Timer[api.symbol("fakeTimers")] = true;
    api.patchMethod(Timer, "_checkFakeTimers", (delegate) => {
      return function(self2, args) {
        if (isPatchingFakeTimer()) {
          return true;
        } else {
          return delegate.apply(self2, args);
        }
      };
    });
    api.patchMethod(Timer, "useFakeTimers", (delegate) => {
      return function(self2, args) {
        Zone2[api.symbol("useFakeTimersCalled")] = true;
        if (isModern || isInTestFunc()) {
          return delegate.apply(self2, args);
        }
        return self2;
      };
    });
    api.patchMethod(Timer, "useRealTimers", (delegate) => {
      return function(self2, args) {
        Zone2[api.symbol("useFakeTimersCalled")] = false;
        if (isModern || isInTestFunc()) {
          return delegate.apply(self2, args);
        }
        return self2;
      };
    });
    api.patchMethod(Timer, "setSystemTime", (delegate) => {
      return function(self2, args) {
        const fakeAsyncZoneSpec = Zone2.current.get("FakeAsyncTestZoneSpec");
        if (fakeAsyncZoneSpec && isPatchingFakeTimer()) {
          fakeAsyncZoneSpec.setFakeBaseSystemTime(args[0]);
        } else {
          return delegate.apply(self2, args);
        }
      };
    });
    api.patchMethod(Timer, "getRealSystemTime", (delegate) => {
      return function(self2, args) {
        const fakeAsyncZoneSpec = Zone2.current.get("FakeAsyncTestZoneSpec");
        if (fakeAsyncZoneSpec && isPatchingFakeTimer()) {
          return fakeAsyncZoneSpec.getRealSystemTime();
        } else {
          return delegate.apply(self2, args);
        }
      };
    });
    api.patchMethod(Timer, "runAllTicks", (delegate) => {
      return function(self2, args) {
        const fakeAsyncZoneSpec = Zone2.current.get("FakeAsyncTestZoneSpec");
        if (fakeAsyncZoneSpec) {
          fakeAsyncZoneSpec.flushMicrotasks();
        } else {
          return delegate.apply(self2, args);
        }
      };
    });
    api.patchMethod(Timer, "runAllTimers", (delegate) => {
      return function(self2, args) {
        const fakeAsyncZoneSpec = Zone2.current.get("FakeAsyncTestZoneSpec");
        if (fakeAsyncZoneSpec) {
          fakeAsyncZoneSpec.flush(100, true);
        } else {
          return delegate.apply(self2, args);
        }
      };
    });
    api.patchMethod(Timer, "advanceTimersByTime", (delegate) => {
      return function(self2, args) {
        const fakeAsyncZoneSpec = Zone2.current.get("FakeAsyncTestZoneSpec");
        if (fakeAsyncZoneSpec) {
          fakeAsyncZoneSpec.tick(args[0]);
        } else {
          return delegate.apply(self2, args);
        }
      };
    });
    api.patchMethod(Timer, "runOnlyPendingTimers", (delegate) => {
      return function(self2, args) {
        const fakeAsyncZoneSpec = Zone2.current.get("FakeAsyncTestZoneSpec");
        if (fakeAsyncZoneSpec) {
          fakeAsyncZoneSpec.flushOnlyPendingTimers();
        } else {
          return delegate.apply(self2, args);
        }
      };
    });
    api.patchMethod(Timer, "advanceTimersToNextTimer", (delegate) => {
      return function(self2, args) {
        const fakeAsyncZoneSpec = Zone2.current.get("FakeAsyncTestZoneSpec");
        if (fakeAsyncZoneSpec) {
          fakeAsyncZoneSpec.tickToNext(args[0]);
        } else {
          return delegate.apply(self2, args);
        }
      };
    });
    api.patchMethod(Timer, "clearAllTimers", (delegate) => {
      return function(self2, args) {
        const fakeAsyncZoneSpec = Zone2.current.get("FakeAsyncTestZoneSpec");
        if (fakeAsyncZoneSpec) {
          fakeAsyncZoneSpec.removeAllTimers();
        } else {
          return delegate.apply(self2, args);
        }
      };
    });
    api.patchMethod(Timer, "getTimerCount", (delegate) => {
      return function(self2, args) {
        const fakeAsyncZoneSpec = Zone2.current.get("FakeAsyncTestZoneSpec");
        if (fakeAsyncZoneSpec) {
          return fakeAsyncZoneSpec.getTimerCount();
        } else {
          return delegate.apply(self2, args);
        }
      };
    });
  };
});
Zone.__load_patch("mocha", (global2, Zone2) => {
  const Mocha = global2.Mocha;
  if (typeof Mocha === "undefined") {
    return;
  }
  if (typeof Zone2 === "undefined") {
    throw new Error("Missing Zone.js");
  }
  const ProxyZoneSpec2 = Zone2["ProxyZoneSpec"];
  const SyncTestZoneSpec2 = Zone2["SyncTestZoneSpec"];
  if (!ProxyZoneSpec2) {
    throw new Error("Missing ProxyZoneSpec");
  }
  if (Mocha["__zone_patch__"]) {
    throw new Error('"Mocha" has already been patched with "Zone".');
  }
  Mocha["__zone_patch__"] = true;
  const rootZone = Zone2.current;
  const syncZone = rootZone.fork(new SyncTestZoneSpec2("Mocha.describe"));
  let testZone = null;
  const suiteZone = rootZone.fork(new ProxyZoneSpec2());
  const mochaOriginal = {
    after: global2.after,
    afterEach: global2.afterEach,
    before: global2.before,
    beforeEach: global2.beforeEach,
    describe: global2.describe,
    it: global2.it
  };
  function modifyArguments(args, syncTest, asyncTest) {
    for (let i = 0; i < args.length; i++) {
      let arg = args[i];
      if (typeof arg === "function") {
        args[i] = arg.length === 0 ? syncTest(arg) : asyncTest(arg);
        args[i].toString = function() {
          return arg.toString();
        };
      }
    }
    return args;
  }
  function wrapDescribeInZone(args) {
    const syncTest = function(fn) {
      return function() {
        return syncZone.run(fn, this, arguments);
      };
    };
    return modifyArguments(args, syncTest);
  }
  function wrapTestInZone(args) {
    const asyncTest = function(fn) {
      return function(done) {
        return testZone.run(fn, this, [done]);
      };
    };
    const syncTest = function(fn) {
      return function() {
        return testZone.run(fn, this);
      };
    };
    return modifyArguments(args, syncTest, asyncTest);
  }
  function wrapSuiteInZone(args) {
    const asyncTest = function(fn) {
      return function(done) {
        return suiteZone.run(fn, this, [done]);
      };
    };
    const syncTest = function(fn) {
      return function() {
        return suiteZone.run(fn, this);
      };
    };
    return modifyArguments(args, syncTest, asyncTest);
  }
  global2.describe = global2.suite = function() {
    return mochaOriginal.describe.apply(this, wrapDescribeInZone(arguments));
  };
  global2.xdescribe = global2.suite.skip = global2.describe.skip = function() {
    return mochaOriginal.describe.skip.apply(this, wrapDescribeInZone(arguments));
  };
  global2.describe.only = global2.suite.only = function() {
    return mochaOriginal.describe.only.apply(this, wrapDescribeInZone(arguments));
  };
  global2.it = global2.specify = global2.test = function() {
    return mochaOriginal.it.apply(this, wrapTestInZone(arguments));
  };
  global2.xit = global2.xspecify = global2.it.skip = function() {
    return mochaOriginal.it.skip.apply(this, wrapTestInZone(arguments));
  };
  global2.it.only = global2.test.only = function() {
    return mochaOriginal.it.only.apply(this, wrapTestInZone(arguments));
  };
  global2.after = global2.suiteTeardown = function() {
    return mochaOriginal.after.apply(this, wrapSuiteInZone(arguments));
  };
  global2.afterEach = global2.teardown = function() {
    return mochaOriginal.afterEach.apply(this, wrapTestInZone(arguments));
  };
  global2.before = global2.suiteSetup = function() {
    return mochaOriginal.before.apply(this, wrapSuiteInZone(arguments));
  };
  global2.beforeEach = global2.setup = function() {
    return mochaOriginal.beforeEach.apply(this, wrapTestInZone(arguments));
  };
  ((originalRunTest, originalRun) => {
    Mocha.Runner.prototype.runTest = function(fn) {
      Zone2.current.scheduleMicroTask("mocha.forceTask", () => {
        originalRunTest.call(this, fn);
      });
    };
    Mocha.Runner.prototype.run = function(fn) {
      this.on("test", (e) => {
        testZone = rootZone.fork(new ProxyZoneSpec2());
      });
      this.on("fail", (test, err) => {
        const proxyZoneSpec = testZone && testZone.get("ProxyZoneSpec");
        if (proxyZoneSpec && err) {
          try {
            err.message += proxyZoneSpec.getAndClearPendingTasksInfo();
          } catch (error2) {
          }
        }
      });
      return originalRun.call(this, fn);
    };
  })(Mocha.Runner.prototype.runTest, Mocha.Runner.prototype.run);
});
(function(_global2) {
  const _AsyncTestZoneSpec = class _AsyncTestZoneSpec {
    constructor(finishCallback, failCallback, namePrefix) {
      this.finishCallback = finishCallback;
      this.failCallback = failCallback;
      this._pendingMicroTasks = false;
      this._pendingMacroTasks = false;
      this._alreadyErrored = false;
      this._isSync = false;
      this._existingFinishTimer = null;
      this.entryFunction = null;
      this.runZone = Zone.current;
      this.unresolvedChainedPromiseCount = 0;
      this.supportWaitUnresolvedChainedPromise = false;
      this.name = "asyncTestZone for " + namePrefix;
      this.properties = { "AsyncTestZoneSpec": this };
      this.supportWaitUnresolvedChainedPromise = _global2[Zone.__symbol__("supportWaitUnResolvedChainedPromise")] === true;
    }
    isUnresolvedChainedPromisePending() {
      return this.unresolvedChainedPromiseCount > 0;
    }
    _finishCallbackIfDone() {
      if (this._existingFinishTimer !== null) {
        clearTimeout(this._existingFinishTimer);
        this._existingFinishTimer = null;
      }
      if (!(this._pendingMicroTasks || this._pendingMacroTasks || this.supportWaitUnresolvedChainedPromise && this.isUnresolvedChainedPromisePending())) {
        this.runZone.run(() => {
          this._existingFinishTimer = setTimeout(() => {
            if (!this._alreadyErrored && !(this._pendingMicroTasks || this._pendingMacroTasks)) {
              this.finishCallback();
            }
          }, 0);
        });
      }
    }
    patchPromiseForTest() {
      if (!this.supportWaitUnresolvedChainedPromise) {
        return;
      }
      const patchPromiseForTest = Promise[Zone.__symbol__("patchPromiseForTest")];
      if (patchPromiseForTest) {
        patchPromiseForTest();
      }
    }
    unPatchPromiseForTest() {
      if (!this.supportWaitUnresolvedChainedPromise) {
        return;
      }
      const unPatchPromiseForTest = Promise[Zone.__symbol__("unPatchPromiseForTest")];
      if (unPatchPromiseForTest) {
        unPatchPromiseForTest();
      }
    }
    onScheduleTask(delegate, current, target, task) {
      if (task.type !== "eventTask") {
        this._isSync = false;
      }
      if (task.type === "microTask" && task.data && task.data instanceof Promise) {
        if (task.data[_AsyncTestZoneSpec.symbolParentUnresolved] === true) {
          this.unresolvedChainedPromiseCount--;
        }
      }
      return delegate.scheduleTask(target, task);
    }
    onInvokeTask(delegate, current, target, task, applyThis, applyArgs) {
      if (task.type !== "eventTask") {
        this._isSync = false;
      }
      return delegate.invokeTask(target, task, applyThis, applyArgs);
    }
    onCancelTask(delegate, current, target, task) {
      if (task.type !== "eventTask") {
        this._isSync = false;
      }
      return delegate.cancelTask(target, task);
    }
    // Note - we need to use onInvoke at the moment to call finish when a test is
    // fully synchronous. TODO(juliemr): remove this when the logic for
    // onHasTask changes and it calls whenever the task queues are dirty.
    // updated by(JiaLiPassion), only call finish callback when no task
    // was scheduled/invoked/canceled.
    onInvoke(parentZoneDelegate, currentZone, targetZone, delegate, applyThis, applyArgs, source) {
      if (!this.entryFunction) {
        this.entryFunction = delegate;
      }
      try {
        this._isSync = true;
        return parentZoneDelegate.invoke(targetZone, delegate, applyThis, applyArgs, source);
      } finally {
        if (this._isSync && this.entryFunction === delegate) {
          this._finishCallbackIfDone();
        }
      }
    }
    onHandleError(parentZoneDelegate, currentZone, targetZone, error2) {
      const result = parentZoneDelegate.handleError(targetZone, error2);
      if (result) {
        this.failCallback(error2);
        this._alreadyErrored = true;
      }
      return false;
    }
    onHasTask(delegate, current, target, hasTaskState) {
      delegate.hasTask(target, hasTaskState);
      if (current !== target) {
        return;
      }
      if (hasTaskState.change == "microTask") {
        this._pendingMicroTasks = hasTaskState.microTask;
        this._finishCallbackIfDone();
      } else if (hasTaskState.change == "macroTask") {
        this._pendingMacroTasks = hasTaskState.macroTask;
        this._finishCallbackIfDone();
      }
    }
  };
  _AsyncTestZoneSpec.symbolParentUnresolved = Zone.__symbol__("parentUnresolved");
  let AsyncTestZoneSpec = _AsyncTestZoneSpec;
  Zone["AsyncTestZoneSpec"] = AsyncTestZoneSpec;
})(typeof window !== "undefined" && window || typeof self !== "undefined" && self || global);
Zone.__load_patch("asynctest", (global2, Zone2, api) => {
  Zone2[api.symbol("asyncTest")] = function asyncTest(fn) {
    if (global2.jasmine) {
      return function(done) {
        if (!done) {
          done = function() {
          };
          done.fail = function(e) {
            throw e;
          };
        }
        runInTestZone(fn, this, done, (err) => {
          if (typeof err === "string") {
            return done.fail(new Error(err));
          } else {
            done.fail(err);
          }
        });
      };
    }
    return function() {
      return new Promise((finishCallback, failCallback) => {
        runInTestZone(fn, this, finishCallback, failCallback);
      });
    };
  };
  function runInTestZone(fn, context, finishCallback, failCallback) {
    const currentZone = Zone2.current;
    const AsyncTestZoneSpec = Zone2["AsyncTestZoneSpec"];
    if (AsyncTestZoneSpec === void 0) {
      throw new Error("AsyncTestZoneSpec is needed for the async() test helper but could not be found. Please make sure that your environment includes zone.js/plugins/async-test");
    }
    const ProxyZoneSpec2 = Zone2["ProxyZoneSpec"];
    if (!ProxyZoneSpec2) {
      throw new Error("ProxyZoneSpec is needed for the async() test helper but could not be found. Please make sure that your environment includes zone.js/plugins/proxy");
    }
    const proxyZoneSpec = ProxyZoneSpec2.get();
    ProxyZoneSpec2.assertPresent();
    const proxyZone = Zone2.current.getZoneWith("ProxyZoneSpec");
    const previousDelegate = proxyZoneSpec.getDelegate();
    proxyZone.parent.run(() => {
      const testZoneSpec = new AsyncTestZoneSpec(() => {
        if (proxyZoneSpec.getDelegate() == testZoneSpec) {
          proxyZoneSpec.setDelegate(previousDelegate);
        }
        testZoneSpec.unPatchPromiseForTest();
        currentZone.run(() => {
          finishCallback();
        });
      }, (error2) => {
        if (proxyZoneSpec.getDelegate() == testZoneSpec) {
          proxyZoneSpec.setDelegate(previousDelegate);
        }
        testZoneSpec.unPatchPromiseForTest();
        currentZone.run(() => {
          failCallback(error2);
        });
      }, "test");
      proxyZoneSpec.setDelegate(testZoneSpec);
      testZoneSpec.patchPromiseForTest();
    });
    return Zone2.current.runGuarded(fn, context);
  }
});
(function(global2) {
  const OriginalDate = global2.Date;
  function FakeDate() {
    if (arguments.length === 0) {
      const d = new OriginalDate();
      d.setTime(FakeDate.now());
      return d;
    } else {
      const args = Array.prototype.slice.call(arguments);
      return new OriginalDate(...args);
    }
  }
  FakeDate.now = function() {
    const fakeAsyncTestZoneSpec = Zone.current.get("FakeAsyncTestZoneSpec");
    if (fakeAsyncTestZoneSpec) {
      return fakeAsyncTestZoneSpec.getFakeSystemTime();
    }
    return OriginalDate.now.apply(this, arguments);
  };
  FakeDate.UTC = OriginalDate.UTC;
  FakeDate.parse = OriginalDate.parse;
  const timers = {
    setTimeout: global2.setTimeout,
    setInterval: global2.setInterval,
    clearTimeout: global2.clearTimeout,
    clearInterval: global2.clearInterval
  };
  const _Scheduler = class _Scheduler {
    constructor() {
      this._schedulerQueue = [];
      this._currentTickTime = 0;
      this._currentFakeBaseSystemTime = OriginalDate.now();
      this._currentTickRequeuePeriodicEntries = [];
    }
    getCurrentTickTime() {
      return this._currentTickTime;
    }
    getFakeSystemTime() {
      return this._currentFakeBaseSystemTime + this._currentTickTime;
    }
    setFakeBaseSystemTime(fakeBaseSystemTime) {
      this._currentFakeBaseSystemTime = fakeBaseSystemTime;
    }
    getRealSystemTime() {
      return OriginalDate.now();
    }
    scheduleFunction(cb, delay, options) {
      options = __spreadValues(__spreadValues({}, {
        args: [],
        isPeriodic: false,
        isRequestAnimationFrame: false,
        id: -1,
        isRequeuePeriodic: false
      }), options);
      let currentId = options.id < 0 ? _Scheduler.nextId++ : options.id;
      let endTime = this._currentTickTime + delay;
      let newEntry = {
        endTime,
        id: currentId,
        func: cb,
        args: options.args,
        delay,
        isPeriodic: options.isPeriodic,
        isRequestAnimationFrame: options.isRequestAnimationFrame
      };
      if (options.isRequeuePeriodic) {
        this._currentTickRequeuePeriodicEntries.push(newEntry);
      }
      let i = 0;
      for (; i < this._schedulerQueue.length; i++) {
        let currentEntry = this._schedulerQueue[i];
        if (newEntry.endTime < currentEntry.endTime) {
          break;
        }
      }
      this._schedulerQueue.splice(i, 0, newEntry);
      return currentId;
    }
    removeScheduledFunctionWithId(id) {
      for (let i = 0; i < this._schedulerQueue.length; i++) {
        if (this._schedulerQueue[i].id == id) {
          this._schedulerQueue.splice(i, 1);
          break;
        }
      }
    }
    removeAll() {
      this._schedulerQueue = [];
    }
    getTimerCount() {
      return this._schedulerQueue.length;
    }
    tickToNext(step = 1, doTick, tickOptions) {
      if (this._schedulerQueue.length < step) {
        return;
      }
      const startTime = this._currentTickTime;
      const targetTask = this._schedulerQueue[step - 1];
      this.tick(targetTask.endTime - startTime, doTick, tickOptions);
    }
    tick(millis = 0, doTick, tickOptions) {
      let finalTime = this._currentTickTime + millis;
      let lastCurrentTime = 0;
      tickOptions = Object.assign({ processNewMacroTasksSynchronously: true }, tickOptions);
      const schedulerQueue = tickOptions.processNewMacroTasksSynchronously ? this._schedulerQueue : this._schedulerQueue.slice();
      if (schedulerQueue.length === 0 && doTick) {
        doTick(millis);
        return;
      }
      while (schedulerQueue.length > 0) {
        this._currentTickRequeuePeriodicEntries = [];
        let current = schedulerQueue[0];
        if (finalTime < current.endTime) {
          break;
        } else {
          let current2 = schedulerQueue.shift();
          if (!tickOptions.processNewMacroTasksSynchronously) {
            const idx = this._schedulerQueue.indexOf(current2);
            if (idx >= 0) {
              this._schedulerQueue.splice(idx, 1);
            }
          }
          lastCurrentTime = this._currentTickTime;
          this._currentTickTime = current2.endTime;
          if (doTick) {
            doTick(this._currentTickTime - lastCurrentTime);
          }
          let retval = current2.func.apply(global2, current2.isRequestAnimationFrame ? [this._currentTickTime] : current2.args);
          if (!retval) {
            break;
          }
          if (!tickOptions.processNewMacroTasksSynchronously) {
            this._currentTickRequeuePeriodicEntries.forEach((newEntry) => {
              let i = 0;
              for (; i < schedulerQueue.length; i++) {
                const currentEntry = schedulerQueue[i];
                if (newEntry.endTime < currentEntry.endTime) {
                  break;
                }
              }
              schedulerQueue.splice(i, 0, newEntry);
            });
          }
        }
      }
      lastCurrentTime = this._currentTickTime;
      this._currentTickTime = finalTime;
      if (doTick) {
        doTick(this._currentTickTime - lastCurrentTime);
      }
    }
    flushOnlyPendingTimers(doTick) {
      if (this._schedulerQueue.length === 0) {
        return 0;
      }
      const startTime = this._currentTickTime;
      const lastTask = this._schedulerQueue[this._schedulerQueue.length - 1];
      this.tick(lastTask.endTime - startTime, doTick, { processNewMacroTasksSynchronously: false });
      return this._currentTickTime - startTime;
    }
    flush(limit = 20, flushPeriodic = false, doTick) {
      if (flushPeriodic) {
        return this.flushPeriodic(doTick);
      } else {
        return this.flushNonPeriodic(limit, doTick);
      }
    }
    flushPeriodic(doTick) {
      if (this._schedulerQueue.length === 0) {
        return 0;
      }
      const startTime = this._currentTickTime;
      const lastTask = this._schedulerQueue[this._schedulerQueue.length - 1];
      this.tick(lastTask.endTime - startTime, doTick);
      return this._currentTickTime - startTime;
    }
    flushNonPeriodic(limit, doTick) {
      const startTime = this._currentTickTime;
      let lastCurrentTime = 0;
      let count = 0;
      while (this._schedulerQueue.length > 0) {
        count++;
        if (count > limit) {
          throw new Error("flush failed after reaching the limit of " + limit + " tasks. Does your code use a polling timeout?");
        }
        if (this._schedulerQueue.filter((task) => !task.isPeriodic && !task.isRequestAnimationFrame).length === 0) {
          break;
        }
        const current = this._schedulerQueue.shift();
        lastCurrentTime = this._currentTickTime;
        this._currentTickTime = current.endTime;
        if (doTick) {
          doTick(this._currentTickTime - lastCurrentTime);
        }
        const retval = current.func.apply(global2, current.args);
        if (!retval) {
          break;
        }
      }
      return this._currentTickTime - startTime;
    }
  };
  _Scheduler.nextId = 1;
  let Scheduler = _Scheduler;
  class FakeAsyncTestZoneSpec {
    static assertInZone() {
      if (Zone.current.get("FakeAsyncTestZoneSpec") == null) {
        throw new Error("The code should be running in the fakeAsync zone to call this function");
      }
    }
    constructor(namePrefix, trackPendingRequestAnimationFrame = false, macroTaskOptions) {
      this.trackPendingRequestAnimationFrame = trackPendingRequestAnimationFrame;
      this.macroTaskOptions = macroTaskOptions;
      this._scheduler = new Scheduler();
      this._microtasks = [];
      this._lastError = null;
      this._uncaughtPromiseErrors = Promise[Zone.__symbol__("uncaughtPromiseErrors")];
      this.pendingPeriodicTimers = [];
      this.pendingTimers = [];
      this.patchDateLocked = false;
      this.properties = { "FakeAsyncTestZoneSpec": this };
      this.name = "fakeAsyncTestZone for " + namePrefix;
      if (!this.macroTaskOptions) {
        this.macroTaskOptions = global2[Zone.__symbol__("FakeAsyncTestMacroTask")];
      }
    }
    _fnAndFlush(fn, completers) {
      return (...args) => {
        fn.apply(global2, args);
        if (this._lastError === null) {
          if (completers.onSuccess != null) {
            completers.onSuccess.apply(global2);
          }
          this.flushMicrotasks();
        } else {
          if (completers.onError != null) {
            completers.onError.apply(global2);
          }
        }
        return this._lastError === null;
      };
    }
    static _removeTimer(timers2, id) {
      let index = timers2.indexOf(id);
      if (index > -1) {
        timers2.splice(index, 1);
      }
    }
    _dequeueTimer(id) {
      return () => {
        FakeAsyncTestZoneSpec._removeTimer(this.pendingTimers, id);
      };
    }
    _requeuePeriodicTimer(fn, interval, args, id) {
      return () => {
        if (this.pendingPeriodicTimers.indexOf(id) !== -1) {
          this._scheduler.scheduleFunction(fn, interval, { args, isPeriodic: true, id, isRequeuePeriodic: true });
        }
      };
    }
    _dequeuePeriodicTimer(id) {
      return () => {
        FakeAsyncTestZoneSpec._removeTimer(this.pendingPeriodicTimers, id);
      };
    }
    _setTimeout(fn, delay, args, isTimer = true) {
      let removeTimerFn = this._dequeueTimer(Scheduler.nextId);
      let cb = this._fnAndFlush(fn, { onSuccess: removeTimerFn, onError: removeTimerFn });
      let id = this._scheduler.scheduleFunction(cb, delay, { args, isRequestAnimationFrame: !isTimer });
      if (isTimer) {
        this.pendingTimers.push(id);
      }
      return id;
    }
    _clearTimeout(id) {
      FakeAsyncTestZoneSpec._removeTimer(this.pendingTimers, id);
      this._scheduler.removeScheduledFunctionWithId(id);
    }
    _setInterval(fn, interval, args) {
      let id = Scheduler.nextId;
      let completers = { onSuccess: null, onError: this._dequeuePeriodicTimer(id) };
      let cb = this._fnAndFlush(fn, completers);
      completers.onSuccess = this._requeuePeriodicTimer(cb, interval, args, id);
      this._scheduler.scheduleFunction(cb, interval, { args, isPeriodic: true });
      this.pendingPeriodicTimers.push(id);
      return id;
    }
    _clearInterval(id) {
      FakeAsyncTestZoneSpec._removeTimer(this.pendingPeriodicTimers, id);
      this._scheduler.removeScheduledFunctionWithId(id);
    }
    _resetLastErrorAndThrow() {
      let error2 = this._lastError || this._uncaughtPromiseErrors[0];
      this._uncaughtPromiseErrors.length = 0;
      this._lastError = null;
      throw error2;
    }
    getCurrentTickTime() {
      return this._scheduler.getCurrentTickTime();
    }
    getFakeSystemTime() {
      return this._scheduler.getFakeSystemTime();
    }
    setFakeBaseSystemTime(realTime) {
      this._scheduler.setFakeBaseSystemTime(realTime);
    }
    getRealSystemTime() {
      return this._scheduler.getRealSystemTime();
    }
    static patchDate() {
      if (!!global2[Zone.__symbol__("disableDatePatching")]) {
        return;
      }
      if (global2["Date"] === FakeDate) {
        return;
      }
      global2["Date"] = FakeDate;
      FakeDate.prototype = OriginalDate.prototype;
      FakeAsyncTestZoneSpec.checkTimerPatch();
    }
    static resetDate() {
      if (global2["Date"] === FakeDate) {
        global2["Date"] = OriginalDate;
      }
    }
    static checkTimerPatch() {
      if (global2.setTimeout !== timers.setTimeout) {
        global2.setTimeout = timers.setTimeout;
        global2.clearTimeout = timers.clearTimeout;
      }
      if (global2.setInterval !== timers.setInterval) {
        global2.setInterval = timers.setInterval;
        global2.clearInterval = timers.clearInterval;
      }
    }
    lockDatePatch() {
      this.patchDateLocked = true;
      FakeAsyncTestZoneSpec.patchDate();
    }
    unlockDatePatch() {
      this.patchDateLocked = false;
      FakeAsyncTestZoneSpec.resetDate();
    }
    tickToNext(steps = 1, doTick, tickOptions = { processNewMacroTasksSynchronously: true }) {
      if (steps <= 0) {
        return;
      }
      FakeAsyncTestZoneSpec.assertInZone();
      this.flushMicrotasks();
      this._scheduler.tickToNext(steps, doTick, tickOptions);
      if (this._lastError !== null) {
        this._resetLastErrorAndThrow();
      }
    }
    tick(millis = 0, doTick, tickOptions = { processNewMacroTasksSynchronously: true }) {
      FakeAsyncTestZoneSpec.assertInZone();
      this.flushMicrotasks();
      this._scheduler.tick(millis, doTick, tickOptions);
      if (this._lastError !== null) {
        this._resetLastErrorAndThrow();
      }
    }
    flushMicrotasks() {
      FakeAsyncTestZoneSpec.assertInZone();
      const flushErrors = () => {
        if (this._lastError !== null || this._uncaughtPromiseErrors.length) {
          this._resetLastErrorAndThrow();
        }
      };
      while (this._microtasks.length > 0) {
        let microtask = this._microtasks.shift();
        microtask.func.apply(microtask.target, microtask.args);
      }
      flushErrors();
    }
    flush(limit, flushPeriodic, doTick) {
      FakeAsyncTestZoneSpec.assertInZone();
      this.flushMicrotasks();
      const elapsed = this._scheduler.flush(limit, flushPeriodic, doTick);
      if (this._lastError !== null) {
        this._resetLastErrorAndThrow();
      }
      return elapsed;
    }
    flushOnlyPendingTimers(doTick) {
      FakeAsyncTestZoneSpec.assertInZone();
      this.flushMicrotasks();
      const elapsed = this._scheduler.flushOnlyPendingTimers(doTick);
      if (this._lastError !== null) {
        this._resetLastErrorAndThrow();
      }
      return elapsed;
    }
    removeAllTimers() {
      FakeAsyncTestZoneSpec.assertInZone();
      this._scheduler.removeAll();
      this.pendingPeriodicTimers = [];
      this.pendingTimers = [];
    }
    getTimerCount() {
      return this._scheduler.getTimerCount() + this._microtasks.length;
    }
    onScheduleTask(delegate, current, target, task) {
      switch (task.type) {
        case "microTask":
          let args = task.data && task.data.args;
          let additionalArgs;
          if (args) {
            let callbackIndex = task.data.cbIdx;
            if (typeof args.length === "number" && args.length > callbackIndex + 1) {
              additionalArgs = Array.prototype.slice.call(args, callbackIndex + 1);
            }
          }
          this._microtasks.push({
            func: task.invoke,
            args: additionalArgs,
            target: task.data && task.data.target
          });
          break;
        case "macroTask":
          switch (task.source) {
            case "setTimeout":
              task.data["handleId"] = this._setTimeout(task.invoke, task.data["delay"], Array.prototype.slice.call(task.data["args"], 2));
              break;
            case "setImmediate":
              task.data["handleId"] = this._setTimeout(task.invoke, 0, Array.prototype.slice.call(task.data["args"], 1));
              break;
            case "setInterval":
              task.data["handleId"] = this._setInterval(task.invoke, task.data["delay"], Array.prototype.slice.call(task.data["args"], 2));
              break;
            case "XMLHttpRequest.send":
              throw new Error("Cannot make XHRs from within a fake async test. Request URL: " + task.data["url"]);
            case "requestAnimationFrame":
            case "webkitRequestAnimationFrame":
            case "mozRequestAnimationFrame":
              task.data["handleId"] = this._setTimeout(task.invoke, 16, task.data["args"], this.trackPendingRequestAnimationFrame);
              break;
            default:
              const macroTaskOption = this.findMacroTaskOption(task);
              if (macroTaskOption) {
                const args2 = task.data && task.data["args"];
                const delay = args2 && args2.length > 1 ? args2[1] : 0;
                let callbackArgs = macroTaskOption.callbackArgs ? macroTaskOption.callbackArgs : args2;
                if (!!macroTaskOption.isPeriodic) {
                  task.data["handleId"] = this._setInterval(task.invoke, delay, callbackArgs);
                  task.data.isPeriodic = true;
                } else {
                  task.data["handleId"] = this._setTimeout(task.invoke, delay, callbackArgs);
                }
                break;
              }
              throw new Error("Unknown macroTask scheduled in fake async test: " + task.source);
          }
          break;
        case "eventTask":
          task = delegate.scheduleTask(target, task);
          break;
      }
      return task;
    }
    onCancelTask(delegate, current, target, task) {
      switch (task.source) {
        case "setTimeout":
        case "requestAnimationFrame":
        case "webkitRequestAnimationFrame":
        case "mozRequestAnimationFrame":
          return this._clearTimeout(task.data["handleId"]);
        case "setInterval":
          return this._clearInterval(task.data["handleId"]);
        default:
          const macroTaskOption = this.findMacroTaskOption(task);
          if (macroTaskOption) {
            const handleId = task.data["handleId"];
            return macroTaskOption.isPeriodic ? this._clearInterval(handleId) : this._clearTimeout(handleId);
          }
          return delegate.cancelTask(target, task);
      }
    }
    onInvoke(delegate, current, target, callback, applyThis, applyArgs, source) {
      try {
        FakeAsyncTestZoneSpec.patchDate();
        return delegate.invoke(target, callback, applyThis, applyArgs, source);
      } finally {
        if (!this.patchDateLocked) {
          FakeAsyncTestZoneSpec.resetDate();
        }
      }
    }
    findMacroTaskOption(task) {
      if (!this.macroTaskOptions) {
        return null;
      }
      for (let i = 0; i < this.macroTaskOptions.length; i++) {
        const macroTaskOption = this.macroTaskOptions[i];
        if (macroTaskOption.source === task.source) {
          return macroTaskOption;
        }
      }
      return null;
    }
    onHandleError(parentZoneDelegate, currentZone, targetZone, error2) {
      this._lastError = error2;
      return false;
    }
  }
  Zone["FakeAsyncTestZoneSpec"] = FakeAsyncTestZoneSpec;
})(typeof window === "object" && window || typeof self === "object" && self || global);
Zone.__load_patch("fakeasync", (global2, Zone2, api) => {
  const FakeAsyncTestZoneSpec = Zone2 && Zone2["FakeAsyncTestZoneSpec"];
  function getProxyZoneSpec() {
    return Zone2 && Zone2["ProxyZoneSpec"];
  }
  let _fakeAsyncTestZoneSpec = null;
  function resetFakeAsyncZone() {
    if (_fakeAsyncTestZoneSpec) {
      _fakeAsyncTestZoneSpec.unlockDatePatch();
    }
    _fakeAsyncTestZoneSpec = null;
    getProxyZoneSpec() && getProxyZoneSpec().assertPresent().resetDelegate();
  }
  function fakeAsync(fn) {
    const fakeAsyncFn = function(...args) {
      const ProxyZoneSpec2 = getProxyZoneSpec();
      if (!ProxyZoneSpec2) {
        throw new Error("ProxyZoneSpec is needed for the async() test helper but could not be found. Please make sure that your environment includes zone.js/plugins/proxy");
      }
      const proxyZoneSpec = ProxyZoneSpec2.assertPresent();
      if (Zone2.current.get("FakeAsyncTestZoneSpec")) {
        throw new Error("fakeAsync() calls can not be nested");
      }
      try {
        if (!_fakeAsyncTestZoneSpec) {
          if (proxyZoneSpec.getDelegate() instanceof FakeAsyncTestZoneSpec) {
            throw new Error("fakeAsync() calls can not be nested");
          }
          _fakeAsyncTestZoneSpec = new FakeAsyncTestZoneSpec();
        }
        let res;
        const lastProxyZoneSpec = proxyZoneSpec.getDelegate();
        proxyZoneSpec.setDelegate(_fakeAsyncTestZoneSpec);
        _fakeAsyncTestZoneSpec.lockDatePatch();
        try {
          res = fn.apply(this, args);
          flushMicrotasks();
        } finally {
          proxyZoneSpec.setDelegate(lastProxyZoneSpec);
        }
        if (_fakeAsyncTestZoneSpec.pendingPeriodicTimers.length > 0) {
          throw new Error(`${_fakeAsyncTestZoneSpec.pendingPeriodicTimers.length} periodic timer(s) still in the queue.`);
        }
        if (_fakeAsyncTestZoneSpec.pendingTimers.length > 0) {
          throw new Error(`${_fakeAsyncTestZoneSpec.pendingTimers.length} timer(s) still in the queue.`);
        }
        return res;
      } finally {
        resetFakeAsyncZone();
      }
    };
    fakeAsyncFn.isFakeAsync = true;
    return fakeAsyncFn;
  }
  function _getFakeAsyncZoneSpec() {
    if (_fakeAsyncTestZoneSpec == null) {
      _fakeAsyncTestZoneSpec = Zone2.current.get("FakeAsyncTestZoneSpec");
      if (_fakeAsyncTestZoneSpec == null) {
        throw new Error("The code should be running in the fakeAsync zone to call this function");
      }
    }
    return _fakeAsyncTestZoneSpec;
  }
  function tick(millis = 0, ignoreNestedTimeout = false) {
    _getFakeAsyncZoneSpec().tick(millis, null, ignoreNestedTimeout);
  }
  function flush(maxTurns) {
    return _getFakeAsyncZoneSpec().flush(maxTurns);
  }
  function discardPeriodicTasks() {
    const zoneSpec = _getFakeAsyncZoneSpec();
    zoneSpec.pendingPeriodicTimers;
    zoneSpec.pendingPeriodicTimers.length = 0;
  }
  function flushMicrotasks() {
    _getFakeAsyncZoneSpec().flushMicrotasks();
  }
  Zone2[api.symbol("fakeAsyncTest")] = { resetFakeAsyncZone, flushMicrotasks, discardPeriodicTasks, tick, flush, fakeAsync };
}, true);
Zone.__load_patch("promisefortest", (global2, Zone2, api) => {
  const symbolState = api.symbol("state");
  const UNRESOLVED = null;
  const symbolParentUnresolved = api.symbol("parentUnresolved");
  Promise[api.symbol("patchPromiseForTest")] = function patchPromiseForTest() {
    let oriThen = Promise[Zone2.__symbol__("ZonePromiseThen")];
    if (oriThen) {
      return;
    }
    oriThen = Promise[Zone2.__symbol__("ZonePromiseThen")] = Promise.prototype.then;
    Promise.prototype.then = function() {
      const chained = oriThen.apply(this, arguments);
      if (this[symbolState] === UNRESOLVED) {
        const asyncTestZoneSpec = Zone2.current.get("AsyncTestZoneSpec");
        if (asyncTestZoneSpec) {
          asyncTestZoneSpec.unresolvedChainedPromiseCount++;
          chained[symbolParentUnresolved] = true;
        }
      }
      return chained;
    };
  };
  Promise[api.symbol("unPatchPromiseForTest")] = function unpatchPromiseForTest() {
    const oriThen = Promise[Zone2.__symbol__("ZonePromiseThen")];
    if (oriThen) {
      Promise.prototype.then = oriThen;
      Promise[Zone2.__symbol__("ZonePromiseThen")] = void 0;
    }
  };
});
/*! Bundled license information:

zone.js/fesm2015/zone.js:
  (**
   * @license Angular v<unknown>
   * (c) 2010-2022 Google LLC. https://angular.io/
   * License: MIT
   *)

zone.js/fesm2015/zone-testing.js:
  (**
   * @license Angular v<unknown>
   * (c) 2010-2022 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=polyfills.mjs.map
