import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

//components
import { ProjectsComponent } from "./projects.component";

//routing
import { ProjectsRoutingModule } from "./projects-routing.module";

//dialogs
import { CreateProjectModule } from "../../dialogs/create-project/create-project.module";
import { BoardService } from "src/app/services/board.service";
import { BoardCreationObserver } from "src/app/obeservers/board_creation.observer";


@NgModule({
    declarations: [ ProjectsComponent ],
    imports: [
  
      CommonModule,
      ProjectsRoutingModule,  

      CreateProjectModule
    ],
    providers: [
      
      //services
      BoardService,

      //observers
      BoardCreationObserver,

    ]
  })
  export class ProjectsModule { }