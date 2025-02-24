import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../models/employee';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-dialog-form',
  templateUrl: './employee-dialog-form.component.html',
  styleUrls: ['./employee-dialog-form.component.css']
})
export class EmployeeDialogFormComponent implements OnInit {
  employeeForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.isEditMode = !!this.data;
    if (this.isEditMode) {
      this.employeeForm = this.fb.group({
        name: ['', [Validators.required]],
        age: ['', [Validators.required]],
        category: ['', [Validators.required]]
      });
      console.log("Dialog received data:", this.data);
      this.snackBar.open('User is being edited...', 'Close', { duration: 3000 });
      console.log("User information is being edited...");
      this.employeeForm.patchValue(this.data);
    } 
    
    else {
      this.snackBar.open('New user is being added...', 'Close', { duration: 3000 });
      console.log("New user is being added...");
      this.employeeForm = this.fb.group({
        name: ['', [Validators.required]],
        age: ['', [Validators.required]],
        category: ['', [Validators.required]]
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  saveEmployee() {
    const updatedEmployee = {
      ...this.data,
      ...this.employeeForm.value
    };

    console.log("Saving Employee:", updatedEmployee);
    this.dialogRef.close(updatedEmployee);
  }

}
