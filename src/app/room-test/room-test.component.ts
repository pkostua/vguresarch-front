import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MainService} from '../main.service';

@Component({
  selector: 'app-room-test',
  templateUrl: './room-test.component.html',
  styleUrls: ['./room-test.component.css']
})
export class RoomTestComponent implements OnInit {

  constructor( private router: Router, public mainService: MainService,) { }

  ngOnInit() {
  }

  gotoFirst(){
    this.router.navigate(['first'])
  }
  getUserName(){
    return this.mainService.user.firstName
  }
}
