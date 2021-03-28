import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

//components
import { AuthComponent } from "./auth.component";

//routing
import { AuthRoutingModule } from "./auth-routing.module";

//pages
import { LoginModule } from "./login/login.module";
import { RegisterModule } from "./register/register.module";
import { ResetModule } from "./reset/reset.module";
import { SetModule } from "./set/set.module";

//observers
import { AuthObserver } from "src/app/obeservers/auth.oberserver";


@NgModule({
    declarations: [ AuthComponent ],
    imports: [
  
      CommonModule,
      AuthRoutingModule,  

      LoginModule,
      RegisterModule,
      ResetModule,
      SetModule
    ],
    providers: [
      AuthObserver,

    ]
  })
  export class AuthModule { }