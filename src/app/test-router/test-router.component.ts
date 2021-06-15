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
    this.mainService.currentAdult = null;
    if (!this.mainService.currentChild) {this.mainService.currentChild = this.mainService.targetChildren[0]; }
  }

  gotoStat() {
    this.router.navigate(['statistic/byMember']);
  }

  gotoSppChildren(c: FamilyMember) {
    this.mainService.currentChild = c;
    this.router.navigate(['sppChildren']);
  }

  gotoSppAdult(c: FamilyMember) {
    this.mainService.currentChild = c;
    this.mainService.currentAdult = this.adults[0];
    this.router.navigate(['sppAdult']);
  }

  gotoRoomTest(c: FamilyMember) {
    this.mainService.currentChild = c;
    this.mainService.currentAdult = null;
    this.router.navigate(['room-test']);
  }

  gotoAnketa(c: FamilyMember) {
    this.mainService.currentChild = c;
    this.router.navigate(['anketa']);
  }

  setChild(c: FamilyMember) {
    this.mainService.currentChild = c;
  }
  gotoFirst() {
    this.router.navigate(['first']);
  }

  get adults() {
    return this.mainService.adults;
  }

  positionTitle(name: string) {
    return positionTitle(name);
  }

  onTabChange(e) {
    setTimeout(() => this.mainService.currentChild = this.mainService.targetChildren[e.index], 500);
  }

}
