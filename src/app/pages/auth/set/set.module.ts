import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

//components
import { SetComponent } from "./set.component";

//routing


@NgModule({
    declarations: [ SetComponent ],
    imports: [
      CommonModule,
      FormsModule
    ],
    exports: [ SetComponent ],
  })
  export class SetModule { }