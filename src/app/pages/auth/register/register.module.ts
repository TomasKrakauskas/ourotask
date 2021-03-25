import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

//components
import { RegisterComponent } from "./register.component";

//routing


@NgModule({
    declarations: [ RegisterComponent ],
    imports: [
      CommonModule,
      FormsModule
    ],
    exports: [ RegisterComponent ],
  })
  export class RegisterModule { }