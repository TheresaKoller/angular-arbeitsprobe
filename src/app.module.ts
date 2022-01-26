import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './app/main-nav/main-nav.component';
import {MaterialExampleModule} from 'src/app/material.module';
import {MatNativeDateModule} from '@angular/material/core';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import {FileReaderComponent} from "./app/file-reader/file-reader.component";
import { TestComponent } from './app/test/test.component';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    FileReaderComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatNativeDateModule,
    MatListModule,
    FormsModule,
    MaterialExampleModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
