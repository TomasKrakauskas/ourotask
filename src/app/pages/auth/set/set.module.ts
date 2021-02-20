import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

//components
import { SetComponent } from "./set.component";

//routing
import { SetRoutingModule } from "./set-routing.module";


@NgModule({
    declarations: [ SetComponent ],
    imports: [
  
      CommonModule,
      SetRoutingModule,  
    ],
  })
  export class SetModule { }