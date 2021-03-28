import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

//components
import { LayoutComponent } from "./layout.component";

//routing
import { LayoutRoutingModule } from "./layout-routing.module";

//dialogs
import { DeleteModule } from "../dialogs/delete/delete.module";

//observers
import { DeleteObserver } from "src/app/obeservers/delete.observer";




@NgModule({
    declarations: [ LayoutComponent ],
    imports: [
  
      CommonModule,
      LayoutRoutingModule,  

      DeleteModule
    ],
    providers: [
      DeleteObserver
    ]
  })
  export class LayoutModule { }