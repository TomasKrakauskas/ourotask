import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

//components
import { ProjectComponent } from "./project.component";

//routing
import { ProjectRoutingModule } from "./project-routing.module";


@NgModule({
    declarations: [ ProjectComponent ],
    imports: [
  
      CommonModule,
      ProjectRoutingModule,  
    ],
  })
  export class ProjectModule { }