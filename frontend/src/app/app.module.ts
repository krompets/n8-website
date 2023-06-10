import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { AppMenuComponent } from './components/menu/app-menu.component';
import { AppMainComponent } from './components/main/app-main.component';
import { AppContentComponent } from './components/content/app-content.component';
import { ScrollService } from './services/scroll.service';
import { AppRoutingModule } from "./app-routing.module";
import { MainPageComponent } from "./pages/main-page/main-page.component";
import { ProjectPageComponent } from "./pages/project-page/project-page.component";

@NgModule({
  declarations: [
    AppComponent,
    AppMenuComponent,
    AppMainComponent,
    AppContentComponent,
    MainPageComponent,
    ProjectPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    AppRoutingModule
  ],
  providers: [ScrollService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
