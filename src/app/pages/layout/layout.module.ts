import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

//components
import { LayoutComponent } from "./layout.component";

//routing
import { LayoutRoutingModule } from "./layout-routing.module";


@NgModule({
    declarations: [ LayoutComponent ],
    imports: [
  
      CommonModule,
      LayoutRoutingModule,  
    ],
  })
  export class LayoutModule { }