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
    {id: 1, img:"../../img/carpet1.png", name:"Ковер с ворсом", owner: null, square: 510, positionX: null, positionY: null, initX: null, initY: null, rotate:0, zedIndex: 10, type: null},
    {id: 2, img:"../../img/carpet2.png", name:"Ковер с рисунком", owner: null, square: 760, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 10, type: null},
    {id: 3, img:"../../img/sofa.png", name:"Диван", owner: null, square: 297, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 60, type: null},
    {id: 4, img:"../../img/bed_big.png", name:"Кровать 2х спальная", owner: null, square: 319, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 55, type: null},
    {id: 5, img:"../../img/bed_small.png", name:"Кровать 1 спальная", owner: null, square: 222, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 55, type: null},
    {id: 6, img:"../../img/table1.png", name:"Стол большой", owner: null, square: 152, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 95, type: null},
    {id: 7, img:"../../img/table2.png", name:"Стол маленький", owner: null, square: 86, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 95, type: null},
    {id: 8, img:"../../img/compDesk.png", name:"Стол с креслом", owner: null, square: 124, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 95, type: null},
    {id: 9, img:"../../img/compDesk2.png", name:"Стол угловой", owner: null, square: 164, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 95, type: null},
    {id: 10, img:"../../img/comp_child.png", name:"Стол детский", owner: null, square: 147, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 95, type: null},
    {id: 11, img:"../../img/chair.png", name:"Стул", owner: null, square: 42, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 60, type: null},
    {id: 12, img:"../../img/armchair.png", name:"Кресло", owner: null, square: 120, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 60, type: null},
    {id: 13, img:"../../img/comp_chair.png", name:"Кресло компьютерное", owner: null, square: 33, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 60, type: null},
    {id: 14, img:"../../img/wardrobe.png", name:"Шкаф", owner: null, square: 132, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 100, type: null},
    {id: 15, img:"../../img/chest1.png", name:"Комод длинный", owner: null, square: 106, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 55, type: null},
    {id: 16, img:"../../img/chest2.png", name:"Комод бельевой", owner: null, square: 86, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 55, type: null},
    {id: 17, img:"../../img/chest3.png", name:"Тумбочка", owner: null, square: 44, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 55, type: null},
    {id: 18, img:"../../img/bookcase.png", name:"Книжный шкаф", owner: null, square: 90, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 100, type: null},
    {id: 19, img:"../../img/toys.png", name:"Игрушки", owner: null, square: 56, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 100, type: null},
    {id: 20, img:"../../img/backpack.png", name:"Рюкзак", owner: null, square: 35, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 100, type: null},
    {id: 21, img:"../../img/clothes1.png", name:"Одежда светлая", owner: null, square: 35, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 100, type: null},
    {id: 22, img:"../../img/clothes2.png", name:"Одежда темная", owner: null, square: 35, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 100, type: null},
    {id: 23, img:"../../img/shoes.png", name:"Обувь", owner: null, square: 10, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 55, type: null},
    {id: 24, img:"../../img/dog.png", name:"Собака", owner: null, square: 112, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 90, type: 'alive'},
    {id: 25, img:"../../img/cat.png", name:"Кошка", owner: null, square: 26, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 100, type: 'alive'},
    {id: 26, img:"../../img/bike.png", name:"Велосипед большой", owner: null, square: 240, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 100, type: null},
    {id: 27, img:"../../img/children_bike.png", name:"Велосипед детский", owner: null, square: 152, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 80, type: null},
    {id: 28, img:"../../img/plant.png", name:"Растение", owner: null, square: 94, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 100, type: null},
    {id: 29, img:"../../img/man_stand.png", name:"Мужчина стоит", owner: null, square: 90, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 90, type: 'alive'},
    {id: 30, img:"../../img/woman_stand.png", name:"Женщина стоит", owner: null, square: 90, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 90, type: 'alive'},
    {id: 31, img:"../../img/man_sit.png", name:"Мужчина сидит", owner: null, square: 90, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 90, type: 'alive'},
    {id: 32, img:"../../img/woman_sit.png", name:"Женщина сидит", owner: null, square: 90, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 90, type: 'alive'},
    {id: 33, img:"../../img/boy_sit.png", name:"Мальчик сидит", owner: null, square: 60, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 90, type: 'alive'},
    {id: 34, img:"../../img/litl_boy_sit.png", name:"Маленький мальчик сидит", owner: null, square: 50, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 90, type: 'alive'},
    {id: 35, img:"../../img/girl_sit.png", name:"Девочка сидит", owner: null, square: 60, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 90, type: 'alive'},
    {id: 36, img:"../../img/wool.png", name:"Стена", owner: null, square: 29, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 100, type: null},
    {id: 37, img:"../../img/Lit_boy_lz.png", name:"Мал.мальчик лежит", owner: null, square: 40, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 90, type: 'alive'},
    {id: 38, img:"../../img/lit_boy2_sit.png", name:"Мал.мальчик сидит", owner: null, square: 40, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 90, type: 'alive'},
    {id: 39, img:"../../img/litboy_stand.png", name:"Мал.мальчик стоит", owner: null, square: 40, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 90, type: 'alive'},
    {id: 40, img:"../../img/lit_girl_sit.png", name:"Мал.девочка сидит", owner: null, square: 40, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 90, type: 'alive'},
    {id: 41, img:"../../img/Liy_girl_lz.png", name:"Мал.девочка лежит", owner: null, square: 40, positionX: null, positionY: null,initX: null, initY: null,  rotate:0, zedIndex: 90, type: 'alive'},

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
    if(this.mainService.currentAdult) return positionTitle(this.mainService.currentAdult.familyPosition)
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
      data: `<h4>Расставьте предметы так, как если бы вы здесь жили.
Одним щелчком мыши выберите нужный предмет и укажите кому он принадлежит. Расположите его в комнате, предметы можно поворачивать и удалять.
    </h4>`
    })
  }
}
