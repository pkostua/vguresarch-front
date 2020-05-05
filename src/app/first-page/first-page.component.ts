import { Component, OnInit } from '@angular/core';
import {MainService} from '../main.service';
import {FormGroup, FormControl} from '@angular/forms';
import {FamilyMember} from '../entity/user';
import {Router} from '@angular/router';

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
  });

  addAdultForm: FormGroup= new FormGroup({
    name: new FormControl(),
    age: new FormControl(),
  });

  children:FamilyMember[] =[];
  adults:FamilyMember[] =[];

  ngOnInit() {
    this.children = this.mainService.user.familyMembers.filter(m=>m.familyPosition=='CHILD' || m.sex != null);
    this.adults = this.mainService.user.familyMembers.filter(m=>m.familyPosition=='PARENT');
  }


  onAddChild(){
    if(this.addChildForm.valid){
      let subUser = new FamilyMember();
      subUser.name = this.addChildForm.value.name;
      subUser.age = this.addChildForm.value.age;
      subUser.sex = this.addChildForm.value.sex
      subUser.familyPosition = "CHILD"
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
      subUser.familyPosition = "PARENT"
      this.children.push(subUser);
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
    if(this.mainService.user.tempUser){
      this.router.navigate(['testRouter'])
    }
    else{
      this.mainService.updateUser(this.mainService.user)
        .subscribe(()=>{
          this.router.navigate(['testRouter'])
        })
    }
  }
}
