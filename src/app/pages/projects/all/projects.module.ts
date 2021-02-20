import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

//components
import { ProjectsComponent } from "./projects.component";

//routing
import { ProjectsRoutingModule } from "./projects-routing.module";


@NgModule({
    declarations: [ ProjectsComponent ],
    imports: [
  
      CommonModule,
      ProjectsRoutingModule,  
    ],
  })
  export class ProjectsModule { }