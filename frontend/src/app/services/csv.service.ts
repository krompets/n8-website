import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvExportService {

  constructor() { }

  downloadCSV(data: any[], filename = 'data.csv') {
    let csvData = this.convertToCSV(data);
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    const url = URL.createObjectURL(blob);

    dwldLink.setAttribute('href', url);
    dwldLink.setAttribute('download', filename);
    dwldLink.style.visibility = 'hidden';
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  convertToCSV(data: any[]): string {
    let csv = '';
    data.forEach(row => {
      let line = '';
      for (let prop in row) {
        if (row.hasOwnProperty(prop)) {
          if (line !== '') line += ',';
          line += row[prop];
        }
      }
      csv += line + '\r\n';
    });
    return csv;
  }
}
