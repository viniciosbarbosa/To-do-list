import { MatIconModule } from "@angular/material/icon";
import { Component, OnInit, computed, inject } from "@angular/core";
import { CommonModule, NgTemplateOutlet } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { ToDoListSignalsService } from "src/app/services/to-do-list-signals.service";
import { TodoKeyLocalStorage } from "src/app/models/enum/toDoKeyLocalStorage";

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
  ],
  templateUrl: "./to-do-card.component.html",
  styleUrls: [],
})
export class ToDoCardComponent implements OnInit {
  private toDoListSignalsService = inject(ToDoListSignalsService);
  private toDoState = this.toDoListSignalsService.toDoState;
  public toDoListData = computed(() => this.toDoState());

  ngOnInit(): void {
    this.getDatasLocalStorage();
    console.log(this.toDoListData());
  }

  getDatasLocalStorage(): void {
    const toDoData = localStorage.getItem(
      TodoKeyLocalStorage.ToDoList
    ) as string;

    toDoData && this.toDoState.set(JSON.parse(toDoData));
  }

  public saveInLocalStorage(): void {
    this.toDoListSignalsService.saveInLocalStorage();
  }

  public deleteAllLocalStorage(): void {
    this.toDoListSignalsService.deleteLocalStorage();
  }
}
