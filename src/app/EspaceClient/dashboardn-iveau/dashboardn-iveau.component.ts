import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-dashboardn-iveau',
  templateUrl: './dashboardn-iveau.component.html',
  styleUrls: ['./dashboardn-iveau.component.css'] // Corrected to 'styleUrls'
})
export class DashboardnIveauComponent implements OnInit{


  ngOnInit(): void {
    
  }
  completedTabs = ['A1', 'A2']; // List of completed tabs
  activeTab: string = 'A1'; // Track the active tab

 /* isCompleted(level: string): boolean {
    return this.completedTabs.includes(level);
  }*/

  onTabChange(event: MatTabChangeEvent): void {
    this.activeTab = event.tab.textLabel.split(' ')[0]; // Extracts level (A1, A2, B1, B2)
  }
}
