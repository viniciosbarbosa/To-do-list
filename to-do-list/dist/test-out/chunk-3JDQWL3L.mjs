import {
  MatIconModule
} from "./chunk-MUT2MIU7.mjs";
import {
  A11yModule,
  CdkMonitorFocus,
  CdkObserveContent,
  CdkPortal,
  CdkPortalOutlet,
  Directionality,
  ENTER,
  FocusKeyManager,
  FocusMonitor,
  MAT_RIPPLE_GLOBAL_OPTIONS,
  MatButtonModule,
  MatCardModule,
  MatCommonModule,
  MatDialog,
  MatDialogModule,
  MatRipple,
  MatRippleModule,
  ObserversModule,
  Platform,
  PortalModule,
  SPACE,
  TemplatePortal,
  ToDoFormComponent,
  ViewportRuler,
  animate,
  coerceBooleanProperty,
  coerceNumberProperty,
  hasModifierKey,
  mixinColor,
  mixinDisableRipple,
  mixinDisabled,
  mixinTabIndex,
  normalizePassiveListenerOptions,
  state,
  style,
  transition,
  trigger
} from "./chunk-MU7TXZPU.mjs";
import {
  ToDoListSignalsService,
  TodoKeyLocalStorage
} from "./chunk-OSJ25O7G.mjs";
import {
  CommonModule,
  DOCUMENT,
  NgClass,
  NgForOf,
  NgIf,
  NgTemplateOutlet
} from "./chunk-5P7YWOVB.mjs";
import {
  ANIMATION_MODULE_TYPE,
  Attribute,
  BehaviorSubject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver$1,
  ContentChild,
  ContentChildren,
  Directive,
  EMPTY,
  ElementRef,
  EventEmitter,
  FactoryTarget,
  Inject,
  InjectionToken,
  Input,
  NgModule,
  NgZone,
  Observable,
  Optional,
  Output,
  QueryList,
  Subject,
  Subscription,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation$1,
  __decorate,
  computed,
  core_exports,
  distinctUntilChanged,
  filter,
  forwardRef,
  fromEvent,
  inject,
  merge,
  of,
  skip,
  startWith,
  switchMap,
  take,
  takeUntil,
  timer,
  ɵɵngDeclareClassMetadata,
  ɵɵngDeclareComponent,
  ɵɵngDeclareDirective,
  ɵɵngDeclareFactory,
  ɵɵngDeclareInjector,
  ɵɵngDeclareNgModule
} from "./chunk-TPVQNH6C.mjs";

// angular:jit:template:file:src/app/components/to-do-card/to-do-card.component.html
var to_do_card_component_default = '<mat-tab-group\n  color="primary"\n  *ngIf="toDoListData().length > 0; else withoutTodos"\n>\n  <mat-tab label="Em Andamento">\n    <div *ngFor="let item of toDoListData()" class="todo_tab">\n      <mat-card class="todo_card" *ngIf="item?.done === false">\n        <mat-card-header>\n          <mat-card-title class="todo_card_title">\n            {{ item.title }}\n          </mat-card-title>\n\n          <mat-card-subtitle class="todo_card_subtitle">\n            {{ item.description }}\n          </mat-card-subtitle>\n        </mat-card-header>\n\n        <mat-card-actions class="todo_card_btn_actions" align="end">\n          <button\n            class="header_btn check-btn"\n            mat-icon-button\n            aria-label="Concluir Tarefa"\n            (click)="handleDoneElement(item.id)"\n          >\n            <mat-icon class="">done_all</mat-icon>\n          </button>\n\n          <button\n            class="header_btn check-btn edit-task"\n            mat-icon-button\n            aria-label="Editar Task"\n            (click)="editTask(item)"\n          >\n            <mat-icon>edit</mat-icon>\n          </button>\n\n          <button\n            class="header_btn check-btn todo_form_delete_btn"\n            mat-icon-button\n            aria-label="Deletar task"\n            (click)="handleDeleteElement(item)"\n          >\n            <mat-icon>delete_forever</mat-icon>\n          </button>\n        </mat-card-actions>\n      </mat-card>\n    </div>\n  </mat-tab>\n\n  <mat-tab label="Finalizado">\n    <!-- <button\n      *ngIf="toDoListData().length > 0"\n      mat-raised-button\n      type="button"\n      class="btn_excluir_todo"\n      color="warn"\n      (click)="deleteAllLocalStorage(true)"\n    >\n      Excluir Todo\n    </button> -->\n\n    <div *ngFor="let item of toDoListData()" class="todo_tab">\n      <mat-card class="todo_card" *ngIf="item?.done === true">\n        <mat-card-header>\n          <mat-card-title class="todo_card_title">\n            {{ item.title }}\n          </mat-card-title>\n\n          <mat-card-subtitle class="todo_card_subtitle">\n            {{ item.description }}\n          </mat-card-subtitle>\n        </mat-card-header>\n\n        <mat-card-actions class="todo_card_btn_actions" align="end">\n          <button\n            class="header_btn check-btn"\n            mat-icon-button\n            aria-label="Concluir Tarefa"\n            (click)="handleToBeDoneElement(item.id)"\n          >\n            <mat-icon>assignment_return</mat-icon>\n          </button>\n\n          <button\n            class="header_btn check-btn todo_form_delete_btn"\n            mat-icon-button\n            aria-label="Deletar task"\n            (click)="handleDeleteElement(item)"\n          >\n            <mat-icon>delete_forever</mat-icon>\n          </button>\n        </mat-card-actions>\n      </mat-card>\n    </div>\n  </mat-tab>\n</mat-tab-group>\n\n<ng-template #withoutTodos>\n  <h3 class="warn_message">N\xE3o h\xE1 tarefas a serem exibidas</h3>\n  <span class="warn_submessage"\n    >click no bot\xE3o acima para cadastrar uma nova tarefa</span\n  >\n</ng-template>\n';

// node_modules/@angular/material/fesm2022/tabs.mjs
var matTabsAnimations = {
  /** Animation translates a tab along the X axis. */
  translateTab: trigger("translateTab", [
    // Transitions to `none` instead of 0, because some browsers might blur the content.
    state("center, void, left-origin-center, right-origin-center", style({ transform: "none" })),
    // If the tab is either on the left or right, we additionally add a `min-height` of 1px
    // in order to ensure that the element has a height before its state changes. This is
    // necessary because Chrome does seem to skip the transition in RTL mode if the element does
    // not have a static height and is not rendered. See related issue: #9465
    state("left", style({
      transform: "translate3d(-100%, 0, 0)",
      minHeight: "1px",
      // Normally this is redundant since we detach the content from the DOM, but if the user
      // opted into keeping the content in the DOM, we have to hide it so it isn't focusable.
      visibility: "hidden"
    })),
    state("right", style({
      transform: "translate3d(100%, 0, 0)",
      minHeight: "1px",
      visibility: "hidden"
    })),
    transition("* => left, * => right, left => center, right => center", animate("{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)")),
    transition("void => left-origin-center", [
      style({ transform: "translate3d(-100%, 0, 0)", visibility: "hidden" }),
      animate("{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)")
    ]),
    transition("void => right-origin-center", [
      style({ transform: "translate3d(100%, 0, 0)", visibility: "hidden" }),
      animate("{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)")
    ])
  ])
};
var _MatTabBodyPortal = class _MatTabBodyPortal extends CdkPortalOutlet {
  constructor(componentFactoryResolver, viewContainerRef, _host, _document) {
    super(componentFactoryResolver, viewContainerRef, _document);
    this._host = _host;
    this._centeringSub = Subscription.EMPTY;
    this._leavingSub = Subscription.EMPTY;
  }
  /** Set initial visibility or set up subscription for changing visibility. */
  ngOnInit() {
    super.ngOnInit();
    this._centeringSub = this._host._beforeCentering.pipe(startWith(this._host._isCenterPosition(this._host._position))).subscribe((isCentering) => {
      if (isCentering && !this.hasAttached()) {
        this.attach(this._host._content);
      }
    });
    this._leavingSub = this._host._afterLeavingCenter.subscribe(() => {
      if (!this._host.preserveContent) {
        this.detach();
      }
    });
  }
  /** Clean up centering subscription. */
  ngOnDestroy() {
    super.ngOnDestroy();
    this._centeringSub.unsubscribe();
    this._leavingSub.unsubscribe();
  }
};
_MatTabBodyPortal.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: _MatTabBodyPortal, deps: [{ token: ComponentFactoryResolver$1 }, { token: ViewContainerRef }, { token: forwardRef(() => MatTabBody) }, { token: DOCUMENT }], target: FactoryTarget.Directive });
_MatTabBodyPortal.\u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "16.1.1", type: _MatTabBodyPortal, selector: "[matTabBodyHost]", usesInheritance: true, ngImport: core_exports });
var MatTabBodyPortal = _MatTabBodyPortal;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: MatTabBodyPortal, decorators: [{
  type: Directive,
  args: [{
    selector: "[matTabBodyHost]"
  }]
}], ctorParameters: function() {
  return [{ type: ComponentFactoryResolver$1 }, { type: ViewContainerRef }, { type: MatTabBody, decorators: [{
    type: Inject,
    args: [forwardRef(() => MatTabBody)]
  }] }, { type: void 0, decorators: [{
    type: Inject,
    args: [DOCUMENT]
  }] }];
} });
var __MatTabBodyBase = class __MatTabBodyBase {
  /** The shifted index position of the tab body, where zero represents the active center tab. */
  set position(position) {
    this._positionIndex = position;
    this._computePositionAnimationState();
  }
  constructor(_elementRef, _dir, changeDetectorRef) {
    this._elementRef = _elementRef;
    this._dir = _dir;
    this._dirChangeSubscription = Subscription.EMPTY;
    this._translateTabComplete = new Subject();
    this._onCentering = new EventEmitter();
    this._beforeCentering = new EventEmitter();
    this._afterLeavingCenter = new EventEmitter();
    this._onCentered = new EventEmitter(true);
    this.animationDuration = "500ms";
    this.preserveContent = false;
    if (_dir) {
      this._dirChangeSubscription = _dir.change.subscribe((dir) => {
        this._computePositionAnimationState(dir);
        changeDetectorRef.markForCheck();
      });
    }
    this._translateTabComplete.pipe(distinctUntilChanged((x, y) => {
      return x.fromState === y.fromState && x.toState === y.toState;
    })).subscribe((event) => {
      if (this._isCenterPosition(event.toState) && this._isCenterPosition(this._position)) {
        this._onCentered.emit();
      }
      if (this._isCenterPosition(event.fromState) && !this._isCenterPosition(this._position)) {
        this._afterLeavingCenter.emit();
      }
    });
  }
  /**
   * After initialized, check if the content is centered and has an origin. If so, set the
   * special position states that transition the tab from the left or right before centering.
   */
  ngOnInit() {
    if (this._position == "center" && this.origin != null) {
      this._position = this._computePositionFromOrigin(this.origin);
    }
  }
  ngOnDestroy() {
    this._dirChangeSubscription.unsubscribe();
    this._translateTabComplete.complete();
  }
  _onTranslateTabStarted(event) {
    const isCentering = this._isCenterPosition(event.toState);
    this._beforeCentering.emit(isCentering);
    if (isCentering) {
      this._onCentering.emit(this._elementRef.nativeElement.clientHeight);
    }
  }
  /** The text direction of the containing app. */
  _getLayoutDirection() {
    return this._dir && this._dir.value === "rtl" ? "rtl" : "ltr";
  }
  /** Whether the provided position state is considered center, regardless of origin. */
  _isCenterPosition(position) {
    return position == "center" || position == "left-origin-center" || position == "right-origin-center";
  }
  /** Computes the position state that will be used for the tab-body animation trigger. */
  _computePositionAnimationState(dir = this._getLayoutDirection()) {
    if (this._positionIndex < 0) {
      this._position = dir == "ltr" ? "left" : "right";
    } else if (this._positionIndex > 0) {
      this._position = dir == "ltr" ? "right" : "left";
    } else {
      this._position = "center";
    }
  }
  /**
   * Computes the position state based on the specified origin position. This is used if the
   * tab is becoming visible immediately after creation.
   */
  _computePositionFromOrigin(origin) {
    const dir = this._getLayoutDirection();
    if (dir == "ltr" && origin <= 0 || dir == "rtl" && origin > 0) {
      return "left-origin-center";
    }
    return "right-origin-center";
  }
};
__MatTabBodyBase.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: __MatTabBodyBase, deps: [{ token: ElementRef }, { token: Directionality, optional: true }, { token: ChangeDetectorRef }], target: FactoryTarget.Directive });
__MatTabBodyBase.\u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "16.1.1", type: __MatTabBodyBase, inputs: { _content: ["content", "_content"], origin: "origin", animationDuration: "animationDuration", preserveContent: "preserveContent", position: "position" }, outputs: { _onCentering: "_onCentering", _beforeCentering: "_beforeCentering", _afterLeavingCenter: "_afterLeavingCenter", _onCentered: "_onCentered" }, ngImport: core_exports });
var _MatTabBodyBase = __MatTabBodyBase;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: _MatTabBodyBase, decorators: [{
  type: Directive
}], ctorParameters: function() {
  return [{ type: ElementRef }, { type: Directionality, decorators: [{
    type: Optional
  }] }, { type: ChangeDetectorRef }];
}, propDecorators: { _onCentering: [{
  type: Output
}], _beforeCentering: [{
  type: Output
}], _afterLeavingCenter: [{
  type: Output
}], _onCentered: [{
  type: Output
}], _content: [{
  type: Input,
  args: ["content"]
}], origin: [{
  type: Input
}], animationDuration: [{
  type: Input
}], preserveContent: [{
  type: Input
}], position: [{
  type: Input
}] } });
var _MatTabBody = class _MatTabBody extends _MatTabBodyBase {
  constructor(elementRef, dir, changeDetectorRef) {
    super(elementRef, dir, changeDetectorRef);
  }
};
_MatTabBody.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: _MatTabBody, deps: [{ token: ElementRef }, { token: Directionality, optional: true }, { token: ChangeDetectorRef }], target: FactoryTarget.Component });
_MatTabBody.\u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "16.1.1", type: _MatTabBody, selector: "mat-tab-body", host: { classAttribute: "mat-mdc-tab-body" }, viewQueries: [{ propertyName: "_portalHost", first: true, predicate: CdkPortalOutlet, descendants: true }], usesInheritance: true, ngImport: core_exports, template: '<div class="mat-mdc-tab-body-content" #content\n     [@translateTab]="{\n        value: _position,\n        params: {animationDuration: animationDuration}\n     }"\n     (@translateTab.start)="_onTranslateTabStarted($event)"\n     (@translateTab.done)="_translateTabComplete.next($event)"\n     cdkScrollable>\n  <ng-template matTabBodyHost></ng-template>\n</div>\n', styles: ['.mat-mdc-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;outline:0;flex-basis:100%}.mat-mdc-tab-body.mat-mdc-tab-body-active{position:relative;overflow-x:hidden;overflow-y:auto;z-index:1;flex-grow:1}.mat-mdc-tab-group.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body.mat-mdc-tab-body-active{overflow-y:hidden}.mat-mdc-tab-body-content{height:100%;overflow:auto}.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body-content{overflow:hidden}.mat-mdc-tab-body-content[style*="visibility: hidden"]{display:none}'], dependencies: [{ kind: "directive", type: MatTabBodyPortal, selector: "[matTabBodyHost]" }], animations: [matTabsAnimations.translateTab], changeDetection: ChangeDetectionStrategy.Default, encapsulation: ViewEncapsulation$1.None });
var MatTabBody = _MatTabBody;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: MatTabBody, decorators: [{
  type: Component,
  args: [{ selector: "mat-tab-body", encapsulation: ViewEncapsulation$1.None, changeDetection: ChangeDetectionStrategy.Default, animations: [matTabsAnimations.translateTab], host: {
    "class": "mat-mdc-tab-body"
  }, template: '<div class="mat-mdc-tab-body-content" #content\n     [@translateTab]="{\n        value: _position,\n        params: {animationDuration: animationDuration}\n     }"\n     (@translateTab.start)="_onTranslateTabStarted($event)"\n     (@translateTab.done)="_translateTabComplete.next($event)"\n     cdkScrollable>\n  <ng-template matTabBodyHost></ng-template>\n</div>\n', styles: ['.mat-mdc-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;outline:0;flex-basis:100%}.mat-mdc-tab-body.mat-mdc-tab-body-active{position:relative;overflow-x:hidden;overflow-y:auto;z-index:1;flex-grow:1}.mat-mdc-tab-group.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body.mat-mdc-tab-body-active{overflow-y:hidden}.mat-mdc-tab-body-content{height:100%;overflow:auto}.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body-content{overflow:hidden}.mat-mdc-tab-body-content[style*="visibility: hidden"]{display:none}'] }]
}], ctorParameters: function() {
  return [{ type: ElementRef }, { type: Directionality, decorators: [{
    type: Optional
  }] }, { type: ChangeDetectorRef }];
}, propDecorators: { _portalHost: [{
  type: ViewChild,
  args: [CdkPortalOutlet]
}] } });
var MAT_TAB_CONTENT = new InjectionToken("MatTabContent");
var _MatTabContent = class _MatTabContent {
  constructor(template) {
    this.template = template;
  }
};
_MatTabContent.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: _MatTabContent, deps: [{ token: TemplateRef }], target: FactoryTarget.Directive });
_MatTabContent.\u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "16.1.1", type: _MatTabContent, selector: "[matTabContent]", providers: [{ provide: MAT_TAB_CONTENT, useExisting: _MatTabContent }], ngImport: core_exports });
var MatTabContent = _MatTabContent;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: MatTabContent, decorators: [{
  type: Directive,
  args: [{
    selector: "[matTabContent]",
    providers: [{ provide: MAT_TAB_CONTENT, useExisting: MatTabContent }]
  }]
}], ctorParameters: function() {
  return [{ type: TemplateRef }];
} });
var MAT_TAB_LABEL = new InjectionToken("MatTabLabel");
var MAT_TAB = new InjectionToken("MAT_TAB");
var _MatTabLabel = class _MatTabLabel extends CdkPortal {
  constructor(templateRef, viewContainerRef, _closestTab) {
    super(templateRef, viewContainerRef);
    this._closestTab = _closestTab;
  }
};
_MatTabLabel.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: _MatTabLabel, deps: [{ token: TemplateRef }, { token: ViewContainerRef }, { token: MAT_TAB, optional: true }], target: FactoryTarget.Directive });
_MatTabLabel.\u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "16.1.1", type: _MatTabLabel, selector: "[mat-tab-label], [matTabLabel]", providers: [{ provide: MAT_TAB_LABEL, useExisting: _MatTabLabel }], usesInheritance: true, ngImport: core_exports });
var MatTabLabel = _MatTabLabel;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: MatTabLabel, decorators: [{
  type: Directive,
  args: [{
    selector: "[mat-tab-label], [matTabLabel]",
    providers: [{ provide: MAT_TAB_LABEL, useExisting: MatTabLabel }]
  }]
}], ctorParameters: function() {
  return [{ type: TemplateRef }, { type: ViewContainerRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_TAB]
  }, {
    type: Optional
  }] }];
} });
var ACTIVE_CLASS = "mdc-tab-indicator--active";
var NO_TRANSITION_CLASS = "mdc-tab-indicator--no-transition";
var MatInkBar = class {
  constructor(_items) {
    this._items = _items;
  }
  /** Hides the ink bar. */
  hide() {
    this._items.forEach((item) => item.deactivateInkBar());
  }
  /** Aligns the ink bar to a DOM node. */
  alignToElement(element) {
    const correspondingItem = this._items.find((item) => item.elementRef.nativeElement === element);
    const currentItem = this._currentItem;
    if (correspondingItem === currentItem) {
      return;
    }
    currentItem?.deactivateInkBar();
    if (correspondingItem) {
      const clientRect = currentItem?.elementRef.nativeElement.getBoundingClientRect?.();
      correspondingItem.activateInkBar(clientRect);
      this._currentItem = correspondingItem;
    }
  }
};
function mixinInkBarItem(base) {
  return class extends base {
    constructor(...args) {
      super(...args);
      this._fitToContent = false;
    }
    /** Whether the ink bar should fit to the entire tab or just its content. */
    get fitInkBarToContent() {
      return this._fitToContent;
    }
    set fitInkBarToContent(v) {
      const newValue = coerceBooleanProperty(v);
      if (this._fitToContent !== newValue) {
        this._fitToContent = newValue;
        if (this._inkBarElement) {
          this._appendInkBarElement();
        }
      }
    }
    /** Aligns the ink bar to the current item. */
    activateInkBar(previousIndicatorClientRect) {
      const element = this.elementRef.nativeElement;
      if (!previousIndicatorClientRect || !element.getBoundingClientRect || !this._inkBarContentElement) {
        element.classList.add(ACTIVE_CLASS);
        return;
      }
      const currentClientRect = element.getBoundingClientRect();
      const widthDelta = previousIndicatorClientRect.width / currentClientRect.width;
      const xPosition = previousIndicatorClientRect.left - currentClientRect.left;
      element.classList.add(NO_TRANSITION_CLASS);
      this._inkBarContentElement.style.setProperty("transform", `translateX(${xPosition}px) scaleX(${widthDelta})`);
      element.getBoundingClientRect();
      element.classList.remove(NO_TRANSITION_CLASS);
      element.classList.add(ACTIVE_CLASS);
      this._inkBarContentElement.style.setProperty("transform", "");
    }
    /** Removes the ink bar from the current item. */
    deactivateInkBar() {
      this.elementRef.nativeElement.classList.remove(ACTIVE_CLASS);
    }
    /** Initializes the foundation. */
    ngOnInit() {
      this._createInkBarElement();
    }
    /** Destroys the foundation. */
    ngOnDestroy() {
      this._inkBarElement?.remove();
      this._inkBarElement = this._inkBarContentElement = null;
    }
    /** Creates and appends the ink bar element. */
    _createInkBarElement() {
      const documentNode = this.elementRef.nativeElement.ownerDocument || document;
      this._inkBarElement = documentNode.createElement("span");
      this._inkBarContentElement = documentNode.createElement("span");
      this._inkBarElement.className = "mdc-tab-indicator";
      this._inkBarContentElement.className = "mdc-tab-indicator__content mdc-tab-indicator__content--underline";
      this._inkBarElement.appendChild(this._inkBarContentElement);
      this._appendInkBarElement();
    }
    /**
     * Appends the ink bar to the tab host element or content, depending on whether
     * the ink bar should fit to content.
     */
    _appendInkBarElement() {
      if (!this._inkBarElement && (typeof ngDevMode === "undefined" || ngDevMode)) {
        throw Error("Ink bar element has not been created and cannot be appended");
      }
      const parentElement = this._fitToContent ? this.elementRef.nativeElement.querySelector(".mdc-tab__content") : this.elementRef.nativeElement;
      if (!parentElement && (typeof ngDevMode === "undefined" || ngDevMode)) {
        throw Error("Missing element to host the ink bar");
      }
      parentElement.appendChild(this._inkBarElement);
    }
  };
}
function _MAT_INK_BAR_POSITIONER_FACTORY() {
  const method = (element) => ({
    left: element ? (element.offsetLeft || 0) + "px" : "0",
    width: element ? (element.offsetWidth || 0) + "px" : "0"
  });
  return method;
}
var _MAT_INK_BAR_POSITIONER = new InjectionToken("MatInkBarPositioner", {
  providedIn: "root",
  factory: _MAT_INK_BAR_POSITIONER_FACTORY
});
var _MatTabLabelWrapperMixinBase = mixinDisabled(class {
});
var __MatTabLabelWrapperBase = class __MatTabLabelWrapperBase extends _MatTabLabelWrapperMixinBase {
  constructor(elementRef) {
    super();
    this.elementRef = elementRef;
  }
  /** Sets focus on the wrapper element */
  focus() {
    this.elementRef.nativeElement.focus();
  }
  getOffsetLeft() {
    return this.elementRef.nativeElement.offsetLeft;
  }
  getOffsetWidth() {
    return this.elementRef.nativeElement.offsetWidth;
  }
};
__MatTabLabelWrapperBase.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: __MatTabLabelWrapperBase, deps: [{ token: ElementRef }], target: FactoryTarget.Directive });
__MatTabLabelWrapperBase.\u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "16.1.1", type: __MatTabLabelWrapperBase, usesInheritance: true, ngImport: core_exports });
var _MatTabLabelWrapperBase = __MatTabLabelWrapperBase;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: _MatTabLabelWrapperBase, decorators: [{
  type: Directive
}], ctorParameters: function() {
  return [{ type: ElementRef }];
} });
var _MatTabLabelWrapperBaseWithInkBarItem = mixinInkBarItem(_MatTabLabelWrapperBase);
var _MatTabLabelWrapper = class _MatTabLabelWrapper extends _MatTabLabelWrapperBaseWithInkBarItem {
};
_MatTabLabelWrapper.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: _MatTabLabelWrapper, deps: null, target: FactoryTarget.Directive });
_MatTabLabelWrapper.\u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "16.1.1", type: _MatTabLabelWrapper, selector: "[matTabLabelWrapper]", inputs: { disabled: "disabled", fitInkBarToContent: "fitInkBarToContent" }, host: { properties: { "class.mat-mdc-tab-disabled": "disabled", "attr.aria-disabled": "!!disabled" } }, usesInheritance: true, ngImport: core_exports });
var MatTabLabelWrapper = _MatTabLabelWrapper;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: MatTabLabelWrapper, decorators: [{
  type: Directive,
  args: [{
    selector: "[matTabLabelWrapper]",
    inputs: ["disabled", "fitInkBarToContent"],
    host: {
      "[class.mat-mdc-tab-disabled]": "disabled",
      "[attr.aria-disabled]": "!!disabled"
    }
  }]
}] });
var _MatTabMixinBase = mixinDisabled(class {
});
var MAT_TAB_GROUP = new InjectionToken("MAT_TAB_GROUP");
var __MatTabBase = class __MatTabBase extends _MatTabMixinBase {
  /** @docs-private */
  get content() {
    return this._contentPortal;
  }
  constructor(_viewContainerRef, _closestTabGroup) {
    super();
    this._viewContainerRef = _viewContainerRef;
    this._closestTabGroup = _closestTabGroup;
    this.textLabel = "";
    this._contentPortal = null;
    this._stateChanges = new Subject();
    this.position = null;
    this.origin = null;
    this.isActive = false;
  }
  ngOnChanges(changes) {
    if (changes.hasOwnProperty("textLabel") || changes.hasOwnProperty("disabled")) {
      this._stateChanges.next();
    }
  }
  ngOnDestroy() {
    this._stateChanges.complete();
  }
  ngOnInit() {
    this._contentPortal = new TemplatePortal(this._explicitContent || this._implicitContent, this._viewContainerRef);
  }
  /**
   * This has been extracted to a util because of TS 4 and VE.
   * View Engine doesn't support property rename inheritance.
   * TS 4.0 doesn't allow properties to override accessors or vice-versa.
   * @docs-private
   */
  _setTemplateLabelInput(value) {
    if (value && value._closestTab === this) {
      this._templateLabel = value;
    }
  }
};
__MatTabBase.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: __MatTabBase, deps: [{ token: ViewContainerRef }, { token: MAT_TAB_GROUP, optional: true }], target: FactoryTarget.Directive });
__MatTabBase.\u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "16.1.1", type: __MatTabBase, inputs: { textLabel: ["label", "textLabel"], ariaLabel: ["aria-label", "ariaLabel"], ariaLabelledby: ["aria-labelledby", "ariaLabelledby"], labelClass: "labelClass", bodyClass: "bodyClass" }, viewQueries: [{ propertyName: "_implicitContent", first: true, predicate: TemplateRef, descendants: true, static: true }], usesInheritance: true, usesOnChanges: true, ngImport: core_exports });
var _MatTabBase = __MatTabBase;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: _MatTabBase, decorators: [{
  type: Directive
}], ctorParameters: function() {
  return [{ type: ViewContainerRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_TAB_GROUP]
  }, {
    type: Optional
  }] }];
}, propDecorators: { _implicitContent: [{
  type: ViewChild,
  args: [TemplateRef, { static: true }]
}], textLabel: [{
  type: Input,
  args: ["label"]
}], ariaLabel: [{
  type: Input,
  args: ["aria-label"]
}], ariaLabelledby: [{
  type: Input,
  args: ["aria-labelledby"]
}], labelClass: [{
  type: Input
}], bodyClass: [{
  type: Input
}] } });
var _MatTab = class _MatTab extends _MatTabBase {
  constructor() {
    super(...arguments);
    this._explicitContent = void 0;
  }
  /** Content for the tab label given by `<ng-template mat-tab-label>`. */
  get templateLabel() {
    return this._templateLabel;
  }
  set templateLabel(value) {
    this._setTemplateLabelInput(value);
  }
};
_MatTab.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: _MatTab, deps: null, target: FactoryTarget.Component });
_MatTab.\u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "16.1.1", type: _MatTab, selector: "mat-tab", inputs: { disabled: "disabled" }, providers: [{ provide: MAT_TAB, useExisting: _MatTab }], queries: [{ propertyName: "_explicitContent", first: true, predicate: MatTabContent, descendants: true, read: TemplateRef, static: true }, { propertyName: "templateLabel", first: true, predicate: MatTabLabel, descendants: true }], exportAs: ["matTab"], usesInheritance: true, ngImport: core_exports, template: "<!-- Create a template for the content of the <mat-tab> so that we can grab a reference to this\n    TemplateRef and use it in a Portal to render the tab content in the appropriate place in the\n    tab-group. -->\n<ng-template><ng-content></ng-content></ng-template>\n", changeDetection: ChangeDetectionStrategy.Default, encapsulation: ViewEncapsulation$1.None });
var MatTab = _MatTab;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: MatTab, decorators: [{
  type: Component,
  args: [{ selector: "mat-tab", inputs: ["disabled"], changeDetection: ChangeDetectionStrategy.Default, encapsulation: ViewEncapsulation$1.None, exportAs: "matTab", providers: [{ provide: MAT_TAB, useExisting: MatTab }], template: "<!-- Create a template for the content of the <mat-tab> so that we can grab a reference to this\n    TemplateRef and use it in a Portal to render the tab content in the appropriate place in the\n    tab-group. -->\n<ng-template><ng-content></ng-content></ng-template>\n" }]
}], propDecorators: { _explicitContent: [{
  type: ContentChild,
  args: [MatTabContent, { read: TemplateRef, static: true }]
}], templateLabel: [{
  type: ContentChild,
  args: [MatTabLabel]
}] } });
var passiveEventListenerOptions = normalizePassiveListenerOptions({
  passive: true
});
var HEADER_SCROLL_DELAY = 650;
var HEADER_SCROLL_INTERVAL = 100;
var _MatPaginatedTabHeader = class _MatPaginatedTabHeader {
  /**
   * Whether pagination should be disabled. This can be used to avoid unnecessary
   * layout recalculations if it's known that pagination won't be required.
   */
  get disablePagination() {
    return this._disablePagination;
  }
  set disablePagination(value) {
    this._disablePagination = coerceBooleanProperty(value);
  }
  /** The index of the active tab. */
  get selectedIndex() {
    return this._selectedIndex;
  }
  set selectedIndex(value) {
    value = coerceNumberProperty(value);
    if (this._selectedIndex != value) {
      this._selectedIndexChanged = true;
      this._selectedIndex = value;
      if (this._keyManager) {
        this._keyManager.updateActiveItem(value);
      }
    }
  }
  constructor(_elementRef, _changeDetectorRef, _viewportRuler, _dir, _ngZone, _platform, _animationMode) {
    this._elementRef = _elementRef;
    this._changeDetectorRef = _changeDetectorRef;
    this._viewportRuler = _viewportRuler;
    this._dir = _dir;
    this._ngZone = _ngZone;
    this._platform = _platform;
    this._animationMode = _animationMode;
    this._scrollDistance = 0;
    this._selectedIndexChanged = false;
    this._destroyed = new Subject();
    this._showPaginationControls = false;
    this._disableScrollAfter = true;
    this._disableScrollBefore = true;
    this._stopScrolling = new Subject();
    this._disablePagination = false;
    this._selectedIndex = 0;
    this.selectFocusedIndex = new EventEmitter();
    this.indexFocused = new EventEmitter();
    _ngZone.runOutsideAngular(() => {
      fromEvent(_elementRef.nativeElement, "mouseleave").pipe(takeUntil(this._destroyed)).subscribe(() => {
        this._stopInterval();
      });
    });
  }
  ngAfterViewInit() {
    fromEvent(this._previousPaginator.nativeElement, "touchstart", passiveEventListenerOptions).pipe(takeUntil(this._destroyed)).subscribe(() => {
      this._handlePaginatorPress("before");
    });
    fromEvent(this._nextPaginator.nativeElement, "touchstart", passiveEventListenerOptions).pipe(takeUntil(this._destroyed)).subscribe(() => {
      this._handlePaginatorPress("after");
    });
  }
  ngAfterContentInit() {
    const dirChange = this._dir ? this._dir.change : of("ltr");
    const resize = this._viewportRuler.change(150);
    const realign = () => {
      this.updatePagination();
      this._alignInkBarToSelectedTab();
    };
    this._keyManager = new FocusKeyManager(this._items).withHorizontalOrientation(this._getLayoutDirection()).withHomeAndEnd().withWrap().skipPredicate(() => false);
    this._keyManager.updateActiveItem(this._selectedIndex);
    this._ngZone.onStable.pipe(take(1)).subscribe(realign);
    merge(dirChange, resize, this._items.changes, this._itemsResized()).pipe(takeUntil(this._destroyed)).subscribe(() => {
      this._ngZone.run(() => {
        Promise.resolve().then(() => {
          this._scrollDistance = Math.max(0, Math.min(this._getMaxScrollDistance(), this._scrollDistance));
          realign();
        });
      });
      this._keyManager.withHorizontalOrientation(this._getLayoutDirection());
    });
    this._keyManager.change.subscribe((newFocusIndex) => {
      this.indexFocused.emit(newFocusIndex);
      this._setTabFocus(newFocusIndex);
    });
  }
  /** Sends any changes that could affect the layout of the items. */
  _itemsResized() {
    if (typeof ResizeObserver !== "function") {
      return EMPTY;
    }
    return this._items.changes.pipe(
      startWith(this._items),
      switchMap((tabItems) => new Observable((observer) => this._ngZone.runOutsideAngular(() => {
        const resizeObserver = new ResizeObserver((entries) => observer.next(entries));
        tabItems.forEach((item) => resizeObserver.observe(item.elementRef.nativeElement));
        return () => {
          resizeObserver.disconnect();
        };
      }))),
      // Skip the first emit since the resize observer emits when an item
      // is observed for new items when the tab is already inserted
      skip(1),
      // Skip emissions where all the elements are invisible since we don't want
      // the header to try and re-render with invalid measurements. See #25574.
      filter((entries) => entries.some((e) => e.contentRect.width > 0 && e.contentRect.height > 0))
    );
  }
  ngAfterContentChecked() {
    if (this._tabLabelCount != this._items.length) {
      this.updatePagination();
      this._tabLabelCount = this._items.length;
      this._changeDetectorRef.markForCheck();
    }
    if (this._selectedIndexChanged) {
      this._scrollToLabel(this._selectedIndex);
      this._checkScrollingControls();
      this._alignInkBarToSelectedTab();
      this._selectedIndexChanged = false;
      this._changeDetectorRef.markForCheck();
    }
    if (this._scrollDistanceChanged) {
      this._updateTabScrollPosition();
      this._scrollDistanceChanged = false;
      this._changeDetectorRef.markForCheck();
    }
  }
  ngOnDestroy() {
    this._keyManager?.destroy();
    this._destroyed.next();
    this._destroyed.complete();
    this._stopScrolling.complete();
  }
  /** Handles keyboard events on the header. */
  _handleKeydown(event) {
    if (hasModifierKey(event)) {
      return;
    }
    switch (event.keyCode) {
      case ENTER:
      case SPACE:
        if (this.focusIndex !== this.selectedIndex) {
          const item = this._items.get(this.focusIndex);
          if (item && !item.disabled) {
            this.selectFocusedIndex.emit(this.focusIndex);
            this._itemSelected(event);
          }
        }
        break;
      default:
        this._keyManager.onKeydown(event);
    }
  }
  /**
   * Callback for when the MutationObserver detects that the content has changed.
   */
  _onContentChanges() {
    const textContent = this._elementRef.nativeElement.textContent;
    if (textContent !== this._currentTextContent) {
      this._currentTextContent = textContent || "";
      this._ngZone.run(() => {
        this.updatePagination();
        this._alignInkBarToSelectedTab();
        this._changeDetectorRef.markForCheck();
      });
    }
  }
  /**
   * Updates the view whether pagination should be enabled or not.
   *
   * WARNING: Calling this method can be very costly in terms of performance. It should be called
   * as infrequently as possible from outside of the Tabs component as it causes a reflow of the
   * page.
   */
  updatePagination() {
    this._checkPaginationEnabled();
    this._checkScrollingControls();
    this._updateTabScrollPosition();
  }
  /** Tracks which element has focus; used for keyboard navigation */
  get focusIndex() {
    return this._keyManager ? this._keyManager.activeItemIndex : 0;
  }
  /** When the focus index is set, we must manually send focus to the correct label */
  set focusIndex(value) {
    if (!this._isValidIndex(value) || this.focusIndex === value || !this._keyManager) {
      return;
    }
    this._keyManager.setActiveItem(value);
  }
  /**
   * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
   * providing a valid index and return true.
   */
  _isValidIndex(index) {
    return this._items ? !!this._items.toArray()[index] : true;
  }
  /**
   * Sets focus on the HTML element for the label wrapper and scrolls it into the view if
   * scrolling is enabled.
   */
  _setTabFocus(tabIndex) {
    if (this._showPaginationControls) {
      this._scrollToLabel(tabIndex);
    }
    if (this._items && this._items.length) {
      this._items.toArray()[tabIndex].focus();
      const containerEl = this._tabListContainer.nativeElement;
      const dir = this._getLayoutDirection();
      if (dir == "ltr") {
        containerEl.scrollLeft = 0;
      } else {
        containerEl.scrollLeft = containerEl.scrollWidth - containerEl.offsetWidth;
      }
    }
  }
  /** The layout direction of the containing app. */
  _getLayoutDirection() {
    return this._dir && this._dir.value === "rtl" ? "rtl" : "ltr";
  }
  /** Performs the CSS transformation on the tab list that will cause the list to scroll. */
  _updateTabScrollPosition() {
    if (this.disablePagination) {
      return;
    }
    const scrollDistance = this.scrollDistance;
    const translateX = this._getLayoutDirection() === "ltr" ? -scrollDistance : scrollDistance;
    this._tabList.nativeElement.style.transform = `translateX(${Math.round(translateX)}px)`;
    if (this._platform.TRIDENT || this._platform.EDGE) {
      this._tabListContainer.nativeElement.scrollLeft = 0;
    }
  }
  /** Sets the distance in pixels that the tab header should be transformed in the X-axis. */
  get scrollDistance() {
    return this._scrollDistance;
  }
  set scrollDistance(value) {
    this._scrollTo(value);
  }
  /**
   * Moves the tab list in the 'before' or 'after' direction (towards the beginning of the list or
   * the end of the list, respectively). The distance to scroll is computed to be a third of the
   * length of the tab list view window.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  _scrollHeader(direction) {
    const viewLength = this._tabListContainer.nativeElement.offsetWidth;
    const scrollAmount = (direction == "before" ? -1 : 1) * viewLength / 3;
    return this._scrollTo(this._scrollDistance + scrollAmount);
  }
  /** Handles click events on the pagination arrows. */
  _handlePaginatorClick(direction) {
    this._stopInterval();
    this._scrollHeader(direction);
  }
  /**
   * Moves the tab list such that the desired tab label (marked by index) is moved into view.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  _scrollToLabel(labelIndex) {
    if (this.disablePagination) {
      return;
    }
    const selectedLabel = this._items ? this._items.toArray()[labelIndex] : null;
    if (!selectedLabel) {
      return;
    }
    const viewLength = this._tabListContainer.nativeElement.offsetWidth;
    const { offsetLeft, offsetWidth } = selectedLabel.elementRef.nativeElement;
    let labelBeforePos, labelAfterPos;
    if (this._getLayoutDirection() == "ltr") {
      labelBeforePos = offsetLeft;
      labelAfterPos = labelBeforePos + offsetWidth;
    } else {
      labelAfterPos = this._tabListInner.nativeElement.offsetWidth - offsetLeft;
      labelBeforePos = labelAfterPos - offsetWidth;
    }
    const beforeVisiblePos = this.scrollDistance;
    const afterVisiblePos = this.scrollDistance + viewLength;
    if (labelBeforePos < beforeVisiblePos) {
      this.scrollDistance -= beforeVisiblePos - labelBeforePos;
    } else if (labelAfterPos > afterVisiblePos) {
      this.scrollDistance += Math.min(labelAfterPos - afterVisiblePos, labelBeforePos - beforeVisiblePos);
    }
  }
  /**
   * Evaluate whether the pagination controls should be displayed. If the scroll width of the
   * tab list is wider than the size of the header container, then the pagination controls should
   * be shown.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  _checkPaginationEnabled() {
    if (this.disablePagination) {
      this._showPaginationControls = false;
    } else {
      const isEnabled = this._tabListInner.nativeElement.scrollWidth > this._elementRef.nativeElement.offsetWidth;
      if (!isEnabled) {
        this.scrollDistance = 0;
      }
      if (isEnabled !== this._showPaginationControls) {
        this._changeDetectorRef.markForCheck();
      }
      this._showPaginationControls = isEnabled;
    }
  }
  /**
   * Evaluate whether the before and after controls should be enabled or disabled.
   * If the header is at the beginning of the list (scroll distance is equal to 0) then disable the
   * before button. If the header is at the end of the list (scroll distance is equal to the
   * maximum distance we can scroll), then disable the after button.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  _checkScrollingControls() {
    if (this.disablePagination) {
      this._disableScrollAfter = this._disableScrollBefore = true;
    } else {
      this._disableScrollBefore = this.scrollDistance == 0;
      this._disableScrollAfter = this.scrollDistance == this._getMaxScrollDistance();
      this._changeDetectorRef.markForCheck();
    }
  }
  /**
   * Determines what is the maximum length in pixels that can be set for the scroll distance. This
   * is equal to the difference in width between the tab list container and tab header container.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  _getMaxScrollDistance() {
    const lengthOfTabList = this._tabListInner.nativeElement.scrollWidth;
    const viewLength = this._tabListContainer.nativeElement.offsetWidth;
    return lengthOfTabList - viewLength || 0;
  }
  /** Tells the ink-bar to align itself to the current label wrapper */
  _alignInkBarToSelectedTab() {
    const selectedItem = this._items && this._items.length ? this._items.toArray()[this.selectedIndex] : null;
    const selectedLabelWrapper = selectedItem ? selectedItem.elementRef.nativeElement : null;
    if (selectedLabelWrapper) {
      this._inkBar.alignToElement(selectedLabelWrapper);
    } else {
      this._inkBar.hide();
    }
  }
  /** Stops the currently-running paginator interval.  */
  _stopInterval() {
    this._stopScrolling.next();
  }
  /**
   * Handles the user pressing down on one of the paginators.
   * Starts scrolling the header after a certain amount of time.
   * @param direction In which direction the paginator should be scrolled.
   */
  _handlePaginatorPress(direction, mouseEvent) {
    if (mouseEvent && mouseEvent.button != null && mouseEvent.button !== 0) {
      return;
    }
    this._stopInterval();
    timer(HEADER_SCROLL_DELAY, HEADER_SCROLL_INTERVAL).pipe(takeUntil(merge(this._stopScrolling, this._destroyed))).subscribe(() => {
      const { maxScrollDistance, distance } = this._scrollHeader(direction);
      if (distance === 0 || distance >= maxScrollDistance) {
        this._stopInterval();
      }
    });
  }
  /**
   * Scrolls the header to a given position.
   * @param position Position to which to scroll.
   * @returns Information on the current scroll distance and the maximum.
   */
  _scrollTo(position) {
    if (this.disablePagination) {
      return { maxScrollDistance: 0, distance: 0 };
    }
    const maxScrollDistance = this._getMaxScrollDistance();
    this._scrollDistance = Math.max(0, Math.min(maxScrollDistance, position));
    this._scrollDistanceChanged = true;
    this._checkScrollingControls();
    return { maxScrollDistance, distance: this._scrollDistance };
  }
};
_MatPaginatedTabHeader.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: _MatPaginatedTabHeader, deps: [{ token: ElementRef }, { token: ChangeDetectorRef }, { token: ViewportRuler }, { token: Directionality, optional: true }, { token: NgZone }, { token: Platform }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: FactoryTarget.Directive });
_MatPaginatedTabHeader.\u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "16.1.1", type: _MatPaginatedTabHeader, inputs: { disablePagination: "disablePagination" }, ngImport: core_exports });
var MatPaginatedTabHeader = _MatPaginatedTabHeader;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: MatPaginatedTabHeader, decorators: [{
  type: Directive
}], ctorParameters: function() {
  return [{ type: ElementRef }, { type: ChangeDetectorRef }, { type: ViewportRuler }, { type: Directionality, decorators: [{
    type: Optional
  }] }, { type: NgZone }, { type: Platform }, { type: void 0, decorators: [{
    type: Optional
  }, {
    type: Inject,
    args: [ANIMATION_MODULE_TYPE]
  }] }];
}, propDecorators: { disablePagination: [{
  type: Input
}] } });
var __MatTabHeaderBase = class __MatTabHeaderBase extends MatPaginatedTabHeader {
  /** Whether the ripple effect is disabled or not. */
  get disableRipple() {
    return this._disableRipple;
  }
  set disableRipple(value) {
    this._disableRipple = coerceBooleanProperty(value);
  }
  constructor(elementRef, changeDetectorRef, viewportRuler, dir, ngZone, platform, animationMode) {
    super(elementRef, changeDetectorRef, viewportRuler, dir, ngZone, platform, animationMode);
    this._disableRipple = false;
  }
  _itemSelected(event) {
    event.preventDefault();
  }
};
__MatTabHeaderBase.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: __MatTabHeaderBase, deps: [{ token: ElementRef }, { token: ChangeDetectorRef }, { token: ViewportRuler }, { token: Directionality, optional: true }, { token: NgZone }, { token: Platform }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: FactoryTarget.Directive });
__MatTabHeaderBase.\u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "16.1.1", type: __MatTabHeaderBase, inputs: { disableRipple: "disableRipple" }, usesInheritance: true, ngImport: core_exports });
var _MatTabHeaderBase = __MatTabHeaderBase;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: _MatTabHeaderBase, decorators: [{
  type: Directive
}], ctorParameters: function() {
  return [{ type: ElementRef }, { type: ChangeDetectorRef }, { type: ViewportRuler }, { type: Directionality, decorators: [{
    type: Optional
  }] }, { type: NgZone }, { type: Platform }, { type: void 0, decorators: [{
    type: Optional
  }, {
    type: Inject,
    args: [ANIMATION_MODULE_TYPE]
  }] }];
}, propDecorators: { disableRipple: [{
  type: Input
}] } });
var _MatTabHeader = class _MatTabHeader extends _MatTabHeaderBase {
  constructor(elementRef, changeDetectorRef, viewportRuler, dir, ngZone, platform, animationMode) {
    super(elementRef, changeDetectorRef, viewportRuler, dir, ngZone, platform, animationMode);
  }
  ngAfterContentInit() {
    this._inkBar = new MatInkBar(this._items);
    super.ngAfterContentInit();
  }
};
_MatTabHeader.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: _MatTabHeader, deps: [{ token: ElementRef }, { token: ChangeDetectorRef }, { token: ViewportRuler }, { token: Directionality, optional: true }, { token: NgZone }, { token: Platform }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: FactoryTarget.Component });
_MatTabHeader.\u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "16.1.1", type: _MatTabHeader, selector: "mat-tab-header", inputs: { selectedIndex: "selectedIndex" }, outputs: { selectFocusedIndex: "selectFocusedIndex", indexFocused: "indexFocused" }, host: { properties: { "class.mat-mdc-tab-header-pagination-controls-enabled": "_showPaginationControls", "class.mat-mdc-tab-header-rtl": "_getLayoutDirection() == 'rtl'" }, classAttribute: "mat-mdc-tab-header" }, queries: [{ propertyName: "_items", predicate: MatTabLabelWrapper }], viewQueries: [{ propertyName: "_tabListContainer", first: true, predicate: ["tabListContainer"], descendants: true, static: true }, { propertyName: "_tabList", first: true, predicate: ["tabList"], descendants: true, static: true }, { propertyName: "_tabListInner", first: true, predicate: ["tabListInner"], descendants: true, static: true }, { propertyName: "_nextPaginator", first: true, predicate: ["nextPaginator"], descendants: true }, { propertyName: "_previousPaginator", first: true, predicate: ["previousPaginator"], descendants: true }], usesInheritance: true, ngImport: core_exports, template: `<!-- TODO: this also had \`mat-elevation-z4\`. Figure out what we should do with it. -->
<button class="mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-before"
     #previousPaginator
     aria-hidden="true"
     type="button"
     mat-ripple
     tabindex="-1"
     [matRippleDisabled]="_disableScrollBefore || disableRipple"
     [class.mat-mdc-tab-header-pagination-disabled]="_disableScrollBefore"
     [disabled]="_disableScrollBefore || null"
     (click)="_handlePaginatorClick('before')"
     (mousedown)="_handlePaginatorPress('before', $event)"
     (touchend)="_stopInterval()">
  <div class="mat-mdc-tab-header-pagination-chevron"></div>
</button>

<div
  class="mat-mdc-tab-label-container"
  #tabListContainer
  (keydown)="_handleKeydown($event)"
  [class._mat-animation-noopable]="_animationMode === 'NoopAnimations'">
  <div
    #tabList
    class="mat-mdc-tab-list"
    role="tablist"
    (cdkObserveContent)="_onContentChanges()">
    <div class="mat-mdc-tab-labels" #tabListInner>
      <ng-content></ng-content>
    </div>
  </div>
</div>

<!-- TODO: this also had \`mat-elevation-z4\`. Figure out what we should do with it. -->
<button class="mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-after"
     #nextPaginator
     aria-hidden="true"
     type="button"
     mat-ripple
     [matRippleDisabled]="_disableScrollAfter || disableRipple"
     [class.mat-mdc-tab-header-pagination-disabled]="_disableScrollAfter"
     [disabled]="_disableScrollAfter || null"
     tabindex="-1"
     (mousedown)="_handlePaginatorPress('after', $event)"
     (click)="_handlePaginatorClick('after')"
     (touchend)="_stopInterval()">
  <div class="mat-mdc-tab-header-pagination-chevron"></div>
</button>
`, styles: [".mat-mdc-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0;--mdc-tab-indicator-active-indicator-height:2px;--mdc-tab-indicator-active-indicator-shape:0;--mdc-secondary-navigation-tab-container-height:48px}.mdc-tab-indicator .mdc-tab-indicator__content{transition-duration:var(--mat-tab-animation-duration, 250ms)}.mat-mdc-tab-header-pagination{-webkit-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:none;box-sizing:content-box;background:none;border:none;outline:0;padding:0}.mat-mdc-tab-header-pagination::-moz-focus-inner{border:0}.mat-mdc-tab-header-pagination .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination{display:flex}.mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after{padding-left:4px}.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-pagination-after{padding-right:4px}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-mdc-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;height:8px;width:8px;border-color:var(--mat-tab-header-pagination-icon-color)}.mat-mdc-tab-header-pagination-disabled{box-shadow:none;cursor:default;pointer-events:none}.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron{opacity:.4}.mat-mdc-tab-list{flex-grow:1;position:relative;transition:transform 500ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-mdc-tab-list{transition:none}._mat-animation-noopable span.mdc-tab-indicator__content,._mat-animation-noopable span.mdc-tab__text-label{transition:none}.mat-mdc-tab-label-container{display:flex;flex-grow:1;overflow:hidden;z-index:1}.mat-mdc-tab-labels{display:flex;flex:1 0 auto}[mat-align-tabs=center]>.mat-mdc-tab-header .mat-mdc-tab-labels{justify-content:center}[mat-align-tabs=end]>.mat-mdc-tab-header .mat-mdc-tab-labels{justify-content:flex-end}.mat-mdc-tab::before{margin:5px}.cdk-high-contrast-active .mat-mdc-tab[aria-disabled=true]{color:GrayText}"], dependencies: [{ kind: "directive", type: MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }, { kind: "directive", type: CdkObserveContent, selector: "[cdkObserveContent]", inputs: ["cdkObserveContentDisabled", "debounce"], outputs: ["cdkObserveContent"], exportAs: ["cdkObserveContent"] }], changeDetection: ChangeDetectionStrategy.Default, encapsulation: ViewEncapsulation$1.None });
var MatTabHeader = _MatTabHeader;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: MatTabHeader, decorators: [{
  type: Component,
  args: [{ selector: "mat-tab-header", inputs: ["selectedIndex"], outputs: ["selectFocusedIndex", "indexFocused"], encapsulation: ViewEncapsulation$1.None, changeDetection: ChangeDetectionStrategy.Default, host: {
    "class": "mat-mdc-tab-header",
    "[class.mat-mdc-tab-header-pagination-controls-enabled]": "_showPaginationControls",
    "[class.mat-mdc-tab-header-rtl]": "_getLayoutDirection() == 'rtl'"
  }, template: `<!-- TODO: this also had \`mat-elevation-z4\`. Figure out what we should do with it. -->
<button class="mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-before"
     #previousPaginator
     aria-hidden="true"
     type="button"
     mat-ripple
     tabindex="-1"
     [matRippleDisabled]="_disableScrollBefore || disableRipple"
     [class.mat-mdc-tab-header-pagination-disabled]="_disableScrollBefore"
     [disabled]="_disableScrollBefore || null"
     (click)="_handlePaginatorClick('before')"
     (mousedown)="_handlePaginatorPress('before', $event)"
     (touchend)="_stopInterval()">
  <div class="mat-mdc-tab-header-pagination-chevron"></div>
</button>

<div
  class="mat-mdc-tab-label-container"
  #tabListContainer
  (keydown)="_handleKeydown($event)"
  [class._mat-animation-noopable]="_animationMode === 'NoopAnimations'">
  <div
    #tabList
    class="mat-mdc-tab-list"
    role="tablist"
    (cdkObserveContent)="_onContentChanges()">
    <div class="mat-mdc-tab-labels" #tabListInner>
      <ng-content></ng-content>
    </div>
  </div>
</div>

<!-- TODO: this also had \`mat-elevation-z4\`. Figure out what we should do with it. -->
<button class="mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-after"
     #nextPaginator
     aria-hidden="true"
     type="button"
     mat-ripple
     [matRippleDisabled]="_disableScrollAfter || disableRipple"
     [class.mat-mdc-tab-header-pagination-disabled]="_disableScrollAfter"
     [disabled]="_disableScrollAfter || null"
     tabindex="-1"
     (mousedown)="_handlePaginatorPress('after', $event)"
     (click)="_handlePaginatorClick('after')"
     (touchend)="_stopInterval()">
  <div class="mat-mdc-tab-header-pagination-chevron"></div>
</button>
`, styles: [".mat-mdc-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0;--mdc-tab-indicator-active-indicator-height:2px;--mdc-tab-indicator-active-indicator-shape:0;--mdc-secondary-navigation-tab-container-height:48px}.mdc-tab-indicator .mdc-tab-indicator__content{transition-duration:var(--mat-tab-animation-duration, 250ms)}.mat-mdc-tab-header-pagination{-webkit-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:none;box-sizing:content-box;background:none;border:none;outline:0;padding:0}.mat-mdc-tab-header-pagination::-moz-focus-inner{border:0}.mat-mdc-tab-header-pagination .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination{display:flex}.mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after{padding-left:4px}.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-pagination-after{padding-right:4px}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-mdc-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;height:8px;width:8px;border-color:var(--mat-tab-header-pagination-icon-color)}.mat-mdc-tab-header-pagination-disabled{box-shadow:none;cursor:default;pointer-events:none}.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron{opacity:.4}.mat-mdc-tab-list{flex-grow:1;position:relative;transition:transform 500ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-mdc-tab-list{transition:none}._mat-animation-noopable span.mdc-tab-indicator__content,._mat-animation-noopable span.mdc-tab__text-label{transition:none}.mat-mdc-tab-label-container{display:flex;flex-grow:1;overflow:hidden;z-index:1}.mat-mdc-tab-labels{display:flex;flex:1 0 auto}[mat-align-tabs=center]>.mat-mdc-tab-header .mat-mdc-tab-labels{justify-content:center}[mat-align-tabs=end]>.mat-mdc-tab-header .mat-mdc-tab-labels{justify-content:flex-end}.mat-mdc-tab::before{margin:5px}.cdk-high-contrast-active .mat-mdc-tab[aria-disabled=true]{color:GrayText}"] }]
}], ctorParameters: function() {
  return [{ type: ElementRef }, { type: ChangeDetectorRef }, { type: ViewportRuler }, { type: Directionality, decorators: [{
    type: Optional
  }] }, { type: NgZone }, { type: Platform }, { type: void 0, decorators: [{
    type: Optional
  }, {
    type: Inject,
    args: [ANIMATION_MODULE_TYPE]
  }] }];
}, propDecorators: { _items: [{
  type: ContentChildren,
  args: [MatTabLabelWrapper, { descendants: false }]
}], _tabListContainer: [{
  type: ViewChild,
  args: ["tabListContainer", { static: true }]
}], _tabList: [{
  type: ViewChild,
  args: ["tabList", { static: true }]
}], _tabListInner: [{
  type: ViewChild,
  args: ["tabListInner", { static: true }]
}], _nextPaginator: [{
  type: ViewChild,
  args: ["nextPaginator"]
}], _previousPaginator: [{
  type: ViewChild,
  args: ["previousPaginator"]
}] } });
var MAT_TABS_CONFIG = new InjectionToken("MAT_TABS_CONFIG");
var nextId = 0;
var _MatTabGroupMixinBase = mixinColor(mixinDisableRipple(class {
  constructor(_elementRef) {
    this._elementRef = _elementRef;
  }
}), "primary");
var __MatTabGroupBase = class __MatTabGroupBase extends _MatTabGroupMixinBase {
  /** Whether the tab group should grow to the size of the active tab. */
  get dynamicHeight() {
    return this._dynamicHeight;
  }
  set dynamicHeight(value) {
    this._dynamicHeight = coerceBooleanProperty(value);
  }
  /** The index of the active tab. */
  get selectedIndex() {
    return this._selectedIndex;
  }
  set selectedIndex(value) {
    this._indexToSelect = coerceNumberProperty(value, null);
  }
  /** Duration for the tab animation. Will be normalized to milliseconds if no units are set. */
  get animationDuration() {
    return this._animationDuration;
  }
  set animationDuration(value) {
    this._animationDuration = /^\d+$/.test(value + "") ? value + "ms" : value;
  }
  /**
   * `tabindex` to be set on the inner element that wraps the tab content. Can be used for improved
   * accessibility when the tab does not have focusable elements or if it has scrollable content.
   * The `tabindex` will be removed automatically for inactive tabs.
   * Read more at https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html
   */
  get contentTabIndex() {
    return this._contentTabIndex;
  }
  set contentTabIndex(value) {
    this._contentTabIndex = coerceNumberProperty(value, null);
  }
  /**
   * Whether pagination should be disabled. This can be used to avoid unnecessary
   * layout recalculations if it's known that pagination won't be required.
   */
  get disablePagination() {
    return this._disablePagination;
  }
  set disablePagination(value) {
    this._disablePagination = coerceBooleanProperty(value);
  }
  /**
   * By default tabs remove their content from the DOM while it's off-screen.
   * Setting this to `true` will keep it in the DOM which will prevent elements
   * like iframes and videos from reloading next time it comes back into the view.
   */
  get preserveContent() {
    return this._preserveContent;
  }
  set preserveContent(value) {
    this._preserveContent = coerceBooleanProperty(value);
  }
  /** Background color of the tab group. */
  get backgroundColor() {
    return this._backgroundColor;
  }
  set backgroundColor(value) {
    const classList = this._elementRef.nativeElement.classList;
    classList.remove("mat-tabs-with-background", `mat-background-${this.backgroundColor}`);
    if (value) {
      classList.add("mat-tabs-with-background", `mat-background-${value}`);
    }
    this._backgroundColor = value;
  }
  constructor(elementRef, _changeDetectorRef, defaultConfig, _animationMode) {
    super(elementRef);
    this._changeDetectorRef = _changeDetectorRef;
    this._animationMode = _animationMode;
    this._tabs = new QueryList();
    this._indexToSelect = 0;
    this._lastFocusedTabIndex = null;
    this._tabBodyWrapperHeight = 0;
    this._tabsSubscription = Subscription.EMPTY;
    this._tabLabelSubscription = Subscription.EMPTY;
    this._dynamicHeight = false;
    this._selectedIndex = null;
    this.headerPosition = "above";
    this._disablePagination = false;
    this._preserveContent = false;
    this.selectedIndexChange = new EventEmitter();
    this.focusChange = new EventEmitter();
    this.animationDone = new EventEmitter();
    this.selectedTabChange = new EventEmitter(true);
    this._groupId = nextId++;
    this.animationDuration = defaultConfig && defaultConfig.animationDuration ? defaultConfig.animationDuration : "500ms";
    this.disablePagination = defaultConfig && defaultConfig.disablePagination != null ? defaultConfig.disablePagination : false;
    this.dynamicHeight = defaultConfig && defaultConfig.dynamicHeight != null ? defaultConfig.dynamicHeight : false;
    this.contentTabIndex = defaultConfig?.contentTabIndex ?? null;
    this.preserveContent = !!defaultConfig?.preserveContent;
  }
  /**
   * After the content is checked, this component knows what tabs have been defined
   * and what the selected index should be. This is where we can know exactly what position
   * each tab should be in according to the new selected index, and additionally we know how
   * a new selected tab should transition in (from the left or right).
   */
  ngAfterContentChecked() {
    const indexToSelect = this._indexToSelect = this._clampTabIndex(this._indexToSelect);
    if (this._selectedIndex != indexToSelect) {
      const isFirstRun = this._selectedIndex == null;
      if (!isFirstRun) {
        this.selectedTabChange.emit(this._createChangeEvent(indexToSelect));
        const wrapper = this._tabBodyWrapper.nativeElement;
        wrapper.style.minHeight = wrapper.clientHeight + "px";
      }
      Promise.resolve().then(() => {
        this._tabs.forEach((tab, index) => tab.isActive = index === indexToSelect);
        if (!isFirstRun) {
          this.selectedIndexChange.emit(indexToSelect);
          this._tabBodyWrapper.nativeElement.style.minHeight = "";
        }
      });
    }
    this._tabs.forEach((tab, index) => {
      tab.position = index - indexToSelect;
      if (this._selectedIndex != null && tab.position == 0 && !tab.origin) {
        tab.origin = indexToSelect - this._selectedIndex;
      }
    });
    if (this._selectedIndex !== indexToSelect) {
      this._selectedIndex = indexToSelect;
      this._lastFocusedTabIndex = null;
      this._changeDetectorRef.markForCheck();
    }
  }
  ngAfterContentInit() {
    this._subscribeToAllTabChanges();
    this._subscribeToTabLabels();
    this._tabsSubscription = this._tabs.changes.subscribe(() => {
      const indexToSelect = this._clampTabIndex(this._indexToSelect);
      if (indexToSelect === this._selectedIndex) {
        const tabs = this._tabs.toArray();
        let selectedTab;
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].isActive) {
            this._indexToSelect = this._selectedIndex = i;
            this._lastFocusedTabIndex = null;
            selectedTab = tabs[i];
            break;
          }
        }
        if (!selectedTab && tabs[indexToSelect]) {
          Promise.resolve().then(() => {
            tabs[indexToSelect].isActive = true;
            this.selectedTabChange.emit(this._createChangeEvent(indexToSelect));
          });
        }
      }
      this._changeDetectorRef.markForCheck();
    });
  }
  /** Listens to changes in all of the tabs. */
  _subscribeToAllTabChanges() {
    this._allTabs.changes.pipe(startWith(this._allTabs)).subscribe((tabs) => {
      this._tabs.reset(tabs.filter((tab) => {
        return tab._closestTabGroup === this || !tab._closestTabGroup;
      }));
      this._tabs.notifyOnChanges();
    });
  }
  ngOnDestroy() {
    this._tabs.destroy();
    this._tabsSubscription.unsubscribe();
    this._tabLabelSubscription.unsubscribe();
  }
  /** Re-aligns the ink bar to the selected tab element. */
  realignInkBar() {
    if (this._tabHeader) {
      this._tabHeader._alignInkBarToSelectedTab();
    }
  }
  /**
   * Recalculates the tab group's pagination dimensions.
   *
   * WARNING: Calling this method can be very costly in terms of performance. It should be called
   * as infrequently as possible from outside of the Tabs component as it causes a reflow of the
   * page.
   */
  updatePagination() {
    if (this._tabHeader) {
      this._tabHeader.updatePagination();
    }
  }
  /**
   * Sets focus to a particular tab.
   * @param index Index of the tab to be focused.
   */
  focusTab(index) {
    const header = this._tabHeader;
    if (header) {
      header.focusIndex = index;
    }
  }
  _focusChanged(index) {
    this._lastFocusedTabIndex = index;
    this.focusChange.emit(this._createChangeEvent(index));
  }
  _createChangeEvent(index) {
    const event = new MatTabChangeEvent();
    event.index = index;
    if (this._tabs && this._tabs.length) {
      event.tab = this._tabs.toArray()[index];
    }
    return event;
  }
  /**
   * Subscribes to changes in the tab labels. This is needed, because the @Input for the label is
   * on the MatTab component, whereas the data binding is inside the MatTabGroup. In order for the
   * binding to be updated, we need to subscribe to changes in it and trigger change detection
   * manually.
   */
  _subscribeToTabLabels() {
    if (this._tabLabelSubscription) {
      this._tabLabelSubscription.unsubscribe();
    }
    this._tabLabelSubscription = merge(...this._tabs.map((tab) => tab._stateChanges)).subscribe(() => this._changeDetectorRef.markForCheck());
  }
  /** Clamps the given index to the bounds of 0 and the tabs length. */
  _clampTabIndex(index) {
    return Math.min(this._tabs.length - 1, Math.max(index || 0, 0));
  }
  /** Returns a unique id for each tab label element */
  _getTabLabelId(i) {
    return `mat-tab-label-${this._groupId}-${i}`;
  }
  /** Returns a unique id for each tab content element */
  _getTabContentId(i) {
    return `mat-tab-content-${this._groupId}-${i}`;
  }
  /**
   * Sets the height of the body wrapper to the height of the activating tab if dynamic
   * height property is true.
   */
  _setTabBodyWrapperHeight(tabHeight) {
    if (!this._dynamicHeight || !this._tabBodyWrapperHeight) {
      return;
    }
    const wrapper = this._tabBodyWrapper.nativeElement;
    wrapper.style.height = this._tabBodyWrapperHeight + "px";
    if (this._tabBodyWrapper.nativeElement.offsetHeight) {
      wrapper.style.height = tabHeight + "px";
    }
  }
  /** Removes the height of the tab body wrapper. */
  _removeTabBodyWrapperHeight() {
    const wrapper = this._tabBodyWrapper.nativeElement;
    this._tabBodyWrapperHeight = wrapper.clientHeight;
    wrapper.style.height = "";
    this.animationDone.emit();
  }
  /** Handle click events, setting new selected index if appropriate. */
  _handleClick(tab, tabHeader, index) {
    tabHeader.focusIndex = index;
    if (!tab.disabled) {
      this.selectedIndex = index;
    }
  }
  /** Retrieves the tabindex for the tab. */
  _getTabIndex(index) {
    const targetIndex = this._lastFocusedTabIndex ?? this.selectedIndex;
    return index === targetIndex ? 0 : -1;
  }
  /** Callback for when the focused state of a tab has changed. */
  _tabFocusChanged(focusOrigin, index) {
    if (focusOrigin && focusOrigin !== "mouse" && focusOrigin !== "touch") {
      this._tabHeader.focusIndex = index;
    }
  }
};
__MatTabGroupBase.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: __MatTabGroupBase, deps: [{ token: ElementRef }, { token: ChangeDetectorRef }, { token: MAT_TABS_CONFIG, optional: true }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: FactoryTarget.Directive });
__MatTabGroupBase.\u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "16.1.1", type: __MatTabGroupBase, inputs: { dynamicHeight: "dynamicHeight", selectedIndex: "selectedIndex", headerPosition: "headerPosition", animationDuration: "animationDuration", contentTabIndex: "contentTabIndex", disablePagination: "disablePagination", preserveContent: "preserveContent", backgroundColor: "backgroundColor" }, outputs: { selectedIndexChange: "selectedIndexChange", focusChange: "focusChange", animationDone: "animationDone", selectedTabChange: "selectedTabChange" }, usesInheritance: true, ngImport: core_exports });
var _MatTabGroupBase = __MatTabGroupBase;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: _MatTabGroupBase, decorators: [{
  type: Directive
}], ctorParameters: function() {
  return [{ type: ElementRef }, { type: ChangeDetectorRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_TABS_CONFIG]
  }, {
    type: Optional
  }] }, { type: void 0, decorators: [{
    type: Optional
  }, {
    type: Inject,
    args: [ANIMATION_MODULE_TYPE]
  }] }];
}, propDecorators: { dynamicHeight: [{
  type: Input
}], selectedIndex: [{
  type: Input
}], headerPosition: [{
  type: Input
}], animationDuration: [{
  type: Input
}], contentTabIndex: [{
  type: Input
}], disablePagination: [{
  type: Input
}], preserveContent: [{
  type: Input
}], backgroundColor: [{
  type: Input
}], selectedIndexChange: [{
  type: Output
}], focusChange: [{
  type: Output
}], animationDone: [{
  type: Output
}], selectedTabChange: [{
  type: Output
}] } });
var _MatTabGroup = class _MatTabGroup extends _MatTabGroupBase {
  /** Whether the ink bar should fit its width to the size of the tab label content. */
  get fitInkBarToContent() {
    return this._fitInkBarToContent;
  }
  set fitInkBarToContent(v) {
    this._fitInkBarToContent = coerceBooleanProperty(v);
    this._changeDetectorRef.markForCheck();
  }
  /** Whether tabs should be stretched to fill the header. */
  get stretchTabs() {
    return this._stretchTabs;
  }
  set stretchTabs(v) {
    this._stretchTabs = coerceBooleanProperty(v);
  }
  constructor(elementRef, changeDetectorRef, defaultConfig, animationMode) {
    super(elementRef, changeDetectorRef, defaultConfig, animationMode);
    this._fitInkBarToContent = false;
    this._stretchTabs = true;
    this.fitInkBarToContent = defaultConfig && defaultConfig.fitInkBarToContent != null ? defaultConfig.fitInkBarToContent : false;
    this.stretchTabs = defaultConfig && defaultConfig.stretchTabs != null ? defaultConfig.stretchTabs : true;
  }
};
_MatTabGroup.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: _MatTabGroup, deps: [{ token: ElementRef }, { token: ChangeDetectorRef }, { token: MAT_TABS_CONFIG, optional: true }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: FactoryTarget.Component });
_MatTabGroup.\u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "16.1.1", type: _MatTabGroup, selector: "mat-tab-group", inputs: { color: "color", disableRipple: "disableRipple", fitInkBarToContent: "fitInkBarToContent", stretchTabs: ["mat-stretch-tabs", "stretchTabs"] }, host: { attributes: { "ngSkipHydration": "" }, properties: { "class.mat-mdc-tab-group-dynamic-height": "dynamicHeight", "class.mat-mdc-tab-group-inverted-header": 'headerPosition === "below"', "class.mat-mdc-tab-group-stretch-tabs": "stretchTabs", "style.--mat-tab-animation-duration": "animationDuration" }, classAttribute: "mat-mdc-tab-group" }, providers: [
  {
    provide: MAT_TAB_GROUP,
    useExisting: _MatTabGroup
  }
], queries: [{ propertyName: "_allTabs", predicate: MatTab, descendants: true }], viewQueries: [{ propertyName: "_tabBodyWrapper", first: true, predicate: ["tabBodyWrapper"], descendants: true }, { propertyName: "_tabHeader", first: true, predicate: ["tabHeader"], descendants: true }], exportAs: ["matTabGroup"], usesInheritance: true, ngImport: core_exports, template: `<mat-tab-header #tabHeader
                [selectedIndex]="selectedIndex || 0"
                [disableRipple]="disableRipple"
                [disablePagination]="disablePagination"
                (indexFocused)="_focusChanged($event)"
                (selectFocusedIndex)="selectedIndex = $event">

  <div class="mdc-tab mat-mdc-tab mat-mdc-focus-indicator"
       #tabNode
       role="tab"
       matTabLabelWrapper
       cdkMonitorElementFocus
       *ngFor="let tab of _tabs; let i = index"
       [id]="_getTabLabelId(i)"
       [attr.tabIndex]="_getTabIndex(i)"
       [attr.aria-posinset]="i + 1"
       [attr.aria-setsize]="_tabs.length"
       [attr.aria-controls]="_getTabContentId(i)"
       [attr.aria-selected]="selectedIndex === i"
       [attr.aria-label]="tab.ariaLabel || null"
       [attr.aria-labelledby]="(!tab.ariaLabel && tab.ariaLabelledby) ? tab.ariaLabelledby : null"
       [class.mdc-tab--active]="selectedIndex === i"
       [ngClass]="tab.labelClass"
       [disabled]="tab.disabled"
       [fitInkBarToContent]="fitInkBarToContent"
       (click)="_handleClick(tab, tabHeader, i)"
       (cdkFocusChange)="_tabFocusChanged($event, i)">
    <span class="mdc-tab__ripple"></span>

    <!-- Needs to be a separate element, because we can't put
         \`overflow: hidden\` on tab due to the ink bar. -->
    <div
      class="mat-mdc-tab-ripple"
      mat-ripple
      [matRippleTrigger]="tabNode"
      [matRippleDisabled]="tab.disabled || disableRipple"></div>

    <span class="mdc-tab__content">
      <span class="mdc-tab__text-label">
        <!-- If there is a label template, use it. -->
        <ng-template [ngIf]="tab.templateLabel" [ngIfElse]="tabTextLabel">
          <ng-template [cdkPortalOutlet]="tab.templateLabel"></ng-template>
        </ng-template>

        <!-- If there is not a label template, fall back to the text label. -->
        <ng-template #tabTextLabel>{{tab.textLabel}}</ng-template>
      </span>
    </span>
  </div>
</mat-tab-header>

<div
  class="mat-mdc-tab-body-wrapper"
  [class._mat-animation-noopable]="_animationMode === 'NoopAnimations'"
  #tabBodyWrapper>
  <mat-tab-body role="tabpanel"
               *ngFor="let tab of _tabs; let i = index"
               [id]="_getTabContentId(i)"
               [attr.tabindex]="(contentTabIndex != null && selectedIndex === i) ? contentTabIndex : null"
               [attr.aria-labelledby]="_getTabLabelId(i)"
               [attr.aria-hidden]="selectedIndex !== i"
               [class.mat-mdc-tab-body-active]="selectedIndex === i"
               [ngClass]="tab.bodyClass"
               [content]="tab.content!"
               [position]="tab.position!"
               [origin]="tab.origin"
               [animationDuration]="animationDuration"
               [preserveContent]="preserveContent"
               (_onCentered)="_removeTabBodyWrapperHeight()"
               (_onCentering)="_setTabBodyWrapperHeight($event)">
  </mat-tab-body>
</div>
`, styles: ['.mdc-tab{min-width:90px;padding-right:24px;padding-left:24px;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;margin:0;padding-top:0;padding-bottom:0;border:none;outline:none;text-align:center;white-space:nowrap;cursor:pointer;-webkit-appearance:none;z-index:1}.mdc-tab::-moz-focus-inner{padding:0;border:0}.mdc-tab[hidden]{display:none}.mdc-tab--min-width{flex:0 1 auto}.mdc-tab__content{display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab__icon{transition:150ms color linear;z-index:2}.mdc-tab--stacked .mdc-tab__content{flex-direction:column;align-items:center;justify-content:center}.mdc-tab--stacked .mdc-tab__text-label{padding-top:6px;padding-bottom:4px}.mdc-tab--active .mdc-tab__text-label,.mdc-tab--active .mdc-tab__icon{transition-delay:100ms}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label,.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl]{padding-left:0;padding-right:8px}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator__content{transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator__content--icon{align-self:center;margin:0 auto}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}.mdc-tab-indicator .mdc-tab-indicator__content{transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition:150ms opacity linear}.mdc-tab-indicator--active.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition-delay:100ms}.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab{-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-decoration:none;background:none;font-family:var(--mat-tab-header-label-text-font);font-size:var(--mat-tab-header-label-text-size);letter-spacing:var(--mat-tab-header-label-text-tracking);line-height:var(--mat-tab-header-label-text-line-height);font-weight:var(--mat-tab-header-label-text-weight)}.mat-mdc-tab .mdc-tab-indicator__content--underline{border-color:var(--mdc-tab-indicator-active-indicator-color)}.mat-mdc-tab .mdc-tab-indicator__content--underline{border-top-width:var(--mdc-tab-indicator-active-indicator-height)}.mat-mdc-tab .mdc-tab-indicator__content--underline{border-radius:var(--mdc-tab-indicator-active-indicator-shape)}.mat-mdc-tab:not(.mdc-tab--stacked){height:var(--mdc-secondary-navigation-tab-container-height)}.mat-mdc-tab:not(:disabled).mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:not(:disabled):hover.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:not(:disabled):focus.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:not(:disabled):active.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:disabled.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:not(:disabled):not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:not(:disabled):hover:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:not(:disabled):focus:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:not(:disabled):active:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:disabled:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab.mdc-tab{flex-grow:0}.mat-mdc-tab:hover .mdc-tab__text-label{color:var(--mat-tab-header-inactive-hover-label-text-color)}.mat-mdc-tab:focus .mdc-tab__text-label{color:var(--mat-tab-header-inactive-focus-label-text-color)}.mat-mdc-tab.mdc-tab--active .mdc-tab__text-label{color:var(--mat-tab-header-active-label-text-color)}.mat-mdc-tab.mdc-tab--active .mdc-tab__ripple::before,.mat-mdc-tab.mdc-tab--active .mat-ripple-element{background-color:var(--mat-tab-header-active-ripple-color)}.mat-mdc-tab.mdc-tab--active:hover .mdc-tab__text-label{color:var(--mat-tab-header-active-hover-label-text-color)}.mat-mdc-tab.mdc-tab--active:hover .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-hover-indicator-color)}.mat-mdc-tab.mdc-tab--active:focus .mdc-tab__text-label{color:var(--mat-tab-header-active-focus-label-text-color)}.mat-mdc-tab.mdc-tab--active:focus .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-focus-indicator-color)}.mat-mdc-tab.mat-mdc-tab-disabled{opacity:.4;pointer-events:none}.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__content{pointer-events:none}.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__ripple::before,.mat-mdc-tab.mat-mdc-tab-disabled .mat-ripple-element{background-color:var(--mat-tab-header-disabled-ripple-color)}.mat-mdc-tab .mdc-tab__ripple::before{content:"";display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab .mdc-tab__text-label{color:var(--mat-tab-header-inactive-label-text-color);display:inline-flex;align-items:center}.mat-mdc-tab .mdc-tab__content{position:relative;pointer-events:auto}.mat-mdc-tab:hover .mdc-tab__ripple::before{opacity:.04}.mat-mdc-tab.cdk-program-focused .mdc-tab__ripple::before,.mat-mdc-tab.cdk-keyboard-focused .mdc-tab__ripple::before{opacity:.12}.mat-mdc-tab .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab-group.mat-mdc-tab-group-stretch-tabs>.mat-mdc-tab-header .mat-mdc-tab{flex-grow:1}.mat-mdc-tab-group{display:flex;flex-direction:column;max-width:100%}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination{background-color:var(--mat-tab-header-with-background-background-color)}.mat-mdc-tab-group.mat-tabs-with-background.mat-primary>.mat-mdc-tab-header .mat-mdc-tab .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background.mat-primary>.mat-mdc-tab-header .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-mdc-focus-indicator::before,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-focus-indicator::before{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-ripple-element,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mdc-tab__ripple::before,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-ripple-element,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mdc-tab__ripple::before{background-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header{flex-direction:column-reverse}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header .mdc-tab-indicator__content--underline{align-self:flex-start}.mat-mdc-tab-body-wrapper{position:relative;overflow:hidden;display:flex;transition:height 500ms cubic-bezier(0.35, 0, 0.25, 1)}.mat-mdc-tab-body-wrapper._mat-animation-noopable{transition:none !important;animation:none !important}'], dependencies: [{ kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }, { kind: "directive", type: MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }, { kind: "directive", type: CdkMonitorFocus, selector: "[cdkMonitorElementFocus], [cdkMonitorSubtreeFocus]", outputs: ["cdkFocusChange"], exportAs: ["cdkMonitorFocus"] }, { kind: "component", type: MatTabBody, selector: "mat-tab-body" }, { kind: "directive", type: MatTabLabelWrapper, selector: "[matTabLabelWrapper]", inputs: ["disabled", "fitInkBarToContent"] }, { kind: "component", type: MatTabHeader, selector: "mat-tab-header", inputs: ["selectedIndex"], outputs: ["selectFocusedIndex", "indexFocused"] }], changeDetection: ChangeDetectionStrategy.Default, encapsulation: ViewEncapsulation$1.None });
var MatTabGroup = _MatTabGroup;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: MatTabGroup, decorators: [{
  type: Component,
  args: [{ selector: "mat-tab-group", exportAs: "matTabGroup", encapsulation: ViewEncapsulation$1.None, changeDetection: ChangeDetectionStrategy.Default, inputs: ["color", "disableRipple"], providers: [
    {
      provide: MAT_TAB_GROUP,
      useExisting: MatTabGroup
    }
  ], host: {
    "ngSkipHydration": "",
    "class": "mat-mdc-tab-group",
    "[class.mat-mdc-tab-group-dynamic-height]": "dynamicHeight",
    "[class.mat-mdc-tab-group-inverted-header]": 'headerPosition === "below"',
    "[class.mat-mdc-tab-group-stretch-tabs]": "stretchTabs",
    "[style.--mat-tab-animation-duration]": "animationDuration"
  }, template: `<mat-tab-header #tabHeader
                [selectedIndex]="selectedIndex || 0"
                [disableRipple]="disableRipple"
                [disablePagination]="disablePagination"
                (indexFocused)="_focusChanged($event)"
                (selectFocusedIndex)="selectedIndex = $event">

  <div class="mdc-tab mat-mdc-tab mat-mdc-focus-indicator"
       #tabNode
       role="tab"
       matTabLabelWrapper
       cdkMonitorElementFocus
       *ngFor="let tab of _tabs; let i = index"
       [id]="_getTabLabelId(i)"
       [attr.tabIndex]="_getTabIndex(i)"
       [attr.aria-posinset]="i + 1"
       [attr.aria-setsize]="_tabs.length"
       [attr.aria-controls]="_getTabContentId(i)"
       [attr.aria-selected]="selectedIndex === i"
       [attr.aria-label]="tab.ariaLabel || null"
       [attr.aria-labelledby]="(!tab.ariaLabel && tab.ariaLabelledby) ? tab.ariaLabelledby : null"
       [class.mdc-tab--active]="selectedIndex === i"
       [ngClass]="tab.labelClass"
       [disabled]="tab.disabled"
       [fitInkBarToContent]="fitInkBarToContent"
       (click)="_handleClick(tab, tabHeader, i)"
       (cdkFocusChange)="_tabFocusChanged($event, i)">
    <span class="mdc-tab__ripple"></span>

    <!-- Needs to be a separate element, because we can't put
         \`overflow: hidden\` on tab due to the ink bar. -->
    <div
      class="mat-mdc-tab-ripple"
      mat-ripple
      [matRippleTrigger]="tabNode"
      [matRippleDisabled]="tab.disabled || disableRipple"></div>

    <span class="mdc-tab__content">
      <span class="mdc-tab__text-label">
        <!-- If there is a label template, use it. -->
        <ng-template [ngIf]="tab.templateLabel" [ngIfElse]="tabTextLabel">
          <ng-template [cdkPortalOutlet]="tab.templateLabel"></ng-template>
        </ng-template>

        <!-- If there is not a label template, fall back to the text label. -->
        <ng-template #tabTextLabel>{{tab.textLabel}}</ng-template>
      </span>
    </span>
  </div>
</mat-tab-header>

<div
  class="mat-mdc-tab-body-wrapper"
  [class._mat-animation-noopable]="_animationMode === 'NoopAnimations'"
  #tabBodyWrapper>
  <mat-tab-body role="tabpanel"
               *ngFor="let tab of _tabs; let i = index"
               [id]="_getTabContentId(i)"
               [attr.tabindex]="(contentTabIndex != null && selectedIndex === i) ? contentTabIndex : null"
               [attr.aria-labelledby]="_getTabLabelId(i)"
               [attr.aria-hidden]="selectedIndex !== i"
               [class.mat-mdc-tab-body-active]="selectedIndex === i"
               [ngClass]="tab.bodyClass"
               [content]="tab.content!"
               [position]="tab.position!"
               [origin]="tab.origin"
               [animationDuration]="animationDuration"
               [preserveContent]="preserveContent"
               (_onCentered)="_removeTabBodyWrapperHeight()"
               (_onCentering)="_setTabBodyWrapperHeight($event)">
  </mat-tab-body>
</div>
`, styles: ['.mdc-tab{min-width:90px;padding-right:24px;padding-left:24px;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;margin:0;padding-top:0;padding-bottom:0;border:none;outline:none;text-align:center;white-space:nowrap;cursor:pointer;-webkit-appearance:none;z-index:1}.mdc-tab::-moz-focus-inner{padding:0;border:0}.mdc-tab[hidden]{display:none}.mdc-tab--min-width{flex:0 1 auto}.mdc-tab__content{display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab__icon{transition:150ms color linear;z-index:2}.mdc-tab--stacked .mdc-tab__content{flex-direction:column;align-items:center;justify-content:center}.mdc-tab--stacked .mdc-tab__text-label{padding-top:6px;padding-bottom:4px}.mdc-tab--active .mdc-tab__text-label,.mdc-tab--active .mdc-tab__icon{transition-delay:100ms}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label,.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl]{padding-left:0;padding-right:8px}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator__content{transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator__content--icon{align-self:center;margin:0 auto}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}.mdc-tab-indicator .mdc-tab-indicator__content{transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition:150ms opacity linear}.mdc-tab-indicator--active.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition-delay:100ms}.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab{-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-decoration:none;background:none;font-family:var(--mat-tab-header-label-text-font);font-size:var(--mat-tab-header-label-text-size);letter-spacing:var(--mat-tab-header-label-text-tracking);line-height:var(--mat-tab-header-label-text-line-height);font-weight:var(--mat-tab-header-label-text-weight)}.mat-mdc-tab .mdc-tab-indicator__content--underline{border-color:var(--mdc-tab-indicator-active-indicator-color)}.mat-mdc-tab .mdc-tab-indicator__content--underline{border-top-width:var(--mdc-tab-indicator-active-indicator-height)}.mat-mdc-tab .mdc-tab-indicator__content--underline{border-radius:var(--mdc-tab-indicator-active-indicator-shape)}.mat-mdc-tab:not(.mdc-tab--stacked){height:var(--mdc-secondary-navigation-tab-container-height)}.mat-mdc-tab:not(:disabled).mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:not(:disabled):hover.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:not(:disabled):focus.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:not(:disabled):active.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:disabled.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:not(:disabled):not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:not(:disabled):hover:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:not(:disabled):focus:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:not(:disabled):active:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:disabled:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab.mdc-tab{flex-grow:0}.mat-mdc-tab:hover .mdc-tab__text-label{color:var(--mat-tab-header-inactive-hover-label-text-color)}.mat-mdc-tab:focus .mdc-tab__text-label{color:var(--mat-tab-header-inactive-focus-label-text-color)}.mat-mdc-tab.mdc-tab--active .mdc-tab__text-label{color:var(--mat-tab-header-active-label-text-color)}.mat-mdc-tab.mdc-tab--active .mdc-tab__ripple::before,.mat-mdc-tab.mdc-tab--active .mat-ripple-element{background-color:var(--mat-tab-header-active-ripple-color)}.mat-mdc-tab.mdc-tab--active:hover .mdc-tab__text-label{color:var(--mat-tab-header-active-hover-label-text-color)}.mat-mdc-tab.mdc-tab--active:hover .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-hover-indicator-color)}.mat-mdc-tab.mdc-tab--active:focus .mdc-tab__text-label{color:var(--mat-tab-header-active-focus-label-text-color)}.mat-mdc-tab.mdc-tab--active:focus .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-focus-indicator-color)}.mat-mdc-tab.mat-mdc-tab-disabled{opacity:.4;pointer-events:none}.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__content{pointer-events:none}.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__ripple::before,.mat-mdc-tab.mat-mdc-tab-disabled .mat-ripple-element{background-color:var(--mat-tab-header-disabled-ripple-color)}.mat-mdc-tab .mdc-tab__ripple::before{content:"";display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab .mdc-tab__text-label{color:var(--mat-tab-header-inactive-label-text-color);display:inline-flex;align-items:center}.mat-mdc-tab .mdc-tab__content{position:relative;pointer-events:auto}.mat-mdc-tab:hover .mdc-tab__ripple::before{opacity:.04}.mat-mdc-tab.cdk-program-focused .mdc-tab__ripple::before,.mat-mdc-tab.cdk-keyboard-focused .mdc-tab__ripple::before{opacity:.12}.mat-mdc-tab .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab-group.mat-mdc-tab-group-stretch-tabs>.mat-mdc-tab-header .mat-mdc-tab{flex-grow:1}.mat-mdc-tab-group{display:flex;flex-direction:column;max-width:100%}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination{background-color:var(--mat-tab-header-with-background-background-color)}.mat-mdc-tab-group.mat-tabs-with-background.mat-primary>.mat-mdc-tab-header .mat-mdc-tab .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background.mat-primary>.mat-mdc-tab-header .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-mdc-focus-indicator::before,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-focus-indicator::before{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-ripple-element,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mdc-tab__ripple::before,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-ripple-element,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mdc-tab__ripple::before{background-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header{flex-direction:column-reverse}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header .mdc-tab-indicator__content--underline{align-self:flex-start}.mat-mdc-tab-body-wrapper{position:relative;overflow:hidden;display:flex;transition:height 500ms cubic-bezier(0.35, 0, 0.25, 1)}.mat-mdc-tab-body-wrapper._mat-animation-noopable{transition:none !important;animation:none !important}'] }]
}], ctorParameters: function() {
  return [{ type: ElementRef }, { type: ChangeDetectorRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_TABS_CONFIG]
  }, {
    type: Optional
  }] }, { type: void 0, decorators: [{
    type: Optional
  }, {
    type: Inject,
    args: [ANIMATION_MODULE_TYPE]
  }] }];
}, propDecorators: { _allTabs: [{
  type: ContentChildren,
  args: [MatTab, { descendants: true }]
}], _tabBodyWrapper: [{
  type: ViewChild,
  args: ["tabBodyWrapper"]
}], _tabHeader: [{
  type: ViewChild,
  args: ["tabHeader"]
}], fitInkBarToContent: [{
  type: Input
}], stretchTabs: [{
  type: Input,
  args: ["mat-stretch-tabs"]
}] } });
var MatTabChangeEvent = class {
};
var nextUniqueId = 0;
var __MatTabNavBase = class __MatTabNavBase extends MatPaginatedTabHeader {
  /** Background color of the tab nav. */
  get backgroundColor() {
    return this._backgroundColor;
  }
  set backgroundColor(value) {
    const classList = this._elementRef.nativeElement.classList;
    classList.remove("mat-tabs-with-background", `mat-background-${this.backgroundColor}`);
    if (value) {
      classList.add("mat-tabs-with-background", `mat-background-${value}`);
    }
    this._backgroundColor = value;
  }
  /** Whether the ripple effect is disabled or not. */
  get disableRipple() {
    return this._disableRipple;
  }
  set disableRipple(value) {
    this._disableRipple = coerceBooleanProperty(value);
  }
  constructor(elementRef, dir, ngZone, changeDetectorRef, viewportRuler, platform, animationMode) {
    super(elementRef, changeDetectorRef, viewportRuler, dir, ngZone, platform, animationMode);
    this._disableRipple = false;
    this.color = "primary";
  }
  _itemSelected() {
  }
  ngAfterContentInit() {
    this._items.changes.pipe(startWith(null), takeUntil(this._destroyed)).subscribe(() => {
      this.updateActiveLink();
    });
    super.ngAfterContentInit();
  }
  /** Notifies the component that the active link has been changed. */
  updateActiveLink() {
    if (!this._items) {
      return;
    }
    const items = this._items.toArray();
    for (let i = 0; i < items.length; i++) {
      if (items[i].active) {
        this.selectedIndex = i;
        this._changeDetectorRef.markForCheck();
        if (this.tabPanel) {
          this.tabPanel._activeTabId = items[i].id;
        }
        return;
      }
    }
    this.selectedIndex = -1;
    this._inkBar.hide();
  }
  _getRole() {
    return this.tabPanel ? "tablist" : this._elementRef.nativeElement.getAttribute("role");
  }
};
__MatTabNavBase.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: __MatTabNavBase, deps: [{ token: ElementRef }, { token: Directionality, optional: true }, { token: NgZone }, { token: ChangeDetectorRef }, { token: ViewportRuler }, { token: Platform }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: FactoryTarget.Directive });
__MatTabNavBase.\u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "16.1.1", type: __MatTabNavBase, inputs: { backgroundColor: "backgroundColor", disableRipple: "disableRipple", color: "color", tabPanel: "tabPanel" }, usesInheritance: true, ngImport: core_exports });
var _MatTabNavBase = __MatTabNavBase;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: _MatTabNavBase, decorators: [{
  type: Directive
}], ctorParameters: function() {
  return [{ type: ElementRef }, { type: Directionality, decorators: [{
    type: Optional
  }] }, { type: NgZone }, { type: ChangeDetectorRef }, { type: ViewportRuler }, { type: Platform }, { type: void 0, decorators: [{
    type: Optional
  }, {
    type: Inject,
    args: [ANIMATION_MODULE_TYPE]
  }] }];
}, propDecorators: { backgroundColor: [{
  type: Input
}], disableRipple: [{
  type: Input
}], color: [{
  type: Input
}], tabPanel: [{
  type: Input
}] } });
var _MatTabLinkMixinBase = mixinTabIndex(mixinDisableRipple(mixinDisabled(class {
})));
var __MatTabLinkBase = class __MatTabLinkBase extends _MatTabLinkMixinBase {
  /** Whether the link is active. */
  get active() {
    return this._isActive;
  }
  set active(value) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._isActive) {
      this._isActive = newValue;
      this._tabNavBar.updateActiveLink();
    }
  }
  /**
   * Whether ripples are disabled on interaction.
   * @docs-private
   */
  get rippleDisabled() {
    return this.disabled || this.disableRipple || this._tabNavBar.disableRipple || !!this.rippleConfig.disabled;
  }
  constructor(_tabNavBar, elementRef, globalRippleOptions, tabIndex, _focusMonitor, animationMode) {
    super();
    this._tabNavBar = _tabNavBar;
    this.elementRef = elementRef;
    this._focusMonitor = _focusMonitor;
    this._isActive = false;
    this.id = `mat-tab-link-${nextUniqueId++}`;
    this.rippleConfig = globalRippleOptions || {};
    this.tabIndex = parseInt(tabIndex) || 0;
    if (animationMode === "NoopAnimations") {
      this.rippleConfig.animation = { enterDuration: 0, exitDuration: 0 };
    }
  }
  /** Focuses the tab link. */
  focus() {
    this.elementRef.nativeElement.focus();
  }
  ngAfterViewInit() {
    this._focusMonitor.monitor(this.elementRef);
  }
  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this.elementRef);
  }
  _handleFocus() {
    this._tabNavBar.focusIndex = this._tabNavBar._items.toArray().indexOf(this);
  }
  _handleKeydown(event) {
    if (event.keyCode === SPACE || event.keyCode === ENTER) {
      if (this.disabled) {
        event.preventDefault();
      } else if (this._tabNavBar.tabPanel) {
        this.elementRef.nativeElement.click();
      }
    }
  }
  _getAriaControls() {
    return this._tabNavBar.tabPanel ? this._tabNavBar.tabPanel?.id : this.elementRef.nativeElement.getAttribute("aria-controls");
  }
  _getAriaSelected() {
    if (this._tabNavBar.tabPanel) {
      return this.active ? "true" : "false";
    } else {
      return this.elementRef.nativeElement.getAttribute("aria-selected");
    }
  }
  _getAriaCurrent() {
    return this.active && !this._tabNavBar.tabPanel ? "page" : null;
  }
  _getRole() {
    return this._tabNavBar.tabPanel ? "tab" : this.elementRef.nativeElement.getAttribute("role");
  }
  _getTabIndex() {
    if (this._tabNavBar.tabPanel) {
      return this._isActive && !this.disabled ? 0 : -1;
    } else {
      return this.tabIndex;
    }
  }
};
__MatTabLinkBase.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: __MatTabLinkBase, deps: [{ token: _MatTabNavBase }, { token: ElementRef }, { token: MAT_RIPPLE_GLOBAL_OPTIONS, optional: true }, { token: "tabindex", attribute: true }, { token: FocusMonitor }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: FactoryTarget.Directive });
__MatTabLinkBase.\u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "16.1.1", type: __MatTabLinkBase, inputs: { active: "active", id: "id" }, usesInheritance: true, ngImport: core_exports });
var _MatTabLinkBase = __MatTabLinkBase;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: _MatTabLinkBase, decorators: [{
  type: Directive
}], ctorParameters: function() {
  return [{ type: _MatTabNavBase }, { type: ElementRef }, { type: void 0, decorators: [{
    type: Optional
  }, {
    type: Inject,
    args: [MAT_RIPPLE_GLOBAL_OPTIONS]
  }] }, { type: void 0, decorators: [{
    type: Attribute,
    args: ["tabindex"]
  }] }, { type: FocusMonitor }, { type: void 0, decorators: [{
    type: Optional
  }, {
    type: Inject,
    args: [ANIMATION_MODULE_TYPE]
  }] }];
}, propDecorators: { active: [{
  type: Input
}], id: [{
  type: Input
}] } });
var _MatTabLinkBaseWithInkBarItem = mixinInkBarItem(_MatTabLinkBase);
var _MatTabNav = class _MatTabNav extends _MatTabNavBase {
  /** Whether the ink bar should fit its width to the size of the tab label content. */
  get fitInkBarToContent() {
    return this._fitInkBarToContent.value;
  }
  set fitInkBarToContent(v) {
    this._fitInkBarToContent.next(coerceBooleanProperty(v));
    this._changeDetectorRef.markForCheck();
  }
  /** Whether tabs should be stretched to fill the header. */
  get stretchTabs() {
    return this._stretchTabs;
  }
  set stretchTabs(v) {
    this._stretchTabs = coerceBooleanProperty(v);
  }
  get animationDuration() {
    return this._animationDuration;
  }
  set animationDuration(value) {
    this._animationDuration = /^\d+$/.test(value + "") ? value + "ms" : value;
  }
  constructor(elementRef, dir, ngZone, changeDetectorRef, viewportRuler, platform, animationMode, defaultConfig) {
    super(elementRef, dir, ngZone, changeDetectorRef, viewportRuler, platform, animationMode);
    this._fitInkBarToContent = new BehaviorSubject(false);
    this._stretchTabs = true;
    this.disablePagination = defaultConfig && defaultConfig.disablePagination != null ? defaultConfig.disablePagination : false;
    this.fitInkBarToContent = defaultConfig && defaultConfig.fitInkBarToContent != null ? defaultConfig.fitInkBarToContent : false;
    this.stretchTabs = defaultConfig && defaultConfig.stretchTabs != null ? defaultConfig.stretchTabs : true;
  }
  ngAfterContentInit() {
    this._inkBar = new MatInkBar(this._items);
    super.ngAfterContentInit();
  }
  ngAfterViewInit() {
    if (!this.tabPanel && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw new Error("A mat-tab-nav-panel must be specified via [tabPanel].");
    }
    super.ngAfterViewInit();
  }
};
_MatTabNav.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: _MatTabNav, deps: [{ token: ElementRef }, { token: Directionality, optional: true }, { token: NgZone }, { token: ChangeDetectorRef }, { token: ViewportRuler }, { token: Platform }, { token: ANIMATION_MODULE_TYPE, optional: true }, { token: MAT_TABS_CONFIG, optional: true }], target: FactoryTarget.Component });
_MatTabNav.\u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "16.1.1", type: _MatTabNav, selector: "[mat-tab-nav-bar]", inputs: { color: "color", fitInkBarToContent: "fitInkBarToContent", stretchTabs: ["mat-stretch-tabs", "stretchTabs"], animationDuration: "animationDuration" }, host: { properties: { "attr.role": "_getRole()", "class.mat-mdc-tab-header-pagination-controls-enabled": "_showPaginationControls", "class.mat-mdc-tab-header-rtl": "_getLayoutDirection() == 'rtl'", "class.mat-mdc-tab-nav-bar-stretch-tabs": "stretchTabs", "class.mat-primary": 'color !== "warn" && color !== "accent"', "class.mat-accent": 'color === "accent"', "class.mat-warn": 'color === "warn"', "class._mat-animation-noopable": '_animationMode === "NoopAnimations"', "style.--mat-tab-animation-duration": "animationDuration" }, classAttribute: "mat-mdc-tab-nav-bar mat-mdc-tab-header" }, queries: [{ propertyName: "_items", predicate: forwardRef(function() {
  return MatTabLink;
}), descendants: true }], viewQueries: [{ propertyName: "_tabListContainer", first: true, predicate: ["tabListContainer"], descendants: true, static: true }, { propertyName: "_tabList", first: true, predicate: ["tabList"], descendants: true, static: true }, { propertyName: "_tabListInner", first: true, predicate: ["tabListInner"], descendants: true, static: true }, { propertyName: "_nextPaginator", first: true, predicate: ["nextPaginator"], descendants: true }, { propertyName: "_previousPaginator", first: true, predicate: ["previousPaginator"], descendants: true }], exportAs: ["matTabNavBar", "matTabNav"], usesInheritance: true, ngImport: core_exports, template: `<!-- TODO: this also had \`mat-elevation-z4\`. Figure out what we should do with it. -->
<button class="mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-before"
     #previousPaginator
     aria-hidden="true"
     type="button"
     mat-ripple
     tabindex="-1"
     [matRippleDisabled]="_disableScrollBefore || disableRipple"
     [class.mat-mdc-tab-header-pagination-disabled]="_disableScrollBefore"
     [disabled]="_disableScrollBefore || null"
     (click)="_handlePaginatorClick('before')"
     (mousedown)="_handlePaginatorPress('before', $event)"
     (touchend)="_stopInterval()">
  <div class="mat-mdc-tab-header-pagination-chevron"></div>
</button>

<div class="mat-mdc-tab-link-container" #tabListContainer (keydown)="_handleKeydown($event)">
  <div class="mat-mdc-tab-list" #tabList (cdkObserveContent)="_onContentChanges()">
    <div class="mat-mdc-tab-links" #tabListInner>
      <ng-content></ng-content>
    </div>
  </div>
</div>

<!-- TODO: this also had \`mat-elevation-z4\`. Figure out what we should do with it. -->
<button class="mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-after"
     #nextPaginator
     aria-hidden="true"
     type="button"
     mat-ripple
     [matRippleDisabled]="_disableScrollAfter || disableRipple"
     [class.mat-mdc-tab-header-pagination-disabled]="_disableScrollAfter"
     [disabled]="_disableScrollAfter || null"
     tabindex="-1"
     (mousedown)="_handlePaginatorPress('after', $event)"
     (click)="_handlePaginatorClick('after')"
     (touchend)="_stopInterval()">
  <div class="mat-mdc-tab-header-pagination-chevron"></div>
</button>
`, styles: [".mdc-tab{min-width:90px;padding-right:24px;padding-left:24px;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;margin:0;padding-top:0;padding-bottom:0;border:none;outline:none;text-align:center;white-space:nowrap;cursor:pointer;-webkit-appearance:none;z-index:1}.mdc-tab::-moz-focus-inner{padding:0;border:0}.mdc-tab[hidden]{display:none}.mdc-tab--min-width{flex:0 1 auto}.mdc-tab__content{display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab__icon{transition:150ms color linear;z-index:2}.mdc-tab--stacked .mdc-tab__content{flex-direction:column;align-items:center;justify-content:center}.mdc-tab--stacked .mdc-tab__text-label{padding-top:6px;padding-bottom:4px}.mdc-tab--active .mdc-tab__text-label,.mdc-tab--active .mdc-tab__icon{transition-delay:100ms}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label,.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl]{padding-left:0;padding-right:8px}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator__content{transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator__content--icon{align-self:center;margin:0 auto}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}.mdc-tab-indicator .mdc-tab-indicator__content{transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition:150ms opacity linear}.mdc-tab-indicator--active.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition-delay:100ms}.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0;--mdc-tab-indicator-active-indicator-height:2px;--mdc-tab-indicator-active-indicator-shape:0;--mdc-secondary-navigation-tab-container-height:48px}.mdc-tab-indicator .mdc-tab-indicator__content{transition-duration:var(--mat-tab-animation-duration, 250ms)}.mat-mdc-tab-header-pagination{-webkit-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:none;box-sizing:content-box;background:none;border:none;outline:0;padding:0}.mat-mdc-tab-header-pagination::-moz-focus-inner{border:0}.mat-mdc-tab-header-pagination .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination{display:flex}.mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after{padding-left:4px}.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-pagination-after{padding-right:4px}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-mdc-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;height:8px;width:8px;border-color:var(--mat-tab-header-pagination-icon-color)}.mat-mdc-tab-header-pagination-disabled{box-shadow:none;cursor:default;pointer-events:none}.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron{opacity:.4}.mat-mdc-tab-list{flex-grow:1;position:relative;transition:transform 500ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-mdc-tab-list{transition:none}._mat-animation-noopable span.mdc-tab-indicator__content,._mat-animation-noopable span.mdc-tab__text-label{transition:none}.mat-mdc-tab-links{display:flex;flex:1 0 auto}[mat-align-tabs=center]>.mat-mdc-tab-link-container .mat-mdc-tab-links{justify-content:center}[mat-align-tabs=end]>.mat-mdc-tab-link-container .mat-mdc-tab-links{justify-content:flex-end}.mat-mdc-tab-link-container{display:flex;flex-grow:1;overflow:hidden;z-index:1}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination{background-color:var(--mat-tab-header-with-background-background-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background.mat-primary>.mat-mdc-tab-link-container .mat-mdc-tab-link .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background.mat-primary>.mat-mdc-tab-link-container .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-link-container .mat-mdc-tab-link:not(.mdc-tab--active) .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-link-container .mat-mdc-tab-link:not(.mdc-tab--active) .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-focus-indicator::before,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-focus-indicator::before{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-ripple-element,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mdc-tab__ripple::before,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-ripple-element,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mdc-tab__ripple::before{background-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron{color:var(--mat-tab-header-with-background-foreground-color)}"], dependencies: [{ kind: "directive", type: MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }, { kind: "directive", type: CdkObserveContent, selector: "[cdkObserveContent]", inputs: ["cdkObserveContentDisabled", "debounce"], outputs: ["cdkObserveContent"], exportAs: ["cdkObserveContent"] }], changeDetection: ChangeDetectionStrategy.Default, encapsulation: ViewEncapsulation$1.None });
var MatTabNav = _MatTabNav;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: MatTabNav, decorators: [{
  type: Component,
  args: [{ selector: "[mat-tab-nav-bar]", exportAs: "matTabNavBar, matTabNav", inputs: ["color"], host: {
    "[attr.role]": "_getRole()",
    "class": "mat-mdc-tab-nav-bar mat-mdc-tab-header",
    "[class.mat-mdc-tab-header-pagination-controls-enabled]": "_showPaginationControls",
    "[class.mat-mdc-tab-header-rtl]": "_getLayoutDirection() == 'rtl'",
    "[class.mat-mdc-tab-nav-bar-stretch-tabs]": "stretchTabs",
    "[class.mat-primary]": 'color !== "warn" && color !== "accent"',
    "[class.mat-accent]": 'color === "accent"',
    "[class.mat-warn]": 'color === "warn"',
    "[class._mat-animation-noopable]": '_animationMode === "NoopAnimations"',
    "[style.--mat-tab-animation-duration]": "animationDuration"
  }, encapsulation: ViewEncapsulation$1.None, changeDetection: ChangeDetectionStrategy.Default, template: `<!-- TODO: this also had \`mat-elevation-z4\`. Figure out what we should do with it. -->
<button class="mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-before"
     #previousPaginator
     aria-hidden="true"
     type="button"
     mat-ripple
     tabindex="-1"
     [matRippleDisabled]="_disableScrollBefore || disableRipple"
     [class.mat-mdc-tab-header-pagination-disabled]="_disableScrollBefore"
     [disabled]="_disableScrollBefore || null"
     (click)="_handlePaginatorClick('before')"
     (mousedown)="_handlePaginatorPress('before', $event)"
     (touchend)="_stopInterval()">
  <div class="mat-mdc-tab-header-pagination-chevron"></div>
</button>

<div class="mat-mdc-tab-link-container" #tabListContainer (keydown)="_handleKeydown($event)">
  <div class="mat-mdc-tab-list" #tabList (cdkObserveContent)="_onContentChanges()">
    <div class="mat-mdc-tab-links" #tabListInner>
      <ng-content></ng-content>
    </div>
  </div>
</div>

<!-- TODO: this also had \`mat-elevation-z4\`. Figure out what we should do with it. -->
<button class="mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-after"
     #nextPaginator
     aria-hidden="true"
     type="button"
     mat-ripple
     [matRippleDisabled]="_disableScrollAfter || disableRipple"
     [class.mat-mdc-tab-header-pagination-disabled]="_disableScrollAfter"
     [disabled]="_disableScrollAfter || null"
     tabindex="-1"
     (mousedown)="_handlePaginatorPress('after', $event)"
     (click)="_handlePaginatorClick('after')"
     (touchend)="_stopInterval()">
  <div class="mat-mdc-tab-header-pagination-chevron"></div>
</button>
`, styles: [".mdc-tab{min-width:90px;padding-right:24px;padding-left:24px;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;margin:0;padding-top:0;padding-bottom:0;border:none;outline:none;text-align:center;white-space:nowrap;cursor:pointer;-webkit-appearance:none;z-index:1}.mdc-tab::-moz-focus-inner{padding:0;border:0}.mdc-tab[hidden]{display:none}.mdc-tab--min-width{flex:0 1 auto}.mdc-tab__content{display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab__icon{transition:150ms color linear;z-index:2}.mdc-tab--stacked .mdc-tab__content{flex-direction:column;align-items:center;justify-content:center}.mdc-tab--stacked .mdc-tab__text-label{padding-top:6px;padding-bottom:4px}.mdc-tab--active .mdc-tab__text-label,.mdc-tab--active .mdc-tab__icon{transition-delay:100ms}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label,.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl]{padding-left:0;padding-right:8px}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator__content{transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator__content--icon{align-self:center;margin:0 auto}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}.mdc-tab-indicator .mdc-tab-indicator__content{transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition:150ms opacity linear}.mdc-tab-indicator--active.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition-delay:100ms}.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0;--mdc-tab-indicator-active-indicator-height:2px;--mdc-tab-indicator-active-indicator-shape:0;--mdc-secondary-navigation-tab-container-height:48px}.mdc-tab-indicator .mdc-tab-indicator__content{transition-duration:var(--mat-tab-animation-duration, 250ms)}.mat-mdc-tab-header-pagination{-webkit-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:none;box-sizing:content-box;background:none;border:none;outline:0;padding:0}.mat-mdc-tab-header-pagination::-moz-focus-inner{border:0}.mat-mdc-tab-header-pagination .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination{display:flex}.mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after{padding-left:4px}.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-pagination-after{padding-right:4px}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-mdc-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;height:8px;width:8px;border-color:var(--mat-tab-header-pagination-icon-color)}.mat-mdc-tab-header-pagination-disabled{box-shadow:none;cursor:default;pointer-events:none}.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron{opacity:.4}.mat-mdc-tab-list{flex-grow:1;position:relative;transition:transform 500ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-mdc-tab-list{transition:none}._mat-animation-noopable span.mdc-tab-indicator__content,._mat-animation-noopable span.mdc-tab__text-label{transition:none}.mat-mdc-tab-links{display:flex;flex:1 0 auto}[mat-align-tabs=center]>.mat-mdc-tab-link-container .mat-mdc-tab-links{justify-content:center}[mat-align-tabs=end]>.mat-mdc-tab-link-container .mat-mdc-tab-links{justify-content:flex-end}.mat-mdc-tab-link-container{display:flex;flex-grow:1;overflow:hidden;z-index:1}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination{background-color:var(--mat-tab-header-with-background-background-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background.mat-primary>.mat-mdc-tab-link-container .mat-mdc-tab-link .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background.mat-primary>.mat-mdc-tab-link-container .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-link-container .mat-mdc-tab-link:not(.mdc-tab--active) .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-link-container .mat-mdc-tab-link:not(.mdc-tab--active) .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-focus-indicator::before,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-focus-indicator::before{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-ripple-element,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mdc-tab__ripple::before,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-ripple-element,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mdc-tab__ripple::before{background-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron{color:var(--mat-tab-header-with-background-foreground-color)}"] }]
}], ctorParameters: function() {
  return [{ type: ElementRef }, { type: Directionality, decorators: [{
    type: Optional
  }] }, { type: NgZone }, { type: ChangeDetectorRef }, { type: ViewportRuler }, { type: Platform }, { type: void 0, decorators: [{
    type: Optional
  }, {
    type: Inject,
    args: [ANIMATION_MODULE_TYPE]
  }] }, { type: void 0, decorators: [{
    type: Optional
  }, {
    type: Inject,
    args: [MAT_TABS_CONFIG]
  }] }];
}, propDecorators: { fitInkBarToContent: [{
  type: Input
}], stretchTabs: [{
  type: Input,
  args: ["mat-stretch-tabs"]
}], animationDuration: [{
  type: Input
}], _items: [{
  type: ContentChildren,
  args: [forwardRef(() => MatTabLink), { descendants: true }]
}], _tabListContainer: [{
  type: ViewChild,
  args: ["tabListContainer", { static: true }]
}], _tabList: [{
  type: ViewChild,
  args: ["tabList", { static: true }]
}], _tabListInner: [{
  type: ViewChild,
  args: ["tabListInner", { static: true }]
}], _nextPaginator: [{
  type: ViewChild,
  args: ["nextPaginator"]
}], _previousPaginator: [{
  type: ViewChild,
  args: ["previousPaginator"]
}] } });
var _MatTabLink = class _MatTabLink extends _MatTabLinkBaseWithInkBarItem {
  constructor(tabNavBar, elementRef, globalRippleOptions, tabIndex, focusMonitor, animationMode) {
    super(tabNavBar, elementRef, globalRippleOptions, tabIndex, focusMonitor, animationMode);
    this._destroyed = new Subject();
    tabNavBar._fitInkBarToContent.pipe(takeUntil(this._destroyed)).subscribe((fitInkBarToContent) => {
      this.fitInkBarToContent = fitInkBarToContent;
    });
  }
  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
    super.ngOnDestroy();
  }
};
_MatTabLink.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: _MatTabLink, deps: [{ token: MatTabNav }, { token: ElementRef }, { token: MAT_RIPPLE_GLOBAL_OPTIONS, optional: true }, { token: "tabindex", attribute: true }, { token: FocusMonitor }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: FactoryTarget.Component });
_MatTabLink.\u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "16.1.1", type: _MatTabLink, selector: "[mat-tab-link], [matTabLink]", inputs: { disabled: "disabled", disableRipple: "disableRipple", tabIndex: "tabIndex", active: "active", id: "id" }, host: { listeners: { "focus": "_handleFocus()", "keydown": "_handleKeydown($event)" }, properties: { "attr.aria-controls": "_getAriaControls()", "attr.aria-current": "_getAriaCurrent()", "attr.aria-disabled": "disabled", "attr.aria-selected": "_getAriaSelected()", "attr.id": "id", "attr.tabIndex": "_getTabIndex()", "attr.role": "_getRole()", "class.mat-mdc-tab-disabled": "disabled", "class.mdc-tab--active": "active" }, classAttribute: "mdc-tab mat-mdc-tab-link mat-mdc-focus-indicator" }, exportAs: ["matTabLink"], usesInheritance: true, ngImport: core_exports, template: '<span class="mdc-tab__ripple"></span>\n\n<div\n  class="mat-mdc-tab-ripple"\n  mat-ripple\n  [matRippleTrigger]="elementRef.nativeElement"\n  [matRippleDisabled]="rippleDisabled"></div>\n\n<span class="mdc-tab__content">\n  <span class="mdc-tab__text-label">\n    <ng-content></ng-content>\n  </span>\n</span>\n\n', styles: ['.mat-mdc-tab-link{-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-decoration:none;background:none;font-family:var(--mat-tab-header-label-text-font);font-size:var(--mat-tab-header-label-text-size);letter-spacing:var(--mat-tab-header-label-text-tracking);line-height:var(--mat-tab-header-label-text-line-height);font-weight:var(--mat-tab-header-label-text-weight)}.mat-mdc-tab-link .mdc-tab-indicator__content--underline{border-color:var(--mdc-tab-indicator-active-indicator-color)}.mat-mdc-tab-link .mdc-tab-indicator__content--underline{border-top-width:var(--mdc-tab-indicator-active-indicator-height)}.mat-mdc-tab-link .mdc-tab-indicator__content--underline{border-radius:var(--mdc-tab-indicator-active-indicator-shape)}.mat-mdc-tab-link:not(.mdc-tab--stacked){height:var(--mdc-secondary-navigation-tab-container-height)}.mat-mdc-tab-link:not(:disabled).mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):hover.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):focus.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):active.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:disabled.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):hover:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):focus:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):active:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:disabled:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link.mdc-tab{flex-grow:0}.mat-mdc-tab-link:hover .mdc-tab__text-label{color:var(--mat-tab-header-inactive-hover-label-text-color)}.mat-mdc-tab-link:focus .mdc-tab__text-label{color:var(--mat-tab-header-inactive-focus-label-text-color)}.mat-mdc-tab-link.mdc-tab--active .mdc-tab__text-label{color:var(--mat-tab-header-active-label-text-color)}.mat-mdc-tab-link.mdc-tab--active .mdc-tab__ripple::before,.mat-mdc-tab-link.mdc-tab--active .mat-ripple-element{background-color:var(--mat-tab-header-active-ripple-color)}.mat-mdc-tab-link.mdc-tab--active:hover .mdc-tab__text-label{color:var(--mat-tab-header-active-hover-label-text-color)}.mat-mdc-tab-link.mdc-tab--active:hover .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-hover-indicator-color)}.mat-mdc-tab-link.mdc-tab--active:focus .mdc-tab__text-label{color:var(--mat-tab-header-active-focus-label-text-color)}.mat-mdc-tab-link.mdc-tab--active:focus .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-focus-indicator-color)}.mat-mdc-tab-link.mat-mdc-tab-disabled{opacity:.4;pointer-events:none}.mat-mdc-tab-link.mat-mdc-tab-disabled .mdc-tab__content{pointer-events:none}.mat-mdc-tab-link.mat-mdc-tab-disabled .mdc-tab__ripple::before,.mat-mdc-tab-link.mat-mdc-tab-disabled .mat-ripple-element{background-color:var(--mat-tab-header-disabled-ripple-color)}.mat-mdc-tab-link .mdc-tab__ripple::before{content:"";display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab-link .mdc-tab__text-label{color:var(--mat-tab-header-inactive-label-text-color);display:inline-flex;align-items:center}.mat-mdc-tab-link .mdc-tab__content{position:relative;pointer-events:auto}.mat-mdc-tab-link:hover .mdc-tab__ripple::before{opacity:.04}.mat-mdc-tab-link.cdk-program-focused .mdc-tab__ripple::before,.mat-mdc-tab-link.cdk-keyboard-focused .mdc-tab__ripple::before{opacity:.12}.mat-mdc-tab-link .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab-header.mat-mdc-tab-nav-bar-stretch-tabs .mat-mdc-tab-link{flex-grow:1}.mat-mdc-tab-link::before{margin:5px}@media(max-width: 599px){.mat-mdc-tab-link{min-width:72px}}'], dependencies: [{ kind: "directive", type: MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation$1.None });
var MatTabLink = _MatTabLink;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: MatTabLink, decorators: [{
  type: Component,
  args: [{ selector: "[mat-tab-link], [matTabLink]", exportAs: "matTabLink", inputs: ["disabled", "disableRipple", "tabIndex", "active", "id"], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation$1.None, host: {
    "class": "mdc-tab mat-mdc-tab-link mat-mdc-focus-indicator",
    "[attr.aria-controls]": "_getAriaControls()",
    "[attr.aria-current]": "_getAriaCurrent()",
    "[attr.aria-disabled]": "disabled",
    "[attr.aria-selected]": "_getAriaSelected()",
    "[attr.id]": "id",
    "[attr.tabIndex]": "_getTabIndex()",
    "[attr.role]": "_getRole()",
    "[class.mat-mdc-tab-disabled]": "disabled",
    "[class.mdc-tab--active]": "active",
    "(focus)": "_handleFocus()",
    "(keydown)": "_handleKeydown($event)"
  }, template: '<span class="mdc-tab__ripple"></span>\n\n<div\n  class="mat-mdc-tab-ripple"\n  mat-ripple\n  [matRippleTrigger]="elementRef.nativeElement"\n  [matRippleDisabled]="rippleDisabled"></div>\n\n<span class="mdc-tab__content">\n  <span class="mdc-tab__text-label">\n    <ng-content></ng-content>\n  </span>\n</span>\n\n', styles: ['.mat-mdc-tab-link{-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-decoration:none;background:none;font-family:var(--mat-tab-header-label-text-font);font-size:var(--mat-tab-header-label-text-size);letter-spacing:var(--mat-tab-header-label-text-tracking);line-height:var(--mat-tab-header-label-text-line-height);font-weight:var(--mat-tab-header-label-text-weight)}.mat-mdc-tab-link .mdc-tab-indicator__content--underline{border-color:var(--mdc-tab-indicator-active-indicator-color)}.mat-mdc-tab-link .mdc-tab-indicator__content--underline{border-top-width:var(--mdc-tab-indicator-active-indicator-height)}.mat-mdc-tab-link .mdc-tab-indicator__content--underline{border-radius:var(--mdc-tab-indicator-active-indicator-shape)}.mat-mdc-tab-link:not(.mdc-tab--stacked){height:var(--mdc-secondary-navigation-tab-container-height)}.mat-mdc-tab-link:not(:disabled).mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):hover.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):focus.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):active.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:disabled.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):hover:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):focus:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):active:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:disabled:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link.mdc-tab{flex-grow:0}.mat-mdc-tab-link:hover .mdc-tab__text-label{color:var(--mat-tab-header-inactive-hover-label-text-color)}.mat-mdc-tab-link:focus .mdc-tab__text-label{color:var(--mat-tab-header-inactive-focus-label-text-color)}.mat-mdc-tab-link.mdc-tab--active .mdc-tab__text-label{color:var(--mat-tab-header-active-label-text-color)}.mat-mdc-tab-link.mdc-tab--active .mdc-tab__ripple::before,.mat-mdc-tab-link.mdc-tab--active .mat-ripple-element{background-color:var(--mat-tab-header-active-ripple-color)}.mat-mdc-tab-link.mdc-tab--active:hover .mdc-tab__text-label{color:var(--mat-tab-header-active-hover-label-text-color)}.mat-mdc-tab-link.mdc-tab--active:hover .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-hover-indicator-color)}.mat-mdc-tab-link.mdc-tab--active:focus .mdc-tab__text-label{color:var(--mat-tab-header-active-focus-label-text-color)}.mat-mdc-tab-link.mdc-tab--active:focus .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-focus-indicator-color)}.mat-mdc-tab-link.mat-mdc-tab-disabled{opacity:.4;pointer-events:none}.mat-mdc-tab-link.mat-mdc-tab-disabled .mdc-tab__content{pointer-events:none}.mat-mdc-tab-link.mat-mdc-tab-disabled .mdc-tab__ripple::before,.mat-mdc-tab-link.mat-mdc-tab-disabled .mat-ripple-element{background-color:var(--mat-tab-header-disabled-ripple-color)}.mat-mdc-tab-link .mdc-tab__ripple::before{content:"";display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab-link .mdc-tab__text-label{color:var(--mat-tab-header-inactive-label-text-color);display:inline-flex;align-items:center}.mat-mdc-tab-link .mdc-tab__content{position:relative;pointer-events:auto}.mat-mdc-tab-link:hover .mdc-tab__ripple::before{opacity:.04}.mat-mdc-tab-link.cdk-program-focused .mdc-tab__ripple::before,.mat-mdc-tab-link.cdk-keyboard-focused .mdc-tab__ripple::before{opacity:.12}.mat-mdc-tab-link .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab-header.mat-mdc-tab-nav-bar-stretch-tabs .mat-mdc-tab-link{flex-grow:1}.mat-mdc-tab-link::before{margin:5px}@media(max-width: 599px){.mat-mdc-tab-link{min-width:72px}}'] }]
}], ctorParameters: function() {
  return [{ type: MatTabNav }, { type: ElementRef }, { type: void 0, decorators: [{
    type: Optional
  }, {
    type: Inject,
    args: [MAT_RIPPLE_GLOBAL_OPTIONS]
  }] }, { type: void 0, decorators: [{
    type: Attribute,
    args: ["tabindex"]
  }] }, { type: FocusMonitor }, { type: void 0, decorators: [{
    type: Optional
  }, {
    type: Inject,
    args: [ANIMATION_MODULE_TYPE]
  }] }];
} });
var _MatTabNavPanel = class _MatTabNavPanel {
  constructor() {
    this.id = `mat-tab-nav-panel-${nextUniqueId++}`;
  }
};
_MatTabNavPanel.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: _MatTabNavPanel, deps: [], target: FactoryTarget.Component });
_MatTabNavPanel.\u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "16.1.1", type: _MatTabNavPanel, selector: "mat-tab-nav-panel", inputs: { id: "id" }, host: { attributes: { "role": "tabpanel" }, properties: { "attr.aria-labelledby": "_activeTabId", "attr.id": "id" }, classAttribute: "mat-mdc-tab-nav-panel" }, exportAs: ["matTabNavPanel"], ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation$1.None });
var MatTabNavPanel = _MatTabNavPanel;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: MatTabNavPanel, decorators: [{
  type: Component,
  args: [{
    selector: "mat-tab-nav-panel",
    exportAs: "matTabNavPanel",
    template: "<ng-content></ng-content>",
    host: {
      "[attr.aria-labelledby]": "_activeTabId",
      "[attr.id]": "id",
      "class": "mat-mdc-tab-nav-panel",
      "role": "tabpanel"
    },
    encapsulation: ViewEncapsulation$1.None,
    changeDetection: ChangeDetectionStrategy.OnPush
  }]
}], propDecorators: { id: [{
  type: Input
}] } });
var _MatTabsModule = class _MatTabsModule {
};
_MatTabsModule.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: _MatTabsModule, deps: [], target: FactoryTarget.NgModule });
_MatTabsModule.\u0275mod = \u0275\u0275ngDeclareNgModule({ minVersion: "14.0.0", version: "16.1.1", ngImport: core_exports, type: _MatTabsModule, declarations: [
  MatTabContent,
  MatTabLabel,
  MatTab,
  MatTabGroup,
  MatTabNav,
  MatTabNavPanel,
  MatTabLink,
  // Private directives, should not be exported.
  MatTabBody,
  MatTabBodyPortal,
  MatTabLabelWrapper,
  MatTabHeader
], imports: [
  CommonModule,
  MatCommonModule,
  PortalModule,
  MatRippleModule,
  ObserversModule,
  A11yModule
], exports: [
  MatCommonModule,
  MatTabContent,
  MatTabLabel,
  MatTab,
  MatTabGroup,
  MatTabNav,
  MatTabNavPanel,
  MatTabLink
] });
_MatTabsModule.\u0275inj = \u0275\u0275ngDeclareInjector({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: _MatTabsModule, imports: [
  CommonModule,
  MatCommonModule,
  PortalModule,
  MatRippleModule,
  ObserversModule,
  A11yModule,
  MatCommonModule
] });
var MatTabsModule = _MatTabsModule;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: MatTabsModule, decorators: [{
  type: NgModule,
  args: [{
    imports: [
      CommonModule,
      MatCommonModule,
      PortalModule,
      MatRippleModule,
      ObserversModule,
      A11yModule
    ],
    exports: [
      MatCommonModule,
      MatTabContent,
      MatTabLabel,
      MatTab,
      MatTabGroup,
      MatTabNav,
      MatTabNavPanel,
      MatTabLink
    ],
    declarations: [
      MatTabContent,
      MatTabLabel,
      MatTab,
      MatTabGroup,
      MatTabNav,
      MatTabNavPanel,
      MatTabLink,
      // Private directives, should not be exported.
      MatTabBody,
      MatTabBodyPortal,
      MatTabLabelWrapper,
      MatTabHeader
    ]
  }]
}] });

// src/app/components/to-do-card/to-do-card.component.ts
var ToDoCardComponent = class ToDoCardComponent2 {
  constructor() {
    this.toDoListSignalsService = inject(ToDoListSignalsService);
    this.toDoState = this.toDoListSignalsService.toDoState;
    this.toDoListData = computed(() => this.toDoState());
    this.showDeleteButton = false;
    this.dialogService = inject(MatDialog);
  }
  ngOnInit() {
    this.getDatasLocalStorage();
  }
  getDatasLocalStorage() {
    const toDoData = localStorage.getItem(TodoKeyLocalStorage.ToDoList);
    toDoData && this.toDoState.set(JSON.parse(toDoData));
    this.statusBtn();
  }
  statusBtn() {
    this.showDeleteButton = this.toDoListData().some((item) => {
      if (item.done === false) {
        return true;
      }
      return false;
    });
  }
  saveInLocalStorage() {
    this.toDoListSignalsService.saveInLocalStorage();
  }
  handleDoneElement(toDoId) {
    if (toDoId) {
      this.toDoState.mutate((todos) => {
        const todoSelected = todos.find((todo) => todo?.id === toDoId);
        todoSelected && (todoSelected.done = true);
        this.saveInLocalStorage();
      });
    }
  }
  handleToBeDoneElement(toDoId) {
    if (toDoId) {
      this.toDoState.mutate((todos) => {
        const todoSelected = todos.find((todo) => todo?.id === toDoId);
        todoSelected && (todoSelected.done = false);
        this.saveInLocalStorage();
      });
    }
  }
  handleDeleteElement(toDo) {
    if (toDo) {
      const index = this.toDoListData().indexOf(toDo);
      if (index != -1) {
        this.toDoState.mutate((allToDo) => {
          allToDo.splice(index, 1);
          this.saveInLocalStorage();
        });
      }
      this.statusBtn();
    }
  }
  deleteAllLocalStorage(type) {
    const elementsFiltred = [];
    this.toDoListData().forEach((element) => {
      if (element.done === type) {
        elementsFiltred.push(element);
      }
    });
    this.toDoListSignalsService.deleteAllLocalStorage(type);
    this.showDeleteButton = false;
  }
  editTask(item) {
    this.dialogService.open(ToDoFormComponent, {
      width: "50vw",
      maxHeight: "80vh",
      data: { item, action: "edit" }
    });
  }
};
ToDoCardComponent = __decorate([
  Component({
    selector: "app-to-do-card",
    standalone: true,
    imports: [
      CommonModule,
      NgTemplateOutlet,
      MatCardModule,
      MatButtonModule,
      MatIconModule,
      MatTabsModule,
      MatDialogModule
    ],
    template: to_do_card_component_default
  })
], ToDoCardComponent);

export {
  ToDoCardComponent
};
//# sourceMappingURL=chunk-3JDQWL3L.mjs.map
