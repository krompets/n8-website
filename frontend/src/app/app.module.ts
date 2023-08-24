import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
    ActivityGeneratorPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatTableModule
  ],
  providers: [ScrollService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
