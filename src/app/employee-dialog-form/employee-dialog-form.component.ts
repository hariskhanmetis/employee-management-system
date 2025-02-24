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
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) { }

  ngOnInit(): void {
    this.isEditMode = !!this.data;
    
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });

    if (this.isEditMode) {
      console.log("Editing Employee:", this.data);
      this.employeeForm.patchValue(this.data);
    } else {
      console.log("Adding New Employee...");
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  saveEmployee() {
    const newEmployee: Employee = {
      id: this.isEditMode ? this.data.id : this.generateRandomId(), 
      ...this.employeeForm.value
    };

    console.log("Saving Employee:", newEmployee);
    this.dialogRef.close(newEmployee);
  }

  generateRandomId(): number {
    return Math.floor(1000 + Math.random() * 9999);
  }

}
