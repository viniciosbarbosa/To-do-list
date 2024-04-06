import { Observable, of } from "rxjs";
import { ToDoListSignalsService } from "./to-do-list-signals.service";
import { Injectable } from "@angular/core";
import { to_do_model } from "../models/model/to_do_model";
import { TodoKeyLocalStorage } from "../models/enum/toDoKeyLocalStorage";

@Injectable({ providedIn: "root" })
export class ExampleTestService {
  public testNamesList: Array<{ id: number; name: string }> = [
    { id: 1, name: "test1" },
    { id: 2, name: "test2" },
  ];

  constructor(private toDoListSignalsService: ToDoListSignalsService) {}

  public getTestNamesList(): Observable<Array<{ id: number; name: string }>> {
    return of(this.testNamesList);
  }

  public handleCreateTodo(todo: to_do_model): Observable<Array<to_do_model>> {
    if (todo) {
      this.toDoListSignalsService.createUpdateToDo(todo);
    }
    return of(this.toDoListSignalsService.toDoState());
  }
}
