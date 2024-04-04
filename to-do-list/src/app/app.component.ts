import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { ToDoCardComponent } from "./components/to-do-card/to-do-card.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, HeaderComponent, ToDoCardComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "to-do-list";
}
