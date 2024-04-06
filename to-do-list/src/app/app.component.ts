import { ToDoListSignalsService } from "./services/to-do-list-signals.service";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  WritableSignal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { ToDoCardComponent } from "./components/to-do-card/to-do-card.component";
import { to_do_model } from "./models/model/to_do_model";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, HeaderComponent, ToDoCardComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  @Input() public projectName!: string;
  @Output() public outputEvent = new EventEmitter<string>();
  title = "to-do-list";
  public todoSignal!: WritableSignal<Array<to_do_model>>;
  public renderTestMessage = false;
  public isDoned = false;

  constructor(private toDoListSignalsService: ToDoListSignalsService) {}

  public handleEmitEvent(): void {
    this.outputEvent.emit(this.projectName);
  }

  public handleCreateToDo(todo: to_do_model): void {
    if (todo) {
      this.toDoListSignalsService.createUpdateToDo(todo);
      this.todoSignal = this.toDoListSignalsService.toDoState;
    }
  }

  public handleCheckIsDone(): void {
    setTimeout(() => {
      this.isDoned = true;
    }, 200);
  }
}
