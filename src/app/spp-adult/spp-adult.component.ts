import { Component, OnInit } from '@angular/core';
import {MainService} from '../main.service';
import {SppAdultTestResult, SppChildrenTestResult, Test} from '../entity/test';

@Component({
  selector: 'app-spp-adult',
  templateUrl: './spp-adult.component.html',
  styleUrls: ['./spp-adult.component.css']
})
export class SppAdultComponent implements OnInit {

  constructor(public mainService: MainService) { }
  loading: boolean = false;

  testList:Test[]
  testResult:SppAdultTestResult | null= null

  submitted: boolean = false

  ngOnInit() {
    this.testResult = null
    this.loading = true
    this.mainService.getSppAdultData().subscribe((ans)=>{
      this.testList = ans
      this.testList.sort((a,b)=>a.id-b.id)
    },()=>{},()=>this.loading = false)
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
    this.mainService.postSppAdultData(this.testList).subscribe((ans)=>{
      this.testResult = ans
      setTimeout(()=>{window.location.hash='result'},1000)
    },()=>{},()=>{this.loading =false})

  }

}
