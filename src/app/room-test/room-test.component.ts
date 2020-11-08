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
    {id: 1, img:"../../img/carpet1.png", name:"Ковер с ворсом", owner: null, square: 510, positionX: null, positionY: null, initX: null, initY: null, rotate:0, zIndex: 50,},
    {id: 2, img:"../../img/carpet2.png", name:"Ковер с рисунком", owner: null, square: 760, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 50},
    {id: 3, img:"../../img/sofa.png", name:"Диван", owner: null, square: 297, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 4, img:"../../img/bed_big.png", name:"Кровать 2х спальная", owner: null, square: 319, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 5, img:"../../img/bed_small.png", name:"Кровать 1 спальная", owner: null, square: 222, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 6, img:"../../img/table1.png", name:"Стол большой", owner: null, square: 152, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 7, img:"../../img/table2.png", name:"Стол маленький", owner: null, square: 86, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 8, img:"../../img/compDesk.png", name:"Стол с креслом", owner: null, square: 124, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 9, img:"../../img/compDesk2.png", name:"Стол угловой", owner: null, square: 164, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 10, img:"../../img/comp_child.png", name:"Стол детский", owner: null, square: 147, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 11, img:"../../img/chair.png", name:"Стул", owner: null, square: 42, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 12, img:"../../img/armchair.png", name:"Кресло", owner: null, square: 120, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 13, img:"../../img/comp_chair.png", name:"Кресло компьютерное", owner: null, square: 33, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 14, img:"../../img/wardrobe.png", name:"Шкаф", owner: null, square: 132, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 15, img:"../../img/chest1.png", name:"Комод длинный", owner: null, square: 106, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 16, img:"../../img/chest2.png", name:"Комод бельевой", owner: null, square: 86, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 17, img:"../../img/chest3.png", name:"Тумбочка", owner: null, square: 44, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 18, img:"../../img/bookcase.png", name:"Книжный шкаф", owner: null, square: 90, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 19, img:"../../img/toys.png", name:"Игрушки", owner: null, square: 56, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 20, img:"../../img/backpack.png", name:"Рюкзак", owner: null, square: 35, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 21, img:"../../img/clothes1.png", name:"Одежда светлая", owner: null, square: 35, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 22, img:"../../img/clothes2.png", name:"Одежда темная", owner: null, square: 35, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 23, img:"../../img/shoes.png", name:"Обувь", owner: null, square: 10, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 24, img:"../../img/dog.png", name:"Собака", owner: null, square: 112, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 25, img:"../../img/cat.png", name:"Кошка", owner: null, square: 26, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 26, img:"../../img/bike.png", name:"Велосипед большой", owner: null, square: 240, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 27, img:"../../img/children_bike.png", name:"Велосипед детский", owner: null, square: 152, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 28, img:"../../img/plant.png", name:"Растение", owner: null, square: 94, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 29, img:"../../img/man_stand.png", name:"Мужчина стоит", owner: null, square: 90, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 30, img:"../../img/woman_stand.png", name:"Женщина стоит", owner: null, square: 90, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 31, img:"../../img/man_sit.png", name:"Мужчина сидит", owner: null, square: 90, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 32, img:"../../img/woman_sit.png", name:"Женщина сидит", owner: null, square: 90, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 33, img:"../../img/boy_sit.png", name:"Мальчик сидит", owner: null, square: 60, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 34, img:"../../img/litl_boy_sit.png", name:"Маленький мальчик сидит", owner: null, square: 50, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 35, img:"../../img/girl_sit.png", name:"Девочка сидит", owner: null, square: 60, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 36, img:"../../img/man_stand.png", name:"Мужчина стоит", owner: null, square: 90, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 29, img:"../../img/man_stand.png", name:"Мужчина стоит", owner: null, square: 90, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},
    {id: 29, img:"../../img/man_stand.png", name:"Мужчина стоит", owner: null, square: 90, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zIndex: 100},

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
      data: {id: item.id, img:item.img, name:item.name, owner: null, square: item.square, positionX: null, positionY: null, initX: null, initY: null, rotate:0, zIndex: item.zIndex},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)this.items.push(result)
    });
  }

  onRemove(item: RoomItemModel){
    this.items.splice(this.items.indexOf(item), 1)
  }
}
