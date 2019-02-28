import { Component, OnInit } from '@angular/core';
import {ITeammate} from './config/ITeammate';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  TEAMMATE_LIST: ITeammate[] = [
    {
      name: 'Vadim Babiichuck',
      age: '07.10.1996',
      git: 'MarkoFirst',
      linkedin: 'vadimbabiichuck',
      mail: 'babiichuck.vadim@gmail.com',
      photo: 'Babiichuck.jpg'
    },
    {
      name: 'Sergey Semkov',
      age: '15.05.1997',
      git: 'Sema15',
      linkedin: 'sergey-semkov-794495158',
      mail: 'semkovserg05@gmail.com',
      photo: 'SemaS.jpg'
    },
    {
      name: 'Maksym Railian',
      age: '20.12.1995',
      git: 'railianmaksym',
      linkedin: 'maksym-railian-732443101',
      mail: 'railianmaksym@gmail.com',
      photo: 'Railian.jpg'
    },
    {
      name: 'Vladyslav Konovalchuk',
      age: '21.07.1995',
      git: 'Vlad-Konovalchuk',
      linkedin: 'vladyslav-konovalchuk',
      mail: 'berlitio600@gmail.com',
      photo: 'Konovalchuk.jpg'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
