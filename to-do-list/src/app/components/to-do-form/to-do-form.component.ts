import { ToDoListSignalsService } from "./../../services/to-do-list-signals.service";
import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDialogRef } from "@angular/material/dialog";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: "app-to-do-form",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: "./to-do-form.component.html",
  styleUrls: [],
})
export class ToDoFormComponent implements OnInit {
  public to_do_form!: FormGroup;
  public toDoListSignalsService = inject(ToDoListSignalsService);
  public allToDo = this.toDoListSignalsService.toDoState();
  public dialogService = inject(MatDialogRef<HeaderComponent>);

  ngOnInit(): void {
    this.carregarForm();
  }

  carregarForm(): void {
    this.to_do_form = new FormGroup({
      title: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  setValueForm(): void {}

  handleSubmitForm(): void {
    if (this.to_do_form.valid && this.to_do_form.value) {
      const params = {
        title: String(this.to_do_form.controls["title"].value),
        description: String(this.to_do_form.controls["description"].value),
        id: this.allToDo.length > 0 ? this.allToDo.length + 1 : 1,
        done: false,
      };

      console.log(params);
      this.toDoListSignalsService.createUpdateToDo(params);
      this.handleCloseModal();
    }
  }

  handleCloseModal(): void {
    this.dialogService.close();
  }
}
