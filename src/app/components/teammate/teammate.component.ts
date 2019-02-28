import {Component, Input, OnInit} from '@angular/core';
import {ITeammate} from '../team/config/ITeammate';

@Component({
  selector: 'app-teammate',
  templateUrl: './teammate.component.html',
  styleUrls: ['./teammate.component.scss']
})
export class TeammateComponent implements OnInit {

  @Input() teammate: ITeammate;

  constructor() { }

  ngOnInit() {
  }

}
