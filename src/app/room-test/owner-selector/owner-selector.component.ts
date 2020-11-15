import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RoomItemModel} from '../../entity/roomTest';
import {MainService} from '../../main.service';
import {FamilyMember, Sex} from '../../entity/user';
import {familyPosition, positionTitle} from '../../entity/test';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-owner-selector',
  templateUrl: './owner-selector.component.html',
  styleUrls: ['./owner-selector.component.css']
})
export class OwnerSelectorComponent  implements AfterViewInit{

  constructor(
    public mainService: MainService,
    public dialogRef: MatDialogRef<OwnerSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoomItemModel) {}


  ownerForm: FormGroup= new FormGroup({
    owner: new FormControl(),
  });

  ngAfterViewInit() {
    this.ownerForm.setValue({"owner": null})
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    if(!this.ownerForm.value.owner) return
    this.data.owner = this.ownerForm.value.owner.id == 0?null:this.ownerForm.value.owner
    this.dialogRef.close(this.data);
  }

  get members(){
    let  members: FamilyMember[] = [{
      id: 0,
      name: "Общее",
      age:null,
      sex: null,
      familyPosition: null,
      hasAnketa: null,
      hasRoom: null,
      hasSppChildren: null,
      sppAdultList: [],
    }]
     return members.concat(this.mainService.user.familyMembers)
  }


  positionTitle(name:string){
    return positionTitle(name)
  }
}
