import {
  HeaderComponent
} from "./chunk-C7F735MY.mjs";
import {
  ToDoCardComponent
} from "./chunk-3JDQWL3L.mjs";
import "./chunk-MUT2MIU7.mjs";
import "./chunk-MU7TXZPU.mjs";
import "./chunk-OSJ25O7G.mjs";
import {
  CommonModule
} from "./chunk-5P7YWOVB.mjs";
import {
  Component,
  TestBed,
  __decorate
} from "./chunk-TPVQNH6C.mjs";
import "./chunk-SO6IKGEA.mjs";

// angular:jit:template:file:src/app/app.component.html
var app_component_default = "<app-header></app-header>\n<app-to-do-card></app-to-do-card>\n";

// angular:jit:style:file:src/app/app.component.scss
var app_component_default2 = "/* src/app/app.component.scss */\n";

// src/app/app.component.ts
var AppComponent = class AppComponent2 {
  constructor() {
    this.title = "to-do-list";
  }
};
AppComponent = __decorate([
  Component({
    selector: "app-root",
    standalone: true,
    imports: [CommonModule, HeaderComponent, ToDoCardComponent],
    template: app_component_default,
    styles: [app_component_default2]
  })
], AppComponent);

// src/app/app.component.spec.ts
describe("AppComponent", () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [AppComponent]
  }));
  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  it(`should have the 'to-do-list' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual("to-do-list");
  });
  it("should render title", () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector(".content span")?.textContent).toContain("to-do-list app is running!");
  });
});
//# sourceMappingURL=app.component.spec.mjs.map
