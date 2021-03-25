import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

//components
import { LoginComponent } from "./login.component";

//routing
import { FormsModule } from "@angular/forms";


@NgModule({
    declarations: [ LoginComponent ],
    imports: [
  
      FormsModule,
      CommonModule,
      
    ],
    exports: [ LoginComponent ]
  })
  export class LoginModule { }