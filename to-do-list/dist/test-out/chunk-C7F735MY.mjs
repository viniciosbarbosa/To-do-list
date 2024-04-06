import {
  MatIconModule
} from "./chunk-MUT2MIU7.mjs";
import {
  MatButtonModule,
  MatCommonModule,
  MatDialog,
  MatDialogModule,
  ToDoFormComponent,
  coerceBooleanProperty
} from "./chunk-MU7TXZPU.mjs";
import {
  CommonModule
} from "./chunk-5P7YWOVB.mjs";
import {
  ChangeDetectionStrategy,
  Component,
  FactoryTarget,
  Input,
  NgModule,
  ViewEncapsulation$1,
  __decorate,
  core_exports,
  inject,
  ɵɵngDeclareClassMetadata,
  ɵɵngDeclareComponent,
  ɵɵngDeclareFactory,
  ɵɵngDeclareInjector,
  ɵɵngDeclareNgModule
} from "./chunk-TPVQNH6C.mjs";

// angular:jit:template:file:src/app/components/header/header.component.html
var header_component_default = '<header class="header">\n  <h1 class="header_title">To do list</h1>\n  <button\n    mat-icon-button\n    class="header_btn"\n    aria-label="adicionar nova tarefa"\n    (click)="handleOpenModal()"\n  >\n    <mat-icon>add</mat-icon>\n  </button>\n</header>\n';

// node_modules/@angular/material/fesm2022/divider.mjs
var _MatDivider = class _MatDivider {
  constructor() {
    this._vertical = false;
    this._inset = false;
  }
  /** Whether the divider is vertically aligned. */
  get vertical() {
    return this._vertical;
  }
  set vertical(value) {
    this._vertical = coerceBooleanProperty(value);
  }
  /** Whether the divider is an inset divider. */
  get inset() {
    return this._inset;
  }
  set inset(value) {
    this._inset = coerceBooleanProperty(value);
  }
};
_MatDivider.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: _MatDivider, deps: [], target: FactoryTarget.Component });
_MatDivider.\u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "16.1.1", type: _MatDivider, selector: "mat-divider", inputs: { vertical: "vertical", inset: "inset" }, host: { attributes: { "role": "separator" }, properties: { "attr.aria-orientation": 'vertical ? "vertical" : "horizontal"', "class.mat-divider-vertical": "vertical", "class.mat-divider-horizontal": "!vertical", "class.mat-divider-inset": "inset" }, classAttribute: "mat-divider" }, ngImport: core_exports, template: "", isInline: true, styles: [".mat-divider{--mat-divider-width:1px;display:block;margin:0;border-top-style:solid;border-top-color:var(--mat-divider-color);border-top-width:var(--mat-divider-width)}.mat-divider.mat-divider-vertical{border-top:0;border-right-style:solid;border-right-color:var(--mat-divider-color);border-right-width:var(--mat-divider-width)}.mat-divider.mat-divider-inset{margin-left:80px}[dir=rtl] .mat-divider.mat-divider-inset{margin-left:auto;margin-right:80px}"], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation$1.None });
var MatDivider = _MatDivider;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: MatDivider, decorators: [{
  type: Component,
  args: [{ selector: "mat-divider", host: {
    "role": "separator",
    "[attr.aria-orientation]": 'vertical ? "vertical" : "horizontal"',
    "[class.mat-divider-vertical]": "vertical",
    "[class.mat-divider-horizontal]": "!vertical",
    "[class.mat-divider-inset]": "inset",
    "class": "mat-divider"
  }, template: "", encapsulation: ViewEncapsulation$1.None, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".mat-divider{--mat-divider-width:1px;display:block;margin:0;border-top-style:solid;border-top-color:var(--mat-divider-color);border-top-width:var(--mat-divider-width)}.mat-divider.mat-divider-vertical{border-top:0;border-right-style:solid;border-right-color:var(--mat-divider-color);border-right-width:var(--mat-divider-width)}.mat-divider.mat-divider-inset{margin-left:80px}[dir=rtl] .mat-divider.mat-divider-inset{margin-left:auto;margin-right:80px}"] }]
}], propDecorators: { vertical: [{
  type: Input
}], inset: [{
  type: Input
}] } });
var _MatDividerModule = class _MatDividerModule {
};
_MatDividerModule.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: _MatDividerModule, deps: [], target: FactoryTarget.NgModule });
_MatDividerModule.\u0275mod = \u0275\u0275ngDeclareNgModule({ minVersion: "14.0.0", version: "16.1.1", ngImport: core_exports, type: _MatDividerModule, declarations: [MatDivider], imports: [MatCommonModule], exports: [MatDivider, MatCommonModule] });
_MatDividerModule.\u0275inj = \u0275\u0275ngDeclareInjector({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: _MatDividerModule, imports: [MatCommonModule, MatCommonModule] });
var MatDividerModule = _MatDividerModule;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: core_exports, type: MatDividerModule, decorators: [{
  type: NgModule,
  args: [{
    imports: [MatCommonModule],
    exports: [MatDivider, MatCommonModule],
    declarations: [MatDivider]
  }]
}] });

// src/app/components/header/header.component.ts
var HeaderComponent = class HeaderComponent2 {
  constructor() {
    this.dialogService = inject(MatDialog);
  }
  handleOpenModal() {
    this.dialogService.open(ToDoFormComponent, {
      width: "50vw",
      maxHeight: "80vh"
    });
  }
};
HeaderComponent = __decorate([
  Component({
    selector: "app-header",
    standalone: true,
    imports: [
      CommonModule,
      MatButtonModule,
      MatDividerModule,
      MatIconModule,
      MatDialogModule
    ],
    template: header_component_default
  })
], HeaderComponent);

export {
  HeaderComponent
};
//# sourceMappingURL=chunk-C7F735MY.mjs.map
