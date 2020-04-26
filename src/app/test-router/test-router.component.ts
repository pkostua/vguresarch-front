import { Component, OnInit } from '@angular/core';
import {MainService} from '../main.service';
import {Router} from '@angular/router';
import {FamilyMember} from '../entity/user';

@Component({
  selector: 'app-test-router',
  templateUrl: './test-router.component.html',
  styleUrls: ['./test-router.component.css']
})
export class TestRouterComponent implements OnInit {

  constructor(public mainService: MainService, private router: Router) { }

  ngOnInit() {
    this.mainService.currentChild=null
  }

  gotoSppChildren(child: FamilyMember){
    if(!child) return
    this.mainService.currentChild=child
    this.router.navigate(['sppChildren'])
  }

  gotoFirst(){
    this.router.navigate(['first'])
  }
  getUserName(){
    return this.mainService.user.firstName
  }
  children(){
    return this.mainService.user.familyMembers
  }

}
