import {
  ToDoListSignalsService
} from "./chunk-GAMYJCHI.mjs";
import {
  Injectable,
  TestBed,
  __decorate,
  of
} from "./chunk-DYBEG3KM.mjs";
import "./chunk-SO6IKGEA.mjs";

// src/app/services/example-test.service.ts
var _a;
var ExampleTestService = (_a = class {
  constructor(toDoListSignalsService) {
    this.toDoListSignalsService = toDoListSignalsService;
    this.testNamesList = [
      { id: 1, name: "test1" },
      { id: 2, name: "test2" }
    ];
  }
  getTestNamesList() {
    return of(this.testNamesList);
  }
  handleCreateTodo(todo) {
    if (todo) {
      this.toDoListSignalsService.createUpdateToDo(todo);
    }
    return of(this.toDoListSignalsService.toDoState());
  }
}, _a.ctorParameters = () => [
  { type: ToDoListSignalsService }
], _a);
ExampleTestService = __decorate([
  Injectable({ providedIn: "root" })
], ExampleTestService);

// src/app/services/specs/example-test.service.spec.ts
describe("ExampleTestService", () => {
  let service;
  let todoService;
  beforeEach(() => {
    service = TestBed.inject(ExampleTestService);
    todoService = TestBed.inject(ToDoListSignalsService);
  });
  it("should return correct list", () => {
    service.getTestNamesList().subscribe({
      next: (list) => {
        expect(list).toEqual([
          { id: 1, name: "test1" },
          { id: 2, name: "test2" }
        ]);
      }
    });
  });
  it("should return correctl todo list", () => {
    jest.spyOn(todoService, "createUpdateToDo");
    const newTodo = {
      id: 1,
      title: "new todo",
      description: "Description for test",
      done: true
    };
    service.handleCreateTodo(newTodo).subscribe({
      next: (todoList) => {
        expect(todoList).toEqual([newTodo]);
        expect(todoService.createUpdateToDo).toHaveBeenCalledWith(newTodo);
      }
    });
  });
});
//# sourceMappingURL=example-test.service.spec.mjs.map
