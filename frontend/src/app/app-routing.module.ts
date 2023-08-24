import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from "./pages/main-page/main-page.component";
import { ProjectPageComponent } from "./pages/project-page/project-page.component";
import { ActivityGeneratorPageComponent } from "./pages/activity-generator-page/activity-generator-page.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/main' },
  { path: 'main', component: MainPageComponent, data: {animation: 'Main'}},
  { path: 'project/:name', component: ProjectPageComponent, data: {animation: 'Project'}},
  { path: 'activity', component: ActivityGeneratorPageComponent, data: {animation: 'Activity'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
