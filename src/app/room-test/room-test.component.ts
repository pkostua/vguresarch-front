import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MainService} from '../main.service';
import {RoomItemModel} from '../entity/roomTest';
import {MatDialog} from '@angular/material/dialog';
import {OwnerSelectorComponent} from './owner-selector/owner-selector.component';

@Component({
  selector: 'app-room-test',
  templateUrl: './room-test.component.html',
  styleUrls: ['./room-test.component.css']
})
export class RoomTestComponent implements OnInit {

  constructor( private router: Router, public mainService: MainService,public dialog: MatDialog) { }


  allItems: RoomItemModel[]=[
    {id: 1, img:"../../img/chair.png", name:"Стул", owner: null, square: 2, positionX: null, positionY: null, rotate:0},
    {id: 2, img:"../../img/sofa_green.png", name:"Диван зеленый", owner: null, square: 4, positionX: null, positionY: null, rotate:0}
  ]

  public items: RoomItemModel[] = []

  ngOnInit() {
  }

  gotoFirst(){
    this.router.navigate(['first'])
  }
  getUserName(){
    return this.mainService.user.firstName
  }

  addItem(item: RoomItemModel): void {
    const dialogRef = this.dialog.open(OwnerSelectorComponent, {
      //width: '250px',
      data: Object.create(item)
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)this.items.push(result)
    });
  }

  onRemove(item: RoomItemModel){
    this.items.splice(this.items.indexOf(item), 1)
  }
}
