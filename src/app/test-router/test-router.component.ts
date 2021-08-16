import { Component, OnInit } from '@angular/core';
import {MainService} from '../main.service';
import {Router} from '@angular/router';
import {FamilyMember} from '../entity/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-test-router',
  templateUrl: './test-router.component.html',
  styleUrls: ['./test-router.component.css']
})
export class TestRouterComponent implements OnInit {

  constructor(public mainService: MainService, private router: Router, private _formBuilder: FormBuilder) { }

  firstFormGroup: FormGroup;

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
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
    this.router.navigate(['sppAdult']);
  }

  gotoRoomTest(c: FamilyMember) {
    this.mainService.currentChild = c;
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

}
