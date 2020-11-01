import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MainService} from '../main.service';
import {RoomItemModel} from '../entity/roomTest';
import {MatDialog} from '@angular/material/dialog';
import {OwnerSelectorComponent} from './owner-selector/owner-selector.component';
import {positionTitle} from '../entity/test';
import {TestResultDialogComponent} from '../test-result-dialog/test-result-dialog.component';

@Component({
  selector: 'app-room-test',
  templateUrl: './room-test.component.html',
  styleUrls: ['./room-test.component.css']
})
export class RoomTestComponent implements OnInit {

  constructor( private router: Router, public mainService: MainService,public dialog: MatDialog) { }


  allItems: RoomItemModel[]=[
    {id: 1, img:"../../img/chair.png", name:"Стул", owner: null, square: 2, positionX: null, positionY: null, initX: null, initY: null, rotate:0},
    {id: 2, img:"../../img/sofa_green.png", name:"Диван зеленый", owner: null, square: 4, positionX: null, positionY: null,initX: null, initY: null,  rotate:0}
  ]

  loading: boolean = false

  public items: RoomItemModel[] = []

  ngOnInit() {
  }


  submit(){
    this.loading = true
    this.mainService.postRoomData(this.items).subscribe(ans=>{
      this.mainService.currentChild.hasRoom = true
      const dialogRef = this.dialog.open(TestResultDialogComponent, {
        data: "Результаты сохранены. Спасибо за участие",
      });
    },error => {this.loading =false},()=>{this.loading=false})
  }
  getUserName(){
    if(!this.mainService.currentChild) return
    return this.mainService.currentChild.name
  }

  addItem(item: RoomItemModel): void {
    const dialogRef = this.dialog.open(OwnerSelectorComponent, {
      //width: '250px',
      data: {id: item.id, img:item.img, name:item.name, owner: null, square: item.square, positionX: null, positionY: null, initX: null, initY: null, rotate:0},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)this.items.push(result)
    });
  }

  onRemove(item: RoomItemModel){
    this.items.splice(this.items.indexOf(item), 1)
  }
}
