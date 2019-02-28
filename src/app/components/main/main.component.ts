import { Component, OnInit } from '@angular/core';
import { IPicture } from '../../config/IPicture';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  pictureList: IPicture[];
  countPistures: number;
  constructor() { }

  ngOnInit() {
  }

  getPictureList(value: string) {
    const rows = value.split('\n');
    this.countPistures = Number( rows[0] );

    rows[0] = rows[rows.length - 1];
    rows.pop();

    this.pictureList = rows.map((str, i) => {
      const array = str.split(' ');

      return { orientation: array[0], tagsCount: (array.length - 2), tags: array.filter((tag, index) => index > 1)};
    });
  }
}
