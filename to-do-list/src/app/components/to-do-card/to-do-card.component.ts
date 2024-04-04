import { MatIconModule } from "@angular/material/icon";
import { Component, OnInit, computed, inject } from "@angular/core";
import { CommonModule, NgTemplateOutlet } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { ToDoListSignalsService } from "src/app/services/to-do-list-signals.service";
import { TodoKeyLocalStorage } from "src/app/models/enum/toDoKeyLocalStorage";
import { to_do_model } from "src/app/models/model/to_do_model";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ToDoFormComponent } from "../to-do-form/to-do-form.component";

@Component({
  selector: "app-to-do-card",
  standalone: true,
  imports: [
    CommonModule,
    NgTemplateOutlet,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatDialogModule,
  ],
  templateUrl: "./to-do-card.component.html",
  styleUrls: [],
})
export class ToDoCardComponent implements OnInit {
  private toDoListSignalsService = inject(ToDoListSignalsService);
  private toDoState = this.toDoListSignalsService.toDoState;
  public toDoListData = computed(() => this.toDoState());
  public showDeleteButton: boolean = false;
  private dialogService = inject(MatDialog);

  ngOnInit(): void {
    this.getDatasLocalStorage();
    console.log(this.toDoListData());
  }

  getDatasLocalStorage(): void {
    const toDoData = localStorage.getItem(
      TodoKeyLocalStorage.ToDoList
    ) as string;

    toDoData && this.toDoState.set(JSON.parse(toDoData));
    this.statusBtn();

    console.log("passou");
  }

  public statusBtn(): void {
    this.showDeleteButton = this.toDoListData().some((item) => {
      if (item.done === false) {
        return true;
      }
      return false;
    });
  }

  public saveInLocalStorage(): void {
    this.toDoListSignalsService.saveInLocalStorage();
  }

  public handleDoneElement(toDoId: number) {
    if (toDoId) {
      this.toDoState.mutate((todos) => {
        const todoSelected = todos.find(
          (todo) => todo?.id === toDoId
        ) as to_do_model;

        console.log(todoSelected);

        todoSelected && (todoSelected.done = true);

        this.saveInLocalStorage();
      });
    }
  }

  public handleDeleteElement(toDo: to_do_model): void {
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

  public deleteAllLocalStorage(type: boolean) {
    const elementsFiltred: any[] = [];

    this.toDoListData().forEach((element) => {
      if (element.done === type) {
        elementsFiltred.push(element);
      }
    });

    console.log(elementsFiltred);

    this.toDoListSignalsService.deleteAllLocalStorage(type);

    this.showDeleteButton = false;
  }

  public editTask(item: to_do_model) {
    this.dialogService.open(ToDoFormComponent, {
      width: "50vw",
      maxHeight: "80vh",
      data: { item: item, action: "edit" },
    });
  }
}
