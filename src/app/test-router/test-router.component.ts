import { Component, OnInit } from '@angular/core';
import {MainService} from '../main.service';
import {Router} from '@angular/router';
import {FamilyMember} from '../entity/user';
import {positionTitle} from '../entity/test';

@Component({
  selector: 'app-test-router',
  templateUrl: './test-router.component.html',
  styleUrls: ['./test-router.component.css']
})
export class TestRouterComponent implements OnInit {

  constructor(public mainService: MainService, private router: Router) { }

  ngOnInit() {
    if(!this.mainService.currentChild)this.mainService.currentChild=this.mainService.children[0]
  }

  gotoSppChildren(){
    this.router.navigate(['sppChildren'])
  }

  gotoSppAdult(m: FamilyMember | null){
    this.mainService.currentAdult=m
    this.router.navigate(['sppAdult'])
  }

  gotoRoomTest(){
    this.router.navigate(['room-test'])
  }

  gotoAnketa(){
    this.router.navigate(['anketa'])
  }

  setChild(c: FamilyMember) {
    this.mainService.currentChild = c
  }
  gotoFirst(){
    this.router.navigate(['first'])
  }
  getUserName(){
    return this.mainService.user.firstName
  }
  get children(){
    return this.mainService.children
  }

  get adults(){
    return this.mainService.adults.filter(m=>["MAMA","PAPA"].includes(m.familyPosition))
  }

  positionTitle(name:string){
    return positionTitle(name)
  }

}
