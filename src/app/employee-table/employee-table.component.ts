import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeDialogFormComponent } from '../employee-dialog-form/employee-dialog-form.component';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit, AfterViewInit {
  constructor(
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  employees: Employee[] = [];
  displayedColumns: string[] = ['id', 'name', 'age', 'category', 'actions'];
  dataSource = new MatTableDataSource<Employee>(this.employees);

  @ViewChild(MatPaginator) paginator!: MatPaginator;;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadUsers() {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
      this.dataSource.data = this.employees;
    });
  }

  addEmployee() {
    const dialogRef = this.dialog.open(EmployeeDialogFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.addEmployee(result).subscribe(() => {
          this.loadUsers();
          this.snackBar.open('User added successfully!', 'Close', { duration: 3000 });
          console.log("User added successfully!");
        });
      }
    });
  }

  editEmployee(employee: Employee) {
    const dialogRef = this.dialog.open(EmployeeDialogFormComponent, {
      data: employee
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.updateEmployee(result).subscribe(() => {
          this.loadUsers();
          this.snackBar.open('User updated successfully!', 'Close', { duration: 3000 });
          console.log("Employee updated successfully!");
        });
      }
    });
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.loadUsers();
        this.snackBar.open('User deleted successfully', 'Close', { duration: 3000 });
      });
    }
  }

}
