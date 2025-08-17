import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProjectListComponent } from './admin/components/project-list/project-list.component';
import { ProjectFormComponent } from './admin/components/project-form/project-form.component';
import { AdminAuthComponent } from './admin/components/admin-auth/admin-auth.component';
import { AdminMenuComponent } from './admin/components/admin-menu/admin-menu.component';
import { AllowedEmailsComponent } from './admin/components/allowed-emails/allowed-emails.component';
import { RouterModule, Routes } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    if (token) {
      const cloned = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}

const adminRoutes: Routes = [
  { path: 'admin/projects', component: ProjectListComponent },
  { path: 'admin/projects/new', component: ProjectFormComponent },
  { path: 'admin/projects/:id/edit', component: ProjectFormComponent },
  { path: 'admin/allowed-emails', component: AllowedEmailsComponent },
];
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMenuComponent } from './components/menu/app-menu.component';
import { AppMainComponent } from './components/main/app-main.component';
import { AppContentComponent } from './components/content/app-content.component';
import { ScrollService } from './services/scroll.service';
import { AppRoutingModule } from "./app-routing.module";
import { MainPageComponent } from "./pages/main-page/main-page.component";
import { ProjectPageComponent } from "./pages/project-page/project-page.component";
import { ActivityGeneratorPageComponent } from "./pages/activity-generator-page/activity-generator-page.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatChipsModule } from "@angular/material/chips";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";

@NgModule({
  declarations: [
    AppComponent,
    AppMenuComponent,
    AppMainComponent,
    AppContentComponent,
    MainPageComponent,
    ProjectPageComponent,
    ActivityGeneratorPageComponent,
    ProjectListComponent,
    ProjectFormComponent,
    AdminAuthComponent,
    AllowedEmailsComponent,
    AdminMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule.forChild(adminRoutes),
    MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatTableModule
  ],
  providers: [
    ScrollService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
