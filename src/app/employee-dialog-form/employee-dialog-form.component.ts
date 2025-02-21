import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../models/employee';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-dialog-form',
  templateUrl: './employee-dialog-form.component.html',
  styleUrls: ['./employee-dialog-form.component.css']
})
export class EmployeeDialogFormComponent {
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
      id: [this.data?.id || '', Validators.required],
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
}
