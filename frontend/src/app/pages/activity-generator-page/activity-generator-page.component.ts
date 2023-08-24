import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CsvExportService } from "../../services/csv.service";
import { FormControl, Validators } from "@angular/forms";
import { map, Observable, startWith } from "rxjs";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";

@Component({
  selector: 'activity-generator-page',
  templateUrl: './activity-generator-page.component.html',
  styleUrls: ['./activity-generator-page.component.less']
})
export class ActivityGeneratorPageComponent implements OnInit {

  days = [1,2,3,4,5,6,7];
  users = [];
  tasks = [];
  distribution: any = {};

  separatorKeysCodes: number[] = [ENTER, COMMA];
  activityCtrl = new FormControl('');
  filteredactivities: Observable<string[]>;
  activities: string[] = ['zkSync', 'LayerZero', 'StarkNet', 'Base', 'Linea', 'Aptos'];
  allactivities: string[] = [];

  @ViewChild('activityInput') activityInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('dataTable') dataTable: ElementRef | undefined;

  announcer = inject(LiveAnnouncer);
  accountsFormControl = new FormControl(1, [Validators.required]);

  constructor(private csvExportService: CsvExportService) {
    this.filteredactivities = this.activityCtrl.valueChanges.pipe(
      startWith(null),
      map((activity: string | null) => (activity ? this._filter(activity) : this.allactivities.slice())),
    );
  }

  ngOnInit() {
    this.distributeTasks();
  }

  distributeTasks() {
    this.distribution = {};
    // @ts-ignore
    this.users = this.getUsers();

    for (let user of this.users) {
      if (!this.distribution[user]) {
        this.distribution[user] = {};
      }

      for (let activity of this.activities) {
        let activityDay = this.getRandomDayForActivity();
        if (!this.distribution[user][activityDay]) {
          this.distribution[user][activityDay] = [];
        }
        this.distribution[user][activityDay].push(activity);
      }
    }
  }

  getUsers() {
    let result = [];
    // @ts-ignore
    for(let i = 1; i <= this.accountsFormControl.value; i++) {
      result.push(`account${i}`);
    }
    return result;
  }

  exportAsCSV() {
    // @ts-ignore
    const table: HTMLTableElement = this.dataTable.nativeElement;
    let csvContent = '';

    // @ts-ignore
    for (const row of table.rows) {
      const rowData = [];
      for (const cell of row.cells) {
        let cellContent = cell.textContent.trim();
        // Quote the content to handle commas and spaces within cell values
        cellContent = `"${cellContent}"`;
        rowData.push(cellContent);
      }
      csvContent += rowData.join(';') + '\n';
    }

    const blob = new Blob([csvContent], { type: 'text/plain' });
    const a = document.createElement('a');
    a.download = 'export.csv';
    a.href = URL.createObjectURL(blob);
    a.click();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our activity
    if (value) {
      this.activities.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.activityCtrl.setValue(null);
  }

  remove(activity: string): void {
    const index = this.activities.indexOf(activity);

    if (index >= 0) {
      this.activities.splice(index, 1);

      this.announcer.announce(`Removed ${activity}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.activities.push(event.option.viewValue);
    // @ts-ignore
    this.activityInput.nativeElement.value = '';
    this.activityCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allactivities.filter(activity => activity.toLowerCase().includes(filterValue));
  }

  generateTable() {
    this.distributeTasks();
  }

  getRandomDayForActivity() {
    const randomIndex = Math.floor(Math.random() * this.days.length);
    return `day${this.days[randomIndex]}`;
  }
}
