import { Component, OnInit } from '@angular/core';
import {MainService} from '../main.service';
import {FormGroup, FormControl} from '@angular/forms';
import {FamilyMember} from '../entity/user';
import {Router} from '@angular/router';
import {familyPosition, positionTitle} from '../entity/test';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {

  constructor(public mainService: MainService, private router: Router) { }

  error: string | null = null;

  addChildForm: FormGroup= new FormGroup({
    name: new FormControl(),
    age: new FormControl(),
    sex: new FormControl(),
    familyPosition: new FormControl(),

  });

  addAdultForm: FormGroup= new FormGroup({
    age: new FormControl(),
    familyPosition: new FormControl(),
  });

  children:FamilyMember[] =[];
  adults:FamilyMember[] =[];

  ngOnInit() {
    this.children = this.mainService.children
    this.adults = this.mainService.adults
  }

  get adultPositions(){
    return familyPosition.filter(p=>p.isAdult)
  }

  get childPositions(){
    return familyPosition.filter(p=>!p.isAdult)
  }

  positionTitle(name:string){
    return positionTitle(name)
  }


  onAddChild(){
    if(this.addChildForm.valid){
      let subUser = new FamilyMember();
      subUser.name = this.addChildForm.value.name;
      subUser.age = this.addChildForm.value.age;
      subUser.sex = this.addChildForm.value.sex
      subUser.familyPosition = this.addChildForm.value.familyPosition
      this.children.push(subUser);
      this.addChildForm.reset()
      this.error=null
    }
  }

  onAddAdult(){
    if(this.addAdultForm.valid){
      let subUser = new FamilyMember();
      subUser.name = this.addAdultForm.value.name;
      subUser.age = this.addAdultForm.value.age;
      subUser.familyPosition = this.addAdultForm.value.familyPosition
      this.adults.push(subUser);
      this.addAdultForm.reset()
      this.error=null
    }
  }
  onDeleteChild(su:FamilyMember){
    this.children.splice(this.children.indexOf(su),1)
  }

  onDeleteAdult(su:FamilyMember){
    this.adults.splice(this.children.indexOf(su),1)
  }

  onSubmit(){
    this.error=null
    if(this.children.length == 0){
      this.error ='Укажите хотябы одного ребенка'
      return
    }
    this.mainService.user.familyMembers=this.children;
    this.adults.forEach(m=>{
      this.mainService.user.familyMembers.push(m)
    })
    if(this.mainService.user.tmpUserId){
      this.mainService.updateTmpUser(this.mainService.user)
        .subscribe(()=>{
          this.router.navigate(['testRouter'])
        })
    }
    else{
      this.mainService.updateUser(this.mainService.user)
        .subscribe(()=>{
          this.router.navigate(['testRouter'])
        })
    }
  }
}
