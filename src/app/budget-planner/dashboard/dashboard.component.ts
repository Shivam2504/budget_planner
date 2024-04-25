import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, SideNavComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  //Income
  lastMonthsIncome = ['June: \u20B912000', 'July: \u20B913000', 'August: \u20B915000'];
  currentMonthIncome = '\u20B914500';

  //Expense
  lastMonthsExpense = ['June: \u20B910000', 'July: \u20B99000', 'August: \u20B99500'];
  currentMonthExpense = '\u20B99500';
 
  //Todo Trans
  todoTransactions = [
    { description: 'Pay electricity bill' },
    { description: 'Submit monthly report' },
    { description: 'Buy groceries' },
    { description: 'Call insurance company' }
  ];

  //Total
  totalCurrentMonthIncome = 2000;
  totalCurrentMonthExpense = 1500;
  constructor(public router: Router) { }

  onIncome() {
    this.router.navigate(['/budget-planner/income']);
  }
  onExpense() {
    this.router.navigate(['/budget-planner/expense']);
  }
  onTodo() {
    this.router.navigate(['/budget-planner/todo']);
  }
  
  //Calculate Total
  get currentMonthSavings(): number {
    return this.totalCurrentMonthIncome - this.totalCurrentMonthExpense;
  }

}
