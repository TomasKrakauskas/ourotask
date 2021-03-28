import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

//components
import { CreateProjectComponent } from "./create-project.component";

//routing


@NgModule({
    declarations: [ CreateProjectComponent ],
    imports: [
  
      CommonModule,
      FormsModule
    ],
    exports: [ CreateProjectComponent ]
  })
  export class CreateProjectModule { }