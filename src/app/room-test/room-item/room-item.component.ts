import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RoomItemModel} from '../../entity/roomTest';
import {CdkDragRelease} from '@angular/cdk/drag-drop';
import {positionTitle} from '../../entity/test';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.css']
})
export class RoomItemComponent {

  constructor() { }
  @Input() item: RoomItemModel
  @Input() id: string

  @Output() onRemove = new EventEmitter()

  public container:HTMLElement = document.getElementById("drop-container")

  remove(){
   this.onRemove.emit()
  }
  rotate(){
    this.item.rotate++
    if(this.item.rotate > 3) this.item.rotate = 0
  }

  dragStart($event) {
    $event.source._dragRef._initialTransform = `rotate(${this.item.rotate*90}deg)`;
  }

  positionTitle(name:string){
    return positionTitle(name)
  }


  onDrop(event: CdkDragRelease){
    let split = event.source.element.nativeElement.style.transform.replace("translate3d(", "").split(",")
    let x = split[0]?Number(split[0].replace("px", "")):0
    let y = split[1]?Number(split[1].replace("px", "")):0
    this.item.initX = event.source.element.nativeElement.offsetLeft
    this.item.initY = event.source.element.nativeElement.offsetTop
    this.item.positionY = y
    this.item.positionX = x
  }
}
