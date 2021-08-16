import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MainService} from '../../main.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';
import {familyPosition} from '../../entity/test';
import {FamilyMember} from '../../entity/user';

@Component({
  selector: 'app-adult-form',
  templateUrl: './adult-form.component.html',
  styleUrls: ['./adult-form.component.css']
})
export class AdultFormComponent implements AfterViewInit {

  constructor(
    public mainService: MainService,
    public dialogRef: MatDialogRef<AdultFormComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) {}


  addAdultForm: FormGroup= new FormGroup({
    age: new FormControl(),
    familyPosition: new FormControl(),
  });

  ngAfterViewInit() {
  }

  onSubmit(){

  }

  get adultPositions(){
    return familyPosition.filter(p=>p.isAdult)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    if (this.addAdultForm.valid) {
      let subUser = new FamilyMember();
      subUser.name = this.addAdultForm.value.name;
      subUser.age = this.addAdultForm.value.age;
      subUser.familyPosition = this.addAdultForm.value.familyPosition
      this.addAdultForm.reset()
      this.dialogRef.close(subUser);
    }

  }
}
