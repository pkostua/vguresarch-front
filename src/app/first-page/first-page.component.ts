import { Component, OnInit } from '@angular/core';
import {MainService} from '../main.service';
import {FormGroup, FormControl} from '@angular/forms';
import {FamilyMember, Sex} from '../entity/user';
import {Router} from '@angular/router';
import {familyPosition, positionTitle} from '../entity/test';
import {RoomItemModel} from '../entity/roomTest';
import {OwnerSelectorComponent} from '../room-test/owner-selector/owner-selector.component';
import {MatDialog} from '@angular/material/dialog';
import {ChildFormComponent} from './child-form/child-form.component';
import {AdultFormComponent} from './adult-form/adult-form.component';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {

  constructor(public mainService: MainService, private router: Router, public dialog: MatDialog) { }

  error: string | null = null;


  children:FamilyMember[] =[];
  adults:FamilyMember[] =[];

  ngOnInit() {
    this.children = this.mainService.children
    this.adults = this.mainService.adults
  }

  addChildDialog(): void {
    const dialogRef = this.dialog.open(ChildFormComponent, {
      //width: '250px',
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.children.push(result);

    });
  }

  addAdultDialog(): void {
    const dialogRef = this.dialog.open(AdultFormComponent, {
      //width: '250px',
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.adults.push(result);

    });
  }


  onDeleteChild(su:FamilyMember){
    this.children.splice(this.children.indexOf(su),1)
  }

  onDeleteAdult(su:FamilyMember){
    this.adults.splice(this.children.indexOf(su),1)
  }

  positionTitle(name:string){
    return positionTitle(name)
  }

  onSubmit(){
    this.error=null
    if(this.children.length == 0){
      this.error ='Укажите хотябы одного ребенка'
      return
    }
    if(this.children.filter(it=>familyPosition.find(p=>p.name==it.familyPosition).isTarget).length == 0){
      this.error ='Укажите хотябы одного ребенка 1-4 класса'
      return
    }
    this.mainService.user.familyMembers=this.children;
    this.adults.forEach(m=>{
      this.mainService.user.familyMembers.push(m)
    })
    if(this.mainService.user.tmpUserId){
      this.mainService.updateTmpUser(this.mainService.user)
        .subscribe((ans)=>{
          if(ans) this.mainService.user = ans
          this.router.navigate(['testRouter'])
        })
    }
    else{
      this.mainService.updateUser(this.mainService.user)
        .subscribe((ans)=>{
          if(ans) this.mainService.user = ans
          this.router.navigate(['testRouter'])
        })
    }
  }

  onReject(){
    this.error=null

    this.mainService.user.familyMembers=[{
      id:null,
      name: "Мой ребенок",
      age: 7,
      sex:  "BOY",
      familyPosition: "FIRST_CLASS",
      hasAnketa: null,
      hasRoom: null,
      hasSppChildren: null,
      hasSppAdult: null,
    }];
    if(this.mainService.user.tmpUserId){
      this.mainService.updateTmpUser(this.mainService.user)
        .subscribe((ans)=>{
          if(ans) this.mainService.user = ans
          this.router.navigate(['testRouter'])
        })
    }
    else{
      this.mainService.updateUser(this.mainService.user)
        .subscribe((ans)=>{
          if(ans) this.mainService.user = ans
          this.router.navigate(['testRouter'])
        })
    }
  }

  onRoomInput(event){
    this.mainService.user.roomCount = Number(event.target.value)
  }
}
