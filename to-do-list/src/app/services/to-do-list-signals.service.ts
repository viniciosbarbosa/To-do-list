import { Injectable, signal } from "@angular/core";
import { to_do_model } from "../models/model/to_do_model";
import { TodoKeyLocalStorage } from "../models/enum/toDoKeyLocalStorage";

@Injectable({
  providedIn: "root",
})
export class ToDoListSignalsService {
  public toDoState = signal<Array<to_do_model>>([]);

  public createUpdateToDo(params: any): void {
    if (params && params.id !== null && params.id !== undefined) {
      this.toDoState.mutate((to_do) => {
        if (to_do !== null) {
          const existingItemIndex = to_do.findIndex(
            (item) => item.id === params.id
          );
          if (existingItemIndex !== -1) {
            to_do[existingItemIndex] = {
              ...to_do[existingItemIndex],
              ...params,
            };
          } else {
            to_do.push(params);
          }
          console.log(to_do);
          this.saveInLocalStorage();
        }
      });
    }
  }

  public saveInLocalStorage(): void {
    const dataToDoList = JSON.stringify(this.toDoState());
    dataToDoList &&
      localStorage.setItem(TodoKeyLocalStorage.ToDoList, dataToDoList);
  }

  public deleteLocalStorage(): void {
    localStorage.removeItem(TodoKeyLocalStorage.ToDoList);
  }

  public deleteAllLocalStorage(type: boolean) {
    let todosString = localStorage.getItem("ToDoList");

    if (todosString !== null) {
      let todos: to_do_model[] = JSON.parse(todosString) || [];

      todos = todos.filter((todo: to_do_model) => todo.done !== type);

      // Atualize o todoState com os dados filtrados
      this.toDoState.set(todos);

      // Salve os dados filtrados no armazenamento local
      localStorage.setItem("ToDoList", JSON.stringify(todos));
    }
  }
}
