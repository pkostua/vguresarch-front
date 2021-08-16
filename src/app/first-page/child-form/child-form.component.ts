import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MainService} from '../../main.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RoomItemModel} from '../../entity/roomTest';
import {FormControl, FormGroup} from '@angular/forms';
import {FamilyMember} from '../../entity/user';
import {familyPosition} from '../../entity/test';

@Component({
  selector: 'app-child-form',
  templateUrl: './child-form.component.html',
  styleUrls: ['./child-form.component.css']
})
export class ChildFormComponent implements AfterViewInit {

  constructor(
    public mainService: MainService,
    public dialogRef: MatDialogRef<ChildFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}


  addChildForm: FormGroup= new FormGroup({
    name: new FormControl(),
    age: new FormControl(),
    sex: new FormControl(),
    birthOrder: new FormControl(),
    familyPosition: new FormControl(),

  });

  ngAfterViewInit() {
  }

  onSubmit(){

  }

  get childPositions(){
    return familyPosition.filter(p=>!p.isAdult)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddChild(child: any): void {
    if(this.addChildForm.valid) {
      let subUser = new FamilyMember();
      subUser.name = this.addChildForm.value.name;
      subUser.age = this.addChildForm.value.age;
      subUser.sex = this.addChildForm.value.sex
      subUser.birthOrder = this.addChildForm.value.birthOrder
      subUser.familyPosition = this.addChildForm.value.familyPosition
      this.addChildForm.reset()
      this.dialogRef.close(subUser);
    }
  }

}
