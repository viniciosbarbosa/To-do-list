import {
  Injectable,
  __decorate,
  signal
} from "./chunk-DYBEG3KM.mjs";
import {
  __spreadValues
} from "./chunk-SO6IKGEA.mjs";

// src/app/models/enum/toDoKeyLocalStorage.ts
var TodoKeyLocalStorage;
(function(TodoKeyLocalStorage2) {
  TodoKeyLocalStorage2["ToDoList"] = "ToDoList";
})(TodoKeyLocalStorage || (TodoKeyLocalStorage = {}));

// src/app/services/to-do-list-signals.service.ts
var ToDoListSignalsService = class ToDoListSignalsService2 {
  constructor() {
    this.toDoState = signal([]);
  }
  createUpdateToDo(params) {
    if (params && params.id !== null && params.id !== void 0) {
      this.toDoState.mutate((to_do) => {
        if (to_do !== null) {
          const existingItemIndex = to_do.findIndex((item) => item.id === params.id);
          if (existingItemIndex !== -1) {
            to_do[existingItemIndex] = __spreadValues(__spreadValues({}, to_do[existingItemIndex]), params);
          } else {
            to_do.push(params);
          }
          this.saveInLocalStorage();
        }
      });
    }
  }
  saveInLocalStorage() {
    const dataToDoList = JSON.stringify(this.toDoState());
    dataToDoList && localStorage.setItem(TodoKeyLocalStorage.ToDoList, dataToDoList);
  }
  deleteLocalStorage() {
    localStorage.removeItem(TodoKeyLocalStorage.ToDoList);
  }
  deleteAllLocalStorage(type) {
    let todosString = localStorage.getItem("ToDoList");
    if (todosString !== null) {
      let todos = JSON.parse(todosString) || [];
      todos = todos.filter((todo) => todo.done !== type);
      this.toDoState.set(todos);
      localStorage.setItem("ToDoList", JSON.stringify(todos));
    }
  }
};
ToDoListSignalsService = __decorate([
  Injectable({
    providedIn: "root"
  })
], ToDoListSignalsService);

export {
  TodoKeyLocalStorage,
  ToDoListSignalsService
};
//# sourceMappingURL=chunk-GAMYJCHI.mjs.map
