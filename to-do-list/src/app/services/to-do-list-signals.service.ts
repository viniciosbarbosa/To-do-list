import { Injectable, signal } from "@angular/core";
import { to_do_model } from "../models/model/to_do_model";
import { TodoKeyLocalStorage } from "../models/enum/toDoKeyLocalStorage";

@Injectable({
  providedIn: "root",
})
export class ToDoListSignalsService {
  public toDoState = signal<Array<to_do_model>>([]);

  public createUpdateToDo(params: any): void {
    if (params !== null || params !== undefined) {
      this.toDoState.mutate((to_do) => {
        if (to_do !== null) {
          to_do.push(params);
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
}
