import { Component } from '@angular/core';
import { RESTService } from './services/restservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'res-app-front';
  arrayAsString : string = '';
  array: number[] = [];
  order: string = '';
  message: string = '';
  url: string = 'http://localhost:8080/numbers/sort-command';
  
  constructor(private service: RESTService) { }

  sortArray() {
    this.message = '';
    this.filterArray();
    let isOrderCorrect: Boolean = this.validateOrder();
    if (isOrderCorrect) {
      let response = this.service.sortArray(this.url, this.order, this.array);
      response.subscribe({
        next: (data) => this.arrayAsString = data.array.join(' '),
        error: (error) => this.message = error.message,
        complete: () => console.log('Subscription finished')
      })
    }
  }

  private filterArray() {
    let splitArray: string[] = this.arrayAsString.split(/[,\/ -]/);
    let filteredSplitArray = splitArray.filter( x => x != '' && !Number.isNaN(Number(x)))
    this.array = filteredSplitArray.map(x => Number(x));
    console.log(this.array);
    if (filteredSplitArray.length != splitArray.length) {
      this.message = 'Some values were incorrect. They were filtered out';
    }
  }

  private validateOrder() {
    if (!['DESC','ASC'].includes(this.order)) {
      this.message = 'incorrect order';
      return false;
    }
    return true;
  }
}
