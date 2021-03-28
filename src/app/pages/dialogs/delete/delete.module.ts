import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

//components
import { DeleteComponent } from "./delete.component";

//routing


@NgModule({
    declarations: [ DeleteComponent ],
    imports: [
  
      CommonModule,
      FormsModule
    ],
    exports: [ DeleteComponent ]
  })
  export class DeleteModule { }