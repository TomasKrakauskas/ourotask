import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

//components
import { ResetComponent } from "./reset.component";

//routing
import { ResetRoutingModule } from "./reset-routing.module";


@NgModule({
    declarations: [ ResetComponent ],
    imports: [
  
      CommonModule,
      ResetRoutingModule,  
    ],
  })
  export class ResetModule { }