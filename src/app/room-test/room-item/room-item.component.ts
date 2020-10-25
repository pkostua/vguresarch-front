import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RoomItemModel} from '../../entity/roomTest';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.css']
})
export class RoomItemComponent {

  constructor() { }
  @Input() item: RoomItemModel

  @Output() onRemove = new EventEmitter()

  public container:HTMLElement = document.getElementById("drop-container")

  remove(){
   this.onRemove.emit()
  }
  rotate(){
    this.item.rotate++
    if(this.item.rotate > 3) this.item.rotate = 0
  }

  get rotateClass() {
    return 'example-box rotate' + (90*this.item.rotate)
  }

  onDrop(event: any){
    console.log(event)
  }
}
