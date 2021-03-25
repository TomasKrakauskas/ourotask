import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

//components
import { ResetComponent } from "./reset.component";

//routing


@NgModule({
    declarations: [ ResetComponent ],
    imports: [
  
      CommonModule,
      FormsModule
    ],
    exports: [ ResetComponent ],
  })
  export class ResetModule { }