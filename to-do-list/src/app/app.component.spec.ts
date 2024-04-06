import { Component, DebugElement } from "@angular/core";
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { first } from "rxjs";
import { ToDoListSignalsService } from "./services/to-do-list-signals.service";
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from "@angular/platform-browser/animations";
import { NoopAnimationPlayer } from "@angular/animations";
import { to_do_model } from "./models/model/to_do_model";
import { By } from "@angular/platform-browser";

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let todoSignalsService: ToDoListSignalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent, BrowserAnimationsModule, NoopAnimationsModule],
      providers: [ToDoListSignalsService],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    todoSignalsService = TestBed.inject(ToDoListSignalsService);
    fixture.detectChanges();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  //teste do @Input()
  it("should set @Input() property correctly", () => {
    component.projectName = "Testing Angular with jest";

    fixture.detectChanges();

    expect(component.projectName).toEqual("Testing Angular with jest");
  });

  //teste do @Output()
  it("should emit event with @Output() correctly", () => {
    component.projectName = "Testing my angular application";

    component.outputEvent.pipe(first()).subscribe({
      next: (event) => {
        expect(event).toEqual("Testing Angular with jest");
        component.handleEmitEvent();
      },
    });
  });

  //teste de um acionamento de servico de um signal
  it("should create new todo correctly and call service method", () => {
    jest.spyOn(todoSignalsService, "createUpdateToDo");

    const newTodo: to_do_model = {
      id: 1,
      title: "testing create Todo",
      description: "Test new Todos",
      done: true,
    };

    component.handleCreateToDo(newTodo);

    fixture.detectChanges();

    expect(todoSignalsService.createUpdateToDo).toHaveBeenCalledWith(newTodo);
    expect(component.todoSignal()).toEqual([newTodo]);
  });

  // Teste de elementos do Dom
  it("should not render paragraph in the dom", () => {
    const componentDebugElement: DebugElement = fixture.debugElement;
    const element: HTMLElement = componentDebugElement.nativeElement;
    const paragraph = element.querySelector("p");

    expect(paragraph).toBeNull();
  });

  //
  it("should render paragraph correctly", () => {
    component.renderTestMessage = true;

    fixture.detectChanges();

    const componentDebugElement: DebugElement = fixture.debugElement;
    const paragraphDebugElement = componentDebugElement.query(By.css("p"));
    const paragraph: HTMLElement = paragraphDebugElement.nativeElement;

    expect(paragraph.textContent).toEqual("teste your angular application");
  });

  //Teste de setTimeOut
  it("should isDone property to be false", () => {
    component.handleCheckIsDone();
    expect(component.isDoned).toBe(false);
  });

  //
  it("should isDone property to be true", fakeAsync(() => {
    component.handleCheckIsDone();
    tick(200);

    expect(component.isDoned).toBe(true);
  }));
});
