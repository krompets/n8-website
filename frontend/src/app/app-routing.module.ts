import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from "./pages/main-page/main-page.component";
import { ProjectPageComponent } from "./pages/project-page/project-page.component";
import { ActivityGeneratorPageComponent } from "./pages/activity-generator-page/activity-generator-page.component";
import { AdminAuthComponent } from './admin/components/admin-auth/admin-auth.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/main' },
  { path: 'main', component: MainPageComponent, data: {animation: 'Main'}},
  { path: 'project/:name', component: ProjectPageComponent, data: {animation: 'Project'}},
  { path: 'activity', component: ActivityGeneratorPageComponent, data: {animation: 'Activity'}},
  { path: 'admin', component: AdminAuthComponent },
  // Admin routes for projects are registered via RouterModule.forChild in AppModule
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
