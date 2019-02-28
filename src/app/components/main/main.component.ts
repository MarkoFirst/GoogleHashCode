import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IPicture} from '../../config/IPicture';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('ul') ul: ElementRef;

  txtContetn: string;
  pictureList: IPicture[];
  countPistures: number;
  before: IPicture;
  now: IPicture;
  result: IPicture[];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    // this.getFile('example');
  }

  getFile(name: string): any {
    this.http.get(`assets/files/${name}.txt`, {responseType: 'text'}).subscribe(this.getPictureList);
  }

  onFileLoad(fileLoadedEvent) {
    const textFromFileLoaded = fileLoadedEvent.target.result;
    this.txtContetn = textFromFileLoaded;
  }

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

    this.pictureList = rows.map(str => {
      const array = str.split(' ');

      return {orientation: array[0], tagsCount: Number(array[1]), tags: array.filter((tag, index) => index > 1)};
    }).sort((a, b) => b.tagsCount - a.tagsCount);

    const logic = function () {
      let maxCount = 0;
      const groups = [];

      this.pictureList.forEach(picture => {
        if (picture.tagsCount > maxCount) {
          maxCount = picture.tagsCount;
        }

        picture.tags.forEach(tag => {
          if (groups.some(gr => gr.str === tag)) {
            groups.find(gr => gr.str === tag).count++;
            return;
          }
          groups.push({str: tag, count: 1});
        });
      });
      const newGrp = groups.sort((a, b) => b.count - a.count);

      let currentTag;

      this.now = this.pictureList
        .filter(item => item.tagsCount === maxCount)
        .filter(n => {
          currentTag = n.tags.find(str => str === newGrp[0].str);

          return currentTag;
        })[0];


      let max = 0;
      let current = this.pictureList[0];
      this.pictureList.forEach(picture => {

        const num = function (item: IPicture, nextItem: IPicture) {
          let similarTagsCount = 0;
          if (this.now === undefined) {
            return;
          }
          item.tags.forEach(index => {
              if (nextItem.tags.includes(index)) {
                similarTagsCount += 1;
              }
            }
          );

          return similarTagsCount;
        }.call(this, this.now, picture);

        if (num > max) {
          max = num;
          current = picture;
        }
      });

      if (!this.result) {
        console.log('переписал');
        this.result = [];
      }

      if (this.now) {
        this.result.push(current);
      }

      this.now = current;

      this.pictureList[this.pictureList.findIndex(i => i === current)] = this.pictureList[this.pictureList.length - 1];
      this.pictureList.pop();

      if (this.pictureList.length !== 0) {
        logic.call(this);
      } else {
        let trigger = false;

        const stringList = this.result
          .map((item, i) => {

            if ((item.orientation === 'H' || trigger) || i === 0) {
              trigger = false;
              return item.orientation + ' ' + item.tagsCount + ' ' + item.tags.join();
            }

            if (i > 0 && (item.orientation === this.result[i - 1].orientation)) {
              return item.orientation + ' ' + item.tagsCount + ' ' + item.tags.join() + ' / '
                + this.result[i - 1].orientation + ' ' + item.tagsCount + ' ' + this.result[i - 1].tags.join();
            }
          }).filter(i => i !== undefined);

        stringList.forEach((str) => {
          // const li = document.createElement('li');
          console.log(str);
          // document.getElementsByTagName('ul')[0].appendChild(li);
        });
      }
    };

    logic.call(this);
  }


  print() {
    this.result.forEach((picture: IPicture) => {
      const li = document.createElement('li');
      li.innerText = picture.orientation + ' ' + picture.tags.join();

      if (!this.ul) {
        return;
      }
      this.ul.nativeElement.appendChild(li);
    });
  }

  calculateSimilarTagsCount(item: IPicture, nextItem: IPicture): number {
    let similarTagsCount = 0;

    item.tags.forEach(value => {
      if (nextItem.tags.includes(value)) {
        similarTagsCount += 1;
      }
    });

    return similarTagsCount;
  }
}
