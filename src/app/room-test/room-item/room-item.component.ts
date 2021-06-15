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

  showButtons: boolean = false

  public container:HTMLElement = document.getElementById("drop-container")

  remove(){
   this.onRemove.emit()
  }
  zoomPlus(){
    this.item.rotate++
  }

  zoomMinus(){
    this.item.rotate--
  }

  onMouseEnter(){
    this.showButtons = true
  }

  onMouseLeave(){
    this.showButtons = false
  }

  get zoom (){
    return 1+this.item.rotate/10
  }

  dragStart($event) {
    $event.source._dragRef._initialTransform = `scale(${this.zoom})`;
  }

  positionTitle(name:string){
    return positionTitle(name)
  }

  get x (){
    if(this.item.initX) return this.item.initX + this.item.positionX
    else return this.item.positionX
  }

  get y (){
    if(this.item.initX) return this.item.initY + this.item.positionY
    else return this.item.positionY
  }

  onDrop(event: CdkDragRelease){
    let split = event.source.element.nativeElement.style.transform.replace("translate3d(", "").split(",")
    let x = split[0]?Number(split[0].replace("px", "")):0
    let y = split[1]?Number(split[1].replace("px", "")):0
    //this.item.initX = event.source.element.nativeElement.offsetLeft
    //this.item.initY = event.source.element.nativeElement.offsetTop
    this.item.initX = null
    this.item.initY = null
    this.item.positionY = y
    this.item.positionX = x
  }
}
