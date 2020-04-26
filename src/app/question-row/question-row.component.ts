import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-question-row',
  templateUrl: './question-row.component.html',
  styleUrls: ['./question-row.component.css']
})
export class QuestionRowComponent {

  constructor() { }

  @Input()
  text: string

  @Input()
  ansList: string[]

  @Input()
  submitted: boolean = false

  @Input()
  value: string | null = null
  @Output() valueChange = new EventEmitter()


  setAns(i: string){
    this.value = i
    this.valueChange.emit(this.value)

  }

}
