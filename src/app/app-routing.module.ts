import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    children: [
      {
        path: '',
        pathMatch: 'prefix',
        loadChildren: () => import('./pages/layout/layout.module').then(m => m.LayoutModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterModule)
      },
      {
        path: 'set',
        loadChildren: () => import('./pages/auth/set/set.module').then(m => m.SetModule)
      },
      {
        path: 'reset',
        loadChildren: () => import('./pages/auth/reset/reset.module').then(m => m.ResetModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
