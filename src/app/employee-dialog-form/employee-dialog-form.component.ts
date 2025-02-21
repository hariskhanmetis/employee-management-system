import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../models/employee';

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
      id: [this.isEditMode ? this.data.id : this.generateRandomId()],
      name: [this.data?.name || '', Validators.required],
      age: [this.data?.age || '', [Validators.required, Validators.min(18)]],
      category: [this.data?.category || '', Validators.required]
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  saveEmployee() {
    this.dialogRef.close(this.employeeForm.value);
  }

  private generateRandomId(): string {
    return Math.floor(1000 + Math.random() * 9000).toString(); 
  }
}
