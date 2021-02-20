import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

//components
import { RegisterComponent } from "./register.component";

//routing
import { RegisterRoutingModule } from "./register-routing.module";


@NgModule({
    declarations: [ RegisterComponent ],
    imports: [
  
      CommonModule,
      RegisterRoutingModule,  
    ],
  })
  export class RegisterModule { }