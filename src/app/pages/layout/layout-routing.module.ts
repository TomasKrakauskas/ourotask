import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'prefix',
                loadChildren: () => import('../projects/all/projects.module').then(m => m.ProjectsModule)
            },
            {
                path: 'project',
                loadChildren: () => import('../projects/single/project.module').then(m => m.ProjectModule)
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }