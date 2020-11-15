import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MainService} from '../main.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent implements AfterViewInit {

  constructor(public mainService: MainService,
              public dialogRef: MatDialogRef<InfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string) { }


  ngAfterViewInit() {
    let container = document.getElementById("container")
    if(container) {
      if (this.data.includes("<") && this.data.includes(">")) container.innerHTML = this.data
      else container.innerText = this.data
    }
  }

}
