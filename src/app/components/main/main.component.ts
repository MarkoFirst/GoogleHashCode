import {Component, OnInit} from '@angular/core';
import {IPicture} from '../../config/IPicture';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  txtContetn: string;
  file: any;

  pictureList: IPicture[];
  countPistures: number;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getFile('example');
  }

  getFile(name: string): any {
    this.http.get(`assets/files/${name}.txt`, {responseType: 'text'}).subscribe(data => {
      return data;
    });
  }


  onFileLoad(fileLoadedEvent) {
    const textFromFileLoaded = fileLoadedEvent.target.result;
    this.txtContetn = textFromFileLoaded;
  }

  /**
   *
   * @INFO To use set event on input (change)="onFileSelect($event.target)"
   */
  onFileSelect(input: HTMLInputElement) {
    const files = input.files;
    if (files && files.length) {
      const fileToRead = files[0];
      const fileReader = new FileReader();
      fileReader.onload = this.onFileLoad;
      fileReader.readAsText(fileToRead, 'UTF-8');
    }
  }

  getPictureList(value: string) {
    const rows = value.split('\n');
    this.countPistures = Number(rows[0]);

    rows[0] = rows[rows.length - 1];
    rows.pop();

    this.pictureList = rows.map((str, i) => {
      const array = str.split(' ');

      return {orientation: array[0], tagsCount: (array.length - 2), tags: array.filter((tag, index) => index > 1)};
    });
  }
}
