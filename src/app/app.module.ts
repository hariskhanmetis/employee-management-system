import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeDialogFormComponent } from './employee-dialog-form/employee-dialog-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeTableComponent,
    EmployeeDialogFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatSelectModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule, 
    MatDialogModule,
    ReactiveFormsModule, 
    MatFormFieldModule,
    MatOptionModule, 
    MatInputModule
  ],
  providers: [MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
