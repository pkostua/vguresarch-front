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

  addForm: FormGroup= new FormGroup({
    name: new FormControl(),
    age: new FormControl(),
    sex: new FormControl(),
  });

  familyMembers:FamilyMember[] =[];

  ngOnInit() {
    this.familyMembers = this.mainService.user.familyMembers;
  }


  onAdd(){
    if(this.addForm.valid){
      let subUser = new FamilyMember();
      subUser.name = this.addForm.value.name;
      subUser.age = this.addForm.value.age;
      subUser.sex = this.addForm.value.sex
      this.familyMembers.push(subUser);
      this.addForm.reset()
      this.error=null
    }
  }
  onDelete(su:FamilyMember){
    this.familyMembers.splice(this.familyMembers.indexOf(su),1)
  }

  onSubmit(){
    this.error=null
    if(this.familyMembers.length == 0){
      this.error ='Укажите хотябы одного ребенка'
      return
    }
    this.mainService.user.familyMembers=this.familyMembers;
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
