import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatIconModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent {
  expenseForm: any;
  selectedMonth: string;
  expenses: { month: string, expenseAmount: number }[] = [
    { month: 'June', expenseAmount: 10000 },
    { month: 'July', expenseAmount: 9000 },
    { month: 'August', expenseAmount: 9500}
  ];
  monthSelected: boolean = false;
  juneExpense: any[] = [
    { expenseType: 'Rent', expenseAmount: 7500 },
    { expenseType: 'Groceries', expenseAmount: 2500},
  ];
  julyExpense: any[] = [
    { expenseType: 'Rent', expenseAmount: 7500 },
    { expenseType: 'Groceries', expenseAmount: 1500 }
  ];
  augustExpense: any[] = [
    { expenseType: 'Rent', expenseAmount: 7500 },
    { expenseType: 'Utilities', expenseAmount: 2000 }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.selectedMonth = new Date().toLocaleString('default', { month: 'long' });
  }

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      month: ['', Validators.required],
      expenseType: ['', Validators.required],
      expenseAmount: ['', Validators.required]
    });
  }

  onSubmitExpense() {
    if (this.expenseForm.valid) {
      const newExpense = this.expenseForm.value;
      this.getFilteredExpenses().push(newExpense);
      this.expenseForm.reset();
    }
  }

  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredExpenses();
  }

  getFilteredExpenses() {
    switch (this.selectedMonth) {
      case 'June':
        return this.juneExpense;
      case 'July':
        return this.julyExpense;
      case 'August':
        return this.augustExpense;
      default:
        return [];
    }
  }

  calculateTotalExpense(month: string): number {
    return this.getFilteredExpenses().reduce((acc, curr) => acc + curr.expenseAmount, 0);
  }

  onSave() {
    if (this.expenseForm.valid) {
      this.expenseForm.reset({ month: this.selectedMonth });
      this.getFilteredExpenses();
    }
  }

  saveForm() {
    console.log("Form saved!");
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  } 
}
