import { Component, OnInit } from '@angular/core';
import {MainService} from '../main.service';
import {Router} from '@angular/router';
import { Test} from '../entity/test';
import {Anketa} from '../entity/anketa';

@Component({
  selector: 'app-anketa',
  templateUrl: './anketa.component.html',
  styleUrls: ['./anketa.component.css']
})
export class AnketaComponent implements OnInit {

  constructor(public mainService: MainService, private router: Router) { }
  loading: boolean = false;

  testList:Test[]
  testResult:Anketa | null= null

  submitted: boolean = false

  ngOnInit() {
    this.testResult = null
    this.loading = true
    this.mainService.getAnketaData().subscribe((ans)=>{
      this.testList = ans
      //this.testList.sort((a,b)=>a.id-b.id)
    },()=>{this.loading = false},()=>this.loading = false)
  }

  goBack(){
    this.router.navigate(['testRouter'])
  }

  submit(){
    this.submitted = true;
    for(let i=0; i<this.testList.length; i++){
      if(!this.testList[i].ans){
        window.location.hash='testRow'+i
        return
      }
    }
    this.loading = true
    this.mainService.postAnketaData(this.testList).subscribe((ans)=>{
      this.testResult = ans
      setTimeout(()=>{ window.location.hash='result'},1000)
    },()=>{},()=>{this.loading =false})

  }

}
