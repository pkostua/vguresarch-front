import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MainService} from '../main.service';
import {RoomItemModel} from '../entity/roomTest';
import {MatDialog} from '@angular/material/dialog';
import {OwnerSelectorComponent} from './owner-selector/owner-selector.component';
import {positionTitle} from '../entity/test';
import {TestResultDialogComponent} from '../test-result-dialog/test-result-dialog.component';
import {InfoDialogComponent} from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-room-test',
  templateUrl: './room-test.component.html',
  styleUrls: ['./room-test.component.css']
})
export class RoomTestComponent implements OnInit {

  constructor( private router: Router, public mainService: MainService,public dialog: MatDialog) { }


  allItems: RoomItemModel[]=[
    {id: 1, img:"../../img/room/bed.svg", name:"Кровать", owner: null, square: 510, positionX: null, positionY: null, initX: null, initY: null, rotate:0, zedIndex: 10, type: null},
    {id: 2, img:"../../img/room/bookcase.svg", name:"Книжный шкаф", owner: null, square: 760, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 10, type: null},
    {id: 3, img:"../../img/room/chair.svg", name:"Стул", owner: null, square: 297, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 60, type: null},
    {id: 4, img:"../../img/room/chest.svg", name:"Комод", owner: null, square: 319, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 55, type: null},
    {id: 5, img:"../../img/room/wardrobe.svg", name:"Шкаф", owner: null, square: 222, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 55, type: null},
    {id: 6, img:"../../img/room/sofa.svg", name:"Диван", owner: null, square: 152, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 95, type: null},
    {id: 7, img:"../../img/room/table.svg", name:"Стол", owner: null, square: 86, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 95, type: null},
    {id: 8, img:"../../img/room/armchair.svg", name:"Кресло", owner: null, square: 124, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 95, type: null},
    {id: 9, img:"../../img/room/table_comp.svg", name:"Рабочий стол", owner: null, square: 164, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 95, type: null},
    {id: 10, img:"../../img/room/kitchen.svg", name:"Кухня", owner: null, square: 147, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 95, type: null},
    {id: 11, img:"../../img/room/TV.svg", name:"ТВ", owner: null, square: 42, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 60, type: null},
    {id: 12, img:"../../img/room/noyt.svg", name:"Ноутбук", owner: null, square: 120, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 60, type: null},
    {id: 13, img:"../../img/room/telefon.svg", name:"Телефон", owner: null, square: 33, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 60, type: null},
    {id: 14, img:"../../img/room/man.svg", name:"М", owner: null, square: 132, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 100, type: "human"},
    {id: 15, img:"../../img/room/woman.svg", name:"Ж", owner: null, square: 106, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 55, type: "human"},
    {id: 16, img:"../../img/room/dog.svg", name:"Собака", owner: null, square: 86, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 55, type: null},
    {id: 17, img:"../../img/room/cat.svg", name:"Кошка", owner: null, square: 44, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 55, type: null},

  ]

  loading: boolean = false

  public items: RoomItemModel[] = []

  ngOnInit() {
    if(this.mainService.adminRoomTestData){
      this.mainService.adminRoomTestData.sort((a,b)=>a.id-b.id)
      this.items = this.mainService.adminRoomTestData
      this.mainService.adminRoomTestData = null
    }else {
      this.mainService.getRoomTestData().subscribe((ans) => {
        if (ans && ans.length) {
          ans.sort((a, b) => a.id - b.id)
          this.items = ans
        } else this.showInfoDialog()
      })
    }
  }


  submit(){
    this.loading = true
    this.mainService.postRoomData(this.items).subscribe(ans=>{
      this.mainService.currentChild.hasRoom = true
      const dialogRef = this.dialog.open(TestResultDialogComponent, {
        data: "Результаты сохранены",
      });
    },error => {this.loading =false},()=>{this.loading=false})
  }
  getUserName(){
    if(this.mainService.currentChild) return this.mainService.currentChild.name
    return 'аноним'
  }

  addItem(item: RoomItemModel): void {
    const dialogRef = this.dialog.open(OwnerSelectorComponent, {
      //width: '250px',
      data: {id: item.id, img:item.img, name:item.name, owner: null, square: item.square, positionX: null, positionY: null, initX: null, initY: null, rotate:0, zedIndex: item.zedIndex, type: item.type},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)this.items.push(result)
    });
  }

  onRemove(item: RoomItemModel){
    this.items.splice(this.items.indexOf(item), 1)
  }

  showInfoDialog(){
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: `<h4>Этот тест должен пройти <b style="color: #087f08">${this.getUserName()}</b>: изобрази дом где ты живёшь с помощью картинок -
выбери нужную картинку, укажи чья она или кто это и расположи её в комнате. Картинки можно уменьшать, увеличивать и удалять.
    </h4>`
    })
  }
}
