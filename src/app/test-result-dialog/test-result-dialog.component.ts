import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MainService} from '../main.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RoomItemModel} from '../entity/roomTest';
import {Router} from '@angular/router';

@Component({
  selector: 'app-test-result-dialog',
  templateUrl: './test-result-dialog.component.html',
  styleUrls: ['./test-result-dialog.component.css']
})
export class TestResultDialogComponent implements AfterViewInit {

  constructor(public mainService: MainService,
              public dialogRef: MatDialogRef<TestResultDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string,
              private router: Router,) { }

  gotoRouter(){
    this.dialogRef.close()
    this.router.navigate(['testRouter'])
  }
  ngAfterViewInit() {
    let container = document.getElementById("container")
    if(container) {
      if (this.data.includes("<") && this.data.includes(">")) container.innerHTML = this.data
      else container.innerText = this.data
    }
  }
}
