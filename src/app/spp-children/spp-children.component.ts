import { Component, OnInit } from '@angular/core';
import {SppChildrenTestResult, Test} from '../entity/test';
import {MainService} from '../main.service';

@Component({
  selector: 'app-spp-children',
  templateUrl: './spp-children.component.html',
  styleUrls: ['./spp-children.component.css']
})
export class SppChildrenComponent implements OnInit {

  constructor(public mainService: MainService) { }
  loading: boolean = false;

  testList:Test[]
  testResult:SppChildrenTestResult | null= null

  submitted: boolean = false

  ngOnInit() {
    this.testResult = null
    this.loading = true
    this.mainService.getSppChildrenData().subscribe((ans)=>{
      this.testList = ans
      this.testList.sort((a,b)=>a.id-b.id)
    },()=>{},()=>this.loading = false)
  }

  get iam(){
    return this.mainService.currentChild
  }

  get other(){
    return this.mainService.user.familyMembers.find(m=>m.name!=this.iam.name)
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
    this.mainService.postSppChildrenData(this.testList,this.iam.name, this.iam.age, this.iam.sex).subscribe((ans)=>{
      this.testResult = ans
      window.location.hash='result'
    },()=>{},()=>{this.loading =false})

  }

}
