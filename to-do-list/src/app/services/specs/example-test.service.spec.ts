import { TestBed } from "@angular/core/testing";
import { ExampleTestService } from "../example-test.service";
import { ToDoListSignalsService } from "../to-do-list-signals.service";
import { to_do_model } from "src/app/models/model/to_do_model";

describe("ExampleTestService", () => {
  let service: ExampleTestService;
  let todoService: ToDoListSignalsService;

  beforeEach(() => {
    service = TestBed.inject(ExampleTestService);
    todoService = TestBed.inject(ToDoListSignalsService);
  });

  //Metuodo que retorna um array de dados
  it("should return correct list", () => {
    service.getTestNamesList().subscribe({
      next: (list) => {
        expect(list).toEqual([
          { id: 1, name: "test1" },
          { id: 2, name: "test2" },
        ]);
      },
    });
  });

  //
  it("should return correctl todo list", () => {
    jest.spyOn(todoService, "createUpdateToDo");

    const newTodo: to_do_model = {
      id: 1,
      title: "new todo",
      description: "Description for test",
      done: true,
    };

    service.handleCreateTodo(newTodo).subscribe({
      next: (todoList) => {
        expect(todoList).toEqual([newTodo]);
        expect(todoService.createUpdateToDo).toHaveBeenCalledWith(newTodo);
      },
    });
  });
});
