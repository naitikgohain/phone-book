import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactAddComponent } from './contact-add/contact-add.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDividerModule} from '@angular/material/divider';
import { ContactUpdateComponent } from './contact-update/contact-update.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactAddComponent,
    ContactUpdateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
