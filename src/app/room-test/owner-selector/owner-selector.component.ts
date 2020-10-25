import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RoomItemModel} from '../../entity/roomTest';
import {MainService} from '../../main.service';
import {FamilyMember} from '../../entity/user';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-owner-selector',
  templateUrl: './owner-selector.component.html',
  styleUrls: ['./owner-selector.component.css']
})
export class OwnerSelectorComponent {

  constructor(
    public mainService: MainService,
    public dialogRef: MatDialogRef<OwnerSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoomItemModel) {}


  ownerForm: FormGroup= new FormGroup({
    owner: new FormControl(),
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    console.log(this.ownerForm.value.owner)
    this.data.owner = this.ownerForm.value.owner
    this.dialogRef.close(this.data);
  }

  get members(){
    return this.mainService.user.familyMembers
  }
}
